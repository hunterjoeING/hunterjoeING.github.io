// Verbrennungsmotor 3D – Physik, 4-Takt-Zyklus, Kennfelder (Otto-Sauger & Turbodiesel DI), Bauformen & Tour
import {
  ENGINE_LAYOUTS,
  ENGINE_CONCEPTS,
  DEFAULT_ENGINE_CONFIG,
  buildEngineProfile
} from './ce-variants.js?v=0.5.1';

import { MAX_LIFT, camLift } from './ce-mechanics.js?v=0.5.1';
import { flowParts, flowTour } from './ce-flow-guide.js?v=0.5.1';

export { ENGINE_LAYOUTS, ENGINE_CONCEPTS, DEFAULT_ENGINE_CONFIG, buildEngineProfile };

export const DEFAULT_PROFILE = buildEngineProfile(DEFAULT_ENGINE_CONFIG.layout, DEFAULT_ENGINE_CONFIG.concept);

export const ENGINE_SPECS = DEFAULT_PROFILE.specs;

// Beispielwerte einer 6-Gang-Wandlerautomatik und eines Kompaktwagens.
// Wandlerschlupf bleibt unberücksichtigt.
export const DRIVETRAIN_EXAMPLE = {
  gearRatios: [4.04, 2.37, 1.56, 1.16, 0.85, 0.69],
  finalDrive: 3.2,
  wheelRadiusM: 0.32, // Dynamischer Radius für 225/45 R17
  massKg: 1500,
  gravityMps2: 9.81,
  rollingResistance: 0.011,
  dragAreaM2: 0.65,
  airDensityKgM3: 1.2,
  drivetrainEfficiency: 0.92,
  fuelDensityGL: 745,
  maxSpeedKmh: 240,
  minCruiseKmh: 10,
  minAccelerationKmh: 20,
  minCruiseRatio: 0.77,
  maxCruiseRatio: 1.3,
  topGearCruiseRatio: 1.45
};

export const DRIVE_SEQUENCE_EXAMPLE = {
  rotatingMassFactor: 1.08,
  loadRampS: 0.5,
  partLoadLimit: 0.8,
  partLoadShiftRpm: 3000,
  fullLoadShiftRpm: 5500,
  minShiftRpm: 1300,
  cruiseAccelerationMps2: 0.05,
  cruisePowerTolerance: 0.03
};

export const DRIVE_TOUR_EXAMPLE = {
  cruiseRpm: 2400,
  cruiseLoad: 0.38,
  targetLoad: 0.75,
  durationS: 260,
  dtS: 0.05,
  pedalDriveS: 3.5,
  pedalLeadInS: 0.6,
  pedalHoldS: 3,
  drivePlaybackS: 9,
  drivePlaybackExponent: 1.55,
  comparisonSpeedKmh: 130,
  comparisonGears: [3, 4, 5, 6],
  lowSpeedKmh: 50,
  lowSpeedGear: 4,
  comparisonPointS: 2
};

// Kurbelwellen-Phasenversatz (in Grad von 0..720) für Zündfolge 1-3-4-2 (R4):
// Zyklus pro Zylinder: 0-180° Ansaugen, 180-360° Verdichten, 360-540° Arbeiten, 540-720° Ausstoßen.
// Zyl 1 & 4 laufen im Gleichtakt (0°/360°), Zyl 2 & 3 um 180° versetzt (180°/540°).
export const CYLINDER_PHASE_OFFSETS = [0, 180, 540, 360];

export const TORQUE_NM_PER_BAR = 15.915;

function clamp(value, max) {
  return Math.max(0, Math.min(max, Number(value) || 0));
}

export function clampOperatingRpm(value, profile = DEFAULT_PROFILE) {
  return Math.max(profile.specs.idleRpm, clamp(value, profile.specs.maxRpm));
}

export function fullTorqueNm(rpmInput, profile = DEFAULT_PROFILE) {
  return profile.fullTorqueNm(rpmInput);
}

// BSFC für Saugbenziner mit Saugrohreinspritzung oder Turbodiesel mit Direkteinspritzung:
// vereinfachtes Beispielkennfeld, keine Messdaten.
export function bsfcMap(rpmInput, loadInput, profile = DEFAULT_PROFILE) {
  const rpm = clamp(rpmInput, profile.specs.maxRpm);
  if (rpm < profile.specs.idleRpm) return null;
  const load = clamp(loadInput, 1);
  const bmep = load * profile.fullTorqueNm(rpm) / profile.torqueNmPerBar;
  if (bmep <= 0) return null;

  const { totalPressureBar, indicatedEfficiency } = profile.fuelModel(rpm, load, bmep);
  const eta = indicatedEfficiency * bmep / totalPressureBar;
  return 3600 / (eta * profile.fuelHeatingValueMJkg);
}

export function thermalEfficiencyFromBsfc(bsfc, profile = DEFAULT_PROFILE) {
  return bsfc > 0
    ? Math.min(profile.maxEfficiencyCap, 3600 / (bsfc * profile.fuelHeatingValueMJkg))
    : 0;
}

function operatingStatus(rpm, load, profile = DEFAULT_PROFILE) {
  const { redlineRpm } = profile.specs;
  const [peakLo, peakHi] = profile.peakTorqueBand;
  const redlineFmt = redlineRpm.toLocaleString('de-DE');
  if (rpm > redlineRpm) return ['redline', `Drehzahlbegrenzer (> ${redlineFmt})`];
  if (load < 0.03 && rpm < 1200) return ['idle', load === 0 ? 'Leerlauf · keine Nutzleistung' : 'Leerlauf'];
  if (load < 0.03) return ['coast', 'Schubbetrieb'];
  if (rpm < 1200) return ['lowRpm', 'Niedrige Drehzahl'];
  if (load < 0.9) return ['cruise', 'Teillast'];
  if (rpm >= peakLo && rpm <= peakHi) return ['peakTorque', 'Volllast · max. Drehmoment-Bereich'];
  if (rpm >= profile.peakPowerMinRpm) return ['peakPower', 'Volllast · Nennleistungs-Bereich'];
  return ['cruise', 'Volllast'];
}

export function computeEngineTelemetry(rpmInput, loadInput = 1, driveFrame, profile = DEFAULT_PROFILE) {
  const rpm = clampOperatingRpm(rpmInput, profile);
  const load = clamp(loadInput, 1);
  const torqueNm = load * profile.fullTorqueNm(rpm);
  const powerKW = (torqueNm * 2 * Math.PI * rpm) / 60000;
  const bsfc = bsfcMap(rpm, load, profile);
  const [status, statusLabel] = operatingStatus(rpm, load, profile);
  const boostBar = profile.boostBar(rpm, load);

  return {
    rpm,
    load,
    torqueNm,
    powerKW,
    powerPS: powerKW * 1.35962,
    // 4-Takt: (Zylinderzahl / 2) Zündungen pro Kurbelwellenumdrehung.
    ignitionsPerSec: (rpm / 60) * (profile.specs.cylinders / 2),
    bmepBar: torqueNm / profile.torqueNmPerBar,
    bsfc,
    thermalEff: thermalEfficiencyFromBsfc(bsfc, profile),
    boostBar,
    hasTurbo: profile.concept.hasTurbo,
    fuelLabel: profile.concept.fuelLabel,
    noUsefulPower: powerKW === 0,
    status,
    statusLabel,
    ...(driveFrame
      ? drivetrainPoint(driveFrame.gear, rpm, driveFrame.driveMode,
        fuelLitersPerHour(rpm, load, powerKW, profile), driveFrame.speedKmh, profile)
      : computeDrivetrain(rpm, load, powerKW, profile))
  };
}

export function speedKmh(rpm, gear, profile = DEFAULT_PROFILE) {
  const { gearRatios, wheelRadiusM } = DRIVETRAIN_EXAMPLE;
  const ratio = gearRatios[gear - 1];
  return ratio ? rpm / 60 * 2 * Math.PI * wheelRadiusM / (ratio * profile.finalDrive) * 3.6 : 0;
}

export function roadLoadPowerKw(speedMps) {
  const { massKg, gravityMps2, rollingResistance, airDensityKgM3, dragAreaM2,
    drivetrainEfficiency } = DRIVETRAIN_EXAMPLE;
  const rollingPowerW = massKg * gravityMps2 * rollingResistance * speedMps;
  const dragPowerW = 0.5 * airDensityKgM3 * dragAreaM2 * speedMps ** 3;
  return (rollingPowerW + dragPowerW) / drivetrainEfficiency / 1000;
}

export function roadLoadTorqueNm(rpm, gear, profile = DEFAULT_PROFILE) {
  return rpm > 0 ? roadLoadPowerKw(speedKmh(rpm, gear, profile) / 3.6) * 60000 / (2 * Math.PI * rpm) : 0;
}

function fuelLitersPerHour(rpm, load, powerKw, profile = DEFAULT_PROFILE) {
  if (load < 0.03 && rpm >= 1200) return 0;
  // Derselbe Nm/bar-Faktor wie im BSFC-Kennfeld hält beide Verbrauchsrechnungen konsistent.
  const kwPerBar = profile.torqueNmPerBar * 2 * Math.PI * rpm / 60000;
  const { totalPressureBar, indicatedEfficiency } = profile.fuelModel(rpm, load, powerKw / kwPerBar);
  const fuelPowerKw = totalPressureBar * kwPerBar / indicatedEfficiency;
  return fuelPowerKw * 3600 / profile.fuelHeatingValueMJkg / profile.fuelDensityGL;
}

const DRIVE_MODE_LABELS = {
  neutral: 'Stillstand',
  cruise: 'Konstantfahrt',
  accelerate: 'beschleunigt',
  coast: 'Schub'
};

function drivetrainPoint(gear, rpm, driveMode, fuelLph, speed, profile = DEFAULT_PROFILE) {
  const resolvedSpeed = speed === undefined ? speedKmh(rpm, gear, profile) : speed;
  const fuelL100Instant = driveMode !== 'neutral' && resolvedSpeed > 0 ? fuelLph * 100 / resolvedSpeed : null;
  return {
    gear,
    gearLabel: gear ? `${gear}. Gang` : 'N',
    speedKmh: resolvedSpeed,
    driveMode,
    driveModeLabel: DRIVE_MODE_LABELS[driveMode],
    fuelLph,
    fuelL100: driveMode === 'cruise' ? fuelL100Instant : null,
    fuelL100Instant,
    roadLoadKw: gear ? roadLoadPowerKw(resolvedSpeed / 3.6) : null
  };
}

// Erwartet die begrenzten Eingaben und die Nutzleistung aus computeEngineTelemetry.
export function computeDrivetrain(rpm, load, powerKw, profile = DEFAULT_PROFILE) {
  if (rpm <= 0) return drivetrainPoint(0, 0, 'neutral', 0, undefined, profile);
  const lowLoad = load < 0.03;
  const fuelCut = lowLoad && rpm >= 1200;
  const fuelLph = fuelLitersPerHour(rpm, load, powerKw, profile);
  if (lowLoad && !fuelCut) return drivetrainPoint(0, rpm, 'neutral', fuelLph, undefined, profile);

  const { gearRatios, minCruiseKmh, minAccelerationKmh, maxSpeedKmh,
    minCruiseRatio, maxCruiseRatio, topGearCruiseRatio } = DRIVETRAIN_EXAMPLE;
  const candidates = gearRatios.map((_, i) => ({ gear: i + 1, speed: speedKmh(rpm, i + 1, profile) }))
    .filter(({ speed }) => speed >= minCruiseKmh && speed <= maxSpeedKmh);
  const highest = candidates.at(-1) ?? { gear: 1, speed: speedKmh(rpm, 1, profile) };
  if (fuelCut) return drivetrainPoint(highest.gear, rpm, 'coast', 0, undefined, profile);

  if (load < 0.9) {
    let closest;
    let closestDistance = Infinity;
    let allBelowCruise = true;
    for (const { gear, speed } of candidates) {
      const ratio = powerKw / roadLoadPowerKw(speed / 3.6);
      if (ratio < minCruiseRatio) continue;
      allBelowCruise = false;
      if (ratio > maxCruiseRatio) continue;
      const distance = Math.abs(Math.log(ratio));
      if (distance < closestDistance) {
        closest = gear;
        closestDistance = distance;
      }
    }
    if (closest) return drivetrainPoint(closest, rpm, 'cruise', fuelLph, undefined, profile);
    if (allBelowCruise) return drivetrainPoint(highest.gear, rpm, 'coast', fuelLph, undefined, profile);

    // Im längsten Gang vor dem Kickdown etwas mehr Leistungsreserve zulassen.
    const highestRatio = powerKw / roadLoadPowerKw(highest.speed / 3.6);
    if (highest.gear === gearRatios.length && highestRatio > maxCruiseRatio && highestRatio <= topGearCruiseRatio) {
      return drivetrainPoint(highest.gear, rpm, 'cruise', fuelLph, undefined, profile);
    }
  }

  const kickdown = candidates.find(({ speed }) => speed >= minAccelerationKmh);
  return drivetrainPoint(kickdown?.gear ?? 1, rpm, 'accelerate', fuelLph, undefined, profile);
}

export function simulateDriveSequence({ startSpeedKmh, startGear, startLoad, targetLoad, durationS, dtS, profile = DEFAULT_PROFILE }) {
  const { gearRatios, wheelRadiusM, drivetrainEfficiency, massKg, gravityMps2,
    rollingResistance, airDensityKgM3, dragAreaM2, maxSpeedKmh } = DRIVETRAIN_EXAMPLE;
  const { redlineRpm } = profile.specs;
  const { rotatingMassFactor, loadRampS, partLoadLimit,
    cruiseAccelerationMps2, cruisePowerTolerance } = DRIVE_SEQUENCE_EXAMPLE;
  const { partLoadShiftRpm, fullLoadShiftRpm, minShiftRpm } = profile.shiftThresholds;
  if (!Number.isInteger(startGear) || !gearRatios[startGear - 1] ||
      !Number.isFinite(durationS) || durationS < 0 || !Number.isFinite(dtS) || dtS <= 0) {
    throw new RangeError('Ungültige Fahrsequenz');
  }

  let gear = startGear;
  const speedLimit = () => Math.min(maxSpeedKmh, speedKmh(redlineRpm, gear, profile));
  let speed = clamp(startSpeedKmh, speedLimit());
  const initialLoad = clamp(startLoad, 1);
  const finalLoad = clamp(targetLoad, 1);
  const loadAt = t => initialLoad + (finalLoad - initialLoad) * Math.min(t / loadRampS, 1);
  const effectiveMass = massKg * rotatingMassFactor;
  const rollingForceN = massKg * gravityMps2 * rollingResistance;
  const frames = [];
  const steps = Math.ceil(durationS / dtS);

  for (let step = 0; step <= steps; step++) {
    const t = Math.min(step * dtS, durationS);
    const load = loadAt(t);
    const shiftRpm = load < partLoadLimit ? partLoadShiftRpm : fullLoadShiftRpm;
    if (gear < gearRatios.length && speed > speedKmh(shiftRpm, gear, profile) &&
        speed >= speedKmh(minShiftRpm, gear + 1, profile)) gear++;

    const v = speed / 3.6;
    const rpm = Math.min(redlineRpm, speed / speedKmh(1, gear, profile));
    const fullTorque = fullTorqueNm(rpm, profile);
    const forcePerLoad = fullTorque * gearRatios[gear - 1] * profile.finalDrive * drivetrainEfficiency / wheelRadiusM;
    const resistanceN = rollingForceN + 0.5 * airDensityKgM3 * dragAreaM2 * v ** 2;
    const acceleration = (load * forcePerLoad - resistanceN) / effectiveMass;
    const powerKw = load * fullTorque * 2 * Math.PI * rpm / 60000;
    const roadLoadKw = roadLoadPowerKw(v);
    const balanced = Math.abs(acceleration) <= cruiseAccelerationMps2 &&
      Math.abs(powerKw - roadLoadKw) < cruisePowerTolerance * roadLoadKw;
    const driveMode = balanced ? 'cruise' : acceleration > 0 ? 'accelerate' : 'coast';
    frames.push({ t, rpm, load, gear, speedKmh: speed, driveMode, powerKw, roadLoadKw });

    // Mittlere Last des Zeitschritts verwenden, damit die Pedalrampe direkt in die Kraft eingeht.
    const dt = Math.min(dtS, durationS - t);
    const meanLoad = loadAt(t + dt / 2);
    const stepAcceleration = (meanLoad * forcePerLoad - resistanceN) / effectiveMass;
    speed = clamp(speed + stepAcceleration * dt * 3.6, speedLimit());
  }
  return frames;
}

export function constantSpeedPoint(speed, gear, profile = DEFAULT_PROFILE) {
  const { idleRpm, redlineRpm } = profile.specs;
  const rpm = speed / speedKmh(1, gear, profile);
  if (!Number.isFinite(rpm) || rpm < idleRpm || rpm > redlineRpm || speed > DRIVETRAIN_EXAMPLE.maxSpeedKmh) return null;
  const roadLoadKw = roadLoadPowerKw(speed / 3.6);
  const fullT = fullTorqueNm(rpm, profile);
  if (fullT <= 0) return null;
  const load = roadLoadTorqueNm(rpm, gear, profile) / fullT;
  if (load > 1) return null;

  const driveMode = 'cruise';
  const { torqueNm, powerKW, bsfc, thermalEff, fuelLph, fuelL100 } =
    computeEngineTelemetry(rpm, load, { gear, speedKmh: speed, driveMode }, profile);
  return { rpm, load, gear, speedKmh: speed, driveMode, torqueNm, powerKw: powerKW, roadLoadKw,
    bsfc, thermalEff, fuelLph, fuelL100 };
}

function traceContourLines(nodes) {
  const lines = [];
  const endpoints = nodes.filter(node => node.neighbors.length === 1);
  const visited = new Set();
  for (const start of [...endpoints, ...nodes]) {
    if (visited.has(start)) continue;
    const line = [];
    let previous;
    let node = start;
    while (node && !visited.has(node)) {
      visited.add(node);
      line.push(node.point);
      const next = node.neighbors.find(neighbor => neighbor !== previous);
      previous = node;
      node = next;
    }
    if (node === start) line.push(start.point);
    lines.push(line);
  }
  return lines;
}

export function computeBsfcContours(levels, profile = DEFAULT_PROFILE) {
  const activeLevels = levels ?? profile.contourLevels;
  const rpmStep = 25;
  const loadCells = 50;
  const { idleRpm, maxRpm } = profile.specs;
  const rpmCells = Math.round((maxRpm - idleRpm) / rpmStep);
  let optimum = { bsfc: Infinity };
  const grid = Array.from({ length: rpmCells + 1 }, (_, i) => {
    const rpm = idleRpm + i * rpmStep;
    return Array.from({ length: loadCells + 1 }, (_, j) => {
      const load = j / loadCells;
      const bsfc = bsfcMap(rpm, load, profile);
      if (bsfc !== null && bsfc < optimum.bsfc) {
        optimum = { rpm, load, torqueNm: load * fullTorqueNm(rpm, profile), bsfc };
      }
      return { rpm, load, efficiency: thermalEfficiencyFromBsfc(bsfc, profile), id: i * (loadCells + 1) + j };
    });
  });

  const contours = activeLevels.map(level => {
    const threshold = thermalEfficiencyFromBsfc(level, profile);
    const nodes = new Map();
    function crossing(a, b) {
      if ((a.efficiency >= threshold) === (b.efficiency >= threshold)) return null;
      const key = Math.min(a.id, b.id) + ':' + Math.max(a.id, b.id);
      if (!nodes.has(key)) {
        // In η interpolieren, damit die Nulllastkante einen endlichen Rasterwert hat.
        const fraction = (threshold - a.efficiency) / (b.efficiency - a.efficiency);
        const rpm = a.rpm + fraction * (b.rpm - a.rpm);
        const load = a.load + fraction * (b.load - a.load);
        nodes.set(key, { point: { rpm, torqueNm: load * fullTorqueNm(rpm, profile) }, neighbors: [] });
      }
      return nodes.get(key);
    }

    function connect(a, b) {
      a.neighbors.push(b);
      b.neighbors.push(a);
    }

    for (let i = 0; i < rpmCells; i++) {
      for (let j = 0; j < loadCells; j++) {
        const a = grid[i][j];
        const b = grid[i + 1][j];
        const c = grid[i + 1][j + 1];
        const d = grid[i][j + 1];
        const edges = [crossing(a, b), crossing(b, c), crossing(c, d), crossing(d, a)].filter(Boolean);
        if (edges.length === 2) {
          connect(edges[0], edges[1]);
        } else if (edges.length === 4) {
          // Marching Squares: Der Zellmittelpunkt entscheidet die Paarung im Sattelfall.
          const center = bsfcMap((a.rpm + c.rpm) / 2, (a.load + c.load) / 2, profile);
          const centerInside = thermalEfficiencyFromBsfc(center, profile) >= threshold;
          if (centerInside === (a.efficiency >= threshold)) {
            connect(edges[0], edges[1]);
            connect(edges[2], edges[3]);
          } else {
            connect(edges[0], edges[3]);
            connect(edges[1], edges[2]);
          }
        }
      }
    }

    return { level, polylines: traceContourLines([...nodes.values()]) };
  });
  return { contours, optimum };
}

export function computeDriveTourDemos(optimum, profile = DEFAULT_PROFILE) {
  const activeOptimum = optimum ?? computeBsfcContours([], profile).optimum;
  const { durationS, dtS, pedalDriveS, pedalLeadInS,
    pedalHoldS, drivePlaybackS, drivePlaybackExponent, comparisonSpeedKmh, comparisonGears,
    lowSpeedKmh, lowSpeedGear, comparisonPointS } = DRIVE_TOUR_EXAMPLE;
  const startRpm = profile.cruiseRpm;
  const startLoad = profile.cruiseLoad;
  const targetLoad = profile.isDefaultR4Otto ? DRIVE_TOUR_EXAMPLE.targetLoad : Math.min(0.75, Math.max(0.45, startLoad * 1.9));
  const start = computeEngineTelemetry(startRpm, startLoad, undefined, profile);
  const startGear = start.gear || 5;
  const startSpeed = start.gear ? start.speedKmh : speedKmh(startRpm, startGear, profile);
  const frames = simulateDriveSequence({
    startSpeedKmh: startSpeed, startGear, startLoad: start.load,
    targetLoad, durationS, dtS, profile
  });
  const pedalFrames = frames.filter(frame => frame.t <= pedalDriveS);
  const rampEnd = pedalFrames.find(frame => frame.t >= DRIVE_SEQUENCE_EXAMPLE.loadRampS) || pedalFrames.at(-1);
  const end = frames.at(-1);
  const comparisons = comparisonGears
    .map(gear => constantSpeedPoint(comparisonSpeedKmh, gear, profile))
    .filter(Boolean);
  const lowSpeed = constantSpeedPoint(lowSpeedKmh, lowSpeedGear, profile)
    || constantSpeedPoint(lowSpeedKmh, 3, profile);
  const optimumPoint = computeEngineTelemetry(activeOptimum.rpm, activeOptimum.load, undefined, profile);
  const optimumMode = optimumPoint.powerKW > optimumPoint.roadLoadKw ? 'accelerate' : optimumPoint.driveMode;
  const optimumFrame = {
    rpm: activeOptimum.rpm, load: activeOptimum.load, gear: optimumPoint.gear, speedKmh: optimumPoint.speedKmh,
    driveMode: optimumMode, powerKw: optimumPoint.powerKW, roadLoadKw: optimumPoint.roadLoadKw
  };

  const whole = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
  const decimal = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const speed = value => `${whole.format(value)} km/h`;
  const torque = value => `${whole.format(value)} Nm`;
  const load = value => `${whole.format(value * 100)} %`;
  const power = value => `${decimal.format(value)} kW`;
  const fuel = value => `${decimal.format(value)} l/100km`;
  const bsfc = value => `${whole.format(value)} g/kWh`;
  const metrics = ({ bsfc: specific, thermalEff, powerKW, fuelL100Instant }) =>
    `${bsfc(specific)}, η ${decimal.format(thermalEff * 100)} %, ${power(powerKW)}, ${fuel(fuelL100Instant)}`;
  const endPoint = computeEngineTelemetry(end.rpm, end.load, end, profile);
  const lowPoint = computeEngineTelemetry(lowSpeed.rpm, lowSpeed.load, lowSpeed, profile);
  const first = comparisons[0];
  const last = comparisons.at(-1);

  const pedalMechanism = profile.concept.hasTurbo
    ? 'Die Common-Rail-Direkteinspritzung dosiert mehr Diesel direkt in den Brennraum, und der Turbolader baut zusätzlichen Ladedruck auf.'
    : 'Die Drosselklappe lässt mehr Luft durch, und die Saugrohreinspritzung dosiert mehr Kraftstoff.';
  const lowSpeedReason = profile.concept.hasTurbo
    ? 'arbeiten Reibung und Nebenverluste gegen sehr wenig Nutzleistung, sodass der Wirkungsgrad sinkt'
    : 'ist die Drosselklappe nur wenig geöffnet und der Wirkungsgrad geringer';

  return {
    pedal: {
      frames: pedalFrames, playbackS: pedalDriveS, leadInS: pedalLeadInS, holdS: pedalHoldS,
      resetOnFinish: true,
      body: `Das Pedal geht von ${load(start.load)} auf ${load(rampEnd.load)}. ${pedalMechanism} Das Nutzmoment steigt von ${torque(start.torqueNm)} auf ${torque(rampEnd.load * fullTorqueNm(rampEnd.rpm, profile))}. Bei ${power(rampEnd.powerKw)} Nutzleistung und ${power(rampEnd.roadLoadKw)} Fahrwiderstand beschleunigt das Auto.`
    },
    equilibrium: {
      frames, playbackS: drivePlaybackS, timeExponent: drivePlaybackExponent,
      body: `Die Luftwiderstandskraft wächst mit v². Ihr Leistungsbedarf wächst mit v³, jener fürs Rollen mit v. Die Automatik schaltet hoch. Bei ${speed(end.speedKmh)} im ${end.gear}. Gang sind Nutzleistung (${power(end.powerKw)}) und Fahrwiderstandsleistung (${power(end.roadLoadKw)}) fast gleich. Das Auto fährt konstant weiter, bis du das Pedal verstellst.`
    },
    gearing: {
      frames: comparisons, playbackS: comparisons.length * comparisonPointS,
      body: `Am Drehzahlbegrenzer schafft der 1. Gang ${speed(speedKmh(profile.specs.redlineRpm, 1, profile))}. Bei ${speed(comparisonSpeedKmh)} senken längere Gänge die Drehzahl und erhöhen die Last. Vom ${first.gear}. zum ${last.gear}. Gang sinkt der spezifische Verbrauch von ${bsfc(first.bsfc)} auf ${bsfc(last.bsfc)} und der Streckenverbrauch von ${fuel(first.fuelL100)} auf ${fuel(last.fuelL100)}.`
    },
    map: {
      frames: [optimumFrame, lowSpeed, end], playbackS: 3 * comparisonPointS,
      body: `Im Optimum ist die Last hoch und der spezifische Verbrauch am niedrigsten (${metrics(optimumPoint)} momentan). Bei ${speed(lowSpeed.speedKmh)} ${lowSpeedReason} (${metrics(lowPoint)}). Weil die Fahrt dort so wenig Leistung erfordert, ist der Streckenverbrauch von den drei Betriebspunkten am niedrigsten. Zum Vergleich die Konstantfahrt bei ${speed(end.speedKmh)} (${metrics(endPoint)}).`
    }
  };
}

export const IGNITION_WINDOW_DEG = 54;
export const MIN_IGNITION_SECONDS = 0.19;

export function ignitionWindow(speed, normalSpeed) {
  return Math.max(IGNITION_WINDOW_DEG, MIN_IGNITION_SECONDS * Math.max(speed, normalSpeed));
}

/**
 * Liefert den exakten 4-Takt-Zustand für einen Zylinder bei Kurbelwinkel crankDeg.
 */
export function getCylinderStroke(crankDeg, cylIndex, profile = DEFAULT_PROFILE, out = {}, windowDeg = IGNITION_WINDOW_DEG, advanceDeg) {
  const spec = profile.layout.cylinderSpecs[cylIndex];
  const offset = spec ? spec.phaseDeg : (CYLINDER_PHASE_OFFSETS[cylIndex] || 0);
  const cycle = (((crankDeg + offset) % 720) + 720) % 720;
  const isDiesel = profile.concept.directInjection;

  let index = 0;
  let name = 'Ansaugen';
  let short = '1. Ansaugen';
  let key = 'intake';
  let intakeLift = 0;
  let exhaustLift = 0;
  let sparkIntensity = 0;
  let injectionIntensity = 0;
  let flameIntensity = 0;
  let intakeMist = 0;
  let exhaustGas = 0;

  if (cycle < 180) {
    index = 0;
    name = 'Ansaugen';
    short = 'Ansaugen';
    key = 'intake';
    const t = cycle / 180;
    intakeLift = camLift((cycle - 90) * Math.PI / 360) / MAX_LIFT;
    intakeMist = 0.25 + 0.75 * Math.sin(t * Math.PI * 0.85);
  } else if (cycle < 360) {
    index = 1;
    name = 'Verdichten';
    short = 'Verdichten';
    key = 'compression';
    const t = (cycle - 180) / 180;
    intakeMist = 0.55 + t * 0.45;
    if (isDiesel) {
      // Diesel-Direkteinspritzung (Common-Rail) beginnt kurz vor OT (~344°–360°)
      if (cycle > 344) {
        injectionIntensity = (cycle - 344) / 16;
      }
    } else if (cycle > profile.concept.ignitionStartDeg) {
      // Otto-Frühzündung kurz vor OT (ca. 350°–360°)
      sparkIntensity = (cycle - profile.concept.ignitionStartDeg) / (360 - profile.concept.ignitionStartDeg);
    }
  } else if (cycle < 540) {
    index = 2;
    name = 'Arbeiten';
    short = 'Arbeiten';
    key = 'power';
    const t = (cycle - 360) / 180;
    if (isDiesel) {
      if (cycle < 382) {
        injectionIntensity = 1 - (cycle - 360) / 22;
      }
    } else if (cycle < 376) {
      sparkIntensity = 1 - (cycle - 360) / 16;
    }
    // Intensive Explosionsflamme direkt nach OT, abklingend bei Expansion
    flameIntensity = Math.pow(Math.max(0, 1 - t * 1.15), 1.45);
    exhaustGas = Math.min(0.6, t * 0.75);
  } else {
    index = 3;
    name = 'Ausstoßen';
    short = 'Ausstoßen';
    key = 'exhaust';
    const t = (cycle - 540) / 180;
    exhaustLift = camLift((cycle - 630) * Math.PI / 360) / MAX_LIFT;
    exhaustGas = 0.85 * (1 - t * 0.65);
  }

  out.cycle = cycle;
  out.index = index;
  out.key = key;
  out.name = name;
  out.short = short;
  out.intakeLift = intakeLift;
  out.exhaustLift = exhaustLift;
  out.sparkIntensity = sparkIntensity;
  out.injectionIntensity = injectionIntensity;
  const sinceIgnition = (cycle - profile.concept.ignitionStartDeg + 720) % 720;
  // Interpolate the frame that crosses ignition. During an ongoing burn integrate
  // from its previous progress, so a speed change cannot restart it or a pause age it.
  const burn = advanceDeg === undefined || out.burnProgress === undefined || sinceIgnition <= advanceDeg
    ? Math.min(1, sinceIgnition / windowDeg)
    : Math.min(1, out.burnProgress + advanceDeg / windowDeg);
  out.burnProgress = burn;
  const rise = Math.min(1, burn / 0.12), fade = Math.min(1, (1 - burn) / 0.40);
  out.flashIntensity = rise * rise * (3 - 2 * rise) * fade * fade * (3 - 2 * fade);
  out.flameIntensity = flameIntensity;
  out.intakeMist = intakeMist;
  out.exhaustGas = exhaustGas;
  return out;
}

export const ENGINE_PARTS = [
  {
    id: 'block',
    number: '01',
    name: 'Zylinderblock & Laufbuchsen',
    shortLabel: 'Motorblock',
    category: 'Grundstruktur',
    energyStage: 'Führung & Kühlung der 4 Zylinder',
    spec: 'Aluminium-Druckguss · 4× 500 cm³ · Kühlmantel',
    description:
      'Der steife Zylinderblock bildet das Rückgrat des Motors. In den vier gehonten Laufbuchsen gleiten die Kolben mit minimaler Reibung; umgebende Kühlkanäle führen überschüssige Verbrennungswärme ab.',
    anchor: [0.0, 0.25, 0.85],
    explodeOffset: [0, -0.5, 0],
    cameraPos: [7.6, 2.2, 8.2],
    cameraTarget: [0, 0.4, 0]
  },
  {
    id: 'pistons',
    number: '02',
    name: 'Kolben & Kolbenringe (4×)',
    shortLabel: 'Kolben (4×)',
    category: 'Kurbeltrieb',
    energyStage: 'Gasdruck → Lineare Hubbewegung',
    spec: 'Leichtmetall-Alu · 2 Verdichtungs- + 1 Ölabstreifring',
    description:
      'Jeder Kolben dichtet den Brennraum über drei Kolbenringe ab und nimmt bei der Verbrennung über 80 bar Gasdruck auf – das entspricht mehr als 4 Tonnen Kraft pro Arbeitstakt!',
    anchor: [-1.1, 0.95, 0.1],
    explodeOffset: [0, 1.55, 0],
    cameraPos: [4.2, 2.2, 6.2],
    cameraTarget: [-0.8, 0.9, 0]
  },
  {
    id: 'conrods',
    number: '03',
    name: 'Pleuelstangen (4×)',
    shortLabel: 'Pleuelstangen',
    category: 'Kurbeltrieb',
    energyStage: 'Kraftübertragung Kolben → Kurbelwelle',
    spec: 'Geschmiedeter I-Profil-Stahl · Geteilte Lagerschalen',
    description:
      'Die Pleuel verbinden den geradlinig auf- und ablaufenden Kolbenbolzen mit dem kreisenden Hubzapfen der Kurbelwelle und übersetzen so die lineare Hub- in eine Drehbewegung.',
    anchor: [-0.35, -0.35, 0.15],
    explodeOffset: [0, -0.95, 0],
    cameraPos: [4.4, 0.4, 6.4],
    cameraTarget: [0, -0.2, 0]
  },
  {
    id: 'crankshaft',
    number: '04',
    name: 'Kurbelwelle & Gegengewichte',
    shortLabel: 'Kurbelwelle',
    category: 'Kurbeltrieb',
    energyStage: 'Hubarbeit → Nutzbares Drehmoment',
    spec: '5 Hauptlager · 180°-Flat-Plane · Ausgleichsmassen',
    description:
      'Die vier um 180° versetzten Hubzapfen (0°–180°–180°–0°) wandeln die Arbeitstakte in eine gleichmäßige Drehbewegung um. Gegengewichte kompensieren die rotierenden Massenkräfte.',
    anchor: [0.6, -1.5, 0.1],
    explodeOffset: [0, -2.55, 0],
    cameraPos: [5.5, -0.8, 7.2],
    cameraTarget: [0, -1.4, 0]
  },
  {
    id: 'cylinderHead',
    number: '05',
    name: 'DOHC-Zylinderkopf',
    shortLabel: 'Zylinderkopf',
    category: 'Gaswechsel',
    energyStage: 'Brennraumdach & Gasführung',
    spec: 'Aluminium-Querstromkopf · 4 Ventile/Zylinder',
    description:
      'Der Zylinderkopf schließt die Brennräume nach oben ab und beherbergt die präzisen Ein- und Auslasskanäle, Ventilführungen, Zündkerzen sowie die Lagerung beider Nockenwellen.',
    anchor: [0.0, 2.35, 0.65],
    explodeOffset: [0, 2.75, 0],
    cameraPos: [6.5, 3.2, 7.2],
    cameraTarget: [0, 2.2, 0]
  },
  {
    id: 'camshafts',
    number: '06',
    name: 'Nockenwellen (DOHC Ein-/Auslass)',
    shortLabel: 'Nockenwellen',
    category: 'Ventiltrieb',
    energyStage: 'Präzise Steuerzeiten (0,5× Drehzahl)',
    spec: 'Zwei obenliegende Wellen · 16 gehärtete Nocken',
    description:
      'Beide Nockenwellen drehen mit exakt halber Kurbelwellendrehzahl (1:2). Ihre eiförmigen Nocken drücken Ein- und Auslassventile millisekundengenau im richtigen Takt auf.',
    anchor: [0.4, 3.32, 0.0],
    explodeOffset: [0, 4.35, 0],
    cameraPos: [5.2, 4.4, 6.2],
    cameraTarget: [0, 3.1, 0]
  },
  {
    id: 'valves',
    number: '07',
    name: 'Ventile & Ventilfedern (16V)',
    shortLabel: '16 Ventile',
    category: 'Ventiltrieb',
    energyStage: 'Einlass (Blau) & Auslass (Bronze)',
    spec: '8 Einlass- + 8 Auslassventile · Schraubenfedern',
    description:
      'Zwei Einlassventile pro Zylinder lassen frisches Luft-Kraftstoff-Gemisch einströmen; zwei hitzebeständige Auslassventile entlassen das heiße Abgas. Starke Federn schließen die Ventile blitzschnell wieder gasdicht.',
    anchor: [-1.1, 2.55, 0.45],
    explodeOffset: [0, 3.55, 0],
    cameraPos: [4.6, 3.4, 5.6],
    cameraTarget: [-0.6, 2.5, 0]
  },
  {
    id: 'sparkPlugs',
    number: '08',
    name: 'Zündkerzen & Hochspannung (4×)',
    shortLabel: 'Zündkerzen',
    category: 'Zündung',
    energyStage: 'Elektrischer Funke → Verbrennung',
    spec: '30.000 V Zündspule · Iridium-Elektrode · Zündfolge 1-3-4-2',
    description:
      'Kurz vor dem oberen Totpunkt am Ende des Verdichtungstakts erzeugt die Zündkerze einen heißen Lichtbogen. Dieser entzündet das hochverdichtete Gemisch – die rasche Expansion liefert die Antriebskraft.',
    anchor: [1.1, 3.25, 0.0],
    explodeOffset: [0, 5.25, 0],
    cameraPos: [4.8, 4.2, 5.5],
    cameraTarget: [0.4, 2.9, 0]
  },
  {
    id: 'intakeManifold',
    number: '09',
    name: 'Ansaugkrümmer & Drosselklappe',
    shortLabel: 'Ansaugtrakt',
    category: 'Gaswechsel',
    energyStage: 'Frischluft + Kraftstoff-Gemisch',
    spec: '4 Schwingrohre · Drosselklappe · Saugrohreinspritzung',
    description:
      'Die Drosselklappe dosiert die Luft, die über das Sammelrohr in die vier Ansaugkanäle strömt. Eine gemeinsame Kraftstoffleiste versorgt vier Einspritzventile. Sie spritzen Benzin vor den Einlassventilen in die Ansaugkanäle, wo es sich mit der Luft mischt.',
    anchor: [0.0, 2.25, -1.75],
    explodeOffset: [0, 2.1, -2.55],
    cameraPos: [-5.8, 3.8, -6.5],
    cameraTarget: [0, 2.0, -1.2]
  },
  {
    id: 'exhaustManifold',
    number: '10',
    name: 'Fächerkrümmer (Abgastrakt)',
    shortLabel: 'Abgaskrümmer',
    category: 'Gaswechsel',
    energyStage: 'Heiße Abgase (bis 900 °C) ableiten',
    spec: '4-in-1 Edelstahl-Rohrkrümmer · Katalysator-Anbindung',
    description:
      'Die vier gleich langen Abgasrohre führen die heißen Verbrennungsgase strömungsgünstig zusammen. Durch geschickte Druckwellen-Abstimmung verbessert der Fächerkrümmer den Gaswechsel.',
    anchor: [0.0, 1.95, 1.85],
    explodeOffset: [0, 1.6, 2.85],
    cameraPos: [6.4, 2.6, 7.2],
    cameraTarget: [0, 1.8, 1.4]
  },
  {
    id: 'timingDrive',
    number: '11',
    name: 'Zahnriemen und Spannrolle',
    shortLabel: 'Steuertrieb',
    category: 'Ventiltrieb',
    energyStage: 'Feste Synchronisation Kurbel ↔ Nocke',
    spec: '2:1 Übersetzung · Zwei Nockenwellenräder je Bank',
    description:
      'Der Zahnriemen treibt beide Nockenwellen einer Bank an. Ihre Räder haben doppelt so viele Zähne wie das Kurbelwellenrad. Die Spannrolle hält den Riemen auf Zug.',
    anchor: [-3.15, 0.85, 0.0],
    explodeOffset: [-2.4, 0.2, 0],
    cameraPos: [-8.2, 2.1, 4.8],
    cameraTarget: [-2.9, 0.8, 0]
  },
  {
    id: 'flywheelOilpan',
    number: '12',
    name: 'Schwungrad & Ölwanne',
    shortLabel: 'Schwungrad & Öl',
    category: 'Antrieb & Schmierung',
    energyStage: 'Drehimpuls-Glättung & Ölreservoir',
    spec: 'Verzahnte Schwungscheibe · Verrippte Alu-Ölwanne',
    description:
      'Das schwere Schwungrad speichert Rotationsenergie und glättet die einzelnen Verbrennungsstöße für ruhigen Rundlauf. Unten sammelt die verrippte Ölwanne das Schmieröl und kühlt es ab.',
    anchor: [3.2, -1.5, 0.0],
    explodeOffset: [1.8, -3.3, 0],
    cameraPos: [8.8, -0.5, 6.2],
    cameraTarget: [1.8, -1.5, 0]
  }
];

const STROKE_AND_DRIVE_STEPS = [
  {
    step: 1,
    title: '1. Takt: Ansaugen (Einlass öffnet)',
    badge: '0°–180° · Luft-Kraftstoff-Gemisch',
    viewMode: 'cutaway',
    focusPart: 'intakeManifold',
    demoRpm: 1600,
    demoTimeScale: 0.14,
    cameraPos: [5.4, 2.4, 6.8],
    cameraTarget: [-0.8, 1.2, 0.0],
    body:
      'Die Nockenwelle öffnet die blauen Einlassventile, während der Kolben abwärtsläuft. Der dabei entstehende Unterdruck saugt das Gemisch aus Luft (blau) und Benzin (rot) aus dem Ansaugkanal in den Zylinder.'
  },
  {
    step: 2,
    title: '2. Takt: Verdichten (Druck steigt)',
    badge: '180°–360° · Verdichtung 11 : 1',
    viewMode: 'cutaway',
    focusPart: 'pistons',
    demoRpm: 1800,
    demoTimeScale: 0.12,
    cameraPos: [4.5, 1.9, 5.8],
    cameraTarget: [-0.5, 0.9, 0.0],
    body:
      'Alle vier Ventile sind fest geschlossen. Der nach oben eilende Kolben komprimiert das Gasgemisch auf ein Elftel seines ursprünglichen Volumens – Temperatur und Druck steigen rasant an.'
  },
  {
    step: 3,
    title: '3. Takt: Zünden & Arbeiten (Leistung!)',
    badge: '360°–540° · Chemisch → Mechanisch',
    viewMode: 'cutaway',
    focusPart: 'sparkPlugs',
    demoRpm: 2400,
    demoTimeScale: 0.10,
    body:
      'Kurz vor dem oberen Totpunkt feuert die Zündkerze einen 30.000-Volt-Funken. Die Flamme breitet sich im Gemisch aus. Der steigende Gasdruck drückt den Kolben nach unten.'
  },
  {
    step: 4,
    title: '4. Takt: Ausstoßen (Abgas raus)',
    badge: '540°–720° · Fächerkrümmer',
    viewMode: 'xray',
    focusPart: 'exhaustManifold',
    demoRpm: 3200,
    demoTimeScale: 0.14,
    cameraPos: [6.2, 2.3, 7.2],
    cameraTarget: [0.0, 1.5, 0.4],
    body:
      'Im Röntgenblick siehst du den Gaswechsel durch den gesamten Motor: Die bronzefarbenen Auslassventile öffnen sich und der aufsteigende Kolben schiebt das heiße Abgas durch den Krümmer in den Sammler.'
  },
  {
    step: 5,
    title: 'DOHC-Ventiltrieb & Zahnriemen',
    badge: 'Synchronisation · 16 Ventile',
    viewMode: 'cutaway',
    focusPart: 'timingDrive',
    demoRpm: 2600,
    demoTimeScale: 0.16,
    cameraPos: [-7.4, 2.6, 5.8],
    cameraTarget: [-1.8, 1.3, 0.0],
    body:
      'Je Bank treibt ein Zahnriemen zwei Nockenwellen mit halber Kurbeldrehzahl an. Die Nocken drücken auf die Tassenstößel und öffnen die Ventile. Die Feder schließt den Ventilteller wieder am Kegelsitz.'
  },
  {
    step: 6,
    title: 'Gas geben: Drosselklappe auf',
    badge: 'Last und Nutzmoment',
    viewMode: 'cutaway',
    focusPart: 'intakeManifold',
    demo: 'pedal',
    demoTimeScale: 0.16,
    cameraPos: [-7.4, 2.9, -5.0],
    cameraTarget: [-2.15, 1.95, -1.65]
  },
  {
    step: 7,
    title: 'Fahrwiderstand und Gleichgewicht',
    badge: 'Beschleunigung und Konstantfahrt',
    viewMode: 'cutaway',
    focusPart: 'crankshaft',
    demo: 'equilibrium',
    demoTimeScale: 0.16,
    cameraPos: [5.5, -0.8, 7.2],
    cameraTarget: [0, -1.4, 0]
  },
  {
    step: 8,
    title: 'Warum ein Getriebe?',
    badge: 'Übersetzung und Verbrauch',
    viewMode: 'cutaway',
    focusPart: 'flywheelOilpan',
    demo: 'gearing',
    demoTimeScale: 0.16,
    cameraPos: [8.8, -0.5, 6.2],
    cameraTarget: [1.8, -1.5, 0]
  },
  {
    step: 9,
    title: 'Die Muschelkurve lesen',
    badge: 'Wirkungsgrad und Leistungsbedarf',
    viewMode: 'cutaway',
    focusPart: 'block',
    demo: 'map',
    demoTimeScale: 0.16,
    cameraPos: [6.2, 2.0, 7.6],
    cameraTarget: [0, 0.7, 0]
  }
];

/**
 * Liefert Baugruppen-Beschreibungen passend zur aktiven Bauform & zum Konzept (Otto vs. Turbodiesel).
 */
export function getEnginePartsForProfile(profile = DEFAULT_PROFILE) {
  const { layout, concept } = profile;
  const cyl = layout.cylinders;
  const valves = layout.valves;
  const isDiesel = concept.directInjection;
  const layoutNotes = {
    r4: {
      blockName: 'Zylinderblock & Laufbuchsen (R4)',
      blockSpec: 'Aluminium-Druckguss · 4× 500 cm³ · Reihenanordnung',
      crankSpec: '5 Hauptlager · 180°-Flat-Plane · Ausgleichsmassen',
      crankDesc: 'Die vier um 180° versetzten Hubzapfen (0°–180°–180°–0°) wandeln die Arbeitstakte in eine gleichmäßige Drehbewegung um.'
    },
    boxer4: {
      blockName: 'Boxer-Motorblock (180° geteilt)',
      blockSpec: 'Geteiltes Alu-Kurbelgehäuse · 2× 2 liegende Zylinder · Tiefer Schwerpunkt',
      crankSpec: '4 getrennte Hubzapfen (180° versetzt) · Gegenläufige Box-Bewegung',
      crankDesc: 'Jeder gegenüberliegende Kolben hat einen eigenen, um 180° versetzten Hubzapfen – beide Kolbenpaare bewegen sich spiegelbildlich nach außen und innen und gleichen freie Massenkräfte perfekt aus.'
    },
    v6: {
      blockName: '60°-V6-Zylinderblock',
      blockSpec: 'Aluminium-V-Block (60°) · 6× 500 cm³ · 3,0 l Hubraum',
      crankSpec: '4 Hauptlager · 60°-Split-Pin-Hubzapfen · Zündabstand 120°',
      crankDesc: 'Die Split-Pin-Kurbelwelle versetzt die Hubzapfen je Zylinderpaar um 60°, sodass alle sechs Zylinder exakt gleichmäßig alle 120° zünden.'
    },
    v8: {
      blockName: '90°-V8-Zylinderblock',
      blockSpec: 'Aluminium-V-Block (90°) · 8× 500 cm³ · 4,0 l Hubraum',
      crankSpec: '5 Hauptlager · 90°-Crossplane-Kurbelwelle · 4 geteilte Hubzapfen',
      crankDesc: 'Vier um 90° gekreuzte Hubzapfen (Crossplane) tragen je zwei Pleuel nebeneinander und erzeugen den seidenweichen Lauf und charakteristischen V8-Takt mit 90° Zündabstand.'
    }
  }[layout.id];

  return ENGINE_PARTS.map(part => {
    const copy = { ...part };
    if (part.id === 'block') {
      copy.name = layoutNotes.blockName;
      copy.energyStage = `Führung & Kühlung der ${cyl} Zylinder (${layout.shortName})`;
      copy.spec = layoutNotes.blockSpec;
    } else if (part.id === 'pistons') {
      copy.name = isDiesel ? `Muldenkolben & Ringe (${cyl}×)` : `Kolben & Kolbenringe (${cyl}×)`;
      copy.shortLabel = `Kolben (${cyl}×)`;
      copy.spec = isDiesel
        ? `Verstärkter Diesel-Muldenkolben · Verdichtung ${concept.compressionRatio} · über 160 bar Spitzendruck`
        : `Leichtmetall-Alu · ${cyl}× Kolben · 2 Verdichtungs- + 1 Ölabstreifring`;
    } else if (part.id === 'conrods') {
      copy.name = `Pleuelstangen (${cyl}×)`;
    } else if (part.id === 'crankshaft') {
      copy.spec = layoutNotes.crankSpec;
      copy.description = layoutNotes.crankDesc;
    } else if (part.id === 'cylinderHead') {
      const bankCount = layout.bankAnglesDeg.length;
      copy.name = bankCount > 1 ? `DOHC-Zylinderköpfe (${bankCount} Bänke)` : 'DOHC-Zylinderkopf';
      copy.spec = `${bankCount}× Aluminium-Querstromkopf · 4 Ventile/Zylinder (${valves}V)`;
      if (isDiesel) copy.description = 'Der Querstromkopf führt Einlass und Auslass getrennt. Zwischen den Ventilen sitzt der Injektor, seitlich davon die Glühkerze.';
    } else if (part.id === 'camshafts') {
      const camCount = layout.bankAnglesDeg.length * 2;
      copy.name = `Nockenwellen (${camCount}× DOHC)`;
      copy.spec = `${camCount} obenliegende Wellen · ${valves} gehärtete Nocken`;
    } else if (part.id === 'valves') {
      copy.name = `Ventile & Federn (${valves}V)`;
      copy.shortLabel = `${valves} Ventile`;
      copy.spec = `${valves / 2} Einlass- + ${valves / 2} Auslassventile · Schraubenfedern`;
    } else if (part.id === 'sparkPlugs' && isDiesel) {
      copy.id = 'commonRail';
      copy.name = `Common-Rail-Injektoren & Glühkerzen (${cyl}×)`;
      copy.shortLabel = 'DI-Injektoren';
      copy.category = 'Direkteinspritzung';
      copy.energyStage = 'Hochdruck-Einspritzung → Selbstzündung';
      copy.spec = `Bis 2.200 bar Common-Rail · Piezo-Injektoren · Zündfolge ${layout.firingOrder}`;
      copy.description =
        'Die Hochdruckpumpe speist das Common Rail. Von dort gelangt Kraftstoff zu den zentralen Injektoren. In der verdichteten heißen Luft entzündet sich der eingespritzte Diesel nach kurzem Zündverzug. Seitliche Glühkerzen helfen beim Kaltstart.';
    } else if (part.id === 'sparkPlugs' && !isDiesel) {
      copy.name = `Zündkerzen & Hochspannung (${cyl}×)`;
      copy.spec = `30.000 V Zündspule · Iridium-Elektrode · Zündfolge ${layout.firingOrder}`;
    } else if (part.id === 'intakeManifold' && isDiesel) {
      copy.name = 'Saugrohr und Luftverteilung';
      copy.shortLabel = 'Saugrohr';
      copy.category = 'Aufladung';
      copy.energyStage = 'Vorverdichtete Frischluft (bis +1,8 bar)';
      copy.spec = 'VTG-Turbolader · Verdichterrad · Ladeluftrohr · keine Drosselklappe';
      copy.description =
        'Das vom Abgas angetriebene Verdichterrad presst deutlich mehr Sauerstoff in die Zylinder als ein Saugmotor ansaugen könnte. Die Last wird ohne Drosselklappe rein über die eingespritzte Dieselmenge geregelt – das vermeidet Drosselverluste.';
    } else if (part.id === 'exhaustManifold' && isDiesel) {
      copy.name = 'Abgaskrümmer und Sammler';
      copy.shortLabel = 'Abgaskrümmer';
      copy.category = 'Aufladung';
      copy.energyStage = 'Abgasenergie → Turbolader-Antrieb';
      copy.spec = 'Krümmer + Abgasturbine mit variabler Geometrie (VTG)';
      copy.description =
        'Die heißen Abgase treiben das Turbinenrad des Turboladers mit bis zu 200.000 U/min an. Über eine gemeinsame Welle treibt die Turbine das Verdichterrad auf der Frischluftseite an und nutzt so sonst verlorene Abgasenergie.';
    }
    return copy;
  }).concat(flowParts(isDiesel));
}

/**
 * Viertakt, Stoffwege und Fahrbeispiele für das gewählte Konzept.
 */
export function getTourStepsForProfile(profile = DEFAULT_PROFILE) {
  const { layout, concept } = profile;
  const isDiesel = concept.directInjection;
  const scale = layout.cameraScale;
  const scaledCam = pos => pos.map(v => Number((v * scale).toFixed(2)));

  const steps = STROKE_AND_DRIVE_STEPS.map(step => {
    const s = { ...step, cameraPos: step.cameraPos && scaledCam(step.cameraPos) };
    if (isDiesel) {
      if (step.step === 1) {
        s.badge = '0°–180° · Vorverdichtete Frischluft';
        s.demoRpm = 1400;
        s.body =
          'Die blauen Einlassventile öffnen sich und die vorverdichtete Luft strömt in den Zylinder. Je nach Last enthält sie rückgeführtes Abgas. Der Kraftstoff folgt erst bei der Direkteinspritzung.';
      } else if (step.step === 2) {
        s.badge = `180°–360° · Hohe Verdichtung ${concept.compressionRatio}`;
        s.demoRpm = 1600;
        s.body =
          `Alle Ventile sind geschlossen. Der Kolben verdichtet die eingeschlossene Ladung (${concept.compressionRatio}) – dabei erhitzt sie sich auf über 700 °C, heiß genug für die Selbstzündung.`;
      } else if (step.step === 3) {
        s.focusPart = 'commonRail';
        s.title = '3. Takt: Direkteinspritzung & Selbstzündung';
        s.badge = '360°–540° · Common-Rail bis 2.200 bar';
        s.demoRpm = 1900;
        s.body =
          'Knapp vor dem oberen Totpunkt spritzt der zentrale Injektor Diesel mit Hochdruck direkt in die heiße Luft. Ganz ohne Zündfunken entzündet sich der Nebel selbst und liefert enormes Drehmoment!';
      } else if (step.step === 4) {
        s.badge = '540°–720° · Abgas treibt den Turbolader';
        s.demoRpm = 2400;
        s.body =
          'Die Auslassventile öffnen. Der aufsteigende Kolben schiebt braunes Abgas in den Krümmer. Der Sammler führt es zur Turbine.';
      } else if (step.step === 5) {
        s.badge = `Synchronisation · ${layout.valves} Ventile · ${layout.shortName}`;
        s.demoRpm = 2000;
      } else if (step.step === 6) {
        s.title = 'Gas geben: Mehr Diesel & Ladedruck';
        s.badge = 'Last, Einspritzmenge und Ladedruck';
      }
    } else if (step.step === 5) {
      s.badge = `Synchronisation · ${layout.valves} Ventile · ${layout.shortName}`;
    }
    return s;
  });
  return flowTour(profile, steps);
}

export const ENGINE_TOUR_STEPS = getTourStepsForProfile();
