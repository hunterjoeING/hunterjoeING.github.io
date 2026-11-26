import { cityPoint as p, landmark, mappedRoad, points, type MappedCityLayout, type CitySign } from './types';

// North is decreasing screen y. The old town is enlarged and the approach to the sea compressed.
const comedie = p(1175, 565);
const antigone = p(1480, 565);
const gare = p(1150, 800);
const portMarianne = p(1510, 860);
const dugrand = p(1510, 1050);
const centre = { ...p(1175, 130), label: 'Centre-ville / Comédie' };
const sete = { ...p(80, 1190), label: 'Sète / A9 Béziers ←' };
const nimes = { ...p(2940, 440), label: 'Nîmes / A9 →' };
const airport = { ...p(2800, 1170), label: 'Aéroport →' };
const west = { ...p(135, 540), rot: Math.PI / 2 };
const northeast = { ...p(2850, 165), rot: -2.18 };
const saintJean = p(490, 1060);
const montpellierOuest = p(820, 1170);
const montpellierSud = { ...p(1350, 1210), label: 'Montpellier-Sud · D986 Palavas ↓' };
const montpellierEst = { ...p(2310, 460), label: 'Montpellier-Est · Sortie 29' };
const airportJunction = p(2380, 1170);
const lattes = p(1370, 1435);
const lattesSouth = p(1370, 1675);
const palavasWest = p(1660, 1890);
const palavasEast = p(1915, 1890);
const carnon = p(2660, 1730);
const hotelTurn = p(1990, 1890);

export const MONTPELLIER_HOTEL_LABEL = 'Hôtel de la Plage · Palavas-les-Flots';
export const MONTPELLIER_HOTEL_GOAL = p(1990, 1983);
export const MONTPELLIER_HOTEL_BAY = {
  bounds: { x: 1963, y: 1947, w: 54, h: 72 },
  pillar: p(1990, 2017)
};
export const MONTPELLIER_APPROACHES = {
  east: { spawn: northeast, exit: montpellierEst, name: 'Montpellier-Est' },
  west: { spawn: west, exit: montpellierSud, name: 'Montpellier-Sud' }
};
export const MONTPELLIER_JUNCTIONS = {
  saintJean, montpellierOuest, montpellierSud, montpellierEst, airportJunction, lattes, carnon, palavasEast
};
export const MONTPELLIER_WRONG_EXITS = { centre, sete, nimes, airport };

const a750 = mappedRoad('motorway', 112, west, p(315, 540), p(415, 835), saintJean);
const a9East = mappedRoad('motorway', 112, northeast, p(2615, 330), montpellierEst);
const a709 = [
  mappedRoad('motorway', 116, sete, p(310, 1190), saintJean, montpellierOuest, montpellierSud, p(1510, 1210), p(1600, 1210)),
  { ...mappedRoad('motorway', 116, p(1600, 1210), p(1870, 1210)), bridge: 'road' as const },
  mappedRoad('motorway', 116, p(1870, 1210), p(2090, 1070), p(2210, 825), montpellierEst)
].map(road => ({ ...road, navigationCost: 2 }));
const d66 = mappedRoad('ring', 102, montpellierEst, p(2410, 805), p(2380, 990), airportJunction, p(2330, 1340), p(2330, 1475));
const d986North = mappedRoad('ring', 94, montpellierSud, p(1350, 1360), lattes);
const d986South = mappedRoad('ring', 94, lattesSouth, p(1505, 1810), palavasWest);
const lattesInbound = points([1285, 1470], [1250, 1555], [1285, 1640]);
const lattesOutbound = points([1455, 1640], [1490, 1555], [1455, 1470]);
const lattesRing = {
  ...mappedRoad('ring', 76, lattes, ...lattesInbound, lattesSouth, ...lattesOutbound, lattes),
  oneWay: true
};
const perolsNorth = p(2330, 1475);
const perolsEast = p(2450, 1595);
const perolsSouth = p(2330, 1715);
const perolsWest = p(2210, 1595);
const perolsRing = {
  ...mappedRoad('ring', 76, perolsNorth, p(2245, 1510), perolsWest, p(2245, 1680), perolsSouth,
    p(2415, 1680), perolsEast, p(2415, 1510), perolsNorth),
  oneWay: true
};
const d172 = mappedRoad('ring', 94, perolsEast, p(2550, 1625), carnon);
const coastalRoad = mappedRoad('ring', 84, carnon, p(2530, 1830), p(2350, 1890), p(2210, 1890), hotelTurn, palavasEast);
const hotelAccess = mappedRoad('street', 98, hotelTurn, MONTPELLIER_HOTEL_GOAL);
const ecusson = {
  ...mappedRoad('street', 72, centre, p(1175, 340), comedie, p(1175, 695), gare, p(970, 800),
    p(850, 685), p(850, 470), p(940, 340), p(1175, 340)),
  cobbled: true
};

// Contiguous stepped banks keep the Lez connected all the way into the sea.
export const MONTPELLIER_LEZ = [
  { x: 1645, y: 0, w: 65, h: 905 },
  { x: 1680, y: 905, w: 73, h: 560 },
  { x: 1720, y: 1465, w: 82, h: 690 }
];
export const MONTPELLIER_SEA = [
  { x: 0, y: 2155, w: 3040, h: 215 },
  { x: 2415, y: 2020, w: 625, h: 135 },
  { x: 2770, y: 1885, w: 270, h: 135 }
];
export const MONTPELLIER_SAND = [
  { x: 0, y: 2050, w: 1720, h: 105 },
  { x: 1802, y: 2050, w: 613, h: 105 },
  { x: 2415, y: 1938, w: 355, h: 82 },
  { x: 2770, y: 1805, w: 270, h: 80 }
];

export const MONTPELLIER: MappedCityLayout = {
  id: 'montpellier', width: 3040, height: 2370,
  roads: [a750, a9East, ...a709, d66, d986North, lattesRing, d986South, perolsRing, d172, coastalRoad, hotelAccess, ecusson,
    mappedRoad('motorway', 108, montpellierEst, p(2590, 430), nimes),
    mappedRoad('street', 76, airportJunction, airport),
    mappedRoad('street', 82, gare, p(1135, 1050), dugrand, p(1510, 1210)),
    mappedRoad('street', 78, comedie, antigone, portMarianne, dugrand),
    { ...mappedRoad('street', 84, antigone, p(1810, 565)), bridge: 'road' },
    mappedRoad('street', 84, p(1810, 565), p(1980, 605), p(2090, 780), p(2210, 825)),
    mappedRoad('street', 78, p(850, 470), p(649, 470), p(560, 343)),
    { ...mappedRoad('street', 94, palavasWest, palavasEast), bridge: 'road' },
    mappedRoad('street', 76, palavasWest, p(1440, 1935), p(1070, 1987), p(740, 1990)),
    mappedRoad('street', 76, carnon, p(2850, 1710), p(2980, 1665))
  ],
  water: [...MONTPELLIER_LEZ, ...MONTPELLIER_SEA,
    { x: 1813, y: 1480, w: 339, h: 286 }, { x: 1828, y: 1766, w: 265, h: 60 },
    { x: 900, y: 1740, w: 480, h: 162 }, { x: 950, y: 1902, w: 310, h: 37 },
    { x: 2630, y: 1793, w: 126, h: 103 }],
  parks: [
    { x: 585, y: 302, w: 220, h: 100 }, { x: 1218, y: 301, w: 122, h: 185 },
    { x: 660, y: 1250, w: 540, h: 390 }, { x: 2465, y: 1230, w: 310, h: 270 }
  ],
  plazas: [
    { x: 1095, y: 496, w: 198, h: 170 }, { x: 1895, y: 1914, w: 272, h: 130 },
    { x: 1810, y: 2018, w: 595, h: 32 }, { x: 2459, y: 1900, w: 170, h: 38 }
  ],
  landmarks: {
    comedie: { ...landmark(1090, 549, 'Place de la Comédie · Opéra', 'opera'), caption: p(1085, 501) },
    fontaine: { ...landmark(1248, 628, 'Fontaine des Trois Grâces', 'fountain'), caption: p(1248, 662) },
    esplanade: landmark(1282, 398, 'Esplanade Charles-de-Gaulle', 'esplanade'),
    corum: landmark(1315, 254, 'Le Corum', 'corum'),
    polygone: landmark(1328, 659, 'Polygone', 'corum'),
    antigone: landmark(1475, 485, 'Antigone', 'antigone'),
    gare: landmark(1150, 872, 'Gare Saint-Roch', 'station'),
    arc: landmark(790, 379, 'Arc de Triomphe · Porte du Peyrou', 'arch'),
    peyrou: landmark(650, 346, 'Promenade du Peyrou', 'aqueduct'),
    saintPierre: landmark(917, 222, 'Cathédrale Saint-Pierre', 'cathedral'),
    portMarianne: landmark(1575, 790, 'Port Marianne', 'corum'),
    hotelDeVille: landmark(1607, 975, 'Hôtel de Ville', 'cityHall'),
    odysseum: landmark(2025, 690, 'Odysseum', 'corum'),
    lattes: landmark(1165, 1500, 'Lattes', 'villa'),
    airport: landmark(2535, 1080, 'Aéroport Montpellier-Méditerranée', 'airport'),
    arena: landmark(2500, 1265, 'Arena Sud de France', 'arena'),
    perols: landmark(2565, 1495, 'Pérols', 'villa'),
    phare: { ...landmark(1850, 1998, 'Phare de la Méditerranée', 'phare'), caption: p(1860, 2040),
      nightGlow: { color: 0xffd599, reflection: p(1870, 1940) } },
    carnon: { ...landmark(2735, 1740, 'Carnon-Plage · Port', 'villa'), caption: p(2770, 1770) },
    maguelone: landmark(594, 2090, 'Cathédrale de Maguelone', 'cathedral'),
    hotel: { ...landmark(2115, 1980, MONTPELLIER_HOTEL_LABEL, 'hotel'), caption: p(2115, 1935),
      nightGlow: { color: 0xffbc80, reflection: p(2125, 1890) } },
    glace: landmark(2245, 2040, 'Glaces', 'glace')
  },
  signs: { ...MONTPELLIER_WRONG_EXITS, montpellierEst, montpellierSud },
  captions: [
    { x: 990, y: 285, label: 'Écusson' }, { x: 296, y: 477, label: 'A750 · Juvignac / Millau', motorway: true },
    { x: 524, y: 985, label: 'Saint-Jean-de-Védas · A9 / A709', motorway: true },
    { x: 840, y: 1080, label: 'Montpellier-Ouest', motorway: true },
    { x: 2615, y: 242, label: 'A9 · La Languedocienne', motorway: true },
    { x: 1980, y: 545, label: '← Centre-ville', motorway: true },
    { x: 2405, y: 697, label: 'D66 · Carnon / Palavas ↓', motorway: true },
    { x: 1610, y: 1060, label: 'Avenue de la Mer · Raymond Dugrand' },
    { x: 2040, y: 1560, label: 'Étang du Méjean' },
    { x: 1110, y: 1810, label: 'Étang de l’Arnel' },
    { x: 1795, y: 1850, label: 'Lez' },
    { x: 2860, y: 1832, label: 'Grand Travers' },
    { x: 2025, y: 2230, label: 'Méditerranée' }
  ],
  roundaboutIslands: [p(1370, 1555), p(2330, 1595)],
  peds: [
    { tex: 'ped_adult_0', speed: 29, wps: points([1890, 2038], [2075, 2038], [2180, 2038]) },
    { tex: 'ped_adult_1', speed: 28, wps: points([2320, 2016], [2390, 2016], [2490, 1925]) }
  ],
  crosswalks: [
    { id: 'comedie', x: 1175, y: 606, axis: 'ns', width: 72, tex: 'ped_adult_1' },
    { id: 'palavas', x: 2187, y: 1890, axis: 'ew', width: 84, tex: 'ped_adult_0' }
  ],
  signals: [{ ...dugrand, id: 'dugrand', radius: 49 }],
  cones: points([1377, 1302], [1377, 1331], [1377, 1358], [2405, 964], [2405, 994]),
  traffic: [
    { tex: 'npc_sedan_blue', speed: 101, path: [montpellierSud, montpellierOuest, saintJean, p(310, 1190), sete] },
    { tex: 'npc_van_white', speed: 83,
      path: [...d986South.points.slice().reverse(), ...lattesOutbound, ...d986North.points.slice().reverse()] },
    { tex: 'npc_compact_green', speed: 93, path: d66.points },
    { tex: 'npc_fast_red', speed: 79, path: [...d172.points, ...coastalRoad.points.slice(1), palavasWest] },
    { tex: 'cyclist_1', speed: 48, path: coastalRoad.points.slice().reverse(), cyclist: true }
  ]
};
