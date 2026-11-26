interface Point {
  x: number;
  y: number;
}

interface Bounds extends Point {
  w: number;
  h: number;
}

export interface ChargingBay {
  bounds: Bounds;
  pillar: Point;
}

export const PARKING_MIN_OVERLAP = 0.75;
export const PARKING_REAR_TOLERANCE_DEG = 35;
export const PARKING_MAX_SPEED = 6;

export function isRearParked(
  bay: ChargingBay,
  car: Point & { rotation: number; speed: number; footprint: Bounds }
): boolean {
  const { bounds, pillar } = bay;
  if (Math.abs(car.speed) > PARKING_MAX_SPEED ||
      car.x < bounds.x || car.x > bounds.x + bounds.w ||
      car.y < bounds.y || car.y > bounds.y + bounds.h) return false;

  const dx = pillar.x - car.x;
  const dy = pillar.y - car.y;
  const distance = Math.hypot(dx, dy);
  const rearDot = -Math.sin(car.rotation) * dx + Math.cos(car.rotation) * dy;
  if (distance === 0 || rearDot < Math.cos(PARKING_REAR_TOLERANCE_DEG * Math.PI / 180) * distance) return false;

  const { x, y, w, h } = car.footprint;
  const overlapX = Math.max(0, Math.min(x + w, bounds.x + bounds.w) - Math.max(x, bounds.x));
  const overlapY = Math.max(0, Math.min(y + h, bounds.y + bounds.h) - Math.max(y, bounds.y));
  return overlapX * overlapY >= w * h * PARKING_MIN_OVERLAP;
}
