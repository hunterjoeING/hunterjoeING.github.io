import { getVehicleById } from '../data/vehicles';
import { EvaluationResult, LevelConfig, RunState } from '../types';

declare const __EROADTRIP_VERSION__: string | undefined;
export const EROADTRIP_VERSION = typeof __EROADTRIP_VERSION__ === 'string' ? __EROADTRIP_VERSION__ : '0.0.0';

interface SubmissionMeta {
  board: string;
  levelId: string;
  routeId: string;
  vehicleId: string;
  minutes: number;
  targetMinutes: number;
  costEur: number;
  grade: string;
  subScores: EvaluationResult['subScores'];
  cleanArrival: boolean;
  collisions: number;
  version: string;
}

export interface SubmissionResult {
  ok: boolean;
  dryRun: boolean;
  rank?: number;
  entries?: number;
}

export interface ArcadeScoresApi {
  newRunId?(boardId: string): string;
  record(boardId: string, score: number, label: string, lowerIsBetter: boolean, opts: {
    runId: string;
    meta: SubmissionMeta;
    dryRun: boolean;
    silent: boolean;
    onResult?: (result: Omit<SubmissionResult, 'dryRun'> & { dryRun?: boolean }) => void;
  }): boolean;
  fetchLeaderboard(boardId: string, limit: number): Promise<{
    ok: boolean;
    top: { playerName: string; score: number; label: string }[];
  }>;
  getPlayerName(): string;
  openPlayerNameModal(onSave: () => void, options: { dryRun: boolean }): void;
  openLeaderboardModal(boardId: string): void;
}

declare global {
  interface Window {
    ArcadeScores?: ArcadeScoresApi;
  }
}

type LeaderboardLocation = Pick<Location, 'hostname' | 'search'>;

export function shouldSubmit(location: LeaderboardLocation): boolean {
  return location.hostname === 'hunterjoeing.github.io' &&
    !new URLSearchParams(location.search).getAll('lbdebug').includes('1');
}

export function newRunId(boardId: string | undefined, api?: ArcadeScoresApi): string | undefined {
  if (!boardId) return;
  try {
    const runId = api?.newRunId?.(boardId);
    if (runId) return runId;
  } catch { /* A run can start without the Arcade integration. */ }
  return `${boardId}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function buildSubmission(level: LevelConfig, run: RunState, result: EvaluationResult) {
  const { boardId, targetArrivalMinutes: targetMinutes } = level;
  const { totalScore: score, totalMinutes: minutes, totalCostEur: costEur } = result;
  if (!boardId || result.gameOver || run.levelId !== level.id || !Number.isInteger(score) || score < 0 || score > 1000 ||
      !Number.isFinite(minutes) || minutes < 0.5 * targetMinutes || minutes > 20 * targetMinutes ||
      !Number.isFinite(costEur) || costEur < 0) return null;

  const gradeLabel = result.gradeLabel.split(' · ', 1)[0];
  const grade = gradeLabel.match(/^([A-Z])-Rang$/)?.[1] ?? gradeLabel;
  const duration = `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}m`;
  const car = getVehicleById(run.plan.vehicleId);
  const label = `${score} Pkt · ${gradeLabel} · ${duration} · ${car.shortName}`.slice(0, 80);
  const meta: SubmissionMeta = {
    board: boardId,
    levelId: level.id,
    routeId: run.plan.selectedRouteId,
    vehicleId: run.plan.vehicleId,
    minutes,
    targetMinutes,
    costEur,
    grade,
    subScores: { ...result.subScores },
    cleanArrival: result.cleanArrival,
    collisions: run.collisionsCount,
    version: EROADTRIP_VERSION
  };
  return { score, label, meta };
}

const submittedRuns = new Map<string, Promise<SubmissionResult>>();

export function submitRun(
  level: LevelConfig,
  run: RunState,
  result: EvaluationResult,
  location: LeaderboardLocation,
  api?: ArcadeScoresApi
): Promise<SubmissionResult> {
  const dryRun = !shouldSubmit(location);
  const failure = { ok: false, dryRun };
  try {
    const runId = run.leaderboardRunId;
    if (!runId || !api?.record) return Promise.resolve(failure);
    const previous = submittedRuns.get(runId);
    if (previous) return previous;
    const submission = buildSubmission(level, run, result);
    if (!submission) return Promise.resolve(failure);

    const { score, label, meta } = submission;
    const opts = { meta, dryRun, silent: true };
    const pending = Promise.resolve().then(() => new Promise<SubmissionResult>(resolve => {
      // The shared name dialog updates the last submission, so leave the level entry last.
      try {
        api.record('eroadtrip', score, label, false, { ...opts, runId: `${runId}_all` });
      } catch { /* The level board can still accept the run. */ }
      api.record(meta.board, score, label, false, {
        ...opts, runId,
        onResult: ({ ok, rank, entries }) => resolve({ ok, dryRun, rank, entries })
      });
    })).catch(() => failure);
    submittedRuns.set(runId, pending);
    return pending;
  } catch {
    return Promise.resolve(failure);
  }
}
