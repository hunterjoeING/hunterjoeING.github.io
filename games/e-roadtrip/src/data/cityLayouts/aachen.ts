import { landmark, points, type CityPoint, type MappedCityLayout, type MappedCityRoad } from './types';

const point = (x: number, y: number): CityPoint => ({ x, y });
const street = (width: number, line: CityPoint[], cobbled = false): MappedCityRoad =>
  ({ kind: 'street', width, points: line, cobbled });
const motorway = (...line: CityPoint[]): MappedCityRoad => ({ kind: 'motorway', width: 120, points: line });

export const AACHEN_HOME = { x: 1525, y: 1335, w: 106, h: 76 };
export const AACHEN_HOME_POINT = point(AACHEN_HOME.x + AACHEN_HOME.w / 2, AACHEN_HOME.y + AACHEN_HOME.h / 2);
export const AACHEN_INBOUND = { x: 4070, y: 770, rot: -2.02 };

const ponttor = point(1650, 1020);
const pontwall = point(1510, 1135);
const ludwigsallee = point(2060, 895);
const monheimsallee = point(2440, 965);
const hansemannplatz = point(2720, 1240);
const kaiserplatz = point(2790, 1600);
const lagerhausstrasse = point(2455, 2130);
const boxgraben = point(1960, 2130);
const lohergraben = point(1690, 1700);
const westRing = point(1370, 1500);
const westSouth = point(1440, 1930);
const templergraben = point(1760, 1230);
const pontstrasse = point(1740, 1120);
const peterstrasse = point(2450, 1450);
const krefelder = point(2670, 638);
const bahnhof = point(2550, 2270);
const rotheErde = point(3480, 2015);

export const AACHEN_ALLEENRING: MappedCityRoad = {
  kind: 'ring', width: 114, points: [
    ponttor, ludwigsallee, monheimsallee, hansemannplatz, point(2780, 1410), kaiserplatz,
    point(2760, 1825), point(2590, 2075), lagerhausstrasse, point(2270, 2160), point(2140, 2130), boxgraben,
    point(1690, 2080), westSouth, point(1360, 1770), westRing, point(1410, 1280), pontwall, ponttor
  ]
};

export const AACHEN_GRABENRING: MappedCityRoad = {
  kind: 'ring', width: 86, navigationCost: 1.45, points: [
    templergraben, point(1980, 1170), point(2180, 1185), point(2390, 1275), peterstrasse,
    point(2460, 1610), point(2420, 1760), point(2210, 1880), point(1980, 1885),
    point(1830, 1840), lohergraben, point(1660, 1450), point(1730, 1335), templergraben
  ]
};

export const AACHEN_EUROPAPLATZ = point(3390, 1080);
const europaSouthwest = point(3291, 1179);
const europaNortheast = point(3489, 981);
const europaLoop = [
  europaSouthwest, point(3354, 1215), point(3426, 1215), point(3489, 1179), point(3525, 1116),
  point(3525, 1044), europaNortheast, point(3426, 945), point(3354, 945),
  point(3291, 981), point(3255, 1044), point(3255, 1116), europaSouthwest
];
const juelicherStrasse = [hansemannplatz, point(2910, 1240), point(3130, 1240), europaSouthwest];
const adalbertsteinweg = [kaiserplatz, point(3200, 1635), point(3380, 1780), rotheErde];

export const AACHEN_EXITS = {
  europaplatz: { x: 4200, y: 705, label: 'A544 · Kreuz Aachen → A4 Köln' },
  brand: { x: 4170, y: 2670, label: 'Aachen-Brand · A44 Lüttich / Lichtenbusch (B)' },
  laurensberg: { x: 1920, y: 112, label: 'A4 · Aachen-Laurensberg / Heerlen' },
  vetschau: { x: 260, y: 185, label: 'A4 · Vetschau / Heerlen (NL)' },
  vaals: { x: 160, y: 1660, label: 'Vaalser Straße · Vaals (NL)' },
  luettich: { x: 695, y: 2790, label: 'Lütticher Straße · Lüttich (B)' },
  lichtenbusch: { x: 2750, y: 2980, label: 'A44 · Lichtenbusch (B)' }
};

const roermonder = point(1260, 850);
const pontHouses = point(1900, 1345);
const marktWest = point(1990, 1405);
const kraemer = point(2177, 1493);
const elisen = point(2290, 1590);
const trainBranch = point(2500, 2210);

function ringTraffic(start: number, reverse = false): CityPoint[] {
  const ring = AACHEN_ALLEENRING.points.slice(0, -1);
  const circuit = [...ring.slice(start), ...ring.slice(0, start), ring[start]];
  return reverse ? circuit.reverse() : circuit;
}

export const AACHEN = {
  id: 'aachen',
  width: 4320,
  height: 3120,
  roads: [
    AACHEN_ALLEENRING, AACHEN_GRABENRING,
    { kind: 'ring', width: 93, oneWay: true, points: europaLoop },
    street(99, juelicherStrasse),
    street(100, adalbertsteinweg),
    street(102, [rotheErde, point(3670, 2250), point(3850, 2420)]),
    motorway(point(3850, 2420), AACHEN_EXITS.brand),
    motorway(europaNortheast, point(3720, 925), AACHEN_INBOUND, AACHEN_EXITS.europaplatz),
    street(84, [hansemannplatz, point(2790, 1010), krefelder, point(2650, 350)]),
    street(85, [krefelder, point(2260, 490), point(2040, 290), AACHEN_EXITS.laurensberg]),
    street(82, [pontwall, roermonder, point(1040, 635), point(720, 465), AACHEN_EXITS.vetschau]),
    street(80, [roermonder, point(1550, 640), point(1740, 405), AACHEN_EXITS.laurensberg]),
    street(92, [westRing, point(1030, 1570), point(685, 1600), AACHEN_EXITS.vaals]),
    street(89, [westSouth, point(1160, 2190), point(1010, 2450), AACHEN_EXITS.luettich]),
    street(96, [lagerhausstrasse, trainBranch, point(2620, 2510), AACHEN_EXITS.lichtenbusch]),
    street(82, [boxgraben, point(2100, 2300), point(2360, 2350), bahnhof, trainBranch]),
    street(84, [westRing, point(1530, 1550), lohergraben]),
    street(86, [peterstrasse, point(2540, 1375), hansemannplatz]),
    street(66, [ponttor, pontstrasse, templergraben], true),
    street(76, [AACHEN_HOME_POINT, point(1595, 1270), pontstrasse]),
    street(62, [templergraben, pontHouses, marktWest, point(1990, 1493), point(2100, 1493), kraemer], true),
    street(63, [marktWest, point(1990, 1600), point(1920, 1710), lohergraben], true),
    street(62, [peterstrasse, point(2350, 1470), kraemer, point(2220, 1560), elisen, point(2460, 1610)], true),
    street(68, [elisen, point(2180, 1690), point(2060, 1770), point(1980, 1885)], true),
    street(76, [pontwall, point(1260, 1180), point(950, 1150), point(760, 1240)]),
    street(79, [point(760, 1240), point(580, 1520), point(685, 1600)]),
    street(70, [rotheErde, point(3280, 2150), point(3070, 2070), point(2760, 1825)])
  ],
  landmarks: {
    dom: { ...landmark(2100, 1570, 'Aachener Dom', 'cathedral'),
      nightGlow: { color: 0xffcf83, reflection: point(2110, 1493) } },
    katschhof: landmark(2100, 1493, 'Katschhof', 'square'),
    rathaus: landmark(2082, 1405, 'Rathaus · Markt', 'townHall'),
    elisenbrunnen: landmark(2295, 1660, 'Elisenbrunnen', 'colonnade'),
    theater: landmark(2240, 1790, 'Theater Aachen', 'theatre'),
    ponttor: landmark(1668, 948, 'Ponttor', 'gate'),
    superC: landmark(1661, 1301, 'RWTH · SuperC', 'university'),
    rwth: landmark(1532, 1228, 'RWTH Hauptgebäude', 'faculty'),
    quellenhof: { ...landmark(2510, 920, 'Quellenhof', 'hotel'),
      nightGlow: { color: 0xffba6b, reflection: point(2510, 1036) } },
    eurogress: { ...landmark(2630, 879, 'Eurogress', 'congress'),
      nightGlow: { color: 0xc6d9ff, reflection: point(2750, 1025) } },
    marschiertor: landmark(2314, 2220, 'Marschiertor', 'gate'),
    hbf: landmark(2647, 2345, 'Hauptbahnhof', 'station'),
    westbahnhof: landmark(1210, 1108, 'Westbahnhof', 'station'),
    lousberg: landmark(1810, 610, 'Lousberg', 'park'),
    tivoli: landmark(2790, 295, 'Tivoli', 'stadium'),
    melaten: landmark(826, 1080, 'Campus Melaten', 'university'),
    uniklinik: landmark(556, 1431, 'Uniklinik', 'hospital'),
    rotheErde: landmark(3608, 1990, 'Bahnhof Rothe Erde', 'station'),
    printen: landmark(1948, 1499, 'Aachener Printen', 'bakery'),
    pontkneipe: landmark(1858, 1396, 'Pontviertel', 'pub')
  },
  water: [],
  parks: [
    { x: 1530, y: 460, w: 527, h: 377 }, { x: 2240, y: 570, w: 470, h: 323 },
    { x: 1020, y: 1740, w: 290, h: 310 }, { x: 2780, y: 2310, w: 460, h: 440 },
    { x: 650, y: 900, w: 270, h: 225 }
  ],
  plazas: [
    { x: 2020, y: 1362, w: 125, h: 159 }, { x: 2036, y: 1510, w: 170, h: 116 },
    AACHEN_HOME
  ],
  roundaboutIslands: [AACHEN_EUROPAPLATZ],
  signs: AACHEN_EXITS,
  captions: [
    { x: 1855, y: 926, label: 'Alleenring · Ludwigsallee' },
    { x: 2420, y: 1015, label: 'Monheimsallee' },
    { x: 2802, y: 1175, label: 'Hansemannplatz' },
    { x: 2800, y: 1312, label: 'Europaplatz → A544' },
    { x: 3000, y: 1180, label: 'Jülicher Straße' },
    { ...AACHEN_EUROPAPLATZ, y: 1115, label: 'Europaplatz' },
    { x: 2820, y: 1548, label: 'Kaiserplatz' },
    { x: 2888, y: 1662, label: 'Aachen-Brand → A44' },
    { x: 3110, y: 1555, label: 'Adalbertsteinweg' },
    { x: 3725, y: 2215, label: 'Trierer Straße' },
    { x: 2180, y: 1245, label: 'Grabenring' },
    { x: 1820, y: 1295, label: 'Pontstraße · Schrittzone' },
    { x: 1555, y: 1430, label: 'Zuhause · Pontviertel' },
    { x: 2190, y: 1450, label: 'Krämerstraße' },
    { x: 2450, y: 725, label: 'Kurpark · Stadtgarten' },
    { x: 1165, y: 1880, label: 'Westpark' },
    { x: 2755, y: 550, label: 'Krefelder Straße' }
  ],
  signals: [
    { ...hansemannplatz, id: 'hansemannplatz', radius: 61 },
    { ...kaiserplatz, id: 'kaiserplatz', radius: 61 }
  ],
  crosswalks: [
    { id: 'juelicher', x: 2990, y: 1240, axis: 'ew', width: 99, tex: 'ped_adult_1' },
    { id: 'markt', x: 1990, y: 1456, axis: 'ns', width: 62, tex: 'ped_adult_0' },
    { id: 'boxgraben', x: 2020, y: 2130, axis: 'ew', width: 114, tex: 'ped_adult_0' }
  ],
  peds: [
    { tex: 'ped_adult_0', speed: 30, wps: points([2040, 1468], [2150, 1468], [2149, 1502], [2030, 1502]) },
    { tex: 'ped_adult_1', speed: 32, wps: points([2044, 1540], [2030, 1628], [2186, 1628], [2220, 1588]) },
    { tex: 'ped_child', speed: 28, wps: points([1870, 1307], [1926, 1351], [1971, 1377], [1926, 1351]) },
    { tex: 'ped_adult_1', speed: 33, wps: points([1728, 1330], [1776, 1285], [1828, 1338]) }
  ],
  cones: points([2561, 1304], [2578, 1288], [2595, 1272], [3000, 1654], [3023, 1656]),
  traffic: [
    { tex: 'npc_sedan_blue', speed: 98, path: ringTraffic(2) },
    { tex: 'npc_van_white', speed: 87, path: ringTraffic(10, true) },
    { tex: 'npc_compact_green', speed: 93, path: [...juelicherStrasse, ...europaLoop.slice(1, 9)] },
    { tex: 'npc_sedan_blue', speed: 90, path: [point(3850, 2420), point(3670, 2250), ...[...adalbertsteinweg].reverse(),
      point(2780, 1410), ...juelicherStrasse] },
    { tex: 'cyclist_0', speed: 58, cyclist: true, path: [point(2390, 1275), point(2180, 1185),
      point(1980, 1170), templergraben, pontHouses, marktWest] },
    { tex: 'npc_van_white', speed: 78, path: [point(2620, 2510), trainBranch, bahnhof, point(2360, 2350),
      point(2100, 2300)] }
  ]
} satisfies MappedCityLayout;
