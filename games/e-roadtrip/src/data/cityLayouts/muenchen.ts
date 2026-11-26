import { landmark, points, road, type WinterCityLayout } from './types';

export const MARIENPLATZ_SPAWN = { x: 1080, y: 900, rot: Math.PI / 2 };

export const MUENCHEN = {
  id: 'muenchen',
  width: 2400,
  height: 1760,
  roads: [
    // Altstadtring, Mittlerer Ring (B2R), and the open A99 bypass.
    road('ring', [790, 680], [1350, 680], [1350, 1120], [790, 1120], [790, 680]),
    road('ring', [480, 425], [1820, 425], [1820, 1340], [480, 1340], [480, 425]),
    road('motorway', [240, 1170], [240, 240], [2120, 240], [2120, 1190]),
    // Autobahn branches, clockwise from the A9.
    road('motorway', [1200, 425], [1200, 80]),
    road('motorway', [1730, 240], [1730, 85]),
    road('motorway', [1820, 760], [2300, 760]),
    road('motorway', [1740, 1340], [1740, 1570], [2220, 1570]),
    road('motorway', [1200, 1340], [1200, 1650]),
    road('motorway', [675, 1340], [675, 1590], [200, 1590]),
    road('motorway', [480, 965], [110, 965]),
    road('motorway', [240, 240], [240, 105]),
    // Surface roads and the Isar bridges.
    road('street', [480, 900], [1820, 900]),
    road('street', [1080, 680], [1080, 1340]),
    road('street', [790, 425], [790, 680]),
    road('street', [1350, 425], [1350, 680]),
    road('street', [1350, 1050], [1660, 1050], [1660, 900]),
    road('street', [790, 1120], [790, 1340]),
    road('street', [1350, 1120], [1350, 1340]),
    road('street', [240, 580], [480, 580]),
    road('street', [1820, 1100], [2120, 1100])
  ],
  water: [
    { x: 1470, y: 0, w: 115, h: 600 }, { x: 1450, y: 600, w: 135, h: 590 },
    { x: 1450, y: 1190, w: 120, h: 570 }
  ],
  islands: [{ x: 1497, y: 962, w: 60, h: 152 }],
  parks: [
    { x: 855, y: 286, w: 240, h: 85 }, { x: 1374, y: 488, w: 90, h: 346 },
    { x: 552, y: 1015, w: 166, h: 244 }
  ],
  landmarks: {
    marienplatz: landmark(1151, 824, 'Marienplatz · Neues Rathaus', 'rathaus'),
    frauenkirche: landmark(980, 799, 'Frauenkirche', 'frauenkirche'),
    stachus: landmark(720, 797, 'Stachus', 'gate'),
    odeonsplatz: landmark(1010, 605, 'Odeonsplatz · Feldherrnhalle', 'hall'),
    isartor: landmark(1420, 981, 'Isartor', 'gate'),
    sendlingerTor: landmark(1017, 1194, 'Sendlinger Tor', 'gate'),
    museum: landmark(1527, 981, 'Deutsches Museum', 'museum'),
    maximilianeum: landmark(1670, 820, 'Maximilianeum', 'palace'),
    hauptbahnhof: landmark(615, 815, 'Hauptbahnhof', 'station'),
    theresienwiese: landmark(625, 1180, 'Theresienwiese · Bavaria', 'statue'),
    englischerGarten: landmark(1414, 761, 'Englischer Garten · Monopteros', 'monopteros'),
    chinesischerTurm: landmark(1418, 572, 'Chinesischer Turm', 'pagoda'),
    olympiapark: landmark(922, 334, 'Olympiapark · Olympiaturm', 'needle'),
    bmw: landmark(1107, 329, 'BMW Welt · Vierzylinder', 'bmw'),
    allianzArena: landmark(1325, 114, 'Allianz Arena', 'arena')
  },
  signs: {
    a9: { x: 1200, y: 80, label: 'A9 Nürnberg' },
    a92: { x: 1730, y: 85, label: 'A92 Deggendorf · Flughafen' },
    a94: { x: 2300, y: 760, label: 'A94 Passau' },
    a8Salzburg: { x: 2220, y: 1570, label: 'A8 Salzburg' },
    a995: { x: 1200, y: 1650, label: 'A995 Oberhaching' },
    a95: { x: 200, y: 1590, label: 'A95 Garmisch' },
    a96: { x: 110, y: 965, label: 'A96 Lindau' },
    a8Stuttgart: { x: 240, y: 105, label: 'A8 Stuttgart' }
  },
  peds: [
    { tex: 'ped_adult_0', speed: 29, wps: points([857, 961], [1023, 961]) },
    { tex: 'ped_adult_1', speed: 33, wps: points([1137, 961], [1287, 961]) },
    { tex: 'ped_child', speed: 27, wps: points([550, 835], [712, 835]) },
    { tex: 'ped_adult_1', speed: 31, wps: points([1600, 841], [1750, 841]) }
  ],
  cones: points([626, 928], [654, 928], [682, 928]),
  traffic: [
    { tex: 'npc_sedan_blue', speed: 97, path: points([480, 900], [790, 900], [790, 1120], [1350, 1120], [1350, 900], [1790, 900]) },
    { tex: 'npc_van_white', speed: 84, path: points([1780, 425], [1350, 425], [1350, 680], [790, 680], [790, 470]) },
    { tex: 'npc_compact_green', speed: 91, path: points([1660, 1340], [675, 1340], [675, 1590], [255, 1590]) },
    { tex: 'npc_sedan_blue', speed: 100, path: points([300, 240], [2120, 240], [2120, 760], [2240, 760]) },
    { tex: 'cyclist_0', speed: 53, cyclist: true, path: points([820, 900], [1730, 900]) },
    { tex: 'cyclist_1', speed: 51, cyclist: true, path: points([1080, 1290], [1080, 730]) }
  ]
} satisfies WinterCityLayout;
