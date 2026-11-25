# Verbrennungsmotor 3D – Interaktiver Explainer (`games/combustion-engine/`)

## Überblick

Interaktiver Three.js-3D-Explainer eines 2,0-Liter-4-Takt-Reihenvierzylinder-Ottomotors (DOHC 16V, Zündfolge `1–3–4–2`) für HunterJoe Arcade. Visualisiert den 4-Takt-Otto-Kreisprozess (Ansaugen, Verdichten, Arbeiten, Ausstoßen) mit mechanisch exakter Kurbeltrieb-Kinematik, synchronem 1:2-Ventiltrieb, volumetrischen Brennräumen, Prüfstandsdiagramm und geführter Tour.

## Modulübersicht

| Datei | Aufgabe |
| :--- | :--- |
| `index.html` | Einstiegsseite, SEO/JSON-LD, Three.js-Importmap (`0.170.0`), Topbar, 3D-Viewport, Seitenpanel, 4-Zylinder-Taktanzeige, Tour-Container |
| `styles.css` | Responsives Studio-Layout (Desktop-Sidebar + mobiler Drawer), Dark-/Light-Mode, 3D-Label-Pins, Dual-Kurven-SVG-Diagramm |
| `ce-data.js` | Prüfstandsmodell `computeEngineTelemetry(rpm)`, exakter 720°-4-Takt-Helfer `getCylinderStroke(crankDeg, cylIndex)` für Zündfolge `1-3-4-2`, 12 Baugruppen (`ENGINE_PARTS`), 6-Schritte-Tour (`ENGINE_TOUR_STEPS`) |
| `ce-model.js` | Prozedurales 3D-Motormodell (Cutaway-Zylinderblock, 4 Kolben mit Ringen, exakte Slider-Crank-Pleuel, 180°-Flat-Plane-Kurbelwelle, DOHC-Kopf & Ventildeckel, 2 Nockenwellen mit 16 Nocken, 16 Ventile + Schraubenfedern, 4 Zündkerzen mit Zündfunken, Ansaug- & Fächerkrümmer, 1:2-Steuerkette, Schwungrad & Ölwanne, volumetrische Brennraumfarben & Gaspartikel) |
| `ce-main.js` | WebGLRenderer, `RoomEnvironment`-Beleuchtung, `OrbitControls`, sanfte Kameraflüge, 3D-Label-Projektion, Raycasting, interaktives Drehmoment-/Leistungs-SVG-Diagramm, Zeitlupen- & Tour-Steuerung |

## Stellschrauben & Kennwerte (`ce-data.js` / `ce-model.js`)

| Parameter | Wert | Bedeutung |
| :--- | :--- | :--- |
| `CYLINDER_PHASE_OFFSETS` | `[0, 180, 540, 360]` | 720°-Phasenversatz für Zündfolge `1–3–4–2` |
| `R_CRANK` / `L_ROD` | `0.58` / `1.92` | Kurbelradius und Pleuellänge (exakte Slider-Crank-Kinematik) |
| `idleRpm` / `redlineRpm` / `maxRpm` | `850` / `6500` / `7000` | Drehzahlbereiche in U/min |
| Nockenwellen-Übersetzung | `0.5×` | 24-Zahn-Nockenwellenräder auf 12-Zahn-Kurbelwellenritzel |

## Ansichtsmodi & Funktionen

1. **Außenansicht (`normal`)** – Vollständig geschlossener Motor inkl. Fächerkrümmer und Ventildeckel.
2. **01 Cutaway (`cutaway`, Standard)** – Öffnet Blockfront, Laufbuchsen, Kopf, Ventildeckel, Ölwanne und blendet den Abgaskrümmer halbtransparent zurück, sodass alle 4 Zylinder, Ventile und Zündfunken frei sichtbar sind.
3. **02 X-Ray (`xray`)** – Halbtransparente Blaupausen-Hülle mit `EdgesGeometry`-Konturen.
4. **03 Exploded (`exploded`)** – Zieht alle 12 Baugruppen bei laufendem Motor auseinander und blendet alle Beschriftungen ein.
5. **04 Drehzahl-Regler + Zeitlupe & 05 Prüfstandskurve** – Gekoppelter RPM-Regler, Zeitlupen-Modi (`Pause`, `0,06×`, `0,16×`, `0,38×`) und direkt im SVG-Diagramm bedienbare Leistungs-/Drehmomentkurve.
6. **06 Schritt-für-Schritt-Tour** – 6 geführte Stationen (4 Takte + Ventiltrieb + Explosionsansicht).

## Changelog

- **2026-11-25** (`main`, `8c0fce8`) – Erstversion `v0.1.0`: Vollständiger 3D-Explainer eines 2,0-Liter-DOHC-16V-Verbrennungsmotors mit Cutaway, X-Ray, Exploded View (12 Labels), Drehzahl-/Zeitlupensteuerung, Prüfstandskurve und 6-Schritte-Tour.
