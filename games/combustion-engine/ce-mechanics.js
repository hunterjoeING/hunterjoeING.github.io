// Dimensions in the cylinder bank's local coordinate system (crankshaft along X).
export const CAM_Y = 4.77;
export const CAM_Z = 0.32;
export const BASE_RADIUS = 0.23;
export const SEAT_Y = 3.33;
export const CRANK_RADIUS = 0.58;
export const ROD_LENGTH = 1.92;
export const MAIN_JOURNAL_RADIUS = 0.17;
export const CRANKPIN_RADIUS = 0.15;
export const WRIST_PIN_RADIUS = 0.10;
export const ROD_GEOMETRY = {
  bigEnd: { radius: 0.23, bore: CRANKPIN_RADIUS + 0.006, width: 0.26 },
  smallEnd: { radius: 0.145, bore: WRIST_PIN_RADIUS + 0.006, width: 0.24 },
  beam: { start: 0.19, end: ROD_LENGTH - 0.12, width: 0.13, depth: 0.17 }
};
export const ROD_SIDE_CLEARANCE = 0.025;
const WEB_WIDTH = 0.10;
export const CROWN_OFFSET = 0.48;
export const BUCKET_TOP = CAM_Y - BASE_RADIUS;
export const CAM_OVERHANG = 1.025;
export const BLOCK_END_MARGIN = 0.775;
export const END_WALL_WIDTH = 0.28;
export const BELT_WIDTH = 0.144;
export const WHEEL_WIDTH = 0.13;
export const DRIVE_CLEARANCE = 0.14;
export const DRIVE_BORE = 0.060;
// The polygonal shaft fits inside the faceted bore even as the wheel turns.
export const NOSE_RADIUS = 0.058;
const TAU = 2 * Math.PI;

export function displayCrankSpeed(degreesPerSecond) {
  // Above 700°/s ease towards 900°/s: 54° stays visible for at least 60 ms.
  const excess = Math.max(0, degreesPerSecond - 700);
  return Math.min(700, degreesPerSecond) + excess / (1 + excess / 200);
}

export function crankThrows(layout) {
  const paired = layout.id === 'v8';
  const specs = layout.cylinderSpecs;
  const throws = [];
  const halfSeat = ROD_GEOMETRY.bigEnd.width / 2 + ROD_SIDE_CLEARANCE;
  for (let i = 0; i < specs.length; i += paired ? 2 : 1) {
    const angle = specs[i].crankPinAngleDeg * Math.PI / 180;
    throws.push({
      minX: specs[i].x - halfSeat,
      maxX: specs[paired ? i + 1 : i].x + halfSeat,
      y: CRANK_RADIUS * Math.cos(angle), z: CRANK_RADIUS * Math.sin(angle)
    });
  }
  return throws;
}

// The intervals meet face to face from the timing nose to the flywheel.
// A V6 centre cheek bridges the two offset pins directly, away from the main axis.
export function crankshaftSections(layout) {
  const pins = crankThrows(layout);
  const mains = [], webs = [];
  const axis = { y: 0, z: 0 };
  const split = layout.id === 'v6';
  let start = -layout.crankLength / 2;
  for (let i = 0; i < pins.length; i += split ? 2 : 1) {
    const first = pins[i], last = split ? pins[i + 1] : first;
    const left = first.minX - WEB_WIDTH, right = last.maxX + WEB_WIDTH;
    mains.push({ minX: start, maxX: left });
    webs.push({ minX: left, maxX: first.minX, root: axis, tip: first, counterweighted: true });
    if (split) webs.push({ minX: first.maxX, maxX: last.minX, root: first, tip: last, counterweighted: false });
    webs.push({ minX: last.maxX, maxX: right, root: axis, tip: last, counterweighted: true });
    start = right;
  }
  mains.push({ minX: start, maxX: layout.crankLength / 2 });
  return { mains, pins, webs };
}

export function timingMounts(layout) {
  const crankFace = -layout.crankLength / 2;
  const firstCylinder = Math.min(...layout.cylinderSpecs.map(c => c.x));
  // The cam bars reach farther forward than the head, block and bearing caps.
  const front = Math.min(crankFace, firstCylinder - CAM_OVERHANG);
  const innerPlane = front - DRIVE_CLEARANCE - Math.max(BELT_WIDTH, WHEEL_WIDTH) / 2;
  return layout.bankAnglesDeg.map((_, bank) => {
    const bankStart = Math.min(...layout.cylinderSpecs.filter(c => c.bankIndex === bank).map(c => c.x));
    return { x: innerPlane - bank * 0.24, crankFace, camFace: bankStart - CAM_OVERHANG,
      blockFace: bankStart - BLOCK_END_MARGIN - END_WALL_WIDTH / 2 };
  });
}

export function intakeSign(bankAngle) {
  return bankAngle < 0 ? 1 : -1;
}

// Support distance of the cam against a flat bucket. Blend the beginning of lift
// into the base circle so displacement and contact velocity meet continuously.
const blend = 0.05;
export function camLift(angle) {
  const q = Math.max(0, Math.cos(angle) - Math.SQRT1_2);
  return 0.24 * (q < blend ? q * q / (2 * blend) : q - blend / 2);
}
export const MAX_LIFT = camLift(0);

export function camSurface(angle) {
  const c = Math.cos(angle), s = Math.sin(angle);
  const h = BASE_RADIUS + camLift(angle);
  const derivative = -0.24 * s * Math.min(1, Math.max(0, (c - Math.SQRT1_2) / blend));
  return { y: -h * c + derivative * s, z: -h * s - derivative * c };
}

export function camOutline() {
  const points = [];
  for (let i = 0; i < 128; i++) {
    const a = i * TAU / 128;
    // More facets at the transition ramps, where the contact point travels
    // farthest around the lobe for a small change in cam angle.
    const divisions = Math.abs(Math.cos(a) - Math.SQRT1_2) < 0.10 ? 4 : 1;
    for (let k = 0; k < divisions; k++) points.push(camSurface(a + k / divisions * TAU / 128));
  }
  return points;
}

function beltContour(wheels) {
  // Wheels ordered counterclockwise in (bank Y, bank Z). The right-hand
  // normal gives the outward common tangent, also for unequal diameters.
  const normals = wheels.map((w, i) => {
    const next = wheels[(i + 1) % wheels.length];
    const y = next.y - w.y, z = next.z - w.z;
    return Math.atan2(z, y) - Math.acos((w.radius - next.radius) / Math.hypot(y, z));
  });
  const segments = [];
  let length = 0;
  function add(segment) {
    segment.start = length;
    length += segment.length;
    segments.push(segment);
  }
  wheels.forEach((w, i) => {
    const next = wheels[(i + 1) % wheels.length];
    const a = normals[(i + wheels.length - 1) % wheels.length];
    const b = normals[i];
    const sweep = (b - a + TAU) % TAU;
    add({ kind: 'arc', w, angle: a, sweep, length: sweep * w.radius });
    const ny = Math.cos(b), nz = Math.sin(b);
    const y = w.y + ny * w.radius, z = w.z + nz * w.radius;
    const dy = next.y + ny * next.radius - y, dz = next.z + nz * next.radius - z;
    add({ kind: 'line', y, z, dy, dz, ny, nz, length: Math.hypot(dy, dz) });
  });
  return { wheels, segments, length };
}

export function timingDrive() {
  const pitchRadius = 0.14;
  const pitch = TAU * pitchRadius / 10;
  const contour = offset => beltContour([
    { id: 'crank', y: 0, z: 0, teeth: 10, radius: pitchRadius },
    { id: 'tensioner', y: 2.25, z: -offset, teeth: 14, radius: pitchRadius * 1.4 },
    { id: 'camA', y: CAM_Y, z: -CAM_Z, teeth: 20, radius: pitchRadius * 2 },
    { id: 'camB', y: CAM_Y, z: CAM_Z, teeth: 20, radius: pitchRadius * 2 }
  ]);
  let low = 0.75, high = 1.3;
  const teeth = Math.ceil(contour(low).length / pitch);
  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2;
    if (contour(mid).length < teeth * pitch) low = mid;
    else high = mid;
  }
  return { ...contour(high), pitch, teeth };
}

export function beltPoint(segment, t) {
  if (segment.kind === 'line') {
    return { y: segment.y + t * segment.dy, z: segment.z + t * segment.dz, ny: segment.ny, nz: segment.nz };
  }
  const a = segment.angle + segment.sweep * t;
  const ny = Math.cos(a), nz = Math.sin(a);
  return { y: segment.w.y + ny * segment.w.radius, z: segment.w.z + nz * segment.w.radius, ny, nz };
}
