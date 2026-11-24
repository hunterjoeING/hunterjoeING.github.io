import * as Phaser from 'phaser';

export type HighwayKind = 'truck' | 'car' | 'fast';

export interface HighwayCar {
  sprite: Phaser.GameObjects.Image;
  reflection?: Phaser.GameObjects.Image;
  headlight?: Phaser.GameObjects.Image;
  taillight?: Phaser.GameObjects.Image;
  blinkL?: Phaser.GameObjects.Image;
  blinkR?: Phaser.GameObjects.Image;
  lanePos: number;
  targetLane: number;
  pendingLane: number | null;
  kind: HighwayKind;
  speedKmh: number;
  baseDesired: number;
  blinkDir: -1 | 0 | 1;
  blinkHold: number;
  reckless: boolean;
  cooldown: number;
  pullTimer: number;
  burstTimer: number;
  braking: boolean;
}

export function rosterForRisk(risk: number, mobile: boolean): HighwayKind[] {
  if (mobile) {
    if (risk >= 0.36) return ['truck', 'truck', 'truck', 'car', 'car', 'car', 'fast', 'fast'];
    if (risk >= 0.22) return ['truck', 'truck', 'car', 'car', 'fast'];
    return ['truck', 'car', 'car', 'fast'];
  }
  if (risk >= 0.36) {
    return ['truck', 'truck', 'truck', 'truck', 'truck', 'car', 'car', 'car', 'car', 'car', 'fast', 'fast', 'fast'];
  }
  if (risk >= 0.22) return ['truck', 'truck', 'truck', 'car', 'car', 'car', 'fast', 'fast'];
  return ['truck', 'truck', 'car', 'car', 'fast', 'fast'];
}

export function textureForKind(kind: HighwayKind, index: number): string {
  if (kind === 'truck') return 'npc_truck';
  if (kind === 'fast') return index % 2 === 0 ? 'npc_fast_red' : 'npc_fast_black';
  return index % 2 === 0 ? 'npc_sedan_blue' : 'npc_compact_green';
}

export function baseSpeed(kind: HighwayKind): number {
  if (kind === 'truck') return Phaser.Math.Between(80, 90);
  if (kind === 'fast') return Phaser.Math.Between(148, 172);
  return Phaser.Math.Between(100, 120);
}

function sameLane(a: number, b: number): boolean {
  return Math.abs(a - b) < 0.45;
}

function gapAhead(cars: HighwayCar[], car: HighwayCar, range: number): number {
  let best = range + 1;
  for (const other of cars) {
    if (other === car || !sameLane(other.lanePos, car.lanePos)) continue;
    const dy = car.sprite.y - other.sprite.y;
    if (dy > 18 && dy < best) best = dy;
  }
  return best;
}

function laneClear(
  cars: HighwayCar[],
  car: HighwayCar,
  lane: number,
  playerY?: number,
  playerLane?: number
): boolean {
  for (const other of cars) {
    if (other === car) continue;
    if (!sameLane(other.lanePos, lane) && Math.abs(other.targetLane - lane) > 0.2) continue;
    if (Math.abs(other.sprite.y - car.sprite.y) < 150) return false;
  }
  if (playerY !== undefined && playerLane !== undefined && Math.abs(playerLane - lane) <= 0.45) {
    if (Math.abs(playerY - car.sprite.y) < 160) return false;
  }
  return true;
}

function requestChange(
  cars: HighwayCar[],
  car: HighwayCar,
  to: number,
  maxLane: number,
  allowReckless: boolean,
  playerY?: number,
  playerLane?: number
): void {
  if (car.cooldown > 0 || car.pendingLane !== null) return;
  if (Math.abs(car.lanePos - car.targetLane) > 0.08) return;
  if (to < 0 || to > maxLane || to === car.targetLane) return;
  if (!laneClear(cars, car, to, playerY, playerLane)) return;
  const reckless = allowReckless && car.reckless;
  car.cooldown = car.kind === 'truck' ? 5 : 2.4;
  if (reckless) {
    car.blinkDir = 0;
    car.blinkHold = 0;
    car.pendingLane = null;
    car.targetLane = to;
    return;
  }
  car.blinkDir = to < car.targetLane ? -1 : 1;
  car.pendingLane = to;
  car.blinkHold = 0.72;
}

/** Centre-to-centre gap that keeps the sprites from overlapping, plus a visible cushion. */
export function bumperGap(kindA: HighwayKind | 'player', kindB: HighwayKind | 'player'): number {
  const half = (kind: HighwayKind | 'player') => (kind === 'truck' ? 44 : 28);
  return half(kindA) + half(kindB) + 18;
}

/** Real-time motorway traffic. Right lane is 2, middle is 1, left (fast) is 0. */
export function stepHighwayTraffic(
  cars: HighwayCar[],
  dt: number,
  playerKmh: number,
  scrollPxPerSec: number,
  viewH: number,
  risk: number,
  rightLaneOpen: boolean,
  roadLimitKmh = 400,
  playerY?: number,
  playerLane?: number
): void {
  const maxLane = rightLaneOpen ? 2 : 1;
  const limit = Math.max(40, roadLimitKmh);
  for (const car of cars) {
    car.cooldown = Math.max(0, car.cooldown - dt);
    car.pullTimer -= dt;
    if (!rightLaneOpen && car.targetLane > 1 && car.pendingLane === null && Math.abs(car.lanePos - car.targetLane) < 0.08) {
      requestChange(cars, car, 1, maxLane, false, playerY, playerLane);
    }

    let desired = Math.min(limit, car.baseDesired);
    if (car.kind === 'fast') {
      car.burstTimer -= dt;
      if (car.burstTimer <= 0) {
        car.braking = !car.braking;
        car.burstTimer = car.braking ? Phaser.Math.FloatBetween(0.8, 1.6) : Phaser.Math.FloatBetween(1.6, 3.2);
      }
      desired = car.braking ? Math.min(limit, Math.max(limit * 0.86, car.baseDesired - 10)) : Math.min(limit, car.baseDesired + 6);
    }

    let aheadGap = gapAhead(cars, car, 260);
    let lead = desired;
    const follow = bumperGap(car.kind, 'car');
    let blocked = false;
    if (aheadGap < 260) {
      for (const other of cars) {
        if (other === car || !sameLane(other.lanePos, car.lanePos)) continue;
        const dy = car.sprite.y - other.sprite.y;
        if (dy > 12 && dy <= aheadGap + 2) lead = other.speedKmh;
      }
    }
    if (playerY !== undefined && playerLane !== undefined && sameLane(car.lanePos, playerLane)) {
      const dy = car.sprite.y - playerY;
      if (dy > 12 && dy < aheadGap) {
        aheadGap = dy;
        lead = playerKmh;
      }
    }
    if (aheadGap < 260 && lead < desired + 1) {
      if (aheadGap < follow) {
        const crush = Math.max(0, Math.min(1, (follow - aheadGap) / follow));
        desired = Math.min(desired, Math.max(32, lead - 16 * crush));
        blocked = true;
      } else if (lead < desired) {
        const room = Math.min(1, (aheadGap - follow) / 110);
        desired = Math.min(desired, lead + (desired - lead) * room);
        if (lead + 8 < Math.min(limit, car.baseDesired) && aheadGap < follow + 90) blocked = true;
      }
    }

    const closing = aheadGap < follow + 24;
    const accel = car.kind === 'truck' ? (car.speedKmh < desired ? 18 : 36) : closing ? 130 : car.speedKmh < desired ? 42 : 80;
    if (car.speedKmh < desired) car.speedKmh = Math.min(desired, car.speedKmh + accel * dt);
    else car.speedKmh = Math.max(desired, car.speedKmh - accel * dt);

    if (blocked && car.kind === 'car' && car.targetLane > 0) {
      requestChange(cars, car, car.targetLane - 1, maxLane, false, playerY, playerLane);
    }
    if (blocked && car.kind === 'fast' && car.reckless && Math.random() < dt * 0.35) {
      requestChange(cars, car, Math.min(maxLane, car.targetLane + 1), maxLane, true, playerY, playerLane);
    }
    if (car.kind === 'truck' && car.pullTimer <= 0) {
      car.pullTimer = Phaser.Math.FloatBetween(3.2, 6.5);
      const often = risk >= 0.32 ? 0.62 : 0.18;
      if (car.targetLane >= 2 && Math.random() < often) requestChange(cars, car, 1, maxLane, false, playerY, playerLane);
      else if (car.targetLane === 1) requestChange(cars, car, Math.min(2, maxLane), maxLane, false, playerY, playerLane);
    }

    if (car.blinkHold > 0) {
      car.blinkHold -= dt;
      if (car.blinkHold <= 0 && car.pendingLane !== null) {
        car.targetLane = Phaser.Math.Clamp(car.pendingLane, 0, maxLane);
        car.pendingLane = null;
      }
    }
    const diff = car.targetLane - car.lanePos;
    if (Math.abs(diff) < 0.02) {
      car.lanePos = car.targetLane;
      if (car.pendingLane === null) car.blinkDir = 0;
    } else {
      car.lanePos += Math.sign(diff) * Math.min(Math.abs(diff), 1.45 * dt);
      if (car.blinkDir === 0 && !car.reckless) car.blinkDir = diff < 0 ? -1 : 1;
    }

    const dy = ((playerKmh - car.speedKmh) * scrollPxPerSec) / Math.max(70, playerKmh);
    car.sprite.y += dy * dt;
    if (car.sprite.y > viewH + 130) {
      car.sprite.y = -180 - Math.random() * 220;
      car.speedKmh = Math.min(limit, car.baseDesired);
      const home = car.kind === 'truck' ? Math.min(2, maxLane) : car.kind === 'fast' ? 0 : Math.min(1, maxLane);
      car.targetLane = home;
      car.lanePos = home;
      car.pendingLane = null;
      car.blinkDir = 0;
    } else if (car.sprite.y < -360) {
      car.sprite.y = viewH + 30;
    }
  }
}

export function preferredPlayerLane(speedKmh: number, rightLaneOpen: boolean): number {
  if (!rightLaneOpen) return speedKmh <= 70 ? 1 : 0;
  if (speedKmh <= 100) return 2;
  if (speedKmh <= 132) return 1;
  return 0;
}

export function laneIsClear(cars: HighwayCar[], lane: number, y: number, range = 168): boolean {
  for (const car of cars) {
    const inLane = Math.abs(car.lanePos - lane) <= 0.55;
    const entering = Math.abs(car.targetLane - lane) <= 0.35 && Math.abs(car.lanePos - lane) < 0.8;
    if (!inLane && !entering) continue;
    if (Math.abs(car.sprite.y - y) < range) return false;
  }
  return true;
}

export function leadVehicle(cars: HighwayCar[], lane: number, y: number, range: number): HighwayCar | null {
  let best: HighwayCar | null = null;
  let bestDy = range;
  for (const car of cars) {
    if (Math.abs(car.lanePos - lane) > 0.55 && Math.abs(car.targetLane - lane) > 0.35) continue;
    const dy = y - car.sprite.y;
    if (dy > 16 && dy < bestDy) {
      bestDy = dy;
      best = car;
    }
  }
  return best;
}

/** Set speed is the ceiling. Inside the comfort gap the car matches the leader instead of diving away. */
export function followSpeedKmh(maxKmh: number, gapPx: number | null, leadKmh: number | null): number {
  if (gapPx === null || leadKmh === null) return maxKmh;
  const minGap = 78;
  const comfort = 200;
  if (gapPx < minGap) {
    const crush = Math.max(0, Math.min(1, (minGap - gapPx) / minGap));
    return Math.max(36, Math.min(maxKmh, leadKmh - 20 * crush));
  }
  if (gapPx >= comfort) return maxKmh;
  const t = (gapPx - minGap) / (comfort - minGap);
  return Math.min(maxKmh, leadKmh) + (maxKmh - Math.min(maxKmh, leadKmh)) * t * t;
}

function inPlayerLane(car: HighwayCar, lanes: number[]): boolean {
  return lanes.some(lane => Math.abs(car.lanePos - lane) <= 0.5 || Math.abs(car.targetLane - lane) <= 0.35);
}

/**
 * Keep a hard gap in every lane. Cars ahead of the player are packed forward;
 * a later car is never pushed back into the one in front or into the player.
 */
export function enforceTrafficGaps(
  cars: HighwayCar[],
  player: { y: number; lanes: number[]; speedKmh: number } | null
): number {
  let pops = 0;
  const place = (car: HighwayCar, toY: number, speedCap?: number) => {
    if (toY < car.sprite.y - 0.5 || toY > car.sprite.y + 0.5) {
      if (Math.abs(car.sprite.y - toY) > 8) pops += 1;
      car.sprite.y = toY;
    }
    if (speedCap !== undefined && car.speedKmh > speedCap) car.speedKmh = speedCap;
  };

  const lanes = new Set<number>();
  for (const car of cars) lanes.add(Math.round(car.lanePos));
  for (const lane of lanes) {
    if (player && player.lanes.some(held => Math.abs(held - lane) < 0.1)) continue;
    const group = cars
      .filter(car => Math.abs(car.lanePos - lane) <= 0.48)
      .sort((a, b) => a.sprite.y - b.sprite.y);
    for (let i = 1; i < group.length; i++) {
      const front = group[i - 1];
      const rear = group[i];
      const need = bumperGap(front.kind, rear.kind);
      if (rear.sprite.y - front.sprite.y < need) place(rear, front.sprite.y + need, front.speedKmh);
    }
  }

  if (!player) return pops;
  const mine = cars.filter(car => inPlayerLane(car, player.lanes));
  const ahead = mine.filter(car => car.sprite.y <= player.y).sort((a, b) => b.sprite.y - a.sprite.y);
  let rearY = player.y;
  let rearKind: HighwayKind | 'player' = 'player';
  for (const car of ahead) {
    const need = bumperGap(rearKind, car.kind);
    const maxY = rearY - need;
    if (car.sprite.y > maxY) place(car, maxY);
    rearY = car.sprite.y;
    rearKind = car.kind;
  }
  const behind = mine.filter(car => car.sprite.y > player.y).sort((a, b) => a.sprite.y - b.sprite.y);
  rearY = player.y;
  rearKind = 'player';
  for (const car of behind) {
    const need = bumperGap(rearKind, car.kind) * (rearKind === 'player' ? 0.9 : 1);
    const minY = rearY + need;
    if (car.sprite.y < minY) place(car, minY, Math.max(36, player.speedKmh - 6));
    rearY = car.sprite.y;
    rearKind = car.kind;
  }
  return pops;
}

/** Sprites whose bodies occupy the same lane. The cushion inside bumperGap is ignored. */
export function countSpriteOverlaps(cars: HighwayCar[], playerY: number, playerLanes: number[]): number {
  let count = 0;
  for (const car of cars) {
    const near = playerLanes.some(lane => Math.abs(car.lanePos - lane) <= 0.48);
    if (!near) continue;
    if (Math.abs(playerY - car.sprite.y) < bumperGap('player', car.kind) - 16) count += 1;
  }
  for (let i = 0; i < cars.length; i++) {
    for (let j = i + 1; j < cars.length; j++) {
      if (Math.abs(cars[i].lanePos - cars[j].lanePos) > 0.48) continue;
      if (Math.abs(cars[i].sprite.y - cars[j].sprite.y) < bumperGap(cars[i].kind, cars[j].kind) - 16) count += 1;
    }
  }
  return count;
}
