// 3D Mechanical Assemblies Builder:
// - Dual Giant Vertical Ferris Wheels (Ø 8.56 m) with Parallel-Kept Carrier Arms
// - Horizontal Bullwheel (Ø 5.6 m) + DirectDrive (with X-Ray Cutaway) + Safety Disc Brakes + Hydraulic Tensioning
// - Stepped V-Belt Deceleration & Acceleration Tire Conveyors (40 individually synced tires)
// - Detach/Attach Coupling Cam Ramps, Rope Entry Trumpet & Clamping Force Check Sensor Gate
// - 10 Futuristic 10er Panorama Cabins with Animated Sliding Doors & Cutaway D-Line Spring Grips!

import * as THREE from 'three';
import { GS_SPECS } from './specs.js';
import { createCabinNumberTexture } from './gs-textures.js';

// =========================================================================
// 1. TWO GIANT VERTICAL FERRIS WHEELS (VERTIKAL-RIESENRÄDER)
// =========================================================================
export function buildFerrisWheels(mats) {
  const group = new THREE.Group();
  group.name = 'VerticalFerrisWheels';

  const W = GS_SPECS.wheels;
  const wheels = {};

  for (const side of [-1, 1]) {
    const key = side < 0 ? 'down' : 'up';
    const planeZ = side < 0 ? W.downWheelPlaneZ : W.upWheelPlaneZ;
    const railZ = side < 0 ? W.downRailZ : W.upRailZ;
    const cantileverZ = railZ - planeZ; // Inward reach toward cabin carriage (±1.28 m)

    const sideGroup = new THREE.Group();
    sideGroup.name = side < 0 ? 'DownwardFerrisWheel' : 'UpwardFerrisWheel';

    // Heavy Outboard Support Pedestal A-Frame standing cleanly outside the wheel (ZERO cabin clipping!)
    const pedZ = planeZ + side * 0.62;
    const pedH = W.centerY + 0.55;
    for (const legOffX of [-1.25, 1.25]) {
      const legLen = Math.hypot(legOffX, pedH);
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.36, legLen, 0.38),
        mats.steelAnthracite
      );
      leg.position.set(W.centerX + legOffX * 0.5, pedH * 0.5, pedZ);
      leg.rotation.z = Math.atan2(legOffX, pedH);
      leg.castShadow = true;
      sideGroup.add(leg);
    }
    // Bearing pillow block & main horizontal axle shaft
    const bearing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.68, 0.74, 0.95, 20),
      mats.steelAnthracite
    );
    bearing.rotation.x = Math.PI / 2;
    bearing.position.set(W.centerX, W.centerY, pedZ);
    bearing.castShadow = true;
    sideGroup.add(bearing);

    // Electric Ferris Wheel Gear Drive Motor mounted on pedestal
    const driveMotor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.42, 1.05, 16),
      mats.machineBlue
    );
    driveMotor.rotation.z = Math.PI / 2;
    driveMotor.position.set(W.centerX - 1.35, W.centerY - 1.25, pedZ);
    sideGroup.add(driveMotor);

    // Rotating Giant Wheel Assembly centered at (centerX, centerY, planeZ)
    const wheelPivot = new THREE.Group();
    wheelPivot.position.set(W.centerX, W.centerY, planeZ);

    // Massive Signal-Red Outer Structural Ring (Ø 8.56 m)
    const outerRim = new THREE.Mesh(
      new THREE.TorusGeometry(W.outerRimRadius, 0.22, 14, 64),
      mats.doppelmayrRed
    );
    outerRim.castShadow = true;
    wheelPivot.add(outerRim);

    // Secondary Anthracite Truss Ring at carrier radius (R = 3.50 m)
    const carrierRing = new THREE.Mesh(
      new THREE.TorusGeometry(W.carrierRadius, 0.12, 10, 48),
      mats.steelAnthracite
    );
    wheelPivot.add(carrierRing);

    // Inner Bull-Gear Ring (R = 2.45 m)
    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.45, 0.14, 10, 36),
      mats.steelGalvanized
    );
    wheelPivot.add(innerRing);

    // Central Hub Drum
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.82, 0.82, 0.62, 24),
      mats.doppelmayrRed
    );
    hub.rotation.x = Math.PI / 2;
    hub.castShadow = true;
    wheelPivot.add(hub);

    // 8 Radial Double-Truss Spokes
    for (let s = 0; s < 8; s++) {
      const ang = (s * Math.PI) / 4;
      const spoke = new THREE.Mesh(
        new THREE.BoxGeometry(W.outerRimRadius - 0.65, 0.24, 0.22),
        s % 2 === 0 ? mats.doppelmayrRed : mats.steelAnthracite
      );
      spoke.position.set(
        Math.cos(ang) * (W.outerRimRadius * 0.5 + 0.25),
        Math.sin(ang) * (W.outerRimRadius * 0.5 + 0.25),
        0
      );
      spoke.rotation.z = ang;
      spoke.castShadow = true;
      wheelPivot.add(spoke);
    }

    // 4 Parallel-Kept Articulated Carrier Arms (Mitnehmer-Gabeln) at exact R = 3.50 m!
    const arms = [];
    for (let m = 0; m < W.armCount; m++) {
      const armAngle = m * ((2 * Math.PI) / W.armCount);
      const armPivot = new THREE.Group();
      armPivot.position.set(
        W.carrierRadius * Math.cos(armAngle),
        W.carrierRadius * Math.sin(armAngle),
        0
      );

      // Parallel-kept pivot bearing boss
      const boss = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.24, 0.42, 16),
        mats.safetyYellow
      );
      boss.rotation.x = Math.PI / 2;
      armPivot.add(boss);

      // Cantilevered Horizontal Pickup Boom reaching inward from wheel plane to cabin carriage rail Z!
      const boom = new THREE.Mesh(
        new THREE.BoxGeometry(0.26, 0.24, Math.abs(cantileverZ)),
        mats.doppelmayrRed
      );
      boom.position.set(0, 0.26, cantileverZ * 0.5);
      boom.castShadow = true;
      armPivot.add(boom);

      // Vertical riser connecting boss to boom above cabin roof (guaranteed clearance!)
      const riser = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.34, 0.24),
        mats.steelAnthracite
      );
      riser.position.set(0, 0.14, 0);
      armPivot.add(riser);

      // U-Shaped Cabin Carriage Pickup Cradle (engages the carriage exactly at local (0, 0, cantileverZ)!)
      const cradleTop = new THREE.Mesh(
        new THREE.BoxGeometry(0.84, 0.14, 0.32),
        mats.safetyYellow
      );
      cradleTop.position.set(0, 0.24, cantileverZ);
      armPivot.add(cradleTop);

      for (const fx of [-0.36, 0.36]) {
        const fork = new THREE.Mesh(
          new THREE.BoxGeometry(0.11, 0.30, 0.28),
          mats.safetyYellow
        );
        fork.position.set(fx, 0.08, cantileverZ);
        armPivot.add(fork);
      }

      wheelPivot.add(armPivot);
      arms.push(armPivot);
    }

    sideGroup.add(wheelPivot);
    group.add(sideGroup);
    wheels[key] = { pivot: wheelPivot, arms };
  }

  return { group, wheels };
}

// =========================================================================
// 2. BULLWHEEL (Ø 5.6 m) + DIRECTDRIVE (X-RAY) + BRAKES + HYDRAULIC TENSION
// =========================================================================
export function buildBullwheelDirectDrive(mats) {
  const root = new THREE.Group();
  root.name = 'BullwheelDirectDriveAssembly';

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

  // Fixed Hydraulic Anchor Bulkhead at X = -0.35 m (rear of OG deck)
  const bulkhead = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 1.65, 3.8),
    mats.steelAnthracite
  );
  bulkhead.position.set(-0.35, F.ogFloorY + 0.85, 0);
  bulkhead.castShadow = true;
  root.add(bulkhead);

  // Two Giant Hydraulic Tensioning Cylinders (Hydraulische Seilspannung)
  const pistonRods = [];
  const accumulators = [];
  for (const sgn of [-1, 1]) {
    const cz = sgn * 1.15;
    const cy = F.ogFloorY + 0.92;

    // Machine-blue outer hydraulic cylinder barrel
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 2.35, 18),
      mats.machineBlue
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(1.05, cy, cz);
    barrel.castShadow = true;
    root.add(barrel);

    // Gleaming chrome hydraulic piston rod connecting barrel to sliding Bullwheel carriage!
    const rod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.115, 0.115, 2.2, 16),
      mats.chromePiston
    );
    rod.rotation.z = Math.PI / 2;
    rod.position.set(2.45, cy, cz);
    root.add(rod);
    pistonRods.push(rod);

    // Nitrogen-Hydraulic Pressure Accumulator Bottle (Druckspeicher) next to bulkhead
    const accOuter = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 1.45, 16),
      mats.machineBlue
    );
    accOuter.position.set(-0.25, F.ogFloorY + 2.15, cz * 1.35);
    root.add(accOuter);

    // Glowing pressure gauge column inside accumulator (visible in DirectDrive/Hydraulic X-Ray!)
    const accGlow = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 1.1, 14),
      mats.ledCoolStrip
    );
    accGlow.position.set(-0.25, F.ogFloorY + 2.15, cz * 1.35);
    accGlow.visible = false;
    root.add(accGlow);
    accumulators.push({ outer: accOuter, glow: accGlow });
  }

  // Sliding Bullwheel & DirectDrive Tension Carriage (Spannwagen)
  const tensionCarriage = new THREE.Group();
  tensionCarriage.position.set(B.centerX, 0, B.centerZ);

  // Heavy structural steel tension sledge base
  const sledgeBase = new THREE.Mesh(
    new THREE.BoxGeometry(3.5, 0.42, 3.6),
    mats.steelAnthracite
  );
  sledgeBase.position.set(0, F.ogFloorY + 0.48, 0);
  sledgeBase.castShadow = true;
  tensionCarriage.add(sledgeBase);

  // --- DirectDrive Gearless Synchronous Motor (Y = 7.4 -> 9.4 m, directly on Bullwheel shaft!) ---
  const motorGroup = new THREE.Group();
  motorGroup.position.set(0, F.ogFloorY + 1.68, 0);

  // Outer finned cast-iron stator housing (turns translucent in DirectDrive X-Ray!)
  const motorOuterGroup = new THREE.Group();
  const statorShell = new THREE.Mesh(
    new THREE.CylinderGeometry(1.58, 1.58, 1.48, 32, 1, false),
    mats.motorHousing
  );
  statorShell.castShadow = true;
  motorOuterGroup.add(statorShell);

  // Cooling fins around stator housing
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    const fin = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 1.42, 0.06),
      mats.motorHousing
    );
    fin.position.set(Math.cos(a) * 1.62, 0, Math.sin(a) * 1.62);
    fin.rotation.y = -a;
    motorOuterGroup.add(fin);
  }
  motorGroup.add(motorOuterGroup);

  // Inner Copper Stator Windings Ring (revealed clearly in DirectDrive X-Ray!)
  const copperStator = new THREE.Mesh(
    new THREE.CylinderGeometry(1.42, 1.42, 1.24, 32, 1, true),
    mats.copperWindings
  );
  motorGroup.add(copperStator);

  // Rotating Permanent-Magnet Rotor Drum (N/S poles rotating with Bullwheel!)
  const rotorGroup = new THREE.Group();
  const magnetRotor = new THREE.Mesh(
    new THREE.CylinderGeometry(1.16, 1.16, 1.18, 32),
    mats.magnetPoles
  );
  rotorGroup.add(magnetRotor);

  // Direct vertical forged-steel main drive shaft (no gearbox!)
  const mainShaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.46, 3.1, 20),
    mats.chromePiston
  );
  mainShaft.position.y = 0.72;
  rotorGroup.add(mainShaft);
  motorGroup.add(rotorGroup);

  // Rotating Electromagnetic Flux Overlay Ring (visible in DirectDrive X-Ray!)
  const magFieldGroup = new THREE.Group();
  magFieldGroup.visible = false;
  for (let k = 0; k < 12; k++) {
    const ang = (k / 12) * Math.PI * 2;
    const arc = new THREE.Mesh(
      new THREE.TorusGeometry(1.29, 0.045, 8, 16, Math.PI / 8),
      mats.magFieldRing
    );
    arc.rotation.x = Math.PI / 2;
    arc.rotation.z = ang;
    arc.position.y = (k % 2 === 0 ? 0.35 : -0.35);
    magFieldGroup.add(arc);
  }
  const fluxRingMid = new THREE.Mesh(
    new THREE.TorusGeometry(1.29, 0.05, 8, 48),
    mats.magFieldRing
  );
  fluxRingMid.rotation.x = Math.PI / 2;
  magFieldGroup.add(fluxRingMid);
  motorGroup.add(magFieldGroup);

  tensionCarriage.add(motorGroup);

  // --- Horizontal Bullwheel (Ø 5.6 m at Y = 10.10 m) + Steel Brake Disc ---
  const bullwheelPivot = new THREE.Group();
  bullwheelPivot.position.set(0, B.centerY, 0);

  // Signal-Red Heavy Bullwheel Rim (R = 2.80 m)
  const bullRim = new THREE.Mesh(
    new THREE.TorusGeometry(B.radius, 0.22, 14, 64),
    mats.doppelmayrRed
  );
  bullRim.rotation.x = Math.PI / 2;
  bullRim.castShadow = true;
  bullwheelPivot.add(bullRim);

  // Matte-black grooved rubber rope liner on outer edge
  const bullLiner = new THREE.Mesh(
    new THREE.TorusGeometry(B.radius + 0.06, 0.10, 10, 64),
    mats.rubberLiner
  );
  bullLiner.rotation.x = Math.PI / 2;
  bullwheelPivot.add(bullLiner);

  // 8 Heavy Signal-Red Radial Spokes
  for (let s = 0; s < 8; s++) {
    const a = (s * Math.PI) / 4;
    const spoke = new THREE.Mesh(
      new THREE.BoxGeometry(B.radius * 1.92, 0.26, 0.24),
      mats.doppelmayrRed
    );
    spoke.rotation.y = a;
    spoke.castShadow = true;
    bullwheelPivot.add(spoke);
  }

  // Central Hub Cap
  const bullHub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.74, 0.78, 0.44, 24),
    mats.steelAnthracite
  );
  bullwheelPivot.add(bullHub);

  // Direct-Acting Machined Steel Brake Disc right under Bullwheel (R = 2.42 m)
  const brakeDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(B.brakeDiscRadius, B.brakeDiscRadius, 0.09, 48),
    mats.brakeDiscSteel
  );
  brakeDisc.position.y = -0.34;
  bullwheelPivot.add(brakeDisc);

  tensionCarriage.add(bullwheelPivot);

  // --- 4 Direct-Acting Service & Safety Disc Brake Calipers (Betriebs- & Sicherheitsbremsen) ---
  const brakeCalipers = [];
  const caliperAngles = [-Math.PI * 0.75, -Math.PI * 0.25, Math.PI * 0.25, Math.PI * 0.75];
  for (const ang of caliperAngles) {
    const calGroup = new THREE.Group();
    const r = B.brakeDiscRadius;
    calGroup.position.set(Math.cos(ang) * r, B.centerY - 0.34, Math.sin(ang) * r);
    calGroup.rotation.y = -ang;

    // Fixed caliper bridge bracket
    const bridge = new THREE.Mesh(
      new THREE.BoxGeometry(0.54, 0.44, 0.48),
      mats.brakeCaliperRed
    );
    bridge.position.x = 0.12;
    calGroup.add(bridge);

    // Upper & lower moving brake pads (visibly clamp onto disc on emergency stop!)
    const padTop = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.36), mats.steelAnthracite);
    const padBot = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.36), mats.steelAnthracite);
    padTop.position.set(-0.04, 0.12, 0);
    padBot.position.set(-0.04, -0.12, 0);
    calGroup.add(padTop, padBot);

    // Support column down to tension sledge
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
// 3. STEPPED V-BELT TIRE CONVEYORS (VERZÖGERER & BESCHLEUNIGER)
// =========================================================================
export function buildTireConveyors(mats, kin) {
  const group = new THREE.Group();
  group.name = 'TireConveyors';

  const rTire = GS_SPECS.track.tireRadius;
  const tireGeo = new THREE.CylinderGeometry(rTire, rTire, 0.15, 20);
  const rimGeo = new THREE.CylinderGeometry(rTire * 0.52, rTire * 0.52, 0.17, 12);
  const pulleyGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.07, 14);
  const allTires = [];

  const buildSide = (tireSpecs) => {
    for (let i = 0; i < tireSpecs.length; i++) {
      const spec = tireSpecs[i];
      const unit = new THREE.Group();
      // Offset tire slightly inboard so its tread engages the cabin friction plate cleanly!
      const inboardOffset = -spec.sideSign * (rTire + 0.06);
      unit.position.set(spec.x, spec.y, spec.z + inboardOffset);

      // Rotating tire + metallic wheel hub + stepped V-belt drive pulley on top
      const wheelPivot = new THREE.Group();
      const tireMesh = new THREE.Mesh(tireGeo, mats.rubberTire);
      const rimMesh = new THREE.Mesh(rimGeo, mats.steelGalvanized);
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(rTire * 0.92, 0.18, 0.04), mats.doppelmayrRed);

      // Stepped V-belt pulley radius scales with stage group (visually authentic stepped ratios!)
      const pulleyScale = 0.72 + spec.stageGroup * 0.13;
      const pulley = new THREE.Mesh(pulleyGeo, mats.steelAnthracite);
      pulley.scale.set(pulleyScale, 1, pulleyScale);
      pulley.position.y = 0.16;

      wheelPivot.add(tireMesh, rimMesh, spoke, pulley);
      unit.add(wheelPivot);

      // Overhead conveyor steel support beam bracket
      const bracket = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.32, 0.18),
        mats.steelAnthracite
      );
      bracket.position.y = 0.34;
      unit.add(bracket);

      // Connect adjacent tires with visible V-belt straps!
      if (i > 0) {
        const prev = tireSpecs[i - 1];
        const dx = spec.x - prev.x;
        const dz = spec.z - prev.z;
        const dist = Math.hypot(dx, dz);
        const belt = new THREE.Mesh(
          new THREE.BoxGeometry(dist, 0.032, 0.08),
          mats.rubberLiner
        );
        belt.position.set(-dx * 0.5, 0.16, -dz * 0.5);
        belt.rotation.y = -Math.atan2(dz, dx);
        unit.add(belt);
      }

      // Electric motor block on every 5th tire stage
      if (i % 5 === 2) {
        const stageMotor = new THREE.Mesh(
          new THREE.CylinderGeometry(0.16, 0.16, 0.42, 12),
          mats.machineBlue
        );
        stageMotor.position.set(0, 0.52, -spec.sideSign * 0.24);
        unit.add(stageMotor);
      }

      group.add(unit);
      allTires.push({ pivot: wheelPivot, spec, angle: 0 });
    }
  };

  buildSide(kin.decelTires);
  buildSide(kin.accelTires);

  return { group, allTires };
}

// =========================================================================
// 4. COUPLING CAM RAMPS, ROPE TRUMPET & CLAMPING FORCE CHECK GATE
// =========================================================================
export function buildCouplingZones(mats) {
  const group = new THREE.Group();
  group.name = 'CouplingRampsAndCheckGate';

  const T = GS_SPECS.track;
  const yOG = GS_SPECS.floors.ogRailY;

  // Build curved steel cam rails (Kuppelrampen) at Detach (Z=-2.80) and Attach (Z=+2.80)
  for (const sgn of [-1, 1]) {
    const zRope = sgn * T.ropeHalfGaugeZ;
    const rampPts = [];
    const span = T.rampEndX - T.rampStartX;
    for (let i = 0; i <= 28; i++) {
      const u = i / 28;
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
      // Cam rail positioned directly above the actuation roller path!
      rampPts.push(new THREE.Vector3(x, yOG + 0.38 + lift * 0.22, zRope - sgn * 0.22));
    }
    const camCurve = new THREE.CatmullRomCurve3(rampPts);
    const camRail = new THREE.Mesh(
      new THREE.TubeGeometry(camCurve, 32, 0.048, 8, false),
      mats.safetyYellow
    );
    camRail.castShadow = true;
    group.add(camRail);

    // Steel ramp mounting frame
    const frameBar = new THREE.Mesh(
      new THREE.BoxGeometry(span + 0.6, 0.14, 0.14),
      mats.doppelmayrRed
    );
    frameBar.position.set(T.rampCenterX, yOG + 0.82, zRope - sgn * 0.22);
    group.add(frameBar);

    for (const fx of [T.rampStartX, T.rampCenterX, T.rampEndX]) {
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.42, 8), mats.steelAnthracite);
      strut.position.set(fx, yOG + 0.62, zRope - sgn * 0.22);
      group.add(strut);
    }

    // Flared Steel Rope Entry Trumpet (Seilfangtrichter) guiding the 54 mm rope into the open grip jaw!
    const trumpet = new THREE.Mesh(
      new THREE.ConeGeometry(0.24, 0.62, 16, 1, true),
      mats.steelGalvanized
    );
    trumpet.rotation.z = sgn > 0 ? Math.PI / 2 : -Math.PI / 2;
    trumpet.position.set(sgn > 0 ? T.rampStartX - 0.25 : T.rampEndX + 0.25, yOG, zRope);
    group.add(trumpet);
  }

  // --- Clamping Force & Rope Position Check Zone (Prüfstrecke at X = +13.45 m, Z = +2.80 m) ---
  const checkGate = new THREE.Group();
  checkGate.position.set(T.checkCenterX, yOG, T.ropeHalfGaugeZ);

  // Precision sensor gantry arch
  const archTop = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.18, 0.88), mats.steelAnthracite);
  archTop.position.set(0, 0.68, 0);
  checkGate.add(archTop);

  for (const sz of [-0.38, 0.38]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.86, 0.12), mats.steelAnthracite);
    leg.position.set(0, 0.28, sz);
    checkGate.add(leg);
  }

  // Mechanical force feeler roller + laser emitter boxes
  const feelerBox = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.22), mats.machineBlue);
  feelerBox.position.set(0, 0.48, -0.24);
  checkGate.add(feelerBox);

  // Dual High-Visibility Status Signal Lamps (flashes crisp GREEN on OK, bright RED on fault!)
  const sensorLampMat = mats.sensorLamp.clone();
  const lampL = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), sensorLampMat);
  const lampR = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), sensorLampMat);
  lampL.position.set(-0.36, 0.86, 0);
  lampR.position.set(0.36, 0.86, 0);
  checkGate.add(lampL, lampR);

  group.add(checkGate);

  return { group, checkGate, sensorLampMat };
}

// =========================================================================
// 5. 10 FUTURISTIC 10er PANORAMA CABINS WITH CUTAWAY D-LINE SPRING GRIPS
// =========================================================================
function createSingleCabinMesh(num, mats) {
  const C = GS_SPECS.cabin;
  const root = new THREE.Group();
  root.name = `PanoramaCabin_${num}`;

  // --- A. OVERHEAD D-LINE DETACHABLE SPRING GRIP (AT LOCAL (0, 0, 0) = ROPE AXIS!) ---
  const gripGroup = new THREE.Group();
  gripGroup.name = 'DLineSpringGrip';

  // Per-cabin materials for live spring glow & cutaway transparency
  const springMat = mats.springSteel.clone();
  const coverMat = mats.doppelmayrRed.clone();
  const jawMat = mats.steelGalvanized;

  // Fixed upper jaw saddle hugging the haul rope from above/inboard
  const fixedJaw = new THREE.Mesh(
    new THREE.BoxGeometry(0.46, 0.14, 0.16),
    jawMat
  );
  fixedJaw.position.set(0, 0.08, -0.02);
  gripGroup.add(fixedJaw);

  // Movable lower/outboard clamping jaw (pivots open when cam roller lifts!)
  const movableJawPivot = new THREE.Group();
  movableJawPivot.position.set(0, 0.02, 0.08);
  const movableJaw = new THREE.Mesh(
    new THREE.BoxGeometry(0.44, 0.12, 0.15),
    mats.steelPolishedRail
  );
  movableJaw.position.set(0, -0.08, -0.06);
  movableJawPivot.add(movableJaw);
  gripGroup.add(movableJawPivot);

  // Belleville Disc Spring Pack (Tellerfederpaket — 8 stacked conical spring washers!)
  // Oriented horizontally along -Z (inboard of rope), physically compresses when jaw opens!
  const springPack = new THREE.Group();
  springPack.position.set(0, 0.14, -0.10);
  const discGeo = new THREE.CylinderGeometry(0.085, 0.098, 0.022, 14);
  discGeo.rotateX(Math.PI / 2);
  for (let d = 0; d < 8; d++) {
    const disc = new THREE.Mesh(discGeo, springMat);
    disc.position.z = -d * 0.032;
    springPack.add(disc);
  }
  gripGroup.add(springPack);

  // Actuation Lever & Cam Roller (Betätigungsrolle riding the yellow coupling ramp!)
  const leverPivot = new THREE.Group();
  leverPivot.position.set(0, 0.16, -0.22);
  const leverArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 0.28, 0.08),
    mats.steelAnthracite
  );
  leverArm.position.set(0, 0.14, 0);
  leverPivot.add(leverArm);

  const camRoller = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.075, 0.07, 14),
    mats.safetyYellow
  );
  camRoller.rotation.x = Math.PI / 2;
  camRoller.position.set(0, 0.28, 0);
  leverPivot.add(camRoller);
  gripGroup.add(leverPivot);

  // Outer Protective Grip Housing Cover (hides cleanly in Klemmen-Schnitt mode!)
  const gripCover = new THREE.Mesh(
    new THREE.BoxGeometry(0.56, 0.28, 0.42),
    coverMat
  );
  gripCover.position.set(0, 0.14, -0.14);
  gripGroup.add(gripCover);

  // 2 Station Guide Rail Running Rollers (Laufrollen riding overhead steel rail)
  for (const rx of [-0.28, 0.28]) {
    const roller = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.085, 0.06, 12),
      mats.steelPolishedRail
    );
    roller.rotation.x = Math.PI / 2;
    roller.position.set(rx, 0.22, 0.04);
    gripGroup.add(roller);
  }

  // Friction Plate for Tire Conveyors (Reibplatte engaged by the 40 rubber tires!)
  const frictionPlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.05, 0.18),
    mats.steelAnthracite
  );
  frictionPlate.position.set(0, 0.16, 0.18);
  gripGroup.add(frictionPlate);

  // 3D Clamping Force Arrows (28 kN — visible in Klemmen-Schnitt when clamped onto rope!)
  const forceArrows = new THREE.Group();
  forceArrows.visible = false;
  const arrowShaftGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.22, 8);
  const arrowHeadGeo = new THREE.ConeGeometry(0.058, 0.12, 10);
  const arrowMat = mats.forceArrowGreen.clone();
  for (const dir of [-1, 1]) {
    const aGrp = new THREE.Group();
    const shaft = new THREE.Mesh(arrowShaftGeo, arrowMat);
    const head = new THREE.Mesh(arrowHeadGeo, arrowMat);
    shaft.position.y = dir * 0.24;
    head.position.y = dir * 0.11;
    head.rotation.z = dir > 0 ? Math.PI : 0;
    aGrp.add(shaft, head);
    forceArrows.add(aGrp);
  }
  gripGroup.add(forceArrows);

  root.add(gripGroup);

  // --- B. SWINGING C-HANGER + 10er PANORAMA CABIN BODY ---
  // Note: Local +X = forward, Local +Z = outboard (towards platform/away from center tower!)
  const swingGroup = new THREE.Group();
  swingGroup.name = 'SwingingCabin';

  // Sleek Curved C-Hanger Arm (C-Gehänge) extending outboard then down to cabin roof
  const hangerCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.02, 0.04),
    new THREE.Vector3(0, -0.22, 0.42),
    new THREE.Vector3(0, -0.58, 0.36),
    new THREE.Vector3(0, -C.pivotToRoofY, 0.0)
  ]);
  const hangerMesh = new THREE.Mesh(
    new THREE.TubeGeometry(hangerCurve, 18, 0.068, 10, false),
    mats.steelAnthracite
  );
  hangerMesh.castShadow = true;
  swingGroup.add(hangerMesh);

  // Cabin Suspension Shock Mount on Roof
  const roofY = -C.pivotToRoofY; // -0.82 m
  const floorY = -C.pivotToFloorY; // -2.94 m
  const midY = 0.5 * (roofY + floorY); // -1.88 m
  const bodyH = C.bodyHeightY; // 2.12 m
  const bodyL = C.bodyLengthX; // 2.26 m
  const bodyW = C.bodyWidthZ;  // 1.64 m

  const roofMount = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.36, 0.14, 14),
    mats.steelAnthracite
  );
  roofMount.position.set(0, roofY + 0.06, 0);
  swingGroup.add(roofMount);

  // Futuristic Rounded Cabin Roof Cap (Signal Red Accent)
  const roofCap = new THREE.Mesh(
    new THREE.BoxGeometry(bodyL * 0.96, 0.18, bodyW * 0.94),
    mats.cabinAccentRed
  );
  roofCap.position.set(0, roofY - 0.08, 0);
  roofCap.castShadow = true;
  swingGroup.add(roofCap);

  // Lower Futuristic Silver-Anthracite Cabin Hull Skirt
  const lowerHull = new THREE.Mesh(
    new THREE.BoxGeometry(bodyL, 0.56, bodyW),
    mats.cabinBodySilver
  );
  lowerHull.position.set(0, floorY + 0.28, 0);
  lowerHull.castShadow = true;
  lowerHull.receiveShadow = true;
  swingGroup.add(lowerHull);

  // Dark Bumper Base under Cabin Floor
  const floorBase = new THREE.Mesh(
    new THREE.BoxGeometry(bodyL * 0.94, 0.12, bodyW * 0.94),
    mats.cabinFrameDark
  );
  floorBase.position.set(0, floorY + 0.04, 0);
  swingGroup.add(floorBase);

  // 4 Slim Corner Structural Pillars (leaving wide 360° panoramic glass windows!)
  const glassH = bodyH - 0.72; // 1.40 m panoramic glass height!
  const glassCenterY = floorY + 0.56 + glassH * 0.5;
  for (const px of [-bodyL * 0.47, bodyL * 0.47]) {
    for (const pz of [-bodyW * 0.47, bodyW * 0.47]) {
      const pillar = new THREE.Mesh(
        new THREE.BoxGeometry(0.11, glassH, 0.11),
        mats.cabinFrameDark
      );
      pillar.position.set(px, glassCenterY, pz);
      swingGroup.add(pillar);
    }
  }

  // Front, Back & Inboard Panoramic Tinted Glass Windows
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

  // Animated Double Sliding Boarding Doors on Outboard Side (+Z = facing EG Walk-In Platform!)
  const doorW = (bodyL - 0.34) * 0.5;
  const doorH = bodyH - 0.24;
  const doorY = floorY + 0.12 + doorH * 0.5;

  const makeSlidingDoor = (signX) => {
    const door = new THREE.Group();
    door.position.set(signX * (doorW * 0.5), doorY, bodyW * 0.49);
    const glassPane = new THREE.Mesh(new THREE.BoxGeometry(doorW - 0.04, doorH - 0.42, 0.035), mats.cabinGlass);
    glassPane.position.y = 0.14;
    const lowerPanel = new THREE.Mesh(new THREE.BoxGeometry(doorW - 0.03, 0.44, 0.045), mats.cabinAccentRed);
    lowerPanel.position.y = -doorH * 0.5 + 0.22;
    const frameEdge = new THREE.Mesh(new THREE.BoxGeometry(0.04, doorH, 0.05), mats.cabinFrameDark);
    frameEdge.position.x = -signX * (doorW * 0.48);
    door.add(glassPane, lowerPanel, frameEdge);
    return door;
  };
  const doorLeft = makeSlidingDoor(-1);
  const doorRight = makeSlidingDoor(+1);
  swingGroup.add(doorLeft, doorRight);

  // Exterior Ski & Snowboard Quivers (Ski-Köcher) mounted on front & back lower hull!
  for (const sx of [-1, 1]) {
    for (const qz of [-0.36, 0.36]) {
      const quiver = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.72, 0.26),
        mats.cabinFrameDark
      );
      quiver.position.set(sx * (bodyL * 0.5 + 0.07), floorY + 0.44, qz);
      swingGroup.add(quiver);
    }
  }

  // Interior Ergonomic Facing Benches (2 benches for 10 passengers!)
  for (const bx of [-bodyL * 0.31, bodyL * 0.31]) {
    const bench = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.09, bodyW - 0.28),
      mats.cabinSeatBench
    );
    bench.position.set(bx, floorY + 0.54, 0);
    swingGroup.add(bench);
  }

  // Warm Interior Ceiling Dome LED (illuminates the entire panoramic cabin in Blue Hour!)
  const interiorLed = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, 0.05, 0.36),
    mats.cabinInteriorLight
  );
  interiorLed.position.set(0, roofY - 0.19, 0);
  swingGroup.add(interiorLed);

  // Illuminated Cabin Number Plates (01..10) on Front & Rear Roof Fascia
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
    gripGroup,
    gripCover,
    movableJawPivot,
    springPack,
    springMat,
    leverPivot,
    forceArrows,
    arrowMat,
    doorLeft,
    doorRight,
    doorBaseX: doorW * 0.5
  };
}

export function buildAllCabins(mats) {
  const group = new THREE.Group();
  group.name = 'PanoramaCabinsFleet';
  const cabins = [];
  for (let i = 0; i < GS_SPECS.cabin.count; i++) {
    const c = createSingleCabinMesh(i + 1, mats);
    group.add(c.root);
    cabins.push(c);
  }
  return { group, cabins };
}
