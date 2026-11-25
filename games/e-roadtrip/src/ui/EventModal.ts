import {
  BreakActivityKind,
  ChargerStation,
  CollisionInfo,
  EventChoice,
  GameEventDef,
  LevelConfig,
  PoliceViolationKind,
  RunState,
  WifeDialogueChoice,
  WifeDialogueDef
} from '../types';
import { getVehicleById } from '../data/vehicles';
import {
  CHARGE_SETUP_MINUTES, getBestPriceForStation, getChargingPowerKw, isAcCharger, measureChargeStep
} from '../sim/EnergyModel';
import { applyPauseNeeds, PauseEffects } from '../sim/PauseEffects';
import { findReachableAdditionalStop, MESSE_CHARGE_MINUTES, NO_REACHABLE_CHARGER, predictLiveTripSoc, stopKey } from '../sim/RoutePlanner';
import { SoundFX } from '../phaser/SoundFX';
import { playBreakPixelAnimation } from './BreakPixelAnim';
import { renderVehicleTouchscreenHtml } from './TouchscreenWidget';

export interface ChargingCompletePayload {
  addedKwh: number;
  minutesSpent: number;
  chargingCostEur: number;
  newSoc: number;
  activities: PauseEffects[];
  takenBreaks: string[];
}

export class EventModal {
  private modalEl: HTMLElement;
  private chargeTimer: number | null = null;
  private stopBreakAnim: (() => void) | null = null;

  constructor(modalEl: HTMLElement, private renderDriveStatus = () => '') {
    this.modalEl = modalEl;
  }

  public close(): void {
    if (this.chargeTimer !== null) {
      window.clearInterval(this.chargeTimer);
      this.chargeTimer = null;
    }
    if (this.stopBreakAnim) {
      this.stopBreakAnim();
      this.stopBreakAnim = null;
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
        ${this.renderDriveStatus()}
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

  public showMesseVisit(
    options: { chargePlanned: boolean; chargerAvailable: boolean },
    onConfirm: (choice: { charge: boolean; eat: boolean }) => string,
    onResume: () => void
  ): void {
    this.modalEl.classList.remove('hidden');
    this.modalEl.innerHTML = `
      <div class="er-modal-card">
        <div class="er-modal-head">
          <span class="er-modal-icon">🏛️</span>
          <div>
            <div class="er-modal-kicker">Hannover Messe · etwa 4 Stunden</div>
            <h3>Messebesuch</h3>
          </div>
        </div>
        ${this.renderDriveStatus()}
        <p class="er-modal-body">Der Termin dauert etwa 4 Stunden. Die Toilette ist automatisch dabei.</p>
        ${options.chargerAvailable ? `<label class="messe-opt"><input type="checkbox" id="messe-charge" ${options.chargePlanned ? 'checked' : ''} /> <span><strong>AC am Messeparkplatz</strong><br />${MESSE_CHARGE_MINUTES} Min Ladezeit, 6 Ladepunkte mit je 22 kW, 50 % Chance auf einen freien Platz.</span></label>` : ''}
        <label class="messe-opt"><input type="checkbox" id="messe-eat" /> <span><strong>In der Messe essen</strong><br />−50 €, Hunger sinkt deutlich.</span></label>
        <div id="messe-actions" class="er-modal-choices">
          <button type="button" class="er-primary-btn" id="messe-go">Vier Stunden bleiben</button>
        </div>
        <div id="messe-outcome" class="hidden"></div>
      </div>
    `;
    this.modalEl.querySelector('#messe-go')?.addEventListener('click', () => {
      SoundFX.click();
      const charge = !!(this.modalEl.querySelector('#messe-charge') as HTMLInputElement | null)?.checked;
      const eat = !!(this.modalEl.querySelector('#messe-eat') as HTMLInputElement | null)?.checked;
      const report = onConfirm({ charge, eat });
      const actions = this.modalEl.querySelector('#messe-actions');
      const opts = this.modalEl.querySelectorAll('.messe-opt');
      actions?.classList.add('hidden');
      opts.forEach(el => el.classList.add('hidden'));
      const out = this.modalEl.querySelector('#messe-outcome');
      if (out) {
        out.classList.remove('hidden');
        out.innerHTML = `
          <div class="messe-report">${report}</div>
          <button type="button" class="er-primary-btn" id="messe-next">Weiterfahren →</button>
        `;
        out.querySelector('#messe-next')?.addEventListener('click', () => {
          SoundFX.click();
          this.close();
          onResume();
        });
      }
    }, { once: true });
  }

  public showWifeStressDialogue(
    dlg: WifeDialogueDef,
    level: LevelConfig,
    run: RunState,
    onApplyRouteAction: (action: 'insert_stop' | 'eco_speed', stop?: { legIndex: number; station: ChargerStation }) => string,
    onSelectReply: (choice: WifeDialogueChoice, routeChanged: boolean) => void,
    onResume: () => void
  ): void {
    let routeChanged = false;
    let routeFeedback = '';
    const render = () => {
      const nearest = findReachableAdditionalStop(level, run);
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

          ${this.renderDriveStatus()}
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
                  : `<span class="wme-note">${NO_REACHABLE_CHARGER}</span>`
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
        routeFeedback = onApplyRouteAction('insert_stop', nearest ?? undefined);
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
    info: CollisionInfo,
    onResolve: (
      costEur: number,
      timeMin: number,
      stressDelta: number,
      decisionPts: number,
      punishCollision: boolean,
      summary: string
    ) => void
  ): void {
    const labelMap = {
      car: 'Kollision im Stadtverkehr',
      pedestrian: 'Kontakt / Beinahe-Unfall mit Fußgänger',
      cyclist: 'Kontakt am Radweg mit Radfahrer',
      obstacle: 'Baustellen-Pylone / Bordstein gestreift'
    };

    this.modalEl.classList.remove('hidden');

    if (!info.playerAtFault) {
      this.modalEl.innerHTML = `
        <div class="er-modal-card">
          <div class="er-modal-head">
            <span class="er-modal-icon">🛡️</span>
            <div>
              <div class="er-modal-kicker">Stadtverkehr · Keine Schuld</div>
              <h3>${labelMap[info.kind]}</h3>
            </div>
          </div>
          ${this.renderDriveStatus()}
          <p class="er-modal-body">${info.reason}</p>
          <div class="er-outcome-box">
            <strong>✅ Keine Strafe!</strong> Du warst ordnungsgemäß gestoppt bzw. hattest Vorfahrt – die gegnerische Versicherung übernimmt alles (0 € · 0 Strafpunkte).
          </div>
          <button type="button" class="er-primary-btn" id="col-nofault-ok">Weiterfahren →</button>
        </div>
      `;
      this.modalEl.querySelector('#col-nofault-ok')?.addEventListener('click', () => {
        SoundFX.click();
        this.close();
        onResolve(0, 1, 2, 4, false, `Unverschuldeter Kontakt (${info.reason}) – 0 € Schaden.`);
      });
      return;
    }

    const baseDamage = info.kind === 'obstacle' ? 0 : 45;
    this.modalEl.innerHTML = `
      <div class="er-modal-card">
        <div class="er-modal-head">
          <span class="er-modal-icon">💥</span>
          <div>
            <div class="er-modal-kicker">Stadtverkehr · Eigenverschulden</div>
            <h3>${labelMap[info.kind]}</h3>
          </div>
        </div>
        ${this.renderDriveStatus()}
        <p class="er-modal-body">${info.reason} Wähle deine Reaktion mit klarem Risiko/Nutzen-Verhältnis:</p>
        <div class="er-modal-choices" id="col-choices">
          <button type="button" class="er-choice-btn" id="col-polite">
            <strong>🤝 Ruhig aussteigen, entschuldigen &amp; sauber klären</strong>
            <span>Sicher · +10 Min Zeit · ${baseDamage} € Schaden · +5 Stress · +6 Entscheidungs-Punkte</span>
          </button>
          <button type="button" class="er-choice-btn" id="col-negotiate">
            <strong>📹 Mit E-Auto-Kamera ruhig auf Teilschuld verhandeln</strong>
            <span>50/50 Chance: 20 € (sonst 95 €) · +7 Min Zeit · +8 Stress · +4 Punkte</span>
          </button>
          <button type="button" class="er-choice-btn" id="col-cash">
            <strong>💶 Schnelle Bar-Einigung anbieten &amp; sofort weiter</strong>
            <span>Zeitsparend · nur +2 Min · 150 € Kosten · +4 Stress · 0 Punkte</span>
          </button>
          <button type="button" class="er-choice-btn" id="col-flee">
            <strong>💨 Hektisch abwimmeln &amp; einfach weiterfahren (Risiko!)</strong>
            <span>+1 Min, aber 70 % Risiko auf 240 € Anzeige (+15 Min Polizei, +22 Stress) · -10 Punkte</span>
          </button>
        </div>
        <div id="col-outcome" class="hidden"></div>
      </div>
    `;

    const finishWithOutcome = (
      cost: number,
      mins: number,
      stress: number,
      pts: number,
      summary: string
    ) => {
      const ch = this.modalEl.querySelector('#col-choices');
      const out = this.modalEl.querySelector('#col-outcome');
      if (ch) ch.classList.add('hidden');
      if (out) {
        out.classList.remove('hidden');
        out.innerHTML = `
          <div class="er-outcome-box">${summary}</div>
          <button type="button" class="er-primary-btn" id="col-done">Weiterfahren →</button>
        `;
        out.querySelector('#col-done')?.addEventListener('click', () => {
          SoundFX.click();
          this.close();
          onResolve(cost, mins, stress, pts, true, summary);
        });
      }
    };

    this.modalEl.querySelector('#col-polite')?.addEventListener('click', () => {
      SoundFX.click();
      finishWithOutcome(
        baseDamage,
        10,
        5,
        6,
        `${labelMap[info.kind]} ruhig & vorbildlich geklärt (${baseDamage} €, +10 Min).`
      );
    });

    this.modalEl.querySelector('#col-negotiate')?.addEventListener('click', () => {
      SoundFX.click();
      const won = Math.random() < 0.5;
      const cost = won ? 20 : 95;
      finishWithOutcome(
        cost,
        7,
        8,
        won ? 8 : 2,
        won
          ? 'Teilschuld anerkannt! Nur 20 € Bagatellbetrag (+7 Min).'
          : 'Gegner blieb hart – 95 € Regulierung nötig (+7 Min).'
      );
    });

    this.modalEl.querySelector('#col-cash')?.addEventListener('click', () => {
      SoundFX.click();
      finishWithOutcome(
        150,
        2,
        4,
        0,
        'Sofortige Bar-Einigung (150 €) – kaum Zeitverlust (+2 Min)!'
      );
    });

    this.modalEl.querySelector('#col-flee')?.addEventListener('click', () => {
      SoundFX.click();
      const caught = Math.random() < 0.7;
      if (caught) {
        finishWithOutcome(
          240,
          16,
          22,
          -10,
          '🚨 Kennzeichen notiert & Polizei gestoppt! +240 € Bußgeld, +16 Min, +22 Stress!'
        );
      } else {
        finishWithOutcome(
          0,
          1,
          12,
          -4,
          'Glück gehabt – der andere winkt ab und es bleibt bei +1 Min & +12 Stress.'
        );
      }
    });
  }

  public showPoliceViolationDialogue(
    kind: PoliceViolationKind,
    onResolve: (costEur: number, timeMin: number, stressDelta: number, decisionPts: number, summary: string) => void
  ): void {
    const isRed = kind === 'red_light';
    const title = isRed ? 'Rote Ampel überfahren!' : 'Zebrastreifen missachtet!';
    const desc = isRed
      ? 'Die Polizeistreife hat dein Rotlicht-Manöver gefilmt und winkt dich mit Blaulicht heraus!'
      : 'Du bist über einen Zebrastreifen gefahren, obwohl Fußgänger queren wollten – Polizei stoppt dich!';
    const stdFine = isRed ? 90 : 80;

    this.modalEl.classList.remove('hidden');
    this.modalEl.innerHTML = `
      <div class="er-modal-card">
        <div class="er-modal-head">
          <span class="er-modal-icon">🚓</span>
          <div>
            <div class="er-modal-kicker">Polizeikontrolle · Verkehrsregel</div>
            <h3>${title}</h3>
          </div>
        </div>
        ${this.renderDriveStatus()}
        <p class="er-modal-body">${desc}</p>
        <div class="er-modal-choices" id="pol-choices">
          <button type="button" class="er-choice-btn" id="pol-admit">
            <strong>📋 Fehler sofort einsehen &amp; Verwarnung akzeptieren</strong>
            <span>+8 Min · ${stdFine} € Bußgeld · +8 Stress · +4 Punkte</span>
          </button>
          <button type="button" class="er-choice-btn" id="pol-plead">
            <strong>🙏 Höflich um Nachsicht bitten (Ortsfremd / E-Navi-Ablenkung)</strong>
            <span>45 % Chance auf 35 € Verwarnung (sonst 110 €) · +10 Min · +10 Stress</span>
          </button>
          <button type="button" class="er-choice-btn" id="pol-argue">
            <strong>😤 Diskutieren („Die Ampel war doch noch Gelb!“)</strong>
            <span>75 % Risiko auf 165 € + +14 Min Kontrolle · +18 Stress · -8 Punkte</span>
          </button>
        </div>
        <div id="pol-outcome" class="hidden"></div>
      </div>
    `;

    const finish = (cost: number, mins: number, stress: number, pts: number, msg: string) => {
      const ch = this.modalEl.querySelector('#pol-choices');
      const out = this.modalEl.querySelector('#pol-outcome');
      if (ch) ch.classList.add('hidden');
      if (out) {
        out.classList.remove('hidden');
        out.innerHTML = `
          <div class="er-outcome-box">${msg}</div>
          <button type="button" class="er-primary-btn" id="pol-done">Weiterfahren →</button>
        `;
        out.querySelector('#pol-done')?.addEventListener('click', () => {
          SoundFX.click();
          this.close();
          onResolve(cost, mins, stress, pts, msg);
        });
      }
    };

    this.modalEl.querySelector('#pol-admit')?.addEventListener('click', () => {
      SoundFX.click();
      finish(stdFine, 8, 8, 4, `${title} Kooperativ geregelt: ${stdFine} € Bußgeld (+8 Min).`);
    });
    this.modalEl.querySelector('#pol-plead')?.addEventListener('click', () => {
      SoundFX.click();
      const mercy = Math.random() < 0.45;
      const cost = mercy ? 35 : 110;
      finish(
        cost,
        10,
        10,
        mercy ? 8 : 0,
        mercy
          ? 'Der Polizist drückt ein Auge zu: nur 35 € Verwarnungsgeld (+10 Min)!'
          : 'Leider kein Pardon – regulärer Bußgeldbescheid über 110 € (+10 Min).'
      );
    });
    this.modalEl.querySelector('#pol-argue')?.addEventListener('click', () => {
      SoundFX.click();
      const escalated = Math.random() < 0.75;
      finish(
        escalated ? 165 : 55,
        14,
        18,
        -8,
        escalated
          ? 'Das Video war eindeutig – volle Kontrolle & 165 € Bußgeld (+14 Min, +18 Stress)!'
          : 'Nach langer Diskussion bleibt es bei 55 € Verwarnung (+14 Min).'
      );
    });
  }

  public showChargingSession(
    station: ChargerStation,
    level: LevelConfig,
    run: RunState,
    targetSocPct: number,
    onComplete: (payload: ChargingCompletePayload) => void
  ): void {
    const vehicle = getVehicleById(run.plan.vehicleId);
    let currentSoc = run.socPct;
    let activeTarget = Math.min(100, Math.max(currentSoc, targetSocPct));
    const tariff = getBestPriceForStation(station, run.plan.subscriptionIds, vehicle);
    const ac = isAcCharger(station);
    const curve = (ac ? [0, 100] : Array.from({ length: 101 }, (_, soc) => soc))
      .map(soc => ({ soc, kw: getChargingPowerKw(vehicle, station, soc) }));
    const w = 260;
    const h = 76;
    const maxKw = Math.max(10, Math.ceil(Math.max(...curve.map(p => p.kw)) / 10) * 10);
    const chartX = (soc: number) => (soc / 100) * (w - 16) + 8;
    const chartY = (kw: number) => h - 10 - (kw / maxKw) * (h - 20);
    const curvePoints = curve.map(p => `${chartX(p.soc).toFixed(1)},${chartY(p.kw).toFixed(1)}`).join(' ');

    let addedKwh = 0;
    let chargeMinutes = CHARGE_SETUP_MINUTES;
    let chargingCostEur = 0;
    let activityEndMinute = 0;
    let pauseCostEur = 0;
    const sessionMinutes = () => Math.max(chargeMinutes, activityEndMinute);
    const activities: PauseEffects[] = [];
    const shownNeeds = { bladderNeed: run.bladderNeed, hungerNeed: run.hungerNeed, stress: run.stress };
    let finished = currentSoc >= activeTarget;
    let breakBusy = false;
    const usedBreaks = new Set<BreakActivityKind>();
    const takenBreakLabels: string[] = [];

    SoundFX.plugIn();

    // Build stable modal + top-right touchscreen shell so BreakPixelAnim canvas isn't destroyed on ticks!
    this.modalEl.classList.remove('hidden');
    this.modalEl.innerHTML = `
      <div class="er-charge-layout">
        <div id="vts-mount" class="er-vts-corner"></div>
        <div class="er-modal-card charge-card">
          <div id="charge-dynamic-top"></div>
          <div id="break-stage-box" class="break-stage-box hidden">
            <canvas id="break-anim-canvas" class="break-anim-canvas"></canvas>
            <div id="break-stage-caption" class="break-stage-caption"></div>
          </div>
          <div id="break-buttons-box" class="break-buttons-box"></div>
          <div id="charge-dynamic-actions" class="charge-btn-row"></div>
        </div>
      </div>
    `;

    const vtsMount = this.modalEl.querySelector('#vts-mount') as HTMLElement;
    const dynTop = this.modalEl.querySelector('#charge-dynamic-top') as HTMLElement;
    const breakStageBox = this.modalEl.querySelector('#break-stage-box') as HTMLElement;
    const breakCanvas = this.modalEl.querySelector('#break-anim-canvas') as HTMLCanvasElement;
    const breakCaption = this.modalEl.querySelector('#break-stage-caption') as HTMLElement;
    const breakButtonsBox = this.modalEl.querySelector('#break-buttons-box') as HTMLElement;
    const dynActions = this.modalEl.querySelector('#charge-dynamic-actions') as HTMLElement;

    const triggerBreak = (kind: BreakActivityKind) => {
      if (breakBusy || usedBreaks.has(kind)) return;
      usedBreaks.add(kind);
      breakBusy = true;
      SoundFX.click();

      const meta: Record<BreakActivityKind, PauseEffects & { label: string; minutes: number }> = {
        eat: { label: '🍔 Etwas gegessen', minutes: 20, stressDelta: -10, hungerDelta: -60 },
        toilet: { label: '🚻 Toilettenpause', minutes: 5, stressDelta: -6, resetBladder: true },
        dog: { label: '🐕 Mit Hund Gassi gegangen', minutes: 8, stressDelta: -14 },
        children: { label: '🛝 Kinder auf dem Spielplatz', minutes: 10, stressDelta: -16 },
        shopping: { label: '🛍️ Shoppen', minutes: 10, costEur: 50, stressDelta: -18 }
      };

      const { label, minutes, ...effects } = meta[kind];
      const before = { ...shownNeeds };
      activityEndMinute = sessionMinutes() + minutes;
      pauseCostEur += effects.costEur ?? 0;
      activities.push(effects);
      applyPauseNeeds(shownNeeds, effects);
      const caption = `${label} (${minutes} Min). Toilettendrang ${Math.round(before.bladderNeed)} → ${Math.round(shownNeeds.bladderNeed)} %, Hunger ${Math.round(before.hungerNeed)} → ${Math.round(shownNeeds.hungerNeed)} %, Stress ${Math.round(before.stress)} → ${Math.round(shownNeeds.stress)} %.`;
      takenBreakLabels.push(label);
      renderChargeNumbers();

      breakStageBox.classList.remove('hidden');
      breakCaption.textContent = caption;
      renderActionsAndBreaks();

      if (this.stopBreakAnim) this.stopBreakAnim();
      this.stopBreakAnim = playBreakPixelAnimation(breakCanvas, kind, 2800, () => {
        while (!finished && chargeMinutes < activityEndMinute) {
          chargeOneStep(activityEndMinute);
        }
        breakBusy = false;
        breakStageBox.classList.add('hidden');
        renderChargeNumbers();
        renderActionsAndBreaks();
      });
    };

    const renderActionsAndBreaks = () => {
      const pax = level.passengers;
      const mkBtn = (kind: BreakActivityKind, text: string, show: boolean) => {
        if (!show) return '';
        const used = usedBreaks.has(kind);
        return `
          <button type="button" class="er-mini-btn break-btn ${used ? 'used' : ''}" data-break="${kind}" ${breakBusy || used ? 'disabled' : ''}>
            ${used ? '✓ ' : ''}${text}
          </button>
        `;
      };

      breakButtonsBox.innerHTML = `
        <div class="break-box-title">
          ☕ Pausen-Aktivitäten während des Ladens ${breakBusy ? '<span class="break-lock-badge">🔒 Pause läuft – Laden nicht unterbrechbar</span>' : ''}
        </div>
        <div class="break-btn-grid">
          ${mkBtn('eat', '🍔 Etwas essen (20 Min)', true)}
          ${mkBtn('toilet', '🚻 Toilette (5 Min)', true)}
          ${mkBtn('dog', '🐕 Hund Gassi (8 Min)', pax.hasDog)}
          ${mkBtn('children', '🛝 Kinder Spielplatz (10 Min)', pax.childrenCount > 0)}
          ${mkBtn('shopping', '🛍️ Frau shoppen (10 Min · 50 €)', pax.hasWife)}
        </div>
      `;

      breakButtonsBox.querySelectorAll('.break-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const k = (btn as HTMLElement).dataset.break as BreakActivityKind | undefined;
          if (k) triggerBreak(k);
        });
      });

      dynActions.innerHTML = `
        ${
          activeTarget < 100
            ? `<button type="button" class="er-mini-btn" id="btn-charge-more" ${breakBusy ? 'disabled' : ''}>+10 % Ziel (${Math.round(Math.min(100, activeTarget + 10))}%)</button>`
            : ''
        }
        <button type="button" class="er-primary-btn" id="btn-unplug" ${breakBusy ? 'disabled' : ''}>
          ${
            breakBusy
              ? '⏳ Pause aktiv – Abstecken gesperrt…'
              : finished
                ? '🔌 Ladevorgang komplett – Weiterfahren!'
                : '🔌 Jetzt abstecken & weiterfahren'
          }
        </button>
      `;

      dynActions.querySelector('#btn-charge-more')?.addEventListener('click', () => {
        if (breakBusy) return;
        SoundFX.click();
        if (finished) chargeMinutes = sessionMinutes();
        activeTarget = Math.min(100, activeTarget + 10);
        finished = false;
        renderChargeNumbers();
        renderActionsAndBreaks();
        startTicker();
      });

      dynActions.querySelector('#btn-unplug')?.addEventListener('click', () => {
        if (breakBusy) return;
        SoundFX.click();
        this.close();
        onComplete({
          addedKwh,
          minutesSpent: sessionMinutes(),
          chargingCostEur: Number(chargingCostEur.toFixed(2)),
          newSoc: currentSoc,
          activities,
          takenBreaks: takenBreakLabels
        });
      });
    };

    const renderChargeNumbers = () => {
      const kwNow = getChargingPowerKw(vehicle, station, currentSoc);
      const pctProgress = Math.min(100, Math.round(currentSoc));
      const livePred = predictLiveTripSoc(level, run, {
        overrideSocPct: currentSoc,
        skipStopKey: stopKey(run.currentLegIndex, station.id)
      });
      const predClass =
        livePred.predictedArrivalNextSocPct <= 5
          ? 'danger'
          : livePred.predictedArrivalNextSocPct < 15
            ? 'warn'
            : 'ok';

      const dotX = chartX(currentSoc);
      const dotY = chartY(kwNow);

      vtsMount.innerHTML = renderVehicleTouchscreenHtml(level, run, currentSoc, station.id);

      const clockTotal = Math.round(level.departureTimeHour * 60 + run.elapsedMinutes + sessionMinutes());
      const clockH = String(Math.floor(clockTotal / 60) % 24).padStart(2, '0');
      const clockM = String(clockTotal % 60).padStart(2, '0');
      const weatherLabel =
        run.activeWeather === 'rain'
          ? '🌧️ Regen'
          : run.activeWeather === 'snow'
            ? '❄️ Schnee'
            : run.activeWeather === 'storm'
              ? '⛈️ Gewitter'
              : run.isNight
                ? '🌙 Nacht'
                : '☀️ Klar';
      const meter = (label: string, value: number, tone: string) =>
        `<div class="need-meter ${tone}"><span>${label}</span><strong>${Math.round(value)}%</strong><i style="width:${Math.max(0, Math.min(100, value))}%"></i></div>`;

      dynTop.innerHTML = `
        <div class="er-modal-head">
          <span class="er-modal-icon">⚡</span>
          <div>
            <div class="er-modal-kicker">${ac ? 'AC-Laden' : 'Schnellladen aktiv'} · ${station.network.toUpperCase()}</div>
            <h3>${station.name}</h3>
          </div>
          <div class="charge-when">
            <span class="charge-kw-pill">${Math.round(kwNow)} kW</span>
            <span class="charge-clock">${clockH}:${clockM} · ${weatherLabel}</span>
          </div>
        </div>
        <div class="need-meters">
          ${meter('🚻 Toilettendrang', shownNeeds.bladderNeed, 'bladder')}
          ${meter('🍽️ Hunger', shownNeeds.hungerNeed, 'hunger')}
          ${meter('😤 Stress', shownNeeds.stress, 'stress')}
        </div>

        <div class="charge-soc-bar-wrap">
          <div class="charge-soc-bar" style="width:${pctProgress}%"></div>
          <span class="charge-soc-label">${pctProgress}% SoC (Ziel ${Math.round(activeTarget)}%)</span>
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
            <polyline fill="none" stroke="#2563eb" stroke-width="2.5" points="${curvePoints}" />
            <line x1="${dotX.toFixed(1)}" y1="6" x2="${dotX.toFixed(1)}" y2="${h - 10}" stroke="#22c55e" stroke-dasharray="3 2" />
            <circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="5" fill="#22c55e" stroke="#ffffff" stroke-width="1.5" />
          </svg>
        </div>

        <div class="charge-stats-grid">
          <div><span>Geladen</span><strong>+${addedKwh.toFixed(1)} kWh</strong></div>
          <div><span>Zeit vor Ort</span><strong>${Math.round(sessionMinutes())} Min</strong></div>
          <div>
            <span>Tarif</span>
            <strong>${tariff.pricePerKwh.toFixed(2)} €/kWh</strong>
            ${tariff.hasSubscriptionDiscount ? `<small style="opacity:0.7;text-decoration:line-through">${tariff.pricePerKwhWithoutSub.toFixed(2)} €</small>` : ''}
          </div>
          <div><span>Laden + Shop</span><strong>${(chargingCostEur + pauseCostEur).toFixed(2)} €</strong></div>
        </div>

        ${
          tariff.hasMcDonaldsBonus
            ? `<div class="mcd-bonus-banner">🍔 EWE Go @ McDonald’s Partner-Standort: Komfort-Bonus (-12 Stress)!</div>`
            : `<div class="charge-tarif-note">Abgerechnet über: <b>${tariff.usedSubscriptionName}</b></div>`
        }
      `;
    };

    const chargeOneStep = (untilMinute = Infinity) => {
      let nextSoc = Math.min(activeTarget, currentSoc + 1);
      let step = measureChargeStep(vehicle, station, currentSoc, nextSoc);
      const remainingMinutes = untilMinute - chargeMinutes;
      if (step.minutes > remainingMinutes) {
        // Ein Pausenende kann mitten in einen animierten Prozent-Schritt fallen.
        let low = currentSoc;
        let high = nextSoc;
        for (let i = 0; i < 24; i++) {
          const mid = (low + high) / 2;
          if (measureChargeStep(vehicle, station, currentSoc, mid).minutes > remainingMinutes) high = mid;
          else low = mid;
        }
        nextSoc = low;
        step = measureChargeStep(vehicle, station, currentSoc, nextSoc);
        chargeMinutes = untilMinute;
      } else {
        chargeMinutes += step.minutes;
      }
      currentSoc = nextSoc;
      addedKwh += step.billedKwh;
      chargingCostEur += step.billedKwh * tariff.pricePerKwh;
      if (currentSoc >= activeTarget) {
        finished = true;
        SoundFX.chargeDone();
        if (this.chargeTimer !== null) window.clearInterval(this.chargeTimer);
        this.chargeTimer = null;
      }
    };

    const startTicker = () => {
      if (finished || this.chargeTimer !== null) return;
      this.chargeTimer = window.setInterval(() => {
        if (breakBusy && chargeMinutes >= activityEndMinute) return;
        chargeOneStep(breakBusy ? activityEndMinute : Infinity);
        renderChargeNumbers();
        if (finished) renderActionsAndBreaks();
      }, 360);
    };

    renderChargeNumbers();
    renderActionsAndBreaks();
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
        ${this.renderDriveStatus()}
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
