# Verbrennungsmotor 3D – Interaktiver Explainer (`games/combustion-engine/`)

## Überblick

Interaktiver Three.js-3D-Explainer für Viertakt-Verbrennungsmotoren in vier Bauformen (**R4**, **180°-Boxer B4**, **60°-V6**, **90°-Crossplane-V8**) und zwei Antriebskonzepten (**Otto-Saugmotor mit Saugrohreinspritzung** sowie **Common-Rail-Turbodiesel mit VTG-Turbolader**) für HunterJoe Arcade. Visualisiert Ansaugen, Verdichten, Arbeiten und Ausstoßen mit mechanisch exakter Kurbeltrieb-Kinematik in Bank-Koordinaten, synchronem 1:2-Ventiltrieb, volumetrischen Brennräumen, Gaspedal, Volllast-Prüfstandsdiagramm, Muschelkurve und geführter Tour. Die Telemetrie verbindet den Motorbetriebspunkt mit einer beispielhaften Sechsgang-Wandlerautomatik.

## Modulübersicht

| Datei | Aufgabe |
| :--- | :--- |
| `index.html` | Einstiegsseite, SEO/JSON-LD, Three.js-Importmap (`0.170.0`), Topbar, 3D-Viewport, Seitenpanel mit Motor-/Bauform-Auswahl, Reglern, Gangwahlanzeige, Voreinstellungen, Telemetrie (inkl. Ladedruck für Turbodiesel) und Diagrammen, dynamischer Zylinder-Taktanzeige, Tour-Container |
| `styles.css` | Responsives Studio-Layout (Desktop-Sidebar + mobiler Drawer), Dark-/Light-Mode, 3D-Label-Pins, Motor-/Bauform-Buttons, SVG-Diagramme, animierte Gangmarkierung und Warn-/Reparatur-Banner |
| `ce-variants.js` | Parametrische Definitionen der vier Bauformen (`r4`, `boxer4`, `v6`, `v8`) inkl. Bankwinkel, Hubzapfenwinkel und Zündfolgen sowie der zwei Konzepte (`otto`, `diesel`) mit Volllastkurven, BSFC-Modellen und Ladedruck-Berechnung |
| `ce-data.js` | Profilfähige Motor- und Antriebstelemetrie, Verbrauchskennfeld mit Konturen und Optimum, Fahrwiderstand, reine Fahrsequenz und Konstantfahrt-Vergleiche, 720°-Takt-Helfer (inkl. Diesel-Direkteinspritzung), profilabhängige Baugruppen- und Tour-Texte |
| `ce-model.js` | Parametrischer Multi-Bank-3D-Motorgenerator (R4, Boxer B4, V6 60°, V8 90°) mit Cutaway-Wänden, Laufbuchsen, Kolben (mit Diesel-Mulde), exakten Slider-Crank-Pleueln, Bauform-Kurbelwellen, DOHC-Köpfen, korrigierten 1:2-Nockenwellen, 16V/24V/32V-Ventiltrieb, Zündkerzen bzw. Common-Rail-Injektoren + Einspritzkegel, Ansaugtrakt (Drosselklappe vs. 3D-VTG-Turbolader mit drehendem Verdichter- und Turbinenrad), Fächerkrümmer, 1:2-Steuertrieb je Bank, Schwungrad, Ölwanne und isolierten Baugruppen-Materialien |
| `ce-explosion.js` | Überdrehzahl- und Motorschaden-Easter-Egg für Modus `03 Explosionsansicht` (eskalierende Überdrehzahl, WebAudio-Synthese, 3D-Ballistik mit Bodenabprallern für Baugruppen/Trümmer, Feuerball- und Rauchpartikel sowie Reparatur-Reset) |
| `ce-main.js` | WebGLRenderer, Beleuchtung, Kamerasteuerung je Bauform, 3D-Label-Projektion und Raycasting, Motor-/Bauform-Umschaltung, Regler und Telemetrie, Tour mit Live-Fahrbeispielen sowie dynamisch skalierende SVG-Diagramme |
| `tests/engine-map.test.mjs` | Node-Tests für Standard-R4-Otto-Telemetrie, Volllastkurve, Kennfeld, Konturen, HTML-Voreinstellungen und Release-Metadaten |
| `tests/engine-gear.test.mjs` | Node-Tests für Gangwahl, Geschwindigkeit, Fahrwiderstand, Verbrauch, Ganggrenzen, HTML-Kacheln und Release-Text |
| `tests/engine-tour.test.mjs` | Node-Tests für Momentanverbrauch, Fahrsequenz und Gangvergleich, modellbasierte Tour-Texte, Release und UI-Ereignisse mit simuliertem DOM und steuerbarer Render-Uhr |
| `tests/engine-variants.test.mjs` | Node-Tests für alle 4 Bauformen (R4, Boxer, V6, V8) und beide Konzepte (Otto-Sauger vs. Turbodiesel), exakte Kurbelwellen-Phasenmathematik, Ladedruck, Konturen, DOM-Umschaltung und spoilerfreie Release-Prüfung für `v0.4.0` |

## Stellschrauben & Kennwerte (`ce-variants.js` / `ce-data.js` / `ce-model.js`)

| Parameter | Wert | Bedeutung |
| :--- | :--- | :--- |
| `ENGINE_LAYOUTS` | `r4` (2,0 l, `1–3–4–2`), `boxer4` (2,0 l, 180°, `1–3–2–4`), `v6` (3,0 l, 60°, `1–2–3–4–5–6`), `v8` (4,0 l, 90° Crossplane, `1–8–4–3–6–5–7–2`) | Vier Bauformen mit exakter Hubzapfen-Beziehung `crankPinAngleDeg = (phaseDeg + bankAngleDeg) mod 360` |
| `R_CRANK` / `L_ROD` | `0.58` / `1.92` | Kurbelradius und Pleuellänge (exakte Slider-Crank-Kinematik in Bank-Koordinaten) |
| Otto-Sauger (`otto`) | `idleRpm 850`, `redlineRpm 6500`, `maxRpm 7000`, `Hᵤ 42,7 MJ/kg`, `ρ 745 g/l`, `finalDrive 3,2` | Klassischer Saugbenziner mit Saugrohreinspritzung und Drosselklappe (R4: 200 Nm @ 4250, 109 kW @ 5970, BSFC-Optimum 245 g/kWh) |
| Turbodiesel (`diesel`) | `idleRpm 750`, `redlineRpm 4500`, `maxRpm 5000`, `Hᵤ 42,6 MJ/kg`, `ρ 835 g/l`, `finalDrive 2,48` | Common-Rail-Direkteinspritzung (16,5:1) + VTG-Turbolader ohne Drosselklappe (R4: ~381 Nm @ 2250, ~140 kW, BSFC-Optimum ~196–202 g/kWh, Ladedruck bis 1,65–1,85 bar) |
| Nockenwellen-Übersetzung & Phasen | `0.5×`, `intakeLobe = +(phase − 90)/2`, `exhaustLobe = +(phase − 630)/2` | Korrigiertes Vorzeichen sorgt für synchrone Nocken-Abwärtsbewegung auf allen Zylindern und Bänken |
| `TORQUE_NM_PER_BAR` (K) | `15.915 × (V_h / 2,0)` Nm/bar | Umrechnung von Nutzmoment in effektiven Mitteldruck proportional zum Hubraum |
| `DRIVETRAIN_EXAMPLE`: `gearRatios` / `wheelRadiusM` | `[4.04, 2.37, 1.56, 1.16, 0.85, 0.69]` / 0,32 m | Beispielwerte für sechs Gänge und dynamischen Radius (225/45 R17); Achsantrieb passt sich an Konzept & Hubraum an |
| `massKg` / `rollingResistance` / `dragAreaM2` / `drivetrainEfficiency` | 1500 kg / 0,011 / 0,65 m² / 0,92 | Beispielwerte für Fahrwiderstand eines Kompaktwagens |
| Konturraster & BSFC-Stufen | 25 U/min × 2 Prozentpunkte Last; Otto `250..450`, Diesel `205..400` g/kWh | Auflösung und Isolinien der Muschelkurve je Konzept |

## Ansichtsmodi & Funktionen

1. **00 Motor & Bauform** – Sofortige Umschaltung zwischen **Otto-Sauger** und **Turbodiesel** sowie **R4**, **Boxer**, **V6** und **V8** (auch über den Schnell-Chip im Viewport). Baut 3D-Modell, Diagramme, Zylindertakte, Presets und Tour-Texte live um.
2. **Außenansicht (`normal`)** – Vollständig geschlossener Motor inkl. Krümmer und Ventildeckel.
3. **01 Cutaway (`cutaway`, Standard)** – Öffnet Block, Laufbuchsen, Köpfe, Ventildeckel und Ölwanne (bei Boxer nach oben für freien Einblick in beide liegenden Bänke) und blendet den Abgaskrümmer halbtransparent zurück.
4. **02 X-Ray (`xray`)** – Halbtransparente Blaupausen-Hülle mit `EdgesGeometry`-Konturen.
5. **03 Explosionsansicht (`exploded`, Easter-Egg)** – Schaltet den Drehzahlbegrenzer ab, überdreht den Motor mit Zittern, Krümmerglühen und Sound bis zum Motorschaden mit 3D-Trümmerballistik, Rauchwolke und „Neuen Motor einbauen“-Reset. *(Gemäß AGENTS.md Regel 10 nicht im öffentlichen Changelog erwähnt.)*
6. **04 Motordrehzahl & 04b Gaspedal (Last)** – Drehzahl in 50-U/min-Schritten, Last 0–100 %, Gangwahlanzeige N–6, dynamische Voreinstellungen, Zeitlupe (`Pause`, `0,06×`, `0,16×`, `0,38×`).
7. **05 Prüfstand & 05b Muschelkurve** – Dynamisch skalierte Volllastkurven (Nm/kW) und Wirkungsgradkennfeld (g/kWh, bar, Fahrwiderstandslinien) für alle acht Motorkombinationen.
8. **06 Schritt-für-Schritt-Tour** – Neun Stationen, angepasst an Otto (Drosselklappe, Zündkerze) bzw. Turbodiesel (hohe Verdichtung, Direkteinspritzung, VTG-Turbolader).

## Tests

`node --test games/combustion-engine/tests/*.test.mjs` prüft alle vier Testdateien: Standard-R4-Otto-Kennfeld & Konturen, Gangwahl & Verbrauch, Tour-Fahrbeispiele & simuliertes DOM sowie sämtliche Bauformen (R4, Boxer, V6, V8), Turbodiesel-Physik/Ladedruck, DOM-Umschaltung und Release-Regeln.

## Changelog

- **2026-11-25** (`main`, `8c0fce8`) – Erstversion `v0.1.0`: Vollständiger 3D-Explainer eines 2,0-Liter-DOHC-16V-Verbrennungsmotors mit Cutaway, X-Ray, Exploded View (12 Labels), Drehzahl-/Zeitlupensteuerung, Prüfstandskurve und 6-Schritte-Tour (später ersetzt: Tour mit neun Schritten in v0.3.0; Exploded View als Überdrehzahl-Easter-Egg in v0.4.0).
- **2026-11-25** (`main`, `0e73752`) – Patch `v0.1.1`: Mobiles Steuerungsmenü mit festem „Zurück zu 3D“-Knopf, Backdrop-Tap-Close und Escape-Taste ergänzt.
- **2026-11-27** (`codex/combustion-load-map`, `cf28b8d`) – Feature `v0.2.0` mit Gaspedal, lastabhängiger Telemetrie, interaktiver Muschelkurve und gekoppelten Voreinstellungen.
- **2026-11-27** (`codex/combustion-load-map`, `add54de`) – Erweiterung v0.2.0: Gang, Geschwindigkeit und Verbrauch für eine Beispielautomatik sowie gangabhängige Fahrwiderstandslinien in der Muschelkurve.
- **2026-11-27** (`codex/combustion-load-map`, SHA: `0add518`) – Feature v0.3.0: Gangwahlanzeige, Momentanverbrauch bei Beschleunigung und Schub sowie geführte Tour mit animierten Fahrbeispielen.
- **2026-11-27** (`codex/combustion-load-map`, SHA: `66a8667`) – Patch v0.3.1: Beispielkennfeld eines 2,0-l-Saugbenziners mit Saugrohreinspritzung, dazu passende Voreinstellungen und Tour sowie Einspritzventile und Kraftstoffleiste im 3D-Modell.
- **2026-11-27** (`upstream/main`, Merge `84636bc`, [PR #12](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/12)) – v0.3.1 live auf https://hunterjoeing.github.io/games/combustion-engine/.
- **2026-11-27** (`main`, `9ed0fd1`) – Feature `v0.4.0`: Common-Rail-Turbodiesel mit 3D-VTG-Turbolader, Direkteinspritzkegel und Ladedruck-Telemetrie; vier parametrische Bauformen (R4, 180°-Boxer B4, 60°-V6, 90°-Crossplane-V8); Überdrehzahl-Explosions-Easter-Egg; korrigierte Nockenwellen-Phasen und isolierte Baugruppen-Hervorhebung.
