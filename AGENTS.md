# AGENTS.md – Projekt-Verfassung & Architektur-Regeln (HunterJoe Arcade)

Diese Datei ist die verbindliche „Projekt-Verfassung“ für alle KI-Agenten und Entwickler, die an diesem Repository arbeiten. **Lies und befolge diese Regeln vor jeder Code-Änderung.**

---

## 1. Eiserne Grundregeln (Do-Not-Break-Policy)

1. **Keine ungefragten Seiteneffekte:** Ändere niemals bestehende Spiele, Quizzes, Designs oder Funktionen, die nicht ausdrücklich Teil der aktuellen Nutzer-Aufgabe sind.
2. **Strikte Trennung von Daten und Programmcode:**
   * Quiz-Fragenpools (Fragen, Antwortoptionen, Kategorien, Erklärtexte) gehören **ausschließlich** in eigene Datendateien unter [`shared/quiz-data/bank-<thema>.js`](shared/quiz-data/) (registriert über `ArcadeQuizEngine.registerBank('<id>', QUESTIONS)`).
   * In den Quiz-HTML-Dateien unter `games/quiz-*/index.html` dürfen keine großen Fragen-Arrays im UI-Code eingebettet werden.
3. **Modulare Dateigrößen & Isolierung:**
   * Neue Features (z. B. Monetarisierung, Affiliate-Banner, Partner-Widgets, Analytics) müssen in **eigenständige, kleine Module** unter `shared/` ausgelagert werden (Zielgröße: **unter 300–500 Zeilen Code pro Modul**), statt bestehende Dateien wie `shared/arcade.js` oder `index.html` weiter aufzublähen.
   * Jedes Spiel und jedes Quiz lebt isoliert in seinem eigenen Verzeichnis unter `games/<slug>/`.
4. **Branching & sofort committen/pushen:**
   * **Parallele Arbeit / Feature-Branches:** Bei parallelen Änderungen (z. B. durch Collaborators oder externe Cloud-Agents) immer auf einem eigenen Feature-Branch arbeiten und per **Pull Request** in `main` mergen – niemals unkoordiniert direkt auf `main` pushen.
   * **Auf dem Arbeits-Branch:** Fertige Änderungen zeitnah nach abgeschlossenen Dateien/Arbeitsschritten committen und auf den jeweiligen Branch pushen.
   * **Generierte Bundles (`dist/e-roadtrip.js`):** Merge-Konflikte in gebauten Bundles niemals manuell auflösen, sondern nach dem Merge/Rebase einfach `npm run build` im jeweiligen Spieleordner neu ausführen.
5. **Syntax-Check vor jedem Commit:** Führe vor jedem Commit `node --check` auf alle geänderten JS-Dateien aus, damit `main` jederzeit fehlerfrei bleibt.
   * **E-Roadtrip:** In `games/e-roadtrip` zusätzlich `npm run typecheck`, `npm run build`, `node --check dist/e-roadtrip.js` und `npm test` ausführen.
6. **Gezielte, chirurgische Edits statt Komplett-Überschreibungen:**
   * Nutze gezielte Zeilen-Ersetzungen anstatt große Dateien komplett neu zu schreiben.
   * Prüfe nach jeder JS-Änderung die Syntax mit `node --check <datei.js>`.
7. **Agent-Koordination (`HANDOFF.md`, Issues & PR-Kommentare):**
   * **Vor jeder Session:** `AGENTS.md`, `HANDOFF.md` und die Architektur-Doku nach Regel 9 lesen. Im Upstream und Fork offene GitHub Issues (`gh issue list`) und Pull Requests (`gh pr list`) prüfen, um Doppelarbeit zu vermeiden.
   * **Aufgaben & Rückfragen:** Aufgaben, Bugs und „Wer macht was“ über **GitHub Issues** koordinieren; Code-Rückfragen und Reviews direkt als **Pull-Request-Kommentare** schreiben.
   * **Zum Abschluss in `HANDOFF.md` prüfen:**
     - In §1 eine Zeile für den Arbeitsbranch anlegen oder aktualisieren. Branch, PR-/Upstream-Status und Status-Emoji angeben. Erledigte oder gemergte Zeilen auf ✅ setzen.
     - In §2 oben den Session-Eintrag mit Datum, Verantwortlichen, Agent und Modell ergänzen. Branch, Commit-SHAs, Push ja/nein und Ziel (Fork/Upstream), PR-Nummer oder „kein PR“ und ggf. die Fork-Pages-Test-URL angeben.
     - Erledigte und offene Arbeit sowie ausgeführte Checks festhalten. Das Ergebnis der Issue-/PR-Prüfung oder den Grund fürs Überspringen angeben. Fehlt der Netzzugriff, „Issue-/PR-Check übersprungen (kein Netz), vom Orchestrator nachzuholen“ vermerken.
     - Für committete Arbeit die Commit-SHAs eintragen und „Änderungen im Arbeitsbaum“ entfernen. Bei einem Lauf ohne Commit/Push `SHA: (folgt)` eintragen. Der Orchestrator ergänzt nach Commit und Push die SHAs im Handoff und Changelog sowie den Push-Status und die Test-URL und holt ggf. die Issue-/PR-Prüfung nach.
     - Bei mehr als fünf Session-Einträgen die ältesten nach `HANDOFF-archive.md` verschieben.
     - Version/Release-Eintrag geprüft (shared/releases.js, Regel 10)
8. **Mobile-First & Android/iOS-Stabilität:**
   * Fixierte Hintergrund-Canvas-Elemente (`#cosmos-canvas` und `.cosmos-vignette`) müssen `height: 100lvh` (`left: 0; bottom: 0` auf Android/Desktop bzw. `top: 0; bottom: auto` per `@supports (-webkit-touch-callout: none)` auf iOS) nutzen, `transform-origin` am `#hub-shell` auf den sichtbaren Viewport begrenzen (`min(35lvh, 300px)`) und bei Touch-Scroll (`e.pointerType !== 'mouse'`) oder beim Ein-/Ausblenden der mobilen Adressleiste keinerlei Kamera- oder Layout-Sprünge auslösen.
   * Alle Seiten müssen sowohl den **Dark Mode** als auch den **Light Mode** (`html[data-theme="light"]` via `ArcadeTheme`) sauber unterstützen.
9. **Architektur-Doku:** Vor Änderungen an einem Spiel `games/<slug>/Architecture.md` lesen, für Quizzes `shared/QUIZ_ARCHITECTURE.md`. Änderungen an Struktur, Steuerung, Simulationsregeln oder Designentscheidungen im selben PR dokumentieren.
   * **Zum Abschluss in der Architektur-Doku prüfen:**
     - In der Modulübersicht jede neue, gelöschte oder umbenannte Datei nachziehen und die Beschreibung mit dem Code abgleichen.
     - Geänderte Werte, Konstanten, Routen, Anbieter und Dateinamen in den betroffenen Abschnitten einschließlich Stellschrauben-Tabelle und offenen Punkten nachziehen. Werte an einer Stelle pflegen und Doppelbeschreibungen vermeiden.
     - Pro Aufgabe oder PR genau einen kurzen Changelog-Eintrag (1–3 Zeilen) unten ergänzen, mit Datum, Branch und Commit-SHA oder PR. Überholte Aussagen im alten Eintrag mit „(später ersetzt …)“ kennzeichnen.
     - Die Sprache der jeweiligen Datei beibehalten. Die E-Roadtrip-Architektur ist auf Englisch, `HANDOFF.md` auf Deutsch.
     - Version/Release-Eintrag geprüft (shared/releases.js, Regel 10)
10. **Semantische Versionierung und öffentliche Changelogs:** Diese Regel gilt für Cursor, Codex, Antigravity, alle weiteren Agenten und alle Menschen, die am Repository arbeiten.
   * Jedes öffentliche Spiel, jedes öffentliche Quiz und die Arcade (`arcade`) haben eine eigene Version nach `MAJOR.MINOR.PATCH`. MINOR und PATCH sind Zähler. Auf `0.9.0` folgen `0.10.0`, `0.11.0` usw. Bis zur ausdrücklichen Freigabe von Michi oder Joe bleibt die App in Beta. `1.0.0` ist für die fertige Version reserviert. Setze erst nach Freigabe `allowStable: true` beim App-Eintrag.
   * **Feature (`0.x.0`):** Für spielerrelevante neue Inhalte oder Funktionen MINOR erhöhen, PATCH auf 0 setzen und einen Eintrag vom Typ `feature` mit 3–5 kurzen deutschen Stichpunkten für Spieler ergänzen. Die Karte zeigt ab dem Release-Datum bis einschließlich 14 Tage danach „Neues Update“ mit blauem Punkt. Das Öffnen des App-Changelogs blendet den Punkt aus. Nachgetragene Ersteinträge sind mit `banner: false` gekennzeichnet und lösen nie einen Hinweis aus. Ein Ersteintrag mit dem Titel „Erste Version“ hat 1–3 Stichpunkte.
   * **Patch (`0.x.y` mit `y > 0`):** Bei Fixes, Wartung und kleinen Änderungen PATCH erhöhen und einen Eintrag vom Typ `patch` mit 1–3 kurzen deutschen Stichpunkten ergänzen. Patches lösen keinen Update-Hinweis aus. Im Popup stehen sie eingeklappt unter „Kleinere Fixes“. In der Übersicht sind Fixes standardmäßig sichtbar und per Checkbox ausblendbar. Reine Doku-, CI- und Teständerungen erhöhen keine Version.
   * **Pflege:** `shared/releases.js` ist die Quelle für App-IDs, Versionen und Release-Notizen. Einträge sind pro App absteigend nach Version sortiert, mit ebenfalls absteigendem oder gleichem Datum. Die Übersicht sortiert über alle Apps nach Datum und dann numerisch nach Version. Release-Datum ist der geplante Merge- oder Live-Tag im Format `JJJJ-MM-TT`. Bei späterem Merge korrigiert der Orchestrator das Datum.
   * **Zuordnung:** Änderungen am Hub (`index.html`), an `changelogs.html`, `shared/arcade.js` und allgemein genutzten Laufzeitdateien unter `shared/` gehören zur App `arcade`. Bei E-Roadtrip zusätzlich `package.json`, die beiden Versionsfelder in `package-lock.json` und die `?v=`-Werte von `styles.css`, `dist/e-roadtrip.js`, `releases.js` und `update-banner.js` in `games/e-roadtrip/index.html` auf dieselbe Version setzen.
   * **PR-Prüfung:** CI verlangt für geänderte öffentliche Spiel- und Quiz-Verzeichnisse, den Hub, die Changelog-Übersicht und Dateien unter `shared/` einen Versionsanstieg gegenüber dem Basisbranch. Release-Datei, Markdown, Testverzeichnisse und das generierte E-Roadtrip-Bundle zählen dabei nicht als auslösende Dateien. `[no-release]` im PR-Titel oder das Label `no-release` überspringt den Versionsvergleich.
   * **Autor und Modell:** Jeder Release-Eintrag in `shared/releases.js` hat `author` (Person: `Joe` für hunterjoeING, `Michi` für mic4rd) und, wenn bekannt, `model` mit dem Modellnamen, den der Nutzer kennt. Beispiele: `gpt-6.2-sol` → `Sol 6.2`, `grok-4.7` → `Grok 4.7`. Joe arbeitet laut Michi bisher immer mit `Hydrogen`; seine Einträge tragen daher `model: "Hydrogen"`, solange nichts anderes belegt ist. Das Modell nur eintragen, wenn es aus Auftrag, Commit, PR oder Handoff belegbar ist, sonst weglassen und nicht raten. Changelog-Seite und Update-Dialog zeigen „Person · Modell“ neben dem Datum, z. B. „Michi · Sol 6.2“.
   * **Werkzeug nie nennen:** Das verwendete Agent-Werkzeug (z. B. Codex, Cursor, Antigravity, CLI-Namen) erscheint nirgends in nutzersichtbaren Texten: nicht in `author`, `model`, Titeln oder Stichpunkten. Interne Doku (`HANDOFF.md`, Commits) darf das Werkzeug weiter nennen. Ein Test in `npm test` prüft das.
   * **Spoilerfreiheit:** Changelogs enthalten keine Quizfragen, Antworten, Lösungen, Hinweise, versteckten oder Admin-Inhalte, PINs, Geheimnisse oder Easter Eggs. Eine Angabe wie „12 neue Fragen in der Kategorie Bundesliga“ ist erlaubt. Versteckte und Admin-Quizze dürfen überhaupt nicht in `shared/releases.js` erscheinen.

---

## 2. Verzeichnis- & Architektur-Struktur

```text
/
├── AGENTS.md                        # Verbindliche Projekt-Verfassung für KI-Agenten
├── index.html                       # Haupt-Hub (Spiele- & Quiz-Übersicht, 3D-Hintergrund, Community-Board)
├── impressum.html                   # Impressum nach § 5 DDG (Johannes Rudolph, Aachen)
├── datenschutz.html                 # Datenschutzerklärung (DSGVO, LocalStorage, Cloudflare Turnstile/D1)
├── changelogs.html                   # Öffentliche Release-Übersicht mit Filter nach App
├── shared/
│   ├── arcade.css                   # Globales Design-System, Dark/Light-Theme, Nav, Modals, Feedback-UI
│   ├── arcade.js                    # Globale Services (ArcadeAudio, ArcadeTheme, ArcadeScores, ArcadeAuth, ArcadeFeedback)
│   ├── releases.js                  # App-Katalog und öffentliche Versionshistorie
│   ├── update-banner.js             # Update-Pille, Gelesen-Status und Changelog-Dialog
│   ├── burger-menu.js               # Modulares Top-Right Burger-Menü (☰) + Slide-Over-Drawer (Dark/Light)
│   ├── quiz-engine.js               # Zentrale Quiz-Logik (Seen-Tracking, Rundenlänge, Timer/Entspannt)
│   ├── quiz-board.js                # Einheitliche lokale Quiz-Bestenliste (localStorage, optionale Namenseingabe)
│   ├── hidden-admin.js              # PIN-Admin (Konstante ADMIN_PIN) für versteckte Quizzes (Waldgarten, Napoli72H)
│   └── quiz-data/                   # Reine Quiz-Fragendatenbanken (strikt getrennt von der UI-Logik)
│       ├── bank-waldgarten.js       # 75 Fragen: Natur, Vögel, Wildtiere & Geschichte Schwarzenburg (Heideblick)
│       ├── bank-military-aircraft.js # 75 Fragen: Militärflugzeuge (Jets, Historie, Bomber/AWACS, Technik)
│       ├── bank-airliners.js        # 75 Fragen: Passagierflugzeuge (Widebody, Narrowbody, Klassiker, Technik)
│       ├── bank-etfs.js             # 75 Fragen: Passives Investieren, ETFs & deutsches Steuerrecht
│       ├── bank-ai.js               # Fragenpool: Künstliche Intelligenz (75)
│       ├── bank-movies.js           # Fragenpool: Kino & Filme ohne RomComs (75)
│       ├── bank-egypt.js            # Fragenpool: Ägyptische Geschichte (75)
│       ├── bank-diving.js           # Fragenpool: Tauchen & Scuba Diving (75)
│       ├── bank-emobility.js        # Fragenpool: E-Mobilität & Tesla (75)
│       ├── bank-history.js          # Fragenpool: Weltgeschichte (75)
│       ├── bank-china.js            # Fragenpool: Neuere Chinesische Geschichte (75)
│       ├── bank-politics.js         # Fragenpool: Politik & Ökonomie (75)
│       ├── bank-general.js          # Fragenpool: Quiz-Arena Klassik (75)
│       └── bank-{cpus,gpus,phones,pilze-aachen,swiss-trains}.js # Ausgelagerte Foto-Quiz-Daten (96)
├── games/                           # Jedes eigenständige Spiel besitzt eine eigene Architecture.md; Quizzes -> shared/QUIZ_ARCHITECTURE.md
│   ├── minesweeper/                 # 3D Minesweeper – Tech Demo KI-Agent
│   ├── minesweeper-3d-prompt-test/  # Minesweeper 3D Prompt-Vergleichsversion
│   ├── roadster/                    # Hyper-Roadster Lander
│   ├── zombie/                      # Zombie Horde: Gate Runner
│   ├── tower/                       # Bastion Tower Defense
│   ├── solitaire/                   # Klondike Solitaire
│   ├── 2048/                        # 2048 Prism
│   ├── quiz/                        # Quiz Arena: Klassik & Mega-Mix
│   ├── quiz-waldgarten/             # Waldgarten Quiz (Schwarzenburg/Heideblick) + druckfertiges QR-PDF
│   ├── quiz-military-aircraft/      # Militärflugzeuge Quiz (75 Fragen)
│   ├── quiz-airliners/              # Passagierflugzeuge Quiz (75 Fragen)
│   ├── quiz-etfs/                   # Passives Investieren & ETFs Quiz (75 Fragen)
│   └── quiz-*/                      # Weitere Themen- & Foto-Quizzes
└── cloudflare-worker/
    ├── worker.js                    # Cloudflare Worker API (Highscores, Auth, Turnstile CAPTCHA, Feedback & KI-Antworten)
    ├── schema.sql                   # Cloudflare D1 Datenbank-Schema
    └── wrangler.toml                # Cloudflare Worker Konfiguration
```

---

## 3. Checkliste beim Anlegen eines neuen Quiz (z. B. für B2B-/Shop-/Regions-Partner)

1. **Fragendatenbank anlegen:** Erstelle `shared/quiz-data/bank-<id>.js` und registriere den Pool über `ArcadeQuizEngine.registerBank('<id>', QUESTIONS)`.
2. **Quiz-Oberfläche anlegen:** Erstelle `games/quiz-<slug>/index.html` (unter 500–800 Zeilen, lädt `../../shared/quiz-engine.js` und `../../shared/quiz-data/bank-<id>.js`).
3. **Katalog-Registrierung (nur diese 3 Stellen ergänzen):**
   * `index.html` $\rightarrow$ Array `QUIZZES`
   * `shared/arcade.js` $\rightarrow$ `GAME_CATALOG`, `detectGameId()`, `FEEDBACK_TARGETS`
   * `cloudflare-worker/worker.js` $\rightarrow$ `GAMES_META`
4. **Version anlegen:** Trage das öffentliche Quiz mit seiner Hub-ID und einem Release `v0.1.0` in `shared/releases.js` ein (Regel 10). Überspringe diesen Schritt für versteckte oder Admin-Quizze.
5. **Syntax- & Funktionstest:** Führe `node --check` auf allen geänderten JS-Dateien aus.

---

## 4. Cloudflare Worker, D1 & Telegram-Automatisierung (via GitHub Actions)

* **Automatisches Worker-Deployment:** Jeder Push auf `main`, der `cloudflare-worker/**` ändert, triggert automatisch [`.github/workflows/deploy-worker.yml`](.github/workflows/deploy-worker.yml). Dieser Workflow löst die D1-Datenbank-ID auf, deployed `cloudflare-worker/worker.js` via `wrangler` auf `hunterjoe-scores.hunterjoeing.workers.dev`, synchronisiert die Worker-Secrets (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `ADMIN_SECRET`, `AGENT_API_KEY`), registriert automatisch den Telegram-Webhook (`/api/telegram/webhook`) und prüft `/api/health`.
* **D1-Operationen über `gh workflow run`:** Da `CLOUDFLARE_API_TOKEN` als GitHub Secret hinterlegt ist, können D1-Aktionen direkt aus dem Repository heraus per GitHub Actions (`gh workflow run ...`) ausgeführt werden (z. B. `promote-admin.yml`, `delete-reply.yml`). Nutze diese Workflows oder ergänze bei Bedarf einen `workflow_dispatch`-Workflow, statt den Nutzer nach manuellen Cloudflare-Klicks zu fragen.

