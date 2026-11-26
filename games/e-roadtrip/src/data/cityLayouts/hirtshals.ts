import { cityPoint as p, landmark, mappedRoad, points, type MappedCityLayout } from './types';

const syd = p(1630, 1463);
const rute55 = p(1630, 1196);
const rundkoersel = p(1480, 920);
const terminalvej = p(1460, 673);
const kaj = p(1470, 441);
const checkIn = { ...p(1595, 385), label: 'Færge · Check-in' };
const station = p(1035, 687);
const centrum = p(754, 743);
const fyrVej = p(464, 944);

export const HIRTSHALS_ENTRY = { ...syd, rot: 0 };
export const HIRTSHALS_CHECK_IN = checkIn;

const e39 = mappedRoad('ring', 100, syd, rute55, p(1550, 1055), rundkoersel, p(1460, 802), terminalvej, kaj);
const ferryRoad = mappedRoad('street', 88, kaj, p(1520, 385), checkIn);
const townRoad = mappedRoad('street', 82, terminalvej, p(1232, 673), station, p(880, 743), centrum,
  p(622, 801), fyrVej, p(287, 977));
const harbourRoad = mappedRoad('street', 80, centrum, p(860, 566), p(1031, 548), p(1232, 550), p(1232, 673));
const oceanariumRoad = mappedRoad('street', 82, rundkoersel, p(1760, 920), p(1960, 1020));

export const HIRTSHALS: MappedCityLayout = {
  id: 'hirtshals', width: 2140, height: 1560,
  roads: [e39, ferryRoad, townRoad, harbourRoad, oceanariumRoad,
    mappedRoad('street', 72, station, p(1080, 875), p(1280, 920), rundkoersel),
    mappedRoad('street', 76, fyrVej, p(540, 1100), p(1010, 1220), p(1300, 1196), rute55)],
  water: [
    { x: 0, y: 0, w: 2140, h: 222 },
    { x: 0, y: 222, w: 845, h: 26 }, { x: 0, y: 248, w: 649, h: 101 },
    { x: 0, y: 349, w: 521, h: 96 }, { x: 0, y: 445, w: 391, h: 108 },
    { x: 0, y: 553, w: 304, h: 72 }, { x: 0, y: 625, w: 196, h: 68 }, { x: 0, y: 693, w: 101, h: 128 },
    { x: 876, y: 222, w: 305, h: 250 }, { x: 1264, y: 222, w: 173, h: 143 },
    { x: 1710, y: 222, w: 430, h: 131 }, { x: 1850, y: 353, w: 290, h: 88 }
  ],
  parks: [
    { x: 214, y: 711, w: 276, h: 190 }, { x: 257, y: 1017, w: 350, h: 271 },
    { x: 780, y: 1017, w: 338, h: 165 }, { x: 1685, y: 1070, w: 330, h: 242 }
  ],
  plazas: [
    { x: 825, y: 470, w: 411, h: 73 }, { x: 1437, y: 261, w: 278, h: 204 },
    { x: 1450, y: 353, w: 243, h: 109 }, { x: 753, y: 660, w: 120, h: 77 }
  ],
  landmarks: {
    fyr: { ...landmark(332, 873, 'Hirtshals Fyr', 'lighthouse'), caption: p(325, 915) },
    station: landmark(1041, 619, 'Hirtshals Station', 'station'),
    terminal: { ...landmark(1540, 303, 'Færgeterminal · Norge', 'ferryTerminal'), caption: p(1556, 264),
      nightGlow: { color: 0xffd599, reflection: p(1520, 385) } },
    ferry: landmark(1311, 282, 'Color Line · Fjord Line', 'ferryBoat'),
    oceanarium: landmark(1871, 852, 'Nordsøen Oceanarium', 'oceanarium')
  },
  signs: { checkIn },
  captions: [
    { x: 610, y: 141, label: 'Skagerrak · Nordsee' },
    { x: 942, y: 442, label: 'Hirtshals Havn' },
    { x: 844, y: 694, label: 'Bymidte · Zentrum' },
    { x: 1483, y: 562, label: 'Færge / Norge ↑', motorway: true },
    { x: 1385, y: 976, label: 'E39 · Rute 55' },
    { x: 1544, y: 1512, label: 'Aus Hjørring / Aalborg', motorway: true }
  ],
  roundaboutIslands: [],
  peds: [
    { tex: 'ped_adult_0', speed: 30, wps: points([971, 512], [1096, 512], [1181, 512]) },
    { tex: 'ped_adult_1', speed: 28, wps: points([1494, 480], [1580, 483], [1642, 450]) }
  ],
  crosswalks: [
    { id: 'station', x: 1115, y: 682, axis: 'ew', width: 82, tex: 'ped_adult_1' },
    { id: 'terminal', x: 1460, y: 590, axis: 'ns', width: 100, tex: 'ped_adult_0' }
  ],
  signals: [{ ...terminalvej, id: 'terminalvej', radius: 51 }],
  cones: points([1427, 761], [1427, 730], [1427, 699]),
  traffic: [
    { tex: 'npc_sedan_blue', speed: 97, path: e39.points.slice().reverse() },
    { tex: 'npc_van_white', speed: 83, path: townRoad.points },
    { tex: 'npc_compact_green', speed: 90, path: oceanariumRoad.points },
    { tex: 'npc_police', speed: 107, path: [fyrVej, p(540, 1100), p(1010, 1220), p(1300, 1196), rute55], police: true },
    { tex: 'cyclist_1', speed: 53, path: harbourRoad.points, cyclist: true }
  ]
};
