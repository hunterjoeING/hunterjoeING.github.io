import assert from 'node:assert/strict';
import { createFixtures } from './fixtures.mjs';

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const fake = new Proxy({ texture: { setFilter() {} } }, { get: (target, key) => target[key] ?? (() => fake) });
const scene = { add: { graphics: () => fake, text: () => fake, renderTexture: () => fake } };

export default function register(test, game) {
  const {
    HANNOVER, HANNOVER_JUNCTIONS, HANNOVER_ENTRIES, HANNOVER_MESSESCHNELLWEG, HANNOVER_MESSE_LOT,
    KOELN, KOELN_JUNCTIONS, KOELN_RHEIN, KOELN_EXITS, HIRTSHALS, HIRTSHALS_CHECK_IN,
    regionalCityDrive, mappedRoadSpans, mappedRoadContains, mappedCityNavigator, pointInCityRect,
    paintDrivingPlace, vehicleCapsule, capsuleOverlapsRect, ERoadtripController, createDefaultPlan,
    getLevelById, LEVELS, CITY_TRANSITION_MINUTES
  } = game;
  const { mkRun, route1: level1 } = createFixtures(game);
  const [a, b, c] = level1.routeOptions;


  test('Playable levels no longer use a Köln city drive; the map stays for Level 5', () => {
    const legsOf = level => [level.routeLegs, ...level.routeOptions.map(option => option.legs)].flat();
    const segments = level => legsOf(level).flatMap(leg => [leg.citySegmentAtStart, leg.citySegmentAtEnd]);
    for (const level of LEVELS.filter(level => level.playable)) {
      assert.ok(!segments(level).includes('koeln_ring'), level.id);
    }
    const level5 = getLevelById('level_5_ecannonball');
    assert.equal(level5.playable, false);
    assert.equal(level5.startCityId, 'koeln');
    assert.ok(!segments(level5).includes('koeln_ring'));
  });

  test('Hannover places the Cityring, centre, forest, Messe and motorway junctions north-up', () => {
    const { kroepcke, hbf, rathaus, arena, airport, herrenhaeuser, zoo, hcc, messe, messeLaatzen, zagArena } = HANNOVER.landmarks;
    const { herrenhausen, bothfeld, lahe, buchholz, kirchhorst, hannoverOst, anderten, hannoverSued, messeNord, messeSued } = HANNOVER_JUNCTIONS;
    const [maschsee] = HANNOVER.water;
    const eilenriede = HANNOVER.parks.find(area => pointInCityRect(zoo, area));
    assert.ok(hbf.y < kroepcke.y && rathaus.y > kroepcke.y && maschsee.y > rathaus.y && maschsee.h > maschsee.w);
    assert.ok(arena.x < maschsee.x && herrenhaeuser.x < kroepcke.x && herrenhaeuser.y < kroepcke.y);
    assert.ok(eilenriede.x > kroepcke.x && hcc.x > kroepcke.x);
    assert.ok(HANNOVER_MESSESCHNELLWEG.fourLane);
    assert.ok(HANNOVER_MESSESCHNELLWEG.points.every(p => p.x > kroepcke.x));
    assert.ok(HANNOVER_MESSESCHNELLWEG.points.some(p => pointInCityRect(p, eilenriede)));
    assert.ok(messe.x > eilenriede.x + eilenriede.w && messe.y > maschsee.y);
    assert.ok(messeLaatzen.x < messe.x && zagArena.x > messe.x && messeSued.y > messeNord.y);
    const a2 = HANNOVER.roads.find(road => road.points.includes(herrenhausen) && road.points.includes(buchholz));
    const a7 = HANNOVER.roads.find(road => road.points.includes(kirchhorst) && road.points.includes(hannoverSued));
    assert.ok(a2.points.every(p => p.y < hbf.y));
    assert.ok(a7.points.every(p => p.x > messe.x));
    assert.ok(herrenhausen.x < bothfeld.x && bothfeld.x < lahe.x && lahe.x < buchholz.x);
    assert.ok(buchholz.x > kroepcke.x && buchholz.y < kroepcke.y);
    assert.ok(kirchhorst.y < hannoverOst.y && hannoverOst.y < anderten.y && anderten.y < hannoverSued.y);
    assert.ok(hannoverSued.x > messe.x && hannoverSued.y > messe.y);
    assert.ok(airport.y < herrenhausen.y && airport.x < kroepcke.x);
    const ring = HANNOVER.roads.find(road => road.points.includes(HANNOVER_JUNCTIONS.koenigsworther));
    assert.deepEqual(ring.points[0], ring.points.at(-1));
    assert.ok(ring.points.includes(HANNOVER_JUNCTIONS.raschplatz) && ring.points.includes(HANNOVER_JUNCTIONS.aegidientor));
  });

  test('Köln keeps the Dom and Ringe on the west bank and the Deutz landmarks across the Rhein', () => {
    const { dom, hbf, hohenzollern, triangle, messe, lanxess, stMartin, schokoladenmuseum, kranhaeuser, zoo } = KOELN.landmarks;
    const { kreuzWest, kreuzNord, kreuzSued, heumar, kreuzOst, rudolfplatz, ebertplatz, barbarossaplatz, chlodwigplatz } = KOELN_JUNCTIONS;
    const bankAt = ({ y }) => KOELN_RHEIN.find(strip => y >= strip.y && y < strip.y + strip.h);
    for (const point of [dom, hbf, stMartin, schokoladenmuseum, kranhaeuser]) assert.ok(point.x < bankAt(point).x, point.label);
    for (const point of [triangle, messe, lanxess]) {
      const strip = bankAt(point);
      assert.ok(point.x > strip.x + strip.w, point.label);
    }
    assert.ok(pointInCityRect(hohenzollern, bankAt(hohenzollern)) && zoo.y < dom.y);
    assert.ok(hbf.y < dom.y && distance(hbf, dom) < 145);
    assert.ok(rudolfplatz.x < dom.x && barbarossaplatz.x < dom.x && ebertplatz.y < dom.y && chlodwigplatz.y > dom.y);
    assert.ok(kreuzWest.x < dom.x && kreuzNord.y < dom.y && kreuzSued.y > dom.y && heumar.x > dom.x && kreuzOst.y < heumar.y);
    const roads = mappedRoadSpans(KOELN.roads);
    assert.ok(!mappedRoadContains(roads, hohenzollern), 'rail bridge stays closed to cars');
    assert.ok(KOELN.roads.some(road => road.bridge && road.points.includes(KOELN_JUNCTIONS.rodenkirchen)));
  });

  test('Hirtshals keeps the sea, basins and ferry north of the town and the lighthouse to the west', () => {
    const level = getLevelById('level_7_nordkapp_ultimate');
    const { fyr, station, terminal, oceanarium, ferry } = HIRTSHALS.landmarks;
    const drive = regionalCityDrive('ferry_denmark', level.defaultRouteId);
    const sea = HIRTSHALS.water.find(rect => rect.y === 0);
    assert.equal(sea.w, HIRTSHALS.width);
    assert.ok(sea.y + sea.h < terminal.y && terminal.y < station.y);
    assert.ok(HIRTSHALS.water.some(rect => pointInCityRect(ferry, rect)));
    assert.ok(fyr.x < station.x && fyr.y > terminal.y && oceanarium.x > station.x && oceanarium.y > station.y);
    assert.ok(drive.spawn.y > oceanarium.y && drive.spawn.y > drive.goal.y);
    assert.equal(drive.goal, HIRTSHALS_CHECK_IN);
    assert.equal(drive.passThrough, true);
    assert.equal(level.playable, false);
    assert.equal(level.ferryDeadlineMinutes, 420);
  });

  test('The Köln scenic drive reaches Deutz via the old town and a road bridge', () => {
    const { ebertplatz, deutz } = KOELN_JUNCTIONS;
    const place = paintDrivingPlace(scene, { preset: 'koeln_ring', mobile: true });
    const navigate = mappedCityNavigator(mappedRoadSpans(KOELN.roads), deutz);
    const obstacles = [...place.buildings, ...place.water];
    let position = ebertplatz;
    let sawDom = false;
    for (let i = 0; i < 300 && distance(position, deutz) > 5; i++) {
      const { aim, distance: remaining } = navigate(position);
      assert.ok(Number.isFinite(remaining));
      const step = Math.min(distance(aim, position), 5);
      const angle = Math.atan2(aim.y - position.y, aim.x - position.x);
      position = { x: position.x + Math.cos(angle) * step, y: position.y + Math.sin(angle) * step };
      assert.ok(place.roadSurface(position));
      const shape = vehicleCapsule(position.x, position.y, angle + Math.PI / 2);
      assert.ok(!obstacles.some(rect => capsuleOverlapsRect(shape, rect)), JSON.stringify(position));
      sawDom ||= distance(position, KOELN.landmarks.dom) < 130;
    }
    assert.ok(sawDom && distance(position, deutz) <= 5);
  });

  test('Regional guides reach every selected zone on drivable roads in the right interchange order', t => {
    const { messeNord, messeSued, seelhorst } = HANNOVER_JUNCTIONS;
    const { kreuzWest, kreuzNord, kreuzSued, rodenkirchen, heumar } = KOELN_JUNCTIONS;
    const cases = [
      ['hannover_messe', a, HANNOVER_ENTRIES.north, [seelhorst, messeNord]],
      ['hannover_messe', b, HANNOVER_ENTRIES.north, [seelhorst, messeNord]],
      ['hannover_messe', c, HANNOVER_ENTRIES.south, [messeSued]],
      ['koeln_ring', a, undefined, [kreuzWest, kreuzNord]],
      ['koeln_ring', c, undefined, [kreuzWest, kreuzSued, rodenkirchen, heumar]],
      ['ferry_denmark', a, undefined, []]
    ];

    for (const [preset, route, spawn, via] of cases) {
      const drive = regionalCityDrive(preset, route.id);
      const place = paintDrivingPlace(scene, { preset, routeId: route.id, mobile: true });
      const spans = mappedRoadSpans(drive.layout.roads);
      const navigate = mappedCityNavigator(spans, drive.goal);
      const obstacles = [...place.buildings, ...place.water];
      assert.ok(pointInCityRect(drive.goal, drive.target));
      for (const exit of drive.wrongExits) {
        assert.ok(!pointInCityRect(exit, drive.target), exit.label);
        assert.ok(Number.isFinite(navigate(exit).distance), exit.label);
      }
      if (preset === 'hannover_messe') {
        assert.equal(drive.spawn, spawn);
        assert.equal(drive.target, HANNOVER_MESSE_LOT);
        assert.equal(drive.passThrough, false);
      } else if (preset === 'koeln_ring') {
        assert.equal(drive.goal, route === c ? KOELN_EXITS.a4 : KOELN_EXITS.a1);
        assert.equal(drive.passThrough, true);
        assert.ok(route === c ? drive.goal.x > heumar.x : drive.goal.y < kreuzNord.y);
      }
      t.diagnostic(`${drive.title}: ${Math.round(navigate(drive.spawn).distance)} px`);
      let position = drive.spawn;
      let nextJunction = 0;
      for (let i = 0; i < 900 && distance(position, drive.goal) > 5; i++) {
        const { aim, distance: remaining } = navigate(position);
        assert.ok(Number.isFinite(remaining) && distance(position, aim) > 0, drive.title);
        const step = Math.min(distance(aim, position), 5);
        const angle = Math.atan2(aim.y - position.y, aim.x - position.x);
        position = { x: position.x + Math.cos(angle) * step, y: position.y + Math.sin(angle) * step };
        assert.ok(mappedRoadContains(spans, position), `${drive.title}: off road at ${JSON.stringify(position)}`);
        const shape = vehicleCapsule(position.x, position.y, angle + Math.PI / 2);
        assert.ok(!obstacles.some(rect => capsuleOverlapsRect(shape, rect)), `${drive.title}: blocked at ${JSON.stringify(position)}`);
        if (nextJunction < via.length && distance(position, via[nextJunction]) < 48) nextJunction++;
      }
      assert.ok(distance(position, drive.goal) <= 5, drive.title);
      assert.equal(nextJunction, via.length, drive.title);
    }
    assert.ok(HANNOVER_ENTRIES.north.y < HANNOVER.landmarks.kroepcke.y && HANNOVER_ENTRIES.north.x > HANNOVER.landmarks.kroepcke.x);
    assert.ok(HANNOVER_ENTRIES.south.x > HANNOVER_MESSE_LOT.x && HANNOVER_ENTRIES.south.y > HANNOVER_MESSE_LOT.y);
  });

  test('Regional city traffic follows the painted lanes clear of buildings and shoreline', () => {
    for (const preset of ['hannover_messe', 'koeln_ring', 'ferry_denmark']) {
      const place = paintDrivingPlace(scene, { preset, mobile: true, light: true });
      const night = paintDrivingPlace(scene, { preset, mobile: false, light: false, night: true });
      const obstacles = [...place.buildings, ...place.water];
      assert.ok(place.zebras.length > 0 && place.litePeds.some(ped => ped.zebraLink));
      assert.ok(place.cityGuide.cones.length > 0 && place.lamps.length > 0);
      assert.ok(night.neons.length > 0 && night.lamps.length >= place.lamps.length);
      assert.ok(place.traffic.some(route => route.isCyclist) && place.traffic.some(route => route.isPolice));
      assert.ok(place.cityGuide.cones.every(point => place.roadSurface(point)));
      for (const route of place.traffic) {
        for (const [index, end] of route.path.slice(1).entries()) {
          const start = route.path[index];
          const rot = Math.atan2(end.y - start.y, end.x - start.x) + Math.PI / 2;
          for (let t = 0; t <= 1; t += 0.1) {
            const x = start.x + (end.x - start.x) * t;
            const y = start.y + (end.y - start.y) * t;
            assert.ok(place.roadSurface({ x, y }), `${preset} ${route.tex}: off road at ${x},${y}`);
            const shape = vehicleCapsule(x, y, rot, route.isCyclist);
            assert.ok(!obstacles.some(rect => capsuleOverlapsRect(shape, rect)),
              `${preset} ${route.tex}: blocked at ${x},${y}`);
          }
        }
      }
    }
  });

  test('Köln resumes the selected highway corridor and Messe completion still opens the visit', () => {
    for (const [route, expected] of [[a, /A1.*Dortmund/], [c, /A4.*Olpe/]]) {
      const run = mkRun(level1);
      run.plan = createDefaultPlan(level1, 'mg4_standard', route.id);
      run.legProgressKm = 80;
      run.countryLimitKmh = 120;
      const transitions = [];
      const controller = Object.assign(Object.create(ERoadtripController.prototype), {
        level: level1, bridge: { runState: run },
        enterAutobahn: () => transitions.push(run.currentLegIndex),
        openHannoverMesse: current => transitions.push(current === run)
      });
      controller.handleCitySegmentComplete('koeln_ring', true);
      assert.equal(run.legProgressKm, 0);
      assert.equal(run.countryLimitKmh, undefined);
      assert.equal(run.elapsedMinutes, CITY_TRANSITION_MINUTES.koeln_ring);
      assert.match(run.incidentLog[0].title, expected);
      assert.match(run.incidentLog[0].detail, expected);
      controller.handleCitySegmentComplete('hannover_messe', true);
      assert.deepEqual(transitions, [1, true]);
    }
  });

  test('City traffic never starts on top of the player spawn', () => {
    const cases = [
      ...['hannover_messe', 'koeln_ring'].flatMap(preset => [a, b, c].map(route => regionalCityDrive(preset, route.id))),
      regionalCityDrive('ferry_denmark', '')
    ];
    for (const drive of cases) {
      for (const car of drive.layout.traffic) {
        assert.ok(distance(car.path[0], drive.spawn) >= 160, `${drive.title}: ${car.tex} starts ${Math.round(distance(car.path[0], drive.spawn))} px from spawn`);
      }
    }
  });
}
