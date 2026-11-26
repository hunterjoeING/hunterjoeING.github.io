import type { Point } from './CityCollision';
import type { Rect } from './PlaceStyles';

interface RoutePoint extends Point {
  reverse?: boolean;
  park?: boolean;
  spawn?: boolean;
}

export interface TrafficRoute {
  tex: string;
  path: RoutePoint[];
  speed: number;
  startIndex: number;
  holdSec?: number;
  isPolice?: boolean;
  isCyclist?: boolean;
}

/** Rechtsverkehr: ostwärts unten, südwärts links von der Mittellinie. */
export function laneCenter(road: Rect, axis: 'ew' | 'ns', direction: 1 | -1, offset = 0.25): number {
  return axis === 'ew'
    ? road.y + road.h * (0.5 + direction * offset)
    : road.x + road.w * (0.5 - direction * offset);
}

export function trafficRoute(
  tex: string,
  speed: number,
  points: RoutePoint[],
  options: Pick<TrafficRoute, 'holdSec' | 'isPolice' | 'isCyclist'> = {}
): TrafficRoute {
  const path: RoutePoint[] = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const before = points[i - 1];
    const after = points[i + 1];
    if (!before || !after || point.spawn || point.reverse || after.reverse || point.park) {
      path.push(point);
      continue;
    }
    const inX = point.x - before.x;
    const inY = point.y - before.y;
    const outX = after.x - point.x;
    const outY = after.y - point.y;
    if (inX * outY === inY * outX) {
      path.push(point);
      continue;
    }
    const lenIn = Math.hypot(inX, inY);
    const lenOut = Math.hypot(outX, outY);
    const radius = Math.min(32, lenIn * 0.4, lenOut * 0.4);
    const start = { x: point.x - (inX / lenIn) * radius, y: point.y - (inY / lenIn) * radius };
    const end = { x: point.x + (outX / lenOut) * radius, y: point.y + (outY / lenOut) * radius };
    // Die Ein- und Ausfahrt bleiben auf ihrer Spur. Die Ecke dazwischen ist eine Bézierkurve.
    for (let j = 0; j <= 8; j++) {
      const t = j / 8;
      const rest = 1 - t;
      path.push({
        x: rest ** 2 * start.x + 2 * rest * t * point.x + t ** 2 * end.x,
        y: rest ** 2 * start.y + 2 * rest * t * point.y + t ** 2 * end.y
      });
    }
  }
  return { tex, path, speed, startIndex: Math.max(0, path.findIndex(point => point.spawn)), ...options };
}
