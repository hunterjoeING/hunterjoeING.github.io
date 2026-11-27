// Real-Time Steep-Slope Physics, Hydrostatic Power Split & Snow-Sintering Model
// Pure ES module (no Three.js dependency) -> directly unit-testable via Node!

import { PB_SPECS } from './specs.js';
import { clamp, degToRad } from './pb-kinematics.js';

export class PistenBullyPhysics {
  constructor() {
    this.slopeDeg = PB_SPECS.slope.defaultSlopeDeg; // 0..45° (0..100 % gradient)
    this.targetSpeedKmh = 10.5;                     // -10..+20 km/h
    this.winchMode = 'auto';                        // 'auto' | 'manual' | 'off'
    this.manualWinchTonnes = 3.2;                   // 0..4.7 t
    this.bladeSnowLoad = 0.55;                      // 0..1 (set from blade preset/height)
    this.tillerActive = true;
    this.tillerDownpressure = 0.68;                 // 0..1
    this.tillerWorkingWidthM = PB_SPECS.identity.finisherTotalWidthM;

    // Dynamic simulation state
    this.groundSpeedMs = this.targetSpeedKmh / 3.6;
    this.trackSpeedLeftMs = this.groundSpeedMs;
    this.trackSpeedRightMs = this.groundSpeedMs;
    this.trackOffsetLeftM = 0;
    this.trackOffsetRightM = 0;
    this.snowScrollM = 0;
    this.tillerShaftAngleRad = 0;
    this.engineFanAngleRad = 0;
    this.beaconAngleRad = 0;
    this.steeringBias = 0; // Optional differential counter-rotation visual bias
    this.telemetry = this.computeInstantaneous(0);
  }

  setSlopeDeg(deg) {
    this.slopeDeg = clamp(Number(deg) || 0, PB_SPECS.slope.minSlopeDeg, PB_SPECS.slope.maxSlopeDeg);
  }

  setTargetSpeedKmh(kmh) {
    this.targetSpeedKmh = clamp(
      Number(kmh) || 0,
      PB_SPECS.identity.maxSpeedReverseKmh,
      PB_SPECS.identity.maxSpeedForwardKmh
    );
  }

  setWinch(mode, manualTonnes) {
    if (mode === 'auto' || mode === 'manual' || mode === 'off') {
      this.winchMode = mode;
    }
    if (typeof manualTonnes === 'number' && !Number.isNaN(manualTonnes)) {
      this.manualWinchTonnes = clamp(manualTonnes, 0, PB_SPECS.identity.maxWinchForceKN / 10);
    }
  }

  computeInstantaneous(dt = 0) {
    const id = PB_SPECS.identity;
    const slopeRad = degToRad(this.slopeDeg);
    const slopePercent = Math.tan(slopeRad) * 100;

    // 1. Gravity & Slope Force Decomposition (kN)
    const weightKN = (id.operatingMassKg * id.gravity) / 1000; // 137.34 kN
    const downhillKN = weightKN * Math.sin(slopeRad);          // F_H
    const normalKN = weightKN * Math.cos(slopeRad);            // F_N

    // 2. Work Resistances (Blade pushing snow, Tiller milling, Track rolling resistance)
    const speedDir = this.targetSpeedKmh >= 0 ? 1 : -1;
    const absTargetMs = Math.abs(this.targetSpeedKmh) / 3.6;
    const speedFactor = clamp(absTargetMs / 3.5, 0.15, 1.35);

    const bladeResistanceKN = this.bladeSnowLoad * (6.0 + 13.5 * speedFactor) * (speedDir > 0 ? 1 : 0.15);
    const tillerDragKN = this.tillerActive ? (3.2 + this.tillerDownpressure * 6.8) : 0;
    const rollingResistanceKN = 0.045 * normalKN;

    // 3. 4.7-t Active Steep-Slope Winch Tension (F_W, always pulls uphill along +X)
    let winchForceKN = 0;
    if (this.winchMode === 'auto') {
      // Automatic inclination-dependent winch tension control:
      // Smoothly engages above ~6° and compensates ~78% of F_H + slight blade assist, capped at 47 kN
      if (this.slopeDeg > 5) {
        const ramp = clamp((this.slopeDeg - 5) / 8, 0, 1);
        winchForceKN = clamp(ramp * (0.76 * downhillKN + 0.35 * bladeResistanceKN), 0, id.maxWinchForceKN);
      }
    } else if (this.winchMode === 'manual') {
      winchForceKN = clamp(this.manualWinchTonnes * 10.0, 0, id.maxWinchForceKN);
    }

    // 4. Required Track Thrust & Mohr-Coulomb Snow Shear Traction Limit
    const totalResistanceUphillKN = downhillKN + (speedDir >= 0
      ? (bladeResistanceKN + tillerDragKN + rollingResistanceKN)
      : -(rollingResistanceKN + tillerDragKN * 0.4));

    const requiredTrackThrustKN = totalResistanceUphillKN - winchForceKN;

    // Snow-track traction limit (aluminum grousers + hardened steel spikes on packed alpine snow)
    const muSnow = 0.44;
    const grouserCohesionKN = 11.5;
    const maxTrackTractionKN = muSnow * normalKN + grouserCohesionKN;

    // Compute realistic track slip ratio (0..0.85)
    // Below 65% of traction limit -> low elastic snow shear slip (2..6%)
    // Above traction limit -> steep nonlinear slip surge as grousers shear snow surface!
    const tractionDemandRatio = Math.abs(requiredTrackThrustKN) / Math.max(10, maxTrackTractionKN);
    let slipRatio;
    if (absTargetMs < 0.05) {
      // Stationary holding on steep slope without winch can still show micro-creep warning
      slipRatio = tractionDemandRatio > 1.0 ? clamp((tractionDemandRatio - 1.0) * 0.65, 0, 0.72) : 0;
    } else if (tractionDemandRatio <= 0.72) {
      slipRatio = 0.015 + tractionDemandRatio * 0.055;
    } else if (tractionDemandRatio <= 1.0) {
      const u = (tractionDemandRatio - 0.72) / 0.28;
      slipRatio = 0.055 + u * u * 0.18;
    } else {
      const excess = tractionDemandRatio - 1.0;
      slipRatio = clamp(0.235 + 0.58 * (1 - Math.exp(-excess * 2.4)), 0.235, 0.84);
    }

    // Actual delivered track thrust (capped near traction peak, slight drop during severe shear)
    const shearLossFactor = slipRatio > 0.28 ? (1 - (slipRatio - 0.28) * 0.18) : 1.0;
    const trackThrustKN = clamp(
      requiredTrackThrustKN,
      -maxTrackTractionKN * shearLossFactor,
      maxTrackTractionKN * shearLossFactor
    );

    // Effective ground speed drops under severe slip while track belt spins faster!
    const targetGroundMs = (this.targetSpeedKmh / 3.6) * (1 - slipRatio * 0.52);
    const targetTrackBeltMs = absTargetMs > 0.05
      ? (this.targetSpeedKmh / 3.6) * (1 + slipRatio * 0.65)
      : (slipRatio > 0.05 ? slipRatio * 1.4 : 0);

    // Smooth velocity dynamics
    const alpha = dt > 0 ? Math.min(1, dt * 4.5) : 1;
    this.groundSpeedMs += (targetGroundMs - this.groundSpeedMs) * alpha;
    const leftBias = 1 + this.steeringBias * 0.25;
    const rightBias = 1 - this.steeringBias * 0.25;
    this.trackSpeedLeftMs += (targetTrackBeltMs * leftBias - this.trackSpeedLeftMs) * alpha;
    this.trackSpeedRightMs += (targetTrackBeltMs * rightBias - this.trackSpeedRightMs) * alpha;

    // 5. Hydrostatic Power Distribution (400 kW / 540 PS MAN D3876) & Circuit Pressures (bar)
    const effHydro = 0.84;
    const absTrackMs = (Math.abs(this.trackSpeedLeftMs) + Math.abs(this.trackSpeedRightMs)) * 0.5;

    // Track hydrostatic drive power (kW)
    const drivePowerRawKW = (Math.abs(trackThrustKN) * Math.max(0.4, absTrackMs)) / effHydro;
    const drivePowerKW = clamp(drivePowerRawKW + (absTrackMs > 0.05 ? 14 : 4), 4, 295);

    // AlpinFlexFräse cutter shaft power (kW) & RPM
    const tillerRpm = this.tillerActive
      ? Math.round(920 + this.tillerDownpressure * 260 + clamp(absTrackMs * 24, 0, 100))
      : 0;
    const tillerPowerKW = this.tillerActive
      ? clamp(28 + this.tillerDownpressure * 64 + absTrackMs * 5.2, 22, 122)
      : 2;

    // 4.7-t Active Winch hydraulic power (kW)
    const winchPowerKW = winchForceKN > 0.2
      ? clamp((winchForceKN * Math.max(0.35, Math.abs(this.groundSpeedMs))) / 0.86 + 4.5, 4, 96)
      : 1.5;

    // 12-Way Blade + Cooling Fan + Auxiliaries power (kW)
    const bladeAuxPowerKW = clamp(12 + this.bladeSnowLoad * 24 + (this.tillerActive ? 6 : 0), 10, 48);

    // Total power demand vs 400 kW rated ceiling (governor smoothly balances)
    const rawTotalKW = drivePowerKW + tillerPowerKW + winchPowerKW + bladeAuxPowerKW;
    const powerScale = rawTotalKW > id.ratedPowerKW ? (id.ratedPowerKW / rawTotalKW) : 1.0;

    const pDriveKW = drivePowerKW * powerScale;
    const pTillerKW = tillerPowerKW * powerScale;
    const pWinchKW = winchPowerKW * powerScale;
    const pBladeKW = bladeAuxPowerKW * powerScale;
    const totalPowerKW = pDriveKW + pTillerKW + pWinchKW + pBladeKW;
    const totalPowerPS = totalPowerKW * 1.35962;
    const engineLoadPct = clamp((totalPowerKW / id.ratedPowerKW) * 100, 5, 100);

    // MAN D3876 low-RPM high-torque curve: 800 rpm idle -> ~1,650 rpm rated, up to 2,500 Nm!
    const engineRpm = Math.round(id.idleRpm + (engineLoadPct / 100) * (id.ratedRpm - id.idleRpm) + clamp(absTrackMs * 18, 0, 95));
    const omegaEng = (engineRpm * Math.PI * 2) / 60;
    const engineTorqueNm = clamp((totalPowerKW * 1000) / Math.max(60, omegaEng), 180, id.peakTorqueNm);

    // Hydrostatic working pressures in closed circuits (bar, up to 450 bar!)
    const drivePressureBar = clamp(
      42 + (Math.abs(trackThrustKN) / 76) * 355 + slipRatio * 55 + absTrackMs * 5.2,
      40,
      id.maxHydraulicPressureBar
    );
    const drivePressureLeftBar = clamp(drivePressureBar * (1 + this.steeringBias * 0.14), 35, id.maxHydraulicPressureBar);
    const drivePressureRightBar = clamp(drivePressureBar * (1 - this.steeringBias * 0.14), 35, id.maxHydraulicPressureBar);
    const tillerPressureBar = this.tillerActive
      ? clamp(125 + this.tillerDownpressure * 215 + absTrackMs * 8.5, 95, 395)
      : id.returnPressureBar;
    const winchPressureBar = winchForceKN > 0.2
      ? clamp(35 + (winchForceKN / id.maxWinchForceKN) * 335, 30, 385)
      : id.returnPressureBar;
    const bladePressureBar = clamp(45 + this.bladeSnowLoad * 185, 35, 255);

    // 6. Ground Pressure (g/cm²) & Theoretical Area Coverage (ha/h)
    // Implements in snow contact share ~14% of vehicle weight; steep slopes reduce normal load by cos(α)
    const implementLoadShare = (this.tillerActive ? 0.085 : 0) + (this.bladeSnowLoad > 0.1 ? 0.055 : 0);
    const trackNormalMassG = id.operatingMassKg * 1000 * Math.cos(slopeRad) * (1 - implementLoadShare);
    const groundPressureGCm2 = trackNormalMassG / id.effectiveTrackAreaCm2;

    // Area coverage: working width (m) * ground speed (km/h) / 10 = ha/h
    const groundSpeedKmh = this.groundSpeedMs * 3.6;
    const areaCoverageHaH = this.tillerActive
      ? (this.tillerWorkingWidthM * Math.max(0, groundSpeedKmh)) / 10
      : 0;

    // Snow sintering quality index (0..100 %): high when tiller active, low slip, optimal downpressure
    const sinterQualityPct = this.tillerActive
      ? clamp(96 - slipRatio * 75 - Math.abs(this.tillerDownpressure - 0.72) * 28, 25, 99)
      : 0;

    // 7. Integrate Kinematics Offsets
    if (dt > 0) {
      this.trackOffsetLeftM += this.trackSpeedLeftMs * dt;
      this.trackOffsetRightM += this.trackSpeedRightMs * dt;
      this.snowScrollM += this.groundSpeedMs * dt;
      this.tillerShaftAngleRad += ((tillerRpm * Math.PI * 2) / 60) * dt;
      this.engineFanAngleRad += ((engineRpm * Math.PI * 2) / 60) * dt * 0.45;
      this.beaconAngleRad += dt * Math.PI * 4.2; // 2.1 rev/s orange LED beacon strobe
    }

    this.telemetry = {
      slopeDeg: this.slopeDeg,
      slopeRad,
      slopePercent,
      targetSpeedKmh: this.targetSpeedKmh,
      groundSpeedMs: this.groundSpeedMs,
      groundSpeedKmh,
      trackSpeedLeftMs: this.trackSpeedLeftMs,
      trackSpeedRightMs: this.trackSpeedRightMs,
      trackOffsetLeftM: this.trackOffsetLeftM,
      trackOffsetRightM: this.trackOffsetRightM,
      snowScrollM: this.snowScrollM,
      tillerShaftAngleRad: this.tillerShaftAngleRad,
      engineFanAngleRad: this.engineFanAngleRad,
      beaconAngleRad: this.beaconAngleRad,
      // Forces (kN)
      weightKN,
      downhillKN,
      normalKN,
      winchForceKN,
      winchForceTonnes: winchForceKN / 10,
      bladeResistanceKN,
      tillerDragKN,
      rollingResistanceKN,
      requiredTrackThrustKN,
      maxTrackTractionKN,
      trackThrustKN,
      slipRatio,
      slipPct: slipRatio * 100,
      tractionExceeded: tractionDemandRatio > 1.0,
      // Power & Hydraulics
      engineRpm,
      engineTorqueNm,
      engineLoadPct,
      totalPowerKW,
      totalPowerPS,
      powerSplit: {
        driveKW: pDriveKW,
        tillerKW: pTillerKW,
        winchKW: pWinchKW,
        bladeKW: pBladeKW
      },
      pressuresBar: {
        drive: drivePressureBar,
        driveLeft: drivePressureLeftBar,
        driveRight: drivePressureRightBar,
        tiller: tillerPressureBar,
        winch: winchPressureBar,
        blade: bladePressureBar,
        returnLine: id.returnPressureBar
      },
      tillerRpm,
      groundPressureGCm2,
      areaCoverageHaH,
      sinterQualityPct
    };

    return this.telemetry;
  }

  step(dt) {
    return this.computeInstantaneous(Math.max(0, dt));
  }
}
