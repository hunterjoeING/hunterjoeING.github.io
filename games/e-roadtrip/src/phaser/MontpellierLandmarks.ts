import type { GameObjects } from 'phaser';
import { MONTPELLIER_SAND, MONTPELLIER_SEA } from '../data/cityLayouts/montpellier';
import type { CityLandmark, CityRect } from '../data/cityLayouts/types';
import type { MappedCityStyle } from './MappedCityPainter';
import { drawCoastalShadow } from './CoastalEffects';

type Graphics = GameObjects.Graphics;

const facades: Record<string, { w: number; h: number; wall: number; roof: number }> = {
  opera: { w: 92, h: 48, wall: 0xf3d5a4, roof: 0xaa624d },
  antigone: { w: 113, h: 39, wall: 0xf8dcb2, roof: 0xc88162 },
  station: { w: 102, h: 52, wall: 0xebcd9a, roof: 0x996447 },
  corum: { w: 74, h: 40, wall: 0xf0b39a, roof: 0xa96c68 },
  cityHall: { w: 79, h: 56, wall: 0x659eaa, roof: 0x467387 },
  airport: { w: 134, h: 62, wall: 0xceece0, roof: 0x7793a3 },
  arena: { w: 96, h: 48, wall: 0xffcfa9, roof: 0xbc7d64 },
  villa: { w: 63, h: 39, wall: 0xf2cfaa, roof: 0xb96347 },
  hotel: { w: 100, h: 50, wall: 0xffdfa8, roof: 0xc86850 },
  glace: { w: 42, h: 25, wall: 0xffeac5, roof: 0xe57977 },
  cathedral: { w: 74, h: 50, wall: 0xd4c19e, roof: 0xa37c60 },
  arch: { w: 76, h: 34, wall: 0xf4d296, roof: 0xca9b6b },
  aqueduct: { w: 89, h: 27, wall: 0xe4c397, roof: 0xc2a078 },
  phare: { w: 40, h: 35, wall: 0xefdbc1, roof: 0xcb6d51 }
};

function footprint({ x, y, art }: CityLandmark) {
  const size = facades[art];
  return size ? { x: x - size.w / 2, y: y - size.h / 2, w: size.w, h: size.h } : undefined;
}

function buildingShadow(g: Graphics, box: CityRect, length = box.h * 1.3): void {
  drawCoastalShadow(g, box.x + box.w / 2, box.y + box.h * 0.72, Math.min(box.w, box.h), length);
}

function draw(g: Graphics, feature: CityLandmark): void {
  const { x, y, art } = feature;
  const box = footprint(feature);
  if (art === 'fountain') {
    g.fillStyle(0xd9ceb0).fillRect(x - 20, y - 15, 40, 30);
    g.fillStyle(0x5eb6b9).fillRect(x - 15, y - 10, 30, 20);
    g.fillStyle(0xffe4ba).fillRect(x - 4, y - 16, 8, 20).fillRect(x - 7, y - 7, 15, 5);
  }
  if (art === 'esplanade') {
    g.fillStyle(0xe3cba1).fillRect(x - 12, y - 50, 24, 100);
    for (const dx of [-27, 20]) for (let dy = -47; dy < 50; dy += 24) {
      g.fillStyle(0x639053).fillRect(x + dx, y + dy, 12, 15);
    }
  }
  if (!box) return;

  const { w, h } = box;
  const { wall, roof } = facades[art];
  buildingShadow(g, box, art === 'phare' ? 112 : h * 1.3);
  g.fillStyle(wall).fillRect(box.x, box.y, w, h);
  g.fillStyle(roof).fillRect(box.x, box.y, w, h * 0.48);
  g.fillStyle(0xffebbd, 0.48).fillRect(box.x + 3, box.y + 4, w - 6, 3);
  g.fillStyle(0xffe2a8, 0.72).fillRect(box.x, y, 4, h / 2);
  g.fillStyle(0x674c45, 0.38).fillRect(box.x, box.y + h - 5, w, 5);
  for (let dx = 9; dx < w - 6; dx += 13) {
    g.fillStyle(0x766757).fillRect(box.x + dx, y + 3, 5, 8);
    g.fillStyle(0xf7e9c7, 0.64).fillRect(box.x + dx - 1, y + 11, 7, 2);
  }

  if (art === 'phare') {
    g.fillStyle(wall).fillRect(x - 12, y - 56, 24, 64);
    g.fillStyle(0xc69e81).fillRect(x + 7, y - 56, 5, 64);
    g.fillStyle(roof).fillRect(x - 26, y - 68, 52, 13);
    g.fillStyle(0xf9dfac).fillRect(x - 30, y - 64, 60, 4);
    g.fillStyle(0x678c93).fillRect(x - 21, y - 60, 42, 6);
  } else if (art === 'arch' || art === 'aqueduct') {
    for (const dx of art === 'arch' ? [0] : [-28, 0, 28]) {
      g.fillStyle(0x755d4b).fillRect(x + dx - 7, y + 1, 14, h / 2 - 1);
      g.fillStyle(0x755d4b).fillRect(x + dx - 4, y - 3, 8, 5);
    }
  } else if (art === 'cathedral' || art === 'opera') {
    g.fillStyle(wall).fillRect(x - 19, box.y - 10, 38, 14);
    g.fillStyle(0xf3dbab).fillRect(x - 11, box.y - 16, 22, 6);
  } else if (art === 'hotel' || art === 'glace') {
    const stripe = art === 'hotel' ? 0x328e94 : 0xd55769;
    g.fillStyle(0xffedcc).fillRect(x - 22, y + 12, 44, 9);
    for (let dx = -22; dx < 22; dx += 8) g.fillStyle(stripe).fillRect(x + dx, y + 12, 4, 9);
  }
}

function palm(g: Graphics, x: number, y: number): void {
  drawCoastalShadow(g, x, y + 2, 13, 68);
  g.fillStyle(0x976145).fillRect(x - 3, y - 26, 6, 31).fillRect(x - 5, y - 33, 6, 9);
  g.fillStyle(0x336c48).fillRect(x - 20, y - 35, 30, 6).fillRect(x - 9, y - 46, 12, 13);
  g.fillStyle(0x408855).fillRect(x - 27, y - 31, 12, 5).fillRect(x + 1, y - 38, 17, 6);
  g.fillStyle(0x75a658).fillRect(x - 19, y - 40, 13, 5).fillRect(x + 7, y - 33, 15, 5);
}

function drawDetails(g: Graphics, mobile: boolean): void {
  const palms = [[1840, 2060], [1912, 2058], [2044, 2055], [2150, 2056],
    [2305, 2055], [2390, 2050], [2480, 1955], [2555, 1955], [2855, 1815]];
  for (const [index, [x, y]] of palms.entries()) {
    if (!mobile || index % 2 === 0) palm(g, x, y);
  }
  const umbrellas = [0xda766d, 0x3ba6a3, 0xf8e7bb, 0xc87557];
  for (const [index, sand] of MONTPELLIER_SAND.entries()) {
    g.fillStyle(0xe5b779, 0.68).fillRect(sand.x, sand.y + sand.h - 9, sand.w, 9);
    if (index === 0) continue;
    for (let x = sand.x + 34; x < sand.x + sand.w - 27; x += mobile ? 104 : 67) {
      const y = sand.y + sand.h - 29 - x % 14;
      drawCoastalShadow(g, x, y + 2, 22, 35);
      g.fillStyle(umbrellas[Math.floor(x / 37) % umbrellas.length]).fillRect(x - 12, y - 5, 24, 11)
        .fillRect(x - 7, y - 9, 14, 18);
      g.fillStyle(0xffebc4).fillRect(x - 1, y - 5, 3, 10).fillRect(x + 19, y - 5, 6, 15);
      g.fillStyle(0x4d9a9d).fillRect(x + 19, y - 1, 6, 3).fillRect(x + 19, y + 5, 6, 2);
    }
  }
}

export const montpellierLandmarkArt = { footprint, draw };

export const montpellierCityStyle: MappedCityStyle = {
  ground: 0xc8c395,
  roofs: [0xb45b46, 0xbf6b46, 0xc97b56, 0xa95241, 0xc38757, 0xa96450],
  waterColor: area => MONTPELLIER_SEA.includes(area) ? 0x2da8af : 0x6ba8a1,
  sand: MONTPELLIER_SAND,
  drawDetails,
  drawBuildingShadow: buildingShadow
};
