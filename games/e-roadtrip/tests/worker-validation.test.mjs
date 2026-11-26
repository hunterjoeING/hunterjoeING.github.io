import assert from 'node:assert/strict';
import { createFixtures } from './fixtures.mjs';
import worker, { validateEroadtripScore } from '../../../cloudflare-worker/worker.js';

const level1 = {
  score: 812,
  meta: { levelId: 'level_1_aachen_hannover', minutes: 797, costEur: 65.5 }
};
const level2 = {
  score: '790',
  meta: { levelId: 'level_2_family_summer', minutes: 1100, costEur: 0 }
};

export default function register(test, game) {
  test('worker accepts the first two E-Roadtrip level boards and overall board metadata aliases', () => {
    assert.equal(validateEroadtripScore('eroadtrip_l1', level1), null);
    assert.equal(validateEroadtripScore('eroadtrip_l2', level2), null);
    assert.equal(validateEroadtripScore('eroadtrip_l2', {
      score: 0, meta: { ...level2.meta, minutes: 850 }
    }), null);
    assert.equal(validateEroadtripScore('eroadtrip_l2', {
      score: 1, meta: { ...level2.meta, minutes: 550 }
    }), null);
    assert.match(validateEroadtripScore('eroadtrip_l2', {
      score: 0, meta: { ...level2.meta, minutes: 549 }
    }), /minutes/);
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

  test('worker validates Level 3 on its own and overall boards at the exact time and score bounds', () => {
    const { boardId, id, targetArrivalMinutes } = game.getLevelById('level_3_alps_winter');
    const meta = { levelId: id, board: boardId, costEur: 0 };
    for (const board of [boardId, 'eroadtrip']) {
      for (const [score, minutes] of [[0, targetArrivalMinutes / 2], [1000, 20 * targetArrivalMinutes]]) {
        assert.equal(validateEroadtripScore(board, { score, meta: { ...meta, minutes } }), null);
      }
      for (const minutes of [targetArrivalMinutes / 2 - 0.01, targetArrivalMinutes * 20 + 0.01]) {
        assert.match(validateEroadtripScore(board, { score: 812, meta: { ...meta, minutes } }), /minutes/);
      }
      for (const score of [-1, 1001, 0.5]) {
        assert.match(validateEroadtripScore(board, { score, meta: { ...meta, minutes: targetArrivalMinutes } }), /integer/);
      }
      const validTime = { ...meta, minutes: targetArrivalMinutes };
      assert.match(validateEroadtripScore(board, { score: 812, meta: { ...validTime, levelId: level2.meta.levelId } }), /levelId/);
      assert.match(validateEroadtripScore(board, { score: 812, meta: { ...validTime, costEur: -1 } }), /costEur/);
    }
  });

  test('Aachen city minutes keep every default forecast within score bounds and Levels 1 and 2 reachable with charging', t => {
    const { mkRun, route1, route2 } = createFixtures(game);
    const { CITY_TRANSITION_MINUTES, getLevelById, createDefaultPlan, evaluateTripPlan, evaluateRun, buildSubmission } = game;
    const winter = getLevelById('level_3_alps_winter');
    for (const level of [route1, route2, winter]) {
      const minutes = level.routeOptions.map(route => {
        const plan = createDefaultPlan(level, 'mg4_standard', route.id);
        const forecast = evaluateTripPlan(level, plan);
        const meta = { board: level.boardId, levelId: level.id, minutes: Math.round(forecast.totalMinutes),
          costEur: forecast.estimatedTotalCostEur };
        for (const board of [level.boardId, 'eroadtrip']) {
          assert.equal(validateEroadtripScore(board, { score: 0, meta }), null, route.id);
        }
        return meta.minutes;
      });
      t.diagnostic(`Level ${level.order} default forecasts: ${minutes.join(', ')} min`);
    }

    const scenarios = [
      [route1, 'mg4_standard', [
        [[2, 'chg_kamen_tesla'], [4, 'chg_bad_oeynhausen_ewego'], [7, 'chg_frechen_ewego']],
        [[2, 'chg_muenster_tesla'], [4, 'chg_osnabrueck_electra'], [7, 'chg_willich_electra']],
        [[2, 'chg_wilnsdorf_tesla'], [4, 'chg_hildesheim_enbw'], [5, 'chg_wilnsdorf_tesla']]
      ]],
      [route2, 'xpeng_g6_lr', [
        [[1, 'chg_metz_sud_ionity'], [2, 'chg_beaune_ionity']],
        [[1, 'chg_troyes_vianeo'], [2, 'chg_moulins_vianeo'], [3, 'chg_entraygues_dorfladen']],
        [[1, 'chg_mons_ionity'], [2, 'chg_orleans_tesla'], [3, 'chg_entraygues_dorfladen']]
      ]]
    ];
    for (const [level, vehicle, stopsByRoute] of scenarios) {
      for (const [index, route] of level.routeOptions.entries()) {
        const plan = createDefaultPlan(level, vehicle, route.id);
        if (route.id === 'l2_route_b_clermont') {
          for (const leg of plan.legPlans) leg.targetSpeedKmh = Math.min(120, leg.targetSpeedKmh);
        }
        plan.plannedStops = stopsByRoute[index].map(([legIndex, chargerId]) => ({
          chargerId, legIndex, targetSocPct: level === route1 ? 90 : 94
        }));
        const forecast = evaluateTripPlan(level, plan);
        assert.ok(forecast.valid, route.id);
        assert.ok(forecast.finalArrivalSocPct > 0, route.id);
        const withoutAachen = {
          ...level,
          routeOptions: level.routeOptions.map(option => ({
            ...option,
            legs: option.legs.map(leg => leg.citySegmentAtStart === 'aachen_start'
              ? { ...leg, citySegmentAtStart: undefined } : leg)
          }))
        };
        assert.equal(forecast.totalMinutes, evaluateTripPlan(withoutAachen, plan).totalMinutes + CITY_TRANSITION_MINUTES.aachen_start);
        const run = {
          ...mkRun(level, vehicle), plan, elapsedMinutes: forecast.totalMinutes, distanceDrivenKm: forecast.totalDistanceKm,
          chargingCostEur: forecast.estimatedChargingCostEur, tollsEur: forecast.tollsEur, socPct: forecast.finalArrivalSocPct
        };
        const submission = buildSubmission(level, run, evaluateRun(level, run, true));
        assert.ok(submission, route.id);
        assert.equal(validateEroadtripScore(level.boardId, submission), null);
        assert.equal(validateEroadtripScore('eroadtrip', submission), null);
      }
    }
  });

  test('worker GET serves the named Level 3 board in descending score order', async () => {
    const DB = {
      prepare(sql) {
        if (/^CREATE TABLE|^PRAGMA/.test(sql)) return {};
        if (sql.includes('ORDER BY')) assert.match(sql, /ORDER BY score DESC/);
        return { bind(gameId) {
          assert.equal(gameId, 'eroadtrip_l3');
          return { all: async () => ({ results: [] }), first: async () => null };
        } };
      },
      async batch() {}
    };
    const request = new Request('https://example.test/api/scores?game=eroadtrip_l3');
    const response = await worker.fetch(request, { DB });
    assert.equal(response.status, 200);
    const board = await response.json();
    assert.equal(board.title, 'e-Roadtrip: Pixel Europe · Level 3: Winter-Alpenüberquerung');
    assert.equal(board.lowerIsBetter, false);
    assert.deepEqual(board.top, []);
  });

  test('worker rejects implausible E-Roadtrip results and leaves other game validation alone', () => {
    for (const score of [812.5, -1, 1001, Infinity, [812], "", "  "]) {
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
    assert.match(validateEroadtripScore('eroadtrip_l4', level1), /Unknown/);
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
    assert.deepEqual(await invalid.json(), { ok: false, error: 'E-Roadtrip score must be an integer from 0 to 1000' });
    assert.equal(lookups, 0);

    const collision = await post({ ...level2, gameId: 'eroadtrip_l2', runId: 'existing-run' });
    assert.equal(collision.status, 400);
    assert.deepEqual(await collision.json(), { ok: false, error: 'runId belongs to a different board' });
    assert.equal(lookups, 1);
  });
}
