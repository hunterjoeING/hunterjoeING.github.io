import type { PassName } from '../types';
import { buildPassCourse, PASS_HALF_WIDTH, PASS_LANE_OFFSET, passOffset, passSample } from './AlpineRoad';
import type { PassCourse, PassPoint, PassSpan } from './AlpineRoad';

const PX_PER_KMH = 3;
const OVERTAKE_MARGIN_PX = 150;
const ONCOMING_NOTICE_PX = 270;
export const PASS_NEAR_MISS_STRESS = 8;
export const PASS_FOLLOW_MIN_PER_SECOND = 0.28;

interface IcePatch {
  center: PassPoint;
  alongPx: number;
  vertices: PassPoint[];
}

interface PassVehicle {
  kind: 'truck' | 'oncoming' | 'breakdown';
  startPx: number;
  sidePx: number;
  speedKmh: number;
}

export interface PassLayout extends PassCourse {
  ice: IcePatch[];
  passingZones: PassSpan[];
  truck: PassVehicle;
  oncoming: PassVehicle[];
  breakdown: PassVehicle & { trianglePx: number; hazardLights: true };
}

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function generateIce(course: PassCourse, random: () => number, hard: boolean): IcePatch[] {
  const patch = (alongPx: number, width: number, sidePx: number): IcePatch => {
    const length = 24 + random() * (hard ? 84 : 68);
    const skew = (random() - 0.5) * 44;
    const vertices = Array.from({ length: 14 }, (_, i) => {
      const angle = (i + random() * 0.42) * 2 * Math.PI / 14;
      const radius = 0.72 + 0.28 * random();
      const side = sidePx + Math.sin(angle) * width * radius;
      const along = alongPx + Math.cos(angle) * length * radius + Math.sin(angle) * skew;
      return passOffset(passSample(course, along), side);
    });
    return { alongPx, center: passOffset(passSample(course, alongPx), sidePx), vertices };
  };
  const ice = course.bends.flatMap(([entry, exit], i) => [
    patch(entry - 20 - random() * 68, 18 + random() * 11, PASS_LANE_OFFSET),
    patch(entry + (exit - entry) * (0.40 + random() * 0.2),
      i % 2 ? 56 + random() * 9 : 18 + random() * 12, i % 2 ? 0 : PASS_LANE_OFFSET)
  ]);
  // Shadow from the slope falls mainly on the westbound traverses.
  course.straights.forEach(([start, end], i) => {
    if (random() >= (i % 2 ? 0.9 : 0.28)) return;
    ice.push(patch(start + (end - start) * (0.24 + random() * 0.46), 15 + random() * 14,
      random() < 0.7 ? PASS_LANE_OFFSET : -PASS_LANE_OFFSET));
  });
  return ice.sort((a, b) => a.alongPx - b.alongPx);
}

export function buildPassRoad(name: PassName, seed = 0): PassLayout {
  const hard = name === 'Jaufenpass';
  const random = seededRandom(seed ^ (hard ? 0x44af : 0x179));
  const road = buildPassCourse(name);
  const passingZones = road.straights.map(([start, end]) =>
    [start + OVERTAKE_MARGIN_PX, end - OVERTAKE_MARGIN_PX] as const);
  const [breakdownStart, breakdownEnd] = road.straights[hard ? 4 : 2];
  const breakdownPx = breakdownStart + (breakdownEnd - breakdownStart) * (0.57 + random() * 0.18);
  return {
    ...road,
    ice: generateIce(road, random, hard),
    passingZones,
    truck: { kind: 'truck', startPx: 255 + random() * 90, sidePx: PASS_LANE_OFFSET, speedKmh: 27 + Math.floor(random() * 8) },
    oncoming: Array.from({ length: hard ? 5 : 3 }, (_, i) => ({
      kind: 'oncoming', startPx: road.length * ((i + 1.1 + random() * 0.65) / (hard ? 6 : 4)),
      sidePx: -PASS_LANE_OFFSET, speedKmh: 40 + Math.floor(random() * 10)
    })),
    breakdown: { kind: 'breakdown', startPx: breakdownPx, sidePx: PASS_HALF_WIDTH - 14,
      speedKmh: 0, trianglePx: breakdownPx - 118, hazardLights: true }
  };
}

export function passOnIce(road: Pick<PassLayout, 'ice'>, { x, y }: PassPoint): boolean {
  return road.ice.some(({ vertices }) => {
    let inside = false;
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      const a = vertices[i];
      const b = vertices[j];
      if ((a.y > y) !== (b.y > y) && x < a.x + (b.x - a.x) * (y - a.y) / (b.y - a.y)) inside = !inside;
    }
    return inside;
  });
}

export function passVehiclePose(road: PassLayout, vehicle: PassVehicle, elapsedSec: number) {
  const opposing = vehicle.kind === 'oncoming';
  const direction = opposing ? -1 : 1;
  const speedPx = vehicle.speedKmh * PX_PER_KMH;
  const raw = vehicle.startPx + direction * elapsedSec * speedPx;
  // Opposing cars return after a gap. The truck continues off the course after the exit.
  const period = road.length + 750;
  const along = opposing ? ((raw + 80) % period + period) % period - 80 : raw;
  if (along < 0 || along > road.length) return;
  const sample = passSample(road, along);
  const avoidParked = vehicle.kind === 'truck' ? Math.max(0, Math.min(1,
    (155 - Math.abs(along - road.breakdown.startPx)) / 90)) : 0;
  const position = passOffset(sample, vehicle.sidePx - 19 * avoidParked);
  return { ...position, along, speedPx, rotation: Math.atan2(sample.dy * direction, sample.dx * direction) + Math.PI / 2 };
}

export function passOvertake(road: Pick<PassLayout, 'passingZones'>, along: number, oncoming: readonly number[]) {
  const inZone = road.passingZones.some(([start, end]) => along >= start && along <= end);
  const conflict = oncoming.some(marker => marker >= along - 40 && marker - along <= ONCOMING_NOTICE_PX);
  return { inZone, conflict, allowed: inZone && !conflict };
}

/** Leave a bumper gap while the player is following in the truck's lane. */
export function passFollowingCap(truck: { along: number; speedPx: number } | undefined, along: number, side: number) {
  if (!truck || side < 7) return Infinity;
  const gap = truck.along - along;
  return gap > 0 && gap < 155 ? Math.max(0, Math.min(truck.speedPx + 80, truck.speedPx + (gap - 85) * 3)) : Infinity;
}
