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

function laneClear(cars: HighwayCar[], car: HighwayCar, lane: number): boolean {
  for (const other of cars) {
    if (other === car) continue;
    if (!sameLane(other.lanePos, lane) && Math.abs(other.targetLane - lane) > 0.2) continue;
    if (Math.abs(other.sprite.y - car.sprite.y) < 150) return false;
  }
  return true;
}

function requestChange(cars: HighwayCar[], car: HighwayCar, to: number, maxLane: number, allowReckless: boolean): void {
  if (car.cooldown > 0 || car.pendingLane !== null) return;
  if (Math.abs(car.lanePos - car.targetLane) > 0.08) return;
  if (to < 0 || to > maxLane || to === car.targetLane) return;
  if (!laneClear(cars, car, to)) return;
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

/** Real-time motorway traffic. Right lane is 2, middle is 1, left (fast) is 0. */
export function stepHighwayTraffic(
  cars: HighwayCar[],
  dt: number,
  playerKmh: number,
  scrollPxPerSec: number,
  viewH: number,
  risk: number,
  rightLaneOpen: boolean
): void {
  const maxLane = rightLaneOpen ? 2 : 1;
  for (const car of cars) {
    car.cooldown = Math.max(0, car.cooldown - dt);
    car.pullTimer -= dt;
    if (!rightLaneOpen && car.targetLane > 1 && car.pendingLane === null && Math.abs(car.lanePos - car.targetLane) < 0.08) {
      requestChange(cars, car, 1, maxLane, false);
    }

    let desired = car.baseDesired;
    if (car.kind === 'fast') {
      car.burstTimer -= dt;
      if (car.burstTimer <= 0) {
        car.braking = !car.braking;
        car.burstTimer = car.braking ? Phaser.Math.FloatBetween(0.7, 1.5) : Phaser.Math.FloatBetween(1.5, 3.1);
      }
      if (car.braking) desired = Phaser.Math.Between(60, 86);
      else {
        const gap = gapAhead(cars, car, 280);
        desired = gap > 210 ? Math.min(186, car.baseDesired + 22) : car.baseDesired;
      }
    }

    const aheadGap = gapAhead(cars, car, 150);
    let blocked = false;
    if (aheadGap < 145) {
      let lead = car.baseDesired;
      for (const other of cars) {
        if (other === car || !sameLane(other.lanePos, car.lanePos)) continue;
        const dy = car.sprite.y - other.sprite.y;
        if (dy > 18 && dy <= aheadGap + 2) lead = other.speedKmh;
      }
      if (lead < desired - 4) {
        desired = Math.max(48, lead - 6);
        blocked = true;
      }
    }

    const accel = car.kind === 'fast' ? (car.speedKmh < desired ? 100 : 155) : car.kind === 'truck' ? 20 : 42;
    if (car.speedKmh < desired) car.speedKmh = Math.min(desired, car.speedKmh + accel * dt);
    else car.speedKmh = Math.max(desired, car.speedKmh - accel * dt);

    if (blocked && car.kind === 'car' && car.targetLane > 0) {
      requestChange(cars, car, car.targetLane - 1, maxLane, false);
    }
    if (blocked && car.kind === 'fast' && car.reckless && Math.random() < dt * 0.35) {
      requestChange(cars, car, Math.min(maxLane, car.targetLane + 1), maxLane, true);
    }
    if (car.kind === 'truck' && car.pullTimer <= 0) {
      car.pullTimer = Phaser.Math.FloatBetween(3.2, 6.5);
      const often = risk >= 0.32 ? 0.62 : 0.18;
      if (car.targetLane >= 2 && Math.random() < often) requestChange(cars, car, 1, maxLane, false);
      else if (car.targetLane === 1) requestChange(cars, car, Math.min(2, maxLane), maxLane, false);
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
      car.speedKmh = car.baseDesired;
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
    if (Math.abs(car.lanePos - lane) > 0.55 && Math.abs(car.targetLane - lane) > 0.35) continue;
    if (Math.abs(car.sprite.y - y) < range) return false;
  }
  return true;
}

export function leadVehicle(cars: HighwayCar[], lane: number, y: number, range: number): HighwayCar | null {
  let best: HighwayCar | null = null;
  let bestDy = range;
  for (const car of cars) {
    if (Math.abs(car.lanePos - lane) > 0.55) continue;
    const dy = y - car.sprite.y;
    if (dy > 20 && dy < bestDy) {
      bestDy = dy;
      best = car;
    }
  }
  return best;
}
