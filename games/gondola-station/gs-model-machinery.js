// 3D Mechanical Assemblies Builder (Authentic Galzigbahn Funitel Twin-Rope System!):
// - FOUR Giant Vertical Ferris Wheels (2 Coaxial Twin Pairs = 4× Vertikal-Riesenräder, Ø 8.56 m)
// - Coaxial Twin Horizontal Bullwheels (Ø 5.90 m) + DirectDrive (X-Ray) + Safety Disc Brakes + Hydraulic Tensioning
// - Stepped V-Belt Deceleration & Acceleration Tire Conveyors (Dual-rail Funitel drive)
// - FOUR Coupling Cam Ramps (2 per track), 4 Rope Entry Trumpets & Wide Dual-Rope Check Gantry
// - 10 Cobalt-Blue 24er Galzigbahn Funitel Cabins with Twin-Arm Hanger & 4 Cutaway Spring Grips (2×2 = 112 kN)!

import * as THREE from 'three';
import { GS_SPECS } from './specs.js';
import { createCabinNumberTexture } from './gs-textures.js';

// =========================================================================
// 1. FOUR GIANT VERTICAL FERRIS WHEELS (2 ZWILLINGSPAARE = 4× RIESENRÄDER!)
// =========================================================================
export function buildFerrisWheels(mats) {
  const group = new THREE.Group();
  group.name = 'FourVerticalFerrisWheels';

  const W = GS_SPECS.wheels;
  const T = GS_SPECS.track;
  const wheels = {};

  const buildSingleWheelDisk = (planeZ, targetRailZ) => {
    const wheelPivot = new THREE.Group();
    wheelPivot.position.set(W.centerX, W.centerY, planeZ);
    const cantileverZ = targetRailZ - planeZ; // Short clean reach (±0.33 m) into cabin hanger rail!

    // Signal-Red Outer Structural Steel Ring (Ø 8.56 m)
    const outerRim = new THREE.Mesh(
      new THREE.TorusGeometry(W.outerRimRadius, 0.21, 14, 64),
      mats.doppelmayrRed
    );
    outerRim.castShadow = true;
    wheelPivot.add(outerRim);

    // Anthracite Carrier Truss Ring (R = 3.50 m)
    const carrierRing = new THREE.Mesh(
      new THREE.TorusGeometry(W.carrierRadius, 0.11, 10, 48),
      mats.steelAnthracite
    );
    wheelPivot.add(carrierRing);

    // Inner Bull-Gear Ring (R = 2.42 m)
    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.42, 0.13, 10, 36),
      mats.steelGalvanized
    );
    wheelPivot.add(innerRing);

    // Central Hub Drum
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.76, 0.76, 0.56, 22),
      mats.doppelmayrRed
    );
    hub.rotation.x = Math.PI / 2;
    hub.castShadow = true;
    wheelPivot.add(hub);

    // 8 Radial Double-Truss Spokes
    for (let s = 0; s < 8; s++) {
      const ang = (s * Math.PI) / 4;
      const spoke = new THREE.Mesh(
        new THREE.BoxGeometry(W.outerRimRadius - 0.62, 0.22, 0.20),
        s % 2 === 0 ? mats.doppelmayrRed : mats.steelAnthracite
      );
      spoke.position.set(
        Math.cos(ang) * (W.outerRimRadius * 0.5 + 0.24),
        Math.sin(ang) * (W.outerRimRadius * 0.5 + 0.24),
        0
      );
      spoke.rotation.z = ang;
      spoke.castShadow = true;
      wheelPivot.add(spoke);
    }

    // 4 Parallel-Kept Articulated Carrier Forks at exact R = 3.50 m!
    const arms = [];
    for (let m = 0; m < W.armCount; m++) {
      const armAngle = m * ((2 * Math.PI) / W.armCount);
      const armPivot = new THREE.Group();
      armPivot.position.set(
        W.carrierRadius * Math.cos(armAngle),
        W.carrierRadius * Math.sin(armAngle),
        0
      );

      const boss = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.36, 14),
        mats.safetyYellow
      );
      boss.rotation.x = Math.PI / 2;
      armPivot.add(boss);

      const boom = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.22, Math.abs(cantileverZ) + 0.18),
        mats.doppelmayrRed
      );
      boom.position.set(0, 0.24, cantileverZ * 0.5);
      armPivot.add(boom);

      const riser = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.30, 0.22),
        mats.steelAnthracite
      );
      riser.position.set(0, 0.12, 0);
      armPivot.add(riser);

      // U-Shaped Pickup Cradle embracing cabin hanger rail at exact (0, 0, cantileverZ)!
      const cradleTop = new THREE.Mesh(
        new THREE.BoxGeometry(0.92, 0.13, 0.26),
        mats.safetyYellow
      );
      cradleTop.position.set(0, 0.22, cantileverZ);
      armPivot.add(cradleTop);

      for (const fx of [-0.40, 0.40]) {
        const fork = new THREE.Mesh(
          new THREE.BoxGeometry(0.11, 0.28, 0.24),
          mats.safetyYellow
        );
        fork.position.set(fx, 0.08, cantileverZ);
        armPivot.add(fork);
      }

      wheelPivot.add(armPivot);
      arms.push(armPivot);
    }

    return { pivot: wheelPivot, arms };
  };

  for (const side of [-1, 1]) {
    const key = side < 0 ? 'down' : 'up';
    const innerWheelZ = side < 0 ? W.downInnerWheelZ : W.upInnerWheelZ;
    const outerWheelZ = side < 0 ? W.downOuterWheelZ : W.upOuterWheelZ;
    const innerRailZ = side < 0 ? -T.innerRopeZ : T.innerRopeZ;
    const outerRailZ = side < 0 ? -T.outerRopeZ : T.outerRopeZ;

    const sideGroup = new THREE.Group();
    sideGroup.name = side < 0 ? 'DownwardTwinFerrisWheels' : 'UpwardTwinFerrisWheels';

    // Massive Coaxial Horizontal Steel Drive Axle linking the Inner & Outer Ferris Wheels!
    // (Cabin clears axle by +0.80 m in OG, -4.30 m in EG, and +2.45 m behind at 9 o'clock!)
    const shaftLen = Math.abs(outerWheelZ - innerWheelZ) + 1.35;
    const shaftMidZ = 0.5 * (innerWheelZ + outerWheelZ);
    const mainAxle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, shaftLen, 18),
      mats.steelPolishedRail
    );
    mainAxle.rotation.x = Math.PI / 2;
    mainAxle.position.set(W.centerX, W.centerY, shaftMidZ);
    mainAxle.castShadow = true;
    sideGroup.add(mainAxle);

    // Dual Structural Pedestal A-Frames supporting BOTH ends of the twin-wheel shaft!
    const pedZs = [innerWheelZ - side * 0.52, outerWheelZ + side * 0.62];
    const pedH = W.centerY + 0.45;
    for (const pedZ of pedZs) {
      for (const legOffX of [-1.15, 1.15]) {
        const legLen = Math.hypot(legOffX, pedH);
        const leg = new THREE.Mesh(
          new THREE.BoxGeometry(0.32, legLen, 0.34),
          mats.steelAnthracite
        );
        leg.position.set(W.centerX + legOffX * 0.5, pedH * 0.5, pedZ);
        leg.rotation.z = Math.atan2(legOffX, pedH);
        leg.castShadow = true;
        sideGroup.add(leg);
      }
      const bearing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.58, 0.64, 0.72, 18),
        mats.steelAnthracite
      );
      bearing.rotation.x = Math.PI / 2;
      bearing.position.set(W.centerX, W.centerY, pedZ);
      sideGroup.add(bearing);
    }

    // Electric Twin-Wheel Drive Motor on outboard pedestal
    const driveMotor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.42, 1.08, 16),
      mats.machineBlue
    );
    driveMotor.rotation.z = Math.PI / 2;
    driveMotor.position.set(W.centerX - 1.35, W.centerY - 1.25, pedZs[1]);
    sideGroup.add(driveMotor);

    // Build BOTH Wheels of the Twin Pair (2 × 2 = 4 Giant Vertical Ferris Wheels!)
    const wheelInner = buildSingleWheelDisk(innerWheelZ, innerRailZ);
    const wheelOuter = buildSingleWheelDisk(outerWheelZ, outerRailZ);
    sideGroup.add(wheelInner.pivot, wheelOuter.pivot);

    group.add(sideGroup);
    wheels[key] = {
      pivots: [wheelInner.pivot, wheelOuter.pivot],
      arms: [...wheelInner.arms, ...wheelOuter.arms]
    };
  }

  return { group, wheels };
}

// =========================================================================
// 2. COAXIAL TWIN BULLWHEELS (Ø 5.9 m) + DIRECTDRIVE (X-RAY) + HYDRAULICS
// =========================================================================
export function buildBullwheelDirectDrive(mats) {
  const root = new THREE.Group();
  root.name = 'FunitelTwinBullwheelDirectDrive';

  const B = GS_SPECS.bullwheel;
  const F = GS_SPECS.floors;

  // Fixed linear guide rails bolted onto OG machinery deck (Y = 7.0 m)
  for (const rz of [-1.45, 1.45]) {
    const slideRail = new THREE.Mesh(
      new THREE.BoxGeometry(8.4, 0.22, 0.28),
      mats.steelPolishedRail
    );
    slideRail.position.set(B.centerX - 0.8, F.ogFloorY + 0.16, rz);
    root.add(slideRail);
  }

  // Fixed Hydraulic Anchor Bulkhead at X = -0.35 m
  const bulkhead = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 1.65, 3.8),
    mats.steelAnthracite
  );
  bulkhead.position.set(-0.35, F.ogFloorY + 0.85, 0);
  bulkhead.castShadow = true;
  root.add(bulkhead);

  // Two Giant Hydraulic Tensioning Cylinders (640 kN Funitel Dual-Rope Tension!)
  const pistonRods = [];
  const accumulators = [];
  for (const sgn of [-1, 1]) {
    const cz = sgn * 1.15;
    const cy = F.ogFloorY + 0.92;

    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.26, 0.26, 2.35, 18),
      mats.machineBlue
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(1.05, cy, cz);
    barrel.castShadow = true;
    root.add(barrel);

    const rod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.125, 0.125, 2.2, 16),
      mats.chromePiston
    );
    rod.rotation.z = Math.PI / 2;
    rod.position.set(2.45, cy, cz);
    root.add(rod);
    pistonRods.push(rod);

    const accOuter = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 1.48, 16),
      mats.machineBlue
    );
    accOuter.position.set(-0.25, F.ogFloorY + 2.15, cz * 1.35);
    root.add(accOuter);

    const accGlow = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 1.12, 14),
      mats.ledCoolStrip
    );
    accGlow.position.set(-0.25, F.ogFloorY + 2.15, cz * 1.35);
    accGlow.visible = false;
    root.add(accGlow);
    accumulators.push({ outer: accOuter, glow: accGlow });
  }

  // Sliding Tension Carriage (Spannwagen)
  const tensionCarriage = new THREE.Group();
  tensionCarriage.position.set(B.centerX, 0, B.centerZ);

  const sledgeBase = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.42, 3.6),
    mats.steelAnthracite
  );
  sledgeBase.position.set(0, F.ogFloorY + 0.48, 0);
  sledgeBase.castShadow = true;
  tensionCarriage.add(sledgeBase);

  // --- DirectDrive Gearless Synchronous Motor (1,350 kW / 540,000 Nm!) ---
  const motorGroup = new THREE.Group();
  motorGroup.position.set(0, F.ogFloorY + 1.68, 0);

  const motorOuterGroup = new THREE.Group();
  const statorShell = new THREE.Mesh(
    new THREE.CylinderGeometry(1.62, 1.62, 1.52, 32, 1, false),
    mats.motorHousing
  );
  statorShell.castShadow = true;
  motorOuterGroup.add(statorShell);

  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.46, 0.06), mats.motorHousing);
    fin.position.set(Math.cos(a) * 1.66, 0, Math.sin(a) * 1.66);
    fin.rotation.y = -a;
    motorOuterGroup.add(fin);
  }
  motorGroup.add(motorOuterGroup);

  const copperStator = new THREE.Mesh(
    new THREE.CylinderGeometry(1.44, 1.44, 1.26, 32, 1, true),
    mats.copperWindings
  );
  motorGroup.add(copperStator);

  const rotorGroup = new THREE.Group();
  const magnetRotor = new THREE.Mesh(
    new THREE.CylinderGeometry(1.18, 1.18, 1.20, 32),
    mats.magnetPoles
  );
  rotorGroup.add(magnetRotor);

  const mainShaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.48, 3.7, 20),
    mats.chromePiston
  );
  mainShaft.position.y = 1.02;
  rotorGroup.add(mainShaft);
  motorGroup.add(rotorGroup);

  const magFieldGroup = new THREE.Group();
  magFieldGroup.visible = false;
  for (let k = 0; k < 12; k++) {
    const ang = (k / 12) * Math.PI * 2;
    const arc = new THREE.Mesh(
      new THREE.TorusGeometry(1.31, 0.045, 8, 16, Math.PI / 8),
      mats.magFieldRing
    );
    arc.rotation.x = Math.PI / 2;
    arc.rotation.z = ang;
    arc.position.y = (k % 2 === 0 ? 0.35 : -0.35);
    magFieldGroup.add(arc);
  }
  const fluxRingMid = new THREE.Mesh(
    new THREE.TorusGeometry(1.31, 0.05, 8, 48),
    mats.magFieldRing
  );
  fluxRingMid.rotation.x = Math.PI / 2;
  magFieldGroup.add(fluxRingMid);
  motorGroup.add(magFieldGroup);

  tensionCarriage.add(motorGroup);

  // --- Coaxial Twin Horizontal Bullwheels (Lower Y = 10.10 m + Upper Y = 10.68 m, Ø 5.90 m!) ---
  const bullwheelPivot = new THREE.Group();
  bullwheelPivot.position.set(0, B.centerY, 0);

  const addBullwheelDeck = (offsetY) => {
    const bullRim = new THREE.Mesh(
      new THREE.TorusGeometry(B.radius, 0.21, 14, 64),
      mats.doppelmayrRed
    );
    bullRim.rotation.x = Math.PI / 2;
    bullRim.position.y = offsetY;
    bullRim.castShadow = true;
    bullwheelPivot.add(bullRim);

    const bullLiner = new THREE.Mesh(
      new THREE.TorusGeometry(B.radius + 0.06, 0.095, 10, 64),
      mats.rubberLiner
    );
    bullLiner.rotation.x = Math.PI / 2;
    bullLiner.position.y = offsetY;
    bullwheelPivot.add(bullLiner);

    for (let s = 0; s < 8; s++) {
      const a = (s * Math.PI) / 4;
      const spoke = new THREE.Mesh(
        new THREE.BoxGeometry(B.radius * 1.92, 0.22, 0.22),
        mats.doppelmayrRed
      );
      spoke.position.y = offsetY;
      spoke.rotation.y = a;
      spoke.castShadow = true;
      bullwheelPivot.add(spoke);
    }
  };

  addBullwheelDeck(0.0);                              // Lower Bullwheel (Inner Funitel ropes)
  addBullwheelDeck(B.upperCenterY - B.centerY);       // Upper Coaxial Bullwheel (Deflected Outer Funitel ropes)

  const bullHub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.78, 0.82, 1.05, 24),
    mats.steelAnthracite
  );
  bullHub.position.y = 0.28;
  bullwheelPivot.add(bullHub);

  // Direct-Acting Machined Steel Brake Disc right under Lower Bullwheel (R = 2.55 m)
  const brakeDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(B.brakeDiscRadius, B.brakeDiscRadius, 0.09, 48),
    mats.brakeDiscSteel
  );
  brakeDisc.position.y = -0.34;
  bullwheelPivot.add(brakeDisc);

  tensionCarriage.add(bullwheelPivot);

  // --- 4 Direct-Acting Service & Safety Disc Brake Calipers ---
  const brakeCalipers = [];
  const caliperAngles = [-Math.PI * 0.75, -Math.PI * 0.25, Math.PI * 0.25, Math.PI * 0.75];
  for (const ang of caliperAngles) {
    const calGroup = new THREE.Group();
    const r = B.brakeDiscRadius;
    calGroup.position.set(Math.cos(ang) * r, B.centerY - 0.34, Math.sin(ang) * r);
    calGroup.rotation.y = -ang;

    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.44, 0.48), mats.brakeCaliperRed);
    bridge.position.x = 0.12;
    calGroup.add(bridge);

    const padTop = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.36), mats.steelAnthracite);
    const padBot = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.36), mats.steelAnthracite);
    padTop.position.set(-0.04, 0.12, 0);
    padBot.position.set(-0.04, -0.12, 0);
    calGroup.add(padTop, padBot);

    const postH = (B.centerY - 0.54) - (F.ogFloorY + 0.65);
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.18, postH, 0.18), mats.steelAnthracite);
    post.position.set(0.24, -postH * 0.5 - 0.18, 0);
    calGroup.add(post);

    tensionCarriage.add(calGroup);
    brakeCalipers.push({ padTop, padBot, bridge });
  }

  root.add(tensionCarriage);

  return {
    root,
    tensionCarriage,
    bullwheelPivot,
    rotorGroup,
    motorOuterGroup,
    statorShell,
    magFieldGroup,
    brakeCalipers,
    pistonRods,
    accumulators
  };
}

// =========================================================================
// 3. STEPPED V-BELT FUNITEL DUAL-SIDE TIRE CONVEYORS (VERZÖGERER & BESCHLEUNIGER)
// =========================================================================
export function buildTireConveyors(mats, kin) {
  const group = new THREE.Group();
  group.name = 'FunitelTireConveyors';

  const rTire = GS_SPECS.track.tireRadius;
  const tireGeo = new THREE.CylinderGeometry(rTire, rTire, 0.14, 18);
  const rimGeo = new THREE.CylinderGeometry(rTire * 0.52, rTire * 0.52, 0.16, 12);
  const pulleyGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.07, 12);
  const allTires = [];

  const buildSide = (tireSpecs) => {
    for (let i = 0; i < tireSpecs.length; i++) {
      const spec = tireSpecs[i];
      // Place friction tires cleanly along BOTH inner & outer Funitel carriage beams!
      for (const ropeZ of [spec.innerRopeZ, spec.outerRopeZ]) {
        const unit = new THREE.Group();
        unit.position.set(spec.x, spec.y + 0.12, ropeZ);

        const wheelPivot = new THREE.Group();
        const tireMesh = new THREE.Mesh(tireGeo, mats.rubberTire);
        const rimMesh = new THREE.Mesh(rimGeo, mats.steelGalvanized);
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(rTire * 0.92, 0.17, 0.04), mats.doppelmayrRed);

        const pulleyScale = 0.72 + spec.stageGroup * 0.13;
        const pulley = new THREE.Mesh(pulleyGeo, mats.steelAnthracite);
        pulley.scale.set(pulleyScale, 1, pulleyScale);
        pulley.position.y = 0.15;

        wheelPivot.add(tireMesh, rimMesh, spoke, pulley);
        unit.add(wheelPivot);

        const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.28, 0.16), mats.steelAnthracite);
        bracket.position.y = 0.30;
        unit.add(bracket);

        if (i > 0) {
          const prev = tireSpecs[i - 1];
          const dx = spec.x - prev.x;
          const belt = new THREE.Mesh(new THREE.BoxGeometry(Math.abs(dx), 0.03, 0.07), mats.rubberLiner);
          belt.position.set(-dx * 0.5, 0.15, 0);
          unit.add(belt);
        }

        if (i % 5 === 2 && ropeZ === spec.outerRopeZ) {
          const stageMotor = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.38, 12), mats.machineBlue);
          stageMotor.position.set(0, 0.48, 0);
          unit.add(stageMotor);
        }

        group.add(unit);
        allTires.push({ pivot: wheelPivot, spec, angle: 0 });
      }
    }
  };

  buildSide(kin.decelTires);
  buildSide(kin.accelTires);

  return { group, allTires };
}

// =========================================================================
// 4. FOUR COUPLING CAM RAMPS (2 PRO FAHRBAHN), 4 TRUMPETS & WIDE CHECK GANTRY
// =========================================================================
export function buildCouplingZones(mats) {
  const group = new THREE.Group();
  group.name = 'FunitelCouplingRampsAndCheckGate';

  const T = GS_SPECS.track;
  const yOG = GS_SPECS.floors.ogRailY;

  const rampDefs = [
    { zRope: -T.outerRopeZ, sideSign: -1, rollerOffZ: +0.20 },
    { zRope: -T.innerRopeZ, sideSign: -1, rollerOffZ: +0.20 },
    { zRope: T.innerRopeZ,  sideSign: +1, rollerOffZ: -0.20 },
    { zRope: T.outerRopeZ,  sideSign: +1, rollerOffZ: -0.20 }
  ];

  const span = T.rampEndX - T.rampStartX;
  for (const rd of rampDefs) {
    const rampPts = [];
    for (let i = 0; i <= 26; i++) {
      const u = i / 26;
      const x = T.rampStartX + span * u;
      let lift = 0;
      if (u < 0.28) {
        const t = u / 0.28;
        lift = t * t * (3 - 2 * t);
      } else if (u <= 0.72) {
        lift = 1.0;
      } else {
        const t = (u - 0.72) / 0.28;
        lift = 1.0 - t * t * (3 - 2 * t);
      }
      rampPts.push(new THREE.Vector3(x, yOG + 0.38 + lift * 0.22, rd.zRope + rd.rollerOffZ));
    }
    const camRail = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rampPts), 28, 0.046, 8, false),
      mats.safetyYellow
    );
    camRail.castShadow = true;
    group.add(camRail);

    const frameBar = new THREE.Mesh(new THREE.BoxGeometry(span + 0.6, 0.13, 0.13), mats.doppelmayrRed);
    frameBar.position.set(T.rampCenterX, yOG + 0.80, rd.zRope + rd.rollerOffZ);
    group.add(frameBar);

    for (const fx of [T.rampStartX, T.rampCenterX, T.rampEndX]) {
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.40, 8), mats.steelAnthracite);
      strut.position.set(fx, yOG + 0.60, rd.zRope + rd.rollerOffZ);
      group.add(strut);
    }

    // Flared Steel Rope Entry Trumpet (Seilfangtrichter) on EACH of the 4 parallel ropes!
    const trumpet = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.58, 14, 1, true), mats.steelGalvanized);
    trumpet.rotation.z = rd.sideSign > 0 ? Math.PI / 2 : -Math.PI / 2;
    trumpet.position.set(rd.sideSign > 0 ? T.rampStartX - 0.25 : T.rampEndX + 0.25, yOG, rd.zRope);
    group.add(trumpet);
  }

  // --- Wide Funitel Dual-Rope Clamping Force & Rope Position Check Gantry (Prüfstrecke at X = +13.45 m) ---
  const checkGate = new THREE.Group();
  checkGate.position.set(T.checkCenterX, yOG, T.stationRailZ);

  const archTop = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.18, 2.75), mats.steelAnthracite);
  archTop.position.set(0, 0.72, 0);
  checkGate.add(archTop);

  for (const sz of [-1.32, 1.32]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.90, 0.14), mats.steelAnthracite);
    leg.position.set(0, 0.30, sz);
    checkGate.add(leg);
  }

  // Dual sensor modules checking BOTH parallel ropes (4 grips total per cabin!)
  for (const rz of [-T.funitelRopeHalfGauge, T.funitelRopeHalfGauge]) {
    const feelerBox = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.22), mats.machineBlue);
    feelerBox.position.set(0, 0.50, rz - 0.20);
    checkGate.add(feelerBox);
  }

  // Dual High-Visibility Status Signal Lamps
  const sensorLampMat = mats.sensorLamp.clone();
  const lampL = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 12), sensorLampMat);
  const lampR = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 12), sensorLampMat);
  lampL.position.set(0, 0.92, -0.95);
  lampR.position.set(0, 0.92, 0.95);
  checkGate.add(lampL, lampR);

  group.add(checkGate);

  return { group, checkGate, sensorLampMat };
}

// =========================================================================
// 5. 10 COBALT-BLUE 24er GALZIGBAHN FUNITEL CABINS + 4 CUTAWAY SPRING GRIPS!
// =========================================================================
function createSingleGripUnit(mats, springMat, coverMat, arrowMat) {
  const g = new THREE.Group();

  // Fixed upper jaw saddle hugging the braided 54 mm steel rope
  const fixedJaw = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.13, 0.15), mats.steelGalvanized);
  fixedJaw.position.set(0, 0.08, -0.02);
  g.add(fixedJaw);

  // Movable clamping jaw opening cleanly around the rope!
  const movableJawPivot = new THREE.Group();
  movableJawPivot.position.set(0, 0.02, 0.08);
  const movableJaw = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.11, 0.14), mats.steelPolishedRail);
  movableJaw.position.set(0, -0.08, -0.06);
  movableJawPivot.add(movableJaw);
  g.add(movableJawPivot);

  // Belleville Disc Spring Pack (Tellerfederpaket — 7 stacked disc springs!)
  const springPack = new THREE.Group();
  springPack.position.set(0, 0.14, -0.10);
  const discGeo = new THREE.CylinderGeometry(0.08, 0.092, 0.021, 12);
  discGeo.rotateX(Math.PI / 2);
  for (let d = 0; d < 7; d++) {
    const disc = new THREE.Mesh(discGeo, springMat);
    disc.position.z = -d * 0.030;
    springPack.add(disc);
  }
  g.add(springPack);

  // Actuation Lever & Yellow Cam Roller riding the yellow coupling ramp
  const leverPivot = new THREE.Group();
  leverPivot.position.set(0, 0.16, -0.20);
  const leverArm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.26, 0.075), mats.steelAnthracite);
  leverArm.position.set(0, 0.13, 0);
  const camRoller = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.065, 12), mats.safetyYellow);
  camRoller.rotation.x = Math.PI / 2;
  camRoller.position.set(0, 0.26, 0);
  leverPivot.add(leverArm, camRoller);
  g.add(leverPivot);

  // Outer Protective Red Grip Housing (hides cleanly in Klemmen-Schnitt!)
  const gripCover = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.26, 0.38), coverMat);
  gripCover.position.set(0, 0.14, -0.13);
  g.add(gripCover);

  // 3D 28-kN Clamping Force Arrows
  const forceArrows = new THREE.Group();
  forceArrows.visible = false;
  const shaftGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.20, 8);
  const headGeo = new THREE.ConeGeometry(0.052, 0.11, 10);
  for (const dir of [-1, 1]) {
    const aGrp = new THREE.Group();
    const shaft = new THREE.Mesh(shaftGeo, arrowMat);
    const head = new THREE.Mesh(headGeo, arrowMat);
    shaft.position.y = dir * 0.22;
    head.position.y = dir * 0.10;
    head.rotation.z = dir > 0 ? Math.PI : 0;
    aGrp.add(shaft, head);
    forceArrows.add(aGrp);
  }
  g.add(forceArrows);

  return { group: g, gripCover, movableJawPivot, springPack, leverPivot, forceArrows };
}

function createSingleCabinMesh(num, mats) {
  const C = GS_SPECS.cabin;
  const halfGauge = GS_SPECS.track.funitelRopeHalfGauge; // 0.95 m!
  const root = new THREE.Group();
  root.name = `FunitelCabin_${num}`;

  // Shared per-cabin live animated grip materials
  const springMat = mats.springSteel.clone();
  const coverMat = mats.doppelmayrRed.clone();
  const arrowMat = mats.forceArrowGreen.clone();

  // --- A. AUTHENTIC FUNITEL TWIN-ROPE 4-GRIP CARRIAGE (2×2 = 4 FEDERKLEMMEN!) ---
  // Matches Peter's real Galzigbahn photo: TWO parallel twin-clamp beams at local Z = -0.95 m & +0.95 m,
  // each carrying a FRONT (+0.48 m) and REAR (-0.48 m) spring grip!
  const gripUnits = [];
  for (const ropeLocalZ of [-halfGauge, halfGauge]) {
    // Longitudinal Funitel Twin-Grip Carrier Beam connecting front & rear grips on this rope
    const carrierBeam = new THREE.Mesh(
      new THREE.BoxGeometry(1.36, 0.13, 0.18),
      mats.steelGalvanized
    );
    carrierBeam.position.set(0, -0.14, ropeLocalZ);
    carrierBeam.castShadow = true;
    root.add(carrierBeam);

    // Overhead Friction Plate engaged by Funitel Tire Conveyors
    const frictionPlate = new THREE.Mesh(
      new THREE.BoxGeometry(1.24, 0.05, 0.16),
      mats.steelAnthracite
    );
    frictionPlate.position.set(0, 0.18, ropeLocalZ);
    root.add(frictionPlate);

    // 2 Station Guide Rail Running Rollers per beam
    for (const rx of [-0.56, 0.56]) {
      const roller = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 0.06, 12),
        mats.steelPolishedRail
      );
      roller.rotation.x = Math.PI / 2;
      roller.position.set(rx, 0.20, ropeLocalZ + 0.06);
      root.add(roller);
    }

    // Front (+0.44 m) & Rear (-0.44 m) Spring Grips on this parallel rope!
    for (const gx of [-0.44, 0.44]) {
      const u = createSingleGripUnit(mats, springMat, coverMat, arrowMat);
      u.group.position.set(gx, 0, ropeLocalZ);
      root.add(u.group);
      gripUnits.push(u);
    }
  }

  // --- B. WIDE FUNITEL TWIN-ARM HANGER + 24er GALZIGBAHN COBALT-BLUE PANORAMA CABIN ---
  const swingGroup = new THREE.Group();
  swingGroup.name = 'SwingingFunitelCabin';

  const roofY = -C.pivotToRoofY;   // -0.82 m
  const floorY = -C.pivotToFloorY; // -2.94 m
  const bodyH = C.bodyHeightY;     // 2.12 m
  const bodyL = C.bodyLengthX;     // 2.34 m
  const bodyW = C.bodyWidthZ;      // 1.88 m

  // Twin-Arm Wide Funitel Suspension Struts (connecting BOTH twin-clamp beams at Z = ±0.95 m down to cabin roof!)
  for (const sgnZ of [-1, 1]) {
    const strutCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.14, sgnZ * halfGauge),
      new THREE.Vector3(0, -0.46, sgnZ * (halfGauge * 0.88)),
      new THREE.Vector3(0, roofY + 0.04, sgnZ * 0.62)
    ]);
    const strutMesh = new THREE.Mesh(
      new THREE.TubeGeometry(strutCurve, 12, 0.072, 10, false),
      mats.steelGalvanized
    );
    strutMesh.castShadow = true;
    swingGroup.add(strutMesh);
  }
  // Transverse Funitel Hanger Bridge Beam across the cabin roof
  const roofBridge = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.14, halfGauge * 1.65),
    mats.steelAnthracite
  );
  roofBridge.position.set(0, roofY + 0.08, 0);
  swingGroup.add(roofBridge);

  // Cobalt-Blue Galzigbahn Funitel Roof Cap
  const roofCap = new THREE.Mesh(
    new THREE.BoxGeometry(bodyL * 0.96, 0.18, bodyW * 0.95),
    mats.cabinAccentRed
  );
  roofCap.position.set(0, roofY - 0.08, 0);
  roofCap.castShadow = true;
  swingGroup.add(roofCap);

  // Iconic Cobalt-Blue Galzigbahn Lower Cabin Hull with "GALZIGBAHN · FUNITEL 24" Livery!
  const lowerHull = new THREE.Mesh(
    new THREE.BoxGeometry(bodyL, 0.58, bodyW),
    mats.cabinBodySilver
  );
  lowerHull.position.set(0, floorY + 0.29, 0);
  lowerHull.castShadow = true;
  lowerHull.receiveShadow = true;
  swingGroup.add(lowerHull);

  const floorBase = new THREE.Mesh(
    new THREE.BoxGeometry(bodyL * 0.94, 0.12, bodyW * 0.94),
    mats.cabinFrameDark
  );
  floorBase.position.set(0, floorY + 0.04, 0);
  swingGroup.add(floorBase);

  // 4 Slim Corner Structural Pillars + Wide 360° Panoramic Windows
  const glassH = bodyH - 0.74;
  const glassCenterY = floorY + 0.58 + glassH * 0.5;
  for (const px of [-bodyL * 0.47, bodyL * 0.47]) {
    for (const pz of [-bodyW * 0.47, bodyW * 0.47]) {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.11, glassH, 0.11), mats.cabinFrameDark);
      pillar.position.set(px, glassCenterY, pz);
      swingGroup.add(pillar);
    }
  }

  const frontGlass = new THREE.Mesh(new THREE.PlaneGeometry(bodyW - 0.16, glassH - 0.06), mats.cabinGlass);
  frontGlass.position.set(bodyL * 0.49, glassCenterY, 0);
  frontGlass.rotation.y = Math.PI / 2;
  swingGroup.add(frontGlass);

  const backGlass = frontGlass.clone();
  backGlass.position.x = -bodyL * 0.49;
  backGlass.rotation.y = -Math.PI / 2;
  swingGroup.add(backGlass);

  const inboardGlass = new THREE.Mesh(new THREE.PlaneGeometry(bodyL - 0.16, glassH - 0.06), mats.cabinGlass);
  inboardGlass.position.set(0, glassCenterY, -bodyW * 0.49);
  inboardGlass.rotation.y = Math.PI;
  swingGroup.add(inboardGlass);

  // Animated Double Sliding Boarding Doors on Outboard Platform Side (+Z)
  const doorW = (bodyL - 0.34) * 0.5;
  const doorH = bodyH - 0.24;
  const doorY = floorY + 0.12 + doorH * 0.5;

  const makeSlidingDoor = (signX) => {
    const door = new THREE.Group();
    door.position.set(signX * (doorW * 0.5), doorY, bodyW * 0.49);
    const glassPane = new THREE.Mesh(new THREE.BoxGeometry(doorW - 0.04, doorH - 0.44, 0.035), mats.cabinGlass);
    glassPane.position.y = 0.15;
    const lowerPanel = new THREE.Mesh(new THREE.BoxGeometry(doorW - 0.03, 0.46, 0.045), mats.cabinAccentRed);
    lowerPanel.position.y = -doorH * 0.5 + 0.23;
    const frameEdge = new THREE.Mesh(new THREE.BoxGeometry(0.04, doorH, 0.05), mats.cabinFrameDark);
    frameEdge.position.x = -signX * (doorW * 0.48);
    door.add(glassPane, lowerPanel, frameEdge);
    return door;
  };
  const doorLeft = makeSlidingDoor(-1);
  const doorRight = makeSlidingDoor(+1);
  swingGroup.add(doorLeft, doorRight);

  // Exterior Ski & Snowboard Quivers
  for (const sx of [-1, 1]) {
    for (const qz of [-0.42, 0.42]) {
      const quiver = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.72, 0.28), mats.cabinFrameDark);
      quiver.position.set(sx * (bodyL * 0.5 + 0.07), floorY + 0.44, qz);
      swingGroup.add(quiver);
    }
  }

  // Interior Facing Benches + Warm Ceiling LED Dome Light
  for (const bx of [-bodyL * 0.32, bodyL * 0.32]) {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.09, bodyW - 0.28), mats.cabinSeatBench);
    bench.position.set(bx, floorY + 0.54, 0);
    swingGroup.add(bench);
  }
  const interiorLed = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.05, 0.42), mats.cabinInteriorLight);
  interiorLed.position.set(0, roofY - 0.19, 0);
  swingGroup.add(interiorLed);

  // Illuminated Cabin Number Plates (01..10)
  const numTex = createCabinNumberTexture(num);
  const numMat = new THREE.MeshStandardMaterial({
    map: numTex,
    emissiveMap: numTex,
    emissive: 0xffffff,
    emissiveIntensity: 0.72,
    roughness: 0.25
  });
  for (const sx of [-1, 1]) {
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.23), numMat);
    plate.position.set(sx * (bodyL * 0.49 + 0.01), roofY - 0.08, 0);
    plate.rotation.y = sx > 0 ? Math.PI / 2 : -Math.PI / 2;
    swingGroup.add(plate);
  }

  root.add(swingGroup);

  return {
    root,
    swingGroup,
    gripUnits,
    springMat,
    arrowMat,
    doorLeft,
    doorRight,
    doorBaseX: doorW * 0.5
  };
}

export function buildAllCabins(mats) {
  const group = new THREE.Group();
  group.name = 'FunitelCabinsFleet';
  const cabins = [];
  for (let i = 0; i < GS_SPECS.cabin.count; i++) {
    const c = createSingleCabinMesh(i + 1, mats);
    group.add(c.root);
    cabins.push(c);
  }
  return { group, cabins };
}
