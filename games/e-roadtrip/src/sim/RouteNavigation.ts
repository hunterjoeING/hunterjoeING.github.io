import { getCityById, getEdgeById } from '../data/europeMap';
import { getVehicleById } from '../data/vehicles';
import type { LevelConfig, LevelRouteLegSpec, RunState } from '../types';
import {
  CITY_TRANSITION_MINUTES, congestedCruiseKmh, defaultLegSpeedKmh, getActiveRouteLegs,
  isPendingStop, plannedRoadStopsOnLeg, snapSpeedKmh
} from './RoutePlanner';

interface NavigationSegment {
  highwayName: string;
  from: string;
  to: string;
  remainingKm: number;
  current: boolean;
}

interface RemainingRoute {
  destination: string;
  segments: NavigationSegment[];
  remainingKm: number;
  etaMinutes: number;
}

function stageDestination(run: RunState, leg: LevelRouteLegSpec, index: number, city: string): string | undefined {
  if (leg.citySegmentAtEnd === 'hannover_messe') return 'Hannover Messe';
  if (leg.overnightAtEnd && !run.triggeredEventIds.includes(`evt_hotel_overnight@${index}`)) return `Übernachtung · ${city}`;
  if (leg.destinationAtEnd && !run.triggeredEventIds.includes(`evt_south_arrival@${index}`)) return city;
  if (leg.citySegmentAtEnd === 'ferry_denmark') return `Fährterminal · ${city}`;
  if (leg.citySegmentAtEnd === 'aachen_finish') return city;
  return undefined;
}

export function buildRemainingRoute(level: LevelConfig, run: RunState): RemainingRoute {
  const legs = getActiveRouteLegs(level, run.plan);
  const vehicle = getVehicleById(run.plan.vehicleId);
  const route: RemainingRoute = { destination: '', segments: [], remainingKm: 0, etaMinutes: 0 };

  for (let index = run.currentLegIndex; index < legs.length; index++) {
    const leg = legs[index];
    const edge = getEdgeById(leg.edgeId);
    const current = index === run.currentLegIndex;
    const from = getCityById(leg.reverse ? edge.toCityId : edge.fromCityId).name;
    const to = getCityById(leg.reverse ? edge.fromCityId : edge.toCityId).name;
    const startKm = current ? Math.max(0, Math.min(edge.distanceKm, run.legProgressKm)) : 0;
    const charger = plannedRoadStopsOnLeg(run.plan, leg, index).find(({ stop, progress }) =>
      progress * edge.distanceKm >= startKm && isPendingStop(run, stop)
    );
    const endKm = charger ? charger.progress * edge.distanceKm : edge.distanceKm;
    const remainingKm = endKm - startKm;
    const destination = charger?.station.name ?? stageDestination(run, leg, index, to) ??
      (index === legs.length - 1 ? to : undefined);

    if (remainingKm > 0 || destination) {
      route.segments.push({ highwayName: edge.highwayName, from, to: charger?.station.name ?? to, remainingKm, current });
    }
    route.remainingKm += remainingKm;

    const weather = current ? run.activeWeather : leg.weatherOverride ?? edge.defaultWeather;
    const setSpeed = run.plan.legPlans.find(plan => plan.legIndex === index)?.targetSpeedKmh ??
      defaultLegSpeedKmh(edge, vehicle.maxSpeedKmh, weather);
    const cruise = congestedCruiseKmh(snapSpeedKmh(setSpeed, vehicle.maxSpeedKmh), edge.baseTrafficRisk);
    const cap = current ? run.speedCapKmh ?? run.countryLimitKmh : undefined;
    const etaSpeed = cap && cap > 0 ? Math.min(cap, cruise) : cruise;
    route.etaMinutes += remainingKm / etaSpeed * 60;
    if (!charger && leg.citySegmentAtEnd) {
      route.etaMinutes += CITY_TRANSITION_MINUTES[leg.citySegmentAtEnd] ?? 0;
    }

    if (destination) {
      route.destination = destination;
      break;
    }
  }

  return route;
}
