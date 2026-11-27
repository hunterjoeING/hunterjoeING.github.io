// The petrol throttle sits in a straight +Z passage with its spindle along X.
export const INTAKE_RADIUS = 0.21;
export const DISC_RADIUS = 0.189;
export const DISC_THICKNESS = 0.024;
export const DUCT_SIDES = 12;
export const TRACER_SIZE = 0.044;
const wallRadius = INTAKE_RADIUS * Math.cos(Math.PI / DUCT_SIDES);

export function throttleAngle(load) {
  return (0.09 + 0.91 * load) * Math.PI / 2;
}

export function setThrottleOpening(throttle, load) {
  if (throttle.load === load) return;
  throttle.load = load;
  const angle = throttleAngle(load);
  throttle.cos = Math.cos(angle);
  throttle.sin = Math.sin(angle);
  // Illustrative share of passing parcels from the projected plate area.
  throttle.flow = 1 - (DISC_RADIUS / wallRadius) ** 2 * throttle.cos;
  throttle.pointRadius = 0.0045 + (TRACER_SIZE / 2 - 0.0045) * (1 - throttle.cos);
}

export function passThrottle(throttle, p, out) {
  const center = throttle.center;
  const z = out.z - center[2];
  const reach = 0.48;
  if (Math.abs(z) >= reach) return;

  // Speed up through the restriction and match the normal path at both ends.
  const jetZ = z * (1 + throttle.cos * (1 - Math.abs(z) / reach) ** 2);
  const core = 0.23; // Encloses the tilted plate and a whole tracer at every angle.
  const t = Math.min(1, (reach - Math.abs(jetZ)) / (reach - core));
  const blend = t * t * (3 - 2 * t);
  const q = throttle.pointRadius;
  const x = p.laneX * INTAKE_RADIUS;
  // Project the entire finite-thickness plate onto XY at this X. Inflating
  // its radius and half-thickness by q clears even the edge of the bead.
  const edge = Math.sqrt((DISC_RADIUS + q) ** 2 - x * x) * throttle.cos
    + (DISC_THICKNESS / 2 + q) * throttle.sin;
  const wall = Math.sqrt((wallRadius - q) ** 2 - x * x);
  const lane = Math.abs(p.laneZ);
  const y = (p.laneZ < 0 ? -1 : 1) * (edge + (wall - edge) * lane);
  out.x += (center[0] + x - out.x) * blend;
  out.y += (center[1] + y - out.y) * blend;
  out.z = center[2] + jetZ;
  p.pointScale = 1 + (2 * q / TRACER_SIZE - 1) * blend;
}
