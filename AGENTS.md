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
4. **Gezielte, chirurgische Edits statt Komplett-Überschreibungen:**
   * Nutze gezielte Zeilen-Ersetzungen anstatt große Dateien komplett neu zu schreiben.
   * Prüfe nach jeder JS-Änderung die Syntax mit `node --check <datei.js>`.
5. **Mobile-First & Android/iOS-Stabilität:**
   * Fixierte Hintergrund-Canvas-Elemente (`#cosmos-canvas`) müssen `height: 100lvh` (`top: 0; left: 0`) nutzen und dürfen bei Touch-Scroll (`e.pointerType !== 'mouse'`) oder beim Ein-/Ausblenden der mobilen Adressleiste keine Kamera- oder Layout-Sprünge auslösen.
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
│   ├── quiz-engine.js               # Zentrale Quiz-Logik (Seen-Tracking, 1.000+-Fragen-Generator, Rundenlänge, Timer/Entspannt)
│   └── quiz-data/                   # Reine Quiz-Fragendatenbanken (strikt getrennt von der UI-Logik)
│       ├── bank-waldgarten.js       # 1.000 Fragen: Natur, Vögel, Wildtiere & Geschichte Schwarzenburg (Heideblick)
│       ├── bank-ai.js               # Fragenpool: Künstliche Intelligenz
│       ├── bank-movies.js           # Fragenpool: Kino & Filme (ohne RomComs)
│       ├── bank-egypt.js            # Fragenpool: Ägyptische Geschichte
│       ├── bank-diving.js           # Fragenpool: Tauchen & Scuba Diving
│       ├── bank-emobility.js        # Fragenpool: E-Mobilität & Tesla
│       ├── bank-history.js          # Fragenpool: Weltgeschichte
│       ├── bank-china.js            # Fragenpool: Neuere Chinesische Geschichte
│       ├── bank-politics.js         # Fragenpool: Politik & Ökonomie
│       └── bank-general.js          # Fragenpool: Quiz-Arena Klassik
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
│   └── quiz-*/                      # Weitere Themen-Quizzes
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
