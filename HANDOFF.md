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
| E-Roadtrip v0.6.0 · L1-Verbesserungen, L2 mit Montpellier, Level 3, Stadtkarten, Nachtstart und Abendsonne, Spieltest-Korrekturen, Europakarte | Michi / Codex CLI · gpt-6.2-sol high · Orchestrator | `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`) · Fork-Stand `dab304f` · kein PR | 🟡 Unveröffentlicht · Europakarte geprüft · Fork-Spieltest und Upstream-Merge offen |

**Versionen im Arbeitsstand** · `eroadtrip` v0.6.0 · `arcade` v0.3.1

---

## 2. Session-Log (Neueste Einträge oben)

### 2026-11-26 – Michi / Codex CLI · gpt-6.2-sol high – v0.6.0 · Europakarte

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`), Ausgangsstand `eede53a`. SHA `dab304f`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages-Test](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · Natural-Earth-Karte von Island und Gibraltar bis zum Schwarzen Meer und Ural. Planungs- und Live-Karte, Europa-Ansicht, Routen und Ladestationsmarker nutzen dieselbe Projektion. Stadtbeschriftungen weichen einander bei Zoom und Verschieben aus. Die North Coast 500 ist als Rundkurs eingezeichnet. Die Quelldaten der Stopps sind erhalten. Fünf küstennahe Kartenanker liegen leicht landeinwärts. Bundle-Revision 11.
- **Geprüft** · `npm run typecheck`, `npm run build`, `node --check` für Bundle, Release-Datei, Generator und geänderte Tests, `npm test` (142/142), reproduzierbare Geodaten und Bundle, `git diff --check` und Versionsprüfung gegen `279202c`. Alle neun Fahrprognosen für Level 1–3 stimmen mit `eede53a` überein, einschließlich Distanz, Zeit, Maut und Energie. Karten- und Label-Tests laufen offline. Die Geodatei misst 80.748 Bytes, das Bundle 3.077.865 Bytes (gzip 802.863 Bytes). Version/Release-Eintrag geprüft (shared/releases.js, Regel 10). Issue-/PR-Check: 0 offen. Orchestrator: Browser-Screenshots der Planungskarte (Level 1–3, 1280 und 390 px) und Schottland mit der North Coast 500 (1280 px) geprüft.
- **Offen** · Spieltest der Karte auf dem Fork, insbesondere Schottland bei 390 px und beide Themes. Upstream-Merge nach Freigabe.

### 2026-11-26 – Michi / Codex CLI · gpt-6.2-sol high – v0.6.0 · Korrekturen aus dem Spieltest

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`). SHA `1ae937d`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · Stadt-HUD aktualisiert Stress und Bedürfnisse bei Sachschäden und beim ersten Treffer pro Pylon. Airbag-Abbruch zeigt den Hinweis, 0 Punkte, Kosten und Fahrtbuch. Detailbalken und Restakku-Abzug stehen bei gewerteten Zieleinläufen. „H hupen“ bleibt beim Umbruch zusammen. Das Köln-Label sitzt neben seinem Kartenpunkt. Bundle-Revision 10 lädt den neuen Stand.
- **Geprüft** · `npm run typecheck`, `npm run build`, `node --check` für Bundle und geänderte Tests, `npm test` (131/131), `git diff --check` und Versionsprüfung gegen `279202c`. Offline-Abgleich der Label-Flächen über alle Level und Zoomstufen ohne neue Überlappungen. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10). Issue-/PR-Check: 0 offen.
- **Nachbesserung Orchestrator** · Sichtprüfung bei 390 px: Stress-Pille stieg während des Beulen-Dialogs von 14 % auf 34 %, „H hupen“ bleibt in einer Zeile. Aachen- und Köln-Labels auf der Planungskarte getrennt. Airbag-Auswertung über Tests geprüft. Codex-Doku-Diff gesichert unter `/home/box/projects/v06-qafix-codex-docdiff.patch`.
- **Offen** · Punkt 2 (`legacyMaxMinutes` für Level 2 im Worker) bleibt offen. Upstream-Merge erst auf ausdrückliche Freigabe.

### 2026-11-26 – Michi / Orchestrator – v0.6.0 · Doku-Abgleich

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`). SHA `f30acf3`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · Lücken aus dem Doku-Abgleich geschlossen: Weltgrößen von München, Innsbruck und Montpellier, `refreshStageSize()` in der Modulübersicht und in §9, Pylonen-Stress in der Stellschrauben-Tabelle, geschärfte Nachtfahrt-Formulierung, Arcade v0.3.1, Nachtstart in der L2-Checkliste. Statuszeile wieder auf die gesamte v0.6.0 bezogen, Modellnamen vereinheitlicht, erledigte Issue-/PR-Check-Sätze entfernt. Die Codex-Checkliste um Tabellenpflege, Altlasten-Suche, Branch-Statuszeile, festen Modellnamen und Orchestrator-Nacharbeit ergänzt. Selbst umgesetzt, ohne Codex. Kein Versionssprung.
- **Geprüft** · `npm test` und Build in `games/e-roadtrip` (Docs only). Issue-/PR-Check: 0 offen. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10).
- **Offen** · Fork-Spieltest und Upstream-Merge.

### 2026-11-26 – Michi / Codex CLI · gpt-6.2-sol high – v0.6.0 · Nachtfahrt und Abendsonne in Montpellier

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`), Ausgangsstand `95ef368`. SHA `74c9836`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages für den Spieltest nach dem Push](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · Level 2 startet nachts. Die Schlafpause liegt morgens nach Etappe 3, die weitere Fahrt am Nachmittag. Die Planung zeigt die Startzeit und bei erreichbarem Ladeplan die geschätzte Ankunft. Montpellier bleibt in der Stadtfahrt und beiden Strandszenen trocken und goldfarben. Beide Ankunftsvorschauen starten bei klarem Wetter. Die Lichter auf der Autobahn folgen weiter der Fahrzeit.
- **Geprüft** · `npm run typecheck`, `npm run build`, `node --check` auf Bundle und Tests, `npm test` (130/130), Versionsprüfung gegen `279202c`, `git diff --check`. Alle drei Standardprognosen liegen im Zeitfenster des unveränderten Workers. Acht erreichbare Ladepläne mit Abweichungen ergeben 17:11–20:30 Uhr. Vergleichsfahrten mit dem MG4 über Paris und hohen Ladezielen können später ankommen. Keine Anfrage an die Live-Wertung. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10). Issue-/PR-Check: 0 offen.
- **Offen** · In beiden Themes bei 390 px Aachen bei Nacht und beide Montpellier-Anfahrten samt Parken und Strandszenen spielen.

### 2026-11-26 – Michi / Codex CLI · gpt-6.2-sol high – v0.6.0 · Stadtfahrt Montpellier

- **Branch / PR** · `codex/eroadtrip-v0.6` ab `upstream/main` (`279202c`), vorheriger Stand `03f6c0f`. SHA `b47c48f`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. Fork-Bundle nach dem Push geprüft, Issue/PR-Check: 0 offen. [Fork-Pages](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/)
- **Erledigt** · Alle drei Level-2-Routen führen zum Strandhotel in Palavas. Route A nutzt Montpellier-Est über D66 und Carnon, Mitte und B kommen über A750, Montpellier-Sud und Lattes. Nach dem rückwärtigen Parken zeigt eine überspringbare Pixelszene die Familie am Strand. Danach folgen das bestehende Finale und die Level-2-Bestenliste. Verkehr, Schadensregeln, Navi und Beleuchtung nutzen die vorhandenen Systeme.
- **Geprüft** · Typecheck, zwei bytegleiche Builds, `node --check` für Bundle, Release-Datei und geänderte Tests, `npm test` (126/126), `git diff --check` und Versionsprüfung gegen `279202c`. MG4-Standardpläne für A/Mitte/B: 1.049/1.073/1.139 Min, innerhalb der Worker-Grenzen bei 1.100 Min. Zielzeit und Worker bleiben gleich. Keine Live-Wertungsanfragen. Version/Release-Eintrag geprüft (shared/releases.js, Regel 10).
- **Nachbesserung Orchestrator** · Handy-Ansicht: Nach dem Wechsel von der Autobahn in eine Stadtfahrt blieb die Spielfläche auf der alten Höhe stehen (390 px: 338 statt 489 px, dunkle Balken oben und unten). Ursache: Phasers `refresh()` nutzt die zwischengespeicherte Elterngröße und liest sie danach still neu ein, dadurch erkennt die eigene Abfrage die Änderung nie. `main.ts` liest jetzt vor jedem Refresh die Bühnengröße neu ein (`refreshStageSize()`). Der Fehler bestand schon vorher, fiel bei Montpellier aber stärker auf. Bundle-Rev 8, SHA `e220286`.
- **Offen** · Desktop- und Handy-Spieltest für beide Anfahrten, Parken und beide separat überspringbaren Szenen.

Ältere Einträge stehen im [Handoff-Archiv](HANDOFF-archive.md).
