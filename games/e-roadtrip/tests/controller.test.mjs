import assert from 'node:assert/strict';
import { DomStub } from './dom-stub.mjs';
import { createFixtures } from './fixtures.mjs';

export default function register(test, game) {
  const {
    ERoadtripController, EventModal, PlanningUI, getVehicleById, createDefaultPlan,
    getActiveRouteLegs, getEdgeById, stopKey
  } = game;
  const { route1: level, route2: l2, mkRun, mkScene } = createFixtures(game);

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

  test('Level 2 charges each toll once and hands the final stage to the finale', t => {
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
    assert.deepEqual(fired, ['evt_hotel_overnight', 'destination']);
    assert.equal(run.currentLegIndex, legs.length - 1);
    assert.equal(run.legProgressKm, destination.distanceKm);
    assert.equal(run.tollsEur, 18 + destination.tollEur);
    assert.deepEqual(run.paidTollLegIndices, [overnight, legs.length - 1]);
    assert.equal(scene.bridge.paused, true);
    scene.update(1048, 16);
    assert.deepEqual(fired, ['evt_hotel_overnight', 'destination']);
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
}
