import {
  ChargerStation,
  LevelConfig,
  PlannedStop,
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
  consumptionKwh100: number;
  startSocPct: number;
  endSocPct: number;
  driveMinutes: number;
  chargeMinutes: number;
  stopSummaries: Array<{
    station: ChargerStation;
    arriveSoc: number;
    departSoc: number;
    minutes: number;
    costEur: number;
  }>;
  policeRisk: number;
  breakdownRisk: boolean;
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
  avgConsumptionKwh100: number;
  legForecasts: LegForecast[];
  warnings: string[];
}

export function createDefaultPlan(level: LevelConfig, vehicleId: string): TripPlan {
  const vehicle = getVehicleById(vehicleId);
  const legPlans = level.routeLegs.map((leg, idx) => ({
    legIndex: idx,
    targetSpeedKmh: Math.min(vehicle.maxSpeedKmh, leg.defaultTargetSpeedKmh)
  }));

  // Pre-seed sensible Level 1 stops so first-time players see an editable working plan
  const plannedStops: PlannedStop[] = [];
  if (level.id === 'level_1_aachen_hannover') {
    plannedStops.push(
      { chargerId: 'chg_kamen_tesla', legIndex: 2, targetSocPct: 80 },
      { chargerId: 'chg_hannover_enbw', legIndex: 3, targetSocPct: 78 },
      { chargerId: 'chg_kamen_enbw', legIndex: 6, targetSocPct: 80 }
    );
  }

  const subscriptionIds = vehicle.isTesla
    ? ['tesla_suc', 'ewe_go']
    : ['enbw_m', 'ewe_go'];

  return {
    vehicleId,
    subscriptionIds,
    legPlans,
    plannedStops
  };
}

export function evaluateTripPlan(level: LevelConfig, plan: TripPlan): PlanForecast {
  const vehicle = getVehicleById(plan.vehicleId);
  let soc = 96; // Start at 96% at Aachen Dom / Start city
  let minSoc = soc;
  let totalDist = 0;
  let totalDriveMin = 0;
  let totalChargeMin = 0;
  let totalChargeCost = 0;
  let totalTolls = 0;
  let totalEnergyKwh = 0;
  const warnings: string[] = [];
  const legForecasts: LegForecast[] = [];

  for (let i = 0; i < level.routeLegs.length; i++) {
    const spec = level.routeLegs[i];
    const edge = getEdgeById(spec.edgeId);
    const lp = plan.legPlans.find(x => x.legIndex === i);
    const speed = Math.min(vehicle.maxSpeedKmh, lp ? lp.targetSpeedKmh : spec.defaultTargetSpeedKmh);
    const weather = spec.weatherOverride || edge.defaultWeather;

    const fromCity = getCityById(spec.reverse ? edge.toCityId : edge.fromCityId);
    const toCity = getCityById(spec.reverse ? edge.fromCityId : edge.toCityId);

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
      if (arriveSoc <= 0) {
        warnings.push(`Liegenbleiber vor „${item.station.name}“ auf Etappe ${i + 1}!`);
      }

      const target = Math.max(arriveSoc + 5, item.stop.targetSocPct);
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
      soc = Math.min(100, target);
      cursorProgress = item.progress;

      stopSummaries.push({
        station: item.station,
        arriveSoc: Math.round(arriveSoc),
        departSoc: Math.round(soc),
        minutes: est.durationMinutes,
        costEur: est.costEur
      });
    }

    const remKm = Math.max(0, (1 - cursorProgress) * edge.distanceKm);
    const remKwh = (remKm / 100) * cons100;
    totalEnergyKwh += remKwh;
    soc -= (remKwh / vehicle.batteryKwh) * 100;
    minSoc = Math.min(minSoc, soc);

    // Effective average speed slightly lower than target due to junctions/traffic
    const effectiveAvg = speed * 0.91;
    const driveMin = Math.round((edge.distanceKm / Math.max(40, effectiveAvg)) * 60);

    totalDist += edge.distanceKm;
    totalDriveMin += driveMin;
    totalTolls += edge.tollEur;

    const policeRisk =
      edge.speedLimitKmh > 0 && speed > edge.speedLimitKmh + 8
        ? Math.min(0.95, edge.policeRiskBase + (speed - edge.speedLimitKmh) * 0.015)
        : speed > 145
          ? edge.policeRiskBase * 0.85
          : edge.policeRiskBase * 0.25;

    const breakdownRisk = soc < 0 || minSoc < 0;
    if (soc < 0) {
      warnings.push(`Akku leer auf Etappe ${i + 1} (${fromCity.name} → ${toCity.name})!`);
    } else if (soc < 8 && i === level.routeLegs.length - 1) {
      warnings.push(`Sehr knappe Restreichweite am Ziel (${Math.round(soc)} %)!`);
    }

    if (policeRisk > 0.45) {
      warnings.push(`Hohes Blitzer-Risiko auf Etappe ${i + 1} (${speed} km/h)!`);
    }

    legForecasts.push({
      legIndex: i,
      label: `${fromCity.name} → ${toCity.name}`,
      highwayName: edge.highwayName,
      distanceKm: edge.distanceKm,
      targetSpeedKmh: speed,
      speedLimitKmh: edge.speedLimitKmh,
      weather,
      consumptionKwh100: cons100,
      startSocPct: Math.round(startSoc),
      endSocPct: Math.round(soc),
      driveMinutes: driveMin,
      chargeMinutes: legChargeMin,
      stopSummaries,
      policeRisk,
      breakdownRisk
    });
  }

  const subscriptionCostEur = computeSubscriptionTripCost(plan.subscriptionIds, vehicle);
  const turnaroundMin = level.id === 'level_1_aachen_hannover' ? 28 : 0;
  const totalMinutes = totalDriveMin + totalChargeMin + turnaroundMin;

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
    avgConsumptionKwh100: Number(((totalEnergyKwh / Math.max(1, totalDist)) * 100).toFixed(1)),
    legForecasts,
    warnings: Array.from(new Set(warnings))
  };
}

export function findNearestAvailableCharger(
  level: LevelConfig,
  legIndex: number,
  progress01: number,
  alreadyVisitedIds: string[]
): { legIndex: number; station: ChargerStation } | null {
  for (let i = legIndex; i < level.routeLegs.length; i++) {
    const spec = level.routeLegs[i];
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
