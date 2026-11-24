import {
  ChargerStation,
  SubscriptionSpec,
  VehicleSpec,
  WeatherKind
} from '../types';
import { getSubscriptionById, roamingPriceForProvider } from '../data/subscriptions';

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
      ? ((elevationGainM * 0.0056 - elevationLossM * 0.0033) / distanceKm) * 100
      : 0;

  let trailerMult = 1.0;
  if (trailerWeightKg > 0) {
    trailerMult = 1.42 + (trailerWeightKg / 1500) * 0.18;
    if (behindTruck) trailerMult -= 0.14;
  }

  const raw = vehicle.baseConsumption100 * speedFactor * weatherMult * trailerMult + netGainKwhPer100;
  return Math.max(9.5, Number(raw.toFixed(2)));
}

export function getChargingPowerKw(
  vehicle: VehicleSpec,
  station: ChargerStation,
  socPct: number
): number {
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
  return Math.max(5, Math.min(station.maxKw, carKw));
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
  const activeSubs: SubscriptionSpec[] = subscriptionIds.map(getSubscriptionById);
  let bestPrice = station.baseAdhocEurPerKwh;
  let bestName = station.network === 'ac_dorfladen' ? 'AC-Dorfladen Ad-hoc' : 'Ad-hoc Kartenzahlung';
  let bestId = 'adhoc';

  // Tesla drivers automatically unlock native Tesla Supercharger pricing!
  if (station.network === 'tesla' && vehicle.isTesla) {
    const withoutSub = computeBestWithout(station, subscriptionIds, vehicle, 'tesla_suc');
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
      : computeBestWithout(station, subscriptionIds, vehicle, bestId);

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
  const start = Math.max(0, Math.min(99, fromSocPct));
  const end = Math.max(start + 1, Math.min(100, toSocPct));
  let totalMinutes = 0;
  let totalKwh = 0;

  // Integrate piecewise 1% SoC chunks
  const kwhPerPct = vehicle.batteryKwh / 100;
  for (let s = start; s < end; s += 1) {
    const step = Math.min(1, end - s);
    const midSoc = s + step * 0.5;
    const kw = getChargingPowerKw(vehicle, station, midSoc);
    const kwhStep = kwhPerPct * step;
    // Slight charger overhead (4%)
    totalKwh += kwhStep * 1.04;
    totalMinutes += (kwhStep / kw) * 60;
  }

  // Add ~2.5 min plug-in / ramp-up overhead
  totalMinutes += 2.5;
  const tariff = getBestPriceForStation(station, subscriptionIds, vehicle);
  const costEur = totalKwh * tariff.pricePerKwh;
  const avgKw = totalKwh / Math.max(0.05, (totalMinutes - 2.5) / 60);

  return {
    kwhAdded: Number(totalKwh.toFixed(1)),
    durationMinutes: Math.round(totalMinutes),
    avgKw: Math.round(avgKw),
    costEur: Number(costEur.toFixed(2)),
    tariff
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
