// Single Source of Truth for Kässbohrer PistenBully 800 W (1 unit = 1 meter)
// Coordinate System (vehicle-local, inside slopeRoot which tilts around Z by +slopeAngle):
//   +X : Forward / Uphill (toward 12-way snow blade)
//   -X : Rearward / Downhill (toward AlpinFlexFräse & yellow Finisher)
//   +Y : Normal to snow surface (upward; y = 0.00 is nominal groomed snow surface)
//   +Z : Starboard / Right side of vehicle (-Z = Port / Left side)

export const PB_SPECS = Object.freeze({
  identity: {
    name: 'Kässbohrer PistenBully 800 W',
    engineModel: 'MAN D3876 (6-Zyl. Reihe, 15,2 l)',
    ratedPowerKW: 400,
    ratedPowerPS: 540,
    peakTorqueNm: 2500,
    idleRpm: 800,
    ratedRpm: 1650,
    maxRpm: 1850,
    operatingMassKg: 14000,
    gravity: 9.81,
    maxHydraulicPressureBar: 450,
    returnPressureBar: 25,
    maxWinchForceKN: 47.0, // 4.7 t active steep-slope winch
    maxSpeedForwardKmh: 20.0,
    maxSpeedReverseKmh: -10.0,
    vehicleWidthOverTracksM: 4.20,
    bladeTotalWidthM: 5.30,
    finisherTotalWidthM: 6.30,
    finisherFoldedWidthM: 4.30,
    effectiveTrackAreaCm2: 184000 // Kombi-/X-Track bearing area (+ partial implement load share -> ~62-70 g/cm²)
  },

  // Tracked Undercarriage (exact geometric layout for zero-slip tooth meshing)
  tracks: {
    centerZ: 1.28,           // Left at -1.28 m, Right at +1.28 m
    width: 1.64,             // Outer edge at ±2.10 m => exact 4.20 m width; inner edge at ±0.46 m
    grouserHeight: 0.056,    // Aluminum grouser bar + steel ice claws
    beltY: 0.066,            // Bottom belt centerline above snow plane y = 0
    numGrousers: 60,         // Exact count around closed loop
    sprocketTeeth: 13,       // Forged yellow/black rear drive sprocket (Sternrad)
    sprocketCenter: { x: -2.26, y: 0.48 },
    // Pitch radius is refined analytically from loop length so tooth pitch === grouser pitch!
    sprocketNomRadius: 0.395,
    idlerCenter: { x: 2.16, y: 0.56 },
    idlerRadius: 0.345,
    // 5 sprung solid-rubber bogie road wheels resting directly on inner belt surface y = beltY
    roadWheelRadius: 0.334,  // Center y = 0.066 + 0.334 = 0.400 m
    roadWheelX: [-1.52, -0.78, -0.04, 0.70, 1.44],
    // 2 upper return carrier rollers supporting top track run
    carrierRollerRadius: 0.105,
    carrierRollerPos: [
      { x: -0.78, y: 0.79 },
      { x: 0.82, y: 0.80 }
    ]
  },

  // Main Chassis Spine, Engine Deck & Panoramic Cab
  chassis: {
    frameHalfWidth: 0.41,    // Clears inner track edge (±0.46 m) by 50 mm
    frameMinX: -2.36,
    frameMaxX: 2.26,
    frameBottomY: 0.42,
    deckTopY: 1.48,
    // Cab sits forward over front half of chassis
    cabRearX: -0.05,
    cabFrontBaseX: 1.98,
    cabFrontTopX: 1.56,
    cabBottomY: 1.24,
    cabRoofY: 2.74,
    cabHalfWidth: 1.12,
    // Engine bay directly behind cab (visible in Hydraulics X-Ray)
    engineCenter: { x: -1.10, y: 1.02, z: 0.0 },
    splitterCenter: { x: -0.18, y: 0.92, z: 0.0 },
    pumpBankCenter: { x: -0.22, y: 0.76, z: 0.0 },
    // Roof LED worklight bar & beacons
    beaconPos: [
      { x: 1.38, y: 2.86, z: -0.76 },
      { x: 1.38, y: 2.86, z: 0.76 }
    ],
    exhaustTip: { x: -1.58, y: 2.22, z: -0.68 }
  },

  // 12-Way Front Snow Blade (12-Wege-Räumschild) – Exact Joint & Cylinder Anchors
  blade: {
    centerWidth: 3.50,       // Main curved moldboard width
    wingWidth: 0.90,         // Left & right hydraulic Klappohren -> 5.30 m total width
    height: 1.12,
    // Chassis mount pivots
    boomPivot: { x: 2.22, y: 0.64, z: 0.0 },
    boomLength: 1.18,        // Boom pivot to quick-hitch head
    liftCylChassisZ: 0.30,
    liftCylChassis: { x: 1.82, y: 1.16 },   // Twin main lift cylinders on nose frame
    liftCylBoomLocal: { x: 0.68, y: 0.08 }, // Attachment lug on lift boom
    // Quick-hitch head -> Blade carrier offsets
    headToBladePivotX: 0.24,
    angleCylBoomLocal: { x: 0.36, y: 0.02, z: 0.36 },
    angleCylBladeLocal: { x: -0.08, y: -0.04, z: 0.76 },
    tiltCylHeadLocal: { x: 0.04, y: 0.32, z: -0.34 },
    tiltCylBladeLocal: { x: -0.06, y: 0.22, z: 0.34 },
    pitchCylHeadLocal: { x: -0.48, y: 0.48, z: 0.0 },
    pitchCylBladeLocal: { x: 0.06, y: 0.54, z: 0.0 },
    // Wing folding cylinders (in blade-local coordinates)
    wingHingeZ: 1.75,
    wingCylBladeLocal: { x: -0.22, y: 0.08, z: 1.24 },
    wingCylWingLocal: { x: -0.22, y: 0.08, z: 0.34 },
    // Operating range limits
    liftMinM: -0.20,
    liftMaxM: 0.85,
    angleMaxDeg: 24,
    tiltMaxDeg: 12,
    pitchMinDeg: -16,
    pitchMaxDeg: 22,
    wingMinDeg: -35,         // Folded back (transport)
    wingMaxDeg: 45           // Scooped forward (carrying snow)
  },

  // Rear AlpinFlexFräse (AFF) & Elastic Yellow Finisher ("Gelber Teppich")
  tiller: {
    mainWidth: 4.30,
    wingWidth: 1.00,         // Total working width 6.30 m
    hitchPivot: { x: -2.32, y: 0.68, z: 0.0 },
    armLength: 1.06,         // Hitch to cutter shaft center
    liftCylChassis: { x: -1.94, y: 1.22, z: 0.34 },
    liftCylArmLocal: { x: -0.64, y: 0.10, z: 0.34 },
    shaftRadius: 0.145,
    toothRadius: 0.225,
    housingHeight: 0.46,
    finisherLength: 0.96,    // Longitudinal depth of flexible yellow rubber mat
    finisherSegments: 7,     // Flexible articulated strip segments
    ribSpacing: 0.095,       // Exact Corduroy rib spacing (9.5 cm) matched in snow shader!
    maxShaftRpm: 1280
  },

  // 360° Active 4.7-t Steep-Slope Winch (Seilwinde)
  winch: {
    turretPivot: { x: -0.92, y: 1.62, z: 0.0 },
    turretHeight: 0.52,
    boomPivotLocal: { x: 0.22, y: 0.52, z: 0.0 },
    boomLength: 3.15,        // Sweeps over cab roof with front pulley fairlead
    boomElevationDeg: 18,    // Nominal boom pitch above horizontal
    boomCylBaseLocal: { x: -0.34, y: 0.28, z: 0.0 },
    boomCylArmLocal: { x: 1.12, y: -0.04, z: 0.0 },
    anchorPoint: { x: 28.0, y: 0.92, z: 0.0 }, // Uphill anchor pylon in slopeRoot coordinates
    cableSamples: 28
  },

  // Alpine Slope & Snow Environment
  slope: {
    lengthX: 68.0,
    widthZ: 38.0,
    minSlopeDeg: 0,
    maxSlopeDeg: 45,         // 45° = 100 % gradient!
    defaultSlopeDeg: 28,     // Dramatic steep piste right at launch (~53 % gradient)
    corduroyStartX: -4.25,   // Dynamically updated from finisher trailing edge
    snowPatchDensity: 1.0
  },

  // Ground Pressure Reference Comparison (g/cm²)
  groundPressureRef: {
    skierBootGCm2: 250,
    carTireGCm2: 2500
  }
});
