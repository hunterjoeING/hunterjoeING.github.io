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
| E-Roadtrip Review-Fixes 1–20 + Doku | Michael / Codex CLI · gpt-6.2-sol high | `codex/review-fixes` (`022a699`, `2b01e5a`, `f7abd66`, `006a1bf`, `85af6f7`) · [Upstream-PR #4](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/4) (Merge `29fd861`) | ✅ Gemerged und live auf https://hunterjoeing.github.io/games/e-roadtrip/ |
| Arcade-Versionierung, Update-Hinweise und Changelogs | Michael / Codex CLI · gpt-6.2-sol high | `codex/arcade-versioning` · [Upstream-PR #6](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/6) (Merge `f58b077`) | ✅ Gemerged und live (Arcade v0.2.0) |
| Arcade: Level-Bestenlisten (Teil a: Worker + arcade.js + Hub) | Michael / Codex CLI · gpt-6.2-sol high | `codex/arcade-leaderboard-groups` · [Upstream-PR #7](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/7) (Merge `116a458`) | ✅ Gemerged, Worker deployt und live (Arcade v0.3.0) |
| E-Roadtrip v0.5.0: Level-Bestenlisten (Teil b) | Michael / Codex CLI · gpt-6.2-sol high | `codex/eroadtrip-highscores` · [Upstream-PR #8](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/8) (Merge `ca2c357`) | ✅ Gemerged und live (e-Roadtrip v0.5.0) |
| 3D-Explainer: Windkraftanlage 3D & Verbrennungsmotor 3D | Joe / Antigravity · Neon high | `main` (`8c0fce8` + Patch `v0.1.1`, Push auf Upstream `main`, kein PR) | ✅ Abgeschlossen (Arcade v0.4.0, Windkraftanlage v0.1.1, Verbrennungsmotor v0.1.1) |
| E-Roadtrip v0.6.0 · Stadtfahrten mit Standblinkern und Fahrspurplatzierung, Level 2 mit Mittagsstart und Montpellier, Level 3 bis Sirmione, Europakarte, freie Ladeplanung und Spieltest-Korrekturen bei Ampeln, Verkehr und Schäden | Michi / Codex CLI · gpt-6.2-sol high · Orchestrator | `codex/eroadtrip-v0.6` (`0ddbc5e`, Upstream-Merge `5e751d6`) · [Upstream-PR #10](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/10) (Merge `2aebc51`) | ✅ Gemerged, Worker deployt und live (e-Roadtrip v0.6.0, Arcade v0.4.1) |
| Verbrennungsmotor 3D v0.2.0 · Gaspedal, lastabhängige Telemetrie, Muschelkurve und gekoppelte Voreinstellungen | Michi / Codex CLI · gpt-6.2-sol high | `codex/combustion-load-map` ab `upstream/main` (`a70eacc`) · Fork-Stand `cf28b8d` (+ Doku-Commit) · kein PR · [Fork-Test](https://mic4rd.github.io/hunterjoeING.github.io/games/combustion-engine/) | 🟡 Fork-Test läuft, Upstream-Merge wartet auf Michis Go und Joes Ansicht |

**Aktuelle Versionen** · `eroadtrip` v0.6.0 · `arcade` v0.4.1 · `wind_turbine` v0.1.1 · `combustion_engine` v0.1.1

---

## 2. Session-Log (Neueste Einträge oben)

### 2026-11-27 – Michi / Codex CLI · gpt-6.2-sol high – Verbrennungsmotor 3D v0.2.0

- **Branch / PR** · `codex/combustion-load-map` ab `upstream/main` (`a70eacc`), Commit `cf28b8d`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`, kein PR. Fork-Pages (Quelle auf diesen Branch umgestellt): https://mic4rd.github.io/hunterjoeING.github.io/games/combustion-engine/
- **Erledigt** · Gaspedal, lastabhängiges Nutzmoment und Beispielkennfeld für Wirkungsgrad und spezifischen Verbrauch. Die Muschelkurve zeigt den verschiebbaren Betriebspunkt, sechs Isolinien, die Volllastgrenze und den Fahrwiderstand. Das Prüfstandsdiagramm zeigt weiterhin Volllast. Voreinstellungen und Tour setzen Drehzahl und Last gemeinsam.
- **Geprüft** · `node --check` für Daten-, UI-, Modell-, Release- und Testdatei, HTML-Tags, Label-Verweise, JSON-LD, Importmap, Inline-JavaScript und `git diff --check`. Alle 8 Kennfeldtests bestanden mit Dateiglob und `--test-isolation=none`. Node 24 behandelt das direkt übergebene Testverzeichnis als Einstiegspunkt und beendet den Verzeichnisaufruf mit `MODULE_NOT_FOUND`. `node scripts/check-release-bump.mjs upstream/main` lief ohne releasepflichtigen Commit-Diff. Die ergänzende Prüfung desselben Skripts gegen den Arbeitsbaum bestätigt `combustion_engine`. E-Roadtrip: `npm run typecheck`, `npm run build`, `node --check dist/e-roadtrip.js`, `npm test` (167/167), Bundle bytegleich.
- **Diagramme** · Volllastmoment und Leistung bei 7.101 Drehzahlen exakt wie auf `upstream/main`. SVG-Erzeugung, Lastwechsel, Marker und Diagrammsteuerung mit simulierten Pointer-Events geprüft.
- **GitHub** · Issue-/PR-Check (Orchestrator, 27.11., gh): Upstream 0 offene Issues und PRs, Fork 0 offene PRs.
- **Orchestrator** · Seitentitel und `og:title` wieder auf „Verbrennungsmotor 3D – Interaktiver Explainer“ gesetzt, Beschreibung um Gaspedal und Muschelkurve ergänzt. Headless-Chrome-Test lokal und auf Fork-Pages (1280, 390 und 320 px, hell und dunkel, alle vier Voreinstellungen, Regler 2800 U/min / 85 %): keine JS-Fehler, kein horizontales Scrollen, 0 POSTs. Screenshots `/home/box/projects/shot/ce-map-*.png`.
- **Offen** · Fork-Test durch Michi. Joe sieht den Stand vor einem Upstream-PR. Kein Upstream-PR ohne Michis ausdrückliches Go. Die Voreinstellung „Max kW“ (6.200 U/min) liegt über dem Leistungsmaximum der bestehenden Volllastkurve (135 kW bei ca. 5.550 U/min, 128 kW bei 6.200); bewusst unverändert.
- Version/Release-Eintrag geprüft (shared/releases.js, Regel 10)

### 2026-11-26 – Michi / Orchestrator (direkt, ohne Codex-Lauf) – Go-live e-Roadtrip v0.6.0

- **Branch / PR** · `upstream/main` (`0e73752`, Joes 3D-Explainer und Arcade v0.4.0) per Merge-Commit `5e751d6` in `codex/eroadtrip-v0.6` eingeholt, dann [Upstream-PR #10](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/10) aus dem Fork, gemergt von `mic4rd` (Merge `2aebc51`, 23:33 Uhr Berlin). Diese Doku per Folge-PR `[no-release]` (Branch `codex/docs-golive-2026-11-26`).
- **Konflikte** · `shared/releases.js`: Unser Arcade-Patch (vorher v0.3.1) ist jetzt v0.4.1 über Joes v0.4.0; Joes Einträge für Arcade, Windkraftanlage und Verbrennungsmotor bleiben unverändert. `index.html`: `arcade.js`/`releases.js` auf `?v=0.4.1`, `update-banner.js` auf Joes `?v=0.4.0`; `changelogs.html` und die e-Roadtrip-Seite ebenfalls auf `arcade.js?v=0.4.1`. `HANDOFF.md`: Joes Statuszeile und Session-Eintrag übernommen, ein doppelter Archiv-Eintrag entfernt.
- **Geprüft** · Vor dem Merge `npm run typecheck`, `npm run build` (Bundle bytegleich, rev 16), `node --check dist/e-roadtrip.js`, `npm test` (167/167), `node scripts/check-release-bump.mjs upstream/main` (arcade, eroadtrip). Workflows auf `2aebc51` grün: `check-versioning` (PR #10), „Rebuild e-Roadtrip bundle“ (kein Bot-Commit), „Deploy Cloudflare Worker“, „pages build and deployment“. Worker: `/api/health` ok, DB verbunden; `GET /api/scores` liefert für `eroadtrip_l3` den neuen Titel „Level 3: Winter-Alpenüberquerung“. Die Levelziele L2 1882 und L3 564 stehen im deployten Stand von `cloudflare-worker/worker.js`; der Worker hat dafür keinen GET-Endpunkt. Live-Seite zeigt v0.6.0, den Hinweis „Neues Update v0.6“ auf der Hub-Karte und den Changelog „Winterfahrt an den Gardasee“ (Michi · Sol 6.2). Headless-Chrome-Stichprobe L1–L3 (Planung und Start), Aachen-Vorschau und 390 px ohne JS-Fehler, 0 POSTs (alle abgefangen).
- **Offen** · Handy-Test durch Michi. Punkt 2 (`legacyMaxMinutes` in L2) bleibt offen. Issue-/PR-Check (26.11., gh): Upstream 0 offene Issues und PRs, Fork 0 offene PRs.

### 2026-11-26 – Michi / Codex CLI · gpt-6.2-sol high · Orchestrator – v0.6.0 · Standblinker und Fahrspur

- **Branch / PR** · `codex/eroadtrip-v0.6`, Ausgangsstand `4928b42` · `c1d1f29`. Gepusht auf den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Testseite](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · A/D, Pfeile und Touch schalten im Stand den orangefarbenen Blinker vorne und hinten auf der gehaltenen Seite ein (1,5 Hz). Das Restlenken im Stand hatte keine eigene Spielmechanik und entfällt. Der Blinker ändert weder Strafen noch Scoring. Start, Vorschau und Kollisionsversetzen nutzen die Fahrspur in Fahrtrichtung; Linksverkehr über `drivesOnLeft` und das Land am Autohof. Schottland hat noch keine Stadt-Szene (`level_4_scotland_highlands` ist nicht spielbar); die Regel ist per synthetischem Layout und am britischen Autohof Highland Village AC Moffat / Tebay (A74(M), Schottland-Grenze) geprüft. Der Orchestrator hat ein leises SoundFX-Tick, die Preview-Hooks und Bundle-Revision 16 ergänzt.
- **Geprüft** · `npm run typecheck`, `npm run build`, `node --check`, `npm test` (167/167). Browser-Stichproben mit 0 POSTs: `/home/box/projects/shot/blinker-aachen-left.png`, `blinker-aachen-right.png`, `startlane-aachen.png`, `startlane-scotland-moffat.png`. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10). Issue-/PR-Check: 0 offene Issues und PRs in Upstream; Fork-Issues sind deaktiviert; 0 offene Fork-PRs.
- **Offen** · Fork-Spieltest. Kein Upstream-Merge ohne ausdrückliches Go. Punkt 2 (`legacyMaxMinutes`) bleibt offen.

### 2026-11-26 – Michi / Orchestrator – v0.6.0 · Verbrauchsanzeige eine Nachkommastelle

- **Erledigt** · Der Verbrauch auf der Planungs-Etappenkarte (und in Banner, Garage, HUD, Auswertung und Live-Briefing) wird fest mit einer Nachkommastelle und Punkt angezeigt, z. B. `25.7 kWh/100km`. Zentraler Formatter: `formatConsumption()` in `src/ui/DrivingStatus.ts`. Ursache war der ungerundete Wert `legEnergyKwh / edge.distanceKm * 100` auf Gefälle-Etappen. Keine Wh/km-Anzeige vorhanden. Euro (2 Stellen), geladene kWh (1 Stelle) sowie km, Minuten und SoC (ganze Zahlen) waren bereits gerundet. Test in `tests/formatting.test.mjs`. Bundle `rev=15`. Fix vom Orchestrator, ohne Codex.
- **Doku** · `Architecture.md` §3.3 und Tuning-Tabelle. `3d5f243`.

### 2026-11-26 – Michi / Codex CLI · gpt-6.2-sol high · Orchestrator – v0.6.0 · Lokale Anbieter und Preislogik

- **Erledigt** · Autobrennero (3 Säulen) und Neogy (4 Säulen) bleiben in Level 3, mit sichtbarem Filter und Säulen auf jeder Route. Ein Filter erscheint nur noch, wenn das Level eine Säule des Anbieters hat (Level 3 zeigt keinen EWE-Go-Filter mehr). Das Tesla-Abo gilt nur noch an Tesla-Säulen. Anbieter ohne eigenes Abo (Autobrennero, Neogy, Fastned, TotalEnergies, AC-Dorfladen) berechnen den eigenen Ad-hoc-Preis: Autobrennero 0,75, Neogy 0,76 €/kWh an den Schnellladern. Ladezeiten, Referenzpläne (402/504/480 Min.) und Ziel 564 bleiben gleich, nur die Kosten ändern sich. Der Satz „Die vorgeschlagenen Ladestopps kannst du ändern.“ im Level-3-Briefing ist entfernt. Beim Öffnen der Planung steht in allen Levels kein „Eingeplant“.
- **Doku** · `Architecture.md` (Filter, Preislogik, Changelog) ergänzt. Branch `codex/eroadtrip-v0.6`, `036d0ef`.

Ältere Einträge stehen im [Handoff-Archiv](HANDOFF-archive.md).
