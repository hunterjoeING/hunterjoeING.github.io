import {
  CampaignSave,
  ChargerNetwork,
  LevelConfig,
  ProviderFilterMap,
  RouteOption,
  TripPlan,
  VehicleSpec
} from '../types';
import { VEHICLES, getVehicleById } from '../data/vehicles';
import { SUBSCRIPTIONS } from '../data/subscriptions';
import { CHARGERS, getEdgeById } from '../data/europeMap';
import { LEVELS } from '../data/levels';
import {
  evaluateTripPlan,
  getActiveRouteLegs,
  getActiveRouteOption,
  PlanForecast
} from '../sim/RoutePlanner';
import { getBestPriceForStation } from '../sim/EnergyModel';
import { isProviderSubscribed } from '../phaser/MapLayout';
import { SoundFX } from '../phaser/SoundFX';

export interface PlanningCallbacks {
  onPlanChanged: () => void;
  onSelectRoute: (routeId: string) => void;
  onSelectLeg: (legIndex: number) => void;
  onToggleProviderFilter: (network: ChargerNetwork) => void;
  onToggleDimUnsubscribed: () => void;
  onResetProviderFilter: () => void;
  onStartTrip: () => void;
  onSelectLevel: (levelId: string) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomRoute: () => void;
  onZoomEurope: () => void;
}

const NET_LABEL: Record<string, string> = {
  tesla: 'Tesla SuC',
  enbw: 'EnBW',
  ewego: 'EWE Go',
  electra: 'Electra+',
  ionity: 'IONITY',
  ac_village: 'AC Dorf'
};

const NET_HEX: Record<ChargerNetwork, string> = {
  tesla: '#ef4444',
  enbw: '#f97316',
  ewego: '#22c55e',
  electra: '#a855f7',
  ionity: '#ec4899',
  ac_village: '#14b8a6'
};

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

function summarizeRouteStats(opt: RouteOption): {
  distKm: number;
  elevGainM: number;
  chargerCount: number;
  networksLabel: string;
} {
  let distKm = 0;
  let elevGainM = 0;
  const edgeIds = new Set<string>();
  opt.legs.forEach(l => {
    const e = getEdgeById(l.edgeId);
    distKm += e.distanceKm;
    elevGainM += l.reverse ? e.elevationLossM : e.elevationGainM;
    edgeIds.add(l.edgeId);
  });
  const stations = CHARGERS.filter(c => edgeIds.has(c.edgeId));
  const nets = Array.from(new Set(stations.map(s => NET_LABEL[s.network] || s.network)));
  return {
    distKm: Math.round(distKm),
    elevGainM: Math.round(elevGainM),
    chargerCount: stations.length,
    networksLabel: nets.length > 0 ? nets.join(', ') : 'Keine DC-Parks'
  };
}

export class PlanningUI {
  private root: HTMLElement;
  private filterBarEl: HTMLElement | null;
  private activeTab: 'car' | 'subs' | 'route' = 'car';
  private cb: PlanningCallbacks;

  constructor(root: HTMLElement, cb: PlanningCallbacks, filterBarEl?: HTMLElement | null) {
    this.root = root;
    this.cb = cb;
    this.filterBarEl = filterBarEl || document.getElementById('er-map-filter-bar');
  }

  render(
    level: LevelConfig,
    plan: TripPlan,
    save: CampaignSave,
    selectedLegIndex = 0,
    providerFilter?: ProviderFilterMap,
    dimUnsubscribed = true
  ): void {
    const forecast = evaluateTripPlan(level, plan);
    const selectedVehicle = getVehicleById(plan.vehicleId);
    const activeRoute = getActiveRouteOption(level, plan);
    const budgetLeft = save.cashEur - (save.ownedVehicleId === selectedVehicle.id ? 0 : selectedVehicle.priceEur);
    const clampedLegIdx = Math.max(0, Math.min(forecast.legForecasts.length - 1, selectedLegIndex));

    if (this.filterBarEl && providerFilter) {
      this.renderMapFilterBar(plan, selectedVehicle, providerFilter, dimUnsubscribed);
    }

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
          <button type="button" class="er-mini-btn" id="btn-zoom-in" title="Hineinzoomen">➕ Zoom+</button>
          <button type="button" class="er-mini-btn" id="btn-zoom-out" title="Herauszoomen">➖ Zoom-</button>
          <button type="button" class="er-mini-btn" id="btn-zoom-route">🎯 Route</button>
          <button type="button" class="er-mini-btn" id="btn-zoom-europe">🌍 Europa</button>
          <span class="map-hint">Zoomen für Details · Etappe wählen für Reichweiten-Overlay</span>
        </div>
      </div>

      ${this.renderForecastBanner(level, forecast, budgetLeft)}
      ${this.renderRouteComparisonBar(level, activeRoute)}

      <div class="stage-quick-bar" aria-label="Aktive Etappe wählen">
        <span class="sqb-label">📍 Etappe:</span>
        <div class="sqb-pills">
          ${forecast.legForecasts
            .map(
              lf => `
            <button type="button" class="sqb-pill ${lf.legIndex === clampedLegIdx ? 'active' : ''}" data-select-leg="${lf.legIndex}" title="${lf.label} (${lf.distanceKm} km)">
              E${lf.legIndex + 1}
            </button>`
            )
            .join('')}
        </div>
        <span class="sqb-active-name">${forecast.legForecasts[clampedLegIdx]?.label || ''}</span>
      </div>

      <div class="plan-tabs" role="tablist">
        <button type="button" class="plan-tab ${this.activeTab === 'car' ? 'active' : ''}" data-ptab="car">🚗 1. Fahrzeug</button>
        <button type="button" class="plan-tab ${this.activeTab === 'subs' ? 'active' : ''}" data-ptab="subs">💳 2. Lade-Abos</button>
        <button type="button" class="plan-tab ${this.activeTab === 'route' ? 'active' : ''}" data-ptab="route">🗺️ 3. Etappen &amp; Lader</button>
      </div>

      <div class="plan-tab-body">
        ${this.activeTab === 'car' ? this.renderVehiclesTab(plan, save) : ''}
        ${this.activeTab === 'subs' ? this.renderSubsTab(plan, selectedVehicle) : ''}
        ${this.activeTab === 'route' ? this.renderRouteTab(level, plan, forecast, clampedLegIdx) : ''}
      </div>

      <div class="plan-footer-cta">
        ${
          level.playable
            ? `<button type="button" id="btn-start-trip" class="er-primary-btn ${forecast.valid ? '' : 'warn'}" ${budgetLeft < 0 ? 'disabled' : ''}>
                ${budgetLeft < 0 ? '❌ Budget reicht nicht für dieses Fahrzeug' : forecast.valid ? `🚀 Roadtrip starten (${activeRoute.shortLabel})!` : '⚠️ Trotz Reichweiten-Warnung starten'}
               </button>`
            : `<div class="er-locked-notice">Dieses kuratierte Szenario ist bereits datengetrieben inkl. 3 Routen-Alternativen vorbereitet. Level 1 ist sofort komplett spielbar!</div>`
        }
      </div>
    `;

    this.bindEvents(level, plan, save, clampedLegIdx, providerFilter, dimUnsubscribed);
  }

  private renderMapFilterBar(
    plan: TripPlan,
    car: VehicleSpec,
    filter: ProviderFilterMap,
    dimUnsubscribed: boolean
  ): void {
    if (!this.filterBarEl) return;
    const networks: ChargerNetwork[] = ['tesla', 'enbw', 'ewego', 'electra', 'ionity', 'ac_village'];
    this.filterBarEl.innerHTML = `
      <div class="mfb-row">
        <button type="button" class="mfb-mode-btn ${dimUnsubscribed ? 'active' : ''}" id="btn-toggle-dim-unsub" title="Nicht-abonnierte Anbieter ausgrauen">
          ${dimUnsubscribed ? '⭐ Abos klar' : '🌐 Alle klar'}
        </button>
        ${networks
          .map(net => {
            const on = filter[net] !== false;
            const sub = isProviderSubscribed(net, plan.subscriptionIds, car.isTesla);
            return `
              <button type="button" class="mfb-chip ${on ? 'on' : 'off'} ${sub ? 'sub' : 'nosub'}" data-filter-net="${net}" title="${NET_LABEL[net]}${sub ? ' (Abo aktiv)' : ' (kein Abo)'}">
                <span class="mfb-dot" style="background:${on ? NET_HEX[net] : '#475569'}"></span>
                <span>${NET_LABEL[net]}</span>
              </button>
            `;
          })
          .join('')}
      </div>
      <div class="mfb-legend">
        <span>Reichweite:</span>
        <span class="lg-dot g">25–15%</span>
        <span class="lg-dot y">15–10%</span>
        <span class="lg-dot o">10–5%</span>
        <span class="lg-dot r">5–0%</span>
      </div>
    `;

    this.filterBarEl.querySelector('#btn-toggle-dim-unsub')?.addEventListener('click', () => {
      SoundFX.click();
      this.cb.onToggleDimUnsubscribed();
    });
    this.filterBarEl.querySelectorAll('[data-filter-net]').forEach(btn => {
      btn.addEventListener('click', () => {
        const net = (btn as HTMLElement).dataset.filterNet as ChargerNetwork | undefined;
        if (!net) return;
        SoundFX.click();
        this.cb.onToggleProviderFilter(net);
      });
    });
  }

  private renderForecastBanner(level: LevelConfig, f: PlanForecast, budgetLeft: number): string {
    const hrs = Math.floor(f.totalMinutes / 60);
    const mins = f.totalMinutes % 60;
    const nextCrit = f.firstStopArrivalSocPct <= 5 ? 'danger' : f.firstStopArrivalSocPct < 15 ? 'warn' : 'ok';
    const finalCrit = f.finalArrivalSocPct <= 5 ? 'danger' : f.finalArrivalSocPct < 15 ? 'warn' : 'ok';

    return `
      <div class="forecast-strip">
        <div class="fc-metric"><span>Distanz</span><strong>${f.totalDistanceKm} km</strong></div>
        <div class="fc-metric"><span>Dauer (Ziel ${Math.floor(level.targetArrivalMinutes / 60)}h${String(level.targetArrivalMinutes % 60).padStart(2, '0')})</span><strong>${hrs}h ${String(mins).padStart(2, '0')}m</strong></div>
        <div class="fc-metric"><span>Strom + Abos</span><strong>${f.estimatedTotalCostEur.toFixed(2)} €</strong></div>
        <div class="fc-metric ${nextCrit}" title="Prognostizierter Akkustand bei Ankunft am nächsten geplanten Ziel">
          <span>Ankunft: ${f.firstStopName.slice(0, 14)}</span>
          <strong>${f.firstStopArrivalSocPct}% SoC</strong>
        </div>
        <div class="fc-metric ${finalCrit}" title="Prognostizierter Akkustand am finalen Ziel">
          <span>Ziel-SoC / Budget</span>
          <strong>${f.finalArrivalSocPct}% · ${Math.round(budgetLeft / 1000)}k€</strong>
        </div>
      </div>
      ${
        f.warnings.length > 0
          ? `<div class="forecast-warnings">${f.warnings.map(w => `<div>⚠️ ${w}</div>`).join('')}</div>`
          : `<div class="forecast-ok">✅ Planung stabil · Min. SoC ${f.minSocEncountered}% · Schnitt ${f.avgConsumptionKwh100} kWh/100km</div>`
      }
    `;
  }

  private renderRouteComparisonBar(level: LevelConfig, activeRoute: RouteOption): string {
    return `
      <div class="route-compare-wrap">
        <div class="rc-header">
          <strong>🛣️ 3 Routen-Alternativen vergleichen</strong>
          <span>Aktiv: ${activeRoute.shortLabel}</span>
        </div>
        <div class="route-compare-grid">
          ${level.routeOptions
            .map(opt => {
              const isSelected = opt.id === activeRoute.id;
              const stats = summarizeRouteStats(opt);
              const colorCss = '#' + opt.colorHex.toString(16).padStart(6, '0');
              const trafficCls =
                opt.trafficRisk === 'Hoch' ? 'high' : opt.trafficRisk === 'Mittel' ? 'med' : 'low';
              return `
                <button type="button" class="route-opt-card ${isSelected ? 'selected' : ''}" data-route-id="${opt.id}" style="--rc-color:${colorCss}">
                  <div class="roc-top">
                    <span class="roc-dot" style="background:${colorCss}"></span>
                    <strong>${opt.shortLabel}</strong>
                    <span class="roc-km">${stats.distKm} km</span>
                  </div>
                  <div class="roc-hwy">${opt.highwaySummary}</div>
                  <div class="roc-badges">
                    <span class="roc-pill traffic-${trafficCls}">🚦 Stau: ${opt.trafficRisk}</span>
                    <span class="roc-pill">⛰️ ${opt.elevationProfile} (+${stats.elevGainM}m)</span>
                    <span class="roc-pill">⚡ ${opt.chargingDensity} (${stats.chargerCount})</span>
                  </div>
                  <div class="roc-nets">${stats.networksLabel}</div>
                </button>
              `;
            })
            .join('')}
        </div>
      </div>
    `;
  }

  private renderVehiclesTab(plan: TripPlan, save: CampaignSave): string {
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

  private renderRouteTab(
    level: LevelConfig,
    plan: TripPlan,
    forecast: PlanForecast,
    selectedLegIndex: number
  ): string {
    const vehicle = getVehicleById(plan.vehicleId);
    const activeRoute = getActiveRouteOption(level, plan);
    const activeLegs = getActiveRouteLegs(level, plan);
    const activeEdgeIds = new Set(activeLegs.map(l => l.edgeId));
    const availableChargers = CHARGERS.filter(c => activeEdgeIds.has(c.edgeId));

    return `
      <div class="route-active-summary">
        <strong>${activeRoute.name}</strong>
        <p>${activeRoute.description}</p>
      </div>

      <div class="route-legs-list">
        ${forecast.legForecasts
          .map(lf => {
            const isSelectedLeg = lf.legIndex === selectedLegIndex;
            const speedVal = lf.targetSpeedKmh;
            const riskBadge =
              lf.policeRisk > 0.45
                ? '<span class="risk-pill high">📸 Blitzer-Risiko!</span>'
                : lf.policeRisk > 0.25
                  ? '<span class="risk-pill med">⚠️ Erhöhtes Risiko</span>'
                  : '<span class="risk-pill low">🟢 Sicher</span>';
            const trafficPct = Math.round(lf.trafficRisk * 100);
            return `
            <div class="leg-card ${isSelectedLeg ? 'active-stage' : ''}" data-leg-card="${lf.legIndex}">
              <div class="leg-top">
                <div>
                  <strong>${isSelectedLeg ? '📍 ' : ''}Etappe ${lf.legIndex + 1}: ${lf.label}</strong>
                  <span class="leg-meta">${lf.highwayName} · ${lf.distanceKm} km · ⛰️ +${lf.elevationGainM}/-${lf.elevationLossM}m · 🚦 Stau ${trafficPct}% · ${lf.weather}</span>
                </div>
                <div class="leg-soc ${lf.endSocPct < 10 ? 'danger' : ''}">
                  ${lf.startSocPct}% → <strong>${lf.endSocPct}%</strong>
                </div>
              </div>
              <div class="leg-controls">
                <label>Zieltempo: <strong>${speedVal} km/h</strong> (${lf.consumptionKwh100} kWh/100km)</label>
                <input type="range" class="leg-speed-slider" data-leg="${lf.legIndex}" min="70" max="${vehicle.maxSpeedKmh}" step="5" value="${speedVal}" />
                ${riskBadge}
              </div>
              ${
                lf.stopSummaries.length > 0
                  ? `<div class="leg-stops">
                      ${lf.stopSummaries
                        .map(
                          ss => `
                          <div class="planned-stop-pill">
                            <div class="psp-info">
                              <span>⚡ <b>${ss.station.name}</b> · Ankunft <strong class="${ss.arriveSoc <= 8 ? 'text-danger' : ''}">${ss.arriveSoc}%</strong> → Abfahrt <strong>${ss.departSoc}%</strong> (~${ss.minutes} Min · ${ss.costEur.toFixed(2)} €)</span>
                              <label class="psp-soc-ctl">
                                Ladeziel ${ss.targetSocPct}%
                                <input type="range" class="stop-target-slider" data-chg-id="${ss.station.id}" data-leg-idx="${lf.legIndex}" min="50" max="100" step="5" value="${ss.targetSocPct}" />
                              </label>
                            </div>
                            <button type="button" class="stop-rm-btn" data-rm-stop="${ss.station.id}" data-rm-leg="${lf.legIndex}" title="Stopp entfernen">✕</button>
                          </div>`
                        )
                        .join('')}
                    </div>`
                  : ''
              }
            </div>
          `;
          })
          .join('')}
      </div>

      <div class="charger-directory">
        <h4>⚡ Ladeparks auf „${activeRoute.shortLabel}“ (${availableChargers.length} Standorte)</h4>
        <div class="charger-cards">
          ${availableChargers
            .map(st => {
              const tariff = getBestPriceForStation(st, plan.subscriptionIds, vehicle);
              const activeStops = plan.plannedStops.filter(s => s.chargerId === st.id);
              const hasOut = activeLegs.some(l => l.edgeId === st.edgeId && !l.reverse);
              const hasRet = activeLegs.some(l => l.edgeId === st.edgeId && !!l.reverse);
              return `
              <div class="chg-card ${activeStops.length > 0 ? 'selected' : ''}">
                <div class="chg-top">
                  <strong>[${NET_LABEL[st.network] || st.network}] ${st.name}</strong>
                  <span class="chg-kw">${st.maxKw} kW · ${st.stalls} Stalls</span>
                </div>
                <div class="chg-meta">
                  ${st.cityHint} ·
                  <b class="${tariff.hasSubscriptionDiscount ? 'price-sub-ok' : ''}">${tariff.pricePerKwh.toFixed(2)} €/kWh</b>
                  ${
                    tariff.hasSubscriptionDiscount
                      ? `<span class="price-nosub">(ohne Abo: <s>${tariff.pricePerKwhWithoutSub.toFixed(2)} €</s>)</span>`
                      : `(${tariff.usedSubscriptionName})`
                  }
                  · Auslastung ${Math.round(st.occupancyRisk * 100)}%
                  ${st.hasMcDonalds ? '· 🍔 McDonald’s' : ''}
                  ${st.trailerFriendly ? '· 🚐 Durchfahrt' : ''}
                </div>
                <div class="chg-actions">
                  ${
                    hasOut
                      ? `<button type="button" class="er-mini-btn add-stop-btn" data-chg-id="${st.id}" data-dir="out">${hasRet ? '+ Hinweg' : '+ Stopp einplanen'}</button>`
                      : ''
                  }
                  ${
                    hasRet
                      ? `<button type="button" class="er-mini-btn add-stop-btn" data-chg-id="${st.id}" data-dir="ret">+ Rückweg</button>`
                      : ''
                  }
                </div>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>
    `;
  }

  private bindEvents(
    level: LevelConfig,
    plan: TripPlan,
    save: CampaignSave,
    selectedLegIndex: number,
    providerFilter?: ProviderFilterMap,
    dimUnsubscribed = true
  ): void {
    this.root.querySelector('#er-level-select')?.addEventListener('change', e => {
      SoundFX.click();
      this.cb.onSelectLevel((e.target as HTMLSelectElement).value);
    });

    this.root.querySelector('#btn-zoom-in')?.addEventListener('click', () => {
      SoundFX.click();
      this.cb.onZoomIn();
    });
    this.root.querySelector('#btn-zoom-out')?.addEventListener('click', () => {
      SoundFX.click();
      this.cb.onZoomOut();
    });
    this.root.querySelector('#btn-zoom-route')?.addEventListener('click', () => {
      SoundFX.click();
      this.cb.onZoomRoute();
    });
    this.root.querySelector('#btn-zoom-europe')?.addEventListener('click', () => {
      SoundFX.click();
      this.cb.onZoomEurope();
    });

    this.root.querySelectorAll('.route-opt-card').forEach(card => {
      card.addEventListener('click', () => {
        const routeId = (card as HTMLElement).dataset.routeId;
        if (!routeId || routeId === plan.selectedRouteId) return;
        SoundFX.click();
        this.cb.onSelectRoute(routeId);
      });
    });

    this.root.querySelectorAll('[data-select-leg]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number((btn as HTMLElement).dataset.selectLeg);
        SoundFX.click();
        this.cb.onSelectLeg(idx);
      });
    });

    this.root.querySelectorAll('[data-leg-card]').forEach(card => {
      card.addEventListener('click', e => {
        const target = e.target as HTMLElement;
        if (target.closest('input, button, label')) return;
        const idx = Number((card as HTMLElement).dataset.legCard);
        if (idx === selectedLegIndex) return;
        SoundFX.click();
        this.cb.onSelectLeg(idx);
      });
    });

    this.root.querySelectorAll('.plan-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        SoundFX.click();
        this.activeTab = (btn as HTMLElement).dataset.ptab as 'car' | 'subs' | 'route';
        this.render(level, plan, save, selectedLegIndex, providerFilter, dimUnsubscribed);
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

    this.root.querySelectorAll('.stop-target-slider').forEach(slider => {
      slider.addEventListener('input', () => {
        const chgId = (slider as HTMLElement).dataset.chgId;
        const legIdx = Number((slider as HTMLElement).dataset.legIdx);
        const val = Number((slider as HTMLInputElement).value);
        const stop = plan.plannedStops.find(s => s.chargerId === chgId && s.legIndex === legIdx);
        if (stop) {
          stop.targetSocPct = val;
          this.cb.onPlanChanged();
        }
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
        const activeLegs = getActiveRouteLegs(level, plan);
        const targetLeg = activeLegs.findIndex(
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
