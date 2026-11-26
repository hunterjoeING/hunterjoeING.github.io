import type { HighwayEdge, LevelRouteLegSpec, PassName } from '../types';
import { WINTER_LEVEL_ID } from './WinterDriving';

export const ALPINE_PASS_PRESET = 'alpine_pass';
export const CHAIN_FITTING_MINUTES = 10;
export const CHAIN_CHECK_CHANCE = 0.35;
export const CHAIN_CHECK_FINE_EUR = 150;
export const CHAIN_CHECK_MINUTES = 8;
export const CHAIN_CHECK_STRESS = 12;

export const PASS_GRIP = {
  snow: { fitted: 1, bare: 0.64 },
  ice: { fitted: 0.78, bare: 0.34 }
} as const;

const PASSES: Partial<Record<string, { name: PassName; climb: number; descent: [number, number] }>> = {
  edge_garmisch_innsbruck: { name: 'Zirler Berg', climb: 0.55, descent: [0.73, 0.93] },
  edge_muenchen_achenpass_innsbruck: { name: 'Achenpass', climb: 0.45, descent: [0.58, 0.70] }
};

export const ALPINE_DESCENT_MIN_LOSS_M = 800;

export interface DescentProfile {
  startKm: number;
  endKm: number;
  lossM: number;
}

export function alpineLeg(levelId: string, edge: HighwayEdge, spec: LevelRouteLegSpec) {
  if (levelId !== WINTER_LEVEL_ID) return;
  const pass = spec.reverse ? undefined : PASSES[edge.id];
  const lossM = spec.reverse ? edge.elevationGainM : edge.elevationLossM;
  const [start, end] = pass?.descent ?? [0.55, 0.85];
  const descent: DescentProfile | undefined = lossM < ALPINE_DESCENT_MIN_LOSS_M ? undefined : {
    startKm: start * edge.distanceKm,
    endKm: end * edge.distanceKm,
    lossM
  };
  return {
    pass: pass && { name: pass.name, entryKm: pass.climb * edge.distanceKm },
    descent
  };
}

export function chainCheckOccurs(chainsFitted: boolean, roll: number): boolean {
  return !chainsFitted && roll < CHAIN_CHECK_CHANCE;
}

export function passGrip(onIce: boolean, chainsFitted: boolean): number {
  return PASS_GRIP[onIce ? 'ice' : 'snow'][chainsFitted ? 'fitted' : 'bare'];
}

/** The motion vector follows the vehicle's heading more slowly on a slippery surface. */
export function passTravelHeading(previous: number, heading: number, grip: number, dt: number): number {
  const arc = heading - previous;
  const shortestArc = Math.atan2(Math.sin(arc), Math.cos(arc));
  return previous + shortestArc * (1 - Math.exp(-18 * grip ** 2 * dt));
}
