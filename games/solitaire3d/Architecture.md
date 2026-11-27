# 3D Spider Solitär (4 Farben) – Architecture & AI Handoff Documentation

> **Purpose:** Concise architecture reference for `games/solitaire3d/`.

---

## 1. Overview & Tech Stack

- **Game:** 3D Spider Solitär · 4 Farben (`id: 'solitaire3d'`)
- **Location:** `games/solitaire3d/`
- **Architecture:** Modular **ES Modules** (`<script type="module">`) with `<script type="importmap">` (zero build step)
- **3D Engine:** **Three.js `0.170.0`** via jsDelivr CDN
- **Arcade Shell Integration:** `../../shared/arcade.css`, `../../shared/arcade.js`, `../../shared/burger-menu.js`

---

## 2. Module Map

```text
games/solitaire3d/
├── index.html          # Importmap (Three 0.170.0), 3D stage, HUD, Dark/Light overrides, table surface/color controls
├── sol3d-main.js       # Entry point, pointer/drag/smart-tap/keyboard orchestration, undo, hints, timer, ArcadeScores
├── sol3d-logic.js      # Pure 4-suit Spider rules (104 cards / 2 decks, 10 tableau columns, 5x10 stock deals, K–A clears)
├── sol3d-scene.js      # Three.js table, camera/zoom, lighting, card meshes, smooth 3D arc animations & victory waterfall
├── sol3d-textures.js   # Procedural canvas card faces/backs (512×716 scaled from 768×1075 layout) & table surface textures
└── sol3d-audio.js      # Procedural WebAudio card snap/slide/foundation/win SFX (respects ArcadeAudio mute)
```

---

## 3. State & Integration

- **Arcade Scores:** `ArcadeScores.newRunId('solitaire3d')` and `ArcadeScores.record('solitaire3d', ...)` on win (8 completed K–A same-suit sequences).
- **Preferences:** Persisted via `localStorage` in `sol3d-main.js` (table surface `filz`/`holz`/`leder`/`matt`, custom table color, camera zoom) and `arcade_theme` (`light`/`dark`).

---

## 4. Design Decisions ("Why")

- **Pure `sol3d-logic.js` separation:** Spider move validation, same-suit sequence checks, undo snapshots, and win detection are decoupled from `sol3d-scene.js` 3D mesh transforms.
- **Scaled 512×716 card textures:** Drawing at `512×716` (scaled from the `768×1075` logical layout) preserves Jumbo-Index sharpness while cutting WebGL texture memory by ~56% for iOS Safari stability.
- **Zero-build ES Modules:** Runs directly on GitHub Pages via `importmap`.

---

## 5. Known Limitations & Open Points

- Check JS syntax with `node --check games/solitaire3d/*.js` before committing.

---

## Changelog

- **2026-11-27** (`main`) – Rewrote Architecture.md to accurately describe 3D Spider Solitär (4 Farben); patched `pointercancel` handling, win-timer race on restart, startup mute sync, debounced table color picker, Light-Mode HUD CSS, and 512×716 VRAM-optimized card textures (`v0.1.1`).
