import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { createFixtures } from './fixtures.mjs';
import { DomStub } from './dom-stub.mjs';

export default function register(test, game) {
  const {
    ERoadtripController, EventModal, ResultsUI, MontpellierFinaleScene, FINALE_DURATION_MS,
    calculateOverallStress, hasRelaxedBeachFinale, evaluatePropertyDamage, evaluateRun, buildSubmission
  } = game;
  const { route1, route2, mkRun } = createFixtures(game);

  test('Montpellier uses the weighted stress from scoring and treats exactly 60% as the sad ending', () => {
    assert.equal(calculateOverallStress({ peakStress: 74, stress: 34 }), 60);
    assert.equal(hasRelaxedBeachFinale({ peakStress: 74, stress: 33.99 }), true);
    assert.equal(hasRelaxedBeachFinale({ peakStress: 74, stress: 34 }), false);
    assert.equal(hasRelaxedBeachFinale({ peakStress: 74, stress: 34.01 }), false);
  });

  test('The controller freezes the arrival branch and waits for the finale before completing', t => {
    window.requestAnimationFrame = callback => callback();
    t.after(() => { delete window.requestAnimationFrame; });
    const run = { ...mkRun(route2), stress: 34, peakStress: 74, socPct: 12 };
    const modes = [];
    const finished = [];
    let finale;
    const controller = Object.assign(Object.create(ERoadtripController.prototype), {
      bridge: { runState: run, paused: true, isLightTheme: () => true },
      drivingHUD: { setMode: mode => modes.push(mode) },
      stageWrapEl: new DomStub(),
      stopAllGameplayScenes() {},
      game: {
        scale: { refresh() {} },
        scene: { start(key, data) { assert.equal(key, 'MontpellierFinaleScene'); finale = data; } }
      },
      finishLevel: clean => finished.push([clean, run.socPct])
    });
    controller.playDestinationFinale();
    assert.deepEqual(modes, ['hidden']);
    assert.equal(finale.relaxed, false);
    assert.deepEqual(finished, []);
    assert.equal(controller.bridge.paused, true);
    finale.onComplete();
    assert.deepEqual(finished, [[true, 12]]);
    controller.bridge.runState = null;
    finale.onComplete();
    assert.equal(finished.length, 1);
  });

  test('The pixel finale fits both orientations, draws both branches, and finishes once by timer, key, or tap', () => {
    for (const [relaxed, start, trigger] of [
      [true, [320, 600], 'timer'], [false, [800, 260], 'tap'], [true, [390, 640], 'key']
    ]) {
      const scene = new MontpellierFinaleScene();
      const frame = {
        setPosition(x, y) { Object.assign(this, { x, y }); },
        setScale(zoom) { this.zoom = zoom; }
      };
      const palette = [];
      const graphics = () => ({
        clear() { return this; },
        fillStyle(color) { palette.push(color); return this; },
        fillRect() { return this; }
      });
      let timeout;
      let finished = 0;
      const sky = [];
      const scale = Object.assign(new EventEmitter(), { width: start[0], height: start[1] });
      const input = Object.assign(new EventEmitter(), { keyboard: new EventEmitter() });
      Object.assign(scene, {
        add: { graphics, container: () => frame, text: () => ({ setOrigin() {} }) },
        scale, input, events: new EventEmitter(),
        time: { delayedCall(ms, callback) { assert.equal(ms, FINALE_DURATION_MS); timeout = callback; } },
        cameras: { main: { setBackgroundColor: color => sky.push(color) } }
      });
      scene.init({ relaxed, isLightTheme: () => relaxed, onComplete: () => { finished++; } });
      scene.create();
      assert.equal(frame.zoom, Math.min(scale.width / 192, scale.height / 108));
      [scale.width, scale.height] = [scale.height, scale.width];
      scale.emit('resize');
      assert.equal(frame.zoom, Math.min(scale.width / 192, scale.height / 108));
      scene.update(0, 4200);
      assert.equal(palette.includes(0xd94365), relaxed);
      assert.equal(sky.at(-1), relaxed ? 0xead69f : 0x253550);
      input.keyboard.emit('keydown', { key: 'Tab' });
      input.keyboard.emit('keydown', { key: 'Enter', repeat: true });
      assert.equal(finished, 0);
      if (trigger === 'timer') timeout();
      else if (trigger === 'tap') input.emit('pointerup');
      else input.keyboard.emit('keydown', { key: 'Enter' });
      timeout();
      input.emit('pointerup');
      input.keyboard.emit('keydown', { key: 'Enter' });
      assert.equal(finished, 1);
      scene.events.emit('shutdown');
      assert.equal(scale.listenerCount('resize'), 0);
      assert.equal(input.listenerCount('pointerup'), 0);
      assert.equal(input.keyboard.listenerCount('keydown'), 0);
    }
  });

  test('Property damage is booked once with one message and airbags finish at 0 without reward or submission', () => {
    const run = { ...mkRun(route1), elapsedMinutes: route1.targetArrivalMinutes, leaderboardRunId: 'airbag' };
    const campaign = { cashEur: 26000, unlockedLevelOrder: 1, completedLevels: {} };
    const modalRoot = new DomStub();
    const resultsRoot = new DomStub();
    const show = [];
    const resultsUI = new ResultsUI(resultsRoot, {});
    const controller = Object.assign(Object.create(ERoadtripController.prototype), {
      bridge: { runState: run, paused: true }, level: route1, save: campaign,
      eventModal: new EventModal(modalRoot), stageWrapEl: new DomStub(),
      drivingHUD: { setMode() {}, clearTouchStates() {} },
      stopAllGameplayScenes() {},
      resultsUI: { show(...args) { show.push(args); resultsUI.show(...args); } }
    });
    controller.handlePropertyDamage(evaluatePropertyDamage(74.99));
    assert.match(modalRoot.innerHTML, /Ein paar Kratzer am Auto/);
    assert.doesNotMatch(modalRoot.innerHTML, /er-choice-btn/);
    assert.equal(run.stress, 30);
    assert.equal(run.peakStress, 30);
    assert.equal(run.propertyDamageEur, 800);
    assert.equal(run.collisionsCount, 0);
    modalRoot.querySelector('#er-damage-ok').click();
    assert.equal(controller.bridge.paused, false);

    controller.bridge.paused = true;
    controller.handlePropertyDamage(evaluatePropertyDamage(75));
    assert.match(modalRoot.innerHTML, /Eine Beule im Auto/);
    assert.equal(run.propertyDamageEur, 2100);
    assert.equal(run.stress, 50);
    modalRoot.querySelector('#er-damage-ok').click();

    controller.bridge.paused = true;
    controller.handlePropertyDamage(evaluatePropertyDamage(165));
    assert.match(modalRoot.innerHTML, /Airbag geöffnet – Reise zu Ende/);
    assert.equal(show.length, 0);
    modalRoot.querySelector('#er-damage-ok').click();
    const [[, , result, , submission]] = show;
    assert.equal(run.completed, true);
    assert.equal(result.totalCostEur, 7100);
    assert.equal(result.totalScore, 0);
    assert.equal(result.prizeMoneyEur, 0);
    assert.equal(submission, undefined);
    assert.equal(buildSubmission(route1, run, result), null);
    assert.doesNotMatch(resultsRoot.innerHTML, /Prämie erhalten|Speichere dein Ergebnis/);
    assert.match(resultsRoot.innerHTML, /Wertverlust Auto <strong>7100\.00 €/);
    assert.deepEqual(campaign, { cashEur: 26000, unlockedLevelOrder: 1, completedLevels: {} });
    assert.equal(run.decisionScoreAccum, 0);
    controller.finishLevel(true);
    assert.equal(show.length, 1);
  });

  test('A completed results panel explains the exact final battery penalty', () => {
    const run = { ...mkRun(route2), socPct: 12 };
    const root = new DomStub();
    const results = new ResultsUI(root, {});
    results.show({ ...route2, boardId: undefined }, run, evaluateRun(route2, run, true),
      { cashEur: 26000, unlockedLevelOrder: 2, completedLevels: {} });
    assert.match(root.innerHTML, /Rest-Akku 12 %[\s\S]*?−75 Pkt/);
  });
}
