# Kässbohrer PistenBully 800 W – Interaktiver 3D-Steilhang-Explainer (`games/pistenbully-800w/`)

## Überblick

Interaktive Three.js-3D-Simulation und Technik-Visualisierung des **Kässbohrer PistenBully 800 W** am Steilhang (0° bis 45° / 100 % Steigung) für HunterJoe Arcade. Vollständig prozedural modelliert ohne externe 3D-Modelle (GLB) oder Bilddateien – inklusive echter Offscreen-Canvas-PBR-Texturen, dynamischem Schnee-/Corduroy-/SNOWsat-Shader, exakter Ketten- & Hydraulikzylinder-Kinematik, Schnitt-/Röntgenmodi, Live-Diagnostik und geführter 8-Stationen-Tour.

## Modulübersicht

| Datei | Aufgabe |
| :--- | :--- |
| `specs.js` | **Single Source of Truth** für alle Maße (1 Einheit = 1 Meter), Fahrzeugdaten (MAN D3876 400 kW / 540 PS / 2.500 Nm, 14 t, 4,20 m Spurbreite über X-Track-Aluketten), Laufwerksgeometrie, Gelenk- und Zylinder-Ankerpunkte für 12-Wege-Räumschild (5,30 m), AlpinFlexFräse & Finisher (6,30 m) sowie 360°-Seilwinde (4,7 t) |
| `pb-kinematics.js` | Exakter mathematischer Kinematik-Solver (ohne Three.js-Abhängigkeit, direkt per Node testbar): analytische geschlossene Ketten-Spline mit Fixpunkt-Abgleich auf exakten Zahneingriff am hinteren 13-Zahn-Sternrad, 2-Punkt-Hydraulikzylinder-Solver, 5-DOF-Kinematik des 12-Wege-Räumschilds (8 Zylinder), AlpinFlexFräse + elastische Finisher-Kurve + Klappflügel sowie 360°-Seilwinde mit Kettenlinien-Durchhang |
| `pb-physics.js` | Echtzeit-Steilhang- und Hydrostatik-Simulation: Gewichtskraft $F_G$, Hangabtriebskraft $F_H$, Normalkraft $F_N$, automatische/manuelle 4,7-t-Seilwinde $F_W$, Mohr-Coulomb-Schneescher-Haftgrenze & Kettenschlupf-Dynamik, 400-kW-Leistungsverteilung und Arbeitsdrücke bis 450 bar in allen Kreisen, Bodendruck (~60–70 g/cm²), Flächenleistung (ha/h) und Sinter-Qualitätsindex |
| `pb-textures.js` | Prozeduraler High-Res-Offscreen-Canvas-PBR-Generator (Albedo, Roughness, Bump, Emissive): PistenBully-Karminrot mit `800 W`-Beschriftung & Frostkante, gebürstete Alukettenstege, zerkratzter Schildstahl mit blanker Schürfleiste, signalgelber gerippter Polyurethan-Finisher, Lüftungsgitter, SNOWsat-Cockpit-Display sowie benutzerdefinierter Schnee-/Corduroy-/Mikro-Glitzer-/SNOWsat-Shader (`MeshStandardMaterial.onBeforeCompile`) |
| `pb-model-chassis.js` | Prozedurale 3D-Geometrie für Alpen-Himmelkuppel, Berggipfel-Ring, neigbaren Steilhang mit Pistenstangen & Berganker, linkes/rechtes X-Track-Kettenlaufwerk (60 Instanced-Alustege + Stahl-Spikes pro Seite, 13-Zahn-Sternrad, 5 gefederte Laufrollen, Leitrad, Stützrollen) sowie den kompletten **Hydraulik-X-Ray-Innenaufbau** (MAN D3876, Lüfter, Verteilergetriebe, Axialkolbenpumpen, Planetengetriebe, pulsierende Hoch-/Niederdruck-Kreise) |
| `pb-model-implements.js` | Prozedurale 3D-Geometrie für Panoramakabine mit Fresnel-Scheiben & beleuchtetem Cockpit (Joystick, SNOWsat-Screen), Dach-LED-Armada mit volumetrischen Lichtkegeln & blitzenden orangefarbenen Rundumleuchten, 12-Wege-Räumschild mit 8 exakten Hydraulikzylindern, AlpinFlexFräse + elastischem gelben Finisher + **Schnee-Mikroskop-Längsschnitt** (Eisbrocken, Reibungswärme, Sinter-Eisbrücken), 360°-4,7-t-Seilwinde mit Stahlseil sowie 3D-Kraftvektor-Pfeilen |
| `pb-particles.js` | Weiche Alpha-Sprite-Partikelsysteme: Schneewelle vor dem 12-Wege-Schild, im Heck-LED-Licht leuchtender Schneestaub-Schleier hinter der AlpinFlexFräse, Schlupf-Schneespray am Sternrad sowie warmer Kondensdampf am Auspuff |
| `pb-diagnostics.js` | Umschaltbares 3-Tab-Live-SVG-Diagnostikpanel: (1) Hangphysik-Kräfteparallelogramm & Haftgrenze, (2) 400-kW-Leistungsverteilung & 450-bar-Hydraulikdrücke, (3) Bodendruck-Vergleich (PistenBully vs. Skischuh vs. PKW-Reifen) |
| `pb-audio.js` | Prozeduraler Web-Audio-Synthesizer (standardmäßig stumm): drehzahlabhängiger 6-Zylinder-MAN-Diesel, druckabhängiges Hochdruck-Hydrauliksurren, Fräsen-Schneerauschen und Rückfahrwarner |
| `pb-data.js` | 8 geführte Technik-Tour-Stationen (Kameraflüge, automatische Schnitt-/Overlay-Modi, Hangneigung & Zeitlupe) sowie 8 klickbare 3D-Baugruppen-Hotspots |
| `pb-main.js` | Three.js-0.170.0-Orchestrierung (`ACESFilmicToneMapping`, `PCFSoftShadowMap`, `RoomEnvironment`-PMREM-HDRI, `EffectComposer` + selektiver `UnrealBloomPass` + `OutputPass`, `OrbitControls`), Umschaltung „Blaue Stunde / Nachtpräparierung“ vs. „Alpiner Sonnentag“, Raycasting, 3D-Projektion & UI-/Tour-Controller |
| `index.html` / `styles.css` | Responsives Studio-Layout (einklappbare Desktop-Sidebar + mobiler Drawer, Dark-/Light-Theme), Meta-CSP & lokale Three.js-Importmap |
| `tests/pistenbully.test.mjs` | Automatisierte Node-Testsuite für Ketten-Spline-Schluss & exakten 13-Zahn-Sternrad-Eingriff, 8 Schild-Hydraulikzylinder über Extremstellungen, Finisher-Schneekontakt & Klappflügel, Winden-Kettenlinie, Steilhang-Schlupfphysik (Winde Ein vs. Aus) und Leistungs-/Bodendruckgrenzen |

## Stellschrauben & Kennwerte (`specs.js`)

| Parameter | Wert | Bedeutung |
| :--- | :--- | :--- |
| `identity.ratedPowerKW` / `PS` | `400 kW` / `540 PS` | MAN D3876 6-Zylinder-Reihenmotor (15,2 l, 2.500 Nm) |
| `identity.operatingMassKg` | `14.000 kg` | Einsatzgewicht inkl. 4,7-t-Winde, 12-Wege-Schild & AFF |
| `identity.vehicleWidthOverTracksM` | `4,20 m` | Gesamtbreite über X-Track-Aluketten (~60–70 g/cm² Bodendruck) |
| `identity.maxHydraulicPressureBar` | `450 bar` | Maximaler Hochdruck-Vorlauf im geschlossenen Hydrostatik-Kreis |
| `identity.maxWinchForceKN` | `47,0 kN` (~4,7 t) | Maximale Zugkraft der 360°-Steilhang-Seilwinde |
| `blade.centerWidth` + `2 × wingWidth` | `5,30 m` | Gesamtbreite 12-Wege-Räumschild inkl. Klappohren |
| `tiller.mainWidth` + `2 × wingWidth` | `6,30 m` (`4,30 m` geklappt) | Arbeitsbreite AlpinFlexFräse + signalgelber Finisher |
| `tiller.ribSpacing` | `0,095 m` | Exakte Cord-Rillen-Teilung (synchron zwischen Finisher-Rippen & Schnee-Shader) |
| `tracks.numGrousers` / `sprocketTeeth` | `60` / `13` | Exakter Fixpunkt-Abgleich für schlupffreien Sternrad-Zahneingriff |

## Changelog

- **2026-11-27** (`feat/pistenbully-800w`) – Erstversion `v0.1.0`: Vollständige interaktive 3D-Steilhang-Simulation & Technik-Visualisierung des Kässbohrer PistenBully 800 W mit prozeduralen PBR-Texturen, dynamischem Schnee-/Corduroy-/SNOWsat-Shader, 450-bar-Hydrostatik-X-Ray, Fräsen-/Sinter-Schnitt („Schnee-Mikroskop“), 3D-Kraftvektoren, 12-Wege-Räumschild (8 Zylinder), 4,7-t-Seilwinde, Live-Diagnostik, Web-Audio und 8-Stationen-Tour.
