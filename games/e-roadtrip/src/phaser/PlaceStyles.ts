import { ChargerStation, CityDrivePreset, LandmarkKind } from '../types';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type NeonSide = 'north' | 'south' | 'west' | 'east';

export interface BuildingSpec extends Rect {
  roof: number;
  trim: number;
  neon?: { label: string; color: number; side: NeonSide; flicker?: boolean };
}

export type AutohofStyle = 'rural' | 'classic' | 'urban';

export interface CityPalette {
  id: string;
  title: string;
  grass: number;
  sidewalk: number;
  park: number;
  road: number;
  curb: number;
  buildings: BuildingSpec[];
  lawns: Rect[];
}

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

export function themeForPreset(preset: CityDrivePreset): CityPalette {
  if (preset === 'hannover_messe') return HANNOVER;
  if (preset === 'koeln_ring') return KOELN;
  if (preset === 'ferry_denmark') return HIRTSHALS;
  return AACHEN;
}

const AACHEN: CityPalette = {
  id: 'aachen',
  title: 'Aachen',
  grass: 0x1c4532,
  sidewalk: 0x7c6a52,
  park: 0x2f6a3c,
  road: 0x1c1917,
  curb: 0xa8a29e,
  lawns: [
    { x: 620, y: 470, w: 250, h: 120 },
    { x: 300, y: 1388, w: 1680, h: 160 }
  ],
  buildings: [
    { x: 330, y: 318, w: 220, h: 118, roof: 0x78716c, trim: 0xd6d3d1, neon: { label: 'DOM CAFÉ', color: 0xf59e0b, side: 'north' } },
    { x: 590, y: 328, w: 200, h: 100, roof: 0x57534e, trim: 0xa8a29e, neon: { label: 'PUNSCH', color: 0xfb7185, side: 'north', flicker: true } },
    { x: 340, y: 490, w: 250, h: 108, roof: 0x44403c, trim: 0x78716c },
    { x: 1160, y: 324, w: 230, h: 128, roof: 0x64748b, trim: 0xe7e5e4, neon: { label: 'QUELLENHOF', color: 0x38bdf8, side: 'north' } },
    { x: 1430, y: 340, w: 250, h: 112, roof: 0x57534e, trim: 0xa8a29e },
    { x: 1164, y: 860, w: 210, h: 150, roof: 0x44403c, trim: 0x78716c, neon: { label: 'ELISEN', color: 0xfbbf24, side: 'south' } },
    { x: 1420, y: 888, w: 270, h: 150, roof: 0x292524, trim: 0x57534e, neon: { label: 'THEATER', color: 0xf43f5e, side: 'north' } },
    { x: 760, y: 900, w: 160, h: 120, roof: 0x78716c, trim: 0xd6d3d1 }
  ]
};

const KOELN: CityPalette = {
  id: 'koeln',
  title: 'Köln',
  grass: 0x14281c,
  sidewalk: 0x475569,
  park: 0x1e3a32,
  road: 0x0b1220,
  curb: 0x94a3b8,
  lawns: [
    { x: 1924, y: 360, w: 70, h: 520 },
    { x: 220, y: 1404, w: 1500, h: 130 }
  ],
  buildings: [
    { x: 312, y: 308, w: 168, h: 108, roof: 0x334155, trim: 0x64748b, neon: { label: 'KÖLSCH', color: 0xfacc15, side: 'north' } },
    { x: 760, y: 308, w: 170, h: 130, roof: 0x1e293b, trim: 0x475569, neon: { label: 'RHEIN', color: 0x22d3ee, side: 'north' } },
    { x: 318, y: 500, w: 210, h: 112, roof: 0x0f172a, trim: 0x334155 },
    { x: 560, y: 508, w: 340, h: 108, roof: 0x1e293b, trim: 0x475569, neon: { label: 'ALTSTADT', color: 0xf43f5e, side: 'south', flicker: true } },
    { x: 1160, y: 308, w: 180, h: 140, roof: 0x334155, trim: 0x64748b, neon: { label: 'DOM HOTEL', color: 0xfb7185, side: 'north' } },
    { x: 1370, y: 318, w: 160, h: 120, roof: 0x1e293b, trim: 0x475569 },
    { x: 1550, y: 308, w: 170, h: 150, roof: 0x0f172a, trim: 0x334155, neon: { label: '4711', color: 0xfbbf24, side: 'east' } },
    { x: 1160, y: 500, w: 250, h: 112, roof: 0x334155, trim: 0x64748b },
    { x: 1460, y: 512, w: 250, h: 100, roof: 0x1e293b, trim: 0x475569 },
    { x: 330, y: 860, w: 200, h: 140, roof: 0x1e293b, trim: 0x475569, neon: { label: 'BRAUHAUS', color: 0xf59e0b, side: 'north' } },
    { x: 560, y: 880, w: 180, h: 150, roof: 0x334155, trim: 0x64748b },
    { x: 770, y: 860, w: 150, h: 160, roof: 0x0f172a, trim: 0x334155 },
    { x: 1160, y: 860, w: 200, h: 150, roof: 0x1e293b, trim: 0x475569, neon: { label: 'HAFEN', color: 0x38bdf8, side: 'south' } },
    { x: 1400, y: 870, w: 180, h: 140, roof: 0x334155, trim: 0x64748b },
    { x: 1600, y: 860, w: 130, h: 160, roof: 0x0f172a, trim: 0x334155 }
  ]
};

const HANNOVER: CityPalette = {
  id: 'hannover',
  title: 'Hannover',
  grass: 0x166534,
  sidewalk: 0xcbd5e1,
  park: 0x15803d,
  road: 0x1e293b,
  curb: 0xe2e8f0,
  lawns: [
    { x: 520, y: 1088, w: 200, h: 70 },
    { x: 240, y: 1388, w: 1760, h: 150 }
  ],
  buildings: [
    { x: 330, y: 318, w: 240, h: 130, roof: 0xe2e8f0, trim: 0x94a3b8, neon: { label: 'OPER', color: 0xf43f5e, side: 'north' } },
    { x: 600, y: 330, w: 280, h: 140, roof: 0xcbd5e1, trim: 0x64748b, neon: { label: 'LIST', color: 0x38bdf8, side: 'south' } },
    { x: 1140, y: 308, w: 270, h: 150, roof: 0xf8fafc, trim: 0x38bdf8, neon: { label: 'MESSEHALLEN', color: 0x38bdf8, side: 'north' } },
    { x: 330, y: 860, w: 160, h: 110, roof: 0xe2e8f0, trim: 0x94a3b8 },
    { x: 760, y: 900, w: 160, h: 130, roof: 0xcbd5e1, trim: 0x64748b, neon: { label: 'KRÖPCKE', color: 0xfbbf24, side: 'north' } },
    { x: 1160, y: 860, w: 220, h: 150, roof: 0xf1f5f9, trim: 0x2563eb, neon: { label: 'EXPO', color: 0x22d3ee, side: 'south' } },
    { x: 1420, y: 880, w: 250, h: 140, roof: 0xe2e8f0, trim: 0x64748b }
  ]
};

const HIRTSHALS: CityPalette = {
  id: 'hirtshals',
  title: 'Hirtshals',
  grass: 0x14532d,
  sidewalk: 0x64748b,
  park: 0x0e7490,
  road: 0x1e293b,
  curb: 0x94a3b8,
  lawns: [{ x: 300, y: 1380, w: 1600, h: 160 }],
  buildings: [
    { x: 340, y: 340, w: 200, h: 110, roof: 0xf8fafc, trim: 0x0284c7, neon: { label: 'FÆRGE', color: 0x38bdf8, side: 'north' } },
    { x: 1180, y: 340, w: 220, h: 120, roof: 0xe2e8f0, trim: 0x0369a1, neon: { label: 'HAVN', color: 0xfacc15, side: 'south' } },
    { x: 360, y: 900, w: 180, h: 120, roof: 0xcbd5e1, trim: 0x475569 }
  ]
};
