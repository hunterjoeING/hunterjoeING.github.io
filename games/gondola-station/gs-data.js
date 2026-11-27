// 8-Station Guided Engineering Tour & 10 Clickable 3D Component Hotspots
// 2-Etagen-Gondelstation (Galzigbahn-Riesenrad-Prinzip & D-Line / DirectDrive / AURO)

export const GONDOLA_HOTSPOTS = [
  {
    id: 'eg_walkin',
    num: 1,
    name: 'EG Level Walk-In (0,30 m/s)',
    pos: [4.8, 1.8, 4.9],
    camPos: [14.5, 4.2, 13.5],
    camTarget: [2.2, 1.8, 0.6],
    short: 'Ebenerdiger Einstieg ohne Treppen: automatische Kabinentüren & Glas-Zugangsschranken bei 0,30 m/s Schleichfahrt.'
  },
  {
    id: 'ferris_up',
    num: 2,
    name: 'Aufwärts-Riesenrad (Ø 8,5 m)',
    pos: [-3.0, 6.6, 5.4],
    camPos: [-11.5, 7.6, 15.8],
    camTarget: [-3.0, 6.6, 2.2],
    short: 'Hebt frisch besetzte Kabinen über 7 Höhenmeter sanft vom EG ins OG – dank Parallelführung bleiben alle Kabinen exakt waagerecht.'
  },
  {
    id: 'ferris_down',
    num: 3,
    name: 'Abwärts-Riesenrad (Ø 8,5 m)',
    pos: [-3.0, 6.6, -5.4],
    camPos: [-11.5, 7.6, -15.8],
    camTarget: [-3.0, 6.6, -2.2],
    short: 'Übernimmt die abgebremsten Kabinen im OG auf der Talseite und senkt sie synchron in den barrierefreien Ausstiegsbereich ab.'
  },
  {
    id: 'tire_accel',
    num: 4,
    name: 'Beschleunigungs-Reifenförderer',
    pos: [3.8, 10.6, 3.6],
    camPos: [4.8, 13.4, 12.6],
    camTarget: [4.2, 10.1, 3.2],
    short: '20 Gummireifen mit gestuften Keilriemen beschleunigen die Kabine ruckfrei von 0,30 m/s auf exakt 6,0 m/s Seilgeschwindigkeit (Δv = 0).'
  },
  {
    id: 'attach_ramp',
    num: 5,
    name: 'Einkuppelstelle & Federklemme',
    pos: [11.5, 10.6, 2.8],
    camPos: [11.4, 10.75, 5.65],
    camTarget: [11.5, 10.15, 2.75],
    short: 'Mechanische Kuppelrampe drückt das Tellerfederpaket zusammen (Klemme offen) – beim Verlassen schnappt die Backe mit 28 kN fail-safe ums Seil.'
  },
  {
    id: 'check_zone',
    num: 6,
    name: 'Prüfstrecke & Sicherheitssensor',
    pos: [13.45, 10.9, 2.8],
    camPos: [15.4, 11.4, 6.4],
    camTarget: [13.45, 10.25, 2.8],
    short: 'Überwacht jede eingehängte Klemme auf Seillage und Klemmkraft (24–32 kN). Bei Abweichung löst sofort die Sicherheitsbremse aus!'
  },
  {
    id: 'direct_drive',
    num: 7,
    name: 'DirectDrive & Antriebsscheibe (Ø 5,6 m)',
    pos: [4.4, 9.6, 0.0],
    camPos: [9.8, 12.2, 7.6],
    camTarget: [4.4, 9.2, 0.0],
    short: 'Getriebeloser 900-kW-Synchronmotor (400.000 Nm, 20,5 U/min) direkt auf der Bullwheel-Welle mit direkt wirkenden Sicherheits-Scheibenbremsen.'
  },
  {
    id: 'hydraulic_tension',
    num: 8,
    name: 'Hydraulische Seilspannung (420 kN)',
    pos: [1.1, 8.2, 1.1],
    camPos: [-2.8, 10.4, 6.8],
    camTarget: [1.6, 8.2, 0.0],
    short: 'Zwei Hochdruck-Hydraulikzylinder mit Druckspeichern verschieben den Spannwagen und halten die Seilzugkraft bei Lastwechseln & Nothalt konstant.'
  },
  {
    id: 'tower_1',
    num: 9,
    name: 'Stütze 1 & 12er-Rollenbatterie',
    pos: [36.0, 15.8, 2.8],
    camPos: [28.0, 18.2, 14.5],
    camTarget: [36.0, 15.0, 0.0],
    short: 'Erste Streckenstütze mit gewippten 12er-Rollenbatterien: verteilt die Auflast gleichmäßig und führt Seil samt Klemmen sanft auf die Bergstrecke.'
  },
  {
    id: 'cabin_10',
    num: 10,
    name: '10er-Panoramakabine (C-Gehänge)',
    pos: [14.6, 8.4, 2.8],
    camPos: [21.0, 10.5, 9.5],
    camTarget: [14.5, 8.8, 2.8],
    short: 'Rundum-Panoramaglas, Skiköcher, beleuchtete Nummer, automatische Schiebetüren und schwingungsgedämpftes C-Gehänge.'
  }
];

export const GONDOLA_TOUR_STEPS = [
  {
    num: 1,
    title: 'Das 2-Etagen-Konzept (Level Walk-In)',
    subtitle: 'Barrierefreier Einstieg im EG · Maschinenhalle 7 m höher',
    body: 'Moderne Großstationen nach dem Galzigbahn-Prinzip trennen Fahrgastkomfort und tonnenschwere Seilbahntechnik strikt auf zwei Ebenen: Im Erdgeschoss (0 m) steigen Skifahrer völlig ohne Treppen bei 0,30 m/s Schleichfahrt durch automatische Glas-Zugangsschranken ein – genau 7 Meter darüber arbeiten Antriebsscheibe, Reifenförderer und Kuppelstellen voll einsehbar hinter Glas.',
    camPos: [21.5, 11.2, 21.0],
    camTarget: [3.2, 5.8, 0.0],
    modes: { showShell: true, clampCutaway: false, driveXray: false, showZones: false, timeScale: 1.0 }
  },
  {
    num: 2,
    title: 'Die gigantischen Vertikal-Riesenräder',
    subtitle: 'Ø 8,5 m · 7 Höhenmeter Hub · Exakte Parallelführung',
    body: 'Herzstück der 2-Etagen-Förderung sind zwei offen sichtbare Vertikal-Riesenräder mit über 8,5 m Außendurchmesser. Das hintere Abwärts-Rad übernimmt abgebremste Kabinen im OG und senkt sie ins EG ab; das vordere Aufwärts-Rad greift besetzte Kabinen im EG synchron auf und hebt sie zurück ins OG. Vier parallel geführte Mitnehmer-Gabeln garantieren, dass jede Kabine während der gesamten Kreisbahn exakt waagerecht bleibt.',
    camPos: [-14.2, 8.8, 16.5],
    camTarget: [-3.0, 6.6, 1.5],
    modes: { showShell: false, clampCutaway: false, driveXray: false, showZones: false, timeScale: 1.0 }
  },
  {
    num: 3,
    title: 'Das Geheimnis der Reifenförderer',
    subtitle: '20 gestufte Gummiräder · 0,30 → 6,0 m/s (a ≈ 1,35 m/s²)',
    body: 'Bevor eine Kabine ans 21,6 km/h schnelle Stahlseil gehängt werden kann, muss sie exakt auf Seilgeschwindigkeit beschleunigt werden. 20 Gummireifen mit mechanisch gestuften Keilriemen-Übersetzungen drehen von Rad zu Rad schneller (hier im Farb-Overlay orange markiert). Am Ende der Beschleunigungsstrecke herrscht exakt 0,00 m/s Relativgeschwindigkeit zwischen Klemme und Seil.',
    camPos: [4.2, 13.8, 13.2],
    camTarget: [4.2, 10.1, 3.0],
    modes: { showShell: false, clampCutaway: false, driveXray: false, showZones: true, timeScale: 0.65 }
  },
  {
    num: 4,
    title: 'Das Einhängen (Kuppelbare Federklemme)',
    subtitle: 'Tellerfederpaket (28 kN) · Kuppelrampe · Fail-Safe-Prinzip',
    body: 'Eine moderne D-Line-Klemme wird niemals durch Strom oder Hydraulik geschlossen gehalten – sondern dauerhaft rein mechanisch durch ein vorgespanntes Tellerfederpaket mit ~28 kN Schließkraft (Fail-Safe). Erst wenn die gelbe Betätigungsrolle auf die Kuppelrampe aufläuft, werden die Federn komprimiert (orange) und die Klemmbacke öffnet sich. Sobald das 54-mm-Seil im Maul liegt und die Rolle abläuft, schnappt die Klemme schlagartig zu (grüne 28-kN-Kraftpfeile).',
    camPos: [11.6, 10.65, 5.25],
    camTarget: [11.55, 10.12, 2.75],
    modes: { showShell: false, clampCutaway: true, driveXray: false, showZones: false, timeScale: 0.12 }
  },
  {
    num: 5,
    title: 'Prüfstrecke & Automatische Sicherheit',
    subtitle: 'Seillagen- & Klemmkraftkontrolle (24–32 kN) · Nothalt',
    body: 'Unmittelbar nach dem Einhängen durchläuft jede Kabine die elektronisch-mechanische Prüfstrecke: Sensoren messen in Millisekunden den Federweg (Klemmkraft-Sollkorridor 24–32 kN) und die exakte Lage des Seils im Maul – bestätigt durch den grünen Blitz. Erkennt die Prüfstrecke einen Fehler (teste den Button „Klemmfehler simulieren“!), schließt die Sicherheitsbremse sofort direkt auf der Antriebsscheibe.',
    camPos: [15.8, 11.4, 6.2],
    camTarget: [13.4, 10.2, 2.8],
    modes: { showShell: false, clampCutaway: true, driveXray: false, showZones: false, timeScale: 0.45 }
  },
  {
    num: 6,
    title: 'Antriebsscheibe & DirectDrive',
    subtitle: 'Ø 5,6 m Bullwheel · 900 kW · 400.000 Nm ohne Getriebe',
    body: 'Im X-Ray-Schnitt durch den Maschinenraum wird das D-Line-Herzstück sichtbar: Ein getriebeloser, permanenterregter Synchronmotor sitzt direkt auf der senkrechten Welle der 5,6-m-Antriebsscheibe. Bei nur 20,5 U/min liefert er enorme 400.000 Nm Drehmoment – ohne lautes Großgetriebe, ohne Getriebeöl und mit spürbar höherem Wirkungsgrad. Vier rote Scheibenbremszangen greifen im Ernstfall direkt an der Scheibe an.',
    camPos: [9.4, 11.8, 6.6],
    camTarget: [4.4, 9.1, 0.0],
    modes: { showShell: false, clampCutaway: false, driveXray: true, showZones: false, timeScale: 0.75 }
  },
  {
    num: 7,
    title: 'Hydraulische Seilspannung',
    subtitle: '420 kN konstante Seilzugkraft · Spannwagen & Druckspeicher',
    body: 'Das Förderseil längt sich bei Temperaturschwankungen und voll besetzten Kabinen um mehrere Dezimeter. Deshalb steht die gesamte Antriebsscheibe samt DirectDrive auf einem verfahrbaren Spannwagen. Zwei massive Hydraulikzylinder mit vorgespannten Stickstoff-Druckspeichern halten die Seilspannung dauerhaft bei ~420 kN – bei Lastwechseln oder einer Notbremsung federt der Spannwagen sichtbar mit.',
    camPos: [-2.4, 10.8, 6.8],
    camTarget: [1.8, 8.4, 0.0],
    modes: { showShell: false, clampCutaway: false, driveXray: true, showZones: false, timeScale: 1.0 }
  },
  {
    num: 8,
    title: 'Ausfahrt & 12er-Rollenbatterien (Stütze 1)',
    subtitle: 'Kettenlinie · Gewippte Rollen · Gedämpftes Kabinenpendeln',
    body: 'Mit vollen 6,0 m/s verlässt die 10er-Panoramakabine die Talstation über die Umlenkrollen auf die freie Kettenlinie Richtung erster Streckenstütze. Dort tragen 12 einzeln gelagerte, in einer gelenkigen Wippe aufgehängte Gummi-Tragrollen das Seil. Weil die D-Line-Klemme unterhalb der Seilachse greift und strömungsgünstige Anlaufschrägen besitzt, rollt sie nahezu vibrationsfrei über dutzende Stützenrollen bergwärts.',
    camPos: [25.5, 17.4, 16.5],
    camTarget: [34.5, 14.8, 0.5],
    modes: { showShell: true, clampCutaway: false, driveXray: false, showZones: false, timeScale: 1.0 }
  }
];
