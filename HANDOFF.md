# HANDOFF.md – Agent- & Entwickler-Übergabe (HunterJoe Arcade)

> **Regel:** Jeder KI-Agent und Entwickler liest diese Datei **vor Beginn** einer Session (zusammen mit `gh issue list` und `gh pr list`) und aktualisiert sie **am Ende** einer Session, um Doppelarbeit zu vermeiden.
> * Aufgaben, Bugs & „Wer macht was“ $\rightarrow$ **GitHub Issues**
> * Code-Rückfragen & Reviews $\rightarrow$ **Pull-Request-Kommentare**

---

## 1. Aktuelle Übersicht (Wer arbeitet woran?)

| Bereich | Verantwortlich / Agent | Branch / PR / Issue | Status |
| :--- | :--- | :--- | :--- |
| Repo-Setup, Lizenz, `AGENTS.md`, `Architecture.md` | Joe / Antigravity | `main` (`3f40555`) | ✅ Abgeschlossen |
| E-Roadtrip Bundle-Rebuild (`esbuild.mjs`, CI, `.gitattributes`) | Michael (`mic4rd`) / Cursor Cloud Agent | PR #2 (`f42c39f`) | ✅ Gemerged |
| E-Roadtrip Planung, Reichweitenband, GTA-2-Sequenz & `AGENTS.md` Regel 9 | Michael (`mic4rd`) / Cursor Cloud Agent | `cursor/eroadtrip-planning-range-gta2-e223` (PR #2 im Fork) | 🔄 PR im Fork offen |
| E-Roadtrip Visuals: GTA-2 Beleuchtung/Regen/Reflexionen & Pixel-Art-Europakarte | Michael (`mic4rd`) / Cursor Cloud Agent | `cursor/eroadtrip-visuals-gta2-map-210f` (baut auf PR #2 auf) | 🔄 PR im Fork offen |
| E-Roadtrip Paket C: Planungskarte, Roaming, Hin/Rück, Tempo | Michael (`mic4rd`) / Cursor Cloud Agent | `cursor/eroadtrip-planning-overview-e994` ([PR #4](https://github.com/mic4rd/hunterjoeING.github.io/pull/4) im Fork, gegen `main`) | 🔄 PR im Fork offen |

---

## 2. Session-Log (Neueste Einträge oben)

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
