import type { RunState } from '../types';

export interface PauseEffects {
  minutes?: number;
  costEur?: number;
  stressDelta?: number;
  hungerDelta?: number;
  resetBladder?: boolean;
}

type Needs = Pick<RunState, 'stress' | 'hungerNeed' | 'bladderNeed'>;

function stressAfter(current: number, delta: number): number {
  return Math.max(0, Math.min(100, current + delta));
}

export function applyStress(run: Pick<RunState, 'stress' | 'peakStress'>, delta: number): void {
  run.stress = stressAfter(run.stress, delta);
  run.peakStress = Math.max(run.peakStress, run.stress);
}

export function applyPauseNeeds(needs: Needs, effects: PauseEffects): void {
  needs.stress = stressAfter(needs.stress, effects.stressDelta ?? 0);
  needs.hungerNeed = Math.max(0, Math.min(100, needs.hungerNeed + (effects.hungerDelta ?? 0)));
  if (effects.resetBladder) needs.bladderNeed = 0;
}

export function applyPause(run: RunState, effects: PauseEffects): void {
  run.elapsedMinutes += effects.minutes ?? 0;
  run.pauseCostEur += effects.costEur ?? 0;
  applyPauseNeeds(run, effects);
  run.peakStress = Math.max(run.peakStress, run.stress);
}
