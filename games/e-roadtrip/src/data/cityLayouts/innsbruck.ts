import { landmark, points, road, type WinterCityLayout } from './types';

export const INNSBRUCK_HOTEL = { x: 1156, y: 940, w: 112, h: 100 };
export const INNSBRUCK_APPROACHES = {
  west: { x: 105, y: 1264, rot: Math.PI / 2, label: 'Innsbruck-West' },
  east: { x: 2295, y: 1216, rot: -Math.PI / 2, label: 'Innsbruck-Ost' }
};
export const INNSBRUCK_HOTEL_LABEL = 'Hotel · Maria-Theresien-Straße';

export const INNSBRUCK = {
  id: 'innsbruck',
  width: 2400,
  height: 1580,
  roads: [
    // A12 interchanges in west-to-east order. The A13 has two city connections.
    road('motorway', [50, 1240], [2350, 1240]),
    road('motorway', [1210, 1240], [1210, 1400], [1560, 1400]),
    road('motorway', [1890, 1240], [1890, 1400], [1560, 1400], [1560, 1530]),
    road('ring', [325, 1240], [325, 785], [650, 785]),
    road('ring', [650, 1240], [650, 840], [2110, 840], [2110, 1240]),
    road('ring', [1510, 1240], [1510, 840]),
    road('street', [1890, 1240], [1890, 840]),
    road('street', [650, 840], [650, 430], [1090, 430], [1090, 840]),
    road('street', [1510, 840], [1510, 453], [1090, 453]),
    road('street', [1090, 840], [1090, 1115], [650, 1115]),
    road('street', [1090, 990], [1212, 990]),
    road('street', [1090, 1115], [1510, 1115])
  ],
  water: [
    { x: 0, y: 550, w: 840, h: 110 }, { x: 840, y: 570, w: 780, h: 102 },
    { x: 1620, y: 550, w: 780, h: 110 },
    { x: 1700, y: 650, w: 88, h: 483 }, { x: 1660, y: 1133, w: 128, h: 447 }
  ],
  parks: [
    { x: 0, y: 0, w: 2400, h: 340 }, { x: 946, y: 1365, w: 188, h: 180 },
    { x: 180, y: 884, w: 82, h: 183 }, { x: 1160, y: 690, w: 153, h: 85 }
  ],
  landmarks: {
    nordkette: landmark(1200, 119, 'Nordkette', 'mountain'),
    hungerburgbahn: landmark(1156, 339, 'Hungerburgbahn', 'cable'),
    goldenesDachl: landmark(969, 753, 'Goldenes Dachl', 'goldRoof'),
    hofburg: landmark(1247, 742, 'Hofburg', 'palace'),
    dom: landmark(1018, 720, 'Dom St. Jakob', 'dom'),
    annasaeule: landmark(1019, 926, 'Annasäule', 'column'),
    triumphPforte: landmark(1000, 1061, 'Triumphpforte', 'gate'),
    hauptbahnhof: landmark(1381, 1035, 'Hauptbahnhof', 'station'),
    airport: landmark(449, 1024, 'Flughafen Innsbruck', 'airport'),
    bergisel: landmark(1060, 1460, 'Bergisel', 'jump'),
    hotel: landmark(1248, 1062, 'Altstadt-Hotel', 'hotel')
  },
  signs: {
    voels: { x: 325, y: 1240, label: '83 Völs · Flughafen' },
    west: { x: 650, y: 1240, label: '79 Innsbruck-West' },
    wilten: { x: 1210, y: 1240, label: '77 Knoten Wilten' },
    mitte: { x: 1510, y: 1240, label: '75 Innsbruck-Mitte' },
    amras: { x: 1890, y: 1240, label: '74 Knoten Amras' },
    ost: { x: 2110, y: 1240, label: '73 Innsbruck-Ost' },
    a13: { x: 1560, y: 1510, label: 'A13 Brenner' }
  },
  peds: [
    { tex: 'ped_adult_0', speed: 29, wps: points([806, 777], [1050, 777]) },
    { tex: 'ped_adult_1', speed: 32, wps: points([1029, 888], [1029, 1010]) },
    { tex: 'ped_adult_0', speed: 28, wps: points([1185, 905], [1404, 905]) }
  ],
  cones: points([1580, 866], [1608, 866], [1636, 866]),
  traffic: [
    { tex: 'npc_sedan_blue', speed: 97, path: points([183, 1240], [2180, 1240]) },
    { tex: 'npc_van_white', speed: 80, path: points([2225, 1240], [2110, 1240], [2110, 840], [650, 840], [650, 545]) },
    { tex: 'npc_compact_green', speed: 88, path: points([760, 430], [1090, 430], [1090, 840], [1510, 840], [1510, 1170]) },
    { tex: 'cyclist_0', speed: 54, cyclist: true, path: points([715, 840], [1640, 840]) },
    { tex: 'cyclist_1', speed: 48, cyclist: true, path: points([920, 430], [650, 430], [650, 810]) }
  ]
} satisfies WinterCityLayout;
