import type { LevelRouteLegSpec } from '../types';
import { WINTER_LEVEL_ID } from './WinterDriving';

export const WINTER_TUNNEL = {
  edgeId: 'edge_kufstein_innsbruck',
  approachKm: 42,
  startKm: 45,
  endKm: 50,
  limitKmh: 80,
  simMinutesPerSecond: 0.6,
  closureChance: 0.12
} as const;

export const TUNNEL_CLOSURE_EVENT_ID = 'evt_winter_tunnel_closure';
export const TUNNEL_DETOUR_CHOICE_ID = 'winter_tunnel_detour';
export const SECTION_CONTROL_EVENT_ID = 'evt_winter_section_control';

export function winterTunnelFor(levelId: string, leg: LevelRouteLegSpec): typeof WINTER_TUNNEL | undefined {
  return levelId === WINTER_LEVEL_ID && leg.edgeId === WINTER_TUNNEL.edgeId && !leg.reverse ? WINTER_TUNNEL : undefined;
}

export function sectionControlAverageKmh(distanceKm: number, driveMinutes: number): number | undefined {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0 || !Number.isFinite(driveMinutes) || driveMinutes <= 0) {
    return undefined;
  }
  return distanceKm * 60 / driveMinutes;
}

export function sectionControlIsSpeeding(averageKmh: number, limitKmh: number): boolean {
  return averageKmh - limitKmh > 1e-6;
}
