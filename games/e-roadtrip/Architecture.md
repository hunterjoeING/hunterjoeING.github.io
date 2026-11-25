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
    │   ├── subscriptions.ts    # 8 charging tariffs; Ad-hoc always on; roaming is a fixed €/kWh per provider (incl. Fastned, TotalEnergies, AC-Dorfladen)
    │   ├── europeGeography.ts  # Coastlines, country borders & geographic polygons for EuropeMapScene
    │   ├── europeMap.ts        # CityNode[], HighwayEdge[], ChargerStation[] graph (normalized 1800×1420 coords)
    │   ├── levels.ts           # 7 campaign levels (Level 1 and Level 2 playable: true; Levels 3–7 playable: false)
    │   └── events.ts           # Dynamic road/family/police/charger events + WifeDialogueDef[] (Level 2: toilets, hotel, robbery, Montpellier)
    ├── sim/                    # Pure simulation & persistence (framework-agnostic)
    │   ├── EnergyModel.ts      # Consumption physics, charging curve interpolation, tariff pricing
    │   ├── RoutePlanner.ts     # TripPlan, separate outbound/return corridors, forecast, live SoC, nearest charger
    │   ├── ScoringEngine.ts    # 0..1000 weighted evaluation (time, cost, stress, efficiency, decisions)
    │   └── SaveState.ts        # Campaign persistence in localStorage ('eroadtrip_campaign_v1')
    ├── phaser/                 # Phaser 3 scenes & procedural pixel art
    │   ├── GameBridge.ts       # ERoadtripBridge interface + TouchInput keyed by pointerId
    │   ├── BootScene.ts        # Procedural texture initialization via PixelArtGenerator -> starts EuropeMapScene
    │   ├── PixelArtGenerator.ts# Runtime canvas/pixel-art sprite, landmark & additive light/rain texture generation
    │   ├── EuropePixelMap.ts   # Baked 900×710 pixel-art Europe canvas (coastlines, relief, forests, lakes, dark/light)
    │   ├── MapLayout.ts        # Map projection, zoom/bounds & route geometry helpers
    │   ├── EuropeMapScene.ts   # Planning map: pan/zoom, Hin/Rück icons, provider-chip tiles, hover card, SoC band on the active leg
    │   ├── AutobahnScene.ts    # Curved FSD highway: weather, lane traffic, work zones, events
    │   ├── AutobahnTraffic.ts  # Lane roster, bumper gap, follow speed, overtakes
    │   ├── CityDriveScene.ts   # Top-down GTA-2 city and Autohof driving, regen, surface particles
    │   ├── PlaceStyles.ts      # Per-city palettes, landmarks, Autohof rural/classic/urban classification
    │   ├── PlacePainter.ts     # Data-driven city and Autohof worlds
    │   ├── SurfaceFx.ts        # Persistent grass tyre marks, grass clods, wet-road spray
    │   ├── CityTraffic.ts      # KI-Fahrbewegung, Vorfahrt, Ampeln und Zebrastreifen
    │   ├── CityLanes.ts        # Gerichtete Fahrspuren und gerundete KI-Routen
    │   ├── CityCollision.ts    # Sprite-Grundrisse und gedrehte Fahrzeugkapseln
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
   - Beim Levelstart sind `subscriptionIds` und `plannedStops` leer. Ein Routenwechsel setzt die Ladestopps zurück. Ad-hoc-Laden ist immer verfügbar, das zugehörige Kästchen bleibt grau und angehakt. Hin- und Rückweg sind unabhängig wählbar (`TripPlan.selectedRouteId` und `returnRouteId`). `getActiveRouteLegs()` verbindet ihre Etappen für die Planung von Tempo und Ladestopps.
   - Each leg’s preset cruise is the posted red-ring limit, or 130 km/h on an unrestricted Autobahn (`speedLimitKmh === 0`). The slider always runs up to the selected car’s top speed, in 5 km/h steps, with mouse and touch. A posted limit, French rain (110), and a country detour (70) only choose that preset; a faster choice turns red. French edges still show at most 130. The forecast uses `congestedCruiseKmh`, which sits below the set speed in proportion to `baseTrafficRisk`. Blitzer risk in the plan uses that average against the section sign (posted, or 110 in French rain). An unrestricted section has no fine and stays in the low band. The speed actually driven is then limited by traffic and the car’s top speed. A work zone still caps the live speed for its short stretch.
   - Provider chips on Level 1 are the six base networks, plus Fastned, TotalEnergies, or AC-Dorfladen only when that network has a charger on the level’s edges. Level 2 shows Tesla, Electra, IONITY, Atlante, ENGIE Vianeo, and AC-Dorfladen when present. Fastned and TotalEnergies are not on Level 2. An overnight leg (`overnightAtEnd`) is called out in the route tab with the three night choices and their cost range.
   - `RoutePlanner.evaluateTripPlan()` walks the composed Hin- and Rückweg: SoC, charging stops, time, and cost cover both directions.
   - Ein Ladestopp ist durch Etappenindex und Stations-ID identifiziert (`stopKey`). Beim Kartenklick auf einen Ladepark an einer gemeinsam genutzten Straßenkante gilt die ausgewählte Etappe. Planung, Markierung, Fahrt und Defektstatus unterscheiden die beiden Besuche.
   - Messe-AC ist eine Option des Hannover-Messebesuchs am Ende der Hinfahrt. Die Planung zeigt den Abfahrts-SoC bei freier Säule und bei voller Belegung sowie die Reichweite ohne Messe-AC auf dem Rückweg. In der Live-Karte werden beide Fälle bis zur Entscheidung am Messeparkplatz fortgeschrieben.
   - `evaluateTripPlan()` liefert exakte SoC-Werte für die Fahrabschnitte zwischen Ladehalten. Etappentabelle, Warnungen und Kartenband verwenden denselben Verlauf. Die Karte zeichnet die aktive Etappe bis zum ersten leeren Akku. Grün deckt 25–15 %, Gelb 15–10 %, Orange 10–5 % und Rot 5–0 % ab. Alle Farben behalten den weichen Rand. Nach einem erreichbaren Ladehalt gelten die neuen SoC-Werte, und ein Ziel unter dem Ankunfts-SoC erzeugt keinen Ladegewinn.
   - Charger markers are provider logos, coloured when that network has a subscription and grey for ad-hoc/roaming. The map toggle is “Ladestationen einblenden / ausblenden”. **Ausblenden** hides every station (no icon, no tile) so the corridors stay clear; a provider chip that is on shows only that provider’s icons on the active stage, still with no pinned tiles. **Einblenden** draws an icon for every charger on the chosen Hinweg and Rückweg. Each provider chip that is on additionally pins that provider’s detail tiles on the active stage; `resolveNonOverlappingCards` stacks nearby tiles so they do not cover each other. Hover (desktop) or tap (touch) on a visible icon opens that one card as well. Clicking a card toggles the stop and marks it. The sidebar charger list lists only the selected stage: subscribed networks at full strength, roaming/ad-hoc stations slightly greyed with a red price.
3. **Trip Execution (`AutobahnScene` $\leftrightarrow$ `CityDriveScene` $\leftrightarrow$ `EventModal`)**:
   - Starting a trip creates `RunState` and launches either `CityDriveScene` (if leg 0 has `citySegmentAtStart`) or `AutobahnScene`.
   - **`AutobahnScene`**: Leg-by-leg highway travel at `timeScale` (`1x | 5x | 15x`), with the same SoC, time, stress, events, and charger approach as before. The road is a gentle two-sine curve. Traffic density follows `HighwayEdge.baseTrafficRisk`. Trucks run about 80–90 km/h, cars 100–120, fast cars up to the section limit. Der Verkehr hält den Mindestabstand je Spur über die Relativgeschwindigkeit. Während eines Wechsels belegt das wechselnde Fahrzeug beide Spuren. Die KI prüft die Ziellücke auch am Ende der Blinkzeit, einschließlich der erwarteten Annäherung. Der Abstand zum Spieler ist in Kilometern gespeichert und wird in die Ansicht projiziert. Der Zeitraffer der Reise beeinflusst diese Verkehrsbewegung nicht. The set speed is only the player’s maximum. The live speed (and therefore kilometres, consumption, the trip clock, and the speed-trap roll) follows the car in front and returns to the maximum once the next lane is free. A trap can fire only while that live speed is more than 8 km/h over the current sign (70 on a country detour, 110 in French rain, none when the section is unrestricted). The chance scales with the excess and `policeRiskBase`, with a cooldown and at most two flashes per leg. Germany uses außerorts-style tiers; France starts at 135 €. The choice is still brake or risk the ticket. The preferred lane is still ≤100 right, ≤132 middle, otherwise left, but the car does not move back into a slower lane. Some legs include a work zone (60 or 80 km/h, signs, beacons, baken, right lane closed). Inside the zone the sim clock slows to 0.85 min/s so the zone stays visible for a few seconds; `RunState.speedCapKmh` is the temporary limit and the chosen cruise stays on the leg plan. Rain, wet reflections, and sodium lamps match the city look, with fewer particles and no bloom when the view is under 640 px or a touch device under 900 px.
   - **Touch (`DrivingHUD` + `GameBridge`)**: City controls are created once. Each finger is stored by `pointerId` (`setPointerCapture`), so steer and throttle can be held together. Release runs on `pointerup`, `pointercancel`, `pointerleave` (unless that finger is captured), `lostpointercapture`, `touchend`, `touchcancel`, window `blur`, and `visibilitychange` to hidden. `contextmenu` is cancelled. While the pointer map is empty, held inputs are forced off each city frame (the horn pulse stays until the scene consumes it). `?erpreview=` also exposes `__erTouch`, `__erTouchCount`, and `__erRun` for checks.
   - **`CityDriveScene`**: Top-down GTA-2 driving for `aachen_start`, `koeln_ring` (pass-through at the end of the outbound Aachen–Köln legs), `charger_park`, `hannover_messe`, `aachen_finish`, and `ferry_denmark`. `PlaceStyles` / `PlacePainter` build a different world per preset: Aachen sandstone and the Dom, Köln with the Dom, Rhine, and tram tracks, Hannover with the Rathaus, Hermes tower, and Messe hall. Autohöfe are smaller service areas classified as rural (fields, turbines), classic, or urban (skyline). Each has parked trucks and cars, a fuel canopy, food, a truck wash, and chargers along the canopy edge plus one reverse bay. Die KI fährt auf gerichteten Spuren der gezeichneten Straßen und nutzt gerundete Kurven. Belegte Kreuzungen und Rangierbereiche bleiben bis zur Ausfahrt gesperrt. Autos fahren am Kartenrand aus dem Bild und beginnen ihre Route außerhalb des Bildes neu. Im Autohof fährt ein Pkw von der ostwärts führenden Spur in die Zufahrt, rangiert rückwärts in eine freie KI-Bucht und fädelt vorwärts wieder ostwärts ein. Westwärts fahrende Autos fahren durch. Die Autohof- und Messe-Startpositionen liegen abseits der KI-Kreuzungen. Wagen und Fahrräder verwenden mitgedrehte Kapseln. Für Säulen, Radstopper, Imbisse und geparkte Fahrzeuge stammen die Kollisionsflächen aus den gezeichneten Grundrissen. Die Szene prüft Fahrzeugbewegungen in Schritten von höchstens 1/60 s. Lift-off coasts at 640 px/s² (brake 1050) and lights the tail lamps. `SurfaceFx` leaves dirty tyre marks and grass clods on grass, and a speed-dependent spray only in real rain, storm, or snow. Lighting, rain, and bloom stay as in package B, reduced on mobile.
   - **`EventModal`**: Pauses simulation (`bridge.paused = true`) for interactive charging (real-time simulated charging curve + break activities like `eat`, `toilet`, `dog`, `children`, `shopping`), dynamic events, wife dialogues, or live map peek.
   - „Früher laden“, der Beifahrerdialog und Ereignisse mit Umplanung verwenden `findReachableAdditionalStop()`. Die Suche folgt der Route ab der aktuellen Position, berücksichtigt den prognostizierten Verbrauch und bereits geplante erreichbare Ladungen und bietet nur zusätzliche Straßenladepunkte an. Erledigte und übersprungene Stopps werden pro Etappe ausgeschlossen. Der Beifahrerdialog übernimmt bei Bestätigung genau den angezeigten Halt.
   - Die Messe-Checkbox übernimmt die Planung und bleibt beim Besuch änderbar. Der Besuch dauert 240 Minuten. Bei einem freien Punkt (50 % Chance) lädt das Auto innerhalb von 210 Minuten bis höchstens zum gewählten Ladeziel. Bei voller Belegung bleibt der Ankunfts-SoC erhalten.
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
  - DC: piecewise-linear interpolation along `vehicle.chargingCurve`, capped by `station.maxKw`. 800 V cars on a Tesla stall are additionally capped at 150 kW. AC stalls (`isAcOnly` or `maxKw <= 43`) ignore the DC curve and use `min(station.maxKw, vehicle.acMaxKw)`.
- **`getBestPriceForStation(station, subscriptionIds, vehicle)`**:
  - Ad-hoc (`station.baseAdhocEurPerKwh`) is always a candidate, even when `subscriptionIds` is empty.
  - Own-network price comes from the active subscription’s `pricePerKwhOwn`.
  - Roaming is **not** tier-dependent. `PROVIDER_ROAMING_EUR_PER_KWH` in `subscriptions.ts` is one fixed €/kWh per provider (EnBW M and EnBW L share `0.79`). Tesla roaming for non-Teslas is the subscription price plus about 0.20 €/kWh (`0.41 + 0.20 = 0.61`). Other HPC roaming stays in about **0.69–0.89 €/kWh**. Level 2 hides EnBW and EWE Go and offers Atlante Go (4.99 €/month, 0.29 €/kWh; ad-hoc DC 0.54) and ENGIE Vianeo (0 € listed monthly fee, 0.33 €/kWh with the app tariff; ad-hoc from 0.54, card average 0.59). Sources: [MyAtlante](https://atlante.energy/fr/myatlante-app/) and [meilleurecharge.fr Atlante, October 2026](https://www.meilleurecharge.fr/operateur/atlante); [ENGIE Vianeo tariffs](https://www.engie-vianeo.com/tarifs-recharge-voiture-electrique/). 800 V cars stay capped at 150 kW on Tesla's 400 V stalls.
  - Tesla Model 3/Y keep the included Supercharger tariff (`0.39 €/kWh`). The 2015 Model S is `superchargerFree`: 0.00 €/kWh, battery 71.3 kWh (−5 %), and from 80 % SoC the curve is `kW ≈ 100 − SoC`.
  - Der Tesla-Fahrzeugtarif folgt der Fahrzeugwahl und wird über dieselbe Preisfunktion auf Tarifkarte und Ladesäule angezeigt. `subscriptionIds` speichert den kostenpflichtigen Supercharger Pass erst nach aktiver Buchung für eine Fremdmarke. Ein zuvor ausdrücklich gebuchter Pass bleibt bei einem Fahrzeugwechsel ausgewählt und kostet nur bei einer Fremdmarke den Trip-Anteil.
- `estimateTimedAcCharge()` berechnet für Messe-AC aus Bordlader, Säulenleistung, Ladeziel und Ladefenster den Abfahrts-SoC und die Kosten. Die Ladezeit liegt innerhalb des Besuchs. Prognose und Besuch verwenden dieselbe Berechnung.

### 4.2 Scoring (`ScoringEngine.ts`)
- Produces `totalScore` in `100..1000` from weighted sub-scores (`0..100` each):
  - `time`, `cost`, `stress`, `efficiency`, `decisions` (weights defined per level in `LevelConfig.scoringWeights`).
  - Zur Kostenwertung zählen Ladekosten, Abo-Anteile, Maut (`tollsEur`), Nebenkosten (`incidentalCostEur`) und Unterkunft (`lodgingCostEur`). Als Referenz gelten `level.costBenchmarkEurPerKm` oder 0,082 €/km. Für Level 2 gelten wegen der französischen Maut und der Übernachtung 0,30 €/km.
  - Die Maut einer Etappe wird am Ende der Autobahnfahrt einmal pro Etappenindex gebucht, auch wenn dort ein Ereignis die Fahrt unterbricht. Planung, Bordcomputer und Ergebnis weisen die Maut gesondert aus.
- Grades: `>= 880` (S-Rang), `>= 760` (A-Rang), `>= 620` (B-Rang), `480..619` (Solide), `< 480` (C-Rang).

### 4.3 Persistence (`SaveState.ts`)
- `localStorage` key: `eroadtrip_campaign_v1`
- Stores: `cashEur` (initial `26000`), `ownedVehicleId`, `unlockedLevelOrder`, `completedLevels` (`bestScore`, `bestMinutes`).

---

## 5. Content Inventory & Current Status

- **Map Graph (`src/data/europeMap.ts`)**: Normalized `1800×1420` Europe pixel coordinates with `CityNode[]`, `HighwayEdge[]` (distance, speed limit, optional French `speedLimitRainKmh`, elevation, tolls, vignette, weather, waypoints), and `ChargerStation[]`. Level 2 is three corridors: Luxemburg/Lyon, Reims/Nevers joining the Paris route at Clermont-Ferrand, and Paris/Clermont-Ferrand. The Autoroute du Soleil route and its exclusive edges are gone. Level 2 chargers are Ionity, Tesla, Electra, Atlante, ENGIE Vianeo, and AC-Dorfladen.
- **Vehicles (`src/data/vehicles.ts`)**: 9 vehicles (`mg4_standard`, `tesla_model_s_2015`, `vw_id3_pro`, `tesla_model_3_highland`, `tesla_model_y_lr`, `xpeng_g6_lr`, `kia_ev6_gtline`, `vw_id7_tourer`, `porsche_taycan`).
- **Levels (`src/data/levels.ts`)**:
  - `level_1_aachen_hannover` (**`playable: true`**) – Aachen $\leftrightarrow$ Hannover Messe mit drei Routenoptionen und optionalem AC-Laden beim Messebesuch.
  - `level_2_family_summer` (**`playable: true`**) – Aachen $\leftrightarrow$ Montpellier. Outbound and return are chosen like Level 1: Luxemburg/Lyon, Reims/Nevers, or Paris/Clermont-Ferrand. One overnight stop (good hotel with overnight AC to 95 % SoC, budget hotel, or sleep in the car with a 10 % robbery follow-up). French 130/110 limits, Ionity, Tesla, Electra, Atlante, ENGIE Vianeo, and AC-Dorfladen at 0.29 €/kWh. The level select offers it immediately; the start button unlocks after Level 1 (`unlockedLevelOrder`).
  - `level_3_alps_winter` through `level_7_nordkapp_ultimate` (**`playable: false`**) – Pre-configured routes, passengers, and rulesets ready to be enabled/expanded.

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
- **Staged campaign:** Level 1 and Level 2 are playable. Levels 3–7 stay `playable: false` in `src/data/levels.ts` with route options, passenger profiles, and scoring weights so later iterations can add balancing, city presets, and events without redesigning `types.ts`.

---

## 8. Known Limitations & Open Points

- **Levels 3–7:** Still `playable: false`. Level 2 is a round trip on the existing Autobahn and event screens (no new city preset). Its `targetArrivalMinutes` (2040) sits above an uncharged forecast so the time warning is not always on; an uncharged plan still warns that the battery runs out.
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
- **2026-11-24:** Touch controls no longer latch. Holds live in one `pointerId` map, release on pointerup/cancel/leave, lostpointercapture, touchend/cancel, blur, and hidden visibility, and reset when no pointer is registered. Buttons are not rebuilt while held. CSS sets `touch-action: none`, `user-select: none`, and the WebKit callout/tap-highlight rules.
- **2026-11-24:** Autobahn traffic keeps a hard gap. The player brakes for the car ahead and overtakes when the next lane is free; the set speed is only the ceiling, and kilometres, consumption, and the summary use the speed actually driven. AI cars do the same. Speed signs are per section: Level 1 mixes an end-of-restriction disc with red-ring 130/120/100, France stays 130 (110 in rain), and the country-road detour is 70. The blue advisory ring is gone. The sign sets the preset for that section; the slider still runs up to the car's top speed, and a faster choice is shown in red.
- **2026-11-24:** Speed traps use the driven speed against the current sign. The forecast colours the expected average after traffic (`congestedCruiseKmh`), so dense traffic lowers the warning on its own. Unrestricted sections are not fined. On the Autobahn the event is a chance roll while more than 8 km/h over the sign (country 70 and French rain 110 included), capped at two per leg. Fines follow German außerorts tiers or a French radar ticket (135 €, more when the excess is large). Level 2’s pool includes `evt_speed_trap`, shown as „Radar automatique / Gendarmerie“ in France. The brake-or-risk choice stays.
- **2026-11-24:** Level 2 is playable: Aachen $\leftrightarrow$ Montpellier with three outbound/return corridors (Luxemburg/Lyon, Paris/Clermont-Ferrand, Autoroute du Soleil), French 130/110 rain caps, Ionity/Tesla/Fastned/TotalEnergies/Electra, and AC-Dorfladen at 0.29 €/kWh. Events: dirty aires, one overnight choice (good hotel AC to 95 %, budget hotel, or the car with a 10 % −500 € / +2 h robbery), and arrival in Montpellier. Lodging is its own cost bucket. Level 1 routes, chips, and events are unchanged. Level select shows Level 2; the start button waits until Level 1 is finished.
- **2026-11-24:** Level 1 Aachen–Köln is unrestricted on every route that uses it. The only edge is `edge_aachen_koeln` (`speedLimitKmh: 0`); there is no separate return edge. Route A (Ruhr-Klassik) and Route C (Sauerland) use it outbound and back, so both directions show the end-of-limit disc, start the slider at 130, and take no speed-trap fine. Route B has no Aachen–Köln stage (Aachen–Düsseldorf stays unrestricted). The traffic preview on that first leg starts at 130 instead of the old 120 sign. Other 120 sections (Osnabrück–Hannover, Olpe–Kassel) are unchanged.
- **2026-11-24:** Same PR. Level 2 no longer offers Autoroute du Soleil; `edge_aachen_bruessel`, `edge_bruessel_lille`, `edge_lille_paris`, and `edge_paris_lyon` and their chargers are removed. Hannover Messe opens its own visit screen (about 4 hours): optional AC at the 6-stall park with a 50 % chance a point is free, optional meal at −50 €, toilet automatic, and one of 10 short reports. Level 2 drops Fastned and TotalEnergies parks. Replacements on the remaining corridors: IONITY Beaune-Merceuil (A6, 350 kW), Tesla Supercharger Orange (A7/A9, 250 kW), ENGIE Vianeo Vierzon (A71, 300 kW, same 0.59 € ad-hoc as the other Vianeo stalls), Atlante Béziers (A9, 300 kW, 0.54 € ad-hoc). AC power is `vehicle.acMaxKw`: MG4 Standard 7 kW (series 6.6 kW), Model S 2015 22 kW (dual charger option), Taycan 22 kW (optional onboard charger), every other car 11 kW. The charge screen says AC-Laden on AC stalls. Autohof traffic drives in, waits in a free bay, and leaves on the motorway; NPCs brake for the car ahead, including the player.
- **2026-11-24:** Package F, same PR. Aachen–Düsseldorf is unrestricted again. The charge-target slider starts at the arrival SoC. Breaks show bladder, hunger, and stress and update them. The active-stage range ring is green/yellow/orange/red (25–15 / 15–10 / 10–5 / 5–0) with soft edges. The accident event offers help instead of first aid, plus a YouTube stream (+500 €, +5 min, −10 stress, 30 % chance of a charge: −1000 €, +45 min, +50 stress). Cars on the Autobahn face along the lane (nose up the road; a small yaw only while changing lanes) and the player car has a halo. Hannover Messe is a 4-hour stay with food and a plannable 6-stall 22 kW AC park (50 % free). Model S Supercharging is free; other Teslas keep the included subscription. Level 2’s middle corridor is Reims–Nevers and joins the Paris route at Clermont-Ferrand. Level 2 drops EnBW and EWE Go for Atlante (ad-hoc 0.54 €/kWh, Atlante Go 4.99 €/month and 0.29 €/kWh, source atlante.energy and meilleurecharge.fr October 2026) and ENGIE Vianeo (0.33 €/kWh with the tariff, ad-hoc from 0.54 and about 0.59 on card, source engie-vianeo.com; no fixed monthly fee published, so 0 € in game). Non-Tesla Supercharger roaming is 0.61 €/kWh. The Autobahn shows the trip computer with the stage map. The tailgate button appears only when you are more than 10 km/h under the set speed with a car in the left lane ahead. The charge screen shows clock and weather. Autohöfe vary by charger id, some bays are occupied, and charger posts collide so the bay is a reverse park.

- **2026-11-25:** Review 1, 2, 3, 4 und 16 umgesetzt. Ladestopps und Defekte sind pro Etappe eindeutig. Messe-AC gehört zum Besuch, berücksichtigt 210 Lademinuten in beiden Prognosen und ist bei eingeplanter Ladung vorausgewählt. Level 2 bucht Maut je abgeschlossener Etappe und zeigt sie einzeln an. „Früher laden“ und Beifahrerdialog nutzen dieselbe Suche nach erreichbaren zusätzlichen Halten. Tesla-Fahrzeugtarife folgen der Fahrzeugwahl, der kostenpflichtige Pass setzt eine aktive Buchung voraus.

- **2026-11-25:** Review 5–8 umgesetzt. Autohof-Hindernisse haben Kollisionsflächen aus den Sprite-Grundrissen, bewegliche Fahrzeuge gedrehte Kapseln. Stadt- und Autohof-KI folgen gerichteten Spuren, warten vor belegten Kreuzungen und verlassen die Karte am Rand. Der Autohof-Besucher parkt rückwärts in eine freie Bucht und fährt vorwärts zurück auf die ostwärts führende Spur. Autobahnverkehr hält Abstände je Spur über die Geschwindigkeit und prüft die Ziellücke nach dem Blinken erneut. Das farbige Reichweitenband folgt dem Ladeverlauf der Etappenprognose.
