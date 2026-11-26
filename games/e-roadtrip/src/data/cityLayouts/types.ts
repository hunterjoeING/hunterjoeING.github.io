export interface CityPoint { x: number; y: number }
export interface CityRect extends CityPoint { w: number; h: number }

export type RoadKind = 'street' | 'ring' | 'motorway';
export interface CityRoad {
  kind: RoadKind;
  points: CityPoint[];
}

export function road(kind: RoadKind, ...coordinates: [number, number][]): CityRoad {
  return { kind, points: coordinates.map(([x, y]) => ({ x, y })) };
}

export interface CityLandmark extends CityPoint {
  label: string;
  art: string;
  nightGlow?: { color: number; reflection: CityPoint };
}

export const landmark = (x: number, y: number, label: string, art: string): CityLandmark => ({ x, y, label, art });

export interface CitySign extends CityPoint {
  label: string;
}

export interface CityTrafficSpec {
  tex: string;
  speed: number;
  path: CityPoint[];
  cyclist?: boolean;
}

export interface CityLayout {
  id: string;
  width: number;
  height: number;
  roads: CityRoad[];
  water: CityRect[];
  islands?: CityRect[];
  parks: CityRect[];
  landmarks: Record<string, CityLandmark>;
  signs: Record<string, CitySign>;
  peds: Array<{ tex: string; speed: number; wps: CityPoint[] }>;
  cones: CityPoint[];
  traffic: CityTrafficSpec[];
}

export interface WinterCityLayout extends CityLayout {
  id: 'muenchen' | 'innsbruck';
}

export interface MappedCityRoad extends CityRoad {
  width: number;
  cobbled?: boolean;
  oneWay?: boolean;
  navigationCost?: number;
}

export interface CityCrosswalk extends CityPoint {
  id: string;
  axis: 'ew' | 'ns';
  width: number;
  tex: string;
}

export interface CitySignal extends CityPoint {
  id: string;
  radius: number;
}

export interface MappedCityLayout extends CityLayout {
  roads: MappedCityRoad[];
  plazas: CityRect[];
  roundaboutIslands: CityPoint[];
  crosswalks: CityCrosswalk[];
  signals: CitySignal[];
  captions: CitySign[];
}

export const points = (...coordinates: [number, number][]): CityPoint[] =>
  coordinates.map(([x, y]) => ({ x, y }));
