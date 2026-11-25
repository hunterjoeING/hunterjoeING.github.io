import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { setImmediate } from 'node:timers/promises';
import { runInNewContext } from 'node:vm';
import { DomStub } from './dom-stub.mjs';

const source = readFileSync(new URL('../../../shared/arcade.js', import.meta.url), 'utf8');
const eventName = 'arcade:score-submitted';

function loadScores(fetch) {
  const window = new EventTarget();
  window.location = { pathname: '/' };
  let modal = null;
  const document = Object.assign(new DomStub(), {
    readyState: 'loading',
    documentElement: new DomStub(),
    body: { appendChild: node => { modal = node; } },
    createElement: () => {
      const node = new DomStub();
      node.remove = () => { if (modal === node) modal = null; };
      node.querySelector('#arcade-modal-tabs').querySelector('.arcade-tab-btn.active').focus = () => {};
      return node;
    },
    getElementById: id => {
      if (modal?.id === id) return modal;
      return modal?.innerHTML.includes(`id="${id}"`) ? modal.querySelector('#' + id) : null;
    }
  });
  const storage = new Map();
  const logs = [];
  const localStorage = {
    getItem: key => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value)
  };

  runInNewContext(source, {
    window, document, localStorage, CustomEvent, fetch,
    console: { info: (...args) => logs.push(args) }
  }, { filename: 'shared/arcade.js' });
  return { scores: window.ArcadeScores, window, document, logs };
}

export default function register(test) {
  test('record returns the personal-best boolean and publishes a successful POST result', async () => {
    const requests = [];
    const { scores, window } = loadScores(async (url, init) => {
      requests.push({ url, method: init.method, payload: JSON.parse(init.body) });
      return Response.json({ ok: true, rank: 2, entries: 8, plays: 10, isGlobalRecord: false });
    });
    let eventDetail;
    window.addEventListener(eventName, event => { eventDetail = event.detail; }, { once: true });

    const callbackDetail = await new Promise(resolve => {
      assert.equal(scores.record('eroadtrip_l2', 790, '790 Punkte', false, {
        runId: 'test-run', silent: true, onResult: resolve
      }), true);
    });
    assert.equal(eventDetail, callbackDetail);
    assert.deepEqual(structuredClone(eventDetail), {
      gameId: 'eroadtrip_l2', runId: 'test-run', score: 790,
      rank: 2, entries: 8, plays: 10, isGlobalRecord: false, ok: true
    });
    assert.deepEqual(requests.map(({ url, method, payload }) => [new URL(url).pathname, method, payload.runId]),
      [['/api/scores', 'POST', 'test-run']]);
    assert.deepEqual(Array.from(scores.getGroupMembers('eroadtrip_l2'), member => member.id),
      ['eroadtrip_l1', 'eroadtrip_l2', 'eroadtrip']);
    assert.equal(scores.getGroupMembers('minesweeper').length, 0);
  });

  test('record publishes validation and transport errors while preserving local scores', async () => {
    const { scores, window } = loadScores(async (_url, init) => {
      if (JSON.parse(init.body).runId === 'offline') throw new Error('Offline');
      return Response.json({ ok: false, error: 'Invalid score' }, { status: 400 });
    });
    for (const [runId, error] of [['invalid', 'Invalid score'], ['offline', 'Offline']]) {
      let eventDetail;
      window.addEventListener(eventName, event => { eventDetail = event.detail; }, { once: true });
      const callbackDetail = await new Promise(resolve => {
        assert.equal(scores.record('eroadtrip_l1', 812, '812 Punkte', false, {
          runId, silent: true, onResult: resolve
        }), runId === 'invalid');
      });
      assert.equal(eventDetail, callbackDetail);
      assert.deepEqual(structuredClone(eventDetail), { gameId: 'eroadtrip_l1', runId, ok: false, error });
    }
    assert.equal(scores.getBest('eroadtrip_l1').best, 812);
    assert.equal(scores.getBest('eroadtrip_l1').isGlobal, false);
  });

  test('dryRun logs and publishes the payload without POSTing or queuing a name update', () => {
    let fetchCalls = 0;
    const { scores, window, logs } = loadScores(() => { fetchCalls++; });
    let eventDetail;
    let callbackDetail;
    window.addEventListener(eventName, event => { eventDetail = event.detail; }, { once: true });

    assert.equal(scores.record('eroadtrip_l1', 812, '812 Punkte', false, {
      runId: 'dry-run', dryRun: true, onResult: detail => { callbackDetail = detail; }
    }), true);
    assert.equal(eventDetail, callbackDetail);
    assert.deepEqual(structuredClone(eventDetail), {
      ok: false, dryRun: true, payload: {
        gameId: 'eroadtrip_l1', playerName: 'Spieler', score: 812, label: '812 Punkte', runId: 'dry-run', meta: undefined
      }
    });
    assert.deepEqual(logs, [['[ArcadeScores dryRun]', eventDetail.payload]]);
    assert.equal(scores.getBest('eroadtrip_l1').isGlobal, false);
    scores.setPlayerName('Test');
    assert.equal(fetchCalls, 0);
  });

  test('name saves wait for a recent score update and can skip the POST in test mode', async () => {
    const requests = [];
    let finishRename;
    const { scores } = loadScores(async (_url, init) => {
      requests.push(JSON.parse(init.body));
      if (requests.length === 2) await new Promise(resolve => { finishRename = resolve; });
      return Response.json({ ok: true, rank: 1, entries: 1, plays: 1 });
    });
    await new Promise(resolve => scores.record('eroadtrip_l1', 812, '812 Punkte', false, {
      runId: 'name-update', silent: true, onResult: resolve
    }));
    let savedName;
    assert.equal(scores.setPlayerName('Neuer Name', { onSave: name => { savedName = name; } }), 'Neuer Name');
    assert.equal(savedName, undefined);
    assert.equal(requests[1].playerName, 'Neuer Name');
    assert.equal(requests[1].runId, 'name-update');
    finishRename();
    await setImmediate();
    assert.equal(savedName, 'Neuer Name');

    scores.setPlayerName('Testname', { dryRun: true, onSave: name => { savedName = name; } });
    assert.equal(savedName, 'Testname');
    assert.equal(requests.length, 2);
  });

  test('the hub lists public games and opens grouped E-Roadtrip tabs with independent selection', async () => {
    const requested = [];
    const { scores, window, document } = loadScores(async url => {
      requested.push(new URL(url).searchParams.get('game'));
      return Response.json({ ok: true, top: [] });
    });
    const modal = () => document.getElementById('arcade-modal-root');
    const tabIds = () => Array.from(modal().innerHTML.matchAll(/data-gid="([^"]+)"/g), match => match[1]);
    const clickTab = gid => {
      const tabs = document.getElementById('arcade-modal-tabs');
      tabs.listeners.get('click').callback({ target: { closest: () => ({ dataset: { gid } }) } });
    };

    scores.openLeaderboardModal();
    assert.deepEqual(tabIds(), Array.from(scores.CATALOG).filter(game => !game.unlisted).map(game => game.id));
    clickTab('eroadtrip');
    assert.deepEqual(tabIds(), ['eroadtrip_l1', 'eroadtrip_l2', 'eroadtrip']);
    assert.match(modal().innerHTML, /active" data-gid="eroadtrip">Gesamt/);
    clickTab('eroadtrip_l1');
    document.getElementById('arcade-board-refresh').click();

    window.location.pathname = '/games/e-roadtrip/';
    scores.openLeaderboardModal('eroadtrip_l2');
    assert.match(modal().innerHTML, /active" data-gid="eroadtrip_l2">Level 2/);
    window.dispatchEvent(Object.assign(new Event('keydown'), { key: 'Escape' }));
    assert.equal(modal(), null);
    scores.openLeaderboardModal();
    assert.deepEqual(tabIds(), ['eroadtrip_l1', 'eroadtrip_l2', 'eroadtrip']);
    assert.deepEqual(requested, ['minesweeper', 'eroadtrip', 'eroadtrip_l1', 'eroadtrip_l1', 'eroadtrip_l2', 'eroadtrip']);
    await setImmediate();
  });
}
