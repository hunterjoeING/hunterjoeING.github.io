import type { RunState } from '../types';

export const MONTPELLIER_PREVIEW_HOUR = 18;
export const MONTPELLIER_LIGHTING = Object.freeze({
  ambientColor: 0xffb96c,
  ambientAlpha: 0.13,
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
