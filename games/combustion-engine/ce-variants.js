// Verbrennungsmotor 3D – Bauformen (R4, Boxer B4, V6, V8) & Konzepte (Otto-Sauger, Turbodiesel DI)

export const ENGINE_LAYOUTS = {
  r4: {
    id: 'r4',
    shortName: 'R4',
    name: 'Reihen-4',
    fullName: 'Reihenvierzylinder',
    cylinders: 4,
    valves: 16,
    displacementL: 2.0,
    firingOrder: '1 – 3 – 4 – 2',
    bankConfigLabel: '0° Reihe · DOHC 16V',
    bankAnglesDeg: [0],
    // Zyklus pro Zylinder (0..720°): Zündung bei 360° -> Zündfolge 1–3–4–2 alle 180°
    cylinderSpecs: [
      { index: 0, number: 1, x: -2.1, bankIndex: 0, bankAngleDeg: 0, phaseDeg: 0, crankPinAngleDeg: 0 },
      { index: 1, number: 2, x: -0.7, bankIndex: 0, bankAngleDeg: 0, phaseDeg: 180, crankPinAngleDeg: 180 },
      { index: 2, number: 3, x: 0.7, bankIndex: 0, bankAngleDeg: 0, phaseDeg: 540, crankPinAngleDeg: 180 },
      { index: 3, number: 4, x: 2.1, bankIndex: 0, bankAngleDeg: 0, phaseDeg: 360, crankPinAngleDeg: 0 }
    ],
    cameraScale: 1.0,
    crankLength: 6.45,
    timingX: -3.16,
    flywheelX: 3.32
  },
  boxer4: {
    id: 'boxer4',
    shortName: 'Boxer',
    name: 'Boxer-4',
    fullName: 'Vierzylinder-Boxermotor',
    cylinders: 4,
    valves: 16,
    displacementL: 2.0,
    firingOrder: '1 – 3 – 2 – 4',
    bankConfigLabel: '180° Boxer · DOHC 16V',
    bankAnglesDeg: [-90, 90],
    // Echter 180°-Boxer: Gegenüberliegende Kolben (1&2 sowie 3&4) haben getrennte,
    // um 180° versetzte Hubzapfen -> echte gegenläufige „Box“-Bewegung (symmetrisch alle 180°)!
    // Prüfung: pinAngle = (phaseDeg + bankAngleDeg) mod 360
    cylinderSpecs: [
      { index: 0, number: 1, x: -1.45, bankIndex: 0, bankAngleDeg: -90, phaseDeg: 0, crankPinAngleDeg: 270 },
      { index: 1, number: 2, x: -0.85, bankIndex: 1, bankAngleDeg: 90, phaseDeg: 360, crankPinAngleDeg: 90 },
      { index: 2, number: 3, x: 0.85, bankIndex: 0, bankAngleDeg: -90, phaseDeg: 540, crankPinAngleDeg: 90 },
      { index: 3, number: 4, x: 1.45, bankIndex: 1, bankAngleDeg: 90, phaseDeg: 180, crankPinAngleDeg: 270 }
    ],
    cameraScale: 1.18,
    crankLength: 5.2,
    timingX: -2.55,
    flywheelX: 2.7
  },
  v6: {
    id: 'v6',
    shortName: 'V6',
    name: 'V6 (60°)',
    fullName: '60°-V6-Motor',
    cylinders: 6,
    valves: 24,
    displacementL: 3.0,
    firingOrder: '1 – 2 – 3 – 4 – 5 – 6',
    bankConfigLabel: '60° V-Motor · DOHC 24V',
    bankAnglesDeg: [-30, 30],
    // Moderner Even-Fire 60°-V6 mit 60°-Split-Pin-Kurbelwelle (Zündabstand exakt 120°)
    // Prüfung: pinAngle = (phaseDeg + bankAngleDeg) mod 360
    cylinderSpecs: [
      { index: 0, number: 1, x: -1.78, bankIndex: 0, bankAngleDeg: -30, phaseDeg: 360, crankPinAngleDeg: 330 },
      { index: 1, number: 2, x: -1.32, bankIndex: 1, bankAngleDeg: 30, phaseDeg: 240, crankPinAngleDeg: 270 },
      { index: 2, number: 3, x: -0.22, bankIndex: 0, bankAngleDeg: -30, phaseDeg: 120, crankPinAngleDeg: 90 },
      { index: 3, number: 4, x: 0.22, bankIndex: 1, bankAngleDeg: 30, phaseDeg: 0, crankPinAngleDeg: 30 },
      { index: 4, number: 5, x: 1.32, bankIndex: 0, bankAngleDeg: -30, phaseDeg: 600, crankPinAngleDeg: 210 },
      { index: 5, number: 6, x: 1.78, bankIndex: 1, bankAngleDeg: 30, phaseDeg: 480, crankPinAngleDeg: 150 }
    ],
    cameraScale: 1.14,
    crankLength: 5.65,
    timingX: -2.78,
    flywheelX: 2.95
  },
  v8: {
    id: 'v8',
    shortName: 'V8',
    name: 'V8 (90°)',
    fullName: '90°-Crossplane-V8',
    cylinders: 8,
    valves: 32,
    displacementL: 4.0,
    firingOrder: '1 – 8 – 4 – 3 – 6 – 5 – 7 – 2',
    bankConfigLabel: '90° Crossplane V8 · DOHC 32V',
    bankAnglesDeg: [45, -45],
    // Klassischer 90°-Crossplane-V8: 4 gemeinsame Hubzapfen (45°, 135°, 315°, 225°),
    // je 2 Pleuel nebeneinander auf einem Hubzapfen, gleichmäßige Zündung alle 90°.
    cylinderSpecs: [
      { index: 0, number: 1, x: -2.28, bankIndex: 0, bankAngleDeg: 45, phaseDeg: 360, crankPinAngleDeg: 45 },
      { index: 1, number: 2, x: -1.86, bankIndex: 1, bankAngleDeg: -45, phaseDeg: 450, crankPinAngleDeg: 45 },
      { index: 2, number: 3, x: -0.88, bankIndex: 0, bankAngleDeg: 45, phaseDeg: 90, crankPinAngleDeg: 135 },
      { index: 3, number: 4, x: -0.46, bankIndex: 1, bankAngleDeg: -45, phaseDeg: 180, crankPinAngleDeg: 135 },
      { index: 4, number: 5, x: 0.46, bankIndex: 0, bankAngleDeg: 45, phaseDeg: 630, crankPinAngleDeg: 315 },
      { index: 5, number: 6, x: 0.88, bankIndex: 1, bankAngleDeg: -45, phaseDeg: 0, crankPinAngleDeg: 315 },
      { index: 6, number: 7, x: 1.86, bankIndex: 0, bankAngleDeg: 45, phaseDeg: 540, crankPinAngleDeg: 225 },
      { index: 7, number: 8, x: 2.28, bankIndex: 1, bankAngleDeg: -45, phaseDeg: 270, crankPinAngleDeg: 225 }
    ],
    cameraScale: 1.24,
    crankLength: 6.7,
    timingX: -3.32,
    flywheelX: 3.48
  }
};

export const ENGINE_CONCEPTS = {
  otto: {
    id: 'otto',
    shortName: 'Otto-Sauger',
    name: 'Otto-Saugmotor (Saugrohreinspritzung)',
    fuelLabel: 'Benzin',
    hasTurbo: false,
    hasThrottle: true,
    hasSparkPlugs: true,
    directInjection: false,
    compressionRatio: '11,0 : 1',
    idleRpm: 850,
    minRunningRpm: 200,
    redlineRpm: 6500,
    maxRpm: 7000,
    fuelHeatingValueMJkg: 42.7,
    fuelDensityGL: 745,
    maxEfficiencyCap: 0.40,
    finalDrive: 3.2,
    contourLevels: [250, 260, 280, 300, 350, 450],
    contourLabelRpms: [3675, 1850, 3900, 4850, 5800, 5100],
    loadHelp: 'Das Pedal öffnet die Drosselklappe und stellt hier zugleich die Motorlast ein.',
    mapNoteTemplate: 'Vereinfachtes Beispielkennfeld für einen klassischen {disp} {layoutName} Saugbenziner mit Saugrohreinspritzung, keine Messdaten.'
  },
  diesel: {
    id: 'diesel',
    shortName: 'Turbodiesel',
    name: 'Turbodiesel (Common-Rail DI + VTG-Turbo)',
    fuelLabel: 'Diesel',
    hasTurbo: true,
    hasThrottle: false,
    hasSparkPlugs: false,
    directInjection: true,
    compressionRatio: '16,5 : 1',
    idleRpm: 750,
    minRunningRpm: 200,
    redlineRpm: 4500,
    maxRpm: 5000,
    fuelHeatingValueMJkg: 42.6,
    fuelDensityGL: 835,
    maxEfficiencyCap: 0.48,
    finalDrive: 2.48,
    contourLevels: [205, 215, 230, 255, 300, 400],
    contourLabelRpms: [2400, 1550, 2850, 3450, 4050, 3600],
    loadHelp: 'Ohne Drosselklappe dosiert das Pedal direkt die Einspritzmenge – der VTG-Turbolader baut lastabhängig Ladedruck auf.',
    mapNoteTemplate: 'Vereinfachtes Beispielkennfeld für einen {disp} {layoutName} Turbodiesel mit Common-Rail-Direkteinspritzung, keine Messdaten.'
  }
};

export const DEFAULT_ENGINE_CONFIG = { layout: 'r4', concept: 'otto' };

function clamp01(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

function smoothstep(a, b, value) {
  const t = clamp01((value - a) / (b - a));
  return t * t * (3 - 2 * t);
}

/**
 * Erzeugt ein vollständiges physikalisches Motorprofil für jede Kombination
 * aus Bauform (r4, boxer4, v6, v8) und Antriebskonzept (otto, diesel).
 * Für den Standardfall (r4 + otto) sind sämtliche Kennwerte bitgenau identisch zu v0.3.1.
 */
export function buildEngineProfile(layoutId = 'r4', conceptId = 'otto') {
  const layout = ENGINE_LAYOUTS[layoutId] || ENGINE_LAYOUTS.r4;
  const concept = ENGINE_CONCEPTS[conceptId] || ENGINE_CONCEPTS.otto;
  const dispScale = layout.displacementL / 2.0;
  const isDefaultR4Otto = layout.id === 'r4' && concept.id === 'otto';

  // Nm/bar skaliert exakt mit dem Hubraum: V_h [dm³] * 100 / (4π) ≈ 7.9577 * V_h
  const torqueNmPerBar = isDefaultR4Otto ? 15.915 : Number((15.915 * dispScale).toFixed(3));
  const boxerBonus = layout.id === 'boxer4' && concept.id === 'otto' ? 1.03 : 1.0;

  // Volllast-Drehmomentkurve
  function fullTorqueNmForProfile(rpmInput) {
    const rpm = Math.max(0, Math.min(concept.maxRpm, Number(rpmInput) || 0));
    if (rpm < concept.minRunningRpm) return 0;
    const x = rpm / 1000;

    if (concept.id === 'otto') {
      const lowRise = smoothstep(concept.minRunningRpm, 2000, rpm);
      const peakOffset = (x - 4.25) / 2.65;
      const baseTorque = (125 + 75 * Math.exp(-(peakOffset ** 2))) * dispScale * boxerBonus;
      const highDrop = 1 - 0.12 * smoothstep(5900, 7200, rpm);
      const limiter = 1 - 0.48 * smoothstep(concept.redlineRpm, concept.maxRpm, rpm);
      return baseTorque * lowRise * highDrop * limiter;
    }

    // Turbodiesel (Common-Rail + VTG-Turbolader):
    // Deutliches Turboloch unter 1.250 U/min, starkes Plateau 1.750–2.800 U/min (~380 Nm @ 2,0 l),
    // sanfter Abfall ab 3.200 U/min, Begrenzer ab 4.500 U/min.
    const lowRise = smoothstep(concept.minRunningRpm, 1150, rpm);
    const turboSpool = 0.46 + 0.54 * smoothstep(1050, 1850, rpm);
    const plateau = 0.86 + 0.14 * Math.exp(-(((x - 2.25) / 1.15) ** 2));
    const topFade = 1 - 0.34 * smoothstep(2850, 4650, rpm);
    const limiter = 1 - 0.58 * smoothstep(concept.redlineRpm, concept.maxRpm, rpm);
    const baseDieselNm = 385 * dispScale * (layout.id === 'boxer4' ? 0.96 : 1.0);
    return baseDieselNm * lowRise * turboSpool * plateau * topFade * limiter;
  }

  // Reibung, Ladungswechsel & indizierter Wirkungsgrad
  function fuelModelForProfile(rpm, load, bmep) {
    const x = rpm / 1000;
    if (concept.id === 'otto') {
      const fmep = 0.78 + 0.08 * x + 0.014 * x ** 2;
      const pmep = 1.53 * (1 - load ** 1.7);
      const etaI = 0.404 - 0.030 * ((x - 2.7) / 3.2) ** 2;
      const knock = 1 - 0.085 * smoothstep(0.78, 1, load)
        - 0.035 * smoothstep(5, 6.5, x) * smoothstep(0.8, 1, load);
      return { totalPressureBar: bmep + fmep + pmep, indicatedEfficiency: etaI * knock };
    }

    // Turbodiesel: keine Drosselklappe -> minimaler PMEP, höhere Kompression -> höheres η_i (~45,2 %),
    // leicht steigende Reibung durch robuste Lagerung & Hochdruckpumpe.
    const fmep = 0.95 + 0.11 * x + 0.022 * x ** 2;
    const pmep = 0.34 * (1 - load ** 1.4) + 0.08 * x * 0.25;
    const etaI = 0.452 - 0.036 * ((x - 2.15) / 2.2) ** 2;
    const smokeLimit = 1 - 0.045 * smoothstep(0.86, 1.0, load) * smoothstep(3.3, 4.6, x);
    return { totalPressureBar: bmep + fmep + pmep, indicatedEfficiency: etaI * smokeLimit };
  }

  // Ladedruck (Überdruck in bar) für Turbodiesel
  function boostBarForProfile(rpmInput, loadInput) {
    if (!concept.hasTurbo) return 0;
    const rpm = Math.max(0, Math.min(concept.maxRpm, Number(rpmInput) || 0));
    const load = clamp01(loadInput);
    if (rpm < concept.minRunningRpm) return 0;
    const spool = smoothstep(900, 1950, rpm);
    const highDrop = 1 - 0.14 * smoothstep(3800, 4900, rpm);
    const maxBoost = layout.cylinders >= 6 ? 1.85 : 1.65;
    return maxBoost * spool * highDrop * (0.08 + 0.92 * (load ** 1.15));
  }

  // Maxima & gerundete Voreinstellungen direkt aus der Kurve bestimmen
  let maxTorqueNm = 0;
  let peakTorqueRpm = 0;
  let maxPowerKW = 0;
  let peakPowerRpm = 0;
  for (let r = concept.minRunningRpm; r <= concept.maxRpm; r += 25) {
    const t = fullTorqueNmForProfile(r);
    const p = (t * 2 * Math.PI * r) / 60000;
    if (t > maxTorqueNm) { maxTorqueNm = t; peakTorqueRpm = r; }
    if (p > maxPowerKW) { maxPowerKW = p; peakPowerRpm = r; }
  }

  const roundedMaxTorque = isDefaultR4Otto ? 200 : Math.round(maxTorqueNm);
  const roundedMaxPower = isDefaultR4Otto ? 109 : Math.round(maxPowerKW);
  const presetPeakTorqueRpm = isDefaultR4Otto ? 4250 : Math.round(peakTorqueRpm / 50) * 50;
  const presetPeakPowerRpm = isDefaultR4Otto ? 5950 : Math.round(peakPowerRpm / 50) * 50;
  const cruiseRpm = isDefaultR4Otto ? 2400 : (concept.id === 'diesel' ? 1800 : (layout.cylinders >= 6 ? 2100 : 2400));
  const cruiseLoad = isDefaultR4Otto ? 0.38 : (concept.id === 'diesel' ? Math.max(0.16, Math.round((0.36 / dispScale) * 100) / 100) : Math.max(0.18, Math.round((0.38 / dispScale) * 100) / 100));

  const dispText = `${layout.displacementL.toFixed(1).replace('.', ',')} l`;
  const finalDrive = isDefaultR4Otto
    ? 3.2
    : Number((concept.finalDrive / (1 + (dispScale - 1) * 0.12)).toFixed(2));

  return {
    key: `${layout.id}_${concept.id}`,
    layout,
    concept,
    isDefaultR4Otto,
    specs: {
      displacementL: layout.displacementL,
      cylinders: layout.cylinders,
      valves: layout.valves,
      compressionRatio: concept.compressionRatio,
      firingOrder: layout.firingOrder,
      idleRpm: concept.idleRpm,
      minRunningRpm: concept.minRunningRpm,
      redlineRpm: concept.redlineRpm,
      maxRpm: concept.maxRpm,
      maxTorqueNm: roundedMaxTorque,
      maxPowerKW: roundedMaxPower
    },
    torqueNmPerBar,
    fuelHeatingValueMJkg: concept.fuelHeatingValueMJkg,
    fuelDensityGL: concept.fuelDensityGL,
    maxEfficiencyCap: concept.maxEfficiencyCap,
    finalDrive,
    contourLevels: concept.contourLevels,
    contourLabelRpms: concept.contourLabelRpms,
    presets: [
      { label: 'Leerlauf', rpm: concept.idleRpm, load: 0 },
      { label: 'Cruise', rpm: cruiseRpm, load: Math.round(cruiseLoad * 100) },
      { label: 'Max Nm', rpm: presetPeakTorqueRpm, load: 100 },
      { label: 'Max kW', rpm: presetPeakPowerRpm, load: 100 }
    ],
    cruiseRpm,
    cruiseLoad,
    shiftThresholds: concept.id === 'diesel'
      ? { partLoadShiftRpm: 2250, fullLoadShiftRpm: 3950, minShiftRpm: 1150 }
      : { partLoadShiftRpm: 3000, fullLoadShiftRpm: 5500, minShiftRpm: 1300 },
    peakTorqueBand: concept.id === 'diesel' ? [1650, 2900] : [3800, 4700],
    peakPowerMinRpm: concept.id === 'diesel' ? 3700 : 5700,
    subtitle: `${dispText} · ${layout.bankConfigLabel}`,
    badgeLabel: `${layout.shortName} · ${concept.shortName}`,
    mapNote: concept.mapNoteTemplate
      .replace('{disp}', dispText)
      .replace('{layoutName}', layout.fullName),
    fullTorqueNm: fullTorqueNmForProfile,
    fuelModel: fuelModelForProfile,
    boostBar: boostBarForProfile
  };
}
