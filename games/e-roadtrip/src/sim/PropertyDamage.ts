import type { RunState } from '../types';
import { applyStress } from './PauseEffects';

export const DENT_IMPACT_PX_PER_SEC = 75;
export const AIRBAG_IMPACT_PX_PER_SEC = 165;
export const STATIC_CONTACT_CLEARANCE_PX = 6;

const SCRATCH = { tier: 'scratch', lossEur: 800, stressDelta: 10 } as const;
const DENT = { tier: 'dent', lossEur: 1300, stressDelta: 20 } as const;
const AIRBAG = { tier: 'airbag', lossEur: 5000, stressDelta: 0 } as const;

export type PropertyDamage = typeof SCRATCH | typeof DENT | typeof AIRBAG;

export function evaluatePropertyDamage(speedPxPerSec: number): PropertyDamage {
  const impactSpeed = Math.abs(speedPxPerSec);
  if (impactSpeed >= AIRBAG_IMPACT_PX_PER_SEC) return AIRBAG;
  if (impactSpeed >= DENT_IMPACT_PX_PER_SEC) return DENT;
  return SCRATCH;
}

export function recordConeHit(
  run: Pick<RunState, 'stress' | 'peakStress'>, hitCones: Set<number>, coneId: number
): boolean {
  if (hitCones.has(coneId)) return false;
  hitCones.add(coneId);
  applyStress(run, 1);
  return true;
}
