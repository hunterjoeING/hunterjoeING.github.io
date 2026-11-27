// 8-Station Guided Engineering Tour & 10 Clickable 3D Component Hotspots
// 2-Etagen-Funitel-Gondelstation (Galzigbahn St. Anton · Doppelseil · 4× Riesenräder · DirectDrive)

export const GONDOLA_HOTSPOTS = [
  {
    id: 'eg_walkin',
    num: 1,
    name: 'EG Level Walk-In (0,30 m/s)',
    pos: [4.8, 1.8, 5.2],
    camPos: [15.5, 4.4, 14.5],
    camTarget: [2.2, 1.8, 0.6],
    short: 'Ebenerdiger Einstieg ohne Treppen in die 24er-Funitel-Kabinen: automatische Schiebetüren & Glas-Zugangsschranken bei 0,30 m/s Schleichfahrt.'
  },
  {
    id: 'ferris_up',
    num: 2,
    name: 'Aufwärts-Riesenrad-Paar (2× Ø 8,5 m)',
    pos: [-3.0, 6.6, 5.4],
    camPos: [-12.5, 7.8, 17.5],
    camTarget: [-3.0, 6.6, 2.2],
    short: 'Ein Zwillingspaar aus 2 parallelen Vertikal-Riesenrädern greift jede Funitel-Kabine beidseitig und hebt sie über 7 Höhenmeter absolut kippfrei ins OG.'
  },
  {
    id: 'ferris_down',
    num: 3,
    name: 'Abwärts-Riesenrad-Paar (2× Ø 8,5 m)',
    pos: [-3.0, 6.6, -5.4],
    camPos: [-12.5, 7.8, -17.5],
    camTarget: [-3.0, 6.6, -2.2],
    short: 'Das zweite Zwillingspaar (insgesamt 4 Riesenräder!) senkt die ankommenden 24er-Kabinen auf beiden Gehänge-Seiten gleichzeitig ins EG ab.'
  },
  {
    id: 'tire_accel',
    num: 4,
    name: 'Doppel-Reifenförderer (Beschleuniger)',
    pos: [3.8, 10.6, 4.4],
    camPos: [4.8, 13.8, 14.2],
    camTarget: [4.2, 10.1, 3.8],
    short: 'Doppelseitige Gummireifen-Reihen mit gestuften Keilriemen beschleunigen die Funitel-Kabine ruckfrei von 0,30 m/s auf exakt 6,0 m/s (Δv = 0).'
  },
  {
    id: 'attach_ramp',
    num: 5,
    name: 'Doppel-Einkuppelstelle (4× 28 kN)',
    pos: [11.5, 10.6, 4.85],
    camPos: [11.55, 10.68, 7.45],
    camTarget: [11.55, 10.12, 4.75],
    short: 'Zwei parallele Kuppelrampen öffnen gleichzeitig alle 4 Federklemmen (2 je Förderseil) – beim Verlassen schnappen sie mit 4 × 28 kN = 112 kN fail-safe ums Doppelseil.'
  },
  {
    id: 'check_zone',
    num: 6,
    name: 'Doppel-Prüfstrecke & Sicherheitssensor',
    pos: [13.45, 10.9, 3.9],
    camPos: [16.2, 11.6, 8.6],
    camTarget: [13.45, 10.25, 3.9],
    short: 'Prüft beide Parallelseile und alle 4 Klemmen jeder Kabine auf Seillage & Klemmkraft (24–32 kN je Klemme). Bei Fehler löst sofort die Sicherheitsbremse aus!'
  },
  {
    id: 'direct_drive',
    num: 7,
    name: 'Doppel-Antriebsscheibe & DirectDrive',
    pos: [4.4, 10.0, 0.0],
    camPos: [10.4, 12.6, 8.2],
    camTarget: [4.4, 9.4, 0.0],
    short: 'Zwei koaxiale Ø-5,9-m-Bullwheels treiben das Funitel-Doppelseil direkt über einen getriebelosen 1.350-kW-Synchronmotor (540.000 Nm) an.'
  },
  {
    id: 'hydraulic_tension',
    num: 8,
    name: 'Hydraulische Doppelseil-Spannung (640 kN)',
    pos: [1.1, 8.2, 1.1],
    camPos: [-2.8, 10.4, 7.2],
    camTarget: [1.6, 8.2, 0.0],
    short: 'Zwei Hochdruck-Hydraulikzylinder mit Druckspeichern verschieben den Spannwagen und halten die Zugkraft beider Parallelseile bei ~640 kN konstant.'
  },
  {
    id: 'tower_1',
    num: 9,
    name: 'Funitel-Stütze 1 (4×12 = 48 Rollen)',
    pos: [36.0, 15.8, 3.9],
    camPos: [26.5, 18.6, 17.5],
    camTarget: [36.0, 15.0, 0.0],
    short: 'Extra breites Funitel-Querhaupt mit 4 gewippten 12er-Rollenbatterien (48 Tragrollen) für alle 4 parallelen Stahlseile – sturmsicher bis 100 km/h!'
  },
  {
    id: 'cabin_24',
    num: 10,
    name: '24er-Funitel-Kabine (Doppelgehänge)',
    pos: [14.6, 8.4, 3.9],
    camPos: [21.5, 10.6, 11.2],
    camTarget: [14.5, 8.8, 3.9],
    short: 'Klassische blaue Arlberg-Funitel-Kabine für 24 Personen mit breitem Doppelgehänge und 4 Federklemmen auf zwei parallelen Förderseilen.'
  }
];

export const GONDOLA_TOUR_STEPS = [
  {
    num: 1,
    title: 'Galzigbahn-Prinzip: 2-Etagen-Funitel',
    subtitle: 'Level Walk-In im EG · Doppelseil & 4 Riesenräder im OG',
    body: 'Die weltberühmte Galzigbahn in St. Anton ist keine gewöhnliche Einseilbahn, sondern ein hochwindstabiles Doppelseil-Funitel: Jede 24er-Kabine hängt an zwei weit auseinander liegenden parallelen Förderseilen. Im Erdgeschoss (0 m) steigen Wintersportler barrierefrei bei 0,30 m/s ein, während 7 m höher im gläsernen Maschinenraum die Doppelseil-Technik arbeitet.',
    camPos: [27.5, 13.2, 26.0],
    camTarget: [6.8, 6.2, 0.0],
    modes: { showShell: true, clampCutaway: false, driveXray: false, showZones: false, timeScale: 1.0 }
  },
  {
    num: 2,
    title: 'Die 4 gigantischen Vertikal-Riesenräder',
    subtitle: '2 Zwillingspaare (4× Ø 8,56 m) · 7 m Hub · Beidseitig geführt',
    body: 'Weil eine Funitel-Kabine zwei parallele Gehängearme (links und rechts für beide Förderseile) besitzt, braucht jede Fahrbahn ein Zwillingspaar aus zwei Riesenrädern – insgesamt also 4 riesige Vertikal-Riesenräder! Das Abwärts-Paar senkt ankommende Kabinen auf beiden Seiten gleichzeitig ins EG ab, das Aufwärts-Paar hebt besetzte Kabinen absolut kippfrei und waagerecht wieder ins OG.',
    camPos: [-15.2, 9.2, 18.2],
    camTarget: [-3.0, 6.6, 1.5],
    modes: { showShell: false, clampCutaway: false, driveXray: false, showZones: false, timeScale: 1.0 }
  },
  {
    num: 3,
    title: 'Doppelseitige Reifenförderer',
    subtitle: '80 gestufte Gummiräder · 0,30 → 6,0 m/s (a ≈ 1,35 m/s²)',
    body: 'Auf beiden parallelen Laufschienen der Funitel-Kabine greifen jeweils 20 Gummireifen mit gestuften Keilriemen-Übersetzungen (im Zonen-Overlay orange markiert). Sie beschleunigen die schwere 24er-Kabine ruckfrei auf exakt 6,0 m/s (21,6 km/h), sodass an beiden Förderseilen exakt 0,00 m/s Relativgeschwindigkeit herrscht.',
    camPos: [4.2, 14.2, 14.8],
    camTarget: [4.2, 10.1, 3.9],
    modes: { showShell: false, clampCutaway: false, driveXray: false, showZones: true, timeScale: 0.65 }
  },
  {
    num: 4,
    title: 'Doppelseil-Einkuppeln (4× 28 kN = 112 kN)',
    subtitle: '2×2 Federklemmen pro Kabine · Parallele Kuppelrampen · Fail-Safe',
    body: 'Jede Funitel-Kabine trägt insgesamt 4 kuppelbare Federklemmen: zwei hintereinander auf dem inneren und zwei auf dem äußeren Förderseil! Zwei parallele gelbe Kuppelrampen drücken alle vier Tellerfederpakete (orange) gleichzeitig auf. Sobald beide 54-mm-Seile sauber im Maul liegen, schnappen alle 4 Backen mechanisch fail-safe mit zusammen 112 kN Klemmkraft zu.',
    camPos: [11.55, 10.68, 7.35],
    camTarget: [11.55, 10.12, 4.75],
    modes: { showShell: false, clampCutaway: true, driveXray: false, showZones: false, timeScale: 0.12 }
  },
  {
    num: 5,
    title: 'Doppel-Prüfstrecke & Sicherheitsbremse',
    subtitle: 'Überwachung beider Seile & aller 4 Klemmen (24–32 kN)',
    body: 'Direkt nach dem Einhängen durchläuft die Kabine das breite Doppel-Prüfportal über beiden Förderseilen. Sensoren messen Seillage und Federkraft jeder einzelnen Klemme in Millisekunden (grüner Blitz). Weicht auch nur eine Klemme unter 24 kN ab (teste „Klemmfehler simulieren“!), stoppt die Sicherheitsbremse an der Antriebsscheibe die gesamte Bahn sofort.',
    camPos: [16.4, 11.6, 8.8],
    camTarget: [13.4, 10.2, 3.9],
    modes: { showShell: false, clampCutaway: true, driveXray: false, showZones: false, timeScale: 0.45 }
  },
  {
    num: 6,
    title: 'Doppel-Antriebsscheibe & DirectDrive',
    subtitle: '2× Ø 5,9 m Bullwheels koaxial · 1.350 kW · 540.000 Nm',
    body: 'Im X-Ray-Schnitt zeigt sich der Funitel-Doppelantrieb: Zwei koaxial übereinander sitzende Ø-5,9-m-Antriebsscheiben auf einer gemeinsamen DirectDrive-Welle bewegen das innere und das über rote Ablenkscheiben herangeführte äußere Förderseil absolut synchron – ohne Getriebe, mit Permanentmagnet-Rotor, Kupfer-Stator und vier direkten Scheibenbremsen.',
    camPos: [10.4, 12.6, 8.2],
    camTarget: [4.4, 9.4, 0.0],
    modes: { showShell: false, clampCutaway: false, driveXray: true, showZones: false, timeScale: 0.75 }
  },
  {
    num: 7,
    title: 'Hydraulische Doppelseil-Spannung',
    subtitle: '640 kN Gesamtzugkraft · Spannwagen & Stickstoff-Druckspeicher',
    body: 'Um beide parallel laufenden 54-mm-Stahlseile bei Vollbesetzung (bis zu 24 Personen pro Kabine!), Windlast und Temperaturwechseln straff zu halten, ruht das komplette Doppel-Bullwheel samt DirectDrive auf einem hydraulischen Spannwagen mit ~640 kN Zugkraft und 175-bar-Druckspeichern.',
    camPos: [-2.4, 11.0, 7.6],
    camTarget: [1.8, 8.5, 0.0],
    modes: { showShell: false, clampCutaway: false, driveXray: true, showZones: false, timeScale: 1.0 }
  },
  {
    num: 8,
    title: 'Funitel-Ausfahrt & Stütze 1 (48 Rollen)',
    subtitle: '4 parallele Förderseile · 4×12 Tragrollen · Sturmstabil bis 100 km/h',
    body: 'Auf der Strecke zeigt das Funitel seinen größten Trumpf am stürmischen Arlberg: Durch den breiten Abstand der beiden parallelen Förderseile und das steife Doppelgehänge können die 24er-Kabinen selbst bei 100 km/h Seitenwind kaum pendeln. An Stütze 1 tragen vier gewippte 12er-Rollenbatterien (48 Rollen!) alle vier parallelen Stahlseile bergwärts.',
    camPos: [25.5, 18.0, 19.5],
    camTarget: [35.0, 15.0, 0.5],
    modes: { showShell: true, clampCutaway: false, driveXray: false, showZones: false, timeScale: 1.0 }
  }
];
