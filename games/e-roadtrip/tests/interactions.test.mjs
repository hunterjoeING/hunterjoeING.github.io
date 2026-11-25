import assert from 'node:assert/strict';
import { DomStub } from './dom-stub.mjs';
import { createFixtures } from './fixtures.mjs';

export default function register(test, game) {
  const m = game;
  const { near, route1, route2, mkRun, carImage, mkScene, npc } = createFixtures(game);

  test('A stopped rear-in pose needs no reverse history and allows a small overhang', () => {
    const bay = { bounds: { x: 0, y: 0, w: 46, h: 68 }, pillar: { x: 23, y: 4 } };
    const ready = (x, y, rotation, speed = 0) => m.isRearParked(bay, {
      x, y, rotation, speed, footprint: m.rotatedCarBounds(x, y, rotation)
    });
    assert.ok(ready(23, 40, Math.PI));
    assert.ok(ready(23, 53, Math.PI - Math.PI / 6, -5));
    assert.ok(!ready(23, 40, 0), 'nose in');
    assert.ok(!ready(23, 40, Math.PI - Math.PI / 4), 'rear points too far away');
    assert.ok(!ready(23, 74, Math.PI), 'center outside');
    assert.ok(!ready(23, 63, Math.PI), 'too little of the footprint is inside');
    assert.ok(!ready(23, 40, Math.PI, -8), 'still moving');
  });

  test('The city brake has priority over acceleration', () => {
    const city = new m.CityDriveScene();
    city.player = carImage();
    city.bridge = { level: route1, paused: false, touch: {} };
    const idle = { isDown: false };
    city.wasd = { W: { isDown: true }, SPACE: { isDown: true }, A: idle, S: idle, D: idle, H: idle };
    city.cursors = { up: idle, down: idle, left: idle, right: idle };
    city.updateLightingVisuals = () => {};
    city.movePlayer = () => { city.bridge.paused = true; return true; };
    city.carSpeed = 100;
    city.update(0, 50);
    near(city.carSpeed, 47.5);
    city.physics = { world: { pause() { this.isPaused = true; } } };
    city.cameras = { main: { flash() {} } };
    city.bridge.paused = false;
    city.bridge.onPoliceViolation = () => assert.equal(city.physics.world.isPaused, true);
    city.triggerPoliceStop('red_light');
    assert.equal(city.bridge.paused, true);
  });

  test('Driving decisions show hunger and other trip values inside the modal', () => {
    const run = mkRun();
    run.chargingCostEur = 12.5;
    const modal = new DomStub();
    new m.EventModal(modal, () => m.renderDriveStatus(route1, run))
      .showMesseVisit({ chargePlanned: false, chargerAvailable: true }, () => '', () => {});
    assert.match(modal.innerHTML, /Hunger <b>90 %<\/b>/);
    assert.match(modal.innerHTML, /Akku <b>80 %<\/b>/);
    assert.match(modal.innerHTML, /Stress <b>20 %<\/b>/);
    assert.match(modal.innerHTML, /Ausgaben <b>12\.50 €<\/b>/);
    assert.match(modal.innerHTML, /<time>\d{2}:\d{2}<\/time>/);
  });

  test('Headlight flash targets the actual lead car and radar uses the work-zone sign', (t) => {
    const random = t.mock.method(Math, 'random', () => 0.5);
    const run = mkRun();
    run.plan.legPlans[0].targetSpeedKmh = 165;
    const { scene, fired } = mkScene(route1, run);
    const left = npc(0, 85);
    scene.npcs = [left, npc(1, 88)];
    scene.playerSpeedKmh = 88;
    scene.hudTickAccum = 0.12;
    scene.update(0, 16);
    assert.equal(run.tailgateReady, false);
    run.tailgatePulse = true;
    scene.update(16, 16);
    assert.equal(left.yieldRight, undefined);
    assert.equal(fired.length, 0);

    scene.playerLane = scene.playerLanePos = 0;
    scene.hudTickAccum = 0.12;
    scene.update(32, 16);
    assert.equal(run.tailgateReady, true);
    run.tailgatePulse = true;
    scene.update(48, 16);
    assert.equal(left.yieldRight, true);
    assert.equal(scene.playerHeadlight.alpha, 1);
    near(scene.playerCar.rotation, scene.tangent(scene.playerCar.y));

    const dijon = m.getEdgeById('edge_luxemburg_dijon');
    assert.deepEqual(m.highwaySection(dijon, true, 50, 'rain'), { country: 'FR', signKmh: 110, endKm: 317 });
    assert.deepEqual(m.highwaySection(dijon, true, 317, 'clear'), { country: 'LU', signKmh: 130, endKm: 336 });
    const france = m.buildSpeedTrapEvent({ country: 'FR', signKmh: 80, actualKmh: 102 });
    assert.match(france.description, /Vor dir steht.*80 km\/h/);
    assert.equal(france.choices[0].adjustSpeedKmh, 80);
    const work = mkRun(route2);
    work.currentLegIndex = 1;
    work.plan.legPlans[1].targetSpeedKmh = 180;
    const w = mkScene(route2, work);
    w.scene.playerSpeedKmh = 130;
    w.scene.forceWorkZone = true;
    work.legProgressKm = 12.1;
    w.scene.eventCooldownSec = 0;
    random.mock.mockImplementation(() => 0);
    w.scene.update(0, 16);
    assert.equal(w.fired[0], 'evt_speed_trap');
    assert.notEqual(work.highwaySignKmh, 120);
    assert.equal(work.highwaySignKmh, work.speedTrap.signKmh);
  });

  test('Highway ticks stop at a charger or leg boundary and use the actual speed', (t) => {
    t.mock.method(Math, 'random', () => 0.5);
    const run = mkRun(route2);
    const legs = m.getActiveRouteLegs(route2, run.plan);
    const night = legs.findIndex(l => l.overnightAtEnd);
    const edge = m.getEdgeById(legs[night].edgeId);
    run.currentLegIndex = night;
    run.legProgressKm = edge.distanceKm - 0.05;
    const { scene, fired } = mkScene(route2, run);
    scene.update(0, 50);
    assert.deepEqual(fired, ['evt_hotel_overnight']);
    near(run.distanceDrivenKm, 0.05);
    near(run.legProgressKm, edge.distanceKm);
    const first = [run.elapsedMinutes, run.distanceDrivenKm, run.energyUsedKwh, run.stress, run.tollsEur];
    scene.bridge.paused = false;
    scene.update(50, 50);
    assert.equal(run.currentLegIndex, night + 1);
    assert.deepEqual([run.elapsedMinutes, run.distanceDrivenKm, run.energyUsedKwh, run.stress, run.tollsEur], first);

    const stopRun = mkRun();
    const station = m.getChargerById('chg_aachener_land_ionity');
    stopRun.plan.plannedStops.push({ legIndex: 0, chargerId: station.id, targetSocPct: 85 });
    const stopKm = station.edgeProgress * m.getEdgeById(station.edgeId).distanceKm;
    stopRun.legProgressKm = stopKm - 0.02;
    const halt = mkScene(route1, stopRun);
    halt.scene.update(0, 50);
    assert.deepEqual(halt.fired, [station.id]);
    near(stopRun.distanceDrivenKm, 0.02);

    const planned = m.evaluateTripPlan(route1, mkRun().plan);
    const highway = planned.legForecasts.reduce((sum, leg) =>
      sum + Math.round(leg.distanceKm / m.congestedCruiseKmh(leg.targetSpeedKmh, leg.trafficRisk) * 60), 0);
    assert.equal(planned.totalDriveMinutes - highway, 13);
    const stressAt = target => {
      const state = mkRun();
      state.plan.legPlans[0].targetSpeedKmh = target;
      const { scene } = mkScene(route1, state);
      scene.playerSpeedKmh = 100;
      scene.npcs = [npc(1, 100, m.bumperGap('player', 'car'))];
      scene.update(0, 16);
      return [state.stress, state.currentSpeedKmh];
    };
    const a = stressAt(140);
    const b = stressAt(155);
    near(a[0], b[0]);
    near(a[1], b[1]);
  });

  test('Hotel AC, overnight notes, and pause costs use the selected activity', t => {
    t.mock.method(Math, 'random', () => 0.5);
    const controller = Object.create(m.ERoadtripController.prototype);
    const run = mkRun(route2);
    controller.bridge = { runState: run };
    controller.level = route2;
    controller.drivingHUD = { clearTouchStates() {} };
    let currentModal;
    controller.eventModal = { showDynamicEvent(event, choose, resume) { currentModal = { event, choose, resume }; } };
    run.socPct = 96.7;
    controller.handleDynamicEvent('evt_hotel_overnight');
    assert.match(currentModal.event.choices[0].hint, /Akku morgens 97 %/);
    currentModal.choose(currentModal.event.choices[0]);
    near(run.socPct, 96.7);
    assert.equal(run.hungerNeed, 20);
    assert.equal(run.elapsedMinutes, 480);
    const summary = run.overnightNote;
    controller.handleDynamicEvent('evt_tailgate');
    currentModal.choose(currentModal.event.choices[0]);
    assert.equal(run.overnightNote, summary);
    controller.handleDynamicEvent('evt_rest_area_robbery');
    currentModal.choose(currentModal.event.choices[0]);
    assert.match(run.overnightNote, /Einbruch −500 €, \+2 h/);
    const taycan = m.getVehicleById('porsche_taycan');
    const sim = m.estimateHotelCharge(taycan, 0.25);
    assert.ok(sim.departSoc < 95 && sim.departSoc > 90);
    assert.equal(sim.durationMinutes, 480);

    const routePlan = m.createDefaultPlan(route2, 'tesla_model_s_2015');
    m.getActiveRouteLegs(route2, routePlan).forEach((leg, legIndex) => {
      for (const station of m.getChargersForEdge(leg.edgeId)) {
        if (!station.fairStay) routePlan.plannedStops.push({ legIndex, chargerId: station.id, targetSocPct: 90 });
      }
    });
    const alt = m.evaluateTripPlan(route2, routePlan).hotelAc;
    assert.ok(alt && alt.departSoc >= alt.arriveSoc);
    assert.match(m.getEventById('evt_hotel_overnight').choices[0].hint, /11 kW/);
    run.bladderNeed = 70;
    controller.handleDynamicEvent('evt_dirty_toilets');
    currentModal.choose(currentModal.event.choices.find(x => x.id === 'use_anyway'));
    assert.equal(run.bladderNeed, 0);
    controller.handleDynamicEvent('evt_wc_coffee');
    currentModal.choose(currentModal.event.choices.find(x => x.id === 'quick_pitstop'));
    assert.equal(run.pauseCostEur, 5.5);
    assert.equal(run.chargingCostEur, 0);
  });

  test('Charging uses station power and WC time runs alongside charging', (t) => {
    const intervals = new Map();
    const timeouts = new Map();
    let timerId = 0;
    const addTimer = timers => callback => {
      timers.set(++timerId, callback);
      return timerId;
    };
    t.mock.method(window, 'setInterval', addTimer(intervals));
    t.mock.method(window, 'clearInterval', id => intervals.delete(id));
    t.mock.method(window, 'setTimeout', addTimer(timeouts));
    t.mock.method(window, 'clearTimeout', id => timeouts.delete(id));

    const mg = m.getVehicleById('mg4_standard');
    const modelS = m.getVehicleById('tesla_model_s_2015');
    const ac = m.getChargerById('chg_messe_ac_a2');
    const suc = m.getChargersForEdge('edge_aachen_koeln').find(s => s.network === 'tesla');
    assert.equal(m.getChargingPowerKw(mg, ac, 42.6), 7);
    assert.equal(m.getChargingPowerKw(modelS, suc, 98), 2);
    assert.equal(m.getChargingPowerKw(modelS, suc, 100), 0);
    assert.ok(Number.isFinite(m.estimateChargeSession(modelS, suc, 98, 100, []).durationMinutes));
    assert.ok(m.getChargingPowerKw(m.getVehicleById('porsche_taycan'), suc, 30) <= 150);

    const root = new DomStub();
    const run = mkRun();
    run.socPct = 42.6;
    const modal = new m.EventModal(root);
    let result;
    const start = target => modal.showChargingSession(ac, route1, run, target, x => { result = x; });
    const actions = root.querySelector('#charge-dynamic-actions');
    const doToilet = (tickCount = 0) => {
      root.querySelector('#break-buttons-box').querySelector('toilet').click();
      for (let i = 0; i < tickCount; i++) for (const tick of [...intervals.values()]) tick();
      for (const [id, end] of [...timeouts]) { timeouts.delete(id); end(); }
    };
    start(80);
    assert.match(root.querySelector('#charge-dynamic-top').innerHTML, /7 kW/);
    actions.querySelector('#btn-unplug').click();
    near(result.newSoc, 42.6);
    assert.equal(result.addedKwh, 0);
    assert.deepEqual(result.activities, []);
    start(80);
    doToilet(7);
    actions.querySelector('#btn-unplug').click();
    near(result.minutesSpent, 7.5);
    near(result.newSoc, 42.6 + (7 * 5 / 60) / mg.batteryKwh * 100, 1e-6);
    assert.equal(result.activities[0].resetBladder, true);
    start(43);
    doToilet(7);
    actions.querySelector('#btn-unplug').click();
    near(result.minutesSpent, 7.5);
    near(result.newSoc, 43);
  });

  test('The return HUD map starts at the right waypoint and keeps a focused slider', (t) => {
    t.mock.method(window, 'matchMedia', query => ({
      matches: query.includes('max-width'),
      addEventListener() {}
    }));
    const edge = m.getEdgeById('edge_aachen_koeln');
    const first = m.getEdgeWaypoints(edge, true)[0];
    assert.deepEqual(first, edge.waypoints.at(-1));
    const run = mkRun(route1, 'tesla_model_3_highland');
    run.currentLegIndex = m.getActiveRouteLegs(route1, run.plan).length - 1;
    const compact = new DomStub();
    const hud = new m.DrivingHUD(compact, new DomStub(), {});
    hud.setMode('autobahn');
    hud.update(route1, run, 1);
    assert.match(compact.innerHTML, /max="200" step="5"/);
    assert.match(compact.innerHTML, /class="er-trip-computer"\s*>/);
    const markup = compact.innerHTML;
    const slider = compact.querySelector('.dhud-speed-slider');
    t.after(() => { document.activeElement = null; });
    document.activeElement = slider;
    slider.value = '165';
    run.speedCapLabel = 'Baustelle';
    run.highwaySignKmh = 80;
    run.highwaySignLegIndex = run.currentLegIndex;
    hud.update(route1, run, 1);
    assert.equal(compact.innerHTML, markup);
    assert.equal(slider.value, '165');
    assert.match(compact.querySelector('[data-field="speed-sign"]').innerHTML, /80 km\/h/);
    const map = compact.querySelector('#er-trip-computer').innerHTML;
    const segments = compact.querySelector('[data-field="nav-segments"]').innerHTML;
    assert.match(segments, /aria-current="step"[\s\S]*Köln → Aachen/);
    assert.match(compact.querySelector('[data-field="nav-summary"]').textContent, /^Aachen · \d+ km · ca\. \d+ Min$/);
    const match = map.match(/<path d="M([\d.]+) ([\d.]+)[^"]+"[\s\S]*?<circle cx="([\d.]+)" cy="([\d.]+)"/);
    assert.deepEqual(match.slice(1, 3), match.slice(3, 5));
    assert.equal(m.snapSpeedKmh(188, 188), 185);
  });
}
