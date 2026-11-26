import assert from 'node:assert/strict';
import { DomStub } from './dom-stub.mjs';
import { createFixtures } from './fixtures.mjs';
import { validateEroadtripScore } from '../../../cloudflare-worker/worker.js';

export default function register(test, game) {
  const {
    buildSubmission, buildWinterQueueEvent, chainFittingChoice, COLD_START_KM, createDefaultPlan, ERoadtripController,
    estimateChargeSession, evaluateStopSkip, evaluateTripPlan, findWinterQueueAlternative, getActiveRouteLegs,
    getChargerById, getEdgeById, getEventById, getLevelById, getVehicleById, getWifeDialogueById,
    nextWinterRoadEvent, PlanningUI, predictLiveTripSoc, SNOWPLOUGH_SPEED_KMH, stopKey, winterQueueCars,
    winterRoadEnergyKwh, winterStartEffects, WINTER_CITY_MINUTES, WINTER_LEVEL_ID, WINTER_START_EVENT
  } = game;
  const { mkRun, mkScene, near, route2 } = createFixtures(game);
  const level = getLevelById(WINTER_LEVEL_ID);
  const car = 'mg4_standard';
  const controllerWithRun = run => Object.assign(Object.create(ERoadtripController.prototype), {
    level, bridge: { runState: run }
  });

  test('finishing Level 2 unlocks Level 3 departure through the campaign planner', t => {
    const oldGetElement = document.getElementById;
    document.getElementById = () => null;
    t.after(() => { document.getElementById = oldGetElement; });
    const save = { cashEur: 26000, ownedVehicleId: car, unlockedLevelOrder: 2, completedLevels: {} };
    const root = new DomStub();
    const planner = new PlanningUI(root, {});
    const plan = createDefaultPlan(level, car);
    const forecast = evaluateTripPlan(level, plan);
    planner.render(level, plan, save, forecast);
    assert.match(root.innerHTML, /Level 3 wird freigeschaltet/);
    assert.doesNotMatch(root.innerHTML, /id="btn-start-trip"/);

    const run = mkRun(route2);
    const controller = Object.assign(controllerWithRun(run), {
      level: route2, save, eventModal: { close() {} }, drivingHUD: { setMode() {} },
      stopAllGameplayScenes() {}, stageWrapEl: new DomStub(), resultsUI: { show() {} }
    });
    controller.finishLevel(true);
    assert.equal(save.unlockedLevelOrder, 3);
    planner.render(level, plan, save, forecast);
    assert.match(root.innerHTML, /id="btn-start-trip"/);
    assert.match(root.innerHTML, /Winterreifen sind Pflicht und bereits montiert/);
  });

  test('München departure applies either cold-start choice before the city and books the exit before the highway', t => {
    const oldFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = () => {};
    t.after(() => { window.requestAnimationFrame = oldFrame; });
    for (const precondition of [true, false]) {
      const controller = Object.assign(controllerWithRun(null), {
        plan: createDefaultPlan(level, car), save: { ownedVehicleId: car },
        stageWrapEl: new DomStub(), plannerEl: new DomStub(),
        enterCitySegment(preset) {
          assert.equal(preset, 'muenchen_start');
          this.bridge.paused = false;
        },
        eventModal: { showDynamicEvent(event, choose, resume) {
          assert.equal(event, WINTER_START_EVENT);
          assert.match(event.title, /München.*06:30.*−8 °C/);
          assert.equal(controller.bridge.paused, true);
          assert.equal(controller.bridge.runState.elapsedMinutes, 0);
          choose(event.choices[precondition ? 0 : 1]);
          resume();
        } },
        enterAutobahn() { this.bridge.paused = false; }
      });
      controller.startTrip();
      const { runState: run, paused } = controller.bridge;
      const effects = winterStartEffects(precondition);
      assert.equal(run.elapsedMinutes, effects.timeDeltaMin);
      assert.equal(run.socPct, 96 + effects.socDeltaPct);
      assert.equal(run.stress, level.passengers.initialStress + effects.stressDelta);
      assert.equal(Boolean(run.coldStart), !precondition);
      assert.equal(run.activeWeather, 'snow');
      assert.equal(paused, false);
      controller.bridge.paused = true;
      controller.handleCitySegmentComplete('muenchen_start', true);
      assert.equal(run.elapsedMinutes, effects.timeDeltaMin + WINTER_CITY_MINUTES.muenchen_start);
      assert.match(run.incidentLog.at(-1).title, /Marienplatz.*A8 Salzburg/);
      assert.equal(controller.bridge.paused, false);
    }
  });

  test('winter tyres, the cold distance window and the convoy affect only the applicable distance', () => {
    near(winterRoadEnergyKwh(20, 10, false, 0, true, 10), 2);
    near(winterRoadEnergyKwh(20, 10, true), 2.04);
    near(winterRoadEnergyKwh(20, 10, true, COLD_START_KM - 4, true), 2.1624);
    near(winterRoadEnergyKwh(20, 10, true, COLD_START_KM, true), 2.04);
    near(winterRoadEnergyKwh(20, 10, true, 20, true, 25), 0.204 * (4 * 1.15 * 0.94 + 0.94 + 5));

    const run = { ...mkRun(level), coldStart: true, activeWeather: 'snow', currentSpeedKmh: 100 };
    assert.ok(predictLiveTripSoc(level, run).exactArrivalNextSocPct <
      predictLiveTripSoc(level, { ...run, coldStart: false }).exactArrivalNextSocPct);
  });

  test('winter pools resolve to real definitions and road events follow distance and route', () => {
    for (const id of level.eventPoolIds) assert.equal(getEventById(id)?.id, id);
    for (const id of level.wifeDialogueIds) assert.equal(getWifeDialogueById(id)?.id, id);
    const run = { ...mkRun(level), distanceDrivenKm: 10, legProgressKm: 10, coldStart: true };
    const a = getEdgeById('edge_muenchen_inntaldreieck');
    const border = getEdgeById('edge_inntaldreieck_kufstein');
    const b = getEdgeById('edge_garmisch_fernpass');
    const c = getEdgeById('edge_sterzing_jaufenpass');
    assert.equal(nextWinterRoadEvent(level, run, a), 'evt_child_cold');
    assert.equal(nextWinterRoadEvent(level, { ...run, coldStart: false }, a), undefined);
    run.triggeredEventIds.push('evt_child_cold');
    run.legProgressKm = 56;
    assert.equal(nextWinterRoadEvent(level, run, a), 'evt_inntal_ski_jam');
    run.triggeredEventIds.push('evt_inntal_ski_jam');
    run.legProgressKm = 24;
    assert.equal(nextWinterRoadEvent(level, run, border), 'evt_vignette_check');
    run.legProgressKm = 14;
    assert.equal(nextWinterRoadEvent(level, run, b), 'evt_snowplough_convoy');
    run.triggeredEventIds.push('evt_snowplough_convoy');
    run.legProgressKm = 13;
    assert.equal(nextWinterRoadEvent(level, run, c), 'evt_avalanche_closure');
    assert.equal(nextWinterRoadEvent(route2, run, c), undefined);
  });

  test('winter event choices apply comfort, convoy cap, and detour time, energy and distance', () => {
    const run = { ...mkRun(level), activeWeather: 'snow', currentSpeedKmh: 55, legProgressKm: 50, distanceDrivenKm: 50 };
    const controller = controllerWithRun(run);
    function choose(id, ix = 0) {
      const { title, choices } = getEventById(id);
      controller.applyEventChoice(title, choices[ix]);
    }
    choose('evt_child_cold');
    assert.equal(run.socPct, 78);
    assert.equal(run.stress, 11);
    choose('evt_child_cold', 1);
    assert.equal(run.socPct, 78);
    assert.equal(run.stress, 19);
    choose('evt_snowplough_convoy');
    assert.equal(run.snowploughUntilKm, 62);
    const { scene } = mkScene(level, run);
    scene.playerSpeedKmh = SNOWPLOUGH_SPEED_KMH;
    scene.update(0, 50);
    assert.equal(run.speedCapKmh, SNOWPLOUGH_SPEED_KMH);
    const { elapsedMinutes, legProgressKm, distanceDrivenKm, energyUsedKwh } = run;
    choose('evt_avalanche_closure');
    near(run.elapsedMinutes, elapsedMinutes + 14);
    near(run.distanceDrivenKm, distanceDrivenKm + 12);
    assert.equal(run.legProgressKm, legProgressKm);
    assert.ok(run.energyUsedKwh > energyUsedKwh);
    scene.update(0, 50);
    assert.equal(run.speedCapKmh, undefined);
  });

  test('seeded Kufstein queues and alternate chargers work on both Inntal routes', () => {
    const samples = Array.from({ length: 12 }, (_, i) => {
      const key = stopKey(0, 'chg_kufstein_ionity');
      const seed = `winter-test-${i}`;
      const cars = winterQueueCars(seed, key);
      assert.equal(winterQueueCars(seed, key), cars);
      return cars;
    });
    assert.deepEqual([...new Set(samples)].sort(), [2, 3, 4]);
    for (const route of [level.routeOptions[0], level.routeOptions[2]]) {
      const alternativeId = 'chg_kufstein_ac';
      const station = getChargerById('chg_kufstein_ionity');
      const run = { ...mkRun(level), activeWeather: 'snow', currentSpeedKmh: 85 };
      run.plan = createDefaultPlan(level, car, route.id);
      run.currentLegIndex = route.legs.findIndex(leg => leg.edgeId === station.edgeId);
      run.legProgressKm = station.edgeProgress * getEdgeById(station.edgeId).distanceKm;
      run.distanceDrivenKm = run.legProgressKm;
      const stop = { chargerId: station.id, legIndex: run.currentLegIndex, targetSocPct: 65 };
      run.plan.plannedStops.push(stop);

      assert.equal(evaluateStopSkip(level, run, stop).allowed, true);
      run.socPct = 7;
      assert.equal(evaluateStopSkip(level, run, stop).allowed, false);
      const alternative = findWinterQueueAlternative(level, run, stop, station);
      assert.deepEqual(alternative.stop, { ...stop, chargerId: alternativeId });
      assert.equal(alternative.station.maxKw, 22);
      const queue = buildWinterQueueEvent(station, 4, false, alternative.station);
      assert.deepEqual(queue.choices.map(choice => choice.id), ['winter_queue_wait', 'winter_queue_alternative']);
      assert.equal(queue.choices[0].timeDeltaMin, 24);
      assert.equal(run.plan.plannedStops.length, route.defaultPlannedStops.length + 1);

      run.socPct = 2;
      assert.equal(findWinterQueueAlternative(level, run, stop, station), undefined);
    }
  });

  test('waiting enters the charger park, while the queue skip and replacement survive highway resume', () => {
    const station = getChargerById('chg_kufstein_ionity');
    const legIndex = level.routeOptions[0].legs.findIndex(leg => leg.edgeId === station.edgeId);
    const key = stopKey(legIndex, station.id);
    for (const { action, alreadyPlanned } of [
      { action: 'wait' }, { action: 'skip' }, { action: 'alternative' }, { action: 'alternative', alreadyPlanned: true }
    ]) {
      const run = { ...mkRun(level), activeWeather: 'snow', currentSpeedKmh: 100, leaderboardRunId: 'queue-resume' };
      run.legProgressKm = station.edgeProgress * getEdgeById(station.edgeId).distanceKm;
      run.distanceDrivenKm = run.legProgressKm;
      run.currentLegIndex = legIndex;
      const stop = { chargerId: station.id, legIndex, targetSocPct: 76 };
      run.plan.plannedStops.push(stop);
      if (alreadyPlanned) run.plan.plannedStops.push({ ...stop, chargerId: 'chg_kufstein_ac', targetSocPct: 65 });
      const controller = Object.assign(controllerWithRun(run), {
        drivingHUD: { clearTouchStates() {} },
        enterChargerSegment(park) { assert.equal(action, 'wait'); assert.equal(park, station); },
        enterAutobahn() { assert.notEqual(action, 'wait'); },
        eventModal: { showDynamicEvent(event, choose, resume) {
          assert.equal(controller.bridge.paused, true);
          choose(event.choices.find(option => option.id === `winter_queue_${action}`));
          resume();
        } }
      });
      controller.handleRoadChargerArrival(station);
      assert.deepEqual(run.skippedStopKeys, action === 'wait' ? [] : [key]);
      assert.equal(run.undoableRoadStopKey, undefined);
      assert.equal(run.elapsedMinutes, action === 'wait' ? winterQueueCars(run.leaderboardRunId, key) * 6 : 0);
      if (action === 'alternative') {
        const replacement = run.plan.plannedStops.find(item => item.chargerId === 'chg_kufstein_ac');
        assert.equal(replacement.targetSocPct, alreadyPlanned ? 65 : stop.targetSocPct);
        const { scene, fired } = mkScene(level, run);
        run.triggeredEventIds.push(...level.eventPoolIds);
        for (let i = 0; i < 60 && fired.length === 0; i++) scene.update(i * 50, 50);
        assert.deepEqual(fired, ['chg_kufstein_ac']);
      }
    }
  });

  test('all three winter routes cross the Alps with reachable default charges and a daylight arrival', () => {
    assert.equal(level.routeOptions.length, 3);
    for (const [index, route] of level.routeOptions.entries()) {
      const plan = createDefaultPlan(level, car, route.id);
      const legs = getActiveRouteLegs(level, plan);
      const edges = legs.map(leg => getEdgeById(leg.edgeId));
      assert.equal(edges[0].fromCityId, 'muenchen');
      assert.equal(edges.at(-1).toCityId, 'sirmione');
      assert.ok(edges.every((edge, i) => i === 0 || edge.fromCityId === edges[i - 1].toCityId));
      assert.equal(legs[0].citySegmentAtStart, 'muenchen_start');
      assert.ok(legs.every(leg => leg.citySegmentAtEnd !== 'innsbruck_finish'));
      assert.deepEqual(edges.filter(edge => edge.isPassOption).map(edge => edge.toCityId),
        [[], ['fernpass'], ['jaufenpass']][index]);
      assert.equal(edges.at(-1).defaultWeather, 'clear');
      const distance = edges.reduce((total, edge) => total + edge.distanceKm, 0);
      const expected = [450, 483, 477][index];
      assert.ok(Math.abs(distance - expected) < expected * 0.03);
      for (const stationId of ['chg_brennero_ionity', 'chg_trento_ionity', 'chg_affi_ionity']) {
        const station = getChargerById(stationId);
        if (index !== 1 || stationId !== 'chg_brennero_ionity') {
          assert.ok(edges.some(edge => edge.id === station.edgeId), stationId);
        }
      }
      const forecast = evaluateTripPlan(level, plan);
      const roadOnly = evaluateTripPlan({
        ...level, routeOptions: [{ ...route, legs: legs.map(leg => ({ ...leg, citySegmentAtStart: undefined })) }]
      }, plan);
      assert.equal(forecast.valid, true);
      assert.ok(plan.plannedStops.length >= 2);
      assert.equal(forecast.totalMinutes, roadOnly.totalMinutes + WINTER_CITY_MINUTES.muenchen_start);
      const arrivalHour = level.departureTimeHour + forecast.totalMinutes / 60;
      assert.ok(arrivalHour >= 12 && arrivalHour < 16);
    }
    assert.equal(getChargerById('chg_affi_ionity').maxKw, 350);
    assert.equal(getChargerById('chg_affi_ionity').stalls, 18);
    assert.equal(getChargerById('chg_brennero_tesla').stalls, 5);
  });

  test('all three default winter plans reach the Sirmione finale and score within the worker bounds', t => {
    t.mock.method(Math, 'random', () => 0.9);
    window.requestAnimationFrame = callback => callback();
    t.after(() => { delete window.requestAnimationFrame; });
    const scores = [];
    for (const [index, slowForTunnel] of [[0, true], [0, false], [1, false], [2, false]]) {
      const route = level.routeOptions[index];
      const plan = createDefaultPlan(level, car, route.id);
      const legs = getActiveRouteLegs(level, plan);
      const forecast = evaluateTripPlan(level, plan);
      assert.equal(legs.filter(leg => leg.destinationAtEnd).length, 1);
      assert.equal(forecast.tollsEur, [47.5, 17, 42.5][index]);
      const effects = winterStartEffects(index !== 0);
      const run = {
        ...mkRun(level), plan, activeWeather: 'snow', coldStart: effects.startsCold,
        socPct: 96 + effects.socDeltaPct, elapsedMinutes: effects.timeDeltaMin,
        stress: level.passengers.initialStress + effects.stressDelta, peakStress: level.passengers.initialStress,
        hungerNeed: 22, bladderNeed: 10, currentSpeedKmh: plan.legPlans[0].targetSpeedKmh
      };
      const { scene, fired } = mkScene(level, run);
      let finale;
      let result;
      const controller = Object.assign(controllerWithRun(run), {
        save: { cashEur: 26000, unlockedLevelOrder: 3, completedLevels: {} },
        eventModal: {
          close() {},
          showDynamicEvent(event, choose, resume) {
            choose(event.choices[0]);
            resume();
          }
        },
        stageWrapEl: new DomStub(),
        drivingHUD: { setMode() {}, clearTouchStates() {} }, stopAllGameplayScenes() {},
        game: { scale: { refresh() {} }, scene: { start(key, data) { finale = { key, ...data }; } } },
        resultsUI: { show(_level, _run, value) { result = value; } }
      });
      controller.bridge = scene.bridge;
      controller.bridge.isLightTheme = () => false;
      controller.enterAutobahn = () => {};
      controller.handleCitySegmentComplete('muenchen_start', true);
      scene.bridge.onAlpineEvent = event => {
        fired.push(event.kind);
        if (event.kind === 'pass') {
          const fitting = chainFittingChoice();
          controller.applyEventChoice('Schneeketten', fitting);
          run.alpinePass = { legIndex: run.currentLegIndex, name: event.name, chainsFitted: true, complete: true };
        } else if (event.kind === 'descent') {
          run.alpineDescent = { legIndex: run.currentLegIndex, mode: 'strong', recoveredKwh: 0, brakeHeatM: 0, overheated: false };
        } else {
          controller.handleAlpineEvent(event);
        }
        scene.bridge.paused = false;
      };
      scene.bridge.onWifeDialogueTrigger = () => { scene.bridge.paused = false; };
      scene.bridge.onDestinationArrival = () => {
        fired.push('destination');
        controller.handleDestinationArrival();
      };
      scene.bridge.onTriggerChargerSegment = station => {
        fired.push(station.id);
        const stop = plan.plannedStops.find(stop => stop.chargerId === station.id && stop.legIndex === run.currentLegIndex);
        const target = Math.max(run.socPct, stop.targetSocPct);
        const charge = estimateChargeSession(getVehicleById(car), station, run.socPct, target, []);
        run.elapsedMinutes += charge.durationMinutes;
        run.chargingCostEur += charge.costEur;
        run.socPct = target;
        run.completedStopKeys.push(stopKey(run.currentLegIndex, station.id));
        scene.bridge.paused = false;
      };
      scene.bridge.onDynamicEventTrigger = id => {
        fired.push(id);
        if (id === game.SECTION_CONTROL_EVENT_ID) {
          controller.handleDynamicEvent(id);
          return;
        }
        const event = getEventById(id);
        const choice = event.choices[index === 1 && id === 'evt_avalanche_closure' ? 1 : 0];
        controller.applyEventChoice(event.title, choice);
        scene.bridge.paused = false;
      };
      for (let tick = 0; tick < 1300 && !scene.bridge.paused; tick++) {
        scene.update(tick * 50, 50);
        if (slowForTunnel && run.speedCapLabel?.startsWith('Tunnel voraus')) {
          plan.legPlans[run.currentLegIndex].targetSpeedKmh = game.WINTER_TUNNEL.limitKmh;
        }
      }
      assert.equal(fired.at(-1), 'destination', fired.join(', '));
      assert.equal(finale.key, 'SirmioneFinaleScene');
      assert.equal(fired.includes('innsbruck_finish'), false);
      assert.equal(finale.relaxed, game.hasRelaxedBeachFinale(run));
      assert.equal(run.completed, undefined);
      assert.equal(result, undefined);
      finale.onComplete();
      assert.equal(run.completed, true);
      assert.equal(result.cleanArrival, true);
      assert.ok(!fired.includes('aachen_finish') && !fired.includes('leer'));
      assert.equal(run.tollsEur, forecast.tollsEur);
      assert.equal(fired.includes('evt_vignette_check'), index !== 1);
      assert.equal(fired.includes('evt_avalanche_closure'), index !== 0);
      assert.equal(fired.includes('evt_child_cold'), index === 0);
      assert.equal(fired.includes(game.SECTION_CONTROL_EVENT_ID), index !== 1 && !slowForTunnel);
      assert.deepEqual(fired.filter(id => id === 'pass' || id === 'descent'), index === 0 ? [] : ['pass', 'descent']);
      assert.ok(run.socPct > 0);
      assert.equal(run.completedStopKeys.length, plan.plannedStops.length);
      assert.ok(result.totalScore >= 0 && result.totalScore <= 1000);
      assert.ok(result.totalMinutes >= 0.5 * level.targetArrivalMinutes &&
        result.totalMinutes <= 1.25 * level.targetArrivalMinutes, `${route.id}: ${result.totalMinutes} min`);
      const submission = buildSubmission(level, run, result);
      assert.ok(submission);
      assert.equal(validateEroadtripScore(level.boardId, submission), null);
      assert.equal(validateEroadtripScore('eroadtrip', submission), null);
      t.diagnostic(`${route.shortLabel}${slowForTunnel ? ' (80 km/h at tunnel approach)' : ''}: ${result.totalMinutes} min, ${result.totalScore} points`);
      if (index !== 0 || slowForTunnel) scores.push(result.totalScore);
    }
    assert.ok(Math.max(...scores) - Math.min(...scores) <= 160, scores.join(', '));
  });
}
