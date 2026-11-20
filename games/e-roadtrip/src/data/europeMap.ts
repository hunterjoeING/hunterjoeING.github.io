import { CityNode, HighwayEdge, ChargerStation } from '../types';

export const CITIES: CityNode[] = [
  { id: 'aachen', name: 'Aachen', country: 'DE', mapX: 356, mapY: 422, landmark: 'aachen_dom', isMajor: true, hasLocalSegment: true },
  { id: 'koeln', name: 'Köln', country: 'DE', mapX: 392, mapY: 414, landmark: 'koeln_dom', isMajor: true },
  { id: 'kamen', name: 'Kamener Kreuz', country: 'DE', mapX: 432, mapY: 374 },
  { id: 'bielefeld', name: 'Bielefeld', country: 'DE', mapX: 470, mapY: 354 },
  { id: 'hannover', name: 'Hannover Messe', country: 'DE', mapX: 520, mapY: 344, landmark: 'hermesturm', isMajor: true, hasLocalSegment: true },

  // Wider stylized Europe context cities for map richness & future curated levels
  { id: 'amsterdam', name: 'Amsterdam', country: 'NL', mapX: 332, mapY: 344, isMajor: true },
  { id: 'paris', name: 'Paris', country: 'FR', mapX: 256, mapY: 486, landmark: 'eiffel', isMajor: true },
  { id: 'berlin', name: 'Berlin', country: 'DE', mapX: 616, mapY: 344, landmark: 'fernsehturm', isMajor: true },
  { id: 'muenchen', name: 'München', country: 'DE', mapX: 548, mapY: 492, isMajor: true },
  { id: 'innsbruck', name: 'Alpen / Brenner', country: 'AT', mapX: 548, mapY: 548, landmark: 'alps', isMajor: true },
  { id: 'rom', name: 'Italien / Rom', country: 'IT', mapX: 558, mapY: 676, landmark: 'colosseum', isMajor: true },
  { id: 'edinburgh', name: 'Highlands', country: 'UK', mapX: 210, mapY: 202, landmark: 'highlands', isMajor: true },
  { id: 'hirtshals', name: 'Hirtshals Fähre', country: 'DK', mapX: 504, mapY: 196, landmark: 'ferry', isMajor: true },
  { id: 'nordkapp', name: 'Nordkapp', country: 'NO', mapX: 660, mapY: 68, landmark: 'nordkapp', isMajor: true }
];

export const HIGHWAY_EDGES: HighwayEdge[] = [
  {
    id: 'edge_aachen_koeln',
    fromCityId: 'aachen',
    toCityId: 'koeln',
    highwayName: 'A4',
    distanceKm: 72,
    speedLimitKmh: 0, // Autobahn mixed 130 / open
    elevationGainM: 120,
    elevationLossM: 255,
    baseTrafficRisk: 0.22,
    policeRiskBase: 0.14,
    tollEur: 0,
    waypoints: [
      { x: 356, y: 422 },
      { x: 374, y: 418 },
      { x: 392, y: 414 }
    ],
    defaultWeather: 'clear'
  },
  {
    id: 'edge_koeln_kamen',
    fromCityId: 'koeln',
    toCityId: 'kamen',
    highwayName: 'A1',
    distanceKm: 98,
    speedLimitKmh: 130,
    elevationGainM: 340,
    elevationLossM: 310,
    baseTrafficRisk: 0.45,
    policeRiskBase: 0.25,
    tollEur: 0,
    waypoints: [
      { x: 392, y: 414 },
      { x: 408, y: 394 },
      { x: 432, y: 374 }
    ],
    defaultWeather: 'clear'
  },
  {
    id: 'edge_kamen_bielefeld',
    fromCityId: 'kamen',
    toCityId: 'bielefeld',
    highwayName: 'A2',
    distanceKm: 86,
    speedLimitKmh: 0,
    elevationGainM: 280,
    elevationLossM: 220,
    baseTrafficRisk: 0.36,
    policeRiskBase: 0.22,
    tollEur: 0,
    waypoints: [
      { x: 432, y: 374 },
      { x: 452, y: 363 },
      { x: 470, y: 354 }
    ],
    defaultWeather: 'clear'
  },
  {
    id: 'edge_bielefeld_hannover',
    fromCityId: 'bielefeld',
    toCityId: 'hannover',
    highwayName: 'A2 / A37',
    distanceKm: 102,
    speedLimitKmh: 0,
    elevationGainM: 290,
    elevationLossM: 345,
    baseTrafficRisk: 0.30,
    policeRiskBase: 0.20,
    tollEur: 0,
    waypoints: [
      { x: 470, y: 354 },
      { x: 496, y: 348 },
      { x: 520, y: 344 }
    ],
    defaultWeather: 'clear'
  },

  // Context European Autobahn network lines (stylized visual network + future level edges)
  {
    id: 'edge_aachen_amsterdam',
    fromCityId: 'aachen',
    toCityId: 'amsterdam',
    highwayName: 'A76 / A2 (NL)',
    distanceKm: 225,
    speedLimitKmh: 100,
    elevationGainM: 80,
    elevationLossM: 240,
    baseTrafficRisk: 0.28,
    policeRiskBase: 0.45,
    tollEur: 0,
    waypoints: [{ x: 356, y: 422 }, { x: 342, y: 382 }, { x: 332, y: 344 }],
    defaultWeather: 'rain'
  },
  {
    id: 'edge_aachen_paris',
    fromCityId: 'aachen',
    toCityId: 'paris',
    highwayName: 'E42 / A1 (FR)',
    distanceKm: 420,
    speedLimitKmh: 130,
    elevationGainM: 420,
    elevationLossM: 540,
    baseTrafficRisk: 0.32,
    policeRiskBase: 0.35,
    tollEur: 34.5,
    waypoints: [{ x: 356, y: 422 }, { x: 304, y: 452 }, { x: 256, y: 486 }],
    defaultWeather: 'clear'
  },
  {
    id: 'edge_hannover_berlin',
    fromCityId: 'hannover',
    toCityId: 'berlin',
    highwayName: 'A2',
    distanceKm: 285,
    speedLimitKmh: 0,
    elevationGainM: 240,
    elevationLossM: 260,
    baseTrafficRisk: 0.25,
    policeRiskBase: 0.2,
    tollEur: 0,
    waypoints: [{ x: 520, y: 344 }, { x: 572, y: 344 }, { x: 616, y: 344 }],
    defaultWeather: 'clear'
  },
  {
    id: 'edge_koeln_muenchen',
    fromCityId: 'koeln',
    toCityId: 'muenchen',
    highwayName: 'A3 / A9',
    distanceKm: 570,
    speedLimitKmh: 0,
    elevationGainM: 1450,
    elevationLossM: 980,
    baseTrafficRisk: 0.4,
    policeRiskBase: 0.25,
    tollEur: 0,
    waypoints: [{ x: 392, y: 414 }, { x: 472, y: 454 }, { x: 548, y: 492 }],
    defaultWeather: 'clear'
  },
  {
    id: 'edge_muenchen_innsbruck',
    fromCityId: 'muenchen',
    toCityId: 'innsbruck',
    highwayName: 'A8 / A12',
    distanceKm: 165,
    speedLimitKmh: 100,
    elevationGainM: 1120,
    elevationLossM: 420,
    baseTrafficRisk: 0.48,
    policeRiskBase: 0.4,
    tollEur: 12,
    vignetteRequired: 'AT Vignette (11,50 €)',
    isTunnelOption: true,
    isPassOption: true,
    waypoints: [{ x: 548, y: 492 }, { x: 550, y: 520 }, { x: 548, y: 548 }],
    defaultWeather: 'snow'
  },
  {
    id: 'edge_innsbruck_rom',
    fromCityId: 'innsbruck',
    toCityId: 'rom',
    highwayName: 'A22 / A1 (IT)',
    distanceKm: 720,
    speedLimitKmh: 130,
    elevationGainM: 950,
    elevationLossM: 1520,
    baseTrafficRisk: 0.38,
    policeRiskBase: 0.42,
    tollEur: 58,
    waypoints: [{ x: 548, y: 548 }, { x: 554, y: 610 }, { x: 558, y: 676 }],
    defaultWeather: 'clear'
  },
  {
    id: 'edge_hannover_hirtshals',
    fromCityId: 'hannover',
    toCityId: 'hirtshals',
    highwayName: 'A7 / E45 (DK)',
    distanceKm: 645,
    speedLimitKmh: 130,
    elevationGainM: 310,
    elevationLossM: 350,
    baseTrafficRisk: 0.32,
    policeRiskBase: 0.35,
    tollEur: 0,
    waypoints: [{ x: 520, y: 344 }, { x: 506, y: 268 }, { x: 504, y: 196 }],
    defaultWeather: 'rain'
  },
  {
    id: 'edge_hirtshals_nordkapp',
    fromCityId: 'hirtshals',
    toCityId: 'nordkapp',
    highwayName: 'Fähre + E6 (NO)',
    distanceKm: 2050,
    speedLimitKmh: 80,
    elevationGainM: 4200,
    elevationLossM: 4180,
    baseTrafficRisk: 0.25,
    policeRiskBase: 0.5,
    tollEur: 145,
    waypoints: [{ x: 504, y: 196 }, { x: 562, y: 142 }, { x: 660, y: 68 }],
    defaultWeather: 'snow'
  },
  {
    id: 'edge_amsterdam_highlands',
    fromCityId: 'amsterdam',
    toCityId: 'edinburgh',
    highwayName: 'Eurotunnel / A9 (UK)',
    distanceKm: 820,
    speedLimitKmh: 112,
    elevationGainM: 1300,
    elevationLossM: 1200,
    baseTrafficRisk: 0.22,
    policeRiskBase: 0.28,
    tollEur: 95,
    waypoints: [{ x: 332, y: 344 }, { x: 264, y: 274 }, { x: 210, y: 202 }],
    defaultWeather: 'fog'
  }
];

export const CHARGERS: ChargerStation[] = [
  {
    id: 'chg_frechen_ewego',
    name: 'McDonald’s Frechen · EWE Go',
    cityHint: 'A4 / Kreuz Köln-West',
    edgeId: 'edge_aachen_koeln',
    edgeProgress: 0.82,
    mapX: 386,
    mapY: 415,
    network: 'ewego',
    stalls: 4,
    maxKw: 150,
    baseAdhocEurPerKwh: 0.69,
    occupancyRisk: 0.22,
    defectRisk: 0.08,
    hasMcDonalds: true,
    hasRestroom: true,
    trailerFriendly: false
  },
  {
    id: 'chg_kamen_enbw',
    name: 'EnBW Ladepark Kamener Kreuz',
    cityHint: 'A1 / A2 Kamener Kreuz',
    edgeId: 'edge_koeln_kamen',
    edgeProgress: 0.92,
    mapX: 428,
    mapY: 377,
    network: 'enbw',
    stalls: 24,
    maxKw: 400,
    baseAdhocEurPerKwh: 0.72,
    occupancyRisk: 0.12,
    defectRisk: 0.04,
    hasRestroom: true,
    trailerFriendly: true
  },
  {
    id: 'chg_remscheid_ionity',
    name: 'IONITY Remscheid / Wuppertal',
    cityHint: 'A1 Bergisches Land',
    edgeId: 'edge_koeln_kamen',
    edgeProgress: 0.48,
    mapX: 409,
    mapY: 394,
    network: 'ionity',
    stalls: 6,
    maxKw: 350,
    baseAdhocEurPerKwh: 0.75,
    occupancyRisk: 0.28,
    defectRisk: 0.10,
    hasRestroom: true,
    trailerFriendly: false
  },
  {
    id: 'chg_kamen_tesla',
    name: 'Tesla Supercharger Kamen V4',
    cityHint: 'A2 Ausfahrt Kamen/Bergkamen',
    edgeId: 'edge_kamen_bielefeld',
    edgeProgress: 0.15,
    mapX: 438,
    mapY: 370,
    network: 'tesla',
    stalls: 20,
    maxKw: 250,
    baseAdhocEurPerKwh: 0.66,
    occupancyRisk: 0.08,
    defectRisk: 0.02,
    hasMcDonalds: true,
    hasRestroom: true,
    trailerFriendly: true
  },
  {
    id: 'chg_rheda_electra',
    name: 'Electra+ Hub Gütersloh / Rheda',
    cityHint: 'A2 Ostwestfalen',
    edgeId: 'edge_kamen_bielefeld',
    edgeProgress: 0.78,
    mapX: 462,
    mapY: 358,
    network: 'electra',
    stalls: 8,
    maxKw: 300,
    baseAdhocEurPerKwh: 0.69,
    occupancyRisk: 0.15,
    defectRisk: 0.05,
    hasRestroom: true,
    trailerFriendly: false
  },
  {
    id: 'chg_bad_oeynhausen_ewego',
    name: 'McDonald’s Bad Oeynhausen · EWE Go',
    cityHint: 'A2 / Weserbergland',
    edgeId: 'edge_bielefeld_hannover',
    edgeProgress: 0.35,
    mapX: 488,
    mapY: 350,
    network: 'ewego',
    stalls: 6,
    maxKw: 300,
    baseAdhocEurPerKwh: 0.69,
    occupancyRisk: 0.18,
    defectRisk: 0.07,
    hasMcDonalds: true,
    hasRestroom: true,
    trailerFriendly: false
  },
  {
    id: 'chg_lauenau_tesla',
    name: 'Tesla Supercharger Lauenau',
    cityHint: 'A2 vor Hannover',
    edgeId: 'edge_bielefeld_hannover',
    edgeProgress: 0.68,
    mapX: 504,
    mapY: 346,
    network: 'tesla',
    stalls: 16,
    maxKw: 250,
    baseAdhocEurPerKwh: 0.66,
    occupancyRisk: 0.10,
    defectRisk: 0.03,
    hasRestroom: true,
    trailerFriendly: true
  },
  {
    id: 'chg_hannover_enbw',
    name: 'EnBW & Electra Messe-Hub Laatzen',
    cityHint: 'Hannover Messe Süd',
    edgeId: 'edge_bielefeld_hannover',
    edgeProgress: 0.94,
    mapX: 517,
    mapY: 344,
    network: 'enbw',
    stalls: 12,
    maxKw: 300,
    baseAdhocEurPerKwh: 0.72,
    occupancyRisk: 0.16,
    defectRisk: 0.05,
    hasRestroom: true,
    trailerFriendly: true
  }
];

export function getCityById(id: string): CityNode {
  return CITIES.find(c => c.id === id) || CITIES[0];
}

export function getEdgeById(id: string): HighwayEdge {
  return HIGHWAY_EDGES.find(e => e.id === id) || HIGHWAY_EDGES[0];
}

export function getChargerById(id: string): ChargerStation | undefined {
  return CHARGERS.find(c => c.id === id);
}

export function getChargersForEdge(edgeId: string): ChargerStation[] {
  return CHARGERS.filter(c => c.edgeId === edgeId);
}
