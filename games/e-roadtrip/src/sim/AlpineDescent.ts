import type { RegenMode } from '../types';
import type { DescentProfile } from './AlpineDriving';
import { CLIMB_ENERGY_KWH_PER_M } from './EnergyModel';

export const REGEN_MODES = {
  coast: { label: 'Segeln', factor: 0.12 },
  normal: { label: 'Normal', factor: 0.60 },
  strong: { label: 'B-Modus', factor: 0.90 }
} as const satisfies Record<RegenMode, { label: string; factor: number }>;

export const REGEN_TAPER_START_PCT = 85;
export const BRAKE_HEAT_LIMIT_M = 550;
export const BRAKE_COOLDOWN_MINUTES = 12;
export const BRAKE_OVERHEAT_STRESS = 14;
const MAX_REGEN_STEP_KM = 0.10;

export function downhillBraking(lossM: number, socPct: number, batteryKwh: number, mode: RegenMode) {
  const headroomPct = Math.max(0, 100 - socPct);
  const taper = Math.min(1, headroomPct / (100 - REGEN_TAPER_START_PCT));
  const capture = REGEN_MODES[mode].factor * taper;
  const recoveredKwh = Math.min(lossM * CLIMB_ENERGY_KWH_PER_M * capture, batteryKwh * headroomPct / 100);
  return { recoveredKwh, brakeHeatM: lossM - recoveredKwh / CLIMB_ENERGY_KWH_PER_M };
}

export function brakesOverheat(accumulatedHeatM: number): boolean {
  return accumulatedHeatM >= BRAKE_HEAT_LIMIT_M;
}

/** Apply the descent only to the distance driven within its profile, including after a charging stop. */
export function alpineRoadEnergy(
  profile: DescentProfile | undefined, fromKm: number, toKm: number,
  baseKwh: number, socPct: number, batteryKwh: number, mode: RegenMode
) {
  const result = { netKwh: baseKwh, recoveredKwh: 0, brakeHeatM: 0 };
  if (!profile || toKm <= fromKm) return result;
  const start = Math.max(fromKm, profile.startKm);
  const end = Math.min(toKm, profile.endKm);
  if (end <= start) return result;

  const baseKwhPerKm = baseKwh / (toKm - fromKm);
  const lossMPerKm = profile.lossM / (profile.endKm - profile.startKm);
  let soc = socPct - (start - fromKm) * baseKwhPerKm / batteryKwh * 100;
  const steps = Math.ceil((end - start) / MAX_REGEN_STEP_KM);
  const km = (end - start) / steps;
  for (let step = 0; step < steps && soc > 0.15; step++) {
    const braking = downhillBraking(km * lossMPerKm, soc, batteryKwh, mode);
    soc -= (km * baseKwhPerKm - braking.recoveredKwh) / batteryKwh * 100;
    result.recoveredKwh += braking.recoveredKwh;
    result.brakeHeatM += braking.brakeHeatM;
  }
  result.netKwh -= result.recoveredKwh;
  return result;
}

/** Forecast sections expose a low battery at the foot of the descent before any recovery. */
export function alpineForecastBoundaries(profile: DescentProfile | undefined, fromKm: number, toKm: number): number[] {
  if (!profile) return [toKm];
  return [profile.startKm, profile.endKm].filter(km => km > fromKm && km < toKm).concat(toKm);
}
