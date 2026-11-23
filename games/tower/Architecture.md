# Bastion Tower Defense 3D – Architecture & AI Handoff Documentation

> **Purpose:** Concise architecture reference for `games/tower/`.

---

## 1. Overview & Tech Stack

- **Game:** Bastion Tower Defense (`id: 'tower'`)
- **Location:** `games/tower/`
- **Architecture:** Modular **ES Modules** (`<script type="module">`) with `<script type="importmap">` (zero build step)
- **3D Engine:** **Three.js `0.170.0`** via jsDelivr CDN + Post-Processing (`EffectComposer`, `RenderPass`, `UnrealBloomPass`, `OutputPass`)
- **Arcade Shell Integration:** `../../shared/arcade.css`, `../../shared/arcade.js`, `../../shared/burger-menu.js`

---

## 2. Module Map

```text
games/tower/
├── index.html          # Importmap (Three 0.170.0 + Bloom), HUD, tower shop, wave controls, overlays
├── td-game.js          # Game state, wave spawner, tower placement/upgrades, economy, ArcadeScores
├── td-scene.js         # Three.js renderer (DPR <= 2), map grid, camera pan/zoom, theme lighting, Bloom
├── td-models.js        # Procedural 3D meshes for towers, enemies, projectiles, bastion
├── td-effects.js       # 3D particles, laser/splash VFX, floating damage/explosion effects
├── td-textures.js      # Procedural canvas textures for terrain, paths, and materials
└── td-audio.js         # WebAudio SFX (respects ArcadeAudio.isMuted() / arcade_muted)
```

---

## 3. State & Integration

- **Theme Reactivity:** Listens to `window.addEventListener('arcade:theme-changed', ...)` and calls `tdScene.applyTheme(...)`.
- **Highscores:** `ArcadeScores.newRunId('tower')`, `ArcadeScores.getBest('tower')`, and `ArcadeScores.record('tower', score, `${score} Pkt (Welle ${wave})`, false, { runId })`.

---

## 4. Design Decisions ("Why")

- **Split rendering (`td-scene.js` / `td-models.js` / `td-effects.js`) vs. logic (`td-game.js`):** Preserves wave balancing, tower stats, and `ArcadeScores` integration cleanly while allowing independent 3D visual upgrades.
- **DPR capped at `2`:** Prevents GPU fill-rate bottlenecks on high-DPI mobile screens.

---

## 5. Known Limitations & Open Points

- Check JS syntax with `node --check games/tower/*.js` before committing.
- *(Add wave balancing or tower notes here.)*
