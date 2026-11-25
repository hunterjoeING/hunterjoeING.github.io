import {
  ChargerStation,
  CityDrivePreset,
  HighwayEdge,
  LevelConfig,
  LevelRouteLegSpec,
  LiveSocPrediction,
  PlannedStop,
  RouteOption,
  RunState,
  TripPlan,
  VehicleSpec
} from '../types';
import { getVehicleById } from '../data/vehicles';
import { getChargerById, getChargersForEdge, getCityById, getEdgeById } from '../data/europeMap';
import {
  computeConsumptionKwh100,
  computeSubscriptionTripCost,
  estimateAcWindow,
  estimateChargeSession,
  estimateTimedAcCharge
} from './EnergyModel';
import { HOTEL_AC } from '../data/events';

export const MESSE_VISIT_MINUTES = 240;
export const MESSE_CHARGE_MINUTES = 210;
export const CITY_TRANSITION_MINUTES: Partial<Record<CityDrivePreset, number>> = { aachen_start: 7, koeln_ring: 6 };
export const NO_REACHABLE_CHARGER = 'Kein zusätzlicher Ladepunkt auf der Route mit dem aktuellen Akku erreichbar.';

export function stopKey(legIndex: number, chargerId: string): string {
  return `${legIndex}:${chargerId}`;
}

export function isPendingStop(run: RunState, stop: PlannedStop): boolean {
  const key = stopKey(stop.legIndex, stop.chargerId);
  return !run.completedStopKeys.includes(key) && !run.skippedStopKeys.includes(key);
}

function isMesseVisit(leg: LevelRouteLegSpec): boolean {
  return !leg.reverse && leg.citySegmentAtEnd === 'hannover_messe';
}

export function isStationOnLeg(station: ChargerStation, leg?: LevelRouteLegSpec): boolean {
  return !!leg && station.edgeId === leg.edgeId && (!station.fairStay || isMesseVisit(leg));
}

export function getMapChargerLegIndex(station: ChargerStation, legs: LevelRouteLegSpec[], selectedLegIndex: number): number {
  const selectedLeg = legs[selectedLegIndex];
  if (selectedLeg?.edgeId === station.edgeId) {
    return isStationOnLeg(station, selectedLeg) ? selectedLegIndex : -1;
  }
  return legs.findIndex(leg => isStationOnLeg(station, leg));
}

export function getMesseChargerForVisit(leg?: LevelRouteLegSpec): ChargerStation | undefined {
  if (!leg || !isMesseVisit(leg)) return undefined;
  return getChargersForEdge(leg.edgeId).find(station => station.fairStay);
}

export function plannedMesseStopOnLeg(plan: TripPlan, leg: LevelRouteLegSpec, legIndex: number) {
  const station = getMesseChargerForVisit(leg);
  const stop = station && plan.plannedStops.find(s => s.legIndex === legIndex && s.chargerId === station.id);
  return station && stop ? { station, stop } : undefined;
}

export function estimateMesseCharge(
  vehicle: VehicleSpec, station: ChargerStation, arrivalSoc: number, targetSoc: number, subscriptionIds: string[]
) {
  return estimateTimedAcCharge(vehicle, station, arrivalSoc, MESSE_CHARGE_MINUTES, targetSoc, subscriptionIds);
}

export function estimateHotelCharge(vehicle: VehicleSpec, arrivalSoc: number) {
  return estimateAcWindow(vehicle, HOTEL_AC.maxKw, arrivalSoc, HOTEL_AC.stayMinutes, HOTEL_AC.targetSocPct);
}

export function plannedRoadStopsOnLeg(plan: TripPlan, leg: LevelRouteLegSpec, legIndex: number) {
  return plan.plannedStops.flatMap(stop => {
    if (stop.legIndex !== legIndex) return [];
    const station = getChargerById(stop.chargerId);
    if (!station || station.edgeId !== leg.edgeId || station.fairStay) return [];
    return [{ stop, station, progress: leg.reverse ? 1 - station.edgeProgress : station.edgeProgress }];
  }).sort((a, b) => a.progress - b.progress);
}

export interface RouteSocSection {
  fromProgress: number;
  toProgress: number;
  startSocPct: number;
  endSocPct: number;
  reachableStart: boolean;
}

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
  socSections: RouteSocSection[];
  driveMinutes: number;
  chargeMinutes: number;
  stopSummaries: Array<{
    station: ChargerStation;
    arriveSoc: number;
    departSoc: number;
    targetSocPct: number;
    minutes: number;
    costEur: number;
    blockedDepartSoc?: number;
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
  withoutMesseCharge?: { finalSocPct: number; reachable: boolean };
  hotelAc?: { legIndex: number; arriveSoc: number; departSoc: number; minutes: number; finalSocPct: number; reachable: boolean };
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

export function highwaySection(
  edge: HighwayEdge, reverse: boolean, progressKm: number, weather?: string,
  countryLimitKmh?: number, workLimitKmh?: number
): { country: string; signKmh: number; endKm: number } {
  const sections = edge.roadSections;
  if (!sections) {
    const regularSign = activeSignKmh(edge, weather, countryLimitKmh);
    return {
      country: getCityById(edge.fromCityId).country,
      signKmh: workLimitKmh ? Math.min(regularSign || Infinity, workLimitKmh) : regularSign,
      endKm: edge.distanceKm
    };
  }
  let section = sections[0];
  let endKm = edge.distanceKm;
  for (let i = 0; i < sections.length; i++) {
    const from = sections[i].fromKm;
    const to = sections[i + 1]?.fromKm ?? edge.distanceKm;
    const start = reverse ? edge.distanceKm - to : from;
    const end = reverse ? edge.distanceKm - from : to;
    if (progressKm >= start && (progressKm < end || end === edge.distanceKm)) {
      section = sections[i];
      endKm = end;
      break;
    }
  }
  const regularSign = activeSignKmh(section, weather, countryLimitKmh);
  const signKmh = workLimitKmh ? Math.min(regularSign || Infinity, workLimitKmh) : regularSign;
  return { country: section.country, signKmh, endKm };
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
  let socWithoutMesseCharge: number | undefined;
  let hotelAc: PlanForecast['hotelAc'];
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
  let dwellMinutes = 0;

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

    const stopsOnLeg = plannedRoadStopsOnLeg(plan, spec, i);

    const startSoc = soc;
    let cursorProgress = 0;
    let legChargeMin = 0;
    const stopSummaries: LegForecast['stopSummaries'] = [];
    const socSections: RouteSocSection[] = [];

    const driveTo = (progress: number) => {
      const segKm = Math.max(0, (progress - cursorProgress) * edge.distanceKm);
      const segKwh = (segKm / 100) * cons100;
      totalEnergyKwh += segKwh;
      const usedSoc = (segKwh / vehicle.batteryKwh) * 100;
      if (segKm > 0) {
        socSections.push({
          fromProgress: cursorProgress,
          toProgress: progress,
          startSocPct: soc,
          endSocPct: soc - usedSoc,
          reachableStart: minSoc > 0
        });
      }
      cursorProgress = progress;
      soc -= usedSoc;
      if (socWithoutMesseCharge !== undefined) socWithoutMesseCharge -= usedSoc;
      if (hotelAc) hotelAc.finalSocPct -= usedSoc;
      minSoc = Math.min(minSoc, soc);
    };

    for (const item of stopsOnLeg) {
      driveTo(item.progress);
      if (socWithoutMesseCharge !== undefined) {
        if (socWithoutMesseCharge > 0) {
          socWithoutMesseCharge = Math.min(100, Math.max(socWithoutMesseCharge, item.stop.targetSocPct));
        }
      }
      if (hotelAc && hotelAc.finalSocPct > 0) {
        hotelAc.finalSocPct = Math.min(100, Math.max(hotelAc.finalSocPct, item.stop.targetSocPct));
      }

      const arriveSoc = soc;
      if (firstStopArrivalSocPct === null) {
        firstStopArrivalSocPct = Math.round(arriveSoc);
        firstStopName = item.station.name;
      }

      if (arriveSoc <= 0) {
        warnings.push(`Liegenbleiber vor „${item.station.name}“ auf Etappe ${i + 1}!`);
      }

      const target = Math.min(100, Math.max(arriveSoc, item.stop.targetSocPct));
      let chargeMinutes = 0;
      let chargeCost = 0;
      if (target > Math.max(0, arriveSoc)) {
        const est = estimateChargeSession(
          vehicle,
          item.station,
          Math.max(0, arriveSoc),
          target,
          plan.subscriptionIds
        );
        chargeMinutes = est.durationMinutes;
        chargeCost = est.costEur;
        legChargeMin += est.durationMinutes;
        totalChargeMin += est.durationMinutes;
        totalChargeCost += est.costEur;
        soc = target;
      }

      stopSummaries.push({
        station: item.station,
        arriveSoc: Math.round(arriveSoc),
        departSoc: Math.round(soc),
        targetSocPct: item.stop.targetSocPct,
        minutes: chargeMinutes,
        costEur: chargeCost
      });
    }

    driveTo(1);

    if (
      (spec.citySegmentAtEnd === 'hannover_messe' || spec.destinationAtEnd) &&
      firstStopArrivalSocPct === null
    ) {
      firstStopArrivalSocPct = Math.round(soc);
      firstStopName = toCity.name;
    }
    if (isMesseVisit(spec)) {
      dwellMinutes += MESSE_VISIT_MINUTES;
      const messe = plannedMesseStopOnLeg(plan, spec, i);
      if (messe) {
        const { station, stop } = messe;
        const arriveSoc = soc;
        const session = estimateMesseCharge(vehicle, station, arriveSoc, stop.targetSocPct, plan.subscriptionIds);
        socWithoutMesseCharge = arriveSoc;
        soc = session.departSoc;
        totalChargeCost += session.costEur;
        stopSummaries.push({
          station,
          arriveSoc: Math.round(arriveSoc),
          departSoc: Math.round(soc),
          blockedDepartSoc: Math.round(arriveSoc),
          targetSocPct: stop.targetSocPct,
          minutes: session.durationMinutes,
          costEur: session.costEur
        });
      }
    }
    if (spec.overnightAtEnd) {
      dwellMinutes += HOTEL_AC.stayMinutes;
      if (minSoc > 0) {
        const charge = estimateHotelCharge(vehicle, soc);
        hotelAc = {
          legIndex: i, arriveSoc: soc, departSoc: charge.departSoc,
          minutes: charge.durationMinutes, finalSocPct: charge.departSoc, reachable: true
        };
      }
    }
    if (spec.destinationAtEnd) dwellMinutes += 18;

    const startCityMin = i === 0 && spec.citySegmentAtStart ? CITY_TRANSITION_MINUTES[spec.citySegmentAtStart] ?? 0 : 0;
    const endCityMin = spec.citySegmentAtEnd ? CITY_TRANSITION_MINUTES[spec.citySegmentAtEnd] ?? 0 : 0;
    const driveMin = Math.round((edge.distanceKm / Math.max(40, cruise)) * 60) + startCityMin + endCityMin;

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
      socSections,
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
  if (socWithoutMesseCharge !== undefined && socWithoutMesseCharge <= 0 && minSoc > 0) {
    warnings.push('Sind alle Messe-Ladepunkte belegt, reicht der Akku mit diesem Plan nicht bis zum Ziel.');
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
    hotelAc: hotelAc && { ...hotelAc, reachable: hotelAc.finalSocPct > 0 },
    withoutMesseCharge: socWithoutMesseCharge === undefined ? undefined : {
      finalSocPct: Math.round(socWithoutMesseCharge),
      reachable: socWithoutMesseCharge > 0 && minSoc > 0
    },
    totalElevationGainM: Math.round(totalElevGain),
    totalElevationLossM: Math.round(totalElevLoss),
    avgTrafficRisk: totalDist > 0 ? trafficWeightedSum / totalDist : 0,
    avgConsumptionKwh100: Number(((totalEnergyKwh / Math.max(1, totalDist)) * 100).toFixed(1)),
    legForecasts,
    warnings: Array.from(new Set(warnings))
  };
}

function liveLegConsumption(
  level: LevelConfig,
  run: RunState,
  spec: LevelRouteLegSpec,
  edge: HighwayEdge,
  vehicle: VehicleSpec,
  legIndex: number,
  overrideSpeedKmh?: number
): number {
  const isCurrentLeg = legIndex === run.currentLegIndex;
  const lp = run.plan.legPlans.find(x => x.legIndex === legIndex);
  const weather =
    isCurrentLeg
      ? run.activeWeather || spec.weatherOverride || edge.defaultWeather
      : spec.weatherOverride || edge.defaultWeather;
  const preset = snapSpeedKmh(
    lp?.targetSpeedKmh || defaultLegSpeedKmh(edge, vehicle.maxSpeedKmh, weather),
    vehicle.maxSpeedKmh
  );
  const chosenSpeed =
    isCurrentLeg && overrideSpeedKmh !== undefined
      ? snapSpeedKmh(overrideSpeedKmh, vehicle.maxSpeedKmh)
      : isCurrentLeg && run.currentSpeedKmh > 0
        ? Math.min(vehicle.maxSpeedKmh, run.currentSpeedKmh)
        : preset;
  const capped = drivenSpeedKmh(edge, weather, chosenSpeed);
  const speed =
    isCurrentLeg && run.currentSpeedKmh > 0
      ? Math.min(capped, run.currentSpeedKmh)
      : congestedCruiseKmh(capped, edge.baseTrafficRisk);

  const elevGain = spec.reverse ? edge.elevationLossM : edge.elevationGainM;
  const elevLoss = spec.reverse ? edge.elevationGainM : edge.elevationLossM;

  return computeConsumptionKwh100(
    vehicle,
    speed,
    weather,
    elevGain,
    elevLoss,
    edge.distanceKm,
    level.trailerWeightKg || 0,
    !!run.plan.behindTruckMode
  );
}

export function predictLiveTripSoc(
  level: LevelConfig,
  run: RunState,
  opts?: {
    overrideSpeedKmh?: number;
    overrideSocPct?: number;
    skipStopKey?: string;
  }
): LiveSocPrediction {
  const vehicle = getVehicleById(run.plan.vehicleId);
  const legs = getActiveRouteLegs(level, run.plan);
  let soc = opts?.overrideSocPct !== undefined ? opts.overrideSocPct : run.socPct;
  let socWithoutMesseCharge: number | undefined;
  const startLeg = Math.min(legs.length - 1, Math.max(0, run.currentLegIndex));

  let distAccum = 0;
  let liveCons100 = vehicle.baseConsumption100;
  let nextTarget: { name: string; kind: 'charger' | 'turnaround' | 'destination'; distKm: number; socPct: number } | null = null;

  for (let i = startLeg; i < legs.length; i++) {
    const spec = legs[i];
    const edge = getEdgeById(spec.edgeId);
    const cons100 = liveLegConsumption(level, run, spec, edge, vehicle, i, opts?.overrideSpeedKmh);
    if (i === startLeg) {
      liveCons100 = cons100;
    }

    const startProgress01 =
      i === startLeg ? Math.min(1, Math.max(0, run.legProgressKm / Math.max(1, edge.distanceKm))) : 0;

    const stopsOnLeg = plannedRoadStopsOnLeg(run.plan, spec, i)
      .filter(({ stop, progress }) =>
        progress > startProgress01 &&
        isPendingStop(run, stop) &&
        stopKey(i, stop.chargerId) !== opts?.skipStopKey
      );

    let cursor = startProgress01;
    for (const item of stopsOnLeg) {
      const segKm = Math.max(0, (item.progress - cursor) * edge.distanceKm);
      const segKwh = (segKm / 100) * cons100;
      const usedSoc = (segKwh / vehicle.batteryKwh) * 100;
      soc -= usedSoc;
      if (socWithoutMesseCharge !== undefined) {
        socWithoutMesseCharge -= usedSoc;
        if (socWithoutMesseCharge > 0) {
          socWithoutMesseCharge = Math.min(100, Math.max(socWithoutMesseCharge, item.stop.targetSocPct));
        }
      }
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
    const remSoc = (remKwh / vehicle.batteryKwh) * 100;
    soc -= remSoc;
    if (socWithoutMesseCharge !== undefined) socWithoutMesseCharge -= remSoc;
    distAccum += remKm;

    if (!nextTarget && (isMesseVisit(spec) || spec.destinationAtEnd || spec.overnightAtEnd)) {
      const toCity = getCityById(spec.reverse ? edge.fromCityId : edge.toCityId);
      nextTarget = {
        name: toCity.name,
        kind: 'turnaround',
        distKm: Math.max(1, Math.round(distAccum)),
        socPct: Math.round(soc)
      };
    }

    const messe = plannedMesseStopOnLeg(run.plan, spec, i);
    if (messe && isPendingStop(run, messe.stop)) {
      const { station, stop } = messe;
      socWithoutMesseCharge = soc;
      soc = estimateMesseCharge(vehicle, station, soc, stop.targetSocPct, run.plan.subscriptionIds).departSoc;
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
    predictedFinalSocWithoutMessePct: socWithoutMesseCharge === undefined ? undefined : Math.round(socWithoutMesseCharge),
    isCriticalNext: nextTarget.socPct <= 5,
    isCriticalFinal: finalSoc <= 5,
    consumptionKwh100: liveCons100
  };
}

export function findReachableAdditionalStop(
  level: LevelConfig,
  run: RunState
): { legIndex: number; station: ChargerStation } | null {
  const legs = getActiveRouteLegs(level, run.plan);
  const vehicle = getVehicleById(run.plan.vehicleId);
  const planned = new Map(run.plan.plannedStops.map(stop => [stopKey(stop.legIndex, stop.chargerId), stop]));
  let soc = run.socPct;

  for (let i = run.currentLegIndex; i < legs.length; i++) {
    const spec = legs[i];
    const edge = getEdgeById(spec.edgeId);
    const socPerKm = liveLegConsumption(level, run, spec, edge, vehicle, i) / vehicle.batteryKwh;
    let cursorKm = i === run.currentLegIndex ? Math.min(edge.distanceKm, run.legProgressKm) : 0;
    const candidates = getChargersForEdge(spec.edgeId)
      .filter(station => !station.fairStay)
      .map(station => ({ station, km: (spec.reverse ? 1 - station.edgeProgress : station.edgeProgress) * edge.distanceKm }))
      .filter(({ km }) => km > cursorKm)
      .sort((a, b) => a.km - b.km);

    for (const { station, km } of candidates) {
      const key = stopKey(i, station.id);
      if (run.completedStopKeys.includes(key) || run.skippedStopKeys.includes(key)) continue;
      soc -= (km - cursorKm) * socPerKm;
      if (soc <= 0.15) return null;

      const stop = planned.get(key);
      if (!stop) return { legIndex: i, station };

      soc = Math.min(100, Math.max(soc, stop.targetSocPct));
      cursorKm = km;
    }

    soc -= (edge.distanceKm - cursorKm) * socPerKm;
    if (soc <= 0.15) return null;
  }
  return null;
}
