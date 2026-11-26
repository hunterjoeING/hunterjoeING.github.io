import {
  ChargerStation,
  SubscriptionSpec,
  VehicleSpec,
  WeatherKind
} from '../types';
import { getSubscriptionById, roamingPriceForProvider } from '../data/subscriptions';

const CHARGING_ENERGY_FACTOR = 1.04;
export const CHARGE_SETUP_MINUTES = 2.5;
export const CLIMB_ENERGY_KWH_PER_M = 0.0056;

export function computeConsumptionKwh100(
  vehicle: VehicleSpec,
  speedKmh: number,
  weather: WeatherKind,
  elevationGainM: number,
  elevationLossM: number,
  distanceKm: number,
  trailerWeightKg = 0,
  behindTruck = false
): number {
  const clampedSpeed = Math.max(40, Math.min(vehicle.maxSpeedKmh, speedKmh));
  // Aerodynamic drag rises sharply above 100 km/h; slower speeds save energy
  const speedRatio = clampedSpeed / 100;
  const speedFactor =
    speedRatio >= 1
      ? 1 + (Math.pow(speedRatio, 1.82) - 1) * vehicle.aeroFactor * 0.62
      : 0.84 + 0.16 * speedRatio;

  let weatherMult = 1.0;
  if (weather === 'rain') weatherMult = 1.0 + 0.11 * vehicle.weatherSensitivity;
  else if (weather === 'fog') weatherMult = 1.0 + 0.04 * vehicle.weatherSensitivity;
  else if (weather === 'storm') weatherMult = 1.0 + 0.18 * vehicle.weatherSensitivity;
  else if (weather === 'snow') weatherMult = 1.0 + 0.28 * vehicle.weatherSensitivity;

  // Potential energy delta per 100 km (~2000 kg EV -> ~0.55 kWh per 100m climb, 60% regen on descent)
  const netGainKwhPer100 =
    distanceKm > 0
      ? ((elevationGainM * CLIMB_ENERGY_KWH_PER_M - elevationLossM * 0.0033) / distanceKm) * 100
      : 0;

  let trailerMult = 1.0;
  if (trailerWeightKg > 0) {
    trailerMult = 1.42 + (trailerWeightKg / 1500) * 0.18;
    if (behindTruck) trailerMult -= 0.14;
  }

  const raw = vehicle.baseConsumption100 * speedFactor * weatherMult * trailerMult + netGainKwhPer100;
  return Math.max(9.5, Number(raw.toFixed(2)));
}

export function isAcCharger(station: ChargerStation): boolean {
  return !!station.isAcOnly || station.maxKw <= 43;
}

export function getChargingPowerKw(
  vehicle: VehicleSpec,
  station: ChargerStation,
  socPct: number
): number {
  if (isAcCharger(station)) return Math.min(station.maxKw, vehicle.acMaxKw);
  const curve = vehicle.chargingCurve;
  const s = Math.max(0, Math.min(100, socPct));
  let carKw = curve[curve.length - 1].kw;
  for (let i = 0; i < curve.length - 1; i++) {
    const a = curve[i];
    const b = curve[i + 1];
    if (s >= a.soc && s <= b.soc) {
      const t = (s - a.soc) / Math.max(1, b.soc - a.soc);
      carKw = a.kw + (b.kw - a.kw) * t;
      break;
    }
  }
  let kw = Math.min(station.maxKw, carKw);
  if (station.network === 'tesla' && vehicle.packVoltage === 800) kw = Math.min(kw, 150);
  return kw;
}

export function measureChargeStep(vehicle: VehicleSpec, station: ChargerStation, fromSoc: number, toSoc: number) {
  const batteryKwh = vehicle.batteryKwh * (toSoc - fromSoc) / 100;
  const kw = getChargingPowerKw(vehicle, station, (fromSoc + toSoc) / 2);
  return { billedKwh: batteryKwh * CHARGING_ENERGY_FACTOR, minutes: batteryKwh / kw * 60 };
}

export interface TariffQuote {
  pricePerKwh: number;
  pricePerKwhWithoutSub: number;
  hasSubscriptionDiscount: boolean;
  usedSubscriptionName: string;
  usedSubId: string;
  hasMcDonaldsBonus: boolean;
}

/** Roaming €/kWh is fixed per provider and ignores the tariff tier (EnBW M = EnBW L). */
function roamingRate(sub: SubscriptionSpec): number {
  return roamingPriceForProvider(sub.provider) ?? sub.pricePerKwhRoaming;
}

function computeBestWithout(
  station: ChargerStation,
  subscriptionIds: string[],
  vehicle: VehicleSpec,
  excludeSubId: string
): number {
  const activeSubs: SubscriptionSpec[] = subscriptionIds
    .filter(id => id !== excludeSubId && id !== 'adhoc')
    .map(getSubscriptionById);

  let best = station.baseAdhocEurPerKwh;
  if (station.network === 'tesla' && vehicle.isTesla && excludeSubId !== 'tesla_suc') {
    best = Math.min(best, 0.39);
  }
  for (const sub of activeSubs) {
    const isOwn = sub.provider === station.network;
    const candidate = isOwn ? sub.pricePerKwhOwn : roamingRate(sub);
    if (candidate < best) best = candidate;
  }
  return Number(best.toFixed(2));
}

export function getBestPriceForStation(
  station: ChargerStation,
  subscriptionIds: string[],
  vehicle: VehicleSpec
): TariffQuote {
  const activeIds = vehicle.isTesla && !subscriptionIds.includes('tesla_suc')
    ? [...subscriptionIds, 'tesla_suc']
    : subscriptionIds;
  const activeSubs = activeIds.map(getSubscriptionById);
  let bestPrice = station.baseAdhocEurPerKwh;
  let bestName = station.network === 'ac_dorfladen' ? 'AC-Dorfladen Ad-hoc' : 'Ad-hoc Kartenzahlung';
  let bestId = 'adhoc';

  if (station.network === 'tesla' && vehicle.superchargerFree) {
    return {
      pricePerKwh: 0,
      pricePerKwhWithoutSub: station.baseAdhocEurPerKwh,
      hasSubscriptionDiscount: station.baseAdhocEurPerKwh > 0.01,
      usedSubscriptionName: 'Supercharger gratis (Model S)',
      usedSubId: 'tesla_suc',
      hasMcDonaldsBonus: false
    };
  }

  // Tesla drivers automatically unlock native Tesla Supercharger pricing!
  if (station.network === 'tesla' && vehicle.isTesla) {
    const withoutSub = computeBestWithout(station, activeIds, vehicle, 'tesla_suc');
    return {
      pricePerKwh: 0.39,
      pricePerKwhWithoutSub: withoutSub,
      hasSubscriptionDiscount: withoutSub > 0.395,
      usedSubscriptionName: 'Tesla Fahrzeug-Tarif (inklusive)',
      usedSubId: 'tesla_suc',
      hasMcDonaldsBonus: !!station.hasMcDonalds
    };
  }

  for (const sub of activeSubs) {
    if (sub.id === 'adhoc') continue;
    const isOwn = sub.provider === station.network;
    const candidatePrice = isOwn ? sub.pricePerKwhOwn : roamingRate(sub);
    if (candidatePrice < bestPrice) {
      bestPrice = candidatePrice;
      bestName = sub.name;
      bestId = sub.id;
    }
  }

  const roundedBest = Number(bestPrice.toFixed(2));
  const priceWithoutSub =
    bestId === 'adhoc'
      ? Number(station.baseAdhocEurPerKwh.toFixed(2))
      : computeBestWithout(station, activeIds, vehicle, bestId);

  return {
    pricePerKwh: roundedBest,
    pricePerKwhWithoutSub: priceWithoutSub,
    hasSubscriptionDiscount: priceWithoutSub > roundedBest + 0.005,
    usedSubscriptionName: bestName,
    usedSubId: bestId,
    hasMcDonaldsBonus: !!station.hasMcDonalds && (bestId === 'ewe_go' || station.network === 'ewego')
  };
}

export interface ChargeEstimate {
  kwhAdded: number;
  durationMinutes: number;
  avgKw: number;
  costEur: number;
  tariff: TariffQuote;
}

export function estimateChargeSession(
  vehicle: VehicleSpec,
  station: ChargerStation,
  fromSocPct: number,
  toSocPct: number,
  subscriptionIds: string[]
): ChargeEstimate {
  const start = Math.max(0, Math.min(100, fromSocPct));
  const end = Math.max(start, Math.min(100, toSocPct));
  if (end <= start) {
    const tariff = getBestPriceForStation(station, subscriptionIds, vehicle);
    return { kwhAdded: 0, durationMinutes: 0, avgKw: 0, costEur: 0, tariff };
  }
  let totalMinutes = 0;
  let totalKwh = 0;

  // Integrate piecewise 1% SoC chunks
  for (let s = start; s < end; s += 1) {
    const step = measureChargeStep(vehicle, station, s, Math.min(end, s + 1));
    totalKwh += step.billedKwh;
    totalMinutes += step.minutes;
  }

  // Add ~2.5 min plug-in / ramp-up overhead
  const tariff = getBestPriceForStation(station, subscriptionIds, vehicle);
  const costEur = totalKwh * tariff.pricePerKwh;
  const avgKw = totalKwh / Math.max(0.05, totalMinutes / 60);

  return {
    kwhAdded: Number(totalKwh.toFixed(1)),
    durationMinutes: Math.round(totalMinutes + CHARGE_SETUP_MINUTES),
    avgKw: Math.round(avgKw),
    costEur: Number(costEur.toFixed(2)),
    tariff
  };
}

/** AC-Ladung mit fester Ladezeit während eines Aufenthalts. */
export function estimateAcWindow(vehicle: VehicleSpec, maxKw: number, fromSocPct: number, minutes: number, capSocPct: number) {
  const kw = Math.min(maxKw, vehicle.acMaxKw);
  const kwhPerPct = vehicle.batteryKwh / 100;
  const wantedKwh = Math.max(0, Math.min(100, capSocPct) - fromSocPct) * kwhPerPct;
  const batteryKwh = Math.min(wantedKwh, kw * minutes / 60);
  return {
    departSoc: fromSocPct + batteryKwh / kwhPerPct,
    durationMinutes: kw > 0 ? Math.round(batteryKwh / kw * 60) : 0,
    billedKwh: batteryKwh * CHARGING_ENERGY_FACTOR
  };
}

export function estimateTimedAcCharge(
  vehicle: VehicleSpec,
  station: ChargerStation,
  fromSocPct: number,
  minutes: number,
  capSocPct: number,
  subscriptionIds: string[]
) {
  const session = estimateAcWindow(vehicle, station.maxKw, fromSocPct, fromSocPct > 0 ? minutes : 0, capSocPct);
  const tariff = getBestPriceForStation(station, subscriptionIds, vehicle);
  return {
    departSoc: session.departSoc,
    durationMinutes: session.durationMinutes,
    kwhAdded: Number(session.billedKwh.toFixed(1)),
    costEur: Number((session.billedKwh * tariff.pricePerKwh).toFixed(2))
  };
}

export function computeSubscriptionTripCost(
  subscriptionIds: string[],
  vehicle: VehicleSpec
): number {
  let sum = 0;
  for (const id of subscriptionIds) {
    const sub = getSubscriptionById(id);
    if (sub.id === 'tesla_suc' && vehicle.isTesla) continue;
    sum += sub.tripShareFeeEur;
  }
  return Number(sum.toFixed(2));
}
