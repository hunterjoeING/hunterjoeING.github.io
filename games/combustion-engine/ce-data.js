// Verbrennungsmotor 3D (2.0L DOHC 16V Reihenvierzylinder) – Physik, 4-Takt-Zyklus, Bauteile & Tour
export const ENGINE_SPECS = {
  displacementL: 2.0,
  cylinders: 4,
  valves: 16,
  compressionRatio: '11,0 : 1',
  firingOrder: '1 – 3 – 4 – 2',
  idleRpm: 850,
  minRunningRpm: 200,
  redlineRpm: 6500,
  maxRpm: 7000,
  maxTorqueNm: 265,
  maxPowerKW: 150
};

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
  cruiseLoad: 0.30,
  targetLoad: 0.70,
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

// Kurbelwellen-Phasenversatz (in Grad von 0..720) für Zündfolge 1-3-4-2:
// Zyklus pro Zylinder: 0-180° Ansaugen, 180-360° Verdichten, 360-540° Arbeiten, 540-720° Ausstoßen.
// Zyl 1 & 4 laufen im Gleichtakt (0°/360°), Zyl 2 & 3 um 180° versetzt (180°/540°).
export const CYLINDER_PHASE_OFFSETS = [0, 180, 540, 360];

export const TORQUE_NM_PER_BAR = 15.915;
const FUEL_HEATING_VALUE = 42.7; // Unterer Heizwert in MJ/kg

function clamp(value, max) {
  return Math.max(0, Math.min(max, Number(value) || 0));
}

function smoothstep(a, b, value) {
  const t = clamp((value - a) / (b - a), 1);
  return t * t * (3 - 2 * t);
}

export function fullTorqueNm(rpmInput) {
  const { minRunningRpm, redlineRpm, maxRpm } = ENGINE_SPECS;
  const rpm = clamp(rpmInput, maxRpm);
  if (rpm < minRunningRpm) return 0;

  const x = rpm / 1000;
  const lowRise = 1 / (1 + Math.exp(-(x - 1.35) * 2.2));
  const peakBell = Math.exp(-Math.pow((x - 4.15) / 2.65, 2));
  const highDrop = rpm > 5600 ? Math.max(0.58, 1 - Math.pow((x - 5.6) / 2.2, 2) * 0.42) : 1;
  const torqueNm = (128 + 137 * peakBell) * (0.62 + 0.38 * lowRise) * highDrop;

  if (rpm > redlineRpm) {
    const over = (rpm - redlineRpm) / 500;
    return torqueNm * Math.max(0.45, 1 - over * 0.48);
  }
  if (rpm < 1200) return torqueNm * (0.45 + 0.55 * ((rpm - minRunningRpm) / 1000));
  return torqueNm;
}

function fuelModel(rpm, load, bmep) {
  const x = rpm / 1000;
  const fmep = 0.7 + 0.10 * x + 0.010 * x ** 2;
  const pmep = 1.7 * (1 - load) ** 1.6;
  const etaI = 0.398 - 0.030 * ((x - 2.6) / 3.2) ** 2;
  const knock = 1 - 0.07 * smoothstep(0.82, 1, load)
    - 0.012 * smoothstep(4.8, 6.4, x) * smoothstep(0.6, 1, load);
  return { totalPressureBar: bmep + fmep + pmep, indicatedEfficiency: etaI * knock };
}

// BSFC für einen 2,0-Liter-Turbo-Benziner: vereinfachtes Beispielkennfeld, keine Messdaten.
export function bsfcMap(rpmInput, loadInput) {
  const rpm = clamp(rpmInput, ENGINE_SPECS.maxRpm);
  const load = clamp(loadInput, 1);
  const bmep = load * fullTorqueNm(rpm) / TORQUE_NM_PER_BAR;
  if (bmep <= 0) return null;

  const { totalPressureBar, indicatedEfficiency } = fuelModel(rpm, load, bmep);
  const eta = indicatedEfficiency * bmep / totalPressureBar;
  return 3600 / (eta * FUEL_HEATING_VALUE);
}

export function thermalEfficiencyFromBsfc(bsfc) {
  return bsfc > 0 ? Math.min(0.40, 3600 / (bsfc * FUEL_HEATING_VALUE)) : 0;
}

function operatingStatus(rpm, load) {
  if (rpm < ENGINE_SPECS.minRunningRpm) return ['off', 'Motor aus'];
  if (rpm > ENGINE_SPECS.redlineRpm) return ['redline', 'Drehzahlbegrenzer (> 6.500)'];
  if (load < 0.03) {
    return ['idle', rpm < 1200 ? 'Leerlauf · keine Nutzleistung' : 'Schubbetrieb · keine Nutzleistung'];
  }
  if (rpm < 1200) return ['idle', 'Niedrige Drehzahl'];
  if (load < 0.9) return ['cruise', 'Teillast'];
  if (rpm >= 3400 && rpm <= 5000) return ['peakTorque', 'Volllast · max. Drehmoment-Bereich'];
  if (rpm >= 5500) return ['peakPower', 'Volllast · Nennleistungs-Bereich'];
  return ['cruise', 'Volllast'];
}

export function computeEngineTelemetry(rpmInput, loadInput = 1, driveFrame) {
  const rpm = clamp(rpmInput, ENGINE_SPECS.maxRpm);
  const load = clamp(loadInput, 1);
  const torqueNm = load * fullTorqueNm(rpm);
  const powerKW = (torqueNm * 2 * Math.PI * rpm) / 60000;
  const bsfc = bsfcMap(rpm, load);
  const [status, statusLabel] = operatingStatus(rpm, load);

  return {
    rpm,
    load,
    torqueNm,
    powerKW,
    powerPS: powerKW * 1.35962,
    // 4-Takt-Vierzylinder: zwei Zündungen pro Kurbelwellenumdrehung.
    ignitionsPerSec: status === 'off' ? 0 : (rpm / 60) * 2,
    bmepBar: torqueNm / TORQUE_NM_PER_BAR,
    bsfc,
    thermalEff: thermalEfficiencyFromBsfc(bsfc),
    noUsefulPower: powerKW === 0,
    status,
    statusLabel,
    ...(driveFrame
      ? drivetrainPoint(driveFrame.gear, rpm, driveFrame.driveMode,
        fuelLitersPerHour(rpm, load, powerKW), driveFrame.speedKmh)
      : computeDrivetrain(rpm, load, powerKW))
  };
}

export function speedKmh(rpm, gear) {
  const { gearRatios, finalDrive, wheelRadiusM } = DRIVETRAIN_EXAMPLE;
  const ratio = gearRatios[gear - 1];
  return ratio ? rpm / 60 * 2 * Math.PI * wheelRadiusM / (ratio * finalDrive) * 3.6 : 0;
}

export function roadLoadPowerKw(speedMps) {
  const { massKg, gravityMps2, rollingResistance, airDensityKgM3, dragAreaM2,
    drivetrainEfficiency } = DRIVETRAIN_EXAMPLE;
  const rollingPowerW = massKg * gravityMps2 * rollingResistance * speedMps;
  const dragPowerW = 0.5 * airDensityKgM3 * dragAreaM2 * speedMps ** 3;
  return (rollingPowerW + dragPowerW) / drivetrainEfficiency / 1000;
}

export function roadLoadTorqueNm(rpm, gear) {
  return rpm > 0 ? roadLoadPowerKw(speedKmh(rpm, gear) / 3.6) * 60000 / (2 * Math.PI * rpm) : 0;
}

function fuelLitersPerHour(rpm, load, powerKw) {
  if (rpm < ENGINE_SPECS.minRunningRpm || (load < 0.03 && rpm >= 1200)) return 0;
  // Derselbe Nm/bar-Faktor wie im BSFC-Kennfeld hält beide Verbrauchsrechnungen konsistent.
  const kwPerBar = TORQUE_NM_PER_BAR * 2 * Math.PI * rpm / 60000;
  const { totalPressureBar, indicatedEfficiency } = fuelModel(rpm, load, powerKw / kwPerBar);
  const fuelPowerKw = totalPressureBar * kwPerBar / indicatedEfficiency;
  return fuelPowerKw * 3600 / FUEL_HEATING_VALUE / DRIVETRAIN_EXAMPLE.fuelDensityGL;
}

const DRIVE_MODE_LABELS = {
  neutral: 'Stillstand',
  cruise: 'Konstantfahrt',
  accelerate: 'beschleunigt',
  coast: 'Schub'
};

function drivetrainPoint(gear, rpm, driveMode, fuelLph, speed = speedKmh(rpm, gear)) {
  const fuelL100Instant = driveMode !== 'neutral' && speed > 0 ? fuelLph * 100 / speed : null;
  return {
    gear,
    gearLabel: gear ? `${gear}. Gang` : 'N',
    speedKmh: speed,
    driveMode,
    driveModeLabel: DRIVE_MODE_LABELS[driveMode],
    fuelLph,
    fuelL100: driveMode === 'cruise' ? fuelL100Instant : null,
    fuelL100Instant,
    roadLoadKw: gear ? roadLoadPowerKw(speed / 3.6) : null
  };
}

// Erwartet die begrenzten Eingaben und die Nutzleistung aus computeEngineTelemetry.
export function computeDrivetrain(rpm, load, powerKw) {
  if (rpm < ENGINE_SPECS.minRunningRpm) return drivetrainPoint(0, rpm, 'neutral', 0);

  const lowLoad = load < 0.03;
  const fuelCut = lowLoad && rpm >= 1200;
  const fuelLph = fuelLitersPerHour(rpm, load, powerKw);
  if (lowLoad && !fuelCut) return drivetrainPoint(0, rpm, 'neutral', fuelLph);

  const { gearRatios, minCruiseKmh, minAccelerationKmh, maxSpeedKmh,
    minCruiseRatio, maxCruiseRatio, topGearCruiseRatio } = DRIVETRAIN_EXAMPLE;
  const candidates = gearRatios.map((_, i) => ({ gear: i + 1, speed: speedKmh(rpm, i + 1) }))
    .filter(({ speed }) => speed >= minCruiseKmh && speed <= maxSpeedKmh);
  const highest = candidates.at(-1);
  if (fuelCut) return drivetrainPoint(highest.gear, rpm, 'coast', 0);

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
    if (closest) return drivetrainPoint(closest, rpm, 'cruise', fuelLph);
    if (allBelowCruise) return drivetrainPoint(highest.gear, rpm, 'coast', fuelLph);

    // Im längsten Gang vor dem Kickdown etwas mehr Leistungsreserve zulassen.
    const highestRatio = powerKw / roadLoadPowerKw(highest.speed / 3.6);
    if (highest.gear === gearRatios.length && highestRatio > maxCruiseRatio && highestRatio <= topGearCruiseRatio) {
      return drivetrainPoint(highest.gear, rpm, 'cruise', fuelLph);
    }
  }

  const kickdown = candidates.find(({ speed }) => speed >= minAccelerationKmh);
  return drivetrainPoint(kickdown?.gear ?? 1, rpm, 'accelerate', fuelLph);
}

export function simulateDriveSequence({ startSpeedKmh, startGear, startLoad, targetLoad, durationS, dtS }) {
  const { gearRatios, finalDrive, wheelRadiusM, drivetrainEfficiency, massKg, gravityMps2,
    rollingResistance, airDensityKgM3, dragAreaM2, maxSpeedKmh } = DRIVETRAIN_EXAMPLE;
  const { redlineRpm } = ENGINE_SPECS;
  const { rotatingMassFactor, loadRampS, partLoadLimit, partLoadShiftRpm, fullLoadShiftRpm,
    minShiftRpm, cruiseAccelerationMps2, cruisePowerTolerance } = DRIVE_SEQUENCE_EXAMPLE;
  if (!Number.isInteger(startGear) || !gearRatios[startGear - 1] ||
      !Number.isFinite(durationS) || durationS < 0 || !Number.isFinite(dtS) || dtS <= 0) {
    throw new RangeError('Ungültige Fahrsequenz');
  }

  let gear = startGear;
  const speedLimit = () => Math.min(maxSpeedKmh, speedKmh(redlineRpm, gear));
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
    if (gear < gearRatios.length && speed > speedKmh(shiftRpm, gear) &&
        speed >= speedKmh(minShiftRpm, gear + 1)) gear++;

    const v = speed / 3.6;
    const rpm = Math.min(redlineRpm, speed / speedKmh(1, gear));
    const fullTorque = fullTorqueNm(rpm);
    const forcePerLoad = fullTorque * gearRatios[gear - 1] * finalDrive * drivetrainEfficiency / wheelRadiusM;
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

export function constantSpeedPoint(speed, gear) {
  const { minRunningRpm, redlineRpm } = ENGINE_SPECS;
  const rpm = speed / speedKmh(1, gear);
  if (!Number.isFinite(rpm) || rpm < minRunningRpm || rpm > redlineRpm || speed > DRIVETRAIN_EXAMPLE.maxSpeedKmh) return null;
  const roadLoadKw = roadLoadPowerKw(speed / 3.6);
  const load = roadLoadTorqueNm(rpm, gear) / fullTorqueNm(rpm);
  if (load > 1) return null;

  const driveMode = 'cruise';
  const { torqueNm, powerKW, bsfc, thermalEff, fuelLph, fuelL100 } =
    computeEngineTelemetry(rpm, load, { gear, speedKmh: speed, driveMode });
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

export function computeBsfcContours(levels = [235, 250, 270, 300, 350, 450]) {
  const rpmStep = 100;
  const loadCells = 50;
  const { minRunningRpm, maxRpm } = ENGINE_SPECS;
  const rpmCells = (maxRpm - minRunningRpm) / rpmStep;
  let optimum = { bsfc: Infinity };
  const grid = Array.from({ length: rpmCells + 1 }, (_, i) => {
    const rpm = minRunningRpm + i * rpmStep;
    return Array.from({ length: loadCells + 1 }, (_, j) => {
      const load = j / loadCells;
      const bsfc = bsfcMap(rpm, load);
      if (bsfc !== null && bsfc < optimum.bsfc) {
        optimum = { rpm, load, torqueNm: load * fullTorqueNm(rpm), bsfc };
      }
      return { rpm, load, efficiency: thermalEfficiencyFromBsfc(bsfc), id: i * (loadCells + 1) + j };
    });
  });

  const contours = levels.map(level => {
    const threshold = thermalEfficiencyFromBsfc(level);
    const nodes = new Map();
    function crossing(a, b) {
      if ((a.efficiency >= threshold) === (b.efficiency >= threshold)) return null;
      const key = Math.min(a.id, b.id) + ':' + Math.max(a.id, b.id);
      if (!nodes.has(key)) {
        // In η interpolieren, damit die Nulllastkante einen endlichen Rasterwert hat.
        const fraction = (threshold - a.efficiency) / (b.efficiency - a.efficiency);
        const rpm = a.rpm + fraction * (b.rpm - a.rpm);
        const load = a.load + fraction * (b.load - a.load);
        nodes.set(key, { point: { rpm, torqueNm: load * fullTorqueNm(rpm) }, neighbors: [] });
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
          const center = bsfcMap((a.rpm + c.rpm) / 2, (a.load + c.load) / 2);
          const centerInside = thermalEfficiencyFromBsfc(center) >= threshold;
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

export function computeDriveTourDemos(optimum = computeBsfcContours([]).optimum) {
  const { cruiseRpm, cruiseLoad, targetLoad, durationS, dtS, pedalDriveS, pedalLeadInS,
    pedalHoldS, drivePlaybackS, drivePlaybackExponent, comparisonSpeedKmh, comparisonGears,
    lowSpeedKmh, lowSpeedGear, comparisonPointS } = DRIVE_TOUR_EXAMPLE;
  const start = computeEngineTelemetry(cruiseRpm, cruiseLoad);
  const frames = simulateDriveSequence({
    startSpeedKmh: start.speedKmh, startGear: start.gear, startLoad: start.load,
    targetLoad, durationS, dtS
  });
  const pedalFrames = frames.filter(frame => frame.t <= pedalDriveS);
  const rampEnd = pedalFrames.find(frame => frame.t >= DRIVE_SEQUENCE_EXAMPLE.loadRampS);
  const end = frames.at(-1);
  const comparisons = comparisonGears.map(gear => constantSpeedPoint(comparisonSpeedKmh, gear));
  const lowSpeed = constantSpeedPoint(lowSpeedKmh, lowSpeedGear);
  const optimumPoint = computeEngineTelemetry(optimum.rpm, optimum.load);
  const optimumMode = optimumPoint.powerKW > optimumPoint.roadLoadKw ? 'accelerate' : optimumPoint.driveMode;
  const optimumFrame = {
    rpm: optimum.rpm, load: optimum.load, gear: optimumPoint.gear, speedKmh: optimumPoint.speedKmh,
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
    `${bsfc(specific)}, η ${load(thermalEff)}, ${power(powerKW)}, ${fuel(fuelL100Instant)}`;
  const endPoint = computeEngineTelemetry(end.rpm, end.load, end);
  const lowPoint = computeEngineTelemetry(lowSpeed.rpm, lowSpeed.load, lowSpeed);
  const first = comparisons[0];
  const last = comparisons.at(-1);

  return {
    pedal: {
      frames: pedalFrames, playbackS: pedalDriveS, leadInS: pedalLeadInS, holdS: pedalHoldS,
      resetOnFinish: true,
      body: `Das Pedal geht von ${load(start.load)} auf ${load(rampEnd.load)}. Die Drosselklappe öffnet, mehr Luft und Kraftstoff gelangen in die Zylinder. Das Nutzmoment steigt von ${torque(start.torqueNm)} auf ${torque(rampEnd.load * fullTorqueNm(rampEnd.rpm))}. Bei ${power(rampEnd.powerKw)} Nutzleistung und ${power(rampEnd.roadLoadKw)} Fahrwiderstand beschleunigt das Auto.`
    },
    equilibrium: {
      frames, playbackS: drivePlaybackS, timeExponent: drivePlaybackExponent,
      body: `Die Luftwiderstandskraft wächst mit v². Ihr Leistungsbedarf wächst mit v³, jener fürs Rollen mit v. Die Automatik schaltet hoch. Bei ${speed(end.speedKmh)} im ${end.gear}. Gang sind Nutzleistung (${power(end.powerKw)}) und Fahrwiderstandsleistung (${power(end.roadLoadKw)}) fast gleich. Das Auto fährt konstant weiter, bis du das Pedal verstellst.`
    },
    gearing: {
      frames: comparisons, playbackS: comparisons.length * comparisonPointS,
      body: `Am Drehzahlbegrenzer schafft der 1. Gang ${speed(speedKmh(ENGINE_SPECS.redlineRpm, 1))}. Bei ${speed(comparisonSpeedKmh)} senken längere Gänge die Drehzahl und erhöhen die Last. Vom ${first.gear}. zum ${last.gear}. Gang sinkt der spezifische Verbrauch von ${bsfc(first.bsfc)} auf ${bsfc(last.bsfc)} und der Streckenverbrauch von ${fuel(first.fuelL100)} auf ${fuel(last.fuelL100)}.`
    },
    map: {
      frames: [optimumFrame, lowSpeed, end], playbackS: 3 * comparisonPointS,
      body: `Im Optimum ist die Last hoch und der spezifische Verbrauch gering (${metrics(optimumPoint)} momentan). Bei ${speed(lowSpeed.speedKmh)} ist der Wirkungsgrad geringer (${metrics(lowPoint)}). Weil nur wenig Leistung nötig ist, sinkt der Streckenverbrauch. Zum Vergleich die Konstantfahrt bei ${speed(end.speedKmh)} (${metrics(endPoint)}).`
    }
  };
}

/**
 * Liefert den exakten 4-Takt-Zustand für einen Zylinder bei Kurbelwinkel crankDeg.
 */
export function getCylinderStroke(crankDeg, cylIndex) {
  const offset = CYLINDER_PHASE_OFFSETS[cylIndex] || 0;
  const cycle = (((crankDeg + offset) % 720) + 720) % 720;

  let index = 0;
  let name = 'Ansaugen';
  let short = '1. Ansaugen';
  let key = 'intake';
  let intakeLift = 0;
  let exhaustLift = 0;
  let sparkIntensity = 0;
  let flameIntensity = 0;
  let intakeMist = 0;
  let exhaustGas = 0;

  if (cycle < 180) {
    index = 0;
    name = 'Ansaugen';
    short = 'Ansaugen';
    key = 'intake';
    const t = cycle / 180;
    intakeLift = Math.sin(t * Math.PI);
    intakeMist = 0.25 + 0.75 * Math.sin(t * Math.PI * 0.85);
  } else if (cycle < 360) {
    index = 1;
    name = 'Verdichten';
    short = 'Verdichten';
    key = 'compression';
    const t = (cycle - 180) / 180;
    intakeMist = 0.55 + t * 0.45;
    // Frühzündung kurz vor OT (ca. 350°–360°)
    if (cycle > 348) {
      sparkIntensity = (cycle - 348) / 12;
    }
  } else if (cycle < 540) {
    index = 2;
    name = 'Arbeiten';
    short = 'Arbeiten';
    key = 'power';
    const t = (cycle - 360) / 180;
    if (cycle < 376) {
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
    exhaustLift = Math.sin(t * Math.PI);
    exhaustGas = 0.85 * (1 - t * 0.65);
  }

  return {
    cycle,
    index,
    key,
    name,
    short,
    intakeLift,
    exhaustLift,
    sparkIntensity,
    flameIntensity,
    intakeMist,
    exhaustGas
  };
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
    spec: '4 Schwingrohre · Drosselklappe · Einspritzdüsen',
    description:
      'Über den Ansaugtrakt strömt kühle Luft – dosiert durch die Drosselklappe – gleichmäßig zu allen vier Zylindern und mischt sich mit fein zerstäubtem Kraftstoff zu einem zündfähigen Gemisch.',
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
    name: 'Steuerkette & Stirnräder (1:2)',
    shortLabel: 'Steuertrieb',
    category: 'Ventiltrieb',
    energyStage: 'Feste Synchronisation Kurbel ↔ Nocke',
    spec: '2:1 Übersetzung · Spann- & Gleitschiene',
    description:
      'Die Steuerkette koppelt Kurbelwelle und Nockenwellen mechanisch exakt im Verhältnis 2:1. Nur so öffnen die Ventile niemals gleichzeitig mit dem hochkommenden Kolben.',
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

export const ENGINE_TOUR_STEPS = [
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
      'Die blauen Einlassventile werden von der Nockenwelle geöffnet, während sich der Kolben abwärts bewegt. Durch den Unterdruck strömt kühles Luft-Kraftstoff-Gemisch (blau) in den wachsenden Zylinderraum ein.'
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
    cameraPos: [4.8, 2.3, 6.0],
    cameraTarget: [0.0, 1.1, 0.0],
    body:
      'Kurz vor dem oberen Totpunkt feuert die Zündkerze einen 30.000-Volt-Funken. Das Gemisch verbrennt explosionsartig (goldorange Flamme) und drückt den Kolben mit über 80 bar Druck kraftvoll nach unten!'
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
      'Im Röntgenblick siehst du den Gaswechsel durch den gesamten Motor: Die bronzefarbenen Auslassventile öffnen sich und der aufsteigende Kolben schiebt das heiße Abgas durch den 4-in-1-Fächerkrümmer hinaus.'
  },
  {
    step: 5,
    title: 'DOHC-Ventiltrieb & 2:1-Steuerkette',
    badge: 'Synchronisation · 16 Ventile',
    viewMode: 'cutaway',
    focusPart: 'timingDrive',
    demoRpm: 2600,
    demoTimeScale: 0.16,
    cameraPos: [-7.4, 2.6, 5.8],
    cameraTarget: [-1.8, 1.3, 0.0],
    body:
      'Vorne verbindet die Steuerkette die Kurbelwelle mit den beiden doppelt so großen Nockenwellenrädern (Übersetzung 2:1). Ein kompletter 4-Takt-Zyklus dauert genau zwei Kurbelwellenumdrehungen (720°).'
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
