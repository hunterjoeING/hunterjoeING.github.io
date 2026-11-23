# Podracer 3D – Architecture & AI Handoff Documentation

> **Purpose:** Concise architecture reference for `games/podracer/` so AI agents and developers can extend tracks, craft physics, or visuals without reverse-engineering.

---

## 1. Overview & Tech Stack

- **Game:** Podracer 3D (`id: 'podracer'`)
- **Location:** `games/podracer/`
- **Architecture:** Modular **ES Modules** (`<script type="module">`) with `<script type="importmap">` (zero build step)
- **3D Engine:** **Three.js `0.170.0`** via jsDelivr CDN + Post-Processing (`EffectComposer`, `RenderPass`, `UnrealBloomPass`, `OutputPass`)
- **Arcade Shell Integration:** `../../shared/arcade.css`, `../../shared/arcade.js`, `../../shared/burger-menu.js`

---

## 2. Module Map

```text
games/podracer/
├── index.html          # Importmap (Three 0.170.0 + Bloom), HUD, pilot name input, local/global board UI
├── pod-game.js         # Entry point (PodracerGame class), race loop, input, localStorage & ArcadeScores
├── pod-scene.js        # Three.js renderer, camera chase rig, lighting, post-processing bloom, resize
├── pod-track.js        # Procedural 3D spline track, canyon/desert geometry, checkpoints, gates, collisions
├── pod-craft.js        # Podracer 3D mesh, twin-engine physics, boost, heat/shield, hover dynamics
├── pod-textures.js     # Procedural canvas textures (sand, metal, energy binders, decals)
└── pod-audio.js        # WebAudio procedural engine hum, boost, collisions (respects ArcadeAudio mute)
```

---

## 3. State & Persistence

- **Local Leaderboard:** `LOCAL_BOARD_KEY` in `localStorage` + `PILOT_NAME_KEY` (synced with `ArcadeScores.getPlayerName()` / `setPlayerName()`).
- **Global Leaderboard:** `ArcadeScores.newRunId('podracer')` and `ArcadeScores.record('podracer', finalScore, label, false, { runId })`.

---

## 4. Design Decisions ("Why")

- **Native ES Modules + `importmap`:** Modularizes ~100 KB of 3D code cleanly across 6 focused files while still running directly on static GitHub Pages without `npm`/`esbuild`.
- **Procedural textures & audio:** Zero external `.png`/`.mp3` assets; everything is generated at runtime for instant load.

---

## 5. Known Limitations & Open Points

- Check JS syntax with `node --check games/podracer/*.js` before committing.
- *(Add track/physics tuning notes here.)*
