import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { setImmediate } from 'node:timers/promises';
import { runInNewContext } from 'node:vm';
import { validateEroadtripScore } from '../../../cloudflare-worker/worker.js';
import { DomStub } from './dom-stub.mjs';
import { createFixtures } from './fixtures.mjs';

const live = { hostname: 'hunterjoeing.github.io', search: '' };

export default function register(test, game) {
  const { EROADTRIP_VERSION, buildSubmission, newRunId, shouldSubmit, submitRun, ResultsUI,
    ERoadtripController, evaluateRun, LEVELS } = game;
  const { route1, route2, mkRun } = createFixtures(game);
  const save = { cashEur: 26000, unlockedLevelOrder: 1, completedLevels: {} };
  const mockRun = (level = route1) => ({
    ...mkRun(level, 'tesla_model_3_highland'), levelId: level.id, elapsedMinutes: level.targetArrivalMinutes,
    distanceDrivenKm: 640, energyUsedKwh: 120, chargingCostEur: 65.5, collisionsCount: 0,
    goodReplanCount: 0, chargingEfficiencyBonus: 0
  });
  const mockResult = (level, run) => ({
    ...evaluateRun(level, run, true), totalScore: 812, gradeLabel: 'A-Rang · Souverän geplant'
  });

  test('leaderboard payloads carry the short label and validate on both worker boards', () => {
    for (const level of [route1, route2]) {
      const run = mockRun(level);
      const result = mockResult(level, run);
      const submission = buildSubmission(level, run, result);
      const { score, label, meta } = submission;
      assert.equal(score, 812);
      assert.equal(label, `812 Pkt · A-Rang · ${level === route1 ? '13h17m' : '34h00m'} · Model 3`);
      assert.ok(label.length <= 80);
      assert.deepEqual(meta, {
        board: level.boardId, levelId: level.id, routeId: run.plan.selectedRouteId, vehicleId: run.plan.vehicleId,
        minutes: level.targetArrivalMinutes, targetMinutes: level.targetArrivalMinutes, costEur: 65.5,
        grade: 'A', subScores: result.subScores, cleanArrival: true, collisions: 0, version: EROADTRIP_VERSION
      });
      assert.equal(validateEroadtripScore(level.boardId, submission), null);
      assert.equal(validateEroadtripScore('eroadtrip', submission), null);
      for (const totalMinutes of [Math.ceil(level.targetArrivalMinutes / 2), level.targetArrivalMinutes * 20]) {
        assert.equal(validateEroadtripScore(level.boardId, buildSubmission(level, run, { ...result, totalMinutes })), null);
      }
      assert.equal(buildSubmission(level, run, { ...result, totalMinutes: Math.ceil(level.targetArrivalMinutes / 2) - 1 }), null);
      assert.equal(buildSubmission(level, run, { ...result, totalMinutes: level.targetArrivalMinutes * 20 + 1 }), null);
    }
    assert.deepEqual(LEVELS.map(level => level.boardId), ['eroadtrip_l1', 'eroadtrip_l2', ...Array(5).fill(undefined)]);
  });

  test('implausible scores and levels without a board skip ArcadeScores', async () => {
    const run = { ...mockRun(), leaderboardRunId: 'implausible' };
    const result = mockResult(route1, run);
    const api = { record: assert.fail };
    for (const overrides of [
      { totalScore: 99 }, { totalScore: 1001 }, { totalScore: 812.5 },
      { totalMinutes: NaN }, { totalMinutes: 398 }, { totalMinutes: 15941 },
      { totalCostEur: -1 }, { totalCostEur: Infinity }
    ]) {
      assert.equal(buildSubmission(route1, run, { ...result, ...overrides }), null);
      assert.deepEqual(await submitRun(route1, run, { ...result, ...overrides }, live, api), { ok: false, dryRun: false });
    }
    assert.equal(buildSubmission(route2, run, result), null);
    const preview = LEVELS[2];
    assert.equal(newRunId(preview.boardId, api), undefined);
    assert.equal(buildSubmission(preview, mockRun(preview), result), null);
    assert.deepEqual(await submitRun(preview, { ...mockRun(preview), leaderboardRunId: 'preview' }, result, live, api),
      { ok: false, dryRun: false });
  });

  test('only the live hostname allows writes and every debug or off-host run uses dryRun', async () => {
    const cases = [
      [live, true], [{ ...live, search: '?lbdebug=0' }, true], [{ ...live, search: '?lbdebug=1' }, false],
      [{ hostname: 'mic4rd.github.io', search: '?lbdebug=0' }, false],
      [{ hostname: 'localhost', search: '' }, false], [{ hostname: '', search: '' }, false],
      [{ hostname: 'hunterjoeing.github.io.example.test', search: '' }, false]
    ];
    for (const [index, [location, allowed]] of cases.entries()) {
      assert.equal(shouldSubmit(location), allowed);
      const calls = [];
      const run = { ...mockRun(), leaderboardRunId: `host-${index}` };
      const api = { record(board, _score, _label, _lower, opts) {
        calls.push([board, opts.dryRun]);
        opts.onResult?.({ ok: allowed, dryRun: !allowed });
      } };
      const outcome = await submitRun(route1, run, mockResult(route1, run), location, api);
      assert.equal(outcome.dryRun, !allowed);
      assert.deepEqual(calls, [['eroadtrip', !allowed], ['eroadtrip_l1', !allowed]]);
    }
  });

  test('a run ID submits once to each board and resolves from the level board', async () => {
    let generated = 0;
    const calls = [];
    const api = {
      newRunId(board) { generated++; assert.equal(board, route2.boardId); return 'level-two-run'; },
      record(...args) { calls.push(args); args[4].onResult?.({ ok: true, rank: 23, entries: 41 }); }
    };
    const run = { ...mockRun(route2), leaderboardRunId: newRunId(route2.boardId, api) };
    const result = mockResult(route2, run);
    const first = submitRun(route2, run, result, live, api);
    assert.equal(submitRun(route2, { ...run }, result, live, api), first);
    assert.deepEqual(await first, { ok: true, dryRun: false, rank: 23, entries: 41 });
    assert.equal(submitRun(route2, run, result, live, api), first);
    assert.equal(generated, 1);
    assert.deepEqual(calls.map(([gameId, score, label, lower, { meta, runId }]) => {
      assert.equal(validateEroadtripScore(gameId, { score, meta }), null);
      return [gameId, score, label, lower, meta.board, runId];
    }), [
      ['eroadtrip', 812, '812 Pkt · A-Rang · 34h00m · Model 3', false, 'eroadtrip_l2', 'level-two-run_all'],
      ['eroadtrip_l2', 812, '812 Pkt · A-Rang · 34h00m · Model 3', false, 'eroadtrip_l2', 'level-two-run']
    ]);
  });

  test('ArcadeScores can be absent or throw without interrupting a run', async () => {
    const run = { ...mockRun(), leaderboardRunId: newRunId(route1.boardId) };
    assert.match(run.leaderboardRunId, /^eroadtrip_l1_/);
    const result = mockResult(route1, run);
    for (const api of [undefined, { record: () => { throw new Error('Offline'); } }]) {
      assert.deepEqual(await submitRun(route1, run, result, live, api), { ok: false, dryRun: false });
    }

    const root = new DomStub();
    const state = Object.assign(root.querySelector('#res-lb-state'), { isConnected: true });
    const ui = new ResultsUI(root, {});
    assert.doesNotThrow(() => ui.show(route1, run, result, save));
    assert.match(root.innerHTML, /Globale Bestenliste · Level 1/);
    assert.equal(root.querySelector('#res-lb-debug').hidden, false);
    assert.equal(root.querySelector('#res-lb-rank').textContent, '');
    await setImmediate();
    assert.equal(state.textContent, 'Bestenliste gerade nicht erreichbar.');
  });

  test('repeat finish callbacks render, reward and submit a completed drive once', async () => {
    const run = { ...mockRun(), leaderboardRunId: 'finish-twice' };
    const campaign = { ...save, completedLevels: {} };
    const expected = evaluateRun(route1, run, true);
    const writes = [];
    const results = [];
    const previousScores = window.ArcadeScores;
    window.ArcadeScores = { record(board, _score, _label, _lower, opts) {
      writes.push(board);
      opts.onResult?.({ ok: false, dryRun: true });
    } };
    const controller = Object.assign(Object.create(ERoadtripController.prototype), {
      level: route1, bridge: { runState: run }, save: campaign,
      eventModal: { close() {} }, drivingHUD: { setMode() {} }, stopAllGameplayScenes() {},
      resultsUI: { show: (...args) => results.push(args) }
    });
    try {
      controller.finishLevel(true);
      controller.finishLevel(true);
      assert.equal(results.length, 1);
      assert.equal(campaign.cashEur, save.cashEur + expected.prizeMoneyEur);
      assert.equal((await results[0][4]).dryRun, true);
      assert.deepEqual(writes, ['eroadtrip', 'eroadtrip_l1']);
    } finally {
      window.ArcadeScores = previousScores;
    }
  });

  test('the results panel shows the rank, renders names literally and reloads after a rename', async t => {
    const { location, ArcadeScores } = window;
    t.after(() => Object.assign(window, { location, ArcadeScores }));
    window.location = live;
    const requests = [];
    const name = '<img src=x onerror=alert(1)>';
    let currentName = name.toUpperCase();
    let top = [{ playerName: name, score: 812, label: '812 Pkt' }];
    window.ArcadeScores = {
      getPlayerName: () => currentName,
      async fetchLeaderboard(boardId, limit) { requests.push([boardId, limit]); return { ok: true, top }; },
      openPlayerNameModal(onSave, options) {
        assert.deepEqual(options, { dryRun: false });
        currentName = 'Neuer Name';
        top = [];
        onSave();
      },
      openLeaderboardModal: boardId => requests.push([boardId, 'modal']),
      record: assert.fail
    };

    const root = new DomStub();
    const state = Object.assign(root.querySelector('#res-lb-state'), { isConnected: true });
    const body = root.querySelector('#res-lb-rows');
    const rows = [];
    body.replaceChildren = () => { rows.length = 0; };
    body.insertRow = () => {
      const cells = [];
      const classes = new Set();
      rows.push({ cells, classes });
      return {
        classList: { toggle: (className, on) => { if (on) classes.add(className); } },
        insertCell: () => { const cell = new DomStub(); cells.push(cell); return cell; }
      };
    };
    const run = mockRun(route2);
    const ui = new ResultsUI(root, {});
    ui.show(route2, run, mockResult(route2, run), save, Promise.resolve({ ok: true, dryRun: false, rank: 23, entries: 41 }));
    assert.equal(state.textContent, 'Lade globale Bestenliste…');
    await setImmediate();
    assert.equal(root.querySelector('#res-lb-rank').textContent, 'Dein Platz: #23 von 41');
    assert.equal(root.querySelector('#res-lb-debug').hidden, true);
    assert.deepEqual(rows[0].cells.map(cell => cell.textContent), ['#1', name, '812 Pkt']);
    assert.equal(rows[0].cells[1].innerHTML, '');
    assert.ok(rows[0].classes.has('is-me'));
    assert.equal(root.querySelector('.res-lb-table').hidden, false);

    root.querySelector('#res-lb-all').click();
    root.querySelector('#res-lb-name').click();
    await setImmediate();
    assert.equal(state.textContent, 'Noch keine Einträge – sichere dir Platz 1!');
    assert.equal(root.querySelector('.res-lb-table').hidden, true);
    assert.deepEqual(requests, [[route2.boardId, 10], [route2.boardId, 'modal'], [route2.boardId, 10]]);
  });

  test('build-time leaderboard version matches package and the latest public release', () => {
    const packageVersion = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version;
    const window = {};
    runInNewContext(readFileSync(new URL('../../../shared/releases.js', import.meta.url), 'utf8'), { window });
    const latest = window.ARCADE_RELEASES.releases.find(({ app }) => app === 'eroadtrip');
    assert.equal(EROADTRIP_VERSION, packageVersion);
    assert.equal(EROADTRIP_VERSION, latest.version);
  });
}
