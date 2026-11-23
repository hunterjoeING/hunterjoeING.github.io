# 3D Minesweeper – Architecture & AI Handoff Documentation

> **Purpose:** Concise architecture reference for `games/minesweeper/` so AI agents and developers can navigate the ~396 KB single-file 3D game without reading all ~11,000+ lines.

---

## 1. Overview & Tech Stack

- **Game:** 3D Minesweeper – Tech Demo (`id: 'minesweeper'`)
- **Location:** `games/minesweeper/`
- **Architecture:** Single-file HTML/CSS/JS (`index.html`, ~396 KB; logically sectioned with `// js/...` comments)
- **3D Engine:** **Three.js r128** via CDN (`https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`)
- **Arcade Shell Integration:** `../../shared/arcade.css`, `../../shared/arcade.js`, `../../shared/burger-menu.js`

---

## 2. Logical Modules inside `index.html`

- **Three.js Scene & Showroom Studio (`// js/three-setup.js`):** WebGLRenderer, procedural environment map, lighting, camera orbit/zoom/pan, background presets (`ms3d_bg_index`).
- **3D Geometries & Custom Geometry Builder:** Cube, Sphere/Icosphere, Torus, Pyramid, Cylinder, and custom user-saved 3D grid topologies (`CUSTOM_GEO_KEY` in `localStorage`).
- **Minesweeper Core Logic:** Adjacency graph across 3D surface cells, flood-fill reveal, chord-click, flag/question markers, first-click safety, timer.
- **Save Slots & Highscores:**
  - Local save slots: `ms3d_save_slot_<slotId>` (`localStorage`)
  - Local highscores: `ms3d_highscores_v1`, cached global top: `ms3d_global_top_v1`
  - Player name: `arcade_player_name`
  - Arcade integration: `ArcadeScores.record('minesweeper', timer, label, true, { sync: false })` (lower time is better) + `ArcadeScores.fetchSummary(true)`.

---

## 3. Design Decisions ("Why")

- **Single-file bundle (`index.html`):** Originally built as a self-contained AI-agent tech demo (documented in `Minesweeper3D_Architektur_und_Herkunft.pdf` at repo root) with logical `// js/...` section headers so it runs without a bundler.
- **Three.js r128 global script:** Uses classic `<script>` global `THREE` instead of ES modules for zero-build compatibility.
- **Lower-is-better scoring:** Speedrun completion time in seconds (`lowerIsBetter: true` in `shared/arcade.js` & `cloudflare-worker/worker.js`).

---

## 4. Known Limitations & Open Points

- Large single-file (`~396 KB`) — use targeted line-range edits (`rg` + `replace_file_content`) rather than full-file rewrites.
- Related comparison build lives separately in `games/minesweeper-3d-prompt-test/`.
