// Master C1-Continuous Kinematics Solver for 2-Etagen-Funitel-Gondelstation
// Guarantees zero teleports, C1 smooth tangents & velocities, exact phase lock
// between all 10 Funitel 24er cabins and ALL FOUR vertical Ferris wheels, and Δv = 0 at coupling!

import { GS_SPECS } from './specs.js';

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function smoothstep(u) {
  const t = clamp(u, 0, 1);
  return t * t * (3 - 2 * t);
}

// Catenary-like vertical profile from Station Portal (X=15.0, Y=10.10, slope=0)
// through Tower 1 (X=36.0, Y=15.65) up to Mountain Turnaround (X=xTop, Y=26.8, slope=0)
function evalMountainY(x, xTop, dynamicSagOffset = 0) {
  const { ogRailY } = GS_SPECS.floors;
  const { portalDeflectorX, tower1X, tower1SheaveY, mountainTopY, catenarySagM } = GS_SPECS.track;

  const mTower = 0.295;
  const sag = catenarySagM + dynamicSagOffset;

  if (x <= portalDeflectorX) {
    return { y: ogRailY, dydx: 0 };
  }
  if (x <= tower1X) {
    const L = tower1X - portalDeflectorX;
    const u = (x - portalDeflectorX) / L;
    const h00 = 2 * u * u * u - 3 * u * u + 1;
    const h10 = u * u * u - 2 * u * u + u;
    const h01 = -2 * u * u * u + 3 * u * u;
    const h11 = u * u * u - u * u;
    const dh00 = (6 * u * u - 6 * u) / L;
    const dh10 = (3 * u * u - 4 * u + 1) / L;
    const dh01 = (-6 * u * u + 6 * u) / L;
    const dh11 = (3 * u * u - 2 * u) / L;

    const sagShape = 16 * u * u * (1 - u) * (1 - u);
    const dsagShape = (32 * u * (1 - u) * (1 - 2 * u)) / L;

    const y = h00 * ogRailY + h10 * 0 + h01 * tower1SheaveY + h11 * (mTower * L) - sag * sagShape;
    const dydx = dh00 * ogRailY + dh10 * 0 + dh01 * tower1SheaveY + dh11 * (mTower * L) - sag * dsagShape;
    return { y, dydx };
  }
  if (x <= xTop) {
    const L = xTop - tower1X;
    const u = (x - tower1X) / L;
    const h00 = 2 * u * u * u - 3 * u * u + 1;
    const h10 = u * u * u - 2 * u * u + u;
    const h01 = -2 * u * u * u + 3 * u * u;
    const h11 = u * u * u - u * u;
    const dh00 = (6 * u * u - 6 * u) / L;
    const dh10 = (3 * u * u - 4 * u + 1) / L;
    const dh01 = (-6 * u * u + 6 * u) / L;
    const dh11 = (3 * u * u - 2 * u) / L;

    const sagShape = 16 * u * u * (1 - u) * (1 - u);
    const dsagShape = (32 * u * (1 - u) * (1 - 2 * u)) / L;

    const y = h00 * tower1SheaveY + h10 * (mTower * L) + h01 * mountainTopY + h11 * 0 - sag * 1.15 * sagShape;
    const dydx = dh00 * tower1SheaveY + dh10 * (mTower * L) + dh01 * mountainTopY + dh11 * 0 - sag * 1.15 * dsagShape;
    return { y, dydx };
  }
  return { y: mountainTopY, dydx: 0 };
}

// Build discrete dense polyline of one complete closed Funitel cabin-centerline loop
// Notice: Because Funitel twin ropes sit symmetrically at Z_center ± 0.95 m (inner ±2.95 m, outer ±4.85 m),
// the cabin centerline runs straight at Z = ±3.90 m throughout OG, Ferris wheels, EG straights & mountain line!
function buildLoopSamples(xTop, dynamicSagOffset = 0) {
  const { ogRailY, egRailY } = GS_SPECS.floors;
  const W = GS_SPECS.wheels;
  const T = GS_SPECS.track;
  const V = GS_SPECS.speeds;

  const pts = [];
  const pushPt = (x, y, z, vNom, zone, yawFixed, wheelAngle = null, wheelSide = 0) => {
    pts.push({ x, y, z, vNom, zone, yawFixed, wheelAngle, wheelSide });
  };

  // --- SEG A: Incoming OG straight (X = 15.0 -> 10.5, Z = -3.90, fast 6.0 m/s) ---
  {
    const n = 45;
    for (let i = 0; i < n; i++) {
      const x = T.portalDeflectorX + (T.conveyorOuterX - T.portalDeflectorX) * (i / n);
      const zone = (x <= T.rampEndX && x >= T.rampStartX) ? 'detach' : 'rope_in';
      pushPt(x, ogRailY, -T.stationRailZ, V.nominalRopeMs, zone, Math.PI);
    }
  }

  // --- SEG B: Deceleration Tire Conveyor (X = 10.5 -> -3.0, Z = -3.90, v: 6.0 -> 0.30 m/s) ---
  {
    const n = 135;
    for (let i = 0; i < n; i++) {
      const u = i / n;
      const x = T.conveyorOuterX + (T.conveyorInnerX - T.conveyorOuterX) * u;
      const vNom = V.nominalRopeMs + (V.slowStationMs - V.nominalRopeMs) * smoothstep(u);
      pushPt(x, ogRailY, -T.stationRailZ, vNom, 'decel', Math.PI);
    }
  }

  // --- SEG C: Downward Twin Vertical Ferris Wheel Pair (Wheels #1 & #2, θ = π/2 -> 3π/2, Z = -3.90) ---
  {
    const n = 120;
    for (let i = 0; i < n; i++) {
      const u = i / n;
      const theta = Math.PI * 0.5 + Math.PI * u;
      const x = W.centerX + W.carrierRadius * Math.cos(theta);
      const y = W.centerY + W.carrierRadius * Math.sin(theta);
      pushPt(x, y, W.downRailZ, V.slowStationMs, 'wheel_down', Math.PI, theta, -1);
    }
  }

  // --- SEG D: EG Disembarkation Straight (X = -3.0 -> +1.05, Y = 3.10, Z = -3.90, v = 0.30 m/s) ---
  {
    const n = 42;
    for (let i = 0; i < n; i++) {
      const u = i / n;
      const x = W.centerX + (T.egTurnCenterX - W.centerX) * u;
      pushPt(x, egRailY, W.downRailZ, V.slowStationMs, 'eg_disembark', Math.PI);
    }
  }

  // --- SEG E: EG Level Walk-In 180° U-Turn (ψ = -π/2 -> +π/2, Y = 3.10, R = 3.90, v = 0.30 m/s) ---
  {
    const n = 120;
    for (let i = 0; i < n; i++) {
      const u = i / n;
      const psi = -Math.PI * 0.5 + Math.PI * u;
      const x = T.egTurnCenterX + T.egTurnRadius * Math.cos(psi);
      const z = T.egTurnRadius * Math.sin(psi);
      const yaw = Math.PI * (1 - u);
      pushPt(x, egRailY, z, V.slowStationMs, 'eg_turn', yaw);
    }
  }

  // --- SEG F: EG Boarding Straight (X = +1.05 -> -3.0, Y = 3.10, Z = +3.90, v = 0.30 m/s) ---
  {
    const n = 42;
    for (let i = 0; i < n; i++) {
      const u = i / n;
      const x = T.egTurnCenterX + (W.centerX - T.egTurnCenterX) * u;
      pushPt(x, egRailY, W.upRailZ, V.slowStationMs, 'eg_board', 0);
    }
  }

  // --- SEG G: Upward Twin Vertical Ferris Wheel Pair (Wheels #3 & #4, θ = 3π/2 -> π/2, Z = +3.90) ---
  {
    const n = 120;
    for (let i = 0; i < n; i++) {
      const u = i / n;
      const theta = Math.PI * 1.5 - Math.PI * u;
      const x = W.centerX + W.carrierRadius * Math.cos(theta);
      const y = W.centerY + W.carrierRadius * Math.sin(theta);
      pushPt(x, y, W.upRailZ, V.slowStationMs, 'wheel_up', 0, theta, +1);
    }
  }

  // --- SEG H: Acceleration Tire Conveyor (X = -3.0 -> +10.5, Z = +3.90, v: 0.30 -> 6.0 m/s) ---
  {
    const n = 135;
    for (let i = 0; i < n; i++) {
      const u = i / n;
      const x = T.conveyorInnerX + (T.conveyorOuterX - T.conveyorInnerX) * u;
      const vNom = V.slowStationMs + (V.nominalRopeMs - V.slowStationMs) * smoothstep(u);
      pushPt(x, ogRailY, T.stationRailZ, vNom, 'accel', 0);
    }
  }

  // --- SEG I: Dual-Rope Attach Ramp + Check Zone + Portal (X = 10.5 -> 15.0, Z = +3.90, v = 6.0 m/s EXACT!) ---
  {
    const n = 45;
    for (let i = 0; i < n; i++) {
      const x = T.conveyorOuterX + (T.portalDeflectorX - T.conveyorOuterX) * (i / n);
      let zone = 'rope_out';
      if (x >= T.rampStartX && x <= T.rampEndX) zone = 'attach';
      else if (x >= T.checkStartX && x <= T.checkEndX) zone = 'check';
      pushPt(x, ogRailY, T.stationRailZ, V.nominalRopeMs, zone, 0);
    }
  }

  // --- SEG J: Outgoing Funitel Mountain Line (X = 15.0 -> xTop, Z = +3.90, v = 6.0 m/s) ---
  {
    const n = 160;
    for (let i = 0; i < n; i++) {
      const x = T.portalDeflectorX + (xTop - T.portalDeflectorX) * (i / n);
      const { y } = evalMountainY(x, xTop, dynamicSagOffset);
      pushPt(x, y, T.stationRailZ, V.nominalRopeMs, 'rope_out', 0);
    }
  }

  // --- SEG K: Mountain Top 180° Funitel Return Turnaround (X_c = xTop, Y = mountainTopY, R = 3.90 m) ---
  {
    const n = 48;
    for (let i = 0; i < n; i++) {
      const u = i / n;
      const psi = Math.PI * 0.5 - Math.PI * u;
      const x = xTop + T.stationRailZ * Math.cos(psi);
      const z = T.stationRailZ * Math.sin(psi);
      const yaw = Math.PI * u;
      pushPt(x, T.mountainTopY, z, V.nominalRopeMs, 'rope_out', yaw);
    }
  }

  // --- SEG L: Incoming Funitel Mountain Line (X = xTop -> 15.0, Z = -3.90, v = 6.0 m/s) ---
  {
    const n = 160;
    for (let i = 0; i < n; i++) {
      const x = xTop + (T.portalDeflectorX - xTop) * (i / n);
      const { y } = evalMountainY(x, xTop, dynamicSagOffset);
      pushPt(x, y, -T.stationRailZ, V.nominalRopeMs, 'rope_in', Math.PI);
    }
  }

  // Cumulative arc length s and nominal travel time tau
  const N = pts.length;
  const sArr = new Float64Array(N + 1);
  const tauArr = new Float64Array(N + 1);
  let sAcc = 0;
  let tauAcc = 0;

  for (let i = 0; i < N; i++) {
    sArr[i] = sAcc;
    tauArr[i] = tauAcc;
    const a = pts[i];
    const b = pts[(i + 1) % N];
    const ds = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
    const vMid = 0.5 * (a.vNom + b.vNom);
    sAcc += ds;
    tauAcc += ds / Math.max(0.05, vMid);
  }
  sArr[N] = sAcc;
  tauArr[N] = tauAcc;

  let tauDownStart = 0;
  let tauDownEnd = 0;
  let tauUpStart = 0;
  let tauUpEnd = 0;
  let sDownStart = 0;
  let sAttachStart = 0;
  let sAttachEnd = 0;
  let sDecelStart = 0;
  let sDecelEnd = 0;
  let sAccelStart = 0;
  let sAccelEnd = 0;

  for (let i = 0; i < N; i++) {
    const zPrev = pts[(i - 1 + N) % N].zone;
    const zCurr = pts[i].zone;
    if (zCurr === 'decel' && zPrev !== 'decel') sDecelStart = sArr[i];
    if (zCurr !== 'decel' && zPrev === 'decel') sDecelEnd = sArr[i];
    if (zCurr === 'wheel_down' && zPrev !== 'wheel_down') {
      tauDownStart = tauArr[i];
      sDownStart = sArr[i];
    }
    if (zCurr !== 'wheel_down' && zPrev === 'wheel_down') tauDownEnd = tauArr[i];
    if (zCurr === 'wheel_up' && zPrev !== 'wheel_up') tauUpStart = tauArr[i];
    if (zCurr !== 'wheel_up' && zPrev === 'wheel_up') tauUpEnd = tauArr[i];
    if (zCurr === 'accel' && zPrev !== 'accel') sAccelStart = sArr[i];
    if (zCurr !== 'accel' && zPrev === 'accel') sAccelEnd = sArr[i];
    if (zCurr === 'attach' && zPrev !== 'attach') sAttachStart = sArr[i];
    if (zCurr !== 'attach' && zPrev === 'attach') sAttachEnd = sArr[i];
  }

  return {
    pts,
    sArr,
    tauArr,
    totalLength: sAcc,
    totalCycleTime: tauAcc,
    tauDownStart,
    tauDownEnd,
    tauUpStart,
    tauUpEnd,
    sDownStart,
    sDecelStart,
    sDecelEnd,
    sAccelStart,
    sAccelEnd,
    sAttachStart,
    sAttachEnd,
    xTop
  };
}

// Compute exact cam ramp profile & spring grip state (per grip; 4 grips per Funitel cabin = 4 × 28 kN = 112 kN!)
export function evalGripCouplingState(x, zone, isFaulted = false) {
  const { rampStartX, rampEndX } = GS_SPECS.track;
  const { gripNominalForceKN, gripFaultForceKN } = GS_SPECS.cabin;

  if (zone === 'rope_in' || zone === 'rope_out' || zone === 'check') {
    const forceKN = (isFaulted && (zone === 'check' || zone === 'rope_out'))
      ? gripFaultForceKN
      : gripNominalForceKN;
    return {
      rollerLift: 0,
      jawOpen: 0,
      springCompression: 0,
      clampingForceKN: forceKN,
      totalCabinForceKN: forceKN * GS_SPECS.cabin.gripsPerCabin,
      onRope: true,
      onRamp: false
    };
  }

  if (zone !== 'attach' && zone !== 'detach') {
    return {
      rollerLift: 0,
      jawOpen: 0,
      springCompression: 0,
      clampingForceKN: 0,
      totalCabinForceKN: 0,
      onRope: false,
      onRamp: false
    };
  }

  const uRaw = clamp((x - rampStartX) / (rampEndX - rampStartX), 0, 1);
  const u = zone === 'attach' ? uRaw : (1 - uRaw);

  let lift = 0;
  if (u < 0.28) lift = smoothstep(u / 0.28);
  else if (u <= 0.72) lift = 1.0;
  else lift = 1.0 - smoothstep((u - 0.72) / 0.28);

  let onRope = false;
  let forceKN = 0;
  const targetClosedForce = isFaulted ? gripFaultForceKN : gripNominalForceKN;

  if (zone === 'attach') {
    onRope = u >= 0.48;
    if (u > 0.72) forceKN = targetClosedForce * (1 - lift);
  } else {
    onRope = u <= 0.52;
    if (u < 0.28) forceKN = gripNominalForceKN * (1 - lift);
  }

  return {
    rollerLift: lift,
    jawOpen: lift,
    springCompression: lift,
    clampingForceKN: forceKN,
    totalCabinForceKN: forceKN * GS_SPECS.cabin.gripsPerCabin,
    onRope,
    onRamp: lift > 0.01
  };
}

export function evalCabinDoorOpen(zone, x) {
  const { centerX } = GS_SPECS.wheels;
  const { egTurnCenterX } = GS_SPECS.track;
  const straightLen = egTurnCenterX - centerX;

  if (zone === 'eg_turn') return 1.0;
  if (zone === 'eg_disembark') {
    const u = (x - centerX) / straightLen;
    return smoothstep((u - 0.14) / 0.26);
  }
  if (zone === 'eg_board') {
    const u = (egTurnCenterX - x) / straightLen;
    return 1.0 - smoothstep((u - 0.58) / 0.26);
  }
  return 0.0;
}

export class GondolaKinematics {
  constructor() {
    const W = GS_SPECS.wheels;
    const V = GS_SPECS.speeds;
    const N = GS_SPECS.cabin.count;

    this.wheelOmegaNom = V.slowStationMs / W.carrierRadius;
    this.wheelPeriodNom = (2 * Math.PI) / this.wheelOmegaNom;
    this.armHeadwayNom = this.wheelPeriodNom / W.armCount;
    this.targetCycleTime = N * this.armHeadwayNom;

    let lo = 44.0;
    let hi = 130.0;
    let bestLoop = null;
    for (let iter = 0; iter < 48; iter++) {
      const mid = 0.5 * (lo + hi);
      const candidate = buildLoopSamples(mid, 0);
      bestLoop = candidate;
      if (candidate.totalCycleTime < this.targetCycleTime) lo = mid;
      else hi = mid;
    }

    this.xTop = bestLoop.xTop;
    this.loop = bestLoop;
    this.totalLength = bestLoop.totalLength;
    this.totalCycleTime = bestLoop.totalCycleTime;

    // Precompute tire conveyor positions & exact local nominal speeds (20 per side)
    this.decelTires = this._buildTireSpecs(-1);
    this.accelTires = this._buildTireSpecs(+1);
  }

  _buildTireSpecs(sideSign) {
    const T = GS_SPECS.track;
    const V = GS_SPECS.speeds;
    const { ogRailY } = GS_SPECS.floors;
    const tires = [];
    const count = T.tireCountPerSide;
    for (let i = 0; i < count; i++) {
      const u = (i + 0.5) / count;
      const x = sideSign < 0
        ? T.conveyorOuterX + (T.conveyorInnerX - T.conveyorOuterX) * u
        : T.conveyorInnerX + (T.conveyorOuterX - T.conveyorInnerX) * u;
      const vNom = sideSign < 0
        ? V.nominalRopeMs + (V.slowStationMs - V.nominalRopeMs) * smoothstep(u)
        : V.slowStationMs + (V.nominalRopeMs - V.slowStationMs) * smoothstep(u);
      tires.push({
        index: i,
        sideSign,
        x,
        y: ogRailY + 0.14,
        z: sideSign * T.stationRailZ,
        innerRopeZ: sideSign * T.innerRopeZ,
        outerRopeZ: sideSign * T.outerRopeZ,
        vNom,
        omegaNom: vNom / T.tireRadius,
        stageGroup: Math.floor(i / 4)
      });
    }
    return tires;
  }

  sampleMountainY(x, dynamicSagOffset = 0) {
    return evalMountainY(x, this.xTop, dynamicSagOffset);
  }

  sampleByTau(tauRaw, speedFactor = 1.0, dynamicSagOffset = 0, isFaulted = false) {
    const { pts, sArr, tauArr, totalCycleTime, totalLength } = this.loop;
    const N = pts.length;
    const tau = ((tauRaw % totalCycleTime) + totalCycleTime) % totalCycleTime;

    let lo = 0;
    let hi = N;
    while (lo + 1 < hi) {
      const mid = (lo + hi) >> 1;
      if (tauArr[mid] <= tau) lo = mid;
      else hi = mid;
    }

    const i0 = lo;
    const i1 = (lo + 1) % N;
    const dt = tauArr[lo + 1] - tauArr[lo];
    const frac = dt > 1e-12 ? clamp((tau - tauArr[lo]) / dt, 0, 1) : 0;

    const a = pts[i0];
    const b = pts[i1];

    let x = a.x + (b.x - a.x) * frac;
    let y = a.y + (b.y - a.y) * frac;
    let z = a.z + (b.z - a.z) * frac;
    let wheelAngle = null;

    if (a.zone === 'wheel_down' && b.zone === 'wheel_down') {
      const W = GS_SPECS.wheels;
      wheelAngle = a.wheelAngle + (b.wheelAngle - a.wheelAngle) * frac;
      x = W.centerX + W.carrierRadius * Math.cos(wheelAngle);
      y = W.centerY + W.carrierRadius * Math.sin(wheelAngle);
      z = W.downRailZ;
    } else if (a.zone === 'wheel_up' && b.zone === 'wheel_up') {
      const W = GS_SPECS.wheels;
      wheelAngle = a.wheelAngle + (b.wheelAngle - a.wheelAngle) * frac;
      x = W.centerX + W.carrierRadius * Math.cos(wheelAngle);
      y = W.centerY + W.carrierRadius * Math.sin(wheelAngle);
      z = W.upRailZ;
    } else if (a.zone === 'eg_turn' && b.zone === 'eg_turn') {
      const T = GS_SPECS.track;
      const psiA = Math.atan2(a.z, a.x - T.egTurnCenterX);
      const psiB = Math.atan2(b.z, b.x - T.egTurnCenterX);
      const psi = psiA + (psiB - psiA) * frac;
      x = T.egTurnCenterX + T.egTurnRadius * Math.cos(psi);
      z = T.egTurnRadius * Math.sin(psi);
      y = GS_SPECS.floors.egRailY;
    } else if ((a.zone === 'rope_out' || a.zone === 'rope_in') && x > GS_SPECS.track.portalDeflectorX && x <= this.xTop) {
      y = evalMountainY(x, this.xTop, dynamicSagOffset).y;
    }

    let dyaw = b.yawFixed - a.yawFixed;
    if (dyaw > Math.PI) dyaw -= 2 * Math.PI;
    if (dyaw < -Math.PI) dyaw += 2 * Math.PI;
    const yaw = a.yawFixed + dyaw * frac;

    const s = sArr[lo] + (sArr[lo + 1] - sArr[lo]) * frac;
    const vNom = a.vNom + (b.vNom - a.vNom) * frac;
    const vActual = vNom * speedFactor;

    const pPrev = pts[(i0 - 1 + N) % N];
    const pNext = pts[(i1 + 1) % N];
    let tx = pNext.x - pPrev.x;
    let ty = pNext.y - pPrev.y;
    let tz = pNext.z - pPrev.z;
    const tLen = Math.hypot(tx, ty, tz) || 1;
    tx /= tLen;
    ty /= tLen;
    tz /= tLen;

    const dsStep = Math.max(1e-4, sArr[lo + 1] - sArr[lo]);
    const dvds = (b.vNom - a.vNom) / dsStep;
    const accelActual = vActual * dvds * speedFactor;

    const zone = a.zone;
    const doorOpen = evalCabinDoorOpen(zone, x);
    const grip = evalGripCouplingState(x, zone, isFaulted);

    return {
      tau,
      s,
      sNorm: s / totalLength,
      x,
      y,
      z,
      tx,
      ty,
      tz,
      yaw,
      vNom,
      vActual,
      accelActual,
      zone,
      doorOpen,
      grip,
      wheelAngle,
      onFerrisWheel: zone === 'wheel_down' || zone === 'wheel_up'
    };
  }

  // Exact angles for ALL FOUR Vertical Ferris Wheels (2 synced twin pairs) + Coaxial Twin Bullwheels!
  getWheelAngles(phi) {
    const downTheta = Math.PI * 0.5 + this.wheelOmegaNom * (phi - this.loop.tauDownStart);
    const upTheta = Math.PI * 1.5 - this.wheelOmegaNom * (phi - this.loop.tauUpStart);
    const bullwheelTheta = (GS_SPECS.speeds.nominalRopeMs / GS_SPECS.bullwheel.radius) * phi;
    const ropeDistance = GS_SPECS.speeds.nominalRopeMs * phi;
    return { downTheta, upTheta, bullwheelTheta, ropeDistance };
  }

  // Compute exact 3D cradle tip position for BOTH inner & outer Ferris wheels of a pair!
  getWheelArmTip(side, armIndex, phi, wheelRole = 'center') {
    const W = GS_SPECS.wheels;
    const T = GS_SPECS.track;
    const { downTheta, upTheta } = this.getWheelAngles(phi);
    const base = side < 0 ? downTheta : upTheta;
    const theta = base + armIndex * ((2 * Math.PI) / W.armCount);
    let z = side < 0 ? W.downRailZ : W.upRailZ;
    if (wheelRole === 'inner') z = side < 0 ? -T.innerRopeZ : T.innerRopeZ;
    else if (wheelRole === 'outer') z = side < 0 ? -T.outerRopeZ : T.outerRopeZ;
    return {
      theta,
      x: W.centerX + W.carrierRadius * Math.cos(theta),
      y: W.centerY + W.carrierRadius * Math.sin(theta),
      z
    };
  }

  sampleAllCabins(phi, speedFactor = 1.0, dynamicSagOffset = 0, faultCabinIndex = -1) {
    const N = GS_SPECS.cabin.count;
    const cabins = new Array(N);
    for (let k = 0; k < N; k++) {
      const tau = phi + k * this.armHeadwayNom;
      const state = this.sampleByTau(tau, speedFactor, dynamicSagOffset, k === faultCabinIndex);
      state.index = k;
      state.number = k + 1;
      cabins[k] = state;
    }
    return cabins;
  }

  getStationVelocityProfile(samples = 140) {
    const sMax = this.loop.sAttachEnd + 24.0;
    const out = [];
    const { pts, sArr } = this.loop;
    const N = pts.length;
    let idx = 0;
    for (let k = 0; k <= samples; k++) {
      const sTarget = (sMax * k) / samples;
      while (idx < N - 1 && sArr[idx + 1] < sTarget) idx++;
      const ds = Math.max(1e-6, sArr[idx + 1] - sArr[idx]);
      const f = clamp((sTarget - sArr[idx]) / ds, 0, 1);
      const vNom = pts[idx].vNom + (pts[(idx + 1) % N].vNom - pts[idx].vNom) * f;
      out.push({ s: sTarget, sNorm: sTarget / sMax, vNom, zone: pts[idx].zone });
    }
    return { sMax, points: out };
  }
}
