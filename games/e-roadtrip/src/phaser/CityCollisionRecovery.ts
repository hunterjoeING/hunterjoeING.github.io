import { capsuleOverlapsRect, vehicleCapsule, type Capsule, type Point } from './CityCollision';
import type { Rect } from './PlaceStyles';
import { orientTravelLane, projectToCityRoad, travelLanePoint, type CityRoadPose, type TravelLaneSpan } from '../sim/MappedCity';

export const COLLISION_GRACE_SEC = 2;
export const TRAFFIC_RECOVERY_RADIUS_PX = 160;
export const RECOVERY_TRAFFIC_CLEARANCE_PX = 8;

const SEARCH_STEP_PX = 8;
const DIRECTION_PREFERENCE_PX = 32;
const HEADING_PREFERENCE_PX = 64;
const STOP_BOX_PREFERENCE_PX = 120;

export function capsuleOnRoad({ a, b, radius }: Capsule, onRoad: (point: Point) => boolean): boolean {
  const center = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  return [a, center, b].every(({ x, y }) =>
    onRoad({ x, y }) && onRoad({ x: x - radius, y }) && onRoad({ x: x + radius, y }) &&
    onRoad({ x, y: y - radius }) && onRoad({ x, y: y + radius }));
}

/** Search the travel lanes near the impact, favouring space ahead and beyond stop boxes. */
export function findCollisionRecoveryPoint(
  origin: Point,
  heading: number,
  spans: TravelLaneSpan[],
  stopBoxes: Rect[],
  isFreeRoad: (shape: Capsule) => boolean
): CityRoadPose | undefined {
  let best: CityRoadPose | undefined;
  let bestScore = Infinity;
  const dx = Math.sin(heading);
  const dy = -Math.cos(heading);
  const lanes = spans.map(span => {
    const lane = orientTravelLane(span, heading);
    return { lane, nearest: projectToCityRoad(origin, lane) };
  }).sort((a, b) => a.nearest.offset - b.nearest.offset);
  for (const { lane, nearest } of lanes) {
    if (nearest.offset >= bestScore) break;
    const sample = (along: number): boolean => {
      const pose = travelLanePoint(lane, along);
      const x = pose.x - origin.x;
      const y = pose.y - origin.y;
      const distance = Math.hypot(x, y);
      if (distance >= bestScore) return false;
      if (distance < SEARCH_STEP_PX) return true;
      const score = distance + (1 - (x * dx + y * dy) / distance) * DIRECTION_PREFERENCE_PX +
        (1 - lane.alignment) * HEADING_PREFERENCE_PX;
      const shape = vehicleCapsule(pose.x, pose.y, pose.rot);
      if (score < bestScore && isFreeRoad(shape)) {
        const ranked = score + (stopBoxes.some(box => capsuleOverlapsRect(shape, box)) ? STOP_BOX_PREFERENCE_PX : 0);
        if (ranked < bestScore) {
          best = pose;
          bestScore = ranked;
        }
      }
      return true;
    };
    if (!sample(nearest.along)) continue;
    for (const end of [0, lane.length]) {
      let along = nearest.along;
      while (along !== end) {
        along = end < along ? Math.max(end, along - SEARCH_STEP_PX) : Math.min(end, along + SEARCH_STEP_PX);
        if (!sample(along)) break;
      }
    }
  }
  return best;
}
