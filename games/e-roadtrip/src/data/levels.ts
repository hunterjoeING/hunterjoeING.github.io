import { LevelConfig, ScoringWeights } from '../types';
import { ALPS_TO_GARDA_ROUTES } from './routes/alpsToGarda';
import { TUNNEL_CLOSURE_EVENT_ID } from '../sim/WinterTunnel';

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
    boardId: 'eroadtrip_l1',
    order: 1,
    title: 'Level 1: Aachen ↔ Hannover Messe',
    subtitle: 'Tages-Geschäftstrip hin & zurück · 3 Routen-Alternativen',
    badge: 'Spielbar · Vollversion',
    playable: true,
    regionLabel: 'Aachen ↔ Hannover (3 Korridore)',
    startBudgetEur: 26000,
    rewardBaseEur: 6500,
    departureTimeHour: 7.0,
    targetArrivalMinutes: 797,
    startCityId: 'aachen',
    destinationCityId: 'aachen',
    defaultRouteId: 'l1_route_a_ruhr',
    routeOptions: [
      {
        id: 'l1_route_a_ruhr',
        name: 'Route A · Ruhr-Klassik (A4 → A1 → A2)',
        shortLabel: 'Ruhr-Klassik',
        highwaySummary: 'A4 → A1 Kamener Kreuz → A2',
        description: 'Kürzeste Strecke mit maximaler Schnelllader-Dichte (8 Parks, inkl. 24-Stall EnBW & Tesla V4), aber hohes Staurisiko am Kamener Kreuz.',
        elevationProfile: 'Hügelig',
        trafficRisk: 'Hoch',
        chargingDensity: 'Sehr dicht',
        colorHex: 0x3b82f6,
        legs: [
          { edgeId: 'edge_aachen_koeln', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: false, citySegmentAtStart: 'aachen_start' },
          { edgeId: 'edge_koeln_kamen', defaultTargetSpeedKmh: 125, weatherOverride: 'clear', isNightLeg: false },
          { edgeId: 'edge_kamen_bielefeld', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: false },
          { edgeId: 'edge_bielefeld_hannover', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: false, citySegmentAtEnd: 'hannover_messe' },
          { edgeId: 'edge_bielefeld_hannover', reverse: true, defaultTargetSpeedKmh: 125, weatherOverride: 'rain', isNightLeg: false },
          { edgeId: 'edge_kamen_bielefeld', reverse: true, defaultTargetSpeedKmh: 120, weatherOverride: 'rain', isNightLeg: false },
          { edgeId: 'edge_koeln_kamen', reverse: true, defaultTargetSpeedKmh: 120, weatherOverride: 'clear', isNightLeg: true },
          { edgeId: 'edge_aachen_koeln', reverse: true, defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: true, citySegmentAtEnd: 'aachen_finish' }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_kamen_tesla', legIndex: 2, targetSocPct: 80 },
          { chargerId: 'chg_hannover_enbw', legIndex: 3, targetSocPct: 78 },
          { chargerId: 'chg_bad_oeynhausen_ewego', legIndex: 4, targetSocPct: 80 },
          { chargerId: 'chg_kamen_enbw', legIndex: 6, targetSocPct: 75 }
        ]
      },
      {
        id: 'l1_route_b_nord',
        name: 'Route B · Nord-Flachland (A44 → A43 → A30 → A2)',
        shortLabel: 'Nord-Flachland',
        highwaySummary: 'A44 → Münster → Osnabrück → A2',
        description: 'Topfebenes Flachland für Minimalverbrauch! Umgeht das Kamener Kreuz, bietet günstige Tesla/EWE Go/Electra-Parks.',
        elevationProfile: 'Flachland',
        trafficRisk: 'Mittel',
        chargingDensity: 'Ausgewogen',
        colorHex: 0x10b981,
        legs: [
          { edgeId: 'edge_aachen_duesseldorf', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: false, citySegmentAtStart: 'aachen_start' },
          { edgeId: 'edge_duesseldorf_muenster', defaultTargetSpeedKmh: 125, weatherOverride: 'clear', isNightLeg: false },
          { edgeId: 'edge_muenster_osnabrueck', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: false },
          { edgeId: 'edge_osnabrueck_hannover', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: false, citySegmentAtEnd: 'hannover_messe' },
          { edgeId: 'edge_osnabrueck_hannover', reverse: true, defaultTargetSpeedKmh: 125, weatherOverride: 'rain', isNightLeg: false },
          { edgeId: 'edge_muenster_osnabrueck', reverse: true, defaultTargetSpeedKmh: 120, weatherOverride: 'rain', isNightLeg: false },
          { edgeId: 'edge_duesseldorf_muenster', reverse: true, defaultTargetSpeedKmh: 120, weatherOverride: 'clear', isNightLeg: true },
          { edgeId: 'edge_aachen_duesseldorf', reverse: true, defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: true, citySegmentAtEnd: 'aachen_finish' }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_haltern_ewego', legIndex: 1, targetSocPct: 82 },
          { chargerId: 'chg_osnabrueck_electra', legIndex: 3, targetSocPct: 85 },
          { chargerId: 'chg_osnabrueck_electra', legIndex: 4, targetSocPct: 80 },
          { chargerId: 'chg_haltern_ewego', legIndex: 6, targetSocPct: 80 }
        ]
      },
      {
        id: 'l1_route_c_sauerland',
        name: 'Route C · Sauerland & Kasseler Berge (A4 → A45 → A7)',
        shortLabel: 'Sauerland-Süd',
        highwaySummary: 'A4 → Olpe → Kassel → A7',
        description: 'Freie Fahrt mit geringstem Staurisiko, aber kräftige Steigungen (+2.200 hm). IONITY- & EnBW-lastige Ladeinfrastruktur.',
        elevationProfile: 'Bergig / Pässe',
        trafficRisk: 'Niedrig',
        chargingDensity: 'Ausgewogen',
        colorHex: 0xf59e0b,
        legs: [
          { edgeId: 'edge_aachen_koeln', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: false, citySegmentAtStart: 'aachen_start' },
          { edgeId: 'edge_koeln_olpe', defaultTargetSpeedKmh: 125, weatherOverride: 'clear', isNightLeg: false },
          { edgeId: 'edge_olpe_kassel', defaultTargetSpeedKmh: 125, weatherOverride: 'clear', isNightLeg: false },
          { edgeId: 'edge_kassel_hannover', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: false, citySegmentAtEnd: 'hannover_messe' },
          { edgeId: 'edge_kassel_hannover', reverse: true, defaultTargetSpeedKmh: 120, weatherOverride: 'rain', isNightLeg: false },
          { edgeId: 'edge_olpe_kassel', reverse: true, defaultTargetSpeedKmh: 120, weatherOverride: 'rain', isNightLeg: false },
          { edgeId: 'edge_koeln_olpe', reverse: true, defaultTargetSpeedKmh: 120, weatherOverride: 'clear', isNightLeg: true },
          { edgeId: 'edge_aachen_koeln', reverse: true, defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: true, citySegmentAtEnd: 'aachen_finish' }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_olpe_enbw', legIndex: 1, targetSocPct: 82 },
          { chargerId: 'chg_kassel_ewego', legIndex: 2, targetSocPct: 85 },
          { chargerId: 'chg_goettingen_ionity', legIndex: 4, targetSocPct: 80 },
          { chargerId: 'chg_diemelstadt_ionity', legIndex: 5, targetSocPct: 78 },
          { chargerId: 'chg_olpe_enbw', legIndex: 6, targetSocPct: 65 }
        ]
      }
    ],
    routeLegs: [
      { edgeId: 'edge_aachen_koeln', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: false, citySegmentAtStart: 'aachen_start' },
      { edgeId: 'edge_koeln_kamen', defaultTargetSpeedKmh: 125, weatherOverride: 'clear', isNightLeg: false },
      { edgeId: 'edge_kamen_bielefeld', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: false },
      { edgeId: 'edge_bielefeld_hannover', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: false, citySegmentAtEnd: 'hannover_messe' },
      { edgeId: 'edge_bielefeld_hannover', reverse: true, defaultTargetSpeedKmh: 125, weatherOverride: 'rain', isNightLeg: false },
      { edgeId: 'edge_kamen_bielefeld', reverse: true, defaultTargetSpeedKmh: 120, weatherOverride: 'rain', isNightLeg: false },
      { edgeId: 'edge_koeln_kamen', reverse: true, defaultTargetSpeedKmh: 120, weatherOverride: 'clear', isNightLeg: true },
      { edgeId: 'edge_aachen_koeln', reverse: true, defaultTargetSpeedKmh: 130, weatherOverride: 'clear', isNightLeg: true, citySegmentAtEnd: 'aachen_finish' }
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
    allowedVehicleIds: [
      'mg4_standard',
      'tesla_model_s_2015',
      'vw_id3_pro',
      'tesla_model_3_highland',
      'tesla_model_y_lr',
      'xpeng_g6_lr',
      'kia_ev6_gtline',
      'vw_id7_tourer',
      'porsche_taycan'
    ],
    specialRulesSummary: [
      'Startbudget: 26.000 € – wähle MG4 Standard (LFP) oder den gebrauchten Tesla Model S 85 (2015)',
      '3 wählbare Routen: Ruhr-Klassik (Stau/Top-Lader), Nord-Flachland (Eco) oder Sauerland-Süd (Berge/frei)',
      'Rückfahrt am Abend mit Regenfront & Nachtfahrt-Finale nach Aachen',
      'Immer im Blick: Prognose-SoC am nächsten geplanten Ziel & Endziel'
    ],
    briefingText:
      'Um 07:00 Uhr startest du am Aachener Dom zur Hannover Messe. Wähle eine der drei alternativen Routen und plane Ladestopps, Abos und Reisetempo so, dass Zeit, Kosten, Effizienz und Nerven perfekt balanciert sind!',
    eventPoolIds: ['evt_stau_kamen', 'evt_accident_help', 'evt_rain_front', 'evt_wc_coffee', 'evt_speed_trap', 'evt_charger_defect'],
    wifeDialogueIds: ['dlg_diesel_remark', 'dlg_tight_buffer']
  },

  {
    id: 'level_2_family_summer',
    boardId: 'eroadtrip_l2',
    order: 2,
    title: 'Level 2: Familien-Sommerurlaub',
    subtitle: 'Ehefrau, 2 Kinder & Hund · Aachen → Montpellier',
    badge: 'Spielbar · Vollversion',
    playable: true,
    regionLabel: 'Aachen → Montpellier (3 Korridore)',
    startBudgetEur: 32000,
    rewardBaseEur: 8000,
    departureTimeHour: 23 + 35 / 60,
    targetArrivalMinutes: 1100,
    costBenchmarkEurPerKm: 0.3,
    startCityId: 'aachen',
    destinationCityId: 'montpellier',
    defaultRouteId: 'l2_route_a_lyon',
    routeOptions: [
      {
        id: 'l2_route_a_lyon',
        name: 'Route A · Luxemburg & Lyon (A31 → A6 → A7/A9)',
        shortLabel: 'Lux–Lyon',
        highwaySummary: 'Luxemburg → Dijon → Lyon → Montpellier',
        description: 'Nachts durch Lothringen und das Rhonetal. Morgens Hotelpause in Lyon, danach über A7 und A9 ans Mittelmeer. Maut etwa 75 €.',
        elevationProfile: 'Hügelig',
        trafficRisk: 'Mittel',
        chargingDensity: 'Ausgewogen',
        colorHex: 0x3b82f6,
        legs: [
          { edgeId: 'edge_aachen_luxemburg', defaultTargetSpeedKmh: 120, weatherOverride: 'clear', citySegmentAtStart: 'aachen_start' },
          { edgeId: 'edge_luxemburg_dijon', defaultTargetSpeedKmh: 130, weatherOverride: 'clear' },
          { edgeId: 'edge_dijon_lyon', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', overnightAtEnd: true },
          { edgeId: 'edge_lyon_montpellier', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', citySegmentAtEnd: 'montpellier_finish', destinationAtEnd: true }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_nancy_tesla', legIndex: 1, targetSocPct: 80 },
          { chargerId: 'chg_orange_tesla', legIndex: 3, targetSocPct: 70 }
        ]
      },
      {
        id: 'l2_route_mid_reims',
        name: 'Route Mitte · Reims & Nevers (A4 → A77 → A71)',
        shortLabel: 'Reims–Nevers',
        highwaySummary: 'Reims → Nevers → Clermont-Ferrand → Millau → Montpellier',
        description:
          'Zwischen Luxemburg und Paris. Über Reims und Nevers auf die A71, morgens Hotelpause in Clermont-Ferrand. Danach über die A75 ans Meer. Tempolimit 130, bei Regen 110. Maut etwa 90 €.',
        elevationProfile: 'Hügelig',
        trafficRisk: 'Niedrig',
        chargingDensity: 'Ausgewogen',
        colorHex: 0x14b8a6,
        legs: [
          { edgeId: 'edge_aachen_reims', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', citySegmentAtStart: 'aachen_start' },
          { edgeId: 'edge_reims_nevers', defaultTargetSpeedKmh: 130, weatherOverride: 'clear' },
          { edgeId: 'edge_nevers_clermont', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', overnightAtEnd: true },
          { edgeId: 'edge_clermont_montpellier', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', citySegmentAtEnd: 'montpellier_finish', destinationAtEnd: true }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_troyes_vianeo', legIndex: 1, targetSocPct: 75 },
          { chargerId: 'chg_millau_electra', legIndex: 3, targetSocPct: 70 }
        ]
      },
      {
        id: 'l2_route_b_clermont',
        name: 'Route B · Paris & Clermont-Ferrand (A1 → A71 → A75)',
        shortLabel: 'Paris–Clermont',
        highwaySummary: 'Lüttich → Paris → Clermont → Millau → Montpellier',
        description: 'Nachts über die A1 nach Paris, dann quer durch die Auvergne. Morgens Hotelpause in Clermont-Ferrand, nachmittags über das Millau-Viadukt. Maut etwa 100 €.',
        elevationProfile: 'Bergig / Pässe',
        trafficRisk: 'Mittel',
        chargingDensity: 'Ausgewogen',
        colorHex: 0xf59e0b,
        legs: [
          { edgeId: 'edge_aachen_luettich', defaultTargetSpeedKmh: 120, weatherOverride: 'clear', citySegmentAtStart: 'aachen_start' },
          { edgeId: 'edge_luettich_paris', defaultTargetSpeedKmh: 130, weatherOverride: 'clear' },
          { edgeId: 'edge_paris_clermont', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', overnightAtEnd: true },
          { edgeId: 'edge_clermont_montpellier', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', citySegmentAtEnd: 'montpellier_finish', destinationAtEnd: true }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_orleans_tesla', legIndex: 2, targetSocPct: 80 },
          { chargerId: 'chg_millau_electra', legIndex: 3, targetSocPct: 70 }
        ]
      }
    ],
    routeLegs: [
      { edgeId: 'edge_aachen_luxemburg', defaultTargetSpeedKmh: 120, weatherOverride: 'clear', citySegmentAtStart: 'aachen_start' },
      { edgeId: 'edge_luxemburg_dijon', defaultTargetSpeedKmh: 130, weatherOverride: 'clear' },
      { edgeId: 'edge_dijon_lyon', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', overnightAtEnd: true },
      { edgeId: 'edge_lyon_montpellier', defaultTargetSpeedKmh: 130, weatherOverride: 'clear', citySegmentAtEnd: 'montpellier_finish', destinationAtEnd: true }
    ],
    passengers: {
      label: 'Ehefrau + 2 kleine Kinder + Hund',
      hasWife: true,
      childrenCount: 2,
      hasDog: true,
      initialStress: 22,
      stressSensitivity: 1.55
    },
    scoringWeights: { time: 0.20, cost: 0.20, stress: 0.35, efficiency: 0.15, decisions: 0.10 },
    specialRulesSummary: [
      'Starke Stress-Gewichtung (35 %) durch Kinder, Hund & Ehefrau',
      'Korridore: Luxemburg/Lyon, Mitte über Reims und Nevers (ab Clermont mit der Paris-Route), Paris/Clermont-Ferrand',
      'In Frankreich: Atlante und ENGIE Vianeo statt EnBW und EWE Go',
      'Frankreich: 130 km/h, bei Regen 110. Maut auf den Autoroutes',
      'Blitzer nach dem gefahrenen Tempo gegen das Schild. In Frankreich: Radar automatique',
      '8 Stunden Schlafpause nach der Nachtfahrt: Hotel mit AC-Laden, Budgethotel oder Schlaf im Auto',
      'AC-Dorfladen: 0,29 €/kWh Atomstrom, aber nur 22 kW'
    ],
    briefingText:
      'Mit Frau, zwei Kindern und Hund geht es von Aachen ans Mittelmeer. Ihr fahrt spätabends los und macht morgens eine Schlafpause. Plant die Route so, dass ihr Montpellier zur Abendsonne erreicht.',
    eventPoolIds: ['evt_dirty_toilets', 'evt_hotel_overnight', 'evt_rest_area_robbery', 'evt_charger_defect', 'evt_speed_trap'],
    wifeDialogueIds: ['dlg_diesel_remark', 'dlg_tight_buffer']
  },

  {
    id: 'level_3_alps_winter',
    boardId: 'eroadtrip_l3',
    order: 3,
    title: 'Level 3: Winter-Alpenüberquerung',
    subtitle: 'München → Sirmione (3 Alpenrouten)',
    badge: 'Spielbar · Winterfahrt an den Gardasee',
    playable: true,
    regionLabel: 'München → Sirmione (3 Alpenrouten)',
    startBudgetEur: 38000,
    rewardBaseEur: 9500,
    departureTimeHour: 6.5,
    targetArrivalMinutes: 564,
    costBenchmarkEurPerKm: 0.28,
    startCityId: 'muenchen',
    destinationCityId: 'sirmione',
    defaultRouteId: ALPS_TO_GARDA_ROUTES[0].id,
    routeOptions: ALPS_TO_GARDA_ROUTES,
    routeLegs: ALPS_TO_GARDA_ROUTES[0].legs,
    passengers: {
      label: 'Familienausflug an den Gardasee',
      hasWife: true,
      childrenCount: 1,
      hasDog: false,
      initialStress: 18,
      stressSensitivity: 1.25
    },
    requiresWinterTires: true,
    scoringWeights: { time: 0.25, cost: 0.20, stress: 0.25, efficiency: 0.20, decisions: 0.10 },
    specialRulesSummary: [
      'Vorwärmen kostet Zeit und Akku. Beim Kaltstart steigt zunächst der Verbrauch, und die Familie friert.',
      'Bei Kettenpflicht kannst du vor den Kehren in der Bucht Schneeketten anlegen. Ohne Ketten droht eine Kontrolle.',
      'Glatteis liegt auch in den Kehren. Überhole Lkw nur bei freier Sicht und gestrichelter Mittellinie. Achte auf Warndreiecke.',
      'Bergab bestimmst du die Rekuperation. Ein voller Akku nimmt wenig Energie auf, und die Bremsen können heiß werden.',
      'Am Berglader kannst du bei einer Schlange warten, weiterfahren oder einen langsameren Ladepunkt wählen.',
      'Die Abschnittskontrolle im Inntal-Tunnel misst das Durchschnittstempo. Bei Sperrung kannst du warten oder ausweichen.',
      'Stau, Schneepflüge und Lawinensperren können die Route verzögern. Für die Inntal-Autobahn brauchst du eine Vignette.'
    ],
    briefingText:
      'Um 06:30 Uhr startet ihr bei −8 °C am Marienplatz. Fahrt über den Brenner, über Fernpass und Reschen oder über den Jaufenpass. Oben warten Schnee und Kehren, unten die Wintersonne am Gardasee. Euer Ziel ist die Scaligerburg in Sirmione.',
    eventPoolIds: ['evt_child_cold', 'evt_inntal_ski_jam', 'evt_vignette_check', 'evt_snowplough_convoy', 'evt_avalanche_closure', TUNNEL_CLOSURE_EVENT_ID],
    wifeDialogueIds: ['dlg_diesel_remark']
  },

  {
    id: 'level_4_scotland_highlands',
    order: 4,
    title: 'Level 4: Scotland Highlands',
    subtitle: 'DC-Ladewüste & langsame 22-kW-Dorflader',
    badge: 'Kuratiertes Szenario · Struktur bereit',
    playable: false,
    regionLabel: 'Amsterdam → Highlands (3 Überfahrten)',
    startBudgetEur: 42000,
    rewardBaseEur: 11000,
    departureTimeHour: 7.5,
    targetArrivalMinutes: 860,
    startCityId: 'amsterdam',
    destinationCityId: 'edinburgh',
    defaultRouteId: 'l4_route_a_eurotunnel',
    routeOptions: [
      {
        id: 'l4_route_a_eurotunnel',
        name: 'Route A · Eurotunnel & Ostküste (Calais → London → York)',
        shortLabel: 'Eurotunnel M1',
        highwaySummary: 'Calais → Eurotunnel → London → York',
        description: 'Flacher Korridor mit guten IONITY/Tesla-Hubs, aber hoher Maut (95 €) & London-Stau.',
        elevationProfile: 'Flachland',
        trafficRisk: 'Hoch',
        chargingDensity: 'Sehr dicht',
        colorHex: 0x3b82f6,
        legs: [
          { edgeId: 'edge_amsterdam_calais', defaultTargetSpeedKmh: 100, weatherOverride: 'rain' },
          { edgeId: 'edge_calais_london', defaultTargetSpeedKmh: 105, weatherOverride: 'fog' },
          { edgeId: 'edge_london_york', defaultTargetSpeedKmh: 110, weatherOverride: 'rain' },
          { edgeId: 'edge_york_edinburgh', defaultTargetSpeedKmh: 105, weatherOverride: 'fog' }
        ],
        defaultPlannedStops: [{ chargerId: 'chg_peterborough_ionity', legIndex: 2, targetSocPct: 82 }]
      },
      {
        id: 'l4_route_b_lake',
        name: 'Route B · Fähre Hoek & Lake District (M6 Westküste)',
        shortLabel: 'Hoek + Lake Dist.',
        highwaySummary: 'Hoek → Manchester → Lake District',
        description: 'Hügeliger Lake District (+1.420 hm) und ab der Grenze fast nur noch 22-kW-Dorflader!',
        elevationProfile: 'Bergig / Pässe',
        trafficRisk: 'Mittel',
        chargingDensity: 'Dünn / Anspruchsvoll',
        colorHex: 0xf59e0b,
        legs: [
          { edgeId: 'edge_amsterdam_hoek', defaultTargetSpeedKmh: 100, weatherOverride: 'rain' },
          { edgeId: 'edge_hoek_manchester', defaultTargetSpeedKmh: 105, weatherOverride: 'fog' },
          { edgeId: 'edge_manchester_edinburgh', defaultTargetSpeedKmh: 100, weatherOverride: 'fog' }
        ],
        defaultPlannedStops: [{ chargerId: 'chg_cumbria_ac', legIndex: 2, targetSocPct: 75 }]
      },
      {
        id: 'l4_route_c_newcastle',
        name: 'Route C · DFDS Fähre IJmuiden → Newcastle & Küste',
        shortLabel: 'Fähre Newcastle',
        highwaySummary: 'Nordsee-Fähre → Newcastle → A1 Küste',
        description: 'Kaum Stau und kurze Restfahrt, aber auf dem letzten Abschnitt nur ein kleiner 22-kW-Dorflader.',
        elevationProfile: 'Hügelig',
        trafficRisk: 'Niedrig',
        chargingDensity: 'Dünn / Anspruchsvoll',
        colorHex: 0x10b981,
        legs: [
          { edgeId: 'edge_amsterdam_newcastle', defaultTargetSpeedKmh: 65, weatherOverride: 'fog' },
          { edgeId: 'edge_newcastle_edinburgh', defaultTargetSpeedKmh: 95, weatherOverride: 'fog' }
        ],
        defaultPlannedStops: [{ chargerId: 'chg_alnwick_ac', legIndex: 1, targetSocPct: 70 }]
      }
    ],
    routeLegs: [
      { edgeId: 'edge_amsterdam_calais', defaultTargetSpeedKmh: 100, weatherOverride: 'rain' },
      { edgeId: 'edge_calais_london', defaultTargetSpeedKmh: 105, weatherOverride: 'fog' },
      { edgeId: 'edge_london_york', defaultTargetSpeedKmh: 110, weatherOverride: 'rain' },
      { edgeId: 'edge_york_edinburgh', defaultTargetSpeedKmh: 105, weatherOverride: 'fog' }
    ],
    passengers: {
      label: 'Entdecker-Duo',
      hasWife: true,
      childrenCount: 0,
      hasDog: false,
      initialStress: 20,
      stressSensitivity: 1.2
    },
    scoringWeights: { time: 0.20, cost: 0.20, stress: 0.25, efficiency: 0.25, decisions: 0.10 },
    specialRulesSummary: [
      'Kaum DC-Schnelllader im Norden: oft nur langsame Dorflader (AC 22 kW)',
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
    regionLabel: 'Köln → München (3 Sprint-Korridore)',
    startBudgetEur: 55000,
    rewardBaseEur: 14000,
    departureTimeHour: 4.0,
    targetArrivalMinutes: 270,
    startCityId: 'koeln',
    destinationCityId: 'muenchen',
    defaultRouteId: 'l5_route_a_a3a9',
    routeOptions: [
      {
        id: 'l5_route_a_a3a9',
        name: 'Route A · Klassik-Sprint (A3 Frankfurt → A9 Nürnberg)',
        shortLabel: 'A3 / A9 Klassik',
        highwaySummary: 'A3 Spessart → Würzburg → A9 München',
        description: 'Kürzester Weg (582 km) mit 350-kW-IONITY & Tesla V4, aber hohes Staurisiko rund um Frankfurt/Würzburg.',
        elevationProfile: 'Hügelig',
        trafficRisk: 'Hoch',
        chargingDensity: 'Sehr dicht',
        colorHex: 0x3b82f6,
        legs: [
          { edgeId: 'edge_koeln_frankfurt', defaultTargetSpeedKmh: 180, weatherOverride: 'clear' },
          { edgeId: 'edge_frankfurt_wuerzburg', defaultTargetSpeedKmh: 180, weatherOverride: 'clear' },
          { edgeId: 'edge_wuerzburg_nuernberg', defaultTargetSpeedKmh: 185, weatherOverride: 'clear' },
          { edgeId: 'edge_nuernberg_muenchen', defaultTargetSpeedKmh: 195, weatherOverride: 'clear' }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_limburg_ionity', legIndex: 0, targetSocPct: 62 },
          { chargerId: 'chg_greding_tesla', legIndex: 3, targetSocPct: 58 }
        ]
      },
      {
        id: 'l5_route_b_a8',
        name: 'Route B · Südwest-Sprint (A61 → Stuttgart → A8 Alb)',
        shortLabel: 'A61 / A8 Alb',
        highwaySummary: 'A61 → Stuttgart → A8 Merklingen → München',
        description: '400-kW-Mega-Ladepark Merklingen auf der Alb, jedoch steiler Albaufstieg & A8-Stau bei Stuttgart.',
        elevationProfile: 'Hügelig',
        trafficRisk: 'Mittel',
        chargingDensity: 'Sehr dicht',
        colorHex: 0x10b981,
        legs: [
          { edgeId: 'edge_koeln_stuttgart', defaultTargetSpeedKmh: 175, weatherOverride: 'clear' },
          { edgeId: 'edge_stuttgart_ulm', defaultTargetSpeedKmh: 140, weatherOverride: 'clear' },
          { edgeId: 'edge_ulm_muenchen', defaultTargetSpeedKmh: 195, weatherOverride: 'clear' }
        ],
        defaultPlannedStops: [{ chargerId: 'chg_merklingen_enbw', legIndex: 1, targetSocPct: 65 }]
      },
      {
        id: 'l5_route_c_a45a7',
        name: 'Route C · Sauerland–Rhön Express (A45 → Kassel → A7)',
        shortLabel: 'A45 / A7 Berge',
        highwaySummary: 'A45 Olpe → Kassel → A7 Rhön → Ulm → A8',
        description: 'Freie Bahn für 200+ km/h ohne Ballungsraum-Staus, aber bergiges Höhenprofil (+3.300 hm)!',
        elevationProfile: 'Bergig / Pässe',
        trafficRisk: 'Niedrig',
        chargingDensity: 'Ausgewogen',
        colorHex: 0xf59e0b,
        legs: [
          { edgeId: 'edge_koeln_olpe', defaultTargetSpeedKmh: 185, weatherOverride: 'clear' },
          { edgeId: 'edge_olpe_kassel', defaultTargetSpeedKmh: 185, weatherOverride: 'clear' },
          { edgeId: 'edge_kassel_wuerzburg', defaultTargetSpeedKmh: 185, weatherOverride: 'clear' },
          { edgeId: 'edge_wuerzburg_ulm', defaultTargetSpeedKmh: 190, weatherOverride: 'clear' },
          { edgeId: 'edge_ulm_muenchen', defaultTargetSpeedKmh: 195, weatherOverride: 'clear' }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_diemelstadt_ionity', legIndex: 1, targetSocPct: 65 },
          { chargerId: 'chg_fulda_electra', legIndex: 2, targetSocPct: 72 }
        ]
      }
    ],
    routeLegs: [
      { edgeId: 'edge_koeln_frankfurt', defaultTargetSpeedKmh: 180, weatherOverride: 'clear' },
      { edgeId: 'edge_frankfurt_wuerzburg', defaultTargetSpeedKmh: 180, weatherOverride: 'clear' },
      { edgeId: 'edge_wuerzburg_nuernberg', defaultTargetSpeedKmh: 185, weatherOverride: 'clear' },
      { edgeId: 'edge_nuernberg_muenchen', defaultTargetSpeedKmh: 195, weatherOverride: 'clear' }
    ],
    passengers: {
      label: 'Rallye Co-Pilot (Chronometer)',
      hasWife: false,
      childrenCount: 0,
      hasDog: false,
      initialStress: 0,
      stressSensitivity: 0
    },
    scoringWeights: { time: 0.55, cost: 0.10, stress: 0.00, efficiency: 0.25, decisions: 0.10 },
    specialRulesSummary: [
      'Stress-Gewicht = 0 %: Maximale Geschwindigkeit & kürzeste Ladefenster (10–60 % SoC)!',
      'Porsche Taycan, XPeng G6 (800V) oder Kia EV6 glänzen auf diesen Kurven'
    ],
    briefingText:
      'Vorgegebene Rallye-Strecke auf Bestzeit. Wähle den schnellsten Korridor und reite die 800V-Ladekurve perfekt aus!',
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
    regionLabel: 'Innsbruck → Rom (3 Italien-Routen)',
    startBudgetEur: 48000,
    rewardBaseEur: 13000,
    departureTimeHour: 6.0,
    targetArrivalMinutes: 640,
    startCityId: 'innsbruck',
    destinationCityId: 'rom',
    defaultRouteId: 'l6_route_a_direttissima',
    routeOptions: [
      {
        id: 'l6_route_a_direttissima',
        name: 'Route A · Brenner & A1 Direttissima (Verona → Bologna → Florenz)',
        shortLabel: 'A22 / A1 Direkt',
        highwaySummary: 'Brenner → Verona → Bologna → Florenz → Rom',
        description: 'Gespann-taugliche Durchfahrts-Supercharger (Affi, Valdichiana), aber Apennin-Steigung & Stau bei Bologna.',
        elevationProfile: 'Bergig / Pässe',
        trafficRisk: 'Hoch',
        chargingDensity: 'Sehr dicht',
        colorHex: 0x3b82f6,
        legs: [
          { edgeId: 'edge_innsbruck_bozen', defaultTargetSpeedKmh: 90, weatherOverride: 'clear' },
          { edgeId: 'edge_bozen_verona', defaultTargetSpeedKmh: 95, weatherOverride: 'clear' },
          { edgeId: 'edge_verona_bologna', defaultTargetSpeedKmh: 95, weatherOverride: 'clear' },
          { edgeId: 'edge_bologna_florenz', defaultTargetSpeedKmh: 85, weatherOverride: 'clear' },
          { edgeId: 'edge_florenz_rom', defaultTargetSpeedKmh: 95, weatherOverride: 'clear' }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_affi_tesla', legIndex: 1, targetSocPct: 82 },
          { chargerId: 'chg_valdichiana_ionity', legIndex: 4, targetSocPct: 80 }
        ]
      },
      {
        id: 'l6_route_b_adria',
        name: 'Route B · Po-Ebene & Adria (Venedig → Bologna → E45)',
        shortLabel: 'Venedig / Adria',
        highwaySummary: 'Bozen → Venedig → Po-Ebene → Umbrien',
        description: 'Flachste Gespann-Route durch die Po-Ebene, weniger Stau, aber Abkuppel-Risiko an kleineren Ladesäulen.',
        elevationProfile: 'Flachland',
        trafficRisk: 'Mittel',
        chargingDensity: 'Ausgewogen',
        colorHex: 0x10b981,
        legs: [
          { edgeId: 'edge_innsbruck_bozen', defaultTargetSpeedKmh: 90, weatherOverride: 'clear' },
          { edgeId: 'edge_bozen_venedig', defaultTargetSpeedKmh: 95, weatherOverride: 'clear' },
          { edgeId: 'edge_venedig_bologna', defaultTargetSpeedKmh: 95, weatherOverride: 'clear' },
          { edgeId: 'edge_bologna_rom_adria', defaultTargetSpeedKmh: 90, weatherOverride: 'clear' }
        ],
        defaultPlannedStops: [{ chargerId: 'chg_padova_electra', legIndex: 2, targetSocPct: 85 }]
      },
      {
        id: 'l6_route_c_reschen',
        name: 'Route C · Reschenpass → Mailand → Toskana-Korridor',
        shortLabel: 'Reschen–Mailand',
        highwaySummary: 'Reschenpass → Mailand → Parma → Florenz',
        description: 'Steiler Reschen- & Cisa-Pass mit riesiger Rekuperation, kaum Urlaubsstau, Gespann-taugliche IONITY-Parks.',
        elevationProfile: 'Bergig / Pässe',
        trafficRisk: 'Niedrig',
        chargingDensity: 'Ausgewogen',
        colorHex: 0xf59e0b,
        legs: [
          { edgeId: 'edge_innsbruck_reschen', defaultTargetSpeedKmh: 80, weatherOverride: 'clear' },
          { edgeId: 'edge_reschen_mailand', defaultTargetSpeedKmh: 90, weatherOverride: 'clear' },
          { edgeId: 'edge_mailand_florenz', defaultTargetSpeedKmh: 95, weatherOverride: 'clear' },
          { edgeId: 'edge_florenz_rom', defaultTargetSpeedKmh: 95, weatherOverride: 'clear' }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_piacenza_ionity', legIndex: 2, targetSocPct: 82 },
          { chargerId: 'chg_valdichiana_ionity', legIndex: 3, targetSocPct: 80 }
        ]
      }
    ],
    routeLegs: [
      { edgeId: 'edge_innsbruck_bozen', defaultTargetSpeedKmh: 90, weatherOverride: 'clear' },
      { edgeId: 'edge_bozen_verona', defaultTargetSpeedKmh: 95, weatherOverride: 'clear' },
      { edgeId: 'edge_verona_bologna', defaultTargetSpeedKmh: 95, weatherOverride: 'clear' },
      { edgeId: 'edge_bologna_florenz', defaultTargetSpeedKmh: 85, weatherOverride: 'clear' },
      { edgeId: 'edge_florenz_rom', defaultTargetSpeedKmh: 95, weatherOverride: 'clear' }
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
    scoringWeights: { time: 0.20, cost: 0.25, stress: 0.30, efficiency: 0.15, decisions: 0.10 },
    specialRulesSummary: [
      'Wohnwagen (+55 % Verbrauch, max 95 km/h) – Durchfahrts-Ladeparks sparen Stress!',
      '3 Italien-Korridore: Direttissima vs. flache Adria vs. Reschenpass'
    ],
    briefingText:
      'Mit 1.350 kg am Haken sind Durchfahrts-Ladeparks Gold wert. Achte auf das Anhängerlimit und die Topografie Italiens!',
    eventPoolIds: ['evt_carabinieri_trailer', 'evt_vignette_check', 'evt_family_tablet'],
    wifeDialogueIds: ['dlg_diesel_remark', 'dlg_tight_buffer']
  },

  {
    id: 'level_7_nordkapp_ultimate',
    order: 7,
    title: 'Level 7: Ultimate Nordkapp – Lofoten',
    subtitle: 'Fähre Hirtshals / Schweden-Inland + Arktis-Expedition',
    badge: 'Finales Groß-Szenario · Struktur bereit',
    playable: false,
    regionLabel: 'Hannover → Nordkapp (3 Skandinavien-Routen)',
    startBudgetEur: 60000,
    rewardBaseEur: 25000,
    departureTimeHour: 4.5,
    targetArrivalMinutes: 2150,
    ferryDeadlineMinutes: 420,
    startCityId: 'hannover',
    destinationCityId: 'nordkapp',
    defaultRouteId: 'l7_route_a_norway',
    routeOptions: [
      {
        id: 'l7_route_a_norway',
        name: 'Route A · A7 → Hirtshals Fähre → Norwegen E6 Fjorde',
        shortLabel: 'Hirtshals + E6',
        highwaySummary: 'A7 → Hirtshals → Oslo → Trondheim → Nordkapp',
        description: 'Top-Ladenetz in Norwegen (Tesla/IONITY), aber steile Fjorde (+6.000 hm!) & Hamburger Elbtunnel-Stau.',
        elevationProfile: 'Bergig / Pässe',
        trafficRisk: 'Mittel',
        chargingDensity: 'Sehr dicht',
        colorHex: 0x3b82f6,
        legs: [
          { edgeId: 'edge_hannover_hamburg', defaultTargetSpeedKmh: 125, weatherOverride: 'rain' },
          { edgeId: 'edge_hamburg_kolding', defaultTargetSpeedKmh: 125, weatherOverride: 'rain' },
          { edgeId: 'edge_kolding_hirtshals', defaultTargetSpeedKmh: 120, weatherOverride: 'rain', citySegmentAtEnd: 'ferry_denmark' },
          { edgeId: 'edge_hirtshals_oslo', defaultTargetSpeedKmh: 95, weatherOverride: 'rain' },
          { edgeId: 'edge_oslo_trondheim', defaultTargetSpeedKmh: 80, weatherOverride: 'snow' },
          { edgeId: 'edge_trondheim_narvik', defaultTargetSpeedKmh: 80, weatherOverride: 'snow' },
          { edgeId: 'edge_narvik_nordkapp', defaultTargetSpeedKmh: 80, weatherOverride: 'snow' }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_bispingen_enbw', legIndex: 0, targetSocPct: 82 },
          { chargerId: 'chg_randers_ionity', legIndex: 2, targetSocPct: 80 },
          { chargerId: 'chg_dombas_tesla', legIndex: 4, targetSocPct: 85 },
          { chargerId: 'chg_moirana_ionity', legIndex: 5, targetSocPct: 88 }
        ]
      },
      {
        id: 'l7_route_b_sweden',
        name: 'Route B · Fehmarn → Øresund → Schweden Inland E45',
        shortLabel: 'Schweden E45',
        highwaySummary: 'Lübeck → Kopenhagen → Göteborg → Östersund',
        description: 'Flacheres Inland und stauärmer als der Elbtunnel, aber extrem weite Abstände zwischen Ladern in Lappland!',
        elevationProfile: 'Hügelig',
        trafficRisk: 'Niedrig',
        chargingDensity: 'Dünn / Anspruchsvoll',
        colorHex: 0x10b981,
        legs: [
          { edgeId: 'edge_hannover_luebeck', defaultTargetSpeedKmh: 125, weatherOverride: 'rain' },
          { edgeId: 'edge_luebeck_kopenhagen', defaultTargetSpeedKmh: 110, weatherOverride: 'rain' },
          { edgeId: 'edge_kopenhagen_goeteborg', defaultTargetSpeedKmh: 110, weatherOverride: 'rain' },
          { edgeId: 'edge_goeteborg_oestersund', defaultTargetSpeedKmh: 95, weatherOverride: 'snow' },
          { edgeId: 'edge_oestersund_narvik', defaultTargetSpeedKmh: 90, weatherOverride: 'snow' },
          { edgeId: 'edge_narvik_nordkapp', defaultTargetSpeedKmh: 80, weatherOverride: 'snow' }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_korsor_electra', legIndex: 1, targetSocPct: 85 },
          { chargerId: 'chg_storuman_ac', legIndex: 4, targetSocPct: 85 },
          { chargerId: 'chg_alta_ac', legIndex: 5, targetSocPct: 85 }
        ]
      },
      {
        id: 'l7_route_c_westcoast',
        name: 'Route C · Dänemark Westküste (Esbjerg → Hirtshals → E6)',
        shortLabel: 'DK Westküste',
        highwaySummary: 'Hamburg → Esbjerg → Hirtshals → E6',
        description: 'Umgeht Jütland-Baustellen an der Westküste, längere Landstraße, kaum Schnelllader vor Hirtshals.',
        elevationProfile: 'Bergig / Pässe',
        trafficRisk: 'Niedrig',
        chargingDensity: 'Ausgewogen',
        colorHex: 0xf59e0b,
        legs: [
          { edgeId: 'edge_hannover_hamburg', defaultTargetSpeedKmh: 125, weatherOverride: 'rain' },
          { edgeId: 'edge_hamburg_esbjerg', defaultTargetSpeedKmh: 120, weatherOverride: 'rain' },
          { edgeId: 'edge_esbjerg_hirtshals', defaultTargetSpeedKmh: 90, weatherOverride: 'rain', citySegmentAtEnd: 'ferry_denmark' },
          { edgeId: 'edge_hirtshals_oslo', defaultTargetSpeedKmh: 95, weatherOverride: 'rain' },
          { edgeId: 'edge_oslo_trondheim', defaultTargetSpeedKmh: 80, weatherOverride: 'snow' },
          { edgeId: 'edge_trondheim_narvik', defaultTargetSpeedKmh: 80, weatherOverride: 'snow' },
          { edgeId: 'edge_narvik_nordkapp', defaultTargetSpeedKmh: 80, weatherOverride: 'snow' }
        ],
        defaultPlannedStops: [
          { chargerId: 'chg_bispingen_enbw', legIndex: 0, targetSocPct: 85 },
          { chargerId: 'chg_dombas_tesla', legIndex: 4, targetSocPct: 85 }
        ]
      }
    ],
    routeLegs: [
      { edgeId: 'edge_hannover_hamburg', defaultTargetSpeedKmh: 125, weatherOverride: 'rain' },
      { edgeId: 'edge_hamburg_kolding', defaultTargetSpeedKmh: 125, weatherOverride: 'rain' },
      { edgeId: 'edge_kolding_hirtshals', defaultTargetSpeedKmh: 120, weatherOverride: 'rain', citySegmentAtEnd: 'ferry_denmark' },
      { edgeId: 'edge_hirtshals_oslo', defaultTargetSpeedKmh: 95, weatherOverride: 'rain' },
      { edgeId: 'edge_oslo_trondheim', defaultTargetSpeedKmh: 80, weatherOverride: 'snow' },
      { edgeId: 'edge_trondheim_narvik', defaultTargetSpeedKmh: 80, weatherOverride: 'snow' },
      { edgeId: 'edge_narvik_nordkapp', defaultTargetSpeedKmh: 80, weatherOverride: 'snow' }
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
    scoringWeights: { time: 0.25, cost: 0.20, stress: 0.25, efficiency: 0.20, decisions: 0.10 },
    specialRulesSummary: [
      'Fähr-Einparksequenz in Hirtshals oder Øresund-Route durch Schweden',
      'Extreme Höhenmeter in Norwegen vs. dünne Ladeinfrastruktur in Schweden'
    ],
    briefingText:
      'Die ultimative E-Auto-Prüfung bis ans Nordkapp. Wähle zwischen Norwegen-Fjorden, Schweden-Inland oder dänischer Westküste!',
    eventPoolIds: ['evt_stau_kamen', 'evt_rain_front', 'evt_charger_defect'],
    wifeDialogueIds: ['dlg_tight_buffer', 'dlg_diesel_remark']
  }
];

export function getLevelById(id: string): LevelConfig {
  return LEVELS.find(l => l.id === id) || LEVELS[0];
}
