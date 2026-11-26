import type { LevelConfig, RunState } from '../types';
import { evaluateStopSkip, getApproachingRoadStop, SKIP_RESERVE_SOC_PCT } from '../sim/RoutePlanner';

export const stopSkipCardHtml = `
  <section class="dhud-stop-card" hidden aria-label="Geplanter Ladestopp">
    <strong data-field="skip-title"></strong>
    <div class="dhud-stop-actions">
      <button type="button" class="dhud-btn dhud-keep-stop" data-stop-action="keep" hidden>Anfahren</button>
      <button type="button" class="dhud-btn" data-stop-action="skip" aria-describedby="dhud-skip-warning" hidden>Auslassen</button>
      <button type="button" class="dhud-btn" data-stop-action="undo" hidden>Rückgängig</button>
    </div>
    <div class="dhud-stop-copy" data-field="skip-forecast"></div>
    <div class="dhud-stop-copy dhud-stop-warning" id="dhud-skip-warning" hidden></div>
  </section>`;

export class StopSkipCard {
  private readonly title: HTMLElement;
  private readonly forecast: HTMLElement;
  private readonly warning: HTMLElement;
  private readonly keep: HTMLButtonElement;
  private readonly skip: HTMLButtonElement;
  private readonly undo: HTMLButtonElement;
  private key?: string;
  private keptKey?: string;

  constructor(private readonly root: HTMLElement, onDecision: (key: string, action: 'skip' | 'undo') => void) {
    this.title = root.querySelector<HTMLElement>('[data-field="skip-title"]')!;
    this.forecast = root.querySelector<HTMLElement>('[data-field="skip-forecast"]')!;
    this.warning = root.querySelector<HTMLElement>('#dhud-skip-warning')!;
    this.keep = root.querySelector<HTMLButtonElement>('[data-stop-action="keep"]')!;
    this.skip = root.querySelector<HTMLButtonElement>('[data-stop-action="skip"]')!;
    this.undo = root.querySelector<HTMLButtonElement>('[data-stop-action="undo"]')!;
    this.keep.addEventListener('click', () => {
      this.keptKey = this.key;
      root.hidden = true;
    });
    this.skip.addEventListener('click', () => {
      if (this.key && !this.skip.disabled) onDecision(this.key, 'skip');
    });
    this.undo.addEventListener('click', () => {
      if (this.key) onDecision(this.key, 'undo');
    });
  }

  public update(level: LevelConfig, run: RunState): void {
    const approach = getApproachingRoadStop(level, run);
    this.key = approach?.key;
    if (!approach || approach.key === this.keptKey) {
      this.root.hidden = true;
      return;
    }
    this.root.hidden = false;
    this.keep.hidden = this.skip.hidden = this.forecast.hidden = approach.skipped;
    this.undo.hidden = !approach.skipped;
    if (approach.skipped) {
      this.setText(this.title, `Ausgelassen · ${approach.station.name}`);
      this.warning.hidden = true;
      return;
    }

    const evaluation = evaluateStopSkip(level, run, approach.stop);
    this.setText(this.title, `Ladestopp ${approach.station.name} in ${Math.ceil(approach.distanceKm)} km`);
    this.skip.disabled = !evaluation.allowed;
    this.warning.hidden = evaluation.allowed;
    const soc = Math.max(0, evaluation.projectedSocPct ?? 0);
    const rounded = Math.round(soc);
    const displaySoc = !evaluation.allowed && rounded >= SKIP_RESERVE_SOC_PCT
      ? (Math.floor(soc * 100) / 100).toLocaleString('de-DE')
      : String(rounded);
    this.setText(this.forecast, `Ohne Laden: Ankunft ${evaluation.nextTargetName} ≈ ${displaySoc} %`);
    this.setText(this.warning, `Reicht nicht – nur noch ≈ ${displaySoc} % am nächsten Ziel`);
  }

  private setText(element: HTMLElement, value: string): void {
    if (element.textContent !== value) element.textContent = value;
  }
}
