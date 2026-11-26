import assert from 'node:assert/strict';
import { DomStub } from './dom-stub.mjs';
import { createFixtures } from './fixtures.mjs';

export default function register(test, game) {
  const {
    ERoadtripController, DrivingHUD, EventModal, PlanningUI, evaluatePropertyDamage, getVehicleById, createDefaultPlan,
    getActiveRouteLegs, getChargerById, getEdgeById, getLevelById, stopKey, getApproachingRoadStop, buildRemainingRoute,
    DEFAULT_SHOW_ALL_CHARGERS, WINTER_LEVEL_ID
  } = game;
  const { route1: level, route2: l2, mkRun, mkScene } = createFixtures(game);

  test('Neu clears Level 3 charges from the planner and the forecast sent to the map', t => {
    const winter = getLevelById(WINTER_LEVEL_ID);
    const plan = createDefaultPlan(winter, 'mg4_standard');
    const route = winter.routeOptions.find(option => option.id === plan.selectedRouteId);
    plan.plannedStops.push({ ...route.defaultPlannedStops[0] });
    const reset = new DomStub();
    const root = new DomStub();
    const getElementById = document.getElementById;
    const requestAnimationFrame = window.requestAnimationFrame;
    document.getElementById = id => id === 'btn-reset-campaign' ? reset : null;
    window.requestAnimationFrame = () => {};
    t.after(() => {
      document.getElementById = getElementById;
      window.requestAnimationFrame = requestAnimationFrame;
    });

    const bridge = { plan, level: winter };
    let mapForecast;
    const map = { scene: { isActive: () => true }, refreshDynamicState(forecast) { mapForecast = forecast; } };
    const planner = new PlanningUI(root, {});
    planner.activeTab = 'route';
    const controller = Object.assign(Object.create(ERoadtripController.prototype), {
      level: winter, plan, bridge, save: { cashEur: 26000, ownedVehicleId: plan.vehicleId, unlockedLevelOrder: 3 },
      eventModal: { close() {} }, resultsUI: { hide() {} }, drivingHUD: { setMode() {} },
      stageWrapEl: new DomStub(), plannerEl: root, planningUI: planner, stopAllGameplayScenes() {},
      game: { scene: { getScene: () => map, start() {} } }
    });
    controller.bindTopbarButtons();
    controller.renderPlanning();
    assert.match(root.innerHTML, /class="planned-stop-pill"/);
    const arrivalWithCharge = mapForecast.finalArrivalSocPct;

    reset.click();

    assert.equal(bridge.level, winter);
    assert.equal(bridge.plan, controller.plan);
    assert.deepEqual(bridge.plan.plannedStops, []);
    assert.doesNotMatch(root.innerHTML, /class="planned-stop-pill"/);
    assert.ok(mapForecast.finalArrivalSocPct < Math.min(0, arrivalWithCharge));
    assert.match(root.innerHTML, new RegExp(`Ziel-SoC / Budget</span>\\s*<strong>${mapForecast.finalArrivalSocPct}%`));
  });

  test('City property damage refreshes the stress pill while the notice pauses the drive', () => {
    const run = mkRun(level);
    const hudRoot = new DomStub();
    const modalRoot = new DomStub();
    const hud = new DrivingHUD(hudRoot, new DomStub(), {});
    const controller = Object.assign(Object.create(ERoadtripController.prototype), {
      level, bridge: { runState: run, paused: true }, drivingHUD: hud, eventModal: new EventModal(modalRoot)
    });
    hud.setMode('city');
    hud.update(level, run, 1, 'Stadtfahrt Aachen');
    const stress = hudRoot.querySelector('[data-field="stress"]');
    assert.match(stress.innerHTML, /😌 Stress: <strong>20%/);

    assert.equal(evaluatePropertyDamage(50), null);
    controller.handlePropertyDamage(evaluatePropertyDamage(60));

    assert.match(stress.innerHTML, /😐 Stress: <strong>30%<\/strong> · 🚻 70% · Hunger 90%/);
    assert.equal(hudRoot.querySelector('[data-field="route"]').textContent, 'Stadtfahrt Aachen');
    assert.match(hudRoot.innerHTML, /<b>H<\/b>&nbsp;hupen/);
    assert.match(modalRoot.innerHTML, /Ein paar Kratzer am Auto/);
    assert.equal(controller.bridge.paused, true);
    modalRoot.querySelector('#er-damage-ok').click();
    assert.equal(controller.bridge.paused, false);
  });

  test('The Messe dialog respects the plan, opt-in, and occupancy and settles once', (t) => {
    for (const [planned, optIn, occupancyRoll, expectedSoc, expectedCost, expectedDone] of [
      [true, undefined, 0, '68.2', 12.49, true],
      [true, undefined, 0.99, '20.0', 0, false],
      [true, false, 0, '20.0', 0, false],
      [false, true, 0, '68.2', 12.49, true]
    ]) {
      const modal = new DomStub();
      const charge = modal.querySelector('#messe-charge');
      const confirm = modal.querySelector('#messe-go');
      modal.querySelector('#messe-outcome').querySelector = () => null;
      const controller = Object.assign(Object.create(ERoadtripController.prototype), {
        level, bridge: { paused: false }, eventModal: new EventModal(modal),
        drivingHUD: { clearTouchStates() {} }
      });
      const run = mkRun(level);
      const chargerId = 'chg_messe_ac_a2';
      run.currentLegIndex = 3;
      run.socPct = 20;
      if (planned) run.plan.plannedStops.push({ legIndex: run.currentLegIndex, chargerId, targetSocPct: 100 });
      controller.openHannoverMesse(run);
      const defaultChecked = modal.innerHTML.match(/id="messe-charge"([^>]*?)>/)[1].includes('checked');
      assert.equal(defaultChecked, planned);
      charge.checked = optIn ?? defaultChecked;
      const random = t.mock.method(Math, 'random', () => occupancyRoll);
      confirm.click();
      confirm.click();
      random.mock.restore();
      assert.equal(run.elapsedMinutes, 240);
      assert.equal(run.socPct.toFixed(1), expectedSoc);
      assert.equal(run.chargingCostEur, expectedCost);
      const visitKey = stopKey(run.currentLegIndex, chargerId);
      assert.equal(run.completedStopKeys.includes(visitKey), expectedDone);
      assert.equal(run.skippedStopKeys.includes(visitKey), !expectedDone);
    }
  });

  test('Switching cars preserves the paid pass only after booking and shows the free Model S tariff', () => {
    const plan = createDefaultPlan(level, 'mg4_standard');
    const ui = Object.create(PlanningUI.prototype);
    const root = new DomStub();
    const modelS = getVehicleById('tesla_model_s_2015');
    const mg4 = getVehicleById('mg4_standard');
    const [modelSCard, mg4Card] = [modelS, mg4].map(({ id: carId }) =>
      Object.assign(new DomStub(), { dataset: { carId } })
    );
    const paidPass = Object.assign(new DomStub(), { dataset: { subId: 'tesla_suc' }, checked: true });
    root.querySelector = () => null;
    const selectors = { '.vehicle-card': [modelSCard, mg4Card], '.sub-toggle': [paidPass] };
    root.querySelectorAll = selector => selectors[selector] ?? [];
    Object.assign(ui, { root, cb: { onPlanChanged() {} } });
    ui.bindEvents(level, plan, { unlockedLevelOrder: 1 }, 0);
    modelSCard.click();
    assert.equal(plan.vehicleId, modelS.id);
    assert.deepEqual(plan.subscriptionIds, []);
    assert.match(ui.renderSubsTab(level, plan, modelS), /Eigenes Netz: <b>0\.00 €\/kWh/);
    mg4Card.click();
    assert.equal(plan.vehicleId, mg4.id);
    assert.deepEqual(plan.subscriptionIds, []);
    paidPass.dispatch('change');
    assert.deepEqual(plan.subscriptionIds, ['tesla_suc']);
    modelSCard.click();
    mg4Card.click();
    assert.deepEqual(plan.subscriptionIds, ['tesla_suc']);
  });

  test('Level 2 charges each toll once and hands the final stage to the Montpellier drive', t => {
    t.mock.method(Math, 'random', () => 0.5);
    const run = mkRun(l2);
    const legs = getActiveRouteLegs(l2, run.plan);
    const overnight = legs.findIndex(leg => leg.overnightAtEnd);
    const overnightEdge = getEdgeById(legs[overnight].edgeId);
    run.currentLegIndex = overnight;
    run.legProgressKm = overnightEdge.distanceKm - 0.01;
    const { scene, fired } = mkScene(l2, run);
    scene.update(1000, 16);
    assert.deepEqual(fired, ['evt_hotel_overnight']);
    assert.equal(run.currentLegIndex, overnight);
    assert.equal(run.tollsEur, 18);
    scene.bridge.paused = false;
    scene.update(1016, 16);
    assert.equal(run.currentLegIndex, overnight + 1);
    assert.equal(run.tollsEur, 18);
    assert.deepEqual(run.paidTollLegIndices, [overnight]);
    const lastStage = legs.at(-1);
    const destination = getEdgeById(lastStage.edgeId);
    run.legProgressKm = destination.distanceKm - 0.01;
    scene.update(1032, 16);
    assert.deepEqual(fired, ['evt_hotel_overnight', 'montpellier_finish']);
    assert.equal(run.currentLegIndex, legs.length - 1);
    assert.equal(run.legProgressKm, destination.distanceKm);
    assert.equal(run.tollsEur, 18 + destination.tollEur);
    assert.deepEqual(run.paidTollLegIndices, [overnight, legs.length - 1]);
    assert.equal(scene.bridge.paused, true);
    scene.update(1048, 16);
    assert.deepEqual(fired, ['evt_hotel_overnight', 'montpellier_finish']);
  });

  test('The highway triggers the return Eschweiler stop despite the outbound status', t => {
    t.mock.method(Math, 'random', () => 0.5);
    const run = mkRun(level);
    const chargerId = 'chg_eschweiler_tesla';
    run.plan.plannedStops = [0, 7].map(legIndex => ({ legIndex, chargerId, targetSocPct: 80 }));
    run.currentLegIndex = 7;
    run.legProgressKm = getEdgeById('edge_aachen_koeln').distanceKm - 0.1;
    const { scene, fired } = mkScene(level, run);
    run.completedStopKeys.push(stopKey(0, chargerId));
    run.skippedStopKeys.push(stopKey(0, chargerId));
    scene.update(1000, 16);
    assert.deepEqual(fired, [chargerId]);
  });

  test('Skipping an earlier-charge insertion updates the Navi and the highway, and undo restores it before the exit', t => {
    t.mock.method(Math, 'random', () => 0.5);
    const station = getChargerById('chg_eschweiler_tesla');
    const next = getChargerById('chg_aachener_land_ionity');
    const exitKm = station.edgeProgress * getEdgeById(station.edgeId).distanceKm;
    const key = stopKey(0, station.id);

    for (const undoBeforeExit of [true, false]) {
      const run = mkRun(level);
      run.legProgressKm = exitKm - 0.02;
      run.plan.plannedStops.push({ legIndex: 0, chargerId: next.id, targetSocPct: 80 });
      const { scene, fired } = mkScene(level, run);
      const feedback = [];
      const controller = Object.assign(Object.create(ERoadtripController.prototype), {
        level, bridge: scene.bridge,
        drivingHUD: { showReplanFeedback: message => feedback.push(message), update() {} }
      });
      controller.forceEarlierChargeStop();
      assert.equal(buildRemainingRoute(level, run).destination, station.name);
      assert.deepEqual([run.replanCount, run.goodReplanCount], [1, 1]);

      run.socPct = 10;
      controller.changeRoadStopSkip(key, 'skip');
      assert.deepEqual(run.skippedStopKeys, [], 'a stale enabled button cannot skip below reserve');
      run.socPct = 80;
      controller.changeRoadStopSkip(key, 'skip');
      assert.deepEqual(run.skippedStopKeys, [key]);
      assert.equal(getApproachingRoadStop(level, run).skipped, true);
      assert.equal(buildRemainingRoute(level, run).destination, next.name);
      assert.ok(buildRemainingRoute(level, run).segments.every(segment => segment.to !== station.name));
      assert.match(feedback.at(-1), /^Ladestopp ausgelassen:/);
      assert.match(run.incidentLog.at(-1).detail, /Prognose ≈ \d+ % am nächsten Ziel/);
      assert.equal(run.incidentLog.at(-1).impact, 'neutral');

      if (undoBeforeExit) {
        run.legProgressKm = exitKm;
        controller.changeRoadStopSkip(key, 'undo');
        assert.deepEqual(run.skippedStopKeys, []);
        assert.equal(buildRemainingRoute(level, run).destination, station.name);
        assert.match(run.incidentLog.at(-1).title, /wieder eingeplant/);
        scene.update(1000, 16);
        assert.deepEqual(fired, [station.id]);
      } else {
        scene.update(1000, 16);
        assert.ok(run.legProgressKm > exitKm);
        assert.deepEqual(fired, []);
        controller.changeRoadStopSkip(key, 'undo');
        assert.deepEqual(run.skippedStopKeys, [key]);
        assert.equal(getApproachingRoadStop(level, run).key, stopKey(0, next.id));
        assert.match(run.incidentLog.at(-1).title, /^Ladestopp ausgelassen:/);
      }
      assert.deepEqual([run.replanCount, run.goodReplanCount], [1, 1]);
    }
  });

  test('A defect skip resumes with a replacement charger and cannot be undone from the HUD', t => {
    t.mock.method(Math, 'random', () => 0);
    const run = mkRun(level);
    const station = getChargerById('chg_eschweiler_tesla');
    const key = stopKey(0, station.id);
    run.plan.plannedStops.push({ legIndex: 0, chargerId: station.id, targetSocPct: 80 });
    run.legProgressKm = station.edgeProgress * getEdgeById(station.edgeId).distanceKm;
    run.activeCityChargerId = station.id;
    let resumed = false;
    const controller = Object.assign(Object.create(ERoadtripController.prototype), {
      level, bridge: { runState: run, paused: false },
      drivingHUD: { clearTouchStates() {} },
      enterAutobahn() { this.bridge.paused = false; resumed = true; },
      eventModal: {
        showDynamicEvent(event, choose, close) {
          choose(event.choices.find(choice => choice.insertNearestCharger));
          close();
        }
      }
    });
    controller.handleCitySegmentComplete('charger_park', true);
    assert.ok(resumed);
    assert.deepEqual(run.skippedStopKeys, [key]);
    assert.equal(getApproachingRoadStop(level, run).skipped, false);
    assert.match(buildRemainingRoute(level, run).destination, /Aachener Land/);
    controller.changeRoadStopSkip(key, 'undo');
    assert.deepEqual(run.skippedStopKeys, [key]);
  });

  test('Map filter "Alle Ladestationen" is off by default and keeps its label in both states', () => {
    assert.equal(DEFAULT_SHOW_ALL_CHARGERS, false);
    const plan = createDefaultPlan(level, 'mg4_standard');
    const car = getVehicleById('mg4_standard');
    for (const on of [false, true]) {
      const ui = Object.create(PlanningUI.prototype);
      const bar = new DomStub();
      bar.querySelector = () => null;
      bar.querySelectorAll = () => [];
      Object.assign(ui, { filterBarEl: bar, cb: {} });
      ui.renderMapFilterBar(level, plan, car, {}, on);
      assert.match(bar.innerHTML, /🔌 Alle Ladestationen/);
      assert.doesNotMatch(bar.innerHTML, /Ladestationen (ein|aus)blenden|anzeigen/);
      assert.match(bar.innerHTML, new RegExp(`aria-pressed="${on}"`));
    }
  });
}
