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
    add: {
      graphics: () => fake, container: () => frame, rectangle: () => fake, renderTexture: () => fake,
      text(_x, _y, text) { labels.push(text); return fake; }
    },
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
    computeCityLightingProfile, ERoadtripController, CityDriveScene, MontpellierBeachArrivalScene, DrivingHUD, formatClock,
    MontpellierFinaleScene, BEACH_ARRIVAL_DURATION_MS, BEACH_ARRIVAL_STAGE, beachArrivalFrame, FINALE_DURATION_MS, HOTEL_AC
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
    const night = paintDrivingPlace(painter, { preset: 'montpellier_finish', mobile: true, night: true, light: false });
    assert.ok(place.zebras.length >= 2 && place.litePeds.some(ped => ped.zebraLink));
    assert.ok(place.signals.length && place.traffic.some(npc => npc.isCyclist));
    assert.equal(MONTPELLIER.roundaboutIslands.length, 2);
    assert.ok(place.cityGuide.cones.length >= 2 && place.cityGuide.cones.every(place.roadSurface));
    assert.deepEqual(night.neons, []);
    assert.deepEqual(night.lamps, place.lamps);
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
      const run = { ...mkRun(level), stress, peakStress: stress, elapsedMinutes: 1042, activeWeather: 'storm', isNight: true };
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
      assert.equal(run.activeWeather, 'clear');
      assert.equal(run.isNight, false);
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
      // The prelude-to-finale transition also clears inherited weather.
      run.activeWeather = 'fog';
      run.isNight = true;
      if (skip === 'tap') arrivalUI.input.emit('pointerup');
      else if (skip === 'key') arrivalUI.input.keyboard.emit('keydown', { key: 'Enter' });
      else arrivalUI.timeouts[0].finish();
      arrivalUI.timeouts[0].finish();
      assert.equal(starts.length, 3);
      assert.deepEqual(starts[1], ['MontpellierBeachArrivalScene', 'stop']);
      assert.equal(starts[2][0], 'MontpellierFinaleScene');
      assert.equal(run.activeWeather, 'clear');
      assert.equal(run.isNight, false);
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

  test('All three default Level 2 forecasts reach Palavas in the evening within the worker score window', t => {
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
      const clock = elapsed => (level.departureTimeHour * 60 + elapsed) % (24 * 60);
      const hotelLeg = legs.findIndex(leg => leg.overnightAtEnd);
      assert.equal(hotelLeg, 2);
      assert.ok(legs.every(leg => leg.weatherOverride === 'clear' && !leg.isNightLeg));
      const hotelArrival = forecast.legForecasts.slice(0, hotelLeg + 1)
        .reduce((elapsed, leg) => elapsed + leg.driveMinutes + leg.chargeMinutes, 0);
      assert.ok(clock(hotelArrival) >= 5 * 60 && clock(hotelArrival) <= 11 * 60);
      assert.ok(clock(forecast.totalMinutes) >= 17 * 60 && clock(forecast.totalMinutes) <= 19.5 * 60);
      const meta = { board: level.boardId, levelId: level.id, minutes: forecast.totalMinutes, costEur: forecast.estimatedTotalCostEur };
      for (const board of [level.boardId, 'eroadtrip']) {
        assert.equal(validateEroadtripScore(board, { score: 0, meta }), null, route.id);
      }
      assert.ok(meta.minutes >= 550 && meta.minutes <= 22000);
      t.diagnostic(`${route.id}: hotel ${formatClock(level, hotelArrival)}–${formatClock(level, hotelArrival + HOTEL_AC.stayMinutes)}, destination ${formatClock(level, forecast.totalMinutes)} (${forecast.totalMinutes} min)`);
    }
  });

  test('Reachable charge plans with varied speed, vehicles, stops and incident delays still target the evening', t => {
    const scenarios = [
      [routeA, 'vw_id7_tourer', 10, 80, 0, ['nancy_tesla', 'macon_electra']],
      [routeA, 'vw_id7_tourer', -10, 80, 6, ['lux_ionity', 'arlon_tesla', 'nancy_tesla', 'macon_electra']],
      [routeA, 'mg4_standard', 0, 90, 0, ['lux_ionity', 'nancy_tesla', 'beaune_ionity', 'valence_ionity']],
      [routeA, 'mg4_standard', -10, 95, 11, ['lux_ionity', 'arlon_tesla', 'nancy_tesla', 'beaune_ionity', 'valence_ionity']],
      [mid, 'tesla_model_3_highland', 0, 80, 14, ['charleville_atlante', 'troyes_vianeo', 'moulins_vianeo', 'millau_electra']],
      [mid, 'tesla_model_3_highland', 0, 80, 0, ['charleville_atlante', 'troyes_vianeo', 'nevers_atlante', 'moulins_vianeo', 'millau_electra', 'beziers_atlante']],
      [routeB, 'tesla_model_3_highland', 0, 80, 14, ['senlis_electra', 'orleans_tesla', 'clermont_ionity', 'millau_electra']],
      [routeB, 'vw_id3_pro', 0, 70, 11, ['valenciennes_tesla', 'orleans_tesla', 'clermont_ionity', 'millau_electra']]
    ];
    for (const [route, vehicle, speedDelta, targetSocPct, delay, stationIds] of scenarios) {
      const plan = createDefaultPlan(level, vehicle, route.id);
      for (const leg of plan.legPlans) leg.targetSpeedKmh += speedDelta;
      plan.plannedStops = stationIds.map(id => {
        const station = game.getChargerById(`chg_${id}`);
        return { chargerId: station.id, legIndex: route.legs.findIndex(leg => leg.edgeId === station.edgeId), targetSocPct };
      });
      const forecast = evaluateTripPlan(level, plan);
      const arrival = (level.departureTimeHour * 60 + forecast.totalMinutes + delay) % (24 * 60);
      assert.ok(forecast.valid && forecast.minSocEncountered >= 3, `${route.id} ${vehicle}`);
      assert.ok(arrival >= 17 * 60 && arrival <= 20.5 * 60, formatClock(level, forecast.totalMinutes + delay));
      const forecastHtml = game.PlanningUI.prototype.renderForecastBanner(level, forecast, 0);
      assert.ok(forecastHtml.includes(`Abfahrt 23:35 · Ankunft ca. ${formatClock(level, forecast.totalMinutes)}`));
      t.diagnostic(`${route.shortLabel} ${vehicle} ${speedDelta} km/h, ${stationIds.length} stops at ${targetSocPct}% + ${delay} min: ${formatClock(level, forecast.totalMinutes + delay)}`);
    }
    assert.ok(game.getEventById('evt_hotel_overnight').choices.every(choice => choice.timeDeltaMin === HOTEL_AC.stayMinutes));
  });

  test('Montpellier stays golden and dry for every clock and weather input without changing other city profiles', () => {
    const golden = computeCityLightingProfile(18, 0, 'montpellier_finish', 'clear');
    assert.deepEqual(golden, {
      ambientColor: 0xffb96c, ambientAlpha: 0.13, headlightsOn: false, headlightAlpha: 0,
      streetlampsOn: false, lampGlowAlpha: 0, isNight: false, isDuskOrDawn: false,
      isRain: false, isStorm: false, isFog: false, isSnow: false
    });
    for (const weather of ['clear', 'rain', 'storm', 'fog', 'snow']) {
      for (let hour = 0; hour <= 24; hour += 0.25) {
        for (const forceNight of [true, false]) {
          assert.deepEqual(computeCityLightingProfile(hour, 0, 'montpellier_finish', weather, forceNight), golden);
          assert.deepEqual(computeCityLightingProfile(level.departureTimeHour, hour * 60, 'montpellier_finish', weather, forceNight), golden);
        }
      }
    }
    const nightStart = computeCityLightingProfile(level.departureTimeHour, 0, 'aachen_start', 'clear');
    assert.ok(nightStart.isNight && nightStart.headlightsOn && nightStart.streetlampsOn);
    assert.equal(nightStart.ambientAlpha, 0.58);
    assert.deepEqual(computeCityLightingProfile(24, 0, 'aachen_start', 'clear'),
      computeCityLightingProfile(0, 0, 'aachen_start', 'clear'));
    assert.equal(formatClock({ departureTimeHour: 0 }, 0), '00:00');
    assert.equal(formatClock(level, 25), '00:00');
    assert.ok(computeCityLightingProfile(12, 0, 'aachen_finish', 'clear').isNight);
    const hannover = computeCityLightingProfile(18, 0, 'hannover_messe', 'rain');
    assert.ok(hannover.isRain && hannover.isDuskOrDawn && hannover.headlightsOn && hannover.streetlampsOn);
    assert.equal(hannover.ambientColor, 0x311042);
  });

  test('Montpellier entry resets the HUD and dry city renderer after any upstream weather', () => {
    const run = { ...mkRun(level), activeWeather: 'storm', isNight: true };
    const root = new DomStub();
    const starts = [];
    const controller = Object.assign(Object.create(ERoadtripController.prototype), {
      bridge: { runState: run }, level, drivingHUD: new DrivingHUD(root, new DomStub(), {}),
      stopAllGameplayScenes() {}, game: { scene: { start: (...scene) => starts.push(scene) } }
    });
    controller.enterCitySegment('montpellier_finish');
    assert.equal(run.activeWeather, 'clear');
    assert.equal(run.isNight, false);
    assert.match(root.querySelector('[data-field="clock"]').textContent, /☀️ Klar/);
    assert.deepEqual(starts.map(([scene, data]) => [scene, data.preset]), [['CityDriveScene', 'montpellier_finish']]);
    run.activeWeather = 'snow';
    run.isNight = true;
    const scene = new CityDriveScene();
    scene.init(starts[0][1]);
    assert.equal(run.activeWeather, 'clear');
    assert.equal(run.isNight, false);
    scene.add = { graphics: () => fake, rectangle: () => fake, ellipse: () => fake };
    scene.player = { x: 0, y: 0, visible: true };
    scene.isMobilePerf = true;
    scene.setupLightingAndWeather();
    assert.equal(scene.weatherParticles.length, 0);
    assert.equal(scene.rainSplashes.length, 0);
    assert.equal(scene.lampVisuals.length, 0);
    assert.equal(scene.fogOverlay, undefined);
    assert.equal(scene.lightningOverlay, undefined);
    assert.equal(scene.playerHeadlight, undefined);
    assert.equal(scene.roadWet, false);
    scene.updateCoastalLight(1.5);
    controller.enterCitySegment('aachen_start');
    assert.equal(run.isNight, true);
    assert.match(root.querySelector('[data-field="clock"]').textContent, /🌙 Nacht/);
  });

  test('Level 2 previews use the night itinerary, with both arrival variants clear at 18:00', t => {
    const previousSearch = window.location.search;
    window.requestAnimationFrame = () => {};
    t.after(() => {
      window.location.search = previousSearch;
      delete window.requestAnimationFrame;
    });
    for (const preview of ['level2arrival', 'level2arrival-stress', 'level2rain', 'level2hotel', 'level2wc']) {
      window.location.search = `?erpreview=${preview}`;
      let autobahnOptions;
      const host = Object.assign(Object.create(ERoadtripController.prototype), {
        bridge: {}, save: { unlockedLevelOrder: 1 }, stageWrapEl: new DomStub(), plannerEl: new DomStub(),
        enterAutobahn(options) { autobahnOptions = options; }
      });
      host.maybeStartPreview();
      const run = host.bridge.runState;
      const leg = getActiveRouteLegs(level, run.plan)[run.currentLegIndex];
      assert.equal(leg.weatherOverride, 'clear');
      if (preview.startsWith('level2arrival')) {
        assert.equal(leg.citySegmentAtEnd, 'montpellier_finish');
        assert.equal(formatClock(level, run.elapsedMinutes), '18:00');
        assert.equal(run.activeWeather, 'clear');
        assert.equal(run.isNight, false);
        assert.equal(run.stress >= 60, preview.endsWith('-stress'));
      } else if (preview === 'level2hotel') {
        assert.equal(leg.overnightAtEnd, true);
        assert.match(formatClock(level, run.elapsedMinutes), /^0[5-8]:/);
      } else {
        assert.ok(run.elapsedMinutes > 0 && run.isNight);
        if (preview === 'level2rain') {
          assert.equal(run.activeWeather, 'rain');
          assert.equal(autobahnOptions.previewWeather, 'rain');
        }
      }
    }
  });
}
