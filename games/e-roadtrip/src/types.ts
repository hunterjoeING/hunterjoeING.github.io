export type BatteryChemistry = 'NMC' | 'LFP';

export type VehicleShape = 'hatchback' | 'sedan_aero' | 'suv' | 'touring' | 'sport';

export interface ChargingCurvePoint {
  soc: number; // 0..100
  kw: number;  // Charging power in kW
}

export interface VehicleSpec {
  id: string;
  name: string;
  brand: string;
  year: number;
  chemistry: BatteryChemistry;
  batteryKwh: number;
  /** Base consumption in kWh/100km at 100 km/h, 20°C, flat terrain */
  baseConsumption100: number;
  /** Aerodynamic drag factor affecting consumption above 100 km/h */
  aeroFactor: number;
  /** Extra consumption factor per °C below 15°C or rain/snow */
  weatherSensitivity: number;
  /** Charging curve sorted ascending by SoC */
  chargingCurve: ChargingCurvePoint[];
  maxSpeedKmh: number;
  towingCapacityKg: number;
  comfortRating: number; // 1..10
  priceEur: number;
  depreciationRate: number; // e.g. 0.10 = 10% per level/trip resale loss
  shape: VehicleShape;
  primaryColor: number;
  accentColor: number;
  isTesla?: boolean;
  winterTiresIncluded?: boolean;
  unlockLevel: number;
  tagline: string;
}

export type ChargerNetwork =
  | 'tesla'
  | 'enbw'
  | 'ewego'
  | 'electra'
  | 'ionity'
  | 'ac_village'
  | 'fastned'
  | 'totalenergies'
  | 'ac_dorfladen';

export interface SubscriptionSpec {
  id: string;
  name: string;
  provider: ChargerNetwork | 'adhoc';
  monthlyFeeEur: number;
  tripShareFeeEur: number; // Proportional cost accounted in trip scoring
  pricePerKwhOwn: number;
  pricePerKwhRoaming: number;
  bestFor: string;
  /** Special bonus (e.g., McDonald's stress relief, Tesla native seamlessness) */
  specialPerk?: 'tesla_native' | 'mcdonalds_comfort' | 'fast_hubs' | 'ac_rural';
  teslaFreeIncluded?: boolean;
  description: string;
}

export type LandmarkKind =
  | 'aachen_dom'
  | 'koeln_dom'
  | 'hermesturm'
  | 'fernsehturm'
  | 'eiffel'
  | 'alps'
  | 'ferry'
  | 'nordkapp'
  | 'highlands'
  | 'colosseum'
  | 'frankfurt_skyline'
  | 'hamburger_michel'
  | 'munich_frauenkirche'
  | 'atomium'
  | 'windmills_nl'
  | 'big_ben';

export type CountryCode =
  | 'DE'
  | 'NL'
  | 'BE'
  | 'FR'
  | 'CH'
  | 'AT'
  | 'IT'
  | 'DK'
  | 'NO'
  | 'SE'
  | 'LU'
  | 'UK';

export interface CityNode {
  id: string;
  name: string;
  country: CountryCode;
  mapX: number; // 0..1800 normalized Europe pixel map coords
  mapY: number; // 0..1420
  landmark?: LandmarkKind;
  isMajor?: boolean;
  isJunction?: boolean;
  hasLocalSegment?: boolean;
}

export type WeatherKind = 'clear' | 'rain' | 'storm' | 'snow' | 'fog';

export interface HighwayEdge {
  id: string;
  fromCityId: string;
  toCityId: string;
  highwayName: string; // e.g. "A4 / A1 / A2"
  distanceKm: number;
  speedLimitKmh: number; // 0 = German Autobahn unlimited (Richtgeschwindigkeit 130)
  /** French autoroute rain/storm cap (110). Absent on German edges. */
  speedLimitRainKmh?: number;
  elevationGainM: number;
  elevationLossM: number;
  baseTrafficRisk: number; // 0..1
  policeRiskBase: number;  // 0..1
  tollEur: number;
  vignetteRequired?: string;
  isTunnelOption?: boolean;
  isPassOption?: boolean;
  waypoints: Array<{ x: number; y: number }>;
  defaultWeather: WeatherKind;
}

export interface ChargerStation {
  id: string;
  name: string;
  cityHint: string;
  edgeId: string;
  /** Position along the edge (0.0 .. 1.0) */
  edgeProgress: number;
  mapX: number;
  mapY: number;
  network: ChargerNetwork;
  stalls: number;
  maxKw: number;
  baseAdhocEurPerKwh: number;
  occupancyRisk: number; // 0..1 chance stalls are busy
  defectRisk: number;    // 0..1 chance a stall is broken
  hasMcDonalds?: boolean;
  hasRestroom?: boolean;
  trailerFriendly?: boolean; // Drive-through bays without uncoupling
  isAcOnly?: boolean;
}

export interface ScoringWeights {
  time: number;       // default 0.30
  cost: number;       // default 0.25
  stress: number;     // default 0.20
  efficiency: number; // default 0.15
  decisions: number;  // default 0.10
}

export interface PassengerGroup {
  label: string;
  hasWife: boolean;
  childrenCount: number;
  hasDog: boolean;
  initialStress: number; // 0..100
  stressSensitivity: number; // multiplier
}

export interface EventChoice {
  id: string;
  label: string;
  hint: string;
  timeDeltaMin: number;
  socDeltaPct: number;
  costDeltaEur: number;
  stressDelta: number;
  decisionPoints: number;
  resultText: string;
  /** Optional: automatically insert an emergency charger stop */
  insertNearestCharger?: boolean;
  /** Optional: change target speed on current leg */
  adjustSpeedKmh?: number;
  /** Optional: trigger fine risk roll */
  fineRisk?: { probability: number; amountEur: number; label: string };
  /** Flat lodging bill (hotel). Separate from charging and fines. */
  lodgingDeltaEur?: number;
  /** Cash loss that is not a kWh charge (theft, deductible). */
  fineDeltaEur?: number;
  /** Absolute SoC after the choice, e.g. overnight AC to a high morning value. */
  setSocPct?: number;
  /** Optional second event. Rolled after the player continues. */
  followUpEventId?: string;
  followUpChance?: number;
}

export interface GameEventDef {
  id: string;
  title: string;
  category: 'accident' | 'traffic' | 'border' | 'toll' | 'charger' | 'family' | 'police' | 'ferry';
  icon: string;
  description: string;
  /** Optional trigger hints */
  requiresTrailer?: boolean;
  requiresSpeeding?: boolean;
  requiresFamily?: boolean;
  choices: EventChoice[];
}

export interface WifeDialogueChoice {
  id: string;
  text: string;
  tone: 'calming' | 'confident' | 'defensive' | 'risky';
  stressDelta: number;
  decisionPoints: number;
  replyText: string;
}

export interface WifeDialogueDef {
  id: string;
  speaker: string;
  quote: string;
  contextHint: string;
  suggestedQuickStopMinutes: number;
  choices: WifeDialogueChoice[];
}

export interface LevelRouteLegSpec {
  edgeId: string;
  reverse?: boolean;
  defaultTargetSpeedKmh: number;
  weatherOverride?: WeatherKind;
  isNightLeg?: boolean;
  /** Local city drive segment mode at start or end of leg */
  citySegmentAtStart?: CityDrivePreset;
  citySegmentAtEnd?: CityDrivePreset;
  /** Family overnight at the end of this leg. The player picks the stay on arrival. */
  overnightAtEnd?: boolean;
  /** Outbound destination reached (turnaround before the return legs). */
  destinationAtEnd?: boolean;
}

export type CityDrivePreset =
  | 'aachen_start'
  | 'charger_park'
  | 'hannover_messe'
  | 'aachen_finish'
  | 'ferry_denmark'
  | 'koeln_ring';

export type ElevationProfileKind = 'Flachland' | 'Hügelig' | 'Bergig / Pässe';
export type TrafficRiskKind = 'Niedrig' | 'Mittel' | 'Hoch';
export type ChargingDensityKind = 'Sehr dicht' | 'Ausgewogen' | 'Dünn / Anspruchsvoll';

export interface RouteOption {
  id: string;
  name: string;
  shortLabel: string;
  highwaySummary: string;
  description: string;
  elevationProfile: ElevationProfileKind;
  trafficRisk: TrafficRiskKind;
  chargingDensity: ChargingDensityKind;
  colorHex: number;
  legs: LevelRouteLegSpec[];
  defaultPlannedStops?: PlannedStop[];
}

export interface LevelConfig {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  badge: string;
  playable: boolean;
  regionLabel: string;
  startBudgetEur: number;
  rewardBaseEur: number;
  departureTimeHour: number; // e.g. 7.0 = 07:00
  targetArrivalMinutes: number; // total trip target duration in minutes
  startCityId: string;
  destinationCityId: string;
  defaultRouteId: string;
  routeOptions: RouteOption[];
  routeLegs: LevelRouteLegSpec[];
  passengers: PassengerGroup;
  scoringWeights: ScoringWeights;
  allowedVehicleIds?: string[];
  trailerWeightKg?: number;
  requiresWinterTires?: boolean;
  ferryDeadlineMinutes?: number;
  /** €/km baseline for the cost score. Level 1 keeps the default 0.082. */
  costBenchmarkEurPerKm?: number;
  specialRulesSummary: string[];
  briefingText: string;
  eventPoolIds: string[];
  wifeDialogueIds: string[];
}

export interface PlannedStop {
  chargerId: string;
  legIndex: number;
  targetSocPct: number; // e.g. 80
}

export interface LegPlan {
  legIndex: number;
  targetSpeedKmh: number;
  usePassInsteadOfTunnel?: boolean;
  buyVignette?: boolean;
}

export interface TripPlan {
  vehicleId: string;
  /** Outbound corridor. */
  selectedRouteId: string;
  /** Return corridor. Empty when the level has no return legs. Independent of the outbound choice. */
  returnRouteId: string;
  subscriptionIds: string[];
  legPlans: LegPlan[];
  plannedStops: PlannedStop[];
  nightDrivingMode?: boolean;
  behindTruckMode?: boolean;
}

export interface LiveSocPrediction {
  nextStopName: string;
  nextStopKind: 'charger' | 'turnaround' | 'destination';
  distanceToNextKm: number;
  predictedArrivalNextSocPct: number;
  predictedFinalSocPct: number;
  isCriticalNext: boolean;
  isCriticalFinal: boolean;
  consumptionKwh100: number;
}

export interface IncidentLogEntry {
  timeStr: string;
  title: string;
  detail: string;
  impact: 'positive' | 'neutral' | 'negative';
}

export interface RunState {
  levelId: string;
  plan: TripPlan;
  currentLegIndex: number;
  legProgressKm: number;
  socPct: number; // 0..100
  elapsedMinutes: number;
  stress: number; // 0..100
  peakStress: number;
  bladderNeed: number; // 0..100
  energyUsedKwh: number;
  distanceDrivenKm: number;
  chargingCostEur: number;
  subscriptionCostEur: number;
  tollsAndFinesEur: number;
  /** Hotels and other stays. 0 when the night was free. */
  lodgingCostEur: number;
  /** Shown on the trip summary after the overnight choice. */
  overnightNote?: string;
  decisionScoreAccum: number;
  replanCount: number;
  goodReplanCount: number;
  chargingEfficiencyBonus: number;
  collisionsCount: number;
  completedStopIds: string[];
  skippedStopIds: string[];
  triggeredEventIds: string[];
  wifeDialogueTriggered: boolean;
  incidentLog: IncidentLogEntry[];
  activeWeather: WeatherKind;
  currentSpeedKmh: number;
  /** Temporary limit (Baustelle or French rain). Chosen cruise stays on the leg plan. */
  speedCapKmh?: number;
  /** HUD label for speedCapKmh, e.g. Baustelle or Regen. */
  speedCapLabel?: string;
  isNight: boolean;
  /** Used to avoid repeating same-leg charger stop */
  activeCityChargerId?: string;
}

export interface EvaluationResult {
  totalScore: number; // 0..1000
  subScores: {
    time: number;       // 0..100
    cost: number;       // 0..100
    stress: number;     // 0..100
    efficiency: number; // 0..100
    decisions: number;  // 0..100
  };
  weights: ScoringWeights;
  totalMinutes: number;
  targetMinutes: number;
  totalCostEur: number;
  avgConsumptionKwh100: number;
  peakStress: number;
  prizeMoneyEur: number;
  cleanArrival: boolean;
  gradeLabel: string;
}

export interface CampaignSave {
  cashEur: number;
  ownedVehicleId: string | null;
  unlockedLevelOrder: number;
  completedLevels: Record<string, { bestScore: number; bestMinutes: number }>;
}

export type BreakActivityKind = 'eat' | 'toilet' | 'dog' | 'children' | 'shopping';

export type PoliceViolationKind = 'red_light' | 'zebra_crossing';

export interface CollisionInfo {
  kind: 'car' | 'pedestrian' | 'cyclist' | 'obstacle';
  playerAtFault: boolean;
  reason: string;
}

export type ProviderFilterMap = Record<ChargerNetwork, boolean>;

