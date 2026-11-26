import { capsuleOverlapsRect, vehicleCapsule, type Capsule, type Point } from './CityCollision';
import type { Rect } from './PlaceStyles';

export const COLLISION_GRACE_SEC = 2;
export const TRAFFIC_RECOVERY_RADIUS_PX = 160;

const SEARCH_STEP_PX = 8;
const DIRECTION_PREFERENCE_PX = 32;
const STOP_BOX_PREFERENCE_PX = 120;

export function capsuleOnRoad({ a, b, radius }: Capsule, onRoad: (point: Point) => boolean): boolean {
  const center = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  return [a, center, b].every(({ x, y }) =>
    onRoad({ x, y }) && onRoad({ x: x - radius, y }) && onRoad({ x: x + radius, y }) &&
    onRoad({ x, y: y - radius }) && onRoad({ x, y: y + radius }));
}

/** Search outwards from the impact, favouring travel direction and space beyond stop boxes. */
export function findCollisionRecoveryPoint(
  origin: Point & { rotation: number },
  heading: number,
  maxDistance: number,
  stopBoxes: Rect[],
  isFreeRoad: (shape: Capsule) => boolean
): Point | undefined {
  let best: Point | undefined;
  let bestScore = Infinity;
  for (let radius = SEARCH_STEP_PX; radius <= Math.min(maxDistance, bestScore); radius += SEARCH_STEP_PX) {
    const samples = Math.ceil(Math.PI * radius / SEARCH_STEP_PX);
    for (let i = -samples + 1; i <= samples; i++) {
      const offset = i * Math.PI / samples;
      const score = radius + (1 - Math.cos(offset)) * DIRECTION_PREFERENCE_PX;
      if (score >= bestScore) continue;

      const x = origin.x + Math.sin(heading + offset) * radius;
      const y = origin.y - Math.cos(heading + offset) * radius;
      const shape = vehicleCapsule(x, y, origin.rotation);
      if (!isFreeRoad(shape)) continue;
      const ranked = score + (stopBoxes.some(box => capsuleOverlapsRect(shape, box)) ? STOP_BOX_PREFERENCE_PX : 0);
      if (ranked >= bestScore) continue;
      best = { x, y };
      bestScore = ranked;
    }
  }
  return best;
}
