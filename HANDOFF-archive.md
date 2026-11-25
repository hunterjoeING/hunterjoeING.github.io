# HANDOFF-Archiv – HunterJoe Arcade

Ältere Session-Einträge in ihrer damaligen Fassung. Zurück zum [aktuellen Handoff](HANDOFF.md).

### 2026-11-24 – Michael / Cursor Cloud Agent (Aachen–Köln unbeschränkt)
- **Erledigt:**
  - Gleicher Branch und [PR #6](https://github.com/mic4rd/hunterjoeING.github.io/pull/6). Kein zweiter PR.
  - `edge_aachen_koeln` von 120 auf 0 (unbeschränkt). Eine Kante, keine eigene Rück-Kante. Route A und Route C nutzen sie hin und zurück: Schild „Unbeschränkt“, Slider-Start 130, kein Blitzer-Bußgeld. Route B hat keine Etappe Aachen–Köln (Aachen–Düsseldorf bleibt unbeschränkt). Verkehrs-Vorschau startet auf dieser Etappe bei 130 statt 120.
- **Offen / Nächste Schritte:**
  - PR #6 bleibt gegen `cursor/eroadtrip-package-d-79e6` offen.
  - Level 3–7 bleiben `playable: false`.

### 2026-11-24 – Michael / Cursor Cloud Agent (Paket F)
- **Erledigt:**
  - Gleicher Branch und [PR #6](https://github.com/mic4rd/hunterjoeING.github.io/pull/6). Kein zweiter PR.
  - Aachen–Düsseldorf wieder unbeschränkt. Ladeziel ab Ankunfts-SoC. Pausen zeigen Toilettendrang, Hunger und Stress. Reichweitenring auf der aktiven Etappe in Grün/Gelb/Orange/Rot mit weichem Rand.
  - Auffahrunfall: „Hilfe anbieten“ plus YouTube-Stream (+500 €, 30 % Anzeige −1000 € / +45 Min / +50 Stress). PKW folgen der Kurve und fahren vorwärts. Eigenes Auto mit Halo. Bordcomputer rechts mit Etappenkarte. Lichthupe-Button nur bei Tempo-Defizit und Auto auf der linken Spur.
  - Hannover Messe: 4 Stunden, Essen, AC-Parkplatz mit 6 Punkten und 50 % frei. Model S 0,00 €/kWh, andere Teslas „Supercharger Abo inkl.“. Level-2-Mitte über Reims und Nevers, ab Clermont mit der Paris-Route. Level 2: Atlante und ENGIE Vianeo statt EnBW und EWE Go. Tesla-Roaming 0,61 €/kWh. Autohof-Varianten, belegte Säulen, Kollision an der Säule.
- **Offen / Nächste Schritte:**
  - PR #6 bleibt gegen `cursor/eroadtrip-package-d-79e6` offen.
  - Level 3–7 bleiben `playable: false`.

### 2026-11-24 – Michael / Cursor Cloud Agent (Blitzer nach gefahrenem Tempo)
- **Erledigt:**
  - Gleicher Branch und [PR #6](https://github.com/mic4rd/hunterjoeING.github.io/pull/6).
  - Blitzer-Risiko vergleicht die gefahrene Geschwindigkeit (in der Planung den Ø nach Verkehr) mit dem aktuellen Schild: 70 auf der Landstraße, 110 bei französischem Regen, unbeschränkt ohne Bußgeld. Dichter Verkehr senkt das Risiko, weil das Tempo sinkt.
  - Auf der Autobahn fällt der Blitzer per Chance, solange das Ist-Tempo mehr als 8 km/h über dem Schild liegt. Höchstens zwei pro Etappe, mit Cooldown. Deutschland: Bußgeldkatalog-Stufen außerorts. Frankreich: Radar automatique ab 135 €. Wahl bleibt Bremsen oder riskieren. Level 2 hat `evt_speed_trap` im Pool.
- **Offen / Nächste Schritte:**
  - PR #6 bleibt gegen `cursor/eroadtrip-package-d-79e6` offen.
  - Level 3–7 bleiben `playable: false`.

### 2026-11-24 – Michael / Cursor Cloud Agent (Autobahn-Abstand und Temposchilder)
- **Erledigt:**
  - Gleicher Branch und [PR #6](https://github.com/mic4rd/hunterjoeING.github.io/pull/6). Kein zweiter PR.
  - Spieler und KI halten auf der Autobahn einen festen Abstand. Das gesetzte Tempo ist nur die Obergrenze; bei einem langsameren Fahrzeug davor wird gebremst und die nächste freie Spur zum Überholen genutzt. Kilometer, Verbrauch und Abrechnung nutzen die tatsächlich gefahrene Geschwindigkeit. Die Prognose liegt wegen `baseTrafficRisk` darunter (`congestedCruiseKmh`).
  - Schilder je Etappe: Level 1 mischt Ende aller Streckenverbote, 130, 120 und 100 (roter Ring). Der blaue Ring ist weg. Frankreich bleibt bei 130 und 110 bei Regen. Die Stau-Umleitung über die Landstraße ist 70 km/h bis zum Etappenende. Das Schild setzt den Startwert; der Slider geht bis zur V-max.
  - Zieltempo nur noch in 5-km/h-Schritten, mit Maus und Touch. Der Slider geht immer bis zur V-max des Autos. Das Schild (auch 70 auf der Landstraße, 110 bei Regen, 130 bei unbeschränkt) setzt nur den Startwert der Etappe. Liegt das Soll über dem Schild, wird der Wert rot. Gefahren wird nach Verkehr und V-max.
- **Offen / Nächste Schritte:**
  - PR #6 bleibt gegen `cursor/eroadtrip-package-d-79e6` offen.
  - Level 3–7 bleiben `playable: false`.

### 2026-11-24 – Michael / Cursor Cloud Agent (Touch-Steuerung und Level 2 Montpellier)
- **Erledigt:**
  - Feature-Branch `cursor/eroadtrip-touch-level2-5df0` von `cursor/eroadtrip-package-d-79e6` (Pakete A–D).
  - Touch-Buttons hängen nicht mehr fest: ein `pointerId`-Register, Loslassen bei pointerup/cancel/leave, lostpointercapture, touchend/cancel, blur und `visibilitychange`, `setPointerCapture`, kein DOM-Neubau während der Fahrt, Reset wenn kein Finger registriert ist. CSS: `touch-action: none`, `user-select: none`, WebKit-Callout und Tap-Highlight.
  - Level 2 ist spielbar: Aachen ↔ Montpellier, Hin- und Rückweg über Luxemburg/Lyon, Paris/Clermont-Ferrand oder die Autoroute du Soleil. Französische Limits 130/110 bei Regen, Ionity, Tesla, Fastned, TotalEnergies, Electra und AC-Dorfladen (0,29 €/kWh). Ereignisse: dreckige Aires, eine Übernachtung (gutes Hotel mit AC, Budgethotel, Auto mit 10 % Einbruch −500 € / +2 h), Ankunft Montpellier. Unterkunft ist ein eigener Kostenposten.
  - Level 1 (Routen, Chips, Events) bleibt unverändert. Level 2 steht in der Auswahl; der Startknopf wartet, bis Level 1 abgeschlossen ist. Level 3–7 bleiben `playable: false`.
  - `Architecture.md` und dieses Handoff aktualisiert. `npm run typecheck`, `npm run build`, `node --check dist/e-roadtrip.js`. Touch per Chrome-Touch-Emulation geprüft (Halten, Long-Press, zwei Finger, touchcancel, blur, visibility). Level-2-Ereignisse im Browser geprüft.
- **Offen / Nächste Schritte:**
  - [PR #6](https://github.com/mic4rd/hunterjoeING.github.io/pull/6) im Fork gegen `cursor/eroadtrip-package-d-79e6` (nur dieses Paket, nicht noch einmal A–D).
  - Level 3–7 bleiben `playable: false`.

### 2026-11-23 – Michael / Cursor Cloud Agent (E-Roadtrip Paket D: Orte, Partikel, Autobahn, HUD)
- **Erledigt:**
  - Feature-Branch `cursor/eroadtrip-package-d-79e6` von `cursor/eroadtrip-planning-overview-e994` (Pakete A–C).
  - Städte und Autohöfe kommen aus `PlaceStyles.ts` / `PlacePainter.ts`: Aachen (Dom), Köln (`koeln_ring` am Ende der Hinfahrt Aachen–Köln), Hannover (Rathaus, Hermesturm, Messe). Autohöfe sind kleiner, mit LKW, PKW, Tankstelle, Imbiss und LKW-Wäsche; ländlich mit Feldern und Windrädern, stadtnah mit Skyline. Ladesäulen stehen am Tankstellenrand und in einer Rückwärts-Bucht.
  - Gras behält dreckige Reifenspuren und wirbelt Gras auf. Bei echtem Regen/Schnee eine geschwindigkeitsabhängige Gischt. Gaswegnehmen rekuperiert linear mit 640 px/s².
  - Autobahn: Kurven, Licht, Regen, Reflexionen (auf Mobile reduziert), Verkehr nach `baseTrafficRisk`, Blinker, Spurmitte passend zum gewählten Tempo, gelegentliche Baustelle 60/80.
  - HUD-Buttons: Ursache war `innerHTML` alle 0,12 s. Stabile DOM-Hülle plus `pointerdown`, größere Trefferfläche.
  - `Architecture.md` (Abschnitte 2, 3.2, 8, Changelog) und `HANDOFF.md` aktualisiert. `npm run typecheck` und `npm run build`.
- **Offen / Nächste Schritte:**
  - [PR #5](https://github.com/mic4rd/hunterjoeING.github.io/pull/5) im Fork gegen `main` (enthält auch die noch offenen Pakete A–C).
  - Level 2–7 bleiben `playable: false`.

### 2026-11-23 – Michael / Cursor Cloud Agent (Ladestations-Filter auf der Planungskarte)
- **Erledigt:**
  - Auf `cursor/eroadtrip-planning-overview-e994` (PR #4) die Kartenfilterlogik korrigiert.
  - **Ausblenden:** keine Symbole und keine Kacheln. Ein angehakter Anbieterchip zeigt nur dessen Symbole auf der aktuellen Etappe (farbig mit Abo, grau bei Ad-hoc/Roaming), ohne angepinnte Kacheln.
  - **Einblenden:** Symbole aller Ladepunkte auf Hin- und Rückweg (Farbe nach Abo). Angehakte Anbieterchips pinnen zusätzlich die Detailkacheln dieses Anbieters auf der aktuellen Etappe; nahe Kacheln werden auseinandergelegt.
  - Hover/Tap auf ein sichtbares Symbol öffnet weiterhin genau diesen Kasten; Klick auf den Kasten plant den Stopp und markiert ihn.
  - `Architecture.md` (Abschnitt 3.2 und Changelog) und `HANDOFF.md` angepasst, Bundle neu gebaut, Smoke-Test für beide Toggle-Zustände mit und ohne Anbieterfilter.
- **Offen / Nächste Schritte:**
  - [PR #4](https://github.com/mic4rd/hunterjoeING.github.io/pull/4) bleibt offen.
  - Level 2–7 stehen weiterhin auf `playable: false`.

### 2026-11-23 – Michael / Cursor Cloud Agent (E-Roadtrip Paket C: Planung, Laden, Tempo)
- **Erledigt:**
  - Feature-Branch `cursor/eroadtrip-planning-overview-e994` von `cursor/eroadtrip-visuals-gta2-map-210f` (Paket A + B) abgezweigt.
  - Karte: Detailkasten nur für einen Ladepunkt der gewählten Etappe (Hover Desktop / Tap Touch); Klick auf den Kasten plant den Stopp. Andere Ladepunkte höchstens als kleines Anbietersymbol. Toggle „Ladestationen anzeigen / ausblenden“ ersetzt „Alle klar / Abos klar“ (farbig vs. grau nach Anbieterfilter, im Aus-Zustand nur Logos).
  - Ad-hoc ist immer angehakt, das Kästchen ist ausgegraut und nicht abwählbar. Roaming ist ein fester Anbieterpreis (0,69–0,89 €/kWh, EnBW M = EnBW L = 0,79).
  - Hin- und Rückweg sind getrennt wählbar; Etappenliste, Ladestopps, SoC und Kosten rechnen beide Richtungen. Das hellblaue 20–0-%-Band liegt nur auf der aktiven Etappe.
  - Tempolimit als Schild in der Etappenliste; Voreinstellung = Limit bzw. Richtgeschwindigkeit 130. Tempo-Slider lassen sich mit Maus und Touch frei ziehen (Forecast erst beim Loslassen).
  - Ladestationsliste nur für die markierte Etappe; Abo normal, Roaming leicht ausgegraut mit rotem Preis.
  - `games/e-roadtrip/Architecture.md` (Abschnitte 2, 3.2, 4.1, Changelog) und `HANDOFF.md` aktualisiert, `npm run typecheck` und `npm run build` ausgeführt, Headless-Chrome-Smoke-Test ohne Konsolenfehler.
- **Offen / Nächste Schritte:**
  - [PR #4](https://github.com/mic4rd/hunterjoeING.github.io/pull/4) im Fork gegen `main` ist offen (enthält auch die noch offenen Pakete A und B, weil der Branch darauf aufsetzt).
  - Level 2–7 stehen weiterhin auf `playable: false`.

### 2026-11-23 – Michael / Cursor Cloud Agent (E-Roadtrip Visuals: GTA-2 & Pixel-Art-Europakarte)
- **Erledigt:**
  - Auf Basis von `cursor/eroadtrip-planning-range-gta2-e223` (PR #2) den Feature-Branch `cursor/eroadtrip-visuals-gta2-map-210f` angelegt (reine Visuals, keine Gameplay-/Simulationsänderungen).
  - **GTA-2-Sequenz (`CityDriveScene.ts`, `PixelArtGenerator.ts`):** Additive Licht-Sprites (`BlendModes.ADD`) für Straßenlaternen, zweistrahlige Scheinwerferkegel, Rück-/Bremslichter, Ampeln, Polizei-Blaulicht sowie beleuchtete Neon-Schilder (`HOTEL`, `ARCADE`, `24H DINER`, `CLUB NEON`, `MESSE`, `CAFE`, `EV-HUB`, `MOTEL`); Nass-Asphalt-Reflexionen (gespiegelte halbtransparente Fahrzeug-Sprites + animierte Licht-Shimmer); kamera-lokale Regenstreifen & Pfützen-Spritzer (mobil-optimierte Partikelzahl); dezentes WebGL-Bloom-PostFX auf Desktop mit sauberem Fallback für Canvas2D/Mobile.
  - **Planungskarte (`EuropePixelMap.ts`, `europeGeography.ts`, `EuropeMapScene.ts`):** Einfache Vektor-Karte durch eine gebackene `900×710` (`2× NEAREST`) Pixel-Art-Europakarte ersetzt — genauere Küstenlinien, Inseln, Flüsse/Seen und Ländergrenzen, gestuftes Relief (braun → grau → weißer Schnee für Alpen/Pyrenäen/Skanden; dezenter für Mittelgebirge), große Wälder/Nationalparks mit grünen Pixel-Bäumen, detailliertere Städte (urbane Pixel-Cluster + Doppelring-Marker), Live-Dark/Light-Mode via `MutationObserver` bei voller Ausrichtung von Routen, Ladern und SoC-Band.
  - `games/e-roadtrip/Architecture.md` (Struktur, Abschnitt 3.2 & Changelog) sowie `HANDOFF.md` aktualisiert, `npm ci && npm run typecheck && npm run build` ausgeführt, `dist/e-roadtrip.js` neu gebaut und per Headless-Chrome-Smoke-Test (WebGL & Canvas2D, 0 Konsolenfehler) + Screenshots beider Szenen verifiziert.
- **Offen / Nächste Schritte:**
  - PR im Fork gegen `main` (baut auf PR #2 / `cursor/eroadtrip-planning-range-gta2-e223` auf) wartet auf Review/Merge.
  - Level 2–7 stehen weiterhin auf `playable: false`.

### 2026-11-23 – Michael / Cursor Cloud Agent (E-Roadtrip Planung, Reichweitenband & GTA-2)
- **Erledigt:**
  - Fork-`main` mit Upstream `hunterjoeING/hunterjoeING.github.io` (`138a2c3`) synchronisiert.
  - `AGENTS.md` Abschnitt 1 um Regel 9 (`Architecture.md`-Pflicht & Changelog-Aktualisierung) als eigenen Commit ergänzt.
  - E-Roadtrip Level-Start & Routenwechsel: keine Lade-Abos und keine Ladestopps mehr vorausgewählt (Spieler entscheidet alles selbst); bei 0 Abos bleiben Lader auf der Karte ungedimmt sichtbar.
  - Mehrfarbigen Reichweiten-Ring entfernt und durch ein hellblaues, halbtransparentes Band mit weichen Kanten ausschließlich entlang der gewählten Route für den Prognose-Bereich ~20 % → 0 % SoC ersetzt (`MapLayout.ts`, `EuropeMapScene.ts`, Legende in `PlanningUI.ts` / `styles.css`).
  - GTA-2-Sequenz (`CityDriveScene.ts`, `CityTraffic.ts`): Fußgänger laufen überall auf Gehwegen und überqueren Zebrastreifen nur noch gelegentlich mit Cooldown (blockieren nie dauerhaft); A4-Autobahnauffahrt in `aachen_start` als echte, mit Tempo durchfahrbare Auffahrt ohne blaues Stoppfeld umgesetzt.
  - `games/e-roadtrip/Architecture.md` (Abschnitt 3.2 & Changelog) aktualisiert, `npm run typecheck && npm run build` ausgeführt und `dist/e-roadtrip.js` neu gebaut sowie per Headless-Chrome-Smoke-Test verifiziert.
- **Offen / Nächste Schritte:**
  - Fork-PR auf `mic4rd/hunterjoeING.github.io` liegt bereit; Michael öffnet den Upstream-PR gegen `hunterjoeING/hunterjoeING.github.io`.
  - Level 2–7 stehen weiterhin auf `playable: false`.

### 2026-11-23 – Joe / Antigravity (Review & Merge PR #2)
- **Erledigt:** PR #2 (`mic4rd:cursor/eroadtrip-reproducible-build-459e`) reviewed, mit Hinweis zum GitHub-Pages-Trigger (`GITHUB_TOKEN`) kommentiert, approved und in `main` (`f42c39f`) gemerged.
- **Offen / Nächste Schritte:** Bereit für die nächsten Feature-Issues / PRs (z. B. E-Roadtrip Gameplay/Level-Verbesserungen).

### 2026-11-23 – Michael / Cursor Cloud Agent
- **Erledigt:** CI-Action, die `dist/e-roadtrip.js` auf `main` neu baut; `.gitattributes` für das generierte Bundle; `esbuild.mjs`, damit Phaser extern bleibt (`window.Phaser` aus `dist/phaser.min.js`); Notizen in `games/e-roadtrip/Architecture.md`. Fork-`main` auf `e665276` nachgezogen.
- **Status:** PR offen, wartet auf Joes Review. Der PR wird upstream von `mic4rd:cursor/eroadtrip-reproducible-build-459e` geöffnet. Auf dem Fork liegt vorerst https://github.com/mic4rd/hunterjoeING.github.io/pull/1
- **Offen:** Keine weiteren Code-Änderungen in dieser Session. Level 2–7 bleiben `playable: false`.

### 2026-11-23 – Joe / Antigravity
- **Erledigt:**
  - `mic4rd` als Repository-Collaborator (`write`) eingeladen.
  - `LICENSE.md` mit **PolyForm Noncommercial License 1.0.0** (`Required Notice: Copyright 2026 Johannes Rudolph and Michael Fink`) angelegt.
  - `games/e-roadtrip/` Build-Setup bereinigt: `devDependencies` (`esbuild`, `phaser`, `typescript`) in `package.json` ergänzt, `tsconfig.json` `typeRoots` auf `./node_modules` umgestellt, `.gitignore` im Root angelegt (`npm install && npm run typecheck` verifiziert).
  - `AGENTS.md` um Feature-Branch/PR-Workflow (Regel 4), Bundle-Konflikt-Regel (`dist/e-roadtrip.js` nach Merge via `npm run build` neu bauen) und Agent-Koordinationsregeln (`HANDOFF.md`, Issues, PRs) erweitert.
  - KI-lesbare `Architecture.md` für alle eigenständigen Spiele (`e-roadtrip`, `2048`, `minesweeper`, `minesweeper-3d-prompt-test`, `podracer`, `roadster`, `solitaire`, `solitaire3d`, `tower`, `zombie`) sowie `shared/QUIZ_ARCHITECTURE.md` für die 31 Quizzes erstellt.
- **Offen / Nächste Schritte:**
  - Auf ersten Feature-Branch / PR von `mic4rd` / Cloud Agent warten und bei Bedarf über PR-Kommentare reviewen.
  - `games/e-roadtrip/src/data/levels.ts`: Level 2–7 stehen noch auf `playable: false` (bereit für Playtesting & Freischaltung).
