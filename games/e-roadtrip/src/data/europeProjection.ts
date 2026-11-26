export type GeoCoordinate = readonly [latitude: number, longitude: number];
export interface MapPoint { x: number; y: number }

export interface EuropeMapFit {
  a: number;
  b: number;
  x: number;
  y: number;
}

// Unit-sphere Lambert azimuthal equal-area, centred at 52°N, 12°E.
const radians = Math.PI / 180;
const sinCentre = Math.sin(52 * radians);
const cosCentre = Math.cos(52 * radians);

export function projectEurope([latitude, longitude]: GeoCoordinate, fit: EuropeMapFit): MapPoint {
  const lat = latitude * radians;
  const deltaLon = (longitude - 12) * radians;
  const sinLat = Math.sin(lat);
  const cosLat = Math.cos(lat);
  const cosLon = Math.cos(deltaLon);
  const k = Math.sqrt(2 / (1 + sinCentre * sinLat + cosCentre * cosLat * cosLon));
  const x = k * cosLat * Math.sin(deltaLon);
  const y = k * (sinCentre * cosLat * cosLon - cosCentre * sinLat);
  return {
    x: fit.a * x - fit.b * y + fit.x,
    y: fit.b * x + fit.a * y + fit.y
  };
}
