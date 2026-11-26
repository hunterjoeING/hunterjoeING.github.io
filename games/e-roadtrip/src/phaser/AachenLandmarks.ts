import type { GameObjects } from 'phaser';
import type { CityLandmark, CityRect } from '../data/cityLayouts/types';

type Graphics = GameObjects.Graphics;

const SIZES: Record<string, [number, number]> = {
  cathedral: [112, 70], townHall: [107, 50], colonnade: [88, 28], theatre: [80, 52],
  gate: [56, 36], university: [66, 46], faculty: [56, 40], hotel: [97, 36],
  congress: [100, 51], station: [72, 36], stadium: [135, 88], hospital: [154, 104],
  bakery: [36, 37], pub: [48, 38]
};

export function aachenLandmarkFootprint({ x, y, art }: CityLandmark): CityRect | undefined {
  const size = SIZES[art];
  if (size) {
    const [w, h] = size;
    return { x: x - w / 2, y: y - h / 2, w, h };
  }
}

export function drawAachenLandmark(g: Graphics, feature: CityLandmark, night: boolean): void {
  const { x, y, art } = feature;
  const area = aachenLandmarkFootprint(feature);
  if (!area) return;
  const { w, h } = area;
  const warm = night ? 0xffdb8e : 0xeee0bc;
  const stone = 0xb79d7e;
  const slate = 0x4d5963;
  const copper = 0x51847a;
  const box = (left: number, top: number, width: number, height: number, color: number) =>
    g.fillStyle(color).fillRect(x + left, y + top, width, height);
  const oval = (left: number, top: number, width: number, height: number, color: number) =>
    g.fillStyle(color).fillEllipse(x + left, y + top, width, height);
  const poly = (color: number, coords: number[][]) =>
    g.fillStyle(color).fillPoints(coords.map(([px, py]) => ({ x: x + px, y: y + py })), true);
  const windows = (left: number, right: number, top: number, stride: number, color = warm) => {
    for (let i = left; i < right; i += stride) box(i, top, 5, 6, color);
  };
  const pillars = (left: number, right: number, top: number, height: number) => {
    for (let i = left; i < right; i += 11) box(i, top, 4, height, warm);
  };
  g.fillStyle(0x223630, 0.3).fillRect(area.x + 5, area.y + 7, w, h);

  switch (art) {
    case 'cathedral': {
      // The octagonal Palatine Chapel, slate roof, west tower and long east choir.
      poly(stone, [[-56, -13], [-44, -19], [-35, -33], [3, -33], [17, -18], [48, -18], [56, -8],
        [56, 14], [48, 25], [14, 25], [0, 35], [-35, 35], [-47, 22], [-56, 19]]);
      poly(copper, [[-44, -15], [-31, -31], [-3, -31], [13, -16], [13, 12], [-3, 27], [-31, 27], [-44, 12]]);
      poly(0x66928c, [[-43, -14], [-31, -29], [-3, -29], [0, -7], [-17, 0]]);
      box(-23, -9, 12, 13, 0x33645d);
      box(15, -15, 35, 28, slate);
      box(17, -2, 33, 3, 0x727c81);
      windows(16, 53, 16, 8);
      box(-56, -21, 15, 36, slate);
      poly(0x6d7981, [[-57, -20], [-49, -35], [-40, -20]]);
      if (night) {
        box(-37, 27, 37, 4, warm);
        box(18, 22, 31, 3, warm);
      }
      break;
    }
    case 'townHall':
      box(-53, -18, 106, 43, stone);
      poly(slate, [[-47, 5], [-38, -21], [42, -21], [48, 5]]);
      box(-52, -25, 15, 43, 0x656166);
      box(40, -25, 13, 42, 0x656166);
      windows(-43, 46, 12, 11);
      break;
    case 'gate':
      box(-26, -14, 52, 26, stone);
      box(-25, -18, 14, 35, slate);
      box(11, -18, 14, 35, slate);
      box(-8, 4, 16, 12, 0x4d443c);
      for (const dx of [-24, -15, 12, 21]) box(dx, -18, 4, 5, warm);
      break;
    case 'colonnade':
    case 'theatre':
      box(-w / 2, -h / 2, w, h, 0xd6c6ab);
      box(-w / 2 + 3, -h / 2 + 4, w - 6, h - 18, art === 'theatre' ? slate : copper);
      poly(warm, [[-17, 5], [0, -5], [17, 5]]);
      pillars(5 - w / 2, w / 2 - 5, 5, h / 2 - 5);
      break;
    case 'hotel':
    case 'station':
    case 'faculty':
      box(-w / 2, -h / 2, w, h, art === 'hotel' ? 0xd1bd97 : stone);
      box(4 - w / 2, -h / 2, w - 8, h - 13, art === 'station' ? 0x794d47 : slate);
      box(-12, -h / 2 + 2, 24, h - 7, art === 'hotel' ? 0x747c77 : copper);
      windows(7 - w / 2, w / 2 - 5, h / 2 - 8, 10);
      break;
    case 'congress':
    case 'university':
    case 'hospital': {
      const glass = art === 'hospital' ? 0x6b8e75 : 0x56759a;
      box(-w / 2, -h / 2, w, 14, 0xc6ccc5);
      box(-w / 2, 2 - h / 2, art === 'university' ? 19 : w, h - 4, glass);
      box(2 - w / 2, h / 2 - 14, w - 4, 14, glass);
      for (let i = 12 - w / 2; i < w / 2 - 5; i += 16) {
        box(i, -h / 2 + 3, 3, 8, 0x889997);
        box(i, h / 2 - 9, 4, 6, warm);
      }
      if (art === 'hospital') {
        for (const dx of [-44, -4, 36]) box(dx, -39, 15, 69, 0x55635c);
        box(-16, -14, 33, 6, 0xe29580);
        box(-3, -27, 6, 31, 0xe29580);
      }
      break;
    }
    case 'stadium':
      oval(0, 0, w, h, 0x3b4347);
      oval(0, 0, w - 12, h - 12, 0xd3a834);
      oval(0, 0, w - 28, h - 29, 0x62552d);
      box(-42, -21, 84, 42, 0x4d8046);
      g.lineStyle(1, 0xe0e5c6).strokeRect(x - 39, y - 19, 78, 38).lineBetween(x, y - 19, x, y + 19);
      break;
    case 'bakery':
    case 'pub':
      box(-w / 2, -h / 2, w, h, art === 'bakery' ? 0x9b5938 : 0x714b54);
      box(4 - w / 2, 2 - h / 2, w - 8, h - 15, 0x633d36);
      box(2 - w / 2, 4, w - 4, 8, art === 'bakery' ? 0xf0c07c : 0xd09caf);
      windows(5 - w / 2, w / 2 - 4, 12, 9, 0xffcc86);
      break;
  }
}
