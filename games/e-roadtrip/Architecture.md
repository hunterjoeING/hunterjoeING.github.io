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
    │   ├── subscriptions.ts    # 8 charging tariffs; Ad-hoc always on; roaming is a fixed €/kWh per provider
    │   ├── europeGeography.ts  # Coastlines, country borders & geographic polygons for EuropeMapScene
    │   ├── europeMap.ts        # CityNode[], HighwayEdge[], ChargerStation[] graph (normalized 1800×1420 coords)
    │   ├── levels.ts           # 7 campaign levels (Level 1 playable: true; Levels 2–7 defined with playable: false)
    │   └── events.ts           # Dynamic road/family/police/charger events + WifeDialogueDef[]
    ├── sim/                    # Pure simulation & persistence (framework-agnostic)
    │   ├── EnergyModel.ts      # Consumption physics, charging curve interpolation, tariff pricing
    │   ├── RoutePlanner.ts     # TripPlan, separate outbound/return corridors, forecast, live SoC, nearest charger
    │   ├── ScoringEngine.ts    # 0..1000 weighted evaluation (time, cost, stress, efficiency, decisions)
    │   └── SaveState.ts        # Campaign persistence in localStorage ('eroadtrip_campaign_v1')
    ├── phaser/                 # Phaser 3 scenes & procedural pixel art
    │   ├── GameBridge.ts       # ERoadtripBridge interface + shared TouchInput state
    │   ├── BootScene.ts        # Procedural texture initialization via PixelArtGenerator -> starts EuropeMapScene
    │   ├── PixelArtGenerator.ts# Runtime canvas/pixel-art sprite, landmark & additive light/rain texture generation
    │   ├── EuropePixelMap.ts   # Baked 900×710 pixel-art Europe canvas (coastlines, relief, forests, lakes, dark/light)
    │   ├── MapLayout.ts        # Map projection, zoom/bounds & route geometry helpers
    │   ├── EuropeMapScene.ts   # Planning map: pan/zoom, Hin/Rück icons, provider-chip tiles, hover card, SoC band on the active leg
    │   ├── AutobahnScene.ts    # Curved FSD highway: weather, lane traffic, work zones, events
    │   ├── AutobahnTraffic.ts  # Lane roster, blinkers, truck pull-outs, player lane choice
    │   ├── CityDriveScene.ts   # Top-down GTA-2 city and Autohof driving, regen, surface particles
    │   ├── PlaceStyles.ts      # Per-city palettes, landmarks, Autohof rural/classic/urban classification
    │   ├── PlacePainter.ts     # Data-driven city and Autohof worlds
    │   ├── SurfaceFx.ts        # Persistent grass tyre marks, grass clods, wet-road spray
    │   ├── CityTraffic.ts      # AI cars, pedestrians, cyclists & traffic light logic for CityDriveScene
    │   └── SoundFX.ts          # Procedural WebAudio SFX (respects ArcadeAudio mute state)
    └── ui/                     # DOM UI components (vanilla TS, no framework)
        ├── PlanningUI.ts       # Sidebar: garage, separate Hin/Rück routes, tariffs, per-leg speed signs, stage charger list
        ├── DrivingHUD.ts       # Stable in-drive HUD: SoC, cruise, time scale, Baustelle cap, pointerdown controls
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
2. **Planning Phase (`EuropeMapScene` + `EuropePixelMap` + `PlanningUI`)**:
   - `EuropePixelMap.ts` bakes a `900×710` pixel-art Europe texture (scaled `2×` to `1800×1420` with `NEAREST` filtering) per theme (`europe_map_pixel_dark` / `europe_map_pixel_light`) featuring detailed coastlines & islands, bathymetry halos, layered relief shading (brown $\rightarrow$ grey $\rightarrow$ white snow for Alps/Pyrenees/Skanden; lighter relief for low mountain ranges), large forests/national parks with deterministic green pixel trees, rivers/lakes, dashed country borders, and urban pixel city footprints. `EuropeMapScene` observes `<html data-theme>` via `MutationObserver` to switch palettes live while keeping routes, chargers, and the SoC band aligned.
   - At level start (and on route switch), **no** paid charging subscriptions and **no** charging stops are preselected (`subscriptionIds: []`, `plannedStops: []`). Ad-hoc charging stays available: its checkbox is always checked, disabled, and visually greyed. The player chooses vehicle, **outbound and return corridors independently** (`TripPlan.selectedRouteId` + `returnRouteId`; `getActiveRouteLegs()` concatenates the forward legs of the Hinweg with the reverse legs of the Rückweg), subscriptions, per-leg cruise speeds, and charging stops.
   - Each leg’s preset cruise speed is the edge’s posted limit (`HighwayEdge.speedLimitKmh`), or Richtgeschwindigkeit **130 km/h** when the edge is unlimited (`defaultLegSpeedKmh`). The stage list shows that limit as a circular sign (red ring = posted limit, blue ring = advisory 130). The speed slider updates in place on `input` and only re-renders the forecast on `change`, so mouse and touch can drag it to any integer km/h.
   - `RoutePlanner.evaluateTripPlan()` walks the composed Hin- and Rückweg: SoC, charging stops, time, and cost cover both directions.
   - `MapLayout.computeRouteSocBandSegments(..., onlyLegIndex)` still simulates SoC from the start, but emits the soft-edged light-blue 20 %→0 % band **only for the active stage**.
   - Charger markers are provider logos, coloured when that network has a subscription and grey for ad-hoc/roaming. The map toggle is “Ladestationen einblenden / ausblenden”. **Ausblenden** hides every station (no icon, no tile) so the corridors stay clear; a provider chip that is on shows only that provider’s icons on the active stage, still with no pinned tiles. **Einblenden** draws an icon for every charger on the chosen Hinweg and Rückweg. Each provider chip that is on additionally pins that provider’s detail tiles on the active stage; `resolveNonOverlappingCards` stacks nearby tiles so they do not cover each other. Hover (desktop) or tap (touch) on a visible icon opens that one card as well. Clicking a card toggles the stop and marks it. The sidebar charger list lists only the selected stage: subscribed networks at full strength, roaming/ad-hoc stations slightly greyed with a red price.
3. **Trip Execution (`AutobahnScene` $\leftrightarrow$ `CityDriveScene` $\leftrightarrow$ `EventModal`)**:
   - Starting a trip creates `RunState` and launches either `CityDriveScene` (if leg 0 has `citySegmentAtStart`) or `AutobahnScene`.
   - **`AutobahnScene`**: Leg-by-leg highway travel at `timeScale` (`1x | 5x | 15x`), with the same SoC, time, stress, events, and charger approach as before. The road is a gentle two-sine curve. Traffic density follows `HighwayEdge.baseTrafficRisk`: at high risk the right lane is mostly trucks (80–90 km/h) that often pull into the middle, the middle lane is cars at 100–120 km/h, and the left lane is fast cars that brake hard and accelerate hard when the gap is clear. Lane changers blink; only every third fast car is reckless and does not. The player car sits on the lane centre (spacing 62–78 px), picks the lane for the chosen cruise (≤100 right, ≤132 middle, otherwise left), and changes with a blinker when a slower vehicle is ahead. Some legs include a work zone (60 or 80 km/h, signs, beacons, baken, right lane closed). Inside the zone the sim clock slows to 0.85 min/s so the zone stays visible for a few seconds; `RunState.speedCapKmh` is the temporary limit and the chosen cruise stays on the leg plan. Rain, wet reflections, and sodium lamps match the city look, with fewer particles and no bloom when the view is under 640 px or a touch device under 900 px.
   - **`CityDriveScene`**: Top-down GTA-2 driving for `aachen_start`, `koeln_ring` (pass-through at the end of the outbound Aachen–Köln legs), `charger_park`, `hannover_messe`, `aachen_finish`, and `ferry_denmark`. `PlaceStyles` / `PlacePainter` build a different world per preset: Aachen sandstone and the Dom, Köln with the Dom, Rhine, and tram tracks, Hannover with the Rathaus, Hermes tower, and Messe hall. Autohöfe are smaller service areas classified as rural (fields, turbines), classic, or urban (skyline). Each has parked trucks and cars, a fuel canopy, food, a truck wash, and chargers along the canopy edge plus one reverse bay. Road coordinates for the city grid stay put so the existing traffic, zebras, and ramps still line up. Lift-off coasts at 640 px/s² (brake 1050) and lights the tail lamps. `SurfaceFx` leaves dirty tyre marks and grass clods on grass, and a speed-dependent spray only in real rain, storm, or snow. Lighting, rain, and bloom stay as in package B, reduced on mobile.
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
  - Ad-hoc (`station.baseAdhocEurPerKwh`) is always a candidate, even when `subscriptionIds` is empty.
  - Own-network price comes from the active subscription’s `pricePerKwhOwn`.
  - Roaming is **not** tier-dependent. `PROVIDER_ROAMING_EUR_PER_KWH` in `subscriptions.ts` is one fixed €/kWh per provider (EnBW M and EnBW L share `0.79`). HPC roaming sits in about **0.69–0.89 €/kWh** (AC Dorf `0.69`, EWE Go `0.75`, Tesla/EnBW `0.79`, Electra `0.84`, IONITY `0.89`).
  - Tesla vehicles still get native Supercharger pricing (`0.39 €/kWh`) on `network === 'tesla'`.

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
- **Known gameplay / UX polish:** Autobahn HUD buttons used to miss the first click because `DrivingHUD.update` replaced `innerHTML` every 0.12 s and destroyed the button mid-gesture. The shell is now stable and clicks are handled with `pointerdown` on the HUD element.

---

## 9. Changelog (For Future Agents & Collaborators)

- **2026-11-23:** Initial `Architecture.md` created for cross-tool AI handoff.
- **2026-11-23:** Added `devDependencies` to `package.json`, fixed `tsconfig.json` `typeRoots` to use local `./node_modules`, added root `.gitignore`, updated `AGENTS.md` Rule 4 for feature-branch/PR collaboration, and documented design decisions ("Why") and open points.
- **2026-11-23:** CI rebuild of `dist/e-roadtrip.js` on `main` (`.github/workflows/rebuild-e-roadtrip.yml`), `.gitattributes` so the generated bundle is not hand-merged, and `esbuild.mjs` so `npm run build` keeps Phaser as the `dist/phaser.min.js` global instead of inlining it.
- **2026-11-23:** Removed preselected charging subscriptions and stops at level start/route switch; replaced the radial 4-colour range ring with a soft-edged light-blue 20 %→0 % SoC band strictly along the selected route (`MapLayout.computeRouteSocBandSegments` + `EuropeMapScene.drawSoftRouteBand`); upgraded GTA-2 `CityDriveScene` with sidewalk-walking pedestrians that only occasionally cross zebra crossings and a real A4 motorway on-ramp passable at speed without stopping.
- **2026-11-23:** Visual overhaul (no gameplay/simulation changes): upgraded `CityDriveScene` to a GTA-2 neo-noir look using additive light sprites (streetlamps, dual headlight cones, brake/taillights, neon signs, traffic lights, police siren), faked wet-road reflections (mirrored vehicle sprites & animated specular shimmers), camera-local rain streaks/splashes with mobile-friendly counts, and optional WebGL desktop Bloom PostFX with graceful Canvas2D/mobile fallback; replaced the vector Europe map with a baked `900×710` (`2× NEAREST`) pixel-art map (`EuropePixelMap.ts` + `europeGeography.ts`) with detailed coastlines/borders, layered mountain relief (brown $\rightarrow$ grey $\rightarrow$ snow for Alps/Pyrenees/Skanden; lighter low ranges), forest/national-park pixel trees, urban city footprints, and live Dark/Light mode support.
- **2026-11-23:** Planning package C. Map detail cards only for the selected stage, and only one at a time (hover on desktop, tap on touch); a click on the card adds the stop. Provider-filter toggle replaced by “Ladestationen anzeigen / ausblenden” (coloured vs grey logos on the active stage when shown; logos only when hidden). Ad-hoc is always checked and cannot be cleared. Roaming is a fixed per-provider rate in the 0.69–0.89 €/kWh HPC band (EnBW M = EnBW L). Hinweg and Rückweg are chosen separately and both feed the stage list, stops, SoC, and cost. The 20–0 % SoC band is drawn only on the active leg. Each leg shows its speed limit as a sign and starts at that limit (130 km/h advisory when unlimited). Leg speed sliders drag freely (the forecast re-renders on release, not on every input tick). The charger directory lists only the marked stage, with roaming rows greyed and priced in red.
- **2026-11-23:** Charger-filter correction. “Ausblenden” hides every station unless a provider chip is on, in which case only that provider’s icons appear on the active stage (colour = subscription, grey = ad-hoc/roaming, no pinned tiles). “Einblenden” shows an icon for every charger on the chosen outbound and return routes, and an active chip additionally pins that provider’s detail tiles on the active stage. Nearby tiles are stacked so they do not overlap. Hover or tap on a visible icon still opens that one card, and a click on the card adds the stop.
- **2026-11-23:** Package D. Cities and Autohöfe are painted from `PlaceStyles` / `PlacePainter` (Aachen Dom, Kölner Dom on the new `koeln_ring` pass-through, Hannover Rathaus and Hermes/Messe; rural vs urban service areas with trucks, fuel, food, wash, and edge chargers). Grass keeps tyre marks and throws clods; wet roads throw a speed-dependent spray. Lift-off regen is a linear 640 px/s². The Autobahn is a curved, lit, rainy FSD scene whose traffic matches the leg’s jam risk, blinks on lane changes, holds the lane centre for the chosen speed, and sometimes runs through a 60/80 work zone. HUD controls stay in the DOM and take the first pointerdown.

