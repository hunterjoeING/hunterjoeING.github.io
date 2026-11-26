import type { ChargerStation, LevelConfig, PlannedStop, RunState } from '../types';
import { getChargersForEdge, getEdgeById } from '../data/europeMap';
import { evaluateStopSkip, getActiveRouteLegs, stopKey } from './RoutePlanner';

export const WINTER_ALTERNATIVE_MAX_KM = 5;
export const WINTER_ALTERNATIVE_RESERVE_PCT = 2;

export function findWinterQueueAlternative(
  level: LevelConfig, run: RunState, stop: PlannedStop, queuedStation: ChargerStation
): { station: ChargerStation; stop: PlannedStop } | undefined {
  const spec = getActiveRouteLegs(level, run.plan)[stop.legIndex];
  if (!spec || spec.edgeId !== queuedStation.edgeId) return;
  const edge = getEdgeById(spec.edgeId);
  const candidates = getChargersForEdge(edge.id)
    .map(station => ({
      station,
      kmAhead: (spec.reverse ? 1 - station.edgeProgress : station.edgeProgress) * edge.distanceKm - run.legProgressKm
    }))
    .filter(({ station, kmAhead }) =>
      !station.winterQueue && !station.fairStay && station.maxKw < queuedStation.maxKw &&
      kmAhead > 0 && kmAhead <= WINTER_ALTERNATIVE_MAX_KM
    )
    .sort((a, b) => a.kmAhead - b.kmAhead);

  for (const { station } of candidates) {
    const key = stopKey(stop.legIndex, station.id);
    if (run.skippedStopKeys.includes(key) || run.completedStopKeys.includes(key)) continue;
    const alternative = run.plan.plannedStops.find(s => stopKey(s.legIndex, s.chargerId) === key)
      ?? { ...stop, chargerId: station.id };
    // Forecast directly to the alternative without relying on charging at any other stop.
    const directRun = { ...run, plan: { ...run.plan, plannedStops: [stop, alternative] } };
    const { projectedSocPct } = evaluateStopSkip(level, directRun, stop);
    if (projectedSocPct !== null && projectedSocPct >= WINTER_ALTERNATIVE_RESERVE_PCT) {
      return { station, stop: alternative };
    }
  }
}
