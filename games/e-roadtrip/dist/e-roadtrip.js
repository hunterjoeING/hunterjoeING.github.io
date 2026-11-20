"use strict";
var ERoadtripApp = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // phaser-global:phaser
  var require_phaser = __commonJS({
    "phaser-global:phaser"(exports, module) {
      module.exports = window.Phaser;
    }
  });

  // src/main.ts
  var Phaser5 = __toESM(require_phaser());

  // src/data/levels.ts
  var DEFAULT_SCORING_WEIGHTS = {
    time: 0.3,
    cost: 0.25,
    stress: 0.2,
    efficiency: 0.15,
    decisions: 0.1
  };
  var LEVELS = [
    {
      id: "level_1_aachen_hannover",
      order: 1,
      title: "Level 1: Aachen \u2194 Hannover Messe",
      subtitle: "Tages-Gesch\xE4ftstrip hin & zur\xFCck \xB7 ~716 km",
      badge: "Spielbar \xB7 Vollversion",
      playable: true,
      regionLabel: "A4 \u2192 A1 \u2192 A2 (DE)",
      startBudgetEur: 26e3,
      rewardBaseEur: 6500,
      departureTimeHour: 7,
      // 07:00 Abfahrt am Aachener Dom
      targetArrivalMinutes: 585,
      // 9h 45min Gesamtreisezeit inkl. Laden & Wendepunkt
      startCityId: "aachen",
      destinationCityId: "aachen",
      routeLegs: [
        {
          edgeId: "edge_aachen_koeln",
          defaultTargetSpeedKmh: 130,
          weatherOverride: "clear",
          isNightLeg: false,
          citySegmentAtStart: "aachen_start"
        },
        {
          edgeId: "edge_koeln_kamen",
          defaultTargetSpeedKmh: 125,
          weatherOverride: "clear",
          isNightLeg: false
        },
        {
          edgeId: "edge_kamen_bielefeld",
          defaultTargetSpeedKmh: 130,
          weatherOverride: "clear",
          isNightLeg: false
        },
        {
          edgeId: "edge_bielefeld_hannover",
          defaultTargetSpeedKmh: 130,
          weatherOverride: "clear",
          isNightLeg: false,
          citySegmentAtEnd: "hannover_messe"
        },
        // Rückfahrt Hannover Messe -> Aachen (mit Regenfront & Abenddämmerung/Nacht!)
        {
          edgeId: "edge_bielefeld_hannover",
          reverse: true,
          defaultTargetSpeedKmh: 125,
          weatherOverride: "rain",
          isNightLeg: false
        },
        {
          edgeId: "edge_kamen_bielefeld",
          reverse: true,
          defaultTargetSpeedKmh: 120,
          weatherOverride: "rain",
          isNightLeg: false
        },
        {
          edgeId: "edge_koeln_kamen",
          reverse: true,
          defaultTargetSpeedKmh: 120,
          weatherOverride: "clear",
          isNightLeg: true
        },
        {
          edgeId: "edge_aachen_koeln",
          reverse: true,
          defaultTargetSpeedKmh: 130,
          weatherOverride: "clear",
          isNightLeg: true,
          citySegmentAtEnd: "aachen_finish"
        }
      ],
      passengers: {
        label: "Du & Partnerin (Co-Pilot per Freisprechanlage / R\xFCckfahrt)",
        hasWife: true,
        childrenCount: 0,
        hasDog: false,
        initialStress: 14,
        stressSensitivity: 1
      },
      scoringWeights: { ...DEFAULT_SCORING_WEIGHTS },
      allowedVehicleIds: ["mg4_standard", "tesla_model_s_2015", "vw_id3_pro", "tesla_model_3_highland", "tesla_model_y_lr", "kia_ev6_gtline", "vw_id7_tourer", "porsche_taycan"],
      specialRulesSummary: [
        "Startbudget: 26.000 \u20AC \u2013 w\xE4hle MG4 Standard (LFP) oder den gebrauchten Tesla Model S 85 (2015)",
        "Hin- & R\xFCckfahrt an einem Tag (~716 km) \xFCber A4, A1 (Kamener Kreuz) & A2",
        "R\xFCckfahrt am Nachmittag/Abend mit Regenfront & Nachtfahrt-Finale nach Aachen",
        "Lade-Abos clever kombinieren (Tesla SuC, EnBW M/L, EWE Go @ McDonald\u2019s, Electra+, IONITY)"
      ],
      briefingText: "Um 07:00 Uhr startest du am Aachener Dom zur Hannover Messe. Nach dem Messe-Turnaround geht es am selben Abend bei einsetzendem Regen und Dunkelheit zur\xFCck nach Aachen. Plane Ladestopps, Abos und Reisetempo so, dass Zeit, Kosten, Effizienz und Nerven perfekt balanciert sind!",
      eventPoolIds: [
        "evt_stau_kamen",
        "evt_accident_help",
        "evt_rain_front",
        "evt_wc_coffee",
        "evt_speed_trap",
        "evt_charger_defect"
      ],
      wifeDialogueIds: ["dlg_diesel_remark", "dlg_tight_buffer"]
    },
    {
      id: "level_2_family_summer",
      order: 2,
      title: "Level 2: Familien-Sommerurlaub",
      subtitle: "Ehefrau, 2 Kinder & Hund \xB7 S\xFCdfrankreich / Alpen",
      badge: "Kuratiertes Szenario \xB7 Struktur bereit",
      playable: false,
      regionLabel: "Aachen \u2192 Paris / C\xF4te d\u2019Azur",
      startBudgetEur: 32e3,
      rewardBaseEur: 8e3,
      departureTimeHour: 5.5,
      targetArrivalMinutes: 720,
      startCityId: "aachen",
      destinationCityId: "paris",
      routeLegs: [
        { edgeId: "edge_aachen_paris", defaultTargetSpeedKmh: 120, weatherOverride: "clear" }
      ],
      passengers: {
        label: "Ehefrau + 2 kleine Kinder + Hund",
        hasWife: true,
        childrenCount: 2,
        hasDog: true,
        initialStress: 22,
        stressSensitivity: 1.55
      },
      scoringWeights: {
        time: 0.2,
        cost: 0.2,
        stress: 0.35,
        // starke Stress-Gewichtung!
        efficiency: 0.15,
        decisions: 0.1
      },
      specialRulesSummary: [
        "Starke Stress-Gewichtung (35 %) durch Kinder, Hund & Ehefrau",
        "Nachtfahrt-Option: Kinder schlafen, wachen aber bei JEDEM Ladestopp w\xFCtend auf",
        "Zuf\xE4llige Familien-Events (\u201EFahr nicht so schnell!\u201C, \u201ESie hat mein Tablet genommen!\u201C)",
        "EWE Go @ McDonald\u2019s senkt Familien-Stress sp\xFCrbar"
      ],
      briefingText: "Mit zwei Kindern und Hund auf der R\xFCckbank z\xE4hlt jede ruhige Ladepause doppelt. Schlichte Tablet-Streits und vermeide \u201EMit einem Diesel w\xE4re das viel besser gegangen!\u201C-Eskalationen.",
      eventPoolIds: ["evt_family_tablet", "evt_wc_coffee", "evt_stau_kamen"],
      wifeDialogueIds: ["dlg_diesel_remark", "dlg_tight_buffer"]
    },
    {
      id: "level_3_alps_winter",
      order: 3,
      title: "Level 3: Winter-Alpen\xFCberquerung",
      subtitle: "Schneeketten, Pass vs. Tunnel & K\xE4lteverbrauch",
      badge: "Kuratiertes Szenario \xB7 Struktur bereit",
      playable: false,
      regionLabel: "M\xFCnchen \u2192 Brenner / Alpen",
      startBudgetEur: 38e3,
      rewardBaseEur: 9500,
      departureTimeHour: 6,
      targetArrivalMinutes: 310,
      startCityId: "muenchen",
      destinationCityId: "innsbruck",
      routeLegs: [
        { edgeId: "edge_muenchen_innsbruck", defaultTargetSpeedKmh: 100, weatherOverride: "snow" }
      ],
      passengers: {
        label: "Winter-Skiurlaub Crew",
        hasWife: true,
        childrenCount: 1,
        hasDog: false,
        initialStress: 18,
        stressSensitivity: 1.25
      },
      requiresWinterTires: true,
      scoringWeights: {
        time: 0.25,
        cost: 0.2,
        stress: 0.25,
        efficiency: 0.2,
        decisions: 0.1
      },
      specialRulesSummary: [
        "Winterreifen & Schneeketten-Pflicht am Pass",
        "+28 % K\xE4lte- & Schneeverbrauch plus Rekuperations-Reduktion",
        "Vignette / Pickerl kaufen oder hohes Bu\xDFgeld riskieren"
      ],
      briefingText: "Eisige Temperaturen, Schneefall am Brenner und steile Rampen fordern W\xE4rmepumpe und Ladeplanung heraus.",
      eventPoolIds: ["evt_vignette_check", "evt_rain_front", "evt_accident_help"],
      wifeDialogueIds: ["dlg_diesel_remark"]
    },
    {
      id: "level_4_scotland_highlands",
      order: 4,
      title: "Level 4: Scotland Highlands",
      subtitle: "DC-Ladew\xFCste & langsame 11-kW-Dorflader",
      badge: "Kuratiertes Szenario \xB7 Struktur bereit",
      playable: false,
      regionLabel: "Amsterdam \u2192 Eurotunnel \u2192 Highlands",
      startBudgetEur: 42e3,
      rewardBaseEur: 11e3,
      departureTimeHour: 7.5,
      targetArrivalMinutes: 860,
      startCityId: "amsterdam",
      destinationCityId: "edinburgh",
      routeLegs: [
        { edgeId: "edge_amsterdam_highlands", defaultTargetSpeedKmh: 105, weatherOverride: "fog" }
      ],
      passengers: {
        label: "Entdecker-Duo",
        hasWife: true,
        childrenCount: 0,
        hasDog: false,
        initialStress: 20,
        stressSensitivity: 1.2
      },
      scoringWeights: {
        time: 0.2,
        cost: 0.2,
        stress: 0.25,
        efficiency: 0.25,
        decisions: 0.1
      },
      specialRulesSummary: [
        "Kaum DC-Schnelllader: oft nur langsame Dorflader (AC 11/22 kW)",
        "Maximale Reichweitenangst & Effizienz-Optimierung (25 % Gewicht!)"
      ],
      briefingText: "Im Nebel der schottischen Highlands z\xE4hlt jedes gesparte Watt \u2013 sonst h\xE4ngst du stundenlang am Dorflader.",
      eventPoolIds: ["evt_charger_defect", "evt_rain_front"],
      wifeDialogueIds: ["dlg_diesel_remark", "dlg_tight_buffer"]
    },
    {
      id: "level_5_ecannonball",
      order: 5,
      title: "Level 5: e-Cannonball Rally",
      subtitle: "Vollgas, 800V-Ladekurve & Null Stress-Gewicht",
      badge: "Kuratiertes Szenario \xB7 Struktur bereit",
      playable: false,
      regionLabel: "K\xF6ln \u2192 M\xFCnchen (570 km Sprint)",
      startBudgetEur: 55e3,
      rewardBaseEur: 14e3,
      departureTimeHour: 4,
      targetArrivalMinutes: 270,
      startCityId: "koeln",
      destinationCityId: "muenchen",
      routeLegs: [
        { edgeId: "edge_koeln_muenchen", defaultTargetSpeedKmh: 195, weatherOverride: "clear" }
      ],
      passengers: {
        label: "Rallye Co-Pilot (Chronometer)",
        hasWife: false,
        childrenCount: 0,
        hasDog: false,
        initialStress: 0,
        stressSensitivity: 0
      },
      scoringWeights: {
        time: 0.55,
        cost: 0.1,
        stress: 0,
        // Stress-Gewicht = 0!
        efficiency: 0.25,
        // Optimale Ladekurve 10-60%!
        decisions: 0.1
      },
      specialRulesSummary: [
        "Stress-Gewicht = 0 %: Maximale Geschwindigkeit & k\xFCrzeste Ladefenster (10\u201355 % SoC)!",
        "Hohes Blitzer- & Ticket-Risiko wird einkalkuliert",
        "Porsche Taycan oder Kia EV6 (800V) gl\xE4nzen hier extrem"
      ],
      briefingText: "Vorgegebene Rallye-Strecke auf Bestzeit. Reite die Ladekurve zwischen 8 % und 55 % perfekt aus!",
      eventPoolIds: ["evt_speed_trap", "evt_charger_defect", "evt_stau_kamen"],
      wifeDialogueIds: []
    },
    {
      id: "level_6_caravan_italy",
      order: 6,
      title: "Level 6: Wohnwagen nach Italien",
      subtitle: "Gespann-Verbrauch, Abkuppeln & Carabinieri-Kontrolle",
      badge: "Kuratiertes Szenario \xB7 Struktur bereit",
      playable: false,
      regionLabel: "Brenner \u2192 Italien / Rom",
      startBudgetEur: 48e3,
      rewardBaseEur: 13e3,
      departureTimeHour: 6,
      targetArrivalMinutes: 640,
      startCityId: "innsbruck",
      destinationCityId: "rom",
      routeLegs: [
        { edgeId: "edge_innsbruck_rom", defaultTargetSpeedKmh: 90, weatherOverride: "clear" }
      ],
      trailerWeightKg: 1350,
      passengers: {
        label: "Familie mit 1.350 kg Wohnwagen",
        hasWife: true,
        childrenCount: 2,
        hasDog: false,
        initialStress: 24,
        stressSensitivity: 1.4
      },
      scoringWeights: {
        time: 0.2,
        cost: 0.25,
        stress: 0.3,
        efficiency: 0.15,
        decisions: 0.1
      },
      specialRulesSummary: [
        "Wohnwagen (+55 % Verbrauch, max 90\u2013100 km/h) \u2013 \u201EHinter LKW\u201C-Option spart Strom & Stress",
        "Nur Durchfahrts-Ladeparks vermeiden teures/stressiges Abkuppeln im Regen",
        "Carabinieri-Dialog-Verhandlung zu Gewicht & Reifenprofil"
      ],
      briefingText: "Mit 1.350 kg am Haken sind Durchfahrts-Ladeparks Gold wert. Achte auf das Anh\xE4ngerlimit in Italien!",
      eventPoolIds: ["evt_carabinieri_trailer", "evt_vignette_check", "evt_family_tablet"],
      wifeDialogueIds: ["dlg_diesel_remark", "dlg_tight_buffer"]
    },
    {
      id: "level_7_nordkapp_ultimate",
      order: 7,
      title: "Level 7: Ultimate Nordkapp \u2013 Lofoten",
      subtitle: "F\xE4hre Hirtshals auf die Minute + Arktis-Expedition",
      badge: "Finales Gro\xDF-Szenario \xB7 Struktur bereit",
      playable: false,
      regionLabel: "Hannover \u2192 Hirtshals F\xE4hre \u2192 Nordkapp",
      startBudgetEur: 6e4,
      rewardBaseEur: 25e3,
      departureTimeHour: 4.5,
      targetArrivalMinutes: 1440,
      ferryDeadlineMinutes: 420,
      startCityId: "hannover",
      destinationCityId: "nordkapp",
      routeLegs: [
        { edgeId: "edge_hannover_hirtshals", defaultTargetSpeedKmh: 120, weatherOverride: "rain", citySegmentAtEnd: "ferry_denmark" },
        { edgeId: "edge_hirtshals_nordkapp", defaultTargetSpeedKmh: 80, weatherOverride: "snow" }
      ],
      passengers: {
        label: "Expeditions-Team (Partnerin)",
        hasWife: true,
        childrenCount: 0,
        hasDog: false,
        initialStress: 20,
        stressSensitivity: 1.45
      },
      requiresWinterTires: true,
      scoringWeights: {
        time: 0.25,
        cost: 0.2,
        stress: 0.25,
        efficiency: 0.2,
        decisions: 0.1
      },
      specialRulesSummary: [
        "F\xE4hr-Einparksequenz in Hirtshals (D\xE4nemark): F\xE4hrzeit exakt einhalten!",
        "Verpasste F\xE4hre = halber Tag Wartezeit + 300 \u20AC Strafe + maximaler Beifahrer-\xC4rger",
        "Eskalierende Ehefrau-Stressdialoge bei knappen Zeitpuffern"
      ],
      briefingText: "Die ultimative E-Auto-Pr\xFCfung bis ans Nordkapp. Verpasse die F\xE4hre in Hirtshals unter keinen Umst\xE4nden!",
      eventPoolIds: ["evt_stau_kamen", "evt_rain_front", "evt_charger_defect"],
      wifeDialogueIds: ["dlg_tight_buffer", "dlg_diesel_remark"]
    }
  ];
  function getLevelById(id) {
    return LEVELS.find((l) => l.id === id) || LEVELS[0];
  }

  // src/data/vehicles.ts
  var VEHICLES = [
    {
      id: "mg4_standard",
      name: "MG4 Electric Standard",
      brand: "MG",
      year: 2023,
      chemistry: "LFP",
      batteryKwh: 50.8,
      baseConsumption100: 15.8,
      aeroFactor: 1.04,
      weatherSensitivity: 1.12,
      chargingCurve: [
        { soc: 0, kw: 85 },
        { soc: 20, kw: 88 },
        { soc: 55, kw: 84 },
        { soc: 75, kw: 62 },
        { soc: 90, kw: 34 },
        { soc: 100, kw: 11 }
      ],
      maxSpeedKmh: 160,
      towingCapacityKg: 500,
      comfortRating: 6,
      priceEur: 19500,
      depreciationRate: 0.08,
      shape: "hatchback",
      primaryColor: 15357964,
      accentColor: 988970,
      unlockLevel: 1,
      tagline: "Preiswerter LFP-Einsteiger: flache Ladekurve bis 60 %, kompakt & wendig."
    },
    {
      id: "tesla_model_s_2015",
      name: "Tesla Model S 85 (2015)",
      brand: "Tesla",
      year: 2015,
      chemistry: "NMC",
      batteryKwh: 75,
      baseConsumption100: 19.2,
      aeroFactor: 0.92,
      weatherSensitivity: 1.18,
      chargingCurve: [
        { soc: 0, kw: 118 },
        { soc: 22, kw: 112 },
        { soc: 45, kw: 78 },
        { soc: 65, kw: 54 },
        { soc: 80, kw: 36 },
        { soc: 100, kw: 10 }
      ],
      maxSpeedKmh: 225,
      towingCapacityKg: 0,
      comfortRating: 8,
      priceEur: 24500,
      depreciationRate: 0.09,
      shape: "sedan_aero",
      primaryColor: 4674921,
      accentColor: 14427686,
      isTesla: true,
      unlockLevel: 1,
      tagline: "Gro\xDFer 75-kWh-Akku & gratis Supercharger-Vorteil, aber fr\xFChes Lade-Derating."
    },
    {
      id: "vw_id3_pro",
      name: "VW ID.3 Pro S",
      brand: "Volkswagen",
      year: 2024,
      chemistry: "NMC",
      batteryKwh: 77,
      baseConsumption100: 16.2,
      aeroFactor: 1,
      weatherSensitivity: 1.08,
      chargingCurve: [
        { soc: 0, kw: 155 },
        { soc: 25, kw: 170 },
        { soc: 50, kw: 122 },
        { soc: 75, kw: 78 },
        { soc: 90, kw: 42 },
        { soc: 100, kw: 14 }
      ],
      maxSpeedKmh: 160,
      towingCapacityKg: 0,
      comfortRating: 7,
      priceEur: 29500,
      depreciationRate: 0.09,
      shape: "hatchback",
      primaryColor: 165063,
      accentColor: 16317180,
      unlockLevel: 2,
      tagline: "Solider 77-kWh-Reisekompakter mit sehr ausgewogener Autobahn-Reichweite."
    },
    {
      id: "tesla_model_3_highland",
      name: "Tesla Model 3 Highland LR",
      brand: "Tesla",
      year: 2025,
      chemistry: "NMC",
      batteryKwh: 75,
      baseConsumption100: 14.1,
      aeroFactor: 0.84,
      weatherSensitivity: 1.04,
      chargingCurve: [
        { soc: 0, kw: 245 },
        { soc: 18, kw: 250 },
        { soc: 45, kw: 165 },
        { soc: 70, kw: 95 },
        { soc: 85, kw: 52 },
        { soc: 100, kw: 15 }
      ],
      maxSpeedKmh: 201,
      towingCapacityKg: 1e3,
      comfortRating: 8,
      priceEur: 36500,
      depreciationRate: 0.08,
      shape: "sedan_aero",
      primaryColor: 14427686,
      accentColor: 1976635,
      isTesla: true,
      unlockLevel: 2,
      tagline: "Effizienz-K\xF6nig mit cW 0,219, 250-kW-Peak und Supercharger-Integration."
    },
    {
      id: "tesla_model_y_lr",
      name: "Tesla Model Y Long Range",
      brand: "Tesla",
      year: 2025,
      chemistry: "NMC",
      batteryKwh: 75,
      baseConsumption100: 16.4,
      aeroFactor: 0.96,
      weatherSensitivity: 1.05,
      chargingCurve: [
        { soc: 0, kw: 245 },
        { soc: 20, kw: 250 },
        { soc: 45, kw: 160 },
        { soc: 70, kw: 92 },
        { soc: 85, kw: 50 },
        { soc: 100, kw: 14 }
      ],
      maxSpeedKmh: 217,
      towingCapacityKg: 1600,
      comfortRating: 9,
      priceEur: 41e3,
      depreciationRate: 0.08,
      shape: "suv",
      primaryColor: 16317180,
      accentColor: 988970,
      isTesla: true,
      unlockLevel: 3,
      tagline: "Familien- & Zugfahrzeug-Allrounder: viel Platz, 1.600 kg Anh\xE4ngelast."
    },
    {
      id: "kia_ev6_gtline",
      name: "Kia EV6 800V RWD",
      brand: "Kia",
      year: 2024,
      chemistry: "NMC",
      batteryKwh: 77.4,
      baseConsumption100: 16.8,
      aeroFactor: 0.95,
      weatherSensitivity: 1.06,
      chargingCurve: [
        { soc: 0, kw: 225 },
        { soc: 25, kw: 240 },
        { soc: 55, kw: 220 },
        { soc: 78, kw: 145 },
        { soc: 88, kw: 65 },
        { soc: 100, kw: 18 }
      ],
      maxSpeedKmh: 188,
      towingCapacityKg: 1600,
      comfortRating: 8,
      priceEur: 43500,
      depreciationRate: 0.09,
      shape: "suv",
      primaryColor: 1096065,
      accentColor: 988970,
      unlockLevel: 3,
      tagline: "800-Volt-Lademonster: 10\u201380 % in nur 18 Minuten auf der gesamten Kurve."
    },
    {
      id: "vw_id7_tourer",
      name: "VW ID.7 Tourer Pro S",
      brand: "Volkswagen",
      year: 2025,
      chemistry: "NMC",
      batteryKwh: 86,
      baseConsumption100: 15.3,
      aeroFactor: 0.87,
      weatherSensitivity: 1.03,
      chargingCurve: [
        { soc: 0, kw: 190 },
        { soc: 25, kw: 200 },
        { soc: 55, kw: 155 },
        { soc: 78, kw: 105 },
        { soc: 90, kw: 55 },
        { soc: 100, kw: 16 }
      ],
      maxSpeedKmh: 180,
      towingCapacityKg: 1200,
      comfortRating: 10,
      priceEur: 49500,
      depreciationRate: 0.08,
      shape: "touring",
      primaryColor: 1982639,
      accentColor: 9741240,
      unlockLevel: 4,
      tagline: "Langstrecken-Kombi mit 86 kWh Netto, Top-Komfort (10/10) & Stress-D\xE4mpfung."
    },
    {
      id: "porsche_taycan",
      name: "Porsche Taycan Performance+",
      brand: "Porsche",
      year: 2025,
      chemistry: "NMC",
      batteryKwh: 97,
      baseConsumption100: 18.6,
      aeroFactor: 0.86,
      weatherSensitivity: 1.04,
      chargingCurve: [
        { soc: 0, kw: 300 },
        { soc: 25, kw: 320 },
        { soc: 60, kw: 270 },
        { soc: 80, kw: 165 },
        { soc: 92, kw: 75 },
        { soc: 100, kw: 20 }
      ],
      maxSpeedKmh: 260,
      towingCapacityKg: 0,
      comfortRating: 9,
      priceEur: 68e3,
      depreciationRate: 0.1,
      shape: "sport",
      primaryColor: 16436245,
      accentColor: 988970,
      unlockLevel: 5,
      tagline: "320-kW-800V-Rakete bis 260 km/h \u2013 gemacht f\xFCr den e-Cannonball!"
    }
  ];
  function getVehicleById(id) {
    return VEHICLES.find((v) => v.id === id) || VEHICLES[0];
  }

  // src/data/europeMap.ts
  var CITIES = [
    { id: "aachen", name: "Aachen", country: "DE", mapX: 356, mapY: 422, landmark: "aachen_dom", isMajor: true, hasLocalSegment: true },
    { id: "koeln", name: "K\xF6ln", country: "DE", mapX: 392, mapY: 414, landmark: "koeln_dom", isMajor: true },
    { id: "kamen", name: "Kamener Kreuz", country: "DE", mapX: 432, mapY: 374 },
    { id: "bielefeld", name: "Bielefeld", country: "DE", mapX: 470, mapY: 354 },
    { id: "hannover", name: "Hannover Messe", country: "DE", mapX: 520, mapY: 344, landmark: "hermesturm", isMajor: true, hasLocalSegment: true },
    // Wider stylized Europe context cities for map richness & future curated levels
    { id: "amsterdam", name: "Amsterdam", country: "NL", mapX: 332, mapY: 344, isMajor: true },
    { id: "paris", name: "Paris", country: "FR", mapX: 256, mapY: 486, landmark: "eiffel", isMajor: true },
    { id: "berlin", name: "Berlin", country: "DE", mapX: 616, mapY: 344, landmark: "fernsehturm", isMajor: true },
    { id: "muenchen", name: "M\xFCnchen", country: "DE", mapX: 548, mapY: 492, isMajor: true },
    { id: "innsbruck", name: "Alpen / Brenner", country: "AT", mapX: 548, mapY: 548, landmark: "alps", isMajor: true },
    { id: "rom", name: "Italien / Rom", country: "IT", mapX: 558, mapY: 676, landmark: "colosseum", isMajor: true },
    { id: "edinburgh", name: "Highlands", country: "UK", mapX: 210, mapY: 202, landmark: "highlands", isMajor: true },
    { id: "hirtshals", name: "Hirtshals F\xE4hre", country: "DK", mapX: 504, mapY: 196, landmark: "ferry", isMajor: true },
    { id: "nordkapp", name: "Nordkapp", country: "NO", mapX: 660, mapY: 68, landmark: "nordkapp", isMajor: true }
  ];
  var HIGHWAY_EDGES = [
    {
      id: "edge_aachen_koeln",
      fromCityId: "aachen",
      toCityId: "koeln",
      highwayName: "A4",
      distanceKm: 72,
      speedLimitKmh: 0,
      // Autobahn mixed 130 / open
      elevationGainM: 120,
      elevationLossM: 255,
      baseTrafficRisk: 0.22,
      policeRiskBase: 0.14,
      tollEur: 0,
      waypoints: [
        { x: 356, y: 422 },
        { x: 374, y: 418 },
        { x: 392, y: 414 }
      ],
      defaultWeather: "clear"
    },
    {
      id: "edge_koeln_kamen",
      fromCityId: "koeln",
      toCityId: "kamen",
      highwayName: "A1",
      distanceKm: 98,
      speedLimitKmh: 130,
      elevationGainM: 340,
      elevationLossM: 310,
      baseTrafficRisk: 0.45,
      policeRiskBase: 0.25,
      tollEur: 0,
      waypoints: [
        { x: 392, y: 414 },
        { x: 408, y: 394 },
        { x: 432, y: 374 }
      ],
      defaultWeather: "clear"
    },
    {
      id: "edge_kamen_bielefeld",
      fromCityId: "kamen",
      toCityId: "bielefeld",
      highwayName: "A2",
      distanceKm: 86,
      speedLimitKmh: 0,
      elevationGainM: 280,
      elevationLossM: 220,
      baseTrafficRisk: 0.36,
      policeRiskBase: 0.22,
      tollEur: 0,
      waypoints: [
        { x: 432, y: 374 },
        { x: 452, y: 363 },
        { x: 470, y: 354 }
      ],
      defaultWeather: "clear"
    },
    {
      id: "edge_bielefeld_hannover",
      fromCityId: "bielefeld",
      toCityId: "hannover",
      highwayName: "A2 / A37",
      distanceKm: 102,
      speedLimitKmh: 0,
      elevationGainM: 290,
      elevationLossM: 345,
      baseTrafficRisk: 0.3,
      policeRiskBase: 0.2,
      tollEur: 0,
      waypoints: [
        { x: 470, y: 354 },
        { x: 496, y: 348 },
        { x: 520, y: 344 }
      ],
      defaultWeather: "clear"
    },
    // Context European Autobahn network lines (stylized visual network + future level edges)
    {
      id: "edge_aachen_amsterdam",
      fromCityId: "aachen",
      toCityId: "amsterdam",
      highwayName: "A76 / A2 (NL)",
      distanceKm: 225,
      speedLimitKmh: 100,
      elevationGainM: 80,
      elevationLossM: 240,
      baseTrafficRisk: 0.28,
      policeRiskBase: 0.45,
      tollEur: 0,
      waypoints: [{ x: 356, y: 422 }, { x: 342, y: 382 }, { x: 332, y: 344 }],
      defaultWeather: "rain"
    },
    {
      id: "edge_aachen_paris",
      fromCityId: "aachen",
      toCityId: "paris",
      highwayName: "E42 / A1 (FR)",
      distanceKm: 420,
      speedLimitKmh: 130,
      elevationGainM: 420,
      elevationLossM: 540,
      baseTrafficRisk: 0.32,
      policeRiskBase: 0.35,
      tollEur: 34.5,
      waypoints: [{ x: 356, y: 422 }, { x: 304, y: 452 }, { x: 256, y: 486 }],
      defaultWeather: "clear"
    },
    {
      id: "edge_hannover_berlin",
      fromCityId: "hannover",
      toCityId: "berlin",
      highwayName: "A2",
      distanceKm: 285,
      speedLimitKmh: 0,
      elevationGainM: 240,
      elevationLossM: 260,
      baseTrafficRisk: 0.25,
      policeRiskBase: 0.2,
      tollEur: 0,
      waypoints: [{ x: 520, y: 344 }, { x: 572, y: 344 }, { x: 616, y: 344 }],
      defaultWeather: "clear"
    },
    {
      id: "edge_koeln_muenchen",
      fromCityId: "koeln",
      toCityId: "muenchen",
      highwayName: "A3 / A9",
      distanceKm: 570,
      speedLimitKmh: 0,
      elevationGainM: 1450,
      elevationLossM: 980,
      baseTrafficRisk: 0.4,
      policeRiskBase: 0.25,
      tollEur: 0,
      waypoints: [{ x: 392, y: 414 }, { x: 472, y: 454 }, { x: 548, y: 492 }],
      defaultWeather: "clear"
    },
    {
      id: "edge_muenchen_innsbruck",
      fromCityId: "muenchen",
      toCityId: "innsbruck",
      highwayName: "A8 / A12",
      distanceKm: 165,
      speedLimitKmh: 100,
      elevationGainM: 1120,
      elevationLossM: 420,
      baseTrafficRisk: 0.48,
      policeRiskBase: 0.4,
      tollEur: 12,
      vignetteRequired: "AT Vignette (11,50 \u20AC)",
      isTunnelOption: true,
      isPassOption: true,
      waypoints: [{ x: 548, y: 492 }, { x: 550, y: 520 }, { x: 548, y: 548 }],
      defaultWeather: "snow"
    },
    {
      id: "edge_innsbruck_rom",
      fromCityId: "innsbruck",
      toCityId: "rom",
      highwayName: "A22 / A1 (IT)",
      distanceKm: 720,
      speedLimitKmh: 130,
      elevationGainM: 950,
      elevationLossM: 1520,
      baseTrafficRisk: 0.38,
      policeRiskBase: 0.42,
      tollEur: 58,
      waypoints: [{ x: 548, y: 548 }, { x: 554, y: 610 }, { x: 558, y: 676 }],
      defaultWeather: "clear"
    },
    {
      id: "edge_hannover_hirtshals",
      fromCityId: "hannover",
      toCityId: "hirtshals",
      highwayName: "A7 / E45 (DK)",
      distanceKm: 645,
      speedLimitKmh: 130,
      elevationGainM: 310,
      elevationLossM: 350,
      baseTrafficRisk: 0.32,
      policeRiskBase: 0.35,
      tollEur: 0,
      waypoints: [{ x: 520, y: 344 }, { x: 506, y: 268 }, { x: 504, y: 196 }],
      defaultWeather: "rain"
    },
    {
      id: "edge_hirtshals_nordkapp",
      fromCityId: "hirtshals",
      toCityId: "nordkapp",
      highwayName: "F\xE4hre + E6 (NO)",
      distanceKm: 2050,
      speedLimitKmh: 80,
      elevationGainM: 4200,
      elevationLossM: 4180,
      baseTrafficRisk: 0.25,
      policeRiskBase: 0.5,
      tollEur: 145,
      waypoints: [{ x: 504, y: 196 }, { x: 562, y: 142 }, { x: 660, y: 68 }],
      defaultWeather: "snow"
    },
    {
      id: "edge_amsterdam_highlands",
      fromCityId: "amsterdam",
      toCityId: "edinburgh",
      highwayName: "Eurotunnel / A9 (UK)",
      distanceKm: 820,
      speedLimitKmh: 112,
      elevationGainM: 1300,
      elevationLossM: 1200,
      baseTrafficRisk: 0.22,
      policeRiskBase: 0.28,
      tollEur: 95,
      waypoints: [{ x: 332, y: 344 }, { x: 264, y: 274 }, { x: 210, y: 202 }],
      defaultWeather: "fog"
    }
  ];
  var CHARGERS = [
    {
      id: "chg_frechen_ewego",
      name: "McDonald\u2019s Frechen \xB7 EWE Go",
      cityHint: "A4 / Kreuz K\xF6ln-West",
      edgeId: "edge_aachen_koeln",
      edgeProgress: 0.82,
      mapX: 386,
      mapY: 415,
      network: "ewego",
      stalls: 4,
      maxKw: 150,
      baseAdhocEurPerKwh: 0.69,
      occupancyRisk: 0.22,
      defectRisk: 0.08,
      hasMcDonalds: true,
      hasRestroom: true,
      trailerFriendly: false
    },
    {
      id: "chg_kamen_enbw",
      name: "EnBW Ladepark Kamener Kreuz",
      cityHint: "A1 / A2 Kamener Kreuz",
      edgeId: "edge_koeln_kamen",
      edgeProgress: 0.92,
      mapX: 428,
      mapY: 377,
      network: "enbw",
      stalls: 24,
      maxKw: 400,
      baseAdhocEurPerKwh: 0.72,
      occupancyRisk: 0.12,
      defectRisk: 0.04,
      hasRestroom: true,
      trailerFriendly: true
    },
    {
      id: "chg_remscheid_ionity",
      name: "IONITY Remscheid / Wuppertal",
      cityHint: "A1 Bergisches Land",
      edgeId: "edge_koeln_kamen",
      edgeProgress: 0.48,
      mapX: 409,
      mapY: 394,
      network: "ionity",
      stalls: 6,
      maxKw: 350,
      baseAdhocEurPerKwh: 0.75,
      occupancyRisk: 0.28,
      defectRisk: 0.1,
      hasRestroom: true,
      trailerFriendly: false
    },
    {
      id: "chg_kamen_tesla",
      name: "Tesla Supercharger Kamen V4",
      cityHint: "A2 Ausfahrt Kamen/Bergkamen",
      edgeId: "edge_kamen_bielefeld",
      edgeProgress: 0.15,
      mapX: 438,
      mapY: 370,
      network: "tesla",
      stalls: 20,
      maxKw: 250,
      baseAdhocEurPerKwh: 0.66,
      occupancyRisk: 0.08,
      defectRisk: 0.02,
      hasMcDonalds: true,
      hasRestroom: true,
      trailerFriendly: true
    },
    {
      id: "chg_rheda_electra",
      name: "Electra+ Hub G\xFCtersloh / Rheda",
      cityHint: "A2 Ostwestfalen",
      edgeId: "edge_kamen_bielefeld",
      edgeProgress: 0.78,
      mapX: 462,
      mapY: 358,
      network: "electra",
      stalls: 8,
      maxKw: 300,
      baseAdhocEurPerKwh: 0.69,
      occupancyRisk: 0.15,
      defectRisk: 0.05,
      hasRestroom: true,
      trailerFriendly: false
    },
    {
      id: "chg_bad_oeynhausen_ewego",
      name: "McDonald\u2019s Bad Oeynhausen \xB7 EWE Go",
      cityHint: "A2 / Weserbergland",
      edgeId: "edge_bielefeld_hannover",
      edgeProgress: 0.35,
      mapX: 488,
      mapY: 350,
      network: "ewego",
      stalls: 6,
      maxKw: 300,
      baseAdhocEurPerKwh: 0.69,
      occupancyRisk: 0.18,
      defectRisk: 0.07,
      hasMcDonalds: true,
      hasRestroom: true,
      trailerFriendly: false
    },
    {
      id: "chg_lauenau_tesla",
      name: "Tesla Supercharger Lauenau",
      cityHint: "A2 vor Hannover",
      edgeId: "edge_bielefeld_hannover",
      edgeProgress: 0.68,
      mapX: 504,
      mapY: 346,
      network: "tesla",
      stalls: 16,
      maxKw: 250,
      baseAdhocEurPerKwh: 0.66,
      occupancyRisk: 0.1,
      defectRisk: 0.03,
      hasRestroom: true,
      trailerFriendly: true
    },
    {
      id: "chg_hannover_enbw",
      name: "EnBW & Electra Messe-Hub Laatzen",
      cityHint: "Hannover Messe S\xFCd",
      edgeId: "edge_bielefeld_hannover",
      edgeProgress: 0.94,
      mapX: 517,
      mapY: 344,
      network: "enbw",
      stalls: 12,
      maxKw: 300,
      baseAdhocEurPerKwh: 0.72,
      occupancyRisk: 0.16,
      defectRisk: 0.05,
      hasRestroom: true,
      trailerFriendly: true
    }
  ];
  function getCityById(id) {
    return CITIES.find((c) => c.id === id) || CITIES[0];
  }
  function getEdgeById(id) {
    return HIGHWAY_EDGES.find((e) => e.id === id) || HIGHWAY_EDGES[0];
  }
  function getChargerById(id) {
    return CHARGERS.find((c) => c.id === id);
  }
  function getChargersForEdge(edgeId) {
    return CHARGERS.filter((c) => c.edgeId === edgeId);
  }

  // src/data/events.ts
  var GAME_EVENTS = {
    evt_accident_help: {
      id: "evt_accident_help",
      title: "Auffahrunfall auf der Nebenspur",
      category: "accident",
      icon: "\u{1F691}",
      description: "Auf dem Standstreifen der A2 hat ein Kleinwagen eine Panne/Kollision mit Warnblinker, noch kein Rettungswagen vor Ort. Du kannst anhalten, absichern und Erste Hilfe leisten.",
      choices: [
        {
          id: "help_stop",
          label: "Anhalten, Warndreieck aufstellen & helfen",
          hint: "+22 Dynamik-Punkte \xB7 -14 Min Zeit \xB7 -2 % Akku (Warnblinker/Heizung)",
          timeDeltaMin: 14,
          socDeltaPct: -2,
          costDeltaEur: 0,
          stressDelta: 4,
          decisionPoints: 22,
          resultText: "Vorbildlich! Der Fahrer ist unverletzt, die Polizei \xFCbernimmt nach 14 Minuten. Starke Aktion!"
        },
        {
          id: "help_call",
          label: "Notruf 112 per Freisprecheinrichtung absetzen & weiterrollen",
          hint: "+8 Dynamik-Punkte \xB7 +2 Min Zeit",
          timeDeltaMin: 2,
          socDeltaPct: 0,
          costDeltaEur: 0,
          stressDelta: 1,
          decisionPoints: 8,
          resultText: "Du meldest den genauen Autobahnkilometer sofort an die Leitstelle."
        }
      ]
    },
    evt_stau_kamen: {
      id: "evt_stau_kamen",
      title: "Vollsperrung / Stau vor dem Kreuz",
      category: "traffic",
      icon: "\u{1F6A7}",
      description: "Vor dir stehen 8 km R\xFCckstau wegen einer Tagesbaustelle. Das Navi schl\xE4gt eine Umleitung \xFCber kurvige Landstra\xDFen (B1/B61) vor.",
      choices: [
        {
          id: "wait_jam",
          label: "Im Stau bleiben & Rekuperation nutzen",
          hint: "+24 Min Zeit \xB7 geringer Verbrauch \xB7 +14 Stress",
          timeDeltaMin: 24,
          socDeltaPct: -1,
          costDeltaEur: 0,
          stressDelta: 14,
          decisionPoints: 4,
          resultText: "Stop-and-Go kostet 24 Minuten Nerven, aber der Verbrauch bleibt im Schneckentempo minimal."
        },
        {
          id: "detour_country",
          label: "Umleitung \xFCber die Landstra\xDFe (80 km/h)",
          hint: "+11 Min Zeit \xB7 -3 % Akku (Mehrkilometer) \xB7 -2 Stress",
          timeDeltaMin: 11,
          socDeltaPct: -3,
          costDeltaEur: 0,
          stressDelta: -2,
          decisionPoints: 16,
          resultText: "Gute Entscheidung! \xDCber die D\xF6rfer rollst du fl\xFCssig am Stau vorbei und sparst 13 Minuten."
        }
      ]
    },
    evt_rain_front: {
      id: "evt_rain_front",
      title: "Starkregen-Front im Weserbergland",
      category: "traffic",
      icon: "\u{1F327}\uFE0F",
      description: "Dichter Regen setzt ein. Der Rollwiderstand steigt und die Scheibenwischer laufen auf Hochtouren (+12 % Verbrauch bei hohem Tempo).",
      choices: [
        {
          id: "slow_cruise",
          label: "Richtgeschwindigkeit auf 115 km/h senken",
          hint: "Sicher & effizient \xB7 +8 Effizienz-Punkte \xB7 -6 Stress",
          timeDeltaMin: 5,
          socDeltaPct: 2,
          costDeltaEur: 0,
          stressDelta: -6,
          decisionPoints: 14,
          adjustSpeedKmh: 115,
          resultText: "Vern\xFCnftig! Bei 115 km/h schwimmt nichts auf und der Akku dankt es dir sp\xFCrbar."
        },
        {
          id: "push_through",
          label: "Reisetempo beibehalten",
          hint: "Kein Zeitverlust \xB7 -4 % Extra-Akku \xB7 +10 Stress",
          timeDeltaMin: 0,
          socDeltaPct: -4,
          costDeltaEur: 0,
          stressDelta: 10,
          decisionPoints: 2,
          resultText: "Du h\xE4ltst den Schnitt hoch, aber die Verbrauchsanzeige klettert merklich nach oben."
        }
      ]
    },
    evt_wc_coffee: {
      id: "evt_wc_coffee",
      title: "Kaffee- & WC-Bedarf an Bord",
      category: "family",
      icon: "\u2615",
      description: "Nach zweieinhalb Stunden auf der Autobahn meldet sich der Harndrang. Eine Rastst\xE4tte mit Schnelllader liegt direkt voraus.",
      choices: [
        {
          id: "quick_pitstop",
          label: "Kurzer 8-Min-Rastst\xE4tten-Stopp (ohne Laden)",
          hint: "+8 Min \xB7 5,50 \u20AC Kaffee \xB7 -18 Stress",
          timeDeltaMin: 8,
          socDeltaPct: 0,
          costDeltaEur: 5.5,
          stressDelta: -18,
          decisionPoints: 10,
          resultText: "Frischer Kaffee und kurze Beine-vertreten-Pause wirken Wunder f\xFCr die Stimmung."
        },
        {
          id: "combine_charge",
          label: "Direkt n\xE4chsten Schnelllader ansteuern",
          hint: "F\xFCgt Ladestopp ein \xB7 spart Gesamtzeit \xB7 -12 Stress",
          timeDeltaMin: 4,
          socDeltaPct: 0,
          costDeltaEur: 0,
          stressDelta: -12,
          decisionPoints: 16,
          insertNearestCharger: true,
          resultText: "Clever kombiniert: Ladepause + WC auf einen Schlag!"
        },
        {
          id: "hold_on",
          label: "\u201EWir halten durch bis zum n\xE4chsten Plan-Stopp!\u201C",
          hint: "0 Min \xB7 +16 Stress",
          timeDeltaMin: 0,
          socDeltaPct: 0,
          costDeltaEur: 0,
          stressDelta: 16,
          decisionPoints: -4,
          resultText: "Die Stimmung im Cockpit wird deutlich angespannter\u2026"
        }
      ]
    },
    evt_speed_trap: {
      id: "evt_speed_trap",
      title: "Baustellen-Blitzer / Zivilstreife!",
      category: "police",
      icon: "\u{1F4F8}",
      description: "Pl\xF6tzlich Tempo 100 wegen Fahrbahnsch\xE4den \u2013 dein Zieltempo war deutlich h\xF6her eingestellt!",
      requiresSpeeding: true,
      choices: [
        {
          id: "brake_smooth",
          label: "Sofort vom Strom & sanft auf 100 km/h rekuperieren",
          hint: "Kein Bu\xDFgeld \xB7 +3 Min \xB7 +8 Dynamik-Punkte",
          timeDeltaMin: 3,
          socDeltaPct: 1,
          costDeltaEur: 0,
          stressDelta: 4,
          decisionPoints: 10,
          adjustSpeedKmh: 110,
          resultText: "Rechtzeitig abgebremst \u2013 kein rotes Blitzlicht!"
        },
        {
          id: "risk_ticket",
          label: "Laufen lassen \u2013 vielleicht ist der Blitzer aus",
          hint: "65 % Risiko auf 70 \u20AC Bu\xDFgeld \xB7 0 Min",
          timeDeltaMin: 0,
          socDeltaPct: 0,
          costDeltaEur: 0,
          stressDelta: 11,
          decisionPoints: -8,
          fineRisk: { probability: 0.65, amountEur: 70, label: "Blitzer-Foto A2 (+24 km/h)" },
          resultText: "Du h\xE4ltst das Gaspedal unten\u2026"
        }
      ]
    },
    evt_charger_defect: {
      id: "evt_charger_defect",
      title: "Lades\xE4ule defekt / blockiert!",
      category: "charger",
      icon: "\u{1F50C}",
      description: "Am angefahrenen Ladepark zeigt eine S\xE4ule \u201ESt\xF6rung \u2013 Kommunikation fehlgeschlagen\u201C, und ein Verbrenner blockiert eine weitere Bucht.",
      choices: [
        {
          id: "wait_free_stall",
          label: "Auf freiwerdenden Nachbar-Stall warten & Hotline anrufen",
          hint: "+11 Min Wartezeit \xB7 +6 Stress",
          timeDeltaMin: 11,
          socDeltaPct: 0,
          costDeltaEur: 0,
          stressDelta: 6,
          decisionPoints: 6,
          resultText: "Nach 11 Minuten f\xE4hrt ein anderer E-Fahrer weg und du kannst anstecken."
        },
        {
          id: "reroute_next_hub",
          label: "Sofort weiter zum n\xE4chsten gro\xDFen Ladepark",
          hint: "Nutzt Restakku \xB7 +14 Dynamik-Punkte \xB7 Risiko bei niedrigem SoC",
          timeDeltaMin: 4,
          socDeltaPct: -4,
          costDeltaEur: 0,
          stressDelta: 8,
          decisionPoints: 14,
          insertNearestCharger: true,
          resultText: "Du f\xE4hrst z\xFCgig weiter zum Ausweich-Standort."
        }
      ]
    },
    // Future-level ready event templates
    evt_border_nl_limit: {
      id: "evt_border_nl_limit",
      title: "Grenze Niederlande: Tempo 100 km/h",
      category: "border",
      icon: "\u{1F1F3}\u{1F1F1}",
      description: "Willkommen in den Niederlanden! Tags\xFCber (06\u201319 Uhr) gilt strikt Tempo 100 km/h auf Autobahnen mit hohen Strafen.",
      choices: [
        {
          id: "nl_100",
          label: "Tempomat exakt auf 100 km/h stellen",
          hint: "Extrem sparsam \xB7 0 \u20AC Strafe \xB7 +12 Punkte",
          timeDeltaMin: 6,
          socDeltaPct: 4,
          costDeltaEur: 0,
          stressDelta: -4,
          decisionPoints: 12,
          adjustSpeedKmh: 100,
          resultText: "Entspanntes Gleiten durch Holland bei Rekordverbrauch!"
        },
        {
          id: "nl_125",
          label: "Mit 125 km/h mitschwimmen",
          hint: "55 % Risiko auf 165 \u20AC NL-Bu\xDFgeld",
          timeDeltaMin: 0,
          socDeltaPct: -2,
          costDeltaEur: 0,
          stressDelta: 9,
          decisionPoints: -6,
          fineRisk: { probability: 0.55, amountEur: 165, label: "Trajectcontrole Niederlande" },
          resultText: "Hoffentlich waren die Abschnittskameras gn\xE4dig\u2026"
        }
      ]
    },
    evt_vignette_check: {
      id: "evt_vignette_check",
      title: "Maut & Vignette / Pickerl-Entscheidung",
      category: "toll",
      icon: "\u{1F3AB}",
      description: "Vor der Landesgrenze ben\xF6tigst du eine Autobahn-Vignette (11,50 \u20AC). Alternativ lockt eine mautfreie Passstra\xDFe.",
      choices: [
        {
          id: "buy_vignette",
          label: "Digitale Vignette kaufen (11,50 \u20AC)",
          hint: "Schnell & legal \xB7 keine Strafe",
          timeDeltaMin: 2,
          socDeltaPct: 0,
          costDeltaEur: 11.5,
          stressDelta: -3,
          decisionPoints: 10,
          resultText: "Digital-Vignette in 2 Minuten aktiviert \u2013 freie Fahrt auf der Autobahn."
        },
        {
          id: "skip_vignette",
          label: "Ohne Vignette durchschl\xFCpfen",
          hint: "75 % Risiko auf 120 \u20AC Ersatzmaut",
          timeDeltaMin: 0,
          socDeltaPct: 0,
          costDeltaEur: 0,
          stressDelta: 15,
          decisionPoints: -10,
          fineRisk: { probability: 0.75, amountEur: 120, label: "ASFINAG Mautkamera" },
          resultText: "Die Kamerabr\xFCcke blitzt gr\xFCn \xFCber der Spur\u2026"
        }
      ]
    },
    evt_family_tablet: {
      id: "evt_family_tablet",
      title: "R\xFCckbank-Alarm: \u201ESie hat mein Tablet genommen!\u201C",
      category: "family",
      icon: "\u{1F467}",
      description: "Auf der R\xFCckbank eskaliert ein Streit ums Tablet und der Hund bellt im Kofferraum.",
      requiresFamily: true,
      choices: [
        {
          id: "family_stop",
          label: "Kurzer Eis-/Snack-Stopp zur Schlichtung",
          hint: "+15 Min \xB7 12 \u20AC \xB7 -24 Stress",
          timeDeltaMin: 15,
          socDeltaPct: 0,
          costDeltaEur: 12,
          stressDelta: -24,
          decisionPoints: 12,
          resultText: "Nach 15 Minuten und zwei Kugeln Eis herrscht wieder himmlische Ruhe."
        },
        {
          id: "family_firm",
          label: "Klar & ruhig ein Machtwort sprechen (weiterfahren)",
          hint: "Nur bei niedrigem Stress sicher \xB7 0 Min",
          timeDeltaMin: 0,
          socDeltaPct: 0,
          costDeltaEur: 0,
          stressDelta: 12,
          decisionPoints: 6,
          resultText: "Es grummelt noch etwas hinten, aber die Fahrt geht ohne Zeitverlust weiter."
        }
      ]
    },
    evt_carabinieri_trailer: {
      id: "evt_carabinieri_trailer",
      title: "Carabinieri-Kontrolle am Brenner / Italien",
      category: "police",
      icon: "\u{1F693}",
      description: "Die italienische Polizei winkt dein Gespann heraus und pr\xFCft St\xFCtzlast, Anh\xE4ngergewicht und Reifenprofil.",
      requiresTrailer: true,
      choices: [
        {
          id: "polite_docs",
          label: "Freundlich Papiere zeigen & ruhiges Gespr\xE4ch auf Englisch/Italienisch",
          hint: "+10 Min \xB7 +15 Punkte \xB7 minimiert Bu\xDFgeldrisiko",
          timeDeltaMin: 10,
          socDeltaPct: 0,
          costDeltaEur: 0,
          stressDelta: 6,
          decisionPoints: 15,
          resultText: "\u201ETutto bene, buona strada!\u201C \u2013 Die Kontrolle endet freundlich ohne Bu\xDFgeld."
        },
        {
          id: "argue_police",
          label: "Ungeduldig diskutieren & auf deutsche Vorschriften verweisen",
          hint: "60 % Risiko auf 180 \u20AC Vor-Ort-Strafe \xB7 +18 Stress",
          timeDeltaMin: 18,
          socDeltaPct: 0,
          costDeltaEur: 0,
          stressDelta: 18,
          decisionPoints: -12,
          fineRisk: { probability: 0.6, amountEur: 180, label: "Verbale Carabinieri (Gespann)" },
          resultText: "Die Carabinieri ziehen das volle Pr\xFCfprogramm durch\u2026"
        }
      ]
    }
  };
  var WIFE_DIALOGUES = {
    dlg_diesel_remark: {
      id: "dlg_diesel_remark",
      speaker: "Partnerin (Beifahrer / Telefon)",
      quote: "\u201EMit einem Diesel w\xE4re das viel besser gegangen! Jetzt f\xE4llt der Akku und vorne staut es sich auch noch!\u201C",
      contextHint: "Du kannst w\xE4hrend dieses Dialogs rechts/unten die Alternativen auf der Karte pr\xFCfen (z. B. +15 Min Sicherheits-Zwischenladung vs. optimierte Geschwindigkeit) und dann ruhig antworten.",
      suggestedQuickStopMinutes: 14,
      choices: [
        {
          id: "calm_confident",
          text: "\u201EIch verstehe dich total \u2013 schau, die Kurve ist exakt berechnet. Wenn es dir lieber ist, machen wir kurz einen 14-Min-Kaffeestopp am n\xE4chsten Schnelllader.\u201C",
          tone: "calming",
          stressDelta: -22,
          decisionPoints: 20,
          replyText: "\u201EOkay\u2026 danke, dass du meine Sorge ernst nimmst und einen klaren Plan hast. Dann trinken wir kurz einen Kaffee.\u201C"
        },
        {
          id: "data_reassure",
          text: "\u201EKein Grund zur Sorge: Mit 120 km/h verbrauchen wir 25 % weniger und kommen sicher mit Puffer an. Ich habe jede Lades\xE4ule im Blick.\u201C",
          tone: "confident",
          stressDelta: -14,
          decisionPoints: 16,
          replyText: "\u201ENa gut, du hast die Zahlen im Griff. Aber fahr bitte nicht wieder unn\xF6tig 160!\u201C"
        },
        {
          id: "defensive_snap",
          text: "\u201EDer Diesel h\xE4tte heute auch nicht gezaubert \u2013 die Reichweite reicht locker, vertrau mir einfach!\u201C",
          tone: "defensive",
          stressDelta: 14,
          decisionPoints: -10,
          replyText: "\u201ENa toll, wehe wir bleiben nachher mit 0 % auf dem Standstreifen stehen!\u201C"
        }
      ]
    },
    dlg_tight_buffer: {
      id: "dlg_tight_buffer",
      speaker: "Partnerin (Zeitdruck-Check)",
      quote: "\u201EWir haben kaum noch Puffer bis zum Termin! Wenn die n\xE4chste Lades\xE4ule voll ist, wird das richtig eng!\u201C",
      contextHint: "Pr\xFCfe die Belegungsrisiken der n\xE4chsten Stationen auf der Karte oder justiere dein Reisetempo.",
      suggestedQuickStopMinutes: 10,
      choices: [
        {
          id: "proactive_plan",
          text: "\u201EIch habe bewusst den gro\xDFen 20-Stall-Ladepark gew\xE4hlt \u2013 kaum Wartezeit, und wir laden nur genau so viel, wie wir bis zum Ziel brauchen.\u201C",
          tone: "calming",
          stressDelta: -18,
          decisionPoints: 18,
          replyText: "\u201EStimmt, so verlieren wir keine Zeit beim Vollladen auf 100 %. Gute Strategie!\u201C"
        },
        {
          id: "speed_push",
          text: "\u201EDann fahren wir jetzt schneller und laden daf\xFCr sp\xE4ter k\xFCrzer nach \u2013 das holen wir locker auf!\u201C",
          tone: "risky",
          stressDelta: 8,
          decisionPoints: 4,
          replyText: "\u201EMir wird bei dem Tempo und niedrigem Akku echt mulmig\u2026\u201C"
        }
      ]
    }
  };
  function getEventById(id) {
    return GAME_EVENTS[id];
  }
  function getWifeDialogueById(id) {
    return WIFE_DIALOGUES[id];
  }

  // src/data/subscriptions.ts
  var SUBSCRIPTIONS = [
    {
      id: "adhoc",
      name: "Ohne Abo (Ad-hoc / Kreditkarte)",
      provider: "adhoc",
      monthlyFeeEur: 0,
      tripShareFeeEur: 0,
      pricePerKwhOwn: 0.72,
      pricePerKwhRoaming: 0.75,
      bestFor: "Spontanes Laden ohne Grundgeb\xFChr, aber teuer pro kWh.",
      description: "Immer aktivierbar. Kostet nichts monatlich, schl\xE4gt aber mit 0,69\u20130,79 \u20AC/kWh zu Buche."
    },
    {
      id: "tesla_suc",
      name: "Tesla Supercharger Pass",
      provider: "tesla",
      monthlyFeeEur: 9.99,
      tripShareFeeEur: 3.5,
      pricePerKwhOwn: 0.41,
      pricePerKwhRoaming: 0.72,
      specialPerk: "tesla_native",
      teslaFreeIncluded: true,
      bestFor: "Viele Stalls, quasi kein Defektrisiko. F\xFCr Tesla-Fahrer automatisch gratis & Bestpreis!",
      description: "Mit Tesla automatisch ohne Monatsgeb\xFChr inklusive (0,39\u20130,43 \u20AC/kWh). F\xFCr Fremdmarken 9,99 \u20AC/Monat."
    },
    {
      id: "enbw_m",
      name: "EnBW mobility+ M",
      provider: "enbw",
      monthlyFeeEur: 5.99,
      tripShareFeeEur: 2.2,
      pricePerKwhOwn: 0.49,
      pricePerKwhRoaming: 0.59,
      bestFor: "Starke Autobahn-Abdeckung (EnBW-Hubs + Roaming) bei geringer Grundgeb\xFChr.",
      description: "0,49 \u20AC/kWh an EnBW-Schnellladern, solides Roaming an Fremds\xE4ulen."
    },
    {
      id: "enbw_l",
      name: "EnBW mobility+ L",
      provider: "enbw",
      monthlyFeeEur: 17.99,
      tripShareFeeEur: 5.5,
      pricePerKwhOwn: 0.39,
      pricePerKwhRoaming: 0.52,
      bestFor: "Vielfahrer auf deutschen Autobahnen: bester EnBW-kWh-Preis (0,39 \u20AC).",
      description: "H\xF6here Grundgeb\xFChr, lohnt sich ab ~90 kWh auf langen Tagestrips."
    },
    {
      id: "ewe_go",
      name: "EWE Go (inkl. McDonald\u2019s Partner)",
      provider: "ewego",
      monthlyFeeEur: 0,
      tripShareFeeEur: 0,
      pricePerKwhOwn: 0.52,
      pricePerKwhRoaming: 0.62,
      specialPerk: "mcdonalds_comfort",
      bestFor: "0 \u20AC Grundgeb\xFChr + McDonald\u2019s-Ladeparks mit WC/Snack-Bonus (-10 Stress!).",
      description: "Kein Monatsbeitrag! Starkes Ladenetz direkt bei McDonald\u2019s \u2013 senkt Kinder-/Partner-Stress."
    },
    {
      id: "electra_plus",
      name: "Electra+ Fast Pass",
      provider: "electra",
      monthlyFeeEur: 9.99,
      tripShareFeeEur: 3.5,
      pricePerKwhOwn: 0.41,
      pricePerKwhRoaming: 0.6,
      specialPerk: "fast_hubs",
      bestFor: "Moderne 300\u2013400 kW Urban/Autobahn-Hubs mit Buchungs-Sicherheit.",
      description: "0,41 \u20AC/kWh an Electra-Hubs (z. B. Hannover/Ruhrgebiet), niedrige Belegungsquote."
    },
    {
      id: "ionity_passport",
      name: "IONITY Passport Power",
      provider: "ionity",
      monthlyFeeEur: 11.99,
      tripShareFeeEur: 4,
      pricePerKwhOwn: 0.39,
      pricePerKwhRoaming: 0.64,
      specialPerk: "fast_hubs",
      bestFor: "350-kW-Autobahnkorridor quer durch Europa f\xFCr 800V-Fahrzeuge.",
      description: "Ideal f\xFCr Kia EV6, Porsche Taycan und europ\xE4ische Fernstrecken."
    },
    {
      id: "ac_rural_pass",
      name: "Euro-AC Dorf & Stadt Pass",
      provider: "ac_village",
      monthlyFeeEur: 3.99,
      tripShareFeeEur: 1.5,
      pricePerKwhOwn: 0.46,
      pricePerKwhRoaming: 0.58,
      specialPerk: "ac_rural",
      bestFor: "Langsame 11/22-kW-Dorflader in Schottland, Alpen & l\xE4ndlichen Regionen.",
      description: "Verhindert Wucherpreise an AC-S\xE4ulen abseits der Autobahn."
    }
  ];
  function getSubscriptionById(id) {
    return SUBSCRIPTIONS.find((s) => s.id === id) || SUBSCRIPTIONS[0];
  }

  // src/sim/EnergyModel.ts
  function computeConsumptionKwh100(vehicle, speedKmh, weather, elevationGainM, elevationLossM, distanceKm, trailerWeightKg = 0, behindTruck = false) {
    const clampedSpeed = Math.max(40, Math.min(vehicle.maxSpeedKmh, speedKmh));
    const speedRatio = clampedSpeed / 100;
    const speedFactor = speedRatio >= 1 ? 1 + (Math.pow(speedRatio, 1.82) - 1) * vehicle.aeroFactor * 0.62 : 0.84 + 0.16 * speedRatio;
    let weatherMult = 1;
    if (weather === "rain") weatherMult = 1 + 0.11 * vehicle.weatherSensitivity;
    else if (weather === "fog") weatherMult = 1 + 0.04 * vehicle.weatherSensitivity;
    else if (weather === "storm") weatherMult = 1 + 0.18 * vehicle.weatherSensitivity;
    else if (weather === "snow") weatherMult = 1 + 0.28 * vehicle.weatherSensitivity;
    const netGainKwhPer100 = distanceKm > 0 ? (elevationGainM * 56e-4 - elevationLossM * 33e-4) / distanceKm * 100 : 0;
    let trailerMult = 1;
    if (trailerWeightKg > 0) {
      trailerMult = 1.42 + trailerWeightKg / 1500 * 0.18;
      if (behindTruck) trailerMult -= 0.14;
    }
    const raw = vehicle.baseConsumption100 * speedFactor * weatherMult * trailerMult + netGainKwhPer100;
    return Math.max(9.5, Number(raw.toFixed(2)));
  }
  function getChargingPowerKw(vehicle, station, socPct) {
    const curve = vehicle.chargingCurve;
    const s = Math.max(0, Math.min(100, socPct));
    let carKw = curve[curve.length - 1].kw;
    for (let i = 0; i < curve.length - 1; i++) {
      const a = curve[i];
      const b = curve[i + 1];
      if (s >= a.soc && s <= b.soc) {
        const t = (s - a.soc) / Math.max(1, b.soc - a.soc);
        carKw = a.kw + (b.kw - a.kw) * t;
        break;
      }
    }
    return Math.max(5, Math.min(station.maxKw, carKw));
  }
  function getBestPriceForStation(station, subscriptionIds, vehicle) {
    const activeSubs = subscriptionIds.map(getSubscriptionById);
    let bestPrice = station.baseAdhocEurPerKwh;
    let bestName = "Ad-hoc Kartenzahlung";
    let bestId = "adhoc";
    if (station.network === "tesla" && vehicle.isTesla) {
      return {
        pricePerKwh: 0.39,
        usedSubscriptionName: "Tesla Fahrzeug-Tarif (inklusive)",
        usedSubId: "tesla_suc",
        hasMcDonaldsBonus: !!station.hasMcDonalds
      };
    }
    for (const sub of activeSubs) {
      if (sub.id === "adhoc") continue;
      const isOwn = sub.provider === station.network;
      const candidatePrice = isOwn ? sub.pricePerKwhOwn : sub.pricePerKwhRoaming;
      if (candidatePrice < bestPrice) {
        bestPrice = candidatePrice;
        bestName = sub.name;
        bestId = sub.id;
      }
    }
    return {
      pricePerKwh: Number(bestPrice.toFixed(2)),
      usedSubscriptionName: bestName,
      usedSubId: bestId,
      hasMcDonaldsBonus: !!station.hasMcDonalds && (bestId === "ewe_go" || station.network === "ewego")
    };
  }
  function estimateChargeSession(vehicle, station, fromSocPct, toSocPct, subscriptionIds) {
    const start = Math.max(0, Math.min(99, fromSocPct));
    const end = Math.max(start + 1, Math.min(100, toSocPct));
    let totalMinutes = 0;
    let totalKwh = 0;
    const kwhPerPct = vehicle.batteryKwh / 100;
    for (let s = start; s < end; s += 1) {
      const step = Math.min(1, end - s);
      const midSoc = s + step * 0.5;
      const kw = getChargingPowerKw(vehicle, station, midSoc);
      const kwhStep = kwhPerPct * step;
      totalKwh += kwhStep * 1.04;
      totalMinutes += kwhStep / kw * 60;
    }
    totalMinutes += 2.5;
    const tariff = getBestPriceForStation(station, subscriptionIds, vehicle);
    const costEur = totalKwh * tariff.pricePerKwh;
    const avgKw = totalKwh / Math.max(0.05, (totalMinutes - 2.5) / 60);
    return {
      kwhAdded: Number(totalKwh.toFixed(1)),
      durationMinutes: Math.round(totalMinutes),
      avgKw: Math.round(avgKw),
      costEur: Number(costEur.toFixed(2)),
      tariff
    };
  }
  function computeSubscriptionTripCost(subscriptionIds, vehicle) {
    let sum = 0;
    for (const id of subscriptionIds) {
      const sub = getSubscriptionById(id);
      if (sub.id === "tesla_suc" && vehicle.isTesla) continue;
      sum += sub.tripShareFeeEur;
    }
    return Number(sum.toFixed(2));
  }

  // src/sim/RoutePlanner.ts
  function createDefaultPlan(level, vehicleId) {
    const vehicle = getVehicleById(vehicleId);
    const legPlans = level.routeLegs.map((leg, idx) => ({
      legIndex: idx,
      targetSpeedKmh: Math.min(vehicle.maxSpeedKmh, leg.defaultTargetSpeedKmh)
    }));
    const plannedStops = [];
    if (level.id === "level_1_aachen_hannover") {
      plannedStops.push(
        { chargerId: "chg_kamen_tesla", legIndex: 2, targetSocPct: 80 },
        { chargerId: "chg_hannover_enbw", legIndex: 3, targetSocPct: 78 },
        { chargerId: "chg_kamen_enbw", legIndex: 6, targetSocPct: 80 }
      );
    }
    const subscriptionIds = vehicle.isTesla ? ["tesla_suc", "ewe_go"] : ["enbw_m", "ewe_go"];
    return {
      vehicleId,
      subscriptionIds,
      legPlans,
      plannedStops
    };
  }
  function evaluateTripPlan(level, plan) {
    const vehicle = getVehicleById(plan.vehicleId);
    let soc = 96;
    let minSoc = soc;
    let totalDist = 0;
    let totalDriveMin = 0;
    let totalChargeMin = 0;
    let totalChargeCost = 0;
    let totalTolls = 0;
    let totalEnergyKwh = 0;
    const warnings = [];
    const legForecasts = [];
    for (let i = 0; i < level.routeLegs.length; i++) {
      const spec = level.routeLegs[i];
      const edge = getEdgeById(spec.edgeId);
      const lp = plan.legPlans.find((x) => x.legIndex === i);
      const speed = Math.min(vehicle.maxSpeedKmh, lp ? lp.targetSpeedKmh : spec.defaultTargetSpeedKmh);
      const weather = spec.weatherOverride || edge.defaultWeather;
      const fromCity = getCityById(spec.reverse ? edge.toCityId : edge.fromCityId);
      const toCity = getCityById(spec.reverse ? edge.fromCityId : edge.toCityId);
      const elevGain = spec.reverse ? edge.elevationLossM : edge.elevationGainM;
      const elevLoss = spec.reverse ? edge.elevationGainM : edge.elevationLossM;
      const cons100 = computeConsumptionKwh100(
        vehicle,
        speed,
        weather,
        elevGain,
        elevLoss,
        edge.distanceKm,
        level.trailerWeightKg || 0,
        !!plan.behindTruckMode
      );
      const stopsOnLeg = plan.plannedStops.filter((s) => s.legIndex === i).map((s) => {
        const st = getChargersForEdge(edge.id).find((c) => c.id === s.chargerId);
        if (!st) return null;
        const progressAlongRun = spec.reverse ? 1 - st.edgeProgress : st.edgeProgress;
        return { stop: s, station: st, progress: progressAlongRun };
      }).filter((x) => x !== null).sort((a, b) => a.progress - b.progress);
      const startSoc = soc;
      let cursorProgress = 0;
      let legChargeMin = 0;
      const stopSummaries = [];
      for (const item of stopsOnLeg) {
        const segKm = Math.max(0, (item.progress - cursorProgress) * edge.distanceKm);
        const segKwh = segKm / 100 * cons100;
        totalEnergyKwh += segKwh;
        soc -= segKwh / vehicle.batteryKwh * 100;
        minSoc = Math.min(minSoc, soc);
        const arriveSoc = soc;
        if (arriveSoc <= 0) {
          warnings.push(`Liegenbleiber vor \u201E${item.station.name}\u201C auf Etappe ${i + 1}!`);
        }
        const target = Math.max(arriveSoc + 5, item.stop.targetSocPct);
        const est = estimateChargeSession(
          vehicle,
          item.station,
          Math.max(1, arriveSoc),
          target,
          plan.subscriptionIds
        );
        legChargeMin += est.durationMinutes;
        totalChargeMin += est.durationMinutes;
        totalChargeCost += est.costEur;
        soc = Math.min(100, target);
        cursorProgress = item.progress;
        stopSummaries.push({
          station: item.station,
          arriveSoc: Math.round(arriveSoc),
          departSoc: Math.round(soc),
          minutes: est.durationMinutes,
          costEur: est.costEur
        });
      }
      const remKm = Math.max(0, (1 - cursorProgress) * edge.distanceKm);
      const remKwh = remKm / 100 * cons100;
      totalEnergyKwh += remKwh;
      soc -= remKwh / vehicle.batteryKwh * 100;
      minSoc = Math.min(minSoc, soc);
      const effectiveAvg = speed * 0.91;
      const driveMin = Math.round(edge.distanceKm / Math.max(40, effectiveAvg) * 60);
      totalDist += edge.distanceKm;
      totalDriveMin += driveMin;
      totalTolls += edge.tollEur;
      const policeRisk = edge.speedLimitKmh > 0 && speed > edge.speedLimitKmh + 8 ? Math.min(0.95, edge.policeRiskBase + (speed - edge.speedLimitKmh) * 0.015) : speed > 145 ? edge.policeRiskBase * 0.85 : edge.policeRiskBase * 0.25;
      const breakdownRisk = soc < 0 || minSoc < 0;
      if (soc < 0) {
        warnings.push(`Akku leer auf Etappe ${i + 1} (${fromCity.name} \u2192 ${toCity.name})!`);
      } else if (soc < 8 && i === level.routeLegs.length - 1) {
        warnings.push(`Sehr knappe Restreichweite am Ziel (${Math.round(soc)} %)!`);
      }
      if (policeRisk > 0.45) {
        warnings.push(`Hohes Blitzer-Risiko auf Etappe ${i + 1} (${speed} km/h)!`);
      }
      legForecasts.push({
        legIndex: i,
        label: `${fromCity.name} \u2192 ${toCity.name}`,
        highwayName: edge.highwayName,
        distanceKm: edge.distanceKm,
        targetSpeedKmh: speed,
        speedLimitKmh: edge.speedLimitKmh,
        weather,
        consumptionKwh100: cons100,
        startSocPct: Math.round(startSoc),
        endSocPct: Math.round(soc),
        driveMinutes: driveMin,
        chargeMinutes: legChargeMin,
        stopSummaries,
        policeRisk,
        breakdownRisk
      });
    }
    const subscriptionCostEur = computeSubscriptionTripCost(plan.subscriptionIds, vehicle);
    const turnaroundMin = level.id === "level_1_aachen_hannover" ? 28 : 0;
    const totalMinutes = totalDriveMin + totalChargeMin + turnaroundMin;
    if (totalMinutes > level.targetArrivalMinutes + 25) {
      warnings.push(
        `Geplante Reisezeit (${Math.round(totalMinutes)} Min) \xFCberschreitet das Ziel (${level.targetArrivalMinutes} Min).`
      );
    }
    return {
      valid: minSoc > 0,
      totalDistanceKm: Math.round(totalDist),
      totalDriveMinutes: totalDriveMin,
      totalChargeMinutes: totalChargeMin,
      totalMinutes,
      estimatedChargingCostEur: Number(totalChargeCost.toFixed(2)),
      subscriptionCostEur,
      tollsEur: Number(totalTolls.toFixed(2)),
      estimatedTotalCostEur: Number((totalChargeCost + subscriptionCostEur + totalTolls).toFixed(2)),
      minSocEncountered: Math.round(minSoc),
      avgConsumptionKwh100: Number((totalEnergyKwh / Math.max(1, totalDist) * 100).toFixed(1)),
      legForecasts,
      warnings: Array.from(new Set(warnings))
    };
  }
  function findNearestAvailableCharger(level, legIndex, progress01, alreadyVisitedIds) {
    for (let i = legIndex; i < level.routeLegs.length; i++) {
      const spec = level.routeLegs[i];
      const candidates = getChargersForEdge(spec.edgeId).filter((c) => !alreadyVisitedIds.includes(c.id)).map((c) => {
        const p = spec.reverse ? 1 - c.edgeProgress : c.edgeProgress;
        return { station: c, p };
      }).filter((x) => i > legIndex ? true : x.p > progress01 + 0.03).sort((a, b) => a.p - b.p);
      if (candidates.length > 0) {
        return { legIndex: i, station: candidates[0].station };
      }
    }
    return null;
  }

  // src/sim/ScoringEngine.ts
  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }
  function evaluateRun(level, run, cleanParkBonus) {
    const w = level.scoringWeights;
    const vehicle = getVehicleById(run.plan.vehicleId);
    const timeDelta = run.elapsedMinutes - level.targetArrivalMinutes;
    const timeScore = clamp(
      timeDelta <= 0 ? 100 - Math.max(0, -timeDelta * 0.05) : 100 - timeDelta * 1.15,
      12,
      100
    );
    const totalCostEur = Number(
      (run.chargingCostEur + run.subscriptionCostEur + run.tollsAndFinesEur).toFixed(2)
    );
    const benchmarkCost = Math.max(30, run.distanceDrivenKm * 0.082);
    const costRatio = totalCostEur / benchmarkCost;
    const costScore = clamp(115 - costRatio * 34, 15, 100);
    const stressPenalty = run.peakStress * 0.65 + run.stress * 0.35;
    const stressScore = w.stress === 0 ? 100 : clamp(108 - stressPenalty * 1.05, 10, 100);
    const avgConsumption = run.energyUsedKwh / Math.max(1, run.distanceDrivenKm) * 100;
    const efficiencyRatio = avgConsumption / vehicle.baseConsumption100;
    const effBase = clamp(128 - efficiencyRatio * 34 + run.chargingEfficiencyBonus, 15, 100);
    const collisionPenalty = run.collisionsCount * 14;
    const parkBonus = cleanParkBonus ? 12 : 0;
    const decisionsScore = clamp(
      56 + run.decisionScoreAccum + run.goodReplanCount * 8 + parkBonus - collisionPenalty,
      10,
      100
    );
    const weighted = timeScore * w.time + costScore * w.cost + stressScore * w.stress + effBase * w.efficiency + decisionsScore * w.decisions;
    const totalScore = Math.round(clamp(weighted * 10, 100, 1e3));
    const prizeMultiplier = 0.55 + totalScore / 1e3 * 0.95;
    const prizeMoneyEur = Math.round(level.rewardBaseEur * prizeMultiplier);
    let gradeLabel = "Solide E-Fahrt";
    if (totalScore >= 880) gradeLabel = "S-Rang \xB7 Langstrecken-Meister!";
    else if (totalScore >= 760) gradeLabel = "A-Rang \xB7 Souver\xE4n geplant";
    else if (totalScore >= 620) gradeLabel = "B-Rang \xB7 Sicher angekommen";
    else if (totalScore < 480) gradeLabel = "C-Rang \xB7 Nervenaufreibend";
    return {
      totalScore,
      subScores: {
        time: Math.round(timeScore),
        cost: Math.round(costScore),
        stress: Math.round(stressScore),
        efficiency: Math.round(effBase),
        decisions: Math.round(decisionsScore)
      },
      weights: { ...w },
      totalMinutes: Math.round(run.elapsedMinutes),
      targetMinutes: level.targetArrivalMinutes,
      totalCostEur,
      avgConsumptionKwh100: Number(avgConsumption.toFixed(1)),
      peakStress: Math.round(run.peakStress),
      prizeMoneyEur,
      cleanArrival: cleanParkBonus && run.collisionsCount === 0,
      gradeLabel
    };
  }

  // src/sim/SaveState.ts
  var SAVE_KEY = "eroadtrip_campaign_v1";
  function loadCampaignSave() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          cashEur: typeof parsed.cashEur === "number" ? parsed.cashEur : 26e3,
          ownedVehicleId: typeof parsed.ownedVehicleId === "string" ? parsed.ownedVehicleId : null,
          unlockedLevelOrder: typeof parsed.unlockedLevelOrder === "number" ? parsed.unlockedLevelOrder : 1,
          completedLevels: parsed.completedLevels && typeof parsed.completedLevels === "object" ? parsed.completedLevels : {}
        };
      }
    } catch (_) {
    }
    return {
      cashEur: 26e3,
      ownedVehicleId: null,
      unlockedLevelOrder: 1,
      completedLevels: {}
    };
  }
  function saveCampaignState(save) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    } catch (_) {
    }
  }
  function getResaleValue(vehicleId) {
    const v = getVehicleById(vehicleId);
    return Math.round(v.priceEur * (1 - v.depreciationRate));
  }
  function resetCampaignSave() {
    const fresh = {
      cashEur: 26e3,
      ownedVehicleId: null,
      unlockedLevelOrder: 1,
      completedLevels: {}
    };
    saveCampaignState(fresh);
    return fresh;
  }

  // src/phaser/BootScene.ts
  var Phaser = __toESM(require_phaser());

  // src/phaser/PixelArtGenerator.ts
  function hexCss(col) {
    return "#" + col.toString(16).padStart(6, "0");
  }
  function shadeHex(col, factor) {
    const r = Math.min(255, Math.max(0, Math.round((col >> 16 & 255) * factor)));
    const g = Math.min(255, Math.max(0, Math.round((col >> 8 & 255) * factor)));
    const b = Math.min(255, Math.max(0, Math.round((col & 255) * factor)));
    return `rgb(${r},${g},${b})`;
  }
  function drawTopDownCarTexture(scene, key, shape, primaryColor, accentColor, options) {
    if (scene.textures.exists(key)) return;
    const w = 32;
    const h = 52;
    const tex = scene.textures.createCanvas(key, w, h);
    if (!tex) return;
    const ctx = tex.getContext();
    ctx.imageSmoothingEnabled = false;
    const body = hexCss(primaryColor);
    const darkBody = shadeHex(primaryColor, 0.72);
    const lightBody = shadeHex(primaryColor, 1.18);
    const accent = hexCss(accentColor);
    ctx.fillStyle = "rgba(0,0,0,0.34)";
    ctx.fillRect(5, 5, 24, 44);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(2, 10, 4, 9);
    ctx.fillRect(26, 10, 4, 9);
    ctx.fillRect(2, 34, 4, 9);
    ctx.fillRect(26, 34, 4, 9);
    ctx.fillStyle = darkBody;
    ctx.fillRect(5, 4, 22, 44);
    ctx.fillStyle = body;
    ctx.fillRect(6, 5, 20, 42);
    ctx.fillStyle = lightBody;
    if (shape === "sport") {
      ctx.fillRect(8, 5, 16, 12);
      ctx.fillStyle = darkBody;
      ctx.fillRect(10, 7, 12, 3);
    } else if (shape === "sedan_aero") {
      ctx.fillRect(7, 5, 18, 12);
    } else {
      ctx.fillRect(7, 6, 18, 10);
    }
    ctx.fillStyle = darkBody;
    ctx.fillRect(3, 16, 3, 3);
    ctx.fillRect(26, 16, 3, 3);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(7, 15, 18, 7);
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(8, 16, 16, 4);
    if (options?.isVan) {
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(7, 22, 18, 22);
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(9, 25, 14, 16);
    } else if (shape === "hatchback") {
      ctx.fillStyle = accent;
      ctx.fillRect(8, 22, 16, 16);
      ctx.fillStyle = "#334155";
      ctx.fillRect(8, 39, 16, 4);
    } else if (shape === "sedan_aero" || shape === "sport") {
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(8, 22, 16, 17);
      ctx.fillStyle = "#1e3a8a";
      ctx.fillRect(9, 23, 14, 14);
      if (shape === "sport") {
        ctx.fillStyle = accent;
        ctx.fillRect(6, 44, 20, 3);
      }
    } else if (shape === "suv" || shape === "touring") {
      ctx.fillStyle = body;
      ctx.fillRect(8, 22, 16, 18);
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(9, 24, 14, 11);
      ctx.fillStyle = "#334155";
      ctx.fillRect(8, 41, 16, 4);
      ctx.fillStyle = accent;
      ctx.fillRect(7, 22, 1, 20);
      ctx.fillRect(24, 22, 1, 20);
    }
    if (options?.isPolice) {
      ctx.fillStyle = "#1d4ed8";
      ctx.fillRect(6, 18, 20, 22);
      ctx.fillStyle = "#facc15";
      ctx.fillRect(6, 25, 20, 2);
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(9, 24, 6, 3);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(17, 24, 6, 3);
    }
    ctx.fillStyle = "#fef08a";
    ctx.fillRect(7, 4, 4, 2);
    ctx.fillRect(21, 4, 4, 2);
    ctx.fillStyle = "#ef4444";
    if (shape === "hatchback" || shape === "sport") {
      ctx.fillRect(7, 46, 18, 2);
    } else {
      ctx.fillRect(7, 46, 5, 2);
      ctx.fillRect(20, 46, 5, 2);
    }
    tex.refresh();
  }
  function drawTruckTexture(scene) {
    const key = "npc_truck";
    if (scene.textures.exists(key)) return;
    const tex = scene.textures.createCanvas(key, 36, 92);
    if (!tex) return;
    const ctx = tex.getContext();
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(5, 5, 28, 84);
    ctx.fillStyle = "#0f172a";
    [10, 22, 54, 72].forEach((y) => {
      ctx.fillRect(2, y, 4, 9);
      ctx.fillRect(30, y, 4, 9);
    });
    ctx.fillStyle = "#b91c1c";
    ctx.fillRect(6, 4, 24, 22);
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(7, 5, 22, 19);
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(8, 10, 20, 5);
    ctx.fillStyle = "#fef08a";
    ctx.fillRect(7, 4, 5, 2);
    ctx.fillRect(24, 4, 5, 2);
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(5, 28, 26, 60);
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(7, 30, 22, 56);
    ctx.fillStyle = "#2563eb";
    ctx.fillRect(10, 42, 16, 30);
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(7, 86, 5, 2);
    ctx.fillRect(24, 86, 5, 2);
    tex.refresh();
  }
  function drawCyclistTexture(scene, key, jerseyHex) {
    if (scene.textures.exists(key)) return;
    const tex = scene.textures.createCanvas(key, 16, 26);
    if (!tex) return;
    const ctx = tex.getContext();
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.fillRect(5, 4, 8, 20);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(7, 2, 2, 22);
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(3, 6, 10, 2);
    ctx.fillStyle = jerseyHex;
    ctx.fillRect(4, 9, 8, 9);
    ctx.fillStyle = "#facc15";
    ctx.fillRect(5, 6, 6, 5);
    tex.refresh();
  }
  function drawPedestrianTexture(scene, key, shirtHex, isChild) {
    if (scene.textures.exists(key)) return;
    const size = isChild ? 14 : 18;
    const tex = scene.textures.createCanvas(key, size, size);
    if (!tex) return;
    const ctx = tex.getContext();
    ctx.imageSmoothingEnabled = false;
    const c = Math.floor(size / 2);
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.fillRect(c - 4, c - 3, 9, 9);
    ctx.fillStyle = shirtHex;
    ctx.fillRect(c - (isChild ? 4 : 5), c - 3, isChild ? 8 : 10, isChild ? 6 : 7);
    if (isChild) {
      ctx.fillStyle = "#f97316";
      ctx.fillRect(c - 3, c + 2, 6, 3);
    }
    ctx.fillStyle = "#fde68a";
    ctx.fillRect(c - 3, c - 5, 6, 5);
    ctx.fillStyle = "#451a03";
    ctx.fillRect(c - 3, c - 6, 6, 2);
    tex.refresh();
  }
  function drawChargerStallTexture(scene, net) {
    const key = `charger_${net}`;
    if (scene.textures.exists(key)) return;
    const tex = scene.textures.createCanvas(key, 20, 20);
    if (!tex) return;
    const ctx = tex.getContext();
    ctx.imageSmoothingEnabled = false;
    const colors = {
      tesla: { body: "#f8fafc", accent: "#dc2626" },
      enbw: { body: "#1d4ed8", accent: "#f97316" },
      ewego: { body: "#15803d", accent: "#facc15" },
      electra: { body: "#5b21b6", accent: "#22d3ee" },
      ionity: { body: "#0f172a", accent: "#ec4899" },
      ac_village: { body: "#334155", accent: "#4ade80" }
    };
    const c = colors[net];
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(4, 4, 14, 14);
    ctx.fillStyle = c.body;
    ctx.fillRect(3, 2, 14, 14);
    ctx.fillStyle = c.accent;
    ctx.fillRect(5, 4, 10, 4);
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(6, 11, 8, 2);
    tex.refresh();
  }
  function drawLandmarkTexture(scene, kind) {
    const key = `landmark_${kind}`;
    if (scene.textures.exists(key)) return;
    const tex = scene.textures.createCanvas(key, 32, 32);
    if (!tex) return;
    const ctx = tex.getContext();
    ctx.imageSmoothingEnabled = false;
    if (kind === "aachen_dom") {
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(6, 18, 20, 11);
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(9, 10, 14, 10);
      ctx.fillStyle = "#1e3a8a";
      ctx.fillRect(14, 2, 4, 8);
      ctx.fillStyle = "#facc15";
      ctx.fillRect(15, 1, 2, 2);
    } else if (kind === "koeln_dom") {
      ctx.fillStyle = "#64748b";
      ctx.fillRect(6, 16, 20, 13);
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(8, 5, 5, 14);
      ctx.fillRect(19, 5, 5, 14);
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(10, 2, 1, 4);
      ctx.fillRect(21, 2, 1, 4);
    } else if (kind === "hermesturm") {
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(14, 4, 4, 25);
      ctx.fillStyle = "#2563eb";
      ctx.fillRect(11, 8, 10, 4);
      ctx.fillStyle = "#f97316";
      ctx.fillRect(7, 22, 18, 7);
    } else if (kind === "eiffel") {
      ctx.fillStyle = "#78716c";
      ctx.fillRect(15, 2, 2, 10);
      ctx.fillRect(13, 12, 6, 8);
      ctx.fillRect(9, 20, 14, 9);
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(13, 23, 6, 6);
    } else if (kind === "fernsehturm") {
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(15, 2, 2, 27);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(12, 8, 8, 6);
    } else if (kind === "alps") {
      ctx.fillStyle = "#475569";
      ctx.fillRect(4, 18, 24, 11);
      ctx.fillRect(8, 11, 16, 9);
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(11, 6, 10, 7);
      ctx.fillRect(14, 3, 4, 4);
    } else if (kind === "nordkapp") {
      ctx.fillStyle = "#334155";
      ctx.fillRect(6, 20, 20, 9);
      ctx.fillStyle = "#facc15";
      ctx.fillRect(11, 7, 10, 10);
      ctx.fillStyle = "#0ea5e9";
      ctx.fillRect(13, 9, 6, 6);
    } else if (kind === "ferry") {
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(2, 22, 28, 7);
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(6, 13, 20, 9);
      ctx.fillStyle = "#dc2626";
      ctx.fillRect(13, 8, 5, 5);
    } else if (kind === "colosseum") {
      ctx.fillStyle = "#d6d3d1";
      ctx.fillRect(5, 13, 22, 16);
      ctx.fillStyle = "#78716c";
      ctx.fillRect(8, 17, 4, 6);
      ctx.fillRect(14, 17, 4, 6);
      ctx.fillRect(20, 17, 4, 6);
    } else {
      ctx.fillStyle = "#64748b";
      ctx.fillRect(6, 13, 20, 16);
      ctx.fillStyle = "#475569";
      ctx.fillRect(6, 9, 5, 6);
      ctx.fillRect(21, 9, 5, 6);
      ctx.fillStyle = "#15803d";
      ctx.fillRect(3, 25, 26, 4);
    }
    tex.refresh();
  }
  function drawMiscTextures(scene) {
    ["red", "amber", "green"].forEach((state) => {
      const key = `tlight_${state}`;
      if (scene.textures.exists(key)) return;
      const tex = scene.textures.createCanvas(key, 12, 24);
      if (!tex) return;
      const ctx = tex.getContext();
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(2, 1, 8, 22);
      ctx.fillStyle = state === "red" ? "#ef4444" : "#450a0a";
      ctx.fillRect(4, 3, 4, 4);
      ctx.fillStyle = state === "amber" ? "#facc15" : "#422006";
      ctx.fillRect(4, 10, 4, 4);
      ctx.fillStyle = state === "green" ? "#22c55e" : "#052e16";
      ctx.fillRect(4, 17, 4, 4);
      tex.refresh();
    });
    if (!scene.textures.exists("cone")) {
      const tex = scene.textures.createCanvas("cone", 12, 12);
      if (tex) {
        const ctx = tex.getContext();
        ctx.fillStyle = "#ea580c";
        ctx.fillRect(2, 2, 8, 8);
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(4, 4, 4, 4);
        tex.refresh();
      }
    }
    if (!scene.textures.exists("pixel_tree")) {
      const tex = scene.textures.createCanvas("pixel_tree", 28, 28);
      if (tex) {
        const ctx = tex.getContext();
        ctx.fillStyle = "rgba(0,0,0,0.28)";
        ctx.fillRect(6, 6, 20, 20);
        ctx.fillStyle = "#14532d";
        ctx.fillRect(4, 4, 20, 20);
        ctx.fillStyle = "#15803d";
        ctx.fillRect(6, 6, 16, 16);
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(9, 8, 10, 10);
        tex.refresh();
      }
    }
    if (!scene.textures.exists("mcd_kiosk")) {
      const tex = scene.textures.createCanvas("mcd_kiosk", 72, 48);
      if (tex) {
        const ctx = tex.getContext();
        ctx.fillStyle = "rgba(0,0,0,0.32)";
        ctx.fillRect(4, 4, 66, 42);
        ctx.fillStyle = "#991b1b";
        ctx.fillRect(2, 2, 66, 40);
        ctx.fillStyle = "#dc2626";
        ctx.fillRect(5, 5, 60, 34);
        ctx.fillStyle = "#facc15";
        ctx.fillRect(22, 14, 5, 16);
        ctx.fillRect(32, 14, 5, 16);
        ctx.fillRect(42, 14, 5, 16);
        ctx.fillRect(22, 11, 25, 4);
        tex.refresh();
      }
    }
    if (!scene.textures.exists("rain_drop")) {
      const tex = scene.textures.createCanvas("rain_drop", 2, 10);
      if (tex) {
        const ctx = tex.getContext();
        ctx.fillStyle = "rgba(186, 230, 253, 0.72)";
        ctx.fillRect(0, 0, 2, 10);
        tex.refresh();
      }
    }
    if (!scene.textures.exists("confetti_px")) {
      const tex = scene.textures.createCanvas("confetti_px", 6, 6);
      if (tex) {
        const ctx = tex.getContext();
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 6, 6);
        tex.refresh();
      }
    }
  }
  function generateAllPixelTextures(scene) {
    VEHICLES.forEach((v) => {
      drawTopDownCarTexture(scene, `car_${v.id}`, v.shape, v.primaryColor, v.accentColor);
    });
    drawTopDownCarTexture(scene, "npc_sedan_blue", "sedan_aero", 2450411, 988970);
    drawTopDownCarTexture(scene, "npc_compact_green", "hatchback", 1483594, 16317180);
    drawTopDownCarTexture(scene, "npc_van_white", "touring", 15857145, 4674921, { isVan: true });
    drawTopDownCarTexture(scene, "npc_police", "sedan_aero", 14870768, 1920728, { isPolice: true });
    drawTruckTexture(scene);
    drawCyclistTexture(scene, "cyclist_0", "#ef4444");
    drawCyclistTexture(scene, "cyclist_1", "#38bdf8");
    drawPedestrianTexture(scene, "ped_adult_0", "#e11d48", false);
    drawPedestrianTexture(scene, "ped_adult_1", "#0284c7", false);
    drawPedestrianTexture(scene, "ped_child", "#facc15", true);
    ["tesla", "enbw", "ewego", "electra", "ionity", "ac_village"].forEach((net) => {
      drawChargerStallTexture(scene, net);
    });
    [
      "aachen_dom",
      "koeln_dom",
      "hermesturm",
      "fernsehturm",
      "eiffel",
      "alps",
      "ferry",
      "nordkapp",
      "highlands",
      "colosseum"
    ].forEach((lm) => drawLandmarkTexture(scene, lm));
    drawMiscTextures(scene);
  }

  // src/phaser/BootScene.ts
  var BootScene = class extends Phaser.Scene {
    constructor() {
      super({ key: "BootScene" });
    }
    init(data) {
      this.bridge = data.bridge;
    }
    create() {
      generateAllPixelTextures(this);
      this.bridge.onBootReady();
      this.scene.start("EuropeMapScene", { bridge: this.bridge });
    }
  };

  // src/phaser/EuropeMapScene.ts
  var Phaser2 = __toESM(require_phaser());

  // src/phaser/SoundFX.ts
  var SoundFXManager = class {
    constructor() {
      this.ctx = null;
    }
    isMuted() {
      try {
        return !!(window.ArcadeAudio && window.ArcadeAudio.isMuted());
      } catch (_) {
        return false;
      }
    }
    ensure() {
      if (this.isMuted()) return null;
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {
        });
      }
      return this.ctx;
    }
    beep(freq, dur, type, vol, freqEnd) {
      const c = this.ensure();
      if (!c) return;
      const t0 = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      if (freqEnd !== void 0) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(30, freqEnd), t0 + dur);
      }
      gain.gain.setValueAtTime(vol, t0);
      gain.gain.exponentialRampToValueAtTime(1e-3, t0 + dur);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.01);
    }
    horn() {
      this.beep(392, 0.14, "sawtooth", 0.07);
      this.beep(494, 0.14, "sawtooth", 0.06);
    }
    plugIn() {
      this.beep(320, 0.08, "triangle", 0.1, 680);
      setTimeout(() => this.beep(880, 0.14, "sine", 0.11, 1180), 80);
    }
    chargeDone() {
      this.beep(523.25, 0.1, "triangle", 0.1);
      setTimeout(() => this.beep(659.25, 0.1, "triangle", 0.1), 90);
      setTimeout(() => this.beep(1046.5, 0.18, "triangle", 0.12), 180);
    }
    bump() {
      this.beep(125, 0.16, "square", 0.11, 45);
    }
    alert() {
      this.beep(660, 0.09, "triangle", 0.09);
      setTimeout(() => this.beep(520, 0.14, "triangle", 0.09), 110);
    }
    click() {
      if (window.ArcadeAudio) window.ArcadeAudio.click();
      else this.beep(560, 0.04, "triangle", 0.07);
    }
    win() {
      if (window.ArcadeAudio) window.ArcadeAudio.win();
      else {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
          setTimeout(() => this.beep(f, 0.18, "triangle", 0.12), idx * 95);
        });
      }
    }
  };
  var SoundFX = new SoundFXManager();

  // src/phaser/EuropeMapScene.ts
  var EuropeMapScene = class extends Phaser2.Scene {
    constructor() {
      super({ key: "EuropeMapScene" });
      this.pinObjects = [];
      this.mapBounds = { w: 1e3, h: 760 };
    }
    init(data) {
      this.bridge = data.bridge;
    }
    create() {
      this.worldLayer = this.add.container(0, 0);
      this.drawStylizedEuropeMap();
      this.dynamicOverlay = this.add.graphics();
      this.worldLayer.add(this.dynamicOverlay);
      this.drawCitiesAndLandmarks();
      this.createChargerPins();
      this.createLiveCarMarker();
      this.fitCameraToRoute();
      this.setupPanAndZoom();
      this.refreshDynamicState();
      this.scale.on("resize", () => {
        this.fitCameraToRoute();
      });
    }
    drawStylizedEuropeMap() {
      const g = this.add.graphics();
      this.worldLayer.add(g);
      g.fillStyle(794168, 1);
      g.fillRect(0, 0, this.mapBounds.w, this.mapBounds.h);
      g.lineStyle(1, 1454679, 0.45);
      for (let x = 0; x <= this.mapBounds.w; x += 32) {
        g.lineBetween(x, 0, x, this.mapBounds.h);
      }
      for (let y = 0; y <= this.mapBounds.h; y += 32) {
        g.lineBetween(0, y, this.mapBounds.w, y);
      }
      g.fillStyle(2046510, 1);
      g.lineStyle(3, 3894866, 1);
      const mainland = [
        { x: 165, y: 490 },
        { x: 225, y: 430 },
        { x: 315, y: 342 },
        { x: 380, y: 300 },
        { x: 465, y: 270 },
        { x: 500, y: 185 },
        // Jutland / Hirtshals
        { x: 538, y: 268 },
        { x: 648, y: 280 },
        { x: 760, y: 318 },
        { x: 750, y: 525 },
        { x: 615, y: 560 },
        { x: 610, y: 695 },
        // Italy boot
        { x: 520, y: 705 },
        { x: 495, y: 570 },
        { x: 365, y: 590 },
        { x: 220, y: 565 }
      ];
      g.fillPoints(mainland, true);
      g.strokePoints(mainland, true);
      const uk = [
        { x: 175, y: 155 },
        { x: 245, y: 150 },
        { x: 268, y: 280 },
        { x: 258, y: 365 },
        { x: 180, y: 365 },
        { x: 165, y: 245 }
      ];
      g.fillStyle(2311222, 1);
      g.fillPoints(uk, true);
      g.strokePoints(uk, true);
      const scand = [
        { x: 490, y: 160 },
        { x: 560, y: 92 },
        { x: 675, y: 40 },
        { x: 745, y: 75 },
        { x: 685, y: 195 },
        { x: 585, y: 245 },
        { x: 515, y: 220 }
      ];
      g.fillStyle(2441789, 1);
      g.fillPoints(scand, true);
      g.strokePoints(scand, true);
      g.fillStyle(2969407, 0.85);
      g.fillRect(344, 326, 290, 180);
      g.fillStyle(4148318, 0.85);
      g.fillRect(455, 520, 165, 50);
      HIGHWAY_EDGES.forEach((edge) => {
        g.lineStyle(4, 4674921, 0.55);
        for (let i = 0; i < edge.waypoints.length - 1; i++) {
          g.lineBetween(
            edge.waypoints[i].x,
            edge.waypoints[i].y,
            edge.waypoints[i + 1].x,
            edge.waypoints[i + 1].y
          );
        }
      });
    }
    drawCitiesAndLandmarks() {
      const activeEdgeIds = new Set(this.bridge.level.routeLegs.map((l) => l.edgeId));
      const activeCityIds = /* @__PURE__ */ new Set();
      this.bridge.level.routeLegs.forEach((l) => {
        const e = getEdgeById(l.edgeId);
        activeCityIds.add(e.fromCityId);
        activeCityIds.add(e.toCityId);
      });
      CITIES.forEach((city) => {
        const isActive = activeCityIds.has(city.id);
        const dot = this.add.circle(
          city.mapX,
          city.mapY,
          isActive ? 5 : 3.5,
          isActive ? 3718648 : 9741240
        );
        dot.setStrokeStyle(1.5, 988970);
        this.worldLayer.add(dot);
        if (city.landmark) {
          const lm = this.add.image(city.mapX, city.mapY - 16, `landmark_${city.landmark}`);
          lm.setScale(isActive ? 0.9 : 0.72);
          lm.setAlpha(isActive ? 1 : 0.75);
          this.worldLayer.add(lm);
        }
        const label = this.add.text(city.mapX, city.mapY + 8, city.name, {
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: isActive ? "10px" : "9px",
          fontStyle: isActive ? "bold" : "normal",
          color: isActive ? "#f8fafc" : "#94a3b8",
          backgroundColor: "rgba(15, 23, 42, 0.72)",
          padding: { x: 4, y: 1 }
        });
        label.setOrigin(0.5, 0);
        this.worldLayer.add(label);
      });
      HIGHWAY_EDGES.filter((e) => activeEdgeIds.has(e.id)).forEach((edge) => {
        const mid = edge.waypoints[Math.floor(edge.waypoints.length / 2)];
        const tag = this.add.text(mid.x, mid.y - 12, edge.highwayName, {
          fontFamily: "monospace",
          fontSize: "8px",
          color: "#93c5fd",
          backgroundColor: "rgba(30, 58, 138, 0.8)",
          padding: { x: 3, y: 1 }
        });
        tag.setOrigin(0.5, 0.5);
        this.worldLayer.add(tag);
      });
    }
    createChargerPins() {
      const activeEdgeIds = new Set(this.bridge.level.routeLegs.map((l) => l.edgeId));
      const relevantChargers = CHARGERS.filter((c) => activeEdgeIds.has(c.edgeId));
      relevantChargers.forEach((station) => {
        const marker = this.add.circle(station.mapX, station.mapY, 6, 1976635);
        marker.setStrokeStyle(2, 3718648);
        marker.setInteractive({ useHandCursor: true });
        const badge = this.add.text(station.mapX + 7, station.mapY - 11, "\u26A1", {
          fontFamily: "sans-serif",
          fontSize: "9px",
          color: "#facc15",
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          padding: { x: 2, y: 1 }
        });
        marker.on("pointerdown", (pointer) => {
          if (pointer.rightButtonDown()) return;
          SoundFX.click();
          this.bridge.onMapSelectCharger(station);
          this.refreshDynamicState();
        });
        this.worldLayer.add(marker);
        this.worldLayer.add(badge);
        this.pinObjects.push({ station, marker, badge });
      });
    }
    createLiveCarMarker() {
      const start = getCityById(this.bridge.level.startCityId);
      this.carMarker = this.add.image(start.mapX, start.mapY, `car_${this.bridge.plan.vehicleId}`);
      this.carMarker.setScale(0.45);
      this.carMarker.setDepth(20);
      this.worldLayer.add(this.carMarker);
    }
    refreshDynamicState() {
      if (!this.dynamicOverlay) return;
      const g = this.dynamicOverlay;
      g.clear();
      this.bridge.level.routeLegs.forEach((leg) => {
        const edge = getEdgeById(leg.edgeId);
        g.lineStyle(5, leg.reverse ? 2282478 : 3900150, 0.85);
        for (let i = 0; i < edge.waypoints.length - 1; i++) {
          g.lineBetween(
            edge.waypoints[i].x,
            edge.waypoints[i].y,
            edge.waypoints[i + 1].x,
            edge.waypoints[i + 1].y
          );
        }
      });
      const vehicle = getVehicleById(this.bridge.plan.vehicleId);
      const selectedIds = new Set(this.bridge.plan.plannedStops.map((s) => s.chargerId));
      this.pinObjects.forEach(({ station, marker, badge }) => {
        const isSelected = selectedIds.has(station.id);
        const tariff = getBestPriceForStation(station, this.bridge.plan.subscriptionIds, vehicle);
        const netColor = {
          tesla: 15680580,
          enbw: 16347926,
          ewego: 2278750,
          electra: 11032055,
          ionity: 15485081,
          ac_village: 9741240
        };
        marker.setFillStyle(isSelected ? 16436245 : netColor[station.network] || 3718648);
        marker.setRadius(isSelected ? 7.5 : 5.2);
        marker.setStrokeStyle(2, isSelected ? 16777215 : 988970);
        badge.setText(
          `${isSelected ? "\u2713 " : ""}${station.maxKw}kW \xB7 ${tariff.pricePerKwh.toFixed(2)}\u20AC`
        );
        badge.setStyle({
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: "8.5px",
          color: isSelected ? "#0f172a" : "#e2e8f0",
          backgroundColor: isSelected ? "#facc15" : "rgba(15, 23, 42, 0.82)",
          padding: { x: 3, y: 1 }
        });
      });
      if (this.carMarker) {
        this.carMarker.setTexture(`car_${this.bridge.plan.vehicleId}`);
        if (this.bridge.runState) {
          const legIdx = Math.min(
            this.bridge.level.routeLegs.length - 1,
            this.bridge.runState.currentLegIndex
          );
          const leg = this.bridge.level.routeLegs[legIdx];
          const edge = getEdgeById(leg.edgeId);
          const rawT = Math.min(1, Math.max(0, this.bridge.runState.legProgressKm / edge.distanceKm));
          const t = leg.reverse ? 1 - rawT : rawT;
          const from = getCityById(edge.fromCityId);
          const to = getCityById(edge.toCityId);
          const cx = from.mapX + (to.mapX - from.mapX) * t;
          const cy = from.mapY + (to.mapY - from.mapY) * t;
          this.carMarker.setPosition(cx, cy);
          const angle = Phaser2.Math.Angle.Between(
            leg.reverse ? to.mapX : from.mapX,
            leg.reverse ? to.mapY : from.mapY,
            leg.reverse ? from.mapX : to.mapX,
            leg.reverse ? from.mapY : to.mapY
          );
          this.carMarker.setRotation(angle + Math.PI / 2);
          this.carMarker.setVisible(true);
        } else {
          const start = getCityById(this.bridge.level.startCityId);
          this.carMarker.setPosition(start.mapX, start.mapY);
          this.carMarker.setRotation(Math.PI / 2);
        }
      }
    }
    fitCameraToRoute() {
      const cam = this.cameras.main;
      if (!cam) return;
      const cities = this.bridge.level.routeLegs.flatMap((l) => {
        const e = getEdgeById(l.edgeId);
        return [getCityById(e.fromCityId), getCityById(e.toCityId)];
      });
      if (cities.length === 0) return;
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      cities.forEach((c) => {
        minX = Math.min(minX, c.mapX);
        maxX = Math.max(maxX, c.mapX);
        minY = Math.min(minY, c.mapY);
        maxY = Math.max(maxY, c.mapY);
      });
      const padX = 110;
      const padY = 95;
      const boxW = Math.max(220, maxX - minX + padX * 2);
      const boxH = Math.max(180, maxY - minY + padY * 2);
      const zoom = Math.min(cam.width / boxW, cam.height / boxH);
      cam.setZoom(Phaser2.Math.Clamp(zoom, 0.85, 2.75));
      cam.centerOn((minX + maxX) / 2, (minY + maxY) / 2);
    }
    zoomFullEurope() {
      const cam = this.cameras.main;
      if (!cam) return;
      const zoom = Math.min(cam.width / 820, cam.height / 720);
      cam.setZoom(Phaser2.Math.Clamp(zoom, 0.55, 1.5));
      cam.centerOn(455, 385);
    }
    setupPanAndZoom() {
      this.input.on("pointerdown", (pointer) => {
        const cam = this.cameras.main;
        this.dragStart = { x: pointer.x, y: pointer.y, camX: cam.scrollX, camY: cam.scrollY };
      });
      this.input.on("pointermove", (pointer) => {
        if (!pointer.isDown || !this.dragStart) return;
        const cam = this.cameras.main;
        const dx = (this.dragStart.x - pointer.x) / cam.zoom;
        const dy = (this.dragStart.y - pointer.y) / cam.zoom;
        cam.scrollX = Phaser2.Math.Clamp(this.dragStart.camX + dx, -150, this.mapBounds.w - 150);
        cam.scrollY = Phaser2.Math.Clamp(this.dragStart.camY + dy, -120, this.mapBounds.h - 120);
      });
      this.input.on("pointerup", () => {
        this.dragStart = void 0;
      });
      this.input.on(
        "wheel",
        (_pointer, _objs, _dx, dy) => {
          const cam = this.cameras.main;
          const next = Phaser2.Math.Clamp(cam.zoom - dy * 12e-4, 0.55, 3.2);
          cam.setZoom(next);
        }
      );
    }
  };

  // src/phaser/AutobahnScene.ts
  var Phaser3 = __toESM(require_phaser());
  var AutobahnScene = class extends Phaser3.Scene {
    constructor() {
      super({ key: "AutobahnScene" });
      this.dashOffset = 0;
      this.targetLaneX = 0;
      this.lanesX = [];
      this.npcs = [];
      this.trees = [];
      this.rainDrops = [];
      this.hudTickAccum = 0;
      this.eventCooldownSec = 4;
    }
    init(data) {
      this.bridge = data.bridge;
    }
    create() {
      const w = this.scale.width;
      const h = this.scale.height;
      this.roadGfx = this.add.graphics();
      this.computeLaneGeometry(w);
      this.drawRoadBackdrop(w, h);
      this.trees = [];
      for (let i = 0; i < 18; i++) {
        const sideLeft = i % 2 === 0;
        const tx = sideLeft ? Phaser3.Math.Between(18, Math.max(24, this.lanesX[0] - 68)) : Phaser3.Math.Between(Math.min(w - 24, this.lanesX[2] + 68), w - 18);
        const tree = this.add.image(tx, Phaser3.Math.Between(0, h), "pixel_tree");
        tree.setScale(Phaser3.Math.FloatBetween(0.9, 1.35));
        tree.setDepth(2);
        this.trees.push(tree);
      }
      this.npcs = [];
      const npcKeys = ["npc_truck", "npc_sedan_blue", "npc_van_white", "npc_compact_green", "npc_police"];
      for (let i = 0; i < 7; i++) {
        const lane = i % 3;
        const texKey = lane === 2 ? "npc_truck" : npcKeys[i % npcKeys.length];
        const sprite = this.add.image(this.lanesX[lane], Phaser3.Math.Between(-100, h), texKey);
        sprite.setScale(0.92);
        sprite.setDepth(5);
        this.npcs.push({
          sprite,
          lane,
          speedRel: lane === 2 ? 0.42 : lane === 1 ? 0.72 : 0.9
        });
      }
      this.targetLaneX = this.lanesX[1];
      this.playerCar = this.add.image(this.targetLaneX, h * 0.72, `car_${this.bridge.plan.vehicleId}`);
      this.playerCar.setDepth(10);
      this.headlightGfx = this.add.graphics().setDepth(9);
      this.nightOverlay = this.add.rectangle(w / 2, h / 2, w, h, 132631, 0).setDepth(14);
      this.rainDrops = [];
      for (let i = 0; i < 45; i++) {
        const d = this.add.image(Phaser3.Math.Between(0, w), Phaser3.Math.Between(0, h), "rain_drop");
        d.setDepth(16).setAlpha(0);
        this.rainDrops.push(d);
      }
      this.createGantrySign(w);
      this.scale.on("resize", (gameSize) => {
        this.computeLaneGeometry(gameSize.width);
        this.drawRoadBackdrop(gameSize.width, gameSize.height);
        if (this.nightOverlay) {
          this.nightOverlay.setPosition(gameSize.width / 2, gameSize.height / 2);
          this.nightOverlay.setSize(gameSize.width, gameSize.height);
        }
        if (this.playerCar) {
          this.playerCar.y = gameSize.height * 0.72;
        }
      });
    }
    computeLaneGeometry(w) {
      const cx = w / 2;
      const laneSpacing = Math.min(58, Math.max(42, w * 0.08));
      this.lanesX = [cx - laneSpacing, cx, cx + laneSpacing];
    }
    drawRoadBackdrop(w, h) {
      const g = this.roadGfx;
      g.clear();
      g.fillStyle(2049321, 1);
      g.fillRect(0, 0, w, h);
      const roadHalfW = (this.lanesX[2] - this.lanesX[0]) * 0.85 + 36;
      const cx = w / 2;
      g.fillStyle(4674921, 1);
      g.fillRect(cx - roadHalfW - 14, 0, roadHalfW * 2 + 28, h);
      g.fillStyle(1976635, 1);
      g.fillRect(cx - roadHalfW, 0, roadHalfW * 2, h);
      g.fillStyle(13358561, 1);
      g.fillRect(cx - roadHalfW - 4, 0, 4, h);
      g.fillRect(cx + roadHalfW, 0, 4, h);
      g.fillStyle(16317180, 0.9);
      g.fillRect(cx - roadHalfW + 8, 0, 3, h);
      g.fillRect(cx + roadHalfW - 11, 0, 3, h);
    }
    createGantrySign(w) {
      const cont = this.add.container(w / 2, -60).setDepth(13);
      const bar = this.add.rectangle(0, 0, 260, 24, 1920728).setStrokeStyle(2, 16317180);
      const txt = this.add.text(0, 0, "A2  HANNOVER  \xB7  RICHTGESCHW. 130", {
        fontFamily: "monospace",
        fontSize: "10px",
        color: "#ffffff"
      }).setOrigin(0.5);
      cont.add([bar, txt]);
      this.gantryObj = cont;
    }
    update(_time, delta) {
      const run = this.bridge.runState;
      if (!run) return;
      const dtSec = Math.min(0.05, delta / 1e3);
      const w = this.scale.width;
      const h = this.scale.height;
      if (this.bridge.paused) return;
      const legSpec = this.bridge.level.routeLegs[run.currentLegIndex];
      if (!legSpec) return;
      const edge = getEdgeById(legSpec.edgeId);
      const vehicle = getVehicleById(run.plan.vehicleId);
      const lp = run.plan.legPlans.find((x) => x.legIndex === run.currentLegIndex);
      const targetSpeed = Math.min(
        vehicle.maxSpeedKmh,
        lp ? lp.targetSpeedKmh : legSpec.defaultTargetSpeedKmh
      );
      run.currentSpeedKmh = targetSpeed;
      const weather = legSpec.weatherOverride || edge.defaultWeather;
      run.activeWeather = weather;
      const clockHour = (this.bridge.level.departureTimeHour + run.elapsedMinutes / 60) % 24;
      run.isNight = !!legSpec.isNightLeg || clockHour >= 19.2 || clockHour < 6;
      const scrollPxPerSec = targetSpeed / 120 * 320 * (this.bridge.timeScale >= 15 ? 1.55 : this.bridge.timeScale >= 5 ? 1.25 : 1);
      this.dashOffset = (this.dashOffset + scrollPxPerSec * dtSec) % 48;
      this.drawRoadBackdrop(w, h);
      this.roadGfx.fillStyle(16317180, 0.85);
      const sep1 = (this.lanesX[0] + this.lanesX[1]) / 2;
      const sep2 = (this.lanesX[1] + this.lanesX[2]) / 2;
      for (let y = -48 + this.dashOffset; y < h; y += 48) {
        this.roadGfx.fillRect(sep1 - 1.5, y, 3, 24);
        this.roadGfx.fillRect(sep2 - 1.5, y, 3, 24);
      }
      for (const t of this.trees) {
        t.y += scrollPxPerSec * dtSec;
        if (t.y > h + 30) t.y = -30;
      }
      if (this.gantryObj) {
        this.gantryObj.x = w / 2;
        this.gantryObj.y += scrollPxPerSec * 0.85 * dtSec;
        if (this.gantryObj.y > h + 900) {
          this.gantryObj.y = -80;
          const label = this.gantryObj.list[1];
          label.setText(`${edge.highwayName}  \xB7  ${legSpec.reverse ? "RICHTUNG AACHEN" : "RICHTUNG HANNOVER"}`);
        }
      }
      let blockedAhead = false;
      for (const npc of this.npcs) {
        npc.sprite.x = this.lanesX[npc.lane];
        const rel = scrollPxPerSec * (1 - npc.speedRel);
        npc.sprite.y += rel * dtSec;
        if (npc.sprite.y > h + 110) {
          npc.sprite.y = -120;
        }
        if (Math.abs(npc.sprite.x - this.playerCar.x) < 28 && npc.sprite.y < this.playerCar.y && this.playerCar.y - npc.sprite.y < 145) {
          blockedAhead = true;
        }
      }
      if (blockedAhead) {
        this.targetLaneX = this.playerCar.x < this.lanesX[1] + 10 ? this.lanesX[0] : this.lanesX[1];
      } else if (targetSpeed > 135) {
        this.targetLaneX = this.lanesX[0];
      } else {
        this.targetLaneX = this.lanesX[1];
      }
      this.playerCar.x = Phaser3.Math.Linear(this.playerCar.x, this.targetLaneX, 0.08);
      let darkness = 0;
      if (clockHour >= 18 && clockHour < 20) darkness = (clockHour - 18) / 2 * 0.56;
      else if (clockHour >= 20 || clockHour < 5.5) darkness = 0.56;
      else if (weather === "rain") darkness = 0.16;
      this.nightOverlay.setAlpha(darkness);
      this.headlightGfx.clear();
      if (darkness > 0.14) {
        this.headlightGfx.fillStyle(16707722, 0.22);
        this.headlightGfx.fillTriangle(
          this.playerCar.x - 9,
          this.playerCar.y - 22,
          this.playerCar.x - 42,
          this.playerCar.y - 170,
          this.playerCar.x + 2,
          this.playerCar.y - 170
        );
        this.headlightGfx.fillTriangle(
          this.playerCar.x + 9,
          this.playerCar.y - 22,
          this.playerCar.x - 2,
          this.playerCar.y - 170,
          this.playerCar.x + 42,
          this.playerCar.y - 170
        );
      }
      const isRain = weather === "rain" || weather === "storm";
      for (const d of this.rainDrops) {
        if (!isRain) {
          d.setAlpha(0);
        } else {
          d.setAlpha(0.75);
          d.y += 560 * dtSec;
          d.x -= 90 * dtSec;
          if (d.y > h + 10) d.y = -10;
          if (d.x < -10) d.x = w + 10;
        }
      }
      const simMinPerRealSec = this.bridge.timeScale === 15 ? 28 : this.bridge.timeScale === 5 ? 11 : 2.8;
      const simMinutes = simMinPerRealSec * dtSec;
      const effectiveSpeed = targetSpeed * 0.92;
      const deltaKm = effectiveSpeed / 60 * simMinutes;
      const elevGain = legSpec.reverse ? edge.elevationLossM : edge.elevationGainM;
      const elevLoss = legSpec.reverse ? edge.elevationGainM : edge.elevationLossM;
      const cons100 = computeConsumptionKwh100(
        vehicle,
        targetSpeed,
        weather,
        elevGain,
        elevLoss,
        edge.distanceKm,
        this.bridge.level.trailerWeightKg || 0,
        !!run.plan.behindTruckMode
      );
      const kwhBurned = deltaKm / 100 * cons100;
      const socDelta = kwhBurned / vehicle.batteryKwh * 100;
      run.legProgressKm += deltaKm;
      run.distanceDrivenKm += deltaKm;
      run.energyUsedKwh += kwhBurned;
      run.socPct = Math.max(0, run.socPct - socDelta);
      run.elapsedMinutes += simMinutes;
      run.bladderNeed = Math.min(100, run.bladderNeed + simMinutes * 0.35);
      const comfortDamping = 1 - (vehicle.comfortRating - 5) * 0.04;
      let stressDeltaPerMin = 0.02;
      if (targetSpeed > 145) stressDeltaPerMin += 0.14;
      if (weather === "rain" || weather === "snow") stressDeltaPerMin += 0.06;
      if (run.socPct < 15) stressDeltaPerMin += 0.28;
      if (run.bladderNeed > 75) stressDeltaPerMin += 0.12;
      run.stress = Phaser3.Math.Clamp(
        run.stress + stressDeltaPerMin * simMinutes * this.bridge.level.passengers.stressSensitivity * comfortDamping,
        0,
        100
      );
      run.peakStress = Math.max(run.peakStress, run.stress);
      if (run.socPct <= 0.15) {
        this.bridge.paused = true;
        SoundFX.alert();
        this.bridge.onBatteryDepleted();
        return;
      }
      const legRatio = Math.min(1, run.legProgressKm / edge.distanceKm);
      const pendingStop = run.plan.plannedStops.filter((s) => s.legIndex === run.currentLegIndex && !run.completedStopIds.includes(s.chargerId) && !run.skippedStopIds.includes(s.chargerId)).map((s) => {
        const st = getChargersForEdge(edge.id).find((c) => c.id === s.chargerId);
        if (!st) return null;
        const p = legSpec.reverse ? 1 - st.edgeProgress : st.edgeProgress;
        return { stop: s, station: st, p };
      }).filter((x) => x !== null).sort((a, b) => a.p - b.p)[0];
      if (pendingStop && legRatio >= pendingStop.p) {
        this.bridge.paused = true;
        SoundFX.click();
        this.bridge.onTriggerChargerSegment(pendingStop.station);
        return;
      }
      this.eventCooldownSec -= dtSec;
      if (this.eventCooldownSec <= 0) {
        if (this.bridge.level.passengers.hasWife && !run.wifeDialogueTriggered && this.bridge.level.wifeDialogueIds.length > 0 && (run.stress >= 42 || run.currentLegIndex >= 4 && run.socPct < 24)) {
          run.wifeDialogueTriggered = true;
          this.eventCooldownSec = 8;
          this.bridge.paused = true;
          SoundFX.alert();
          const dlgId = run.socPct < 24 ? "dlg_diesel_remark" : this.bridge.level.wifeDialogueIds[0];
          this.bridge.onWifeDialogueTrigger(dlgId);
          return;
        }
        if (run.currentLegIndex === 1 && legRatio > 0.55 && !run.triggeredEventIds.includes("evt_stau_kamen")) {
          run.triggeredEventIds.push("evt_stau_kamen");
          this.eventCooldownSec = 7;
          this.bridge.paused = true;
          SoundFX.alert();
          this.bridge.onDynamicEventTrigger("evt_stau_kamen");
          return;
        }
        if (run.currentLegIndex === 2 && legRatio > 0.45 && !run.triggeredEventIds.includes("evt_accident_help")) {
          run.triggeredEventIds.push("evt_accident_help");
          this.eventCooldownSec = 7;
          this.bridge.paused = true;
          SoundFX.alert();
          this.bridge.onDynamicEventTrigger("evt_accident_help");
          return;
        }
        if (run.currentLegIndex === 4 && legRatio > 0.42 && !run.triggeredEventIds.includes("evt_rain_front")) {
          run.triggeredEventIds.push("evt_rain_front");
          this.eventCooldownSec = 7;
          this.bridge.paused = true;
          SoundFX.alert();
          this.bridge.onDynamicEventTrigger("evt_rain_front");
          return;
        }
        if (run.currentLegIndex === 5 && run.bladderNeed > 60 && !run.triggeredEventIds.includes("evt_wc_coffee")) {
          run.triggeredEventIds.push("evt_wc_coffee");
          this.eventCooldownSec = 7;
          this.bridge.paused = true;
          SoundFX.alert();
          this.bridge.onDynamicEventTrigger("evt_wc_coffee");
          return;
        }
        if (targetSpeed > 138 && !run.triggeredEventIds.includes("evt_speed_trap")) {
          run.triggeredEventIds.push("evt_speed_trap");
          this.eventCooldownSec = 7;
          this.bridge.paused = true;
          SoundFX.alert();
          this.bridge.onDynamicEventTrigger("evt_speed_trap");
          return;
        }
      }
      if (run.legProgressKm >= edge.distanceKm) {
        if (legSpec.citySegmentAtEnd) {
          this.bridge.paused = true;
          const preset = legSpec.citySegmentAtEnd;
          if (preset === "hannover_messe" || preset === "aachen_finish") {
            this.bridge.onTriggerCitySegment(preset);
            return;
          }
        }
        if (run.currentLegIndex < this.bridge.level.routeLegs.length - 1) {
          run.currentLegIndex += 1;
          run.legProgressKm = 0;
        } else {
          this.bridge.paused = true;
          this.bridge.onTriggerCitySegment("aachen_finish");
          return;
        }
      }
      this.hudTickAccum += dtSec;
      if (this.hudTickAccum >= 0.12) {
        this.hudTickAccum = 0;
        this.bridge.onAutobahnHudTick(run);
      }
    }
  };

  // src/phaser/CityDriveScene.ts
  var Phaser4 = __toESM(require_phaser());
  var CityDriveScene = class extends Phaser4.Scene {
    constructor() {
      super({ key: "CityDriveScene" });
      this.preset = "aachen_start";
      this.worldW = 1360;
      this.worldH = 980;
      this.carSpeed = 0;
      this.trafficPhase = "green";
      this.trafficTimer = 0;
      this.trafficLightSprites = [];
      this.trafficCars = [];
      this.pedestrians = [];
      this.rainDrops = [];
      this.dwellInTargetSec = 0;
      this.collisionCooldownSec = 0;
      this.completed = false;
      this.cleanRun = true;
    }
    init(data) {
      this.bridge = data.bridge;
      this.preset = data.preset;
      this.station = data.chargerId ? getChargerById(data.chargerId) : void 0;
      this.carSpeed = 0;
      this.dwellInTargetSec = 0;
      this.collisionCooldownSec = 0;
      this.completed = false;
      this.cleanRun = true;
      this.trafficCars = [];
      this.pedestrians = [];
      this.trafficLightSprites = [];
    }
    create() {
      this.physics.world.setBounds(0, 0, this.worldW, this.worldH);
      this.cameras.main.setBounds(0, 0, this.worldW, this.worldH);
      this.drawCityWorld();
      this.spawnEnvironmentAndProps();
      this.spawnTrafficAndPedestrians();
      this.spawnPlayer();
      this.setupLightingAndWeather();
      this.setupNavIndicator();
      this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
      this.cameras.main.setZoom(this.scale.width < 640 ? 0.92 : 1.15);
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = {
        W: this.input.keyboard.addKey(Phaser4.Input.Keyboard.KeyCodes.W),
        A: this.input.keyboard.addKey(Phaser4.Input.Keyboard.KeyCodes.A),
        S: this.input.keyboard.addKey(Phaser4.Input.Keyboard.KeyCodes.S),
        D: this.input.keyboard.addKey(Phaser4.Input.Keyboard.KeyCodes.D),
        SPACE: this.input.keyboard.addKey(Phaser4.Input.Keyboard.KeyCodes.SPACE),
        H: this.input.keyboard.addKey(Phaser4.Input.Keyboard.KeyCodes.H)
      };
      this.scale.on("resize", (size) => {
        if (this.cameras && this.cameras.main) {
          this.cameras.main.setZoom(size.width < 640 ? 0.92 : 1.15);
        }
        if (this.nightOverlay) {
          this.nightOverlay.setSize(size.width * 2, size.height * 2);
        }
      });
    }
    drawCityWorld() {
      const g = this.add.graphics();
      g.fillStyle(2181679, 1);
      g.fillRect(0, 0, this.worldW, this.worldH);
      g.fillStyle(6583435, 1);
      g.fillRect(40, 40, this.worldW - 80, this.worldH - 80);
      g.fillStyle(2446134, 1);
      g.fillRect(280, 260, 460, 320);
      g.fillStyle(1976635, 1);
      g.fillRect(120, 120, 1120, 130);
      g.fillRect(120, 720, 1120, 130);
      g.fillRect(120, 120, 130, 730);
      g.fillRect(740, 120, 130, 730);
      g.fillRect(1110, 120, 130, 730);
      g.fillStyle(8138002, 0.72);
      g.fillRect(120, 122, 1120, 16);
      g.fillRect(120, 832, 1120, 16);
      g.fillStyle(1976635, 1);
      g.fillCircle(805, 785, 110);
      g.fillStyle(2249789, 1);
      g.fillCircle(805, 785, 44);
      g.lineStyle(3, 16317180, 0.8);
      g.strokeCircle(805, 785, 46);
      g.fillStyle(16317180, 0.75);
      for (let x = 150; x < 1220; x += 34) {
        g.fillRect(x, 183, 18, 3);
        if (x < 680 || x > 920) g.fillRect(x, 783, 18, 3);
      }
      for (let y = 150; y < 820; y += 34) {
        g.fillRect(183, y, 3, 18);
        if (y < 660) g.fillRect(803, y, 3, 18);
        g.fillRect(1173, y, 3, 18);
      }
      for (let i = 0; i < 6; i++) {
        g.fillRect(685, 145 + i * 16, 26, 8);
        g.fillRect(145 + i * 16, 675, 8, 26);
      }
      g.fillStyle(10105874, 0.6);
      g.fillRect(745, 415, 58, 95);
      const drawBuilding = (x, y, w, h, roof, trim) => {
        g.fillStyle(988970, 0.45);
        g.fillRect(x + 8, y + 8, w, h);
        g.fillStyle(trim, 1);
        g.fillRect(x, y, w, h);
        g.fillStyle(roof, 1);
        g.fillRect(x + 6, y + 6, w - 12, h - 12);
      };
      drawBuilding(290, 290, 170, 120, 3359061, 4674921);
      drawBuilding(500, 290, 190, 120, 4674921, 6583435);
      drawBuilding(290, 460, 190, 140, 1981066, 3900150);
      drawBuilding(910, 290, 160, 170, 4144966, 7434618);
      if (this.preset === "aachen_start" || this.preset === "aachen_finish") {
        this.add.image(385, 530, "landmark_aachen_dom").setScale(2.1);
        this.add.text(385, 582, "Aachener Dom", {
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: "11px",
          fontStyle: "bold",
          color: "#f8fafc",
          backgroundColor: "rgba(15,23,42,0.8)",
          padding: { x: 5, y: 2 }
        }).setOrigin(0.5);
      } else if (this.preset === "hannover_messe") {
        this.add.image(990, 375, "landmark_hermesturm").setScale(2.2);
        this.add.text(990, 428, "Hannover Messe", {
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: "11px",
          fontStyle: "bold",
          color: "#f8fafc",
          backgroundColor: "rgba(15,23,42,0.8)",
          padding: { x: 5, y: 2 }
        }).setOrigin(0.5);
      } else if (this.preset === "charger_park") {
        g.fillStyle(988970, 1);
        g.fillRect(890, 470, 200, 190);
        g.lineStyle(2, 16436245, 0.8);
        for (let i = 0; i < 4; i++) {
          g.strokeRect(910 + i * 44, 520, 38, 66);
        }
        if (this.station?.hasMcDonalds) {
          this.add.image(990, 380, "mcd_kiosk").setScale(1.4);
        }
        const net = this.station?.network || "enbw";
        for (let i = 0; i < 4; i++) {
          this.add.image(929 + i * 44, 505, `charger_${net}`).setScale(1.1);
        }
      }
      if (this.preset === "aachen_start") {
        this.targetZone = new Phaser4.Geom.Rectangle(1130, 145, 90, 80);
        this.drawZoneMarker("A4 AUTOBAHN\nAUFFAHRT \u2192", 2450411);
      } else if (this.preset === "charger_park") {
        this.targetZone = new Phaser4.Geom.Rectangle(952, 522, 42, 64);
        this.drawZoneMarker(`\u26A1 LADEN
${this.station?.maxKw || 150} kW`, 2278750);
      } else if (this.preset === "hannover_messe") {
        this.targetZone = new Phaser4.Geom.Rectangle(930, 480, 90, 74);
        this.drawZoneMarker("MESSE\nE-PARKPLATZ", 3718648);
      } else {
        this.targetZone = new Phaser4.Geom.Rectangle(140, 460, 86, 66);
        this.drawZoneMarker("ZIEL\nAACHEN \u{1F3C1}", 2278750);
      }
    }
    drawZoneMarker(label, color) {
      this.targetGlow = this.add.rectangle(
        this.targetZone.centerX,
        this.targetZone.centerY,
        this.targetZone.width,
        this.targetZone.height,
        color,
        0.26
      ).setStrokeStyle(3, color, 0.95).setDepth(3);
      this.tweens.add({
        targets: this.targetGlow,
        alpha: 0.55,
        duration: 700,
        yoyo: true,
        repeat: -1
      });
      this.targetLabel = this.add.text(this.targetZone.centerX, this.targetZone.centerY, label, {
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontSize: "10px",
        fontStyle: "bold",
        color: "#ffffff",
        align: "center",
        backgroundColor: "rgba(15,23,42,0.75)",
        padding: { x: 4, y: 2 }
      }).setOrigin(0.5).setDepth(4);
    }
    spawnEnvironmentAndProps() {
      this.obstacles = this.physics.add.staticGroup();
      const blocks = [
        [290, 290, 170, 120],
        [500, 290, 190, 120],
        [290, 460, 190, 140],
        [910, 290, 160, 170]
      ];
      blocks.forEach(([x, y, w, h]) => {
        const box = this.add.rectangle(x + w / 2, y + h / 2, w, h, 0, 0);
        this.physics.add.existing(box, true);
        this.obstacles.add(box);
      });
      const treeSpots = [
        [75, 80],
        [75, 340],
        [75, 580],
        [75, 900],
        [420, 80],
        [640, 80],
        [1020, 80],
        [1295, 220],
        [1295, 560],
        [1295, 880],
        [520, 900],
        [980, 900]
      ];
      treeSpots.forEach(([tx, ty]) => {
        const t = this.obstacles.create(tx, ty, "pixel_tree");
        t.setCircle(11, 3, 3);
        t.refreshBody();
      });
      [420, 455, 490].forEach((cy) => {
        const c = this.obstacles.create(770, cy, "cone");
        c.setDepth(5);
        c.refreshBody();
      });
      const tl1 = this.add.image(726, 114, "tlight_green").setDepth(15);
      const tl2 = this.add.image(884, 260, "tlight_green").setDepth(15);
      this.trafficLightSprites.push(tl1, tl2);
    }
    spawnTrafficAndPedestrians() {
      const carConfigs = [
        {
          tex: "npc_sedan_blue",
          wps: [{ x: 200, y: 210 }, { x: 1140, y: 210 }, { x: 1140, y: 760 }, { x: 200, y: 760 }],
          speed: 105,
          obeys: true
        },
        {
          tex: "npc_van_white",
          wps: [{ x: 1180, y: 155 }, { x: 185, y: 155 }, { x: 185, y: 810 }, { x: 1180, y: 810 }],
          speed: 95,
          obeys: true
        },
        {
          tex: "npc_police",
          wps: [{ x: 830, y: 200 }, { x: 830, y: 690 }, { x: 210, y: 690 }, { x: 210, y: 200 }],
          speed: 115,
          obeys: false
        },
        // Cyclists in the bike lane!
        {
          tex: "cyclist_0",
          wps: [{ x: 200, y: 130 }, { x: 1150, y: 130 }],
          speed: 62,
          obeys: false
        },
        {
          tex: "cyclist_1",
          wps: [{ x: 1120, y: 840 }, { x: 190, y: 840 }],
          speed: 58,
          obeys: false
        }
      ];
      carConfigs.forEach((cfg) => {
        const sp = this.physics.add.image(cfg.wps[0].x, cfg.wps[0].y, cfg.tex).setDepth(7);
        sp.setImmovable(true);
        this.trafficCars.push({
          sprite: sp,
          waypoints: cfg.wps,
          wpIndex: 1,
          speed: cfg.speed,
          obeysLights: cfg.obeys
        });
      });
      const pedConfigs = [
        { tex: "ped_adult_0", a: { x: 698, y: 105 }, b: { x: 698, y: 268 }, speed: 34 },
        { tex: "ped_child", a: { x: 686, y: 110 }, b: { x: 686, y: 266 }, speed: 38 },
        { tex: "ped_adult_1", a: { x: 132, y: 688 }, b: { x: 268, y: 688 }, speed: 32 }
      ];
      pedConfigs.forEach((pc) => {
        const sp = this.physics.add.image(pc.a.x, pc.a.y, pc.tex).setDepth(8);
        sp.setImmovable(true);
        this.pedestrians.push({ sprite: sp, a: pc.a, b: pc.b, toB: true, speed: pc.speed });
      });
    }
    spawnPlayer() {
      let sx = 190;
      let sy = 560;
      let rot = 0;
      if (this.preset === "aachen_start") {
        sx = 185;
        sy = 640;
        rot = 0;
      } else if (this.preset === "charger_park") {
        sx = 835;
        sy = 690;
        rot = 0;
      } else if (this.preset === "hannover_messe") {
        sx = 1170;
        sy = 190;
        rot = -Math.PI / 2;
      } else if (this.preset === "aachen_finish") {
        sx = 1170;
        sy = 785;
        rot = -Math.PI / 2;
      }
      this.player = this.physics.add.image(sx, sy, `car_${this.bridge.plan.vehicleId}`).setDepth(10);
      this.player.setCollideWorldBounds(true);
      this.player.setCircle(14, 2, 12);
      this.player.setRotation(rot);
      this.physics.add.collider(this.player, this.obstacles, () => {
        this.handleCollision("obstacle");
      });
      this.trafficCars.forEach((tc) => {
        this.physics.add.collider(this.player, tc.sprite, () => {
          const isCyc = tc.sprite.texture.key.startsWith("cyclist");
          this.handleCollision(isCyc ? "cyclist" : "car");
        });
      });
      this.pedestrians.forEach((pd) => {
        this.physics.add.collider(this.player, pd.sprite, () => {
          this.handleCollision("pedestrian");
        });
      });
    }
    handleCollision(kind) {
      if (this.collisionCooldownSec > 0 || this.completed || this.bridge.paused) return;
      if (Math.abs(this.carSpeed) < 28 && kind === "obstacle") {
        this.carSpeed = -this.carSpeed * 0.4;
        return;
      }
      this.collisionCooldownSec = 2.4;
      this.carSpeed = 0;
      this.cleanRun = false;
      SoundFX.bump();
      this.cameras.main.shake(180, 8e-3);
      if (this.bridge.runState) this.bridge.runState.collisionsCount += 1;
      this.bridge.paused = true;
      this.bridge.onCollisionEvent(kind);
    }
    setupLightingAndWeather() {
      this.headlightGfx = this.add.graphics().setDepth(12);
      this.nightOverlay = this.add.rectangle(this.worldW / 2, this.worldH / 2, this.worldW, this.worldH, 132631, 0).setDepth(14);
      this.rainDrops = [];
      for (let i = 0; i < 42; i++) {
        const d = this.add.image(Phaser4.Math.Between(0, this.worldW), Phaser4.Math.Between(0, this.worldH), "rain_drop").setDepth(16).setAlpha(0);
        this.rainDrops.push(d);
      }
    }
    setupNavIndicator() {
      this.navArrow = this.add.triangle(0, 0, 0, -10, -7, 8, 7, 8, 16436245).setStrokeStyle(1.5, 988970).setDepth(20).setScrollFactor(0);
      this.distText = this.add.text(0, 0, "", {
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontSize: "11px",
        fontStyle: "bold",
        color: "#facc15",
        backgroundColor: "rgba(15, 23, 42, 0.84)",
        padding: { x: 6, y: 3 }
      }).setOrigin(0.5).setDepth(20).setScrollFactor(0);
    }
    update(_time, delta) {
      const dt = Math.min(0.05, delta / 1e3);
      this.collisionCooldownSec = Math.max(0, this.collisionCooldownSec - dt);
      this.trafficTimer += dt;
      const cycle = this.trafficTimer % 12;
      this.trafficPhase = cycle < 5.5 ? "green" : cycle < 7.2 ? "amber" : "red";
      this.trafficLightSprites.forEach((s) => s.setTexture(`tlight_${this.trafficPhase}`));
      if (this.bridge.paused || this.completed) {
        this.player.setVelocity(0, 0);
        return;
      }
      const touch = this.bridge.touch;
      const up = this.cursors.up.isDown || this.wasd.W.isDown || touch.up;
      const down = this.cursors.down.isDown || this.wasd.S.isDown || touch.down;
      const left = this.cursors.left.isDown || this.wasd.A.isDown || touch.left;
      const right = this.cursors.right.isDown || this.wasd.D.isDown || touch.right;
      const brake = this.wasd.SPACE.isDown || touch.brake;
      if (Phaser4.Input.Keyboard.JustDown(this.wasd.H) || touch.hornPressed) {
        touch.hornPressed = false;
        SoundFX.horn();
      }
      const maxFwd = 225;
      const maxRev = -95;
      if (up) {
        this.carSpeed = Math.min(maxFwd, this.carSpeed + 310 * dt);
      } else if (down) {
        this.carSpeed = Math.max(maxRev, this.carSpeed - 270 * dt);
      } else if (brake) {
        this.carSpeed *= Math.pow(0.06, dt);
      } else {
        this.carSpeed *= Math.pow(0.24, dt);
      }
      if (Math.abs(this.carSpeed) < 3 && !up && !down) this.carSpeed = 0;
      const steerFactor = Math.min(1, Math.abs(this.carSpeed) / 70);
      const dirSign = this.carSpeed >= -1 ? 1 : -1;
      const turnRate = 2.65 * steerFactor * dirSign;
      if (left) this.player.rotation -= turnRate * dt;
      if (right) this.player.rotation += turnRate * dt;
      const vx = Math.sin(this.player.rotation) * this.carSpeed;
      const vy = -Math.cos(this.player.rotation) * this.carSpeed;
      this.player.setVelocity(vx, vy);
      for (const tc of this.trafficCars) {
        const target = tc.waypoints[tc.wpIndex];
        const dist = Phaser4.Math.Distance.Between(tc.sprite.x, tc.sprite.y, target.x, target.y);
        if (dist < 14) {
          tc.wpIndex = (tc.wpIndex + 1) % tc.waypoints.length;
        }
        const nearLight = tc.obeysLights && this.trafficPhase === "red" && tc.sprite.x > 660 && tc.sprite.x < 750 && tc.sprite.y > 140 && tc.sprite.y < 235;
        if (nearLight) {
          tc.sprite.setVelocity(0, 0);
        } else {
          const ang = Phaser4.Math.Angle.Between(tc.sprite.x, tc.sprite.y, target.x, target.y);
          tc.sprite.setRotation(ang + Math.PI / 2);
          tc.sprite.setVelocity(Math.cos(ang) * tc.speed, Math.sin(ang) * tc.speed);
        }
      }
      for (const pd of this.pedestrians) {
        const dest = pd.toB ? pd.b : pd.a;
        const dist = Phaser4.Math.Distance.Between(pd.sprite.x, pd.sprite.y, dest.x, dest.y);
        if (dist < 8) pd.toB = !pd.toB;
        const ang = Phaser4.Math.Angle.Between(pd.sprite.x, pd.sprite.y, dest.x, dest.y);
        pd.sprite.setVelocity(Math.cos(ang) * pd.speed, Math.sin(ang) * pd.speed);
      }
      const isNight = this.preset === "aachen_finish" || !!this.bridge.runState?.isNight;
      const isRain = this.bridge.runState?.activeWeather === "rain" || this.bridge.runState?.activeWeather === "storm";
      this.nightOverlay.setAlpha(isNight ? 0.56 : isRain ? 0.14 : 0);
      this.headlightGfx.clear();
      if (isNight) {
        const fx = Math.sin(this.player.rotation);
        const fy = -Math.cos(this.player.rotation);
        const px = -fy;
        const py = fx;
        const tipX = this.player.x + fx * 22;
        const tipY = this.player.y + fy * 22;
        this.headlightGfx.fillStyle(16707722, 0.24);
        this.headlightGfx.fillTriangle(
          tipX,
          tipY,
          tipX + fx * 155 + px * 58,
          tipY + fy * 155 + py * 58,
          tipX + fx * 155 - px * 58,
          tipY + fy * 155 - py * 58
        );
      }
      for (const d of this.rainDrops) {
        if (!isRain) {
          d.setAlpha(0);
        } else {
          d.setAlpha(0.7);
          d.y += 450 * dt;
          d.x -= 80 * dt;
          if (d.y > this.worldH) d.y = 0;
          if (d.x < 0) d.x = this.worldW;
        }
      }
      const angleToTarget = Phaser4.Math.Angle.Between(
        this.player.x,
        this.player.y,
        this.targetZone.centerX,
        this.targetZone.centerY
      );
      const distToTarget = Math.round(
        Phaser4.Math.Distance.Between(
          this.player.x,
          this.player.y,
          this.targetZone.centerX,
          this.targetZone.centerY
        )
      );
      this.navArrow.setPosition(this.scale.width / 2, 54);
      this.navArrow.setRotation(angleToTarget + Math.PI / 2);
      this.distText.setPosition(this.scale.width / 2, 76);
      const inZone = Phaser4.Geom.Rectangle.Contains(this.targetZone, this.player.x, this.player.y);
      if (inZone && Math.abs(this.carSpeed) < 36) {
        this.dwellInTargetSec += dt;
        this.distText.setText(`\u2713 Perfekt! Halten\u2026 (${Math.round(this.dwellInTargetSec * 100)}%)`);
        if (this.dwellInTargetSec >= 0.75) {
          this.completed = true;
          this.player.setVelocity(0, 0);
          if (this.preset === "aachen_finish") {
            this.triggerArrivalConfetti();
          } else {
            this.bridge.onCitySegmentComplete(this.preset, this.cleanRun);
          }
        }
      } else {
        this.dwellInTargetSec = 0;
        const goalHint = this.preset === "aachen_start" ? "Zur A4 Auffahrt" : this.preset === "charger_park" ? "In Ladebucht einparken" : this.preset === "hannover_messe" ? "Zum Messe-Parkplatz" : "Ins Ziel einparken";
        this.distText.setText(`${goalHint} \xB7 ${Math.max(0, Math.round(distToTarget / 6))} m`);
      }
    }
    triggerArrivalConfetti() {
      SoundFX.win();
      const colors = [3718648, 2278750, 16436245, 16007006, 11032055];
      for (let i = 0; i < 65; i++) {
        const p = this.add.image(this.player.x, this.player.y - 10, "confetti_px").setTint(colors[i % colors.length]).setDepth(25);
        const ang = Phaser4.Math.FloatBetween(0, Math.PI * 2);
        const spd = Phaser4.Math.FloatBetween(40, 170);
        this.tweens.add({
          targets: p,
          x: p.x + Math.cos(ang) * spd,
          y: p.y + Math.sin(ang) * spd,
          alpha: 0,
          angle: Phaser4.Math.Between(-240, 240),
          duration: Phaser4.Math.Between(900, 1600),
          ease: "Cubic.easeOut"
        });
      }
      const cheer = this.add.text(this.player.x, this.player.y - 44, "\u{1F389} Sauber eingeparkt! \u201ESuper Fahrt!\u201C", {
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontSize: "12px",
        fontStyle: "bold",
        color: "#0f172a",
        backgroundColor: "#facc15",
        padding: { x: 8, y: 4 }
      }).setOrigin(0.5).setDepth(26);
      this.time.delayedCall(1550, () => {
        cheer.destroy();
        this.bridge.onCitySegmentComplete(this.preset, this.cleanRun);
      });
    }
  };

  // src/ui/PlanningUI.ts
  function renderChargingCurveSvg(v) {
    const w = 150;
    const h = 44;
    const maxKw = 330;
    const pts = v.chargingCurve.map((p) => {
      const x = p.soc / 100 * (w - 8) + 4;
      const y = h - 5 - p.kw / maxKw * (h - 10);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
    const peak = Math.max(...v.chargingCurve.map((c) => c.kw));
    return `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" class="curve-svg" aria-label="Ladekurve ${peak} kW">
      <polyline fill="none" stroke="rgba(56,189,248,0.28)" stroke-width="1" points="4,${h - 5} ${w - 4},${h - 5}" />
      <polyline fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" points="${pts}" />
      <text x="${w - 4}" y="11" text-anchor="end" font-size="9" fill="currentColor" opacity="0.8">Peak ${peak} kW</text>
    </svg>
  `;
  }
  var PlanningUI = class {
    constructor(root, cb) {
      this.activeTab = "car";
      this.root = root;
      this.cb = cb;
    }
    render(level, plan, save) {
      const forecast = evaluateTripPlan(level, plan);
      const selectedVehicle = getVehicleById(plan.vehicleId);
      const budgetLeft = save.cashEur - (save.ownedVehicleId === selectedVehicle.id ? 0 : selectedVehicle.priceEur);
      this.root.innerHTML = `
      <div class="plan-header-card">
        <div class="plan-level-row">
          <select id="er-level-select" class="er-select" aria-label="Level ausw\xE4hlen">
            ${LEVELS.map((l) => {
        const lockTag = l.playable ? "" : " \u{1F512} (Kuratiert \xB7 Vorschau)";
        return `<option value="${l.id}" ${l.id === level.id ? "selected" : ""}>${l.title}${lockTag}</option>`;
      }).join("")}
          </select>
          <div class="er-budget-pill" title="Verf\xFCgbares Kapital nach Fahrzeugwahl">
            \u{1F4B6} Budget: <strong>${save.cashEur.toLocaleString("de-DE")} \u20AC</strong>
          </div>
        </div>
        <p class="plan-briefing">${level.briefingText}</p>
        <div class="plan-rules-chips">
          ${level.specialRulesSummary.map((r) => `<span class="rule-chip">${r}</span>`).join("")}
        </div>
        <div class="map-zoom-bar">
          <button type="button" class="er-mini-btn" id="btn-zoom-route">\u{1F3AF} Route zentrieren</button>
          <button type="button" class="er-mini-btn" id="btn-zoom-europe">\u{1F30D} Ganz Europa</button>
          <span class="map-hint">Klicke \u26A1-Pins auf der Karte zum Hinzuf\xFCgen/Entfernen</span>
        </div>
      </div>

      ${this.renderForecastBanner(level, forecast, budgetLeft)}

      <div class="plan-tabs" role="tablist">
        <button type="button" class="plan-tab ${this.activeTab === "car" ? "active" : ""}" data-ptab="car">\u{1F697} 1. Fahrzeug</button>
        <button type="button" class="plan-tab ${this.activeTab === "subs" ? "active" : ""}" data-ptab="subs">\u{1F4B3} 2. Lade-Abos</button>
        <button type="button" class="plan-tab ${this.activeTab === "route" ? "active" : ""}" data-ptab="route">\u{1F5FA}\uFE0F 3. Etappen &amp; Stopps</button>
      </div>

      <div class="plan-tab-body">
        ${this.activeTab === "car" ? this.renderVehiclesTab(level, plan, save) : ""}
        ${this.activeTab === "subs" ? this.renderSubsTab(plan, selectedVehicle) : ""}
        ${this.activeTab === "route" ? this.renderRouteTab(level, plan, forecast) : ""}
      </div>

      <div class="plan-footer-cta">
        ${level.playable ? `<button type="button" id="btn-start-trip" class="er-primary-btn ${forecast.valid ? "" : "warn"}" ${budgetLeft < 0 ? "disabled" : ""}>
                ${budgetLeft < 0 ? "\u274C Budget reicht nicht f\xFCr dieses Fahrzeug" : forecast.valid ? "\u{1F680} Roadtrip am Aachener Dom starten!" : "\u26A0\uFE0F Trotz Reichweiten-Warnung starten"}
               </button>` : `<div class="er-locked-notice">Dieses kuratierte Szenario ist bereits datengetrieben vorbereitet (Gewichte, Regeln, Events). Level 1 ist sofort komplett spielbar!</div>`}
      </div>
    `;
      this.bindEvents(level, plan, save);
    }
    renderForecastBanner(level, f, budgetLeft) {
      const hrs = Math.floor(f.totalMinutes / 60);
      const mins = f.totalMinutes % 60;
      return `
      <div class="forecast-strip">
        <div class="fc-metric"><span>Distanz</span><strong>${f.totalDistanceKm} km</strong></div>
        <div class="fc-metric"><span>Dauer (Ziel ${Math.floor(level.targetArrivalMinutes / 60)}h${String(level.targetArrivalMinutes % 60).padStart(2, "0")})</span><strong>${hrs}h ${String(mins).padStart(2, "0")}m</strong></div>
        <div class="fc-metric"><span>Strom + Abos</span><strong>${f.estimatedTotalCostEur.toFixed(2)} \u20AC</strong></div>
        <div class="fc-metric ${f.minSocEncountered < 5 ? "danger" : ""}"><span>Min. SoC</span><strong>${f.minSocEncountered}%</strong></div>
        <div class="fc-metric"><span>Restbudget</span><strong>${budgetLeft.toLocaleString("de-DE")} \u20AC</strong></div>
      </div>
      ${f.warnings.length > 0 ? `<div class="forecast-warnings">${f.warnings.map((w) => `<div>\u26A0\uFE0F ${w}</div>`).join("")}</div>` : `<div class="forecast-ok">\u2705 Planung stabil \xB7 Alle Ladepunkte erreichbar (${f.avgConsumptionKwh100} kWh/100km Schnitt)</div>`}
    `;
    }
    renderVehiclesTab(level, plan, save) {
      return `
      <div class="vehicle-grid">
        ${VEHICLES.map((v) => {
        const isOwned = save.ownedVehicleId === v.id;
        const isSelected = plan.vehicleId === v.id;
        const unlocked = v.unlockLevel <= save.unlockedLevelOrder;
        const affordable = isOwned || save.cashEur >= v.priceEur;
        const disabled = !unlocked || !affordable;
        const statusLabel = !unlocked ? `Ab Level ${v.unlockLevel}` : isOwned ? "Im Besitz" : `${v.priceEur.toLocaleString("de-DE")} \u20AC`;
        return `
            <button type="button" class="vehicle-card ${isSelected ? "selected" : ""} ${disabled ? "locked" : ""}" data-car-id="${v.id}" ${!unlocked ? "disabled" : ""}>
              <div class="vc-top">
                <div>
                  <div class="vc-name">${v.name}</div>
                  <div class="vc-sub">${v.batteryKwh} kWh ${v.chemistry} \xB7 max ${v.maxSpeedKmh} km/h \xB7 Komfort ${v.comfortRating}/10</div>
                </div>
                <span class="vc-price ${!affordable && unlocked ? "over" : ""}">${statusLabel}</span>
              </div>
              <div class="vc-mid">
                <div class="vc-stats">
                  <span>\u26A1 ${v.baseConsumption100} kWh/100</span>
                  <span>\u{1FA9D} ${v.towingCapacityKg > 0 ? v.towingCapacityKg + " kg" : "Kein Haken"}</span>
                  ${v.isTesla ? '<span class="tesla-tag">Supercharger inkl.</span>' : ""}
                </div>
                ${renderChargingCurveSvg(v)}
              </div>
              <div class="vc-tagline">${v.tagline}</div>
            </button>
          `;
      }).join("")}
      </div>
    `;
    }
    renderSubsTab(plan, car) {
      return `
      <div class="subs-list">
        ${SUBSCRIPTIONS.map((sub) => {
        const isTeslaAuto = sub.id === "tesla_suc" && !!car.isTesla;
        const checked = isTeslaAuto || plan.subscriptionIds.includes(sub.id);
        return `
            <label class="sub-card ${checked ? "active" : ""}">
              <input type="checkbox" class="sub-toggle" data-sub-id="${sub.id}" ${checked ? "checked" : ""} ${isTeslaAuto || sub.id === "adhoc" ? "disabled" : ""} />
              <div class="sub-info">
                <div class="sub-top">
                  <strong>${sub.name}</strong>
                  <span class="sub-fee">${isTeslaAuto ? "0,00 \u20AC (Tesla inkl.)" : `${sub.monthlyFeeEur.toFixed(2)} \u20AC/Mt \xB7 Trip-Anteil ${sub.tripShareFeeEur.toFixed(2)} \u20AC`}</span>
                </div>
                <div class="sub-prices">Eigenes Netz: <b>${sub.pricePerKwhOwn.toFixed(2)} \u20AC/kWh</b> \xB7 Roaming: ${sub.pricePerKwhRoaming.toFixed(2)} \u20AC/kWh</div>
                <div class="sub-desc">${sub.bestFor}</div>
              </div>
            </label>
          `;
      }).join("")}
      </div>
    `;
    }
    renderRouteTab(level, plan, forecast) {
      const vehicle = getVehicleById(plan.vehicleId);
      const activeEdgeIds = new Set(level.routeLegs.map((l) => l.edgeId));
      const availableChargers = CHARGERS.filter((c) => activeEdgeIds.has(c.edgeId));
      return `
      <div class="route-legs-list">
        ${forecast.legForecasts.map((lf) => {
        const speedVal = lf.targetSpeedKmh;
        const riskBadge = lf.policeRisk > 0.45 ? '<span class="risk-pill high">\u{1F4F8} Blitzer-Risiko!</span>' : lf.policeRisk > 0.25 ? '<span class="risk-pill med">\u26A0\uFE0F Erh\xF6htes Risiko</span>' : '<span class="risk-pill low">\u{1F7E2} Sicher</span>';
        const edge = getEdgeById(level.routeLegs[lf.legIndex].edgeId);
        return `
            <div class="leg-card">
              <div class="leg-top">
                <div>
                  <strong>Etappe ${lf.legIndex + 1}: ${lf.label}</strong>
                  <span class="leg-meta">${lf.highwayName} \xB7 ${lf.distanceKm} km \xB7 \u26F0\uFE0F +${edge.elevationGainM}/-${edge.elevationLossM}m \xB7 ${lf.weather}</span>
                </div>
                <div class="leg-soc ${lf.endSocPct < 10 ? "danger" : ""}">
                  ${lf.startSocPct}% \u2192 <strong>${lf.endSocPct}%</strong>
                </div>
              </div>
              <div class="leg-controls">
                <label>Zieltempo: <strong>${speedVal} km/h</strong> (${lf.consumptionKwh100} kWh/100km)</label>
                <input type="range" class="leg-speed-slider" data-leg="${lf.legIndex}" min="95" max="${vehicle.maxSpeedKmh}" step="5" value="${speedVal}" />
                ${riskBadge}
              </div>
              ${lf.stopSummaries.length > 0 ? `<div class="leg-stops">
                      ${lf.stopSummaries.map(
          (ss) => `
                          <div class="planned-stop-pill">
                            <span>\u26A1 ${ss.station.name} (${ss.arriveSoc}% \u2192 ${ss.departSoc}%, ~${ss.minutes} Min, ${ss.costEur.toFixed(2)} \u20AC)</span>
                            <button type="button" class="stop-rm-btn" data-rm-stop="${ss.station.id}" data-rm-leg="${lf.legIndex}" title="Stopp entfernen">\u2715</button>
                          </div>`
        ).join("")}
                    </div>` : ""}
            </div>
          `;
      }).join("")}
      </div>

      <div class="charger-directory">
        <h4>\u26A1 Verf\xFCgbare Ladeparks auf der Strecke (zum Hinzuf\xFCgen klicken)</h4>
        <div class="charger-cards">
          ${availableChargers.map((st) => {
        const tariff = getBestPriceForStation(st, plan.subscriptionIds, vehicle);
        const activeStops = plan.plannedStops.filter((s) => s.chargerId === st.id);
        return `
              <div class="chg-card ${activeStops.length > 0 ? "selected" : ""}">
                <div class="chg-top">
                  <strong>${st.name}</strong>
                  <span class="chg-kw">${st.maxKw} kW \xB7 ${st.stalls} Stalls</span>
                </div>
                <div class="chg-meta">
                  ${st.cityHint} \xB7 <b>${tariff.pricePerKwh.toFixed(2)} \u20AC/kWh</b> (${tariff.usedSubscriptionName})
                  \xB7 Auslastung ${Math.round(st.occupancyRisk * 100)}% \xB7 Defekt ${Math.round(st.defectRisk * 100)}%
                  ${st.hasMcDonalds ? "\xB7 \u{1F354} McDonald\u2019s" : ""}
                  ${st.trailerFriendly ? "\xB7 \u{1F690} Durchfahrt" : ""}
                </div>
                <div class="chg-actions">
                  <button type="button" class="er-mini-btn add-stop-btn" data-chg-id="${st.id}" data-dir="out">+ Hinweg einplanen</button>
                  <button type="button" class="er-mini-btn add-stop-btn" data-chg-id="${st.id}" data-dir="ret">+ R\xFCckweg einplanen</button>
                </div>
              </div>
            `;
      }).join("")}
        </div>
      </div>
    `;
    }
    bindEvents(level, plan, save) {
      this.root.querySelector("#er-level-select")?.addEventListener("change", (e) => {
        SoundFX.click();
        this.cb.onSelectLevel(e.target.value);
      });
      this.root.querySelector("#btn-zoom-route")?.addEventListener("click", () => {
        SoundFX.click();
        this.cb.onZoomRoute();
      });
      this.root.querySelector("#btn-zoom-europe")?.addEventListener("click", () => {
        SoundFX.click();
        this.cb.onZoomEurope();
      });
      this.root.querySelectorAll(".plan-tab").forEach((btn) => {
        btn.addEventListener("click", () => {
          SoundFX.click();
          this.activeTab = btn.dataset.ptab;
          this.render(level, plan, save);
        });
      });
      this.root.querySelectorAll(".vehicle-card").forEach((card) => {
        card.addEventListener("click", () => {
          const id = card.dataset.carId;
          if (!id) return;
          const v = getVehicleById(id);
          if (v.unlockLevel > save.unlockedLevelOrder) return;
          SoundFX.click();
          plan.vehicleId = id;
          if (v.isTesla && !plan.subscriptionIds.includes("tesla_suc")) {
            plan.subscriptionIds.push("tesla_suc");
          }
          this.cb.onPlanChanged();
        });
      });
      this.root.querySelectorAll(".sub-toggle").forEach((cbEl) => {
        cbEl.addEventListener("change", () => {
          const id = cbEl.dataset.subId;
          if (!id) return;
          SoundFX.click();
          const checked = cbEl.checked;
          if (checked && !plan.subscriptionIds.includes(id)) {
            plan.subscriptionIds.push(id);
          } else if (!checked) {
            plan.subscriptionIds = plan.subscriptionIds.filter((s) => s !== id);
          }
          this.cb.onPlanChanged();
        });
      });
      this.root.querySelectorAll(".leg-speed-slider").forEach((slider) => {
        slider.addEventListener("input", () => {
          const legIndex = Number(slider.dataset.leg);
          const val = Number(slider.value);
          const existing = plan.legPlans.find((l) => l.legIndex === legIndex);
          if (existing) existing.targetSpeedKmh = val;
          else plan.legPlans.push({ legIndex, targetSpeedKmh: val });
          this.cb.onPlanChanged();
        });
      });
      this.root.querySelectorAll(".stop-rm-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const chgId = btn.dataset.rmStop;
          const legIdx = Number(btn.dataset.rmLeg);
          SoundFX.click();
          plan.plannedStops = plan.plannedStops.filter(
            (s) => !(s.chargerId === chgId && s.legIndex === legIdx)
          );
          this.cb.onPlanChanged();
        });
      });
      this.root.querySelectorAll(".add-stop-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const chgId = btn.dataset.chgId;
          const dir = btn.dataset.dir;
          if (!chgId) return;
          const st = CHARGERS.find((c) => c.id === chgId);
          if (!st) return;
          const targetLeg = level.routeLegs.findIndex(
            (l) => l.edgeId === st.edgeId && (dir === "ret" ? !!l.reverse : !l.reverse)
          );
          if (targetLeg < 0) return;
          SoundFX.click();
          const exists = plan.plannedStops.some(
            (s) => s.chargerId === chgId && s.legIndex === targetLeg
          );
          if (!exists) {
            plan.plannedStops.push({ chargerId: chgId, legIndex: targetLeg, targetSocPct: 80 });
          }
          this.cb.onPlanChanged();
        });
      });
      this.root.querySelector("#btn-start-trip")?.addEventListener("click", () => {
        SoundFX.click();
        this.cb.onStartTrip();
      });
    }
  };

  // src/phaser/GameBridge.ts
  var TouchInput = {
    left: false,
    right: false,
    up: false,
    down: false,
    brake: false,
    hornPressed: false
  };

  // src/ui/DrivingHUD.ts
  var DrivingHUD = class {
    constructor(hudEl, touchEl, cb) {
      this.mode = "hidden";
      this.forceTouchVisible = false;
      this.hudEl = hudEl;
      this.touchEl = touchEl;
      this.cb = cb;
      try {
        this.forceTouchVisible = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
      } catch (_) {
        this.forceTouchVisible = false;
      }
      this.renderTouchControls();
    }
    setMode(mode) {
      this.mode = mode;
      this.hudEl.classList.toggle("hidden", mode === "hidden");
      this.updateTouchVisibility();
    }
    toggleTouchOverlay() {
      this.forceTouchVisible = !this.forceTouchVisible;
      this.updateTouchVisibility();
      return this.forceTouchVisible;
    }
    updateTouchVisibility() {
      const showTouch = this.mode === "city" && this.forceTouchVisible;
      this.touchEl.classList.toggle("hidden", !showTouch);
    }
    update(level, run, timeScale, citySubtitle) {
      if (this.mode === "hidden") return;
      const leg = level.routeLegs[run.currentLegIndex] || level.routeLegs[0];
      const edge = getEdgeById(leg.edgeId);
      const from = getCityById(leg.reverse ? edge.toCityId : edge.fromCityId);
      const to = getCityById(leg.reverse ? edge.fromCityId : edge.toCityId);
      const vehicle = getVehicleById(run.plan.vehicleId);
      const clockTotalMin = Math.round(level.departureTimeHour * 60 + run.elapsedMinutes);
      const hh = String(Math.floor(clockTotalMin / 60) % 24).padStart(2, "0");
      const mm = String(clockTotalMin % 60).padStart(2, "0");
      const socRound = Math.round(run.socPct);
      const rangeEstKm = Math.round(run.socPct / 100 * vehicle.batteryKwh / (vehicle.baseConsumption100 / 100));
      const moodEmoji = run.stress < 25 ? "\u{1F60C}" : run.stress < 50 ? "\u{1F610}" : run.stress < 75 ? "\u{1F61F}" : "\u{1F624}";
      const weatherBadge = run.activeWeather === "rain" ? "\u{1F327}\uFE0F Regen" : run.activeWeather === "snow" ? "\u2744\uFE0F Schnee" : run.isNight ? "\u{1F319} Nacht" : "\u2600\uFE0F Klar";
      const totalCost = (run.chargingCostEur + run.subscriptionCostEur + run.tollsAndFinesEur).toFixed(2);
      this.hudEl.innerHTML = `
      <div class="dhud-row">
        <div class="dhud-pill soc ${socRound < 15 ? "low" : ""}">
          \u{1F50B} <strong>${socRound}%</strong> (~${rangeEstKm} km)
        </div>
        <div class="dhud-pill">
          \u{1F6E3}\uFE0F ${citySubtitle || `${from.name} \u2192 ${to.name} (${Math.round(run.legProgressKm)}/${edge.distanceKm} km)`}
        </div>
        <div class="dhud-pill">\u{1F552} ${hh}:${mm} \xB7 ${weatherBadge}</div>
        <div class="dhud-pill ${run.stress > 60 ? "warn" : ""}">
          ${moodEmoji} Stress: <strong>${Math.round(run.stress)}%</strong> \xB7 \u{1F6BB} ${Math.round(run.bladderNeed)}%
        </div>
        <div class="dhud-pill">\u{1F4B6} ${totalCost} \u20AC</div>
      </div>

      ${this.mode === "autobahn" ? `
        <div class="dhud-controls">
          <div class="dhud-group">
            <span>Tempo (${run.currentSpeedKmh} km/h):</span>
            ${[100, 120, 130, 150, 175].filter((s) => s <= vehicle.maxSpeedKmh + 5).map(
        (s) => `<button type="button" class="dhud-btn ${Math.abs(run.currentSpeedKmh - s) < 4 ? "active" : ""}" data-spd="${Math.min(vehicle.maxSpeedKmh, s)}">${Math.min(vehicle.maxSpeedKmh, s)}</button>`
      ).join("")}
          </div>
          <div class="dhud-group">
            <span>Zeitraffer:</span>
            ${[1, 5, 15].map(
        (sc) => `<button type="button" class="dhud-btn ${timeScale === sc ? "active" : ""}" data-scale="${sc}">${sc}\xD7</button>`
      ).join("")}
          </div>
          <div class="dhud-group">
            <button type="button" class="dhud-action" id="btn-force-stop">\u26A1 Fr\xFCher laden</button>
            <button type="button" class="dhud-action" id="btn-wc-stop">\u{1F6BB} WC-Stopp (+8m)</button>
            <button type="button" class="dhud-action" id="btn-peek-map">\u{1F5FA}\uFE0F Karte</button>
          </div>
        </div>` : `
        <div class="dhud-controls">
          <div class="dhud-city-hint">
            \u{1F3AE} GTA-2 Stadt-Segment: <b>WASD / Pfeile</b> fahren \xB7 <b>Leertaste</b> bremsen \xB7 <b>H</b> hupen \xB7 Ampeln, Radler &amp; Kinder beachten!
          </div>
        </div>`}
    `;
      if (this.mode === "autobahn") {
        this.hudEl.querySelectorAll("[data-spd]").forEach((b) => {
          b.addEventListener("click", () => {
            SoundFX.click();
            this.cb.onSpeedChange(Number(b.dataset.spd));
          });
        });
        this.hudEl.querySelectorAll("[data-scale]").forEach((b) => {
          b.addEventListener("click", () => {
            SoundFX.click();
            this.cb.onTimeScaleChange(Number(b.dataset.scale));
          });
        });
        this.hudEl.querySelector("#btn-force-stop")?.addEventListener("click", () => {
          SoundFX.click();
          this.cb.onForceEarlierStop();
        });
        this.hudEl.querySelector("#btn-wc-stop")?.addEventListener("click", () => {
          SoundFX.click();
          this.cb.onUnplannedToiletStop();
        });
        this.hudEl.querySelector("#btn-peek-map")?.addEventListener("click", () => {
          SoundFX.click();
          this.cb.onToggleMapPreview();
        });
      }
    }
    renderTouchControls() {
      this.touchEl.innerHTML = `
      <div class="touch-left">
        <button type="button" class="touch-pad" data-t="left" aria-label="Links lenken">\u25C0</button>
        <button type="button" class="touch-pad" data-t="right" aria-label="Rechts lenken">\u25B6</button>
      </div>
      <div class="touch-right">
        <button type="button" class="touch-pad horn" data-t="horn" aria-label="Hupen">\u{1F4EF}</button>
        <button type="button" class="touch-pad brake" data-t="down" aria-label="Bremsen / R\xFCckw\xE4rts">\u25BC</button>
        <button type="button" class="touch-pad gas" data-t="up" aria-label="Gas geben">\u25B2</button>
      </div>
    `;
      const bindHold = (btn, key) => {
        const setState = (val) => {
          TouchInput[key] = val;
          btn.classList.toggle("pressed", val);
        };
        btn.addEventListener("pointerdown", (e) => {
          e.preventDefault();
          setState(true);
        });
        btn.addEventListener("pointerup", () => setState(false));
        btn.addEventListener("pointerleave", () => setState(false));
        btn.addEventListener("pointercancel", () => setState(false));
      };
      ["left", "right", "up", "down"].forEach((k) => {
        const el = this.touchEl.querySelector(`[data-t="${k}"]`);
        if (el) bindHold(el, k);
      });
      const hornBtn = this.touchEl.querySelector('[data-t="horn"]');
      hornBtn?.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        TouchInput.hornPressed = true;
      });
    }
  };

  // src/ui/EventModal.ts
  var EventModal = class {
    constructor(modalEl) {
      this.chargeTimer = null;
      this.modalEl = modalEl;
    }
    close() {
      if (this.chargeTimer !== null) {
        window.clearInterval(this.chargeTimer);
        this.chargeTimer = null;
      }
      this.modalEl.classList.add("hidden");
      this.modalEl.innerHTML = "";
    }
    showDynamicEvent(evt, onChoose, onResume) {
      this.modalEl.classList.remove("hidden");
      this.modalEl.innerHTML = `
      <div class="er-modal-card">
        <div class="er-modal-head">
          <span class="er-modal-icon">${evt.icon}</span>
          <div>
            <div class="er-modal-kicker">Unterwegs-Ereignis</div>
            <h3>${evt.title}</h3>
          </div>
        </div>
        <p class="er-modal-body">${evt.description}</p>
        <div class="er-modal-choices" id="evt-choices">
          ${evt.choices.map(
        (c) => `
            <button type="button" class="er-choice-btn" data-cid="${c.id}">
              <strong>${c.label}</strong>
              <span>${c.hint}</span>
            </button>`
      ).join("")}
        </div>
        <div id="evt-outcome" class="hidden"></div>
      </div>
    `;
      this.modalEl.querySelectorAll(".er-choice-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const cid = btn.dataset.cid;
          const choice = evt.choices.find((c) => c.id === cid);
          if (!choice) return;
          SoundFX.click();
          const msg = onChoose(choice);
          const choicesBox = this.modalEl.querySelector("#evt-choices");
          const outBox = this.modalEl.querySelector("#evt-outcome");
          if (choicesBox) choicesBox.classList.add("hidden");
          if (outBox) {
            outBox.classList.remove("hidden");
            outBox.innerHTML = `
            <div class="er-outcome-box">${msg}</div>
            <button type="button" class="er-primary-btn" id="btn-evt-continue">Weiterfahren \u2192</button>
          `;
            outBox.querySelector("#btn-evt-continue")?.addEventListener("click", () => {
              SoundFX.click();
              this.close();
              onResume();
            });
          }
        });
      });
    }
    showWifeStressDialogue(dlg, level, run, onApplyRouteAction, onSelectReply, onResume) {
      let routeChanged = false;
      let routeFeedback = "";
      const nearest = findNearestAvailableCharger(
        level,
        run.currentLegIndex,
        0.2,
        [...run.completedStopIds, ...run.plan.plannedStops.map((s) => s.chargerId)]
      );
      const render = () => {
        const stressColor = run.stress > 65 ? "#ef4444" : run.stress > 40 ? "#f59e0b" : "#22c55e";
        this.modalEl.classList.remove("hidden");
        this.modalEl.innerHTML = `
        <div class="er-modal-card wife-card">
          <div class="er-modal-head">
            <span class="er-modal-icon">\u{1F4AC}</span>
            <div>
              <div class="er-modal-kicker">Beifahrer- &amp; Stress-Dialog</div>
              <h3>${dlg.speaker}</h3>
            </div>
            <div class="wife-stress-badge" style="border-color:${stressColor}; color:${stressColor}">
              Stress: ${Math.round(run.stress)}%
            </div>
          </div>

          <blockquote class="wife-quote">${dlg.quote}</blockquote>
          <p class="wife-hint">${dlg.contextHint}</p>

          <div class="wife-map-eval">
            <div class="wme-head">
              <strong>\u{1F5FA}\uFE0F Alternativen live pr\xFCfen (w\xE4hrend des Gespr\xE4chs)</strong>
              <span>Aktuell: ${Math.round(run.socPct)}% SoC \xB7 ${run.currentSpeedKmh} km/h</span>
            </div>
            <div class="wme-actions">
              ${nearest ? `<button type="button" class="er-mini-btn" id="btn-wife-add-stop" ${routeChanged ? "disabled" : ""}>
                      \u26A1 +${dlg.suggestedQuickStopMinutes} Min Zwischenstopp: ${nearest.station.name}
                     </button>` : `<span class="wme-note">N\xE4chster Ladestopp ist bereits eingeplant.</span>`}
              <button type="button" class="er-mini-btn" id="btn-wife-eco">
                \u{1F422} Tempo auf 115 km/h senken (-22 % Verbrauch)
              </button>
            </div>
            ${routeFeedback ? `<div class="wme-feedback">\u2705 ${routeFeedback}</div>` : ""}
          </div>

          <div class="er-modal-choices" id="wife-choices">
            ${dlg.choices.map(
          (c) => `
              <button type="button" class="er-choice-btn" data-wid="${c.id}">
                <strong>${c.text}</strong>
                <span>Tonfall: ${c.tone === "calming" ? "Verst\xE4ndnisvoll & ruhig" : c.tone === "confident" ? "Souver\xE4n & faktenbasiert" : c.tone === "risky" ? "Riskant" : "Gereizt"}</span>
              </button>`
        ).join("")}
          </div>
          <div id="wife-outcome" class="hidden"></div>
        </div>
      `;
        this.modalEl.querySelector("#btn-wife-add-stop")?.addEventListener("click", () => {
          SoundFX.click();
          routeChanged = true;
          routeFeedback = onApplyRouteAction("insert_stop");
          render();
        });
        this.modalEl.querySelector("#btn-wife-eco")?.addEventListener("click", () => {
          SoundFX.click();
          routeChanged = true;
          routeFeedback = onApplyRouteAction("eco_speed");
          render();
        });
        this.modalEl.querySelectorAll("[data-wid]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const wid = btn.dataset.wid;
            const choice = dlg.choices.find((c) => c.id === wid);
            if (!choice) return;
            SoundFX.click();
            onSelectReply(choice, routeChanged);
            const chBox = this.modalEl.querySelector("#wife-choices");
            const outBox = this.modalEl.querySelector("#wife-outcome");
            if (chBox) chBox.classList.add("hidden");
            if (outBox) {
              outBox.classList.remove("hidden");
              outBox.innerHTML = `
              <div class="er-outcome-box">
                <div><strong>Antwort Partnerin:</strong> ${choice.replyText}</div>
                <div style="margin-top:6px;font-size:12.5px;opacity:0.9;">Aktueller Stresspegel: <strong>${Math.round(run.stress)}%</strong></div>
              </div>
              <button type="button" class="er-primary-btn" id="btn-wife-resume">Fahrt fortsetzen \u2192</button>
            `;
              outBox.querySelector("#btn-wife-resume")?.addEventListener("click", () => {
                SoundFX.click();
                this.close();
                onResume();
              });
            }
          });
        });
      };
      render();
    }
    showCollisionDialogue(kind, onResolve) {
      const labelMap = {
        car: "Blechschaden / Rempler mit anderem Fahrzeug",
        pedestrian: "Beinahe-Zusammensto\xDF mit Fu\xDFg\xE4nger!",
        cyclist: "Kontakt am Radweg mit Radfahrer!",
        obstacle: "Baustellen-Pylone / Bordstein gestreift"
      };
      this.modalEl.classList.remove("hidden");
      this.modalEl.innerHTML = `
      <div class="er-modal-card">
        <div class="er-modal-head">
          <span class="er-modal-icon">\u{1F4A5}</span>
          <div>
            <div class="er-modal-kicker">GTA-Stadtverkehr \xB7 Zwischenfall</div>
            <h3>${labelMap[kind]}</h3>
          </div>
        </div>
        <p class="er-modal-body">Wie reagierst du auf die Situation im Stadtverkehr?</p>
        <div class="er-modal-choices">
          <button type="button" class="er-choice-btn" id="col-calm">
            <strong>Ruhig aussteigen, entschuldigen &amp; sauber kl\xE4ren</strong>
            <span>+8 Min Zeit \xB7 ${kind === "obstacle" ? "0 \u20AC" : "65 \u20AC Kleinschaden"} \xB7 moderater Stress</span>
          </button>
          <button type="button" class="er-choice-btn" id="col-rush">
            <strong>Hektisch weiterwinken</strong>
            <span>+2 Min Zeit \xB7 h\xF6heres Bu\xDFgeld-/Stressrisiko (+120 \u20AC, +16 Stress)</span>
          </button>
        </div>
      </div>
    `;
      this.modalEl.querySelector("#col-calm")?.addEventListener("click", () => {
        SoundFX.click();
        this.close();
        onResolve(kind === "obstacle" ? 0 : 65, 8, 9, `${labelMap[kind]} ruhig & fair gekl\xE4rt.`);
      });
      this.modalEl.querySelector("#col-rush")?.addEventListener("click", () => {
        SoundFX.click();
        this.close();
        onResolve(120, 2, 16, `${labelMap[kind]} hektisch geregelt (Anzeige/Bu\xDFgeld).`);
      });
    }
    showChargingSession(station, run, targetSocPct, onComplete) {
      const vehicle = getVehicleById(run.plan.vehicleId);
      const startSoc = Math.max(2, Math.round(run.socPct));
      const est = estimateChargeSession(
        vehicle,
        station,
        startSoc,
        Math.max(startSoc + 10, targetSocPct),
        run.plan.subscriptionIds
      );
      let currentSoc = startSoc;
      let addedKwh = 0;
      let elapsedMin = 2.5;
      let costEur = 0;
      let finished = false;
      SoundFX.plugIn();
      const renderCharge = () => {
        const kwNow = Math.round(getChargingPowerKw(vehicle, station, currentSoc));
        const pctProgress = Math.min(100, Math.round(currentSoc));
        const w = 260;
        const h = 76;
        const maxKw = 330;
        const pts = vehicle.chargingCurve.map((p) => {
          const x = p.soc / 100 * (w - 16) + 8;
          const y = h - 10 - p.kw / maxKw * (h - 20);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(" ");
        const dotX = currentSoc / 100 * (w - 16) + 8;
        const dotY = h - 10 - kwNow / maxKw * (h - 20);
        this.modalEl.classList.remove("hidden");
        this.modalEl.innerHTML = `
        <div class="er-modal-card charge-card">
          <div class="er-modal-head">
            <span class="er-modal-icon">\u26A1</span>
            <div>
              <div class="er-modal-kicker">Schnellladen aktiv \xB7 ${station.network.toUpperCase()}</div>
              <h3>${station.name}</h3>
            </div>
            <span class="charge-kw-pill">${kwNow} kW</span>
          </div>

          <div class="charge-soc-bar-wrap">
            <div class="charge-soc-bar" style="width:${pctProgress}%"></div>
            <span class="charge-soc-label">${pctProgress}% SoC (Ziel ${targetSocPct}%)</span>
          </div>

          <div class="charge-curve-box">
            <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
              <polyline fill="none" stroke="rgba(148,163,184,0.3)" stroke-width="1" points="8,${h - 10} ${w - 8},${h - 10}" />
              <polyline fill="none" stroke="#2563eb" stroke-width="2.5" points="${pts}" />
              <line x1="${dotX.toFixed(1)}" y1="6" x2="${dotX.toFixed(1)}" y2="${h - 10}" stroke="#22c55e" stroke-dasharray="3 2" />
              <circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="5" fill="#22c55e" stroke="#ffffff" stroke-width="1.5" />
            </svg>
          </div>

          <div class="charge-stats-grid">
            <div><span>Geladen</span><strong>+${addedKwh.toFixed(1)} kWh</strong></div>
            <div><span>Ladezeit</span><strong>${Math.round(elapsedMin)} Min</strong></div>
            <div><span>Tarif</span><strong>${est.tariff.pricePerKwh.toFixed(2)} \u20AC/kWh</strong></div>
            <div><span>Kosten</span><strong>${costEur.toFixed(2)} \u20AC</strong></div>
          </div>

          ${est.tariff.hasMcDonaldsBonus ? `<div class="mcd-bonus-banner">\u{1F354} EWE Go @ McDonald\u2019s Bonus: Frischer Snack &amp; WC (-12 Stress)!</div>` : `<div class="charge-tarif-note">Abgerechnet \xFCber: <b>${est.tariff.usedSubscriptionName}</b></div>`}

          <button type="button" class="er-primary-btn" id="btn-unplug">
            ${finished ? "\u{1F50C} Ladevorgang komplett \u2013 Weiterfahren!" : "\u{1F50C} Jetzt abstecken & weiterfahren"}
          </button>
        </div>
      `;
        this.modalEl.querySelector("#btn-unplug")?.addEventListener("click", () => {
          SoundFX.click();
          this.close();
          onComplete(addedKwh, Math.round(elapsedMin), Number(costEur.toFixed(2)), Math.round(currentSoc));
        });
      };
      renderCharge();
      this.chargeTimer = window.setInterval(() => {
        if (currentSoc >= targetSocPct) {
          finished = true;
          SoundFX.chargeDone();
          if (this.chargeTimer !== null) {
            window.clearInterval(this.chargeTimer);
            this.chargeTimer = null;
          }
          renderCharge();
          return;
        }
        const stepSoc = 2.5;
        const nextSoc = Math.min(targetSocPct, currentSoc + stepSoc);
        const dSoc = nextSoc - currentSoc;
        const midSoc = (currentSoc + nextSoc) / 2;
        const kw = getChargingPowerKw(vehicle, station, midSoc);
        const kwhStep = vehicle.batteryKwh * dSoc / 100;
        const billedKwh = kwhStep * 1.04;
        addedKwh += billedKwh;
        costEur += billedKwh * est.tariff.pricePerKwh;
        elapsedMin += kwhStep / kw * 60;
        currentSoc = nextSoc;
        renderCharge();
      }, 170);
    }
    showMapPeek(summaryHtml, onClose) {
      this.modalEl.classList.remove("hidden");
      this.modalEl.innerHTML = `
      <div class="er-modal-card">
        <div class="er-modal-head">
          <span class="er-modal-icon">\u{1F5FA}\uFE0F</span>
          <div>
            <div class="er-modal-kicker">Live-Routenstatus</div>
            <h3>Aktuelle Etappen &amp; Restakku</h3>
          </div>
        </div>
        <div class="er-modal-body">${summaryHtml}</div>
        <button type="button" class="er-primary-btn" id="btn-map-close">Zur\xFCck ans Steuer \u2192</button>
      </div>
    `;
      this.modalEl.querySelector("#btn-map-close")?.addEventListener("click", () => {
        SoundFX.click();
        this.close();
        onClose();
      });
    }
  };

  // src/ui/ResultsUI.ts
  var ResultsUI = class {
    constructor(root, cb) {
      this.root = root;
      this.cb = cb;
    }
    hide() {
      this.root.classList.add("hidden");
      this.root.innerHTML = "";
    }
    show(level, run, result, save) {
      try {
        if (window.ArcadeScores && typeof window.ArcadeScores.submit === "function") {
          const hrs2 = Math.floor(result.totalMinutes / 60);
          const mins2 = result.totalMinutes % 60;
          window.ArcadeScores.submit(
            "eroadtrip",
            result.totalScore,
            `${result.totalScore} Pkt \xB7 ${hrs2}h${String(mins2).padStart(2, "0")}m`
          );
        }
      } catch (_) {
      }
      const currentCar = getVehicleById(run.plan.vehicleId);
      const resaleEur = getResaleValue(currentCar.id);
      const totalAfterResale = save.cashEur + resaleEur;
      const hrs = Math.floor(result.totalMinutes / 60);
      const mins = result.totalMinutes % 60;
      const tHrs = Math.floor(result.targetMinutes / 60);
      const tMins = result.targetMinutes % 60;
      const upgradeCandidates = VEHICLES.filter(
        (v) => v.id !== currentCar.id && v.unlockLevel <= save.unlockedLevelOrder
      );
      const renderBar = (label, score, weight) => `
      <div class="res-bar-row">
        <div class="res-bar-head">
          <span>${label} (${Math.round(weight * 100)}%)</span>
          <strong>${score} / 100</strong>
        </div>
        <div class="res-bar-track"><div class="res-bar-fill" style="width:${score}%"></div></div>
      </div>
    `;
      this.root.classList.remove("hidden");
      this.root.innerHTML = `
      <div class="results-card">
        <div class="results-hero">
          <div class="res-score-ring">
            <div class="res-score-num">${result.totalScore}</div>
            <div class="res-score-sub">/ 1.000 Pkt</div>
          </div>
          <div>
            <div class="res-kicker">${level.title} abgeschlossen!</div>
            <h2>${result.gradeLabel}</h2>
            <p class="res-summary-line">
              \u23F1\uFE0F Gesamtzeit: <strong>${hrs}h ${String(mins).padStart(2, "0")}m</strong> (Ziel ${tHrs}h ${String(tMins).padStart(2, "0")}m) \xB7
              \u{1F4B6} Kosten: <strong>${result.totalCostEur.toFixed(2)} \u20AC</strong> \xB7
              \u26A1 Verbrauch: <strong>${result.avgConsumptionKwh100} kWh/100km</strong> \xB7
              \u{1F630} Stress-Peak: <strong>${result.peakStress}%</strong>
            </p>
            <div class="res-prize-badge">
              \u{1F3C6} Pr\xE4mie erhalten: <strong>+${result.prizeMoneyEur.toLocaleString("de-DE")} \u20AC</strong> \xB7 Neues Kapital: <strong>${save.cashEur.toLocaleString("de-DE")} \u20AC</strong>
            </div>
          </div>
        </div>

        <div class="res-columns">
          <div class="res-panel">
            <h3>\u{1F4CA} Detail-Auswertung</h3>
            ${renderBar("Zeit-Performance", result.subScores.time, result.weights.time)}
            ${renderBar("Gesamtkosten (Laden/Abos/Strafen)", result.subScores.cost, result.weights.cost)}
            ${renderBar("Beifahrer-Stress & Peaks", result.subScores.stress, result.weights.stress)}
            ${renderBar("Effizienz & Ladekurve", result.subScores.efficiency, result.weights.efficiency)}
            ${renderBar("Dynamische Entscheidungen & Parken", result.subScores.decisions, result.weights.decisions)}
          </div>

          <div class="res-panel">
            <h3>\u{1F4DD} Fahrtbuch &amp; Ereignisse</h3>
            <div class="res-log-list">
              ${run.incidentLog.length > 0 ? run.incidentLog.map(
        (item) => `
                    <div class="res-log-item ${item.impact}">
                      <span class="log-t">${item.timeStr}</span>
                      <div><strong>${item.title}</strong><div>${item.detail}</div></div>
                    </div>`
      ).join("") : '<div class="res-log-item positive">\u2705 Reibungslose Fahrt ohne Zwischenf\xE4lle!</div>'}
            </div>
          </div>
        </div>

        <div class="res-garage-box">
          <h3>\u{1F698} Fahrzeug-Entscheidung &amp; Kampagne</h3>
          <p>
            Dein aktueller Wagen (<strong>${currentCar.name}</strong>) hat einen Restwert von <strong>${resaleEur.toLocaleString("de-DE")} \u20AC</strong>
            (${Math.round(currentCar.depreciationRate * 100)} % Wertverlust). Zusammen mit deinem Guthaben stehen dir bei Verkauf
            <strong>${totalAfterResale.toLocaleString("de-DE")} \u20AC</strong> zur Verf\xFCgung.
          </p>
          <div class="res-car-actions">
            <button type="button" class="er-primary-btn" id="btn-keep-car">
              \u{1F511} ${currentCar.name} behalten &amp; n\xE4chste Planung starten
            </button>
            ${upgradeCandidates.map((u) => {
        const canBuy = totalAfterResale >= u.priceEur;
        return `
                  <button type="button" class="er-upgrade-btn" data-buy-car="${u.id}" ${canBuy ? "" : "disabled"}>
                    <strong>\u2B06\uFE0F Eintauschen gegen ${u.name}</strong>
                    <span>${u.priceEur.toLocaleString("de-DE")} \u20AC (${u.batteryKwh} kWh \xB7 ${Math.max(...u.chargingCurve.map((c) => c.kw))} kW) ${canBuy ? "\xB7 Leistbar!" : "\xB7 Zu teuer"}</span>
                  </button>
                `;
      }).join("")}
          </div>
        </div>

        <div class="res-next-levels">
          <h4>\u{1F5FA}\uFE0F Freigeschaltete &amp; kuratierte Kampagnen-Stufen</h4>
          <div class="next-lvl-grid">
            ${LEVELS.map((l) => {
        const unlocked = l.order <= save.unlockedLevelOrder;
        return `
                <div class="nl-chip ${unlocked ? "unlocked" : "locked"}">
                  <strong>${l.title}</strong>
                  <span>${l.playable ? "\u2705 Voll spielbar" : unlocked ? "\u{1F513} Struktur freigeschaltet" : "\u{1F512} Erst Level " + (l.order - 1) + " meistern"}</span>
                </div>
              `;
      }).join("")}
          </div>
        </div>
      </div>
    `;
      this.root.querySelector("#btn-keep-car")?.addEventListener("click", () => {
        SoundFX.click();
        this.hide();
        this.cb.onKeepCarAndReplay(level.id);
      });
      this.root.querySelectorAll("[data-buy-car]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const carId = btn.dataset.buyCar;
          if (!carId) return;
          SoundFX.click();
          this.hide();
          this.cb.onSellAndBuyCar(carId, level.id);
        });
      });
    }
  };

  // src/main.ts
  function formatClock(level, elapsedMin) {
    const total = Math.round(level.departureTimeHour * 60 + elapsedMin);
    const hh = String(Math.floor(total / 60) % 24).padStart(2, "0");
    const mm = String(total % 60).padStart(2, "0");
    return `${hh}:${mm}`;
  }
  var ERoadtripController = class {
    constructor() {
      this.save = loadCampaignSave();
      this.level = getLevelById("level_1_aachen_hannover");
      const startCarId = this.save.ownedVehicleId || "mg4_standard";
      this.plan = createDefaultPlan(this.level, startCarId);
      this.stageWrapEl = document.getElementById("er-workspace");
      this.plannerEl = document.getElementById("er-planner-panel");
      const hudEl = document.getElementById("er-driving-hud");
      const touchEl = document.getElementById("er-touch-controls");
      const modalEl = document.getElementById("er-modal-overlay");
      const resultsEl = document.getElementById("er-results-overlay");
      this.eventModal = new EventModal(modalEl);
      this.bridge = {
        level: this.level,
        plan: this.plan,
        runState: null,
        timeScale: 5,
        paused: false,
        touch: { left: false, right: false, up: false, down: false, brake: false, hornPressed: false },
        isLightTheme: () => document.documentElement.getAttribute("data-theme") !== "dark",
        onBootReady: () => {
          this.renderPlanning();
        },
        onMapSelectCharger: (station) => {
          this.toggleChargerInPlan(station);
        },
        onAutobahnHudTick: (run) => {
          this.drivingHUD.update(this.level, run, this.bridge.timeScale);
        },
        onTriggerChargerSegment: (station) => {
          this.enterChargerSegment(station);
        },
        onTriggerCitySegment: (preset) => {
          this.enterCitySegment(preset);
        },
        onCitySegmentComplete: (preset, cleanArrival) => {
          this.handleCitySegmentComplete(preset, cleanArrival);
        },
        onDynamicEventTrigger: (eventId) => {
          this.handleDynamicEvent(eventId);
        },
        onWifeDialogueTrigger: (dialogueId) => {
          this.handleWifeDialogue(dialogueId);
        },
        onCollisionEvent: (kind) => {
          this.handleCollision(kind);
        },
        onBatteryDepleted: () => {
          this.handleBatteryDepleted();
        }
      };
      this.planningUI = new PlanningUI(this.plannerEl, {
        onPlanChanged: () => {
          this.syncMapScene();
          this.renderPlanning();
        },
        onStartTrip: () => this.startTrip(),
        onSelectLevel: (levelId) => {
          this.level = getLevelById(levelId);
          this.bridge.level = this.level;
          const carId = this.save.ownedVehicleId || "mg4_standard";
          this.plan = createDefaultPlan(this.level, carId);
          this.bridge.plan = this.plan;
          this.game.scene.start("EuropeMapScene", { bridge: this.bridge });
          this.renderPlanning();
        },
        onZoomRoute: () => {
          const s = this.game.scene.getScene("EuropeMapScene");
          s?.fitCameraToRoute();
        },
        onZoomEurope: () => {
          const s = this.game.scene.getScene("EuropeMapScene");
          s?.zoomFullEurope();
        }
      });
      this.drivingHUD = new DrivingHUD(hudEl, touchEl, {
        onSpeedChange: (spd) => {
          const run = this.bridge.runState;
          if (!run) return;
          const lp = run.plan.legPlans.find((x) => x.legIndex === run.currentLegIndex);
          if (lp) lp.targetSpeedKmh = spd;
          else run.plan.legPlans.push({ legIndex: run.currentLegIndex, targetSpeedKmh: spd });
          run.currentSpeedKmh = spd;
          this.drivingHUD.update(this.level, run, this.bridge.timeScale);
        },
        onTimeScaleChange: (scale) => {
          this.bridge.timeScale = scale;
          if (this.bridge.runState) {
            this.drivingHUD.update(this.level, this.bridge.runState, this.bridge.timeScale);
          }
        },
        onForceEarlierStop: () => {
          this.forceEarlierChargeStop();
        },
        onUnplannedToiletStop: () => {
          const run = this.bridge.runState;
          if (!run) return;
          run.elapsedMinutes += 8;
          run.bladderNeed = 0;
          run.stress = Math.max(0, run.stress - 14);
          run.incidentLog.push({
            timeStr: formatClock(this.level, run.elapsedMinutes),
            title: "Ungeplanter WC-/Kaffee-Stopp",
            detail: "+8 Min \xB7 Harndrang 0 % \xB7 Stress -14 %",
            impact: "positive"
          });
          this.drivingHUD.update(this.level, run, this.bridge.timeScale);
        },
        onToggleMapPreview: () => {
          this.openLiveMapPeek();
        }
      });
      this.resultsUI = new ResultsUI(resultsEl, {
        onKeepCarAndReplay: (nextLevelId) => {
          this.returnToPlanning(nextLevelId);
        },
        onSellAndBuyCar: (newCarId, nextLevelId) => {
          if (this.save.ownedVehicleId) {
            this.save.cashEur += getResaleValue(this.save.ownedVehicleId);
          }
          const nextCar = getVehicleById(newCarId);
          if (this.save.cashEur >= nextCar.priceEur) {
            this.save.cashEur -= nextCar.priceEur;
            this.save.ownedVehicleId = newCarId;
            saveCampaignState(this.save);
          }
          this.returnToPlanning(nextLevelId);
        }
      });
      this.bindTopbarButtons();
      this.bootPhaser();
    }
    bindTopbarButtons() {
      document.getElementById("btn-toggle-touch")?.addEventListener("click", () => {
        SoundFX.click();
        const on = this.drivingHUD.toggleTouchOverlay();
        const btn = document.getElementById("btn-toggle-touch");
        if (btn) btn.textContent = on ? "\u{1F3AE} Touch: AN" : "\u{1F3AE} Touch: AUS";
      });
      document.getElementById("btn-reset-campaign")?.addEventListener("click", () => {
        SoundFX.click();
        this.save = resetCampaignSave();
        this.plan = createDefaultPlan(this.level, "mg4_standard");
        this.bridge.plan = this.plan;
        this.bridge.runState = null;
        this.eventModal.close();
        this.resultsUI.hide();
        this.returnToPlanning(this.level.id);
      });
    }
    bootPhaser() {
      const parent = document.getElementById("phaser-stage");
      const config = {
        type: Phaser5.AUTO,
        parent,
        width: parent.clientWidth || 720,
        height: parent.clientHeight || 520,
        backgroundColor: "#0c1e38",
        pixelArt: true,
        roundPixels: true,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
          }
        },
        scale: {
          mode: Phaser5.Scale.RESIZE,
          autoCenter: Phaser5.Scale.CENTER_BOTH
        },
        scene: [BootScene, EuropeMapScene, AutobahnScene, CityDriveScene]
      };
      this.game = new Phaser5.Game(config);
      this.game.scene.start("BootScene", { bridge: this.bridge });
    }
    renderPlanning() {
      this.planningUI.render(this.level, this.plan, this.save);
    }
    syncMapScene() {
      const mapScene = this.game.scene.getScene("EuropeMapScene");
      if (mapScene && mapScene.scene.isActive()) {
        mapScene.refreshDynamicState();
      }
    }
    toggleChargerInPlan(station) {
      const legIdx = this.level.routeLegs.findIndex((l) => l.edgeId === station.edgeId);
      if (legIdx < 0) return;
      const existingOut = this.plan.plannedStops.findIndex(
        (s) => s.chargerId === station.id && s.legIndex === legIdx
      );
      if (existingOut >= 0) {
        this.plan.plannedStops.splice(existingOut, 1);
      } else {
        this.plan.plannedStops.push({ chargerId: station.id, legIndex: legIdx, targetSocPct: 80 });
      }
      this.renderPlanning();
    }
    startTrip() {
      const vehicle = getVehicleById(this.plan.vehicleId);
      if (this.save.ownedVehicleId !== vehicle.id) {
        if (this.save.cashEur < vehicle.priceEur) return;
        if (this.save.ownedVehicleId) {
          this.save.cashEur += getResaleValue(this.save.ownedVehicleId);
        }
        this.save.cashEur -= vehicle.priceEur;
        this.save.ownedVehicleId = vehicle.id;
        saveCampaignState(this.save);
      }
      const subCost = computeSubscriptionTripCost(this.plan.subscriptionIds, vehicle);
      const clonedPlan = JSON.parse(JSON.stringify(this.plan));
      this.bridge.plan = clonedPlan;
      this.bridge.paused = false;
      this.bridge.runState = {
        levelId: this.level.id,
        plan: clonedPlan,
        currentLegIndex: 0,
        legProgressKm: 0,
        socPct: 96,
        elapsedMinutes: 0,
        stress: this.level.passengers.initialStress,
        peakStress: this.level.passengers.initialStress,
        bladderNeed: 10,
        energyUsedKwh: 0,
        distanceDrivenKm: 0,
        chargingCostEur: 0,
        subscriptionCostEur: subCost,
        tollsAndFinesEur: 0,
        decisionScoreAccum: 0,
        replanCount: 0,
        goodReplanCount: 0,
        chargingEfficiencyBonus: 0,
        collisionsCount: 0,
        completedStopIds: [],
        skippedStopIds: [],
        triggeredEventIds: [],
        wifeDialogueTriggered: false,
        incidentLog: [],
        activeWeather: "clear",
        currentSpeedKmh: clonedPlan.legPlans[0]?.targetSpeedKmh || 130,
        isNight: false
      };
      this.stageWrapEl.classList.add("driving-active");
      this.plannerEl.classList.add("hidden");
      this.enterCitySegment("aachen_start");
    }
    stopAllGameplayScenes() {
      ["EuropeMapScene", "AutobahnScene", "CityDriveScene"].forEach((k) => {
        if (this.game.scene.isActive(k)) {
          this.game.scene.stop(k);
        }
      });
    }
    enterCitySegment(preset, chargerId) {
      this.stopAllGameplayScenes();
      this.bridge.paused = false;
      this.drivingHUD.setMode("city");
      const titleMap = {
        aachen_start: "Aachen Innenstadt \u2192 A4 Auffahrt",
        charger_park: `Ladepark Einfahrt`,
        hannover_messe: "Hannover Messe \u2192 E-Parkplatz",
        aachen_finish: "Aachen Ausfahrt \u2192 Ziel-Parkplatz",
        ferry_denmark: "Hirtshals F\xE4hrhafen"
      };
      if (this.bridge.runState) {
        this.drivingHUD.update(this.level, this.bridge.runState, this.bridge.timeScale, titleMap[preset]);
      }
      this.game.scene.start("CityDriveScene", {
        bridge: this.bridge,
        preset,
        chargerId
      });
    }
    enterChargerSegment(station) {
      const run = this.bridge.runState;
      if (!run) return;
      run.activeCityChargerId = station.id;
      this.enterCitySegment("charger_park", station.id);
    }
    enterAutobahn() {
      this.stopAllGameplayScenes();
      this.bridge.paused = false;
      this.drivingHUD.setMode("autobahn");
      if (this.bridge.runState) {
        this.drivingHUD.update(this.level, this.bridge.runState, this.bridge.timeScale);
      }
      this.game.scene.start("AutobahnScene", { bridge: this.bridge });
    }
    handleCitySegmentComplete(preset, cleanArrival) {
      const run = this.bridge.runState;
      if (!run) return;
      if (preset === "aachen_start") {
        run.elapsedMinutes += 7;
        run.incidentLog.push({
          timeStr: formatClock(this.level, run.elapsedMinutes),
          title: "Aachen Stadt-Ausfahrt \u2192 A4",
          detail: cleanArrival ? "Sauber auf die A4 aufgefahren!" : "Mit Zwischenfall auf die A4.",
          impact: cleanArrival ? "positive" : "negative"
        });
        this.enterAutobahn();
        return;
      }
      if (preset === "charger_park") {
        const stationId = run.activeCityChargerId;
        const station = stationId ? CHARGERS.find((c) => c.id === stationId) : void 0;
        if (!station) {
          this.enterAutobahn();
          return;
        }
        const startChargingFlow = () => {
          const stopPlan = run.plan.plannedStops.find(
            (s) => s.chargerId === station.id && s.legIndex === run.currentLegIndex
          );
          const targetSoc = stopPlan ? stopPlan.targetSocPct : 80;
          const arriveSoc = run.socPct;
          this.bridge.paused = true;
          this.eventModal.showChargingSession(station, run, targetSoc, (addedKwh, mins, cost, newSoc) => {
            run.completedStopIds.push(station.id);
            run.socPct = newSoc;
            run.elapsedMinutes += mins;
            run.chargingCostEur += cost;
            run.bladderNeed = Math.max(0, run.bladderNeed - 55);
            if (arriveSoc <= 24 && newSoc <= 82) {
              run.chargingEfficiencyBonus += 6;
            }
            if (station.hasMcDonalds && run.plan.subscriptionIds.includes("ewe_go")) {
              run.stress = Math.max(0, run.stress - 12);
            } else {
              run.stress = Math.max(0, run.stress - 4);
            }
            run.incidentLog.push({
              timeStr: formatClock(this.level, run.elapsedMinutes),
              title: `Laden: ${station.name}`,
              detail: `+${addedKwh.toFixed(1)} kWh (${Math.round(arriveSoc)}% \u2192 ${newSoc}%) in ${mins} Min \xB7 ${cost.toFixed(2)} \u20AC`,
              impact: "positive"
            });
            this.enterAutobahn();
          });
        };
        if (!run.triggeredEventIds.includes(`def_${station.id}`) && Math.random() < station.defectRisk + station.occupancyRisk * 0.35) {
          run.triggeredEventIds.push(`def_${station.id}`);
          const evt = getEventById("evt_charger_defect");
          if (evt) {
            this.bridge.paused = true;
            this.eventModal.showDynamicEvent(
              evt,
              (choice) => {
                this.applyEventChoice(evt.title, choice);
                if (choice.insertNearestCharger) {
                  run.skippedStopIds.push(station.id);
                }
                return choice.resultText;
              },
              () => {
                if (run.skippedStopIds.includes(station.id)) {
                  this.enterAutobahn();
                } else {
                  startChargingFlow();
                }
              }
            );
            return;
          }
        }
        startChargingFlow();
        return;
      }
      if (preset === "hannover_messe") {
        run.elapsedMinutes += 28;
        run.bladderNeed = 0;
        run.stress = Math.max(0, run.stress - 8);
        run.incidentLog.push({
          timeStr: formatClock(this.level, run.elapsedMinutes),
          title: "Hannover Messe erreicht!",
          detail: "Messe-Termin & Turnaround (+28 Min). Jetzt R\xFCckfahrt nach Aachen!",
          impact: "positive"
        });
        this.bridge.paused = true;
        this.eventModal.showMapPeek(
          `
        <p><strong>\u{1F389} Etappenziel Hannover Messe erreicht!</strong></p>
        <p>Nach 28 Minuten Messe-Checkup geht es jetzt bei aufziehendem Regen und sp\xE4terer D\xE4mmerung zur\xFCck Richtung Aachen.</p>
        <p>Aktueller Akku: <strong>${Math.round(run.socPct)}%</strong> \xB7 Stress: <strong>${Math.round(run.stress)}%</strong></p>
        `,
          () => {
            run.currentLegIndex += 1;
            run.legProgressKm = 0;
            this.enterAutobahn();
          }
        );
        return;
      }
      if (preset === "aachen_finish") {
        this.finishLevel(cleanArrival);
      }
    }
    applyEventChoice(title, choice) {
      const run = this.bridge.runState;
      if (!run) return choice.resultText;
      run.elapsedMinutes += choice.timeDeltaMin;
      run.socPct = Math.max(1, Math.min(100, run.socPct + choice.socDeltaPct));
      run.chargingCostEur += choice.costDeltaEur;
      run.stress = Phaser5.Math.Clamp(run.stress + choice.stressDelta, 0, 100);
      run.peakStress = Math.max(run.peakStress, run.stress);
      run.decisionScoreAccum += choice.decisionPoints;
      if (choice.adjustSpeedKmh) {
        const lp = run.plan.legPlans.find((x) => x.legIndex === run.currentLegIndex);
        if (lp) lp.targetSpeedKmh = choice.adjustSpeedKmh;
        run.currentSpeedKmh = choice.adjustSpeedKmh;
      }
      if (choice.insertNearestCharger) {
        const leg = this.level.routeLegs[run.currentLegIndex];
        const edge = getEdgeById(leg.edgeId);
        const nearest = findNearestAvailableCharger(
          this.level,
          run.currentLegIndex,
          run.legProgressKm / edge.distanceKm,
          run.completedStopIds
        );
        if (nearest) {
          const exists = run.plan.plannedStops.some(
            (s) => s.chargerId === nearest.station.id && s.legIndex === nearest.legIndex
          );
          if (!exists) {
            run.plan.plannedStops.push({
              chargerId: nearest.station.id,
              legIndex: nearest.legIndex,
              targetSocPct: 78
            });
            run.replanCount += 1;
            run.goodReplanCount += 1;
          }
        }
      }
      let finalText = choice.resultText;
      if (choice.fineRisk && Math.random() < choice.fineRisk.probability) {
        run.tollsAndFinesEur += choice.fineRisk.amountEur;
        run.stress = Math.min(100, run.stress + 12);
        run.peakStress = Math.max(run.peakStress, run.stress);
        finalText += ` \u26A0\uFE0F Pech gehabt: ${choice.fineRisk.label} (+${choice.fineRisk.amountEur} \u20AC Bu\xDFgeld)!`;
      }
      run.incidentLog.push({
        timeStr: formatClock(this.level, run.elapsedMinutes),
        title,
        detail: finalText,
        impact: choice.decisionPoints >= 10 ? "positive" : choice.decisionPoints < 0 ? "negative" : "neutral"
      });
      return finalText;
    }
    handleDynamicEvent(eventId) {
      const evt = getEventById(eventId);
      if (!evt) {
        this.bridge.paused = false;
        return;
      }
      this.eventModal.showDynamicEvent(
        evt,
        (choice) => this.applyEventChoice(evt.title, choice),
        () => {
          this.bridge.paused = false;
        }
      );
    }
    handleWifeDialogue(dialogueId) {
      const dlg = getWifeDialogueById(dialogueId);
      const run = this.bridge.runState;
      if (!dlg || !run) {
        this.bridge.paused = false;
        return;
      }
      this.eventModal.showWifeStressDialogue(
        dlg,
        this.level,
        run,
        (action) => {
          if (action === "insert_stop") {
            const leg = this.level.routeLegs[run.currentLegIndex];
            const edge = getEdgeById(leg.edgeId);
            const nearest = findNearestAvailableCharger(
              this.level,
              run.currentLegIndex,
              run.legProgressKm / edge.distanceKm,
              run.completedStopIds
            );
            if (nearest) {
              run.plan.plannedStops.push({
                chargerId: nearest.station.id,
                legIndex: nearest.legIndex,
                targetSocPct: 75
              });
              run.replanCount += 1;
              run.goodReplanCount += 1;
              return `Zwischenstopp \u201E${nearest.station.name}\u201C eingeplant!`;
            }
            return "Kein weiterer Ladepark vor dem Ziel n\xF6tig.";
          } else {
            const lp = run.plan.legPlans.find((x) => x.legIndex === run.currentLegIndex);
            if (lp) lp.targetSpeedKmh = 115;
            run.currentSpeedKmh = 115;
            run.replanCount += 1;
            run.goodReplanCount += 1;
            return "Zieltempo auf 115 km/h Eco-Modus gesenkt!";
          }
        },
        (choice, routeChanged) => {
          const extraCalm = routeChanged && choice.tone === "calming" ? -6 : 0;
          run.stress = Phaser5.Math.Clamp(run.stress + choice.stressDelta + extraCalm, 0, 100);
          run.peakStress = Math.max(run.peakStress, run.stress);
          run.decisionScoreAccum += choice.decisionPoints + (routeChanged ? 6 : 0);
          run.incidentLog.push({
            timeStr: formatClock(this.level, run.elapsedMinutes),
            title: "Stress-Dialog Partnerin",
            detail: `${choice.text.slice(0, 65)}\u2026 \u2192 Stress jetzt ${Math.round(run.stress)}%`,
            impact: choice.stressDelta < 0 ? "positive" : "negative"
          });
        },
        () => {
          this.bridge.paused = false;
        }
      );
    }
    handleCollision(kind) {
      const run = this.bridge.runState;
      if (!run) {
        this.bridge.paused = false;
        return;
      }
      this.eventModal.showCollisionDialogue(kind, (cost, mins, stressDelta, summary) => {
        run.tollsAndFinesEur += cost;
        run.elapsedMinutes += mins;
        run.stress = Math.min(100, run.stress + stressDelta);
        run.peakStress = Math.max(run.peakStress, run.stress);
        run.decisionScoreAccum -= 6;
        run.incidentLog.push({
          timeStr: formatClock(this.level, run.elapsedMinutes),
          title: "Stadtverkehr-Zwischenfall",
          detail: summary,
          impact: "negative"
        });
        this.bridge.paused = false;
      });
    }
    handleBatteryDepleted() {
      const run = this.bridge.runState;
      if (!run) return;
      run.tollsAndFinesEur += 145;
      run.elapsedMinutes += 45;
      run.socPct = 28;
      run.stress = Math.min(100, run.stress + 28);
      run.peakStress = Math.max(run.peakStress, run.stress);
      run.incidentLog.push({
        timeStr: formatClock(this.level, run.elapsedMinutes),
        title: "Akku 0 % \u2013 Mobiler Pannenservice!",
        detail: "ADAC Notladung bis 28 % (+45 Min, 145 \u20AC Servicegeb\xFChr).",
        impact: "negative"
      });
      this.eventModal.showMapPeek(
        `<p><strong>\u{1FAAB} Batterie leer (0 %)!</strong></p>
       <p>Der mobile Pannenservice hat dich auf <b>28 % SoC</b> nachgeladen (+45 Min Zeitverlust, 145 \u20AC Geb\xFChr). Plane am besten sofort einen Schnelllader ein!</p>`,
        () => {
          this.forceEarlierChargeStop();
          this.bridge.paused = false;
        }
      );
    }
    forceEarlierChargeStop() {
      const run = this.bridge.runState;
      if (!run) return;
      const leg = this.level.routeLegs[run.currentLegIndex];
      const edge = getEdgeById(leg.edgeId);
      const nearest = findNearestAvailableCharger(
        this.level,
        run.currentLegIndex,
        run.legProgressKm / edge.distanceKm,
        run.completedStopIds
      );
      if (nearest) {
        const exists = run.plan.plannedStops.some(
          (s) => s.chargerId === nearest.station.id && s.legIndex === nearest.legIndex
        );
        if (!exists) {
          run.plan.plannedStops.push({
            chargerId: nearest.station.id,
            legIndex: nearest.legIndex,
            targetSocPct: 80
          });
          run.replanCount += 1;
          run.goodReplanCount += 1;
          run.incidentLog.push({
            timeStr: formatClock(this.level, run.elapsedMinutes),
            title: "Umplanung w\xE4hrend Fahrt",
            detail: `Ladestopp \u201E${nearest.station.name}\u201C zus\xE4tzlich eingef\xFCgt.`,
            impact: "positive"
          });
        }
        this.drivingHUD.update(this.level, run, this.bridge.timeScale);
      }
    }
    openLiveMapPeek() {
      const run = this.bridge.runState;
      if (!run) return;
      this.bridge.paused = true;
      const forecast = evaluateTripPlan(this.level, run.plan);
      const upcoming = run.plan.plannedStops.filter((s) => s.legIndex >= run.currentLegIndex && !run.completedStopIds.includes(s.chargerId)).map((s) => CHARGERS.find((c) => c.id === s.chargerId)?.name || s.chargerId);
      const html = `
      <p><b>Aktuelle Etappe:</b> ${run.currentLegIndex + 1} / ${this.level.routeLegs.length} \xB7 <b>Akku:</b> ${Math.round(run.socPct)}%</p>
      <p><b>Geplante verbleibende Ladestopps:</b> ${upcoming.length > 0 ? upcoming.join(", ") : "Keine mehr bis zum Ziel"}</p>
      <p><b>Prognose Restverbrauch:</b> ~${forecast.avgConsumptionKwh100} kWh/100km</p>
    `;
      this.eventModal.showMapPeek(html, () => {
        this.bridge.paused = false;
      });
    }
    finishLevel(cleanArrival) {
      const run = this.bridge.runState;
      if (!run) return;
      this.stopAllGameplayScenes();
      this.drivingHUD.setMode("hidden");
      const result = evaluateRun(this.level, run, cleanArrival);
      this.save.cashEur += result.prizeMoneyEur;
      if (this.save.unlockedLevelOrder <= this.level.order) {
        this.save.unlockedLevelOrder = this.level.order + 1;
      }
      const prev = this.save.completedLevels[this.level.id];
      if (!prev || result.totalScore > prev.bestScore) {
        this.save.completedLevels[this.level.id] = {
          bestScore: result.totalScore,
          bestMinutes: result.totalMinutes
        };
      }
      saveCampaignState(this.save);
      this.resultsUI.show(this.level, run, result, this.save);
    }
    returnToPlanning(levelId) {
      this.level = getLevelById(levelId);
      this.bridge.level = this.level;
      this.bridge.runState = null;
      this.bridge.paused = false;
      const carId = this.save.ownedVehicleId || "mg4_standard";
      this.plan = createDefaultPlan(this.level, carId);
      this.bridge.plan = this.plan;
      this.drivingHUD.setMode("hidden");
      this.stageWrapEl.classList.remove("driving-active");
      this.plannerEl.classList.remove("hidden");
      this.stopAllGameplayScenes();
      this.game.scene.start("EuropeMapScene", { bridge: this.bridge });
      this.renderPlanning();
    }
  };
  window.addEventListener("DOMContentLoaded", () => {
    new ERoadtripController();
  });
})();
