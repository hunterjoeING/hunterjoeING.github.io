import assert from 'node:assert/strict';
import { createFixtures } from './fixtures.mjs';

export default function register(test, game) {
  const {
    MUENCHEN, INNSBRUCK, INNSBRUCK_HOTEL, MARIENPLATZ_SPAWN, buildRemainingRoute, createDefaultPlan,
    winterCityRoute, winterCityDrive, winterCityNavigator, cityRoadSpans, cityRoadBounds, winterCityWater,
    pointInCityRect, getActiveRouteLegs, getEdgeById, getLevelById, computeCityLightingProfile
  } = game;
  const level = getLevelById('level_3_alps_winter');
  const { mkRun } = createFixtures(game);

  test('München is north-up with the Isar, three rings and correctly placed motorway ramps', () => {
    const landmarks = MUENCHEN.landmarks;
    const center = landmarks.marienplatz;
    for (const feature of ['frauenkirche', 'olympiapark', 'bmw']) {
      assert.ok(landmarks[feature].x < center.x && landmarks[feature].y < center.y, feature);
    }
    assert.ok(landmarks.theresienwiese.x < center.x && landmarks.theresienwiese.y > center.y);
    assert.ok(landmarks.hauptbahnhof.x < landmarks.stachus.x && landmarks.stachus.x < center.x);
    assert.ok(landmarks.odeonsplatz.y < center.y && landmarks.sendlingerTor.y > center.y);
    assert.ok(landmarks.isartor.x > center.x);
    assert.ok(MUENCHEN.water.every(channel => channel.x > center.x));
    assert.ok(MUENCHEN.islands.some(island => pointInCityRect(landmarks.museum, island)));
    assert.ok(landmarks.museum.y > center.y && landmarks.maximilianeum.x > MUENCHEN.water[1].x + MUENCHEN.water[1].w);
    assert.ok(landmarks.englischerGarten.y < center.y && landmarks.englischerGarten.x < MUENCHEN.water[1].x);
    assert.ok(Object.entries(landmarks).every(([id, point]) => id === 'allianzArena' || point.y > landmarks.allianzArena.y));

    const [altstadt, mittlerer, a99] = MUENCHEN.roads.map(road => road.points);
    for (const ring of [altstadt, mittlerer]) {
      assert.deepEqual(ring[0], ring.at(-1));
      const [nw, ne, se, sw] = ring;
      assert.ok(nw.x < center.x && ne.x > center.x && nw.y < center.y && se.y > center.y && sw.x < center.x);
    }
    assert.ok(mittlerer[0].x < altstadt[0].x && mittlerer[0].y < altstadt[0].y);
    assert.equal(a99.length, 4);
    assert.equal(a99[0].x, a99[1].x);
    assert.equal(a99[1].y, a99[2].y);
    assert.equal(a99[2].x, a99[3].x);
    assert.ok(a99[0].y > a99[1].y && a99[3].y > a99[2].y);
    const { a8Salzburg, a95, a9, a96, a8Stuttgart, a92, a94, a995 } = MUENCHEN.signs;
    assert.ok(a8Salzburg.x > center.x && a8Salzburg.y > center.y);
    assert.ok(a95.x < center.x && a95.y > center.y);
    assert.ok(a9.y < center.y && a9.y < landmarks.allianzArena.y && a96.x < center.x);
    assert.ok(a8Stuttgart.x < center.x && a8Stuttgart.y < center.y);
    assert.ok(a92.x > a9.x && a92.y < center.y && a94.x > a92.x && a995.y > center.y);
    assert.equal(MARIENPLATZ_SPAWN.y, 900);
  });

  test('Innsbruck puts the Altstadt south of the Inn and the A12 interchanges in order', () => {
    const { nordkette, hungerburgbahn, goldenesDachl, hofburg, dom, annasaeule, triumphPforte,
      hauptbahnhof, airport, bergisel } = INNSBRUCK.landmarks;
    assert.ok(Object.values(INNSBRUCK.landmarks).every(point => point === nordkette || point.y > nordkette.y));
    const [innWest, innCenter, innEast, sill] = INNSBRUCK.water;
    assert.equal(innWest.x, 0);
    assert.equal(innEast.x + innEast.w, INNSBRUCK.width);
    assert.ok(innCenter.y > hungerburgbahn.y && innCenter.y + innCenter.h < goldenesDachl.y);
    assert.ok(sill.x > goldenesDachl.x && sill.y <= innEast.y + innEast.h && sill.y + sill.h > hauptbahnhof.y);
    assert.ok(hofburg.x > goldenesDachl.x && dom.x > goldenesDachl.x && dom.y < goldenesDachl.y);
    assert.ok(annasaeule.y > goldenesDachl.y && triumphPforte.y > annasaeule.y);
    assert.ok(hauptbahnhof.x > goldenesDachl.x && hauptbahnhof.y > goldenesDachl.y);
    assert.ok(airport.x < goldenesDachl.x);
    const exits = ['voels', 'west', 'wilten', 'mitte', 'amras', 'ost'].map(id => INNSBRUCK.signs[id]);
    assert.ok(exits.every((exit, index) => exit.y > innCenter.y && (!index || exit.x > exits[index - 1].x)));
    assert.ok(bergisel.y > exits[0].y && INNSBRUCK.signs.a13.y > exits[0].y);
    assert.ok(INNSBRUCK_HOTEL.x > annasaeule.x && INNSBRUCK_HOTEL.y < triumphPforte.y);
  });

  test('Winter routes choose the Munich motorway and guide to Sirmione', () => {
    const exits = ['a8Salzburg', 'a95', 'a8Salzburg'];
    for (const [index, option] of level.routeOptions.entries()) {
      assert.equal(winterCityRoute(option.id).munichExit, exits[index]);
      const start = winterCityDrive('muenchen_start', option.id);
      assert.equal(start.goal, MUENCHEN.signs[exits[index]]);
      assert.equal(start.wrongExits.length, 7);
      assert.ok(start.wrongExits.every(sign => !pointInCityRect(start.goal, sign.zone)));

      const run = { ...mkRun(level), plan: createDefaultPlan(level, 'mg4_standard', option.id) };
      const legs = getActiveRouteLegs(level, run.plan);
      assert.equal(legs[0].citySegmentAtStart, 'muenchen_start');
      assert.equal(legs.at(-1).citySegmentAtEnd, undefined);
      run.currentLegIndex = legs.length - 1;
      run.legProgressKm = getEdgeById(legs.at(-1).edgeId).distanceKm - 1;
      const nav = buildRemainingRoute(level, run);
      assert.equal(nav.destination, 'Sirmione');
      assert.equal(nav.segments.at(-1).to, 'Sirmione');
    }
  });

  test('The reserved Innsbruck preset exposes both approaches and the hotel goal directly', () => {
    for (const [routeId, exit] of [['l3_route_a_inntal', 'ost'], ['l3_route_b_fernpass_reschen', 'west']]) {
      const finish = winterCityDrive('innsbruck_finish', routeId);
      assert.equal(finish.via.x, INNSBRUCK.signs[exit].x);
      assert.ok(exit === 'west' ? finish.spawn.x < finish.via.x : finish.spawn.x > finish.via.x);
      assert.ok(finish.spawn.x !== finish.goal.x && finish.target === INNSBRUCK_HOTEL);
    }
  });

  test('City guidance reaches both exit sides and the hotel by roads that bridge the waterways', () => {
    for (const preset of ['muenchen_start', 'innsbruck_finish']) {
      for (const routeId of ['l3_route_a_inntal', 'l3_route_b_fernpass_reschen']) {
        const { layout, spawn, goal, via } = winterCityDrive(preset, routeId);
        const spans = cityRoadSpans(layout.roads);
        const asphalt = spans.map(cityRoadBounds);
        const water = winterCityWater(layout, asphalt);
        const targets = via ? [via, goal] : [goal];
        let position = { x: spawn.x, y: spawn.y };
        for (const target of targets) {
          const navigate = winterCityNavigator(spans, target);
          for (let i = 0; i < 1500 && Math.hypot(position.x - target.x, position.y - target.y) > 6; i++) {
            const { aim, distance } = navigate(position);
            assert.ok(Number.isFinite(distance));
            const length = Math.hypot(aim.x - position.x, aim.y - position.y);
            assert.ok(length > 0, `guidance stopped early at ${JSON.stringify(position)}`);
            const step = Math.min(length, 6);
            position = {
              x: position.x + (aim.x - position.x) * step / length,
              y: position.y + (aim.y - position.y) * step / length
            };
            assert.ok(asphalt.some(road => pointInCityRect(position, road)));
            assert.ok(water.every(channel => !pointInCityRect(position, channel)));
          }
          assert.ok(Math.hypot(position.x - target.x, position.y - target.y) <= 6,
            `${preset} ${routeId} failed to reach ${JSON.stringify(target)} from ${JSON.stringify(position)}`);
        }
      }
    }
  });

  test('München at 06:30 uses dawn lighting, headlights and snow after either departure choice', () => {
    for (const elapsed of [0, 8]) {
      const lighting = computeCityLightingProfile(level.departureTimeHour, elapsed, 'muenchen_start', 'snow');
      assert.equal(lighting.isDuskOrDawn, true);
      assert.equal(lighting.isNight, false);
      assert.equal(lighting.headlightsOn, true);
      assert.equal(lighting.isSnow, true);
    }
  });
}
