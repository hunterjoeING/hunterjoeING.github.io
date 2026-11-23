# Klondike Solitaire (2D) – Architecture & AI Handoff Documentation

> **Purpose:** Concise architecture reference for `games/solitaire/`.

---

## 1. Overview & Tech Stack

- **Game:** Klondike Solitaire (`id: 'solitaire'`)
- **Location:** `games/solitaire/`
- **Architecture:** Single-file HTML/CSS/JS (`index.html`, ~49 KB)
- **Rendering:** 2D HTML5 `<canvas>` + DOM controls
- **Arcade Shell Integration:** `../../shared/arcade.css`, `../../shared/arcade.js`, `../../shared/burger-menu.js`

---

## 2. Core Systems (`index.html`)

- **Card Engine:** Standard 52-card Klondike rules (7 tableau columns, stock/waste pile, 4 foundations), drag-and-drop & click-to-move/auto-move, undo stack, auto-complete on solved boards.
- **Theming & Audio:** Canvas background & card contrast adapt to `ArcadeTheme.isLight()`; SFX via `ArcadeAudio` (`cardFlip`, `click`, `pop`, `perkBad`, `win`).
- **Scoring:** `ArcadeScores.record('solitaire', finalScore, label, false)` on game win.

---

## 3. Design Decisions ("Why")

- **2D Canvas vs. 3D:** Kept as a fast, lightweight 2D classic alongside the separate Three.js version in `games/solitaire3d/`.

---

## 4. Known Limitations & Open Points

- No build step required; edit `games/solitaire/index.html` directly.
- *(Add rule/UX notes here.)*
