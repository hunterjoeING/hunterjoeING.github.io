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
| Verbrennungsmotor 3D v0.2.0–v0.3.1 · Gaspedal, interaktives Lastkennfeld mit Fahrwiderstand, Voreinstellungen und Beispielautomatik. Gangwahlanzeige, Momentanverbrauch und Tour mit Live-Fahrbeispielen. v0.3.1: Sauger-Kennfeld und sichtbare Saugrohreinspritzung | Michi / Codex CLI · gpt-6.2-sol xhigh · Orchestrator | `codex/combustion-load-map` · [Upstream-PR #12](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/12) (Merge `84636bc`) | ✅ Gemerged und live (Verbrennungsmotor v0.3.1) |
| Verbrennungsmotor 3D v0.4.0 · Common-Rail-Turbodiesel mit 3D-VTG-Turbolader, vier Bauformen (R4, Boxer B4, V6, V8), Explosions-Easter-Egg, Nockenwellen- & Highlight-Fix | Joe / Antigravity · Neon | `main` (`9ed0fd1`, Push auf Upstream `main`, kein PR) | ✅ Abgeschlossen und live (Verbrennungsmotor v0.4.0) |

**Aktuelle Versionen** · `eroadtrip` v0.6.0 · `arcade` v0.4.1 · `wind_turbine` v0.1.1 · `combustion_engine` v0.4.0

---

## 2. Session-Log (Neueste Einträge oben)

### 2026-11-27 – Joe / Antigravity · Neon – Verbrennungsmotor 3D v0.4.0 (Turbodiesel, Bauformen & Explosions-Easter-Egg)

- **Branch / PR** · `main` ab `093f55e` (nach Merge von Upstream-PR #12 & #13), Commit `9ed0fd1`, kein PR, Push auf Upstream `hunterjoeING/hunterjoeING.github.io` (`main`). Live: https://hunterjoeing.github.io/games/combustion-engine/
- **Erledigt** · Motor-Auswahl in `00 · Motor & Bauform` sowie Viewport-Chip ergänzt: Umschaltung zwischen **Otto-Saugmotor** (Saugrohreinspritzung) und **Common-Rail-Turbodiesel** (Direkteinspritzung + animierter 3D-VTG-Turbolader mit drehendem Verdichter-/Turbinenrad, Ladeluftrohr, Einspritzkegel, eigenem BSFC-Kennfeld ~198 g/kWh und Ladedruck-Kachel). Parametrischer Multi-Bank-3D-Generator in `ce-model.js` und `ce-variants.js` für **R4** (`1–3–4–2`), **180°-Boxer B4** (`1–3–2–4`, echte gegenläufige Box-Bewegung mit getrennten 180°-Hubzapfen), **60°-V6** (`1–2–3–4–5–6`) und **90°-Crossplane-V8** (`1–8–4–3–6–5–7–2`) mit dynamischen SVG-Diagrammen, Presets, Zylinder-Taktanzeigen und Tour-Texten. Modus `03 Explosionsansicht` als Überdrehzahl-/Motorschaden-Easter-Egg (`ce-explosion.js`, 3D-Trümmerballistik, Rauch, WebAudio & Reparatur-Reset; gemäß Regel 10 nicht im öffentlichen Changelog erwähnt). Nockenwellen-Phasen auf Zylinder 2 & 3 sowie isolierte Baugruppen-Materialien für Highlighting korrigiert.
- **Geprüft** · `node --check` auf alle `ce-*.js`, `shared/releases.js` und `shared/update-banner.js`; alle 38/38 Explainer-Unit-Tests (`node --test games/combustion-engine/tests/*.test.mjs`, inkl. neuer `tests/engine-variants.test.mjs`); vollständige 3D-Build-/Update-/Explosions-Prüfung aller 8 Motorkombinationen in Node; `node scripts/check-release-bump.mjs origin/main` für `combustion_engine`.
- **GitHub** · Issue-/PR-Check (`gh pr list`, `gh issue list`): 0 offene Issues und 0 offene PRs in Upstream nach Merge von PR #12 & #13 (`093f55e`).
- **Offen** · Live-Spieltest auf Handy & Desktop (u. a. Boxer/V6/V8, Turbolader-Animation und Explosions-Easter-Egg).
- Version/Release-Eintrag geprüft (`shared/releases.js`, Regel 10, `v0.4.0` spoilerfrei)

### 2026-11-27 – Michi / Orchestrator (direkt, ohne Codex-Lauf) – Go-live Verbrennungsmotor 3D v0.3.1

- **Branch / PR** · `upstream/main` war unverändert bei `a70eacc`. [Upstream-PR #12](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/12) aus dem Fork-Branch `codex/combustion-load-map` (`ff917ae`), gemergt von `mic4rd` (Merge `84636bc`, 08:35 Uhr Europe/Berlin). Diese Doku per Folge-PR `[no-release]` (Branch `codex/docs-golive-2026-11-27`).
- **Konflikte** · Keine. Upstream/main ist seit `a70eacc` nicht weitergelaufen, kein Rebase nötig.
- **Geprüft** · Vor dem Merge: Explainer-Tests 32/32, `node --check`, `git diff --check`, `node scripts/check-release-bump.mjs upstream/main` (combustion_engine), e-Roadtrip Typecheck, Build (Bundle unverändert) und `npm test` (167/167). CI auf PR #12: `check-versioning` grün. Nach dem Merge: Workflow „pages build and deployment“ auf `84636bc` grün. Live-Seite https://hunterjoeing.github.io/games/combustion-engine/ zeigt v0.3.1 und „Saugbenziner“. Hub und e-Roadtrip v0.6.0 bleiben erreichbar. Headless-Chrome-Stichprobe ohne Konsolenfehler, 0 POSTs. Screenshot `/home/box/projects/shot/ce-live-v031.png`.
- **Offen** · Der Hilfsbranch `audit/upstream-main-a70eacc` auf dem Fork bleibt. Issue-/PR-Check nach dem Merge: Upstream 0 offene Issues und PRs (dieser Doku-PR ausgenommen), Fork 0 offene PRs.
- Version/Release-Eintrag geprüft (shared/releases.js, Regel 10)

### 2026-11-27 – Michi / Codex CLI · gpt-6.2-sol xhigh – Verbrennungsmotor 3D v0.3.1

- **Branch / PR** · `codex/combustion-load-map`, Ausgangsstand und Fork-Stand `ce28826`. Commit `66a8667` (+ Doku-Commit), gepusht in den Fork `mic4rd/hunterjoeING.github.io`. Kein PR. [Fork-Pages-Test nach dem Push](https://mic4rd.github.io/hunterjoeING.github.io/games/combustion-engine/)
- **Erledigt** · Kennfeld, Telemetrie und Tour für einen 2,0-l-DOHC-16V-Saugbenziner mit Saugrohreinspritzung kalibriert. 200 Nm bei 4250 U/min, 108,8 kW bei 5972 U/min und 245 g/kWh im Optimum. Der offene Punkt „135 vs. 150 kW“ ist erledigt. Die Motorspezifikation übernimmt das gerundete Kurvenmaximum von 109 kW, die Voreinstellung liegt bei 5950 U/min. Die Drosselklappe, Kraftstoffleiste und vier Einspritzventile liegen im Ansaugtrakt. Cruise hält im 5. Gang rund 106 km/h, die Tour endet nach dem Hochschalten bei 152 km/h im 6. Gang. Die bestehende Automatik erreicht simuliert 214 km/h bei Volllast.
- **Geprüft** · Explainer-Tests 32/32, `node --check` für alle `ce-*.js`, `shared/releases.js` und die drei Testdateien. Eckwertskript und zusätzliche Modellmessungen, HTML-Tags, 45 IDs und zugehörige Verweise, Seitentitel, JSON-LD, Importmap, Asset-Versionen, Banner-Logik und `git diff --check` geprüft. `node scripts/check-release-bump.mjs upstream/main` meldet bestanden für `combustion_engine` anhand des Branch-Diffs bis HEAD und des Release-Katalogs aus dem Arbeitsbaum. E-Roadtrip: `npm run typecheck`, `npm run build`, `node --check dist/e-roadtrip.js`, `npm test` (167/167), Bundle bytegleich.
- **GitHub** · Issue-/PR-Check durch den Orchestrator: 0 offene Issues und PRs in Upstream, 0 PRs im Fork.
- **Offen** · Fork-Test durch Michi. Kein Upstream-Merge ohne ausdrückliches Go; Joe soll den Explainer vorher sehen. Browser-Test durch den Orchestrator: 1280 und 390 px, Kennfeld bei Cruise, Tour-Schritte 6–9 live, Escape stellt den Zustand vor der Tour wieder her, 0 POSTs, keine Konsolenfehler (Screenshots `/home/box/projects/shot/ce-v031-*.png`).
- Version/Release-Eintrag geprüft (shared/releases.js, Regel 10)

### 2026-11-27 – Michi / Codex CLI · gpt-6.2-sol xhigh – Verbrennungsmotor 3D v0.3.0

- **Branch / PR** · `codex/combustion-load-map`, Ausgangsstand `83f03bd`. Commit `0add518` (+ Doku-Commit), gepusht in den Fork `mic4rd/hunterjoeING.github.io`, kein PR. Fork-Pages-Test-URL für v0.3.0 nach dem Push: https://mic4rd.github.io/hunterjoeING.github.io/games/combustion-engine/
- **Erledigt** · Die Gangwahlanzeige zeigt Gang, Übersetzung und Fahrmodus unter dem Gaspedal. Die Verbrauchskachel zeigt auch beim Beschleunigen und im Schub l/100km. Die neunstufige Tour ergänzt Live-Beispiele zu Drosselklappe, Fahrwiderstand, Getriebe und Muschelkurve. Die Referenzfahrt schaltet hoch und endet bei rund 176 km/h im 6. Gang. Beim Schließen kehren Regler, Zeitlupe, Ansicht und Kamera zum Ausgangszustand zurück.
- **Geprüft** · `node --check` für alle `ce-*.js`, `shared/releases.js` und die drei Explainer-Testdateien. Explainer-Tests 27/27 einschließlich UI-Ereignissen im simulierten DOM. Die bisherigen Telemetriefelder stimmen auf 14.241 Betriebspunkten mit `HEAD` überein. HTML-Tags, ID-Verweise, Titel, JSON-LD, Importmap, Inline-Skript, Asset-Versionen, CSS und `git diff --check` geprüft. `node scripts/check-release-bump.mjs upstream/main` bestanden für `combustion_engine`. E-Roadtrip: `npm run typecheck`, `npm run build`, `node --check dist/e-roadtrip.js` und `npm test` (167/167), Bundle bytegleich.
- **GitHub** · Issue-/PR-Check durch den Orchestrator: 0 offene Issues und PRs in Upstream, 0 PRs im Fork.
- **Offen** · Fork-Spieltest durch Michi. Kein Upstream-Merge ohne ausdrückliches Go; Joe soll den Explainer vorher sehen. Browser-Test durch den Orchestrator: 1280 und 390 px, Tour-Schritte 6–9 live, Escape stellt den Zustand vor der Tour wieder her, 0 POSTs, keine Konsolenfehler (Screenshots `/home/box/projects/shot/ce-v03-*.png`).
- Version/Release-Eintrag geprüft (shared/releases.js, Regel 10)

### 2026-11-27 – Michi / Codex CLI · gpt-6.2-sol high – Gang, Geschwindigkeit und Verbrauch für Verbrennungsmotor 3D v0.2.0

- **Branch / PR** · `codex/combustion-load-map`, Ausgangsstand `50639be`. Commit `add54de`, gepusht in den Fork `mic4rd/hunterjoeING.github.io`, kein PR. Fork-Pages bleiben auf diesem Branch: https://mic4rd.github.io/hunterjoeING.github.io/games/combustion-engine/
- **Erledigt** · Beispielautomatik, Kacheln für Gang, Geschwindigkeit und Verbrauch, markierte Fahrwiderstandslinien für die Gänge 4 bis 6 und Release-Text in v0.2.0. Cruise startet im 5. Gang mit 106 km/h, 6,3 l/100km und 6,7 l/h. Die zusätzliche Toleranz im 6. Gang ermöglicht Konstantfahrt bei 2800 U/min und 85 % Last.
- **Geprüft** · `node --check` für alle `ce-*.js`, `shared/releases.js` und beide Testdateien. Explainer-Tests 18/18, HTML-Tags, IDs, JSON-LD, Importmap, Inline-JavaScript und Asset-Revisionen geprüft. SVG-Gangkurven auf Beschriftung und Grenzen geprüft. Alle vier Voreinstellungen und die Kurvenhervorhebung mit simuliertem DOM geprüft. Alle 14.241 BSFC-Rasterwerte exakt wie in `HEAD`. `node scripts/check-release-bump.mjs upstream/main` bestanden für `combustion_engine`. E-Roadtrip: `npm run typecheck`, `npm run build`, `node --check dist/e-roadtrip.js`, `npm test` (167/167), Bundle bytegleich. `git diff --check` bestanden.
- **GitHub** · Issue-/PR-Check (Orchestrator, 27.11., gh): Upstream 0 offene Issues und PRs, Fork 0 offene PRs.
- **Orchestrator** · Headless-Chrome-Test lokal (1280 und 390 px, hell und dunkel, alle vier Voreinstellungen sowie 2800 U/min / 85 %): keine JS-Fehler, kein horizontales Scrollen, 0 POSTs. Screenshots `/home/box/projects/shot/ce-gear-*.png`. Cruise liegt im 5. Gang bei 106 km/h mit 6,3 l/100km.
- **Offen** · Fork-Test durch Michi. Joe sieht den Stand vor einem Upstream-PR. Kein Upstream-PR ohne Michis ausdrückliches Go.
- Version/Release-Eintrag geprüft (shared/releases.js, Regel 10)

Ältere Einträge stehen im [Handoff-Archiv](HANDOFF-archive.md).
