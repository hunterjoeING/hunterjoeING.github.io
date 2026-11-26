import assert from 'node:assert/strict';
import { boundsOf, inRing, segmentDistanceSq } from '../scripts/europe-geo-geometry.mjs';

const xy = ({ x, y }) => [x, y];
const unpack = flat => Array.from({ length: flat.length / 2 }, (_, i) => flat.slice(2 * i, 2 * i + 2));

export default function register(test, m) {
  const land = m.LAND_POLYGONS.map(polygon => {
    const [outer, ...holes] = polygon.map(unpack);
    return { outer, holes, bounds: boundsOf(outer) };
  });
  const landAt = ([x, y]) => land.find(({ outer, holes, bounds: [a, b, c, d] }) =>
    x >= a && x <= c && y >= b && y <= d && inRing([x, y], outer) && !holes.some(h => inRing([x, y], h)));
  const project = coordinate => xy(m.projectMapPoint(coordinate));

  function coastDistance(p) {
    let nearest = Infinity;
    for (const { outer } of land) {
      for (let i = 0; i < outer.length; i++) {
        nearest = Math.min(nearest, segmentDistanceSq(p, outer[i], outer[(i + 1) % outer.length]));
      }
    }
    return Math.sqrt(nearest);
  }

  test('Every graph city and mapped North Coast 500 stop is on projected land', () => {
    for (const city of m.CITIES) {
      const point = [city.mapX, city.mapY];
      assert.deepEqual(point, project(m.CITY_COORDINATES[city.id]), city.name);
      assert.ok(landAt(point), city.name);
    }
    for (const stop of m.NORTH_COAST_500_STOPS) {
      assert.ok(landAt(project(stop.mapCoordinate ?? stop.coordinate)), stop.name);
      if (stop.mapCoordinate) {
        const [x, y] = project(stop.coordinate);
        const [mappedX, mappedY] = project(stop.mapCoordinate);
        assert.ok(Math.hypot(x - mappedX, y - mappedY) < 1.5, stop.name);
      }
    }
  });

  test('Coastal route cities are near the sea and inland cities have room around them', () => {
    for (const [id, maxPx] of Object.entries({
      montpellier: 10, hirtshals: 3, calais: 4, hoek: 4, esbjerg: 4, kopenhagen: 4,
      goeteborg: 5, nizza: 4, venedig: 3, hamburg: 12, luebeck: 14
    })) {
      const p = project(m.CITY_COORDINATES[id]);
      assert.ok(landAt(p), id);
      assert.ok(coastDistance(p) < maxPx, id);
    }
    for (const id of ['aachen', 'muenchen', 'innsbruck', 'lyon', 'paris']) {
      const p = project(m.CITY_COORDINATES[id]);
      assert.ok(landAt(p), id);
      assert.ok(coastDistance(p) > 45, id);
    }
  });

  test('The continent crop includes both shores of Gibraltar, the Black Sea and the Urals', () => {
    for (const [name, coordinate] of Object.entries({
      Tarifa: [36.08, -5.61], Morocco: [35.78, -5.83], Tunisia: [36.78, 10.16],
      Peloponnese: [37.60, 22.40], Anatolia: [40.70, 33.50], Urals: [54.8, 61.0],
      'Northern Norway': [70.15, 28.10], 'Finnish Lapland': [69.06, 27.07]
    })) {
      assert.ok(landAt(project(coordinate)), name);
    }
    for (const [name, coordinate] of Object.entries({
      Mediterranean: [40.1, 3.0], Gibraltar: [35.99, -5.61], 'Black Sea': [43.26, 33.0],
      'Strait of Messina': [38.23, 15.62]
    })) {
      const point = project(coordinate);
      assert.ok(point[0] > 0 && point[0] < m.MAP_BOUNDS.w && point[1] > 0 && point[1] < m.MAP_BOUNDS.h, name);
      assert.ok(!landAt(point), name);
    }
    const sicily = landAt(project([37.57, 14.26]));
    const calabria = landAt(project([38.11, 15.72]));
    assert.ok(sicily && calabria);
    assert.notEqual(sicily, calabria);
    for (const island of [[39.65, 2.95], [42.1, 9.1], [40.15, 9.1], [35.9, 14.44], [35.22, 24.95]]) {
      assert.ok(landAt(project(island)), String(island));
    }
  });

  test('Scottish islands and firths remain separate at the detailed coast resolution', () => {
    const greatBritain = landAt(project([57.28, -4.0]));
    assert.ok(greatBritain);
    for (const island of [[57.36, -6.27], [58.17, -6.59], [58.98, -3.05]]) {
      const polygon = landAt(project(island));
      assert.ok(polygon);
      assert.notEqual(polygon, greatBritain);
    }
    for (const firth of [[57.68, -3.8], [57.853, -4.013], [57.680, -4.150], [56.05, -3.19], [55.81, -4.89]]) {
      assert.ok(!landAt(project(firth)), String(firth));
    }
  });

  test('North Coast 500 follows the ordered loop with no significant shortcuts over water', () => {
    const stops = m.NORTH_COAST_500_STOPS;
    assert.equal(stops.length, 26);
    assert.deepEqual(stops[0].coordinate, [57.4778, -4.2247]);
    assert.equal(stops.at(-1).name, 'Inverness');
    assert.deepEqual(stops.at(-1).coordinate, stops[0].coordinate);
    assert.deepEqual(stops.filter(s => s.label).map(s => s.name), [
      'Inverness', 'Applecross', 'Ullapool', 'Durness', "John o' Groats"
    ]);
    assert.deepEqual(m.northCoastLine[0], m.northCoastLine.at(-1));

    let waterRun = 0;
    for (const [i, b] of m.northCoastLine.entries()) {
      if (i === 0) continue;
      const a = m.northCoastLine[i - 1];
      const length = Math.hypot(b.x - a.x, b.y - a.y);
      const count = Math.max(1, Math.ceil(length / 0.25));
      for (let step = 1; step <= count; step++) {
        const f = step / count;
        const point = [a.x + f * (b.x - a.x), a.y + f * (b.y - a.y)];
        waterRun = landAt(point) ? 0 : waterRun + length / count;
        // Allow short bridge crossings and sub-pixel variation along the simplified shore.
        assert.ok(waterRun < 2.6, `open water at ${point}`);
      }
    }
  });

  test('The Garda peninsula is dry and the new Alpine routes follow the land around the lakes', () => {
    const lakes = m.LAKE_POLYGONS.map(polygon => polygon.map(unpack));
    const lakeAt = p => lakes.find(([outer, ...holes]) => inRing(p, outer) && !holes.some(h => inRing(p, h)));
    const garda = lakeAt(project([45.64, 10.67]));
    assert.ok(garda, 'Garda is in the rendered lake layer');
    assert.ok(lakeAt(project([46.047, 8.735])), 'The western alpine lake is in the lake layer');
    const sirmione = project(m.CITY_COORDINATES.sirmione);
    const shore = garda[0];
    const shoreDistance = Math.min(...shore.map((vertex, i) =>
      segmentDistanceSq(sirmione, vertex, shore[(i + 1) % shore.length])));
    assert.ok(shoreDistance < 1, 'The castle is on the southern peninsula');
    for (const { id } of m.ALPS_TO_GARDA_STOPS) {
      const point = project(m.CITY_COORDINATES[id]);
      assert.ok(landAt(point) && !lakeAt(point), id);
    }
    for (const { id } of m.ALPS_TO_GARDA_EDGES) {
      const { waypoints } = m.getEdgeById(id);
      for (let i = 1; i < waypoints.length; i++) {
        const a = waypoints[i - 1];
        const b = waypoints[i];
        const steps = Math.max(1, Math.ceil(Math.hypot(a.x - b.x, a.y - b.y) * 10));
        for (let step = 0; step <= steps; step++) {
          const fraction = step / steps;
          const point = [a.x + (b.x - a.x) * fraction, a.y + (b.y - a.y) * fraction];
          assert.ok(landAt(point) && !lakeAt(point), `${id} segment ${i} at ${point}`);
        }
      }
    }
  });

  test('Graph edges meet their projected city markers and charger progress stays on the same edge', () => {
    const marker = ({ mapX, mapY }) => ({ x: mapX, y: mapY });
    for (const edge of m.HIGHWAY_EDGES) {
      assert.deepEqual(edge.waypoints[0], marker(m.getCityById(edge.fromCityId)), edge.id);
      assert.deepEqual(edge.waypoints.at(-1), marker(m.getCityById(edge.toCityId)), edge.id);
    }
    for (const station of m.CHARGERS) {
      const point = m.getPointAlongEdge(m.getEdgeById(station.edgeId), station.edgeProgress);
      assert.ok(Math.hypot(station.mapX - point.x, station.mapY - point.y) <= 6.001, station.id);
    }
  });

  test('Level 1–2 player forecasts and Level 3 charged reference forecasts stay pinned', () => {
    // [distance km, drive min, total min, toll €, kWh/100 km, arrival SoC %, target min] at eede53a for Levels 1–2.
    const expected = {
      l1_route_a_ruhr: [716, 473, 713, 0, 17.2, -146, 797],
      l1_route_b_nord: [748, 427, 667, 0, 18, -170, 797],
      l1_route_c_sauerland: [772, 463, 703, 0, 19, -193, 797],
      l2_route_a_lyon: [994, 569, 1529, 75, 17.9, -254, 1882],
      l2_route_mid_reims: [1096, 593, 1553, 94, 19.1, -316, 1882],
      l2_route_b_clermont: [1169, 659, 1619, 103.5, 18, -319, 1882],
      l3_route_a_inntal: [450, 347, 402, 47.5, 19.2, 30, 564],
      l3_route_b_fernpass_reschen: [483, 438, 504, 17, 18.9, 30, 564],
      l3_route_c_jaufenpass: [477, 405, 480, 42.5, 20, 30, 564]
    };
    const actual = {};
    for (const level of m.LEVELS.slice(0, 3)) {
      const createPlan = level.order === 3 ? m.createReferencePlan : m.createDefaultPlan;
      for (const route of level.routeOptions) {
        const plan = createPlan(level, 'mg4_standard', route.id);
        const f = m.evaluateTripPlan(level, plan);
        actual[route.id] = [f.totalDistanceKm, f.totalDriveMinutes, f.totalMinutes, f.tollsEur,
          f.avgConsumptionKwh100, f.finalArrivalSocPct, level.targetArrivalMinutes];
      }
    }
    assert.deepEqual(actual, expected);
  });

  const overlap = (a, b) => Math.abs(a.x - b.x) * 2 < a.w + b.w && Math.abs(a.y - b.y) * 2 < a.h + b.h;

  test('Mobile planning labels fit without overlaps and keep Köln to the right', () => {
    const width = 390, height = 370;
    const scenarios = m.LEVELS.slice(0, 3).flatMap(level =>
      (level.order === 3 ? level.routeOptions.map(route => route.id) : [level.defaultRouteId])
        .map(routeId => ({ level, routeId })));
    for (const { level, routeId } of scenarios) {
      const plan = m.createDefaultPlan(level, 'mg4_standard', routeId);
      const points = m.getActiveRouteLegs(level, plan).flatMap(l => m.getEdgeById(l.edgeId).waypoints);
      const fit = m.routeMapView(points, width, height);
      const viewport = { width, height, zoom: fit.zoom, scrollX: fit.x - width / 2, scrollY: fit.y - height / 2 };
      const scale = m.cityLabelScale(fit.zoom) * fit.zoom;
      const active = new Set(level.routeOptions.flatMap(o => o.legs.flatMap(l => {
        const { fromCityId, toCityId } = m.getEdgeById(l.edgeId);
        return [fromCityId, toCityId];
      })));
      const graphLabels = m.CITIES.filter(c => active.has(c.id) || c.isMajor).map(city => ({
        id: city.id, x: city.mapX, y: city.mapY, width: (city.name.length * 7 + 6) * scale, height: 15 * scale,
        priority: city.id === 'sirmione' && active.has(city.id) ? 540 : active.has(city.id) ? 500 : 400, distance: 8 * fit.zoom,
        anchors: city.id === 'sirmione' && active.has(city.id) ? m.SIRMIONE_LABEL_ANCHORS
          : city.id === 'koeln' ? m.KOELN_LABEL_ANCHORS : m.CITY_LABEL_ANCHORS
      }));
      const referenceLabels = m.MAJOR_CITIES.map(([name, x, y, capital, population]) => ({
        id: name, x, y, width: (name.length * 5.8 + 8) * scale, height: 13 * scale, radius: 2.5 * scale,
        priority: (capital ? 280 : 220) + Math.log10(population),
        anchors: m.CITY_LABEL_ANCHORS
      }));
      const fixed = m.CITIES.map(city => ({
        ...m.mapScreenPoint({ x: city.mapX, y: city.mapY }, viewport), w: 16 * fit.zoom, h: 16 * fit.zoom
      }));
      const placed = m.layoutMapLabels([...referenceLabels, ...graphLabels], viewport, fixed);
      assert.ok(placed.some(l => referenceLabels.some(a => a.id === l.id)), level.id);
      for (const [i, a] of placed.entries()) {
        for (const b of placed.slice(i + 1)) assert.ok(!overlap(a.box, b.box), `${a.id} / ${b.id}`);
      }
      if (level.order === 3) {
        assert.ok(placed.some(l => l.id === 'muenchen'), routeId);
        assert.ok(placed.some(l => l.id === 'sirmione'), routeId);
      }
      if (level.order === 1) {
        assert.ok(placed.some(l => l.id === 'aachen'));
        const koeln = placed.find(l => l.id === 'koeln');
        assert.ok(koeln);
        assert.ok(koeln.x - koeln.box.w / (2 * fit.zoom) > m.getCityById('koeln').mapX);
      }
    }

    const zoom = m.overviewMapZoom(width, height, m.MAP_BOUNDS);
    assert.ok(m.MAP_BOUNDS.w * zoom < width && m.MAP_BOUNDS.h * zoom < height);
  });

  test('The reference gazetteer uses German city names and omits graph duplicates', () => {
    const names = new Set(m.MAJOR_CITIES.map(([name]) => name));
    for (const name of ['Wien', 'Prag', 'Warschau', 'Moskau', 'Kiew', 'Bukarest', 'Belgrad', 'Athen', 'Lissabon', 'Sevilla', 'Neapel']) {
      assert.ok(names.has(name), name);
    }
    for (const name of ['Berlin', 'Paris', 'Rom', 'Mailand', 'Kopenhagen']) assert.ok(!names.has(name), name);
    const countries = new Map();
    for (const [, , , capital, , country] of m.MAJOR_CITIES) {
      const records = countries.get(country) ?? [];
      records.push(capital);
      countries.set(country, records);
    }
    assert.ok(countries.size >= 45);
    for (const [country, cities] of countries) {
      assert.ok(cities.length <= 4, country);
    }
    const spain = countries.get('ES');
    assert.equal(spain.length, 4);
    assert.equal(spain[0], 1);
  });

  test('The basemap bakes once per theme at the projected texture bounds', () => {
    const created = new Map();
    const noop = () => {};
    const canvas = {
      beginPath: noop, clip: noop, closePath: noop, fill: noop, fillRect: noop,
      lineTo: noop, moveTo: noop, restore: noop, save: noop, setLineDash: noop, stroke: noop
    };
    const scene = { textures: {
      exists: key => created.has(key),
      createCanvas(key, width, height) {
        created.set(key, { width, height, refreshed: 0, filter: undefined });
        return {
          getContext: () => canvas,
          refresh: () => created.get(key).refreshed++,
          setFilter: filter => { created.get(key).filter = filter; }
        };
      }
    } };
    const dark = m.ensureEuropePixelMapTexture(scene, false);
    const light = m.ensureEuropePixelMapTexture(scene, true);
    assert.notEqual(dark, light);
    assert.equal(m.ensureEuropePixelMapTexture(scene, false), dark);
    assert.equal(created.size, 2);
    for (const { width, height, refreshed, filter } of created.values()) {
      assert.equal(width * m.PIXEL_MAP_SCALE, m.MAP_BOUNDS.w);
      assert.equal(height * m.PIXEL_MAP_SCALE, m.MAP_BOUNDS.h);
      assert.equal(refreshed, 1);
      assert.equal(filter, 1);
    }
  });

  test('Label collisions favour route towns, then capitals, and recover on pan', () => {
    const viewport = { width: 390, height: 360, zoom: 1, scrollX: 0, scrollY: 0 };
    const label = (id, x, priority) => ({ id, x, y: 170, width: 60, height: 16, priority, anchors: ['centre'] });
    const labels = [label('other city', 100, 10), label('capital', 105, 30), label('route town', 145, 50)];
    assert.deepEqual(m.layoutMapLabels(labels, viewport).map(l => l.id), ['route town']);
    assert.deepEqual(m.layoutMapLabels(labels, { ...viewport, scrollX: -250 }).map(l => l.id), ['capital']);
  });
}
