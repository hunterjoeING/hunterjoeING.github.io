# Zombie Horde: Gate Runner 3D – Architecture & AI Handoff Documentation

> **Purpose:** Concise architecture reference for `games/zombie/`.

---

## 1. Overview & Tech Stack

- **Game:** Zombie Horde: Gate Runner (`id: 'zombie'`)
- **Location:** `games/zombie/`
- **Architecture:** Modular **ES Modules** (`<script type="module">`) with `<script type="importmap">` (zero build step)
- **3D Engine:** **Three.js `0.170.0`** via jsDelivr CDN + Post-Processing (`EffectComposer`, `RenderPass`, `UnrealBloomPass`, `OutputPass`)
- **Arcade Shell Integration:** `../../shared/arcade.css`, `../../shared/arcade.js`, `../../shared/burger-menu.js`

---

## 2. Module Map

```text
games/zombie/
├── index.html          # Importmap (Three 0.170.0 + Bloom), HUD, wave/squad counter, start/gameover modals
├── zb-game.js          # Core runner loop, lane/pointer/keyboard input, gate math, waves, collisions
├── zb-scene.js         # Three.js renderer (DPR <= 2), chase camera, ResizeObserver, theme lighting, Bloom
├── zb-models.js        # Procedural 3D squad units, zombies, bosses, multiplier gates, obstacles
├── zb-effects.js       # Muzzle flashes, hit sparks, gate-pass bursts, floating combat VFX
├── zb-textures.js      # Procedural road/asphalt/gate canvas textures
└── zb-audio.js         # WebAudio SFX (respects ArcadeAudio.isMuted() / arcade_muted)
```

---

## 3. State & Integration

- **Input:** Pointer drag + Keyboard (`ArrowLeft`/`ArrowRight`/`A`/`D`) + camera toggle (`window.toggleZBCam`).
- **Theme Reactivity:** Listens to `arcade:theme-changed` and updates `zbScene.applyTheme(...)`.
- **Highscores:** `ArcadeScores.getBest('zombie')`, `ArcadeScores.record('zombie', score, `${score} Pkt (Welle ${wave})`, false)`, and `ArcadeScores.openLeaderboardModal('zombie')`.

---

## 4. Design Decisions ("Why")

- **Separation of `zb-game.js` and `zb-scene.js`:** Gate-runner math, wave scaling, and collision logic stay isolated from Three.js scene/post-processing details.
- **ResizeObserver on `#stage`:** Keeps the 3D viewport crisp on mobile orientation changes and address-bar resizing.

---

## 5. Known Limitations & Open Points

- Check JS syntax with `node --check games/zombie/*.js` before committing.
- *(Add wave balancing or boss notes here.)*
