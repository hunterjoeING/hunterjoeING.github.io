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
| E-Roadtrip v0.6.0 · Stadtfahrten mit Standblinkern und Fahrspurplatzierung, Level 2 mit Mittagsstart und Montpellier, Level 3 bis Sirmione, Europakarte, freie Ladeplanung und Spieltest-Korrekturen bei Ampeln, Verkehr und Schäden | Michi / Codex CLI · gpt-6.2-sol high · Orchestrator | `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`) · Fork-Stand `4928b42` · kein PR | 🟡 Unveröffentlicht · Fork-Spieltest und Upstream-Merge offen |

**Versionen im Arbeitsstand** · `eroadtrip` v0.6.0 · `arcade` v0.3.1

---

## 2. Session-Log (Neueste Einträge oben)

### 2026-11-26 – Michi / Codex CLI · gpt-6.2-sol high · Orchestrator – v0.6.0 · Standblinker und Fahrspur

- **Branch / PR** · `codex/eroadtrip-v0.6`, Ausgangsstand `4928b42` · SHA: (folgt). Push ausstehend, Ziel ist der Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages für den Spieltest nach dem Push](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · A/D, Pfeile und Touch schalten im Stand den orangefarbenen Blinker vorne und hinten auf der gehaltenen Seite ein (1,5 Hz). Das Restlenken im Stand hatte keine eigene Spielmechanik und entfällt. Der Blinker ändert weder Strafen noch Scoring. Start, Vorschau und Kollisionsversetzen nutzen die Fahrspur in Fahrtrichtung; Linksverkehr über `drivesOnLeft` und das Land am Autohof. Schottland hat noch keine Stadt-Szene (`level_4_scotland_highlands` ist nicht spielbar); die Regel ist per synthetischem Layout und am britischen Autohof Highland Village AC Moffat / Tebay (A74(M), Schottland-Grenze) geprüft. Der Orchestrator hat ein leises SoundFX-Tick, die Preview-Hooks und Bundle-Revision 16 ergänzt.
- **Geprüft** · `npm run typecheck`, `npm run build`, `node --check`, `npm test` (167/167). Browser-Stichproben mit 0 POSTs: `/home/box/projects/shot/blinker-aachen-left.png`, `blinker-aachen-right.png`, `startlane-aachen.png`, `startlane-scotland-moffat.png`. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10). Issue-/PR-Check: 0 offene Issues und PRs in Upstream; Fork-Issues sind deaktiviert; 0 offene Fork-PRs.
- **Offen** · Fork-Spieltest. Kein Upstream-Merge ohne ausdrückliches Go. Punkt 2 (`legacyMaxMinutes`) bleibt offen.

### 2026-11-26 – Michi / Orchestrator – v0.6.0 · Verbrauchsanzeige eine Nachkommastelle

- **Erledigt** · Der Verbrauch auf der Planungs-Etappenkarte (und in Banner, Garage, HUD, Auswertung und Live-Briefing) wird fest mit einer Nachkommastelle und Punkt angezeigt, z. B. `25.7 kWh/100km`. Zentraler Formatter: `formatConsumption()` in `src/ui/DrivingStatus.ts`. Ursache war der ungerundete Wert `legEnergyKwh / edge.distanceKm * 100` auf Gefälle-Etappen. Keine Wh/km-Anzeige vorhanden. Euro (2 Stellen), geladene kWh (1 Stelle) sowie km, Minuten und SoC (ganze Zahlen) waren bereits gerundet. Test in `tests/formatting.test.mjs`. Bundle `rev=15`. Fix vom Orchestrator, ohne Codex.
- **Doku** · `Architecture.md` §3.3 und Tuning-Tabelle. `3d5f243`.

### 2026-11-26 – Michi / Codex CLI · gpt-6.2-sol high · Orchestrator – v0.6.0 · Lokale Anbieter und Preislogik

- **Erledigt** · Autobrennero (3 Säulen) und Neogy (4 Säulen) bleiben in Level 3, mit sichtbarem Filter und Säulen auf jeder Route. Ein Filter erscheint nur noch, wenn das Level eine Säule des Anbieters hat (Level 3 zeigt keinen EWE-Go-Filter mehr). Das Tesla-Abo gilt nur noch an Tesla-Säulen. Anbieter ohne eigenes Abo (Autobrennero, Neogy, Fastned, TotalEnergies, AC-Dorfladen) berechnen den eigenen Ad-hoc-Preis: Autobrennero 0,75, Neogy 0,76 €/kWh an den Schnellladern. Ladezeiten, Referenzpläne (402/504/480 Min.) und Ziel 564 bleiben gleich, nur die Kosten ändern sich. Der Satz „Die vorgeschlagenen Ladestopps kannst du ändern.“ im Level-3-Briefing ist entfernt. Beim Öffnen der Planung steht in allen Levels kein „Eingeplant“.
- **Doku** · `Architecture.md` (Filter, Preislogik, Changelog) ergänzt. Branch `codex/eroadtrip-v0.6`, `036d0ef`.

### 2026-11-26 – Michi / Codex CLI · gpt-6.2-sol high · Orchestrator – v0.6.0 · Level-2-Zeitablauf

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`), Ausgangsstand `d2bddba`. `036d0ef`. Push ausstehend, Ziel ist der Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages für den Spieltest nach dem Push](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · Level 2 startet um 12:00. Die Hotelnacht dauert 16 Stunden (Spa und Frühstücksbuffet), der Rastplatz 14 Stunden. Leere MG4-Hotelpläne: A Lyon 18:24–10:24, Ankunft 13:29 (1529 Min.); Mitte Clermont 18:55–10:55, 13:53 (1553); B Clermont 20:01–12:01, 14:59 (1619). Rastplatz-Ankünfte 11:29, 11:53 und 12:59. Das Level-2-Ziel steigt von 1100 auf 1882 Minuten (112 % des langsamsten geladenen MG4-Referenzplans). Worker `eroadtrip_l2` ist angeglichen, `legacyMaxMinutes` bleibt 40800 (20 × 1882 = 37640). Montpellier bleibt trocken und klar mit früher Nachmittagssonne statt goldener Abendsonne. Keine vorausgewählten Ladestopps.
- **Geprüft** · `npm run typecheck`, `npm run build`, `node --check` für Bundle, Worker und Release-Datei, `npm test` (159/159), `git diff --check`. Codex CLI hat Abfahrt, Pausenlängen, Texte und das Worker-Ziel 1882 gesetzt und ist an der 5-Stunden-Grenze stehengeblieben. Der Orchestrator hat Beleuchtung, Tests, Architecture und Handoff fertiggestellt und die 112-%-Regel sowie `legacyMaxMinutes` 40800 geprüft (20 × 1882 = 37640). Keine Live-Wertungsanfragen. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10). Issue-/PR-Check übersprungen (kein Netz), vom Orchestrator nachzuholen.
- **Offen** · Fork-Spieltest: Planungsuhren bei 390 px, Aachen bei Tageslicht, Montpellier am Nachmittag, Hotel- und Rastplatzdialog. Punkt 2 (`legacyMaxMinutes`) bleibt offen. Commit, Push und Upstream-Merge folgen durch den Orchestrator.

### 2026-11-26 – Michi / Codex CLI · gpt-6.2-sol high – v0.6.0 · Ampeln, Verkehr und Schäden

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`), Ausgangsstand `d2bddba`. `036d0ef`. Push ausstehend, Ziel ist der Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages für den Spieltest nach dem Push](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · Die Ampeln zeigen an jeder Seite die Phase, die für diese Einfahrt gilt, auch bei schräger Zufahrt. Nach dem Kollisionsdialog steht der Wagen auf freier Fahrbahn, blinkt zwei Sekunden und kann sich vom Verkehr lösen. Blockierte Stadtfahrzeuge werden nach 2,5 Sekunden durchlässig. Auf beiden Pässen fährt der Verkehr entlang seiner Spur weiter. Kontakte unter 60 px/s geben nur kurzes Feedback. Kratzer beginnen bei 60, Beulen bei 110 und Airbags bei 200 px/s. Bundle-Revision 13.
- **Geprüft** · `npm run typecheck`, `npm run build`, `node --check` für Bundle, Release-Datei und geänderte Tests, `npm test` (158/158), `git diff --check` und Versionsprüfung gegen `279202c`. Die Tests decken alle mitgelieferten Ampelkreuzungen, Schutzzeit und Verkehrsauflösung in Stadt und Pass sowie die Impaktgrenzen ab. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10). Issue-/PR-Check übersprungen (kein Netz), vom Orchestrator nachzuholen.
- **Offen** · Fork-Spieltest durch den Orchestrator auf Desktop und bei 320/390 px in beiden Themes. Hansemannplatz von der Krefelder Straße bei Grün anfahren, nach einer Kollision im Stau weiterfahren und beim Öffnen der Planung null Ladestopps prüfen. Commit, Push und Upstream-Merge folgen durch den Orchestrator.

Ältere Einträge stehen im [Handoff-Archiv](HANDOFF-archive.md).
