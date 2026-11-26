import { HighwayEdge, LevelConfig, RunState } from '../types';
import { getCityById, getEdgeById } from '../data/europeMap';
import { getVehicleById } from '../data/vehicles';
import { alpineLeg } from '../sim/AlpineDriving';
import { REGEN_MODES } from '../sim/AlpineDescent';
import { buildRemainingRoute } from '../sim/RouteNavigation';
import { getActiveRouteLegs, highwaySection, predictLiveTripSoc, snapSpeedKmh } from '../sim/RoutePlanner';
import { formatClock, formatDrivingCosts } from './DrivingStatus';
import { StopSkipCard, stopSkipCardHtml } from './StopSkipCard';
import { speedSignHtml } from './speedSign';
import {
  TouchControlKey,
  isTouchKeyHeld,
  pressTouchPointer,
  releaseAllTouchPointers,
  releaseTouchPointer
} from '../phaser/GameBridge';
import { SoundFX } from '../phaser/SoundFX';
import { getEdgeWaypoints, getPointAlongEdge } from '../phaser/MapLayout';

function renderStageComputer(
  edge: HighwayEdge,
  progress: number,
  reverse: boolean,
  tollsEur: number,
  pauseCostEur: number
): string {
  const pts = getEdgeWaypoints(edge, reverse);
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  pts.forEach(p => {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  });
  const w = 210;
  const h = 96;
  const pad = 10;
  const sx = Math.max(1, maxX - minX);
  const sy = Math.max(1, maxY - minY);
  const scale = Math.min((w - pad * 2) / sx, (h - pad * 2) / sy);
  const ox = (w - sx * scale) / 2;
  const oy = (h - sy * scale) / 2;
  const project = (p: { x: number; y: number }) => ({ x: ox + (p.x - minX) * scale, y: oy + (p.y - minY) * scale });
  const mapped = pts.map(project);
  const d = mapped.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const dot = project(getPointAlongEdge(edge, progress, reverse));
  return `
    ${edge.tollEur > 0 || tollsEur > 0 ? `<div class="trip-road">Maut bisher ${tollsEur.toFixed(2)} € · Etappe ${edge.tollEur.toFixed(2)} €</div>` : ''}
    ${pauseCostEur > 0 ? `<div class="trip-road">Pausen bisher ${pauseCostEur.toFixed(2)} €</div>` : ''}
    <svg viewBox="0 0 ${w} ${h}" class="stage-map" aria-hidden="true">
      <path d="${d}" fill="none" stroke="rgba(148,163,184,0.85)" stroke-width="4" stroke-linecap="round" />
      <circle cx="${dot.x.toFixed(1)}" cy="${dot.y.toFixed(1)}" r="5.5" fill="#38bdf8" stroke="#f8fafc" stroke-width="2" />
    </svg>
  `;
}

export interface DrivingHUDCallbacks {
  onSpeedChange: (speedKmh: number) => void;
  onTimeScaleChange: (scale: number) => void;
  onForceEarlierStop: () => void;
  onStopSkipDecision: (key: string, action: 'skip' | 'undo') => void;
  onUnplannedToiletStop: () => void;
  onToggleMapPreview: () => void;
  onTailgate: () => void;
}

export class DrivingHUD {
  private hudEl: HTMLElement;
  private touchEl: HTMLElement;
  private cb: DrivingHUDCallbacks;
  private mode: 'hidden' | 'autobahn' | 'city' = 'hidden';
  private forceTouchVisible = false;
  private shellKey = '';
  private readonly compactLayout = window.matchMedia('(max-width: 920px)');
  private replanFeedback = '';
  private replanFeedbackTimer?: number;
  private stopSkipCard?: StopSkipCard;

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
    this.hudEl.addEventListener('click', ev => {
      if (ev.detail === 0) this.onHudPointer(ev);
    });
    this.compactLayout.addEventListener('change', () => {
      const map = this.hudEl.querySelector<HTMLDetailsElement>('.er-trip-computer');
      if (map) map.open = !this.compactLayout.matches;
    });
    this.hudEl.addEventListener('input', ev => {
      const target = ev.target as HTMLInputElement | null;
      if (!target || !target.classList.contains('dhud-speed-slider')) return;
      const snapped = snapSpeedKmh(Number(target.value), Number(target.max), Number(target.min));
      if (target.value !== String(snapped)) target.value = String(snapped);
      this.cb.onSpeedChange(snapped);
    });
  }

  private onHudPointer(ev: Event): void {
    const target = ev.target as HTMLElement | null;
    const btn = target?.closest('button');
    if (!btn || btn.hasAttribute('data-stop-action') || !this.hudEl.contains(btn)) return;
    ev.preventDefault();
    ev.stopPropagation();
    if (btn.hasAttribute('disabled')) return;
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
    } else if (btn.id === 'btn-tailgate') {
      SoundFX.click();
      this.cb.onTailgate();
    }
  }

  public isTouchVisible(): boolean {
    return this.forceTouchVisible;
  }

  public clearTouchStates(): void {
    releaseAllTouchPointers();
    this.paintTouchPads();
  }

  public showReplanFeedback(message: string): void {
    window.clearTimeout(this.replanFeedbackTimer);
    this.replanFeedback = message;
    this.setText('replan-feedback', message);
    this.replanFeedbackTimer = window.setTimeout(() => {
      this.replanFeedback = '';
      this.setText('replan-feedback', '');
    }, 7000);
  }

  public setMode(mode: 'hidden' | 'autobahn' | 'city'): void {
    this.mode = mode;
    if (mode === 'hidden') {
      window.clearTimeout(this.replanFeedbackTimer);
      this.replanFeedback = '';
      this.shellKey = '';
    }
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

    const sliderMax = snapSpeedKmh(vehicle.maxSpeedKmh, vehicle.maxSpeedKmh);
    const signLimit = run.highwaySignLegIndex === run.currentLegIndex && run.highwaySignKmh !== undefined
      ? run.highwaySignKmh
      : highwaySection(edge, !!leg.reverse, run.legProgressKm, run.activeWeather, run.countryLimitKmh).signKmh;
    const catalog = [70, 80, 100, 110, 120, 130, 150, 175];
    const speeds = [...catalog.filter(s => s < sliderMax), sliderMax];
    const shellKey = `${this.mode}|${sliderMax}`;
    if (this.shellKey !== shellKey) {
      this.shellKey = shellKey;
      const speedButtons = speeds
        .map(s => {
          const value = s;
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
        <div class="dhud-group dhud-speed">
          <span data-field="speed-sign"></span>
          <span class="dhud-tempo"><span data-field="tempo"></span><small data-field="tempo-cap"></small></span>
          <input type="range" class="dhud-speed-slider" min="40" max="${sliderMax}" step="5" value="${sliderMax}" aria-label="Zieltempo" />
          <span class="dhud-max">max. ${sliderMax} km/h</span>
          <div class="dhud-presets">${speedButtons}</div>
        </div>
        <div class="dhud-group">
          <span>Zeitraffer:</span>
          <button type="button" class="dhud-btn" data-scale="1">1×</button>
          <button type="button" class="dhud-btn" data-scale="5">5×</button>
          <button type="button" class="dhud-btn" data-scale="15">15×</button>
        </div>
        <div class="dhud-group">
          <button type="button" class="dhud-action" id="btn-force-stop">⚡ Früher laden</button>
          <button type="button" class="dhud-action" id="btn-wc-stop">🚻 WC (+8 Min)</button>
          <button type="button" class="dhud-action" id="btn-peek-map">🗺️ Reiseplan</button>
          <button type="button" class="dhud-action tailgate-btn hidden" id="btn-tailgate">Lichthupe</button>
        </div>
      </div>
      <div class="dhud-replan-feedback" data-field="replan-feedback" role="status"></div>
      ${stopSkipCardHtml}
      <details class="er-trip-computer" ${this.compactLayout.matches ? '' : 'open'}>
        <summary>Navi · <span data-field="nav-summary"></span></summary>
        <ol class="trip-segments" data-field="nav-segments" aria-label="Verbleibende Etappen" tabindex="0"></ol>
        <div id="er-trip-computer"></div>
      </details>`
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
          🎮 Stadtfahrt: <b>WASD / Pfeile</b> fahren · <b>Leertaste</b> bremsen · <b>H</b> hupen · Ampeln, Radler &amp; Kinder beachten!
        </div>
      </div>`;
      const stopCard = this.mode === 'autobahn' ? this.hudEl.querySelector<HTMLElement>('.dhud-stop-card') : null;
      this.stopSkipCard = stopCard ? new StopSkipCard(stopCard, this.cb.onStopSkipDecision) : undefined;
    }
    this.stopSkipCard?.update(level, run);

    const chosen = snapSpeedKmh(
      run.plan.legPlans.find(x => x.legIndex === run.currentLegIndex)?.targetSpeedKmh ?? sliderMax,
      sliderMax
    );
    const overSign = signLimit > 0 && chosen > signLimit;
    const speedSlider = this.hudEl.querySelector('.dhud-speed-slider') as HTMLInputElement | null;
    if (speedSlider) {
      speedSlider.classList.toggle('over-limit', overSign);
      speedSlider.setAttribute('aria-valuetext', `${chosen} km/h`);
      if (document.activeElement !== speedSlider && speedSlider.value !== String(chosen)) {
        speedSlider.value = String(chosen);
      }
    }
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
    this.setText('clock', `${formatClock(level, run.elapsedMinutes)} · ${weatherBadge}`);
    this.setHtml(
      'stress',
      `${moodEmoji} Stress: <strong>${Math.round(run.stress)}%</strong> · 🚻 ${Math.round(run.bladderNeed)}% · Hunger ${Math.round(run.hungerNeed)}%`
    );
    this.setText('cost', formatDrivingCosts(run));
    this.setText('replan-feedback', this.replanFeedback);
    this.setHtml('speed-sign', speedSignHtml(signLimit));
    this.setText('tempo', `Ist ${Math.round(run.currentSpeedKmh)} · Ziel ${chosen}`);
    const descent = alpineLeg(level.id, edge, leg)?.descent;
    const regen = run.alpineDescent?.legIndex === run.currentLegIndex ? run.alpineDescent : undefined;
    const regenLabel = descent && regen && run.legProgressKm >= descent.startKm && run.legProgressKm <= descent.endKm
      ? `${REGEN_MODES[regen.mode].label} · +${regen.recoveredKwh.toFixed(1)} kWh` : '';
    this.setText('tempo-cap', [run.speedCapLabel, regenLabel].filter(Boolean).join(' · '));
    this.hudEl.querySelector('[data-pill="soc"]')?.classList.toggle('low', socRound < 15);
    this.hudEl.querySelector('[data-pill="stress"]')?.classList.toggle('warn', run.stress > 60);
    const predPill = this.hudEl.querySelector('[data-pill="pred"]');
    predPill?.classList.remove('low', 'warn', 'ok');
    predPill?.classList.add(nextSocClass);
    this.hudEl.querySelectorAll<HTMLButtonElement>('[data-spd]').forEach(btn => {
      const active = chosen === Number(btn.dataset.spd);
      btn.classList.toggle('active', active);
      btn.classList.toggle('over-limit', active && overSign);
    });
    this.hudEl.querySelectorAll<HTMLButtonElement>('[data-scale]').forEach(btn => {
      btn.classList.toggle('active', timeScale === Number(btn.dataset.scale));
    });
    this.hudEl.querySelector('#btn-tailgate')?.classList.toggle('hidden', !run.tailgateReady);
    const computer = this.hudEl.querySelector('#er-trip-computer');
    if (computer && this.mode === 'autobahn') {
      const route = buildRemainingRoute(level, run);
      this.setText('nav-summary', `${route.destination} · ${Math.round(route.remainingKm)} km · ca. ${Math.ceil(route.etaMinutes)} Min`);
      this.setHtml('nav-segments', route.segments.map(segment => `
        <li${segment.current ? ' aria-current="step"' : ''}>
          <div><b>${segment.highwayName}</b> · ${segment.from} → ${segment.to}</div>
          <span>${Math.round(segment.remainingKm)} km</span>
        </li>`).join(''));
      const progress = Math.max(0, Math.min(1, run.legProgressKm / Math.max(1, edge.distanceKm)));
      computer.innerHTML = renderStageComputer(edge, progress, !!leg.reverse, run.tollsEur, run.pauseCostEur);
    }
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
