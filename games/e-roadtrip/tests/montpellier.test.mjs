import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { validateEroadtripScore } from '../../../cloudflare-worker/worker.js';
import { DomStub } from './dom-stub.mjs';
import { createFixtures } from './fixtures.mjs';

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const fake = new Proxy({ texture: { setFilter() {} } }, { get: (target, key) => target[key] ?? (() => fake) });
const painter = { add: { graphics: () => fake, text: () => fake, renderTexture: () => fake, image: () => fake } };

function mountForTest(scene) {
  const input = Object.assign(new EventEmitter(), { keyboard: new EventEmitter() });
  const scale = Object.assign(new EventEmitter(), { width: 320, height: 600 });
  const frame = {
    setPosition() {},
    setScale(zoom) { this.zoom = zoom; }
  };
  const timeouts = [];
  const labels = [];
  Object.assign(scene, {
    input, scale, events: new EventEmitter(),
    add: { graphics: () => fake, container: () => frame, text(_x, _y, text) { labels.push(text); return fake; } },
    time: { delayedCall(ms, finish) { timeouts.push({ ms, finish }); } },
    cameras: { main: { setBackgroundColor() {} } }
  });
  return { input, scale, frame, timeouts, labels };
}

export default function register(test, game) {
  const {
    MONTPELLIER, MONTPELLIER_APPROACHES, MONTPELLIER_JUNCTIONS, MONTPELLIER_LEZ, MONTPELLIER_SEA,
    MONTPELLIER_SAND, MONTPELLIER_HOTEL_BAY, MONTPELLIER_HOTEL_LABEL, MONTPELLIER_HOTEL_GOAL,
    regionalCityDrive, montpellierApproach, paintDrivingPlace, pointInCityRect,
    vehicleCapsule, capsulesOverlap, capsuleOverlapsRect, isRearParked, rotatedCarBounds,
    createDefaultPlan, getActiveRouteLegs, evaluateTripPlan, buildRemainingRoute, getEdgeById, CITY_TRANSITION_MINUTES,
    computeCityLightingProfile, ERoadtripController, CityDriveScene, MontpellierBeachArrivalScene,
    MontpellierFinaleScene, BEACH_ARRIVAL_DURATION_MS, BEACH_ARRIVAL_STAGE, beachArrivalFrame, FINALE_DURATION_MS
  } = game;
  const { route2: level, mkRun, mkScene, near } = createFixtures(game);
  const [routeA, mid, routeB] = level.routeOptions;

  test('Montpellier keeps the historic centre, Lez, lagoons and Mediterranean coast north-up', () => {
    const { comedie, antigone, gare, arc, peyrou, saintPierre, esplanade, corum, polygone, portMarianne,
      hotelDeVille, odysseum, lattes, airport, perols, arena, phare, hotel, carnon, maguelone } = MONTPELLIER.landmarks;
    const { montpellierEst, montpellierSud, montpellierOuest, saintJean } = MONTPELLIER_JUNCTIONS;
    const { west, east } = MONTPELLIER_APPROACHES;
    assert.ok(corum.y < esplanade.y && esplanade.y < comedie.y && gare.y > comedie.y);
    assert.ok(peyrou.x < arc.x && arc.x < comedie.x && saintPierre.x < comedie.x && saintPierre.y < comedie.y);
    assert.ok(comedie.x < polygone.x && polygone.x < antigone.x && antigone.x < MONTPELLIER_LEZ[0].x);
    assert.ok(portMarianne.x > antigone.x && hotelDeVille.y > portMarianne.y && odysseum.x > MONTPELLIER_LEZ[0].x);
    assert.ok(montpellierEst.x > comedie.x && montpellierEst.y < comedie.y && montpellierEst.y < montpellierSud.y);
    assert.ok(saintJean.x < montpellierOuest.x && montpellierOuest.x < montpellierSud.x);
    assert.ok(west.spawn.x < saintJean.x && east.spawn.x > montpellierEst.x && east.spawn.y < montpellierEst.y);
    assert.ok(comedie.y < lattes.y && lattes.y < phare.y);
    assert.ok(airport.x > lattes.x && airport.x > montpellierEst.x && montpellierEst.y < airport.y &&
      airport.y < arena.y && arena.y < perols.y);
    assert.ok(carnon.x > phare.x && carnon.y < phare.y && maguelone.x < phare.x && maguelone.y > phare.y);
    assert.ok(MONTPELLIER_SAND.some(rect => pointInCityRect(maguelone, rect)));
    const mouth = MONTPELLIER_LEZ.at(-1);
    assert.ok(phare.x > mouth.x + mouth.w && phare.x - (mouth.x + mouth.w) < 70);
    assert.ok(distance(phare, hotel) < 300 && Math.abs(hotel.y - phare.y) < 50);
    assert.equal(mouth.y + mouth.h, MONTPELLIER_SEA[0].y);
    assert.equal(MONTPELLIER_SEA[0].y + MONTPELLIER_SEA[0].h, MONTPELLIER.height);
    assert.equal(MONTPELLIER_SEA[0].w, MONTPELLIER.width);
    assert.ok(MONTPELLIER_SEA.every(rect => rect.y > comedie.y));
    for (const [index, bank] of MONTPELLIER_LEZ.slice(1).entries()) {
      const north = MONTPELLIER_LEZ[index];
      assert.equal(north.y + north.h, bank.y);
      assert.ok(bank.x < north.x + north.w && north.x < bank.x + bank.w);
    }
  });

  test('All Level 2 final legs launch the right Montpellier approach and keep destination semantics', t => {
    t.mock.method(Math, 'random', () => 0.5);
    const lastDefault = level.routeLegs.at(-1);
    assert.equal(lastDefault.edgeId, 'edge_lyon_montpellier');
    assert.equal(lastDefault.destinationAtEnd, true);
    assert.equal(lastDefault.citySegmentAtEnd, 'montpellier_finish');
    for (const route of [routeA, mid, routeB]) {
      const east = route === routeA;
      const approach = east ? MONTPELLIER_APPROACHES.east : MONTPELLIER_APPROACHES.west;
      const run = mkRun(level);
      run.plan = createDefaultPlan(level, 'mg4_standard', route.id);
      const legs = getActiveRouteLegs(level, run.plan);
      const last = legs.at(-1);
      assert.equal(last.edgeId, east ? 'edge_lyon_montpellier' : 'edge_clermont_montpellier');
      assert.equal(last.destinationAtEnd, true);
      assert.equal(last.citySegmentAtEnd, 'montpellier_finish');
      assert.ok(legs.slice(0, -1).every(leg => !leg.destinationAtEnd && leg.citySegmentAtEnd !== 'montpellier_finish'));
      assert.equal(montpellierApproach(route.id), approach);
      const drive = regionalCityDrive(last.citySegmentAtEnd, route.id);
      assert.equal(drive.spawn, approach.spawn);
      assert.equal(drive.exitPoint, approach.exit);
      assert.equal(drive.passThrough, false);
      assert.equal(drive.arrivalBay, MONTPELLIER_HOTEL_BAY);
      assert.equal(drive.wrongExitHint, 'Falsche Ausfahrt · bitte wenden');
      assert.equal(drive.wrongExits.some(sign => sign.label.startsWith('Aéroport')), !east);

      const edge = getEdgeById(last.edgeId);
      run.currentLegIndex = legs.length - 1;
      run.legProgressKm = edge.distanceKm - 0.01;
      const { scene, fired } = mkScene(level, run);
      scene.update(1000, 16);
      scene.update(1016, 16);
      assert.deepEqual(fired, ['montpellier_finish']);
      assert.equal(run.tollsEur, edge.tollEur);
      assert.deepEqual(run.paidTollLegIndices, [run.currentLegIndex]);
    }
  });

  test('Both approaches guide the car on clear roads to the hotel via the selected exit', t => {
    const { montpellierEst, airportJunction, carnon, saintJean, montpellierOuest, montpellierSud, lattes, palavasEast } =
      MONTPELLIER_JUNCTIONS;
    for (const route of [routeA, mid, routeB]) {
      const drive = regionalCityDrive('montpellier_finish', route.id);
      const place = paintDrivingPlace(painter, { preset: 'montpellier_finish', routeId: route.id, mobile: true, light: true });
      const { navigate, wrongExits } = place.cityGuide;
      const obstacles = [...place.buildings, ...place.water];
      const via = route === routeA ? [montpellierEst, airportJunction, carnon] :
        [saintJean, montpellierOuest, montpellierSud, lattes, palavasEast];
      const length = Math.round(navigate(drive.spawn).distance);
      t.diagnostic(`${route.id} guided drive: ${length} px`);
      assert.equal(place.cityGuide.label, 'Zum Strandhotel · Palavas');
      assert.equal(place.cityMinimap, MONTPELLIER.roads);
      assert.ok(wrongExits.every(exit => Number.isFinite(navigate(exit).distance) && !pointInCityRect(exit, drive.target)));

      let position = drive.spawn;
      let nextJunction = 0;
      for (let i = 0; i < 1000 && distance(position, drive.goal) > 5; i++) {
        const { aim, distance: remaining } = navigate(position);
        assert.ok(Number.isFinite(remaining) && distance(aim, position) > 0, route.id);
        const step = Math.min(distance(position, aim), 5);
        const angle = Math.atan2(aim.y - position.y, aim.x - position.x);
        position = { x: position.x + Math.cos(angle) * step, y: position.y + Math.sin(angle) * step };
        assert.ok(place.roadSurface(position), `${route.id} off road at ${JSON.stringify(position)}`);
        const car = vehicleCapsule(position.x, position.y, angle + Math.PI / 2);
        const block = obstacles.find(rect => capsuleOverlapsRect(car, rect));
        assert.equal(block, undefined, `${route.id} blocked at ${JSON.stringify(position)} by ${JSON.stringify(block)}`);
        if (nextJunction < via.length && distance(position, via[nextJunction]) < 50) nextJunction++;
      }
      assert.ok(distance(position, drive.goal) <= 5, route.id);
      assert.equal(nextJunction, via.length, route.id);
      const stopped = vehicleCapsule(drive.goal.x, drive.goal.y, 0);
      assert.ok(!obstacles.some(rect => capsuleOverlapsRect(stopped, rect)), 'parking position has physical clearance');
    }
  });

  test('Montpellier traffic starts clear of both spawns and follows the painted lanes', () => {
    const place = paintDrivingPlace(painter, { preset: 'montpellier_finish', mobile: true });
    const night = paintDrivingPlace(painter, { preset: 'montpellier_finish', mobile: false, night: true });
    assert.ok(place.zebras.length >= 2 && place.litePeds.some(ped => ped.zebraLink));
    assert.ok(place.signals.length && place.traffic.some(npc => npc.isCyclist));
    assert.equal(MONTPELLIER.roundaboutIslands.length, 2);
    assert.ok(place.cityGuide.cones.length >= 2 && place.cityGuide.cones.every(place.roadSurface));
    assert.ok(night.neons.length > 0 && night.lamps.length >= place.lamps.length);
    const obstacles = [...place.buildings, ...place.water];
    for (const npc of place.traffic) {
      const start = npc.path[npc.startIndex];
      const next = npc.path[npc.startIndex + 1];
      const spawnShape = vehicleCapsule(start.x, start.y, Math.atan2(next.y - start.y, next.x - start.x) + Math.PI / 2, npc.isCyclist);
      for (const { spawn } of Object.values(MONTPELLIER_APPROACHES)) {
        assert.ok(distance(start, spawn) >= 160);
        assert.ok(!capsulesOverlap(spawnShape, vehicleCapsule(spawn.x, spawn.y, spawn.rot)));
      }
      for (const [index, end] of npc.path.slice(1).entries()) {
        const start = npc.path[index];
        const rotation = Math.atan2(end.y - start.y, end.x - start.x) + Math.PI / 2;
        for (let tenth = 0; tenth <= 10; tenth++) {
          const x = start.x + (end.x - start.x) * tenth / 10;
          const y = start.y + (end.y - start.y) * tenth / 10;
          assert.ok(place.roadSurface({ x, y }), `${npc.tex} off road at ${x},${y}`);
          const shape = vehicleCapsule(x, y, rotation, npc.isCyclist);
          assert.ok(!obstacles.some(rect => capsuleOverlapsRect(shape, rect)), `${npc.tex} blocked at ${x},${y}`);
          assert.ok(!capsuleOverlapsRect(shape, MONTPELLIER_HOTEL_BAY.bounds), `${npc.tex} would block the hotel bay`);
        }
      }
    }
  });

  test('Rear-first parking dwell hands the city arrival to the prelude, then the original finale and results', t => {
    window.requestAnimationFrame = fn => fn();
    t.after(() => { delete window.requestAnimationFrame; });
    const threshold = [[59, true, true, 'tap'], [60, false, false, 'key'], [72, true, false, 'timer']];
    for (const [stress, clean, relaxed, skip] of threshold) {
      const run = { ...mkRun(level), stress, peakStress: stress, elapsedMinutes: 1042 };
      const starts = [];
      const results = [];
      const host = Object.assign(Object.create(ERoadtripController.prototype), {
        bridge: { runState: run, isLightTheme: () => relaxed },
        level, drivingHUD: { setMode() {} }, stageWrapEl: new DomStub(), stopAllGameplayScenes() {},
        game: {
          scene: { start: (...args) => starts.push(args), stop: key => starts.push([key, 'stop']) },
          scale: { refresh() {} }
        },
        finishLevel: cleanArrival => results.push({ cleanArrival, board: level.boardId })
      });

      const scene = new CityDriveScene();
      scene.place = paintDrivingPlace(painter, { preset: 'montpellier_finish', mobile: true });
      Object.assign(scene, {
        preset: 'montpellier_finish', cleanRun: clean, targetZone: scene.place.targetZone,
        bridge: { onCitySegmentComplete: (preset, cleanArrival) => host.handleCitySegmentComplete(preset, cleanArrival) },
        player: { ...MONTPELLIER_HOTEL_GOAL, rotation: Math.PI }, scale: { width: 320, height: 350 },
        navArrow: fake, distText: fake, reverseHintText: fake
      });
      const tick = count => {
        for (let i = 0; i < count; i++) scene.updateNavigationAndArrival(0.05, false);
      };
      const pose = () => ({
        ...scene.player, speed: scene.carSpeed,
        footprint: rotatedCarBounds(scene.player.x, scene.player.y, scene.player.rotation)
      });
      assert.equal(isRearParked(MONTPELLIER_HOTEL_BAY, pose()), false);
      tick(20);
      assert.equal(scene.dwellInTargetSec, 0);
      scene.player.rotation = 0;
      scene.carSpeed = -8;
      tick(20);
      assert.deepEqual(starts, []);
      scene.carSpeed = 0;
      assert.equal(isRearParked(MONTPELLIER_HOTEL_BAY, pose()), true);
      tick(11);
      scene.player.x += 29;
      tick(1);
      assert.equal(scene.dwellInTargetSec, 0);
      scene.player.x -= 29;
      tick(11);
      assert.deepEqual(starts, []);
      tick(1);
      assert.ok(scene.completed);
      assert.equal(starts.length, 1);
      assert.equal(starts[0][0], 'MontpellierBeachArrivalScene');
      assert.equal(run.elapsedMinutes, 1042 + CITY_TRANSITION_MINUTES.montpellier_finish);
      assert.equal(run.incidentLog.at(-1).impact, clean ? 'positive' : 'negative');

      const arrival = new MontpellierBeachArrivalScene();
      const arrivalUI = mountForTest(arrival);
      arrival.init(starts[0][1]);
      arrival.create();
      assert.equal(arrivalUI.labels[0], 'PALAVAS-LES-FLOTS');
      assert.equal(arrivalUI.timeouts[0].ms, BEACH_ARRIVAL_DURATION_MS);
      assert.equal(arrivalUI.frame.zoom, 320 / 192);
      arrivalUI.scale.width = 800;
      arrivalUI.scale.height = 260;
      arrivalUI.scale.emit('resize');
      assert.equal(arrivalUI.frame.zoom, 260 / 108);
      arrivalUI.input.keyboard.emit('keydown', { key: 'Enter', repeat: true });
      assert.equal(starts.length, 1);
      assert.deepEqual(results, []);
      if (skip === 'tap') arrivalUI.input.emit('pointerup');
      else if (skip === 'key') arrivalUI.input.keyboard.emit('keydown', { key: 'Enter' });
      else arrivalUI.timeouts[0].finish();
      arrivalUI.timeouts[0].finish();
      assert.equal(starts.length, 3);
      assert.deepEqual(starts[1], ['MontpellierBeachArrivalScene', 'stop']);
      assert.equal(starts[2][0], 'MontpellierFinaleScene');
      assert.equal(starts[2][1].relaxed, relaxed);
      assert.deepEqual(results, []);
      arrival.events.emit('shutdown');
      assert.equal(arrivalUI.input.listenerCount('pointerup'), 0);

      const finale = new MontpellierFinaleScene();
      const finaleUI = mountForTest(finale);
      finale.init(starts[2][1]);
      finale.create();
      assert.equal(finaleUI.timeouts[0].ms, FINALE_DURATION_MS);
      assert.deepEqual(results, []);
      if (skip === 'timer') finaleUI.timeouts[0].finish();
      else finaleUI.input.emit('pointerup');
      assert.deepEqual(results, [{ cleanArrival: clean, board: 'eroadtrip_l2' }]);
    }
  });

  test('The prelude animates the family leaving the car and the two children and dog reaching the water', () => {
    const { waterlineY } = BEACH_ARRIVAL_STAGE;
    assert.ok(BEACH_ARRIVAL_DURATION_MS >= 3000 && BEACH_ARRIVAL_DURATION_MS <= 4000);
    const initial = beachArrivalFrame(0);
    assert.ok(!initial.doorOpen && !initial.parents.visible && !initial.olderChild.visible);
    assert.ok(beachArrivalFrame(750).doorOpen && beachArrivalFrame(750).parents.visible);
    const running = beachArrivalFrame(1500);
    const end = beachArrivalFrame(BEACH_ARRIVAL_DURATION_MS);
    for (const actor of ['olderChild', 'youngerChild', 'dog']) {
      assert.ok(running[actor].moving && running[actor].y < waterlineY);
      assert.ok(end[actor].splashing && !end[actor].moving && end[actor].y >= waterlineY);
    }
    assert.ok(end.parents.y < waterlineY);
    assert.deepEqual(beachArrivalFrame(BEACH_ARRIVAL_DURATION_MS * 2), end);
  });

  test('Montpellier adds seven minutes to every forecast and Navi while staying within both score windows', t => {
    const baseline = [1042, 1066, 1132];
    const minutes = CITY_TRANSITION_MINUTES.montpellier_finish;
    assert.equal(minutes, 7);
    assert.equal(level.targetArrivalMinutes, 1100);
    const earlier = {
      ...level, routeOptions: level.routeOptions.map(route => ({
        ...route, legs: route.legs.map(leg => leg.destinationAtEnd ? { ...leg, citySegmentAtEnd: undefined } : leg)
      }))
    };
    for (const [index, route] of level.routeOptions.entries()) {
      const run = mkRun(level);
      run.plan = createDefaultPlan(level, 'mg4_standard', route.id);
      const legs = getActiveRouteLegs(level, run.plan);
      run.currentLegIndex = legs.length - 1;
      const eta = buildRemainingRoute(level, run);
      assert.equal(eta.destination, MONTPELLIER_HOTEL_LABEL);
      assert.equal(eta.segments[0].to, montpellierApproach(route.id).exit.label);
      near(eta.etaMinutes - buildRemainingRoute(earlier, run).etaMinutes, minutes);
      const forecast = evaluateTripPlan(level, run.plan);
      assert.equal(forecast.totalMinutes, baseline[index] + minutes);
      const meta = { board: level.boardId, levelId: level.id, minutes: forecast.totalMinutes, costEur: forecast.estimatedTotalCostEur };
      for (const board of [level.boardId, 'eroadtrip']) {
        assert.equal(validateEroadtripScore(board, { score: 0, meta }), null, route.id);
      }
      assert.ok(meta.minutes >= 550 && meta.minutes <= 22000);
      t.diagnostic(`${route.id}: ${forecast.totalMinutes} min`);
    }

    const dawn = computeCityLightingProfile(5.5, 40, 'montpellier_finish', 'clear');
    const afternoon = computeCityLightingProfile(5.5, 600, 'montpellier_finish', 'clear');
    const evening = computeCityLightingProfile(5.5, 780, 'montpellier_finish', 'clear');
    const rain = computeCityLightingProfile(5.5, 600, 'montpellier_finish', 'rain');
    assert.ok(dawn.isDuskOrDawn && !afternoon.isNight && afternoon.ambientAlpha === 0);
    assert.ok(evening.isDuskOrDawn && evening.streetlampsOn && evening.ambientColor === 0xa34a2b);
    assert.ok(rain.isRain && rain.headlightsOn);
  });
}
