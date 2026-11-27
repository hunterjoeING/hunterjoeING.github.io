// Real-Time Physics, DirectDrive Power, Hydraulic Rope Tension & Safety Fault Engine
// 2-Etagen-Gondelstation (D-Line / DirectDrive / AURO)

import { GS_SPECS } from './specs.js';

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

export class GondolaPhysics {
  constructor(kinematics) {
    this.kin = kinematics;

    // Master simulation state
    this.targetSpeedMs = GS_SPECS.speeds.nominalRopeMs; // 6.0 m/s
    this.actualSpeedMs = GS_SPECS.speeds.nominalRopeMs;
    this.phi = 24.0; // Start with cabins beautifully distributed across EG, Ferris wheels & coupling!
    this.simTime = 0;

    // Fault & Safety Brake simulation state
    // 'normal' | 'armed' | 'alarm_braking' | 'halted'
    this.faultState = 'normal';
    this.faultCabinIndex = -1;
    this.faultReason = '';
    this.brakeEngagement = 0; // 0..1 (safety disc brake calipers clamping Bullwheel)
    this.sensorFlashState = 'idle'; // 'idle' | 'ok' | 'fault'
    this.sensorFlashTimer = 0;

    // Hydraulic rope tensioning carriage dynamics (2nd-order damped spring-mass)
    this.tensionForceKN = GS_SPECS.bullwheel.tensionNominalKN;
    this.hydraulicBar = GS_SPECS.bullwheel.tensionPressureNominalBar;
    this.tensionCarriageOffsetM = 0.0;
    this.tensionCarriageVel = 0.0;
    this.dynamicSagOffsetM = 0.0;

    // Per-cabin damped pendulum swing angles (longitudinal pitch in radians)
    const N = GS_SPECS.cabin.count;
    this.cabinSwing = new Float64Array(N);
    this.cabinSwingVel = new Float64Array(N);
    this.prevCabinZone = new Array(N).fill('');

    // Events emitted each frame (for audio clacks & UI pulses)
    this.frameEvents = [];

    // Live diagnostics history buffer for clamping force monitor
    this.activeClampReadout = {
      cabinNumber: 1,
      forceKN: GS_SPECS.cabin.gripNominalForceKN,
      deltaV: 0.0,
      onRamp: false,
      inCheck: false,
      faulted: false,
      rampProgress: 0
    };
  }

  setTargetSpeed(speedMs) {
    this.targetSpeedMs = clamp(speedMs, 0, GS_SPECS.speeds.maxRopeMs);
  }

  // Trigger the "Klemmfehler simulieren" safety demo!
  // Picks the next cabin approaching the acceleration/attach zone so the user sees it fast.
  triggerClampFault() {
    if (this.faultState === 'alarm_braking' || this.faultState === 'halted') return;

    const cabins = this.kin.sampleAllCabins(this.phi, this.speedFactor, this.dynamicSagOffsetM, -1);
    const sAttach = this.kin.loop.sAttachStart;
    const L = this.kin.totalLength;

    let bestIdx = 0;
    let bestDist = Infinity;
    for (const c of cabins) {
      // Distance ahead to attach ramp start (must be at least 3.5 m before ramp so user sees approach!)
      let dist = (sAttach - c.s + L) % L;
      if (dist < 3.5) dist += L;
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = c.index;
      }
    }

    this.faultState = 'armed';
    this.faultCabinIndex = bestIdx;
    this.faultReason = `Kabine #${String(bestIdx + 1).padStart(2, '0')} – Seillage & Klemmkraftfehler (11,4 kN < 24 kN) im Zulauf`;
    if (this.targetSpeedMs < 1.5) this.targetSpeedMs = GS_SPECS.speeds.nominalRopeMs;
  }

  resetFault() {
    this.faultState = 'normal';
    this.faultCabinIndex = -1;
    this.faultReason = '';
    this.brakeEngagement = 0;
    this.sensorFlashState = 'idle';
    this.sensorFlashTimer = 0;
    if (this.targetSpeedMs < 0.5) this.targetSpeedMs = GS_SPECS.speeds.nominalRopeMs;
  }

  get speedFactor() {
    return this.actualSpeedMs / GS_SPECS.speeds.nominalRopeMs;
  }

  step(dt) {
    this.frameEvents.length = 0;
    if (dt <= 0) return this.getSnapshot();

    const prevSpeed = this.actualSpeedMs;

    // 1. Speed ramp / Emergency Safety Brake dynamics
    if (this.faultState === 'alarm_braking' || this.faultState === 'halted') {
      // Safety disc brake acts directly on Bullwheel (~2.4 m/s² emergency deceleration)
      this.brakeEngagement = Math.min(1, this.brakeEngagement + dt * 6.5);
      const decel = 2.45;
      this.actualSpeedMs = Math.max(0, this.actualSpeedMs - decel * dt);
      if (this.actualSpeedMs <= 0.001) {
        this.actualSpeedMs = 0;
        this.faultState = 'halted';
      }
    } else {
      this.brakeEngagement = Math.max(0, this.brakeEngagement - dt * 3.5);
      const maxAccel = this.targetSpeedMs > this.actualSpeedMs ? 1.15 : 1.55;
      const diff = this.targetSpeedMs - this.actualSpeedMs;
      const maxDelta = maxAccel * dt;
      if (Math.abs(diff) <= maxDelta) this.actualSpeedMs = this.targetSpeedMs;
      else this.actualSpeedMs += Math.sign(diff) * maxDelta;
    }

    const lineAccel = (this.actualSpeedMs - prevSpeed) / Math.max(1e-4, dt);
    const speedFactor = this.actualSpeedMs / GS_SPECS.speeds.nominalRopeMs;

    // 2. Advance master kinematic clock (nominal seconds)
    this.phi = (this.phi + speedFactor * dt) % this.kin.totalCycleTime;
    this.simTime += dt;

    // 3. Hydraulic rope tensioning carriage dynamics
    // Reacts smoothly to line acceleration/emergency stop + subtle passenger loading wave
    const loadWave = Math.sin(this.simTime * 0.45) * 6.5 + Math.cos(this.simTime * 0.19) * 4.2;
    const brakeKickKN = this.brakeEngagement * 58.0 - lineAccel * 18.0;
    const targetTensionKN = GS_SPECS.bullwheel.tensionNominalKN + loadWave + brakeKickKN;
    this.tensionForceKN += (targetTensionKN - this.tensionForceKN) * Math.min(1, dt * 4.5);
    this.hydraulicBar = GS_SPECS.bullwheel.tensionPressureNominalBar *
      (this.tensionForceKN / GS_SPECS.bullwheel.tensionNominalKN);

    // Carriage stroke shifts slightly when tension surges
    const targetOffset = clamp(
      (this.tensionForceKN - GS_SPECS.bullwheel.tensionNominalKN) * 0.0042,
      -0.28,
      0.32
    );
    const kSpring = 28.0;
    const cDamp = 7.2;
    const accCarriage = kSpring * (targetOffset - this.tensionCarriageOffsetM) - cDamp * this.tensionCarriageVel;
    this.tensionCarriageVel += accCarriage * dt;
    this.tensionCarriageOffsetM += this.tensionCarriageVel * dt;
    this.dynamicSagOffsetM = -this.tensionCarriageOffsetM * 0.42;

    // 4. Sample all cabins & detect coupling/check events + pendulum physics
    const cabins = this.kin.sampleAllCabins(
      this.phi,
      speedFactor,
      this.dynamicSagOffsetM,
      this.faultCabinIndex
    );

    if (this.sensorFlashTimer > 0) {
      this.sensorFlashTimer = Math.max(0, this.sensorFlashTimer - dt);
      if (this.sensorFlashTimer === 0 && this.faultState !== 'alarm_braking' && this.faultState !== 'halted') {
        this.sensorFlashState = 'idle';
      }
    }

    // Track cabin closest to Attach/Check zone for live Clamp Monitor
    let focusCabin = cabins[0];
    let bestFocusDist = Infinity;
    const sRampMid = 0.5 * (this.kin.loop.sAttachStart + this.kin.loop.sAttachEnd);
    const L = this.kin.totalLength;

    for (let i = 0; i < cabins.length; i++) {
      const c = cabins[i];
      const prevZ = this.prevCabinZone[i];

      // Event detection for audio & safety sensor
      if (prevZ && prevZ !== c.zone) {
        if (c.zone === 'attach' || c.zone === 'detach') {
          this.frameEvents.push({ type: 'clamp_clack', zone: c.zone, cabin: c.number });
        }
        if (c.zone === 'check') {
          if (i === this.faultCabinIndex && this.faultState === 'armed') {
            this.faultState = 'alarm_braking';
            this.sensorFlashState = 'fault';
            this.sensorFlashTimer = 999;
            this.faultReason = `NOTHALT! Kabine #${String(c.number).padStart(2, '0')} · Klemmkraft 11,4 kN (Soll: 24–32 kN) · Sicherheitsbremse aktiv`;
            this.frameEvents.push({ type: 'emergency_stop', cabin: c.number });
          } else {
            this.sensorFlashState = 'ok';
            this.sensorFlashTimer = 1.65;
            this.frameEvents.push({ type: 'check_ok', cabin: c.number });
          }
        }
        // Small impulse when leaving station onto catenary rope
        if (prevZ === 'check' && c.zone === 'rope_out') {
          this.cabinSwingVel[i] += 0.34 * speedFactor;
        }
      }
      this.prevCabinZone[i] = c.zone;

      // Damped pendulum swing: STRICTLY ZERO on Ferris wheels & slow EG boarding,
      // realistic longitudinal swing on rope departure, Tower 1 sheave passage & emergency braking!
      if (c.onFerrisWheel || c.zone === 'eg_disembark' || c.zone === 'eg_turn' || c.zone === 'eg_board') {
        this.cabinSwing[i] *= Math.max(0, 1 - dt * 10);
        this.cabinSwingVel[i] *= Math.max(0, 1 - dt * 10);
      } else {
        const gOverL = 9.81 / 2.65;
        let extTorque = 0;
        // Emergency stop induces authentic forward pendulum swing!
        if (Math.abs(lineAccel) > 0.25 && (c.zone === 'rope_out' || c.zone === 'rope_in' || c.zone === 'check')) {
          extTorque += clamp(-lineAccel * 0.22, -0.65, 0.65);
        }
        // Slight sway passing over Tower 1 12-roller sheave battery (X ≈ 36 m)
        if ((c.zone === 'rope_out' || c.zone === 'rope_in') && Math.abs(c.x - GS_SPECS.track.tower1X) < 1.8) {
          extTorque += 0.28 * speedFactor * Math.sin((c.x - GS_SPECS.track.tower1X) * 1.7);
        }
        const alphaSwing = -gOverL * this.cabinSwing[i] - 1.15 * this.cabinSwingVel[i] + extTorque;
        this.cabinSwingVel[i] += alphaSwing * dt;
        this.cabinSwing[i] = clamp(this.cabinSwing[i] + this.cabinSwingVel[i] * dt, -0.22, 0.22);
      }
      c.swingPitch = this.cabinSwing[i];

      // Pick focus cabin near Attach Ramp / Check Zone
      const dRaw = Math.abs(((c.s - sRampMid + L * 1.5) % L) - L * 0.5);
      if (dRaw < bestFocusDist) {
        bestFocusDist = dRaw;
        focusCabin = c;
      }
    }

    // Update live Clamp Monitor readout
    const rampSpan = GS_SPECS.track.rampEndX - GS_SPECS.track.rampStartX;
    this.activeClampReadout = {
      cabinNumber: focusCabin.number,
      cabinIndex: focusCabin.index,
      zone: focusCabin.zone,
      forceKN: focusCabin.grip.clampingForceKN,
      deltaV: focusCabin.zone === 'attach' || focusCabin.zone === 'check' || focusCabin.zone === 'rope_out'
        ? 0.0
        : Math.abs(this.actualSpeedMs - focusCabin.vActual),
      onRamp: focusCabin.grip.onRamp,
      inCheck: focusCabin.zone === 'check',
      faulted: focusCabin.index === this.faultCabinIndex,
      rampProgress: clamp((focusCabin.x - GS_SPECS.track.rampStartX) / rampSpan, 0, 1)
    };

    return this.getSnapshot(cabins);
  }

  getSnapshot(cabinsOverride = null) {
    const speedFactor = this.speedFactor;
    const cabins = cabinsOverride || this.kin.sampleAllCabins(
      this.phi,
      speedFactor,
      this.dynamicSagOffsetM,
      this.faultCabinIndex
    );
    const wheels = this.kin.getWheelAngles(this.phi);

    // DirectDrive engineering telemetry
    const v = this.actualSpeedMs;
    const rBull = GS_SPECS.bullwheel.radius;
    const bullwheelOmega = v / rBull; // rad/s
    const directDriveRpm = (bullwheelOmega * 60) / (2 * Math.PI); // ~20.46 rpm at 6.0 m/s

    // Realistic Funitel twin-rope lifting power (~1,020 kW steady at 6 m/s, peaks ~1,350 kW on acceleration)
    const loadFactor = 0.76 + 0.04 * Math.sin(this.simTime * 0.35);
    const accelPower = Math.max(0, (this.targetSpeedMs - v) * 125);
    const powerKw = v > 0.05
      ? clamp(GS_SPECS.bullwheel.directDriveRatedPowerKw * (v / GS_SPECS.speeds.nominalRopeMs) * loadFactor + accelPower, 0, 1420)
      : 0;
    const torqueKNm = bullwheelOmega > 0.05
      ? clamp(powerKw / bullwheelOmega, 0, GS_SPECS.bullwheel.directDriveMaxTorqueKNm)
      : (this.brakeEngagement > 0.1 ? 520 * this.brakeEngagement : 0);

    // Throughput & headway
    const headwaySec = speedFactor > 0.04 ? this.kin.armHeadwayNom / speedFactor : 0;
    const capacityPph = headwaySec > 0
      ? Math.round((3600 / headwaySec) * GS_SPECS.cabin.capacityPersons)
      : 0;

    return {
      phi: this.phi,
      simTime: this.simTime,
      targetSpeedMs: this.targetSpeedMs,
      actualSpeedMs: this.actualSpeedMs,
      actualSpeedKmh: this.actualSpeedMs * 3.6,
      slowSpeedMs: GS_SPECS.speeds.slowStationMs * speedFactor,
      speedFactor,
      bullwheelOmega,
      directDriveRpm,
      powerKw,
      torqueKNm,
      tensionForceKN: this.tensionForceKN,
      hydraulicBar: this.hydraulicBar,
      tensionCarriageOffsetM: this.tensionCarriageOffsetM,
      dynamicSagOffsetM: this.dynamicSagOffsetM,
      headwaySec,
      capacityPph,
      faultState: this.faultState,
      faultCabinIndex: this.faultCabinIndex,
      faultReason: this.faultReason,
      brakeEngagement: this.brakeEngagement,
      sensorFlashState: this.sensorFlashState,
      clampReadout: this.activeClampReadout,
      wheels,
      cabins,
      events: this.frameEvents
    };
  }
}
