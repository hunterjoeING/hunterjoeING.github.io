import type * as Phaser from 'phaser';
import type { CityLandmark } from '../data/cityLayouts/types';

type Graphics = Phaser.GameObjects.Graphics;
type Draw = (g: Graphics, night: boolean) => void;

interface Silhouette {
  size?: [width: number, depth: number];
  draw: Draw;
}

const block = (g: Graphics, color: number, x: number, y: number, w: number, h: number) =>
  g.fillStyle(color).fillRect(x, y, w, h);
const ellipse = (g: Graphics, color: number, x: number, y: number, w: number, h: number) =>
  g.fillStyle(color).fillEllipse(x, y, w, h);
const peak = (g: Graphics, color: number, left: number, top: number, right: number, base: number) =>
  g.fillStyle(color).fillTriangle(left, base, (left + right) / 2, top, right, base);
const glass = (night: boolean) => night ? 0xffdb93 : 0x537686;

function facade(g: Graphics, night: boolean, x: number, y: number, w: number, h: number, wall: number, roof: number) {
  block(g, 0x686659, x + 5, y + 6, w, h);
  block(g, wall, x, y, w, h);
  block(g, roof, x - 2, y, w + 4, h * 0.43);
  for (let dx = 8; dx < w - 6; dx += 11) block(g, glass(night), x + dx, y + h * 0.58, 4, h * 0.24);
}

function church(twins: boolean, brick: boolean): Silhouette {
  return {
    size: twins ? [83, 46] : [50, 31],
    draw(g, night) {
      const wall = twins ? 0x8e8a84 : brick ? 0xa8624d : 0xd0b9a0;
      const roof = twins ? 0x49505a : 0x546b65;
      facade(g, night, twins ? -42 : -25, -38, twins ? 84 : 50, 57, wall, roof);
      peak(g, roof, -14, -76, 20, -30);
      for (const x of twins ? [-27, 25] : [0]) {
        block(g, wall, x - 12, -67, 24, 74);
        block(g, 0x706d69, x + 3, -67, 6, 74);
        peak(g, 0x313841, x - 15, twins ? -119 : -95, x + 15, -64);
        block(g, glass(night), x - 2, -57, 4, 15);
        block(g, 0xd2c5a6, x - 2, -76, 4, 9);
      }
    }
  };
}

function stadium(arched: boolean): Silhouette {
  return { size: [96, 56], draw(g) {
    ellipse(g, 0x687480, 3, 6, 105, 63);
    ellipse(g, 0xc7cdc9, 0, 0, 101, 59);
    ellipse(g, arched ? 0x5d9b9c : 0x767f7b, 0, -2, 86, 46);
    if (arched) {
      g.lineStyle(4, 0xe2ece9).beginPath().arc(0, 10, 46, Math.PI, 2 * Math.PI).strokePath();
    } else {
      block(g, 0x518654, -30, -16, 60, 30);
      g.lineStyle(1, 0xe6efe0).strokeRect(-27, -13, 54, 24).lineBetween(0, -13, 0, 11);
    }
  } };
}

const art: Record<string, Silhouette> = {
  twinSpire: church(true, false),
  brickChurch: church(false, true),
  romanChurch: church(false, false),
  stadium: stadium(false),
  archArena: stadium(true),
  dome: { size: [94, 44], draw(g, night) {
    facade(g, night, -50, -22, 100, 39, 0xd5bca2, 0x677b72);
    block(g, 0xe0ccba, -19, -47, 38, 56);
    ellipse(g, 0x43786d, 0, -47, 40, 36);
    ellipse(g, 0x80a28c, -6, -51, 13, 22);
    block(g, 0xb7ad97, -3, -73, 6, 18);
    block(g, glass(night), -3, -15, 7, 19);
  } },
  station: { size: [88, 37], draw(g, night) {
    facade(g, night, -43, -23, 86, 41, 0xd5a480, 0x685c59);
    peak(g, 0x675f58, -20, -36, 20, -15);
    block(g, 0xe7ceb2, -17, -15, 34, 35);
    block(g, glass(night), -8, -3, 16, 23);
  } },
  clock: { draw(g) {
    block(g, 0x465956, -3, -23, 6, 24);
    ellipse(g, 0x3c5251, 0, -26, 19, 19);
    ellipse(g, 0xf3e2bd, 0, -26, 13, 13);
    g.lineStyle(1.5, 0x3e4c45).lineBetween(0, -31, 0, -25).lineBetween(0, -25, 4, -23);
  } },
  statue: { size: [18, 12], draw(g) {
    block(g, 0xc0ae91, -9, -3, 18, 9);
    block(g, 0x637363, -9, -15, 17, 8);
    block(g, 0x637363, 4, -22, 7, 8);
    block(g, 0x506457, -4, -26, 7, 13);
    ellipse(g, 0x637363, -1, -28, 6, 7);
  } },
  gardens: { draw(g) {
    block(g, 0xcbbf93, -60, -39, 120, 76);
    for (const x of [-53, 8]) for (const y of [-33, 7]) {
      block(g, 0x48825a, x, y, 45, 25);
      g.lineStyle(2, 0x94b66b).strokeRect(x + 5, y + 5, 35, 15);
    }
    ellipse(g, 0x76b5ba, 0, -2, 16, 14);
  } },
  airport: { size: [62, 34], draw(g, night) {
    facade(g, night, -32, -16, 64, 32, 0xcecfca, 0x788791);
    block(g, 0x535d62, 36, -6, 102, 14);
    for (let x = 41; x < 132; x += 16) block(g, 0xdfe4da, x, 0, 8, 2);
  } },
  zoo: { draw(g) {
    ellipse(g, 0x549378, 0, 0, 70, 43);
    ellipse(g, 0x7fac71, -26, -11, 34, 30);
    ellipse(g, 0x82bab7, 13, 0, 34, 21);
  } },
  square: { draw(g) {
    ellipse(g, 0xc7b597, 0, 0, 59, 37);
    ellipse(g, 0x798e77, 0, 0, 30, 18);
  } },
  fairTower: { size: [23, 22], draw(g, night) {
    block(g, 0xb5aea5, -8, -86, 16, 98);
    block(g, 0xdad4c7, -7, -81, 4, 90);
    block(g, 0x566366, -23, -87, 46, 16);
    block(g, glass(night), -19, -85, 38, 5);
    block(g, 0xe28369, 0, -105, 3, 18);
  } },
  halls: { size: [145, 82], draw(g, night) {
    for (let i = 0; i < 3; i++) {
      const x = -73 + i * 50;
      facade(g, night, x, -42, 44, 82, 0xb7c6c6, 0x77969c);
      for (let y = -31; y < 29; y += 12) block(g, 0xd5e3dd, x + 5, y, 33, 4);
    }
  } },
  expoCanopy: { size: [82, 44], draw(g) {
    for (const x of [-27, 25]) {
      block(g, 0x865d42, x - 3, -26, 6, 43);
      peak(g, 0xd2a16a, x - 26, -41, x + 26, -14);
      g.lineStyle(2, 0x9d795c).lineBetween(x, -39, x - 17, -15).lineBetween(x, -39, x + 17, -15);
    }
  } },
  brickHall: { size: [73, 43], draw(g, night) {
    facade(g, night, -37, -28, 74, 54, 0xad6c4c, 0x6b7773);
    block(g, 0xb68161, -40, -36, 28, 39);
    block(g, glass(night), -34, -28, 16, 23);
  } },
  railBridge: { draw(g) {
    block(g, 0x627173, -108, -2, 248, 16);
    for (let i = 0; i < 3; i++) {
      const x = -66 + i * 82;
      g.lineStyle(3, 0xaab5ab).beginPath().arc(x, 7, 39, Math.PI, 2 * Math.PI).strokePath();
      for (const dx of [-24, -12, 0, 12, 24]) g.lineStyle(1.5, 0x9bac9e).lineBetween(x + dx, -23, x + dx, 8);
    }
  } },
  glassTower: { size: [44, 32], draw(g, night) {
    block(g, 0x51656f, -21, -75, 45, 97);
    block(g, 0x9fb9b5, -21, -77, 29, 96);
    peak(g, 0xc7d9d3, -21, -94, 24, -75);
    for (let y = -69; y < 17; y += 9) block(g, glass(night), -17, y, 21, 2);
  } },
  craneHouses: { size: [97, 34], draw(g, night) {
    for (const x of [-45, -10, 25]) {
      block(g, 0x647c86, x, -53, 18, 72);
      block(g, 0xb5c3b9, x, -57, 34, 22);
      for (let y = -52; y < 15; y += 8) block(g, glass(night), x + 4, y, y < -36 ? 25 : 10, 3);
    }
  } },
  lighthouse: { size: [21, 18], draw(g, night) {
    block(g, 0xc3c4ad, -10, -58, 20, 68);
    block(g, 0xf2eddb, -9, -54, 11, 59);
    block(g, 0x444b53, -12, -66, 24, 12);
    block(g, glass(night), -8, -66, 15, 6);
    peak(g, 0x975342, -14, -81, 13, -66);
  } },
  ferryTerminal: { size: [92, 34], draw(g, night) {
    facade(g, night, -46, -17, 92, 38, 0xe5e1d2, 0x468287);
    block(g, 0xb0c8bb, -26, -22, 52, 13);
  } },
  ferryBoat: { draw(g) {
    ellipse(g, 0x809ca9, 0, 24, 123, 24);
    ellipse(g, 0x364c60, 0, 6, 114, 35);
    ellipse(g, 0xe3e6df, 3, -2, 104, 30);
    block(g, 0x6595a7, -35, -8, 70, 9);
    block(g, 0xac6356, -23, -16, 13, 13);
  } },
  oceanarium: { size: [100, 54], draw(g, night) {
    facade(g, night, -44, -18, 91, 43, 0xa88464, 0x626b61);
    ellipse(g, 0x419093, 7, -15, 64, 32);
    ellipse(g, 0x83bdb4, 3, -20, 45, 12);
  } }
};

export const regionalLandmarkArt = {
  footprint({ x, y, art: key }: CityLandmark) {
    const size = art[key].size;
    if (!size) return undefined;
    const [w, h] = size;
    return { x: x - w / 2, y: y - h / 2, w, h };
  },
  draw(g: Graphics, { x, y, art: key }: CityLandmark, night: boolean) {
    g.save().translateCanvas(x, y);
    art[key].draw(g, night);
    g.restore();
  }
};
