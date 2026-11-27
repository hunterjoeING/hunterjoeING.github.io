// Pure Mathematical Kinematics Solver for Kässbohrer PistenBully 800 W
// Zero Three.js dependency -> directly unit-testable via Node!

import { PB_SPECS } from './specs.js';

const TAU = Math.PI * 2;

export function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

function vec3Add(a, b) {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function vec3Sub(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function vec3Len(v) {
  return Math.hypot(v.x, v.y, v.z);
}

function rotX(v, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: v.x, y: v.y * c - v.z * s, z: v.y * s + v.z * c };
}

function rotY(v, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c };
}

function rotZ(v, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c, z: v.z };
}

// ============================================================================
// 1. EXACT 2-POINT HYDRAULIC CYLINDER SOLVER
// ============================================================================
export function solveHydraulicCylinder(anchorA, anchorB) {
  const dx = anchorB.x - anchorA.x;
  const dy = anchorB.y - anchorA.y;
  const dz = anchorB.z - anchorA.z;
  const length = Math.hypot(dx, dy, dz);
  const inv = length > 1e-6 ? 1 / length : 1;
  return {
    a: { x: anchorA.x, y: anchorA.y, z: anchorA.z },
    b: { x: anchorB.x, y: anchorB.y, z: anchorB.z },
    length,
    dir: { x: dx * inv, y: dy * inv, z: dz * inv },
    mid: {
      x: (anchorA.x + anchorB.x) * 0.5,
      y: (anchorA.y + anchorB.y) * 0.5,
      z: (anchorA.z + anchorB.z) * 0.5
    }
  };
}

// ============================================================================
// 2. CLOSED-LOOP ANALYTICAL TRACK SPLINE & EXACT SPROCKET TOOTH MESHING
// ============================================================================
// Computes the external common tangent from circle C1 to circle C2 for a
// CLOCKWISE belt wrap (normal points outward on the LEFT of the C1->C2 vector).
function externalClockwiseTangent(c1, r1, c2, r2) {
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;
  const dist = Math.hypot(dx, dy);
  const baseAngle = Math.atan2(dy, dx);
  // Outward normal angle phi satisfies: (c2 + r2*n) - (c1 + r1*n) perpendicular to n
  // dot(d, n) = r1 - r2 => cos(phi - baseAngle) = (r1 - r2) / dist
  const cosDiff = clamp((r1 - r2) / dist, -0.9999, 0.9999);
  // For a clockwise perimeter, outward normal is to the LEFT (+sin) of travel direction
  const phi = baseAngle + Math.acos(cosDiff);
  const nx = Math.cos(phi);
  const ny = Math.sin(phi);
  return {
    phi,
    p1: { x: c1.x + r1 * nx, y: c1.y + r1 * ny },
    p2: { x: c2.x + r2 * nx, y: c2.y + r2 * ny },
    length: Math.hypot(
      (c2.x + r2 * nx) - (c1.x + r1 * nx),
      (c2.y + r2 * ny) - (c1.y + r1 * ny)
    )
  };
}

function clockwiseArcDelta(phiStart, phiEnd) {
  // Angle swept in clockwise (negative) direction from phiStart to phiEnd in (0, 2*PI]
  let delta = (phiStart - phiEnd) % TAU;
  if (delta <= 1e-9) delta += TAU;
  return delta;
}

function buildTrackLoopGeometry(sprocketRadius) {
  const t = PB_SPECS.tracks;
  const wheelY = t.beltY + t.roadWheelRadius;

  // 4 corner circles defining the exact outer belt envelope (clockwise order):
  // 0: Rear Drive Sprocket (S)
  // 1: Front Tensioner Idler (I)
  // 2: Front-most Road Wheel (W4)
  // 3: Rear-most Road Wheel (W0)
  const circles = [
    { id: 'sprocket', x: t.sprocketCenter.x, y: t.sprocketCenter.y, r: sprocketRadius },
    { id: 'idler', x: t.idlerCenter.x, y: t.idlerCenter.y, r: t.idlerRadius },
    { id: 'frontWheel', x: t.roadWheelX[t.roadWheelX.length - 1], y: wheelY, r: t.roadWheelRadius },
    { id: 'rearWheel', x: t.roadWheelX[0], y: wheelY, r: t.roadWheelRadius }
  ];

  // Compute the 4 clockwise external tangent lines
  const tangents = [
    externalClockwiseTangent(circles[0], circles[0].r, circles[1], circles[1].r), // Top run
    externalClockwiseTangent(circles[1], circles[1].r, circles[2], circles[2].r), // Front ramp
    externalClockwiseTangent(circles[2], circles[2].r, circles[3], circles[3].r), // Bottom snow run
    externalClockwiseTangent(circles[3], circles[3].r, circles[0], circles[0].r)  // Rear ramp
  ];

  // Assemble ordered clockwise segments: [Arc 0 (Sprocket), Line 0 (Top), Arc 1 (Idler), Line 1, Arc 2, Line 2 (Bottom), Arc 3, Line 3]
  const segments = [];
  let totalLength = 0;

  for (let i = 0; i < 4; i++) {
    const prevTan = tangents[(i + 3) % 4];
    const nextTan = tangents[i];
    const c = circles[i];
    const phiStart = prevTan.phi;
    const phiEnd = nextTan.phi;
    const sweep = clockwiseArcDelta(phiStart, phiEnd);
    const arcLen = sweep * c.r;

    segments.push({
      type: 'arc',
      id: c.id,
      cx: c.x,
      cy: c.y,
      r: c.r,
      phiStart,
      phiEnd,
      sweep,
      sStart: totalLength,
      length: arcLen
    });
    totalLength += arcLen;

    const lineLen = nextTan.length;
    const dx = nextTan.p2.x - nextTan.p1.x;
    const dy = nextTan.p2.y - nextTan.p1.y;
    segments.push({
      type: 'line',
      id: `line_${i}`,
      p1: nextTan.p1,
      p2: nextTan.p2,
      tx: dx / lineLen,
      ty: dy / lineLen,
      nx: Math.cos(nextTan.phi),
      ny: Math.sin(nextTan.phi),
      sStart: totalLength,
      length: lineLen
    });
    totalLength += lineLen;
  }

  return { segments, totalLength, circles, sprocketRadius };
}

export function createTrackLoop() {
  const t = PB_SPECS.tracks;
  // Fixed-point solve so sprocket pitch circumference / sprocketTeeth === totalLength / numGrousers
  // Guaranteeing mathematically exact grouser-to-sprocket-tooth meshing with zero drift!
  let rSprocket = t.sprocketNomRadius;
  let loop = buildTrackLoopGeometry(rSprocket);
  for (let iter = 0; iter < 12; iter++) {
    const grouserPitch = loop.totalLength / t.numGrousers;
    const exactRSprocket = (t.sprocketTeeth * grouserPitch) / TAU;
    if (Math.abs(exactRSprocket - rSprocket) < 1e-11) {
      rSprocket = exactRSprocket;
      break;
    }
    rSprocket = exactRSprocket;
    loop = buildTrackLoopGeometry(rSprocket);
  }

  const grouserPitch = loop.totalLength / t.numGrousers;
  const sprocketSeg = loop.segments[0]; // Arc 0 is always the rear drive sprocket!

  function sampleAt(sInput) {
    let s = sInput % loop.totalLength;
    if (s < 0) s += loop.totalLength;

    for (let i = 0; i < loop.segments.length; i++) {
      const seg = loop.segments[i];
      if (s <= seg.sStart + seg.length + 1e-9 || i === loop.segments.length - 1) {
        const localS = clamp(s - seg.sStart, 0, seg.length);
        if (seg.type === 'arc') {
          const phi = seg.phiStart - localS / seg.r;
          const nx = Math.cos(phi);
          const ny = Math.sin(phi);
          // Clockwise tangent is (ny, -nx)
          const tx = ny;
          const ty = -nx;
          return {
            x: seg.cx + seg.r * nx,
            y: seg.cy + seg.r * ny,
            tx,
            ty,
            nx,
            ny,
            angle: Math.atan2(ty, tx), // Angle of forward tangent in XY plane
            segmentId: seg.id
          };
        }
        const frac = seg.length > 1e-9 ? localS / seg.length : 0;
        return {
          x: seg.p1.x + (seg.p2.x - seg.p1.x) * frac,
          y: seg.p1.y + (seg.p2.y - seg.p1.y) * frac,
          tx: seg.tx,
          ty: seg.ty,
          nx: seg.nx,
          ny: seg.ny,
          angle: Math.atan2(seg.ty, seg.tx),
          segmentId: seg.id
        };
      }
    }
    return { x: 0, y: 0, tx: 1, ty: 0, nx: 0, ny: 1, angle: 0, segmentId: 'fallback' };
  }

  // Exact sprocket rotation angle (around Z) so tooth valley k aligns with every grouser on sprocket!
  function getSprocketAngle(trackOffsetM) {
    return sprocketSeg.phiStart + (sprocketSeg.sStart - trackOffsetM) / rSprocket;
  }

  return {
    totalLength: loop.totalLength,
    grouserPitch,
    numGrousers: t.numGrousers,
    sprocketTeeth: t.sprocketTeeth,
    sprocketRadius: rSprocket,
    sprocketArc: sprocketSeg,
    segments: loop.segments,
    sampleAt,
    getSprocketAngle
  };
}

export const TRACK_LOOP = createTrackLoop();

// ============================================================================
// 3. 12-WAY FRONT SNOW BLADE KINEMATICS (5-DOF + 8 EXACT HYDRAULIC CYLINDERS)
// ============================================================================
export function solveBladeKinematics(ctrl = {}) {
  const b = PB_SPECS.blade;
  const liftNorm = clamp(ctrl.lift ?? 0.08, -0.25, 1.0); // 0 = snow contact, 1 = high carry
  const angleDeg = clamp(ctrl.angleDeg ?? 0, -b.angleMaxDeg, b.angleMaxDeg);
  const tiltDeg = clamp(ctrl.tiltDeg ?? 0, -b.tiltMaxDeg, b.tiltMaxDeg);
  const pitchDeg = clamp(ctrl.pitchDeg ?? 4, b.pitchMinDeg, b.pitchMaxDeg);
  const wingDeg = clamp(ctrl.wingDeg ?? 20, b.wingMinDeg, b.wingMaxDeg);

  // Lift boom pitch around Z: negative angle lowers blade onto snow, positive lifts it
  const boomPitchRad = degToRad(-12 + liftNorm * 36);
  const angleRad = degToRad(angleDeg);
  const tiltRad = degToRad(tiltDeg);
  const pitchRad = degToRad(pitchDeg);
  const wingRad = degToRad(wingDeg);

  const pivot = b.boomPivot;
  const boomToWorld = (localPt) => vec3Add(pivot, rotZ(localPt, boomPitchRad));

  // Front hitch head sits at end of lift boom
  const headOrigin = boomToWorld({ x: b.boomLength, y: -0.04, z: 0 });
  // Head stays roughly level (parallel linkage effect) with mild boom influence
  const headPitchRad = boomPitchRad * 0.22;
  const headToWorld = (localPt) => vec3Add(headOrigin, rotZ(localPt, headPitchRad));

  // Blade center pivot sits slightly ahead of head
  const bladeOrigin = headToWorld({ x: b.headToBladePivotX, y: -0.04, z: 0 });

  // Blade orientation: yaw (angle) -> roll (tilt) -> pitch (cutting angle)
  const bladeLocalToWorld = (localPt) => {
    let v = rotZ(localPt, pitchRad);
    v = rotX(v, tiltRad);
    v = rotY(v, angleRad);
    return vec3Add(bladeOrigin, v);
  };

  // Left & Right foldable wing hinges (Klappohren)
  // Positive wingRad scoops wing FORWARD (+X) toward snow!
  const wingLocalToWorld = (side, wingLocalPt) => {
    // side = +1 (right, +Z) or -1 (left, -Z)
    // For right wing (+Z), scooping forward (+X) means rotating around Y by +wingRad (since +Z rotated +Y moves to +X!)
    // For left wing (-Z), scooping forward (+X) means rotating around Y by -wingRad!
    const hingeLocal = { x: 0, y: 0, z: side * b.wingHingeZ };
    const localWingOffset = { x: wingLocalPt.x, y: wingLocalPt.y, z: side * wingLocalPt.z };
    const rotated = rotY(localWingOffset, side * wingRad);
    return bladeLocalToWorld(vec3Add(hingeLocal, rotated));
  };

  // Solve ALL 8 Hydraulic Cylinders cleanly between their exact structural lugs
  const cylinders = {
    liftLeft: solveHydraulicCylinder(
      { x: b.liftCylChassis.x, y: b.liftCylChassis.y, z: -b.liftCylChassisZ },
      boomToWorld({ x: b.liftCylBoomLocal.x, y: b.liftCylBoomLocal.y, z: -b.liftCylChassisZ })
    ),
    liftRight: solveHydraulicCylinder(
      { x: b.liftCylChassis.x, y: b.liftCylChassis.y, z: b.liftCylChassisZ },
      boomToWorld({ x: b.liftCylBoomLocal.x, y: b.liftCylBoomLocal.y, z: b.liftCylChassisZ })
    ),
    angleLeft: solveHydraulicCylinder(
      boomToWorld({ x: b.angleCylBoomLocal.x, y: b.angleCylBoomLocal.y, z: -b.angleCylBoomLocal.z }),
      bladeLocalToWorld({ x: b.angleCylBladeLocal.x, y: b.angleCylBladeLocal.y, z: -b.angleCylBladeLocal.z })
    ),
    angleRight: solveHydraulicCylinder(
      boomToWorld({ x: b.angleCylBoomLocal.x, y: b.angleCylBoomLocal.y, z: b.angleCylBoomLocal.z }),
      bladeLocalToWorld({ x: b.angleCylBladeLocal.x, y: b.angleCylBladeLocal.y, z: b.angleCylBladeLocal.z })
    ),
    tilt: solveHydraulicCylinder(
      headToWorld(b.tiltCylHeadLocal),
      bladeLocalToWorld(b.tiltCylBladeLocal)
    ),
    pitch: solveHydraulicCylinder(
      headToWorld(b.pitchCylHeadLocal),
      bladeLocalToWorld(b.pitchCylBladeLocal)
    ),
    wingLeft: solveHydraulicCylinder(
      bladeLocalToWorld({ x: b.wingCylBladeLocal.x, y: b.wingCylBladeLocal.y, z: -b.wingCylBladeLocal.z }),
      wingLocalToWorld(-1, b.wingCylWingLocal)
    ),
    wingRight: solveHydraulicCylinder(
      bladeLocalToWorld({ x: b.wingCylBladeLocal.x, y: b.wingCylBladeLocal.y, z: b.wingCylBladeLocal.z }),
      wingLocalToWorld(1, b.wingCylWingLocal)
    )
  };

  // Bottom cutting edge reference point for snow contact & snow wave particles
  const cuttingEdgeCenter = bladeLocalToWorld({ x: 0.24, y: -0.44, z: 0 });
  const effectiveWidthM = b.centerWidth + 2 * b.wingWidth * Math.cos(wingRad);

  return {
    boomPivot: pivot,
    boomPitchRad,
    headOrigin,
    headPitchRad,
    bladeOrigin,
    angleRad,
    tiltRad,
    pitchRad,
    wingRad,
    cuttingEdgeCenter,
    effectiveWidthM,
    snowContact: cuttingEdgeCenter.y < 0.22,
    cylinders
  };
}

// ============================================================================
// 4. ALPINFLEXFRÄSE & ELASTIC YELLOW FINISHER KINEMATICS
// ============================================================================
export function solveTillerKinematics(ctrl = {}) {
  const ti = PB_SPECS.tiller;
  const active = ctrl.active !== false;
  const downpressure = clamp(ctrl.downpressure ?? 0.65, 0, 1);
  const wingsFolded = Boolean(ctrl.wingsFolded);

  // Arm pitch: lowered to snow when active, lifted cleanly into transport when inactive
  // Remember rear arm extends in -X from hitchPivot (-2.32, 0.68):
  // Rotating (-armLength, 0) by +angle around Z moves it DOWN (-Y)!
  const armPitchRad = active
    ? degToRad(18.5 + downpressure * 3.8)
    : degToRad(-18.0);

  const hitch = ti.hitchPivot;
  const armToWorld = (localPt) => vec3Add(hitch, rotZ(localPt, armPitchRad));

  const shaftCenter = armToWorld({ x: -ti.armLength, y: -0.04, z: 0 });
  const housingPitchRad = active ? degToRad(-3 + downpressure * 2) : degToRad(-12);

  // Twin rear lift/downpressure cylinders
  const cylinders = {
    liftLeft: solveHydraulicCylinder(
      { x: ti.liftCylChassis.x, y: ti.liftCylChassis.y, z: -ti.liftCylChassis.z },
      armToWorld({ x: ti.liftCylArmLocal.x, y: ti.liftCylArmLocal.y, z: -ti.liftCylArmLocal.z })
    ),
    liftRight: solveHydraulicCylinder(
      { x: ti.liftCylChassis.x, y: ti.liftCylChassis.y, z: ti.liftCylChassis.z },
      armToWorld({ x: ti.liftCylArmLocal.x, y: ti.liftCylArmLocal.y, z: ti.liftCylArmLocal.z })
    )
  };

  // Elastic Yellow Finisher ("gelber Teppich") trailing behind cutter housing
  // Compute articulated strip profile from rear edge of tiller housing down onto snow y = 0.024
  const segCount = ti.finisherSegments;
  const segLen = ti.finisherLength / segCount;
  const finisherStart = {
    x: shaftCenter.x - 0.30,
    y: Math.max(0.18, shaftCenter.y + 0.06)
  };

  const finisherCurve = [];
  let cx = finisherStart.x;
  let cy = finisherStart.y;
  for (let i = 0; i <= segCount; i++) {
    const tFrac = i / segCount;
    if (active) {
      // Smooth elastic polyurethane curve curving down to hug the snow plane y = 0.025!
      const snowY = 0.022 + (1 - downpressure) * 0.018;
      // Exponential bend from housing edge down onto snow over first 55% of mat, then flat pressure plate!
      const bend = Math.pow(1 - tFrac, 2.35);
      cy = snowY + (finisherStart.y - snowY) * bend;
      cx = finisherStart.x - tFrac * ti.finisherLength;
    } else {
      // Raised transport: mat hangs flexibly downward under gravity with soft S-droop
      cx = finisherStart.x - tFrac * ti.finisherLength * 0.88;
      cy = finisherStart.y - Math.pow(tFrac, 1.55) * 0.44;
    }
    finisherCurve.push({ x: cx, y: cy });
  }

  const wingFoldRad = wingsFolded ? degToRad(84) : 0;
  const workingWidthM = wingsFolded ? PB_SPECS.identity.finisherFoldedWidthM : PB_SPECS.identity.finisherTotalWidthM;
  const finisherTrailingX = finisherCurve[finisherCurve.length - 1].x;

  return {
    active,
    downpressure,
    hitch,
    armPitchRad,
    housingPitchRad,
    shaftCenter,
    finisherStart,
    finisherCurve,
    finisherTrailingX,
    wingFoldRad,
    workingWidthM,
    finisherHalfWidth: workingWidthM * 0.5,
    cylinders
  };
}

// ============================================================================
// 5. 360° ACTIVE 4.7-t WINCH & CATENARY CABLE KINEMATICS
// ============================================================================
export function solveWinchKinematics(ctrl = {}, winchForceKN = 0) {
  const w = PB_SPECS.winch;
  const turretYawRad = degToRad(clamp(ctrl.turretYawDeg ?? 0, -180, 180));
  const boomElevRad = degToRad(w.boomElevationDeg);
  const pivot = w.turretPivot;

  // Helper: turret-local -> vehicle-local
  const turretToWorld = (localPt) => vec3Add(pivot, rotY(localPt, turretYawRad));

  // Boom pivot on top of rotating turret
  const boomPivotLocal = w.boomPivotLocal;
  const boomLocalToTurret = (bPt) => vec3Add(boomPivotLocal, rotZ(bPt, boomElevRad));
  const boomLocalToWorld = (bPt) => turretToWorld(boomLocalToTurret(bPt));

  const boomTip = boomLocalToWorld({ x: w.boomLength, y: 0.0, z: 0.0 });
  const boomCylinder = solveHydraulicCylinder(
    turretToWorld(w.boomCylBaseLocal),
    boomLocalToWorld(w.boomCylArmLocal)
  );

  // Anchor point uphill in slopeRoot frame
  const anchor = {
    x: w.anchorPoint.x,
    y: w.anchorPoint.y,
    z: w.anchorPoint.z + Math.sin(-turretYawRad) * 8.0
  };

  // Compute physically plausible catenary sag along steel winch cable
  // At 47 kN max tension -> razor-taut (sag ~0.04 m); at 2 kN -> noticeable sag (~1.1 m)
  const tensionRatio = clamp(winchForceKN / PB_SPECS.identity.maxWinchForceKN, 0, 1);
  const engaged = ctrl.mode !== 'off' && winchForceKN > 0.2;
  const maxSagM = engaged ? (0.035 + Math.pow(1 - tensionRatio, 1.8) * 0.85) : 0;

  const cablePoints = [];
  const samples = w.cableSamples;
  for (let i = 0; i <= samples; i++) {
    const u = i / samples;
    const lx = boomTip.x + (anchor.x - boomTip.x) * u;
    const ly = boomTip.y + (anchor.y - boomTip.y) * u;
    const lz = boomTip.z + (anchor.z - boomTip.z) * u;
    // Parabolic approximation of shallow catenary (exact for sag << span)
    const sag = 4 * u * (1 - u) * maxSagM;
    cablePoints.push({ x: lx, y: Math.max(0.08, ly - sag), z: lz });
  }

  const cableVec = vec3Sub(anchor, boomTip);
  const cableDist = vec3Len(cableVec);
  const cableDir = cableDist > 1e-6
    ? { x: cableVec.x / cableDist, y: cableVec.y / cableDist, z: cableVec.z / cableDist }
    : { x: 1, y: 0, z: 0 };

  return {
    engaged,
    turretPivot: pivot,
    turretYawRad,
    boomElevRad,
    boomPivotWorld: turretToWorld(boomPivotLocal),
    boomTip,
    boomCylinder,
    anchor,
    cablePoints,
    cableDir,
    tensionRatio,
    maxSagM
  };
}
