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
4. **Sofort committen & pushen:** Committe und pushe fertige Änderungen sofort nach jeder einzelnen abgeschlossenen Datei auf GitHub – sammle niemals mehrere Dateien bis zum Schluss.
5. **Syntax-Check vor jedem Commit:** Führe vor jedem Commit `node --check` auf alle geänderten JS-Dateien aus, damit `main` jederzeit fehlerfrei bleibt.
6. **Gezielte, chirurgische Edits statt Komplett-Überschreibungen:**
   * Nutze gezielte Zeilen-Ersetzungen anstatt große Dateien komplett neu zu schreiben.
   * Prüfe nach jeder JS-Änderung die Syntax mit `node --check <datei.js>`.
5. **Mobile-First & Android/iOS-Stabilität:**
   * Fixierte Hintergrund-Canvas-Elemente (`#cosmos-canvas` und `.cosmos-vignette`) müssen `height: 100lvh` (`left: 0; bottom: 0` auf Android/Desktop bzw. `top: 0; bottom: auto` per `@supports (-webkit-touch-callout: none)` auf iOS) nutzen, `transform-origin` am `#hub-shell` auf den sichtbaren Viewport begrenzen (`min(35lvh, 300px)`) und bei Touch-Scroll (`e.pointerType !== 'mouse'`) oder beim Ein-/Ausblenden der mobilen Adressleiste keinerlei Kamera- oder Layout-Sprünge auslösen.
   * Alle Seiten müssen sowohl den **Dark Mode** als auch den **Light Mode** (`html[data-theme="light"]` via `ArcadeTheme`) sauber unterstützen.

---

## 2. Verzeichnis- & Architektur-Struktur

```text
/
├── AGENTS.md                        # Verbindliche Projekt-Verfassung für KI-Agenten
├── index.html                       # Haupt-Hub (Spiele- & Quiz-Übersicht, 3D-Hintergrund, Community-Board)
├── impressum.html                   # Impressum nach § 5 DDG (Johannes Rudolph, Aachen)
├── datenschutz.html                 # Datenschutzerklärung (DSGVO, LocalStorage, Cloudflare Turnstile/D1)
├── shared/
│   ├── arcade.css                   # Globales Design-System, Dark/Light-Theme, Nav, Modals, Feedback-UI
│   ├── arcade.js                    # Globale Services (ArcadeAudio, ArcadeTheme, ArcadeScores, ArcadeAuth, ArcadeFeedback)
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
├── games/
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
4. **Syntax- & Funktionstest:** Führe `node --check` auf allen geänderten JS-Dateien aus.

---

## 4. Cloudflare Worker, D1 & Telegram-Automatisierung (via GitHub Actions)

* **Automatisches Worker-Deployment:** Jeder Push auf `main`, der `cloudflare-worker/**` ändert, triggert automatisch [`.github/workflows/deploy-worker.yml`](.github/workflows/deploy-worker.yml). Dieser Workflow löst die D1-Datenbank-ID auf, deployed `cloudflare-worker/worker.js` via `wrangler` auf `hunterjoe-scores.hunterjoeing.workers.dev`, synchronisiert die Worker-Secrets (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `ADMIN_SECRET`, `AGENT_API_KEY`), registriert automatisch den Telegram-Webhook (`/api/telegram/webhook`) und prüft `/api/health`.
* **D1-Operationen über `gh workflow run`:** Da `CLOUDFLARE_API_TOKEN` als GitHub Secret hinterlegt ist, können D1-Aktionen direkt aus dem Repository heraus per GitHub Actions (`gh workflow run ...`) ausgeführt werden (z. B. `promote-admin.yml`, `delete-reply.yml`). Nutze diese Workflows oder ergänze bei Bedarf einen `workflow_dispatch`-Workflow, statt den Nutzer nach manuellen Cloudflare-Klicks zu fragen.

