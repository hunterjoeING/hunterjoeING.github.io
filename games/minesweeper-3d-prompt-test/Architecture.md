# Minesweeper 3D (Prompt-Vergleichsversion) – Architecture & AI Handoff Documentation

> **Purpose:** Concise architecture reference for `games/minesweeper-3d-prompt-test/`.

---

## 1. Overview & Tech Stack

- **Game:** Minesweeper 3D Prompt-Test (`id: 'minesweeper_3d_prompt_test'`)
- **Location:** `games/minesweeper-3d-prompt-test/`
- **Architecture:** Single-file self-contained HTML/CSS/JS (`index.html`, ~72 KB)
- **3D Engine:** **Three.js r128** via CDN (`https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`)
- **Arcade Shell Integration:** `../../shared/arcade.css`, `../../shared/arcade.js`, `../../shared/burger-menu.js`

---

## 2. Key Mechanics & Integration

- **Gameplay:** Streamlined 3D Minesweeper prompt-comparison build (documented in `Nachweis_Minesweeper_3D_Prompt_Test.pdf` at repo root).
- **Theme & Audio:** Reads/writes `arcade_theme` (`light` / `dark`) and integrates `ArcadeAudio`.
- **Highscores:** `ArcadeScores.record('minesweeper_3d_prompt_test', elapsedSec, label, true, ...)` (lower time is better).

---

## 3. Design Decisions ("Why")

- **Isolated comparison directory:** Kept strictly separate from `games/minesweeper/` so prompt-benchmark results remain reproducible and unaltered (see `AGENTS.md` Do-Not-Break-Policy).

---

## 4. Known Limitations & Open Points

- Intentionally frozen as a prompt-comparison artifact; avoid refactoring unless explicitly requested.
