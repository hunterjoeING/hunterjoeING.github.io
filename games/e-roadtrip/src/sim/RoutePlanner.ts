import {
  ChargerStation,
  HighwayEdge,
  LevelConfig,
  LevelRouteLegSpec,
  LiveSocPrediction,
  PlannedStop,
  RouteOption,
  RunState,
  TripPlan
} from '../types';
import { getVehicleById } from '../data/vehicles';
import { getChargersForEdge, getCityById, getEdgeById } from '../data/europeMap';
import {
  computeConsumptionKwh100,
  computeSubscriptionTripCost,
  estimateChargeSession
} from './EnergyModel';

export interface LegForecast {
  legIndex: number;
  label: string;
  highwayName: string;
  distanceKm: number;
  targetSpeedKmh: number;
  speedLimitKmh: number;
  weather: string;
  elevationGainM: number;
  elevationLossM: number;
  trafficRisk: number;
  consumptionKwh100: number;
  startSocPct: number;
  endSocPct: number;
  driveMinutes: number;
  chargeMinutes: number;
  stopSummaries: Array<{
    station: ChargerStation;
    arriveSoc: number;
    departSoc: number;
    targetSocPct: number;
    minutes: number;
    costEur: number;
  }>;
  policeRisk: number;
  breakdownRisk: boolean;
  /** Expected average after traffic. The set speed stays in targetSpeedKmh. */
  cruiseKmh: number;
}

export interface PlanForecast {
  valid: boolean;
  totalDistanceKm: number;
  totalDriveMinutes: number;
  totalChargeMinutes: number;
  totalMinutes: number;
  estimatedChargingCostEur: number;
  subscriptionCostEur: number;
  tollsEur: number;
  estimatedTotalCostEur: number;
  minSocEncountered: number;
  firstStopName: string;
  firstStopArrivalSocPct: number;
  finalArrivalSocPct: number;
  totalElevationGainM: number;
  totalElevationLossM: number;
  avgTrafficRisk: number;
  avgConsumptionKwh100: number;
  legForecasts: LegForecast[];
  warnings: string[];
}

/** Starting cruise on an unrestricted German Autobahn. It is not a limit sign. */
export const ADVISORY_SPEED_KMH = 130;

/** Set speed moves in 5 km/h steps in every view. */
export const SPEED_STEP_KMH = 5;

/** Nearest 5 km/h step that is not above the car's top speed. */
export function snapSpeedKmh(kmh: number, maxKmh: number, minKmh = 40): number {
  const high = Math.floor(Math.max(0, maxKmh) / SPEED_STEP_KMH) * SPEED_STEP_KMH;
  const cap = high >= SPEED_STEP_KMH ? high : SPEED_STEP_KMH;
  const floor = Math.min(Math.max(SPEED_STEP_KMH, minKmh), cap);
  const low = Math.ceil(floor / SPEED_STEP_KMH) * SPEED_STEP_KMH;
  const rounded = Math.round(kmh / SPEED_STEP_KMH) * SPEED_STEP_KMH;
  return Math.min(cap, Math.max(Math.min(low, cap), rounded));
}

/** French autoroute cap in rain or storm. Null when the edge has no rain limit. */
export function frenchRainCapKmh(
  edge: Pick<HighwayEdge, 'speedLimitRainKmh'>,
  weather?: string
): number | null {
  if (weather !== 'rain' && weather !== 'storm') return null;
  if (!edge.speedLimitRainKmh || edge.speedLimitRainKmh <= 0) return null;
  return edge.speedLimitRainKmh;
}

/**
 * Numeric sign for warnings and the AI. `0` means unrestricted (no red-ring limit).
 * Rain and a country-road detour replace the posted number. This is not the slider maximum.
 */
export function activeSignKmh(
  edge: Pick<HighwayEdge, 'speedLimitKmh' | 'speedLimitRainKmh'>,
  weather?: string,
  countryLimitKmh?: number
): number {
  if (countryLimitKmh && countryLimitKmh > 0) return countryLimitKmh;
  const rainCap = frenchRainCapKmh(edge, weather);
  if (rainCap) return rainCap;
  return edge.speedLimitKmh > 0 ? edge.speedLimitKmh : 0;
}

/** Legal sign, or the car's top speed where the road is unrestricted. Used for AI traffic, not the slider. */
export function sectionMaxSpeedKmh(
  edge: Pick<HighwayEdge, 'speedLimitKmh' | 'speedLimitRainKmh'>,
  vehicleMaxSpeedKmh: number,
  weather?: string,
  countryLimitKmh?: number
): number {
  if (countryLimitKmh && countryLimitKmh > 0) return Math.min(vehicleMaxSpeedKmh, countryLimitKmh);
  const rainCap = frenchRainCapKmh(edge, weather);
  if (rainCap) return Math.min(vehicleMaxSpeedKmh, rainCap);
  if (edge.speedLimitKmh > 0) return Math.min(vehicleMaxSpeedKmh, edge.speedLimitKmh);
  return vehicleMaxSpeedKmh;
}

/** Preset cruise: the posted sign, or 130 on an unrestricted Autobahn. Rain uses the French cap. */
export function defaultLegSpeedKmh(
  edge: Pick<HighwayEdge, 'speedLimitKmh' | 'speedLimitRainKmh'>,
  vehicleMaxSpeedKmh: number,
  weather?: string
): number {
  const posted = edge.speedLimitKmh > 0 ? edge.speedLimitKmh : ADVISORY_SPEED_KMH;
  const rainCap = frenchRainCapKmh(edge, weather);
  const limit = rainCap ? Math.min(posted, rainCap) : posted;
  const capped = Math.min(vehicleMaxSpeedKmh, limit);
  return snapSpeedKmh(capped, capped);
}

/** Chosen cruise, not reduced by the sign. Traffic and the car's top speed apply elsewhere. */
export function drivenSpeedKmh(
  _edge: Pick<HighwayEdge, 'speedLimitKmh' | 'speedLimitRainKmh'>,
  _weather: string | undefined,
  chosenKmh: number
): number {
  return chosenKmh;
}

/** Cruise after traffic. The set speed is only the ceiling; congestion pulls the average down. */
export function congestedCruiseKmh(setKmh: number, trafficRisk: number): number {
  const factor = Math.max(0.6, 0.96 - Math.max(0, trafficRisk) * 0.5);
  return Math.max(42, setKmh * factor);
}

/**
 * Blitzer risk from the speed that is actually driven (or, in the forecast, the
 * expected average) against the current sign. Unrestricted roads have no fine.
 * Dense traffic lowers this only because it lowers the speed.
 */
export function policeRiskForSpeed(speedKmh: number, signKmh: number, policeRiskBase: number): number {
  const base = Math.max(0, policeRiskBase);
  if (!(signKmh > 0) || speedKmh <= signKmh + 8) return Math.min(0.24, base * 0.25);
  return Math.min(0.95, base + (speedKmh - signKmh) * 0.015);
}

/** Chance of a speed-trap event per simulated minute while more than 8 km/h over the sign. */
export function speedTrapChancePerSimMinute(excessKmh: number, policeRiskBase: number): number {
  if (excessKmh <= 8) return 0;
  const over = excessKmh - 8;
  return Math.min(0.12, Math.max(0, policeRiskBase) * 0.08 + over * 0.0016);
}

export function getActiveRouteOption(level: LevelConfig, plan?: Pick<TripPlan, 'selectedRouteId'>): RouteOption {
  const id = plan?.selectedRouteId || level.defaultRouteId;
  return level.routeOptions.find(r => r.id === id) || level.routeOptions[0];
}

export function levelHasReturnRoutes(level: LevelConfig): boolean {
  return level.routeOptions.some(opt => opt.legs.some(leg => !!leg.reverse));
}

/** Forward legs of a corridor. One-way routes keep their full leg list. */
export function routeOutboundLegs(opt: RouteOption): LevelRouteLegSpec[] {
  const forward = opt.legs.filter(leg => !leg.reverse);
  return forward.length > 0 ? forward : opt.legs.slice();
}

export function routeReturnLegs(opt: RouteOption): LevelRouteLegSpec[] {
  return opt.legs.filter(leg => !!leg.reverse);
}

export function getReturnRouteOption(level: LevelConfig, plan?: Pick<TripPlan, 'selectedRouteId' | 'returnRouteId'>): RouteOption {
  const fallback = plan?.selectedRouteId || level.defaultRouteId;
  const id = plan?.returnRouteId || fallback;
  return level.routeOptions.find(r => r.id === id) || getActiveRouteOption(level, plan);
}

/**
 * Composed trip: outbound legs of the chosen Hinweg plus return legs of the chosen Rückweg.
 * Levels without a return stay one-way.
 */
export function getActiveRouteLegs(
  level: LevelConfig,
  plan?: Pick<TripPlan, 'selectedRouteId' | 'returnRouteId'>
): LevelRouteLegSpec[] {
  const outbound = getActiveRouteOption(level, plan);
  if (!levelHasReturnRoutes(level)) {
    return outbound ? outbound.legs : level.routeLegs;
  }
  const inbound = getReturnRouteOption(level, plan);
  return [...routeOutboundLegs(outbound), ...routeReturnLegs(inbound)];
}

function rebuildLegPlans(level: LevelConfig, plan: TripPlan): TripPlan {
  const vehicle = getVehicleById(plan.vehicleId);
  const legs = getActiveRouteLegs(level, plan);
  plan.legPlans = legs.map((leg, idx) => {
    const edge = getEdgeById(leg.edgeId);
    const weather = leg.weatherOverride || edge.defaultWeather;
    return {
      legIndex: idx,
      targetSpeedKmh: defaultLegSpeedKmh(edge, vehicle.maxSpeedKmh, weather)
    };
  });
  plan.plannedStops = [];
  return plan;
}

export function createDefaultPlan(level: LevelConfig, vehicleId: string, routeId?: string): TripPlan {
  const selectedRoute =
    level.routeOptions.find(r => r.id === (routeId || level.defaultRouteId)) || level.routeOptions[0];
  const selectedRouteId = selectedRoute ? selectedRoute.id : level.defaultRouteId;

  const plan: TripPlan = {
    vehicleId,
    selectedRouteId,
    returnRouteId: levelHasReturnRoutes(level) ? selectedRouteId : '',
    subscriptionIds: [],
    legPlans: [],
    plannedStops: []
  };
  return rebuildLegPlans(level, plan);
}

export function switchRouteInPlan(level: LevelConfig, plan: TripPlan, routeId: string): TripPlan {
  const selectedRoute = level.routeOptions.find(r => r.id === routeId) || level.routeOptions[0];
  if (!selectedRoute) return plan;

  plan.selectedRouteId = selectedRoute.id;
  if (levelHasReturnRoutes(level)) {
    const returnStillValid = level.routeOptions.some(r => r.id === plan.returnRouteId);
    if (!plan.returnRouteId || !returnStillValid) plan.returnRouteId = selectedRoute.id;
  } else {
    plan.returnRouteId = '';
  }
  return rebuildLegPlans(level, plan);
}

export function switchReturnRouteInPlan(level: LevelConfig, plan: TripPlan, routeId: string): TripPlan {
  if (!levelHasReturnRoutes(level)) return plan;
  const selectedRoute = level.routeOptions.find(r => r.id === routeId) || level.routeOptions[0];
  if (!selectedRoute) return plan;
  plan.returnRouteId = selectedRoute.id;
  return rebuildLegPlans(level, plan);
}

export function evaluateTripPlan(level: LevelConfig, plan: TripPlan): PlanForecast {
  const vehicle = getVehicleById(plan.vehicleId);
  const legs = getActiveRouteLegs(level, plan);
  let soc = 96; // Start at 96% at start city
  let minSoc = soc;
  let totalDist = 0;
  let totalDriveMin = 0;
  let totalChargeMin = 0;
  let totalChargeCost = 0;
  let totalTolls = 0;
  let totalEnergyKwh = 0;
  let totalElevGain = 0;
  let totalElevLoss = 0;
  let trafficWeightedSum = 0;
  let dwellMinutes = level.id === 'level_1_aachen_hannover' ? 28 : 0;

  let firstStopName = `Ziel ${getCityById(level.destinationCityId).name}`;
  let firstStopArrivalSocPct: number | null = null;

  const warnings: string[] = [];
  const legForecasts: LegForecast[] = [];

  for (let i = 0; i < legs.length; i++) {
    const spec = legs[i];
    const edge = getEdgeById(spec.edgeId);
    const lp = plan.legPlans.find(x => x.legIndex === i);
    const weather = spec.weatherOverride || edge.defaultWeather;
    const chosenSpeed = snapSpeedKmh(
      lp ? lp.targetSpeedKmh : defaultLegSpeedKmh(edge, vehicle.maxSpeedKmh, weather),
      vehicle.maxSpeedKmh
    );
    if (lp && lp.targetSpeedKmh !== chosenSpeed) lp.targetSpeedKmh = chosenSpeed;
    const speed = chosenSpeed;
    const cruise = congestedCruiseKmh(speed, edge.baseTrafficRisk);
    const signLimit = activeSignKmh(edge, weather);

    const fromCity = getCityById(spec.reverse ? edge.toCityId : edge.fromCityId);
    const toCity = getCityById(spec.reverse ? edge.fromCityId : edge.toCityId);

    const elevGain = spec.reverse ? edge.elevationLossM : edge.elevationGainM;
    const elevLoss = spec.reverse ? edge.elevationGainM : edge.elevationLossM;
    totalElevGain += elevGain;
    totalElevLoss += elevLoss;
    trafficWeightedSum += edge.baseTrafficRisk * edge.distanceKm;

    const cons100 = computeConsumptionKwh100(
      vehicle,
      cruise,
      weather,
      elevGain,
      elevLoss,
      edge.distanceKm,
      level.trailerWeightKg || 0,
      !!plan.behindTruckMode
    );

    const stopsOnLeg = plan.plannedStops
      .filter(s => s.legIndex === i)
      .map(s => {
        const st = getChargersForEdge(edge.id).find(c => c.id === s.chargerId);
        if (!st) return null;
        const progressAlongRun = spec.reverse ? 1 - st.edgeProgress : st.edgeProgress;
        return { stop: s, station: st, progress: progressAlongRun };
      })
      .filter((x): x is { stop: PlannedStop; station: ChargerStation; progress: number } => x !== null)
      .sort((a, b) => a.progress - b.progress);

    const startSoc = soc;
    let cursorProgress = 0;
    let legChargeMin = 0;
    const stopSummaries: LegForecast['stopSummaries'] = [];

    for (const item of stopsOnLeg) {
      const segKm = Math.max(0, (item.progress - cursorProgress) * edge.distanceKm);
      const segKwh = (segKm / 100) * cons100;
      totalEnergyKwh += segKwh;
      soc -= (segKwh / vehicle.batteryKwh) * 100;
      minSoc = Math.min(minSoc, soc);

      const arriveSoc = soc;
      if (firstStopArrivalSocPct === null) {
        firstStopArrivalSocPct = Math.round(arriveSoc);
        firstStopName = item.station.name;
      }

      if (arriveSoc <= 0) {
        warnings.push(`Liegenbleiber vor „${item.station.name}“ auf Etappe ${i + 1}!`);
      }

      const target = Math.min(100, Math.max(arriveSoc + 2, item.stop.targetSocPct));
      const est = estimateChargeSession(
        vehicle,
        item.station,
        Math.max(1, arriveSoc),
        target,
        plan.subscriptionIds
      );
      legChargeMin += est.durationMinutes;
      totalChargeMin += est.durationMinutes;
      totalChargeCost += est.costEur;
      soc = target;
      cursorProgress = item.progress;

      stopSummaries.push({
        station: item.station,
        arriveSoc: Math.round(arriveSoc),
        departSoc: Math.round(soc),
        targetSocPct: item.stop.targetSocPct,
        minutes: est.durationMinutes,
        costEur: est.costEur
      });
    }

    const remKm = Math.max(0, (1 - cursorProgress) * edge.distanceKm);
    const remKwh = (remKm / 100) * cons100;
    totalEnergyKwh += remKwh;
    soc -= (remKwh / vehicle.batteryKwh) * 100;
    minSoc = Math.min(minSoc, soc);

    if (
      (spec.citySegmentAtEnd === 'hannover_messe' || spec.destinationAtEnd) &&
      firstStopArrivalSocPct === null
    ) {
      firstStopArrivalSocPct = Math.round(soc);
      firstStopName = toCity.name;
    }
    if (spec.overnightAtEnd) dwellMinutes += 480;
    if (spec.destinationAtEnd) dwellMinutes += 18;

    const driveMin = Math.round((edge.distanceKm / Math.max(40, cruise)) * 60);

    totalDist += edge.distanceKm;
    totalDriveMin += driveMin;
    totalTolls += edge.tollEur;

    const policeRisk = policeRiskForSpeed(cruise, signLimit, edge.policeRiskBase);

    const breakdownRisk = soc < 0 || minSoc < 0;
    if (soc < 0) {
      warnings.push(`Akku leer auf Etappe ${i + 1} (${fromCity.name} → ${toCity.name})!`);
    } else if (soc < 8 && i === legs.length - 1) {
      warnings.push(`Sehr knappe Restreichweite am Ziel (${Math.round(soc)} %)!`);
    }

    if (policeRisk > 0.45 && signLimit > 0) {
      warnings.push(
        `Hohes Blitzer-Risiko auf Etappe ${i + 1} (Ø ${Math.round(cruise)} km/h bei Schild ${signLimit})!`
      );
    }

    legForecasts.push({
      legIndex: i,
      label: `${fromCity.name} → ${toCity.name}`,
      highwayName: edge.highwayName,
      distanceKm: edge.distanceKm,
      targetSpeedKmh: chosenSpeed,
      speedLimitKmh: signLimit,
      weather,
      elevationGainM: elevGain,
      elevationLossM: elevLoss,
      trafficRisk: edge.baseTrafficRisk,
      consumptionKwh100: cons100,
      startSocPct: Math.round(startSoc),
      endSocPct: Math.round(soc),
      driveMinutes: driveMin,
      chargeMinutes: legChargeMin,
      stopSummaries,
      policeRisk,
      breakdownRisk,
      cruiseKmh: Math.round(cruise)
    });
  }

  if (firstStopArrivalSocPct === null) {
    firstStopArrivalSocPct = Math.round(soc);
  }

  const subscriptionCostEur = computeSubscriptionTripCost(plan.subscriptionIds, vehicle);
  const totalMinutes = totalDriveMin + totalChargeMin + dwellMinutes;

  if (totalMinutes > level.targetArrivalMinutes + 25) {
    warnings.push(
      `Geplante Reisezeit (${Math.round(totalMinutes)} Min) überschreitet das Ziel (${level.targetArrivalMinutes} Min).`
    );
  }

  return {
    valid: minSoc > 0,
    totalDistanceKm: Math.round(totalDist),
    totalDriveMinutes: totalDriveMin,
    totalChargeMinutes: totalChargeMin,
    totalMinutes,
    estimatedChargingCostEur: Number(totalChargeCost.toFixed(2)),
    subscriptionCostEur,
    tollsEur: Number(totalTolls.toFixed(2)),
    estimatedTotalCostEur: Number((totalChargeCost + subscriptionCostEur + totalTolls).toFixed(2)),
    minSocEncountered: Math.round(minSoc),
    firstStopName,
    firstStopArrivalSocPct,
    finalArrivalSocPct: Math.round(soc),
    totalElevationGainM: Math.round(totalElevGain),
    totalElevationLossM: Math.round(totalElevLoss),
    avgTrafficRisk: totalDist > 0 ? trafficWeightedSum / totalDist : 0,
    avgConsumptionKwh100: Number(((totalEnergyKwh / Math.max(1, totalDist)) * 100).toFixed(1)),
    legForecasts,
    warnings: Array.from(new Set(warnings))
  };
}

export function predictLiveTripSoc(
  level: LevelConfig,
  run: RunState,
  opts?: {
    overrideSpeedKmh?: number;
    overrideSocPct?: number;
    skipStationId?: string;
  }
): LiveSocPrediction {
  const vehicle = getVehicleById(run.plan.vehicleId);
  const legs = getActiveRouteLegs(level, run.plan);
  let soc = opts?.overrideSocPct !== undefined ? opts.overrideSocPct : run.socPct;
  const startLeg = Math.min(legs.length - 1, Math.max(0, run.currentLegIndex));

  let distAccum = 0;
  let liveCons100 = vehicle.baseConsumption100;
  let nextTarget: { name: string; kind: 'charger' | 'turnaround' | 'destination'; distKm: number; socPct: number } | null = null;

  for (let i = startLeg; i < legs.length; i++) {
    const spec = legs[i];
    const edge = getEdgeById(spec.edgeId);
    const lp = run.plan.legPlans.find(x => x.legIndex === i);
    const weather =
      i === startLeg
        ? run.activeWeather || spec.weatherOverride || edge.defaultWeather
        : spec.weatherOverride || edge.defaultWeather;
    const preset = snapSpeedKmh(
      lp?.targetSpeedKmh || defaultLegSpeedKmh(edge, vehicle.maxSpeedKmh, weather),
      vehicle.maxSpeedKmh
    );
    const chosenSpeed =
      i === startLeg && opts?.overrideSpeedKmh !== undefined
        ? snapSpeedKmh(opts.overrideSpeedKmh, vehicle.maxSpeedKmh)
        : i === startLeg && run.currentSpeedKmh > 0
          ? Math.min(vehicle.maxSpeedKmh, run.currentSpeedKmh)
          : preset;
    const capped = drivenSpeedKmh(edge, weather, chosenSpeed);
    const speed =
      i === startLeg && run.currentSpeedKmh > 0
        ? Math.min(capped, run.currentSpeedKmh)
        : congestedCruiseKmh(capped, edge.baseTrafficRisk);

    const elevGain = spec.reverse ? edge.elevationLossM : edge.elevationGainM;
    const elevLoss = spec.reverse ? edge.elevationGainM : edge.elevationLossM;

    const cons100 = computeConsumptionKwh100(
      vehicle,
      speed,
      weather,
      elevGain,
      elevLoss,
      edge.distanceKm,
      level.trailerWeightKg || 0,
      !!run.plan.behindTruckMode
    );
    if (i === startLeg) {
      liveCons100 = cons100;
    }

    const startProgress01 =
      i === startLeg ? Math.min(1, Math.max(0, run.legProgressKm / Math.max(1, edge.distanceKm))) : 0;

    const stopsOnLeg = run.plan.plannedStops
      .filter(
        s =>
          s.legIndex === i &&
          !run.completedStopIds.includes(s.chargerId) &&
          !run.skippedStopIds.includes(s.chargerId) &&
          s.chargerId !== opts?.skipStationId
      )
      .map(s => {
        const st = getChargersForEdge(edge.id).find(c => c.id === s.chargerId);
        if (!st) return null;
        const p = spec.reverse ? 1 - st.edgeProgress : st.edgeProgress;
        return { stop: s, station: st, progress: p };
      })
      .filter((x): x is { stop: PlannedStop; station: ChargerStation; progress: number } => x !== null && x.progress > startProgress01 + 0.002)
      .sort((a, b) => a.progress - b.progress);

    let cursor = startProgress01;
    for (const item of stopsOnLeg) {
      const segKm = Math.max(0, (item.progress - cursor) * edge.distanceKm);
      const segKwh = (segKm / 100) * cons100;
      soc -= (segKwh / vehicle.batteryKwh) * 100;
      distAccum += segKm;

      if (!nextTarget) {
        nextTarget = {
          name: item.station.name,
          kind: 'charger',
          distKm: Math.max(1, Math.round(distAccum)),
          socPct: Math.round(soc)
        };
      }

      soc = Math.min(100, Math.max(soc, item.stop.targetSocPct));
      cursor = item.progress;
    }

    const remKm = Math.max(0, (1 - cursor) * edge.distanceKm);
    const remKwh = (remKm / 100) * cons100;
    soc -= (remKwh / vehicle.batteryKwh) * 100;
    distAccum += remKm;

    if (!nextTarget && (spec.citySegmentAtEnd === 'hannover_messe' || spec.destinationAtEnd || spec.overnightAtEnd)) {
      const toCity = getCityById(spec.reverse ? edge.fromCityId : edge.toCityId);
      nextTarget = {
        name: toCity.name,
        kind: 'turnaround',
        distKm: Math.max(1, Math.round(distAccum)),
        socPct: Math.round(soc)
      };
    }
  }

  const finalCity = getCityById(level.destinationCityId);
  if (!nextTarget) {
    nextTarget = {
      name: `Ziel ${finalCity.name}`,
      kind: 'destination',
      distKm: Math.max(1, Math.round(distAccum)),
      socPct: Math.round(soc)
    };
  }

  const finalSoc = Math.round(soc);
  return {
    nextStopName: nextTarget.name,
    nextStopKind: nextTarget.kind,
    distanceToNextKm: nextTarget.distKm,
    predictedArrivalNextSocPct: nextTarget.socPct,
    predictedFinalSocPct: finalSoc,
    isCriticalNext: nextTarget.socPct <= 5,
    isCriticalFinal: finalSoc <= 5,
    consumptionKwh100: liveCons100
  };
}

export function findNearestAvailableCharger(
  level: LevelConfig,
  plan: TripPlan,
  legIndex: number,
  progress01: number,
  alreadyVisitedIds: string[]
): { legIndex: number; station: ChargerStation } | null {
  const legs = getActiveRouteLegs(level, plan);
  for (let i = legIndex; i < legs.length; i++) {
    const spec = legs[i];
    const candidates = getChargersForEdge(spec.edgeId)
      .filter(c => !alreadyVisitedIds.includes(c.id))
      .map(c => {
        const p = spec.reverse ? 1 - c.edgeProgress : c.edgeProgress;
        return { station: c, p };
      })
      .filter(x => (i > legIndex ? true : x.p > progress01 + 0.03))
      .sort((a, b) => a.p - b.p);

    if (candidates.length > 0) {
      return { legIndex: i, station: candidates[0].station };
    }
  }
  return null;
}
