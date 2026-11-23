# Klondike Solitaire 3D – Architecture & AI Handoff Documentation

> **Purpose:** Concise architecture reference for `games/solitaire3d/`.

---

## 1. Overview & Tech Stack

- **Game:** Klondike Solitaire 3D (`id: 'solitaire3d'`)
- **Location:** `games/solitaire3d/`
- **Architecture:** Modular **ES Modules** (`<script type="module">`) with `<script type="importmap">` (zero build step)
- **3D Engine:** **Three.js `0.170.0`** via jsDelivr CDN
- **Arcade Shell Integration:** `../../shared/arcade.css`, `../../shared/arcade.js`, `../../shared/burger-menu.js`

---

## 2. Module Map

```text
games/solitaire3d/
├── index.html          # Importmap (Three 0.170.0), 3D stage, HUD, difficulty/draw-mode & theme controls
├── sol3d-main.js       # Entry point, input/raycasting orchestration, undo, auto-complete, ArcadeScores
├── sol3d-logic.js      # Pure Klondike rules (deck, deal, legal moves, draw-1 / draw-3, win detection)
├── sol3d-scene.js      # Three.js table, camera, lighting, card meshes, smooth 3D arc animations
├── sol3d-textures.js   # Procedural canvas card faces, backs, felt/wood table textures
└── sol3d-audio.js      # Procedural WebAudio card flip/place/win SFX (respects ArcadeAudio mute)
```

---

## 3. State & Integration

- **Arcade Scores:** `ArcadeScores.newRunId('solitaire3d')` and `ArcadeScores.record('solitaire3d', ...)` on win.
- **Preferences:** Persisted via `localStorage` in `sol3d-main.js` (e.g., draw mode, camera/table preferences) and `arcade_theme` (`light`/`dark`).

---

## 4. Design Decisions ("Why")

- **Pure `sol3d-logic.js` separation:** Card rules are decoupled from `sol3d-scene.js` so move validation, undo, and auto-complete never depend on 3D mesh transforms.
- **Zero-build ES Modules:** Runs directly on GitHub Pages via `importmap`.

---

## 5. Known Limitations & Open Points

- Check JS syntax with `node --check games/solitaire3d/*.js` before committing.
- *(Add 3D interaction or UX notes here.)*
