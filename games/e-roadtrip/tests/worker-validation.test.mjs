import assert from 'node:assert/strict';
import worker, { validateEroadtripScore } from '../../../cloudflare-worker/worker.js';

const level1 = {
  score: 812,
  meta: { levelId: 'level_1_aachen_hannover', minutes: 797, costEur: 65.5 }
};
const level2 = {
  score: '790',
  meta: { levelId: 'level_2_family_summer', minutes: 2040, costEur: 0 }
};

export default function register(test) {
  test('worker accepts both E-Roadtrip level boards and overall board metadata aliases', () => {
    assert.equal(validateEroadtripScore('eroadtrip_l1', level1), null);
    assert.equal(validateEroadtripScore('eroadtrip_l2', level2), null);
    assert.equal(validateEroadtripScore('eroadtrip', {
      ...level1, meta: { ...level1.meta, board: 'eroadtrip_l1' }
    }), null);
    assert.equal(validateEroadtripScore('eroadtrip', {
      ...level2, meta: { ...level2.meta, levelBoard: 'eroadtrip_l2' }
    }), null);
    assert.equal(validateEroadtripScore('eroadtrip_l1', {
      score: 100, meta: { minutes: 398.5, costEur: 0 }
    }), null);
    assert.equal(validateEroadtripScore('eroadtrip_l2', {
      score: 1000, meta: { minutes: 40800, costEur: 0 }
    }), null);
  });

  test('worker rejects implausible E-Roadtrip results and leaves other game validation alone', () => {
    for (const score of [812.5, 99, 1001, Infinity, [812]]) {
      assert.match(validateEroadtripScore('eroadtrip_l1', { ...level1, score }), /integer/);
    }
    for (const minutes of [398, 15941, '797', NaN]) {
      assert.match(validateEroadtripScore('eroadtrip_l1', {
        ...level1, meta: { ...level1.meta, minutes }
      }), /minutes/);
    }
    for (const costEur of [-1, Infinity, null]) {
      assert.match(validateEroadtripScore('eroadtrip_l1', {
        ...level1, meta: { ...level1.meta, costEur }
      }), /costEur/);
    }
    assert.match(validateEroadtripScore('eroadtrip_l3', level1), /Unknown/);
    assert.match(validateEroadtripScore('eroadtrip_l1', level2), /levelId/);
    assert.match(validateEroadtripScore('eroadtrip', level1), /Unknown/);
    assert.match(validateEroadtripScore('eroadtrip', {
      ...level1, meta: { ...level1.meta, board: 'toString' }
    }), /Unknown/);
    assert.match(validateEroadtripScore('eroadtrip_l1', { score: 812, meta: [] }), /invalid score meta/);
    assert.equal(validateEroadtripScore('minesweeper', { score: 0 }), null);
  });

  test('worker returns 400 before writing invalid scores or moving a run between boards', async () => {
    let lookups = 0;
    const DB = {
      prepare(sql) {
        if (/^CREATE TABLE|^PRAGMA/.test(sql)) return {};
        assert.match(sql, /^SELECT id, game_id AS gameId, score FROM scores WHERE run_id/);
        lookups++;
        return {
          bind: () => ({ first: async () => ({ id: 1, gameId: 'eroadtrip_l1', score: 812 }) })
        };
      },
      async batch() {}
    };
    const post = body => worker.fetch(new Request('https://example.test/api/scores', {
      method: 'POST', body: JSON.stringify(body)
    }), { DB });

    const invalid = await post({ ...level1, score: 812.5, gameId: 'eroadtrip_l1' });
    assert.equal(invalid.status, 400);
    assert.deepEqual(await invalid.json(), { ok: false, error: 'E-Roadtrip score must be an integer from 100 to 1000' });
    assert.equal(lookups, 0);

    const collision = await post({ ...level2, gameId: 'eroadtrip_l2', runId: 'existing-run' });
    assert.equal(collision.status, 400);
    assert.deepEqual(await collision.json(), { ok: false, error: 'runId belongs to a different board' });
    assert.equal(lookups, 1);
  });
}
