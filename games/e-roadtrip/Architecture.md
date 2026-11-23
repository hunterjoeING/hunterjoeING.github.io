# E-Roadtrip – Architecture & AI Handoff Documentation

> **Purpose:** Machine- and human-readable architecture reference for `games/e-roadtrip/`. Intended as a shared handoff interface between different AI agents and developers so changes can be made without reverse-engineering the codebase.

---

## 1. Overview & Tech Stack

- **Game:** E-Roadtrip – Pixel-Art EV Roadtrip Planning & GTA-2 Style Driving Simulation
- **Location:** `games/e-roadtrip/`
- **Runtime:** Browser (static HTML/CSS + pre-bundled IIFE JS, hosted on GitHub Pages)
- **Engine & Language:** **Phaser 3** (`./dist/phaser.min.js`) + **TypeScript** (`ES2020`, `strict: true`)
- **Bundler:** `esbuild` (`src/main.ts` $\rightarrow$ `dist/e-roadtrip.js`, global name `ERoadtripApp`, inline sourcemap)
- **Arcade Shell Integration:** Loads `../../shared/arcade.css`, `../../shared/arcade.js`, and `../../shared/burger-menu.js` from the root repository.

### Build & Typecheck Commands
From `games/e-roadtrip/` (see `package.json`, `esbuild.mjs` & `tsconfig.json`):
```bash
npm install         # installs esbuild, phaser, typescript into local node_modules (gitignored)
npm run typecheck   # tsc --noEmit
npm run build       # node esbuild.mjs
```
`esbuild.mjs` bundles `src/main.ts` as an IIFE named `ERoadtripApp` (`--bundle --format=iife --global-name=ERoadtripApp --outfile=dist/e-roadtrip.js --sourcemap=inline`). A `phaser-global` plugin resolves `import … from 'phaser'` to `window.Phaser`, loaded by `index.html` from `dist/phaser.min.js`. Phaser is not inlined into the game bundle.

> **Bundle & Merge Policy:** GitHub Pages serves `dist/e-roadtrip.js` directly, so rebuilt bundles must be committed alongside `src/` changes. **Never resolve merge conflicts inside `dist/e-roadtrip.js` manually** — after merging `src/` changes, simply re-run `npm run build` and commit the freshly generated bundle.
>
> **CI rebuild:** A push to `main` that changes `games/e-roadtrip/src/**`, `package.json`, `package-lock.json`, `tsconfig.json`, or `esbuild.mjs` runs [`.github/workflows/rebuild-e-roadtrip.yml`](../../.github/workflows/rebuild-e-roadtrip.yml) (`npm ci`, typecheck, build) and commits `dist/e-roadtrip.js` back to `main` only when the bytes changed. The workflow does not watch `dist/`, and the commit uses the default `GITHUB_TOKEN`, so that push does not start another run. The root `.gitattributes` marks the bundle `-diff linguist-generated merge=binary`: GitHub collapses the diff, and a merge keeps our side without inserting conflict markers. Finish a conflict by rebuilding, not by editing the file.

---

## 2. Directory & Module Map

```text
games/e-roadtrip/
├── index.html                  # Host page, topbar, #phaser-stage, #er-planner-panel, HUD & modal containers
├── styles.css                  # Light/Dark theme styles, responsive workspace, HUD, modals, touch controls
├── package.json                # typecheck & build scripts
├── tsconfig.json               # TypeScript strict config
├── dist/
│   ├── phaser.min.js           # Pre-bundled Phaser 3 runtime
│   └── e-roadtrip.js           # Compiled IIFE bundle of src/main.ts
└── src/
    ├── main.ts                 # ERoadtripController (central orchestrator, DOM ↔ Phaser lifecycle)
    ├── types.ts                # All TypeScript domain models & state interfaces
    ├── data/                   # Static game data (no simulation logic)
    │   ├── vehicles.ts         # 9 EVs (MG4, Model S 2015, ID.3, Model 3/Y, XPeng G6, EV6, ID.7, Taycan)
    │   ├── subscriptions.ts    # 8 charging tariffs/subscriptions (Ad-hoc, Tesla, EnBW M/L, EWE Go, Electra, Ionity, AC)
    │   ├── europeGeography.ts  # Coastlines, country borders & geographic polygons for EuropeMapScene
    │   ├── europeMap.ts        # CityNode[], HighwayEdge[], ChargerStation[] graph (normalized 1800×1420 coords)
    │   ├── levels.ts           # 7 campaign levels (Level 1 playable: true; Levels 2–7 defined with playable: false)
    │   └── events.ts           # Dynamic road/family/police/charger events + WifeDialogueDef[]
    ├── sim/                    # Pure simulation & persistence (framework-agnostic)
    │   ├── EnergyModel.ts      # Consumption physics, charging curve interpolation, tariff pricing
    │   ├── RoutePlanner.ts     # TripPlan creation, full-trip forecast, live SoC prediction, nearest charger search
    │   ├── ScoringEngine.ts    # 0..1000 weighted evaluation (time, cost, stress, efficiency, decisions)
    │   └── SaveState.ts        # Campaign persistence in localStorage ('eroadtrip_campaign_v1')
    ├── phaser/                 # Phaser 3 scenes & procedural pixel art
    │   ├── GameBridge.ts       # ERoadtripBridge interface + shared TouchInput state
    │   ├── BootScene.ts        # Procedural texture initialization via PixelArtGenerator -> starts EuropeMapScene
    │   ├── PixelArtGenerator.ts# Runtime canvas/pixel-art sprite & landmark generation
    │   ├── MapLayout.ts        # Map projection, zoom/bounds & route geometry helpers
    │   ├── EuropeMapScene.ts   # Interactive planning map (pan/zoom, route selection, charger pins, provider filter)
    │   ├── AutobahnScene.ts    # Highway autopilot/cruise simulation, weather, traffic, events, charger approach
    │   ├── CityDriveScene.ts   # Top-down GTA-2 style manual driving (start, charger park, destination, ferry)
    │   ├── CityTraffic.ts      # AI cars, pedestrians, cyclists & traffic light logic for CityDriveScene
    │   └── SoundFX.ts          # Procedural WebAudio SFX (respects ArcadeAudio mute state)
    └── ui/                     # DOM UI components (vanilla TS, no framework)
        ├── PlanningUI.ts       # Sidebar: level selector, vehicle garage, route options, tariffs, stop list, forecast
        ├── DrivingHUD.ts       # In-drive HUD: SoC, speed slider, time scale (1x/5x/15x), stress, bladder, touch pad
        ├── BreakPixelAnim.ts   # Pixel-art mini-animations during charging/break activities
        ├── EventModal.ts       # Modals: live charging curve, dynamic events, wife dialogues, map peek, breakdowns
        ├── ResultsUI.ts        # End-of-trip scorecard, sub-scores, incident log, prize payout, next level
        └── TouchscreenWidget.ts# On-screen D-pad/pedals/horn bound to TouchInput
```

---

## 3. Core Architecture & Control Flow

### 3.1 Central Controller & Bridge Pattern
- **`ERoadtripController`** (`src/main.ts`) owns:
  - `CampaignSave` (`SaveState.ts`)
  - Active `LevelConfig` & `TripPlan`
  - The `Phaser.Game` instance (mounted in `#phaser-stage`)
  - All DOM UI instances (`PlanningUI`, `DrivingHUD`, `EventModal`, `ResultsUI`)
  - The **`ERoadtripBridge`** (`src/phaser/GameBridge.ts`), which is passed into Phaser scenes on `scene.start(..., { bridge })`.

Phaser scenes **never** manipulate DOM UI directly. Instead, they read state from `bridge` and emit callbacks (`onMapSelectCharger`, `onAutobahnHudTick`, `onTriggerChargerSegment`, `onTriggerCitySegment`, `onCitySegmentComplete`, `onDynamicEventTrigger`, `onWifeDialogueTrigger`, `onCollisionEvent`, `onPoliceViolation`, `onBatteryDepleted`) back to `ERoadtripController`.

### 3.2 Gameplay Loop & Scene Transitions
1. **Boot (`BootScene`)**:
   - Generates all pixel-art textures via `PixelArtGenerator` and starts `EuropeMapScene`.
   - Calls `bridge.onBootReady()` $\rightarrow$ `PlanningUI` renders.
2. **Planning Phase (`EuropeMapScene` + `PlanningUI`)**:
   - At level start (and on route switch), **no** charging subscriptions and **no** charging stops are preselected (`subscriptionIds: []`, `plannedStops: []`); the player chooses vehicle, route (`RouteOption`), subscriptions (`SubscriptionSpec[]`), leg target speeds, and charging stops (`PlannedStop[]` via map pins or sidebar).
   - `RoutePlanner.evaluateTripPlan()` computes live feasibility, predicted arrival SoCs, and cost/time estimates.
   - `MapLayout.computeRouteSocBandSegments()` projects the stretches along the active route where predicted SoC drops from `20 %` to `0 %`, rendered in `EuropeMapScene` as a soft-edged, semi-transparent light-blue band along the selected route (no radial range ring).
3. **Trip Execution (`AutobahnScene` $\leftrightarrow$ `CityDriveScene` $\leftrightarrow$ `EventModal`)**:
   - Starting a trip creates `RunState` and launches either `CityDriveScene` (if leg 0 has `citySegmentAtStart`) or `AutobahnScene`.
   - **`AutobahnScene`**: Simulates leg-by-leg highway travel at `timeScale` (`1x | 5x | 15x`). Updates `socPct`, `elapsedMinutes`, `stress`, `bladderNeed`, weather, dynamic events, wife dialogues, and approaches planned `ChargerStation`s.
   - **`CityDriveScene`**: Top-down GTA-2 style manual driving (`WASD`/Arrows or `TouchscreenWidget`) for `CityDrivePreset` (`aachen_start`, `charger_park`, `hannover_messe`, `aachen_finish`, `ferry_denmark`). Enforces traffic lights (`red_light`), crosswalks (`zebra_crossing` only while a pedestrian is actively crossing), and collisions (`CityTraffic`). Pedestrians stroll along sidewalks throughout the city and only occasionally cross a zebra crossing when clear (with cooldowns so crossings are never permanently blocked). In `aachen_start`, the A4 motorway on-ramp extends east from Top Ave and is passable at speed without stopping.
   - **`EventModal`**: Pauses simulation (`bridge.paused = true`) for interactive charging (real-time simulated charging curve + break activities like `eat`, `toilet`, `dog`, `children`, `shopping`), dynamic events, wife dialogues, or live map peek.
4. **Completion (`ScoringEngine` + `ResultsUI`)**:
   - `finishLevel(cleanArrival)` runs `evaluateRun()`, awards `prizeMoneyEur`, unlocks `level.order + 1`, persists `CampaignSave` to `localStorage`, and renders `ResultsUI`.

---

## 4. Key Simulation Rules (`src/sim/`)

### 4.1 Energy & Tariff Model (`EnergyModel.ts`)
- **`computeConsumptionKwh100(...)`**:
  - Speed drag: Above 100 km/h, consumption scales with `(speedRatio^1.82 - 1) * vehicle.aeroFactor * 0.62`.
  - Weather multipliers (`rain`, `fog`, `storm`, `snow`) scaled by `vehicle.weatherSensitivity`.
  - Elevation: `+0.0056 kWh/m` climb, `-0.0033 kWh/m` descent (60% recuperation).
  - Trailer: `1.42 + (trailerWeightKg / 1500) * 0.18` (reduced by `0.14` when `behindTruck` slipstream is active).
- **`getChargingPowerKw(vehicle, station, socPct)`**:
  - Piecewise-linear interpolation along `vehicle.chargingCurve`, capped by `station.maxKw`.
- **`getBestPriceForStation(station, subscriptionIds, vehicle)`**:
  - Automatically applies native Tesla Supercharger pricing (`0.39 €/kWh`) when `vehicle.isTesla && station.network === 'tesla'`. Otherwise picks the lowest rate among active subscriptions (`pricePerKwhOwn` vs. `pricePerKwhRoaming`) and `station.baseAdhocEurPerKwh`.

### 4.2 Scoring (`ScoringEngine.ts`)
- Produces `totalScore` in `100..1000` from weighted sub-scores (`0..100` each):
  - `time`, `cost`, `stress`, `efficiency`, `decisions` (weights defined per level in `LevelConfig.scoringWeights`).
- Grades: `>= 880` (S-Rang), `>= 760` (A-Rang), `>= 620` (B-Rang), `480..619` (Solide), `< 480` (C-Rang).

### 4.3 Persistence (`SaveState.ts`)
- `localStorage` key: `eroadtrip_campaign_v1`
- Stores: `cashEur` (initial `26000`), `ownedVehicleId`, `unlockedLevelOrder`, `completedLevels` (`bestScore`, `bestMinutes`).

---

## 5. Content Inventory & Current Status

- **Map Graph (`src/data/europeMap.ts`)**: Normalized `1800×1420` Europe pixel coordinates with `CityNode[]`, `HighwayEdge[]` (distance, speed limit, elevation, tolls, vignette, weather, waypoints), and `ChargerStation[]` (`tesla`, `enbw`, `ewego`, `electra`, `ionity`, `ac_village`).
- **Vehicles (`src/data/vehicles.ts`)**: 9 vehicles (`mg4_standard`, `tesla_model_s_2015`, `vw_id3_pro`, `tesla_model_3_highland`, `tesla_model_y_lr`, `xpeng_g6_lr`, `kia_ev6_gtline`, `vw_id7_tourer`, `porsche_taycan`).
- **Levels (`src/data/levels.ts`)**:
  - `level_1_aachen_hannover` (**`playable: true`**) – Aachen $\leftrightarrow$ Hannover Messe (3 route options).
  - `level_2_family_summer` through `level_7_nordkapp_ultimate` (**`playable: false`**) – Pre-configured routes, passengers, and rulesets ready to be enabled/expanded.

---

## 6. Host Repository Integration (`hunterjoeING.github.io`)

- **Game ID:** `eroadtrip`
- **Registered in:**
  - `index.html` (game card + JSON-LD)
  - `shared/arcade.js` (`GAME_CATALOG`, `detectGameId()`, `FEEDBACK_TARGETS`)
  - `shared/burger-menu.js` (`GAMES` list)
  - `cloudflare-worker/worker.js` (`GAMES_META`)
- **Theming:** Reads `document.documentElement.getAttribute('data-theme')` (`light` / `dark`) via `bridge.isLightTheme()` and `styles.css`.

---

## 7. Design Decisions ("Why")

- **Pre-bundled IIFE in `dist/` (`esbuild` + `phaser.min.js`):** The host repository is a pure static GitHub Pages site without a server-side build pipeline. Pre-bundling `src/main.ts` as an IIFE keeps `games/e-roadtrip/index.html` zero-config in production while still allowing strict TypeScript development.
- **`ERoadtripBridge` decoupling (`src/phaser/GameBridge.ts`):** Phaser scenes (`EuropeMapScene`, `AutobahnScene`, `CityDriveScene`) communicate exclusively via `ERoadtripBridge` callbacks rather than touching DOM elements. This keeps simulation/UI state in `ERoadtripController` + `PlanningUI` / `DrivingHUD` / `EventModal` and makes both sides independently testable and replaceable.
- **Procedural pixel art (`PixelArtGenerator.ts`) & inline geography (`europeGeography.ts`):** All sprites, vehicles, and European landmarks are generated at boot on HTML5 canvases rather than loaded from external PNGs. This eliminates asset-loading latency, broken relative paths, and licensing issues.
- **Framework-agnostic `src/sim/`:** `EnergyModel`, `RoutePlanner`, `ScoringEngine`, and `SaveState` have zero Phaser or DOM dependencies so forecasts in `PlanningUI` and live ticks in `AutobahnScene` share the exact same physics/tariff math.
- **Staged campaign (`playable: false` on Levels 2–7):** Levels 2–7 are pre-scaffolded in `src/data/levels.ts` with route options, passenger profiles, and scoring weights so future iterations can focus on level-specific balancing, city presets, and events without redesigning `types.ts`.

---

## 8. Known Limitations & Open Points

- **Levels 2–7:** Currently gated with `playable: false` in `src/data/levels.ts`; city presets (`CityDrivePreset`) and level-specific events/balancing still need end-to-end playtesting before unlocking.
- **Automated bundle builds:** On `main`, `.github/workflows/rebuild-e-roadtrip.yml` rebuilds `dist/e-roadtrip.js` when `src/` or the package files change and commits it only if the output differs. If the bundle conflicts, run `npm run build` — do not edit the file. The diff stays collapsed via `.gitattributes` (`linguist-generated`).
- **Automated tests:** There is currently no unit test suite for `src/sim/` (`EnergyModel`, `RoutePlanner`, `ScoringEngine`) — only `npm run typecheck` (`tsc --noEmit`).
- **Known gameplay / UX polish:** *(Add concrete bug reports or balancing notes from playtests here.)*

---

## 9. Changelog (For Future Agents & Collaborators)

- **2026-11-23:** Initial `Architecture.md` created for cross-tool AI handoff.
- **2026-11-23:** Added `devDependencies` to `package.json`, fixed `tsconfig.json` `typeRoots` to use local `./node_modules`, added root `.gitignore`, updated `AGENTS.md` Rule 4 for feature-branch/PR collaboration, and documented design decisions ("Why") and open points.
- **2026-11-23:** CI rebuild of `dist/e-roadtrip.js` on `main` (`.github/workflows/rebuild-e-roadtrip.yml`), `.gitattributes` so the generated bundle is not hand-merged, and `esbuild.mjs` so `npm run build` keeps Phaser as the `dist/phaser.min.js` global instead of inlining it.
- **2026-11-23:** Removed preselected charging subscriptions and stops at level start/route switch; replaced the radial 4-colour range ring with a soft-edged light-blue 20 %→0 % SoC band strictly along the selected route (`MapLayout.computeRouteSocBandSegments` + `EuropeMapScene.drawSoftRouteBand`); upgraded GTA-2 `CityDriveScene` with sidewalk-walking pedestrians that only occasionally cross zebra crossings and a real A4 motorway on-ramp passable at speed without stopping.

