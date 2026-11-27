// Mathematical Kinematics Solver for UP Big Boy (4-8-8-4 Simple Articulated)
// Pure ES module (no Three.js dependency) so unit tests verify every joint closure directly.

import {
  BIG_BOY_SPECS,
  ECCENTRIC_ROD_LENGTH,
  RADIUS_ROD_LENGTH,
  STEAM_PIPE_ANCHORS
} from './specs.js';

const { wheels, cylinder, valveGear, layout, track } = BIG_BOY_SPECS;

/**
 * Exact 2D circle-circle intersection returning the lower-Y (or specified) intersection point.
 * Used for exact expansion link tail pin solution.
 */
function intersectCircles(x0, y0, r0, x1, y1, r1, preferLowerY = true) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const d = Math.hypot(dx, dy);
  if (d < 1e-9 || d > r0 + r1 || d < Math.abs(r0 - r1)) {
    // Fallback clamped along line of centers (should never trigger within spec bounds)
    const nx = d > 1e-9 ? dx / d : 1;
    const ny = d > 1e-9 ? dy / d : 0;
    return { x: x0 + nx * r0, y: y0 + ny * r0 };
  }
  const a = (r0 * r0 - r1 * r1 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, r0 * r0 - a * a));
  const xm = x0 + (a * dx) / d;
  const ym = y0 + (a * dy) / d;
  const rx = (-dy * h) / d;
  const ry = (dx * h) / d;
  const p1 = { x: xm + rx, y: ym + ry };
  const p2 = { x: xm - rx, y: ym - ry };
  if (preferLowerY) {
    return p1.y <= p2.y ? p1 : p2;
  }
  return p1.y >= p2.y ? p1 : p2;
}

/**
 * Solve complete single-side driving gear + Walschaerts/Heusinger valve gear
 * in the local frame of one 4-axle engine unit (origin at unit's straight-track world coords,
 * or relative to engine unit group).
 *
 * @param {object} engineSpec - layout.frontEngine or layout.rearEngine
 * @param {number} crankAngle - theta in radians (0 = FDC, increases CW from +Z for forward motion)
 * @param {number} cutoff - Cut-off control in [-0.80, +0.80] (+0.80 = full forward, 0 = neutral, -0.80 = full reverse)
 * @returns {object} Exact 2D (x, y) coordinates of every pin, rod, crosshead, link, die block & valve
 */
export function solveEngineSideKinematics(engineSpec, crankAngle, cutoff) {
  const yAxle = wheels.driverRadius;
  const rc = cylinder.crankRadius;
  const mainAxleX = engineSpec.driverXs[engineSpec.mainAxleIndex];
  const cylX = engineSpec.cylinderX;

  const cosT = Math.cos(crankAngle);
  const sinT = Math.sin(crankAngle);

  // 1. All 4 coupled driving crankpins (identical orbital offset around each axle)
  const pinDx = rc * cosT;
  const pinDy = -rc * sinT; // CW rotation when viewed from +Z as locomotive moves +X
  const crankPins = engineSpec.driverXs.map((ax) => ({
    axleX: ax,
    x: ax + pinDx,
    y: yAxle + pinDy
  }));

  const mainPin = crankPins[engineSpec.mainAxleIndex];

  // 2. Exact Slider-Crank (Schubkurbel) -> Main Rod, Crosshead & Piston
  const Lmain = valveGear.mainRodLength;
  const mainRodHoriz = Math.sqrt(Math.max(1e-6, Lmain * Lmain - pinDy * pinDy));
  const crossheadX = mainPin.x + mainRodHoriz;
  const crossheadY = yAxle;
  const crossheadMidX = mainAxleX + Lmain;
  const pistonDisp = crossheadX - crossheadMidX; // in [-rc, +rc]
  const pistonX = cylX + pistonDisp;
  const pistonNorm = (pistonDisp + rc) / (2 * rc); // 0 = Rear Dead Center, 1 = Front Dead Center

  // Crosshead drop arm pin for Walschaerts union link
  const dropArmPin = {
    x: crossheadX,
    y: yAxle + valveGear.unionLinkDropDy
  };

  // 3. Eccentric Crank (Gegenkurbel) – rigidly 90° behind main crank on main axle
  // theta_ecc = crankAngle - pi/2 -> cos = sinT, -sin = cosT
  const rEcc = valveGear.eccentricRadius;
  const eccentricPin = {
    x: mainAxleX + rEcc * sinT,
    y: yAxle + rEcc * cosT
  };

  // 4. Expansion Link (Schwinge / Kulisse) – exact circle-circle closure with eccentric rod
  const linkPivot = {
    x: mainAxleX + valveGear.linkPivotDx,
    y: yAxle + valveGear.linkPivotDy
  };
  const linkTail = intersectCircles(
    linkPivot.x,
    linkPivot.y,
    valveGear.linkTailLength,
    eccentricPin.x,
    eccentricPin.y,
    ECCENTRIC_ROD_LENGTH,
    true // tail hangs below link trunnion
  );

  // Link swing angle phiLink = 0 when tail hangs straight down (0, -L_tail)
  // Positive phiLink = CCW rotation (tail moves +X, top of slot moves -X)
  const linkAngle = Math.atan2(
    linkTail.x - linkPivot.x,
    -(linkTail.y - linkPivot.y)
  );

  // 5. Reverser & Die Block (Kulissenstein) inside curved link slot
  // u in [-1, +1]; u > 0 (Forward) puts die block in TOP half (sDie > 0) for inside-admission valves
  const u = Math.max(-1, Math.min(1, cutoff / 0.8));
  const sDie = u * valveGear.linkSlotHalfSpan;

  // Curved slot of radius RADIUS_ROD_LENGTH centered forward of link pivot (concave towards cylinder)
  // For exact Walschaerts geometry, arc curvature ensures lead stays invariant with cut-off!
  const arcSag = RADIUS_ROD_LENGTH - Math.sqrt(Math.max(1e-6, RADIUS_ROD_LENGTH * RADIUS_ROD_LENGTH - sDie * sDie));
  // Local slot point before rotation by linkAngle: (localX = -arcSag, localY = sDie)
  const cosPhi = Math.cos(linkAngle);
  const sinPhi = Math.sin(linkAngle);
  const dieBlock = {
    x: linkPivot.x + (-arcSag * cosPhi - sDie * sinPhi),
    y: linkPivot.y + (-arcSag * sinPhi + sDie * cosPhi)
  };

  // 6. Radius Rod (Schieberschubstange) -> connects Die Block to Combination Lever fulcrum pin
  // Combination lever top pin (valve stem) moves strictly horizontally along y = cylinder.steamChestY!
  const valveStemY = cylinder.steamChestY;
  const combA = valveGear.combTopA;
  const combB = valveGear.combBottomB;

  // Radius rod pin on combination lever sits at height yRad ≈ valveStemY - combA
  const yRad = valveStemY - combA;
  const dyRad = yRad - dieBlock.y;
  const radHoriz = Math.sqrt(Math.max(1e-6, RADIUS_ROD_LENGTH * RADIUS_ROD_LENGTH - dyRad * dyRad));
  const radiusRodPin = {
    x: dieBlock.x + radHoriz,
    y: yRad
  };

  // Neutral reference X of the radius-rod pin (when dieBlock is at linkPivot and linkAngle = 0)
  const neutralRadX = linkPivot.x + Math.sqrt(Math.max(1e-6, RADIUS_ROD_LENGTH * RADIUS_ROD_LENGTH - (yRad - linkPivot.y) ** 2));
  const radDisp = radiusRodPin.x - neutralRadX;

  // 7. Combination Lever (Voreilhebel) – Inside Admission layout:
  //    TOP pin = Valve Stem (y = valveStemY)
  //    UPPER-MID pin = Radius Rod (combA below valve stem)
  //    BOTTOM pin = Union Link to Crosshead Drop Arm (combB below radius rod)
  // Lever geometry: bottom moves by pistonDisp, fulcrum (radiusRodPin) moves by radDisp
  // => top (valve stem) displacement = radDisp * (combA + combB) / combB - pistonDisp * (combA / combB)
  const valveDisp =
    radDisp * ((combA + combB) / combB) -
    pistonDisp * (combA / combB);

  const valveStemPin = {
    x: neutralRadX + valveDisp,
    y: valveStemY
  };

  // Exact bottom pin of combination lever (collinear rigid bar through valveStemPin & radiusRodPin)
  const combDirX = radiusRodPin.x - valveStemPin.x;
  const combDirY = radiusRodPin.y - valveStemPin.y;
  const combLenTop = Math.hypot(combDirX, combDirY) || combA;
  const combScale = (combA + combB) / combLenTop;
  const combBottomPin = {
    x: valveStemPin.x + combDirX * combScale,
    y: valveStemPin.y + combDirY * combScale
  };

  // Piston valve center inside steam chest
  const valveX = cylX + valveDisp;

  // 8. Port opening states for inside-admission piston valve:
  //    Center cavity = Live High-Pressure Steam (~395 °C, 20.7 bar)
  //    Outer ends = Exhaust cavities (~115 °C, 1.35 bar)
  //    Front port (+X side) opens to LIVE STEAM when valveDisp < -steamLap
  //    Front port (+X side) opens to EXHAUST when valveDisp > +exhaustLap
  //    Rear port (-X side) opens to LIVE STEAM when valveDisp > +steamLap
  //    Rear port (-X side) opens to EXHAUST when valveDisp < -exhaustLap
  const lap = cylinder.steamLap;
  const exLap = cylinder.exhaustLap;
  const maxPort = cylinder.portWidth;

  const frontAdmissionOpen = Math.max(0, Math.min(1, (-valveDisp - lap) / maxPort));
  const frontExhaustOpen = Math.max(0, Math.min(1, (valveDisp - exLap) / maxPort));
  const rearAdmissionOpen = Math.max(0, Math.min(1, (valveDisp - lap) / maxPort));
  const rearExhaustOpen = Math.max(0, Math.min(1, (-valveDisp - exLap) / maxPort));

  // Lifting shaft / reverse arm geometry for visual authenticity
  const liftArmPivot = {
    x: linkPivot.x + 0.55,
    y: linkPivot.y + 0.62
  };
  const liftLinkAttach = {
    x: dieBlock.x + 0.36 * ((radiusRodPin.x - dieBlock.x) / RADIUS_ROD_LENGTH),
    y: dieBlock.y + 0.36 * ((radiusRodPin.y - dieBlock.y) / RADIUS_ROD_LENGTH)
  };
  const liftArmTip = {
    x: liftLinkAttach.x,
    y: liftArmPivot.y + (sDie * 0.85)
  };

  return {
    crankAngle,
    wheelRotZ: -crankAngle,
    crankPins,
    mainPin,
    crosshead: { x: crossheadX, y: crossheadY },
    dropArmPin,
    pistonX,
    pistonDisp,
    pistonNorm,
    eccentricPin,
    linkPivot,
    linkTail,
    linkAngle,
    dieBlock,
    sDie,
    radiusRodPin,
    valveStemPin,
    combBottomPin,
    valveX,
    valveDisp,
    liftArmPivot,
    liftArmTip,
    liftLinkAttach,
    ports: {
      frontAdmissionOpen,
      frontExhaustOpen,
      rearAdmissionOpen,
      rearExhaustOpen
    }
  };
}

/**
 * Solve both right (+Z) and left (-Z) sides of an engine unit with exact 90° quartering.
 */
export function solveEngineUnitKinematics(engineSpec, baseCrankAngle, cutoff) {
  return {
    right: solveEngineSideKinematics(engineSpec, baseCrankAngle, cutoff),
    left: solveEngineSideKinematics(engineSpec, baseCrankAngle + Math.PI / 2, cutoff)
  };
}

/**
 * Solve curved-track articulation geometry for the 4-8-8-4 Big Boy.
 * Rear engine & boiler stay tangent to the circular curve at rearEngine.midX (z = 0).
 * Front engine pivots around hingeX so its midX stays exactly on the curved track centerline.
 *
 * @param {number} curveBlend - 0 (straight) to 1 (full 20° curve, R = 87.3 m)
 * @returns {object} Articulation angles, track centerline helper, and ball-joint pipe endpoints
 */
export function solveArticulation(curveBlend) {
  const blend = Math.max(0, Math.min(1, curveBlend));
  const rearMidX = layout.rearEngine.midX;
  const hingeX = layout.hingeX;
  const frontMidX = layout.frontEngine.midX;
  const dHingeToFront = frontMidX - hingeX;

  if (blend < 1e-5) {
    return {
      blend: 0,
      curvature: 0,
      curveRadius: Infinity,
      frontYaw: 0,
      leadingTruckYaw: 0,
      trailingTruckYaw: 0,
      boilerOverhangAtSmokebox: 0,
      trackPoint: (x) => ({ x, z: 0, yaw: 0 }),
      livePipe: {
        start: { ...STEAM_PIPE_ANCHORS.liveRearBall },
        end: { ...STEAM_PIPE_ANCHORS.liveFrontBall },
        length: Math.hypot(
          STEAM_PIPE_ANCHORS.liveFrontBall.x - STEAM_PIPE_ANCHORS.liveRearBall.x,
          STEAM_PIPE_ANCHORS.liveFrontBall.y - STEAM_PIPE_ANCHORS.liveRearBall.y,
          STEAM_PIPE_ANCHORS.liveFrontBall.z - STEAM_PIPE_ANCHORS.liveRearBall.z
        )
      },
      exhaustPipe: {
        start: { ...STEAM_PIPE_ANCHORS.exhaustFrontBall },
        end: { ...STEAM_PIPE_ANCHORS.exhaustSmokeboxBall },
        length: Math.hypot(
          STEAM_PIPE_ANCHORS.exhaustSmokeboxBall.x - STEAM_PIPE_ANCHORS.exhaustFrontBall.x,
          STEAM_PIPE_ANCHORS.exhaustSmokeboxBall.y - STEAM_PIPE_ANCHORS.exhaustFrontBall.y,
          STEAM_PIPE_ANCHORS.exhaustSmokeboxBall.z - STEAM_PIPE_ANCHORS.exhaustFrontBall.z
        )
      }
    };
  }

  // Curvature kappa = blend / R_min (curving towards -Z so boiler overhangs towards +Z camera!)
  const kappa = blend / track.demoCurveRadius;
  const R = 1 / kappa;

  // Circle center at (x = rearMidX, z = -R)
  // A point at arc length s from rearMidX is at:
  //   x(s) = rearMidX + R * sin(s * kappa)
  //   z(s) = -R * (1 - cos(s * kappa))
  //   tangent yaw (Three.js rotation.y: +yaw rotates +X towards -Z) = s * kappa
  const trackPoint = (sFromOrigin) => {
    const s = sFromOrigin - rearMidX;
    const ang = s * kappa;
    return {
      x: rearMidX + R * Math.sin(ang),
      z: -R * (1 - Math.cos(ang)),
      yaw: ang // positive rotation.y in Three.js turns +X toward -Z!
    };
  };

  // Exact law-of-cosines solution so front engine center (at distance dHingeToFront from hingeX)
  // lies strictly on the circle of radius R centered at (rearMidX, -R).
  const cx = rearMidX;
  const cz = -R;
  const vx = hingeX - cx; // > 0
  const vz = 0 - cz;      // = R > 0
  const D = Math.hypot(vx, vz);

  // Target point P = (hingeX + d*cos(yaw), -d*sin(yaw)) with |P - C|^2 = R^2
  // Let vector from C to H be (vx, vz) = D*(cos beta, sin beta)
  // |H + d*(cos yaw, -sin yaw) - C|^2 = D^2 + d^2 + 2*D*d*(cos beta cos yaw - sin beta sin yaw) = R^2
  // => cos(yaw + beta) = (R^2 - D^2 - d^2) / (2 * D * d)
  const beta = Math.atan2(vz, vx); // near +pi/2
  const cosSum = Math.max(-1, Math.min(1, (R * R - D * D - dHingeToFront * dHingeToFront) / (2 * D * dHingeToFront)));
  // We want small positive yaw so yaw + beta > pi/2 -> acos gives angle in [0, pi]
  const frontYaw = Math.acos(cosSum) - beta;

  // Leading truck local yaw (relative to front engine) to stay tangent at kingpinX
  const leadTrackYaw = (layout.leadingTruck.kingpinX - rearMidX) * kappa;
  const leadingTruckYaw = leadTrackYaw - frontYaw;

  // Trailing truck local yaw (relative to rear frame) to stay tangent at trailing kingpinX
  const trailingTruckYaw = (layout.trailingTruck.kingpinX - rearMidX) * kappa;

  // Helper to transform a point rigidly attached to front engine (rotating around hingeX by frontYaw in Three.js Y-up)
  // In Three.js: rotation.y = +alpha maps (dx, dz) -> (dx cos a + dz sin a, -dx sin a + dz cos a)
  const cosY = Math.cos(frontYaw);
  const sinY = Math.sin(frontYaw);
  const toWorldFromFront = (pt) => {
    const dx = pt.x - hingeX;
    const dz = pt.z;
    return {
      x: hingeX + dx * cosY + dz * sinY,
      y: pt.y,
      z: -dx * sinY + dz * cosY
    };
  };

  const liveStart = { ...STEAM_PIPE_ANCHORS.liveRearBall };
  const liveEnd = toWorldFromFront(STEAM_PIPE_ANCHORS.liveFrontBall);
  const exhaustStart = toWorldFromFront(STEAM_PIPE_ANCHORS.exhaustFrontBall);
  const exhaustEnd = { ...STEAM_PIPE_ANCHORS.exhaustSmokeboxBall };

  const smokeboxTrackPt = trackPoint(layout.boiler.smokeboxFrontX);
  const boilerOverhangAtSmokebox = -smokeboxTrackPt.z; // positive meters of overhang

  return {
    blend,
    curvature: kappa,
    curveRadius: R,
    frontYaw,
    leadingTruckYaw,
    trailingTruckYaw,
    boilerOverhangAtSmokebox,
    trackPoint,
    livePipe: {
      start: liveStart,
      end: liveEnd,
      length: Math.hypot(liveEnd.x - liveStart.x, liveEnd.y - liveStart.y, liveEnd.z - liveStart.z)
    },
    exhaustPipe: {
      start: exhaustStart,
      end: exhaustEnd,
      length: Math.hypot(exhaustEnd.x - exhaustStart.x, exhaustEnd.y - exhaustStart.y, exhaustEnd.z - exhaustStart.z)
    }
  };
}
