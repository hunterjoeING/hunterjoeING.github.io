import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { encodeMapPath } from '../src/data/europeGeoEncoding.ts';
import { CITY_COORDINATES } from '../src/data/europeCityCoordinates.ts';
import { projectEurope } from '../src/data/europeProjection.ts';
import { NORTH_COAST_500_STOPS } from '../src/data/routes/northCoast500.ts';
import { area, boundsOf, clipLine, clipRing, inRing, intersects, roundPath, simplify } from './europe-geo-geometry.mjs';
import { buildCountryLabels, buildMajorCities } from './europe-geo-places.mjs';

const source = resolve(process.argv[2] || process.env.NATURAL_EARTH_DIR || '/home/box/projects/geodata');
const features = name => JSON.parse(readFileSync(resolve(source, `ne_${name}.geojson`), 'utf8')).features;
const polygons = g => g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
const lines = g => g.type === 'LineString' ? [g.coordinates] : g.coordinates;
const geographicBox = [-45, 12, 111, 85];

// Least-squares similarity fit against the legacy level/corridor anchors.
const anchors = {
  aachen: [680, 805], koeln: [732, 792], hannover: [908, 662], paris: [502, 912],
  lyon: [586, 1084], montpellier: [548, 1176], muenchen: [1006, 1012],
  innsbruck: [1016, 1088], hirtshals: [896, 290]
};
const samples = Object.entries(anchors).map(([id, [u, v]]) =>
  ({ ...projectEurope(CITY_COORDINATES[id], { a: 1, b: 0, x: 0, y: 0 }), u, v }));
const mean = key => samples.reduce((sum, p) => sum + p[key], 0) / samples.length;
const mx = mean('x'), my = mean('y'), mu = mean('u'), mv = mean('v');
let direct = 0, cross = 0, variance = 0;
for (const p of samples) {
  const x = p.x - mx, y = p.y - my, u = p.u - mu, v = p.v - mv;
  direct += x * u + y * v;
  cross += x * v - y * u;
  variance += x * x + y * y;
}
const a = direct / variance, b = cross / variance;
const fit = { a, b, x: mu - a * mx + b * my, y: mv - b * mx - a * my };
const mapPoint = ([lon, lat]) => {
  const { x, y } = projectEurope([lat, lon], fit);
  return [x, y];
};

// A rectangular crop in map space. Sample the extent including Iceland, the full
// Black Sea, the Moroccan–Tunisian coast, northern Norway and the eastern Urals.
const coverage = [
  [-25, 65], [-14, 66.6], [-10, 35], [-10, 33], [11, 35], [32, 34], [42.2, 40.6],
  [63, 52], [67, 56], [68, 64], [65, 69], [30, 72], [10, 72.5]
];
const [west, north, east, south] = boundsOf(coverage.map(mapPoint));
const textureGrid = 2;
const floorGrid = n => Math.floor(n / textureGrid) * textureGrid;
const ceilGrid = n => Math.ceil(n / textureGrid) * textureGrid;
const shiftX = floorGrid(west - 24), shiftY = floorGrid(north - 30);
const bounds = { w: ceilGrid(east + 25) - shiftX, h: ceilGrid(south + 22) - shiftY };
fit.x -= shiftX;
fit.y -= shiftY;
const mapBox = [0, 0, bounds.w, bounds.h];
const insideMap = ([x, y]) => x >= 0 && x <= bounds.w && y >= 0 && y <= bounds.h;

const scotland = boundsOf([[-8.2, 55], [0, 61], [-8.2, 61], [0, 55]].map(mapPoint));
const westEurope = boundsOf([[-12, 35], [17, 64], [-12, 64], [17, 35]].map(mapPoint));
const contains = ([x, y], [x0, y0, x1, y1]) => x >= x0 && x <= x1 && y >= y0 && y <= y1;
const protectedPoints = [
  ...Object.values(CITY_COORDINATES),
  ...NORTH_COAST_500_STOPS.map(s => s.mapCoordinate ?? s.coordinate)
].map(([lat, lon]) => mapPoint([lon, lat]));
const nearStop = p => protectedPoints.some(q => (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2 < 16);
const coastTolerance = p => {
  if (nearStop(p)) return 0.12;
  if (contains(p, scotland)) return 0.55;
  return contains(p, westEurope) ? 1.15 : 1.65;
};

function buildPolygons(input, toleranceAt, minArea, minHoleArea = minArea, precisionAt) {
  return input.flatMap(({ geometry }) => polygons(geometry)).flatMap(([outer, ...holes]) => {
    if (!intersects(boundsOf(outer), geographicBox)) return [];
    const projectRing = ring => {
      const clipped = clipRing(clipRing(ring, geographicBox).map(mapPoint), mapBox);
      return roundPath(simplify(clipped, toleranceAt, true), true, precisionAt);
    };
    const ring = projectRing(outer);
    if (ring.length < 3 || area(ring) < minArea) return [];
    return [[ring, ...holes.map(projectRing).filter(h => h.length >= 3 && area(h) >= minHoleArea)]];
  });
}

function buildLines(input, tolerance, minLength) {
  return input.flatMap(l => clipLine(l, geographicBox))
    .flatMap(l => clipLine(l.map(mapPoint), mapBox))
    .map(l => roundPath(simplify(l, () => tolerance)))
    .filter(l => l.length >= 2 && l.reduce((sum, p, i) =>
      i ? sum + Math.hypot(p[0] - l[i - 1][0], p[1] - l[i - 1][1]) : sum, 0) >= minLength);
}

const land = [
  ...buildPolygons(features('10m_land'), coastTolerance, 2, 10, p => nearStop(p) ? 10 : 1),
  ...buildPolygons(features('10m_minor_islands').filter(f => intersects(boundsOf(f.geometry.coordinates[0]),
    [-8.5, 55.3, -0.5, 61])), () => 0.55, 2)
];
const searchableLand = land.map(rings => ({ box: boundsOf(rings[0]), rings }));
const onLand = p => searchableLand.some(({ box, rings: [outer, ...holes] }) =>
  contains(p, box) && inRing(p, outer) && !holes.some(h => inRing(p, h)));
const baseLakes = features('50m_lakes');
const alpineLakeBox = [8.4, 45.43, 11.0, 46.24];
const alpineLakes = features('10m_lakes').filter(feature => polygons(feature.geometry)
  .some(([outer]) => intersects(boundsOf(outer), alpineLakeBox) &&
    !baseLakes.some(base => polygons(base.geometry).some(([coarse]) => inRing(outer[0], coarse)))));
const lakes = [
  ...buildPolygons(baseLakes, () => 1.35, 7),
  ...buildPolygons(alpineLakes, p => nearStop(p) ? 0.035 : 0.25, 0.6, 0.6, () => 10)
];
const rivers = buildLines(features('50m_rivers_lake_centerlines')
  .filter(f => f.properties.featurecla !== 'Lake Centerline' && f.properties.scalerank <= 6)
  .flatMap(f => lines(f.geometry)), 1.5, 9);

// Extract only shared admin boundaries. Keeping coastal polygon arcs would add
// coarse dotted coastlines over the more detailed land data.
const countries = features('50m_admin_0_countries');
const segments = new Map();
const boundaryVertices = new Map();
const keyOf = p => `${Math.round(p[0] * 1e5)},${Math.round(p[1] * 1e5)}`;
for (const { properties, geometry } of countries) {
  for (const polygon of polygons(geometry)) {
    for (const ring of polygon) {
      if (!intersects(boundsOf(ring), geographicBox)) continue;
      for (let i = 1; i < ring.length; i++) {
        const from = keyOf(ring[i - 1]), to = keyOf(ring[i]);
        if (from === to) continue;
        const key = from < to ? `${from};${to}` : `${to};${from}`;
        const prev = segments.get(key);
        if (!prev) {
          segments.set(key, { from, to, country: properties.ADM0_A3 });
        } else if (prev.country !== properties.ADM0_A3) {
          prev.shared = true;
          boundaryVertices.set(from, ring[i - 1]);
          boundaryVertices.set(to, ring[i]);
        }
      }
    }
  }
}
const links = new Map();
for (const [key, { from, to, shared }] of segments) {
  if (!shared) continue;
  for (const [start, end] of [[from, to], [to, from]]) {
    if (!links.has(start)) links.set(start, []);
    links.get(start).push({ key, end });
  }
}
const walked = new Set();
function walk(start) {
  const path = [boundaryVertices.get(start)];
  let point = start;
  let next;
  while ((next = links.get(point).find(link => !walked.has(link.key)))) {
    walked.add(next.key);
    point = next.end;
    path.push(boundaryVertices.get(point));
    if (links.get(point).length !== 2) break;
  }
  return path;
}
const borderPaths = [];
for (const points of [[...links.keys()].filter(p => links.get(p).length !== 2), [...links.keys()]]) {
  for (const start of points) {
    while (links.get(start).some(l => !walked.has(l.key))) borderPaths.push(walk(start));
  }
}
const borders = buildLines(borderPaths, 1.15, 0.8);

const gameCities = Object.values(CITY_COORDINATES).map(([lat, lon]) => ({ point: mapPoint([lon, lat]) }));
const majorCities = buildMajorCities(features('10m_populated_places_simple'), gameCities, mapPoint, insideMap, onLand)
  .map(([name, x, y, ...rest]) => [name, Math.round(x), Math.round(y), ...rest]);
const countryLabels = buildCountryLabels(countries, mapPoint, insideMap)
  .map(([name, x, y, small]) => [name, Math.round(x), Math.round(y), small]);

const rows = data => `[\n${data.map(row => `  ${JSON.stringify(row)}`).join(',\n')}\n]`;
const declarations = [
  ['LAND_POLYGONS', 'number[][][]', land.map(p => p.map(r => encodeMapPath(r.flat()))), '.map(polygon => polygon.map(decodeMapPath))'],
  ['LAKE_POLYGONS', 'number[][][]', lakes.map(p => p.map(r => encodeMapPath(r.flat()))), '.map(polygon => polygon.map(decodeMapPath))'],
  ['RIVER_PATHS', 'number[][]', rivers.map(p => encodeMapPath(p.flat())), '.map(decodeMapPath)'],
  ['BORDER_PATHS', 'number[][]', borders.map(p => encodeMapPath(p.flat())), '.map(decodeMapPath)'],
  ['COUNTRY_LABELS', 'Array<[name: string, x: number, y: number, small: number]>', countryLabels],
  ['MAJOR_CITIES', 'Array<[name: string, x: number, y: number, capital: number, population: number, country: string]>', majorCities]
];
const output = [
  [
    '// Generated from Natural Earth (public domain), https://www.naturalearthdata.com/',
    '// Source files: https://github.com/nvkelso/natural-earth-vector/tree/master/geojson',
    '// Regenerate from games/e-roadtrip: npm run build:geo -- /home/box/projects/geodata',
    '// Packed paths decode to alternating projected x/y values. Polygon rings begin with the exterior.'
  ].join('\n'),
  "import { decodeMapPath } from './europeGeoEncoding';",
  `export const MAP_BOUNDS = ${JSON.stringify(bounds)};`,
  `export const EUROPE_MAP_FIT = ${JSON.stringify(fit)};`,
  ...declarations.map(([name, type, data, decode = '']) => `export const ${name}: ${type} = ${rows(data)}${decode};`),
  ''
].join('\n\n');
writeFileSync(new URL('../src/data/europeGeoData.generated.ts', import.meta.url), output);
console.log(`Europe geography: ${bounds.w} × ${bounds.h}, ${land.length} land polygons, ${majorCities.length} cities, ${Buffer.byteLength(output)} bytes`);
