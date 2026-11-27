# Klondike Solitaire (2D) – Architecture & AI Handoff Documentation

> **Purpose:** Concise architecture reference for `games/solitaire/`.

---

## 1. Overview & Tech Stack

- **Game:** Klondike Solitaire (`id: 'solitaire'`)
- **Location:** `games/solitaire/`
- **Architecture:** Single-file HTML/CSS/JS (`index.html`, ~49 KB)
- **Rendering:** DOM/CSS card board + dedicated `<canvas>` for the victory card-waterfall animation
- **Arcade Shell Integration:** `../../shared/arcade.css`, `../../shared/arcade.js`, `../../shared/burger-menu.js`

---

## 2. Core Systems (`index.html`)

- **Card Engine:** Standard 52-card Klondike rules (7 tableau columns, stock/waste pile, 4 foundations), pointer drag-and-drop & click/double-tap smart moves, undo stack, auto-complete on solved boards.
- **Theming & Audio:** DOM theme & card contrast adapt to `ArcadeTheme.isLight()`; SFX via `ArcadeAudio` (`cardFlip`, `click`, `pop`, `perkBad`, `win`).
- **Scoring:** `ArcadeScores.record('solitaire', finalScore, label, false)` on game win.

---

## 3. Design Decisions ("Why")

- **2D DOM vs. 3D:** Kept as a fast, lightweight DOM/CSS classic alongside the separate Three.js 3D Spider version in `games/solitaire3d/`.

---

## 4. Known Limitations & Open Points

- No build step required; edit `games/solitaire/index.html` directly.

---

## Changelog

- **2026-11-27** (`main`) – Corrected architecture rendering note (DOM/CSS board + victory waterfall canvas); fixed `pointercancel`/`blur` accidental smart-move, pre-append tableau height sizing, and exact win elapsed time (`v0.1.1`).
