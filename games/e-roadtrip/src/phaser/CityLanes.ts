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

export function cityTrafficRoutes(avenues: Rect[], streets: Rect[]): TrafficRoute[] {
  const [top, middle] = avenues;
  const [west, center, east] = streets;
  const topEast = laneCenter(top, 'ew', 1);
  const midEast = laneCenter(middle, 'ew', 1);
  const midWest = laneCenter(middle, 'ew', -1);
  const westSouth = laneCenter(west, 'ns', 1);
  const centerNorth = laneCenter(center, 'ns', -1);
  const centerSouth = laneCenter(center, 'ns', 1);
  const eastNorth = laneCenter(east, 'ns', -1);
  const eastSouth = laneCenter(east, 'ns', 1);
  const outside = -60;
  const bikeNear = 0.42;
  const bikeEast = laneCenter(top, 'ew', 1, bikeNear);
  const bikeWest = laneCenter(middle, 'ew', -1, bikeNear);
  const bikeSouth = laneCenter(west, 'ns', 1, bikeNear);
  const bikeNorth = laneCenter(east, 'ns', -1, bikeNear);
  const bikeDown = laneCenter(east, 'ns', 1, bikeNear);

  return [
    trafficRoute('npc_sedan_blue', 104, [
      { x: westSouth, y: outside }, { x: westSouth, y: topEast },
      { x: 420, y: topEast, spawn: true }, { x: eastNorth, y: topEast }, { x: eastNorth, y: outside }
    ]),
    trafficRoute('npc_van_white', 96, [
      { x: eastSouth, y: outside }, { x: eastSouth, y: 440, spawn: true },
      { x: eastSouth, y: midWest }, { x: outside, y: midWest }
    ]),
    trafficRoute('npc_compact_green', 98, [
      { x: outside, y: midEast }, { x: centerNorth, y: midEast },
      { x: centerNorth, y: 560, spawn: true }, { x: centerNorth, y: outside }
    ]),
    trafficRoute('npc_police', 110, [
      { x: centerSouth, y: outside }, { x: centerSouth, y: 365, spawn: true }, { x: centerSouth, y: midEast },
      { x: eastNorth, y: midEast }, { x: eastNorth, y: outside }
    ], { isPolice: true }),
    trafficRoute('cyclist_0', 60, [
      { x: bikeSouth, y: outside }, { x: bikeSouth, y: bikeEast },
      { x: 330, y: bikeEast, spawn: true }, { x: bikeNorth, y: bikeEast }, { x: bikeNorth, y: outside }
    ], { isCyclist: true }),
    trafficRoute('cyclist_1', 58, [
      { x: bikeDown, y: outside }, { x: bikeDown, y: bikeWest },
      { x: 1610, y: bikeWest, spawn: true }, { x: outside, y: bikeWest }
    ], { isCyclist: true })
  ];
}
