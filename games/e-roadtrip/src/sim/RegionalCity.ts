import { HANNOVER, HANNOVER_ENTRIES, HANNOVER_MESSE_GOAL, HANNOVER_MESSE_LOT, HANNOVER_WRONG_EXITS } from '../data/cityLayouts/hannover';
import { HIRTSHALS, HIRTSHALS_CHECK_IN, HIRTSHALS_ENTRY } from '../data/cityLayouts/hirtshals';
import { KOELN, KOELN_ENTRY, KOELN_EXITS } from '../data/cityLayouts/koeln';
import {
  MONTPELLIER, MONTPELLIER_APPROACHES, MONTPELLIER_HOTEL_BAY, MONTPELLIER_HOTEL_GOAL, MONTPELLIER_WRONG_EXITS
} from '../data/cityLayouts/montpellier';
import type { CityPoint, CityRect, CitySign, MappedCityLayout } from '../data/cityLayouts/types';
import type { ChargingBay } from './ChargingBay';

type RegionalPreset = 'hannover_messe' | 'koeln_ring' | 'ferry_denmark' | 'montpellier_finish';

interface RegionalDrive {
  layout: MappedCityLayout;
  spawn: CityPoint & { rot: number };
  goal: CityPoint;
  target: CityRect;
  passThrough: boolean;
  arrivalBay?: ChargingBay;
  exitPoint?: CitySign;
  signLabel?: string;
  zoneLabel: string;
  zoneColor: number;
  navLabel: string;
  completionLabel: string;
  title: string;
  wrongExits: Array<CitySign & { zone: CityRect }>;
  wrongExitHint?: string;
}

export function isRegionalCity(preset: string): preset is RegionalPreset {
  return preset === 'hannover_messe' || preset === 'koeln_ring' || preset === 'ferry_denmark' || preset === 'montpellier_finish';
}

function exitZone({ x, y }: CityPoint, w = 94, h = 88): CityRect {
  return { x: x - w / 2, y: y - h / 2, w, h };
}

function wrongExits(signs: Record<string, CitySign>, except?: CitySign) {
  return Object.values(signs).filter(sign => sign !== except)
    .map(sign => ({ ...sign, zone: exitZone(sign) }));
}

export function koelnMotorway(routeId: string) {
  return routeId === 'l1_route_c_sauerland'
    ? { exit: KOELN_EXITS.a4, road: 'A4', direction: 'Olpe', title: 'Köln-Ring → A4 Olpe' }
    : { exit: KOELN_EXITS.a1, road: 'A1', direction: 'Dortmund', title: 'Köln-Ring → A1 Dortmund' };
}

export function montpellierApproach(routeId: string) {
  return routeId === 'l2_route_mid_reims' || routeId === 'l2_route_b_clermont'
    ? MONTPELLIER_APPROACHES.west : MONTPELLIER_APPROACHES.east;
}

export function regionalCityDrive(preset: RegionalPreset, routeId: string): RegionalDrive {
  if (preset === 'montpellier_finish') {
    const approach = montpellierApproach(routeId);
    const { spawn, exit, name } = approach;
    const airportBranch = approach === MONTPELLIER_APPROACHES.east ? MONTPELLIER_WRONG_EXITS.airport : undefined;
    return {
      layout: MONTPELLIER, spawn, goal: MONTPELLIER_HOTEL_GOAL, target: MONTPELLIER_HOTEL_BAY.bounds,
      arrivalBay: MONTPELLIER_HOTEL_BAY, passThrough: false, exitPoint: exit,
      zoneLabel: 'E-PARKPLATZ', zoneColor: 0x86efac,
      navLabel: 'Zum Strandhotel · Palavas', completionLabel: 'Strandhotel erreicht',
      title: `${name} → Strandhotel`, wrongExits: wrongExits(MONTPELLIER_WRONG_EXITS, airportBranch),
      wrongExitHint: 'Falsche Ausfahrt · bitte wenden'
    };
  }
  if (preset === 'hannover_messe') {
    const fromSouth = routeId === 'l1_route_c_sauerland';
    const ramp = fromSouth ? 'Messe-Süd' : 'Messe-Nord';
    return {
      layout: HANNOVER, spawn: fromSouth ? HANNOVER_ENTRIES.south : HANNOVER_ENTRIES.north,
      goal: HANNOVER_MESSE_GOAL, target: HANNOVER_MESSE_LOT, passThrough: false,
      zoneLabel: 'MESSE\nE-PARKPLATZ', zoneColor: 0x38bdf8,
      navLabel: 'Zum Messe E-Parkplatz', completionLabel: 'Messe E-Parkplatz erreicht',
      title: `Hannover · ${ramp} → E-Parkplatz`, wrongExits: wrongExits(HANNOVER_WRONG_EXITS)
    };
  }
  // Kept for Level 5 (Köln start). Not used as a live city segment in Levels 1–3.
  if (preset === 'koeln_ring') {
    const { exit, road, direction, title } = koelnMotorway(routeId);
    return {
      layout: KOELN, spawn: KOELN_ENTRY, goal: exit, target: exitZone(exit), passThrough: true,
      exitPoint: exit, signLabel: exit.label, zoneLabel: road, zoneColor: 0x86efac,
      navLabel: `Zur ${road} · ${direction}`, completionLabel: `Weiter auf die ${road} · ${direction}`,
      title, wrongExits: wrongExits(KOELN_EXITS, exit)
    };
  }
  const exit = HIRTSHALS_CHECK_IN;
  return {
    layout: HIRTSHALS, spawn: HIRTSHALS_ENTRY, goal: exit, target: exitZone(exit, 160, 108), passThrough: true,
    exitPoint: exit, signLabel: exit.label, zoneLabel: 'CHECK-IN', zoneColor: 0x38bdf8,
    navLabel: 'Zum Fährterminal', completionLabel: 'Fähre erreicht', title: 'Hirtshals → Fährterminal',
    wrongExits: []
  };
}
