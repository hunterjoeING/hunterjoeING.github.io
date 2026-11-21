import { LevelConfig, RunState } from '../types';
import { getCityById, getEdgeById } from '../data/europeMap';
import { getVehicleById } from '../data/vehicles';
import { getActiveRouteLegs, predictLiveTripSoc } from '../sim/RoutePlanner';
import { TouchInput } from '../phaser/GameBridge';
import { SoundFX } from '../phaser/SoundFX';

export interface DrivingHUDCallbacks {
  onSpeedChange: (speedKmh: number) => void;
  onTimeScaleChange: (scale: number) => void;
  onForceEarlierStop: () => void;
  onUnplannedToiletStop: () => void;
  onToggleMapPreview: () => void;
}

export class DrivingHUD {
  private hudEl: HTMLElement;
  private touchEl: HTMLElement;
  private cb: DrivingHUDCallbacks;
  private mode: 'hidden' | 'autobahn' | 'city' = 'hidden';
  private forceTouchVisible = false;

  constructor(hudEl: HTMLElement, touchEl: HTMLElement, cb: DrivingHUDCallbacks) {
    this.hudEl = hudEl;
    this.touchEl = touchEl;
    this.cb = cb;

    try {
      this.forceTouchVisible =
        window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    } catch (_) {
      this.forceTouchVisible = false;
    }
    this.renderTouchControls();
  }

  public setMode(mode: 'hidden' | 'autobahn' | 'city'): void {
    this.mode = mode;
    this.hudEl.classList.toggle('hidden', mode === 'hidden');
    this.updateTouchVisibility();
  }

  public toggleTouchOverlay(): boolean {
    this.forceTouchVisible = !this.forceTouchVisible;
    this.updateTouchVisibility();
    return this.forceTouchVisible;
  }

  private updateTouchVisibility(): void {
    const showTouch = this.mode === 'city' && this.forceTouchVisible;
    this.touchEl.classList.toggle('hidden', !showTouch);
  }

  public update(level: LevelConfig, run: RunState, timeScale: number, citySubtitle?: string): void {
    if (this.mode === 'hidden') return;
    const activeLegs = getActiveRouteLegs(level, run.plan);
    const leg = activeLegs[run.currentLegIndex] || activeLegs[0];
    const edge = getEdgeById(leg.edgeId);
    const from = getCityById(leg.reverse ? edge.toCityId : edge.fromCityId);
    const to = getCityById(leg.reverse ? edge.fromCityId : edge.toCityId);
    const vehicle = getVehicleById(run.plan.vehicleId);

    const pred = predictLiveTripSoc(level, run);
    const clockTotalMin = Math.round(level.departureTimeHour * 60 + run.elapsedMinutes);
    const hh = String(Math.floor(clockTotalMin / 60) % 24).padStart(2, '0');
    const mm = String(clockTotalMin % 60).padStart(2, '0');
    const socRound = Math.round(run.socPct);
    const rangeEstKm = Math.round(
      ((run.socPct / 100) * vehicle.batteryKwh) / (Math.max(10, pred.consumptionKwh100) / 100)
    );

    const nextSocClass =
      pred.predictedArrivalNextSocPct <= 5
        ? 'low'
        : pred.predictedArrivalNextSocPct < 15
          ? 'warn'
          : 'ok';

    const moodEmoji =
      run.stress < 25 ? '😌' : run.stress < 50 ? '😐' : run.stress < 75 ? '😟' : '😤';
    const weatherBadge =
      run.activeWeather === 'rain' ? '🌧️ Regen' : run.activeWeather === 'snow' ? '❄️ Schnee' : run.isNight ? '🌙 Nacht' : '☀️ Klar';

    const totalCost = (run.chargingCostEur + run.subscriptionCostEur + run.tollsAndFinesEur).toFixed(2);

    this.hudEl.innerHTML = `
      <div class="dhud-row">
        <div class="dhud-pill soc ${socRound < 15 ? 'low' : ''}">
          🔋 <strong>${socRound}%</strong> (~${rangeEstKm} km · ${pred.consumptionKwh100.toFixed(1)} kWh/100)
        </div>
        <div class="dhud-pill soc-pred ${nextSocClass}">
          🎯 <span>${pred.nextStopName} (${pred.distanceToNextKm} km):</span>
          <strong>Ankunft ${pred.predictedArrivalNextSocPct}%</strong>
          ${pred.nextStopKind !== 'destination' ? ` · 🏁 Ziel: <strong>${pred.predictedFinalSocPct}%</strong>` : ''}
        </div>
        <div class="dhud-pill">
          🛣️ ${citySubtitle || `${from.name} → ${to.name} (${Math.round(run.legProgressKm)}/${edge.distanceKm} km)`}
        </div>
        <div class="dhud-pill">🕒 ${hh}:${mm} · ${weatherBadge}</div>
        <div class="dhud-pill ${run.stress > 60 ? 'warn' : ''}">
          ${moodEmoji} Stress: <strong>${Math.round(run.stress)}%</strong> · 🚻 ${Math.round(run.bladderNeed)}%
        </div>
        <div class="dhud-pill">💶 ${totalCost} €</div>
      </div>

      ${
        this.mode === 'autobahn'
          ? `
        <div class="dhud-controls">
          <div class="dhud-group">
            <span>Tempo (${run.currentSpeedKmh} km/h):</span>
            ${[100, 120, 130, 150, 175]
              .filter(s => s <= vehicle.maxSpeedKmh + 5)
              .map(
                s =>
                  `<button type="button" class="dhud-btn ${Math.abs(run.currentSpeedKmh - s) < 4 ? 'active' : ''}" data-spd="${Math.min(vehicle.maxSpeedKmh, s)}">${Math.min(vehicle.maxSpeedKmh, s)}</button>`
              )
              .join('')}
          </div>
          <div class="dhud-group">
            <span>Zeitraffer:</span>
            ${[1, 5, 15]
              .map(
                sc =>
                  `<button type="button" class="dhud-btn ${timeScale === sc ? 'active' : ''}" data-scale="${sc}">${sc}×</button>`
              )
              .join('')}
          </div>
          <div class="dhud-group">
            <button type="button" class="dhud-action" id="btn-force-stop">⚡ Früher laden</button>
            <button type="button" class="dhud-action" id="btn-wc-stop">🚻 WC-Stopp (+8m)</button>
            <button type="button" class="dhud-action" id="btn-peek-map">🗺️ Karte</button>
          </div>
        </div>`
          : `
        <div class="dhud-controls">
          <div class="dhud-city-hint">
            🎮 GTA-2 Stadt-Segment: <b>WASD / Pfeile</b> fahren · <b>Leertaste</b> bremsen · <b>H</b> hupen · Ampeln, Radler &amp; Kinder beachten!
          </div>
        </div>`
      }
    `;

    if (this.mode === 'autobahn') {
      this.hudEl.querySelectorAll('[data-spd]').forEach(b => {
        b.addEventListener('click', () => {
          SoundFX.click();
          this.cb.onSpeedChange(Number((b as HTMLElement).dataset.spd));
        });
      });
      this.hudEl.querySelectorAll('[data-scale]').forEach(b => {
        b.addEventListener('click', () => {
          SoundFX.click();
          this.cb.onTimeScaleChange(Number((b as HTMLElement).dataset.scale));
        });
      });
      this.hudEl.querySelector('#btn-force-stop')?.addEventListener('click', () => {
        SoundFX.click();
        this.cb.onForceEarlierStop();
      });
      this.hudEl.querySelector('#btn-wc-stop')?.addEventListener('click', () => {
        SoundFX.click();
        this.cb.onUnplannedToiletStop();
      });
      this.hudEl.querySelector('#btn-peek-map')?.addEventListener('click', () => {
        SoundFX.click();
        this.cb.onToggleMapPreview();
      });
    }
  }

  private renderTouchControls(): void {
    this.touchEl.innerHTML = `
      <div class="touch-left">
        <button type="button" class="touch-pad" data-t="left" aria-label="Links lenken">◀</button>
        <button type="button" class="touch-pad" data-t="right" aria-label="Rechts lenken">▶</button>
      </div>
      <div class="touch-right">
        <button type="button" class="touch-pad horn" data-t="horn" aria-label="Hupen">📯</button>
        <button type="button" class="touch-pad brake" data-t="down" aria-label="Bremsen / Rückwärts">▼</button>
        <button type="button" class="touch-pad gas" data-t="up" aria-label="Gas geben">▲</button>
      </div>
    `;

    const bindHold = (btn: Element, key: 'left' | 'right' | 'up' | 'down') => {
      const setState = (val: boolean) => {
        TouchInput[key] = val;
        btn.classList.toggle('pressed', val);
      };
      btn.addEventListener('pointerdown', e => {
        e.preventDefault();
        setState(true);
      });
      btn.addEventListener('pointerup', () => setState(false));
      btn.addEventListener('pointerleave', () => setState(false));
      btn.addEventListener('pointercancel', () => setState(false));
    };

    (['left', 'right', 'up', 'down'] as const).forEach(k => {
      const el = this.touchEl.querySelector(`[data-t="${k}"]`);
      if (el) bindHold(el, k);
    });

    const hornBtn = this.touchEl.querySelector('[data-t="horn"]');
    hornBtn?.addEventListener('pointerdown', e => {
      e.preventDefault();
      TouchInput.hornPressed = true;
    });
  }
}
