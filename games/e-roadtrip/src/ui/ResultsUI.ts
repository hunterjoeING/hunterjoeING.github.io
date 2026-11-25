import { CampaignSave, EvaluationResult, LevelConfig, RunState } from '../types';
import { VEHICLES, getVehicleById } from '../data/vehicles';
import { LEVELS } from '../data/levels';
import { getResaleValue } from '../sim/SaveState';
import { SoundFX } from '../phaser/SoundFX';

declare global {
  interface Window {
    ArcadeScores?: {
      submit: (gameId: string, score: number, label: string) => void;
    };
  }
}

export interface ResultsCallbacks {
  onKeepCarAndReplay: (nextLevelId: string) => void;
  onSellAndBuyCar: (newCarId: string, nextLevelId: string) => void;
}

export class ResultsUI {
  private root: HTMLElement;
  private cb: ResultsCallbacks;

  constructor(root: HTMLElement, cb: ResultsCallbacks) {
    this.root = root;
    this.cb = cb;
  }

  public hide(): void {
    this.root.classList.add('hidden');
    this.root.innerHTML = '';
  }

  public show(
    level: LevelConfig,
    run: RunState,
    result: EvaluationResult,
    save: CampaignSave
  ): void {
    // Submit to HunterJoe Arcade Global Highscores!
    try {
      if (window.ArcadeScores && typeof window.ArcadeScores.submit === 'function') {
        const hrs = Math.floor(result.totalMinutes / 60);
        const mins = result.totalMinutes % 60;
        window.ArcadeScores.submit(
          'eroadtrip',
          result.totalScore,
          `${result.totalScore} Pkt · ${hrs}h${String(mins).padStart(2, '0')}m`
        );
      }
    } catch (_) {}

    const currentCar = getVehicleById(run.plan.vehicleId);
    const resaleEur = getResaleValue(currentCar.id);
    const totalAfterResale = save.cashEur + resaleEur;

    const hrs = Math.floor(result.totalMinutes / 60);
    const mins = result.totalMinutes % 60;
    const tHrs = Math.floor(result.targetMinutes / 60);
    const tMins = result.targetMinutes % 60;

    const upgradeCandidates = VEHICLES.filter(
      v => v.id !== currentCar.id && v.unlockLevel <= save.unlockedLevelOrder
    );

    const renderBar = (label: string, score: number, weight: number) => `
      <div class="res-bar-row">
        <div class="res-bar-head">
          <span>${label} (${Math.round(weight * 100)}%)</span>
          <strong>${score} / 100</strong>
        </div>
        <div class="res-bar-track"><div class="res-bar-fill" style="width:${score}%"></div></div>
      </div>
    `;

    this.root.classList.remove('hidden');
    this.root.innerHTML = `
      <div class="results-card">
        <div class="results-hero">
          <div class="res-score-ring">
            <div class="res-score-num">${result.totalScore}</div>
            <div class="res-score-sub">/ 1.000 Pkt</div>
          </div>
          <div>
            <div class="res-kicker">${level.title} abgeschlossen!</div>
            <h2>${result.gradeLabel}</h2>
            <p class="res-summary-line">
              ⏱️ Gesamtzeit: <strong>${hrs}h ${String(mins).padStart(2, '0')}m</strong> (Ziel ${tHrs}h ${String(tMins).padStart(2, '0')}m) ·
              💶 Kosten: <strong>${result.totalCostEur.toFixed(2)} €</strong> ·
              ⚡ Verbrauch: <strong>${result.avgConsumptionKwh100} kWh/100km</strong> ·
              😰 Stress-Peak: <strong>${result.peakStress}%</strong>
            </p>
            <p class="res-summary-line">
              Laden ${run.chargingCostEur.toFixed(2)} € · Abos ${run.subscriptionCostEur.toFixed(2)} € ·
              Maut ${run.tollsEur.toFixed(2)} € · Pausen ${run.pauseCostEur.toFixed(2)} € · Sonstige Kosten ${run.incidentalCostEur.toFixed(2)} €
            </p>
            ${
              run.overnightNote
                ? `<p class="res-overnight">🏨 Übernachtung: ${run.overnightNote}${
                    run.lodgingCostEur > 0 ? ` · Unterkunft ${run.lodgingCostEur.toFixed(2)} €` : ' · Unterkunft 0,00 €'
                  }</p>`
                : ''
            }
            <div class="res-prize-badge">
              🏆 Prämie erhalten: <strong>+${result.prizeMoneyEur.toLocaleString('de-DE')} €</strong> · Neues Kapital: <strong>${save.cashEur.toLocaleString('de-DE')} €</strong>
            </div>
          </div>
        </div>

        <div class="res-columns">
          <div class="res-panel">
            <h3>📊 Detail-Auswertung</h3>
            ${renderBar('Zeit-Performance', result.subScores.time, result.weights.time)}
            ${renderBar('Gesamtkosten', result.subScores.cost, result.weights.cost)}
            ${renderBar('Beifahrer-Stress & Peaks', result.subScores.stress, result.weights.stress)}
            ${renderBar('Effizienz & Ladekurve', result.subScores.efficiency, result.weights.efficiency)}
            ${renderBar('Dynamische Entscheidungen & Parken', result.subScores.decisions, result.weights.decisions)}
          </div>

          <div class="res-panel">
            <h3>📝 Fahrtbuch &amp; Ereignisse</h3>
            <div class="res-log-list">
              ${
                run.incidentLog.length > 0
                  ? run.incidentLog
                      .map(
                        item => `
                    <div class="res-log-item ${item.impact}">
                      <span class="log-t">${item.timeStr}</span>
                      <div><strong>${item.title}</strong><div>${item.detail}</div></div>
                    </div>`
                      )
                      .join('')
                  : '<div class="res-log-item positive">✅ Reibungslose Fahrt ohne Zwischenfälle!</div>'
              }
            </div>
          </div>
        </div>

        <div class="res-garage-box">
          <h3>🚘 Fahrzeug-Entscheidung &amp; Kampagne</h3>
          <p>
            Dein aktueller Wagen (<strong>${currentCar.name}</strong>) hat einen Restwert von <strong>${resaleEur.toLocaleString('de-DE')} €</strong>
            (${Math.round(currentCar.depreciationRate * 100)} % Wertverlust). Zusammen mit deinem Guthaben stehen dir bei Verkauf
            <strong>${totalAfterResale.toLocaleString('de-DE')} €</strong> zur Verfügung.
          </p>
          <div class="res-car-actions">
            <button type="button" class="er-primary-btn" id="btn-keep-car">
              🔑 ${currentCar.name} behalten &amp; nächste Planung starten
            </button>
            ${upgradeCandidates
              .map(u => {
                const canBuy = totalAfterResale >= u.priceEur;
                return `
                  <button type="button" class="er-upgrade-btn" data-buy-car="${u.id}" ${canBuy ? '' : 'disabled'}>
                    <strong>⬆️ Eintauschen gegen ${u.name}</strong>
                    <span>${u.priceEur.toLocaleString('de-DE')} € (${u.batteryKwh} kWh · ${Math.max(...u.chargingCurve.map(c => c.kw))} kW) ${canBuy ? '· Leistbar!' : '· Zu teuer'}</span>
                  </button>
                `;
              })
              .join('')}
          </div>
        </div>

        <div class="res-next-levels">
          <h4>🗺️ Freigeschaltete &amp; kuratierte Kampagnen-Stufen</h4>
          <div class="next-lvl-grid">
            ${LEVELS.map(l => {
              const unlocked = l.order <= save.unlockedLevelOrder;
              const status = !unlocked
                ? '🔒 Erst Level ' + (l.order - 1) + ' meistern'
                : l.playable
                  ? '✅ Voll spielbar (Planung öffnen)'
                  : '🔓 Struktur freigeschaltet (Vorschau)';
              return `
                <button type="button" class="nl-chip ${unlocked ? 'unlocked clickable' : 'locked'}" data-nl-id="${l.id}" ${unlocked ? '' : 'disabled'}>
                  <strong>${l.title}</strong>
                  <span>${status}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
    this.root.scrollTop = 0;

    const nextPlayable =
      LEVELS.find(l => l.order > level.order && l.playable && l.order <= save.unlockedLevelOrder) ||
      level;

    this.root.querySelector('#btn-keep-car')?.addEventListener('click', () => {
      SoundFX.click();
      this.hide();
      this.cb.onKeepCarAndReplay(nextPlayable.id);
    });

    this.root.querySelectorAll('[data-buy-car]').forEach(btn => {
      btn.addEventListener('click', () => {
        const carId = (btn as HTMLElement).dataset.buyCar;
        if (!carId) return;
        SoundFX.click();
        this.hide();
        this.cb.onSellAndBuyCar(carId, nextPlayable.id);
      });
    });

    this.root.querySelectorAll('[data-nl-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lid = (btn as HTMLElement).dataset.nlId;
        if (!lid) return;
        SoundFX.click();
        this.hide();
        this.cb.onKeepCarAndReplay(lid);
      });
    });
  }
}
