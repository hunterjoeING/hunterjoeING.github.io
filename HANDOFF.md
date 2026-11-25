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
| Arcade-Versionierung, Update-Hinweise und Changelogs | Michael / Codex CLI (gpt-6.2-sol high) | `codex/arcade-versioning` (`fc3ad9b`) · Fork · kein PR | 🟡 Test auf Fork-Pages |
| Arcade: Level-Bestenlisten (Teil a: Worker + arcade.js + Hub) | Michael / Codex CLI (gpt-6.2-sol high) | `codex/arcade-leaderboard-groups` (`0c85929`) · Fork · kein PR | 🟡 Teil (a) geprüft; Worker lokal mit `wrangler dev` getestet, nicht deployt |

**Aktuelle Versionen** · `eroadtrip` v0.4.0 · `arcade` v0.3.0

---

## 2. Session-Log (Neueste Einträge oben)

Ältere Einträge stehen im [Handoff-Archiv](HANDOFF-archive.md).

### 2026-11-25 – Michael / Codex CLI (gpt-6.2-sol high)

- **Branch / PR** · `codex/arcade-leaderboard-groups` auf `codex/arcade-versioning` (`749bda1`). Commits `0c85929`, Nachtrag Namensänderung `60547a8`. Push: ja, Fork `mic4rd/hunterjoeING.github.io`. Kein PR. Test-URL über Teil (b): https://mic4rd.github.io/hunterjoeING.github.io/ (Fork-Pages auf `codex/eroadtrip-highscores`). Worker zusätzlich lokal mit `wrangler dev --local` geprüft (400 bei ungültigen E-Roadtrip-Scores, andere Spiele unverändert); kein Deploy, kein POST an die Live-API.
- **Erledigt** · Der Worker kennt beide E-Roadtrip-Levelboards und prüft Einreichungen für diese und die Gesamtbestenliste. Die gemeinsame Bestenliste zeigt Level 1, Level 2 und Gesamt. Die Hub-Karte zeigt globale Level-Bestwerte. `record()` liefert den bisherigen Boolean und meldet den POST-Ausgang per Event und Callback. Der Dry-Run protokolliert den Payload und speichert den lokalen Bestwert. Version/Release-Eintrag geprüft (`shared/releases.js`, Regel 10).
- **Geprüft** · `node --check` für Worker, Shared-Skripte, Testdateien und Bundle, Syntax der Hub-Inline-Skripte, `npm run typecheck`, `npm run build` (Bundle bytegleich), `npm test` (32/32 nach Nachtrag) und Release-Bump für `arcade` im Arbeitsbaum gegen `749bda1`. Hub-Bestwerte, Tabs, Refresh und Escape mit lokalen Stubs geprüft.
- **Nachtrag** · `setPlayerName(name, { dryRun, onSave })` / `openPlayerNameModal(onSave, { dryRun })`: `onSave` läuft erst nach dem Nachsende-POST des letzten Scores; `dryRun` unterdrückt diesen POST (Testmodus im Fork). Bestehende Aufrufer bleiben kompatibel. Teil der Arcade v0.3.0.
- **Offen** · Spielanbindung in Teil (b) und Browserprüfung bei 320 px in beiden Themes (Chrome-Start in der Sandbox blockiert). Issue-/PR-Check vom Orchestrator nachgeholt (25.11., gh): Upstream 0 offene Issues, 0 offene PRs; Fork 0 offene PRs.
- **Deployment** · Der Merge in Joes `main` deployt den Worker automatisch. Joe vor dem Merge informieren. In dieser Session gab es keinen Deploy und keine Anfrage an die Live-API.

### 2026-11-25 – Michael / Codex CLI (gpt-6.2-sol high)
- **Branch / PR** · `codex/arcade-versioning` auf Basis von `upstream/main` (`039ed15`). Commits `fc3ad9b` + Doku-Nachtrag. Gepusht in den Fork `mic4rd/hunterjoeING.github.io`, kein PR. [Fork-Test Übersicht](https://mic4rd.github.io/hunterjoeING.github.io/) · [Changelogs](https://mic4rd.github.io/hunterjoeING.github.io/changelogs.html)
- **Erledigt** · Öffentlicher Release-Katalog für Arcade, 10 Spiele und 28 Quizze, Update-Pille mit Gelesen-Status, Changelog-Dialog und filterbare Übersicht. E-Roadtrip zeigt v0.4.0 im Spiel. Regel 10 und PR-Workflow ergänzen die Versionsprüfung. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10).
- **Geprüft** · `npm run typecheck`, `npm run build`, `node --check dist/e-roadtrip.js`, `npm test` (24/24), Syntax der JS-Dateien und Inline-Skripte, Sitemap und Workflow-YAML. Release-Bump auf `upstream/main` (Bootstrap) sowie mit Testdaten für fehlenden und vorhandenen Versionsanstieg, Dateiausnahmen und beide PR-Ausnahmen geprüft. Banner und Dialog mit DOM-Stubs geprüft.
- **Offen** · Browser-/Touch-Test bei 320 und 390 px in beiden Themes. Chrome-Start in der Sandbox blockiert. Headless-Chrome-Test durch den Orchestrator (390/320 px, hell/dunkel: Pille, Dialog, Esc/Backdrop, blauer Punkt, Filter, E-Roadtrip-Versionsknopf) ohne JS-Fehler; echter Handy-Test durch Michael offen. Issue-/PR-Check vom Orchestrator nachgeholt: Upstream keine offenen Issues/PRs, Fork keine offenen PRs (Issues deaktiviert).

### 2026-11-25 – Michael / Codex CLI (gpt-6.2-sol high)
- **Branch / Push:** `codex/review-fixes` zum Fork `mic4rd/hunterjoeING.github.io` gepusht (Stand `85af6f7`). Über [Upstream-PR #4](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/4) gemergt (`29fd861`). [Fork-Pages-Test](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/index.html)
- **Commits:** `022a699` (Review 1–4, 16: Ladeplanung, Messe-AC, Maut, Umplanung und Tesla-Tarife), `2b01e5a` (5–8: Kollisionen, Stadt-/Autohof- und Autobahnverkehr, Reichweitenband), `f7abd66` (9–15, 17–20: Rückwärtsparken, Bremsvorrang, Lichthupe, Abschnittslimits, Fahrtgrenzen, Hotel-AC, Lade- und Pausenabrechnung, mobiles HUD und Temporegler).
- **Geprüft in den drei Review-Runden:** Typecheck, Build, Bundle-Syntax und lokale Regressionen mit Phaser- und DOM-Stubs, darunter beide Messe-Belegungsfälle, Eschweiler auf der Rückfahrt, Maut nach dem Hotel-Dialog und das Reichweitenband nach Herford. Der Chrome-Start war in der Sandbox blockiert.
- **Offen:** Michael prüft Browser und Touch bei 320 und 390 px. Optionale Gameplay-Ideen bleiben offen. Die Fork-PRs #2–#6 sind am 25.11. geschlossen (Inhalt über Upstream-PR #3).
- **Doku-Session auf demselben Branch:**
  - Commit `006a1bf` (vom Orchestrator committet und zum Fork gepusht). Weiterhin kein Upstream-PR.
  - Handoff und Architektur korrigiert, ältere Sessions archiviert, AGENTS.md präzisiert, Regressionstests und CI-Schritt ergänzt sowie den Feedback-Titel auf „E-Roadtrip“ geändert.
  - Geprüft mit `npm run typecheck`, `npm run build`, `node --check dist/e-roadtrip.js`, `npm test` (20/20) und `node --check shared/arcade.js`.
  - Regel 7: Upstream hat keine offenen Issues, PRs #1–#3 sind gemergt. Fork-PRs #2–#6 sind noch offen, ihre Branch-Spitzen liegen laut lokaler Git-Historie in Upstream-PR #3. Issue-/PR-Check vom Orchestrator nachgeholt (25.11., gh): Upstream 0 offene Issues, 0 offene PRs; Fork hat Issues deaktiviert, Fork-PRs #2–#6 offen.

### 2026-11-25 – Upstream-Merge E-Roadtrip
- Um 10:23 Uhr (Berlin) wurde [Upstream-PR #4](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/4) von `mic4rd:codex/review-fixes` nach `main` gemergt (Merge-Commit `29fd861`, Review-Fixes 1–20, Doku, Tests). Rebuild-Workflow inkl. `npm test` (20/20) und Pages-Deploy erfolgreich; Bundle unverändert, live auf https://hunterjoeing.github.io/games/e-roadtrip/ geprüft. Diese Handoff-Aktualisierung kommt per Folge-PR (Branch `docs/handoff-pr4`).
- Um 00:09 Uhr (Berlin) wurde [Upstream-PR #3](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/3) von `cursor/eroadtrip-touch-level2-5df0` nach `main` gemergt (Merge-Commit `826fb33`). Der Merge enthält die Arbeit aus den Fork-PRs #2–#6.

### 2026-11-24 – Michael / Cursor Cloud Agent (Soleil raus, Messe, AC, Autohof)
- **Erledigt:**
  - Gleicher Branch und [PR #6](https://github.com/mic4rd/hunterjoeING.github.io/pull/6). Kein zweiter PR.
  - Level 2 ohne Autoroute du Soleil. Entfernt: `edge_aachen_bruessel`, `edge_bruessel_lille`, `edge_lille_paris`, `edge_paris_lyon` und deren Lader. Luxemburg/Lyon, Reims/Nevers und Paris/Clermont bleiben.
  - Hannover Messe hat einen eigenen Besuchsbildschirm: AC optional (6 Punkte, 50 % frei), Essen −50 €, Toilette automatisch, einer von 10 Berichten, etwa 4 Stunden.
  - Fastned- und TotalEnergies-Parks auf Level 2 ersetzt durch IONITY Beaune, Tesla Orange, ENGIE Vianeo Vierzon und Atlante Béziers. Filter zeigt diese Anbieter, nicht Fastned/Total.
  - AC-Leistung je Auto (`acMaxKw`). Ladeleistung an AC = min(Säule, Auto). Bildschirm sagt „AC-Laden“.
  - Autohof-KI fährt ein, wartet an einer freien Säule und fährt über die Autobahn wieder raus. NPCs bremsen vor dem Auto davor, auch vor dem Spieler.
- **Offen / Nächste Schritte:**
  - PR #6 bleibt gegen `cursor/eroadtrip-package-d-79e6` offen.
  - Level 3–7 bleiben `playable: false`.
