import { LevelConfig, TripPlan, VehicleSpec } from '../types';
import { VEHICLES, getVehicleById } from '../data/vehicles';
import { SUBSCRIPTIONS } from '../data/subscriptions';
import { CHARGERS, getEdgeById } from '../data/europeMap';
import { LEVELS } from '../data/levels';
import { evaluateTripPlan, PlanForecast } from '../sim/RoutePlanner';
import { getBestPriceForStation } from '../sim/EnergyModel';
import { CampaignSave } from '../types';
import { SoundFX } from '../phaser/SoundFX';

export interface PlanningCallbacks {
  onPlanChanged: () => void;
  onStartTrip: () => void;
  onSelectLevel: (levelId: string) => void;
  onZoomRoute: () => void;
  onZoomEurope: () => void;
}

function renderChargingCurveSvg(v: VehicleSpec): string {
  const w = 150;
  const h = 44;
  const maxKw = 330;
  const pts = v.chargingCurve
    .map(p => {
      const x = (p.soc / 100) * (w - 8) + 4;
      const y = h - 5 - (p.kw / maxKw) * (h - 10);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const peak = Math.max(...v.chargingCurve.map(c => c.kw));
  return `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" class="curve-svg" aria-label="Ladekurve ${peak} kW">
      <polyline fill="none" stroke="rgba(56,189,248,0.28)" stroke-width="1" points="4,${h - 5} ${w - 4},${h - 5}" />
      <polyline fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" points="${pts}" />
      <text x="${w - 4}" y="11" text-anchor="end" font-size="9" fill="currentColor" opacity="0.8">Peak ${peak} kW</text>
    </svg>
  `;
}

export class PlanningUI {
  private root: HTMLElement;
  private activeTab: 'car' | 'subs' | 'route' = 'car';
  private cb: PlanningCallbacks;

  constructor(root: HTMLElement, cb: PlanningCallbacks) {
    this.root = root;
    this.cb = cb;
  }

  render(level: LevelConfig, plan: TripPlan, save: CampaignSave): void {
    const forecast = evaluateTripPlan(level, plan);
    const selectedVehicle = getVehicleById(plan.vehicleId);
    const budgetLeft = save.cashEur - (save.ownedVehicleId === selectedVehicle.id ? 0 : selectedVehicle.priceEur);

    this.root.innerHTML = `
      <div class="plan-header-card">
        <div class="plan-level-row">
          <select id="er-level-select" class="er-select" aria-label="Level auswählen">
            ${LEVELS.map(l => {
              const lockTag = l.playable ? '' : ' 🔒 (Kuratiert · Vorschau)';
              return `<option value="${l.id}" ${l.id === level.id ? 'selected' : ''}>${l.title}${lockTag}</option>`;
            }).join('')}
          </select>
          <div class="er-budget-pill" title="Verfügbares Kapital nach Fahrzeugwahl">
            💶 Budget: <strong>${save.cashEur.toLocaleString('de-DE')} €</strong>
          </div>
        </div>
        <p class="plan-briefing">${level.briefingText}</p>
        <div class="plan-rules-chips">
          ${level.specialRulesSummary.map(r => `<span class="rule-chip">${r}</span>`).join('')}
        </div>
        <div class="map-zoom-bar">
          <button type="button" class="er-mini-btn" id="btn-zoom-route">🎯 Route zentrieren</button>
          <button type="button" class="er-mini-btn" id="btn-zoom-europe">🌍 Ganz Europa</button>
          <span class="map-hint">Klicke ⚡-Pins auf der Karte zum Hinzufügen/Entfernen</span>
        </div>
      </div>

      ${this.renderForecastBanner(level, forecast, budgetLeft)}

      <div class="plan-tabs" role="tablist">
        <button type="button" class="plan-tab ${this.activeTab === 'car' ? 'active' : ''}" data-ptab="car">🚗 1. Fahrzeug</button>
        <button type="button" class="plan-tab ${this.activeTab === 'subs' ? 'active' : ''}" data-ptab="subs">💳 2. Lade-Abos</button>
        <button type="button" class="plan-tab ${this.activeTab === 'route' ? 'active' : ''}" data-ptab="route">🗺️ 3. Etappen &amp; Stopps</button>
      </div>

      <div class="plan-tab-body">
        ${this.activeTab === 'car' ? this.renderVehiclesTab(level, plan, save) : ''}
        ${this.activeTab === 'subs' ? this.renderSubsTab(plan, selectedVehicle) : ''}
        ${this.activeTab === 'route' ? this.renderRouteTab(level, plan, forecast) : ''}
      </div>

      <div class="plan-footer-cta">
        ${
          level.playable
            ? `<button type="button" id="btn-start-trip" class="er-primary-btn ${forecast.valid ? '' : 'warn'}" ${budgetLeft < 0 ? 'disabled' : ''}>
                ${budgetLeft < 0 ? '❌ Budget reicht nicht für dieses Fahrzeug' : forecast.valid ? '🚀 Roadtrip am Aachener Dom starten!' : '⚠️ Trotz Reichweiten-Warnung starten'}
               </button>`
            : `<div class="er-locked-notice">Dieses kuratierte Szenario ist bereits datengetrieben vorbereitet (Gewichte, Regeln, Events). Level 1 ist sofort komplett spielbar!</div>`
        }
      </div>
    `;

    this.bindEvents(level, plan, save);
  }

  private renderForecastBanner(level: LevelConfig, f: PlanForecast, budgetLeft: number): string {
    const hrs = Math.floor(f.totalMinutes / 60);
    const mins = f.totalMinutes % 60;
    return `
      <div class="forecast-strip">
        <div class="fc-metric"><span>Distanz</span><strong>${f.totalDistanceKm} km</strong></div>
        <div class="fc-metric"><span>Dauer (Ziel ${Math.floor(level.targetArrivalMinutes / 60)}h${String(level.targetArrivalMinutes % 60).padStart(2, '0')})</span><strong>${hrs}h ${String(mins).padStart(2, '0')}m</strong></div>
        <div class="fc-metric"><span>Strom + Abos</span><strong>${f.estimatedTotalCostEur.toFixed(2)} €</strong></div>
        <div class="fc-metric ${f.minSocEncountered < 5 ? 'danger' : ''}"><span>Min. SoC</span><strong>${f.minSocEncountered}%</strong></div>
        <div class="fc-metric"><span>Restbudget</span><strong>${budgetLeft.toLocaleString('de-DE')} €</strong></div>
      </div>
      ${
        f.warnings.length > 0
          ? `<div class="forecast-warnings">${f.warnings.map(w => `<div>⚠️ ${w}</div>`).join('')}</div>`
          : `<div class="forecast-ok">✅ Planung stabil · Alle Ladepunkte erreichbar (${f.avgConsumptionKwh100} kWh/100km Schnitt)</div>`
      }
    `;
  }

  private renderVehiclesTab(level: LevelConfig, plan: TripPlan, save: CampaignSave): string {
    return `
      <div class="vehicle-grid">
        ${VEHICLES.map(v => {
          const isOwned = save.ownedVehicleId === v.id;
          const isSelected = plan.vehicleId === v.id;
          const unlocked = v.unlockLevel <= save.unlockedLevelOrder;
          const affordable = isOwned || save.cashEur >= v.priceEur;
          const disabled = !unlocked || !affordable;
          const statusLabel = !unlocked
            ? `Ab Level ${v.unlockLevel}`
            : isOwned
              ? 'Im Besitz'
              : `${v.priceEur.toLocaleString('de-DE')} €`;
          return `
            <button type="button" class="vehicle-card ${isSelected ? 'selected' : ''} ${disabled ? 'locked' : ''}" data-car-id="${v.id}" ${!unlocked ? 'disabled' : ''}>
              <div class="vc-top">
                <div>
                  <div class="vc-name">${v.name}</div>
                  <div class="vc-sub">${v.batteryKwh} kWh ${v.chemistry} · max ${v.maxSpeedKmh} km/h · Komfort ${v.comfortRating}/10</div>
                </div>
                <span class="vc-price ${!affordable && unlocked ? 'over' : ''}">${statusLabel}</span>
              </div>
              <div class="vc-mid">
                <div class="vc-stats">
                  <span>⚡ ${v.baseConsumption100} kWh/100</span>
                  <span>🪝 ${v.towingCapacityKg > 0 ? v.towingCapacityKg + ' kg' : 'Kein Haken'}</span>
                  ${v.isTesla ? '<span class="tesla-tag">Supercharger inkl.</span>' : ''}
                </div>
                ${renderChargingCurveSvg(v)}
              </div>
              <div class="vc-tagline">${v.tagline}</div>
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  private renderSubsTab(plan: TripPlan, car: VehicleSpec): string {
    return `
      <div class="subs-list">
        ${SUBSCRIPTIONS.map(sub => {
          const isTeslaAuto = sub.id === 'tesla_suc' && !!car.isTesla;
          const checked = isTeslaAuto || plan.subscriptionIds.includes(sub.id);
          return `
            <label class="sub-card ${checked ? 'active' : ''}">
              <input type="checkbox" class="sub-toggle" data-sub-id="${sub.id}" ${checked ? 'checked' : ''} ${isTeslaAuto || sub.id === 'adhoc' ? 'disabled' : ''} />
              <div class="sub-info">
                <div class="sub-top">
                  <strong>${sub.name}</strong>
                  <span class="sub-fee">${isTeslaAuto ? '0,00 € (Tesla inkl.)' : `${sub.monthlyFeeEur.toFixed(2)} €/Mt · Trip-Anteil ${sub.tripShareFeeEur.toFixed(2)} €`}</span>
                </div>
                <div class="sub-prices">Eigenes Netz: <b>${sub.pricePerKwhOwn.toFixed(2)} €/kWh</b> · Roaming: ${sub.pricePerKwhRoaming.toFixed(2)} €/kWh</div>
                <div class="sub-desc">${sub.bestFor}</div>
              </div>
            </label>
          `;
        }).join('')}
      </div>
    `;
  }

  private renderRouteTab(level: LevelConfig, plan: TripPlan, forecast: PlanForecast): string {
    const vehicle = getVehicleById(plan.vehicleId);
    const activeEdgeIds = new Set(level.routeLegs.map(l => l.edgeId));
    const availableChargers = CHARGERS.filter(c => activeEdgeIds.has(c.edgeId));

    return `
      <div class="route-legs-list">
        ${forecast.legForecasts.map(lf => {
          const speedVal = lf.targetSpeedKmh;
          const riskBadge =
            lf.policeRisk > 0.45
              ? '<span class="risk-pill high">📸 Blitzer-Risiko!</span>'
              : lf.policeRisk > 0.25
                ? '<span class="risk-pill med">⚠️ Erhöhtes Risiko</span>'
                : '<span class="risk-pill low">🟢 Sicher</span>';
          const edge = getEdgeById(level.routeLegs[lf.legIndex].edgeId);
          return `
            <div class="leg-card">
              <div class="leg-top">
                <div>
                  <strong>Etappe ${lf.legIndex + 1}: ${lf.label}</strong>
                  <span class="leg-meta">${lf.highwayName} · ${lf.distanceKm} km · ⛰️ +${edge.elevationGainM}/-${edge.elevationLossM}m · ${lf.weather}</span>
                </div>
                <div class="leg-soc ${lf.endSocPct < 10 ? 'danger' : ''}">
                  ${lf.startSocPct}% → <strong>${lf.endSocPct}%</strong>
                </div>
              </div>
              <div class="leg-controls">
                <label>Zieltempo: <strong>${speedVal} km/h</strong> (${lf.consumptionKwh100} kWh/100km)</label>
                <input type="range" class="leg-speed-slider" data-leg="${lf.legIndex}" min="95" max="${vehicle.maxSpeedKmh}" step="5" value="${speedVal}" />
                ${riskBadge}
              </div>
              ${
                lf.stopSummaries.length > 0
                  ? `<div class="leg-stops">
                      ${lf.stopSummaries
                        .map(
                          ss => `
                          <div class="planned-stop-pill">
                            <span>⚡ ${ss.station.name} (${ss.arriveSoc}% → ${ss.departSoc}%, ~${ss.minutes} Min, ${ss.costEur.toFixed(2)} €)</span>
                            <button type="button" class="stop-rm-btn" data-rm-stop="${ss.station.id}" data-rm-leg="${lf.legIndex}" title="Stopp entfernen">✕</button>
                          </div>`
                        )
                        .join('')}
                    </div>`
                  : ''
              }
            </div>
          `;
        }).join('')}
      </div>

      <div class="charger-directory">
        <h4>⚡ Verfügbare Ladeparks auf der Strecke (zum Hinzufügen klicken)</h4>
        <div class="charger-cards">
          ${availableChargers.map(st => {
            const tariff = getBestPriceForStation(st, plan.subscriptionIds, vehicle);
            const activeStops = plan.plannedStops.filter(s => s.chargerId === st.id);
            return `
              <div class="chg-card ${activeStops.length > 0 ? 'selected' : ''}">
                <div class="chg-top">
                  <strong>${st.name}</strong>
                  <span class="chg-kw">${st.maxKw} kW · ${st.stalls} Stalls</span>
                </div>
                <div class="chg-meta">
                  ${st.cityHint} · <b>${tariff.pricePerKwh.toFixed(2)} €/kWh</b> (${tariff.usedSubscriptionName})
                  · Auslastung ${Math.round(st.occupancyRisk * 100)}% · Defekt ${Math.round(st.defectRisk * 100)}%
                  ${st.hasMcDonalds ? '· 🍔 McDonald’s' : ''}
                  ${st.trailerFriendly ? '· 🚐 Durchfahrt' : ''}
                </div>
                <div class="chg-actions">
                  <button type="button" class="er-mini-btn add-stop-btn" data-chg-id="${st.id}" data-dir="out">+ Hinweg einplanen</button>
                  <button type="button" class="er-mini-btn add-stop-btn" data-chg-id="${st.id}" data-dir="ret">+ Rückweg einplanen</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  private bindEvents(level: LevelConfig, plan: TripPlan, save: CampaignSave): void {
    this.root.querySelector('#er-level-select')?.addEventListener('change', e => {
      SoundFX.click();
      this.cb.onSelectLevel((e.target as HTMLSelectElement).value);
    });

    this.root.querySelector('#btn-zoom-route')?.addEventListener('click', () => {
      SoundFX.click();
      this.cb.onZoomRoute();
    });
    this.root.querySelector('#btn-zoom-europe')?.addEventListener('click', () => {
      SoundFX.click();
      this.cb.onZoomEurope();
    });

    this.root.querySelectorAll('.plan-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        SoundFX.click();
        this.activeTab = (btn as HTMLElement).dataset.ptab as 'car' | 'subs' | 'route';
        this.render(level, plan, save);
      });
    });

    this.root.querySelectorAll('.vehicle-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = (card as HTMLElement).dataset.carId;
        if (!id) return;
        const v = getVehicleById(id);
        if (v.unlockLevel > save.unlockedLevelOrder) return;
        SoundFX.click();
        plan.vehicleId = id;
        if (v.isTesla && !plan.subscriptionIds.includes('tesla_suc')) {
          plan.subscriptionIds.push('tesla_suc');
        }
        this.cb.onPlanChanged();
      });
    });

    this.root.querySelectorAll('.sub-toggle').forEach(cbEl => {
      cbEl.addEventListener('change', () => {
        const id = (cbEl as HTMLElement).dataset.subId;
        if (!id) return;
        SoundFX.click();
        const checked = (cbEl as HTMLInputElement).checked;
        if (checked && !plan.subscriptionIds.includes(id)) {
          plan.subscriptionIds.push(id);
        } else if (!checked) {
          plan.subscriptionIds = plan.subscriptionIds.filter(s => s !== id);
        }
        this.cb.onPlanChanged();
      });
    });

    this.root.querySelectorAll('.leg-speed-slider').forEach(slider => {
      slider.addEventListener('input', () => {
        const legIndex = Number((slider as HTMLElement).dataset.leg);
        const val = Number((slider as HTMLInputElement).value);
        const existing = plan.legPlans.find(l => l.legIndex === legIndex);
        if (existing) existing.targetSpeedKmh = val;
        else plan.legPlans.push({ legIndex, targetSpeedKmh: val });
        this.cb.onPlanChanged();
      });
    });

    this.root.querySelectorAll('.stop-rm-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chgId = (btn as HTMLElement).dataset.rmStop;
        const legIdx = Number((btn as HTMLElement).dataset.rmLeg);
        SoundFX.click();
        plan.plannedStops = plan.plannedStops.filter(
          s => !(s.chargerId === chgId && s.legIndex === legIdx)
        );
        this.cb.onPlanChanged();
      });
    });

    this.root.querySelectorAll('.add-stop-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chgId = (btn as HTMLElement).dataset.chgId;
        const dir = (btn as HTMLElement).dataset.dir;
        if (!chgId) return;
        const st = CHARGERS.find(c => c.id === chgId);
        if (!st) return;
        const targetLeg = level.routeLegs.findIndex(
          l => l.edgeId === st.edgeId && (dir === 'ret' ? !!l.reverse : !l.reverse)
        );
        if (targetLeg < 0) return;
        SoundFX.click();
        const exists = plan.plannedStops.some(
          s => s.chargerId === chgId && s.legIndex === targetLeg
        );
        if (!exists) {
          plan.plannedStops.push({ chargerId: chgId, legIndex: targetLeg, targetSocPct: 80 });
        }
        this.cb.onPlanChanged();
      });
    });

    this.root.querySelector('#btn-start-trip')?.addEventListener('click', () => {
      SoundFX.click();
      this.cb.onStartTrip();
    });
  }
}
