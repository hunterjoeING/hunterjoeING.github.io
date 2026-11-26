import { ChargerStation, LandmarkKind } from '../types';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type AutohofStyle = 'rural' | 'classic' | 'urban';

export function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function classifyAutohof(station: ChargerStation): AutohofStyle {
  const blob = `${station.id} ${station.name} ${station.cityHint}`.toLowerCase();
  if (station.isAcOnly || station.network === 'ac_village' || station.network === 'ac_dorfladen') return 'rural';
  const ruralHit = /dorf|börde|boerde|land|sauerland|weser|pass|berg|alpen|see|heide|flur/.test(blob);
  const urbanHit = /köln|koeln|hannover|messe|düsseldorf|duesseldorf|frankfurt|hamburg|berlin|münchen|muenchen|kreuz/.test(
    blob
  );
  if (urbanHit && !ruralHit && (station.edgeProgress >= 0.55 || station.stalls >= 8)) return 'urban';
  if (ruralHit && station.stalls <= 10) return 'rural';
  const roll = hashString(station.id) % 6;
  if (roll === 0) return 'rural';
  if (roll === 1 && station.stalls >= 6) return 'urban';
  return 'classic';
}

/** Landmark visible behind a near-city Autohof. Hannover pairs the tower with the town hall in the painter. */
export function skylineForStation(station: ChargerStation): LandmarkKind | null {
  const blob = `${station.name} ${station.cityHint}`.toLowerCase();
  if (/köln|koeln/.test(blob)) return 'koeln_dom';
  if (/hannover|messe|laatzen/.test(blob)) return 'hermesturm';
  if (/frankfurt/.test(blob)) return 'frankfurt_skyline';
  if (/hamburg/.test(blob)) return 'hamburger_michel';
  if (/münchen|muenchen/.test(blob)) return 'munich_frauenkirche';
  if (/berlin/.test(blob)) return 'fernsehturm';
  if (/aachen/.test(blob)) return 'aachen_dom';
  return null;
}
