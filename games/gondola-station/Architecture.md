# Architecture.md – 2-Etagen-Gondelstation (Riesenrad-Förderung & D-Line 3D)

Interaktive, komplett prozedurale Three.js-0.170.0-3D-Simulation einer hochmodernen 2-Etagen-Gondel-Talstation nach dem Doppelmayr-Riesenrad-Prinzip (Galzigbahn St. Anton) auf dem Stand der D-Line-, DirectDrive- und AURO-Technik.

## 1. Modulübersicht (`games/gondola-station/`)

| Datei | Aufgabe |
| :--- | :--- |
| `specs.js` | Single Source of Truth für alle Stationsmaße (EG `0,0 m`, OG `+7,0 m`, Riesenrad-Radien, Bullwheel Ø `5,6 m`, Stütze 1), Seil-/Klemmen-Kennwerte (`Ø 54 mm`, `28 kN`, `900 kW / 400 kNm`, `420 kN`) und Zonen-Metadaten (`ZONE_META`). |
| `gs-kinematics.js` | Durchgehender $C^1$-stetiger Master-Kinematik-Solver (`GondolaKinematics`): baut den lückenlosen, geschlossenen 10-Kabinen-Kreislauf, löst die Berg-Umlenkdistanz $X_{\text{top}}$ binär auf exakten Phasen-Gleichlauf mit den 4-armigen Vertikal-Riesenrädern (`T_cycle = 10 × ΔT_arm`), berechnet alle 40 Reifenförderer-Stufen (`ω_i = v(s_i)/r`), die Türöffnung im EG sowie die Kuppelrampen-/Federklemmen-Kinematik (`evalGripCouplingState`). |
| `gs-physics.js` | Echtzeit-Antriebs-, Hydraulik- und Sicherheits-Engine (`GondolaPhysics`): Sanftanlauf/-stopp (`0–7,0 m/s`), DirectDrive-Leistungs-/Drehmomentbilanz, Feder-Masse-Dämpfer-Modell des hydraulischen Spannwagens (`420 kN / 165 bar`), gedämpftes Kabinenpendeln bei Ausfahrt/Stütze/Nothalt sowie die interaktive Klemmfehler-Sicherheitsdemo (Prüfstrecke + Bullwheel-Scheibenbremse). |
| `gs-textures.js` | Prozeduraler Offscreen-Canvas-PBR-Textur- & Materialgenerator (`createStationMaterials`): gedrehtes 6×36-Stahlseil (UV-scrollend), Sichtbeton mit Schalungsfugen, gelb-schwarze Sicherheitsstreifen, perforierte Gitterroste, Reifenprofil, Kupfer-Statorwicklungen, N/S-Permanentmagnet-Rotor, beleuchtete Kabinennummern `01–10`, Architekturglas und alpiner Glitzerschnee. |
| `gs-model-station.js` | 3D-Architektur- & Streckenbuilder (`buildAlpineEnvironment`, `buildStationArchitecture`): Schneevorplatz, steiler Berghang, Alpenpanorama, 2-Etagen-Glas-Stahl-Station mit ein-/ausblendbarer Dach-/Fassadenschale (`shellGroup`), EG Level Walk-In inkl. automatischer Glasschranken, OG-Maschinenhalle mit Wartungsstegen, Stütze 1 mit gewippten 12er-Rollenbatterien, Förderseil und Zonen-Overlay `v(s)`. |
| `gs-model-machinery.js` | 3D-Maschinenbau-Builder (`buildFerrisWheels`, `buildBullwheelDirectDrive`, `buildTireConveyors`, `buildCouplingZones`, `buildAllCabins`): zwei Ø-8,56-m-Vertikal-Riesenräder mit parallel geführten Mitnehmer-Gabeln, Ø-5,6-m-Bullwheel auf verfahrbarem Spannwagen mit DirectDrive-X-Ray, Scheibenbremszangen und Hydraulikzylindern, 40 gestufte Keilriemen-Reifenförderer, Kuppelrampen mit Seilfangtrichter & Prüfstrecke sowie 10 Panoramakabinen inkl. aufschneidbarer Federklemme. |
| `gs-diagnostics.js` | 3-Tab-Live-SVG-Diagnostik (`GondolaDiagnostics`): `v(s)`-Stationsprofil mit live wandernden Kabinenpunkten, Kuppel-/Klemmkraft-Monitor (`24–32 kN` Toleranzkorridor & `Δv`) sowie DirectDrive-Leistungsbilanz. |
| `gs-audio.js` | Prozedurales Web-Audio-Klangbild (`GondolaAudio`, standardmäßig stumm): DirectDrive-Synchronbrummen, Reifenförderer-Abrollgeräusch, Klemmen-Klacken auf der Rampe und Warnton bei simuliertem Nothalt. |
| `gs-data.js` | Geführte 8-Stationen-Technik-Tour (`GONDOLA_TOUR_STEPS`) mit Kamera- & Modus-Presets sowie 10 klickbare 3D-Hotspots (`GONDOLA_HOTSPOTS`). |
| `gs-main.js` | Three.js-0.170.0-Orchestrierung: `RoomEnvironment`-PMREM-HDRI, `ACESFilmicToneMapping`, `PCFSoftShadowMap`, selektiver `UnrealBloomPass`, Beleuchtungswechsel (Blaue Stunde vs. Alpiner Sonnentag), Schnitt-/X-Ray-Steuerung, Gondel-Folgekamera (`#01`), Super-Zeitlupe (`0,02×`) & Einzelschritt (`+40 ms`), Dark/Light-Theme und Responsive-Drawer. |
| `index.html`, `styles.css` | UI-Shell mit lokalem Three.js-Importmap, CSP, kollabierbarem Leitstand (Desktop) bzw. Bottom-Sheet (Mobile) sowie Einbindung von `shared/arcade.js`, `shared/releases.js`, `shared/update-banner.js` und `shared/burger-menu.js`. |
| `tests/gondola-station.test.mjs` | Automatisierte Node.js-Testsuite (7 Tests) für Riesenrad-Phasengleichlauf, $C^0/C^1$-Stetigkeit, `Δv = 0` beim Einkuppeln, Reifen-Synchronität, 28-kN-Federklemme, waagerechte Parallelführung und Klemmfehler-Nothalt. |

## 2. Stellschrauben & Koordinatensystem

| Parameter | Wert | Bedeutung |
| :--- | :--- | :--- |
| `floors.egRailY` / `ogRailY` | `3,10 m` / `10,10 m` | Exakte 7,00-m-Etagendifferenz; EG-Kabinenboden liegt barrierefrei bei `+0,16 m`. |
| `wheels.carrierRadius` / `outerRimRadius` | `3,50 m` / `4,28 m` | Vertikal-Riesenräder Ø `8,56 m`, 4 parallel geführte Mitnehmer-Gabeln (`|Z| = 5,18 m`, Kabinenlaufbahn `|Z| = 3,90 m`). |
| `bullwheel.diameter` / `centerX` | `5,60 m` / `+4,40 m` | Horizontale Antriebsscheibe im OG (`Z = 0`), DirectDrive `900 kW` / `400 kNm`, 4 Scheibenbremszangen. |
| `track.rampStartX`..`rampEndX` | `+10,70..+12,30 m` | Ein-/Auskuppelrampe bei `|Z| = 2,80 m`, Prüfstrecke bei `X = +13,45 m`, Stütze 1 bei `X = +36,0 m`. |
| `speeds.nominalRopeMs` / `slowStationMs` | `6,0 m/s` / `0,30 m/s` | Streckentempo (`21,6 km/h`, regelbar `0–7,0 m/s`) vs. Level-Walk-In- & Riesenrad-Schleichfahrt. |
| `cabin.count` / `gripNominalForceKN` | `10` / `28,0 kN` | Geschlossener 10-Kabinen-Kreislauf, Soll-Klemmkraft-Korridor `24–32 kN`, Fehler-Demo `11,4 kN`. |

## 3. Offene Punkte & Changelog

- **Offen:** Praxis-Performance- und Bedientest auf echtem Mobilgerät sowie ggf. Feinschliff nach erstem Live-Feedback.
- **2026-11-27 (`feat/gondola-station-3d`, `b29e4e8`, v0.1.0):** Erstveröffentlichung der prozeduralen 3D-Simulation `games/gondola-station/` inkl. Hub-/Nav-/Worker-/Sitemap-Integration, 7 bestandenen Kinematik-/Physik-Tests sowie 7-stufiger Headless-Chrome-WebGL-Sichtprüfung (0 Fehler).
