import type { RunState } from '../types';

export const MONTPELLIER_PREVIEW_HOUR = 14;
export const MONTPELLIER_LIGHTING = Object.freeze({
  ambientColor: 0xffe3a6,
  ambientAlpha: 0.07,
  headlightsOn: false,
  headlightAlpha: 0,
  streetlampsOn: false,
  lampGlowAlpha: 0,
  isNight: false,
  isDuskOrDawn: false,
  isRain: false,
  isStorm: false,
  isFog: false,
  isSnow: false
});

export function applyMontpellierWeather(run: Pick<RunState, 'activeWeather' | 'isNight'>): void {
  run.activeWeather = 'clear';
  run.isNight = false;
}
