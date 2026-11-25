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
| E-Roadtrip v0.6.0 · Run A und Run B | Michi / Codex (Sol 6.2) | `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`) · `170ca90`, `2950c66` · Fork gepusht, Fork-Pages auf diesem Branch, kein PR | 🟡 Im Fork testbar · Spieltest durch Michi und Upstream-Merge offen |

**Versionen im Arbeitsstand** · `eroadtrip` v0.6.0 · `arcade` v0.3.1

---

## 2. Session-Log (Neueste Einträge oben)

Ältere Einträge stehen im [Handoff-Archiv](HANDOFF-archive.md).

### 2026-11-25 – Michi / Codex (Sol 6.2) – Run A und Run B

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`). Run A: `170ca90`. Run B + Nachtrag: `2950c66`. Push: ja, Fork `mic4rd/hunterjoeING.github.io`. Kein PR, nicht upstream gemergt. Fork-Pages auf diesem Branch, Test-URL: https://mic4rd.github.io/hunterjoeING.github.io/
- **Run A** · Jede freie Ladebucht akzeptiert die rückwärtige Parkposition. Freie Buchten sind grün, belegte rot. Säulen tragen Anbieter-Kürzel. Dialoge dunkeln ab und das Navi zeigt alle verbleibenden Straßen bis zum nächsten Halt. Run A bestand 48/48 Tests.
- **Run B** · Level 2 fährt bis Montpellier und behält die Übernachtung auf der Hinfahrt. Am Ziel folgt ein überspringbares Strandfinale nach Gesamtstress. Der Restakku zieht in jedem Level Punkte ab. Feste Stadt-Hindernisse verursachen drei Stufen Wertverlust. Ein ausgelöster Airbag beendet die Fahrt mit 0 Punkten. Getroffene Pylonen fliegen weg und erhöhen jeweils einmal den Stress. Verkehrsunfälle und die Ladebuchten aus Run A wurden mitgeprüft.
- **Nachtrag Orchestrator (direkt, ohne Codex-Lauf)** · „Etwas essen“ in der Ladepause kostet jetzt 20 € (`EventModal.ts`, vorher kostenlos; Test in `interactions.test.mjs`, Tuning-Tabelle §9). Das 50-€-Messe-Essen (`main.ts`) ist eine eigene Entscheidung und bleibt.
- **Bestenlisten und Deployment** · Arcade v0.3.1 akzeptiert gewertete Zieleinläufe ab 0 Punkten. Der Worker akzeptiert kürzere Fahrten in Level 2. Der Merge in `upstream/main` deployt den Worker automatisch. Der Airbag-Abbruch erzeugt keine Bestenlisteneinreichung. Keine Anfragen an die Live-API.
- **Geprüft** · `npm run typecheck`, `npm run build` (reproduzierbar), `node --check` für geänderte JS-Dateien und Bundle, `npm test` (61/61), Versionsprüfung gegen `279202c`. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10).
- **Offen** · Spieltest in beiden Themes und Ausrichtungen, insbesondere Strandfinale, Ladebuchten, Schadenstufen und Pylonen. Lokaler Browserstart durch die Sandbox blockiert. Issue-/PR-Check vom Orchestrator nachgeholt (25.11., gh): Upstream 0 offene Issues/PRs, Fork 0 offene PRs.

### 2026-11-25 – Michael / Website Wolfgang (Orchestrator, direkt, ohne Codex-Lauf) – Go-live Versionierung und Level-Bestenlisten

- **Branch / PR** · Drei Upstream-PRs aus dem Fork, jeweils mit Merge-Commit: [#6](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/6) `codex/arcade-versioning` (Merge `f58b077`, 12:50 Uhr Berlin), [#7](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/7) `codex/arcade-leaderboard-groups` (Merge `116a458`, 12:53 Uhr), [#8](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/8) `codex/eroadtrip-highscores` (Merge `ca2c357`, 12:56 Uhr). Vor #7 und #8 wurde jeweils `upstream/main` per Merge-Commit eingeholt (`ddedcb3`, `26e2e56`). Diese Doku per Folge-PR `[no-release]` (Branch `codex/docs-golive-2026-11-25`).
- **Erledigt** · Live: Arcade v0.3.0, e-Roadtrip v0.5.0. Workflows grün: `check-versioning` (#6, #7, #8), „Rebuild e-Roadtrip bundle“ (`f58b077`, `ca2c357`, kein Bot-Commit nötig), „Deploy Cloudflare Worker“ (`116a458`), Pages-Deploy für alle drei Merges.
- **Geprüft** · Worker: `/api/health` ok, DB verbunden; `GET /api/scores` für `eroadtrip`, `eroadtrip_l1`, `eroadtrip_l2` liefert die neuen Titel „e-Roadtrip: Pixel Europe · Level …“ (0 Einträge); `podracer` weiter 24 Einträge; `/api/summary` unverändert (25 Records, 267 Plays). Kein POST an die Live-API. Live-Seite (curl + Headless-Chrome): Karte „e-Roadtrip: Pixel Europe“, Tag „Strategie - Action“, Pille „Neues Update v0.5“, Changelogs-Link in Footer und Menü, `/changelogs.html` mit „Person · Modell“, Spielseite zeigt v0.5.0, Live-Bundle identisch mit `main` (SHA-256), kein „GTA“ in nutzersichtbaren Texten. Lokal vor #8: typecheck, build, `node --check`, `npm test` 42/42.
- **Offen** · Handy-Test durch Michael; erster echter Score nach dem Go-live steht noch aus. Fork-Pages bleiben auf `codex/eroadtrip-highscores`. Issue-/PR-Check (25.11., gh): Upstream nach dem Merge keine offenen PRs außer diesem Doku-PR.

### 2026-11-25 – Michael / Codex CLI (gpt-6.2-sol high) – E-Roadtrip Level-Bestenlisten (Teil b)

- **Branch / PR** · `codex/eroadtrip-highscores` auf `codex/arcade-leaderboard-groups` (`f30054a`). Commits `888b032`, `4d6303b`. Push: ja, Fork `mic4rd/hunterjoeING.github.io`. Kein PR. Test-URL: https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/index.html (Fork-Pages auf diesem Branch).
- **Erledigt** · E-Roadtrip v0.5.0: kaputten Aufruf `ArcadeScores.submit` (existiert nicht, daher nie Scores) ersetzt durch `src/sim/Leaderboard.ts`. Abgeschlossene Fahrten (nur aus `finishLevel()`, einmal pro Run-ID) gehen an das Levelboard (`eroadtrip_l1`/`eroadtrip_l2`, `boardId` in `levels.ts`) und an `eroadtrip` (Gesamt, eigene Run-ID). Ergebnis-Screen mit Top 10, Platz und „Name ändern“; Topbar-Knopf „🏆 Bestenliste“ mit Level-Tabs. Echte Einreichung nur auf `hunterjoeing.github.io`; Fork, lokal und `?lbdebug=1` laufen im Testmodus (dryRun, nur `console.info`). Version per esbuild-`define` aus `package.json`. Release-Eintrag v0.5.0 nach Regel 10 geprüft.
- **Geprüft** · `npm run typecheck`, `npm run build`, `node --check` für Bundle, Worker und Shared-Skripte, `npm test` (40/40), Headless-Chrome-Check durch den Orchestrator bei 390/320 px hell/dunkel: Fork-Seite v0.5.0, Topbar-Knopf sichtbar, Dialog mit Tabs Level 1/Level 2/Gesamt (Live-GET), Ergebnis-Panel im Testmodus (lokaler Harness, Top 10 mit gemockten Daten, Namen escaped, eigener Eintrag hervorgehoben), kein horizontales Scrollen, keine JS-Fehler. Danach Rang-Spalte bei 320 px korrigiert (`#`, nowrap) und doppelten Testmodus-Hinweis entfernt. Alle POSTs abgefangen: 0 POSTs an die Live-API.
- **Offen** · Handy-Test durch Michael. Issue-/PR-Check vom Orchestrator nachgeholt (25.11., gh): Upstream 0 offene Issues/PRs, Fork 0 offene PRs.
- **Merge-Reihenfolge** · `codex/arcade-versioning` → `codex/arcade-leaderboard-groups` (Teil a, Worker deployt beim Merge automatisch – Joe vorher informieren) → `codex/eroadtrip-highscores` (Teil b).

### 2026-11-25 – Michael / Website Wolfgang (Orchestrator, direkt, ohne Codex-Lauf)
- **Branch / PR** · `codex/arcade-versioning`, SHA `22d69b2`, gepusht in den Fork, kein PR. Danach per Merge-Commit in `codex/arcade-leaderboard-groups` (`cbf620d`) und `codex/eroadtrip-highscores` (`a909a1d`) übernommen; dort `author`/`model` für Arcade v0.3.0 und E-Roadtrip v0.5.0 ergänzt (Michi · Sol 6.2). Tests: 25/25, 33/33, 41/41.
- **Erledigt** · Jeder Release-Eintrag hat `author` und optional `model` („Michi · Sol 6.2“, „Michi · Grok 4.7“, „Joe“), angezeigt auf `changelogs.html` und im Update-Dialog. Werkzeugnamen werden nie angezeigt (Regel 10 und Test). Die Arcade zeigt ausdrücklich nie ein Banner. Link „📝 Changelogs“ unten im Burger-Menü neben Impressum und Datenschutz; Changelogs-Seite hat den Link auch im eigenen Footer. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10).
- **Name (Spiel)** · `codex/eroadtrip-highscores`: Seitentitel, Meta-Beschreibung, Topbar „e-Roadtrip: Pixel Europe“, Stadtfahrt-Hinweis im HUD und Unfall-Dialog ohne „GTA“; Stichpunkt in e-Roadtrip v0.5.0.
- **Name** · Offizieller Name „e-Roadtrip: Pixel Europe“, Kartentag „Strategie - Action“, kein „GTA“ in nutzersichtbaren Texten (Regel 10, Test). Hub-Karte, Menü und Release-Texte hier; `arcade.js`/Worker-Namen in `codex/arcade-leaderboard-groups`, Spieltexte in `codex/eroadtrip-highscores` (in Arcade v0.2.0 bzw. e-Roadtrip v0.5.0 enthalten, keine neue Version).
- **Joe-Einträge** · Laut Michi (25.11.) hat Joe bisher immer Hydrogen genutzt. Alle Joe-Einträge (auch `quiz_golf`) zeigen daher „Joe · Hydrogen“.
- **Geprüft** · `npm run typecheck`, `npm run build`, `node --check dist/e-roadtrip.js`, `npm test` (25/25 auf `codex/arcade-versioning`), `node --check` auf `shared/*.js`; Headless-Chrome-Test von Changelog-Seite, Dialog und Burger-Menü. Issue-/PR-Check: Upstream und Fork ohne offene Issues/PRs.

### 2026-11-25 – Michael / Codex CLI (gpt-6.2-sol high)

- **Branch / PR** · `codex/arcade-leaderboard-groups` auf `codex/arcade-versioning` (`749bda1`). Commits `0c85929`, Nachtrag Namensänderung `60547a8`. Push: ja, Fork `mic4rd/hunterjoeING.github.io`. Kein PR. Test-URL über Teil (b): https://mic4rd.github.io/hunterjoeING.github.io/ (Fork-Pages auf `codex/eroadtrip-highscores`). Worker zusätzlich lokal mit `wrangler dev --local` geprüft (400 bei ungültigen E-Roadtrip-Scores, andere Spiele unverändert); kein Deploy, kein POST an die Live-API.
- **Erledigt** · Der Worker kennt beide E-Roadtrip-Levelboards und prüft Einreichungen für diese und die Gesamtbestenliste. Die gemeinsame Bestenliste zeigt Level 1, Level 2 und Gesamt. Die Hub-Karte zeigt globale Level-Bestwerte. `record()` liefert den bisherigen Boolean und meldet den POST-Ausgang per Event und Callback. Der Dry-Run protokolliert den Payload und speichert den lokalen Bestwert. Version/Release-Eintrag geprüft (`shared/releases.js`, Regel 10).
- **Geprüft** · `node --check` für Worker, Shared-Skripte, Testdateien und Bundle, Syntax der Hub-Inline-Skripte, `npm run typecheck`, `npm run build` (Bundle bytegleich), `npm test` (32/32 nach Nachtrag) und Release-Bump für `arcade` im Arbeitsbaum gegen `749bda1`. Hub-Bestwerte, Tabs, Refresh und Escape mit lokalen Stubs geprüft.
- **Nachtrag** · `setPlayerName(name, { dryRun, onSave })` / `openPlayerNameModal(onSave, { dryRun })`: `onSave` läuft erst nach dem Nachsende-POST des letzten Scores; `dryRun` unterdrückt diesen POST (Testmodus im Fork). Bestehende Aufrufer bleiben kompatibel. Teil der Arcade v0.3.0.
- **Offen** · Spielanbindung in Teil (b) und Browserprüfung bei 320 px in beiden Themes (Chrome-Start in der Sandbox blockiert). Issue-/PR-Check vom Orchestrator nachgeholt (25.11., gh): Upstream 0 offene Issues, 0 offene PRs; Fork 0 offene PRs.
- **Deployment** · Der Merge in Joes `main` deployt den Worker automatisch. Joe vor dem Merge informieren. In dieser Session gab es keinen Deploy und keine Anfrage an die Live-API.
