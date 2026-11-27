# Combustion Engine 3D – Interactive Explainer

## 1. Overview

The German-language explainer covers four engine layouts. Each can run as a naturally aspirated petrol engine with port fuel injection (*Saugrohreinspritzung*) or as a common-rail *Turbodiesel*. The crank angle links the moving hardware, the four strokes and the illustrative gas paths. The operating map and six-speed automatic provide the separate driving examples.

## 2. Modules

| File | Responsibility |
| --- | --- |
| `index.html` | Entry point, local Three.js import map, CSP, engine controls, inspector, telemetry, charts and tour dialog. |
| `styles.css` | Responsive sidebar, mobile drawer, graphics popover, dark/light themes, component labels, chart and tour controls, gas colour key and repair banner. |
| `ce-variants.js` | Layouts, firing orders, crankpin and bank angles, idle speeds, ignition advance, torque, boost and fuel maps. |
| `ce-data.js` | Four-stroke phase, spark and burn windows, operating rpm limits, component descriptions, telemetry, consumption contours, gearing, road load and driving examples. |
| `ce-mechanics.js` | Axial intervals and endpoints for main journals, crankpins and webs, drive placement, display crank speed, cam support and outline, tangent/arc belt contour and pitch-length adjustment. |
| `ce-crankshaft.js` | Builds the journal bearings, counterweighted webs, crankpins and connecting rods with through-bores at both ends. |
| `ce-oil-pan.js` | Hollow sump with a cutaway lip, depth-coloured oil section and a reflective, rippling free surface. |
| `ce-belt.js` | Toothed wheels, tensioner, closed belt band and moving surface pattern per bank. |
| `ce-ignition.js` | Petrol electrodes, shared arc mesh and camera-facing halo, chamber volume shader, diesel spray pattern and shared ignition light. |
| `ce-plumbing.js` | Named world-space ports, directed gas and fuel passages, chamber interfaces and component/flange definitions for every profile. |
| `ce-ducts.js` | Rounded centreline samples, duct cross sections, mating rims, coolers, filter, DPF, valves, turbo assembly and pump. |
| `ce-junctions.js` | Open-port tee and collector hulls from the trimmed pipe rims, with tangent limits for tracer turns. |
| `ce-volute.js` | Spiral turbine and compressor casings with an axial lip and a rectangular-to-round tangential throat. |
| `ce-throttle.js` | Shared petrol plate dimensions, opening angle, admission fraction and tracer clearance through the two openings. |
| `ce-lanes.js` | Transports a cross-section basis along each route and samples cubic turns between fitting rims into build-time tables. |
| `ce-tracers.js` | Persistent parcel journeys, arc-length lookup, petrol admission at the plate or injector, retained exhaust gas and the density budget for one shaded point batch. |
| `ce-model.js` | Bank frames, cutaway and X-ray materials, slider-crank assemblies, DOHC valvetrain, ignition hardware and integration with ducts, belts and tracers. |
| `ce-flow-guide.js` | Fuel-system and gas-path stations, engine-specific inspector entries, port targets and the ignition camera for the open side of each layout. |
| `ce-explosion.js` | Internal overrev sequence, WebAudio, debris, smoke and repair reset. |
| `ce-ao.js` | AO levels and automatic selection, depth-aware compositing, render layers, scene shadows and output conversion. |
| `ce-settings.js` | Stores graphics preferences, connects the popover controls to the renderer and model, and samples FPS while the popover is open. |
| `ce-main.js` | Studio scene, viewport, orbit controls, component selection, model switching, HUD, charts and tour playback. |
| `tests/index.js` | Entry point for running the test modules by directory. |
| `tests/engine-crankshaft.test.mjs` | Checks the built shaft from nose to flywheel, bearing and rod bores, measured piston stroke, rod alignment and clearance on all eight profiles at 15° intervals over two revolutions. |
| `tests/engine-map.test.mjs` | Baseline petrol telemetry, consumption contours, presets and release metadata. |
| `tests/engine-gear.test.mjs` | Gear choice, speed, consumption, road load and displayed values. |
| `tests/engine-tour.test.mjs` | Driving examples, release history, tour navigation, keyboard and pointer interaction with settings, persistence and FPS with a DOM/render-clock fixture. |
| `tests/engine-variants.test.mjs` | Layout and combustion profiles, crank phases, boost, slider and chart limits, engine switching and repair. |
| `tests/engine-lanes.test.mjs` | Checks lane continuity, spread and containment against every directed junction and mating flange on all eight profiles. |
| `tests/engine-ao.test.mjs` | Exercises the vendored pass chain with a recording renderer, including each preset, overlay exclusion, shadow toggles, output conversion, DPR, URL and user precedence, target disposal and FPS fallback. |
| `tests/engine-oil.test.mjs` | Checks the oil against the inner sump walls and the continuous crank and rod envelopes on all eight profiles, verifies material properties, closed seams at every wave phase, pause and projected oil-level movement in the side close-up, and checks both X-ray palettes and material restoration. |
| `tests/engine-geometry.test.mjs` | Tests the built geometry without WebGL. Covers port connectivity, fitting rims, pipe and timing-drive clearance, aligned sprockets, cam contact, throttle delivery, density changes and buffer reuse, retained charge, firing order, overlapping flames, electrode contact, timing and colour of the ignition light, projected halo size, pause, slow motion and the tour camera sightline. |

The page import map resolves Three.js r170 and the shared composer, render and output passes from `shared/vendor/three-0.170.0/`. An exact entry resolves `three/addons/postprocessing/GTAOPass.js` from the game's `vendor/three-0.170.0-addons/`. That directory contains the upstream MIT `LICENSE`, `postprocessing/{GTAOPass,Pass}.js`, `shaders/{GTAOShader,PoissonDenoiseShader,CopyShader}.js` and `math/SimplexNoise.js`. GTAO uses its local `FullScreenQuad` internally. The shared composer calls the pass through its `setSize` and `render` methods. The AO test loads the page's import map to exercise this combination.

## 3. Model and operating parameters

| Parameter / owner | Value | Interpretation |
| --- | --- | --- |
| Layouts / `ce-variants.js` | R4 and 180° B4, 2.0 l. 60° V6, 3.0 l. 90° crossplane V8, 4.0 l. | Firing orders 1–3–4–2, 1–3–2–4, 1–2–3–4–5–6 and 1–8–4–3–6–5–7–2 respectively. Crankpin angle equals cycle offset plus bank angle modulo 360°. |
| Slider-crank geometry / mechanics | Throw radius 0.58, stroke 1.16, rod length 1.92 model units. Each 0.26-wide big end has at least 0.025 clearance to each cheek. | R4 and boxer rods have individual pins. Each V6 split pair has two offset pins joined by a central cheek. Each V8 crossplane pin carries two rods side by side. Counterweighted outer webs connect the pins to the on-axis main journals. The rendered crown bounds the tracer cloud throughout the stroke. |
| Oil pan / `ce-oil-pan.js` | The floor sits 1.35 model units below the crank axis. The resting level is 0.30 above the floor with a 0.004 inset from the casting. Wave amplitude grows from 0.003 at idle to 0.072 at maximum rpm, and frequency from 0.8 to 3.2 Hz at normal playback. | The 48 × 20 surface grid and the sides share two morph weights. The surface uses #3a2108 with roughness 0.11, clearcoat 0.30 and clearcoat roughness 0.07. The rods and shaft clear the highest possible crest by at least 0.168 model units. |
| Cam and valve geometry / mechanics | Axis height 4.77, lateral offsets ±0.32, base radius 0.23, seat height 3.33 | Flat-bucket displacement and the lobe outline come from the same support function. Its angular derivative locates the contact point. Intake and exhaust peak at 90° and 630° cylinder phase. Springs shorten by the actual lift. |
| Timing drive / mechanics and belt | 10 crank teeth, 20 per cam, 14 on the in-loop tensioner | Two external tangents meet each wheel at its wrap arc. The tensioner position sets an integral belt pitch count. The band advances by crank pitch radius × crank angle. The 0.13-wide wheels and 0.144-wide belt share a plane at least 0.14 units clear of the full-size crank and cam shafts. A 0.058-radius nose fits the 0.060-radius bore. The second bank sits 0.24 units farther along the same nose. |
| Petrol / variants | Idle 800 / 750 / 700 / 650 rpm (R4 / B4 / V6 / V8), redline 6500, maximum 7000 rpm. Fuel 42.7 MJ/kg, 745 g/l, final drive 3.2 on R4. | R4 reference 200 Nm at 4250 rpm, about 109 kW at peak power and 245 g/kWh at the map optimum. |
| Diesel / variants | Idle 750 / 750 / 700 / 600 rpm (R4 / B4 / V6 / V8), redline 4500, maximum 5000 rpm. Fuel 42.6 MJ/kg, 835 g/l, final drive 2.48 on R4. | Compression ratio 16.5, about 381 Nm on R4. Boost depends on speed, load and layout. |
| Ignition / variants, data, mechanics and ignition | Flame starts at 348° cylinder phase for petrol and 356° for diesel. Base burn window 54°, minimum playback duration 190 ms. The petrol spark occupies the preceding 80 ms at normal or faster playback. Its halo spans 30–46 CSS pixels including the soft edge. | The display clock eases from 700°/s towards 900°/s. Faster playback widens the burn window. Slow motion stretches both effects and pause freezes them with the crank. An in-progress burn keeps its progress when speed changes. |
| Torque conversion / variants | 15.915 × displacement / 2 Nm/bar | Converts brake mean effective pressure to torque for the selected displacement in litres. |
| Example drivetrain / data | Ratios 4.04, 2.37, 1.56, 1.16, 0.85, 0.69. Wheel radius 0.32 m. | Reference vehicle 1500 kg, rolling coefficient 0.011, drag area 0.65 m² and driveline efficiency 0.92. |
| Consumption contours / data and variants | 25 rpm × 2 load-percentage-point grid | Petrol contours span 250–450 g/kWh, diesel 205–400 g/kWh. |
| Petrol throttle / throttle and ducts | Bore radius 0.21, plate radius 0.189, plate thickness 0.024. Pedal travel turns the plate from 8.1° to 90°. | The projected face area against the inscribed duct cross section gives about 14%, 43% and 100% parcel admission at idle, half pedal and full pedal. |
| Particle budget / tracers | Gas density 25–200% in 5-point steps, default 100%. Desktop min/default/max 2,688 / 10,752 / 21,504 slots, reduced 1,008 / 4,032 / 8,064. Each cylinder retains one exhaust parcel per 32 slots. | A window ≤768 CSS px wide, ≤4 logical cores or ≤4 GiB reported memory selects the reduced cap. GPU buffers reserve the tier maximum. Moving the slider extends the CPU pool on demand and updates only the active prefix in one draw call. Crossing the viewport threshold replaces the point batch if the tier changes. Throttle admission, fuel share and boost-dependent routes still act on the selected population. |
| Ambient occlusion / ce-ao | Active presets use eight AO samples and eight denoise samples with a three-pixel denoise radius. Output DPR is capped at 2. | Automatic AO requires both window and canvas to exceed 768 CSS px and hardware to report neither ≤4 cores nor ≤4 GiB. Two consecutive one-second windows below 40 FPS switch automatic AO off until reload. |

| AO level | World radius | Thickness | Blend strength | AO / denoise resolution | Normal / depth resolution |
| --- | ---: | ---: | ---: | --- | --- |
| Off (Aus) | — | — | — | Direct rendering | Composer targets released |
| Low (Niedrig, former v0.5.2 default) | 0.38 | 0.16 | 0.35 | Half | Half |
| Medium (Mittel, new automatic default on capable devices) | 0.52 | 0.22 | 0.72 | Half | Full |
| Strong (Stark) | 0.66 | 0.28 | 0.95 | Half | Full |

## 4. Gas paths and controls

The filter mouth and tailpipe mouth open to ambient. The fuel pump feeds a separate sealed supply. Each bank has an intake distributor, a cumulative exhaust collector, two inlet and two outlet passages per cylinder. The tube wall and tracer lookup use the same rounded centreline. At a branch, the straight tubes stop at the fitting's port rims. Each selected route carries its transverse coordinates through the rims. The lane lookup joins them with cubic Béziers whose tangent controls fit inside the cast hull. Couplings share a cross section, including the turbocharger flanges. Rail and runner use one continuous lookup through the petrol injector. Only the journey endpoints taper for birth, chamber exchange or discharge. In cutaway and X-ray the walls become translucent.

On petrol engines, approaching air parcels accelerate through the throttle gap. Their lateral offsets clear the projected plate edge and its thickness on either side of the spindle. Beads shrink to fit the narrow idle gap. The current pedal position meters air at the plate and fuel at the port injector. Admitted parcels continue into the cylinders as the pedal moves. A small brown charge follows each piston through gas exchange, including at idle. Fuel travels along the rail and enters the intake runner at a timed port injector. On diesels the pump feeds each bank's common rail, high-pressure lines and central injectors. The fuel enters the chamber just before compression TDC. The tilted glow plug assists cold starting.

On petrol engines a jagged arc bridges the centre pin and ground strap. The shared point light pulses cool white at the gap, then turns amber over the first 14% of the burn as the flame spreads from the same spot. For diesel, five yellow spray plumes grow from the injector tip, merge and fade into a reddish soot glow. The additive shader takes eight emission samples along each viewing ray through a shared cylindrical mesh. Animated 3D value noise breaks up the front. The chamber roof, liner and moving crown bound the volume, including the raised diesel bowl lip. Independent material uniforms let burns overlap. The strongest active pulse positions and colours the light.

On diesel the exhaust collector feeds the turbine tangentially. The axial outlet feeds the downpipe, DPF and tailpipe. Fresh air enters the compressor axially and leaves tangentially for the finned intercooler and intake distributor. Both wheels turn on one shaft. The short high-pressure EGR branch taps upstream of the turbine and rejoins after the intercooler. The low-pressure branch takes filtered exhaust downstream of the DPF and returns it before the compressor. Each branch has its own cooler and metering valve.

Parcel admission and discharge times lie inside the associated valve windows. Particles fan out from the valve or injector into a cloud bounded by the moving piston and converge on the exhaust port before discharge. Blue denotes air, red fuel and brown spent charge, including filtered and recirculated gas. One parcel may pass through EGR and the cylinder again before reaching the tailpipe. On diesel, load and boost set the parcel counts, fuel share and EGR route at birth. The diesel intake path is unthrottled. Passage-specific transit times illustrate pressure, cooling and expansion. These are qualitative tracers. Displayed concentrations, local speeds, dimensions and compression volumes are illustrative.

## 5. Views and tour

Motor/layout switches rebuild the assembly, components, gauges, charts and tour. The rpm slider, both chart axes and tour playback use the selected profile’s idle as their lower limit. Switching profiles carries over the pedal and clamps the current rpm. The idle preset follows the new idle speed. At idle, the gas and mechanisms keep moving with the petrol throttle nearly closed. Exterior, cutaway, X-ray and the internal overrev/repair mode share the model. Cutaway opens the viewing side of each bank and the upper side of a boxer. Speed, load, gear indication, presets, pause and slow motion are available alongside the dyno and efficiency maps.

In cutaway, a low metal lip frames the oil. The dark amber dielectric surface reflects a light panel from the existing studio environment. Its normals tilt with the waves, moving the reflection as the engine speeds up. The exposed section darkens towards the floor. Pause holds the wave shape while the reflection follows the camera. The exterior and overrev separation hide the oil. X-ray draws the housings and pipes in translucent smoke grey with a neutral gradient across curved surfaces. The selected housing and the edges use lighter greys, adjusted for each theme. The oil, gas tracers and ignition effects keep their own materials.

With AO enabled, the colour and normal/depth passes see the same opaque meshes. Medium and Strong weight neighbouring AO samples by depth when compositing onto the full-size colour buffer. Background pixels keep their original colour. A second scene pass draws tracers, transparent surfaces, wireframes and additive effects with the original depth buffer available. In cutaway and X-ray, the active spark draws its soft billboard and arc over the cylinder-head edge with depth testing disabled. OutputPass applies ACES filmic tone mapping at exposure 1.08 and converts to sRGB. Layer selection follows current materials during camera flights, view transitions and repair.

With the desktop sidebar open, compact horizontal spacing keeps the view controls and actions on one line at a 1280 px window width. Narrower viewports can wrap. The gear beside Reset opens the graphics controls. An explicit AO selection overrides device, viewport and FPS rules. URL overrides take priority over the stored selection. `?ao=0` forces Off and `?ao=1` forces Medium. Hardware without floating-point colour targets uses direct rendering. Scene shadows default to on and can be toggled independently. The game stores AO choice, shadow casting and gas density in `combustion_engine_settings`. Blocked storage leaves them usable for the session. The open popover displays the mean frame rate twice per second. Escape returns focus to the gear. Clicking or tabbing outside, or starting the tour, closes it.

The petrol tour has 11 stations. The diesel tour has 16. Both introduce the colour key and fuel supply, then follow the four strokes. The ignition station looks into a chamber on the open bank, from above for the boxer. Diesel continues through the turbocharger, intercooler, DPF and both EGR routes. The timing drive and the existing pedal, road-load, gearbox and consumption-map examples finish both tours. Gas-path steps use the corresponding hardware coordinates and material highlights. Finishing the tour restores the user's flow setting and operating point.

## 6. Verification and open checks

Run `node --test games/combustion-engine/tests/` with Node 22.15 or newer. The geometry suite constructs and updates all eight assemblies without a renderer. For the remaining browser review, compare the reflected highlight and moving oil level in the side close-up at idle and 6500 rpm, then check the desktop toolbar with the boxer engine selected. Check sustained frame rate on a phone. Release entry reviewed in `shared/releases.js` under rule 10.

## Changelog

- **2026-11-25** (`main`, `8c0fce8`) – Erstversion `v0.1.0`: Vollständiger 3D-Explainer eines 2,0-Liter-DOHC-16V-Verbrennungsmotors mit Cutaway, X-Ray, Exploded View (12 Labels), Drehzahl-/Zeitlupensteuerung, Prüfstandskurve und 6-Schritte-Tour (später ersetzt: Tour mit neun Schritten in v0.3.0; Exploded View als Überdrehzahl-Easter-Egg in v0.4.0).
- **2026-11-25** (`main`, `0e73752`) – Patch `v0.1.1`: Mobiles Steuerungsmenü mit festem „Zurück zu 3D“-Knopf, Backdrop-Tap-Close und Escape-Taste ergänzt.
- **2026-11-27** (`codex/combustion-load-map`, `cf28b8d`) – Feature `v0.2.0` mit Gaspedal, lastabhängiger Telemetrie, interaktiver Muschelkurve und gekoppelten Voreinstellungen.
- **2026-11-27** (`codex/combustion-load-map`, `add54de`) – Erweiterung v0.2.0: Gang, Geschwindigkeit und Verbrauch für eine Beispielautomatik sowie gangabhängige Fahrwiderstandslinien in der Muschelkurve.
- **2026-11-27** (`codex/combustion-load-map`, SHA: `0add518`) – Feature v0.3.0: Gangwahlanzeige, Momentanverbrauch bei Beschleunigung und Schub sowie geführte Tour mit animierten Fahrbeispielen.
- **2026-11-27** (`codex/combustion-load-map`, SHA: `66a8667`) – Patch v0.3.1: Beispielkennfeld eines 2,0-l-Saugbenziners mit Saugrohreinspritzung, dazu passende Voreinstellungen und Tour sowie Einspritzventile und Kraftstoffleiste im 3D-Modell.
- **2026-11-27** (`upstream/main`, Merge `84636bc`, [PR #12](https://github.com/hunterjoeING/hunterjoeING.github.io/pull/12)) – v0.3.1 live auf https://hunterjoeing.github.io/games/combustion-engine/.
- **2026-11-27** (`main`, `9ed0fd1`) – Feature `v0.4.0`: Common-Rail-Turbodiesel mit 3D-VTG-Turbolader, Direkteinspritzkegel und Ladedruck-Telemetrie; vier parametrische Bauformen (R4, 180°-Boxer B4, 60°-V6, 90°-Crossplane-V8); Überdrehzahl-Explosions-Easter-Egg; korrigierte Nockenwellen-Phasen und isolierte Baugruppen-Hervorhebung (später ersetzt: Steuertrieb, Einspritzdarstellung und Gasführung in v0.5.0).
- **2026-11-27** (`codex/combustion-3d-v0.5`, SHA: `3eed89e`, fork only) – v0.5.0 adds per-bank toothed belts, matched cams and buckets, connected gas and fuel paths with timed tracers, and guided diesel charge-air and EGR circuits (später ersetzt: fork-only status superseded by upstream PR #15, merge `d577d49`).
- **2026-11-27** (`codex/combustion-v0.5.1`, fork `21167a2` + docs `d6eb685`, follow-up `d8a7660` + docs commit, fork only, no PR) – v0.5.1 seats the rods on their crankpins, clears the timing drive and sets layout-specific idle floors. Denser gas shows throttle flow and residual charge. Larger overlapping flames light the chambers during normal playback and the ignition tour step. (später ersetzt: v0.5.1 went live in upstream PR #16, merge `36cf0a4`. Patch v0.5.2 replaces the flame kernel.)
- **2026-11-27** (`codex/combustion-v0.5.2`, fork `24d9c71` + docs `ceabecf`, follow-up `c56ecc2` + docs commit, fork only, no PR) – v0.5.2 carries tracer lanes through junctions and shows the petrol spark and chamber-bounded flames. The graphics menu adds AO levels, scene shadows, gas density and FPS. Smoke-grey X-ray and the opened sump reveal the dark oil and moving studio reflections.
