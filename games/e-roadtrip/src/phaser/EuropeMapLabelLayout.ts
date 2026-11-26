import type { MapPoint } from '../data/europeProjection';
import type { BoxRect } from './MapLayout';

export type MapLabelAnchor = 'below' | 'above' | 'left' | 'right' | 'centre' | 'lowerRight' | 'upperRight' | 'lowerLeft';
export const CITY_LABEL_ANCHORS: readonly MapLabelAnchor[] = ['below', 'right', 'left', 'above'];
export const SIRMIONE_LABEL_ANCHORS: readonly MapLabelAnchor[] = ['lowerLeft', ...CITY_LABEL_ANCHORS];
export const KOELN_LABEL_ANCHORS: readonly MapLabelAnchor[] = ['right', 'lowerRight', 'upperRight'];

export interface MapLabelCandidate extends MapPoint {
  id: string;
  /** Measured label size in screen pixels after scaling. */
  width: number;
  height: number;
  priority: number;
  anchors: readonly MapLabelAnchor[];
  radius?: number;
  distance?: number;
}

export interface MapLabelViewport {
  width: number;
  height: number;
  scrollX: number;
  scrollY: number;
  zoom: number;
}

export interface PlacedMapLabel {
  id: string;
  x: number;
  y: number;
  box: BoxRect;
}

export function mapScreenPoint({ x, y }: MapPoint, { width, height, zoom, scrollX, scrollY }: MapLabelViewport): MapPoint {
  const cx = width / 2, cy = height / 2;
  return { x: cx + (x - scrollX - cx) * zoom, y: cy + (y - scrollY - cy) * zoom };
}

function overlaps(a: BoxRect, b: BoxRect, gap = 1): boolean {
  return Math.abs(a.x - b.x) * 2 < a.w + b.w + 2 * gap &&
    Math.abs(a.y - b.y) * 2 < a.h + b.h + 2 * gap;
}

function placeBox(anchor: MapLabelAnchor, p: MapPoint, w: number, h: number, gap: number): BoxRect {
  const right = p.x + gap + w / 2;
  const below = p.y + gap + h / 2;
  const above = p.y - gap - h / 2;
  switch (anchor) {
    case 'below': return { x: p.x, y: below, w, h };
    case 'above': return { x: p.x, y: above, w, h };
    case 'left': return { x: p.x - gap - w / 2, y: p.y, w, h };
    case 'right': return { x: right, y: p.y, w, h };
    case 'lowerRight': return { x: right, y: below, w, h };
    case 'lowerLeft': return { x: p.x - gap - w / 2, y: below, w, h };
    case 'upperRight': return { x: right, y: above, w, h };
    case 'centre': return { ...p, w, h };
  }
}

export function layoutMapLabels(
  candidates: readonly MapLabelCandidate[],
  viewport: MapLabelViewport,
  fixed: readonly BoxRect[] = []
): PlacedMapLabel[] {
  const { width, height, zoom, scrollX, scrollY } = viewport;
  const insideViewport = (x: number, y: number) => x >= 0 && y >= 0 && x <= width && y <= height;
  const occupied = [...fixed];
  const result: PlacedMapLabel[] = [];

  for (const label of [...candidates].sort((a, b) => b.priority - a.priority)) {
    const p = mapScreenPoint(label, viewport);
    if (!insideViewport(p.x, p.y)) continue;
    const r = label.radius ?? 0;
    const dot = { ...p, w: 2 * r, h: 2 * r };
    if (r && occupied.some(box => overlaps(box, dot))) continue;
    for (const anchor of label.anchors) {
      const box = placeBox(anchor, p, label.width, label.height, (label.distance ?? r) + 2);
      if (!insideViewport(box.x - box.w / 2, box.y - box.h / 2) ||
          !insideViewport(box.x + box.w / 2, box.y + box.h / 2) ||
          occupied.some(other => overlaps(other, box))) continue;
      occupied.push(box);
      if (r) occupied.push(dot);
      result.push({
        id: label.id,
        x: scrollX + width / 2 + (box.x - width / 2) / zoom,
        y: scrollY + height / 2 + (box.y - height / 2) / zoom,
        box
      });
      break;
    }
  }

  return result;
}

export function overviewMapZoom(width: number, height: number, bounds: { w: number; h: number }): number {
  return Math.min(width / (bounds.w + 24), height / (bounds.h + 24));
}

export function routeMapView(points: readonly MapPoint[], width: number, height: number) {
  const xs = points.map(p => p.x), ys = points.map(p => p.y);
  const left = Math.min(...xs), right = Math.max(...xs), top = Math.min(...ys), bottom = Math.max(...ys);
  return {
    x: (left + right) / 2,
    y: (top + bottom) / 2,
    zoom: Math.min(width / Math.max(260, right - left + 220), height / Math.max(220, bottom - top + 180), 2.2)
  };
}

export function cityLabelScale(zoom: number): number {
  return Math.max(0.24, Math.min(8, 1 / zoom));
}
