import assert from 'node:assert/strict';
import { DomStub } from './dom-stub.mjs';
import { createFixtures } from './fixtures.mjs';

export default function register(test, game) {
  const {
    buildSubmission, buildWinterQueueEvent, COLD_START_KM, createDefaultPlan, ERoadtripController,
    evaluateRun, evaluateStopSkip, evaluateTripPlan, findWinterQueueAlternative, getActiveRouteLegs,
    getChargerById, getEdgeById, getEventById, getLevelById, getVehicleById, getWifeDialogueById,
    nextWinterRoadEvent, PlanningUI, predictLiveTripSoc, SNOWPLOUGH_SPEED_KMH, stopKey, winterQueueCars,
    winterRoadEnergyKwh, winterStartEffects, WINTER_LEVEL_ID, WINTER_START_EVENT
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

  test('München departure pauses before the highway and applies both cold-start choices', t => {
    const oldFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = () => {};
    t.after(() => { window.requestAnimationFrame = oldFrame; });
    for (const precondition of [true, false]) {
      const controller = Object.assign(controllerWithRun(null), {
        plan: createDefaultPlan(level, car), save: { ownedVehicleId: car },
        stageWrapEl: new DomStub(), plannerEl: new DomStub(), enterCitySegment: assert.fail,
        eventModal: { showDynamicEvent(event, choose, resume) {
          assert.equal(event, WINTER_START_EVENT);
          assert.match(event.title, /München.*06:00.*−8 °C/);
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
    const a = getEdgeById('edge_muenchen_innsbruck');
    const b = getEdgeById('edge_garmisch_innsbruck');
    const c = getEdgeById('edge_muenchen_achenpass_innsbruck');
    assert.equal(nextWinterRoadEvent(level, run, a), 'evt_child_cold');
    assert.equal(nextWinterRoadEvent(level, { ...run, coldStart: false }, a), undefined);
    run.triggeredEventIds.push('evt_child_cold');
    run.legProgressKm = 70;
    assert.equal(nextWinterRoadEvent(level, run, a), 'evt_inntal_ski_jam');
    run.triggeredEventIds.push('evt_inntal_ski_jam');
    run.legProgressKm = 88;
    assert.equal(nextWinterRoadEvent(level, run, a), 'evt_vignette_check');
    run.legProgressKm = 25;
    assert.equal(nextWinterRoadEvent(level, run, b), 'evt_snowplough_convoy');
    run.triggeredEventIds.push('evt_snowplough_convoy');
    run.legProgressKm = 101;
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

  test('seeded queues are stable at both hubs and independent of the scene', () => {
    const samples = Array.from({ length: 12 }, (_, i) => {
      const key = stopKey(0, 'chg_kufstein_ionity');
      const seed = `winter-test-${i}`;
      const cars = winterQueueCars(seed, key);
      assert.equal(winterQueueCars(seed, key), cars);
      return cars;
    });
    assert.deepEqual([...new Set(samples)].sort(), [2, 3, 4]);
    for (const [id, alternativeId, route] of [
      ['chg_kufstein_ionity', 'chg_kufstein_ac', level.routeOptions[0]],
      ['chg_achenkirch_enbw', 'chg_achenkirch_ac', level.routeOptions[2]]
    ]) {
      const station = getChargerById(id);
      const run = { ...mkRun(level), activeWeather: 'snow', currentSpeedKmh: 85 };
      run.plan = createDefaultPlan(level, car, route.id);
      run.legProgressKm = station.edgeProgress * getEdgeById(station.edgeId).distanceKm;
      run.distanceDrivenKm = run.legProgressKm;
      const stop = { chargerId: station.id, legIndex: 0, targetSocPct: 65 };
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
      assert.equal(run.plan.plannedStops.length, 1);

      run.socPct = 2;
      assert.equal(findWinterQueueAlternative(level, run, stop, station), undefined);
    }
  });

  test('waiting enters the charger park, while the queue skip and replacement survive highway resume', () => {
    const station = getChargerById('chg_kufstein_ionity');
    const key = stopKey(0, station.id);
    for (const { action, alreadyPlanned } of [
      { action: 'wait' }, { action: 'skip' }, { action: 'alternative' }, { action: 'alternative', alreadyPlanned: true }
    ]) {
      const run = { ...mkRun(level), activeWeather: 'snow', currentSpeedKmh: 100, leaderboardRunId: 'queue-resume' };
      run.legProgressKm = station.edgeProgress * getEdgeById(station.edgeId).distanceKm;
      run.distanceDrivenKm = run.legProgressKm;
      const stop = { chargerId: station.id, legIndex: 0, targetSocPct: 76 };
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
        assert.equal(run.plan.plannedStops.length, 2);
        assert.equal(run.plan.plannedStops[1].targetSocPct, alreadyPlanned ? 65 : stop.targetSocPct);
        const { scene, fired } = mkScene(level, run);
        run.triggeredEventIds.push(...level.eventPoolIds);
        for (let i = 0; i < 10 && fired.length === 0; i++) scene.update(i * 50, 50);
        assert.deepEqual(fired, ['chg_kufstein_ac']);
      }
    }
  });

  test('all three winter routes forecast and finish with the starter EV and produce valid scores', () => {
    const scores = [];
    for (const [index, route] of level.routeOptions.entries()) {
      const plan = createDefaultPlan(level, car, route.id);
      const forecast = evaluateTripPlan(level, plan);
      const legs = getActiveRouteLegs(level, plan);
      assert.equal(getEdgeById(legs.at(-1).edgeId).toCityId, 'innsbruck');
      assert.equal(legs.filter(leg => leg.destinationAtEnd).length, 1);
      assert.equal(forecast.valid, true);
      assert.ok(forecast.totalMinutes <= level.targetArrivalMinutes);
      assert.equal(forecast.tollsEur, index === 0 ? 23.5 : 0);
      const effects = winterStartEffects(index !== 0);
      const run = {
        ...mkRun(level), plan, activeWeather: 'snow', coldStart: effects.startsCold,
        socPct: 96 + effects.socDeltaPct, elapsedMinutes: effects.timeDeltaMin,
        stress: level.passengers.initialStress + effects.stressDelta, peakStress: level.passengers.initialStress,
        hungerNeed: 22, bladderNeed: 10, currentSpeedKmh: plan.legPlans[0].targetSpeedKmh
      };
      const { scene, fired } = mkScene(level, run);
      const controller = controllerWithRun(run);
      controller.playDestinationFinale = assert.fail;
      controller.finishLevel = clean => { assert.equal(clean, true); fired.push('innsbruck'); };
      scene.bridge.onAlpineEvent = event => {
        fired.push(event.kind);
        if (event.kind === 'pass') {
          run.alpinePass = { legIndex: run.currentLegIndex, name: event.name, chainsFitted: true, complete: true };
        } else if (event.kind === 'descent') {
          run.alpineDescent = { legIndex: run.currentLegIndex, mode: 'strong', recoveredKwh: 0, brakeHeatM: 0, overheated: false };
        } else {
          assert.fail('B mode with ample headroom should avoid overheating');
        }
        scene.bridge.paused = false;
      };
      scene.bridge.onDestinationArrival = () => controller.handleDestinationArrival();
      scene.bridge.onDynamicEventTrigger = id => {
        fired.push(id);
        const event = getEventById(id);
        const choice = event.choices[index === 1 && id === 'evt_avalanche_closure' ? 1 : 0];
        controller.applyEventChoice(event.title, choice);
        scene.bridge.paused = false;
      };
      for (let tick = 0; tick < 350 && !scene.bridge.paused; tick++) scene.update(tick * 50, 50);
      assert.equal(fired.at(-1), 'innsbruck', fired.join(', '));
      assert.ok(!fired.includes('aachen_finish') && !fired.includes('leer'));
      assert.equal(run.tollsEur, forecast.tollsEur);
      assert.ok(index === 0 ? fired.includes('evt_vignette_check') : fired.includes('evt_avalanche_closure'));
      assert.equal(fired.includes('evt_child_cold'), index === 0);
      assert.deepEqual(fired.filter(id => id === 'pass' || id === 'descent'), index === 0 ? [] : ['pass', 'descent']);
      assert.ok(run.socPct > 0);
      assert.ok(run.energyUsedKwh < getVehicleById(car).batteryKwh);
      const result = evaluateRun(level, run, true);
      assert.ok(buildSubmission(level, run, result));
      scores.push(result.totalScore);
    }
    assert.ok(Math.max(...scores) - Math.min(...scores) <= 100, scores.join(', '));
  });
}
