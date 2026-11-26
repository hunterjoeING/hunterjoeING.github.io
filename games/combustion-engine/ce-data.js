// Verbrennungsmotor 3D (2.0L DOHC 16V Reihenvierzylinder) – Physik, 4-Takt-Zyklus, Bauteile & Tour
export const ENGINE_SPECS = {
  displacementL: 2.0,
  cylinders: 4,
  valves: 16,
  compressionRatio: '11,0 : 1',
  firingOrder: '1 – 3 – 4 – 2',
  idleRpm: 850,
  redlineRpm: 6500,
  maxRpm: 7000,
  maxTorqueNm: 265,
  maxPowerKW: 150
};

// Kurbelwellen-Phasenversatz (in Grad von 0..720) für Zündfolge 1-3-4-2:
// Zyklus pro Zylinder: 0-180° Ansaugen, 180-360° Verdichten, 360-540° Arbeiten, 540-720° Ausstoßen.
// Zyl 1 & 4 laufen im Gleichtakt (0°/360°), Zyl 2 & 3 um 180° versetzt (180°/540°).
export const CYLINDER_PHASE_OFFSETS = [0, 180, 540, 360];

/**
 * Berechnet Drehmoment (Nm), Leistung (kW / PS), Wirkungsgrad und Kraftstoffdurchsatz
 * eines modernen 2,0-Liter-Vierzylinder-Ottomotors über die Drehzahl n (U/min).
 */
export function computeEngineTelemetry(rpmInput) {
  const rpm = Math.max(0, Math.min(ENGINE_SPECS.maxRpm, Number(rpmInput) || 0));

  let torqueNm = 0;
  let status = 'off';
  let statusLabel = 'Motor aus';

  if (rpm < 200) {
    torqueNm = 0;
    status = 'off';
    statusLabel = 'Motor aus';
  } else {
    // Realistische Drehmoment-Kurve (breites Plateau zwischen 2.500 und 5.200 U/min)
    const x = rpm / 1000; // in Tsd. U/min
    const lowRise = 1 / (1 + Math.exp(-(x - 1.35) * 2.2));
    const peakBell = Math.exp(-Math.pow((x - 4.15) / 2.65, 2));
    const highDrop = rpm > 5600 ? Math.max(0.58, 1 - Math.pow((x - 5.6) / 2.2, 2) * 0.42) : 1;
    torqueNm = (128 + 137 * peakBell) * (0.62 + 0.38 * lowRise) * highDrop;

    if (rpm > ENGINE_SPECS.redlineRpm) {
      // Begrenzer-Abfall jenseits 6.500 U/min
      const over = (rpm - ENGINE_SPECS.redlineRpm) / 500;
      torqueNm *= Math.max(0.45, 1 - over * 0.48);
      status = 'redline';
      statusLabel = 'Drehzahlbegrenzer (> 6.500)';
    } else if (rpm < 1200) {
      torqueNm *= 0.45 + 0.55 * ((rpm - 200) / 1000);
      status = 'idle';
      statusLabel = 'Leerlauf';
    } else if (rpm >= 3400 && rpm <= 5000) {
      status = 'peakTorque';
      statusLabel = 'Max. Drehmoment-Bereich';
    } else if (rpm >= 5500) {
      status = 'peakPower';
      statusLabel = 'Nennleistungs-Bereich';
    } else {
      status = 'cruise';
      statusLabel = 'Teillast / Effizienzbereich';
    }
  }

  // P [kW] = M [Nm] * 2 * pi * n [U/min] / 60000
  const powerKW = (torqueNm * 2 * Math.PI * rpm) / 60000;
  const powerPS = powerKW * 1.35962;
  const ignitionsPerSec = (rpm / 60) * 2; // 4-Takt Vierzylinder: 2 Zündungen pro Kurbelwellenumdrehung

  // Thermischer Wirkungsgrad (typisch 20% im Leerlauf bis ~38% im optimalen Betriebspunkt)
  let thermalEff = 0;
  if (rpm >= 200) {
    const effCurve = 0.38 - 0.14 * Math.pow((rpm - 3100) / 3600, 2);
    thermalEff = Math.max(0.18, Math.min(0.39, effCurve));
  }

  return {
    rpm,
    torqueNm,
    powerKW,
    powerPS,
    ignitionsPerSec,
    thermalEff,
    status,
    statusLabel
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
    title: 'Explosionsansicht: Alle 12 Baugruppen',
    badge: 'Zündfolge 1-3-4-2 · 204 PS',
    viewMode: 'exploded',
    focusPart: 'crankshaft',
    demoRpm: 4200,
    demoTimeScale: 0.18,
    cameraPos: [10.8, 3.2, 11.8],
    cameraTarget: [0.0, 0.8, 0.0],
    body:
      'Alle 12 Baugruppen schweben beschriftet im Raum – und laufen trotzdem synchron weiter! Durch die Zündfolge 1-3-4-2 zündet alle 180° ein anderer Zylinder, sodass Kurbelwelle und Schwungrad ein rundes Drehmoment liefern.'
  }
];
