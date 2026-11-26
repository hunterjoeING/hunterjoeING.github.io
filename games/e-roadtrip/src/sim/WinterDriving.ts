import type { HighwayEdge, LevelConfig, RunState, VehicleSpec } from '../types';
import { computeConsumptionKwh100 } from './EnergyModel';

export const WINTER_LEVEL_ID = 'level_3_alps_winter';
export const WINTER_TIRE_CONSUMPTION = 1.02;
export const COLD_START_KM = 24;
export const COLD_START_EXTRA_CONSUMPTION = 0.15;
export const SNOWPLOUGH_SPEED_KMH = 55;
export const SNOWPLOUGH_CONSUMPTION = 0.94;
export const QUEUE_MINUTES_PER_CAR = 6;
export const TYPICAL_QUEUE_CARS = 3;

export function winterStartEffects(precondition: boolean) {
  return precondition
    ? { timeDeltaMin: 8, socDeltaPct: -3, stressDelta: -7, startsCold: false }
    : { timeDeltaMin: 0, socDeltaPct: 0, stressDelta: 9, startsCold: true };
}

export function winterRoadEnergyKwh(
  baseKwh100: number, distanceKm: number, winterTires: boolean,
  drivenKm = 0, coldStart = false, snowploughUntilKm = 0
): number {
  if (!winterTires) return baseKwh100 * (distanceKm / 100);
  const coldKm = coldStart ? Math.min(distanceKm, Math.max(0, COLD_START_KM - drivenKm)) : 0;
  const convoyKm = Math.min(distanceKm, Math.max(0, snowploughUntilKm - drivenKm));
  const coldConvoyKm = Math.min(coldKm, convoyKm);
  const adjustedKm = distanceKm + coldKm * COLD_START_EXTRA_CONSUMPTION
    - (convoyKm + coldConvoyKm * COLD_START_EXTRA_CONSUMPTION) * (1 - SNOWPLOUGH_CONSUMPTION);
  return baseKwh100 * WINTER_TIRE_CONSUMPTION * (adjustedKm / 100);
}

export function winterDetourEnergyKwh(vehicle: VehicleSpec, distanceKm: number, minutes: number, run: RunState): number {
  const consumption = computeConsumptionKwh100(vehicle, distanceKm / minutes * 60, 'snow', 0, 0, distanceKm);
  return winterRoadEnergyKwh(consumption, distanceKm, true, run.distanceDrivenKm, run.coldStart);
}

export function winterQueueCars(seed: string, visitKey: string): number {
  // Stable per trip and visit even if the scene is recreated or the frame rate changes.
  let hash = 2166136261;
  for (const character of `${seed}:${visitKey}`) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return 2 + (hash >>> 0) % 3;
}

export const WINTER_ROAD_EVENTS = {
  childCold: 'evt_child_cold',
  inntalJam: 'evt_inntal_ski_jam',
  convoy: 'evt_snowplough_convoy',
  avalanche: 'evt_avalanche_closure',
  vignette: 'evt_vignette_check'
} as const;

export function nextWinterRoadEvent(level: LevelConfig, run: RunState, edge: HighwayEdge): string | undefined {
  if (level.id !== WINTER_LEVEL_ID) return;
  const ratio = run.legProgressKm / edge.distanceKm;
  const eligible = (id: string) => level.eventPoolIds.includes(id) && !run.triggeredEventIds.includes(id);
  const events = WINTER_ROAD_EVENTS;
  if (run.coldStart && level.passengers.childrenCount > 0 && run.distanceDrivenKm >= 10 && eligible(events.childCold)) {
    return events.childCold;
  }
  if (edge.id === 'edge_muenchen_innsbruck') {
    if (ratio >= 0.53 && eligible(events.vignette)) return events.vignette;
    if (ratio >= 0.42 && eligible(events.inntalJam)) return events.inntalJam;
  }
  if (edge.isPassOption) {
    if (ratio >= 0.68 && eligible(events.avalanche)) return events.avalanche;
    if (ratio >= 0.33 && eligible(events.convoy)) return events.convoy;
  }
}
