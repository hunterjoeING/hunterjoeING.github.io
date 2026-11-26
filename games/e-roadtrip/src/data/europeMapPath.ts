import type { HighwayEdge } from '../types';

export function getEdgePixelLength(edge: HighwayEdge): number {
  let len = 0;
  for (let i = 0; i < edge.waypoints.length - 1; i++) {
    const a = edge.waypoints[i];
    const b = edge.waypoints[i + 1];
    len += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return Math.max(1, len);
}

export function getEdgeWaypoints(edge: HighwayEdge, reverse: boolean): HighwayEdge['waypoints'] {
  return reverse ? [...edge.waypoints].reverse() : edge.waypoints;
}

export function getPointAlongEdge(
  edge: HighwayEdge,
  progress01: number,
  reverse = false
): { x: number; y: number; angleRad: number } {
  const pts = getEdgeWaypoints(edge, reverse);
  if (pts.length === 0) return { x: 0, y: 0, angleRad: 0 };
  if (pts.length === 1) return { x: pts[0].x, y: pts[0].y, angleRad: 0 };

  const clamped = Math.max(0, Math.min(1, progress01));
  const segLens: number[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const l = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
    segLens.push(l);
    total += l;
  }
  if (total < 0.001) return { x: pts[0].x, y: pts[0].y, angleRad: 0 };

  let targetDist = clamped * total;
  for (let i = 0; i < segLens.length; i++) {
    if (targetDist <= segLens[i] || i === segLens.length - 1) {
      const t = segLens[i] > 0 ? targetDist / segLens[i] : 0;
      const a = pts[i];
      const b = pts[i + 1];
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        angleRad: Math.atan2(b.y - a.y, b.x - a.x)
      };
    }
    targetDist -= segLens[i];
  }
  const last = pts[pts.length - 1];
  return { x: last.x, y: last.y, angleRad: 0 };
}
