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
import { SUBSCRIPTIONS, roamingPriceForProvider } from '../data/subscriptions';
import { CHARGERS, getCityById, getEdgeById } from '../data/europeMap';
import { LEVELS } from '../data/levels';
import {
  evaluateTripPlan,
  getActiveRouteLegs,
  getActiveRouteOption,
  getReturnRouteOption,
  levelHasReturnRoutes,
  PlanForecast,
  activeSignKmh,
  snapSpeedKmh
} from '../sim/RoutePlanner';
import { speedSignHtml } from './speedSign';
import { getBestPriceForStation } from '../sim/EnergyModel';
import { isProviderSubscribed } from '../phaser/MapLayout';
import { SoundFX } from '../phaser/SoundFX';

export interface PlanningCallbacks {
  onPlanChanged: () => void;
  onSelectRoute: (routeId: string) => void;
  onSelectReturnRoute: (routeId: string) => void;
  onSelectLeg: (legIndex: number) => void;
  onToggleProviderFilter: (network: ChargerNetwork) => void;
  onToggleShowChargers: () => void;
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
  ac_village: 'AC Dorf',
  fastned: 'Fastned',
  totalenergies: 'TotalEnergies',
  ac_dorfladen: 'AC-Dorfladen',
  atlante: 'Atlante',
  vianeo: 'ENGIE Vianeo'
};

const NET_HEX: Record<ChargerNetwork, string> = {
  tesla: '#ef4444',
  enbw: '#f97316',
  ewego: '#22c55e',
  electra: '#a855f7',
  ionity: '#ec4899',
  ac_village: '#14b8a6',
  fastned: '#f5c400',
  totalenergies: '#e10600',
  ac_dorfladen: '#d97706',
  atlante: '#0f766e',
  vianeo: '#0284c7'
};

const BASE_FILTER_NETWORKS: ChargerNetwork[] = ['tesla', 'enbw', 'ewego', 'electra', 'ionity', 'ac_village'];

function filterNetworksForLevel(level: LevelConfig): ChargerNetwork[] {
  const edgeIds = new Set(level.routeOptions.flatMap(route => route.legs.map(leg => leg.edgeId)));
  const present = new Set(CHARGERS.filter(station => edgeIds.has(station.edgeId)).map(station => station.network));
  const extras = (['fastned', 'totalenergies', 'ac_dorfladen'] as ChargerNetwork[]).filter(net => present.has(net));
  if (level.id === 'level_2_family_summer') {
    const french: ChargerNetwork[] = ['tesla', 'electra', 'ionity', 'atlante', 'vianeo'];
    if (present.has('ac_dorfladen')) french.push('ac_dorfladen');
    return french;
  }
  return [...BASE_FILTER_NETWORKS, ...extras];
}

function subscriptionsForLevel(level: LevelConfig): typeof SUBSCRIPTIONS {
  const french = level.id === 'level_2_family_summer';
  return SUBSCRIPTIONS.filter(sub => {
    if (french && (sub.provider === 'enbw' || sub.provider === 'ewego')) return false;
    if (!french && (sub.provider === 'atlante' || sub.provider === 'vianeo')) return false;
    return true;
  });
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

function summarizeRouteStats(opt: RouteOption): {
  distKm: number;
  elevGainM: number;
  chargerCount: number;
  networksLabel: string;
} {
  let distKm = 0;
  let elevGainM = 0;
  const edgeIds = new Set<string>();
  const directional = opt.legs.filter(l => !l.reverse);
  const legs = directional.length > 0 ? directional : opt.legs;
  legs.forEach(l => {
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
    showChargerStations = true
  ): void {
    const forecast = evaluateTripPlan(level, plan);
    const selectedVehicle = getVehicleById(plan.vehicleId);
    const activeRoute = getActiveRouteOption(level, plan);
    const budgetLeft = save.cashEur - (save.ownedVehicleId === selectedVehicle.id ? 0 : selectedVehicle.priceEur);
    const clampedLegIdx = Math.max(0, Math.min(forecast.legForecasts.length - 1, selectedLegIndex));

    if (this.filterBarEl && providerFilter) {
      this.renderMapFilterBar(level, plan, selectedVehicle, providerFilter, showChargerStations);
    }

    this.root.innerHTML = `
      <div class="plan-header-card">
        <div class="plan-level-row">
          <select id="er-level-select" class="er-select" aria-label="Level auswählen">
            ${LEVELS.map(l => {
              const unlocked = l.order <= save.unlockedLevelOrder;
              const lockTag = !l.playable
                ? ' 🔒 (Kuratiert · Vorschau)'
                : !unlocked
                  ? ` 🔒 (nach Level ${l.order - 1})`
                  : '';
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
          <span class="map-hint">Hover/Tipp öffnet einen Kasten · Anbieterfilter pinnt Kacheln der Etappe · Ring: 25–0 % in Grün, Gelb, Orange, Rot</span>
        </div>
      </div>

      ${this.renderForecastBanner(level, forecast, budgetLeft)}
      ${this.renderRouteComparisonBar(level, plan)}

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
        ${this.activeTab === 'subs' ? this.renderSubsTab(level, plan, selectedVehicle) : ''}
        ${this.activeTab === 'route' ? this.renderRouteTab(level, plan, forecast, clampedLegIdx) : ''}
      </div>

      <div class="plan-footer-cta">
        ${
          level.playable && level.order <= save.unlockedLevelOrder
            ? `<button type="button" id="btn-start-trip" class="er-primary-btn ${forecast.valid ? '' : 'warn'}" ${budgetLeft < 0 ? 'disabled' : ''}>
                ${budgetLeft < 0 ? '❌ Budget reicht nicht für dieses Fahrzeug' : forecast.valid ? `🚀 Roadtrip starten (${activeRoute.shortLabel})!` : '⚠️ Trotz Reichweiten-Warnung starten'}
               </button>`
            : level.playable
              ? `<div class="er-locked-notice">Level ${level.order} wird freigeschaltet, sobald Level ${level.order - 1} abgeschlossen ist. Die Routen kannst du schon ansehen.</div>`
              : `<div class="er-locked-notice">Dieses kuratierte Szenario ist bereits datengetrieben inkl. 3 Routen-Alternativen vorbereitet. Level 1 ist sofort komplett spielbar!</div>`
        }
      </div>
    `;

    this.bindEvents(level, plan, save, clampedLegIdx, providerFilter, showChargerStations);
  }

  private renderMapFilterBar(
    level: LevelConfig,
    plan: TripPlan,
    car: VehicleSpec,
    filter: ProviderFilterMap,
    showChargerStations: boolean
  ): void {
    if (!this.filterBarEl) return;
    const networks = filterNetworksForLevel(level);
    this.filterBarEl.innerHTML = `
      <div class="mfb-row">
        <button type="button" class="mfb-mode-btn ${showChargerStations ? 'active' : ''}" id="btn-toggle-show-chargers" title="Einblenden: Symbole auf Hin- und Rückweg, farbig mit Abo und grau bei Ad-hoc. Aktive Anbieterchips zeigen zusätzlich die Detailkacheln der aktuellen Etappe. Ausblenden: keine Symbole, außer die angehakten Anbieter auf der aktuellen Etappe.">
          ${showChargerStations ? '🔌 Ladestationen einblenden' : '🔌 Ladestationen ausblenden'}
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
        <span class="lg-dot g">25–15</span>
        <span class="lg-dot y">15–10</span>
        <span class="lg-dot o">10–5</span>
        <span class="lg-dot r">5–0 %</span>
      </div>
    `;

    this.filterBarEl.querySelector('#btn-toggle-show-chargers')?.addEventListener('click', () => {
      SoundFX.click();
      this.cb.onToggleShowChargers();
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

  private renderRouteOptionCards(level: LevelConfig, direction: 'out' | 'ret', activeId: string): string {
    return level.routeOptions
      .map(opt => {
        const isSelected = opt.id === activeId;
        const stats = summarizeRouteStats(opt);
        const colorCss = '#' + opt.colorHex.toString(16).padStart(6, '0');
        const trafficCls =
          opt.trafficRisk === 'Hoch' ? 'high' : opt.trafficRisk === 'Mittel' ? 'med' : 'low';
        return `
          <button type="button" class="route-opt-card ${isSelected ? 'selected' : ''}" data-route-id="${opt.id}" data-route-dir="${direction}" style="--rc-color:${colorCss}">
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
      .join('');
  }

  private renderRouteComparisonBar(level: LevelConfig, plan: TripPlan): string {
    const outbound = getActiveRouteOption(level, plan);
    const hasReturn = levelHasReturnRoutes(level);
    const inbound = hasReturn ? getReturnRouteOption(level, plan) : null;
    return `
      <div class="route-compare-wrap">
        <div class="rc-header">
          <strong>${hasReturn ? '➡️ Hinweg' : '🛣️ Route'}</strong>
          <span>Aktiv: ${outbound.shortLabel}</span>
        </div>
        <div class="route-compare-grid">
          ${this.renderRouteOptionCards(level, 'out', outbound.id)}
        </div>
        ${
          hasReturn && inbound
            ? `
        <div class="rc-header rc-header-return">
          <strong>⬅️ Rückweg</strong>
          <span>Aktiv: ${inbound.shortLabel}</span>
        </div>
        <div class="route-compare-grid">
          ${this.renderRouteOptionCards(level, 'ret', inbound.id)}
        </div>`
            : ''
        }
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
                  <span>🔌 AC ${v.acMaxKw} kW</span>
                  <span>🪝 ${v.towingCapacityKg > 0 ? v.towingCapacityKg + ' kg' : 'Kein Haken'}</span>
                  ${
                    v.superchargerFree
                      ? '<span class="tesla-tag free">Supercharger gratis!</span>'
                      : v.isTesla
                        ? '<span class="tesla-tag abo">Supercharger Abo inkl.</span>'
                        : ''
                  }
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

  private renderSubsTab(level: LevelConfig, plan: TripPlan, car: VehicleSpec): string {
    return `
      <div class="subs-list">
        ${subscriptionsForLevel(level).map(sub => {
          const isTeslaAuto = sub.id === 'tesla_suc' && !!car.isTesla;
          const isAdhocLocked = sub.id === 'adhoc';
          const checked = isAdhocLocked || isTeslaAuto || plan.subscriptionIds.includes(sub.id);
          const roaming = roamingPriceForProvider(sub.provider);
          return `
            <label class="sub-card ${checked ? 'active' : ''} ${isAdhocLocked ? 'locked' : ''}">
              <input type="checkbox" class="sub-toggle" data-sub-id="${sub.id}" ${checked ? 'checked' : ''} ${isTeslaAuto || isAdhocLocked ? 'disabled' : ''} />
              <div class="sub-info">
                <div class="sub-top">
                  <strong>${sub.name}</strong>
                  <span class="sub-fee">${isTeslaAuto ? '0,00 € (Tesla inkl.)' : isAdhocLocked ? 'Immer aktiv' : `${sub.monthlyFeeEur.toFixed(2)} €/Mt · Trip-Anteil ${sub.tripShareFeeEur.toFixed(2)} €`}</span>
                </div>
                <div class="sub-prices">Eigenes Netz: <b>${sub.pricePerKwhOwn.toFixed(2)} €/kWh</b>${
                  roaming != null
                    ? ` · Roaming: <b>${roaming.toFixed(2)} €/kWh</b> <span class="sub-roam-note">(fest je Anbieter)</span>`
                    : ' · Ad-hoc immer möglich'
                }</div>
                <div class="sub-desc">${isAdhocLocked ? 'Immer angehakt und nicht abwählbar. ' : ''}${sub.bestFor}</div>
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
    const returnRoute = levelHasReturnRoutes(level) ? getReturnRouteOption(level, plan) : null;
    const activeLegs = getActiveRouteLegs(level, plan);
    const selectedSpec = activeLegs[selectedLegIndex];
    const stageChargers = CHARGERS.filter(c => c.edgeId === selectedSpec?.edgeId);
    const selectedForecast = forecast.legForecasts[selectedLegIndex];
    let previousReturn: boolean | null = null;
    const overnightIdx = activeLegs.findIndex(leg => leg.overnightAtEnd);
    const overnightCity =
      overnightIdx >= 0
        ? getCityById(
            activeLegs[overnightIdx].reverse
              ? getEdgeById(activeLegs[overnightIdx].edgeId).fromCityId
              : getEdgeById(activeLegs[overnightIdx].edgeId).toCityId
          ).name
        : '';

    return `
      <div class="route-active-summary">
        <strong>Hinweg: ${activeRoute.name}</strong>
        ${returnRoute ? `<strong class="route-return-name">Rückweg: ${returnRoute.name}</strong>` : ''}
        <p>${activeRoute.description}</p>
        ${returnRoute && returnRoute.id !== activeRoute.id ? `<p>${returnRoute.description}</p>` : ''}
      </div>
      ${
        overnightCity
          ? `<div class="overnight-plan-note">🏨 Übernachtung auf dem Hinweg in <b>${overnightCity}</b> (Etappe ${overnightIdx + 1}, am Etappenende). Unterwegs wählst du: gutes Hotel mit AC, Budgethotel oder Schlaf im Auto an der Aire. Kosten 0–289 €, etwa 8 Stunden, fließen in die Abrechnung ein.</div>`
          : ''
      }

      <div class="route-legs-list">
        ${forecast.legForecasts
          .map(lf => {
            const spec = activeLegs[lf.legIndex];
            const isReturn = !!spec?.reverse;
            let directionHeader = '';
            if (returnRoute && previousReturn !== isReturn) {
              previousReturn = isReturn;
              const routeName = isReturn ? returnRoute.shortLabel : activeRoute.shortLabel;
              directionHeader = `<div class="leg-direction">${isReturn ? '⬅️ Rückweg' : '➡️ Hinweg'} · ${routeName}</div>`;
            }
            const isSelectedLeg = lf.legIndex === selectedLegIndex;
            const edgeForLeg = spec ? getEdgeById(spec.edgeId) : undefined;
            const sliderMax = vehicle.maxSpeedKmh;
            const sliderMin = Math.min(40, sliderMax);
            const speedVal = snapSpeedKmh(lf.targetSpeedKmh, sliderMax, sliderMin);
            const riskBadge =
              lf.policeRisk > 0.45
                ? '<span class="risk-pill high">📸 Blitzer-Risiko!</span>'
                : lf.policeRisk > 0.25
                  ? '<span class="risk-pill med">⚠️ Erhöhtes Risiko</span>'
                  : '<span class="risk-pill low">🟢 Sicher</span>';
            const trafficPct = Math.round(lf.trafficRisk * 100);
            const rainCap = edgeForLeg?.speedLimitRainKmh;
            const posted = edgeForLeg && edgeForLeg.speedLimitKmh > 0 ? edgeForLeg.speedLimitKmh : 0;
            const rainActive = lf.weather === 'rain' || lf.weather === 'storm';
            const signKmh = edgeForLeg ? activeSignKmh(edgeForLeg, lf.weather) : 0;
            const overLimit = signKmh > 0 && speedVal > signKmh;
            const rainNote = rainCap
              ? `<div class="leg-rain-cap">🌧️ Frankreich: ${posted || 130} km/h, bei Regen ${rainCap} km/h.${rainActive ? ` Diese Etappe ist Regen, das Tempo startet bei ${rainCap}.` : ''}</div>`
              : '';
            const overnightNote = spec?.overnightAtEnd
              ? `<div class="leg-overnight">🏨 Hier endet der Fahrtag. Ereignis mit drei Möglichkeiten: sehr gutes Hotel (AC über Nacht, Spa und Buffet, teuer, Stress sinkt stark), Budgethotel (stressneutral, günstig, kein Laden) oder kostenlos im Auto an der Aire (Stress steigt, 10&nbsp;% Einbruch).</div>`
              : '';
            return `
            ${directionHeader}
            <div class="leg-card ${isSelectedLeg ? 'active-stage' : ''}" data-leg-card="${lf.legIndex}">
              <div class="leg-top">
                ${speedSignHtml(lf.speedLimitKmh)}
                <div class="leg-title-block">
                  <strong>${isSelectedLeg ? '📍 ' : ''}Etappe ${lf.legIndex + 1}: ${lf.label}</strong>
                  <span class="leg-meta">${lf.highwayName} · ${lf.distanceKm} km · ⛰️ +${lf.elevationGainM}/-${lf.elevationLossM}m · 🚦 Stau ${trafficPct}% · ${lf.weather}</span>
                </div>
                <div class="leg-soc ${lf.endSocPct < 10 ? 'danger' : ''}">
                  ${lf.startSocPct}% → <strong>${lf.endSocPct}%</strong>
                </div>
              </div>
              <div class="leg-controls">
                <label>Zieltempo: <strong class="${overLimit ? 'speed-over-limit' : ''}" data-speed-readout="${lf.legIndex}"${overLimit ? ' title="über dem Temposchild"' : ''}>${speedVal} km/h</strong> · Ø ${lf.cruiseKmh} km/h im Verkehr (${lf.consumptionKwh100} kWh/100km)</label>
                <input type="range" class="leg-speed-slider${overLimit ? ' over-limit' : ''}" data-leg="${lf.legIndex}" data-sign="${signKmh}" min="${sliderMin}" max="${sliderMax}" step="5" value="${speedVal}"${overLimit ? ' title="über dem Temposchild"' : ''} />
                ${riskBadge}
              </div>
              ${rainNote}
              ${overnightNote}
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
                                Ladeziel <strong data-soc-readout="${ss.station.id}-${lf.legIndex}">${Math.min(100, Math.max(Math.ceil(ss.arriveSoc), ss.targetSocPct))}%</strong>
                                <input type="range" class="stop-target-slider" data-chg-id="${ss.station.id}" data-leg-idx="${lf.legIndex}" min="${Math.min(99, Math.max(1, Math.ceil(ss.arriveSoc)))}" max="100" step="1" value="${Math.min(100, Math.max(Math.ceil(ss.arriveSoc), ss.targetSocPct))}" />
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
        <h4>⚡ Ladepunkte Etappe ${selectedLegIndex + 1}${selectedForecast ? `: ${selectedForecast.label}` : ''} (${stageChargers.length})</h4>
        <div class="charger-cards">
          ${
            stageChargers.length === 0
              ? '<div class="chg-empty">Auf dieser Etappe liegen keine Ladepunkte.</div>'
              : stageChargers
            .map(st => {
              const tariff = getBestPriceForStation(st, plan.subscriptionIds, vehicle);
              const subscribed = isProviderSubscribed(st.network, plan.subscriptionIds, vehicle.isTesla);
              const plannedHere = plan.plannedStops.some(
                s => s.chargerId === st.id && s.legIndex === selectedLegIndex
              );
              return `
              <div class="chg-card ${plannedHere ? 'selected' : ''} ${subscribed ? 'with-sub' : 'roaming'}">
                <div class="chg-top">
                  <strong>[${NET_LABEL[st.network] || st.network}] ${st.name}</strong>
                  <span class="chg-kw">${st.maxKw} kW · ${st.stalls} Stalls</span>
                </div>
                <div class="chg-meta">
                  ${st.cityHint} ·
                  <b class="${subscribed ? 'price-sub-ok' : 'price-roaming'}">${tariff.pricePerKwh.toFixed(2)} €/kWh</b>
                  ${
                    subscribed && tariff.hasSubscriptionDiscount
                      ? `<span class="price-nosub">(ohne Abo: <s>${tariff.pricePerKwhWithoutSub.toFixed(2)} €</s>)</span>`
                      : `<span class="${subscribed ? '' : 'price-roaming'}">(${tariff.usedSubscriptionName})</span>`
                  }
                  · Auslastung ${Math.round(st.occupancyRisk * 100)}%
                  ${st.hasMcDonalds ? '· 🍔 McDonald’s' : ''}
                  ${st.trailerFriendly ? '· 🚐 Durchfahrt' : ''}
                  ${st.isAcOnly ? '· AC langsam' : ''}
                </div>
                ${
                  st.network === 'ac_dorfladen'
                    ? `<div class="chg-flavour">Dorfladen-AC, 0,29 €/kWh Ad-hoc. Langsam, dafür günstiger Atomstrom aus dem französischen Netz.</div>`
                    : ''
                }
                <div class="chg-actions">
                  <button type="button" class="er-mini-btn add-stop-btn" data-chg-id="${st.id}" data-leg-idx="${selectedLegIndex}" ${plannedHere ? 'disabled' : ''}>${plannedHere ? '✓ Eingeplant' : '+ Stopp einplanen'}</button>
                </div>
              </div>
            `;
            })
            .join('')
          }
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
    showChargerStations = true
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
        const dir = (card as HTMLElement).dataset.routeDir;
        if (!routeId) return;
        if (dir === 'ret') {
          if (routeId === plan.returnRouteId) return;
          SoundFX.click();
          this.cb.onSelectReturnRoute(routeId);
          return;
        }
        if (routeId === plan.selectedRouteId) return;
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
        this.render(level, plan, save, selectedLegIndex, providerFilter, showChargerStations);
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
        if (!id || id === 'adhoc') return;
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
      const applySpeed = () => {
        const input = slider as HTMLInputElement;
        const legIndex = Number((slider as HTMLElement).dataset.leg);
        const val = snapSpeedKmh(Number(input.value), Number(input.max), Number(input.min));
        if (input.value !== String(val)) input.value = String(val);
        const sign = Number(input.dataset.sign || 0);
        const over = sign > 0 && val > sign;
        input.classList.toggle('over-limit', over);
        input.title = over ? 'über dem Temposchild' : '';
        const existing = plan.legPlans.find(l => l.legIndex === legIndex);
        if (existing) existing.targetSpeedKmh = val;
        else plan.legPlans.push({ legIndex, targetSpeedKmh: val });
        const readout = this.root.querySelector(`[data-speed-readout="${legIndex}"]`);
        if (readout) {
          readout.textContent = `${val} km/h`;
          readout.classList.toggle('speed-over-limit', over);
        }
      };
      slider.addEventListener('input', applySpeed);
      slider.addEventListener('change', () => {
        applySpeed();
        this.cb.onPlanChanged();
      });
    });

    this.root.querySelectorAll('.stop-target-slider').forEach(slider => {
      const applyTarget = () => {
        const chgId = (slider as HTMLElement).dataset.chgId;
        const legIdx = Number((slider as HTMLElement).dataset.legIdx);
        const val = Number((slider as HTMLInputElement).value);
        const stop = plan.plannedStops.find(s => s.chargerId === chgId && s.legIndex === legIdx);
        if (!stop) return false;
        stop.targetSocPct = val;
        const readout = this.root.querySelector(`[data-soc-readout="${chgId}-${legIdx}"]`);
        if (readout) readout.textContent = `${val}%`;
        return true;
      };
      slider.addEventListener('input', applyTarget);
      slider.addEventListener('change', () => {
        if (applyTarget()) this.cb.onPlanChanged();
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
        const targetLeg = Number((btn as HTMLElement).dataset.legIdx);
        if (!chgId || Number.isNaN(targetLeg)) return;
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
