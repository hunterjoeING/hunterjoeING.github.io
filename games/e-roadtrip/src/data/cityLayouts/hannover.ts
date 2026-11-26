import { cityPoint as p, landmark, mappedRoad, points, type MappedCityLayout } from './types';

const herrenhausen = p(287, 263);
const bothfeld = p(1110, 244);
const lahe = p(1450, 244);
const buchholz = p(1680, 261);
const kirchhorst = p(2200, 139);
const hannoverOst = p(2170, 402);
const anderten = p(2170, 719);
const hannoverSued = p(2240, 1570);
const seelhorst = p(1490, 1005);
const messeNord = p(1490, 1160);
const messeSued = p(1500, 1500);
const messeTor = p(1610, 1280);
const parkplatz = p(1720, 1280);

const koenigsworther = p(469, 496);
const raschplatz = p(969, 462);
const berlinerAllee = p(994, 666);
const aegidientor = p(927, 842);
const friedrichswall = p(720, 830);
const bruehlstrasse = p(492, 721);
const kroepcke = p(742, 661);
const hbfVorplatz = p(817, 608);

export const HANNOVER_JUNCTIONS = { herrenhausen, bothfeld, lahe, buchholz, kirchhorst, hannoverOst,
  anderten, hannoverSued, seelhorst, messeNord, messeSued, koenigsworther, raschplatz, aegidientor };
export const HANNOVER_MESSE_LOT = { x: 1660, y: 1237, w: 120, h: 86 };
export const HANNOVER_MESSE_GOAL = parkplatz;

const northCurve = p(1515, 447);
const forestStraight = p(1490, 555);
const southCurve = p(2060, 1550);
export const HANNOVER_ENTRIES = {
  north: { ...p(1605, 345), rot: Math.atan2(northCurve.y - 345, northCurve.x - 1605) + Math.PI / 2 },
  south: { ...p(2180, 1563), rot: Math.atan2(southCurve.y - 1563, southCurve.x - 2180) + Math.PI / 2 }
};
export const HANNOVER_WRONG_EXITS = {
  zentrum: { ...p(1170, 935), label: 'Zentrum / Hbf' },
  b65: { ...p(1860, 1005), label: 'B65 · Südschnellweg' },
  a7: { ...p(2200, 70), label: 'A7 Hamburg' }
};

const cityring = mappedRoad('ring', 78, koenigsworther, p(592, 438), raschplatz, p(994, 528),
  berlinerAllee, p(994, 772), aegidientor, friedrichswall, p(558, 830), bruehlstrasse, p(469, 614), koenigsworther);
const a2 = { ...mappedRoad('motorway', 120, p(85, 264), herrenhausen, p(615, 244), bothfeld, lahe, buchholz,
  p(1930, 310), hannoverOst, p(2335, 402)), fourLane: true };
const a7 = { ...mappedRoad('motorway', 120, HANNOVER_WRONG_EXITS.a7, kirchhorst, hannoverOst, anderten,
  p(2170, 1100), p(2170, 1315), hannoverSued, p(2240, 1670)), fourLane: true };
export const HANNOVER_MESSESCHNELLWEG = {
  ...mappedRoad('motorway', 126, kirchhorst, p(1970, 145), buchholz, HANNOVER_ENTRIES.north, northCurve,
    forestStraight, p(1490, 815), seelhorst, messeNord, messeSued, p(1590, 1570), p(1845, 1570),
    southCurve, HANNOVER_ENTRIES.south, hannoverSued), fourLane: true
};

const northRamp = mappedRoad('ring', 92, messeNord, p(1542, 1219), messeTor);
const southRamp = mappedRoad('ring', 92, messeSued, p(1575, 1450), p(1610, 1380), messeTor);
const gate = mappedRoad('street', 82, messeTor, parkplatz);
const forecourt = p(1040, 900);
const centreExit = mappedRoad('street', 82, seelhorst, p(1290, 1005), HANNOVER_WRONG_EXITS.zentrum,
  forecourt, aegidientor);
const maschsee = { x: 769, y: 1020, w: 151, h: 307 };

export const HANNOVER: MappedCityLayout = {
  id: 'hannover', width: 2440, height: 1740,
  roads: [
    a2, a7, HANNOVER_MESSESCHNELLWEG, cityring, northRamp, southRamp, gate, centreExit,
    { ...mappedRoad('motorway', 106, herrenhausen, p(310, 143), p(387, 100), p(674, 100), p(850, 139),
      p(1720, 139), kirchhorst), fourLane: true },
    mappedRoad('street', 94, seelhorst, HANNOVER_WRONG_EXITS.b65, p(2060, 1005), p(2170, 1100)),
    { ...mappedRoad('street', 78, hbfVorplatz, kroepcke, p(573, 661), bruehlstrasse), cobbled: true },
    mappedRoad('street', 76, hbfVorplatz, p(920, 608), berlinerAllee),
    mappedRoad('street', 76, koenigsworther, p(430, 560), p(350, 676), bruehlstrasse),
    mappedRoad('street', 74, aegidientor, p(959, 1010), p(977, 1365), p(888, 1395)),
    mappedRoad('street', 74, p(977, 1365), p(1190, 1450), p(1360, 1450), messeSued)
  ],
  water: [
    maschsee,
    { x: 700, y: 1030, w: 26, h: 400 }, { x: 669, y: 1025, w: 57, h: 28 },
    { x: 647, y: 939, w: 22, h: 114 }, { x: 621, y: 917, w: 48, h: 22 },
    { x: 598, y: 858, w: 23, h: 81 }, { x: 289, y: 852, w: 331, h: 23 },
    { x: 265, y: 620, w: 24, h: 255 }, { x: 245, y: 430, w: 20, h: 210 }
  ],
  parks: [
    { x: 300, y: 320, w: 175, h: 164 }, { x: 687, y: 925, w: 230, h: 95 },
    { x: 1100, y: 398, w: 535, h: 492 }, { x: 1080, y: 641, w: 163, h: 152 },
    { x: 735, y: 1110, w: 220, h: 280 }
  ],
  plazas: [
    { x: 718, y: 561, w: 186, h: 66 }, { x: 694, y: 624, w: 95, h: 76 },
    HANNOVER_MESSE_LOT, { x: 1805, y: 1102, w: 331, h: 264 },
    { x: 1860, y: 1412, w: 254, h: 93 }
  ],
  landmarks: {
    airport: landmark(495, 174, 'Flughafen Langenhagen', 'airport'),
    herrenhaeuser: landmark(386, 380, 'Herrenhäuser Gärten', 'gardens'),
    hbf: landmark(812, 528, 'Hauptbahnhof', 'station'),
    ernstAugust: { ...landmark(810, 586, 'Ernst-August-Platz', 'statue'), caption: p(725, 584) },
    kroepcke: { ...landmark(744, 660, 'Kröpcke', 'clock'), caption: p(748, 703) },
    steintor: landmark(571, 571, 'Steintor', 'square'),
    marktkirche: landmark(645, 753, 'Marktkirche · Altstadt', 'brickChurch'),
    rathaus: landmark(730, 926, 'Neues Rathaus', 'dome'),
    arena: landmark(601, 1115, 'Heinz-von-Heiden-Arena', 'stadium'),
    hcc: landmark(1187, 651, 'HCC · Stadtpark', 'dome'),
    zoo: landmark(1312, 493, 'Zoo Hannover', 'zoo'),
    messeLaatzen: landmark(1290, 1374, 'Bahnhof Messe/Laatzen', 'station'),
    messe: { ...landmark(1906, 1320, 'Hannover Messe', 'halls'), caption: p(1900, 1386),
      nightGlow: { color: 0xffd492, reflection: p(1752, 1280) } },
    messeHallen: { ...landmark(2055, 1245, 'Messehallen', 'halls'), caption: p(2055, 1302) },
    hermes: { ...landmark(1810, 1240, 'Hermesturm', 'fairTower'), caption: p(1810, 1190) },
    expoDach: landmark(1916, 1160, 'EXPO-Dach', 'expoCanopy'),
    zagArena: landmark(2030, 1446, 'EXPO-Plaza · ZAG Arena', 'stadium')
  },
  signs: HANNOVER_WRONG_EXITS, roundaboutIslands: [],
  captions: [
    { x: 995, y: 195, label: 'A2 Dortmund ↔ Berlin', motorway: true },
    { x: 1576, y: 205, label: 'Lahe · Kreuz Hannover-Buchholz', motorway: true },
    { x: 1000, y: 95, label: 'A352 · Flughafen', motorway: true },
    { x: 2095, y: 199, label: 'A7 / A37 · Kreuz Kirchhorst', motorway: true },
    { x: 2120, y: 467, label: 'Kreuz Hannover-Ost', motorway: true },
    { x: 2089, y: 748, label: 'A7 · Anderten', motorway: true },
    { x: 2058, y: 1635, label: 'A37 · Dreieck Hannover-Süd', motorway: true },
    { x: 1575, y: 636, label: 'A37 / B3 · Messeschnellweg', motorway: true },
    { x: 1450, y: 948, label: 'Seelhorster Kreuz · B65', motorway: true },
    { x: 1576, y: 1121, label: 'Messe-Nord ↘', motorway: true },
    { x: 1500, y: 1582, label: '↖ Messe-Süd', motorway: true },
    { x: 545, y: 465, label: 'Königsworther Platz' },
    { x: 976, y: 374, label: 'Hamburger Allee · Raschplatz' },
    { x: 1016, y: 700, label: 'Berliner Allee' },
    { x: 488, y: 685, label: 'Brühlstraße' },
    { x: 716, y: 858, label: 'Friedrichswall' },
    { x: 940, y: 898, label: 'Aegidientorplatz' },
    { x: 840, y: 985, label: 'Maschpark' },
    { x: 845, y: 1190, label: 'Maschsee' },
    { x: 1286, y: 634, label: 'Eilenriede' },
    { x: 662, y: 986, label: 'Leine' }
  ],
  peds: [
    { tex: 'ped_adult_0', speed: 31, wps: points([1680, 1336], [1770, 1336], [1794, 1301]) },
    { tex: 'ped_child', speed: 33, wps: points([759, 564], [795, 567], [863, 567]) }
  ],
  crosswalks: [
    { id: 'messe-tor', x: 1645, y: 1280, axis: 'ew', width: 82, tex: 'ped_adult_1' },
    { id: 'berliner-allee', x: 994, y: 730, axis: 'ns', width: 78, tex: 'ped_adult_0' }
  ],
  signals: [{ ...berlinerAllee, id: 'berliner-allee', radius: 47 }],
  cones: points([1531, 847], [1531, 874], [1531, 901], [1584, 1408], [1597, 1387]),
  traffic: [
    { tex: 'npc_sedan_blue', speed: 107, path: [p(2220, 139), kirchhorst, p(1970, 145), buchholz, HANNOVER_ENTRIES.north,
      northCurve, forestStraight, p(1490, 815), seelhorst, messeNord, messeSued, p(1590, 1570), p(1845, 1570), southCurve] },
    { tex: 'npc_compact_green', speed: 94, path: cityring.points },
    { tex: 'npc_van_white', speed: 81, path: southRamp.points },
    { tex: 'npc_police', speed: 112, path: a2.points.slice(1, -1).reverse(), police: true },
    { tex: 'cyclist_0', speed: 56, path: centreExit.points.slice(2).reverse(), cyclist: true }
  ]
};
