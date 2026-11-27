# Cloudflare Worker: Globale Highscores + Login, Turnstile CAPTCHA & Community-Wünsche

Dieser Ordner enthält das vollständige Backend für `https://hunterjoe-scores.hunterjoeing.workers.dev`.

## Enthaltene Features
1. **Globale Highscores (`/api/summary`, `/api/scores`)** für Spiele und Quizze.
2. **Benutzer-Login & Registrierung (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)** – Passwort-Hashing über WebCrypto `PBKDF2-SHA256` (60.000 Iterationen) und signierte `HMAC-SHA256` JWTs.
3. **Cloudflare Turnstile CAPTCHA-Schutz** – Serverseitige Überprüfung gegen `https://challenges.cloudflare.com/turnstile/v0/siteverify` bei Registrierung, Login und beim Absenden neuer Wünsche.
4. **Verbesserungswünsche & KI-Agent-Antworten (`/api/feedback`, `/api/feedback/:id/reply`, `/api/feedback/:id/vote`)** – Kommentare allgemein (`general`) oder pro Spiel/Quiz (`minesweeper`, `zombie`, `quiz_ai` usw.) inkl. Status (`open`, `in_progress`, `fixed`) und markierten Antworten von **🤖 KI-Agent (Antigravity)** bzw. **👑 Admin (Johannes)**.

## E-Roadtrip-Bestenlisten

`GET /api/summary` und `GET /api/scores?game=<id>` liefern die Gesamtbestenliste `eroadtrip` sowie `eroadtrip_l1` (Aachen ↔ Hannover Messe), `eroadtrip_l2` (Familien-Sommerurlaub) und `eroadtrip_l3` (Winter-Alpenüberquerung).

Für `POST /api/scores` braucht die Gesamtbestenliste die Level-Board-ID in `meta.board` oder `meta.levelBoard`. Der Worker prüft Punkte als ganze Zahl von 0 bis 1000, numerische `meta.minutes` ab der halben Zielzeit und numerische `meta.costEur` ab 0. Für Level 1 und 3 liegt die Obergrenze bei 20 Zielzeiten. Level 2 behält die bisherige Obergrenze von 40.800 Minuten für ältere Spielversionen. Ein mitgesendetes `meta.levelId` muss zum Board passen. Ungültige Ergebnisse liefern HTTP 400 mit `{ ok: false, error }`. Zielzeiten und Level-IDs stehen in `EROADTRIP_LEVEL_TARGETS` und müssen mit `games/e-roadtrip/src/data/levels.ts` übereinstimmen. Beim Einreichen desselben Ergebnisses für mehrere Boards braucht jedes Board eine eigene `runId`.

## Schnell-Update in deinem Cloudflare-Account

Falls du den bestehenden Worker `hunterjoe-scores` direkt im **Cloudflare Dashboard** aktualisieren möchtest:
1. Öffne im Cloudflare Dashboard **Workers & Pages** → **`hunterjoe-scores`** → **Edit Code**.
2. Ersetze den Inhalt von `worker.js` durch den Code aus [`cloudflare-worker/worker.js`](./worker.js) und klicke auf **Deploy**.
   *(Die neuen Tabellen `users`, `feedback_posts`, `feedback_replies`, `feedback_votes` legt der Worker beim ersten Aufruf automatisch per `CREATE TABLE IF NOT EXISTS` in deiner verbundenen D1-Datenbank `DB` an!)*

### Optional: Cloudflare Turnstile Sitekey & Secrets hinterlegen
Unter **Turnstile** im Cloudflare Dashboard kannst du kostenlos ein Widget für `hunterjoeing.github.io` (bzw. deine Domain) anlegen:
- Den **Sitekey** trägst du in `shared/arcade.js` bei `TURNSTILE_SITE_KEY` ein (standardmäßig ist der offizielle Cloudflare-Turnstile-Key hinterlegt, sodass das Widget sofort funktioniert).
- Den **Secret Key** sowie die Worker-Secrets hinterlegst du als GitHub-Repository-Secrets (synchronisiert über `.github/workflows/deploy-worker.yml`) oder direkt in den Worker-Einstellungen unter **Settings → Variables and Secrets**:
  - `TURNSTILE_SECRET_KEY`: Dein Turnstile Secret Key
  - `JWT_SECRET`: Langer Zufallsstring (wird vom Deploy-Workflow automatisch provisioniert, falls noch nicht gesetzt)
  - `TELEGRAM_WEBHOOK_SECRET`: Secret-Token für `X-Telegram-Bot-Api-Secret-Token` (wird automatisch gesetzt und an Telegram übergeben)
  - `AGENT_API_KEY`: Optionaler API-Key für direkte Assistenten-Antworten per Header `X-Agent-Key`
  - **Admin-Rolle vergeben:** Ausschließlich serverseitig per GitHub-Workflow `promote-admin.yml` (nicht mehr über öffentliche Login-/Reply-Routen).
