# E-Roadtrip – Architecture & AI Handoff Documentation

> **Purpose:** Machine- and human-readable architecture reference for `games/e-roadtrip/`. Intended as a shared handoff interface between different AI agents and developers so changes can be made without reverse-engineering the codebase.

---

## 1. Overview & Tech Stack

- **Game:** e-Roadtrip: Pixel Europe, a pixel-art EV road trip with top-down city driving
- **Location:** `games/e-roadtrip/`
- **Runtime:** Browser (static HTML/CSS + pre-bundled IIFE JS, hosted on GitHub Pages)
- **Engine & Language:** **Phaser 3** (`./dist/phaser.min.js`) + **TypeScript** (`ES2020`, `strict: true`)
- **Bundler:** `esbuild` (`src/main.ts` $\rightarrow$ `dist/e-roadtrip.js`, global name `ERoadtripApp`, inline sourcemap)
- **Arcade Shell Integration:** Loads `../../shared/arcade.css`, `../../shared/arcade.js`, and `../../shared/burger-menu.js` from the root repository.

### Build and checks

Run these commands from `games/e-roadtrip/`. See `package.json`, `esbuild.mjs`, and `tsconfig.json`.
```bash
npm ci              # installs locked dependencies into node_modules
npm run typecheck   # tsc --noEmit
npm run build       # node esbuild.mjs
node --check dist/e-roadtrip.js
npm test
```
`esbuild.mjs` bundles `src/main.ts` as an IIFE named `ERoadtripApp` (`--bundle --format=iife --global-name=ERoadtripApp --outfile=dist/e-roadtrip.js --sourcemap=inline`). A `phaser-global` plugin resolves `import … from 'phaser'` to `window.Phaser`, loaded by `index.html` from `dist/phaser.min.js`. The inline sourcemap (`sourcemap: 'inline'`) accounts for most of the roughly 2.1 MB game bundle. Phaser is served separately.

GitHub Pages serves `dist/e-roadtrip.js` directly. Rebuild and commit it with changes to `src/`. Resolve bundle conflicts by merging the source and running `npm run build`. The root `.gitattributes` marks the bundle `-diff linguist-generated merge=binary` so Git retains the current side in a conflict without inserting markers.

A push to `main` that changes `games/e-roadtrip/src/**`, `package.json`, `package-lock.json`, `tsconfig.json`, or `esbuild.mjs` runs `npm ci`, typecheck, tests, and build. CI commits the generated bundle back to `main` only if its bytes change. The path filter excludes `dist/` and the commit uses the default `GITHUB_TOKEN`. [CI rebuild workflow](../../.github/workflows/rebuild-e-roadtrip.yml)

---

## 2. Directory & Module Map

```text
games/e-roadtrip/
├── index.html                  # Host page, topbar version and leaderboard buttons, Phaser stage, planner, HUD & modals
├── styles.css                  # Light/Dark theme styles, responsive workspace, HUD, modals, touch controls
├── package.json                # Game version and typecheck, build, and test scripts
├── package-lock.json           # Locked npm dependency tree
├── esbuild.mjs                 # IIFE build with host-supplied Phaser and version from package.json
├── tsconfig.json               # TypeScript strict config
├── dist/
│   ├── phaser.min.js           # Pre-bundled Phaser 3 runtime
│   └── e-roadtrip.js           # Compiled IIFE bundle of src/main.ts
├── tests/                     # Node regression tests with an esbuild test bundle
│   ├── run.mjs                 # Builds in the OS temp directory and registers the tests
│   ├── phaser-stub.mjs         # Phaser primitives used by scene tests
│   ├── dom-stub.mjs            # Minimal DOM and event fixture
│   ├── fixtures.mjs            # Run state, highway scene, and sprite fixtures
│   ├── simulation.test.mjs     # Route forecasts, navigation, reachable stops, pricing, and scoring
│   ├── traffic.test.mjs        # Traffic, charging bay occupancy, collisions, and the route SoC band
│   ├── controller.test.mjs     # Messe, vehicle/tariff selection, tolls, and highway transitions
│   ├── finale.test.mjs        # Finale branches, input and timing, damage messages, and game over
│   ├── interactions.test.mjs   # Parking, highway ticks, hotel, charging, and HUD
│   ├── releases.test.mjs       # Public catalog, release order, spoiler checks, and asset versions
│   ├── worker-validation.test.mjs # E-Roadtrip score plausibility and rejected POST requests
│   ├── arcade-scores.test.mjs  # Score callbacks, dry-run behavior, and name updates
│   └── leaderboard.test.mjs    # Payload validation, hostname gating, duplicate protection, and results panel
└── src/
    ├── main.ts                 # ERoadtripController (central orchestrator, DOM ↔ Phaser lifecycle)
    ├── types.ts                # All TypeScript domain models & state interfaces
    ├── data/                   # Static game data (no simulation logic)
    │   ├── vehicles.ts         # 9 EVs (MG4, Model S 2015, ID.3, Model 3/Y, XPeng G6, EV6, ID.7, Taycan)
    │   ├── subscriptions.ts    # 10 tariff entries plus fixed provider roaming rates (see §9 for the inventory and exceptions)
    │   ├── europeGeography.ts  # Coastlines, country borders & geographic polygons for EuropeMapScene
    │   ├── europeMap.ts        # CityNode[], HighwayEdge[], ChargerStation[] graph (normalized 1800×1420 coords)
    │   ├── levels.ts           # 7 campaign levels (Level 1 and Level 2 playable: true; Levels 3–7 playable: false)
    │   └── events.ts           # Dynamic road/family/police/charger events + WifeDialogueDef[] (Level 2: toilets, outbound hotel, and its robbery follow-up)
    ├── sim/                    # Pure simulation & persistence (framework-agnostic)
    │   ├── EnergyModel.ts      # Consumption physics, charging curve interpolation, tariff pricing
    │   ├── RoutePlanner.ts     # TripPlan, outbound/return corridors, forecasts, nearby chargers, and skip eligibility
    │   ├── RouteNavigation.ts  # Remaining highway stages, next waypoint, distance, and travel ETA
    │   ├── ChargingBay.ts      # Rear-facing parking test and parking tolerances
    │   ├── PauseEffects.ts     # Shared accounting for pause time, costs, needs, and stress
    │   ├── ScoringEngine.ts    # Weighted evaluation, overall stress, final SoC deduction, and game over
    │   ├── PropertyDamage.ts   # Static impact tiers and single-hit cone stress
    │   ├── Leaderboard.ts      # Score payload, client plausibility, host guard, run IDs, and ArcadeScores adapter
    │   └── SaveState.ts        # Campaign persistence in localStorage ('eroadtrip_campaign_v1')
    ├── phaser/                 # Phaser 3 scenes & procedural pixel art
    │   ├── GameBridge.ts       # ERoadtripBridge interface + TouchInput keyed by pointerId
    │   ├── BootScene.ts        # Procedural texture initialization via PixelArtGenerator -> starts EuropeMapScene
    │   ├── PixelArtGenerator.ts# Runtime canvas/pixel-art sprite, landmark & additive light/rain texture generation
    │   ├── ChargerBadges.ts    # Bitmap provider initials on Autohof charging posts
    │   ├── EuropePixelMap.ts   # Baked 900×710 pixel-art Europe canvas (coastlines, relief, forests, lakes, dark/light)
    │   ├── MapLayout.ts        # Map projection, zoom/bounds & route geometry helpers
    │   ├── EuropeMapScene.ts   # Planning map: pan/zoom, outbound/return icons, provider-chip tiles, hover card, SoC band on the active leg
    │   ├── AutobahnScene.ts    # Curved FSD highway: weather, lane traffic, work zones, events
    │   ├── AutobahnTraffic.ts  # Lane roster, bumper gap, follow speed, overtakes
    │   ├── CityDriveScene.ts   # Top-down city and Autohof driving, collisions, regen, and surface particles
    │   ├── MontpellierFinaleScene.ts # Responsive animated beach finale drawn with Phaser graphics
    │   ├── PlaceStyles.ts      # Per-city palettes, landmarks, Autohof rural/classic/urban classification
    │   ├── PlacePainter.ts     # Data-driven city and Autohof worlds
    │   ├── SurfaceFx.ts        # Persistent grass tyre marks, grass clods, wet-road spray
    │   ├── CityTraffic.ts      # AI vehicle motion, right of way, traffic lights, and crosswalks
    │   ├── CityLanes.ts        # Directed lanes and rounded AI routes
    │   ├── CityCollision.ts    # Sprite footprints and rotated vehicle capsules
    │   └── SoundFX.ts          # Procedural WebAudio SFX (respects ArcadeAudio mute state)
    └── ui/                     # DOM UI components (vanilla TS, no framework)
        ├── PlanningUI.ts       # Sidebar: garage, separate outbound/return routes, tariffs, per-leg speed signs, stage charger list
        ├── DrivingHUD.ts       # In-drive HUD, highway navigation, speed control, time scale, and city touch pads
        ├── StopSkipCard.ts     # Live highway approach card, keep/skip buttons, and undo
        ├── DrivingStatus.ts    # Shared driving clock, trip expenses, and dialog status snapshot
        ├── BreakPixelAnim.ts   # Pixel-art mini-animations during charging/break activities
        ├── EventModal.ts       # Modals: live charging curve, dynamic events, wife dialogues, map peek, breakdowns
        ├── ResultsUI.ts        # End-of-trip scorecard, level leaderboard, incident log, prize payout, next level
        ├── speedSign.ts        # Shared speed sign markup
        └── TouchscreenWidget.ts # In-dash SoC and route forecast at a charger
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

Phaser scenes read state from `bridge` and emit callbacks (`onBootReady`, `onMapSelectCharger`, `onMapSelectRoute`, `onMapSelectLeg`, `onAutobahnHudTick`, `onTriggerChargerSegment`, `onTriggerCitySegment`, `onCitySegmentComplete`, `onDynamicEventTrigger`, `onWifeDialogueTrigger`, `onCollisionEvent`, `onPropertyDamage`, `onDestinationArrival`, `onPoliceViolation`, `onBatteryDepleted`) back to `ERoadtripController`.

**Data flow** · Plan → `RoutePlanner.evaluateTripPlan` → map band/sidebar · Run → `AutobahnScene` tick → `predictLiveTripSoc` → `DrivingHUD` / `TouchscreenWidget` (at a charger) · Finish → `ScoringEngine.evaluateRun` → `ResultsUI` / `SaveState`.

### 3.2 Gameplay Loop & Scene Transitions

1. **Boot** · `BootScene` generates pixel-art textures via `PixelArtGenerator`, starts `EuropeMapScene`, and calls `onBootReady()` to render the planner.
2. **Planning** · `EuropePixelMap.ts` bakes a 900×710 texture per theme, scaled 2× with nearest-neighbour filtering. It includes coastlines, relief, forests, waterways, borders, and urban footprints. The map observes `<html data-theme>` to switch between `europe_map_pixel_dark` and `europe_map_pixel_light` while preserving alignment.
   - Level start leaves `subscriptionIds` and `plannedStops` empty. Selecting a route clears planned stops. The ad-hoc checkbox stays checked and disabled. `TripPlan.selectedRouteId` and `returnRouteId` select the outbound and return corridors independently when a level has a return. `getActiveRouteLegs()` composes the stages for speed, charging, and total-trip forecasts.
   - The default speed follows the edge sign and applicable rain limit, with 130 km/h on unrestricted stretches. The planner and HUD offer speeds in 5 km/h steps up to the vehicle’s top selectable speed (200 for Model 3, 185 for EV6). The forecast uses `congestedCruiseKmh` and `baseTrafficRisk`. Fixed city time applies only to `aachen_start` and `koeln_ring` (see §9). The forecast adds zero city-transition minutes for `aachen_finish`, `hannover_messe`, and `charger_park`. The Messe visit is accounted for as dwell time.
   - Level 1 has the six default provider chips (`tesla`, `enbw`, `ewego`, `electra`, `ionity`, `ac_village`). Level 2 shows `tesla`, `electra`, `ionity`, `atlante`, `vianeo`, and `ac_dorfladen` when it occurs on a level route. These nine networks cover all stations in `europeMap.ts`. Level 2’s overnight leg (`overnightAtEnd`) shows the three overnight options in the route tab.
   - The toggle “🔌 Alle Ladestationen” starts off (`DEFAULT_SHOW_ALL_CHARGERS` in `PlanningUI.ts`). When off, the map shows planned stops plus, for enabled provider chips, icons on the active stage only. Detail tiles remain unpinned. When on, the map displays icons along the selected itinerary and pins detail tiles for enabled chips on the active stage. `resolveNonOverlappingCards` separates nearby tiles. Visible icons open a card on hover or tap. Clicking a card toggles the planned stop. Subscribed provider icons are coloured, ad-hoc and roaming icons are grey, and the selected-stage sidebar lists the latter with muted rows and a red price.
   - `stopKey` identifies a visit by stage index and station ID. On a shared road edge, the selected stage determines which visit a map click adds. The planner, map, and run distinguish both visits, including completion and failure status.
   - `evaluateTripPlan()` supplies the SoC at the ends of each driving interval between stops. The stage table, warnings, and active-stage band use that profile. The soft-edged band covers green at 25–15%, yellow at 15–10%, orange at 10–5%, and red at 5–0%, stopping at the first depletion. After a reachable charging stop, the band uses the new SoC. A target below arrival SoC leaves the battery level unchanged.
3. **Trip execution** · Starting a trip creates a `RunState` and launches `CityDriveScene` for a first-stage city start or `AutobahnScene` otherwise.
   - **Highway.** The `1×`, `5×`, and `15×` buttons select the simulation rate, with a fixed slower rate in work zones. The actual game minutes per real second are listed under `simMinPerRealSec` in §9. Traffic on the curved road follows `baseTrafficRisk` and maintains lane gaps using relative speed. Lane-changing cars occupy both lanes, and AI rechecks the target gap when the indicator period ends. Vehicle positions relative to the player are in kilometres and projected into the view. Traffic movement uses real time. Actual speed determines travel time, distance, and energy, and can increase stress above 145 km/h or when following closely. A tick stops at a planned charger, section boundary, or stage end. Resuming after the hotel at a stage end advances without billing another drive tick.
   - **Signs and radar.** `highwaySection()` resolves country and sign in either direction, including Level 2’s approximate border splits. The HUD, AI, and radar share the effective sign, including 60/80 km/h work zones, 110 instead of 130 km/h on French motorway sections with a rain limit, and 70 km/h on country-road diversions. More than 8 km/h over the signed limit can trigger a sighting, subject to cooldown and a maximum of two per stage. The dialog offers braking before measurement. Fines use the current section’s country. The “Lichthupe” action rechecks that the lead car is still slowing the player in the left lane before flashing the headlights. Car yaw and indicators follow lane changes.
   - **HUD and touch.** `DrivingHUD` creates touch pads once, tracks fingers by `pointerId` through `GameBridge`, and uses pointer capture for combined steering and throttle. It releases on pointer up/cancel/leave (unless captured), lost capture, touch end/cancel, window blur, and hidden visibility. The context menu is suppressed. An empty pointer map clears held inputs each city frame, with the horn pulse retained until consumed. `?erpreview=` exposes `__erTouch`, `__erTouchCount`, and `__erRun`. The narrow layout places the HUD above the driving area and groups the pads in two clusters. HUD surfaces use theme variables. The speed slider stays mounted as the sign changes, and action buttons respond to `pointerdown` and keyboard activation.
   - **Highway navigation.** `buildRemainingRoute()` walks the active route from the current driving direction and position to the first pending road charger, visit, overnight stop, turnaround, or final city. The next charger truncates its stage at the station position. Pass-through drives such as Köln stay on the itinerary. The ETA estimates driving time using planned pace, traffic, applicable current caps, and fixed city-transition minutes. The HUD highlights the current road in a scrollable list. The narrow layout starts with the destination, distance, and ETA visible in the collapsed heading. The desktop stage map reverses the planning waypoints once for return stages.
   - **Skipping a planned road charge.** The highway refreshes the HUD on entering the approach window (see §9). A compact card shows the next pending road charger on the current stage and the live arrival SoC at the next target without that charge. It uses the regular HUD ticks and leaves the drive running at the selected time scale. “Anfahren” dismisses the card and keeps the route. “Auslassen” records the stage-local skipped key and logs the projected arrival. The highway trigger, Navi, live map and forecast read the same skip state. “Rückgängig” restores the stop and logs the change through the exit marker. Only player-initiated skips offer undo. The Messe visit and overnight stay are fixed.
   - **City driving.** Playable presets are `aachen_start`, `koeln_ring` (outbound Aachen–Köln pass-through), `hannover_messe`, `aachen_finish`, and `charger_park`. `ferry_denmark` exists in the type and painter and is reserved for Level 7. `PlaceStyles` and `PlacePainter` supply local landmarks and rural, classic, and urban service areas. AI follows directed lanes and rounded turns, reserves busy intersections and manoeuvring areas, and resumes its route outside the visible map. An eastbound service-area visitor backs into a charging bay and rejoins the eastbound lane forwards. Westbound traffic passes through.
   - **City physics.** Vehicle and bicycle hit areas are rotated capsules. Static obstacles use the drawn sprite footprints. Motion is checked in steps of at most 1/60 s. Lift-off regeneration slows the car by 640 px/s². Braking takes precedence over both pedals and slows the car by 1050 px/s². Blocking dialogs pause city physics and traffic. `SurfaceFx` draws tyre marks, dirt, and wet-road spray. Light and weather effects are reduced on mobile.
   - **Property damage.** Static footprints, including charger posts, and the world edge stop the car. A blocked substep reports damage from the speed before the stop. Each object rearms once the player capsule clears its contact margin (see §9). Scratches and dents open a single notice and add stress and vehicle depreciation. An airbag notice leads to the game-over result. Dynamic traffic and parked vehicles retain their existing collision handling. Construction cones are non-blocking sensors. The first player contact with each cone flings it away and adds one point of stress through the existing clamp and peak tracker. Each scene tracks which cones the player has already hit.
   - **Charger parks.** Free bays are green. Parked cars and a visiting vehicle within a bay make the corresponding bay red. Every free bay accepts a near-stationary car centered in the bounds with sufficient footprint overlap and its rear facing the post (see §9). The current pose triggers the driver animation immediately. The driver connects to that bay’s post and the rear port rotates with the car. Posts display a high-contrast two-letter provider badge. Each rendered bay uses its station’s provider, power and price data. Occupancy is represented in the scene. Communication faults use the station’s defect chance.
   - **Dialogs, charging, and breaks.** The controller pauses the run during blocking events, breaks, and the live map. A translucent scrim dims the background and decision cards show the current hunger, SoC, stress, expenses, and clock on opening. Charging, WC, food, and Messe activities share pause and needs accounting. At a charger, time spent is the later of the charge and activity end times. Bladder need drops after a chosen WC activity or stop. The charging dialog shows live needs, clock, and cost, plus the in-dash SoC and route forecast via `TouchscreenWidget.renderVehicleTouchscreenHtml()`.
   - **Messe visit.** A planned Hannover Messe AC stop presets the “AC am Messeparkplatz” checkbox at the end of the outbound drive. It remains editable at the visit. The planner shows departure SoC with a free point and with all points occupied, plus the return-range scenario without fair charging. The live map carries both scenarios until the parking outcome is known. If a point is free, charging uses the visit’s AC window and target. Full occupancy leaves arrival SoC unchanged. The visit includes a toilet break, optional €50 meal, and one of ten reports. Visit and charger values are in §9.
   - **Replanning.** “Früher laden”, passenger dialogue, and replanning events share `findReachableAdditionalStop()`. It searches ahead using forecast consumption and reachable planned charges, excludes completed and skipped stops by stage, and offers additional road chargers. Confirming the passenger suggestion adds the stop shown.
4. **Completion** · At Level 2’s final stage, the highway books the last toll and calls `onDestinationArrival`. `MontpellierFinaleScene` stops the drive and plays a responsive beach animation in both themes. The controller chooses the branch from the unrounded overall stress at arrival (see §4.2 and §9). In the relaxed branch the parents kiss. In the stressed branch the father sits dejected on a lounger. The children play in both. A tap, click, key press, or the timer advances to the usual result and leaderboard.
   - `finishLevel(cleanArrival, gameOver)` evaluates the run once. A completed drive pays `prizeMoneyEur`, updates campaign progress and personal bests, and submits to the leaderboards. An airbag ends the drive with 0 points and shows the costs and incident log. It skips campaign rewards, unlocks, and leaderboard submissions.

---

## 4. Key Simulation Rules (`src/sim/`)

### 4.1 Energy & Tariff Model (`EnergyModel.ts`)

- `computeConsumptionKwh100()` applies a drag term above 100 km/h of `(speedRatio^1.82 - 1) * vehicle.aeroFactor * 0.62`. Rain, fog, storms, and snow scale with `vehicle.weatherSensitivity`. Elevation adds 0.0056 kWh per metre climbed and recovers 0.0033 kWh per metre descended. Trailers use `1.42 + (trailerWeightKg / 1500) * 0.18`, reduced by 0.14 while slipstreaming a truck.
- `getChargingPowerKw()` interpolates the vehicle’s DC curve and caps it at station power. Tesla stalls cap 800 V vehicles at 150 kW. AC points (`isAcOnly` or `maxKw <= 43`) use `min(station.maxKw, vehicle.acMaxKw)`. Charge steps, the graph, and its marker use the same function. Calculations and unplugging retain exact SoC, while the display rounds it.
- `getBestPriceForStation()` starts with the station’s ad-hoc price and compares each active tariff’s own-network or fixed roaming rate. For Tesla vehicles, the native Tesla tariff applies at Superchargers (see §9). Vehicle selection updates the tariff card and station quote. For another make, the paid Pass is stored only after explicit booking. A previously booked Pass survives a vehicle switch. Its trip fee is charged only when driving another make.
- `estimateAcWindow()` uses vehicle and station AC power, arrival SoC, target, and the time available within the hotel or Messe stay. An arrival above the target is preserved. The good hotel includes charging and breakfast. Planning shows morning SoC and destination range for the hotel AC scenario. The overnight note records a robbery only when its follow-up event occurs.
- `evaluateStopSkip()` compares the unrounded next-target SoC from `predictLiveTripSoc(..., { skipStopKey })` with the reserve (see §9). Both pre-planned and “Früher laden” road stops qualify. The controller checks the forecast again when the player acts. Later changes in driving conditions can use up the reserve and trigger the usual battery rescue.

### 4.2 Scoring (`ScoringEngine.ts`)

- Time, cost, stress, efficiency, and decisions each score on `0..100` and use `LevelConfig.scoringWeights`. `calculateOverallStress()` blends peak and current stress on the same 0–100 scale for scoring and the Montpellier branch. The weights and branch threshold are in §9.
- Round the weighted result within `100..1000`, then subtract `finalSocPenalty()` based on the unrounded SoC at the moment the drive ends, including when the finale starts. Clamp the resulting score at zero. Grades and prize money use the final score. The result card shows the remaining battery percentage and its deduction.
- Cost includes charging, subscription shares, tolls, pauses, incidentals, lodging, and vehicle depreciation. A toll is booked once per completed highway stage index, including stages interrupted by an event. Planning, the trip computer, and results show tolls separately. Results list vehicle depreciation separately. Benchmarks and grade thresholds are in §9.
- Skipping or restoring a planned charge leaves the replanning counters and decision score unchanged. Time, charging costs and arrival SoC continue to follow the actual drive.

### 4.3 Global leaderboards (`Leaderboard.ts`)

- Starting a drive allocates one run ID for a configured `boardId`. Completion sends the score to Gesamt with a derived `_all` ID, then to the level board with the original ID. The level submission provides the rank and entry count. The client deduplicates by run ID and checks for an integer score within the scoring bounds, finite time within the Worker's allowed range, and finite nonnegative cost. The metadata includes the level board and the game version injected from `package.json`.
- Real submissions require `hunterjoeing.github.io`. Forks, local copies, and `?lbdebug=1` use `ArcadeScores.record()` in dry-run mode. It logs the payload and updates local bests. The results panel can read the top 10 in either mode and highlights names using case-insensitive matching.
- Results use the shared name dialog. For two minutes after a real submission, it can re-send the latest level entry under the new name, then refresh the panel. Test-mode name changes skip the re-send. The results panel and topbar open the shared leaderboard on the selected level, with tabs for Level 1, Level 2, and Gesamt.

### 4.4 Persistence (`SaveState.ts`)

- `localStorage` key `eroadtrip_campaign_v1` stores `cashEur`, `ownedVehicleId`, `unlockedLevelOrder`, and `completedLevels` (`bestScore`, `bestMinutes`).

---

## 5. Content Inventory & Current Status

- **Map graph** (`src/data/europeMap.ts`) · `CityNode[]`, `HighwayEdge[]`, and `ChargerStation[]` in normalized 1800×1420 coordinates. Edges carry distances, speed signs (with optional rain limits), elevation, tolls, vignette data, weather, and waypoints.
- **Vehicles** (`src/data/vehicles.ts`) · Nine EVs, with battery and charger values in §9.
- **Level 1** (`level_1_aachen_hannover`, playable) · Aachen ↔ Hannover Messe. Routes are “Route A · Ruhr-Klassik (A4 → A1 → A2)”, “Route B · Nord-Flachland (A44 → A43 → A30 → A2)”, and “Route C · Sauerland & Kasseler Berge (A4 → A45 → A7)”.
- **Level 2** (`level_2_family_summer`, playable) · Aachen → Montpellier, with four outbound stages and one overnight stop on every corridor. Routes are “Route A · Luxemburg & Lyon (A31 → A6 → A7/A9)”, “Route Mitte · Reims & Nevers (A4 → A77 → A71)”, and “Route B · Paris & Clermont-Ferrand (A1 → A71 → A75)”. The middle and Paris corridors join at Clermont-Ferrand. The overnight options are the hotel with AC, the budget hotel, and sleeping in the car (10% robbery chance). Level select displays Level 2 from the start and enables departure after Level 1.
- **Levels 3–7** · `level_3_alps_winter` through `level_7_nordkapp_ultimate` define routes, passengers, and scoring parameters with `playable: false`.

---

## 6. Host Repository Integration (`hunterjoeING.github.io`)

- **Game ID:** `eroadtrip`
- **Registered in:**
  - `index.html` (game card + JSON-LD)
  - `shared/arcade.js` (`GAME_CATALOG`, `detectGameId()`, `FEEDBACK_TARGETS`)
  - `shared/burger-menu.js` (`GAMES` list)
  - `cloudflare-worker/worker.js` (`GAMES_META`)
  - `shared/releases.js` (public version and release history)
- **Theming:** Reads `document.documentElement.getAttribute('data-theme')` (`light` / `dark`) via `bridge.isLightTheme()` and `styles.css`.
- **Global leaderboards.** The game uses the shared `ArcadeScores` client and the Worker score contract. See §4.3 and §9. [Worker score contract](../../cloudflare-worker/README.md#e-roadtrip-bestenlisten)

### Versioning & release notes

The topbar button reads the current `eroadtrip` version from [the release catalog](../../shared/releases.js) and opens the shared changelog dialog through `shared/update-banner.js`. The public notes also appear on [the changelog page](../../changelogs.html#app=eroadtrip). §11 records developer changes and their Git references.

Follow [AGENTS.md rule 10](../../AGENTS.md) for release notes and version bumps. Keep the package version, both root lockfile version fields, and the host page's `?v=` values for `styles.css`, `dist/e-roadtrip.js`, `releases.js`, and `update-banner.js` equal to the latest E-Roadtrip release. Use the hub's Arcade version for `arcade.js`. Every release entry names its `author` (Joe or Michi) and, when verifiable, the `model` in the user-facing form (e.g. „Michi · Sol 6.2“); agent tool names are never shown. On PRs to `main`, [the versioning workflow](../../.github/workflows/check-versioning.yml) checks version bumps and runs the game checks.

---

## 7. Design Decisions ("Why")

- **Pre-bundled IIFE in `dist/` (`esbuild` + `phaser.min.js`):** The host repository is a pure static GitHub Pages site without a server-side build pipeline. Pre-bundling `src/main.ts` as an IIFE keeps `games/e-roadtrip/index.html` zero-config in production while still allowing strict TypeScript development.
- **`ERoadtripBridge` decoupling (`src/phaser/GameBridge.ts`):** Phaser scenes (`EuropeMapScene`, `AutobahnScene`, `CityDriveScene`) use `ERoadtripBridge` callbacks to communicate with the controller. This keeps simulation/UI state in `ERoadtripController` + `PlanningUI` / `DrivingHUD` / `EventModal` and makes both sides independently testable and replaceable.
- **Procedural pixel art (`PixelArtGenerator.ts`) & inline geography (`europeGeography.ts`):** Sprites, vehicles, and landmarks are generated at boot on HTML5 canvases. The map also uses inline geographic data.
- **Framework-agnostic simulation.** `EnergyModel`, `RoutePlanner`, and `ScoringEngine` share calculation code across planning and driving without a Phaser or DOM dependency. `SaveState` handles browser storage.
- **Staged campaign:** Level 1 and Level 2 are playable. Levels 3–7 stay `playable: false` in `src/data/levels.ts` with route options, passenger profiles, and scoring weights so later iterations can add balancing, city presets, and events without redesigning `types.ts`.

---

## 8. Known Limitations & Open Points

- **Campaign.** Levels 3–7 are configured but disabled.
- **City time.** The fixed forecast allowance covers the Aachen start and Cologne pass-through. Review whether to budget additional driving time for the Aachen finish, Messe approach, and charger parks (see §3.2 and §9).
- **Legacy provider paths.** Fastned and TotalEnergies have roaming entries, but zero stations in `europeMap.ts`. Their network types, filter/name/colour tables, and sprite generation remain in `types.ts`, `PlanningUI.ts`, `EuropeMapScene.ts`, and `PixelArtGenerator.ts`. `main.ts` also retains their default filter keys.
- **Verification.** CI runs `npm ci`, typecheck, `npm test`, and build (see §1). Local checks also include `node --check dist/e-roadtrip.js`. Node regressions use Phaser and DOM stubs. The manual checklist in §10 covers browser rendering and touch.

---

## 9. Tuning values (where to change what)

All prices and timing values below are in-game settings.

| File and constant or field | Meaning | Current value |
| --- | --- | --- |
| `src/data/events.ts` · `HOTEL_AC` | Good hotel’s charger cap, overnight window, target, and lodging cost | 11 kW, 480 min, 95%, €289 |
| `src/sim/RoutePlanner.ts` · `MESSE_VISIT_MINUTES`, `MESSE_CHARGE_MINUTES` | Messe dwell time and AC window within the visit | 240 min, 210 min |
| `src/sim/RoutePlanner.ts` · `CITY_TRANSITION_MINUTES` | Fixed city-drive allowance at the first stage’s start and applicable stage ends | `aachen_start: 7`, `koeln_ring: 6` (minutes). Other presets default to zero. |
| `src/sim/RoutePlanner.ts` · `SKIP_PROMPT_KM`, `SKIP_RESERVE_SOC_PCT` | Road charger approach window and minimum projected arrival SoC for skipping | 15 km, 10% |
| `src/sim/ChargingBay.ts` · `PARKING_MIN_OVERLAP`, `PARKING_REAR_TOLERANCE_DEG`, `PARKING_MAX_SPEED` | Required share of rotated car bounds inside a bay, rear angle to the post, and speed ceiling | 75%, 35°, 6 px/s |
| `src/phaser/PlacePainter.ts` · `layoutCapacity`, `freeCount` in `paintAutohof()` | Visible charging bays and initial availability | Up to the station’s stall count, capped at 4 rural, 6 classic, and 6 mobile or 8 desktop urban. The free count is the rounded unoccupied share with at least two free bays when the layout permits. |
| `styles.css` · modal and drawer backdrops | Dialog dimming in both themes | Black at 45% opacity |
| `src/data/subscriptions.ts` · `PROVIDER_ROAMING_EUR_PER_KWH` | Fixed €/kWh per tariff provider, independent of tier | `tesla` 0.61, `enbw` 0.79, `ewego` 0.75, `electra` 0.84, `ionity` 0.89, `ac_village` 0.69, `atlante` 0.69, `vianeo` 0.72. `ac_dorfladen` 0.29 is below the typical 0.69–0.89 HPC band, as is Tesla. Legacy rates are `fastned` 0.79 and `totalenergies` 0.75. |
| `src/data/subscriptions.ts` · `SUBSCRIPTIONS` | Tariff inventory and own-network rates | See the 10 entries below. Level 2 hides EnBW and EWE Go, while Level 1 hides Atlante and ENGIE Vianeo. |
| `src/sim/EnergyModel.ts` · `getBestPriceForStation()` | Supercharger price for Tesla vehicles | €0.00/kWh for the 2015 Model S (`superchargerFree`), €0.39/kWh for Model 3/Y |
| `src/data/vehicles.ts` · `batteryKwh`, `acMaxKw`, `chargingCurve`, `superchargerFree` | Usable capacity, AC onboard limit, DC power by SoC, and free Tesla charging | See the vehicle table below. |
| `src/data/levels.ts` · `targetArrivalMinutes` | Target trip duration for time scoring, by level order. Keep the Worker's `EROADTRIP_LEVEL_TARGETS` in sync with the playable levels. | 797 / 1,100 / 190 / 860 / 270 / 640 / 2,150 min |
| `src/data/levels.ts` · `boardId`, `cloudflare-worker/worker.js` · `EROADTRIP_LEVEL_TARGETS` | Level board IDs and shared ranking | Level 1 `eroadtrip_l1`, Level 2 `eroadtrip_l2`, Gesamt `eroadtrip`. Levels 3–7 have no board. The client accepts times from 0.5 to 20 times the target. The Worker keeps the same lower bounds, and the legacy Level 2 ceiling of 40,800 min. |
| `src/data/levels.ts` · `costBenchmarkEurPerKm` and `src/sim/ScoringEngine.ts` fallback | Cost scoring reference per km | Level 2 €0.30/km. All other levels use €0.082/km. Benchmark floors at €30. |
| `src/data/levels.ts` · `rewardBaseEur` → `src/sim/ScoringEngine.ts` · `prizeMoneyEur` | Base reward by level order and score-adjusted payout | €6,500 / €8,000 / €9,500 / €11,000 / €14,000 / €13,000 / €25,000. Payout is `Math.round(rewardBaseEur * (0.55 + 0.95 * totalScore / 1000))`. |
| `src/phaser/AutobahnScene.ts` · `simMinPerRealSec` | Game minutes advanced per real second | `1×` → 2.8, `5×` → 11, `15×` → 28. Work zones force 0.85. |
| `src/sim/ScoringEngine.ts` · `calculateOverallStress()`, `BEACH_FINALE_STRESS_THRESHOLD` | Shared stress metric and ending threshold | 65% of peak stress + 35% of current stress. Below 60% is relaxed. At or above 60% is stressed. |
| `src/phaser/MontpellierFinaleScene.ts` · `FINALE_DURATION_MS` | Beach animation duration | 6,500 ms of real scene time, skippable by tap, click, or key press |
| `src/sim/ScoringEngine.ts` · `finalSocPenalty()` | Points deducted on every level at the end of the drive | `[0, 5)` 0, `[5, 10)` 50, `[10, 15)` 75, `[15, 20)` 100, `[20, 100]` 150 |
| `src/ui/EventModal.ts` · `showChargingSession()` break `meta` | Charging-stop break activities (time, cost, needs) | Eat 20 min, €20, −10 stress, −60 hunger. WC 5 min. Dog 8 min. Kids 10 min. Shopping 10 min, €50. The Messe meal (€50, `main.ts`) is a separate decision. |
| `src/sim/PropertyDamage.ts` · `evaluatePropertyDamage()` | Scratch, dent, and airbag by absolute substep speed | Below 30 px/s (`MIN_DAMAGE_IMPACT_PX_PER_SEC`) the car only stops, e.g. when gently touching a charger post while parking. From 30 to below 75 px/s gives €800 and +10 stress. From 75 to below 165 px/s gives €1,300 and +20 stress. From 165 px/s gives €5,000 and game over. City speed caps are 230 px/s forward and 115 px/s in reverse. |
| `src/sim/PropertyDamage.ts` · `STATIC_CONTACT_CLEARANCE_PX` | Extra clearance beyond the player capsule before the same static contact rearms | 6 px |
| `src/sim/ScoringEngine.ts` · `gradeLabel` | Score thresholds | ≥880 “S-Rang”, ≥760 “A-Rang”, ≥620 “B-Rang”, 480–619 “Solide E-Fahrt”, <480 “C-Rang” |
| `src/sim/SaveState.ts` · `cashEur` | New campaign, reset, and invalid cash fallback | €26,000 |
| `src/data/europeMap.ts` · `chg_messe_ac_a2`, `chg_messe_ac_a30`, `chg_messe_ac_a7` | Messe parking for the Bielefeld, Osnabrück, and Kassel approaches, respectively | All are `ac_village`, `isAcOnly: true`, `fairStay: true`, 6 points at 22 kW, €0.49/kWh ad-hoc, occupancy risk 0.50, data defect risk 0.04, at edge progress 0.96. The visit rolls occupancy once. |

### Tariff entries

| ID | Monthly fee / trip share (€) | Own network (€/kWh) |
| --- | ---: | --- |
| `adhoc` | 0.00 / 0.00 | Station ad-hoc price (entry stores 0.72) |
| `tesla_suc` | 9.99 / 3.50 | 0.41 |
| `enbw_m` | 5.99 / 2.20 | 0.49 |
| `enbw_l` | 17.99 / 5.50 | 0.39 |
| `ewe_go` | 0.00 / 0.00 | 0.52 |
| `electra_plus` | 9.99 / 3.50 | 0.41 |
| `ionity_passport` | 11.99 / 4.00 | 0.39 |
| `ac_rural_pass` | 3.99 / 1.50 | 0.46 |
| `atlante_go` | 4.99 / 1.70 | 0.29 |
| `vianeo_pass` | 0.00 / 0.00 | 0.33 |

### Vehicle charging data

Each DC curve lists its control points as SoC % → kW. The station cap applies after interpolation.

| Vehicle ID | Battery (kWh) | AC limit (kW) | DC curve (SoC % → kW) | Free Supercharging |
| --- | ---: | ---: | --- | --- |
| `mg4_standard` | 50.8 | 7 | 0→85, 20→88, 55→84, 75→62, 90→34, 100→11 | — |
| `tesla_model_s_2015` | 71.3 | 22 | 0→108, 25→96, 50→62, 70→38, 80→20, 90→10, 100→0 | Yes |
| `vw_id3_pro` | 77.0 | 11 | 0→155, 25→170, 50→122, 75→78, 90→42, 100→14 | — |
| `tesla_model_3_highland` | 60.0 | 11 | 0→165, 20→172, 45→145, 65→105, 82→68, 95→34, 100→14 | — |
| `tesla_model_y_lr` | 75.0 | 11 | 0→245, 20→250, 45→160, 70→92, 85→50, 100→14 | — |
| `xpeng_g6_lr` | 84.0 | 11 | 0→255, 18→280, 45→245, 68→175, 82→105, 92→48, 100→16 | — |
| `kia_ev6_gtline` | 77.4 | 11 | 0→225, 25→240, 55→220, 78→145, 88→65, 100→18 | — |
| `vw_id7_tourer` | 86.0 | 11 | 0→190, 25→200, 55→155, 78→105, 90→55, 100→16 | — |
| `porsche_taycan` | 97.0 | 22 | 0→300, 25→320, 60→270, 80→165, 92→75, 100→20 | — |

---

## 10. Agent workflow

1. Work in the fork clone (`origin` = `mic4rd/hunterjoeING.github.io`, `upstream` = `hunterjoeING/hunterjoeING.github.io`). Fetch upstream and base new work on a feature branch from `upstream/main`.
2. Run `npm run typecheck`, `npm run build`, `node --check dist/e-roadtrip.js`, and `npm test` from `games/e-roadtrip/`. Use `npm ci` if dependencies need installing.
3. Push the working branch to the fork when authorized. In the fork’s Pages settings, switch the publishing source to the branch under test and serve from the repository root. [Fork Pages test server](https://mic4rd.github.io/hunterjoeING.github.io/games/e-roadtrip/index.html)
4. Open an upstream PR only on Michael’s request. Update this document and the Handoff with the branch, SHAs, checks, PR status, Pages link, and next steps as required by rules 7 and 9. [Repository instructions](../../AGENTS.md)

### Manual test checklist

- [ ] At 320 and 390 px, test the HUD and touch pads in light and dark mode, including simultaneous steering and throttle and releasing both controls. Drag the speed slider and check it stays usable through a sign change.
- [ ] At 320 and 390 px in both themes, check the results leaderboard, long player names, name dialog, and the Level 1, Level 2, and Gesamt tabs. Check the topbar trophy button on both levels.
- [ ] Complete a drive on fork Pages. Check that the results show the dry-run hint and the console logs both boards with distinct run IDs. Confirm there is no score POST, including after a name change.
- [ ] At an Autohof, stop rear-first in different green bays, including slightly off-center. Check that the connector uses the chosen post, the pixel badge is readable on a phone, and a visiting car turns its bay red until it leaves.
- [ ] At 320 and 390 px in both themes, open the Messe meal dialog, the live map, and the shared changelog. Check that the background stays sharp and the Messe card shows the hunger and trip values.
- [ ] On the highway, open the Navi and follow the remaining road list to a charger, the Messe, and the Level 2 hotel. Check the highlighted road, distance and ETA updates, scrolling, and the next destination after each stop.
- [ ] At 320 and 390 px in both themes, approach a planned road charger at 1×. Check the live forecast, blocked skip when the reserve is too low, the speed controls, and tap “Anfahren”, “Auslassen”, and “Rückgängig” on separate approaches. An accepted skip moves the Navi and live map to the next target. Drive past the exit to check that the undo button disappears. At 15×, check that the prompt appears while the drive continues.
- [ ] In Level 1, select Route A both ways and add Tesla Eschweiler on stages 1 and 8. Confirm that both stops are planned and can trigger independently.
- [ ] Plan Hannover Messe AC and check the opt-in checkbox at the visit. Check departure/return forecasts for both a free point and full occupancy.
- [ ] Plan a reachable Herford charge and confirm the range band turns green again after the stop.
- [ ] In Level 2, check one toll per outbound stage, including the hotel and final approach. Confirm all three routes end in Montpellier and the results show the final SoC deduction.
- [ ] Open `?erpreview=level2arrival` and `?erpreview=level2arrival-stress` on the fork. Check the two beach sequences in light and dark mode, portrait and landscape. Let one finish on its own and skip the other by tap or key.
- [ ] In the city, hit a charger or wall at three speeds. Check that a sustained contact counts once, the damage notice and results agree, and an airbag ends at zero points. Drive through two cones and check that the car keeps moving and stress rises once per cone.
- [ ] Switch between a Tesla and another make. Check that the paid Supercharger Pass is selected for the other make only after booking, and that a booked pass survives a switch.
- [ ] Select the 2015 Model S and check “Supercharger gratis (Model S)” and the zero-price quote at a Tesla station.

---

## 11. Changelog

- **2026-11-23** · `559c9c5` · Added the initial architecture reference.
- **2026-11-23** · `99baa6f`, `7b9c579` · Added local build dependencies and TypeScript settings, ignored `node_modules`, and documented branch collaboration.
- **2026-11-23** · `cursor/eroadtrip-reproducible-build-459e`, upstream PR #2 (`f42c39f`) · Added CI bundle rebuilds and binary merge attributes. The esbuild script takes Phaser from `window.Phaser`.
- **2026-11-23** · `cursor/eroadtrip-planning-range-gta2-e223`, fork PR #2 (`fe1eb5a`) · Cleared preselected tariffs/stops, improved crossings and the A4 on-ramp, and added the light-blue 20→0% band (later replaced by the four-colour range ring, Package F).
- **2026-11-23** · `cursor/eroadtrip-visuals-gta2-map-210f`, fork PR #3 (`b7234f6`) · Added city lighting and wet-road effects and the baked, theme-aware pixel-art Europe map.
- **2026-11-23** · `cursor/eroadtrip-planning-overview-e994`, fork PR #4 (`3a96c14`) · Package C added separate outbound/return planning, fixed roaming rates, stage speed signs, and stage-filtered charger details.
- **2026-11-23** · `cursor/eroadtrip-planning-overview-e994`, fork PR #4 (`3f80487`) · Corrected hidden and visible station modes and enabled chips to pin non-overlapping detail tiles when stations are shown.
- **2026-11-23** · `cursor/eroadtrip-package-d-79e6`, fork PR #5 (`8216074`) · Package D added city and Autohof designs, surface effects, curved highway traffic, work zones, and stable pointer-driven HUD controls.
- **2026-11-24** · `cursor/eroadtrip-touch-level2-5df0`, fork PR #6 (`87a1781`) · Fixed latched touch controls and enabled the Montpellier trip with one overnight stop (später ersetzt: Level 2 ends at Montpellier, with the outbound overnight stop retained; Autoroute du Soleil, Fastned, and TotalEnergies were removed earlier).
- **2026-11-24** · Fork PR #6 (`1beb9f6`, `74ff822`, `c0bcb05`) · Added highway following gaps and sectional signs, and set speed sliders to 5 km/h steps up to the vehicle limit.
- **2026-11-24** · Fork PR #6 (`2d8aacb`) · Based radar risk on actual speed and the active sign, with country-specific fines and a per-stage cap.
- **2026-11-24** · Fork PR #6 (`1a9c044`) · Package F added the four-colour active-stage ring, Reims/Nevers corridor, free Model S charging, and improvements to breaks, highway HUD, and Autohöfe.
- **2026-11-24** · Fork PR #6 (`c0d4e9d`) · Made Aachen–Köln unrestricted in both directions on routes that use it.
- **2026-11-24** · Fork PR #6 (`aad25fe`) · Removed Autoroute du Soleil and its chargers, replaced Fastned and TotalEnergies stations, and added the Messe visit, vehicle AC limits, and Autohof visitor traffic.
- **2026-11-25** · Upstream PR #3 (`826fb33`) (v0.3.0) · Merged the feature branches from fork PRs #2–#6. [Upstream PR #3](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/3)
- **2026-11-25** · `codex/review-fixes` (`022a699`) · Reviews 1–4 and 16 fixed stage-local charge stops, Messe AC forecasts, tolls, reachable replanning, and Tesla tariff selection.
- **2026-11-25** · `codex/review-fixes` (`2b01e5a`) · Reviews 5–8 fixed collision footprints, city and Autohof routing, highway gaps, and the post-charge range band.
- **2026-11-25** · `codex/review-fixes` (`f7abd66`) · Reviews 9–15 and 17–20 refined parking (später ersetzt: rear-facing pose in any free bay) and braking, headlight flash, section limits and tick boundaries, hotel and charging accounting, and the mobile HUD.
- **2026-11-25** · `codex/review-fixes` (`006a1bf`) · Corrected the architecture and Handoff, documented tuning and test workflows, added Node regressions to CI, and shortened the feedback title.
- **2026-11-25** · Upstream PR #4 (`29fd861`) (v0.4.0) · Merged `codex/review-fixes` (reviews 1–20, docs, tests) into `main`; live on GitHub Pages.
- **2026-11-25** · `codex/arcade-versioning` · `fc3ad9b` · Added the topbar changelog button, recorded releases through v0.4.0, and added version and cache-busting checks. Follow-up commits add author and model per release, the menu link to the changelog page, and the no-tool-name test.
- **2026-11-25** · `codex/arcade-leaderboard-groups` · `0c85929` · Added Worker and Arcade support for E-Roadtrip level leaderboards (part a).
- **2026-11-25** · `codex/eroadtrip-highscores` · `888b032`, `4d6303b` · E-Roadtrip v0.5.0 submits completed drives to the level and overall boards and shows the level leaderboard and rank in results (part b).
- **2026-11-25** · Upstream PRs #6 (`f58b077`), #7 (`116a458`), #8 (`ca2c357`) (v0.5.0) · Merged versioning, Worker level boards (Worker deployed) and the v0.5.0 level leaderboards into `main`; live on GitHub Pages with real score submission.
- **2026-11-25** · `codex/eroadtrip-v0.6` · Run A `170ca90`, Run B `2950c66` (fork only, not merged) · v0.6.0 adds easier parking in any free bay, provider badges, dimmed dialogs, full remaining navigation, a one-way Montpellier finale, final SoC deductions, and tiered city damage with knock-away cones (+1 stress each), and a €20 charging-stop meal.
- **2026-11-26** · `codex/eroadtrip-v0.6` · Run C `e739d04` (fork only, not merged) · Added the live road-charge skip prompt, reserve check, and undo through the exit.
- **2026-11-26** · `codex/eroadtrip-v0.6` · orchestrator edit · Map toggle renamed to “Alle Ladestationen”, off by default; planned stops stay visible when off.
