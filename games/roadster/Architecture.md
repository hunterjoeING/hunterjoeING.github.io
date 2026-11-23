# Hyper-Roadster Lander – Architecture & AI Handoff Documentation

> **Purpose:** Concise architecture reference for `games/roadster/`.

---

## 1. Overview & Tech Stack

- **Game:** Hyper-Roadster Lander (`id: 'roadster'`)
- **Location:** `games/roadster/`
- **Architecture:** Single-file HTML/CSS/JS (`index.html`, ~52 KB)
- **Rendering:** 2D HTML5 `<canvas>` physics & particle simulation
- **Arcade Shell Integration:** `../../shared/arcade.css`, `../../shared/arcade.js`, `../../shared/burger-menu.js`

---

## 2. Core Systems (`index.html`)

- **Physics & Controls:** Lunar-lander-style 2D thrust/rotation/RCS cold-gas thrusters (`ArcadeAudio.coldGas()`), gravity, fuel management, and landing pad precision scoring across missions.
- **Stage Pads / Touch Controls:** Optional on-screen touch pads persisted via `localStorage` (`STAGE_PADS_KEY`).
- **Theming & Audio:** Adapts canvas HUD colors via `ArcadeTheme.isLight()`, uses `ArcadeAudio` (`click`, `pop`, `coldGas`, `win`, `explosion`).
- **Highscores:** `ArcadeScores.newRunId('roadster')`, `ArcadeScores.getBest('roadster')`, and `ArcadeScores.record('roadster', totalScore, label, false, { runId })`.

---

## 3. Design Decisions ("Why")

- **2D Canvas self-contained file:** Fast 60fps arcade physics with minimal overhead and zero external engine dependencies.

---

## 4. Known Limitations & Open Points

- No build step required; edit `games/roadster/index.html` directly.
- *(Add mission/balancing notes here.)*
