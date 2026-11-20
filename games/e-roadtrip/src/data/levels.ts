import { LevelConfig, ScoringWeights } from '../types';

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  time: 0.30,
  cost: 0.25,
  stress: 0.20,
  efficiency: 0.15,
  decisions: 0.10
};

export const LEVELS: LevelConfig[] = [
  {
    id: 'level_1_aachen_hannover',
    order: 1,
    title: 'Level 1: Aachen ↔ Hannover Messe',
    subtitle: 'Tages-Geschäftstrip hin & zurück · ~716 km',
    badge: 'Spielbar · Vollversion',
    playable: true,
    regionLabel: 'A4 → A1 → A2 (DE)',
    startBudgetEur: 26000,
    rewardBaseEur: 6500,
    departureTimeHour: 7.0, // 07:00 Abfahrt am Aachener Dom
    targetArrivalMinutes: 585, // 9h 45min Gesamtreisezeit inkl. Laden & Wendepunkt
    startCityId: 'aachen',
    destinationCityId: 'aachen',
    routeLegs: [
      {
        edgeId: 'edge_aachen_koeln',
        defaultTargetSpeedKmh: 130,
        weatherOverride: 'clear',
        isNightLeg: false,
        citySegmentAtStart: 'aachen_start'
      },
      {
        edgeId: 'edge_koeln_kamen',
        defaultTargetSpeedKmh: 125,
        weatherOverride: 'clear',
        isNightLeg: false
      },
      {
        edgeId: 'edge_kamen_bielefeld',
        defaultTargetSpeedKmh: 130,
        weatherOverride: 'clear',
        isNightLeg: false
      },
      {
        edgeId: 'edge_bielefeld_hannover',
        defaultTargetSpeedKmh: 130,
        weatherOverride: 'clear',
        isNightLeg: false,
        citySegmentAtEnd: 'hannover_messe'
      },
      // Rückfahrt Hannover Messe -> Aachen (mit Regenfront & Abenddämmerung/Nacht!)
      {
        edgeId: 'edge_bielefeld_hannover',
        reverse: true,
        defaultTargetSpeedKmh: 125,
        weatherOverride: 'rain',
        isNightLeg: false
      },
      {
        edgeId: 'edge_kamen_bielefeld',
        reverse: true,
        defaultTargetSpeedKmh: 120,
        weatherOverride: 'rain',
        isNightLeg: false
      },
      {
        edgeId: 'edge_koeln_kamen',
        reverse: true,
        defaultTargetSpeedKmh: 120,
        weatherOverride: 'clear',
        isNightLeg: true
      },
      {
        edgeId: 'edge_aachen_koeln',
        reverse: true,
        defaultTargetSpeedKmh: 130,
        weatherOverride: 'clear',
        isNightLeg: true,
        citySegmentAtEnd: 'aachen_finish'
      }
    ],
    passengers: {
      label: 'Du & Partnerin (Co-Pilot per Freisprechanlage / Rückfahrt)',
      hasWife: true,
      childrenCount: 0,
      hasDog: false,
      initialStress: 14,
      stressSensitivity: 1.0
    },
    scoringWeights: { ...DEFAULT_SCORING_WEIGHTS },
    allowedVehicleIds: ['mg4_standard', 'tesla_model_s_2015', 'vw_id3_pro', 'tesla_model_3_highland', 'tesla_model_y_lr', 'kia_ev6_gtline', 'vw_id7_tourer', 'porsche_taycan'],
    specialRulesSummary: [
      'Startbudget: 26.000 € – wähle MG4 Standard (LFP) oder den gebrauchten Tesla Model S 85 (2015)',
      'Hin- & Rückfahrt an einem Tag (~716 km) über A4, A1 (Kamener Kreuz) & A2',
      'Rückfahrt am Nachmittag/Abend mit Regenfront & Nachtfahrt-Finale nach Aachen',
      'Lade-Abos clever kombinieren (Tesla SuC, EnBW M/L, EWE Go @ McDonald’s, Electra+, IONITY)'
    ],
    briefingText:
      'Um 07:00 Uhr startest du am Aachener Dom zur Hannover Messe. Nach dem Messe-Turnaround geht es am selben Abend bei einsetzendem Regen und Dunkelheit zurück nach Aachen. Plane Ladestopps, Abos und Reisetempo so, dass Zeit, Kosten, Effizienz und Nerven perfekt balanciert sind!',
    eventPoolIds: [
      'evt_stau_kamen',
      'evt_accident_help',
      'evt_rain_front',
      'evt_wc_coffee',
      'evt_speed_trap',
      'evt_charger_defect'
    ],
    wifeDialogueIds: ['dlg_diesel_remark', 'dlg_tight_buffer']
  },

  {
    id: 'level_2_family_summer',
    order: 2,
    title: 'Level 2: Familien-Sommerurlaub',
    subtitle: 'Ehefrau, 2 Kinder & Hund · Südfrankreich / Alpen',
    badge: 'Kuratiertes Szenario · Struktur bereit',
    playable: false,
    regionLabel: 'Aachen → Paris / Côte d’Azur',
    startBudgetEur: 32000,
    rewardBaseEur: 8000,
    departureTimeHour: 5.5,
    targetArrivalMinutes: 720,
    startCityId: 'aachen',
    destinationCityId: 'paris',
    routeLegs: [
      { edgeId: 'edge_aachen_paris', defaultTargetSpeedKmh: 120, weatherOverride: 'clear' }
    ],
    passengers: {
      label: 'Ehefrau + 2 kleine Kinder + Hund',
      hasWife: true,
      childrenCount: 2,
      hasDog: true,
      initialStress: 22,
      stressSensitivity: 1.55
    },
    scoringWeights: {
      time: 0.20,
      cost: 0.20,
      stress: 0.35, // starke Stress-Gewichtung!
      efficiency: 0.15,
      decisions: 0.10
    },
    specialRulesSummary: [
      'Starke Stress-Gewichtung (35 %) durch Kinder, Hund & Ehefrau',
      'Nachtfahrt-Option: Kinder schlafen, wachen aber bei JEDEM Ladestopp wütend auf',
      'Zufällige Familien-Events („Fahr nicht so schnell!“, „Sie hat mein Tablet genommen!“)',
      'EWE Go @ McDonald’s senkt Familien-Stress spürbar'
    ],
    briefingText:
      'Mit zwei Kindern und Hund auf der Rückbank zählt jede ruhige Ladepause doppelt. Schlichte Tablet-Streits und vermeide „Mit einem Diesel wäre das viel besser gegangen!“-Eskalationen.',
    eventPoolIds: ['evt_family_tablet', 'evt_wc_coffee', 'evt_stau_kamen'],
    wifeDialogueIds: ['dlg_diesel_remark', 'dlg_tight_buffer']
  },

  {
    id: 'level_3_alps_winter',
    order: 3,
    title: 'Level 3: Winter-Alpenüberquerung',
    subtitle: 'Schneeketten, Pass vs. Tunnel & Kälteverbrauch',
    badge: 'Kuratiertes Szenario · Struktur bereit',
    playable: false,
    regionLabel: 'München → Brenner / Alpen',
    startBudgetEur: 38000,
    rewardBaseEur: 9500,
    departureTimeHour: 6.0,
    targetArrivalMinutes: 310,
    startCityId: 'muenchen',
    destinationCityId: 'innsbruck',
    routeLegs: [
      { edgeId: 'edge_muenchen_innsbruck', defaultTargetSpeedKmh: 100, weatherOverride: 'snow' }
    ],
    passengers: {
      label: 'Winter-Skiurlaub Crew',
      hasWife: true,
      childrenCount: 1,
      hasDog: false,
      initialStress: 18,
      stressSensitivity: 1.25
    },
    requiresWinterTires: true,
    scoringWeights: {
      time: 0.25,
      cost: 0.20,
      stress: 0.25,
      efficiency: 0.20,
      decisions: 0.10
    },
    specialRulesSummary: [
      'Winterreifen & Schneeketten-Pflicht am Pass',
      '+28 % Kälte- & Schneeverbrauch plus Rekuperations-Reduktion',
      'Vignette / Pickerl kaufen oder hohes Bußgeld riskieren'
    ],
    briefingText:
      'Eisige Temperaturen, Schneefall am Brenner und steile Rampen fordern Wärmepumpe und Ladeplanung heraus.',
    eventPoolIds: ['evt_vignette_check', 'evt_rain_front', 'evt_accident_help'],
    wifeDialogueIds: ['dlg_diesel_remark']
  },

  {
    id: 'level_4_scotland_highlands',
    order: 4,
    title: 'Level 4: Scotland Highlands',
    subtitle: 'DC-Ladewüste & langsame 11-kW-Dorflader',
    badge: 'Kuratiertes Szenario · Struktur bereit',
    playable: false,
    regionLabel: 'Amsterdam → Eurotunnel → Highlands',
    startBudgetEur: 42000,
    rewardBaseEur: 11000,
    departureTimeHour: 7.5,
    targetArrivalMinutes: 860,
    startCityId: 'amsterdam',
    destinationCityId: 'edinburgh',
    routeLegs: [
      { edgeId: 'edge_amsterdam_highlands', defaultTargetSpeedKmh: 105, weatherOverride: 'fog' }
    ],
    passengers: {
      label: 'Entdecker-Duo',
      hasWife: true,
      childrenCount: 0,
      hasDog: false,
      initialStress: 20,
      stressSensitivity: 1.2
    },
    scoringWeights: {
      time: 0.20,
      cost: 0.20,
      stress: 0.25,
      efficiency: 0.25,
      decisions: 0.10
    },
    specialRulesSummary: [
      'Kaum DC-Schnelllader: oft nur langsame Dorflader (AC 11/22 kW)',
      'Maximale Reichweitenangst & Effizienz-Optimierung (25 % Gewicht!)'
    ],
    briefingText:
      'Im Nebel der schottischen Highlands zählt jedes gesparte Watt – sonst hängst du stundenlang am Dorflader.',
    eventPoolIds: ['evt_charger_defect', 'evt_rain_front'],
    wifeDialogueIds: ['dlg_diesel_remark', 'dlg_tight_buffer']
  },

  {
    id: 'level_5_ecannonball',
    order: 5,
    title: 'Level 5: e-Cannonball Rally',
    subtitle: 'Vollgas, 800V-Ladekurve & Null Stress-Gewicht',
    badge: 'Kuratiertes Szenario · Struktur bereit',
    playable: false,
    regionLabel: 'Köln → München (570 km Sprint)',
    startBudgetEur: 55000,
    rewardBaseEur: 14000,
    departureTimeHour: 4.0,
    targetArrivalMinutes: 270,
    startCityId: 'koeln',
    destinationCityId: 'muenchen',
    routeLegs: [
      { edgeId: 'edge_koeln_muenchen', defaultTargetSpeedKmh: 195, weatherOverride: 'clear' }
    ],
    passengers: {
      label: 'Rallye Co-Pilot (Chronometer)',
      hasWife: false,
      childrenCount: 0,
      hasDog: false,
      initialStress: 0,
      stressSensitivity: 0
    },
    scoringWeights: {
      time: 0.55,
      cost: 0.10,
      stress: 0.00, // Stress-Gewicht = 0!
      efficiency: 0.25, // Optimale Ladekurve 10-60%!
      decisions: 0.10
    },
    specialRulesSummary: [
      'Stress-Gewicht = 0 %: Maximale Geschwindigkeit & kürzeste Ladefenster (10–55 % SoC)!',
      'Hohes Blitzer- & Ticket-Risiko wird einkalkuliert',
      'Porsche Taycan oder Kia EV6 (800V) glänzen hier extrem'
    ],
    briefingText:
      'Vorgegebene Rallye-Strecke auf Bestzeit. Reite die Ladekurve zwischen 8 % und 55 % perfekt aus!',
    eventPoolIds: ['evt_speed_trap', 'evt_charger_defect', 'evt_stau_kamen'],
    wifeDialogueIds: []
  },

  {
    id: 'level_6_caravan_italy',
    order: 6,
    title: 'Level 6: Wohnwagen nach Italien',
    subtitle: 'Gespann-Verbrauch, Abkuppeln & Carabinieri-Kontrolle',
    badge: 'Kuratiertes Szenario · Struktur bereit',
    playable: false,
    regionLabel: 'Brenner → Italien / Rom',
    startBudgetEur: 48000,
    rewardBaseEur: 13000,
    departureTimeHour: 6.0,
    targetArrivalMinutes: 640,
    startCityId: 'innsbruck',
    destinationCityId: 'rom',
    routeLegs: [
      { edgeId: 'edge_innsbruck_rom', defaultTargetSpeedKmh: 90, weatherOverride: 'clear' }
    ],
    trailerWeightKg: 1350,
    passengers: {
      label: 'Familie mit 1.350 kg Wohnwagen',
      hasWife: true,
      childrenCount: 2,
      hasDog: false,
      initialStress: 24,
      stressSensitivity: 1.4
    },
    scoringWeights: {
      time: 0.20,
      cost: 0.25,
      stress: 0.30,
      efficiency: 0.15,
      decisions: 0.10
    },
    specialRulesSummary: [
      'Wohnwagen (+55 % Verbrauch, max 90–100 km/h) – „Hinter LKW“-Option spart Strom & Stress',
      'Nur Durchfahrts-Ladeparks vermeiden teures/stressiges Abkuppeln im Regen',
      'Carabinieri-Dialog-Verhandlung zu Gewicht & Reifenprofil'
    ],
    briefingText:
      'Mit 1.350 kg am Haken sind Durchfahrts-Ladeparks Gold wert. Achte auf das Anhängerlimit in Italien!',
    eventPoolIds: ['evt_carabinieri_trailer', 'evt_vignette_check', 'evt_family_tablet'],
    wifeDialogueIds: ['dlg_diesel_remark', 'dlg_tight_buffer']
  },

  {
    id: 'level_7_nordkapp_ultimate',
    order: 7,
    title: 'Level 7: Ultimate Nordkapp – Lofoten',
    subtitle: 'Fähre Hirtshals auf die Minute + Arktis-Expedition',
    badge: 'Finales Groß-Szenario · Struktur bereit',
    playable: false,
    regionLabel: 'Hannover → Hirtshals Fähre → Nordkapp',
    startBudgetEur: 60000,
    rewardBaseEur: 25000,
    departureTimeHour: 4.5,
    targetArrivalMinutes: 1440,
    ferryDeadlineMinutes: 420,
    startCityId: 'hannover',
    destinationCityId: 'nordkapp',
    routeLegs: [
      { edgeId: 'edge_hannover_hirtshals', defaultTargetSpeedKmh: 120, weatherOverride: 'rain', citySegmentAtEnd: 'ferry_denmark' },
      { edgeId: 'edge_hirtshals_nordkapp', defaultTargetSpeedKmh: 80, weatherOverride: 'snow' }
    ],
    passengers: {
      label: 'Expeditions-Team (Partnerin)',
      hasWife: true,
      childrenCount: 0,
      hasDog: false,
      initialStress: 20,
      stressSensitivity: 1.45
    },
    requiresWinterTires: true,
    scoringWeights: {
      time: 0.25,
      cost: 0.20,
      stress: 0.25,
      efficiency: 0.20,
      decisions: 0.10
    },
    specialRulesSummary: [
      'Fähr-Einparksequenz in Hirtshals (Dänemark): Fährzeit exakt einhalten!',
      'Verpasste Fähre = halber Tag Wartezeit + 300 € Strafe + maximaler Beifahrer-Ärger',
      'Eskalierende Ehefrau-Stressdialoge bei knappen Zeitpuffern'
    ],
    briefingText:
      'Die ultimative E-Auto-Prüfung bis ans Nordkapp. Verpasse die Fähre in Hirtshals unter keinen Umständen!',
    eventPoolIds: ['evt_stau_kamen', 'evt_rain_front', 'evt_charger_defect'],
    wifeDialogueIds: ['dlg_tight_buffer', 'dlg_diesel_remark']
  }
];

export function getLevelById(id: string): LevelConfig {
  return LEVELS.find(l => l.id === id) || LEVELS[0];
}
