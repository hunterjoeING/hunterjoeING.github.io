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
| E-Roadtrip v0.6.0 · Level 3 und Stadtszenen Aachen, Hannover, Köln, Hirtshals | Michi | `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`) · Fork bis `e130a68`, kein PR | 🟡 Köln-Stadtfahrt in Level 1 entfernt, Stadtplan bleibt für Level 5 · Spieltest und Upstream-Merge offen (upstream/main inzwischen `0e73752`) |

**Versionen im Arbeitsstand** · `eroadtrip` v0.6.0 · `arcade` v0.3.1

---

## 2. Session-Log (Neueste Einträge oben)

### 2026-11-26 – Michi – v0.6.0 · Köln-Stadtfahrt in Level 1 entfernt

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`), vorheriger Stand `ce16a28`. SHA `e130a68`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages-Test](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · In Level 1 entfällt die Stadtfahrt `koeln_ring` auf allen Routen (Aachen–Köln bleibt Autobahn am Kreuz Köln-West). Die 6-Minuten-Stadtpauschale gilt in den spielbaren Levels nicht mehr. Layout, `koelnMotorway()` und die RegionalCity-Führung bleiben für den späteren Start in Level 5 (Köln → München). Changelog-Highlight ohne „Köln“. Selbst umgesetzt, kein neues Modell.
- **Geprüft** · `npm run typecheck`, zwei bytegleiche Builds, `node --check`, `npm test` (119/119), `git diff --check`. Level-1-Standardpläne: Route A 473 Fahr-/713 Gesamtminuten, Route B 427/667, Route C 463/703 (A und C jeweils 6 Minuten kürzer). Alle liegen im Worker-Fenster zu Ziel 797 Min. (0,5×–20×). Issue-/PR-Check: 0 offen.
- **Offen** · Spieltest und Upstream-Merge. Konflikte mit `upstream/main` (`0e73752`) beim Merge auflösen.

Ältere Einträge stehen im [Handoff-Archiv](HANDOFF-archive.md).

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

### 2026-11-26 – Michi / Codex (GPT-6) – Level 3 Runs A, B und D

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`). Run A `7cfa750`, Run B `39103b6`, Run D `015af8d`. Alle drei im Fork `mic4rd/hunterjoeING.github.io` laut lokalem Tracking-Stand. Kein PR. [Fork-Pages-Test](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Run A** · Level 3 nach Level 2 freigeschaltet. Drei Routen mit eigener Bestenliste, Kaltstart und Kinderdialog, Inntal-Stau und Vignette, Schneepflug und Lawinensperrung, Ladewarteschlangen in Kufstein und Achenkirch mit erreichbaren Ausweichladern.
- **Run B** · Zirler Berg und Achenpass mit Kehren, Schneerändern, Leitplanken, Glatteis und Gegenverkehr. Schneeketten in zwei Schritten oder ohne Ketten mit möglicher Polizeikontrolle. Drei Rekuperationsstufen mit Akku-Taper, Bremskühlpause und Live-Prognose über Ladestopps hinweg.
- **Run D** · Stadtfahrten mit Wahrzeichen, Schneematsch, Verkehr, Fußgängern, Radfahrern und Pylonen. München startet am Marienplatz mit A8 für A/C und A95 für B. Andere Auffahrten geben einen Wendehinweis. Innsbruck startet an der A12 im Osten (A/C) oder Westen (B) und führt zum Altstadt-Hotel.
- **Geprüft** · Typecheck, bytegleiche Builds, Syntax- und Versionsprüfung, `git diff --check` und `npm test` (A 79/79, B 90/90, D 98/98). Keine Anfrage an die Live-Wertung. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10).
- **Offen** · Spieltest auf Desktop und Handy in beiden Themes. Issue-/PR-Check übersprungen (kein Netz), vom Orchestrator nachzuholen.

### 2026-11-26 – Michi / Codex – v0.6.0 · Runs A–C (Sol 6.2)

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`). Run A: `170ca90`. Run B und Nachträge: `2950c66`, `9e046d8`. Push A/B: ja, Fork `mic4rd/hunterjoeING.github.io`. Run C: `e739d04`. Push C: ja, Fork. Kein PR, nicht upstream gemergt. Fork-Pages auf diesem Branch (A/B/C), Test-URL: https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/
- **Run A** · Jede freie Ladebucht akzeptiert die rückwärtige Parkposition. Freie Buchten sind grün, belegte rot. Säulen tragen Anbieter-Kürzel. Dialoge dunkeln ab und das Navi zeigt alle verbleibenden Straßen bis zum nächsten Halt. Run A bestand 48/48 Tests.
- **Run B** · Level 2 fährt bis Montpellier und behält die Übernachtung auf der Hinfahrt. Am Ziel folgt ein überspringbares Strandfinale nach Gesamtstress. Der Restakku zieht in jedem Level Punkte ab. Feste Stadt-Hindernisse verursachen drei Stufen Wertverlust. Ein ausgelöster Airbag beendet die Fahrt mit 0 Punkten. Getroffene Pylonen fliegen weg und erhöhen jeweils einmal den Stress. Verkehrsunfälle und die Ladebuchten aus Run A wurden mitgeprüft.
- **Nachtrag Orchestrator (direkt, ohne Codex-Lauf)** · „Etwas essen“ in der Ladepause kostet jetzt 20 € (`EventModal.ts`, vorher kostenlos; Test in `interactions.test.mjs`, Tuning-Tabelle §9). Das 50-€-Messe-Essen (`main.ts`) ist eine eigene Entscheidung und bleibt. Außerdem: Sachschaden erst ab 30 px/s Aufprall (`MIN_DAMAGE_IMPACT_PX_PER_SEC`), damit sanftes Anlehnen an die Ladesäule beim Rückwärtseinparken nichts kostet (Test in `traffic.test.mjs`).
- **Run C** · Das Autobahn-HUD bietet geplante und unterwegs ergänzte Straßenladestopps ab 15 km vor der Ausfahrt zum Auslassen an. Die Live-Prognose muss am nächsten Ziel mindestens 10 % Restakku ergeben. Auslassen und Rückgängig bis zur Ausfahrt stehen im Fahrtprotokoll und ändern die Umplanungszähler nicht. Messe und Übernachtung sind feste Ziele. Geprüft: `npm run typecheck`, `npm run build` (bytegleich beim Wiederholungsbuild), `node --check` für geänderte Skripte und Bundle, `npm test` (67/67) und Versionsprüfung gegen `279202c`. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10). Offen: Spieltest des HUD bei 320/390 px in beiden Themes, da der lokale Browserstart an der Sandbox scheitert. Issue-/PR-Check vom Orchestrator nachgeholt (26.11., gh): Upstream 0 offene Issues/0 offene PRs, Fork 0 offene PRs.
- **Nachtrag Orchestrator 26.11. (direkt, ohne Codex-Lauf)** · Kartenfilter „Ladestationen einblenden/ausblenden“ heißt jetzt „🔌 Alle Ladestationen“ und ist standardmäßig aus (`DEFAULT_SHOW_ALL_CHARGERS`); geplante Stopps bleiben auch im Aus-Zustand sichtbar (`EuropeMapScene.ts`). Commit `f6fd294`, Fork gepusht. Test in `controller.test.mjs`, 68/68.
- **Bestenlisten und Deployment** · Arcade v0.3.1 akzeptiert gewertete Zieleinläufe ab 0 Punkten. Der Worker akzeptiert kürzere Fahrten in Level 2. Der Merge in `upstream/main` deployt den Worker automatisch. Der Airbag-Abbruch erzeugt keine Bestenlisteneinreichung. Keine Anfragen an die Live-API.
- **Geprüft** · `npm run typecheck`, `npm run build` (reproduzierbar), `node --check` für geänderte JS-Dateien und Bundle, `npm test` (61/61), Versionsprüfung gegen `279202c`. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10).
- **Offen** · Spieltest in beiden Themes und Ausrichtungen, insbesondere Strandfinale, Ladebuchten, Schadenstufen und Pylonen. Lokaler Browserstart durch die Sandbox blockiert. Issue-/PR-Check vom Orchestrator nachgeholt (25.11., gh): Upstream 0 offene Issues/PRs, Fork 0 offene PRs.
