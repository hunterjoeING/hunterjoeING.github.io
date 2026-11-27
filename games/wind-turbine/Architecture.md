# Windkraftanlage 3D – Interaktiver Explainer (`games/wind-turbine/`)

## Überblick

Interaktiver Three.js-3D-Explainer einer 3,6-MW-Horizontalachsen-Windkraftanlage (HAWT) für HunterJoe Arcade. Zeigt anschaulich, wie Windenergie über Aerodynamik, Pitch-Regelung, 3-Stufen-Getriebe, Generator, Turmleitungen und Transformator in Netzstrom umgewandelt wird.

## Modulübersicht

| Datei | Aufgabe |
| :--- | :--- |
| `index.html` | Einstiegsseite, SEO/JSON-LD, Three.js-Importmap (`0.170.0`), Topbar, 3D-Viewport, Seitenpanel, Tour-Container |
| `styles.css` | Responsives Studio-Layout (Desktop-Sidebar + mobiler Drawer), Dark-/Light-Mode, 3D-Label-Pins, SVG-Diagramm |
| `wt-data.js` | Physikmodell `computeTurbineTelemetry(v)` (Cut-in 3 m/s, Nennbetrieb 12 m/s, Cut-out 25 m/s), 12 Baugruppen (`TURBINE_PARTS`), 6-Schritte-Tour (`TURBINE_TOUR_STEPS`) |
| `wt-model.js` | Prozedurales 3D-Modell (verwundene NACA-Rotorblätter mit Pitch-Lagerung, Halbschalen-Gondel, verzahntes 3-Stufen-Getriebe, Scheibenbremse, Kupferstator-Generator, Azimutkranz, Turm mit 3-Phasen-Leitungen, Trafo, Wind-Streamlines & Stromimpulse) |
| `wt-main.js` | WebGLRenderer, `RoomEnvironment`-PBR-Beleuchtung, `OrbitControls`, sanfte Kameraflüge, 3D-zu-2D-Label-Projektion, Raycasting-Teileauswahl, interaktive SVG-Leistungskurve, Tour-Steuerung |

## Stellschrauben & Kennwerte (`wt-data.js`)

| Parameter | Wert | Bedeutung |
| :--- | :--- | :--- |
| `ratedPowerMW` | `3.6 MW` | Nennleistung |
| `rotorDiameterM` | `126 m` | Rotordurchmesser |
| `cutInSpeed` | `3.0 m/s` | Einschaltwindgeschwindigkeit |
| `ratedSpeed` | `12.0 m/s` | Nennwindgeschwindigkeit (Beginn aktiver Pitch-Regelung) |
| `cutOutSpeed` | `25.0 m/s` | Sturmabschaltung (Fahnenstellung 86° + Scheibenbremse) |
| `gearRatio` | `1 : 92` | Übersetzung Rotorwelle → Generatorwelle |

## Ansichtsmodi & Funktionen

1. **Außenansicht (`normal`)** – Vollständige Anlage mit animierten Windströmungen und Rotor-Pitch.
2. **01 Cutaway (`cutaway`)** – Öffnet Gondel, Spinner, Getriebe, Generator und Turmfenster mit Schnittkanten.
3. **02 X-Ray (`xray`)** – Halbtransparente Blaupausen-Hülle mit `EdgesGeometry`-Konturen.
4. **03 Exploded (`exploded`)** – Zieht alle 12 Baugruppen entlang ihrer `explodeOffset`-Vektoren auseinander und blendet Beschriftungen ein.
5. **04 Wind-Regler & 05 Leistungskurve** – Gekoppelter Regler + direkt per Klick/Drag bedienbares SVG-Diagramm `P(v)`.
6. **06 Schritt-für-Schritt-Tour** – 6 geführte Stationen mit synchronisierter Kamera, Ansichtsmodus, Wind-Preset und Bauteil-Fokus.

## Changelog

- **2026-11-25** (`main`, `8c0fce8`) – Erstversion `v0.1.0`: Vollständiger 3D-Explainer einer 3,6-MW-Windkraftanlage mit Cutaway, X-Ray, Exploded View (12 Labels), Wind-Regler, interaktiver Leistungskurve und 6-Schritte-Tour.
- **2026-11-25** (`main`) – Patch `v0.1.1`: Rotationsachse von Bremsscheibe, schneller Welle & Kupplung (`rotateX(Math.PI / 2)` in Geometrie vorgekippt), Getriebe-Achsabstände (24:13 / 22:11) und Blattausrichtung korrigiert; mobiles Steuerungsmenü mit festem „Zurück zu 3D“-Knopf & Backdrop-Tap-Close ergänzt.
- **2026-11-27** (`main`) – Patch `v0.1.2`: Bauteil-Highlight per geklontem Gruppenmaterial isoliert, Anemometer bei `0,0 m/s` gestoppt, Sturmschutz-Drehzahl (`> 25 m/s`) bei geschlossener Bremse auf `0 U/min` gesetzt sowie `pointercancel`/`lostpointercapture` am Diagramm-Scrubbing und Theme-Sync-Deduplizierung ergänzt.
