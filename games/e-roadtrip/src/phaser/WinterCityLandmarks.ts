import type * as Phaser from 'phaser';
import type { CityLandmark, CityRect } from '../data/cityLayouts/types';

/** Pixel silhouettes. Each column is an architectural element at a local pixel offset. */
type Painter = (x: number, y: number, w: number, h: number, color: number) => void;
type Sprite = (p: Painter) => void;

const SNOW = 0xe6f4ff;
const SHADOW = 0x475772;
const STONE = 0xd5bf9c;
const WINDOW = 0xffda92;
const ROOF = 0x814953;
const GOLD = 0xf8c45b;
const COPPER = 0x477c73;

function facade(p: Painter, x: number, y: number, w: number, h: number, roof = ROOF): void {
  p(x + 4, y + 5, w, h, SHADOW);
  p(x, y, w, h, STONE);
  p(x, y, w, 10, roof);
  p(x + 2, y, w - 6, 3, SNOW);
  for (let col = x + 5; col < x + w - 4; col += 10) p(col, y + 15, 4, 5, WINDOW);
}

const sprites: Record<string, Sprite> = {
  rathaus(p) {
    facade(p, -40, -14, 80, 32, 0x765869);
    for (const x of [-38, -27, 24, 35]) {
      p(x, -22, 5, 15, STONE);
      p(x + 1, -26, 3, 5, SNOW);
    }
    p(-7, -37, 14, 54, 0x977c75);
    p(-4, -44, 8, 14, SHADOW);
    p(-1, -49, 2, 8, SNOW);
    p(-3, -25, 6, 7, WINDOW);
  },
  frauenkirche(p) {
    facade(p, -28, -5, 56, 28, 0x91504f);
    for (const x of [-25, 10]) {
      p(x, -36, 15, 46, 0xb46355);
      p(x + 3, -45, 9, 6, COPPER);
      p(x, -40, 15, 9, COPPER);
      p(x + 2, -44, 11, 3, SNOW);
      p(x + 6, -49, 3, 5, GOLD);
      p(x + 5, -27, 5, 10, SHADOW);
    }
  },
  gate(p) {
    p(-23, -10, 46, 25, STONE);
    p(-25, -14, 50, 5, SNOW);
    p(-8, 2, 16, 14, SHADOW);
    p(-5, -2, 10, 6, SHADOW);
    p(-18, -19, 8, 13, STONE);
    p(10, -19, 8, 13, STONE);
  },
  hall(p) {
    p(-34, 10, 68, 5, SHADOW);
    p(-31, -10, 62, 22, STONE);
    p(-28, -6, 56, 17, SHADOW);
    for (const x of [-26, -9, 8, 25]) p(x, -7, 4, 20, STONE);
    p(-33, -12, 66, 5, SNOW);
  },
  palace(p) {
    facade(p, -41, -11, 82, 29);
    facade(p, -14, -20, 28, 39, COPPER);
    p(-8, 8, 16, 12, SHADOW);
  },
  museum(p) {
    facade(p, -24, -8, 48, 23, 0x617480);
    p(4, -26, 11, 25, STONE);
    p(3, -28, 13, 4, SNOW);
    p(7, -19, 5, 6, WINDOW);
  },
  station(p) {
    facade(p, -38, -12, 76, 26, SHADOW);
    for (const y of [16, 20, 24]) p(-37, y, 74, 1, 0x857779);
    p(-16, -13, 32, 9, 0x647a8a);
    p(-6, -10, 12, 6, 0xd95955);
  },
  statue(p) {
    p(-11, 8, 22, 10, STONE);
    p(-4, -11, 8, 20, COPPER);
    p(-8, -8, 6, 9, COPPER);
    p(4, -17, 3, 15, COPPER);
    p(-2, -18, 5, 7, 0x73978b);
    p(-13, 7, 26, 3, SNOW);
  },
  column(p) {
    p(-10, 11, 20, 5, STONE);
    p(-4, -9, 8, 21, 0xa47571);
    p(-2, -16, 4, 9, GOLD);
    p(-9, 9, 18, 3, SNOW);
  },
  monopteros(p) {
    for (const x of [-14, -6, 2, 10]) p(x, -4, 3, 15, STONE);
    p(-19, 11, 38, 4, STONE);
    p(-17, -8, 34, 5, SHADOW);
    p(-12, -13, 24, 7, SNOW);
    p(-5, -16, 10, 5, SNOW);
  },
  pagoda(p) {
    p(-4, -26, 8, 40, 0x996452);
    for (let i = 0; i < 4; i++) {
      const half = 8 + i * 4;
      p(-half, -29 + i * 10, half * 2, 4, COPPER);
      p(-half + 3, -31 + i * 10, half * 2 - 6, 2, SNOW);
    }
  },
  needle(p) {
    p(-13, 10, 26, 7, STONE);
    p(-3, -32, 6, 44, STONE);
    p(-9, -26, 18, 8, SHADOW);
    p(-1, -48, 2, 15, 0xe17b72);
    p(-7, -29, 14, 3, SNOW);
  },
  bmw(p) {
    p(-27, 0, 54, 17, 0x52768a);
    p(-23, -3, 46, 4, SNOW);
    p(-16, 2, 25, 3, 0x8ec5d8);
    for (const [x, y] of [[2, -19], [12, -22], [6, -13], [16, -16]]) {
      p(x, y, 8, 19, 0xa7bcc5);
      p(x + 1, y, 6, 3, SNOW);
    }
  },
  arena(p) {
    p(-44, -12, 88, 24, 0xe77b89);
    p(-35, -20, 70, 40, 0xedc5cf);
    p(-22, -12, 44, 24, 0x433f60);
    p(-15, -8, 30, 16, 0x528579);
    for (let x = -32; x <= 28; x += 12) {
      p(x, -18, 4, 4, SNOW);
      p(x + 2, 15, 5, 3, 0xe77b89);
    }
  },
  goldRoof(p) {
    facade(p, -17, -6, 34, 23, 0x857262);
    p(-11, -15, 22, 5, GOLD);
    p(-15, -11, 30, 8, 0xce8d36);
    p(-12, -11, 24, 3, GOLD);
    p(-8, -4, 16, 8, SHADOW);
  },
  dom(p) {
    facade(p, -17, -3, 34, 18, COPPER);
    for (const x of [-15, 6]) {
      p(x, -19, 9, 24, STONE);
      p(x + 1, -23, 7, 7, COPPER);
      p(x + 3, -26, 3, 5, GOLD);
    }
  },
  mountain(p) {
    p(-43, 8, 86, 13, 0x597a94);
    p(-34, -1, 67, 13, 0x7197b0);
    p(-25, -14, 22, 20, SNOW);
    p(-19, -20, 10, 9, SNOW);
    p(4, -19, 25, 25, 0xc3e2ee);
    p(10, -26, 12, 10, SNOW);
  },
  cable(p) {
    p(-24, 7, 45, 13, STONE);
    p(-20, 3, 36, 5, SNOW);
    p(-2, -24, 3, 30, SHADOW);
    p(9, -14, 19, 12, 0xbb5253);
    p(13, -12, 11, 4, SNOW);
  },
  airport(p) {
    p(-98, -14, 196, 26, 0x4f596a);
    for (let x = -88; x < 90; x += 19) p(x, -2, 9, 2, SNOW);
    p(20, -40, 66, 16, 0x7596ae);
    p(22, -41, 62, 3, SNOW);
    p(-27, -34, 4, 27, SNOW);
    p(-38, -23, 26, 4, SNOW);
  },
  jump(p) {
    p(-5, -43, 13, 50, STONE);
    p(-8, -45, 25, 9, SHADOW);
    p(-8, -47, 25, 3, SNOW);
    for (let i = 0; i < 6; i++) p(i * 8, -26 + i * 6, 12, 4, SNOW);
    p(42, 8, 22, 7, STONE);
  },
  hotel(p) {
    facade(p, -32, -5, 64, 27);
    p(-8, 13, 16, 12, 0x684a54);
    p(-13, 9, 26, 5, 0xe79265);
  }
};

export function drawWinterLandmark(g: Phaser.GameObjects.Graphics, landmark: CityLandmark): CityRect {
  const { x, y, art } = landmark;
  sprites[art]((dx, dy, w, h, color) => {
    g.fillStyle(color, 1);
    g.fillRect(x + dx, y + dy, w, h);
  });
  // The base footprint leaves clearance around roofs, rails and towers.
  const half = art === 'airport' ? 90 : ['pagoda', 'column', 'needle', 'statue'].includes(art) ? 8 : 19;
  return { x: x - half, y: y - 6, w: half * 2, h: 21 };
}
