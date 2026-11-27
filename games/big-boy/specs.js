// Union Pacific Big Boy (Class 4000 / #4014) – Single Source of Truth for Specs & Coordinates
// Coordinate system: 1 unit = 1 meter.
//   +X = Forward (towards pilot/smokebox), -X = Rearward (towards firebox/cab/tender)
//   +Y = Up (y = 0 is top of rail head)
//   +Z = Right side (Engineer's side, faces default camera & cutaway plane), -Z = Left side

export const BIG_BOY_SPECS = Object.freeze({
  identity: {
    roadName: 'Union Pacific',
    className: '4000 Class „Big Boy“',
    roadNumber: '4014',
    wheelArrangement: '4-8-8-4',
    uicNotation: "(2'D)D2' h4",
    builder: 'ALCO (Schenectady, NY, 1941)',
    engineWeightTons: 345.6,
    totalWeightTons: 548.0,
    maxTractiveEffortKN: 602.2, // 135,375 lbf
    maxIndicatedPowerKW: 4700,  // ~6,300 PS / ~6,290 hp
    maxIndicatedPowerPS: 6390,
    maxSpeedKmh: 112.7          // 70 mph
  },

  track: {
    gauge: 1.435,
    railCenterHalf: 0.75,
    railHeight: 0.17,
    railHeadWidth: 0.072,
    sleeperWidth: 2.65,
    sleeperHeight: 0.18,
    sleeperDepth: 0.24,
    sleeperSpacing: 0.56,
    ballastTopY: -0.17,
    ballastHeight: 0.34,
    length: 44.0,
    demoCurveRadius: 87.3 // Real UP Big Boy minimum curve radius (20° curve = 286 ft = 87.3 m)
  },

  wheels: {
    driverDiameter: 1.727,        // 68 in
    driverRadius: 0.8635,
    driverTireWidth: 0.142,
    driverFlangeHeight: 0.032,
    driverSpacing: 1.854,         // 4 axles = 5.562 m (18 ft 3 in) per engine unit
    leadingDiameter: 0.914,       // 36 in
    leadingRadius: 0.457,
    leadingSpacing: 1.80,
    trailingDiameter: 1.067,      // 42 in
    trailingRadius: 0.5335,
    trailingSpacing: 1.70
  },

  // Lateral Z stack-up (half-widths from track centerline) – strictly separated to prevent interpenetration
  zPlanes: {
    frameHalf: 0.55,
    frameThick: 0.095,
    wheelCenter: 0.75,
    wheelOuterFace: 0.822,
    wheelHubFace: 0.872,
    couplingRod: 0.955,
    couplingRodThick: 0.044,
    mainRod: 1.060,
    mainRodThick: 0.056,
    cylinderCenter: 1.060,
    steamChestCenter: 1.115,
    eccentricCrankInner: 1.130,
    combinationLever: 1.190,
    expansionLink: 1.215,
    radiusRod: 1.215,
    eccentricRod: 1.255,
    runningBoardOuter: 1.56
  },

  // Longitudinal X layout (world X on straight track)
  layout: {
    // Articulation hinge pin (Drehzapfen) fixed to rear frame / rear cylinder saddle front
    hingeX: -0.70,

    // Rear engine unit (fixed rigidly to main frame & boiler)
    rearEngine: {
      id: 'rear',
      cylinderX: -1.35,
      // Axles ordered front-to-rear (index 0 = 1st, index 2 = 3rd = MAIN driven axle)
      driverXs: [-2.95, -4.804, -6.658, -8.512],
      mainAxleIndex: 2,
      midX: -5.731
    },

    // Front engine unit (articulates around hingeX on curves!)
    // Exact identical relative spacing as rear engine, shifted forward by +8.95 m
    frontEngine: {
      id: 'front',
      cylinderX: 7.60,
      driverXs: [6.00, 4.146, 2.292, 0.438],
      mainAxleIndex: 2,
      midX: 3.219
    },

    // Leading 2-axle truck (pivots on front engine frame)
    leadingTruck: {
      kingpinX: 9.85,
      axleOffsets: [0.90, -0.90] // world straight X: 10.75, 8.95
    },

    // Trailing 2-axle truck (pivots on rear frame under firebox)
    trailingTruck: {
      kingpinX: -11.15,
      axleOffsets: [0.85, -0.85] // world straight X: -10.30, -12.00
    },

    // Boiler, Firebox, Smokebox, Cab & Tender Front (rigid with rear frame)
    boiler: {
      centerY: 3.20,          // Real Big Boy boiler CL = 10 ft 6 in = 3.20 m
      smokeboxFrontX: 9.75,
      smokeboxRearX: 6.00,
      smokeboxRadius: 1.21,   // 95 in OD
      barrelFrontX: 6.00,
      barrelRearX: -5.40,
      barrelFrontRadius: 1.21,
      barrelRearRadius: 1.35, // Conical wagon-top widening to 106.5 in OD
      fireboxFrontX: -5.40,
      fireboxRearX: -10.75,
      fireboxWidth: 2.66,     // Giant 96 in+ grate width
      fireboxGrateY: 1.88,
      fireboxCrownY: 3.92,
      waterLevelY: 3.68,
      steamDomeX: 1.40,
      frontSandDomeX: 4.30,
      rearSandDomeX: -2.50,
      stackRearX: 7.35,       // Rear engine exhaust stack
      stackFrontX: 8.20,      // Front engine exhaust stack
      stackTopY: 4.94,        // Real height = 16 ft 2.5 in = 4.94 m
      headlightX: 9.88,
      headlightY: 3.24,
      cabFrontX: -10.75,
      cabRearX: -13.15,
      cabTopY: 4.78,
      pilotTipX: 12.15,
      tenderFrontX: -13.55,
      tenderStubRearX: -15.65
    }
  },

  // 4 identical simple-expansion high-pressure cylinders (Ø 603 mm × 813 mm stroke)
  cylinder: {
    bore: 0.603,             // 23.75 in
    boreRadius: 0.3015,
    stroke: 0.813,           // 32 in
    crankRadius: 0.4065,     // stroke / 2
    barrelLength: 1.18,      // Outer casting length
    innerLength: 0.94,       // Inner swept + clearance length
    centerY: 0.8635,         // Aligned with driving axle center Y
    pistonThickness: 0.14,
    pistonRodRadius: 0.056,
    steamChestY: 1.48,       // Directly above main cylinder
    valveBore: 0.305,        // 12 in inside-admission piston valve
    valveRadius: 0.1525,
    valveChestLength: 1.12,
    valveSpoolWidth: 0.175,
    valveSpoolCenterHalf: 0.255, // Distance from valve center to each spool center
    portHalfSpacing: 0.295,      // Center X offset of front/rear steam ports from cylinder center
    portWidth: 0.040,            // 1.57 in steam port width
    steamLap: 0.036,             // Inside admission steam lap (m)
    lead: 0.0065,                // Constant 1/4 in lead at dead center (m)
    exhaustLap: 0.0
  },

  // Walschaerts / Heusinger outside valve gear – relative to each engine's main axle (index 2)
  // Using +dx forward from mainAxleX, +dy upward from driverRadius
  valveGear: {
    // Distance from main axle (index 2) to cylinder center = 5.308 m
    mainToCylDx: 5.308,
    // Crosshead mid-stroke X relative to main axle (between 1st driver & cylinder)
    mainRodLength: 3.62,     // Crosshead mid X = mainAxleX + 3.62 (cylinder rear cover at +4.72)
    // Eccentric crank radius from main axle center (90° behind main crank)
    eccentricRadius: 0.200,
    // Expansion link fixed trunnion pivot aligned horizontally with radius-rod pin (steamChestY - combTopA - driverRadius = 0.5385)
    linkPivotDx: 2.38,
    linkPivotDy: 0.5385,
    linkTailLength: 0.45,    // Distance below link pivot to eccentric rod pin (±26° link swing)
    linkSlotHalfSpan: 0.172, // ±0.172 m die-block travel -> 190.5 mm (7.5 in) real Big Boy valve travel
    // Eccentric rod length (exact distance from neutral eccentric pin (0, +r_ecc) to neutral tail (linkPivotDx, linkPivotDy - linkTailLength))
    // Computed cleanly below via helper so neutral link angle is strictly 0!
    // Combination lever (inside admission: valve stem at TOP, radius rod BELOW!)
    combTopA: 0.078,         // Valve stem pin above radius rod pin
    combBottomB: 0.745,      // Union link pin below radius rod pin -> (a/b)*0.4065 = 0.0425 m = lap + lead!
    unionLinkDropDy: -0.22,  // Crosshead drop arm below axle center Y
    radiusRodY: 1.48 - 0.078 // Matches valve stem Y - combTopA
  },

  // Thermodynamic reference parameters (real Big Boy 4000 class)
  thermo: {
    ratedPressureBar: 20.7,  // 300 psi
    saturatedTempC: 216.5,   // Saturation temp at 20.7 bar abs (21.7 bar abs)
    superheatTempC: 395.0,   // Elesco type-E superheater outlet (~743 °F)
    exhaustPressureBar: 1.35,
    exhaustTempC: 115.0,
    ambientPressureBar: 1.013,
    fireboxTempMaxC: 1420.0,
    fireboxTempIdleC: 760.0,
    maxCoalRateTph: 11.0,    // Up to ~11 metric tons/hour via mechanical stoker
    maxSteamRateTph: 48.0,   // ~105,000 lb/h continuous evaporation
    polytropicExp: 1.28,     // Superheated steam expansion exponent
    polytropicComp: 1.25
  }
});

// Exact neutral eccentric rod length so expansion link stands vertically (phi = 0) when eccentric pin is at TDC/BDC
export const ECCENTRIC_ROD_LENGTH = Math.hypot(
  BIG_BOY_SPECS.valveGear.linkPivotDx,
  (BIG_BOY_SPECS.valveGear.linkPivotDy - BIG_BOY_SPECS.valveGear.linkTailLength) - 0
);

// Radius rod length from expansion link pivot to combination lever radius-rod pin (at neutral)
export const RADIUS_ROD_LENGTH =
  (BIG_BOY_SPECS.valveGear.mainToCylDx - 0.88) - BIG_BOY_SPECS.valveGear.linkPivotDx;

// Union link length connecting crosshead drop arm (at mid-stroke) to bottom of combination lever (at neutral)
export const UNION_LINK_LENGTH =
  (BIG_BOY_SPECS.valveGear.mainToCylDx - 0.88) - BIG_BOY_SPECS.valveGear.mainRodLength;

// Steam pipe articulation anchor coordinates (in straight-track coordinates)
export const STEAM_PIPE_ANCHORS = Object.freeze({
  // Rigid rear saddle / boiler dry-pipe manifold just behind hinge pin
  liveRearBall: { x: -0.92, y: 1.85, z: 0.0 },
  // Front engine cylinder saddle live-steam inlet (moves with front engine)
  liveFrontBall: { x: 7.12, y: 1.56, z: 0.0 },
  // Front engine exhaust outlet (moves with front engine)
  exhaustFrontBall: { x: 7.55, y: 1.98, z: 0.0 },
  // Smokebox bottom front blastpipe intake (rigid with boiler)
  exhaustSmokeboxBall: { x: 8.20, y: 2.38, z: 0.0 }
});
