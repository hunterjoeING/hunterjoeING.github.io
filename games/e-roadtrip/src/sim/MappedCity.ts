import type { CityCrosswalk, CityPoint, MappedCityRoad } from '../data/cityLayouts/types';

export interface MappedRoadSpan {
  a: CityPoint;
  b: CityPoint;
  road: MappedCityRoad;
  length: number;
}

export function mappedRoadSpans(roads: MappedCityRoad[]): MappedRoadSpan[] {
  return roads.flatMap(road => road.points.slice(1).map((b, index) => {
    const a = road.points[index];
    return { a, b, road, length: Math.hypot(b.x - a.x, b.y - a.y) };
  }));
}

export function projectToCityRoad(point: CityPoint, { a, b, length }: MappedRoadSpan) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / (length * length)));
  const x = a.x + t * dx;
  const y = a.y + t * dy;
  return { x, y, along: t * length, offset: Math.hypot(point.x - x, point.y - y) };
}

export function mappedRoadContains(spans: MappedRoadSpan[], point: CityPoint, margin = 0): boolean {
  return spans.some(span => {
    const { a, b, road } = span;
    const radius = road.width / 2 + margin;
    if (point.x < Math.min(a.x, b.x) - radius || point.x > Math.max(a.x, b.x) + radius ||
        point.y < Math.min(a.y, b.y) - radius || point.y > Math.max(a.y, b.y) + radius) return false;
    return projectToCityRoad(point, span).offset <= radius;
  });
}

interface Node extends CityPoint {
  approaches: { from: Node; span: MappedRoadSpan }[];
  cost: number;
  distance: number;
  next?: Node;
}

const keyOf = ({ x, y }: CityPoint) => `${x},${y}`;
const roadCost = ({ road }: MappedRoadSpan) => road.navigationCost ?? (road.cobbled ? 2.5 : 1);

/** Junctions are explicit shared vertices, including the slips into the one-way roundabout. */
export function mappedCityNavigator(spans: MappedRoadSpan[], goal: CityPoint) {
  const nodes = new Map<string, Node>();
  const getNode = (point: CityPoint): Node => {
    const key = keyOf(point);
    let node = nodes.get(key);
    if (!node) {
      node = { ...point, cost: Infinity, distance: Infinity, approaches: [] };
      nodes.set(key, node);
    }
    return node;
  };
  const edges = spans.map(span => {
    const a = getNode(span.a);
    const b = getNode(span.b);
    b.approaches.push({ from: a, span });
    if (!span.road.oneWay) a.approaches.push({ from: b, span });
    return { span, a, b };
  });
  const target = getNode(goal);
  target.cost = target.distance = 0;
  const pending = new Set(nodes.values());
  while (pending.size) {
    const closest = [...pending].reduce((a, b) => a.cost <= b.cost ? a : b);
    if (!Number.isFinite(closest.cost)) break;
    pending.delete(closest);
    for (const { from, span } of closest.approaches) {
      const cost = closest.cost + span.length * roadCost(span);
      if (cost >= from.cost) continue;
      from.cost = cost;
      from.distance = closest.distance + span.length;
      from.next = closest;
    }
  }

  return (point: CityPoint) => {
    let aim = goal;
    let bestCost = Infinity;
    let distance = Infinity;
    const projections = edges.map(edge => ({ ...edge, onto: projectToCityRoad(point, edge.span) }));
    const nearest = Math.min(...projections.map(({ onto }) => onto.offset));
    for (const { span, a, b, onto } of projections) {
      if (onto.offset > nearest + 22) continue;
      for (const end of span.road.oneWay ? [b] : [a, b]) {
        const toEnd = end === a ? onto.along : span.length - onto.along;
        const cost = toEnd * roadCost(span) + end.cost + onto.offset * 3;
        if (cost >= bestCost) continue;
        bestCost = cost;
        distance = toEnd + end.distance + onto.offset;
        aim = onto.offset > 36 ? onto : end;
        if (onto.offset <= 36 && toEnd < 18 && end.next) {
          const length = Math.hypot(end.next.x - end.x, end.next.y - end.y);
          const look = Math.min(1, 52 / length);
          aim = { x: end.x + (end.next.x - end.x) * look, y: end.y + (end.next.y - end.y) * look };
        }
      }
    }
    return { aim, distance };
  };
}

/** Offset a lane in right-hand traffic, keeping adjacent corner offsets joined. */
export function mappedCityLane(path: CityPoint[], lane: number): CityPoint[] {
  const normal = (from: CityPoint, to: CityPoint) => {
    const x = to.x - from.x;
    const y = to.y - from.y;
    const length = Math.hypot(x, y);
    return { x: -y / length, y: x / length };
  };
  const closed = keyOf(path[0]) === keyOf(path[path.length - 1]);
  return path.map((point, index) => {
    const prev = path[index - 1] ?? (closed ? path[path.length - 2] : undefined);
    const next = path[index + 1] ?? (closed ? path[1] : undefined);
    const before = prev && normal(prev, point);
    const after = next && normal(point, next);
    const a = (before ?? after)!;
    const b = (after ?? before)!;
    const miter = lane / Math.max(0.65, 1 + a.x * b.x + a.y * b.y);
    return { x: point.x + (a.x + b.x) * miter, y: point.y + (a.y + b.y) * miter };
  });
}

export function mappedCrosswalk({ x, y, axis, width }: CityCrosswalk) {
  const ew = axis === 'ew';
  const curb = width / 2 + 7;
  const sideA = { x: x - (ew ? 0 : curb), y: y - (ew ? curb : 0) };
  const sideB = { x: x + (ew ? 0 : curb), y: y + (ew ? curb : 0) };
  const offset = (p: CityPoint, amount: number) => ({ x: p.x + (ew ? amount : 0), y: p.y + (ew ? 0 : amount) });
  return {
    sideA, sideB, sidewalkPathA: [sideA, offset(sideA, -38)], sidewalkPathB: [sideB, offset(sideB, 38)],
    bounds: { x: x - (ew ? 18 : width / 2), y: y - (ew ? width / 2 : 18), w: ew ? 36 : width, h: ew ? width : 36 }
  };
}
