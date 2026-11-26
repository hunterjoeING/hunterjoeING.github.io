import type { PassName } from '../types';

export const PASS_HALF_WIDTH = 68;
export const PASS_LANE_OFFSET = 33;
const SAMPLE_SPACING = 24;

export interface PassPoint { x: number; y: number }
export interface PassRoadPoint extends PassPoint { dx: number; dy: number; alongPx: number }
export type PassSpan = readonly [start: number, end: number];

export interface PassCourse {
  path: PassRoadPoint[];
  bends: PassSpan[];
  straights: PassSpan[];
  length: number;
  worldH: number;
  summitPx?: number;
}

export function buildPassCourse(name: PassName): PassCourse {
  const hard = name === 'Jaufenpass';
  const radius = hard ? 96 : 116;
  const turns = hard ? 5 : 3;
  const path: PassRoadPoint[] = [];
  const bends: PassSpan[] = [];
  const straights: PassSpan[] = [];
  let length = 0;
  let x = 155;
  let y = hard ? 1240 : 880;
  const worldH = y + 170;
  const add = (nextX: number, nextY: number, dx: number, dy: number) => {
    const previous = path[path.length - 1];
    if (previous) length += Math.hypot(nextX - previous.x, nextY - previous.y);
    path.push({ x: nextX, y: nextY, dx, dy, alongPx: length });
  };
  add(x, y, 1, 0);

  for (let row = 0; row <= turns; row++) {
    const direction = row % 2 === 0 ? 1 : -1;
    const end = row === turns ? 155 : direction === 1 ? 1510 - row * 28 : 290 + row * 24;
    const start = length;
    const steps = Math.ceil(Math.abs(end - x) / SAMPLE_SPACING);
    for (let i = 1; i <= steps; i++) add(x + (end - x) * i / steps, y, direction, 0);
    straights.push([start, length]);
    if (row === turns) break;
    const entry = length;
    for (let i = 1; i <= 16; i++) {
      const angle = Math.PI * i / 16;
      add(end + direction * radius * Math.sin(angle), y - radius * (1 - Math.cos(angle)),
        direction * Math.cos(angle), -Math.sin(angle));
    }
    bends.push([entry, length]);
    x = end;
    y -= radius * 2;
  }
  const summit = hard ? straights[3] : undefined;
  return { path, bends, straights, length, worldH, summitPx: summit && (summit[0] + summit[1]) / 2 };
}

export function passOffset(point: PassRoadPoint, side: number): PassPoint {
  return { x: point.x - point.dy * side, y: point.y + point.dx * side };
}

export function passSample({ path, length }: PassCourse, marker: number): PassRoadPoint {
  const alongPx = Math.max(0, Math.min(length, marker));
  let lo = 0;
  let hi = path.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (path[mid].alongPx <= alongPx) lo = mid;
    else hi = mid;
  }
  const a = path[lo];
  const b = path[hi];
  const t = (alongPx - a.alongPx) / (b.alongPx - a.alongPx);
  const mix = (from: number, to: number) => from + (to - from) * t;
  const dx = mix(a.dx, b.dx);
  const dy = mix(a.dy, b.dy);
  const tangent = Math.hypot(dx, dy);
  return { x: mix(a.x, b.x), y: mix(a.y, b.y), dx: dx / tangent, dy: dy / tangent, alongPx };
}

export function passRoadPosition({ path }: Pick<PassCourse, 'path'>, { x, y }: PassPoint) {
  let distanceSq = Infinity;
  let along = 0;
  let side = 0;
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1];
    const b = path[i];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = b.alongPx - a.alongPx;
    const t = Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / (length * length)));
    const ox = x - a.x - t * dx;
    const oy = y - a.y - t * dy;
    const d2 = ox * ox + oy * oy;
    if (d2 >= distanceSq) continue;
    distanceSq = d2;
    along = a.alongPx + t * length;
    side = (-dy * ox + dx * oy) / length;
  }
  return { distanceSq, along, side };
}
