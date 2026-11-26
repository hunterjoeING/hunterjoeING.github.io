import assert from 'node:assert/strict';

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

function inside(point, loop) {
  let result = false;
  for (let i = 1; i < loop.length; i++) {
    const [a, b] = [loop[i - 1], loop[i]];
    if ((a.y > point.y) !== (b.y > point.y) &&
      point.x < a.x + (point.y - a.y) * (b.x - a.x) / (b.y - a.y)) result = !result;
  }
  return result;
}

export default function register(test, game) {
  const {
    AACHEN, AACHEN_ALLEENRING, AACHEN_GRABENRING, AACHEN_EUROPAPLATZ, AACHEN_HOME,
    AACHEN_EXITS, AACHEN_HOME_POINT, aachenCityDrive, getLevelById, mappedRoadSpans, mappedRoadContains,
    mappedCityNavigator, computeCityLightingProfile, pointInCityRect
  } = game;
  const spans = mappedRoadSpans(AACHEN.roads);
  const level1 = getLevelById('level_1_aachen_hannover');
  const level2 = getLevelById('level_2_family_summer');

  test('Aachen puts the old town, nested rings, landmarks and outlying exits in the correct compass order', () => {
    const { dom, katschhof, rathaus, elisenbrunnen, theater, ponttor, quellenhof, eurogress,
      hbf, lousberg, tivoli, melaten, uniklinik, westbahnhof, marschiertor } = AACHEN.landmarks;
    const { laurensberg, lichtenbusch, vetschau, brand, vaals, luettich } = AACHEN_EXITS;
    assert.ok(rathaus.y < katschhof.y && katschhof.y < dom.y);
    assert.ok(Math.abs(dom.x - rathaus.x) < 35 && dom.x === katschhof.x);
    assert.ok(elisenbrunnen.x > dom.x && elisenbrunnen.y > dom.y && theater.y > elisenbrunnen.y);
    assert.ok(ponttor.x < dom.x && ponttor.y < dom.y);
    assert.ok(mappedRoadContains(mappedRoadSpans([AACHEN_ALLEENRING]), ponttor, 18));
    assert.ok(quellenhof.x > dom.x && quellenhof.y < dom.y && eurogress.x > quellenhof.x && eurogress.y < quellenhof.y);
    assert.ok(distance(quellenhof, eurogress) < 150 && !inside(quellenhof, AACHEN_ALLEENRING.points));
    for (const ring of [AACHEN_GRABENRING, AACHEN_ALLEENRING]) {
      assert.deepEqual(ring.points[0], ring.points.at(-1));
      assert.ok(inside(dom, ring.points));
    }
    assert.ok(AACHEN_GRABENRING.points.every(p => inside(p, AACHEN_ALLEENRING.points)));
    const hansemannplatz = AACHEN_ALLEENRING.points.find(p => p.x === 2720 && p.y === 1240);
    assert.ok(AACHEN_EUROPAPLATZ.x > Math.max(...AACHEN_ALLEENRING.points.map(p => p.x)));
    assert.ok(AACHEN_EUROPAPLATZ.x > hansemannplatz.x && AACHEN_EUROPAPLATZ.y < hansemannplatz.y);
    assert.ok(hbf.y > marschiertor.y && !inside(hbf, AACHEN_ALLEENRING.points));
    assert.ok(lousberg.y < ponttor.y && tivoli.y < lousberg.y && tivoli.x > ponttor.x);
    assert.ok(uniklinik.x < melaten.x && melaten.x < westbahnhof.x && westbahnhof.x < ponttor.x);
    assert.ok(lichtenbusch.y > hbf.y && brand.x > hbf.x && brand.y > hbf.y);
    assert.ok(vetschau.x < ponttor.x && vetschau.y < ponttor.y && laurensberg.y < lousberg.y);
    assert.ok(vaals.x < dom.x && luettich.x < dom.x && luettich.y > dom.y);
    assert.ok(AACHEN.width * AACHEN.height >= 3.5 * 2140 * 1560);
  });

  test('Aachen signs, guidance and target zones follow all six departure routes and the night return', () => {
    for (const level of [level1, level2]) {
      for (const route of level.routeOptions) {
        const drive = aachenCityDrive('aachen_start', level.order, route.id);
        assert.equal(drive.exit, level === level2 ? 'brand' : 'europaplatz');
        assert.equal(drive.layout, AACHEN);
        assert.deepEqual({ x: drive.spawn.x, y: drive.spawn.y }, AACHEN_HOME_POINT);
        assert.ok(pointInCityRect(drive.goal, drive.target));
        assert.equal(drive.wrongExits.length, Object.keys(AACHEN_EXITS).length - 1);
        assert.ok(drive.wrongExits.every(exit => !pointInCityRect(drive.goal, exit.zone)));
        const sign = level === level2 ? /Lüttich.*Lichtenbusch/ : route.id === 'l1_route_b_nord' ? /A44 Düsseldorf/ : /A4 Köln/;
        assert.match(drive.signLabel, sign);
        assert.match(drive.navLabel, /Zur (A544 · Europaplatz|A44 · Aachen-Brand)/);
        assert.match(drive.completionLabel, level === level2 ? /A44/ : /A544/);
      }
    }
    const finish = aachenCityDrive('aachen_finish', 1, level1.defaultRouteId);
    assert.equal(finish.layout, AACHEN);
    assert.equal(finish.target, AACHEN_HOME);
    assert.ok(!finish.passThrough && finish.spawn.x > AACHEN_EUROPAPLATZ.x);
    const lighting = computeCityLightingProfile(12, 0, 'aachen_finish', 'rain');
    assert.ok(lighting.isNight && lighting.streetlampsOn && lighting.headlightsOn && lighting.isRain);
  });

  test('Aachen navigation follows the ring junctions, directed roundabout and drivable street surface', t => {
    const [eastbound, southeastbound, inbound] = [
      aachenCityDrive('aachen_start', 1, level1.defaultRouteId),
      aachenCityDrive('aachen_start', 2, level2.defaultRouteId),
      aachenCityDrive('aachen_finish', 1, level1.defaultRouteId)
    ];
    for (const drive of [eastbound, southeastbound, inbound]) {
      const navigate = mappedCityNavigator(spans, drive.goal);
      t.diagnostic(`${drive.navLabel}: ${Math.round(navigate(drive.spawn).distance)} px`);
      const expected = drive === southeastbound ? [{ x: 2790, y: 1600 }, { x: 3480, y: 2015 }]
        : [{ x: 2440, y: 965 }, { x: 2720, y: 1240 }, drive === inbound ? { x: 3354, y: 945 } : { x: 3426, y: 1215 }];
      const passed = new Set();
      let position = drive.spawn;
      assert.ok(mappedRoadContains(spans, position));
      for (let i = 0; i < 1100 && distance(position, drive.goal) > 6; i++) {
        const { aim, distance: remaining } = navigate(position);
        assert.ok(Number.isFinite(remaining));
        const step = Math.min(distance(aim, position), 6);
        const heading = Math.atan2(aim.y - position.y, aim.x - position.x);
        assert.ok(step > 0);
        position = { x: position.x + Math.cos(heading) * step, y: position.y + Math.sin(heading) * step };
        assert.ok(mappedRoadContains(spans, position), `${drive.title}: left road at ${JSON.stringify(position)}`);
        for (const point of expected) if (distance(position, point) < 45) passed.add(point);
      }
      assert.ok(distance(position, drive.goal) <= 6, drive.title);
      assert.equal(passed.size, expected.length, `${drive.title} missed ${JSON.stringify(expected.filter(p => !passed.has(p)))}`);
    }
    const guideHome = mappedCityNavigator(spans, AACHEN_HOME_POINT);
    for (const exit of Object.values(AACHEN_EXITS)) {
      assert.ok(Number.isFinite(guideHome(exit).distance), exit.label);
    }
  });

  test('Aachen traffic lanes stay on the drivable road polygons', () => {
    const fake = new Proxy({ texture: { setFilter() {} } }, { get: (target, key) => target[key] ?? (() => fake) });
    const scene = { add: { graphics: () => fake, text: () => fake, renderTexture: () => fake } };
    const place = game.paintDrivingPlace(scene, { preset: 'aachen_start', levelOrder: 2, mobile: true });
    const night = game.paintDrivingPlace(scene, { preset: 'aachen_finish', mobile: false });
    assert.equal(night.neons.length, 3);
    assert.ok(night.lamps.length > place.lamps.length && place.lamps.length > 0);
    assert.ok(place.litePeds.some(ped => ped.zebraLink));
    assert.equal(place.zebras.length, AACHEN.crosswalks.length);
    assert.ok(place.traffic.some(route => route.isCyclist));
    for (const route of place.traffic) {
      for (const [index, point] of route.path.slice(1).entries()) {
        const prev = route.path[index];
        for (let portion = 0; portion <= 1; portion += 0.1) {
          const x = prev.x + (point.x - prev.x) * portion;
          const y = prev.y + (point.y - prev.y) * portion;
          assert.ok(mappedRoadContains(spans, { x, y }), `${route.tex}: ${x},${y}`);
        }
      }
    }
  });
}
