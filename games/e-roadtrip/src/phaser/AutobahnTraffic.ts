import * as Phaser from 'phaser';

export type HighwayKind = 'truck' | 'car' | 'fast';

export interface HighwayCar {
  sprite: Phaser.GameObjects.Image;
  reflection?: Phaser.GameObjects.Image;
  headlight?: Phaser.GameObjects.Image;
  taillight?: Phaser.GameObjects.Image;
  blinkL?: Phaser.GameObjects.Image;
  blinkR?: Phaser.GameObjects.Image;
  /** Vorzeichenbehafteter Abstand zum Spieler entlang der Straße. */
  distanceKm: number;
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
  /** Asked to move right as soon as the lane is clear. */
  yieldRight?: boolean;
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

// 120 km/h entsprechen bei normalem Tempo 280 px/s. Die Verkehrslogik läuft in Echtzeit.
export const HIGHWAY_PX_PER_KM = 8400;
export const LANE_CHANGE_PER_SEC = 1.45;
const CHANGE_SECONDS = 1 / LANE_CHANGE_PER_SEC;

type VehicleOnRoad = {
  distanceKm: number;
  lanes: number[];
  kind: HighwayKind | 'player';
  speedKmh: number;
};

function occupiedLanes(car: HighwayCar): number[] {
  if (car.lanePos === car.targetLane) return [car.targetLane];
  const from = car.lanePos < car.targetLane ? Math.floor(car.lanePos) : Math.ceil(car.lanePos);
  return [from, car.targetLane];
}

/** Mindestabstand von Fahrzeugmitte zu Fahrzeugmitte in der Projektion. */
export function bumperGap(kindA: VehicleOnRoad['kind'], kindB: VehicleOnRoad['kind']): number {
  const half = (kind: VehicleOnRoad['kind']) => (kind === 'truck' ? 44 : 28);
  return half(kindA) + half(kindB) + 18;
}

function hasMergeRoom(
  distanceKm: number,
  speedKmh: number,
  other: Pick<VehicleOnRoad, 'distanceKm' | 'speedKmh'>,
  rangePx: number
): boolean {
  const gap = other.distanceKm - distanceKm;
  const projectedGap = gap + ((other.speedKmh - speedKmh) * CHANGE_SECONDS) / 3600;
  return gap * projectedGap > 0 && Math.min(Math.abs(gap), Math.abs(projectedGap)) * HIGHWAY_PX_PER_KM >= rangePx;
}

function canChange(
  cars: HighwayCar[],
  car: HighwayCar,
  lane: number,
  player: VehicleOnRoad
): boolean {
  for (const other of cars) {
    if (other === car || !occupiedLanes(other).includes(lane)) continue;
    if (!hasMergeRoom(car.distanceKm, car.speedKmh, other, 150)) return false;
  }
  return !player.lanes.includes(lane) || hasMergeRoom(car.distanceKm, car.speedKmh, player, 160);
}

function requestChange(
  cars: HighwayCar[],
  car: HighwayCar,
  to: number,
  maxLane: number,
  player: VehicleOnRoad
): void {
  if (car.cooldown > 0 || car.pendingLane !== null || car.lanePos !== car.targetLane) return;
  if (to < 0 || to > maxLane || to === car.targetLane || !canChange(cars, car, to, player)) return;
  car.cooldown = car.kind === 'truck' ? 5 : 2.4;
  car.blinkDir = to < car.targetLane ? -1 : 1;
  car.pendingLane = to;
  car.blinkHold = 0.72;
}

function nearestLead(vehicle: VehicleOnRoad, traffic: VehicleOnRoad[], rangePx: number): VehicleOnRoad | undefined {
  let nearest: VehicleOnRoad | undefined;
  let clearance = rangePx;
  for (const other of traffic) {
    const distance = (other.distanceKm - vehicle.distanceKm) * HIGHWAY_PX_PER_KM;
    if (distance <= 0 || !vehicle.lanes.some(lane => other.lanes.includes(lane))) continue;
    const gap = distance - bumperGap(vehicle.kind, other.kind);
    if (gap < clearance) {
      nearest = other;
      clearance = gap;
    }
  }
  return nearest;
}

export function stepHighwayTraffic(
  cars: HighwayCar[],
  dt: number,
  playerKmh: number,
  playerLanes: number[],
  playerY: number,
  viewH: number,
  risk: number,
  rightLaneOpen: boolean,
  roadLimitKmh: number
): number {
  if (dt <= 0) return playerKmh;
  const maxLane = rightLaneOpen ? 2 : 1;
  const limit = Math.max(40, roadLimitKmh);
  const player: VehicleOnRoad = { distanceKm: 0, lanes: playerLanes, kind: 'player', speedKmh: playerKmh };

  // Erst die Spurwechsel freigeben. Ein bereits gestarteter Wechsel belegt beide Spuren.
  for (const car of cars) {
    car.cooldown = Math.max(0, car.cooldown - dt);
    if (car.pendingLane === null) continue;
    car.blinkHold = Math.max(0, car.blinkHold - dt);
    if (car.blinkHold > 0) continue;
    if (car.pendingLane <= maxLane && canChange(cars, car, car.pendingLane, player)) {
      if (car.pendingLane > car.targetLane) car.yieldRight = false;
      car.targetLane = car.pendingLane;
    } else {
      car.blinkDir = 0;
      car.cooldown = 0.25;
    }
    car.pendingLane = null;
  }

  const traffic = cars.map(car => ({
    car,
    distanceKm: car.distanceKm,
    lanes: occupiedLanes(car),
    kind: car.kind,
    speedKmh: car.speedKmh
  }));
  const vehicles = [...traffic, player];
  for (const vehicle of traffic) {
    const { car } = vehicle;
    car.pullTimer -= dt;
    if (car.yieldRight && car.kind !== 'truck') {
      const right = Math.min(maxLane, car.targetLane + 1);
      if (right > car.targetLane) requestChange(cars, car, right, maxLane, player);
      if (car.targetLane >= maxLane) car.yieldRight = false;
    }
    if (!rightLaneOpen && car.targetLane === 2) requestChange(cars, car, 1, maxLane, player);

    let desired = Math.min(limit, car.baseDesired);
    if (car.kind === 'fast') {
      car.burstTimer -= dt;
      if (car.burstTimer <= 0) {
        car.braking = !car.braking;
        car.burstTimer = car.braking ? Phaser.Math.FloatBetween(0.8, 1.6) : Phaser.Math.FloatBetween(1.6, 3.2);
      }
      desired = car.braking ? Math.min(limit, Math.max(limit * 0.86, car.baseDesired - 10)) : Math.min(limit, car.baseDesired + 6);
    }

    const lead = nearestLead(vehicle, vehicles, 170);
    const gap = lead ? (lead.distanceKm - car.distanceKm) * HIGHWAY_PX_PER_KM : Infinity;
    const follow = lead ? bumperGap(car.kind, lead.kind) : 78;
    const blocked = !!lead && lead.speedKmh + 8 < desired && gap < follow + 90;
    if (lead) desired = followSpeedKmh(desired, gap, lead.speedKmh, follow);
    const accel = car.kind === 'truck' ? (car.speedKmh < desired ? 18 : 36) : gap < follow + 24 ? 130 : car.speedKmh < desired ? 42 : 80;
    if (car.speedKmh < desired) car.speedKmh = Math.min(desired, car.speedKmh + accel * dt);
    else car.speedKmh = Math.max(desired, car.speedKmh - accel * dt);

    if (blocked && car.kind === 'car' && car.targetLane > 0) {
      requestChange(cars, car, car.targetLane - 1, maxLane, player);
    }
    if (blocked && car.kind === 'fast' && car.reckless && Math.random() < dt * 0.35) {
      requestChange(cars, car, car.targetLane + 1, maxLane, player);
    }
    if (car.kind === 'truck' && car.pullTimer <= 0) {
      car.pullTimer = Phaser.Math.FloatBetween(3.2, 6.5);
      const often = risk >= 0.32 ? 0.62 : 0.18;
      if (rightLaneOpen && car.targetLane === 2 && Math.random() < often) requestChange(cars, car, 1, maxLane, player);
      else if (car.targetLane === 1) requestChange(cars, car, maxLane, maxLane, player);
    }
    vehicle.speedKmh = car.speedKmh;
  }

  // Jede Spur behält ihren eigenen Vordermann. Ein Wechsel verknüpft nur die
  // Abstandsgrenzen des wechselnden Fahrzeugs mit seinen beiden Spuren.
  const frontByLane: VehicleOnRoad[] = [];
  for (const vehicle of vehicles.sort((a, b) => b.distanceKm - a.distanceKm)) {
    for (const lane of vehicle.lanes) {
      const front = frontByLane[lane];
      if (front) {
        const spaceKm = front.distanceKm - vehicle.distanceKm - bumperGap(front.kind, vehicle.kind) / HIGHWAY_PX_PER_KM;
        vehicle.speedKmh = Math.min(vehicle.speedKmh, front.speedKmh + (Math.max(0, spaceKm) * 3600) / dt);
      }
      frontByLane[lane] = vehicle;
    }
  }

  for (const { car, speedKmh } of traffic) {
    car.speedKmh = speedKmh;
    car.distanceKm += ((speedKmh - player.speedKmh) * dt) / 3600;
    const diff = car.targetLane - car.lanePos;
    const laneStep = LANE_CHANGE_PER_SEC * dt;
    if (Math.abs(diff) <= laneStep) {
      car.lanePos = car.targetLane;
      if (car.pendingLane === null) car.blinkDir = 0;
    } else {
      car.lanePos += Math.sign(diff) * laneStep;
    }
  }
  recycleOffscreenCars(cars, playerY, viewH, limit, maxLane);
  return player.speedKmh;
}

function recycleOffscreenCars(cars: HighwayCar[], playerY: number, viewH: number, limit: number, maxLane: number): void {
  for (const car of cars) {
    const y = playerY - car.distanceKm * HIGHWAY_PX_PER_KM;
    if (y >= -360 && y <= viewH + 220) continue;
    const home = car.kind === 'truck' ? maxLane : car.kind === 'fast' ? 0 : 1;
    const spawnY = y < -360 ? viewH + 140 : -180 - Math.random() * 150;
    const distanceKm = (playerY - spawnY) / HIGHWAY_PX_PER_KM;
    const speedKmh = Math.min(limit, car.baseDesired);
    if (!laneIsClear(cars, home, distanceKm, speedKmh)) continue;
    car.distanceKm = distanceKm;
    car.speedKmh = speedKmh;
    car.targetLane = home;
    car.lanePos = home;
    car.pendingLane = null;
    car.blinkDir = 0;
    car.blinkHold = 0;
  }
}

export function preferredPlayerLane(speedKmh: number, rightLaneOpen: boolean): number {
  if (!rightLaneOpen) return speedKmh <= 70 ? 1 : 0;
  if (speedKmh <= 100) return 2;
  if (speedKmh <= 132) return 1;
  return 0;
}

export function laneIsClear(cars: HighwayCar[], lane: number, distanceKm: number, speedKmh: number, rangePx = 168): boolean {
  return cars.every(car => !occupiedLanes(car).includes(lane) || hasMergeRoom(distanceKm, speedKmh, car, rangePx));
}

export function leadVehicle(cars: HighwayCar[], lane: number, rangePx: number): HighwayCar | null {
  let nearest: HighwayCar | null = null;
  let clearance = Infinity;
  for (const car of cars) {
    if (car.distanceKm <= 0 || !occupiedLanes(car).includes(lane)) continue;
    const distance = car.distanceKm * HIGHWAY_PX_PER_KM;
    if (distance >= rangePx) continue;
    const gap = distance - bumperGap('player', car.kind);
    if (gap < clearance) {
      nearest = car;
      clearance = gap;
    }
  }
  return nearest;
}

export function followSpeedKmh(maxKmh: number, gapPx: number, leadKmh: number, minGap = 78): number {
  const comfort = minGap + 122;
  if (gapPx <= minGap) return Math.min(maxKmh, leadKmh);
  if (gapPx >= comfort) return maxKmh;
  const t = (gapPx - minGap) / (comfort - minGap);
  return Math.min(maxKmh, leadKmh) + (maxKmh - Math.min(maxKmh, leadKmh)) * t * t;
}

export function countSpriteOverlaps(cars: HighwayCar[], playerLanes: number[]): number {
  let count = 0;
  for (const car of cars) {
    const near = playerLanes.some(lane => Math.abs(car.lanePos - lane) <= 0.48);
    if (near && Math.abs(car.distanceKm) * HIGHWAY_PX_PER_KM < bumperGap('player', car.kind) - 16) count += 1;
  }
  for (let i = 0; i < cars.length; i++) {
    for (let j = i + 1; j < cars.length; j++) {
      if (Math.abs(cars[i].lanePos - cars[j].lanePos) > 0.48) continue;
      if (Math.abs(cars[i].distanceKm - cars[j].distanceKm) * HIGHWAY_PX_PER_KM < bumperGap(cars[i].kind, cars[j].kind) - 16) count += 1;
    }
  }
  return count;
}
