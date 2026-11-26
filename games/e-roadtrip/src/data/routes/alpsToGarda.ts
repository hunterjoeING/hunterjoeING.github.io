import type { ChargerStation, CityNode, HighwayEdge, LevelRouteLegSpec, PlannedStop, RouteOption, WeatherKind } from '../../types';
import type { GeoCoordinate } from '../europeProjection';

export const ALPS_TO_GARDA_STOPS: ReadonlyArray<Omit<CityNode, 'mapX' | 'mapY'>> = [
  { id: 'inntaldreieck', name: 'Inntaldreieck', country: 'DE', isJunction: true },
  { id: 'kufstein', name: 'Kufstein', country: 'AT' },
  { id: 'brenner', name: 'Brenner', country: 'IT' },
  { id: 'sterzing', name: 'Sterzing', country: 'IT' },
  { id: 'trento', name: 'Trento', country: 'IT' },
  { id: 'affi', name: 'Affi', country: 'IT' },
  { id: 'sirmione', name: 'Sirmione', country: 'IT', isMajor: true },
  { id: 'fernpass', name: 'Fernpass', country: 'AT' },
  { id: 'landeck', name: 'Imst / Landeck', country: 'AT' },
  { id: 'reschenpass', name: 'Reschenpass', country: 'IT' },
  { id: 'meran', name: 'Meran', country: 'IT' },
  { id: 'jaufenpass', name: 'Jaufenpass', country: 'IT' }
];

type Road = Omit<HighwayEdge, 'waypoints'>;
function road(
  fromCityId: string, toCityId: string, highwayName: string, distanceKm: number, speedLimitKmh: number,
  [elevationGainM, elevationLossM]: [number, number], baseTrafficRisk: number, defaultWeather: WeatherKind,
  extra: Partial<Pick<Road, 'tollEur' | 'vignetteRequired' | 'isTunnelOption' | 'isPassOption' | 'roadSections'>> = {}
): Road {
  return {
    id: `edge_${fromCityId}_${toCityId}`, fromCityId, toCityId, highwayName, distanceKm, speedLimitKmh,
    elevationGainM, elevationLossM, baseTrafficRisk, defaultWeather, policeRiskBase: 0.21, tollEur: 0, ...extra
  };
}

export const ALPS_TO_GARDA_EDGES = [
  road('muenchen', 'inntaldreieck', 'A8', 64, 120, [330, 370], 0.52, 'snow'),
  road('inntaldreieck', 'kufstein', 'A93', 29, 120, [110, 130], 0.43, 'snow'),
  road('kufstein', 'innsbruck', 'A12', 77, 110, [280, 170], 0.49, 'snow',
    { vignetteRequired: 'AT Vignette', isTunnelOption: true }),
  road('innsbruck', 'brenner', 'A13', 38, 100, [850, 50], 0.53, 'snow', { tollEur: 12 }),
  road('brenner', 'sterzing', 'A22', 19, 110, [35, 460], 0.43, 'snow', { tollEur: 2 }),
  road('sterzing', 'bozen', 'A22', 64, 110, [100, 785], 0.42, 'clear', { tollEur: 5 }),
  road('bozen', 'trento', 'A22', 59, 130, [180, 245], 0.32, 'clear', { tollEur: 7 }),
  road('trento', 'affi', 'A22', 61, 130, [165, 190], 0.32, 'clear', { tollEur: 6 }),
  road('affi', 'sirmione', 'A22 / A4', 39, 130, [145, 270], 0.39, 'clear', {
    tollEur: 4, roadSections: [{ fromKm: 0, country: 'IT', speedLimitKmh: 130 },
      { fromKm: 33, country: 'IT', speedLimitKmh: 50 }]
  }),
  road('muenchen', 'garmisch', 'A95 / B2', 90, 120, [460, 280], 0.26, 'snow', {
    roadSections: [{ fromKm: 0, country: 'DE', speedLimitKmh: 120 }, { fromKm: 75, country: 'DE', speedLimitKmh: 80 }]
  }),
  road('garmisch', 'fernpass', 'B23 / B187 / B179', 34, 80, [590, 95], 0.28, 'snow', {
    isPassOption: true, roadSections: [{ fromKm: 0, country: 'DE', speedLimitKmh: 80 },
      { fromKm: 15, country: 'AT', speedLimitKmh: 80 }]
  }),
  road('fernpass', 'landeck', 'B179 / B189 / B171', 41, 80, [180, 585], 0.25, 'snow'),
  road('landeck', 'reschenpass', 'B180', 49, 80, [895, 205], 0.22, 'snow', {
    roadSections: [{ fromKm: 0, country: 'AT', speedLimitKmh: 80 },
      { fromKm: 47, country: 'IT', speedLimitKmh: 70 }]
  }),
  road('reschenpass', 'meran', 'SS40 / SS38', 77, 80, [210, 1380], 0.27, 'clear'),
  road('meran', 'bozen', 'SS38 MeBo', 33, 110, [85, 155], 0.27, 'clear'),
  road('sterzing', 'jaufenpass', 'SS44', 18, 60, [1160, 20], 0.18, 'snow', { isPassOption: true }),
  road('jaufenpass', 'meran', 'SS44 Passeiertal', 40, 70, [75, 1840], 0.20, 'snow', {
    roadSections: [{ fromKm: 0, country: 'IT', speedLimitKmh: 60 },
      { fromKm: 19, country: 'IT', speedLimitKmh: 70 }]
  })
] satisfies Road[];

// Ordered valley-road anchors. Distances and signs belong to the edge data above.
export const ALPS_TO_GARDA_BENDS: Readonly<Record<string, readonly GeoCoordinate[]>> = {
  edge_muenchen_inntaldreieck: [[48.071, 11.661], [48.021, 11.722], [47.901, 11.729], [47.818, 11.905], [47.830, 12.003]],
  edge_inntaldreieck_kufstein: [[47.777, 12.116], [47.716, 12.159], [47.642, 12.176], [47.598, 12.163]],
  edge_kufstein_innsbruck: [[47.546, 12.113], [47.489, 12.065], [47.439, 11.948], [47.395, 11.837],
    [47.331, 11.728], [47.282, 11.557], [47.254, 11.423]],
  edge_innsbruck_brenner: [[47.236, 11.399], [47.198, 11.417], [47.129, 11.457], [47.090, 11.473], [47.042, 11.475]],
  edge_brenner_sterzing: [[46.958, 11.475], [46.936, 11.443], [46.918, 11.461]],
  edge_sterzing_bozen: [[46.858, 11.511], [46.798, 11.604], [46.721, 11.653], [46.636, 11.548], [46.571, 11.529],
    [46.490, 11.428], [46.466, 11.356]],
  edge_bozen_trento: [[46.460, 11.326], [46.345, 11.266], [46.236, 11.201], [46.141, 11.095], [46.093, 11.104]],
  edge_trento_affi: [[46.037, 11.101], [45.917, 11.050], [45.842, 11.001], [45.759, 10.950], [45.669, 10.926],
    [45.619, 10.826], [45.588, 10.791]],
  edge_affi_sirmione: [[45.494, 10.808], [45.437, 10.848], [45.407, 10.904], [45.416, 10.750],
    [45.420, 10.691], [45.438, 10.611], [45.460, 10.612], [45.482, 10.609], [45.487, 10.607]],
  edge_muenchen_garmisch: [[48.100, 11.484], [47.936, 11.344], [47.854, 11.333], [47.766, 11.308],
    [47.700, 11.258], [47.606, 11.198], [47.560, 11.124]],
  edge_garmisch_fernpass: [[47.479, 11.036], [47.466, 10.961], [47.456, 10.894], [47.410, 10.857], [47.382, 10.827]],
  edge_fernpass_landeck: [[47.339, 10.836], [47.314, 10.839], [47.290, 10.855], [47.256, 10.763],
    [47.222, 10.744], [47.202, 10.681], [47.157, 10.584]],
  edge_landeck_reschenpass: [[47.097, 10.566], [47.047, 10.666], [46.976, 10.615], [46.900, 10.526],
    [46.891, 10.499], [46.857, 10.499]],
  edge_reschenpass_meran: [[46.825, 10.532], [46.810, 10.544], [46.792, 10.549], [46.783, 10.539], [46.751, 10.534], [46.712, 10.538],
    [46.674, 10.568], [46.620, 10.697], [46.615, 10.786], [46.642, 10.883], [46.654, 11.027], [46.666, 11.114]],
  edge_meran_bozen: [[46.625, 11.163], [46.584, 11.166], [46.543, 11.229], [46.503, 11.255], [46.461, 11.307]],
  edge_sterzing_jaufenpass: [[46.892, 11.400], [46.886, 11.354], [46.873, 11.352], [46.851, 11.333]],
  edge_jaufenpass_meran: [[46.833, 11.311], [46.827, 11.287], [46.819, 11.269], [46.810, 11.246],
    [46.793, 11.231], [46.739, 11.198], [46.691, 11.176]]
};

type Station = Omit<ChargerStation, 'mapX' | 'mapY'>;
function charger(
  id: string, name: string, cityHint: string, edgeId: string, edgeProgress: number, network: Station['network'],
  [stalls, maxKw, baseAdhocEurPerKwh]: [number, number, number],
  extra: Partial<Pick<Station, 'winterQueue' | 'occupancyRisk' | 'hasMcDonalds'>> = {}
): Station {
  return {
    id: `chg_${id}`, name, cityHint, edgeId, edgeProgress, network, stalls, maxKw, baseAdhocEurPerKwh,
    occupancyRisk: 0.17, defectRisk: 0.04, isAcOnly: maxKw <= 22, hasRestroom: maxKw > 22, ...extra
  };
}

export const ALPS_TO_GARDA_CHARGERS: Station[] = [
  charger('irschenberg_enbw', 'EnBW HyperNetz Irschenberg', 'A8 Rosenheim / Inntal', 'edge_muenchen_inntaldreieck', 0.84, 'enbw', [16, 300, 0.72], { hasMcDonalds: true }),
  charger('holzkirchen_tesla', 'Tesla Supercharger Weyarn / Holzkirchen', 'A8 Oberbayern', 'edge_muenchen_inntaldreieck', 0.62, 'tesla', [16, 250, 0.66]),
  charger('kufstein_ionity', 'IONITY Angath / Kufstein', 'A12 Inntal (AT)', 'edge_kufstein_innsbruck', 0.33, 'ionity', [6, 350, 0.79], { winterQueue: true, occupancyRisk: 0.32 }),
  charger('kufstein_ac', 'AC-Ladepunkt Angath / Kufstein', 'A12 Inntal (AT)', 'edge_kufstein_innsbruck', 0.34, 'ac_village', [4, 22, 0.42]),
  charger('innsbruck_tesla', 'Tesla Supercharger Innsbruck', 'Inntal (AT)', 'edge_kufstein_innsbruck', 0.93, 'tesla', [12, 250, 0.64]),
  charger('brennero_ionity', 'IONITY Brenner Outlet', 'Brenner / Brennero', 'edge_brenner_sterzing', 0.05, 'ionity', [6, 350, 0.79]),
  charger('brennero_tesla', 'Tesla Supercharger Brennero', 'Brenner / Brennero', 'edge_brenner_sterzing', 0.07, 'tesla', [5, 150, 0.62]),
  charger('sterzing_neogy', 'Neogy Sterzing', 'Sterzing / Vipiteno', 'edge_brenner_sterzing', 0.93, 'neogy', [2, 100, 0.66]),
  charger('schlern_a22', 'Autobrennero Schlern West', 'A22 Eisacktal', 'edge_sterzing_bozen', 0.81, 'a22', [2, 150, 0.65]),
  charger('bozen_a22', 'Autobrennero Bozen Süd', 'A22 Bozen / Bolzano', 'edge_bozen_trento', 0.06, 'a22', [2, 180, 0.65]),
  charger('paganella_a22', 'Autobrennero Paganella West', 'A22 Lavis', 'edge_bozen_trento', 0.82, 'a22', [2, 150, 0.65]),
  charger('trento_ionity', 'IONITY Trento', 'A22 Trento', 'edge_bozen_trento', 0.93, 'ionity', [6, 350, 0.79]),
  charger('trento_tesla', 'Tesla Supercharger Trento', 'A22 Trento', 'edge_bozen_trento', 0.95, 'tesla', [12, 250, 0.62]),
  charger('affi_ionity', 'IONITY Affi', 'A22 Affi · Lago di Garda Sud', 'edge_trento_affi', 0.98, 'ionity', [18, 350, 0.79]),
  charger('affi_tesla', 'Tesla Supercharger Affi', 'A22 Affi · Lago di Garda Sud', 'edge_affi_sirmione', 0.02, 'tesla', [24, 250, 0.62]),
  charger('affi_electra', 'Electra Grand’Affi', 'A22 Affi · Lago di Garda Sud', 'edge_affi_sirmione', 0.04, 'electra', [8, 300, 0.69]),
  charger('garmisch_enbw', 'EnBW HyperNetz Garmisch-Partenkirchen', 'A95 / B2 Garmisch', 'edge_muenchen_garmisch', 0.97, 'enbw', [4, 150, 0.69]),
  charger('lermoos_ac', 'TIWAG Lermoos Dorf', 'B187 Lermoos / Ehrwald', 'edge_garmisch_fernpass', 0.76, 'ac_village', [2, 22, 0.42]),
  charger('imst_tesla', 'Tesla Supercharger Imst', 'B189 Imst / Landeck', 'edge_fernpass_landeck', 0.58, 'tesla', [12, 250, 0.64]),
  charger('nauders_ac', 'TIWAG Nauders Dorf', 'B180 Nauders / Reschen', 'edge_landeck_reschenpass', 0.88, 'ac_village', [2, 22, 0.42]),
  charger('schlanders_neogy', 'Neogy Schlanders', 'SS38 Vinschgau', 'edge_reschenpass_meran', 0.56, 'neogy', [2, 100, 0.66]),
  charger('meran_neogy', 'Neogy Meran Süd', 'SS38 MeBo', 'edge_meran_bozen', 0.10, 'neogy', [4, 150, 0.66]),
  charger('passeier_ac', 'Neogy St. Leonhard AC', 'SS44 Passeiertal', 'edge_jaufenpass_meran', 0.43, 'neogy', [2, 22, 0.45])
];

const leg = (from: string, to: string, defaultTargetSpeedKmh: number): LevelRouteLegSpec =>
  ({ edgeId: `edge_${from}_${to}`, defaultTargetSpeedKmh });

const inntal = [
  { ...leg('muenchen', 'inntaldreieck', 115), citySegmentAtStart: 'muenchen_start' } as const,
  leg('inntaldreieck', 'kufstein', 110), leg('kufstein', 'innsbruck', 100),
  leg('innsbruck', 'brenner', 95), leg('brenner', 'sterzing', 105)
];
const garda = [
  leg('bozen', 'trento', 115), leg('trento', 'affi', 115),
  { ...leg('affi', 'sirmione', 100), destinationAtEnd: true }
];

function stops(legs: LevelRouteLegSpec[], ...choices: [string, number][]): PlannedStop[] {
  return choices.map(([id, targetSocPct]) => {
    const station = ALPS_TO_GARDA_CHARGERS.find(charger => charger.id === `chg_${id}`)!;
    return { chargerId: station.id, legIndex: legs.findIndex(stage => stage.edgeId === station.edgeId), targetSocPct };
  });
}

const a = [...inntal, leg('sterzing', 'bozen', 105), ...garda];
const b = [
  { ...leg('muenchen', 'garmisch', 100), citySegmentAtStart: 'muenchen_start' } as const,
  leg('garmisch', 'fernpass', 60), leg('fernpass', 'landeck', 60), leg('landeck', 'reschenpass', 60),
  leg('reschenpass', 'meran', 65), leg('meran', 'bozen', 95), ...garda
];
const c = [
  ...inntal, leg('sterzing', 'jaufenpass', 45), leg('jaufenpass', 'meran', 50),
  leg('meran', 'bozen', 95), ...garda
];

export const ALPS_TO_GARDA_ROUTES: RouteOption[] = [
  {
    id: 'l3_route_a_inntal', name: 'Route A · Brenner-Autobahn', shortLabel: 'Brenner-Autobahn',
    highwaySummary: 'A8/A93 → A12/A13 Brenner → A22/A4',
    description: 'Die schnellste Route führt über Kufstein, Innsbruck und den Brenner (1.370 m). Dichter Ski- und Lkw-Verkehr. Vignette und Streckenmaut einplanen.',
    elevationProfile: 'Hügelig', trafficRisk: 'Hoch', chargingDensity: 'Sehr dicht', colorHex: 0x3b82f6,
    legs: a, defaultPlannedStops: stops(a, ['innsbruck_tesla', 80], ['trento_ionity', 63])
  },
  {
    id: 'l3_route_b_fernpass_reschen', name: 'Route B · Fernpass & Reschenpass', shortLabel: 'Fernpass & Reschen',
    highwaySummary: 'A95/B2 → B179/B180 → SS40/SS38 → A22/A4',
    description: 'Über den Fernpass (1.216 m) am Fernsteinsee und den Reschenpass (1.504 m), vorbei am Kirchturm im Reschensee. Maut erst ab der A22.',
    elevationProfile: 'Bergig / Pässe', trafficRisk: 'Niedrig', chargingDensity: 'Ausgewogen', colorHex: 0xf59e0b,
    legs: b, defaultPlannedStops: stops(b, ['imst_tesla', 82], ['trento_ionity', 63])
  },
  {
    id: 'l3_route_c_jaufenpass', name: 'Route C · Jaufenpass', shortLabel: 'Jaufenpass',
    highwaySummary: 'A8/A93 → A12/A13/A22 → SS44 Jaufenpass → A22/A4',
    description: 'Hinter dem Brenner geht es bei Sterzing auf die enge Passstraße. Der Jaufenpass (2.094 m) verlangt in beiden Rampen vorsichtiges Fahren.',
    elevationProfile: 'Bergig / Pässe', trafficRisk: 'Mittel', chargingDensity: 'Ausgewogen', colorHex: 0x10b981,
    legs: c, defaultPlannedStops: stops(c, ['innsbruck_tesla', 76], ['sterzing_neogy', 77], ['trento_ionity', 63])
  }
];
