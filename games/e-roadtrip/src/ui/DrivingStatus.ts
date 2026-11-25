import type { LevelConfig, RunState } from '../types';
import { totalRunCost } from '../sim/ScoringEngine';

export function formatClock(level: LevelConfig, elapsedMin: number): string {
  const total = Math.round(level.departureTimeHour * 60 + elapsedMin);
  const hh = String(Math.floor(total / 60) % 24).padStart(2, '0');
  const mm = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

export function formatDrivingCosts(run: RunState): string {
  return totalRunCost(run).toFixed(2) + ' €';
}

export function renderDriveStatus(level: LevelConfig, run: RunState): string {
  return `<div class="er-modal-drive-status" aria-label="Fahrtstatus beim Öffnen">
    <span>Hunger <b>${Math.round(run.hungerNeed)} %</b></span>
    <span>Akku <b>${Math.round(run.socPct)} %</b></span>
    <span>Stress <b>${Math.round(run.stress)} %</b></span>
    <span>Ausgaben <b>${formatDrivingCosts(run)}</b></span>
    <time>${formatClock(level, run.elapsedMinutes)}</time>
  </div>`;
}
