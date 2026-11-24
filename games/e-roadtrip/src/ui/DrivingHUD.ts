import { LevelConfig, RunState } from '../types';
import { getCityById, getEdgeById } from '../data/europeMap';
import { getVehicleById } from '../data/vehicles';
import { getActiveRouteLegs, predictLiveTripSoc } from '../sim/RoutePlanner';
import {
  TouchControlKey,
  isTouchKeyHeld,
  pressTouchPointer,
  releaseAllTouchPointers,
  releaseTouchPointer
} from '../phaser/GameBridge';
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
  private shellKey = '';

  constructor(hudEl: HTMLElement, touchEl: HTMLElement, cb: DrivingHUDCallbacks) {
    this.hudEl = hudEl;
    this.touchEl = touchEl;
    this.cb = cb;

    try {
      this.forceTouchVisible =
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
    } catch (_) {
      this.forceTouchVisible = false;
    }
    this.renderTouchControls();
    this.hudEl.addEventListener('pointerdown', ev => this.onHudPointer(ev));
  }

  private onHudPointer(ev: Event): void {
    const target = ev.target as HTMLElement | null;
    const btn = target?.closest('button');
    if (!btn || !this.hudEl.contains(btn)) return;
    ev.preventDefault();
    ev.stopPropagation();
    const spd = btn.getAttribute('data-spd');
    const scale = btn.getAttribute('data-scale');
    if (spd) {
      SoundFX.click();
      this.cb.onSpeedChange(Number(spd));
    } else if (scale) {
      SoundFX.click();
      this.cb.onTimeScaleChange(Number(scale));
    } else if (btn.id === 'btn-force-stop') {
      SoundFX.click();
      this.cb.onForceEarlierStop();
    } else if (btn.id === 'btn-wc-stop') {
      SoundFX.click();
      this.cb.onUnplannedToiletStop();
    } else if (btn.id === 'btn-peek-map') {
      SoundFX.click();
      this.cb.onToggleMapPreview();
    }
  }

  public isTouchVisible(): boolean {
    return this.forceTouchVisible;
  }

  public clearTouchStates(): void {
    releaseAllTouchPointers();
    this.paintTouchPads();
  }

  public setMode(mode: 'hidden' | 'autobahn' | 'city'): void {
    this.mode = mode;
    this.hudEl.classList.toggle('hidden', mode === 'hidden');
    if (mode !== 'city') {
      this.clearTouchStates();
    }
    this.updateTouchVisibility();
  }

  public toggleTouchOverlay(): boolean {
    this.forceTouchVisible = !this.forceTouchVisible;
    if (!this.forceTouchVisible) this.clearTouchStates();
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

    const totalCost = (
      run.chargingCostEur +
      run.subscriptionCostEur +
      run.tollsAndFinesEur +
      (run.lodgingCostEur || 0)
    ).toFixed(2);
    const speeds = [100, 120, 130, 150, 175].filter(s => s <= vehicle.maxSpeedKmh + 5);
    const shellKey = `${this.mode}|${speeds.join(',')}`;
    if (this.shellKey !== shellKey) {
      this.shellKey = shellKey;
      const speedButtons = speeds
        .map(s => {
          const value = Math.min(vehicle.maxSpeedKmh, s);
          return `<button type="button" class="dhud-btn" data-spd="${value}">${value}</button>`;
        })
        .join('');
      this.hudEl.innerHTML =
        this.mode === 'autobahn'
          ? `
      <div class="dhud-row">
        <div class="dhud-pill soc" data-pill="soc">🔋 <span data-field="soc"></span></div>
        <div class="dhud-pill soc-pred" data-pill="pred">🎯 <span data-field="pred"></span></div>
        <div class="dhud-pill">🛣️ <span data-field="route"></span></div>
        <div class="dhud-pill">🕒 <span data-field="clock"></span></div>
        <div class="dhud-pill" data-pill="stress"><span data-field="stress"></span></div>
        <div class="dhud-pill">💶 <span data-field="cost"></span></div>
      </div>
      <div class="dhud-controls">
        <div class="dhud-group">
          <span>Tempo (<span data-field="tempo"></span>):</span>
          ${speedButtons}
        </div>
        <div class="dhud-group">
          <span>Zeitraffer:</span>
          <button type="button" class="dhud-btn" data-scale="1">1×</button>
          <button type="button" class="dhud-btn" data-scale="5">5×</button>
          <button type="button" class="dhud-btn" data-scale="15">15×</button>
        </div>
        <div class="dhud-group">
          <button type="button" class="dhud-action" id="btn-force-stop">⚡ Früher laden</button>
          <button type="button" class="dhud-action" id="btn-wc-stop">🚻 WC-Stopp (+8m)</button>
          <button type="button" class="dhud-action" id="btn-peek-map">🗺️ Karte</button>
        </div>
      </div>`
          : `
      <div class="dhud-row">
        <div class="dhud-pill soc" data-pill="soc">🔋 <span data-field="soc"></span></div>
        <div class="dhud-pill soc-pred" data-pill="pred">🎯 <span data-field="pred"></span></div>
        <div class="dhud-pill">🛣️ <span data-field="route"></span></div>
        <div class="dhud-pill">🕒 <span data-field="clock"></span></div>
        <div class="dhud-pill" data-pill="stress"><span data-field="stress"></span></div>
        <div class="dhud-pill">💶 <span data-field="cost"></span></div>
      </div>
      <div class="dhud-controls">
        <div class="dhud-city-hint">
          🎮 GTA-2 Stadt-Segment: <b>WASD / Pfeile</b> fahren · <b>Leertaste</b> bremsen · <b>H</b> hupen · Ampeln, Radler &amp; Kinder beachten!
        </div>
      </div>`;
    }

    const chosen =
      run.plan.legPlans.find(x => x.legIndex === run.currentLegIndex)?.targetSpeedKmh ?? run.currentSpeedKmh;
    const capNote = run.speedCapKmh ? ` · ${run.speedCapLabel || 'Limit'} ${run.speedCapKmh}` : '';
    this.setHtml('soc', `<strong>${socRound}%</strong> (~${rangeEstKm} km · ${pred.consumptionKwh100.toFixed(1)} kWh/100)`);
    this.setHtml(
      'pred',
      `<span>${pred.nextStopName} (${pred.distanceToNextKm} km):</span> <strong>Ankunft ${pred.predictedArrivalNextSocPct}%</strong>${
        pred.nextStopKind !== 'destination' ? ` · 🏁 Ziel: <strong>${pred.predictedFinalSocPct}%</strong>` : ''
      }`
    );
    this.setText(
      'route',
      citySubtitle || `${from.name} → ${to.name} (${Math.round(run.legProgressKm)}/${edge.distanceKm} km)`
    );
    this.setText('clock', `${hh}:${mm} · ${weatherBadge}`);
    this.setHtml(
      'stress',
      `${moodEmoji} Stress: <strong>${Math.round(run.stress)}%</strong> · 🚻 ${Math.round(run.bladderNeed)}%`
    );
    this.setText('cost', `${totalCost} €`);
    this.setText('tempo', `${Math.round(run.currentSpeedKmh)} km/h${capNote}`);
    this.hudEl.querySelector('[data-pill="soc"]')?.classList.toggle('low', socRound < 15);
    this.hudEl.querySelector('[data-pill="stress"]')?.classList.toggle('warn', run.stress > 60);
    const predPill = this.hudEl.querySelector('[data-pill="pred"]');
    predPill?.classList.remove('low', 'warn', 'ok');
    predPill?.classList.add(nextSocClass);
    this.hudEl.querySelectorAll<HTMLButtonElement>('[data-spd]').forEach(btn => {
      btn.classList.toggle('active', Math.abs(chosen - Number(btn.dataset.spd)) < 4);
    });
    this.hudEl.querySelectorAll<HTMLButtonElement>('[data-scale]').forEach(btn => {
      btn.classList.toggle('active', timeScale === Number(btn.dataset.scale));
    });
  }

  private setText(field: string, text: string): void {
    const el = this.hudEl.querySelector(`[data-field="${field}"]`);
    if (el && el.textContent !== text) el.textContent = text;
  }

  private setHtml(field: string, html: string): void {
    const el = this.hudEl.querySelector(`[data-field="${field}"]`);
    if (el && el.innerHTML !== html) el.innerHTML = html;
  }

  private renderTouchControls(): void {
    if (this.touchEl.dataset.bound === '1') return;
    this.touchEl.dataset.bound = '1';
    this.touchEl.innerHTML = `
      <div class="touch-left">
        <button type="button" class="touch-pad" data-t="left" draggable="false" aria-label="Links lenken">◀</button>
        <button type="button" class="touch-pad" data-t="right" draggable="false" aria-label="Rechts lenken">▶</button>
      </div>
      <div class="touch-right">
        <button type="button" class="touch-pad horn" data-t="horn" draggable="false" aria-label="Hupen">📯</button>
        <button type="button" class="touch-pad stop" data-t="brake" draggable="false" aria-label="Handbremse">🛑</button>
        <button type="button" class="touch-pad brake" data-t="down" draggable="false" aria-label="Rückwärts">▼</button>
        <button type="button" class="touch-pad gas" data-t="up" draggable="false" aria-label="Gas geben">▲</button>
      </div>
    `;

    const root = this.touchEl;
    root.addEventListener('pointerdown', ev => this.onTouchPointerDown(ev as PointerEvent), { capture: true, passive: false });
    root.addEventListener('pointerleave', ev => this.onTouchPointerLeave(ev as PointerEvent), { capture: true });
    root.addEventListener('lostpointercapture', ev => this.onTouchPointerGone(ev as PointerEvent), { capture: true });
    root.addEventListener('contextmenu', ev => {
      ev.preventDefault();
      this.clearTouchStates();
    });
    root.addEventListener('selectstart', ev => ev.preventDefault());
    root.addEventListener('dragstart', ev => ev.preventDefault());
    root.addEventListener('touchstart', ev => ev.preventDefault(), { passive: false });

    const gone = (ev: Event) => this.onTouchPointerGone(ev as PointerEvent);
    window.addEventListener('pointerup', gone, true);
    window.addEventListener('pointercancel', gone, true);
    window.addEventListener('blur', () => this.clearTouchStates());
    window.addEventListener('touchend', ev => this.onTouchContactEnd(ev), true);
    window.addEventListener('touchcancel', ev => this.onTouchContactEnd(ev), true);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') this.clearTouchStates();
    });
  }

  private padFromEvent(ev: Event): HTMLElement | null {
    const target = ev.target as HTMLElement | null;
    const btn = target?.closest?.('[data-t]') as HTMLElement | null;
    if (!btn || !this.touchEl.contains(btn)) return null;
    return btn;
  }

  private onTouchPointerDown(ev: PointerEvent): void {
    const btn = this.padFromEvent(ev);
    if (!btn) return;
    const key = btn.dataset.t as TouchControlKey | undefined;
    if (!key) return;
    ev.preventDefault();
    ev.stopPropagation();
    try {
      btn.setPointerCapture(ev.pointerId);
    } catch (_) {}
    pressTouchPointer(ev.pointerId, key);
    this.paintTouchPads();
  }

  private onTouchPointerLeave(ev: PointerEvent): void {
    const btn = this.padFromEvent(ev);
    if (!btn) return;
    if (typeof btn.hasPointerCapture === 'function' && btn.hasPointerCapture(ev.pointerId)) return;
    releaseTouchPointer(ev.pointerId);
    this.paintTouchPads();
  }

  private onTouchPointerGone(ev: PointerEvent): void {
    if (typeof ev.pointerId !== 'number') {
      this.clearTouchStates();
      return;
    }
    releaseTouchPointer(ev.pointerId);
    const btn = this.padFromEvent(ev);
    if (btn && typeof btn.releasePointerCapture === 'function' && btn.hasPointerCapture?.(ev.pointerId)) {
      try {
        btn.releasePointerCapture(ev.pointerId);
      } catch (_) {}
    }
    this.paintTouchPads();
  }

  private onTouchContactEnd(ev: TouchEvent): void {
    for (const touch of Array.from(ev.changedTouches)) {
      releaseTouchPointer(touch.identifier);
    }
    this.paintTouchPads();
  }

  private paintTouchPads(): void {
    this.touchEl.querySelectorAll<HTMLElement>('[data-t]').forEach(btn => {
      const key = btn.dataset.t as TouchControlKey | undefined;
      btn.classList.toggle('pressed', !!key && isTouchKeyHeld(key));
    });
  }
}
