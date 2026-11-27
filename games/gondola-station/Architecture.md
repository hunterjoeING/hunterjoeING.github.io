# Architecture.md – 2-Etagen-Funitel-Gondelstation (Galzigbahn-Prinzip · 4 Riesenräder & Doppelseil 3D)

Interaktive, komplett prozedurale Three.js-0.170.0-3D-Simulation einer hochmodernen **2-Etagen-Funitel-Talstation** nach dem echten Vorbild der **Galzigbahn St. Anton** (Doppelmayr Doppelseil-Funitel mit **4 Vertikal-Riesenrädern**, 24er-Kabinen, 4 Federklemmen pro Kabine, DirectDrive & AURO-Prüfstrecke).

## 1. Modulübersicht (`games/gondola-station/`)

| Datei | Aufgabe |
| :--- | :--- |
| `specs.js` | Single Source of Truth für alle Funitel-Stationsmaße (EG `0,0 m`, OG `+7,0 m`, Breite `14,2 m`, 4 Vertikal-Riesenräder Ø `8,56 m` bei `Z = ±2,62 m / ±5,18 m`, Funitel-Doppelseil-Spur `1,90 m` bei `Z = ±2,95 m / ±4,85 m`, koaxiale Doppel-Antriebsscheibe Ø `5,90 m`, Stütze 1 mit `4×12 = 48` Tragrollen) und Leistungsdaten (`4× 28 kN = 112 kN`, `1.350 kW / 540 kNm`, `640 kN`). |
| `gs-kinematics.js` | Durchgehender $C^1$-stetiger Master-Kinematik-Solver (`GondolaKinematics`): baut den geschlossenen 10-Kabinen-Funitel-Kreislauf (`Z = ±3,90 m`), löst $X_{\text{top}}$ auf exakten Phasen-Gleichlauf mit allen 4 Vertikal-Riesenrädern (`T_cycle = 10 × ΔT_arm`), berechnet 80 Reifenförderer-Stufen (`ω_i = v(s_i)/r`), EG-Türöffnung sowie die 4-Klemmen-Kuppelrampen-Kinematik (`evalGripCouplingState`). |
| `gs-physics.js` | Echtzeit-Antriebs-, Hydraulik- und Sicherheits-Engine (`GondolaPhysics`): Sanftanlauf/-stopp (`0–7,0 m/s`), Funitel-DirectDrive-Leistungsbilanz (`1.350 kW`), Feder-Masse-Dämpfer-Modell des hydraulischen Spannwagens (`640 kN / 175 bar`), gedämpftes Kabinenpendeln sowie interaktive Klemmfehler-Sicherheitsdemo (Doppel-Prüfstrecke + Bullwheel-Scheibenbremse). |
| `gs-textures.js` | Prozeduraler Offscreen-Canvas-PBR-Textur- & Materialgenerator (`createStationMaterials`): UV-scrollendes 54-mm-6×36-Stahlseil, Sichtbeton, gelb-schwarze Sicherheitsstreifen, Gitterroste, Reifenprofil, Kupfer-Statorwicklungen, N/S-Permanentmagnet-Rotor, kobaltblaue `GALZIGBAHN · FUNITEL 24`-Livery, beleuchtete Kabinennummern `01–10`, Clearcoat-Architekturglas und alpiner Schnee. |
| `gs-model-station.js` | 3D-Architektur- & Streckenbuilder (`buildAlpineEnvironment`, `buildStationArchitecture`): Schneevorplatz, Berghang, Alpenpanorama, 2-Etagen-Glas-Stahl-Station (`shellGroup`), EG Level Walk-In mit synchronisierten Glasschranken, OG-Maschinenhalle, breite Funitel-Stütze 1 (`4×12 = 48` Rollen), 4 parallele Förderseile (2 kontinuierliche Schleifen inkl. Ablenkscheiben) und Zonen-Overlay `v(s)`. |
| `gs-model-machinery.js` | 3D-Maschinenbau-Builder (`buildFerrisWheels`, `buildBullwheelDirectDrive`, `buildTireConveyors`, `buildCouplingZones`, `buildAllCabins`): **4 gigantische Vertikal-Riesenräder** (2 koaxiale Zwillingspaare mit 16 parallel geführten Mitnehmer-Gabeln), koaxiale Doppel-Antriebsscheibe Ø `5,90 m` mit DirectDrive-X-Ray, Scheibenbremsen und Hydraulikzylindern, 80 gestufte Reifenförderer, 4 parallele Kuppelrampen + Doppel-Prüfportal sowie 10 kobaltblaue 24er-Funitel-Kabinen mit Doppelgehänge und je 4 aufschneidbaren Federklemmen. |
| `gs-diagnostics.js` | 3-Tab-Live-SVG-Diagnostik (`GondolaDiagnostics`): `v(s)`-Stationsprofil, Klemmkraft-Monitor (`24–32 kN` Toleranzkorridor & `Δv`) und Funitel-DirectDrive-Leistungsbilanz (`1.350 kW / 640 kN`). |
| `gs-audio.js` | Prozedurales Web-Audio-Klangbild (`GondolaAudio`, standardmäßig stumm). |
| `gs-data.js` | Geführte 8-Stationen-Funitel-Technik-Tour (`GONDOLA_TOUR_STEPS`) sowie 10 klickbare 3D-Hotspots (`GONDOLA_HOTSPOTS`). |
| `gs-main.js` | Three.js-0.170.0-Orchestrierung: `RoomEnvironment`-PMREM-HDRI, `ACESFilmicToneMapping`, `PCFSoftShadowMap`, selektiver `UnrealBloomPass`, Blaue Stunde vs. Alpiner Sonnentag, Schnitt-/X-Ray-Steuerung, Gondel-Folgekamera (`#01`), Super-Zeitlupe (`0,02×`) & Einzelschritt, Dark/Light-Theme und Responsive-Drawer. |
| `index.html`, `styles.css` | UI-Shell mit lokalem Three.js-Importmap, CSP und Einbindung von `shared/arcade.js`, `shared/releases.js`, `shared/update-banner.js` und `shared/burger-menu.js`. |
| `tests/gondola-station.test.mjs` | Automatisierte Node.js-Testsuite (8 Tests) inkl. Funitel-4-Riesenrad-Freigang, Doppelseil-Symmetrie und `4× 28 kN = 112 kN` Klemmkraft. |

## 2. Stellschrauben & Koordinatensystem

| Parameter | Wert | Bedeutung |
| :--- | :--- | :--- |
| `floors.egRailY` / `ogRailY` | `3,10 m` / `10,10 m` | Exakte 7,00-m-Etagendifferenz; EG-Kabinenboden barrierefrei bei `+0,16 m`. |
| `wheels.totalWheelCount` / `outerRimRadius` | `4` / `4,28 m` | 4 Vertikal-Riesenräder Ø `8,56 m` (2 Zwillingspaare bei `Z = ±2,62 m` und `±5,18 m`, 16 parallel geführte Mitnehmer-Gabeln). |
| `track.innerRopeZ` / `outerRopeZ` | `±2,95 m` / `±4,85 m` | 4 parallele 54-mm-Funitel-Förderseile (`1,90 m` Doppelseil-Spurweite pro Fahrbahn). |
| `bullwheel.diameter` / `centerY` / `upperCenterY` | `5,90 m` / `10,10 m` / `10,68 m` | Koaxiale Doppel-Antriebsscheibe auf gemeinsamer DirectDrive-Welle (`1.350 kW / 540 kNm / 640 kN`). |
| `cabin.capacityPersons` / `gripsPerCabin` | `24` / `4` | 24er-Galzigbahn-Funitel-Kabinen mit Doppelgehänge und `4× 28 kN = 112 kN` Federklemmen. |
| `track.tower1RollersPerRope` | `12` (`48` gesamt) | 4 gewippte 12er-Rollenbatterien auf breitem Funitel-Querhaupt an Stütze 1 (`X = +36,0 m`). |

## 3. Offene Punkte & Changelog

- **Offen:** Praxis-Performance- und Bedientest auf echtem Mobilgerät sowie ggf. Feinschliff nach erstem Live-Feedback.
- **2026-11-27 (`feat/gondola-station-3d`, `b29e4e8`, v0.1.0):** Erstveröffentlichung als Einseil-2-Etagen-Gondelstation mit 2 Riesenrädern *(später in v0.2.0 auf authentisches Galzigbahn-Funitel mit Doppelseil & 4 Riesenrädern korrigiert)*.
- **2026-11-27 (`feat/gondola-funitel-v0.2`, `4e7d03e`, v0.2.0):** Umbau auf technisch authentisches Galzigbahn-Funitel: 4 parallele Förderseile, koaxiale Doppel-Antriebsscheibe mit Ablenkscheiben, 4 gigantische Vertikal-Riesenräder (2 Zwillingspaare), kobaltblaue 24er-Kabinen mit Doppelgehänge & 4 Federklemmen (`112 kN`), 80 Reifenförderer und 48-Rollen-Stütze 1 (8/8 Tests + 7-stufige WebGL-Sichtprüfung, 0 Fehler).
