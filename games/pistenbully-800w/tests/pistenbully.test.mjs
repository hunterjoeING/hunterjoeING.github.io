// Automated Engineering & Kinematics Verification Suite for PistenBully 800 W
import test from 'node:test';
import assert from 'node:assert/strict';

import { PB_SPECS } from '../specs.js';
import {
  TRACK_LOOP,
  solveBladeKinematics,
  solveTillerKinematics,
  solveWinchKinematics
} from '../pb-kinematics.js';
import { PistenBullyPhysics } from '../pb-physics.js';
import { PISTENBULLY_PARTS, PISTENBULLY_TOUR_STEPS } from '../pb-data.js';

test('Track spline closure, road-wheel tangency & exact 13-tooth Sternrad meshing', () => {
  const t = PB_SPECS.tracks;
  // 1. Exact pitch match between grousers and rear drive sprocket teeth (zero drift!)
  const sprocketToothPitch = (Math.PI * 2 * TRACK_LOOP.sprocketRadius) / t.sprocketTeeth;
  assert.ok(
    Math.abs(sprocketToothPitch - TRACK_LOOP.grouserPitch) < 1e-8,
    `Grouser pitch (${TRACK_LOOP.grouserPitch}) must match sprocket tooth pitch (${sprocketToothPitch})`
  );

  // 2. Closed loop C0 continuity (sampleAt(0) === sampleAt(totalLength))
  const p0 = TRACK_LOOP.sampleAt(0);
  const pEnd = TRACK_LOOP.sampleAt(TRACK_LOOP.totalLength - 1e-9);
  assert.ok(Math.hypot(p0.x - pEnd.x, p0.y - pEnd.y) < 1e-4, 'Track loop must close cleanly');

  // 3. Road wheels rest on inner bottom belt at y = beltY with outward normal (0, -1)
  let bottomChecked = 0;
  for (let i = 0; i < 200; i++) {
    const pt = TRACK_LOOP.sampleAt((i / 200) * TRACK_LOOP.totalLength);
    if (pt.x > -1.45 && pt.x < 1.38 && pt.y < 0.15) {
      assert.ok(Math.abs(pt.y - t.beltY) < 1e-4, `Bottom track y=${pt.y} must equal beltY=${t.beltY}`);
      assert.ok(Math.abs(pt.ny + 1) < 1e-4, 'Bottom outward normal must point straight down (0, -1)');
      bottomChecked++;
    }
  }
  assert.ok(bottomChecked > 15, 'Should sample many points along bottom track run');

  // 4. Every grouser on the rear sprocket sits dead-center in a sprocket tooth valley at arbitrary travel offsets!
  for (const offset of [0, 0.37, 2.85, 19.42, -5.13]) {
    const sprocketAng = TRACK_LOOP.getSprocketAngle(offset);
    const toothStep = (Math.PI * 2) / t.sprocketTeeth;
    let onSprocketCount = 0;

    for (let g = 0; g < t.numGrousers; g++) {
      let s = (g * TRACK_LOOP.grouserPitch + offset) % TRACK_LOOP.totalLength;
      if (s < 0) s += TRACK_LOOP.totalLength;
      if (s > TRACK_LOOP.sprocketArc.sStart + 0.02 && s < TRACK_LOOP.sprocketArc.sStart + TRACK_LOOP.sprocketArc.length - 0.02) {
        const pt = TRACK_LOOP.sampleAt(s);
        const grouserPhi = Math.atan2(pt.y - t.sprocketCenter.y, pt.x - t.sprocketCenter.x);
        const rel = ((grouserPhi - sprocketAng) % toothStep + toothStep) % toothStep;
        const err = Math.min(rel, toothStep - rel);
        assert.ok(err < 1e-5, `Grouser #${g} angular mismatch ${err} rad at offset=${offset}`);
        onSprocketCount++;
      }
    }
    assert.ok(onSprocketCount >= 3, 'At least 3 grousers must engage the sprocket simultaneously');
  }
});

test('12-Way Snow Blade kinematics: all 8 hydraulic cylinders stay valid & finite across extreme poses', () => {
  const poses = [
    { lift: -0.2, angleDeg: -24, tiltDeg: -12, pitchDeg: -16, wingDeg: -35 },
    { lift: 0.05, angleDeg: 0, tiltDeg: 0, pitchDeg: 4, wingDeg: 20 },
    { lift: 0.95, angleDeg: 24, tiltDeg: 12, pitchDeg: 22, wingDeg: 45 },
    { lift: 0.0, angleDeg: 20, tiltDeg: -10, pitchDeg: -12, wingDeg: 45 }
  ];

  for (const pose of poses) {
    const kin = solveBladeKinematics(pose);
    const cylNames = ['liftLeft', 'liftRight', 'angleLeft', 'angleRight', 'tilt', 'pitch', 'wingLeft', 'wingRight'];
    for (const name of cylNames) {
      const c = kin.cylinders[name];
      assert.ok(Number.isFinite(c.length), `Cylinder ${name} length must be finite`);
      assert.ok(c.length > 0.25 && c.length < 1.65, `Cylinder ${name} length ${c.length}m out of mechanical bounds`);
      const unitLen = Math.hypot(c.dir.x, c.dir.y, c.dir.z);
      assert.ok(Math.abs(unitLen - 1.0) < 1e-6, `Cylinder ${name} direction must be unit vector`);
    }
  }

  // Verify 5.30 m nominal width when wings are flat (wingDeg = 0)
  const flat = solveBladeKinematics({ wingDeg: 0 });
  assert.ok(Math.abs(flat.effectiveWidthM - 5.30) < 1e-6, `Expected 5.30 m flat blade width, got ${flat.effectiveWidthM}`);
});

test('AlpinFlexFräse & elastic yellow Finisher conform cleanly to snow & fold 6.3m -> 4.3m', () => {
  const activeWide = solveTillerKinematics({ active: true, downpressure: 0.75, wingsFolded: false });
  const activeFolded = solveTillerKinematics({ active: true, downpressure: 0.75, wingsFolded: true });
  const lifted = solveTillerKinematics({ active: false, downpressure: 0.5, wingsFolded: false });

  assert.equal(activeWide.workingWidthM, 6.30);
  assert.equal(activeFolded.workingWidthM, 4.30);
  const tailY = activeWide.finisherCurve[activeWide.finisherCurve.length - 1].y;
  assert.ok(tailY > 0.01 && tailY < 0.06, `Working yellow finisher trailing edge (${tailY}m) must hug snow surface`);
  assert.ok(lifted.shaftCenter.y > activeWide.shaftCenter.y + 0.45, 'Lifted tiller must clear snow cleanly');
  assert.ok(activeWide.cylinders.liftLeft.length > 0.3 && activeWide.cylinders.liftLeft.length < 1.3);
});

test('360° 4.7-t Winch catenary tautness increases with cable tension', () => {
  const lowTension = solveWinchKinematics({ mode: 'manual', turretYawDeg: 0 }, 4.0);
  const fullTension = solveWinchKinematics({ mode: 'manual', turretYawDeg: 0 }, 47.0);
  const offWinch = solveWinchKinematics({ mode: 'off', turretYawDeg: 0 }, 0);

  assert.equal(offWinch.engaged, false);
  assert.equal(fullTension.engaged, true);
  assert.ok(fullTension.maxSagM < lowTension.maxSagM * 0.2, '47 kN full tension cable must be much tauter than 4 kN');
  assert.ok(fullTension.boomCylinder.length > 0.4 && fullTension.boomCylinder.length < 1.8);
});

test('Steep-slope physics: turning 4.7-t winch OFF at 38° spikes track slip; ON restores traction', () => {
  const phys = new PistenBullyPhysics();
  phys.setSlopeDeg(38);
  phys.setTargetSpeedKmh(10);

  phys.setWinch('off');
  const telOff = phys.step(0.5);

  phys.setWinch('auto');
  const telOn = phys.step(0.5);

  assert.ok(telOff.winchForceKN === 0);
  assert.ok(telOn.winchForceKN >= 45.0 && telOn.winchForceKN <= 47.01, `Auto winch at 38° should pull near 47 kN, got ${telOn.winchForceKN}`);
  assert.ok(telOff.tractionExceeded === true, 'Without winch at 38°, required thrust must exceed snow shear limit');
  assert.ok(telOff.slipPct > telOn.slipPct + 20, `Slip without winch (${telOff.slipPct}%) must far exceed slip with winch (${telOn.slipPct}%)`);
});

test('Hydrostatic 400 kW / 450 bar limits, ~60-70 g/cm² ground pressure & ha/h area output', () => {
  const phys = new PistenBullyPhysics();
  phys.setSlopeDeg(15);
  phys.setTargetSpeedKmh(12);
  phys.setWinch('auto');
  const tel = phys.step(1.0);

  assert.ok(tel.totalPowerKW <= 400.01, `Total power (${tel.totalPowerKW} kW) must respect 400 kW MAN D3876 ceiling`);
  assert.ok(tel.pressuresBar.drive <= 450.01 && tel.pressuresBar.drive >= 40);
  assert.ok(tel.groundPressureGCm2 >= 55 && tel.groundPressureGCm2 <= 74, `Expected ~60-70 g/cm², got ${tel.groundPressureGCm2}`);
  assert.ok(tel.areaCoverageHaH > 6.0 && tel.areaCoverageHaH < 8.5, `Expected ~7 ha/h at 12 km/h & 6.3m, got ${tel.areaCoverageHaH}`);
});

test('8-Station Tour & 3D Hotspots referential integrity', () => {
  assert.equal(PISTENBULLY_TOUR_STEPS.length, 8);
  for (const step of PISTENBULLY_TOUR_STEPS) {
    assert.ok(PISTENBULLY_PARTS[step.partId], `Tour step ${step.id} references unknown partId ${step.partId}`);
    assert.equal(step.cameraPos.length, 3);
    assert.equal(step.cameraTarget.length, 3);
  }
});
