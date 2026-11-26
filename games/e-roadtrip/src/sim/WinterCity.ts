import { INNSBRUCK, INNSBRUCK_APPROACHES, INNSBRUCK_HOTEL, INNSBRUCK_HOTEL_LABEL } from '../data/cityLayouts/innsbruck';
import { MARIENPLATZ_SPAWN, MUENCHEN } from '../data/cityLayouts/muenchen';
import type { CityPoint, CityRect, CityRoad, RoadKind, WinterCityLayout } from '../data/cityLayouts/types';

export const WINTER_CITY_MINUTES = { muenchen_start: 5, innsbruck_finish: 4 };
export type WinterCityPreset = keyof typeof WINTER_CITY_MINUTES;

const INNSBRUCK_HOTEL_POINT = {
  x: INNSBRUCK_HOTEL.x + INNSBRUCK_HOTEL.w / 2,
  y: INNSBRUCK_HOTEL.y + INNSBRUCK_HOTEL.h / 2
};

export function winterCityRoute(routeId: string) {
  const isZirler = routeId === 'l3_route_b_zirler';
  const munichExit = isZirler ? 'a95' : 'a8Salzburg';
  const innExit = isZirler ? 'west' : 'ost';
  return {
    munichExit,
    munichLabel: routeId === 'l3_route_c_achenpass'
      ? 'A8 Salzburg · Ausfahrt Holzkirchen folgen'
      : MUENCHEN.signs[munichExit].label,
    innExit,
    innsbruckApproach: isZirler ? INNSBRUCK_APPROACHES.west : INNSBRUCK_APPROACHES.east,
    innRamp: { x: INNSBRUCK.signs[innExit].x, y: 1040 }
  } as const;
}

export function isWinterCity(preset: string): preset is WinterCityPreset {
  return preset === 'muenchen_start' || preset === 'innsbruck_finish';
}

function exitZone(point: CityPoint): CityRect {
  return { x: point.x - 43, y: point.y - 41, w: 86, h: 82 };
}

export function winterCityDrive(preset: WinterCityPreset, routeId: string) {
  const route = winterCityRoute(routeId);
  const layout: WinterCityLayout = preset === 'muenchen_start' ? MUENCHEN : INNSBRUCK;
  if (preset === 'muenchen_start') {
    const goal = MUENCHEN.signs[route.munichExit];
    return {
      layout, goal, target: exitZone(goal), spawn: MARIENPLATZ_SPAWN, passThrough: true,
      label: route.munichLabel, title: `München · Marienplatz → ${route.munichLabel}`,
      wrongExits: Object.entries(MUENCHEN.signs).filter(([id]) => id !== route.munichExit)
        .map(([, sign]) => ({ ...sign, zone: exitZone(sign) }))
    };
  }
  return {
    layout, goal: INNSBRUCK_HOTEL_POINT, target: INNSBRUCK_HOTEL, spawn: route.innsbruckApproach,
    via: route.innRamp, passThrough: false, label: INNSBRUCK_HOTEL_LABEL,
    title: `${route.innsbruckApproach.label} → ${INNSBRUCK_HOTEL_LABEL}`, wrongExits: []
  };
}

export function pointInCityRect(point: CityPoint, rect: CityRect): boolean {
  return point.x >= rect.x && point.x <= rect.x + rect.w &&
    point.y >= rect.y && point.y <= rect.y + rect.h;
}

export interface CityRoadSpan {
  a: CityPoint;
  b: CityPoint;
  kind: RoadKind;
}

export const WINTER_ROAD_WIDTHS: Record<RoadKind, number> = { street: 84, ring: 104, motorway: 112 };

export function cityRoadSpans(roads: CityRoad[]): CityRoadSpan[] {
  return roads.flatMap(({ kind, points }) => points.slice(1).map((b, index) => ({ a: points[index], b, kind })));
}

export function cityRoadBounds({ a, b, kind }: CityRoadSpan): CityRect {
  const width = WINTER_ROAD_WIDTHS[kind];
  return { x: Math.min(a.x, b.x) - width / 2, y: Math.min(a.y, b.y) - width / 2,
    w: Math.abs(b.x - a.x) + width, h: Math.abs(b.y - a.y) + width };
}

export function cityRectsOverlap(a: CityRect, b: CityRect): boolean {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}

/** Split water into dry-bridge and bank-to-bank collision areas. */
export function subtractCityRect(rect: CityRect, cut: CityRect): CityRect[] {
  if (!cityRectsOverlap(rect, cut)) return [rect];
  const left = Math.max(rect.x, cut.x);
  const right = Math.min(rect.x + rect.w, cut.x + cut.w);
  const top = Math.max(rect.y, cut.y);
  const bottom = Math.min(rect.y + rect.h, cut.y + cut.h);
  return [
    { x: rect.x, y: rect.y, w: rect.w, h: top - rect.y },
    { x: rect.x, y: bottom, w: rect.w, h: rect.y + rect.h - bottom },
    { x: rect.x, y: top, w: left - rect.x, h: bottom - top },
    { x: right, y: top, w: rect.x + rect.w - right, h: bottom - top }
  ].filter(piece => piece.w > 0 && piece.h > 0);
}

export function winterCityWater(layout: WinterCityLayout, asphalt: CityRect[]): CityRect[] {
  return [...asphalt, ...(layout.islands ?? [])].reduce(
    (pieces, cut) => pieces.flatMap(rect => subtractCityRect(rect, cut)), layout.water
  );
}

interface Link { node: Node; distance: number }
interface Node extends CityPoint { links: Link[]; remaining: number; next?: Node }

const distance = (a: CityPoint, b: CityPoint): number => Math.hypot(a.x - b.x, a.y - b.y);

function project(point: CityPoint, a: CityPoint, b: CityPoint): CityPoint {
  return {
    x: Math.max(Math.min(a.x, b.x), Math.min(point.x, Math.max(a.x, b.x))),
    y: Math.max(Math.min(a.y, b.y), Math.min(point.y, Math.max(a.y, b.y)))
  };
}

function onSpan(point: CityPoint, { a, b }: CityRoadSpan): boolean {
  const onto = project(point, a, b);
  return onto.x === point.x && onto.y === point.y;
}

function crossing(a: CityRoadSpan, b: CityRoadSpan): CityPoint[] {
  const aVertical = a.a.x === a.b.x;
  const bVertical = b.a.x === b.b.x;
  if (aVertical === bVertical) return [];
  const point = aVertical ? { x: a.a.x, y: b.a.y } : { x: b.a.x, y: a.a.y };
  return onSpan(point, a) && onSpan(point, b) ? [point] : [];
}

/** Orthogonal road graph. Compute the routes to the goal once per scene. */
export function winterCityNavigator(spans: CityRoadSpan[], goal: CityPoint) {
  const points = [goal, ...spans.flatMap(({ a, b }) => [a, b])];
  spans.forEach((span, index) => {
    for (const other of spans.slice(index + 1)) points.push(...crossing(span, other));
  });
  const nodes = new Map<string, Node>();
  const key = ({ x, y }: CityPoint) => `${x},${y}`;
  for (const point of points) nodes.set(key(point), { ...point, links: [], remaining: Infinity });

  const edges: Array<{ from: Node; to: Node }> = [];
  for (const span of spans) {
    const along = [...nodes.values()].filter(node => onSpan(node, span))
      .sort((a, b) => a.x - b.x || a.y - b.y);
    for (let i = 1; i < along.length; i++) {
      const from = along[i - 1];
      const to = along[i];
      const length = distance(from, to);
      from.links.push({ node: to, distance: length });
      to.links.push({ node: from, distance: length });
      edges.push({ from, to });
    }
  }

  nodes.get(key(goal))!.remaining = 0;
  const pending = new Set(nodes.values());
  while (pending.size) {
    const closest = [...pending].reduce((a, b) => a.remaining <= b.remaining ? a : b);
    if (!Number.isFinite(closest.remaining)) break;
    pending.delete(closest);
    for (const { node, distance: length } of closest.links) {
      const total = closest.remaining + length;
      if (total >= node.remaining) continue;
      node.remaining = total;
      node.next = closest;
    }
  }

  return (point: CityPoint) => {
    let bestDistance = Infinity;
    let bestOffset = Infinity;
    let aim = goal;
    for (const { from, to } of edges) {
      const onto = project(point, from, to);
      const offset = distance(point, onto);
      if (offset > bestOffset + 26) continue;
      // Follow the closest road. Near intersections, favour the shorter continuation.
      for (const end of [from, to]) {
        const total = distance(onto, end) + end.remaining + offset;
        if (offset > bestOffset - 26 && total >= bestDistance) continue;
        bestOffset = offset;
        bestDistance = total;
        aim = offset > 48 ? onto : distance(onto, end) < 34 && end.next ? end.next : end;
      }
    }
    return { aim, distance: bestDistance };
  };
}
