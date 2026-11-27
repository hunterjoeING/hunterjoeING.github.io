// Engineering Tour Stations (8 Stations) & Clickable 3D Hotspot Catalog for UP Big Boy #4014

export const BIG_BOY_PARTS = [
  {
    id: 'articulated_chassis',
    num: 1,
    name: '4-8-8-4 Gelenkfahrwerk',
    shortName: 'Gelenkfahrwerk',
    anchor: [3.2, 1.35, 1.45],
    spec: 'Simple Articulated · R_min = 87,3 m (20°-Kurve)',
    summary:
      'Das hintere 4-achsige Triebwerk ist fest mit Rahmen und Langkessel verschraubt. Das vordere Triebwerk schwenkt um einen massiven Drehzapfen aus – so meistert der 26 m lange Riese enge Bergkurven in den Wasatch Mountains.'
  },
  {
    id: 'boxpok_drivers',
    num: 2,
    name: '68"-Boxpok-Treibräder',
    shortName: 'Boxpok-Räder',
    anchor: [-4.8, 0.92, 1.05],
    spec: '16 Treibräder · Ø 1.727 mm (68") · 90°-Versatz',
    summary:
      'Kompakte Güterzug-Treibräder in gegossener Boxpok-Hohlkastenbauweise („Box-Spoke“) mit schweren Gegengewichten. Sie verbinden 602 kN Anfahrzugkraft am Berg mit 112 km/h (70 mph) Streckentempo.'
  },
  {
    id: 'firebox_stoker',
    num: 3,
    name: 'Feuerbüchse & Kohle-Stoker',
    shortName: 'Feuerbüchse & Stoker',
    anchor: [-8.2, 2.75, 0.65],
    spec: 'Rostfläche 14 m² · Stoker bis 11 t Kohle/h · ~1.400 °C',
    summary:
      'Kein Heizer der Welt könnte 10–11 Tonnen Kohle pro Stunde schaufeln. Eine dampfgetriebene Förderschnecke (Mechanical Stoker) transportiert die Kohle aus dem Tender kontinuierlich auf den gigantischen Rost.'
  },
  {
    id: 'boiler_superheater',
    num: 4,
    name: 'Heißdampfkessel & Elesco-Überhitzer',
    shortName: 'Kessel & Überhitzer',
    anchor: [0.8, 3.65, 0.55],
    spec: '20,7 bar (300 psi) · Sattdampf 216 °C → Heißdampf 395 °C',
    summary:
      'Im konischen Langkessel verdampfen Heizrohre bis zu 48 Tonnen Wasser pro Stunde zu 216 °C Sattdampf. Anschließend trocknen und erhitzen Elesco-Überhitzerschleifen den Dampf auf ~395 °C – das verhindert Kondensationsverluste im Zylinder.'
  },
  {
    id: 'ball_joint_pipes',
    num: 5,
    name: 'Kugel- & Schiebegelenk-Dampfrohre',
    shortName: 'Kugelgelenk-Rohre',
    anchor: [2.8, 1.72, 0.15],
    spec: '395 °C · 20,7 bar Frischdampf ins schwenkbare Vordergestell',
    summary:
      'Weil das vordere Triebwerk in Kurven ausschwenkt, strömt der 395 °C heiße Hochdruck-Frischdampf über massive Stahlrohre mit kugelgelagerten Dreh- und teleskopierenden Schiebegelenken nach vorn.'
  },
  {
    id: 'cylinders_front',
    num: 6,
    name: 'Vordere Frischdampfzylinder',
    shortName: 'Vorderzylinder (Ø 603)',
    anchor: [7.6, 1.15, 1.55],
    spec: 'Ø 603 mm Bohrung × 813 mm Hub · Kolbenschieber Ø 305 mm',
    summary:
      'Alle 4 Zylinder des Big Boy sind identische Hochdruck-Frischdampfzylinder (einfache Dehnung statt Verbund). Ein innen einströmender Kolbenschieber speist abwechselnd Vorder- und Rückseite des doppeltwirkenden Kolbens.'
  },
  {
    id: 'cylinders_rear',
    num: 7,
    name: 'Hintere Frischdampfzylinder',
    shortName: 'Hinterzylinder (Ø 603)',
    anchor: [-1.35, 1.15, 1.55],
    spec: 'Ø 603 mm × 813 mm · Unabhängig vom Vorder-Triebwerk',
    summary:
      'Baugleich zu den vorderen Zylindern, aber mechanisch nicht per Stange mit dem vorderen Triebwerk gekoppelt. Dadurch driften beide Triebwerke leicht gegeneinander und erzeugen den legendären 8-Schlag-Auspuff.'
  },
  {
    id: 'walschaerts_gear',
    num: 8,
    name: 'Walschaerts-/Heusinger-Steuerung',
    shortName: 'Walschaerts-Steuerung',
    anchor: [4.65, 1.38, 1.48],
    spec: 'Außenliegend · Cut-Off −80 % bis +80 % · Max. Hub 190 mm',
    summary:
      'Überlagert die 90°-Bewegung der Gegenkurbel (über Schwinge und verschiebbaren Kulissenstein) mit der Kreuzkopfbewegung am Voreilhebel. Verschiebt man den Kulissenstein, ändert sich der Füllungsgrad – oder die Lok fährt ohne Getriebe rückwärts.'
  },
  {
    id: 'smokebox_blastpipe',
    num: 9,
    name: 'Rauchkammer, Doppel-Blasrohr & Schornstein',
    shortName: 'Doppel-Blasrohr',
    anchor: [7.8, 4.15, 0.55],
    spec: 'Getrennte Abdampfführung · Selbstregelnder Saugzug',
    summary:
      'Vorderes und hinteres Triebwerk blasen ihren Abdampf getrennt durch ein Doppel-Blasrohr in den Doppelschornstein. Jeder Auspuffstoß erzeugt Unterdruck in der Rauchkammer und facht die Glut exakt passend zur Leistungsabgabe an.'
  },
  {
    id: 'cab_controls',
    num: 10,
    name: 'Führerhaus #4014',
    shortName: 'Führerhaus #4014',
    anchor: [-11.9, 3.35, 1.65],
    spec: 'Regler · Umsteuerung · Stoker-Ventile · Manometer',
    summary:
      'Im riesigen Stahl-Führerhaus bedient der Lokführer Regler (Dampfmenge) und Umsteuerung (Cut-Off / Füllung), während der Heizer Kesseldruck (300 psi), Wasserstand und die Dampfmaschine des Kohle-Stokers regelt.'
  }
];

export const BIG_BOY_TOUR_STEPS = [
  {
    id: 'concept',
    num: 1,
    title: 'Das Big-Boy-Konzept (4-8-8-4 Simple Articulated)',
    partId: 'articulated_chassis',
    cameraPos: [14.5, 5.2, 16.5],
    cameraTarget: [0.2, 2.0, 0.0],
    preset: {
      boilerCutaway: false,
      cylinderCutaway: false,
      thermoOverlay: false,
      curveDemo: true,
      timeScale: 0.55,
      throttle: 0.62,
      cutoff: 0.45
    },
    body:
      'Für steile Güterzüge über die Wasatch Mountains brauchte Union Pacific über 6.000 PS Dauerleistung und 600 kN Zugkraft – unmöglich für eine starre Lok. Die Lösung: zwei komplette 4-achsige Triebwerke (je 2 Zylinder, 16 kompakte 68"-Boxpok-Treibräder), verbunden über einen massiven Drehzapfen. In Kurven schwenkt das vordere Fahrwerk unter dem starren Riesenkessel sichtbar aus.'
  },
  {
    id: 'firebox',
    num: 2,
    title: 'Feuerbüchse, Stoker & 20,7-bar-Kessel',
    partId: 'firebox_stoker',
    cameraPos: [-8.2, 3.4, 9.2],
    cameraTarget: [-7.6, 2.6, -0.2],
    preset: {
      boilerCutaway: true,
      cylinderCutaway: false,
      thermoOverlay: true,
      curveDemo: false,
      timeScale: 0.55,
      throttle: 0.78,
      cutoff: 0.55
    },
    body:
      'Bis zu 11 Tonnen Kohle pro Stunde verbrennen auf dem 14 m² großen Rost bei ~1.400 °C – kein Mensch könnte das von Hand schaufeln. Die drehende mechanische Förderschnecke (Stoker) fördert die Kohle aus dem Tender unter die Feuerbrücke. Die Heizgase erhitzen das Kesselwasser rund um die Rohre auf ~216 °C Sattdampf bei 20,7 bar (300 psi).'
  },
  {
    id: 'superheater',
    num: 3,
    title: 'Elesco-Überhitzer (Heißdampf ~395 °C)',
    partId: 'boiler_superheater',
    cameraPos: [2.2, 4.1, 8.8],
    cameraTarget: [1.8, 3.3, -0.2],
    preset: {
      boilerCutaway: true,
      cylinderCutaway: false,
      thermoOverlay: true,
      curveDemo: false,
      timeScale: 0.45,
      throttle: 0.70,
      cutoff: 0.45
    },
    body:
      'Sattdampf aus dem Dampfdom würde an den kühleren Zylinderwänden sofort zu Wasser kondensieren und Energie vernichten. Deshalb strömt er durch rotglühende Elesco-Überhitzerschleifen in den großen Rauchrohren und erreicht ~395 °C. Das Volumen wächst drastisch – mehr Leistung bei deutlich weniger Wasser- und Kohleverbrauch.'
  },
  {
    id: 'four_cylinders',
    num: 4,
    title: '4 Frischdampfzylinder & Kugelgelenk-Rohre',
    partId: 'ball_joint_pipes',
    cameraPos: [3.2, 2.5, 9.8],
    cameraTarget: [3.1, 1.45, 0.2],
    preset: {
      boilerCutaway: true,
      cylinderCutaway: false,
      thermoOverlay: true,
      curveDemo: true,
      timeScale: 0.40,
      throttle: 0.65,
      cutoff: 0.50
    },
    body:
      'Anders als klassische Verbund-Mallets arbeitet der Big Boy mit einfacher Dampfdehnung („Simple Articulated“): Alle 4 Zylinder (Ø 603 × 813 mm) erhalten direkt 395 °C heißen 20,7-bar-Frischdampf. Zum schwenkbaren vorderen Triebwerk führen bewegliche Dampfrohre mit Kugel- und teleskopierenden Schiebegelenken – in der Kurve live im Einsatz.'
  },
  {
    id: 'piston_valve',
    num: 5,
    title: 'Doppeltwirkender Zylinder & Kolbenschieber',
    partId: 'cylinders_front',
    cameraPos: [7.5, 1.85, 5.1],
    cameraTarget: [6.8, 1.05, 1.05],
    preset: {
      boilerCutaway: false,
      cylinderCutaway: true,
      thermoOverlay: true,
      curveDemo: false,
      timeScale: 0.12,
      throttle: 0.75,
      cutoff: 0.65
    },
    body:
      'In Zeitlupe sieht man den doppeltwirkenden 603-mm-Kolben und darüber den innen einströmenden 305-mm-Kolbenschieber. Rot glühender Hochdruckdampf drückt abwechselnd von vorn und hinten auf den Kolben, während auf der Gegenseite der entspannte graue Abdampf über die äußeren Schieberkanten entweicht – jeder Zylinder liefert zwei Arbeitshübe pro Radumdrehung.'
  },
  {
    id: 'walschaerts',
    num: 6,
    title: 'Walschaerts-Steuerung & „Hooking Up“ (Cut-Off)',
    partId: 'walschaerts_gear',
    cameraPos: [5.4, 1.80, 5.8],
    cameraTarget: [4.6, 1.05, 1.15],
    preset: {
      boilerCutaway: false,
      cylinderCutaway: true,
      thermoOverlay: true,
      curveDemo: false,
      timeScale: 0.14,
      throttle: 0.75,
      cutoff: 0.28
    },
    body:
      'Die außenliegende Walschaerts-Steuerung überlagert Gegenkurbel (über Schwinge und Messing-Kulissenstein) und Kreuzkopf-Voreilhebel. Nimmt der Lokführer bei Fahrt die Füllung zurück („Hooking Up“, z. B. 25–30 % statt 75 %), schließt der Schieber früher: Der Dampf dehnt sich im p-V-Diagramm wirtschaftlich aus. Wandert der Kulissenstein unter die Schwingenmitte, fährt der Riese ohne Getriebe rückwärts.'
  },
  {
    id: 'double_blastpipe',
    num: 7,
    title: 'Doppel-Blasrohr & Doppelschornstein',
    partId: 'smokebox_blastpipe',
    cameraPos: [8.6, 4.0, 6.8],
    cameraTarget: [7.7, 3.4, -0.1],
    preset: {
      boilerCutaway: true,
      cylinderCutaway: false,
      thermoOverlay: true,
      curveDemo: false,
      timeScale: 0.55,
      throttle: 0.85,
      cutoff: 0.58
    },
    body:
      'Vorderes und hinteres Triebwerk führen ihren Abdampf getrennt zu zwei nebeneinander liegenden Blasrohren im Doppelschornstein. Die energiereichen Dampfstöße reißen die Rauchgase mit und erzeugen starken Unterdruck in der Rauchkammer: Mehr Dampfbedarf erzeugt automatisch mehr Luftzug durch den Rost – ein rein mechanischer, selbstregelnder Leistungs-Regelkreis.'
  },
  {
    id: 'quartering_beat',
    num: 8,
    title: '90°-Kurbelversatz & Asynchroner 8-Schlag-Auspuff',
    partId: 'boxpok_drivers',
    cameraPos: [2.5, 2.5, 11.8],
    cameraTarget: [1.5, 1.5, 0.2],
    preset: {
      boilerCutaway: false,
      cylinderCutaway: true,
      thermoOverlay: false,
      curveDemo: false,
      timeScale: 0.45,
      throttle: 0.72,
      cutoff: 0.55,
      asyncMode: true
    },
    body:
      'Innerhalb jedes Triebwerks sind linke und rechte Kurbel exakt um 90° versetzt – so kann die Lok in keiner Stellung im Totpunkt steckenbleiben. Zwischen vorderem und hinterem Triebwerk gibt es jedoch keine mechanische Koppelstange: Minimale Drehzahldifferenzen lassen beide Einheiten gegeneinander driften und erzeugen die berühmte synkopierte Big-Boy-Auspuff-Schwebung am Doppelschornstein.'
  }
];
