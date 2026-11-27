# Combustion Engine 3D – Interactive Explainer

## 1. Overview

The German-language explainer covers four engine layouts. Each can run as a naturally aspirated petrol engine with port fuel injection (*Saugrohreinspritzung*) or as a common-rail *Turbodiesel*. The crank angle links the moving hardware, the four strokes and the illustrative gas paths. The operating map and six-speed automatic provide the separate driving examples.

## 2. Modules

| File | Responsibility |
| --- | --- |
| `index.html` | Entry point, local Three.js import map, CSP, engine controls, inspector, telemetry, charts and tour dialog. |
| `styles.css` | Responsive sidebar and mobile drawer, dark/light themes, component labels, chart and tour controls, gas colour key and repair banner. |
| `ce-variants.js` | Layouts, firing orders, crankpin and bank angles, idle speeds, ignition advance, torque, boost and fuel maps. |
| `ce-data.js` | Four-stroke phase and ignition envelope, operating rpm limits, component descriptions, telemetry, consumption contours, gearing, road load and driving examples. |
| `ce-mechanics.js` | Axial intervals and endpoints for main journals, crankpins and webs, drive placement, display crank speed, cam support and outline, tangent/arc belt contour and pitch-length adjustment. |
| `ce-crankshaft.js` | Builds the journal bearings, counterweighted webs, crankpins and connecting rods with through-bores at both ends. |
| `ce-belt.js` | Toothed wheels, tensioner, closed belt band and moving surface pattern per bank. |
| `ce-ignition.js` | Chamber-bounded flame growth, independent shader uniforms per cylinder and positioning of the shared local ignition light. |
| `ce-plumbing.js` | Named world-space ports, directed gas and fuel passages, chamber interfaces and component/flange definitions for every profile. |
| `ce-ducts.js` | Rounded centreline samples, duct cross sections, mating rims, coolers, filter, DPF, valves, turbo assembly and pump. |
| `ce-junctions.js` | Open-port tee and collector fittings built from the actual trimmed pipe rims. |
| `ce-volute.js` | Spiral turbine and compressor casings with an axial lip and a rectangular-to-round tangential throat. |
| `ce-throttle.js` | Shared petrol plate dimensions, opening angle, admission fraction and tracer clearance through the two openings. |
| `ce-tracers.js` | Persistent parcel journeys, arc-length lookup, petrol admission at the plate or injector, retained exhaust gas and one shaded point batch. |
| `ce-model.js` | Bank frames, cutaway block/head, slider-crank assemblies, DOHC valvetrain, ignition hardware and integration with ducts, belts and tracers. |
| `ce-flow-guide.js` | Fuel-system and gas-path stations, engine-specific inspector entries, port targets and the ignition camera for the open side of each layout. |
| `ce-explosion.js` | Internal overrev sequence, WebAudio, debris, smoke and repair reset. |
| `ce-main.js` | Renderer, orbit controls, component selection, model switching, HUD, charts and tour playback. |
| `tests/index.js` | Entry point for running the test modules by directory. |
| `tests/engine-crankshaft.test.mjs` | Checks the built shaft from nose to flywheel, bearing and rod bores, measured piston stroke, rod alignment and clearance on all eight profiles at 15° intervals over two revolutions. |
| `tests/engine-map.test.mjs` | Baseline petrol telemetry, consumption contours, presets and release metadata. |
| `tests/engine-gear.test.mjs` | Gear choice, speed, consumption, road load and displayed values. |
| `tests/engine-tour.test.mjs` | Driving examples, release history, tour navigation and playback with a DOM/render-clock fixture. |
| `tests/engine-variants.test.mjs` | Layout and combustion profiles, crank phases, boost, slider and chart limits, engine switching and repair. |
| `tests/engine-geometry.test.mjs` | Tests the built geometry without WebGL. Covers port connectivity, fitting rims, pipe and timing-drive clearance, aligned sprockets, cam contact, throttle clearance and delivery, retained charge, firing order, overlapping flame envelopes, pause, slow motion and the tour camera sightline. |

## 3. Model and operating parameters

| Parameter / owner | Value | Interpretation |
| --- | --- | --- |
| Layouts / `ce-variants.js` | R4 and 180° B4, 2.0 l. 60° V6, 3.0 l. 90° crossplane V8, 4.0 l. | Firing orders 1–3–4–2, 1–3–2–4, 1–2–3–4–5–6 and 1–8–4–3–6–5–7–2 respectively. Crankpin angle equals cycle offset plus bank angle modulo 360°. |
| Slider-crank geometry / mechanics | Throw radius 0.58, stroke 1.16, rod length 1.92 model units. Each 0.26-wide big end has at least 0.025 clearance to each cheek. | R4 and boxer rods have individual pins. Each V6 split pair has two offset pins joined by a central cheek. Each V8 crossplane pin carries two rods side by side. Counterweighted outer webs connect the pins to the on-axis main journals. The rendered crown bounds the tracer cloud throughout the stroke. |
| Cam and valve geometry / mechanics | Axis height 4.77, lateral offsets ±0.32, base radius 0.23, seat height 3.33 | Flat-bucket displacement and the lobe outline come from the same support function. Its angular derivative locates the contact point. Intake and exhaust peak at 90° and 630° cylinder phase. Springs shorten by the actual lift. |
| Timing drive / mechanics and belt | 10 crank teeth, 20 per cam, 14 on the in-loop tensioner | Two external tangents meet each wheel at its wrap arc. The tensioner position sets an integral belt pitch count. The band advances by crank pitch radius × crank angle. The 0.13-wide wheels and 0.144-wide belt share a plane at least 0.14 units clear of the full-size crank and cam shafts. A 0.058-radius nose fits the 0.060-radius bore. The second bank sits 0.24 units farther along the same nose. |
| Petrol / variants | Idle 800 / 750 / 700 / 650 rpm (R4 / B4 / V6 / V8), redline 6500, maximum 7000 rpm. Fuel 42.7 MJ/kg, 745 g/l, final drive 3.2 on R4. | R4 reference 200 Nm at 4250 rpm, about 109 kW at peak power and 245 g/kWh at the map optimum. |
| Diesel / variants | Idle 750 / 750 / 700 / 600 rpm (R4 / B4 / V6 / V8), redline 4500, maximum 5000 rpm. Fuel 42.6 MJ/kg, 835 g/l, final drive 2.48 on R4. | Compression ratio 16.5, about 381 Nm on R4. Boost depends on speed, load and layout. |
| Ignition / variants, data and mechanics | Starts at 348° cylinder phase for petrol and 356° for diesel. Base window 54° with a minimum playback duration of 190 ms. | The display clock eases from 700°/s towards 900°/s. Faster playback widens the burn window. Slow motion stretches the envelope and pause freezes it with the crank. An in-progress burn keeps its progress when speed changes. |
| Torque conversion / variants | 15.915 × displacement / 2 Nm/bar | Converts brake mean effective pressure to torque for the selected displacement in litres. |
| Example drivetrain / data | Ratios 4.04, 2.37, 1.56, 1.16, 0.85, 0.69. Wheel radius 0.32 m. | Reference vehicle 1500 kg, rolling coefficient 0.011, drag area 0.65 m² and driveline efficiency 0.92. |
| Consumption contours / data and variants | 25 rpm × 2 load-percentage-point grid | Petrol contours span 250–450 g/kWh, diesel 205–400 g/kWh. |
| Petrol throttle / throttle and ducts | Bore radius 0.21, plate radius 0.189, plate thickness 0.024. Pedal travel turns the plate from 8.1° to 90°. | The projected face area against the inscribed duct cross section gives about 14%, 43% and 100% parcel admission at idle, half pedal and full pedal. |
| Particle budget / tracers | Desktop 6144 → 10752 slots. Reduced budget 2304 → 4032 slots (+75% over v0.5.0). One in every 32 slots per cylinder represents retained exhaust gas. | At assembly build, ≤4 logical cores, ≤4 GiB reported memory or a viewport ≤768 CSS px wide selects the reduced cap. Both retained and travelling parcels use one point draw call with preallocated position/colour buffers and, on petrol, a bead-size buffer. |

## 4. Gas paths and controls

The filter mouth and tailpipe mouth open to ambient. The fuel pump feeds a separate sealed supply. Each bank has an intake distributor, a cumulative exhaust collector, two inlet and two outlet passages per cylinder. The tube wall and tracer lookup use the same rounded centreline. At a branch, the straight tubes stop at the fitting's port rims. In cutaway and X-ray the walls become translucent.

On petrol engines, approaching air parcels accelerate through the throttle gap. Their lateral offsets clear the projected plate edge and its thickness on either side of the spindle. Beads shrink to fit the narrow idle gap. The current pedal position meters air at the plate and fuel at the port injector. Admitted parcels continue into the cylinders as the pedal moves. A small brown charge follows each piston through gas exchange, including at idle. Fuel travels along the rail and enters the intake runner at a timed port injector. On diesels the pump feeds each bank's common rail, high-pressure lines and central injectors. The fuel enters the chamber just before compression TDC. The tilted glow plug assists cold starting.

The petrol flame starts at the central electrode. Diesel ignition starts in the injected spray with a softer yellow-orange edge. A bright core expands almost to the liner and moving piston crown, including the raised diesel bowl lip. Each cylinder has its own envelope and material uniforms on shared geometry, so successive burns can overlap. A single short-range point light briefly illuminates nearby surfaces at ignition. It casts no shadows.

On diesel the exhaust collector feeds the turbine tangentially. The axial outlet feeds the downpipe, DPF and tailpipe. Fresh air enters the compressor axially and leaves tangentially for the finned intercooler and intake distributor. Both wheels turn on one shaft. The short high-pressure EGR branch taps upstream of the turbine and rejoins after the intercooler. The low-pressure branch takes filtered exhaust downstream of the DPF and returns it before the compressor. Each branch has its own cooler and metering valve.

Parcel admission and discharge times lie inside the associated valve windows. Particles fan out from the valve or injector into a cloud bounded by the moving piston and converge on the exhaust port before discharge. Blue denotes air, red fuel and brown spent charge, including filtered and recirculated gas. One parcel may pass through EGR and the cylinder again before reaching the tailpipe. On diesel, load and boost set the parcel counts, fuel share and EGR route at birth. The diesel intake path is unthrottled. Passage-specific transit times illustrate pressure, cooling and expansion. These are qualitative tracers. Displayed concentrations, local speeds, dimensions and compression volumes are illustrative.

## 5. Views and tour

Motor/layout switches rebuild the assembly, components, gauges, charts and tour. The rpm slider, both chart axes and tour playback use the selected profile’s idle as their lower limit. Switching profiles carries over the pedal and clamps the current rpm. The idle preset follows the new idle speed. At idle, the gas and mechanisms keep moving with the petrol throttle nearly closed. Exterior, cutaway, X-ray and the internal overrev/repair mode share the model. Cutaway opens the viewing side of each bank and the upper side of a boxer. Speed, load, gear indication, presets, pause and slow motion are available alongside the dyno and efficiency maps.

The petrol tour has 11 stations. The diesel tour has 16. Both introduce the colour key and fuel supply, then follow the four strokes. The ignition station looks into a chamber on the open bank, from above for the boxer. Diesel continues through the turbocharger, intercooler, DPF and both EGR routes. The timing drive and the existing pedal, road-load, gearbox and consumption-map examples finish both tours. Gas-path steps use the corresponding hardware coordinates and material highlights. Finishing the tour restores the user's flow setting and operating point.

## 6. Verification and open checks

Run `node --test games/combustion-engine/tests/` with Node 22.15 or newer. The geometry suite constructs and updates all eight assemblies without a renderer. Browser review covers actual WebGL shader output, transparent-surface sorting, touch interaction and mobile frame rate. Release entry reviewed in `shared/releases.js` under rule 10.

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
- **2026-11-27** (`codex/combustion-v0.5.1`, fork `21167a2` + docs `d6eb685`, follow-up `d8a7660` + docs commit, fork only, no PR) – v0.5.1 seats the rods on their crankpins, clears the timing drive and sets layout-specific idle floors. Denser gas shows throttle flow and residual charge. Larger overlapping flames light the chambers during normal playback and the ignition tour step.
