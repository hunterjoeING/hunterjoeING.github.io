// Single Source of Truth: Dimensions, Coordinates, Track Specs & Engineering Parameters
// 2-Etagen-Funitel-Gondelstation (Vorbild: Galzigbahn St. Anton · Doppelseil-Funitel · 4 Riesenräder · DirectDrive)
// Coordinate System (meters, right-handed):
//   +X : Uphill / Mountain direction (towards Tower 1 & mountain slope)
//   -X : Rear of station (4 Vertical Ferris Wheels & back glass facade)
//   +Y : Elevation above EG Level Walk-In floor (Y = 0.0 m)
//   +Z : Right / Outgoing Funitel track (centerline Z = +3.90 m, twin ropes at +2.95 m & +4.85 m)
//   -Z : Left  / Incoming Funitel track (centerline Z = -3.90 m, twin ropes at -2.95 m & -4.85 m)

export const GS_SPECS = Object.freeze({
  version: '0.2.0',

  // --- Elevation & Architectural Dimensions (meters) ---
  floors: Object.freeze({
    egFloorY: 0.0,            // Ground floor (Level Walk-In, barrier-free)
    ogFloorY: 7.0,            // Upper machinery hall (+7.0 m above EG)
    egRailY: 3.10,            // Cabin hanger/rail pivot height on EG (cabin bottom ~0.16 m above EG floor)
    ogRailY: 10.10,           // Cabin hanger/rail pivot height on OG (exact +7.00 m above EG rail!)
    roofY: 13.65,             // Station roof underside / ridge height
    stationMinX: -8.6,        // Back glass wall
    stationMaxX: 15.2,        // Front portal (mountain side)
    stationHalfZ: 7.10        // Outer glass curtain wall at Z = ±7.10 m (total width 14.2 m for 4 Riesenräder)
  }),

  // --- FOUR Giant Vertical Ferris Wheels (2 Zwillingspaare = 4× Vertikal-Riesenräder!) ---
  wheels: Object.freeze({
    centerX: -3.0,            // Exact tangent transition X for OG & EG rails
    centerY: 6.60,            // Midpoint between egRailY (3.10) and ogRailY (10.10)
    carrierRadius: 3.50,      // Exact half of 7.00 m vertical lift -> 2 * R = 7.00 m!
    outerRimRadius: 4.28,     // Outer structural steel rim Ø 8.56 m
    innerRimRadius: 2.95,
    downRailZ: -3.90,         // Cabin centerline Z on downward twin Ferris wheel pair
    upRailZ: 3.90,            // Cabin centerline Z on upward twin Ferris wheel pair
    // 4 structural wheel disk planes flanking each cabin on BOTH inner & outer sides!
    downInnerWheelZ: -2.62,   // Wheel #1 (Abwärts innen)
    downOuterWheelZ: -5.18,   // Wheel #2 (Abwärts außen)
    upInnerWheelZ: 2.62,      // Wheel #3 (Aufwärts innen)
    upOuterWheelZ: 5.18,      // Wheel #4 (Aufwärts außen)
    totalWheelCount: 4,       // 4 giant vertical Ferris wheels (authentic Galzigbahn Funitel!)
    armCount: 4               // 4 parallel-kept twin carrier forks per wheel pair (90° spacing)
  }),

  // --- Twin Coaxial Horizontal Bullwheels (Doppel-Antriebsscheibe Ø 5.9 m) & DirectDrive ---
  bullwheel: Object.freeze({
    centerX: 4.4,             // Inside OG machinery hall, centered at Z = 0
    centerY: 10.10,           // Lower bullwheel (wraps inner ropes Z = ±2.95 m)
    upperCenterY: 10.68,      // Upper coaxial bullwheel (wraps deflected outer ropes Z = ±4.85 -> ±2.95 m)
    centerZ: 0.0,
    diameter: 5.90,           // Ø 5.9 m Funitel twin bullwheel
    radius: 2.95,             // Exact match to inner rope half-gauge (±2.95 m)
    directDriveRatedPowerKw: 1350, // High-power Funitel DirectDrive (~1,350 kW twin-rope haul)
    directDriveMaxTorqueKNm: 540,  // ~540,000 Nm peak direct-drive synchronous torque
    brakeDiscRadius: 2.55,
    tensionNominalKN: 640,    // Dual-rope hydraulic tension (2 × 320 kN = 640 kN)
    tensionPressureNominalBar: 175,
    tensionStrokeMaxM: 0.65
  }),

  // --- Funitel Twin-Rope Track Layout & Coupling Stations (meters) ---
  track: Object.freeze({
    stationRailZ: 3.90,       // Track & cabin centerline at Z = ±3.90 m (straight Funitel alignment!)
    funitelRopeHalfGauge: 0.95, // Half distance between the 2 parallel ropes of one Funitel track (1.90 m gauge!)
    innerRopeZ: 2.95,         // 3.90 - 0.95 -> inner parallel rope of each track
    outerRopeZ: 4.85,         // 3.90 + 0.95 -> outer parallel rope of each track
    ropeDiameterM: 0.054,     // Ø 54 mm braided steel haul ropes (4 parallel strands on the line!)

    // EG Level Walk-In loop
    egTurnCenterX: 1.05,      // Straight from X = -3.0 to +1.05 (4.05 m), then 180° U-turn R = 3.90 m
    egTurnRadius: 3.90,       // Apex at X = +4.95 m

    // OG Deceleration & Acceleration zones (X = -3.0 .. +10.5 -> 13.5 m each, dual-side tire conveyors!)
    conveyorInnerX: -3.0,
    conveyorOuterX: 10.5,
    tireRadius: 0.24,         // Rubber friction tire radius (Ø 480 mm)
    tireCountPerSide: 20,     // 20 tire pairs along each 13.5 m conveyor (dual-rail Funitel drive!)

    // Dual Coupling Ramps (Ein- & Auskuppelstelle on BOTH parallel ropes) & Check Zone (Prüfstrecke)
    rampStartX: 10.70,
    rampCenterX: 11.50,
    rampEndX: 12.30,
    checkStartX: 12.80,
    checkCenterX: 13.45,
    checkEndX: 14.10,
    portalDeflectorX: 15.00,

    // First Funitel Line Tower (Stütze 1) with 4×12 = 48 Sheaves & Mountain Line
    tower1X: 36.0,
    tower1GroundY: 5.4,
    tower1SheaveY: 15.65,
    tower1RollersPerRope: 12, // 12-roller rocking sheave battery under EACH of the 4 parallel ropes (48 total!)
    mountainTopY: 26.8,
    catenarySagM: 0.62
  }),

  // --- 24er Galzigbahn Funitel Panorama Cabin & 4× Spring Grips (2×2 Doppelklemme) ---
  cabin: Object.freeze({
    count: 10,                // 10 simultaneously circulating 24er Funitel panorama cabins
    capacityPersons: 24,      // Authentic Galzigbahn 24-passenger Funitel cabin!
    gripsPerCabin: 4,         // 4 spring grips per cabin (2 per parallel rope -> 4 × 28 kN = 112 kN!)
    bodyWidthZ: 1.88,         // Wide wind-stable Funitel body (±0.94 m -> 0.34 m clear of both Ferris wheels!)
    bodyLengthX: 2.34,        // Along-track length
    bodyHeightY: 2.12,        // Cabin body height
    pivotToRoofY: 0.82,       // Grip pivot (Y=0) to cabin roof (-0.82 m)
    pivotToFloorY: 2.94,      // Grip pivot to cabin floor (-2.94 m -> 0.16 m above EG floor!)
    gripNominalForceKN: 28.0, // Per individual spring grip (4 × 28 kN = 112 kN total clamping force!)
    gripMinSafeKN: 24.0,      // Lower tolerance per grip at Prüfstrecke
    gripMaxSafeKN: 32.0,      // Upper tolerance per grip
    gripFaultForceKN: 11.4    // Simulated weak-clamp fault on one grip
  }),

  // --- Kinematics & Speed Profile ---
  speeds: Object.freeze({
    nominalRopeMs: 6.0,       // 6.0 m/s (21.6 km/h) nominal line speed
    maxRopeMs: 7.0,           // Slider maximum
    slowStationMs: 0.30,      // 0.30 m/s Level Walk-In & 4× Ferris wheels speed
    maxDecelMs2: 1.35         // Comfortable D-Line / Funitel tire conveyor accel/decel
  })
});

export const ZONE_META = Object.freeze({
  rope_in:     { label: 'Doppelseil · Talfahrt (6,0 m/s)', color: '#10b981', speedClass: 'fast' },
  detach:      { label: 'Doppel-Auskuppelstelle (4 Klemmen)', color: '#ef4444', speedClass: 'fast' },
  decel:       { label: 'Verzögerungs-Reifenförderer',     color: '#f59e0b', speedClass: 'trans' },
  wheel_down:  { label: 'Abwärts-Riesenrad-Paar (OG → EG)', color: '#38bdf8', speedClass: 'slow' },
  eg_disembark:{ label: 'EG Ausstieg (0,30 m/s)',          color: '#38bdf8', speedClass: 'slow' },
  eg_turn:     { label: 'EG Level Walk-In Bogen',          color: '#0ea5e9', speedClass: 'slow' },
  eg_board:    { label: 'EG Einstieg · Türen zu',          color: '#38bdf8', speedClass: 'slow' },
  wheel_up:    { label: 'Aufwärts-Riesenrad-Paar (EG → OG)', color: '#38bdf8', speedClass: 'slow' },
  accel:       { label: 'Beschleunigungs-Reifenförderer',  color: '#f59e0b', speedClass: 'trans' },
  attach:      { label: 'Doppel-Einkuppelstelle (4× 28 kN)', color: '#ef4444', speedClass: 'fast' },
  check:       { label: 'Doppel-Prüfstrecke (4 Klemmen)',  color: '#22c55e', speedClass: 'fast' },
  rope_out:    { label: 'Doppelseil · Stütze 1 (6,0 m/s)', color: '#10b981', speedClass: 'fast' }
});
