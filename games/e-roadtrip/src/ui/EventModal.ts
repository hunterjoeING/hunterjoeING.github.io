import {
  ChargerStation,
  EventChoice,
  GameEventDef,
  LevelConfig,
  RunState,
  WifeDialogueChoice,
  WifeDialogueDef
} from '../types';
import { getVehicleById } from '../data/vehicles';
import { estimateChargeSession, getChargingPowerKw } from '../sim/EnergyModel';
import { findNearestAvailableCharger, predictLiveTripSoc } from '../sim/RoutePlanner';
import { SoundFX } from '../phaser/SoundFX';

export class EventModal {
  private modalEl: HTMLElement;
  private chargeTimer: number | null = null;

  constructor(modalEl: HTMLElement) {
    this.modalEl = modalEl;
  }

  public close(): void {
    if (this.chargeTimer !== null) {
      window.clearInterval(this.chargeTimer);
      this.chargeTimer = null;
    }
    this.modalEl.classList.add('hidden');
    this.modalEl.innerHTML = '';
  }

  public showDynamicEvent(
    evt: GameEventDef,
    onChoose: (choice: EventChoice) => string,
    onResume: () => void
  ): void {
    this.modalEl.classList.remove('hidden');
    this.modalEl.innerHTML = `
      <div class="er-modal-card">
        <div class="er-modal-head">
          <span class="er-modal-icon">${evt.icon}</span>
          <div>
            <div class="er-modal-kicker">Unterwegs-Ereignis</div>
            <h3>${evt.title}</h3>
          </div>
        </div>
        <p class="er-modal-body">${evt.description}</p>
        <div class="er-modal-choices" id="evt-choices">
          ${evt.choices
            .map(
              c => `
            <button type="button" class="er-choice-btn" data-cid="${c.id}">
              <strong>${c.label}</strong>
              <span>${c.hint}</span>
            </button>`
            )
            .join('')}
        </div>
        <div id="evt-outcome" class="hidden"></div>
      </div>
    `;

    this.modalEl.querySelectorAll('.er-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = (btn as HTMLElement).dataset.cid;
        const choice = evt.choices.find(c => c.id === cid);
        if (!choice) return;
        SoundFX.click();
        const msg = onChoose(choice);
        const choicesBox = this.modalEl.querySelector('#evt-choices');
        const outBox = this.modalEl.querySelector('#evt-outcome');
        if (choicesBox) choicesBox.classList.add('hidden');
        if (outBox) {
          outBox.classList.remove('hidden');
          outBox.innerHTML = `
            <div class="er-outcome-box">${msg}</div>
            <button type="button" class="er-primary-btn" id="btn-evt-continue">Weiterfahren →</button>
          `;
          outBox.querySelector('#btn-evt-continue')?.addEventListener('click', () => {
            SoundFX.click();
            this.close();
            onResume();
          });
        }
      });
    });
  }

  public showWifeStressDialogue(
    dlg: WifeDialogueDef,
    level: LevelConfig,
    run: RunState,
    onApplyRouteAction: (action: 'insert_stop' | 'eco_speed') => string,
    onSelectReply: (choice: WifeDialogueChoice, routeChanged: boolean) => void,
    onResume: () => void
  ): void {
    let routeChanged = false;
    let routeFeedback = '';
    const nearest = findNearestAvailableCharger(
      level,
      run.plan,
      run.currentLegIndex,
      0.2,
      [...run.completedStopIds, ...run.plan.plannedStops.map(s => s.chargerId)]
    );

    const render = () => {
      const stressColor = run.stress > 65 ? '#ef4444' : run.stress > 40 ? '#f59e0b' : '#22c55e';
      const pred = predictLiveTripSoc(level, run);
      this.modalEl.classList.remove('hidden');
      this.modalEl.innerHTML = `
        <div class="er-modal-card wife-card">
          <div class="er-modal-head">
            <span class="er-modal-icon">💬</span>
            <div>
              <div class="er-modal-kicker">Beifahrer- &amp; Stress-Dialog</div>
              <h3>${dlg.speaker}</h3>
            </div>
            <div class="wife-stress-badge" style="border-color:${stressColor}; color:${stressColor}">
              Stress: ${Math.round(run.stress)}%
            </div>
          </div>

          <blockquote class="wife-quote">${dlg.quote}</blockquote>
          <p class="wife-hint">${dlg.contextHint}</p>

          <div class="wife-map-eval">
            <div class="wme-head">
              <strong>🗺️ Alternativen live prüfen (während des Gesprächs)</strong>
              <span>Aktuell: ${Math.round(run.socPct)}% SoC · Ankunft ${pred.nextStopName}: <b>${pred.predictedArrivalNextSocPct}%</b> · ${run.currentSpeedKmh} km/h</span>
            </div>
            <div class="wme-actions">
              ${
                nearest
                  ? `<button type="button" class="er-mini-btn" id="btn-wife-add-stop" ${routeChanged ? 'disabled' : ''}>
                      ⚡ +${dlg.suggestedQuickStopMinutes} Min Zwischenstopp: ${nearest.station.name}
                     </button>`
                  : `<span class="wme-note">Nächster Ladestopp ist bereits eingeplant.</span>`
              }
              <button type="button" class="er-mini-btn" id="btn-wife-eco">
                🐢 Tempo auf 115 km/h senken (-22 % Verbrauch)
              </button>
            </div>
            ${routeFeedback ? `<div class="wme-feedback">✅ ${routeFeedback}</div>` : ''}
          </div>

          <div class="er-modal-choices" id="wife-choices">
            ${dlg.choices
              .map(
                c => `
              <button type="button" class="er-choice-btn" data-wid="${c.id}">
                <strong>${c.text}</strong>
                <span>Tonfall: ${c.tone === 'calming' ? 'Verständnisvoll & ruhig' : c.tone === 'confident' ? 'Souverän & faktenbasiert' : c.tone === 'risky' ? 'Riskant' : 'Gereizt'}</span>
              </button>`
              )
              .join('')}
          </div>
          <div id="wife-outcome" class="hidden"></div>
        </div>
      `;

      this.modalEl.querySelector('#btn-wife-add-stop')?.addEventListener('click', () => {
        SoundFX.click();
        routeChanged = true;
        routeFeedback = onApplyRouteAction('insert_stop');
        render();
      });

      this.modalEl.querySelector('#btn-wife-eco')?.addEventListener('click', () => {
        SoundFX.click();
        routeChanged = true;
        routeFeedback = onApplyRouteAction('eco_speed');
        render();
      });

      this.modalEl.querySelectorAll('[data-wid]').forEach(btn => {
        btn.addEventListener('click', () => {
          const wid = (btn as HTMLElement).dataset.wid;
          const choice = dlg.choices.find(c => c.id === wid);
          if (!choice) return;
          SoundFX.click();
          onSelectReply(choice, routeChanged);
          const chBox = this.modalEl.querySelector('#wife-choices');
          const outBox = this.modalEl.querySelector('#wife-outcome');
          if (chBox) chBox.classList.add('hidden');
          if (outBox) {
            outBox.classList.remove('hidden');
            outBox.innerHTML = `
              <div class="er-outcome-box">
                <div><strong>Antwort Partnerin:</strong> ${choice.replyText}</div>
                <div style="margin-top:6px;font-size:12.5px;opacity:0.9;">Aktueller Stresspegel: <strong>${Math.round(run.stress)}%</strong></div>
              </div>
              <button type="button" class="er-primary-btn" id="btn-wife-resume">Fahrt fortsetzen →</button>
            `;
            outBox.querySelector('#btn-wife-resume')?.addEventListener('click', () => {
              SoundFX.click();
              this.close();
              onResume();
            });
          }
        });
      });
    };

    render();
  }

  public showCollisionDialogue(
    kind: 'car' | 'pedestrian' | 'cyclist' | 'obstacle',
    onResolve: (costEur: number, timeMin: number, stressDelta: number, summary: string) => void
  ): void {
    const labelMap = {
      car: 'Blechschaden / Rempler mit anderem Fahrzeug',
      pedestrian: 'Beinahe-Zusammenstoß mit Fußgänger!',
      cyclist: 'Kontakt am Radweg mit Radfahrer!',
      obstacle: 'Baustellen-Pylone / Bordstein gestreift'
    };

    this.modalEl.classList.remove('hidden');
    this.modalEl.innerHTML = `
      <div class="er-modal-card">
        <div class="er-modal-head">
          <span class="er-modal-icon">💥</span>
          <div>
            <div class="er-modal-kicker">GTA-Stadtverkehr · Zwischenfall</div>
            <h3>${labelMap[kind]}</h3>
          </div>
        </div>
        <p class="er-modal-body">Wie reagierst du auf die Situation im Stadtverkehr?</p>
        <div class="er-modal-choices">
          <button type="button" class="er-choice-btn" id="col-calm">
            <strong>Ruhig aussteigen, entschuldigen &amp; sauber klären</strong>
            <span>+8 Min Zeit · ${kind === 'obstacle' ? '0 €' : '65 € Kleinschaden'} · moderater Stress</span>
          </button>
          <button type="button" class="er-choice-btn" id="col-rush">
            <strong>Hektisch weiterwinken</strong>
            <span>+2 Min Zeit · höheres Bußgeld-/Stressrisiko (+120 €, +16 Stress)</span>
          </button>
        </div>
      </div>
    `;

    this.modalEl.querySelector('#col-calm')?.addEventListener('click', () => {
      SoundFX.click();
      this.close();
      onResolve(kind === 'obstacle' ? 0 : 65, 8, 9, `${labelMap[kind]} ruhig & fair geklärt.`);
    });
    this.modalEl.querySelector('#col-rush')?.addEventListener('click', () => {
      SoundFX.click();
      this.close();
      onResolve(120, 2, 16, `${labelMap[kind]} hektisch geregelt (Anzeige/Bußgeld).`);
    });
  }

  public showChargingSession(
    station: ChargerStation,
    level: LevelConfig,
    run: RunState,
    targetSocPct: number,
    onComplete: (addedKwh: number, minutesSpent: number, costEur: number, newSoc: number) => void
  ): void {
    const vehicle = getVehicleById(run.plan.vehicleId);
    const startSoc = Math.max(2, Math.round(run.socPct));
    let activeTarget = Math.min(100, Math.max(startSoc + 10, targetSocPct));
    const est = estimateChargeSession(
      vehicle,
      station,
      startSoc,
      activeTarget,
      run.plan.subscriptionIds
    );

    let currentSoc = startSoc;
    let addedKwh = 0;
    let elapsedMin = 2.5;
    let costEur = 0;
    let finished = false;

    SoundFX.plugIn();

    const startTicker = () => {
      if (this.chargeTimer !== null) return;
      this.chargeTimer = window.setInterval(() => {
        if (currentSoc >= activeTarget) {
          finished = true;
          SoundFX.chargeDone();
          if (this.chargeTimer !== null) {
            window.clearInterval(this.chargeTimer);
            this.chargeTimer = null;
          }
          renderCharge();
          return;
        }

        const stepSoc = 2.5;
        const nextSoc = Math.min(activeTarget, currentSoc + stepSoc);
        const dSoc = nextSoc - currentSoc;
        const midSoc = (currentSoc + nextSoc) / 2;
        const kw = getChargingPowerKw(vehicle, station, midSoc);
        const kwhStep = (vehicle.batteryKwh * dSoc) / 100;
        const billedKwh = kwhStep * 1.04;
        addedKwh += billedKwh;
        costEur += billedKwh * est.tariff.pricePerKwh;
        elapsedMin += (kwhStep / kw) * 60;
        currentSoc = nextSoc;
        renderCharge();
      }, 170);
    };

    const renderCharge = () => {
      const kwNow = Math.round(getChargingPowerKw(vehicle, station, currentSoc));
      const pctProgress = Math.min(100, Math.round(currentSoc));
      const livePred = predictLiveTripSoc(level, run, {
        overrideSocPct: currentSoc,
        skipStationId: station.id
      });
      const predClass =
        livePred.predictedArrivalNextSocPct <= 5
          ? 'danger'
          : livePred.predictedArrivalNextSocPct < 15
            ? 'warn'
            : 'ok';

      // Build charging curve SVG with active live marker
      const w = 260;
      const h = 76;
      const maxKw = 330;
      const pts = vehicle.chargingCurve
        .map(p => {
          const x = (p.soc / 100) * (w - 16) + 8;
          const y = h - 10 - (p.kw / maxKw) * (h - 20);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(' ');
      const dotX = (currentSoc / 100) * (w - 16) + 8;
      const dotY = h - 10 - (kwNow / maxKw) * (h - 20);

      this.modalEl.classList.remove('hidden');
      this.modalEl.innerHTML = `
        <div class="er-modal-card charge-card">
          <div class="er-modal-head">
            <span class="er-modal-icon">⚡</span>
            <div>
              <div class="er-modal-kicker">Schnellladen aktiv · ${station.network.toUpperCase()}</div>
              <h3>${station.name}</h3>
            </div>
            <span class="charge-kw-pill">${kwNow} kW</span>
          </div>

          <div class="charge-soc-bar-wrap">
            <div class="charge-soc-bar" style="width:${pctProgress}%"></div>
            <span class="charge-soc-label">${pctProgress}% SoC (Ziel ${activeTarget}%)</span>
          </div>

          <div class="charge-arrival-pred ${predClass}">
            <div>
              <span class="cap-kicker">🎯 Prognose bei Abstecken jetzt (${pctProgress}% SoC):</span>
              <strong>Ankunft ${livePred.nextStopName} (${livePred.distanceToNextKm} km): ${livePred.predictedArrivalNextSocPct}% SoC</strong>
            </div>
            ${
              livePred.nextStopKind !== 'destination'
                ? `<div class="cap-final">🏁 Ziel-Prognose: <strong>${livePred.predictedFinalSocPct}%</strong></div>`
                : ''
            }
          </div>

          <div class="charge-curve-box">
            <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
              <polyline fill="none" stroke="rgba(148,163,184,0.3)" stroke-width="1" points="8,${h - 10} ${w - 8},${h - 10}" />
              <polyline fill="none" stroke="#2563eb" stroke-width="2.5" points="${pts}" />
              <line x1="${dotX.toFixed(1)}" y1="6" x2="${dotX.toFixed(1)}" y2="${h - 10}" stroke="#22c55e" stroke-dasharray="3 2" />
              <circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="5" fill="#22c55e" stroke="#ffffff" stroke-width="1.5" />
            </svg>
          </div>

          <div class="charge-stats-grid">
            <div><span>Geladen</span><strong>+${addedKwh.toFixed(1)} kWh</strong></div>
            <div><span>Ladezeit</span><strong>${Math.round(elapsedMin)} Min</strong></div>
            <div>
              <span>Tarif</span>
              <strong>${est.tariff.pricePerKwh.toFixed(2)} €/kWh</strong>
              ${est.tariff.hasSubscriptionDiscount ? `<small style="opacity:0.7;text-decoration:line-through">${est.tariff.pricePerKwhWithoutSub.toFixed(2)} €</small>` : ''}
            </div>
            <div><span>Kosten</span><strong>${costEur.toFixed(2)} €</strong></div>
          </div>

          ${
            est.tariff.hasMcDonaldsBonus
              ? `<div class="mcd-bonus-banner">🍔 EWE Go @ McDonald’s Bonus: Frischer Snack &amp; WC (-12 Stress)!</div>`
              : `<div class="charge-tarif-note">Abgerechnet über: <b>${est.tariff.usedSubscriptionName}</b></div>`
          }

          <div class="charge-btn-row">
            ${
              activeTarget < 100
                ? `<button type="button" class="er-mini-btn" id="btn-charge-more">+10 % Ziel (${Math.min(100, activeTarget + 10)}%)</button>`
                : ''
            }
            <button type="button" class="er-primary-btn" id="btn-unplug">
              ${finished ? '🔌 Ladevorgang komplett – Weiterfahren!' : '🔌 Jetzt abstecken & weiterfahren'}
            </button>
          </div>
        </div>
      `;

      this.modalEl.querySelector('#btn-charge-more')?.addEventListener('click', () => {
        SoundFX.click();
        activeTarget = Math.min(100, activeTarget + 10);
        finished = false;
        renderCharge();
        startTicker();
      });

      this.modalEl.querySelector('#btn-unplug')?.addEventListener('click', () => {
        SoundFX.click();
        this.close();
        onComplete(addedKwh, Math.round(elapsedMin), Number(costEur.toFixed(2)), Math.round(currentSoc));
      });
    };

    renderCharge();
    startTicker();
  }

  public showMapPeek(summaryHtml: string, onClose: () => void): void {
    this.modalEl.classList.remove('hidden');
    this.modalEl.innerHTML = `
      <div class="er-modal-card">
        <div class="er-modal-head">
          <span class="er-modal-icon">🗺️</span>
          <div>
            <div class="er-modal-kicker">Live-Routenstatus</div>
            <h3>Aktuelle Etappen &amp; Restakku</h3>
          </div>
        </div>
        <div class="er-modal-body">${summaryHtml}</div>
        <button type="button" class="er-primary-btn" id="btn-map-close">Zurück ans Steuer →</button>
      </div>
    `;
    this.modalEl.querySelector('#btn-map-close')?.addEventListener('click', () => {
      SoundFX.click();
      this.close();
      onClose();
    });
  }
}
