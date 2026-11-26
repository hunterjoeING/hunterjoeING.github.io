import assert from 'node:assert/strict';
import { createFixtures } from './fixtures.mjs';

export default function register(test, game) {
  const {
    ERoadtripController, getLevelById, sectionControlAverageKmh, sectionControlIsSpeeding, speedingFineEur,
    SECTION_CONTROL_EVENT_ID, TUNNEL_CLOSURE_EVENT_ID, TUNNEL_DETOUR_CHOICE_ID, WINTER_LEVEL_ID, WINTER_TUNNEL
  } = game;
  const { near, mkRun, mkScene } = createFixtures(game);
  const level = getLevelById(WINTER_LEVEL_ID);
  const { approachKm, startKm, endKm, limitKmh } = WINTER_TUNNEL;
  const length = endKm - startKm;

  function approach(progress, speed) {
    const run = {
      ...mkRun(level), legProgressKm: progress, distanceDrivenKm: progress, elapsedMinutes: 90,
      triggeredEventIds: ['evt_inntal_ski_jam', 'evt_vignette_check'], wifeDialogueTriggered: true
    };
    run.currentLegIndex = level.routeOptions[0].legs.findIndex(leg => leg.edgeId === WINTER_TUNNEL.edgeId);
    run.plan.legPlans[run.currentLegIndex].targetSpeedKmh = speed;
    run.plan.plannedStops = [];
    return { run, ...mkScene(level, run) };
  }

  function controllerFor(scene, choiceIndex) {
    return Object.assign(Object.create(ERoadtripController.prototype), {
      level,
      bridge: scene.bridge,
      drivingHUD: { clearTouchStates() {} },
      eventModal: { showDynamicEvent(event, choose, resume) {
        choose(event.choices[choiceIndex]);
        resume();
      } }
    });
  }

  test('section control divides the driven distance by total driving time', () => {
    const equalDistancesAt60And120 = 2.5 / 60 * 60 + 2.5 / 120 * 60;
    near(sectionControlAverageKmh(length, equalDistancesAt60And120), 80);
    assert.equal(sectionControlIsSpeeding(80 + 1e-9, 80), false);
    assert.equal(sectionControlIsSpeeding(80.1, 80), true);
    assert.equal(sectionControlIsSpeeding(79.9, 80), false);
    for (const bad of [0, -1, NaN, Infinity]) {
      assert.equal(sectionControlAverageKmh(length, bad), undefined);
      assert.equal(sectionControlAverageKmh(bad, 4), undefined);
    }
  });

  test('a fast tick stops at the approach and tunnel boundaries, and speeding produces one Austrian fine', t => {
    t.mock.method(Math, 'random', () => 0.9);
    const { run, scene, fired } = approach(approachKm - 0.1, 100);
    scene.update(0, 50);
    assert.equal(run.legProgressKm, approachKm);
    scene.update(50, 50);
    assert.match(run.speedCapLabel, /Tunnel voraus · 80 km\/h/);
    assert.equal(scene.nightOverlay.alpha, 0);
    for (let i = 0; i < 450 && run.legProgressKm < startKm; i++) scene.update(100 + i * 50, 50);
    assert.equal(run.legProgressKm, startKm);
    scene.update(25_000, 50);
    assert.equal(run.highwaySignKmh, limitKmh);
    assert.match(run.speedCapLabel, /Abschnittskontrolle/);
    assert.ok(scene.nightOverlay.alpha > 0.55 && scene.playerHeadlight.alpha > 0.7);
    for (let i = 0; i < 450 && run.legProgressKm < endKm; i++) scene.update(25_100 + i * 50, 50);
    assert.equal(run.legProgressKm, endKm);
    near(run.winterTunnel.driveMinutes, length * 60 / 100);
    scene.update(50_000, 50);
    near(run.winterTunnel.averageKmh, 100);
    assert.deepEqual(fired, [SECTION_CONTROL_EVENT_ID]);
    assert.equal(scene.bridge.paused, true);
    const time = run.elapsedMinutes;
    controllerFor(scene, 0).handleDynamicEvent(SECTION_CONTROL_EVENT_ID);
    assert.equal(run.incidentalCostEur, speedingFineEur('AT', 100 - limitKmh).amountEur);
    assert.equal(run.elapsedMinutes, time);
    assert.equal(run.incidentLog.at(-1).title, 'Abschnittskontrolle im Tunnel');
    scene.update(50_050, 50);
    assert.deepEqual(fired, [SECTION_CONTROL_EVENT_ID]);
    assert.equal(run.highwaySignKmh, 110);
    assert.equal(run.speedCapLabel, undefined);
    assert.equal(scene.nightOverlay.alpha, 0);
  });

  test('the tunnel closes once, waiting is excluded from measurement and the detour bypasses it', t => {
    const roll = t.mock.method(Math, 'random', () => 0);
    for (const index of [0, 1]) {
      const { run, scene, fired } = approach(startKm, limitKmh);
      const initialTime = run.elapsedMinutes;
      const initialSoc = run.socPct;
      const choice = game.getEventById(TUNNEL_CLOSURE_EVENT_ID).choices[index];
      scene.update(0, 50);
      assert.equal(scene.bridge.paused, true);
      assert.deepEqual(fired, [TUNNEL_CLOSURE_EVENT_ID]);
      assert.equal(run.legProgressKm, startKm);
      assert.equal(run.winterTunnel.driveMinutes, 0);
      controllerFor(scene, index).handleDynamicEvent(TUNNEL_CLOSURE_EVENT_ID);
      assert.equal(run.elapsedMinutes, initialTime + choice.timeDeltaMin);
      assert.equal(scene.bridge.paused, false);
      if (choice.id === TUNNEL_DETOUR_CHOICE_ID) {
        assert.equal(run.legProgressKm, endKm);
        assert.equal(run.distanceDrivenKm, startKm + choice.winterDetourKm);
        assert.ok(run.socPct < initialSoc);
      } else {
        assert.equal(run.legProgressKm, startKm);
        assert.equal(run.distanceDrivenKm, startKm);
        assert.equal(run.socPct, initialSoc);
        for (let i = 0; i < 450 && run.legProgressKm < endKm; i++) scene.update(50 + i * 50, 50);
        assert.equal(run.legProgressKm, endKm);
        near(run.winterTunnel.driveMinutes, length * 60 / limitKmh);
      }
      scene.update(25_000, 50);
      assert.ok(run.legProgressKm > endKm);
      if (index === 0) near(run.winterTunnel.averageKmh, limitKmh);
      else assert.equal(run.winterTunnel.averageKmh, undefined);
      assert.deepEqual(fired, [TUNNEL_CLOSURE_EVENT_ID]);
      assert.equal(run.incidentalCostEur, 0);
    }
    assert.equal(roll.mock.callCount(), 2);
  });
}
