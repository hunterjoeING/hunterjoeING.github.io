# Union Pacific Big Boy 4014 – Interaktiver 3D-Technik-Explainer (`games/big-boy/`)

## Überblick

Interaktive Three.js-3D-Simulation und Technik-Visualisierung der **Union Pacific Big Boy (Class 4000 / Betriebsnummer 4014)** – der legendären 4-8-8-4-Gelenkdampflokomotive (`(2'D)D2' h4`, „Simple Articulated“) für HunterJoe Arcade. Komplett prozedural modelliert ohne externe 3D-Modelle oder Bilddateien.

## Modulübersicht

| Datei | Aufgabe |
| :--- | :--- |
| `specs.js` | **Single Source of Truth** für alle Maße (1 Einheit = 1 Meter), Achsstände (4-8-8-4, 68"-Boxpok-Räder Ø 1,727 m), Z-Ebenen-Staffelung (kollisionsfreie Trennung von Rahmen, Rädern, Kuppelstangen, Treibstange & Steuerung), Drehzapfen (`hingeX = -0,70 m`), 4 identische Frischdampfzylinder (Ø 603 × 813 mm), Walschaerts-Abmessungen und Dampf-/Kesseldaten (20,7 bar, 395 °C) |
| `bb-kinematics.js` | Exakter mathematischer Kinematik-Solver (ohne Three.js-Abhängigkeit, direkt per Node testbar): Schubkurbel, 4-achsige Kuppelstangen, 90°-Kurbelversatz (Quartering), vollständige außenliegende Walschaerts-/Heusinger-Steuerung mit Kreis-Kreis-Schnitt für die Schwinge, beweglichem Kulissenstein, Voreilhebel (Inneneinströmung) & Schieberphasen sowie 20°-Kurvenfahrt-Artikulation (`R = 87,3 m`) inkl. Kugel-/Schiebegelenk-Dampfrohren |
| `bb-physics.js` | Echtzeit-Thermodynamik & Leistungsmodell: Zylinder-Indikatordruck `p(θ, Cut-Off)` für Vorder- & Hinterkammer, p-V-Schleife & IMEP, Zugkraft bis 602 kN, indizierte Leistung bis ~6.300 PS, Dampf-/Kohleverbrauch, Saugzug-Regelkreis (Doppel-Blasrohr ↔ Feuerbüchse ↔ Stoker) sowie unabhängige Vorder-/Hinter-Triebwerksphasen (synchron vs. asynchroner 8-Schlag-Auspuff) |
| `bb-textures.js` | Prozeduraler Offscreen-Canvas-PBR-Generator (Albedo, Roughness, Bump, Emissive): UP-Tiefschwarz-Kesselblech, Graphitgrau-Rauchkammer, gebürsteter/geölter Blankstahl, patiniertes Messing/Kupfer, `4014`-Führerhaus- & Numberboard-Beschriftung, dezente Kreideschrift „Big Boy“, Holzschwellen, Schotter, Glutbett sowie weiche Dampf-/Funken-Sprites |
| `bb-model-chassis.js` | Prozedurale 3D-Geometrie für dynamisch biegbares Gleisbett (Instanced-Holzschwellen, Schotter, verformbare Schienen + Rollenprüfstand-Modus), Vor-/Nachlaufgestelle, Boxpok-Treibräder mit Gegengewichten & Weißwand-Kontur, schaltbaren Längs-Zylinderschnitt (603-mm-Kolben, Ringe, 305-mm-Kolbenschieber, Dampfkanäle, druckabhängige Kammerfärbung) sowie komplette I-Profil-Stangen & 4 Walschaerts-Steuerungen |
| `bb-model-boiler.js` | Prozedurale 3D-Geometrie für konischen Langkessel, Graphit-Rauchkammer, Feuerbüchse, schaltbaren Kesselschnitt (Rost, Glut, Feuerbrücke, drehende Stoker-Förderschnecke, bewegter Wasserspiegel, Instanced-Heizrohre, Elesco-Überhitzerschleifen, Dampfdom-Regler, Doppel-Blasrohr & Doppelschornstein), bewegliche Kugel-/Schiebegelenk-Dampfrohre, Zwillings-Luftkompressoren mit Kühllamellen, Spitzenlicht, Numberboards, Führerhaus `#4014`, Tender-Vorderteil, Kuhfänger (am Vordergestell) & Instanced-Nieten |
| `bb-particles.js` | Weiche, rotierende Alpha-Sprite-Partikelsysteme: getrennt getriggerter Doppelschornstein-Auspuff (vorderes & hinteres Triebwerk exakt synchron zum Auslass!), Zylinderhahn- & Sicherheitsventil-Schwaden, Feuerbüchsen-Funken sowie 4-Kreis-Thermodynamik-Overlay-Strömungspartikel |
| `bb-pv-chart.js` | Live-SVG-Renderer für das p-V-Indikatordiagramm (0–22 bar über Kolbenhub) mit farbigen Phasen (Füllung, Expansion, Auslass, Kompression), synchronisiertem Kolben-Marker und einblendbarer Referenz-Geisterkurve (75 % Anfahrfüllung vs. 25 % „Hooking Up“-Marschfüllung) |
| `bb-audio.js` | Prozeduraler Web-Audio-Synthesizer (standardmäßig stumm): zweistimmige, auslass-synchrone Dampfschläge (vorderes/hinteres Triebwerk inkl. 8-Schlag-Schwebung), Saugzug-Kesselrauschen und 5-Klang-Big-Boy-Dampfpfeife |
| `bb-data.js` | 8 geführte Technik-Tour-Stationen (Kameraflüge, automatische Schnitte/Zeitlupe/Kurvenfahrt, deutsche Ingenieur-Fachtexte) sowie 10 klickbare 3D-Baugruppen-Hotspots |
| `bb-main.js` | Three.js-0.170.0-Orchestrierung (`ACESFilmicToneMapping`, `PCFSoftShadowMap`, `RoomEnvironment`-PMREM-HDRI, `EffectComposer` + `UnrealBloomPass` + `OutputPass`, `OrbitControls`), Dark-/Light-Theme-Sync, Raycasting, 3D-Hotspot-Projektion und UI-/Tour-Controller |
| `index.html` / `styles.css` | Responsives Studio-Layout (einklappbare Desktop-Sidebar + mobiler Drawer), Meta-CSP & lokale Three.js-Importmap |
| `tests/big-boy.test.mjs` | Automatisierte Node-Testsuite für Z-Ebenen-Abstände, Stangenlängen-Invarianz über 360° & alle Füllungen, 90°-Versatz, Walschaerts-Steuerzeiten, 87,3-m-Kurven-Artikulation und Thermodynamik/p-V-Plausibilität |

## Stellschrauben & Kennwerte (`specs.js`)

| Parameter | Wert | Bedeutung |
| :--- | :--- | :--- |
| `wheels.driverDiameter` | `1,727 m` (68") | Kompakte Güterzug-Boxpok-Treibräder (16 Stück) |
| `cylinder.bore × stroke` | `0,603 × 0,813 m` | 4 identische Frischdampfzylinder (23¾" × 32") |
| `cylinder.valveBore` | `0,305 m` (12") | Innen einströmender Kolbenschieber (max. ~190 mm Hub) |
| `layout.hingeX` | `-0,70 m` | Drehzapfen zwischen starrem Hinter- und schwenkbarem Vordergestell |
| `track.demoCurveRadius` | `87,3 m` (20°) | Vorbildgerechter Mindestkurvenradius mit sichtbarem Kessel-Überhang |
| `thermo.ratedPressureBar` | `20,7 bar` (300 psi) | Betriebsdruck (Sattdampf ~216 °C, Elesco-Heißdampf ~395 °C) |
| `identity.maxTractiveEffortKN` | `602,2 kN` | Anfahrzugkraft (135.375 lbf) |
| `identity.maxIndicatedPowerPS` | `6.390 PS` (4.700 kW) | Dauerleistung am Berg (bis ~11 t/h Kohle per Stoker) |

## Changelog

- **2026-11-27** (`main`, `913f4a3`) – Erstversion `v0.1.0`: Vollständige interaktive 3D-Simulation & Technik-Visualisierung der Union Pacific Big Boy 4014 (4-8-8-4 Simple Articulated) mit prozeduralen PBR-Texturen, Kessel- & Zylinderschnitt, exakter Walschaerts-Steuerung an beiden Triebwerken, 20°-Kurvenfahrt-Artikulation, Kugelgelenk-Dampfrohren, Live-p-V-Diagramm, Thermodynamik-Overlay, Web-Audio und 8-Stationen-Tour.
