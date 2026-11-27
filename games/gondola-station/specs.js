// Single Source of Truth: Dimensions, Coordinates, Track Specs & Engineering Parameters
// 2-Etagen-Gondelstation (Galzigbahn-Riesenrad-Konzept & D-Line / DirectDrive / AURO)
// Coordinate System (meters, right-handed):
//   +X : Uphill / Mountain direction (towards Tower 1 & mountain slope)
//   -X : Rear of station (Ferris wheels & back facade)
//   +Y : Elevation above EG Level Walk-In floor (Y = 0.0 m)
//   +Z : Right / Outgoing side (Uphill rope at Z = +2.80 m, Upward Ferris wheel at Z = +3.90 m)
//   -Z : Left  / Incoming side (Downhill rope at Z = -2.80 m, Downward Ferris wheel at Z = -3.90 m)

export const GS_SPECS = Object.freeze({
  version: '0.1.0',

  // --- Elevation & Architectural Dimensions (meters) ---
  floors: Object.freeze({
    egFloorY: 0.0,            // Ground floor (Level Walk-In, barrier-free)
    ogFloorY: 7.0,            // Upper machinery hall (+7.0 m above EG)
    egRailY: 3.10,            // Cabin carriage rail height on EG (cabin bottom ~0.15 m above EG floor)
    ogRailY: 10.10,           // Cabin carriage rail height on OG (exact +7.00 m above EG rail!)
    roofY: 13.45,             // Station roof underside / ridge height
    stationMinX: -8.6,        // Back glass wall
    stationMaxX: 15.2,        // Front portal (mountain side)
    stationHalfZ: 6.55        // Outer glass curtain wall at Z = ±6.55 m (total width 13.1 m)
  }),

  // --- Two Giant Vertical Ferris Wheels (Vertikal-Riesenräder) ---
  wheels: Object.freeze({
    centerX: -3.0,            // Exact tangent transition X for OG & EG rails
    centerY: 6.60,            // Midpoint between egRailY (3.10) and ogRailY (10.10)
    carrierRadius: 3.50,      // Exact half of 7.00 m vertical lift -> 2 * R = 7.00 m!
    outerRimRadius: 4.28,     // Outer structural steel rim Ø 8.56 m
    innerRimRadius: 2.95,
    downRailZ: -3.90,         // Cabin carriage Z plane on downward wheel
    upRailZ: 3.90,            // Cabin carriage Z plane on upward wheel
    downWheelPlaneZ: -5.18,   // Structural wheel disk outboard of cabin (0.45 m clearance)
    upWheelPlaneZ: 5.18,      // Structural wheel disk outboard of cabin
    armCount: 4               // 4 parallel-kept carrier arms per wheel (90° spacing)
  }),

  // --- Horizontal Bullwheel (Antriebs-/Umlenkscheibe) & DirectDrive ---
  bullwheel: Object.freeze({
    centerX: 4.4,             // Inside OG machinery hall, centered at Z = 0
    centerY: 10.10,           // Exact rope elevation in OG
    centerZ: 0.0,
    diameter: 5.60,           // Ø 5.6 m
    radius: 2.80,             // Half of rope gauge (5.60 m)
    directDriveRatedPowerKw: 900,
    directDriveMaxTorqueKNm: 400, // 400,000 Nm peak direct-drive synchronous torque
    brakeDiscRadius: 2.42,
    tensionNominalKN: 420,    // Nominal hydraulic rope tension (420 kN)
    tensionPressureNominalBar: 165,
    tensionStrokeMaxM: 0.65
  }),

  // --- Track Layout & Coupling Stations (meters) ---
  track: Object.freeze({
    ropeHalfGaugeZ: 2.80,     // Haul rope at Z = ±2.80 m
    stationRailZ: 3.90,       // Outboard rail clearing Bullwheel & DirectDrive
    ropeDiameterM: 0.054,     // Ø 54 mm braided steel haul rope (6x36 WS)

    // EG Level Walk-In loop
    egTurnCenterX: 1.05,      // Straight from X = -3.0 to +1.05 (4.05 m), then 180° U-turn R = 3.90 m (apex X=+4.95 m)
    egTurnRadius: 3.90,       // Apex at X = +4.95 m

    // OG Deceleration & Acceleration zones (X = -3.0 .. +10.5 -> 13.5 m each)
    conveyorInnerX: -3.0,     // Tangent point with Ferris wheel top
    conveyorOuterX: 10.5,     // End of tire conveyor / start of coupling zone
    sCurveStartX: 5.2,        // Smooth lateral S-curve between |Z|=3.90 and |Z|=2.80
    sCurveEndX: 10.2,
    tireRadius: 0.24,         // Rubber friction tire radius (Ø 480 mm)
    tireCountPerSide: 20,     // 20 tires along each 13.5 m conveyor

    // Coupling ramps (Ein- & Auskuppelstelle) & Check Zone (Prüfstrecke)
    rampStartX: 10.70,
    rampCenterX: 11.50,
    rampEndX: 12.30,
    checkStartX: 12.80,
    checkCenterX: 13.45,
    checkEndX: 14.10,
    portalDeflectorX: 15.00,

    // First Line Tower (Stütze 1) & Mountain Line
    tower1X: 36.0,
    tower1GroundY: 5.4,
    tower1SheaveY: 15.65,
    tower1RollersPerSide: 12, // 12-roller rocking sheave battery
    mountainTopY: 26.8,
    catenarySagM: 0.62        // Realistic static catenary sag between portal and Tower 1
  }),

  // --- Cabin & D-Line Spring Grip (Federklemme) Geometry ---
  cabin: Object.freeze({
    count: 10,                // 10 simultaneously circulating 10er panorama cabins
    capacityPersons: 10,
    bodyWidthZ: 1.64,         // Z width (±0.82 m around rail -> 0.46 m clear of wheel plane)
    bodyLengthX: 2.26,        // Along-track length
    bodyHeightY: 2.12,        // Cabin body height
    pivotToRoofY: 0.82,       // Vertical distance from grip pivot (Y=0) to cabin roof (-0.82 m)
    pivotToFloorY: 2.94,      // Grip pivot to cabin floor (-2.94 m -> 0.16 m above EG floor!)
    gripNominalForceKN: 28.0, // Belleville disc spring clamping force (28 kN fail-safe)
    gripMinSafeKN: 24.0,      // Lower tolerance of PrüfstrecKe
    gripMaxSafeKN: 32.0,      // Upper tolerance
    gripFaultForceKN: 11.4    // Simulated weak-clamp / mis-seated rope fault force
  }),

  // --- Kinematics & Speed Profile ---
  speeds: Object.freeze({
    nominalRopeMs: 6.0,       // 6.0 m/s (21.6 km/h) nominal line speed
    maxRopeMs: 7.0,           // Slider maximum
    slowStationMs: 0.30,      // 0.30 m/s Level Walk-In & Ferris wheel speed
    maxDecelMs2: 1.35         // Comfortable D-Line tire conveyor accel/decel
  })
});

export const ZONE_META = Object.freeze({
  rope_in:     { label: 'Strecke · Talfahrt (6,0 m/s)', color: '#10b981', speedClass: 'fast' },
  detach:      { label: 'Auskuppelstelle (Rampe)',      color: '#ef4444', speedClass: 'fast' },
  decel:       { label: 'Verzögerungs-Reifenförderer',  color: '#f59e0b', speedClass: 'trans' },
  wheel_down:  { label: 'Abwärts-Riesenrad (OG → EG)',  color: '#38bdf8', speedClass: 'slow' },
  eg_disembark:{ label: 'EG Ausstieg (0,30 m/s)',       color: '#38bdf8', speedClass: 'slow' },
  eg_turn:     { label: 'EG Level Walk-In Bogen',       color: '#0ea5e9', speedClass: 'slow' },
  eg_board:    { label: 'EG Einstieg · Türen zu',       color: '#38bdf8', speedClass: 'slow' },
  wheel_up:    { label: 'Aufwärts-Riesenrad (EG → OG)', color: '#38bdf8', speedClass: 'slow' },
  accel:       { label: 'Beschleunigungs-Reifenförderer', color: '#f59e0b', speedClass: 'trans' },
  attach:      { label: 'Einkuppelstelle („Einhängen“)', color: '#ef4444', speedClass: 'fast' },
  check:       { label: 'Klemmkraft-Prüfstrecke',       color: '#22c55e', speedClass: 'fast' },
  rope_out:    { label: 'Ausfahrt · Stütze 1 (6,0 m/s)', color: '#10b981', speedClass: 'fast' }
});
