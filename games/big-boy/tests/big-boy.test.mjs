import test from 'node:test';
import assert from 'node:assert/strict';

import { BIG_BOY_SPECS, ECCENTRIC_ROD_LENGTH, RADIUS_ROD_LENGTH } from '../specs.js';
import {
  solveEngineSideKinematics,
  solveEngineUnitKinematics,
  solveArticulation
} from '../bb-kinematics.js';
import {
  BigBoyPhysics,
  computeCylinderChamberState,
  generatePVLoop,
  inspectValveTiming
} from '../bb-physics.js';

const { layout, wheels, cylinder, valveGear, zPlanes, track } = BIG_BOY_SPECS;

test('Z-planes are strictly ordered outward with positive clearances', () => {
  const ordered = [
    zPlanes.frameHalf + zPlanes.frameThick * 0.5,
    zPlanes.wheelOuterFace,
    zPlanes.wheelHubFace,
    zPlanes.couplingRod - zPlanes.couplingRodThick * 0.5,
    zPlanes.couplingRod + zPlanes.couplingRodThick * 0.5,
    zPlanes.mainRod - zPlanes.mainRodThick * 0.5,
    zPlanes.mainRod + zPlanes.mainRodThick * 0.5,
    zPlanes.eccentricCrankInner,
    zPlanes.combinationLever,
    zPlanes.expansionLink,
    zPlanes.eccentricRod
  ];
  for (let i = 1; i < ordered.length; i++) {
    assert.ok(
      ordered[i] > ordered[i - 1],
      `Z-plane overlap at index ${i}: ${ordered[i]} <= ${ordered[i - 1]}`
    );
  }
});

test('4-8-8-4 driving wheel spacing gives clear tire gaps and identical front/rear geometry', () => {
  for (const unit of [layout.frontEngine, layout.rearEngine]) {
    assert.equal(unit.driverXs.length, 4);
    for (let i = 0; i < 3; i++) {
      const dx = unit.driverXs[i] - unit.driverXs[i + 1];
      assert.ok(Math.abs(dx - wheels.driverSpacing) < 1e-4);
      assert.ok(dx > wheels.driverDiameter + 0.08, 'Adjacent 68-inch drivers must not touch');
    }
    const mainToCyl = unit.cylinderX - unit.driverXs[unit.mainAxleIndex];
    assert.ok(Math.abs(mainToCyl - valveGear.mainToCylDx) < 1e-3);
  }
  // Clearance between rear cylinder front face and front engine 4th driver rear edge
  const rearCylFront = layout.rearEngine.cylinderX + cylinder.barrelLength * 0.5;
  const frontDriver4Rear = layout.frontEngine.driverXs[3] - wheels.driverRadius;
  assert.ok(frontDriver4Rear > rearCylFront + 0.25, 'Clearance between rear cylinders and front engine rear driver');
});

test('Slider-crank and Walschaerts rod lengths stay strictly rigid across 360° and all cutoffs', () => {
  const cutoffs = [-0.8, -0.35, 0, 0.25, 0.5, 0.8];
  const eccCrankRigidLen = Math.hypot(cylinder.crankRadius, valveGear.eccentricRadius);

  for (const unit of [layout.frontEngine, layout.rearEngine]) {
    for (const cutoff of cutoffs) {
      for (let deg = 0; deg < 360; deg += 10) {
        const theta = (deg * Math.PI) / 180;
        const k = solveEngineSideKinematics(unit, theta, cutoff);

        // Main connecting rod exact length
        const mainLen = Math.hypot(k.crosshead.x - k.mainPin.x, k.crosshead.y - k.mainPin.y);
        assert.ok(Math.abs(mainLen - valveGear.mainRodLength) < 1e-5, `Main rod drift: ${mainLen}`);

        // Coupling rods stay horizontal with exact axle spacing
        for (let i = 0; i < 3; i++) {
          const p0 = k.crankPins[i];
          const p1 = k.crankPins[i + 1];
          assert.ok(Math.abs(p0.y - p1.y) < 1e-9);
          assert.ok(Math.abs((p0.x - p1.x) - wheels.driverSpacing) < 1e-6);
        }

        // Eccentric crank arm rigid length
        const eccArmLen = Math.hypot(k.eccentricPin.x - k.mainPin.x, k.eccentricPin.y - k.mainPin.y);
        assert.ok(Math.abs(eccArmLen - eccCrankRigidLen) < 1e-5, `Eccentric crank drift: ${eccArmLen}`);

        // Eccentric rod exact closure to link tail
        const eccRodLen = Math.hypot(k.linkTail.x - k.eccentricPin.x, k.linkTail.y - k.eccentricPin.y);
        assert.ok(Math.abs(eccRodLen - ECCENTRIC_ROD_LENGTH) < 1e-4, `Eccentric rod drift: ${eccRodLen}`);

        // Link tail radius from link trunnion
        const tailLen = Math.hypot(k.linkTail.x - k.linkPivot.x, k.linkTail.y - k.linkPivot.y);
        assert.ok(Math.abs(tailLen - valveGear.linkTailLength) < 1e-5);

        // Radius rod exact closure from die block to combination lever fulcrum
        const radLen = Math.hypot(k.radiusRodPin.x - k.dieBlock.x, k.radiusRodPin.y - k.dieBlock.y);
        assert.ok(Math.abs(radLen - RADIUS_ROD_LENGTH) < 1e-4, `Radius rod drift: ${radLen}`);

        // Combination lever exact total length
        const combLen = Math.hypot(k.combBottomPin.x - k.valveStemPin.x, k.combBottomPin.y - k.valveStemPin.y);
        assert.ok(Math.abs(combLen - (valveGear.combTopA + valveGear.combBottomB)) < 1e-5);
      }
    }
  }
});

test('90-degree quartering prevents simultaneous dead centers between right and left sides', () => {
  for (let deg = 0; deg < 360; deg += 5) {
    const theta = (deg * Math.PI) / 180;
    const unit = solveEngineUnitKinematics(layout.frontEngine, theta, 0.75);
    const rightSin = Math.abs(Math.sin(unit.right.crankAngle));
    const leftSin = Math.abs(Math.sin(unit.left.crankAngle));
    assert.ok(Math.max(rightSin, leftSin) >= 0.70, 'At least one side must have high crank leverage');
  }
});

test('Walschaerts valve events produce authentic lead, full-gear travel, hooking-up & reversal', () => {
  const fullFwd = inspectValveTiming(0.8);
  const cruiseFwd = inspectValveTiming(0.25);
  const neutral = inspectValveTiming(0);
  const fullRev = inspectValveTiming(-0.8);

  // Full gear total valve travel near real Big Boy 190.5 mm (7.5 in)
  assert.ok(fullFwd.totalValveTravelMm > 165 && fullFwd.totalValveTravelMm < 215,
    `Expected ~190 mm valve travel, got ${fullFwd.totalValveTravelMm.toFixed(1)} mm`);
  // Hooking up shortens valve travel and live-steam admission window
  assert.ok(cruiseFwd.totalValveTravelMm < fullFwd.totalValveTravelMm * 0.78);
  assert.ok(cruiseFwd.frontAdmissionFraction < fullFwd.frontAdmissionFraction * 0.78);
  // Neutral minimizes admission to tiny lead pulse
  assert.ok(neutral.frontAdmissionFraction < cruiseFwd.frontAdmissionFraction);
  // Reverse mirrors forward travel
  assert.ok(Math.abs(fullRev.totalValveTravelMm - fullFwd.totalValveTravelMm) < 12);

  // At FDC (theta = 0): inside-admission valve must be displaced NEGATIVE by ~lap+lead -> front port slightly open!
  const atFDC = solveEngineSideKinematics(layout.frontEngine, 0, 0.75);
  assert.ok(atFDC.valveDisp < -cylinder.steamLap, `Expected negative valveDisp at FDC for front lead, got ${atFDC.valveDisp}`);
  assert.ok(atFDC.ports.frontAdmissionOpen > 0.05, 'Front admission port must have positive lead at FDC');

  // At mid-stroke going rearward (theta = pi/2): forward gear opens FRONT admission wide; reverse gear opens REAR admission!
  const midFwd = solveEngineSideKinematics(layout.frontEngine, Math.PI / 2, 0.8);
  const midRev = solveEngineSideKinematics(layout.frontEngine, Math.PI / 2, -0.8);
  assert.ok(midFwd.ports.frontAdmissionOpen > 0.75, 'Forward gear must admit front steam at theta=pi/2');
  assert.ok(midRev.ports.rearAdmissionOpen > 0.75, 'Reverse gear must admit rear steam at theta=pi/2');
});

test('Curved-track articulation keeps front engine centered on the 87.3 m curve with realistic boiler overhang', () => {
  const straight = solveArticulation(0);
  assert.equal(straight.frontYaw, 0);
  assert.equal(straight.boilerOverhangAtSmokebox, 0);

  const curved = solveArticulation(1);
  assert.ok(curved.frontYaw > 0.08 && curved.frontYaw < 0.16, `Unexpected frontYaw: ${curved.frontYaw}`);
  assert.ok(curved.boilerOverhangAtSmokebox > 0.9 && curved.boilerOverhangAtSmokebox < 1.6,
    `Expected realistic ~1.3 m smokebox overhang, got ${curved.boilerOverhangAtSmokebox}`);

  // Verify front engine mid-point sits strictly on the circle centered at (rearMidX, -R)
  const hingeX = layout.hingeX;
  const d = layout.frontEngine.midX - hingeX;
  const fx = hingeX + d * Math.cos(curved.frontYaw);
  const fz = -d * Math.sin(curved.frontYaw);
  const distToCenter = Math.hypot(fx - layout.rearEngine.midX, fz - (-track.demoCurveRadius));
  assert.ok(Math.abs(distToCenter - track.demoCurveRadius) < 1e-4,
    `Front engine off curve by ${Math.abs(distToCenter - track.demoCurveRadius)} m`);

  // Ball-joint pipe length changes smoothly (slip joint telescopes cleanly)
  assert.ok(curved.livePipe.length > 7.0 && curved.livePipe.length < 9.0);
  assert.ok(curved.exhaustPipe.length > 0.5 && curved.exhaustPipe.length < 2.2);
});

test('Thermodynamics & p-V indicator diagram verify Hooking Up efficiency and Big Boy performance envelope', () => {
  const pv75 = generatePVLoop(0.75, 20.4);
  const pv25 = generatePVLoop(0.25, 20.4);

  // Higher cut-off yields higher IMEP (more starting tractive effort)
  assert.ok(pv75.mepBar > pv25.mepBar * 1.4, `Expected 75% IMEP (${pv75.mepBar}) >> 25% (${pv25.mepBar})`);
  assert.ok(pv75.mepBar > 14 && pv75.mepBar < 20);
  assert.ok(pv25.mepBar > 6 && pv25.mepBar < 13);

  // Verify all 4 thermodynamic phases appear in a full cycle
  const phases = new Set(pv25.points.map((pt) => pt.phase));
  assert.ok(phases.has('admission'));
  assert.ok(phases.has('expansion'));
  assert.ok(phases.has('exhaust'));
  assert.ok(phases.has('compression'));

  // Step physics at full forward throttle -> realistic speed, tractive effort, draft & independent phase drift
  const phys = new BigBoyPhysics();
  phys.throttle = 0.95;
  phys.cutoff = 0.78;
  phys.speedMs = 1.0;
  let rearBeats = 0;
  let frontBeats = 0;
  let last = null;
  for (let i = 0; i < 120; i++) {
    last = phys.step(0.05);
    if (last.events.rearExhaust) rearBeats++;
    if (last.events.frontExhaust) frontBeats++;
  }
  assert.ok(last.tractiveEffortKN > 450 && last.tractiveEffortKN <= 603, `TE=${last.tractiveEffortKN}`);
  assert.ok(last.boilerPressureBar > 18.5 && last.boilerPressureBar <= 21.0);
  assert.ok(last.steamTempC > 340 && last.steamTempC < 420);
  assert.ok(rearBeats >= 4 && frontBeats >= 4, 'Both engines must emit exhaust beats');

  // Reverse cut-off reverses locomotive direction
  phys.speedMs = 0;
  phys.cutoff = -0.7;
  for (let i = 0; i < 40; i++) last = phys.step(0.05);
  assert.ok(last.speedMs < -0.5, 'Negative cut-off must drive locomotive in reverse');
});
