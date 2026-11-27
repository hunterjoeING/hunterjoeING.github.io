# HANDOFF.md – Agent- & Entwickler-Übergabe (HunterJoe Arcade)

> **Regel:** Jeder KI-Agent und Entwickler liest diese Datei **vor Beginn** einer Session (zusammen mit `gh issue list` und `gh pr list`) und aktualisiert sie **am Ende** einer Session, um Doppelarbeit zu vermeiden.
> * Laufende Arbeit an Dateien $\rightarrow$ **🔒-Hinweis** im Abschnitt „Aktive Arbeits-Hinweise“ (AGENTS.md Regel 7)
> * Größere Vorhaben über mehrere Sessions sowie Bugs $\rightarrow$ **GitHub Issues**
> * Code-Rückfragen & Reviews $\rightarrow$ **Pull-Request-Kommentare**

---

## Aktive Arbeits-Hinweise (🔒)

Vor Arbeitsbeginn diesen Abschnitt auf `main` prüfen (AGENTS.md Regel 7). Steht hier ein Hinweis für dieselben Dateien oder Bereiche, diese nicht parallel ändern.

Format: `🔒 in Arbeit: <Bereich/Dateien> · <Agent/Person> · <Branch> · <JJJJ-MM-TT>`

Hinweise älter als 2 Tage gelten als verwaist und dürfen nach kurzer Rückfrage beim Verantwortlichen übernommen oder entfernt werden.

- (keine)

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
| Verbrennungsmotor 3D v0.4.0 · Common-Rail-Turbodiesel mit 3D-VTG-Turbolader, vier Bauformen (R4, Boxer B4, V6, V8), Explosions-Easter-Egg, Nockenwellen- & Highlight-Fix | Joe / Antigravity · Neon | `main` (`9ed0fd1`, `0f4f5f1`, Push auf Upstream `main`, kein PR) | ✅ Abgeschlossen und live (Verbrennungsmotor v0.4.0) |
| Website-weites Security-Hardening & Bugfix-Release (Worker, Workflows, Hub, 24 Quizzes, 10 Games, Doku) | Joe / Antigravity · Neon | `main` (`bcd6deb`, `0d963b1`, Push auf Upstream `main`, kein PR) | ✅ Abgeschlossen und live (Arcade v0.4.2, Windkraftanlage v0.1.2, 32 weitere Apps v0.1.1) |
| Abschluss Security-Audit ARC-01..22 (Score-Grenzen, `adminSecret` raus, `wrangler` & Action-SHAs gepinnt, lokales Three.js-Vendoring, Meta-CSP, Quiz-`textContent`, `callback.html`, Server-CAPTCHA) | Joe / Antigravity · Neon | `main` (`231d7c3`, `1888b52`, Push auf Upstream `main`, kein PR) | ✅ Abgeschlossen und live (Arcade v0.4.4, Verbrennungsmotor v0.4.1, Windkraftanlage v0.1.3, 37 weitere Apps gepatcht) |
| Lock-Hinweis in `HANDOFF.md` gegen paralleles Arbeiten (AGENTS.md Regel 4 und 7) | Michi / Grok Bot (Orchestrator) | `docs/handoff-lock-rule` · [Upstream-PR #14](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/14) | 🟡 Offen, kein Merge ohne Go |

**Aktuelle Versionen** · `eroadtrip` v0.6.0 · `arcade` v0.4.4 · `wind_turbine` v0.1.3 · `combustion_engine` v0.4.1

---

## 2. Session-Log (Neueste Einträge oben)

### 2026-11-27 – Michi / Grok Bot (Orchestrator) · kein Codex-Lauf / manuell – Lock-Hinweis in HANDOFF.md

- **Branch / PR** · `docs/handoff-lock-rule` ab `upstream/main` (`7415dd3`). Commit `38096b2` (+ dieser Doku-Commit). Push auf Fork `mic4rd/hunterjoeING.github.io`. [Upstream-PR #14](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/14). Kein Lock-Hinweis gesetzt (reine Doku, sehr klein; diese PR führt die Regel erst ein).
- **Erledigt** · Regel 7 um Arbeits-Hinweis (Lock) in `HANDOFF.md` ergänzt, Ausnahme in Regel 4, Abschnitt „Aktive Arbeits-Hinweise (🔒)“ in `HANDOFF.md` angelegt. Intro und Bullet „Aufgaben & Rückfragen“ an die neue Aufteilung angepasst (Issues nur für größere Vorhaben). Ältesten Session-Eintrag (Verbrennungsmotor 3D v0.3.1) nach `HANDOFF-archive.md` verschoben, damit §2 bei fünf Einträgen bleibt.
- **Geprüft** · `git diff --check`. `node scripts/check-release-bump.mjs upstream/main`: „Keine releasepflichtigen Dateien geändert.“ E-Roadtrip `npm test` 167/167 (keine Codeänderung; der CI-Workflow führt die Suite trotzdem aus). Keine JS- oder Release-Änderung (reine Doku, `[no-release]`).
- **GitHub** · Issue-/PR-Check (`gh issue list`, `gh pr list`): 0 offene Issues in Upstream, dieser Doku-PR #14, 0 weitere offene PRs in Upstream, 0 PRs im Fork (außer dem Head dieses PRs).
- **Offen** · Kein Upstream-Merge ohne ausdrückliches Go.
- Version/Release-Eintrag geprüft (shared/releases.js, Regel 10) — keine Versionserhöhung (reine Doku, `[no-release]`).

### 2026-11-27 – Joe / Antigravity · Neon – Security-Audit-Abschluss ARC-01..22 & Server-CAPTCHA (Arcade v0.4.4)

- **Branch / PR** · `main` ab `0d963b1`, Commits `231d7c3`, `2eb9e2a`, `1888b52` (+ Doku-Commit), kein PR, Push auf Upstream `hunterjoeING/hunterjoeING.github.io` (`main`). Live: https://hunterjoeing.github.io/
- **Erledigt** ·
  - **Worker (`cloudflare-worker/worker.js`):** Spielspezifische Score-Plausibilitätsgrenzen (`GAME_SCORE_BOUNDS` / `getScoreBounds`, ARC-01); `body.adminSecret` komplett von Register, Login, Reply und Status entfernt (ARC-06, Admin-Vergabe nur noch über `promote-admin.yml`); `validateEroadtripScore` um `subScores`-Konsistenz und strenges Zeitfenster für `version >= 0.6.0` erweitert (ARC-08, abwärtskompatibel); `readJsonBody()` erzwingt 8-KB-Limit (`413`) bzw. 32 KB am Telegram-Webhook und 128-Zeichen-Passwortlimit (ARC-09/16); PBKDF2 auf `100.000` Iterationen (`pbkdf2_100k$`) mit transparentem Rehash für 60k-Althashes angehoben (ARC-16); JWT-Laufzeit auf 7 Tage verkürzt (ARC-15); Always-Pass-Turnstile-Testsecret und `local_guard_*`-Bypass komplett entfernt und durch **HMAC-signierte Einmal-Server-Challenge (`GET /api/captcha/challenge`)** mit 5-Min-TTL & Replay-Schutz ersetzt (ARC-04; `CLOUDFLARE_API_TOKEN` hat kein `Turnstile:Edit`, daher kein manuelles Dashboard-Setup nötig); 404 ohne Pfad-Echo (ARC-17); `POST /api/feedback` legt initiale `feedback_votes`-Zeile für den Autor an (ARC-22).
  - **Workflows (`.github/workflows/`):** `wrangler@4.168.0` fest gepinnt (ARC-07), `actions/checkout` und `actions/setup-node` in allen Workflows auf volle 40-Zeichen-Commit-SHAs gepinnt, `persist-credentials: false` auch im `rebuild-e-roadtrip.yml`-Build (ARC-12), `accountId`/`dbId` per `::add-mask::` geschützt und Zonennamen in `check-traffic.yml` aus Logs entfernt (ARC-20).
  - **Lokales Three.js-Vendoring & CSP:** Three.js `0.170.0` (14 Dateien) und `r128` (SHA-512-verifiziert) lokal unter `shared/vendor/` eingecheckt und in allen 8 3D-Modulen umgestellt (ARC-10; `datenschutz.html` & `Architecture.md` angepasst). Einheitliche `<meta http-equiv="Content-Security-Policy">` und `Referrer-Policy` auf allen 46 HTML-Seiten ergänzt (ARC-11, `games/e-roadtrip/index.html` ausgenommen).
  - **Auth, Quizzes & Callback:** `shared/arcade.js` nutzt `/api/captcha/challenge` ohne öffentlichen Demo-Sitekey (inkl. Auto-Refresh bei Fehler), synct aktive Sessions gegen `/api/auth/me` (`verifySession`), schaltet den lokalen Browser-Tresor auf `hunterjoeing.github.io` ab (ARC-04/13/15). Alle 24 Text-Quizzes rendern Antworten & Erklärungen per `textContent` statt `innerHTML` (ARC-14); alle 5 Foto-Quizzes prüfen `licenseUrl` auf `https://` (ARC-19); `callback.html` setzt `no-referrer`, strikte CSP und bereinigt die URL per `history.replaceState` (ARC-18).
- **Geprüft** · `node --check` auf `worker.js`, `arcade.js`, `releases.js` und alle vendorten Three.js-Dateien; Worker-Security- & Server-CAPTCHA-E2E-Tests (`local_guard_` abgelehnt, Replay abgelehnt, korrekte Challenge 200); `releases.test.mjs` + `arcade-scores.test.mjs` (14/14 PASS); `games/combustion-engine/tests/*.test.mjs` (38/38 PASS); 87 Inline-`<script>`-Blöcke & JSON-LD/Importmaps in allen 48 HTML-Dateien geparst; `node scripts/audit_quizzes.mjs`; `node scripts/check-release-bump.mjs origin/main` (bestanden); `git diff --check`.
- **GitHub** · Issue-/PR-Check (`gh pr list`, `gh issue list`): 0 offene Issues und 0 offene PRs in Upstream.
- **Offen** · 4 kleine Review-Punkte + Meta-CSP in `games/e-roadtrip/` beim nächsten `e-roadtrip`-Branch mit `npm ci`.
- Version/Release-Eintrag geprüft (`shared/releases.js`, Regel 10, `arcade` `v0.4.4` spoilerfrei)

### 2026-11-27 – Joe / Antigravity · Neon – Security-Hardening, P0-Quiz-Fixes, Game-Bugfixes & Doku (Arcade v0.4.2)

- **Branch / PR** · `main` ab `0f4f5f1`, Commit `bcd6deb` (+ Doku-Commit `0d963b1`), kein PR, Push auf Upstream `hunterjoeING/hunterjoeING.github.io` (`main`). Live: https://hunterjoeing.github.io/
- **Erledigt** ·
  - **Sicherheit, Worker & Workflows:** `cloudflare-worker/worker.js` gehärtet (JWT fail-closed ohne Hardcoded-Fallback, `timingSafeEqualStr`, In-Isolate Rate-Limiter, `X-Telegram-Bot-Api-Secret-Token` fail-closed, D1-Rollen-Revalidierung in `getAuthUser`, `PATCH /api/feedback/:id/status`, 404-Prüfungen vor Replies/Votes, Leaderboard-`runId`-IDOR via HMAC-`updateToken` & Entfernen von `runId` aus Public-GETs geschlossen, `GAMES_META`-Allowlist & 2048-B-Meta-Cap, N+1-Query-Storm in `/api/summary` von ~146 auf 3 Queries reduziert, generische 500-Fehler, Werkzeugnamen entfernt). `.github/workflows/deploy-worker.yml` provisioniert `JWT_SECRET` (ohne Rotation bestehender Keys) und `TELEGRAM_WEBHOOK_SECRET` (inkl. `secret_token` bei `setWebhook`) und synct `TURNSTILE_SECRET_KEY`; `promote-admin.yml` und `test-telegram.yml` loggen keine D1-Userlisten oder `chat_id` mehr.
  - **Shared, Hub & DSGVO:** `shared/arcade.js` (Offline-Auth vergibt nie `admin` und legt bei Login keine Konten an, `updateToken`-Handling in `ArcadeScores`, `initMenuBar`-Listener dedupliziert, Light-Mode-Kontraste, `hard`-Timer 35 s), `shared/burger-menu.js` (NFL & Golf ergänzt, dynamische Zähler), `shared/quiz-subcategories.js` & `shared/hidden-admin.js` (HTML-Escaping, `hard`/`nerd`-Mapping unter `pro`), `shared/quiz-engine.js` (`resolveRoundCount` respektiert Foto-Quiz-Längen bei festen 12 Fragen für Text-Quizzes), `shared/update-banner.js` (Guard & „Jetzt spielen“ auf eigener App-Seite ausgeblendet), `index.html` (40 Module / 28 Quizzes / 2.646 Pool / JSON-LD `1..40`), `sitemap.xml` (+8 fehlende Quizzes), `datenschutz.html` (Google Fonts, jsDelivr, Telegram Bot API, Web-Storage-Inventar).
  - **Quizzes:** P0-Crashes in `quiz-apple` (`getRelaxed`/`syncMenuBar`/`markSeen`/`useJokerSkip`), `quiz-geburt` (`#q-sec`-Zerstörung, `toggleRelaxed`, Joker-Disable), `quiz-fussball` (`hard`-Stufe -> 120 Guru-Fragen) und `quiz-etfs` (`nerd`-Mapping) behoben; Timer-Reset-Score-Exploit in allen 24 Text-Quizzes geschlossen; `scripts/audit_quizzes.mjs` auf `q.correct ?? q.correctIndex` korrigiert.
  - **Games & Doku:** `minesweeper` (Savegame-XSS, Feld-Allowlist, `timerInt`-Clear, negativer Modulo, Portal-/Ikosaeder-Dispose), `minesweeper-3d-prompt-test` (shared `matUnrevealed`, Modal-/Drawer-Scroll entsperrt), `wind-turbine` (isolierte Highlight-Materialien, Anemometer bei 0 m/s, Sturmbremse 0 U/min, `pointercancel`, Theme-Dedupe), `roadster` (Winkelnormalisierung, einheitliche 5,2 m/s & 26°, Drohnenschiff-Stopp, RCS-Vektor), `zombie` (Gate-Lücke geschlossen, Game-Over-Return, `setPointerCapture`, `runId`, `MAX_BULLETS=320`), `tower` (Vorzieh-Score-Exploit entfernt, Welle-5-Hydra-Banner, `rebuildMap`-Dispose, `pointercancel`), `2048` (2048-auf-letztem-Zug Soft-Lock, Undo nach Game-Over gesperrt, 5-stellige Schriftgröße), `podracer` (Swept-Kollisionen, `podGlow`-Frame-Reihenfolge, Mute-Sync, `KeyR`/Blur), `solitaire3d` (`pointercancel`, Win-Timer-Abbruch, Debounce, Light-Mode-HUD, 512×716 VRAM-Reduktion, `Architecture.md` neu für 3D Spider geschrieben), `solitaire` (`pointercancel`/Blur, Spaltenhöhe, exakte Siegzeit, `Architecture.md` korrigiert).
- **Geprüft** · `node --check` auf allen 20 geänderten `.js`/`.mjs`-Dateien; Worker-Security- & N+1-Unit-Checks in Node; `releases.test.mjs` + `arcade-scores.test.mjs` (14/14 PASS); `games/combustion-engine/tests/*.test.mjs` (38/38 PASS); 64 Inline-`<script>`-Blöcke in 33 geänderten HTML-Dateien fehlerfrei geparst; `node scripts/audit_quizzes.mjs`; `node scripts/check-release-bump.mjs origin/main` (alle 34 öffentlichen Apps bestanden); `git diff --check`.
- **GitHub** · Issue-/PR-Check (`gh pr list`, `gh issue list`): 0 offene Issues und 0 offene PRs in Upstream.
- **Offen** · (1) Echten Cloudflare-Turnstile-Sitekey + `TURNSTILE_SECRET_KEY` im Cloudflare Dashboard/GitHub Secrets hinterlegen; (2) 4 offene Review-Punkte in `games/e-roadtrip/src/` im nächsten e-Roadtrip-Branch mit installiertem `node_modules` (`npm ci`) nachziehen (hier bewusst nicht angefasst, da `node_modules` offline nicht verfügbar).
- Version/Release-Eintrag geprüft (`shared/releases.js`, Regel 10, 34 Patch-Einträge spoilerfrei)

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

Ältere Einträge stehen im [Handoff-Archiv](HANDOFF-archive.md).
