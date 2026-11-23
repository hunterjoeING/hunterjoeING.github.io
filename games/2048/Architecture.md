# 2048 Prism – Architecture & AI Handoff Documentation

> **Purpose:** Concise architecture reference for `games/2048/` so AI agents and developers can modify or extend the game without reverse-engineering.

---

## 1. Overview & Tech Stack

- **Game:** 2048 Prism (`id: 'p2048'`)
- **Location:** `games/2048/`
- **Architecture:** Single-file self-contained HTML/CSS/JS (`index.html`, ~30 KB)
- **Rendering:** Pure DOM + CSS Grid/transitions (no external game engine or build step)
- **Arcade Shell Integration:** `../../shared/arcade.css`, `../../shared/arcade.js`, `../../shared/burger-menu.js`

---

## 2. Structure (`index.html`)

- **Topbar & Controls:** Back to Hub (`../../index.html`), New Game, Undo, Light/Dark Theme (`ArcadeTheme`), Mute (`ArcadeAudio`), Leaderboard button.
- **Game State & Loop:**
  - `4×4` grid array (`grid`), `score`, `bestScore`, `currentRunId = ArcadeScores.newRunId('p2048')`.
  - Undo stack / previous state snapshot for single/multi-step undo.
  - Slide & merge logic in 4 directions (`up`, `down`, `left`, `right`) via Keyboard (Arrow keys / `WASD`) and Touch swipe gestures.
- **Scoring & Persistence:**
  - Local best & global leaderboard via `ArcadeScores.getBest('p2048')` and `ArcadeScores.record('p2048', score, label, false, { runId })`.
  - Theme (`arcade_theme`) and audio (`ArcadeAudio`) shared via `shared/arcade.js`.

---

## 3. Design Decisions ("Why")

- **Single-file HTML:** 2048 is lightweight (~30 KB) with zero external assets, so keeping CSS/JS inline in `index.html` avoids build tooling and guarantees instant load.
- **`p2048` Game ID:** Prefixed with `p` (`p2048` = 2048 Prism) across `shared/arcade.js`, `cloudflare-worker/worker.js`, and `index.html` to avoid numeric-only identifier issues.

---

## 4. Known Limitations & Open Points

- No build step required; edit `games/2048/index.html` directly.
- *(Add playtest notes or feature ideas here.)*
