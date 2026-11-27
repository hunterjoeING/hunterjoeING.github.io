// 8-Station Guided Engineering Tour & 10 Clickable 3D Component Hotspots
// for Kässbohrer PistenBully 800 W

export const PISTENBULLY_PARTS = {
  cab_cockpit: {
    id: 'cab_cockpit',
    num: 1,
    name: 'Kabine, Joystick & LED-Armada',
    subtitle: 'Ergonomische Panoramakabine · SNOWsat Cockpit',
    anchor: [1.15, 2.55, 0.0],
    summary: 'In der zentralen Panoramakabine steuert der Fahrer per Multi-Achs-Joystick das 12-Wege-Schild, die AlpinFlexFräse und die 4,7-t-Seilwinde. Hochleistungs-LED-Arbeitsscheinwerfer leuchten Vorfeld und Cord-Rillen bei Nachtpräparierung taghell aus.',
    specs: [
      ['Steuerung', 'Einhand-Joystick + Fahrpedale'],
      ['Beleuchtung', '10× Dach-LED + 2× Rundumleuchte'],
      ['Display', 'SNOWsat GNSS/LiDAR Touchscreen']
    ]
  },
  hydrostatic_drive: {
    id: 'hydrostatic_drive',
    num: 2,
    name: 'MAN D3876 & Hydrostatik (450 bar)',
    subtitle: '540 PS (400 kW) · 2.500 Nm · Geschlossener Kreis',
    anchor: [-0.85, 1.35, 0.45],
    summary: 'Der 15,2-Liter-6-Zylinder-Diesel liefert enorme 2.500 Nm schon bei niedriger Drehzahl. Statt eines Schaltgetriebes treibt er Axialkolben-Verstellpumpen an, die Hydrauliköl mit bis zu 450 bar stufenlos zu den beiden hinteren Hydromotoren drücken.',
    specs: [
      ['Motor', 'MAN D3876 · 6-Zyl. · 15,2 l'],
      ['Leistung / Moment', '540 PS (400 kW) · 2.500 Nm'],
      ['Arbeitsdruck', 'bis 450 bar (Rücklauf ~25 bar)']
    ]
  },
  winch_47t: {
    id: 'winch_47t',
    num: 3,
    name: '4,7-t-Steilhang-Seilwinde (360°)',
    subtitle: '47 kN Zugkraft · Automatische Hangregelung',
    anchor: [0.35, 3.05, 0.0],
    summary: 'Der 360° frei schwenkbare Windenarm hält das gespannte Stahlseil bergauf zu einem Ankerpunkt. Die automatische Zugkraftregelung kompensiert die Hangabtriebskraft FH, sodass die Ketten auch bei 100 % Steigung kaum durchdrehen und die Piste nicht aufreißen.',
    specs: [
      ['Max. Zugkraft', '47 kN (~4,7 Tonnen)'],
      ['Schwenkbereich', '360° endlos frei drehbar'],
      ['Regelung', 'Neigungsabhängige Automatik']
    ]
  },
  blade_12way: {
    id: 'blade_12way',
    num: 4,
    name: '12-Wege-Räumschild (Schieber)',
    subtitle: '5,3 m Gesamtbreite · 8 Hydraulikzylinder',
    anchor: [3.65, 0.88, 0.0],
    summary: 'Über den mehrgelenkigen Frontgeräteträger lässt sich das Räumschild heben, senken, neigen (Tilt), schwenken (Angle), im Schnittwinkel kippen (Pitch) und über hydraulische Klappohren seitlich anwinkeln – ideal zum Buckel-Abtragen und Schneeschieben bergauf.',
    specs: [
      ['Breite', '~5,30 m inkl. Klappohren'],
      ['Freiheitsgrade', '12 Wege (Heben/Tilt/Angle/Pitch/Ohren)'],
      ['Schürfleiste', 'Gehärteter, blank polierter Stahl']
    ]
  },
  alpinflex_tiller: {
    id: 'alpinflex_tiller',
    num: 5,
    name: 'AlpinFlexFräse (AFF)',
    subtitle: 'Hochdrehende Fräswelle · Eis-Mahlwerk',
    anchor: [-3.35, 0.56, 0.0],
    summary: 'Die hydraulisch angetriebene, mit gehärteten Stahlzähnen bestückte Fräswelle dreht mit über 1.000 U/min. Sie zerschlägt grobe Eisbrocken und verfahrene Buckel, mischt Luft unter und wärmt die Kristalloberflächen durch Reibung kurzzeitig leicht an.',
    specs: [
      ['Antrieb', 'Seitliche Axialkolben-Hydromotoren'],
      ['Drehzahl', 'ca. 920 – 1.280 U/min'],
      ['Anpressdruck', 'Hydraulisch stufenlos regelbar']
    ]
  },
  yellow_finisher: {
    id: 'yellow_finisher',
    num: 6,
    name: 'Gelber „Teppich“ (Finisher)',
    subtitle: '6,3 m Arbeitsbreite · Cord-Rillen & Sintern',
    anchor: [-4.25, 0.28, 0.0],
    summary: 'Die ikonischen signalgelben, längsgerippten Polyurethan-Lappen drücken den frisch gefrästen Schnee kontrolliert an und formen rasiermesserscharfe Cord-Rillen. Die vergrößerte Oberfläche beschleunigt Auskühlung und Sintern (Bildung fester Eisbrücken).',
    specs: [
      ['Arbeitsbreite', '~6,30 m (4,3 m geklappt)'],
      ['Material', 'Flexibles, geripptes Polyurethan'],
      ['Effekt', 'Sintern zur griffigen Morgenpiste']
    ]
  },
  tracks_undercarriage: {
    id: 'tracks_undercarriage',
    num: 7,
    name: 'Kombi-/X-Track-Aluketten & Laufwerk',
    subtitle: '4,2 m Spurbreite · Nur ~65 g/cm² Bodendruck',
    anchor: [0.05, 0.48, 2.08],
    summary: '14 Tonnen Gewicht verteilen sich auf 4,2 m breite Aluminium-Stege mit gehärteten Stahl-Spikes und 5 gefederten Vollgummi-Laufrollen pro Seite. Der Bodendruck liegt bei nur ~65 g/cm² – rund viermal geringer als bei einem Menschen in Skischuhen!',
    specs: [
      ['Fahrzeugbreite', '~4,20 m über X-Track-Ketten'],
      ['Bodendruck', '~60 – 70 g/cm² (Skischuh: ~250)'],
      ['Sternrad', 'Hinten, 13 Zähne + Planetengetriebe']
    ]
  },
  snowsat_lidar: {
    id: 'snowsat_lidar',
    num: 8,
    name: 'SNOWsat GNSS/LiDAR Schneehöhenmessung',
    subtitle: 'Zentimetergenaue Pisten-Effizienz',
    anchor: [5.4, 0.35, -1.6],
    summary: 'SNOWsat vergleicht per RTK-GNSS und LiDAR das aktuelle Pistenprofil mit dem im Sommer vermessenen Geländemodell. Der Fahrer sieht live auf dem Display, wo Schnee fehlt (Rot) oder im Überschuss liegt (Blau) – das spart massiv Kunstschnee und Diesel.',
    specs: [
      ['Genauigkeit', '±2 – 3 cm über RTK-GNSS'],
      ['Farbcode', 'Rot flach · Grün optimal · Blau tief'],
      ['Einsparung', 'Weniger Kunstschnee & Treibstoff']
    ]
  }
};

export const PISTENBULLY_TOUR_STEPS = [
  {
    id: 'ground_pressure',
    num: 1,
    partId: 'tracks_undercarriage',
    title: 'Der PistenBully 800 W & das Bodendruck-Wunder',
    badge: '14 Tonnen · ~65 g/cm²',
    body: 'Obwohl der PistenBully 800 W rund 14 Tonnen wiegt, sinkt er im Tiefschnee weniger tief ein als ein Skifahrer zu Fuß. Der Trick sind die 4,2 Meter breiten X-Track-Aluketten: Sie verteilen die Masse so großflächig, dass der Bodendruck auf nur etwa 60–70 g/cm² fällt (Skischuh: ~250 g/cm², PKW-Reifen: ~2.500 g/cm²).',
    cameraPos: [9.2, 3.6, 8.8],
    cameraTarget: [0.0, 1.15, 0.0],
    setup: {
      slopeDeg: 18,
      speedKmh: 9.5,
      winchMode: 'auto',
      hydraulicsXray: false,
      sinterCutaway: false,
      showForces: false,
      snowsatHeatmap: false,
      diagTab: 'pressure',
      timeScale: 0.8
    }
  },
  {
    id: 'hydrostatic_drive',
    num: 2,
    partId: 'hydrostatic_drive',
    title: 'Hydrostatischer Antrieb: 450 bar statt Schaltgetriebe',
    badge: 'MAN D3876 · 540 PS · 2.500 Nm',
    body: 'Unter der aufgeschnittenen Haube arbeitet der 15,2-Liter-MAN-Reihensechszylinder (400 kW / 2.500 Nm). Er treibt Axialkolben-Verstellpumpen an, die Öl mit bis zu 450 bar (rot) zu den hinteren Hydromotoren & Planetengetrieben fördern (blauer Rücklauf ~25 bar). Das ermöglicht stufenloses Drehmoment, Gegenlauf-Lenkung und volle Arbeitsleistung unabhängig vom Tempo.',
    cameraPos: [-2.8, 3.3, 6.2],
    cameraTarget: [-0.85, 1.05, 0.0],
    setup: {
      slopeDeg: 24,
      speedKmh: 10.5,
      winchMode: 'auto',
      hydraulicsXray: true,
      sinterCutaway: false,
      showForces: false,
      snowsatHeatmap: false,
      diagTab: 'hydraulics',
      timeScale: 0.7
    }
  },
  {
    id: 'steep_winch',
    num: 3,
    partId: 'winch_47t',
    title: 'Steilhang-Physik & 4,7-t-Seilwinde am Limit',
    badge: '38° / 78 % Steigung · 47 kN',
    body: 'Am 38°-Steilhang zieht die Hangabtriebskraft FH (rot) mit über 84 kN talwärts – deutlich über der Schneescher-Haftgrenze der Ketten! Die 360°-Seilwinde entlastet das Laufwerk mit bis zu 47 kN (4,7 t, goldener Pfeil). Schalte die Winde rechts testweise auf „Aus“ und beobachte sofort, wie der Kettenschlupf explodiert und den Schnee aufreißt.',
    cameraPos: [4.2, 4.4, 11.4],
    cameraTarget: [0.2, 1.5, 0.0],
    setup: {
      slopeDeg: 38,
      speedKmh: 9.0,
      winchMode: 'auto',
      hydraulicsXray: false,
      sinterCutaway: false,
      showForces: true,
      snowsatHeatmap: false,
      diagTab: 'slope',
      timeScale: 0.85
    }
  },
  {
    id: 'blade_12way',
    num: 4,
    partId: 'blade_12way',
    title: 'Das 12-Wege-Räumschild (Schieber)',
    badge: '5,3 m Breite · 8 Hydraulikzylinder',
    body: 'Vor dem Kettenlaufwerk bricht das 5,3 m breite 12-Wege-Räumschild vereiste Skibuckel auf und verschiebt Tonnen von Schnee bergauf. Acht exakt angelenkte Hydraulikzylinder steuern Höhe, Neigung (Tilt), Schwenkwinkel (Angle), Schnittwinkel (Pitch) und die seitlichen Klappohren – so lässt sich Schnee wahlweise breit planieren oder wie in einer Schaufel bergauf tragen.',
    cameraPos: [7.8, 2.3, 4.8],
    cameraTarget: [3.2, 0.75, 0.0],
    setup: {
      slopeDeg: 22,
      speedKmh: 11.0,
      winchMode: 'auto',
      bladePreset: 'push',
      hydraulicsXray: false,
      sinterCutaway: false,
      showForces: false,
      snowsatHeatmap: false,
      diagTab: 'hydraulics',
      timeScale: 0.75
    }
  },
  {
    id: 'alpinflex_tiller',
    num: 5,
    partId: 'alpinflex_tiller',
    title: 'Die AlpinFlexFräse: Das Hochleistungs-Schneemahlwerk',
    badge: '1.150 U/min · Schneemikroskop',
    body: 'Im geöffneten Längsschnitt sieht man die schnell rotierende, verzahnte Fräswelle der AlpinFlexFräse. Mit über 1.100 U/min zerschlägt sie grobe Eisbrocken und Kettenabdrücke in ein gleichmäßiges, luftdurchmischtes Kristallbett. Die mechanische Reibung erwärmt die Schneekristalle kurzzeitig um Bruchteile eines Grads – die Startzündung fürs anschließende Verfestigen.',
    cameraPos: [-3.9, 1.45, 4.4],
    cameraTarget: [-3.55, 0.35, 0.75],
    setup: {
      slopeDeg: 20,
      speedKmh: 8.5,
      tillerActive: true,
      tillerDownpressure: 0.75,
      hydraulicsXray: false,
      sinterCutaway: true,
      showForces: false,
      snowsatHeatmap: false,
      diagTab: 'hydraulics',
      timeScale: 0.25
    }
  },
  {
    id: 'yellow_finisher',
    num: 6,
    partId: 'yellow_finisher',
    title: 'Der gelbe „Teppich“ (Finisher) & das Sintern',
    badge: '6,3 m Corduroy · Eisbrücken',
    body: 'Die berühmten Cord-Rillen des leuchtend gelben Polyurethan-Finishers sind reine Physik, keine Deko: Der elastische „Teppich“ verdichtet den gelockerten Schnee präzise und vergrößert durch die parallelen Rillen die Oberfläche. Dadurch entweicht die Fräswärme schneller in die kalte Nachtluft – die Kristalle bilden mikroskopische Eisbrücken (Sintern) und härten bis zum Morgen zur perfekten Weltcup-Piste aus!',
    cameraPos: [-7.8, 2.25, 4.4],
    cameraTarget: [-4.4, 0.22, 0.25],
    setup: {
      slopeDeg: 18,
      speedKmh: 10.0,
      tillerActive: true,
      tillerWingsFolded: false,
      hydraulicsXray: false,
      sinterCutaway: true,
      showForces: false,
      snowsatHeatmap: false,
      diagTab: 'hydraulics',
      timeScale: 0.45
    }
  },
  {
    id: 'tracks_sprocket',
    num: 7,
    partId: 'tracks_undercarriage',
    title: 'Kettenlaufwerk & Sternrad-Kinematik',
    badge: '13-Zahn-Sternrad · Zeitlupe',
    body: 'In Zeitlupe zeigt sich die Präzision des X-Track-Laufwerks: Jeder der 60 gebürsteten Aluminium-Stege mit gehärteten Stahl-Spikes greift passgenau in die Zahnlücken des geschmiedeten hinteren Sternrads. Fünf gefederte Vollgummi-Laufrollen übertragen die Radlast gleichmäßig auf die vier Gummibänder – perfekt für griffigen Vortrieb auf steilem Eis.',
    cameraPos: [-2.6, 1.35, 5.2],
    cameraTarget: [-1.45, 0.45, 1.28],
    setup: {
      slopeDeg: 26,
      speedKmh: 10.5,
      winchMode: 'auto',
      hydraulicsXray: false,
      sinterCutaway: false,
      showForces: false,
      snowsatHeatmap: false,
      diagTab: 'pressure',
      timeScale: 0.15
    }
  },
  {
    id: 'snowsat_efficiency',
    num: 8,
    partId: 'snowsat_lidar',
    title: 'SNOWsat & Moderne Pisten-Effizienz',
    badge: 'GNSS/LiDAR Heatmap · Nachhaltigkeit',
    body: 'Mit aktivierter SNOWsat-Heatmap sieht der Fahrer vor dem 12-Wege-Schild auf den Zentimeter genau die verbleibende Schneehöhe: Blau signalisiert Überschuss, Grün ist optimal, Rot warnt vor flachen Stellen. So wird gezielt Schnee aus Depots verschoben statt unnötig teuer zu beschneien – das spart Energie, Wasser und bis zu 20 % Kraftstoff.',
    cameraPos: [9.8, 5.4, 7.6],
    cameraTarget: [3.2, 0.6, 0.0],
    setup: {
      slopeDeg: 24,
      speedKmh: 11.5,
      winchMode: 'auto',
      hydraulicsXray: false,
      sinterCutaway: false,
      showForces: false,
      snowsatHeatmap: true,
      diagTab: 'slope',
      timeScale: 0.85
    }
  }
];
