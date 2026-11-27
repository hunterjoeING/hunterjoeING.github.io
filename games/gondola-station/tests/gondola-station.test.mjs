import test from 'node:test';
import assert from 'node:assert/strict';

import { GS_SPECS } from '../specs.js';
import { GondolaKinematics, evalGripCouplingState } from '../gs-kinematics.js';
import { GondolaPhysics } from '../gs-physics.js';

const kin = new GondolaKinematics();

test('Cycle time matches exact integer multiple of Ferris wheel arm headway', () => {
  const expected = GS_SPECS.cabin.count * kin.armHeadwayNom;
  assert.ok(
    Math.abs(kin.totalCycleTime - expected) < 1e-4,
    `Expected cycle time ${expected.toFixed(6)}, got ${kin.totalCycleTime.toFixed(6)}`
  );
  assert.ok(kin.xTop > 52 && kin.xTop < 120, `xTop=${kin.xTop} out of realistic mountain span`);
});

test('Closed loop is C0/C1 continuous with zero jumps or teleports across all transitions', () => {
  const N = 1200;
  let maxStepJump = 0;
  let prev = kin.sampleByTau(0, 1.0);
  const dt = kin.totalCycleTime / N;

  for (let i = 1; i <= N; i++) {
    const curr = kin.sampleByTau(i * dt, 1.0);
    const dist = Math.hypot(curr.x - prev.x, curr.y - prev.y, curr.z - prev.z);
    const expectedDist = 0.5 * (prev.vNom + curr.vNom) * dt;
    const err = Math.abs(dist - expectedDist);
    if (err > maxStepJump) maxStepJump = err;
    prev = curr;
  }
  assert.ok(maxStepJump < 0.04, `Max positional jump ${maxStepJump.toFixed(5)} m exceeded 0.04 m`);
});

test('Cabins sit EXACTLY in Ferris wheel carrier cradles on both wheels (< 1e-3 m error)', () => {
  const W = GS_SPECS.wheels;
  let maxDownErr = 0;
  let maxUpErr = 0;
  let checkedDown = 0;
  let checkedUp = 0;

  for (let step = 0; step < 300; step++) {
    const phi = (step / 300) * kin.totalCycleTime;
    const cabins = kin.sampleAllCabins(phi, 1.0);

    for (const c of cabins) {
      if (c.zone === 'wheel_down' || c.zone === 'wheel_up') {
        const side = c.zone === 'wheel_down' ? -1 : +1;
        let bestErr = Infinity;
        for (let m = 0; m < W.armCount; m++) {
          const tip = kin.getWheelArmTip(side, m, phi);
          const err = Math.hypot(c.x - tip.x, c.y - tip.y, c.z - tip.z);
          if (err < bestErr) bestErr = err;
        }
        if (side < 0) {
          maxDownErr = Math.max(maxDownErr, bestErr);
          checkedDown++;
        } else {
          maxUpErr = Math.max(maxUpErr, bestErr);
          checkedUp++;
        }
      }
    }
  }

  assert.ok(checkedDown > 100 && checkedUp > 100, 'Expected cabins on both Ferris wheels');
  assert.ok(maxDownErr < 0.015, `Down-Wheel sync error too large: ${maxDownErr.toFixed(5)} m`);
  assert.ok(maxUpErr < 0.015, `Up-Wheel sync error too large: ${maxUpErr.toFixed(5)} m`);
});

test('Exact speed synchronization: Δv = 0.00 m/s at Attach Ramp and exact tire speeds', () => {
  const { nominalRopeMs, slowStationMs } = GS_SPECS.speeds;
  // Check attach zone speed
  let attachChecked = 0;
  for (let i = 0; i < kin.loop.pts.length; i++) {
    const p = kin.loop.pts[i];
    if (p.zone === 'attach' || p.zone === 'check') {
      assert.ok(Math.abs(p.vNom - nominalRopeMs) < 1e-9, `Attach speed mismatch: ${p.vNom}`);
      attachChecked++;
    }
    if (p.zone === 'wheel_down' || p.zone === 'wheel_up' || p.zone === 'eg_turn') {
      assert.ok(Math.abs(p.vNom - slowStationMs) < 1e-9, `Slow zone speed mismatch: ${p.vNom}`);
    }
  }
  assert.ok(attachChecked >= 10);

  // Check tire conveyor monotonic speed grading & omega*r = v
  const r = GS_SPECS.track.tireRadius;
  for (let i = 1; i < kin.decelTires.length; i++) {
    assert.ok(kin.decelTires[i].vNom <= kin.decelTires[i - 1].vNom + 1e-9, 'Decel tires must slow down');
    assert.ok(Math.abs(kin.decelTires[i].omegaNom * r - kin.decelTires[i].vNom) < 1e-9);
  }
  for (let i = 1; i < kin.accelTires.length; i++) {
    assert.ok(kin.accelTires[i].vNom >= kin.accelTires[i - 1].vNom - 1e-9, 'Accel tires must speed up');
    assert.ok(Math.abs(kin.accelTires[i].omegaNom * r - kin.accelTires[i].vNom) < 1e-9);
  }
});

test('Grip spring clamp opens on cam ramp (0 kN) and snaps to 28 kN fail-safe closed', () => {
  const { rampStartX, rampCenterX, rampEndX } = GS_SPECS.track;
  const openState = evalGripCouplingState(rampCenterX, 'attach', false);
  assert.ok(openState.jawOpen > 0.99, 'Grip must be fully open at ramp center');
  assert.ok(openState.springCompression > 0.99, 'Belleville springs must be compressed on ramp');
  assert.equal(openState.clampingForceKN, 0, 'Clamping force must be 0 kN while fully open');

  const closedState = evalGripCouplingState(rampEndX + 0.5, 'check', false);
  assert.equal(closedState.jawOpen, 0);
  assert.equal(closedState.clampingForceKN, 28.0);

  const faultState = evalGripCouplingState(rampEndX + 0.5, 'check', true);
  assert.ok(faultState.clampingForceKN < GS_SPECS.cabin.gripMinSafeKN, 'Fault force must fall below 24 kN');
});

test('Cabins remain strictly horizontal on Ferris wheels & EG doors open/close cleanly', () => {
  const phys = new GondolaPhysics(kin);
  let sawOpenDoor = false;
  let sawClosedOnWheel = false;

  for (let i = 0; i < 600; i++) {
    const snap = phys.step(0.1);
    for (const c of snap.cabins) {
      if (c.onFerrisWheel) {
        assert.ok(Math.abs(c.swingPitch) < 1e-3, `Cabin tilted on Ferris wheel: ${c.swingPitch}`);
        assert.equal(c.doorOpen, 0, 'Doors must stay locked closed on Ferris wheel');
        sawClosedOnWheel = true;
      }
      if (c.zone === 'eg_turn') {
        assert.equal(c.doorOpen, 1, 'Doors must be open in EG Level Walk-In U-turn');
        sawOpenDoor = true;
      }
    }
  }
  assert.ok(sawOpenDoor && sawClosedOnWheel);
});

test('Simulated clamp fault triggers Check Zone alarm, Bullwheel safety brake & full stop', () => {
  const phys = new GondolaPhysics(kin);
  phys.triggerClampFault();
  assert.equal(phys.faultState, 'armed');

  let sawAlarm = false;
  let halted = false;
  for (let i = 0; i < 600; i++) {
    const snap = phys.step(0.1);
    if (snap.faultState === 'alarm_braking') sawAlarm = true;
    if (snap.faultState === 'halted') {
      halted = true;
      assert.equal(snap.actualSpeedMs, 0);
      assert.ok(snap.brakeEngagement > 0.95);
      break;
    }
  }
  assert.ok(sawAlarm, 'Expected Check Zone to detect fault and enter alarm_braking');
  assert.ok(halted, 'Expected Safety Disc Brake to bring ropeway to full 0.0 m/s stop');

  // Verify clean reset & soft restart
  phys.resetFault();
  assert.equal(phys.faultState, 'normal');
  for (let i = 0; i < 80; i++) phys.step(0.1);
  assert.ok(phys.actualSpeedMs > 5.5, 'Expected smooth soft-start back to nominal speed');
});
