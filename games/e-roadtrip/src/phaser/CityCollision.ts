import type { Rect } from './PlaceStyles';

export interface Point {
  x: number;
  y: number;
}

export interface Capsule {
  a: Point;
  b: Point;
  radius: number;
}

// Texture coordinates of the opaque footprints, excluding cast shadows.
export const CAR_SIZE = { w: 32, h: 52 };
export const CAR_CHASSIS: Rect = { x: 5, y: 4, w: 22, h: 44 };
export const CAR_FOOTPRINT: Rect = { ...CAR_CHASSIS, x: 2, w: 28 }; // including wheels
export const TRUCK_SIZE = { w: 36, h: 92 };
export const TRUCK_FOOTPRINT: Rect = { x: 2, y: 4, w: 32, h: 84 };
export const CHARGER_SIZE = { w: 20, h: 20 };
export const CHARGER_FOOTPRINT: Rect = { x: 3, y: 2, w: 14, h: 14 };
export const WHEEL_STOP_SIZE = { w: 28, h: 6 };
export const MCD_KIOSK = { size: { w: 72, h: 48 }, footprint: { x: 2, y: 2, w: 66, h: 40 } };
export const BISTRO_KIOSK = { size: { w: 64, h: 44 }, footprint: { x: 2, y: 2, w: 58, h: 36 } };

export function spriteFootprint(
  x: number, y: number, size: { w: number; h: number }, box: Rect, scale: number
): Rect {
  return {
    x: x + (box.x - size.w / 2) * scale,
    y: y + (box.y - size.h / 2) * scale,
    w: box.w * scale,
    h: box.h * scale
  };
}

export function vehicleCapsule(x: number, y: number, rotation: number, cyclist = false): Capsule {
  const radius = cyclist ? 5 : CAR_FOOTPRINT.w / 2;
  const halfSpine = (cyclist ? 11 : CAR_FOOTPRINT.h / 2) - radius;
  const dx = Math.sin(rotation) * halfSpine;
  const dy = -Math.cos(rotation) * halfSpine;
  return { a: { x: x - dx, y: y - dy }, b: { x: x + dx, y: y + dy }, radius };
}

export function circleAt(x: number, y: number, radius: number): Capsule {
  const center = { x, y };
  return { a: center, b: center, radius };
}

function pointSegmentDistanceSq(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSq = dx * dx + dy * dy;
  const t = lengthSq ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSq)) : 0;
  return (p.x - a.x - dx * t) ** 2 + (p.y - a.y - dy * t) ** 2;
}

function cross(a: Point, b: Point, p: Point): number {
  return (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
}

function segmentDistanceSq(a: Point, b: Point, c: Point, d: Point): number {
  if (cross(a, b, c) * cross(a, b, d) < 0 && cross(c, d, a) * cross(c, d, b) < 0) return 0;
  return Math.min(
    pointSegmentDistanceSq(a, c, d), pointSegmentDistanceSq(b, c, d),
    pointSegmentDistanceSq(c, a, b), pointSegmentDistanceSq(d, a, b)
  );
}

export function capsulesOverlap(first: Capsule, second: Capsule): boolean {
  return segmentDistanceSq(first.a, first.b, second.a, second.b) < (first.radius + second.radius) ** 2;
}

export function capsuleOverlapsRect({ a, b, radius }: Capsule, rect: Rect): boolean {
  const right = rect.x + rect.w;
  const bottom = rect.y + rect.h;
  if (
    Math.max(a.x, b.x) + radius <= rect.x || Math.min(a.x, b.x) - radius >= right ||
    Math.max(a.y, b.y) + radius <= rect.y || Math.min(a.y, b.y) - radius >= bottom
  ) return false;

  const inside = (p: Point) => p.x >= rect.x && p.x <= right && p.y >= rect.y && p.y <= bottom;
  if (inside(a) || inside(b)) return true;
  const topLeft = { x: rect.x, y: rect.y };
  const topRight = { x: right, y: rect.y };
  const bottomLeft = { x: rect.x, y: bottom };
  const bottomRight = { x: right, y: bottom };
  const limit = radius * radius;
  return segmentDistanceSq(a, b, topLeft, topRight) < limit ||
    segmentDistanceSq(a, b, topRight, bottomRight) < limit ||
    segmentDistanceSq(a, b, bottomRight, bottomLeft) < limit ||
    segmentDistanceSq(a, b, bottomLeft, topLeft) < limit;
}

export function capsuleInsideWorld({ a, b, radius }: Capsule, w: number, h: number): boolean {
  return Math.min(a.x, b.x) >= radius && Math.max(a.x, b.x) <= w - radius &&
    Math.min(a.y, b.y) >= radius && Math.max(a.y, b.y) <= h - radius;
}
