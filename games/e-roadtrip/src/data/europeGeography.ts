import { EUROPE_MAP_FIT } from './europeGeoData.generated';
import { GeoCoordinate, MapPoint, projectEurope } from './europeProjection';

export function projectMapPoint(coordinate: GeoCoordinate): MapPoint {
  return projectEurope(coordinate, EUROPE_MAP_FIT);
}
