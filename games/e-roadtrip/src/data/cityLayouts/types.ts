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

export interface WinterCityLayout {
  id: 'muenchen' | 'innsbruck';
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

export const points = (...coordinates: [number, number][]): CityPoint[] =>
  coordinates.map(([x, y]) => ({ x, y }));
