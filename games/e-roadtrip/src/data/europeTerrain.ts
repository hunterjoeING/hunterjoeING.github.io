import { projectMapPoint } from './europeGeography';
import type { GeoCoordinate, MapPoint } from './europeProjection';

interface Range {
  width: number;
  axis: GeoCoordinate[];
  high?: GeoCoordinate[];
}

const ranges: Range[] = [
  { width: 35, axis: [[43.8, 7.2], [44.7, 6.7], [45.9, 7.0], [46.6, 8.4], [46.5, 10.2], [47.1, 12.9], [47.5, 15.1]],
    high: [[44.6, 6.9], [45.83, 6.87], [46.05, 7.85], [46.55, 8.13], [46.38, 9.91], [46.85, 10.86], [47.08, 12.7]] },
  { width: 19, axis: [[43.2, -1.5], [42.9, -0.5], [42.7, 0.6], [42.5, 1.7], [42.44, 2.8]],
    high: [[42.85, -0.15], [42.63, 0.65], [42.58, 1.47]] },
  { width: 28, axis: [[59, 7.0], [60.5, 7.6], [61.65, 8.25], [63, 12.1], [65, 14.15], [67, 16.05], [68.65, 18.9], [69.35, 21.1]],
    high: [[60.75, 7.55], [61.64, 8.31], [62.32, 9.27], [65.05, 14.1], [67.90, 18.52], [69.27, 20.45]] },
  { width: 23, axis: [[56.05, -4.75], [56.79, -5.01], [57.09, -3.67], [57.63, -5.05], [58.19, -4.89]],
    high: [[56.80, -5.00], [57.12, -3.67], [57.59, -5.27]] },
  { width: 24, axis: [[48.2, 17.7], [49.2, 20.0], [48.9, 22.5], [48.2, 24.5], [47.1, 25.3], [45.6, 25.2], [45.3, 22.8]],
    high: [[49.16, 20.13], [48.16, 24.5], [47.60, 24.64], [45.60, 25.61]] },
  { width: 19, axis: [[44.6, 8.9], [44.2, 10.1], [43.9, 11.5], [43.15, 12.7], [42.4, 13.5], [40.3, 15.8], [38.15, 15.9]] },
  { width: 33, axis: [[44.2, 3.3], [45.05, 2.7], [45.6, 2.8], [46.05, 3.15]] },
  { width: 16, axis: [[50.35, 6.7], [50.13, 5.65], [49.9, 4.8]] },
  { width: 14, axis: [[51.37, 7.69], [51.22, 8.48], [51.31, 9.29], [51.77, 10.62]] },
  { width: 13, axis: [[47.72, 7.1], [48.05, 7.1], [48.5, 7.2]] },
  { width: 13, axis: [[47.7, 8.03], [48.15, 8.2], [48.67, 8.28], [48.39, 9.55]] },
  { width: 17, axis: [[48.6, 13.9], [49.15, 13.1], [50.3, 12.8], [50.68, 13.55]] },
  { width: 25, axis: [[43.1, -6.9], [43.1, -5.35], [43.04, -4.3], [42.96, -3.5]] },
  { width: 27, axis: [[40.27, -6.35], [40.30, -5.1], [40.73, -4.0], [41.25, -3.4]] },
  { width: 21, axis: [[36.75, -4.82], [37.06, -3.31], [37.4, -2.6]] },
  { width: 22, axis: [[45.1, 14.65], [44.0, 16.7], [43.4, 18.5], [42.59, 19.8], [41.8, 20.57], [40.2, 21.0], [39.0, 21.4]] },
  { width: 33, axis: [[42.8, 43.4], [42.6, 44.8], [42.25, 46.3], [41.3, 48.0]], high: [[43.35, 42.44], [42.7, 44.5], [42.1, 46.4]] },
  { width: 28, axis: [[52.0, 58.0], [55.5, 59.2], [59.2, 59.3], [63.1, 59.5], [65.0, 60.8], [67.5, 65.2]],
    high: [[54.25, 58.11], [59.5, 59.1], [65.04, 60.11]] }
];

// Taper a strip around the projected ridge or woodland axis.
function zone(axis: GeoCoordinate[], width: number): MapPoint[] {
  const points = axis.map(projectMapPoint);
  const side = (sign: number) => points.map((p, i) => {
    const previous = points[Math.max(0, i - 1)];
    const next = points[Math.min(i + 1, points.length - 1)];
    const dx = next.x - previous.x, dy = next.y - previous.y;
    const radius = i === 0 || i === points.length - 1 ? width * 0.45 : width;
    const factor = sign * radius / Math.hypot(dx, dy);
    return { x: p.x - dy * factor, y: p.y + dx * factor };
  });
  return [...side(1), ...side(-1).reverse()];
}

export const RELIEF_ZONES = ranges.map(range => ({
  tier: range.high ? 'high' : 'low',
  foothills: zone(range.axis, range.width),
  ridge: zone(range.axis, range.width * 0.56),
  snow: range.high && zone(range.high, range.width * 0.25)
}));

export const MOUNTAIN_CLUSTERS = ranges.flatMap(range => range.high ? [{
  peaks: range.high.map((point, i) => ({ ...projectMapPoint(point), size: i % 2 === 0 ? 10 : 14, snow: true }))
}] : []);

type ForestKind = 'pine' | 'mixed' | 'deciduous';

const forests: Array<{ axis: GeoCoordinate[]; width: number; kind: ForestKind; density: number }> = [
  { axis: [[47.7, 8.1], [48.22, 8.18], [48.65, 8.30]], width: 11, kind: 'pine', density: 31 },
  { axis: [[48.14, 7.13], [48.53, 7.27], [49.26, 7.69], [49.45, 7.91]], width: 14, kind: 'mixed', density: 27 },
  { axis: [[49.88, 5.18], [50.02, 5.66], [50.50, 6.36]], width: 15, kind: 'mixed', density: 32 },
  { axis: [[50.93, 7.65], [51.16, 8.45], [51.76, 9.02]], width: 13, kind: 'mixed', density: 25 },
  { axis: [[51.05, 10.2], [51.44, 10.6], [51.82, 10.62]], width: 12, kind: 'pine', density: 24 },
  { axis: [[52.68, 9.8], [53.10, 10.0], [53.19, 10.49]], width: 19, kind: 'mixed', density: 25 },
  { axis: [[52.54, 13.7], [53.08, 13.2], [53.52, 12.63]], width: 16, kind: 'mixed', density: 27 },
  { axis: [[48.75, 13.79], [49.12, 13.3], [49.43, 12.66]], width: 21, kind: 'pine', density: 28 },
  { axis: [[49.48, 8.95], [49.97, 9.47], [50.10, 9.47]], width: 12, kind: 'deciduous', density: 27 },
  { axis: [[43.82, -1.02], [44.15, -0.83], [44.63, -0.8]], width: 19, kind: 'pine', density: 35 },
  { axis: [[46.72, 4.05], [47.14, 4.00], [47.36, 4.11]], width: 13, kind: 'deciduous', density: 21 },
  { axis: [[58.7, 15.1], [61.4, 15.2], [63.6, 16.0], [66.0, 20.0], [67.1, 25.0], [65.5, 28.2]], width: 65, kind: 'pine', density: 24 },
  { axis: [[53.9, 14.5], [53.5, 17.5], [53.7, 20.55]], width: 12, kind: 'mixed', density: 26 },
  { axis: [[56.83, -3.78], [57.09, -3.6], [57.24, -3.65]], width: 14, kind: 'pine', density: 31 },
  { axis: [[46.04, 14.06], [46.56, 14.39], [47.20, 14.44], [47.83, 15.27]], width: 20, kind: 'mixed', density: 23 },
  { axis: [[53.0, 58.1], [57.4, 58.7], [61.0, 60.0], [64.6, 61.2]], width: 42, kind: 'pine', density: 18 }
];

export const FOREST_ZONES = forests.map(({ axis, width, kind, density }) => ({
  polygon: zone(axis, width), kind, density
}));
