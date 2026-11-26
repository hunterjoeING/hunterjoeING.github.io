/** North-up Köln layout, reserved for the still unplayable Level 5 start (Köln → München).
 *  Level 1 no longer uses a Köln city drive: the Aachen–Köln stage continues on the Autobahn at Kreuz Köln-West. */
import { cityPoint as p, landmark, mappedRoad, points, type CityPoint, type CityRect, type MappedCityLayout } from './types';

const kreuzWest = p(387, 976);
const kreuzNord = p(718, 338);
const kreuzSued = p(1110, 1516);
const heumar = p(1950, 1250);
const kreuzOst = p(1935, 668);
const einfahrt = p(110, 990);
const ehrenfeld = p(694, 590);
const guertel = p(770, 756);
const ebertplatz = p(1122, 460);
const rudolfplatz = p(872, 756);
const barbarossaplatz = p(894, 1068);
const chlodwigplatz = p(1142, 1262);
const neumarkt = p(1010, 903);
const deutz = p(1536, 903);
const deutzNord = p(1655, 577);
const severin = p(1167, 1096);
const severinOst = p(1600, 1096);
const rodenkirchen = p(1204, 1450);
const poll = p(1604, 1450);

export const KOELN_JUNCTIONS = { kreuzWest, kreuzNord, kreuzSued, heumar, kreuzOst, rudolfplatz, ebertplatz,
  barbarossaplatz, chlodwigplatz, rodenkirchen, deutz };
export const KOELN_ENTRY = { ...einfahrt, rot: Math.atan2(kreuzWest.y - einfahrt.y, kreuzWest.x - einfahrt.x) + Math.PI / 2 };
export const KOELN_EXITS = {
  a1: { ...p(977, 97), label: 'A1 Dortmund / Leverkusen' },
  a4: { ...p(2245, 1140), label: 'A4 Olpe / Köln-Heumar' },
  a3: { ...p(2082, 1628), label: 'A3 Frankfurt' },
  a57: { ...p(524, 139), label: 'A57 Neuss' },
  zentrum: { ...p(774, 684), label: 'Zentrum' }
};

const motorway = (...line: CityPoint[]) => ({
  ...mappedRoad('motorway', 126, ...line), fourLane: true
});
const a1 = motorway(kreuzWest, p(410, 779), p(483, 641), ehrenfeld, p(727, 510),
  kreuzNord, p(822, 194), KOELN_EXITS.a1);
const a4 = motorway(einfahrt, kreuzWest, p(549, 1160), p(733, 1341), p(919, 1516), kreuzSued, rodenkirchen);
const a4Ost = motorway(poll, p(1740, 1371), heumar, p(2080, 1190), KOELN_EXITS.a4);
const rodenkirchenerBruecke = { ...motorway(rodenkirchen, poll), bridge: 'cable' as const };
const ringe = { ...mappedRoad('ring', 82, ebertplatz, p(987, 479), p(886, 609), rudolfplatz,
  p(847, 929), barbarossaplatz, p(1002, 1200), chlodwigplatz), navigationCost: 2 };
const altstadt = { ...mappedRoad('street', 66, ebertplatz, p(1030, 599), p(1040, 772), neumarkt,
  p(1105, 1000), severin, chlodwigplatz), cobbled: true };
const deutzerBruecke = { ...mappedRoad('street', 74, p(1196, 903), deutz), bridge: 'road' as const, navigationCost: 2 };
const severinsbruecke = { ...mappedRoad('street', 82, severin, severinOst), bridge: 'cable' as const, navigationCost: 2 };
const zooWest = p(1167, 338);
const zooOst = p(1628, 338);
const zoobruecke = { ...mappedRoad('street', 88, zooWest, zooOst), bridge: 'road' as const, navigationCost: 2 };

// Horizontal bands follow the changing riverbanks from north to south.
const banks = [
  [0, 1440, 1578], [210, 1380, 1519], [340, 1312, 1455], [478, 1265, 1420],
  [640, 1249, 1393], [765, 1260, 1403], [911, 1300, 1462], [1090, 1330, 1480],
  [1220, 1318, 1468], [1350, 1288, 1433], [1450, 1310, 1469], [1620, 1385, 1538], [1760, 1450, 1596]
];
export const KOELN_RHEIN: CityRect[] = banks.slice(1).flatMap(([bottom, nextWest, nextEast], index) => {
  const [top, west, east] = banks[index];
  const strips: CityRect[] = [];
  for (let y = top; y < bottom; y += 12) {
    const h = Math.min(12, bottom - y);
    const t = (y + h / 2 - top) / (bottom - top);
    const x = Math.round(west + t * (nextWest - west));
    strips.push({ x, y, w: Math.round(east + t * (nextEast - east)) - x, h });
  }
  return strips;
});

export const KOELN: MappedCityLayout = {
  id: 'koeln', width: 2360, height: 1760,
  roads: [
    a1, a4, a4Ost, rodenkirchenerBruecke, ringe, altstadt, deutzerBruecke, severinsbruecke, zoobruecke,
    motorway(kreuzNord, p(652, 258), KOELN_EXITS.a57),
    motorway(p(1935, 215), kreuzOst, p(1935, 1070), heumar, p(2008, 1440), KOELN_EXITS.a3),
    { ...mappedRoad('street', 82, ehrenfeld, KOELN_EXITS.zentrum, guertel, rudolfplatz), navigationCost: 2 },
    { ...mappedRoad('street', 78, kreuzSued, p(1099, 1372), chlodwigplatz), navigationCost: 2 },
    { ...mappedRoad('street', 80, p(727, 510), p(933, 351), zooWest, ebertplatz), navigationCost: 2 },
    { ...mappedRoad('street', 76, ebertplatz, p(1196, 540), p(1201, 685), p(1215, 798),
      p(1196, 903), neumarkt), navigationCost: 2 },
    { ...mappedRoad('street', 85, zooOst, deutzNord, p(1668, 805), deutz, severinOst), navigationCost: 2 },
    { ...mappedRoad('street', 82, deutzNord, p(1770, 668), kreuzOst), navigationCost: 2 }
  ],
  water: [...KOELN_RHEIN, { x: 629, y: 845, w: 146, h: 85 }],
  parks: [
    { x: 542, y: 776, w: 258, h: 188 }, { x: 1140, y: 145, w: 194, h: 165 },
    { x: 1544, y: 1234, w: 191, h: 124 }, { x: 1265, y: 1190, w: 53, h: 143 }
  ],
  plazas: [
    { x: 1089, y: 682, w: 116, h: 105 }, { x: 1505, y: 507, w: 131, h: 92 },
    { x: 1155, y: 1128, w: 156, h: 98 }, { x: 1125, y: 1223, w: 183, h: 90 }
  ],
  landmarks: {
    dom: { ...landmark(1110, 763, 'Kölner Dom', 'twinSpire'), caption: p(1123, 810),
      nightGlow: { color: 0xffc67f, reflection: p(1040, 772) } },
    hbf: { ...landmark(1126, 619, 'Hauptbahnhof', 'station'), caption: p(1093, 578) },
    hohenzollern: { ...landmark(1334, 704, 'Hohenzollernbrücke', 'railBridge'), caption: p(1341, 752) },
    stMartin: { ...landmark(1255, 845, 'Groß St. Martin', 'romanChurch'), caption: p(1255, 875) },
    schokoladenmuseum: { ...landmark(1273, 1014, 'Schokoladenmuseum', 'brickHall'), caption: p(1237, 1054) },
    kranhaeuser: { ...landmark(1260, 1190, 'Rheinauhafen · Kranhäuser', 'craneHouses'), caption: p(1235, 1242) },
    zoo: landmark(1253, 244, 'Kölner Zoo', 'zoo'),
    triangle: { ...landmark(1471, 826, 'KölnTriangle', 'glassTower'), caption: p(1480, 861),
      nightGlow: { color: 0x9fd7e9, reflection: p(1500, 903) } },
    lanxess: landmark(1756, 980, 'Lanxess Arena', 'archArena'),
    messe: { ...landmark(1530, 529, 'Kölnmesse · Deutz', 'halls'), caption: p(1530, 604) },
    stadion: { ...landmark(554, 847, 'RheinEnergieStadion', 'stadium'), caption: p(551, 904) }
  },
  signs: KOELN_EXITS, roundaboutIslands: [],
  captions: [
    { x: 166, y: 924, label: 'A4 · aus Aachen', motorway: true },
    { x: 385, y: 895, label: 'Kreuz Köln-West', motorway: true },
    { x: 485, y: 1050, label: '↑ A1 Dortmund · A4 Olpe ↘', motorway: true },
    { x: 658, y: 453, label: 'A1 Dortmund / Leverkusen ↗', motorway: true },
    { x: 736, y: 624, label: 'Zentrum · Dom / Ringe ↘', motorway: true },
    { x: 881, y: 403, label: 'Über die Ringe → Dom' },
    { x: 665, y: 293, label: 'Kreuz Köln-Nord', motorway: true },
    { x: 1057, y: 1588, label: 'Kreuz Köln-Süd', motorway: true },
    { x: 1049, y: 1416, label: 'Zentrum · Ringe ↑', motorway: true },
    { x: 1388, y: 1529, label: 'Rodenkirchener Brücke' },
    { x: 1890, y: 1182, label: 'Dreieck Köln-Heumar', motorway: true },
    { x: 1881, y: 606, label: 'A3 · Kreuz Köln-Ost', motorway: true },
    { x: 1080, y: 424, label: 'Ebertplatz' },
    { x: 873, y: 808, label: 'Ringe · Rudolfplatz' },
    { x: 949, y: 1117, label: 'Barbarossaplatz' },
    { x: 1085, y: 1298, label: 'Chlodwigplatz' },
    { x: 983, y: 941, label: 'Neumarkt' },
    { x: 703, y: 884, label: 'Aachener Weiher' },
    { x: 751, y: 809, label: 'Gürtel' },
    { x: 1364, y: 490, label: 'Rhein' },
    { x: 1400, y: 287, label: 'Zoobrücke' },
    { x: 1352, y: 961, label: 'Deutzer Brücke' },
    { x: 1404, y: 1153, label: 'Severinsbrücke' }
  ],
  peds: [
    { tex: 'ped_adult_1', speed: 29, wps: points([1090, 807], [1129, 807], [1182, 802]) },
    { tex: 'ped_adult_0', speed: 27, wps: points([1510, 576], [1571, 576], [1608, 552]) }
  ],
  crosswalks: [
    { id: 'ringe', x: 867, y: 790, axis: 'ns', width: 82, tex: 'ped_adult_0' },
    { id: 'deutz', x: 1500, y: 903, axis: 'ew', width: 74, tex: 'ped_child' }
  ],
  signals: [{ ...rudolfplatz, id: 'rudolfplatz', radius: 49 }],
  cones: points([746, 1386], [774, 1412], [802, 1435], [1033, 955], [1048, 977]),
  traffic: [
    { tex: 'npc_sedan_blue', speed: 110, path: [...a1.points] },
    { tex: 'npc_van_white', speed: 104, path: [...a4.points, ...a4Ost.points].reverse() },
    { tex: 'npc_compact_green', speed: 86, path: ringe.points.slice().reverse() },
    { tex: 'npc_police', speed: 110, path: [zooWest, zooOst, deutzNord, p(1770, 668), kreuzOst], police: true },
    { tex: 'cyclist_0', speed: 53, path: [p(1770, 668), deutzNord, p(1668, 805), deutz], cyclist: true }
  ]
};
