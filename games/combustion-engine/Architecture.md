# Verbrennungsmotor 3D – Interaktiver Explainer (`games/combustion-engine/`)

## Überblick

Interaktiver Three.js-3D-Explainer eines 2,0-Liter-4-Takt-Reihenvierzylinder-Ottomotors (DOHC 16V, Zündfolge `1–3–4–2`) für HunterJoe Arcade. Visualisiert den 4-Takt-Otto-Kreisprozess (Ansaugen, Verdichten, Arbeiten, Ausstoßen) mit mechanisch exakter Kurbeltrieb-Kinematik, synchronem 1:2-Ventiltrieb, volumetrischen Brennräumen, Gaspedal, Volllast-Prüfstandsdiagramm, Muschelkurve und geführter Tour. Die Telemetrie verbindet den Motorbetriebspunkt mit einer beispielhaften Sechsgang-Wandlerautomatik.

## Modulübersicht

| Datei | Aufgabe |
| :--- | :--- |
| `index.html` | Einstiegsseite, SEO/JSON-LD, Three.js-Importmap (`0.170.0`), Topbar, 3D-Viewport, Seitenpanel mit Reglern, Voreinstellungen, Telemetrie und Diagrammen, 4-Zylinder-Taktanzeige, Tour-Container |
| `styles.css` | Responsives Studio-Layout (Desktop-Sidebar + mobiler Drawer), Dark-/Light-Mode, 3D-Label-Pins, SVG-Diagramme und Betriebspunkt mit pulsierendem Leuchten bei erlaubter Bewegung |
| `ce-data.js` | Volllastkurve `fullTorqueNm`, Telemetrie `computeEngineTelemetry(rpm, load)`, Verbrauchskennfeld `bsfcMap`, Konturen und Optimum aus `computeBsfcContours`, Antriebsmodell `computeDrivetrain` mit `speedKmh`, `roadLoadPowerKw` und `roadLoadTorqueNm`, 720°-Takt-Helfer `getCylinderStroke`, 12 Baugruppen und 6 Tour-Stationen |
| `ce-model.js` | Prozedurales 3D-Motormodell (Cutaway-Zylinderblock, 4 Kolben mit Ringen, exakte Slider-Crank-Pleuel, 180°-Flat-Plane-Kurbelwelle, DOHC-Kopf & Ventildeckel, 2 Nockenwellen mit 16 Nocken, 16 Ventile + Schraubenfedern, 4 Zündkerzen mit Zündfunken, Ansaug- & Fächerkrümmer, 1:2-Steuerkette, Schwungrad & Ölwanne, volumetrische Brennraumfarben & Gaspartikel) |
| `ce-main.js` | WebGLRenderer, `RoomEnvironment`-Beleuchtung, `OrbitControls`, Kameraflüge, 3D-Label-Projektion, Raycasting, Steuerung von Drehzahl, Last, Zeitlupe und Tour, Ausgabe der Motor- und Antriebstelemetrie sowie SVG-Rendering und Bedienung beider Diagramme |
| `tests/engine-map.test.mjs` | Node-Tests für Telemetrie, Kennfeld, Konturen, HTML-Voreinstellungen und Release-Metadaten |
| `tests/engine-gear.test.mjs` | Node-Tests für Gangwahl, Geschwindigkeit, Fahrwiderstand, Verbrauch, Ganggrenzen, HTML-Kacheln und Release-Text |

## Stellschrauben & Kennwerte (`ce-data.js` / `ce-model.js`)

| Parameter | Wert | Bedeutung |
| :--- | :--- | :--- |
| `CYLINDER_PHASE_OFFSETS` | `[0, 180, 540, 360]` | 720°-Phasenversatz für Zündfolge `1–3–4–2` |
| `R_CRANK` / `L_ROD` | `0.58` / `1.92` | Kurbelradius und Pleuellänge (exakte Slider-Crank-Kinematik) |
| `idleRpm` / `minRunningRpm` / `redlineRpm` / `maxRpm` | `850` / `200` / `6500` / `7000` | Leerlauf, Motor-ein-Schwelle, Begrenzer und oberes Ende des Drehzahlbereichs in U/min |
| Nockenwellen-Übersetzung | `0.5×` | 24-Zahn-Nockenwellenräder auf 12-Zahn-Kurbelwellenritzel |
| `TORQUE_NM_PER_BAR` (K) | `15.915` Nm/bar | Umrechnung von Nutzmoment in effektiven Mitteldruck für 2,0 l Hubraum im Viertakt |
| `fmep` / `pmep` | `0.7 + 0.10·x + 0.010·x²` / `1.7·(1−load)^1.6` | Reibungs- und Ladungswechselverluste in bar, mit `x = rpm/1000` |
| `etaI` | `0.398 − 0.030·((x−2.6)/3.2)²` | Indizierter Wirkungsgrad |
| `knock` | `1 − 0.07·smoothstep(0.82,1,load) − 0.012·smoothstep(4.8,6.4,x)·smoothstep(0.6,1,load)` | Wirkungsgradabschlag für hohe Last und zusätzlich für hohe Drehzahl bei hoher Last |
| `FUEL_HEATING_VALUE` (Hᵤ) | 42,7 MJ/kg | Unterer Heizwert von Benzin für die Umrechnung zwischen η und g/kWh |
| `DRIVETRAIN_EXAMPLE`: `gearRatios` / `finalDrive` / `wheelRadiusM` | `[4.04, 2.37, 1.56, 1.16, 0.85, 0.69]` / 3,2 / 0,32 m | Beispielwerte für sechs Gänge, Achsantrieb und dynamischen Radius (225/45 R17). Wandlerschlupf bleibt unberücksichtigt. |
| `massKg` / `gravityMps2` / `rollingResistance` | 1500 kg / 9,81 m/s² / 0,011 | Beispielwerte für den Rollwiderstand eines Kompaktwagens |
| `dragAreaM2` / `airDensityKgM3` / `drivetrainEfficiency` | 0,65 m² / 1,2 kg/m³ / 0,92 | Beispielwerte für cw·A, Luftdichte und Antriebswirkungsgrad |
| `fuelDensityGL` | 745 g/l | Beispieldichte für Benzin |
| `minCruiseKmh` / `minAccelerationKmh` / `maxSpeedKmh` | 10 / 20 / 240 km/h | Beispielgrenzen für Konstantfahrt, Beschleunigungsgang und Abregelung |
| `minCruiseRatio` / `maxCruiseRatio` / `topGearCruiseRatio` | 0,77 / 1,30 / 1,45 | Toleranz des Leistungsverhältnisses für Konstantfahrt mit zusätzlicher Reserve im 6. Gang |
| Fahrwiderstand `roadLoadTorqueNm(rpm, gear)` | `roadLoadPowerKw(v) · 60000 / (2π · rpm)` | Momentäquivalent der Roll- und Luftwiderstandsleistung im jeweiligen Gang |
| Konturraster und BSFC-Stufen | 100 U/min × 2 Prozentpunkte Last, 235 / 250 / 270 / 300 / 350 / 450 g/kWh | Auflösung und Isolinien der Muschelkurve |

## Ansichtsmodi & Funktionen

1. **Außenansicht (`normal`)** – Vollständig geschlossener Motor inkl. Fächerkrümmer und Ventildeckel.
2. **01 Cutaway (`cutaway`, Standard)** – Öffnet Blockfront, Laufbuchsen, Kopf, Ventildeckel, Ölwanne und blendet den Abgaskrümmer halbtransparent zurück, sodass alle 4 Zylinder, Ventile und Zündfunken frei sichtbar sind.
3. **02 X-Ray (`xray`)** – Halbtransparente Blaupausen-Hülle mit `EdgesGeometry`-Konturen.
4. **03 Exploded (`exploded`)** – Zieht alle 12 Baugruppen bei laufendem Motor auseinander und blendet alle Beschriftungen ein.
5. **04 Motordrehzahl und 04b Gaspedal (Last)** – Drehzahl in 50-U/min-Schritten, Last von 0 bis 100 % in 1-Prozentpunkt-Schritten, optional Zeitlupe (`Pause`, `0,06×`, `0,16×`, `0,38×`). Die Voreinstellungen setzen beide Regler: Leerlauf 850/0 %, Cruise 2400/30 % (Startzustand), Max Nm 4200/100 %, Max kW 6200/100 %. Aktiv markiert wird innerhalb von ±120 U/min und ±3 Prozentpunkten.
6. **05 Leistung & Drehmoment** – Kurven und Markierungen zeigen die Volllastwerte. Ziehen setzt die Drehzahl.
7. **05b Muschelkurve (Wirkungsgradkennfeld)** – Isolinien, Volllastgrenze, Rasteroptimum und aktueller Betriebspunkt. Gestrichelte Fahrwiderstandslinien für den 4., 5. und 6. Gang enden an der Volllastgrenze oder an der Geschwindigkeitsgrenze. Ihre Gangnummer steht am rechten Linienende. Bei Konstantfahrt wird die passende Linie hervorgehoben, sofern sie im Diagramm angezeigt wird. Die linke Achse zeigt Nutzmoment in Nm, die rechte effektiven Mitteldruck in bar. Tippen oder Ziehen setzt Drehzahl und Last anhand des Motormoments an der gewählten Stelle.
8. **06 Schritt-für-Schritt-Tour** – 6 geführte Stationen (4 Takte + Ventiltrieb + Explosionsansicht). Jede setzt Drehzahl und Last. Die Last beträgt standardmäßig 60 %, bei der Station mit 4200 U/min 100 %.

## Telemetrie und Kennfeld

Das Nutzmoment an der Kurbelwelle ist die gewählte Last mal Volllastmoment. Die Reibung ist im Nutzmoment bereits berücksichtigt. Die Leistung folgt aus `M · 2π · n / 60000` in kW. Bei laufendem Motor hängt die Zündfrequenz allein von der Drehzahl ab. Die Statusmeldungen für Leerlauf und Schubbetrieb verwenden die 3-%-Lastgrenze. Bei 0 % Last oder ausgeschaltetem Motor sind Nutzmoment, Leistung und η null. Der spezifische Verbrauch erscheint dann als Strich.

Das vereinfachte Beispielkennfeld für einen modernen 2,0-l-Turbo-Benziner enthält keine Messdaten. Der effektive Wirkungsgrad ergibt sich aus dem indizierten Wirkungsgrad, dem Abschlag `knock` und dem Anteil des effektiven Mitteldrucks an der Summe aus effektivem Mitteldruck, Reibung und Ladungswechselverlusten. Daraus folgt der spezifische Verbrauch (BSFC) in g/kWh über den Heizwert. Die Anzeige rechnet η aus dem BSFC zurück und begrenzt η auf 40 %. Marching Squares interpoliert auf dem Drehzahl-/Lastraster in η und überträgt die Punkte in Drehzahl/Nutzmoment. Offene Isolinien begrenzen ihre Verbrauchsbereiche gemeinsam mit der Kennfeldgrenze.

Die Antriebstelemetrie zeigt Gang, Fahrzustand, Geschwindigkeit in ganzen km/h und Verbrauch in l/h sowie bei Konstantfahrt in l/100km. `speedKmh(rpm, gear)` berechnet die Raddrehzahl aus Gang und Achsantrieb und multipliziert sie mit dem dynamischen Abrollumfang. Bei Geschwindigkeit `v` in m/s ergibt sich der Leistungsbedarf am Motor aus `(m·g·fR·v + 0,5·ρ·cwA·v³) / (ηAntrieb·1000)` in kW. Kennfeld und Gangwahl verwenden denselben Bedarf.

Bei ausgeschaltetem Motor oder weniger als 3 % Last unter 1200 U/min zeigt die Automatik N. Ab 1200 U/min schaltet sie bei so wenig Last den Kraftstoff ab und wählt den höchsten zulässigen Gang. Im Teillastbereich gewinnt unter den zulässigen Gängen im Toleranzband der mit dem kleinsten `|ln(Nutzleistung / Bedarf)|`. Unterschreiten alle Gänge das Band, zeigt der höchste Gang Schub mit Kraftstoffverbrauch. Liegt kein Gang im Band und reicht die Nutzleistung in mindestens einem Gang aus, wählt die Automatik den Beschleunigungsgang. Für den 6. Gang gilt dabei oberhalb des regulären Bands die zusätzliche Toleranz aus der Tabelle. Bei 2800 U/min und 85 % Last ergibt sich ein Verhältnis von 1,434, sodass der 6. Gang bei rund 153 km/h angezeigt wird. Ab 90 % Last greift immer der Kickdown. Beschleunigung nutzt den niedrigsten Gang über der Beschleunigungsschwelle, bei fehlendem Treffer den ersten zum Anfahren. Mit den Beispielübersetzungen liegt diese Rückfallgrenze bei rund 366 U/min. Bei 500 U/min erreicht der 5. Gang bereits die Mindestgeschwindigkeit.

Der Verbrauch in l/h nutzt die gesamte Kraftstoffleistung aus `fuelModel`, einschließlich Reibung und Ladungswechselverlusten im Leerlauf. Der Druck-zu-Leistung-Faktor `K·2π·rpm/60000` verwendet den gerundeten Nm/bar-Faktor des Kennfelds. Er entspricht bis auf etwa 0,003 % der Umrechnung `2,0·rpm/1200` und hält `BSFC·Nutzleistung` exakt zur Verbrauchsrechnung äquivalent. Die Kraftstoffleistung wird über Heizwert und Dichte in l/h umgerechnet. Für Konstantfahrt gilt `l/100km = l/h · 100 / km/h`.

## Tests

`node --test --test-isolation=none 'games/combustion-engine/tests/*.test.mjs'` prüft Statusgrenzen, Lastskalierung, Referenzwerte und η-Rückrechnung auf dem Kennfeldraster. Die Konturtests prüfen Lage, BSFC-Abweichung und die wachsenden Bounding-Boxen der durch die Kennfeldgrenze geschlossenen Verbrauchsbereiche. Die Antriebstests prüfen Geschwindigkeitsformel, Fahrwiderstand, Verbrauchsäquivalenz und die Ganggrenzen auf einem Drehzahl-/Lastraster. Außerdem prüfen die Tests die vier Voreinstellungen, die Startwerte der neuen Kacheln und den öffentlichen Release-Eintrag.

## Changelog

- **2026-11-25** (`main`, `8c0fce8`) – Erstversion `v0.1.0`: Vollständiger 3D-Explainer eines 2,0-Liter-DOHC-16V-Verbrennungsmotors mit Cutaway, X-Ray, Exploded View (12 Labels), Drehzahl-/Zeitlupensteuerung, Prüfstandskurve und 6-Schritte-Tour.
- **2026-11-25** (`main`) – Patch `v0.1.1`: Mobiles Steuerungsmenü mit festem „Zurück zu 3D“-Knopf, Backdrop-Tap-Close und Escape-Taste ergänzt.
- **2026-11-27** (`codex/combustion-load-map`, `cf28b8d`) – Feature `v0.2.0` mit Gaspedal, lastabhängiger Telemetrie, interaktiver Muschelkurve und gekoppelten Voreinstellungen.
- **2026-11-27** (`codex/combustion-load-map`, SHA: (folgt)) – Erweiterung v0.2.0: Gang, Geschwindigkeit und Verbrauch für eine Beispielautomatik sowie gangabhängige Fahrwiderstandslinien in der Muschelkurve.
