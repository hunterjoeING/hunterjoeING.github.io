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
| E-Roadtrip Planung, Reichweitenband, GTA-2-Sequenz & `AGENTS.md` Regel 9 | Michael (`mic4rd`) / Cursor Cloud Agent | `cursor/eroadtrip-planning-range-gta2-e223` ([PR #2](https://github.com/mic4rd/hunterjoeING.github.io/pull/2) im Fork) | ✅ über [Upstream-PR #3](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/3) (`826fb33`) gemergt; Fork-PR am 25.11. geschlossen |
| E-Roadtrip Visuals: GTA-2 Beleuchtung/Regen/Reflexionen & Pixel-Art-Europakarte | Michael (`mic4rd`) / Cursor Cloud Agent | `cursor/eroadtrip-visuals-gta2-map-210f` ([PR #3](https://github.com/mic4rd/hunterjoeING.github.io/pull/3) im Fork, baut auf Fork-PR #2 auf) | ✅ über [Upstream-PR #3](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/3) (`826fb33`) gemergt; Fork-PR am 25.11. geschlossen |
| E-Roadtrip Paket C: Planungskarte, Roaming, Hin/Rück, Tempo | Michael (`mic4rd`) / Cursor Cloud Agent | `cursor/eroadtrip-planning-overview-e994` ([PR #4](https://github.com/mic4rd/hunterjoeING.github.io/pull/4) im Fork, gegen `main`) | ✅ über [Upstream-PR #3](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/3) (`826fb33`) gemergt; Fork-PR am 25.11. geschlossen |
| E-Roadtrip Paket D: Städte, Autohöfe, Partikel, Autobahn-FSD, HUD | Michael (`mic4rd`) / Cursor Cloud Agent | `cursor/eroadtrip-package-d-79e6` ([PR #5](https://github.com/mic4rd/hunterjoeING.github.io/pull/5) im Fork, gegen `main`) | ✅ über [Upstream-PR #3](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/3) (`826fb33`) gemergt; Fork-PR am 25.11. geschlossen |
| E-Roadtrip: Touch, Level 2, Messe, AC, Autohof | Michael (`mic4rd`) / Cursor Cloud Agent | `cursor/eroadtrip-touch-level2-5df0` ([PR #6](https://github.com/mic4rd/hunterjoeING.github.io/pull/6) im Fork, gegen Paket D) | ✅ über [Upstream-PR #3](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/3) (`826fb33`) gemergt; Fork-PR am 25.11. geschlossen |
| E-Roadtrip Review-Fixes 1–20 + Doku | Michael / Codex CLI (gpt-6.2-sol high) | `codex/review-fixes` (`022a699`, `2b01e5a`, `f7abd66`, `006a1bf`, `85af6f7`) · [Upstream-PR #4](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/4) (Merge `29fd861`) | ✅ Gemerged und live auf https://hunterjoeing.github.io/games/e-roadtrip/ |
| Arcade-Versionierung, Update-Hinweise und Changelogs | Michael / Codex CLI (gpt-6.2-sol high) | `codex/arcade-versioning` · [Upstream-PR #6](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/6) (Merge `f58b077`) | ✅ Gemerged und live (Arcade v0.2.0) |
| Arcade: Level-Bestenlisten (Teil a: Worker + arcade.js + Hub) | Michael / Codex CLI (gpt-6.2-sol high) | `codex/arcade-leaderboard-groups` · [Upstream-PR #7](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/7) (Merge `116a458`) | ✅ Gemerged, Worker deployt und live (Arcade v0.3.0) |
| E-Roadtrip v0.5.0: Level-Bestenlisten (Teil b) | Michael / Codex CLI (gpt-6.2-sol high) | `codex/eroadtrip-highscores` · [Upstream-PR #8](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/8) (Merge `ca2c357`) | ✅ Gemerged und live (e-Roadtrip v0.5.0) |
| E-Roadtrip v0.6.0 · Level 3 und Stadtfahrten bis Montpellier | Michi | `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`) · Fork-Stand `@@FIX@@` · kein PR | 🟡 Montpellier im Fork · Spieltest und Upstream-Merge offen |

**Versionen im Arbeitsstand** · `eroadtrip` v0.6.0 · `arcade` v0.3.1

---

## 2. Session-Log (Neueste Einträge oben)

### 2026-11-26 – Michi / Codex (Sol 6.2) – v0.6.0 · Stadtfahrt Montpellier

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`), vorheriger Stand `03f6c0f`. SHA `b47c48f`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. Fork-Bundle nach dem Push geprüft, Issue/PR-Check: 0 offen. [Fork-Pages](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · Alle drei Level-2-Routen führen zum Strandhotel in Palavas. Route A nutzt Montpellier-Est über D66 und Carnon, Mitte und B kommen über A750, Montpellier-Sud und Lattes. Nach dem rückwärtigen Parken zeigt eine überspringbare Pixelszene die Familie am Strand. Danach folgen das bestehende Finale und die Level-2-Bestenliste. Verkehr, Schadensregeln, Navi und Beleuchtung nutzen die vorhandenen Systeme.
- **Geprüft** · Typecheck, zwei bytegleiche Builds, `node --check` für Bundle, Release-Datei und geänderte Tests, `npm test` (126/126), `git diff --check` und Versionsprüfung gegen `279202c`. MG4-Standardpläne für A/Mitte/B: 1.049/1.073/1.139 Min, innerhalb der Worker-Grenzen bei 1.100 Min. Zielzeit und Worker bleiben gleich. Keine Live-Wertungsanfragen. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10).
- **Nachbesserung Orchestrator** · Handy-Ansicht: Nach dem Wechsel von der Autobahn in eine Stadtfahrt blieb die Spielfläche auf der alten Höhe stehen (390 px: 338 statt 489 px, dunkle Balken oben und unten). Ursache: Phasers `refresh()` nutzt die zwischengespeicherte Elterngröße und liest sie danach still neu ein, dadurch erkennt die eigene Abfrage die Änderung nie. `main.ts` liest jetzt vor jedem Refresh die Bühnengröße neu ein (`refreshStageSize()`). Der Fehler bestand schon vorher, fiel bei Montpellier aber stärker auf. Bundle-Rev 8, SHA `@@FIX@@`.
- **Offen** · Desktop- und Handy-Spieltest für beide Anfahrten, Parken und beide separat überspringbaren Szenen. Lokaler Browser und HTTP-Server starten in der Sandbox nicht. Issue-/PR-Check übersprungen (kein Netz), vom Orchestrator nachzuholen.

### 2026-11-26 – Michi – v0.6.0 · Köln-Stadtfahrt in Level 1 entfernt

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`), vorheriger Stand `ce16a28`. SHA `e130a68`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages-Test](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · In Level 1 entfällt die Stadtfahrt `koeln_ring` auf allen Routen (Aachen–Köln bleibt Autobahn am Kreuz Köln-West). Die 6-Minuten-Stadtpauschale gilt in den spielbaren Levels nicht mehr. Layout, `koelnMotorway()` und die RegionalCity-Führung bleiben für den späteren Start in Level 5 (Köln → München). Changelog-Highlight ohne „Köln“. Selbst umgesetzt, kein neues Modell.
- **Geprüft** · `npm run typecheck`, zwei bytegleiche Builds, `node --check`, `npm test` (119/119), `git diff --check`. Level-1-Standardpläne: Route A 473 Fahr-/713 Gesamtminuten, Route B 427/667, Route C 463/703 (A und C jeweils 6 Minuten kürzer). Alle liegen im Worker-Fenster zu Ziel 797 Min. (0,5×–20×). Issue-/PR-Check: 0 offen.
- **Offen** · Spieltest und Upstream-Merge. Konflikte mit `upstream/main` (`0e73752`) beim Merge auflösen.

### 2026-11-26 – Michi / Codex (Sol 6.2) – v0.6.0 · Stadtszenen Hannover/Köln/Hirtshals

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`), vorheriger Stand `b21ad68`. SHA `4ea71cd`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages-Test](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · Nordausgerichtete Karten für Hannover, Köln und Hirtshals. Hannover A/B fahren über Messe-Nord, C über Messe-Süd. Beide Zufahrten führen zum E-Parkplatz mit dem bestehenden Besuch und AC-Angebot. Köln A fährt auf die A1 nach Norden, C über die Rodenkirchener Brücke auf die A4 Richtung Olpe. Über die Ringe sind Dom und Deutz erreichbar. Hirtshals führt über die E39 zur Fährabfertigung und bleibt Teil der Level-7-Vorschau. Das generische Straßengitter ist entfernt. Der gemeinsame Renderer nutzt statische Kartenkacheln, Gewässer, Brücken und reduzierte Details auf Mobilgeräten.
- **Geprüft** · `npm run typecheck`, zwei bytegleiche Builds, `node --check` für Bundle, Release-Datei und geänderte Tests, `npm test` (117/117; nach Orchestrator-Nachbesserung 118/118), `git diff --check` und Versionsprüfung gegen `279202c`. Alle Standardprognosen der Level 1–3 liegen im Zeitfenster des Workers. Ladepläne für Level 1–2 und die Level-3-Abschlussfahrten sind durch Tests belegt. Zeitpauschalen bleiben bei den bisherigen Werten. Keine Live-Wertungsanfragen. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10).
- **Nachbesserung Orchestrator** · Köln: Der blaue A1-Verkehrswagen startete genau auf dem Spawnpunkt und fuhr dem Spieler sofort auf (Kollisionsdialog nach 0 s). Startpunkt `einfahrt` aus dem Pfad entfernt (`cityLayouts/koeln.ts`), neuer Test „City traffic never starts on top of the player spawn“. Headless-Screenshots aller drei Städte geprüft, Issue/PR-Check: 0 offen.
- **Offen** · Spieltest auf Desktop und bei 320/390 px in beiden Themes. Chrome und Chromium werden von der lokalen Sandbox beim Start blockiert. Issue-/PR-Check übersprungen (kein Netz), vom Orchestrator nachzuholen.

### 2026-11-26 – Michi / Codex (Sol 6.2) – v0.6.0 · Stadtszenen Aachen

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`), vorheriger Stand `44f3815`. SHA `b21ad68`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages-Test](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · Gemeinsame Aachen-Karte für Abfahrt und Heimkehr. Level 1 fährt über den Europaplatz zur A544, Level 2 über den Kaiserplatz nach Aachen-Brand. Nachts führt das Navi über den Alleenring nach Hause ins Pontviertel. Abfahrtspauschale von sieben auf neun Minuten erhöht, da die empfohlenen Stadtstrecken länger sind.
- **Geprüft** · `npm run typecheck`, zwei bytegleiche Builds, `node --check` für Bundle und geänderte Skripte, `npm test` (109/109), `git diff --check` und Versionsprüfung gegen `279202c`. Alle Standardprognosen der Level 1–3 liegen im Zeitfenster des Workers. Für alle sechs Routen der Level 1–2 sind erreichbare Ladepläne belegt, Level 3 läuft weiter durch den bestehenden Abschlusstest. Keine Live-Wertungsanfragen.. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10). Die Überarbeitung gehört zu v0.6.0. Die öffentlichen Stichpunkte werden im nächsten Stadtszenen-Lauf gesammelt aktualisiert.
- **Offen** · Spieltest auf Desktop und bei 320/390 px in beiden Themes. Lokaler Browserstart durch die Sandbox blockiert. Issue-/PR-Check übersprungen (kein Netz), vom Orchestrator nachzuholen.

### 2026-11-26 – Michi / Codex (GPT-6) – Level 3 Run C – Tunnel und Ankunft

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`). SHA `82abb4f`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages-Test](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · Nach dem Parken am Innsbrucker Hotel folgt auf allen drei Routen eine überspringbare Pixelszene mit Familie und Schneefall, danach Ergebnis und Level-3-Bestenliste. Route A hat einen Tunnel mit Vorwarnung, Scheinwerfern, 80-km/h-Schild, Abschnittskontrolle und gelegentlicher Sperrung mit Warte- oder Umleitungswahl. Das Briefing fasst die Winterregeln zusammen.
- **Geprüft** · `npm run typecheck`, zwei bytegleiche Builds, `node --check` auf Bundle, Release-Datei und geänderten Tests, `npm test` (101/101), Versionsprüfung gegen `279202c`, `git diff --check`. Die drei Standardpläne mit dem MG4 erreichen Innsbruck in 131–154 Min und liefern gültige Ergebnisse für beide Bestenlisten. Spiel und Worker verwenden 165 Min. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10). Keine Anfrage an die Live-Wertung.
- **Offen** · Tunnel, Sperrungsdialog und Finale auf dem Handy und Desktop in beiden Themes spielen. Chrome und Chromium scheitern lokal beim Start an der Sandbox. Issue-/PR-Check übersprungen (kein Netz), vom Orchestrator nachzuholen.

Ältere Einträge stehen im [Handoff-Archiv](HANDOFF-archive.md).
