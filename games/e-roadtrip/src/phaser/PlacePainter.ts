import * as Phaser from 'phaser';
import { ChargerStation, CityDrivePreset } from '../types';
import { ZebraCrosswalk } from './CityTraffic';
import {
  BuildingSpec,
  CityPalette,
  Rect,
  classifyAutohof,
  hashString,
  skylineForStation,
  themeForPreset
} from './PlaceStyles';

export interface NeonMark {
  x: number;
  y: number;
  roadX: number;
  roadY: number;
  color: number;
  phase: number;
  flicker?: boolean;
}

export interface LiteAgent {
  tex: string;
  wps: Array<{ x: number; y: number }>;
  speed: number;
}

export interface PlacePaint {
  worldW: number;
  worldH: number;
  autohof: boolean;
  cityId: string;
  grass: Rect[];
  asphalt: Rect[];
  buildings: Rect[];
  trees: Array<{ x: number; y: number }>;
  lamps: Array<{ x: number; y: number }>;
  neons: NeonMark[];
  zebras: ZebraCrosswalk[];
  targetZone: Phaser.Geom.Rectangle;
  zoneLabel?: string;
  zoneColor?: number;
  passThrough: boolean;
  pillar?: { x: number; y: number };
  spawn: { x: number; y: number; rot: number };
  spinners: Phaser.GameObjects.Image[];
  liteCars?: LiteAgent[];
  litePeds?: LiteAgent[];
  previewPoint?: { x: number; y: number; rot: number };
}

export function paintDrivingPlace(
  scene: Phaser.Scene,
  opts: { preset: CityDrivePreset; station?: ChargerStation; mobile: boolean }
): PlacePaint {
  if (opts.preset === 'charger_park' && opts.station) {
    return paintAutohof(scene, opts.station, opts.mobile);
  }
  return paintCity(scene, themeForPreset(opts.preset), opts.preset, opts.mobile);
}

function paintCity(scene: Phaser.Scene, theme: CityPalette, preset: CityDrivePreset, mobile: boolean): PlacePaint {
  const worldW = 2140;
  const worldH = 1560;
  const g = scene.add.graphics().setDepth(0);
  const neons: NeonMark[] = [];
  const passThrough = preset === 'aachen_start' || preset === 'koeln_ring' || preset === 'ferry_denmark';

  g.fillStyle(theme.grass, 1);
  g.fillRect(0, 0, worldW, worldH);

  g.fillStyle(theme.sidewalk, 1);
  g.fillRect(60, 60, worldW - 120, 1280);
  g.lineStyle(2, theme.curb, 0.45);
  g.strokeRect(61, 61, worldW - 122, 1278);

  g.fillStyle(theme.park, 1);
  g.fillRect(300, 300, 640, 340);
  g.fillRect(300, 820, 640, 340);
  g.fillRect(1120, 300, 620, 340);
  g.fillRect(1120, 820, 620, 340);

  // Southern meadow: drivable grass past the last avenue.
  g.fillStyle(theme.grass, 1);
  g.fillRect(0, 1348, worldW, worldH - 1348);

  g.fillStyle(theme.road, 1);
  g.fillRect(140, 140, 1900, 140);
  g.fillRect(140, 660, 1900, 140);
  g.fillRect(140, 1180, 1900, 140);
  g.fillRect(140, 140, 140, 1180);
  g.fillRect(960, 140, 140, 1180);
  g.fillRect(1760, 140, 140, 1180);

  g.fillStyle(0x0b1220, 0.45);
  [172, 232, 692, 752, 1212, 1272].forEach(y => g.fillRect(140, y, 1900, 16));
  [172, 232, 992, 1052, 1792, 1852].forEach(x => g.fillRect(x, 140, 16, 1180));

  const puddles: Array<[number, number, number, number]> = [
    [420, 215, 78, 26], [1320, 225, 82, 28], [510, 742, 74, 26], [1420, 1255, 80, 28], [1830, 520, 54, 28]
  ];
  puddles.forEach(([px, py, pw, ph]) => {
    g.fillStyle(0x1e3a5f, 0.28);
    g.fillEllipse(px, py, pw, ph);
  });

  g.lineStyle(2, theme.curb, 0.4);
  g.strokeRect(280, 280, 680, 380);
  g.strokeRect(280, 800, 680, 380);
  g.strokeRect(1100, 280, 660, 380);
  g.strokeRect(1100, 800, 660, 380);

  if (preset === 'hannover_messe') {
    g.fillStyle(theme.road, 1);
    g.fillRect(1420, 400, 300, 400);
    g.fillStyle(0x334155, 1);
    g.fillRect(1448, 430, 250, 28);
    g.lineStyle(2, 0x38bdf8, 0.85);
    g.strokeRect(1455, 448, 130, 90);
  } else if (preset === 'aachen_finish') {
    g.fillStyle(theme.road, 1);
    g.fillRect(320, 800, 140, 200);
    g.fillStyle(0x0f172a, 1);
    g.fillRect(336, 900, 108, 96);
  }

  if (passThrough) {
    drawOnRamp(scene, g, theme, preset);
  }

  if (theme.id === 'koeln') {
    g.fillStyle(0x0369a1, 1);
    g.fillRect(1960, 80, 180, 1280);
    g.fillStyle(0x7dd3fc, 0.35);
    for (let y = 100; y < 1320; y += 36) g.fillRect(1980, y, 140, 8);
    g.fillStyle(0xe2e8f0, 0.35);
    g.fillRect(1022, 300, 3, 360);
    g.fillRect(1036, 300, 3, 360);
    g.fillRect(1022, 860, 3, 280);
    g.fillRect(1036, 860, 3, 280);
  }

  if (theme.id === 'aachen') {
    g.fillStyle(0xd6d3d1, 0.55);
    g.fillEllipse(560, 1020, 210, 150);
    g.fillStyle(0xa8a29e, 0.9);
    g.fillEllipse(560, 1020, 120, 86);
  }

  g.fillStyle(0x7c2d12, 0.65);
  g.fillRect(140, 142, 1760, 14);
  g.fillRect(140, 1304, 1760, 14);

  g.fillStyle(theme.road, 1);
  g.fillCircle(1030, 1250, 112);
  g.fillStyle(theme.park, 1);
  g.fillCircle(1030, 1250, 44);
  g.lineStyle(3, 0xf8fafc, 0.85);
  g.strokeCircle(1030, 1250, 46);

  g.fillStyle(0xf8fafc, 0.72);
  for (let x = 180; x < 1900; x += 38) {
    if (Math.abs(x - 1030) > 85) {
      g.fillRect(x, 208, 20, 3);
      g.fillRect(x, 728, 20, 3);
    }
    if (Math.abs(x - 1030) > 120) g.fillRect(x, 1248, 20, 3);
  }
  for (let y = 180; y < 1280; y += 38) {
    if (Math.abs(y - 210) > 85 && Math.abs(y - 730) > 85) {
      g.fillRect(208, y, 3, 20);
      if (Math.abs(y - 1250) > 120) g.fillRect(1028, y, 3, 20);
      g.fillRect(1828, y, 3, 20);
    }
  }

  g.fillStyle(0xf8fafc, 0.92);
  g.fillRect(948, 212, 6, 66);
  g.fillRect(1106, 142, 6, 66);
  g.fillRect(962, 286, 66, 6);
  g.fillRect(1032, 128, 66, 6);
  g.fillRect(948, 732, 6, 66);
  g.fillRect(1106, 662, 6, 66);
  g.fillRect(962, 806, 66, 6);
  g.fillRect(1032, 648, 66, 6);

  const zebras: ZebraCrosswalk[] = [
    { id: 'zebra_1', box: new Phaser.Geom.Rectangle(874, 144, 48, 132), axis: 'ew' },
    { id: 'zebra_2', box: new Phaser.Geom.Rectangle(144, 1084, 132, 48), axis: 'ns' },
    { id: 'zebra_3', box: new Phaser.Geom.Rectangle(1134, 664, 48, 132), axis: 'ew' }
  ];
  g.fillStyle(0xf8fafc, 0.88);
  for (let i = 0; i < 6; i++) g.fillRect(880, 152 + i * 21, 34, 10);
  for (let i = 0; i < 6; i++) g.fillRect(152 + i * 21, 1090, 10, 34);
  for (let i = 0; i < 6; i++) g.fillRect(1140, 672 + i * 21, 34, 10);

  const buildings = theme.buildings.filter(b => !mobile || b.w > 170 || b.neon);
  buildings.forEach(b => drawBuilding(scene, g, b, neons));

  const landmarks = scene.add.graphics().setDepth(3);
  drawThemeLandmarks(scene, landmarks, theme, preset);

  const lamps = [
    { x: 320, y: 132 }, { x: 640, y: 132 }, { x: 1260, y: 132 }, { x: 1620, y: 132 },
    { x: 320, y: 652 }, { x: 700, y: 652 }, { x: 1260, y: 652 }, { x: 1620, y: 652 },
    { x: 360, y: 1172 }, { x: 860, y: 1172 }, { x: 1400, y: 1172 },
    { x: 132, y: 460 }, { x: 132, y: 980 }
  ];

  const trees = theme.id === 'koeln'
    ? [{ x: 90, y: 200 }, { x: 90, y: 900 }, { x: 2060, y: 200 }]
    : [
        { x: 90, y: 180 }, { x: 90, y: 520 }, { x: 90, y: 980 }, { x: 90, y: 1420 },
        { x: 2060, y: 420 }, { x: 2060, y: 1100 }, { x: 480, y: 1460 }, { x: 1500, y: 1470 }
      ];

  let targetZone: Phaser.Geom.Rectangle;
  let zoneLabel: string | undefined;
  let zoneColor: number | undefined;
  let spawn = { x: 210, y: 1005, rot: 0 };
  if (preset === 'aachen_start' || preset === 'koeln_ring' || preset === 'ferry_denmark') {
    targetZone = new Phaser.Geom.Rectangle(1895, 158, 160, 108);
    spawn = { x: 210, y: 1005, rot: 0 };
  } else if (preset === 'hannover_messe') {
    targetZone = new Phaser.Geom.Rectangle(1465, 450, 120, 86);
    zoneLabel = 'MESSE\nE-PARKPLATZ';
    zoneColor = 0x38bdf8;
    spawn = { x: 1830, y: 240, rot: -Math.PI / 2 };
  } else {
    targetZone = new Phaser.Geom.Rectangle(348, 912, 86, 72);
    zoneLabel = 'ZIEL\nAACHEN';
    zoneColor = 0x22c55e;
    spawn = { x: 1830, y: 1250, rot: -Math.PI / 2 };
  }

  scene.add
    .text(theme.id === 'koeln' ? 700 : 250, 96, theme.title.toUpperCase(), {
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#f8fafc',
      backgroundColor: 'rgba(15,23,42,0.78)',
      padding: { x: 8, y: 3 }
    })
    .setDepth(5);

  const footprint: Rect[] = buildings.map(b => ({ x: b.x, y: b.y, w: b.w, h: b.h }));
  if (theme.id === 'aachen') footprint.push({ x: 500, y: 970, w: 120, h: 90 });
  if (theme.id === 'koeln') footprint.push({ x: 500, y: 330, w: 150, h: 150 });
  if (theme.id === 'hannover') footprint.push({ x: 500, y: 900, w: 170, h: 150 }, { x: 1604, y: 360, w: 36, h: 36 });

  return {
    worldW,
    worldH,
    autohof: false,
    cityId: theme.id,
    grass: [
      ...theme.lawns,
      { x: 300, y: 300, w: 640, h: 340 },
      { x: 300, y: 820, w: 640, h: 340 },
      { x: 1120, y: 300, w: 620, h: 340 },
      { x: 1120, y: 820, w: 620, h: 340 }
    ],
    asphalt: [
      { x: 140, y: 140, w: 1900, h: 140 },
      { x: 140, y: 660, w: 1900, h: 140 },
      { x: 140, y: 1180, w: 1900, h: 140 },
      { x: 140, y: 140, w: 140, h: 1180 },
      { x: 960, y: 140, w: 140, h: 1180 },
      { x: 1760, y: 140, w: 140, h: 1180 }
    ],
    buildings: footprint,
    trees: mobile ? trees.slice(0, 5) : trees,
    lamps: mobile ? lamps.filter((_, i) => i % 2 === 0) : lamps,
    neons,
    zebras,
    targetZone,
    zoneLabel,
    zoneColor,
    passThrough,
    spawn,
    spinners: [],
    previewPoint: {
      x: theme.lawns[theme.lawns.length - 1].x + 36,
      y: theme.lawns[theme.lawns.length - 1].y + 48,
      rot: Math.PI / 2
    }
  };
}

function drawOnRamp(scene: Phaser.Scene, g: Phaser.GameObjects.Graphics, theme: CityPalette, preset: CityDrivePreset): void {
  g.fillStyle(0x1e293b, 1);
  g.fillRect(1860, 158, 280, 108);
  g.fillStyle(0x94a3b8, 1);
  g.fillRect(1900, 152, 220, 4);
  g.fillRect(1900, 266, 220, 4);
  g.fillStyle(0xf8fafc, 0.9);
  g.fillRect(1896, 168, 200, 2.5);
  g.fillRect(1896, 254, 200, 2.5);
  const label =
    preset === 'koeln_ring' ? 'A1  KÖLN  →' : preset === 'ferry_denmark' ? 'FÆRGE  →' : 'A4  AUTOBAHN  →';
  g.fillStyle(0x1d4ed8, 1);
  g.fillRect(1888, 108, 168, 32);
  g.lineStyle(2, 0xf8fafc, 0.95);
  g.strokeRect(1890, 110, 164, 28);
  scene.add
    .text(1972, 124, label, {
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#ffffff'
    })
    .setOrigin(0.5)
    .setDepth(5);
  void theme;
}

function drawThemeLandmarks(
  scene: Phaser.Scene,
  g: Phaser.GameObjects.Graphics,
  theme: CityPalette,
  preset: CityDrivePreset
): void {
  if (theme.id === 'aachen') {
    drawAachenDom(g, 560, 1020);
    placeLabel(scene, 560, 1110, 'Aachener Dom');
  } else if (theme.id === 'koeln') {
    drawKoelnDom(g, 575, 400);
    placeLabel(scene, 575, 520, 'Kölner Dom');
  } else if (theme.id === 'hannover') {
    drawRathaus(g, 560, 980);
    placeLabel(scene, 560, 1090, 'Neues Rathaus');
    drawHermes(g, 1620, 390);
    placeLabel(scene, 1500, 560, 'Hannover Messe');
  } else {
    scene.add.image(520, 980, 'landmark_ferry').setScale(3.2).setDepth(3);
    placeLabel(scene, 520, 1060, 'Hirtshals Fähre');
  }
  void preset;
}

function placeLabel(scene: Phaser.Scene, x: number, y: number, text: string): void {
  scene.add
    .text(x, y, text, {
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#f8fafc',
      backgroundColor: 'rgba(15,23,42,0.84)',
      padding: { x: 6, y: 3 }
    })
    .setOrigin(0.5)
    .setDepth(4);
}

function drawAachenDom(g: Phaser.GameObjects.Graphics, x: number, y: number): void {
  g.fillStyle(0x020617, 0.45);
  g.fillEllipse(x + 16, y + 18, 150, 100);
  g.fillStyle(0x57534e, 1);
  g.fillRect(x - 70, y - 20, 140, 70);
  g.fillStyle(0xa8a29e, 1);
  g.fillPoints(octagon(x, y - 8, 48), true);
  g.fillStyle(0x44403c, 1);
  g.fillPoints(octagon(x, y - 8, 28), true);
  g.fillStyle(0x1e3a8a, 1);
  g.fillRect(x - 10, y - 62, 20, 36);
  g.fillStyle(0xfacc15, 1);
  g.fillRect(x - 4, y - 74, 8, 12);
  g.fillStyle(0xfef3c7, 0.9);
  g.fillRect(x - 8, y - 6, 16, 10);
}

function drawKoelnDom(g: Phaser.GameObjects.Graphics, x: number, y: number): void {
  g.fillStyle(0x020617, 0.5);
  g.fillEllipse(x + 10, y + 70, 180, 60);
  g.fillStyle(0x475569, 1);
  g.fillRect(x - 36, y + 10, 110, 78);
  g.fillStyle(0x94a3b8, 1);
  g.fillRect(x - 28, y + 18, 94, 60);
  g.fillStyle(0x334155, 1);
  g.fillTriangle(x - 30, y + 16, x - 8, y - 120, x + 8, y + 16);
  g.fillTriangle(x + 28, y + 16, x + 8, y - 120, x + 46, y + 16);
  g.fillStyle(0xe2e8f0, 1);
  g.fillRect(x - 6, y - 132, 6, 16);
  g.fillRect(x + 28, y - 132, 6, 16);
  g.fillStyle(0xf8fafc, 0.8);
  for (let i = 0; i < 4; i++) g.fillRect(x - 20 + i * 22, y + 36, 8, 16);
}

function drawRathaus(g: Phaser.GameObjects.Graphics, x: number, y: number): void {
  g.fillStyle(0x020617, 0.4);
  g.fillRect(x - 70, y - 20, 180, 120);
  g.fillStyle(0xf1f5f9, 1);
  g.fillRect(x - 80, y - 30, 170, 110);
  g.fillStyle(0x166534, 1);
  g.fillCircle(x + 4, y + 10, 42);
  g.fillStyle(0x22c55e, 1);
  g.fillCircle(x + 4, y + 10, 28);
  g.fillStyle(0xfacc15, 1);
  g.fillRect(x, y - 48, 8, 22);
  g.fillStyle(0x94a3b8, 0.9);
  g.fillRect(x - 70, y + 20, 16, 50);
  g.fillRect(x + 70, y + 20, 16, 50);
}

function drawHermes(g: Phaser.GameObjects.Graphics, x: number, y: number): void {
  g.fillStyle(0x020617, 0.35);
  g.fillRect(x - 8, y - 10, 28, 90);
  g.fillStyle(0xf8fafc, 1);
  g.fillRect(x - 4, y - 70, 10, 130);
  g.fillStyle(0x2563eb, 1);
  g.fillRect(x - 16, y - 40, 34, 12);
  g.fillStyle(0xf97316, 1);
  g.fillRect(x - 22, y + 28, 46, 16);
  g.fillStyle(0xfef08a, 1);
  g.fillRect(x - 2, y - 82, 6, 12);
}

function octagon(cx: number, cy: number, r: number): Array<{ x: number; y: number }> {
  const pts = [];
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 8) + (i * Math.PI) / 4;
    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.72 });
  }
  return pts;
}

function drawBuilding(
  scene: Phaser.Scene,
  g: Phaser.GameObjects.Graphics,
  b: BuildingSpec,
  neons: NeonMark[]
): void {
  g.fillStyle(0x020617, 0.55);
  g.fillRect(b.x + 12, b.y + 12, b.w, b.h);
  g.fillStyle(b.trim, 1);
  g.fillRect(b.x, b.y, b.w, b.h);
  g.fillStyle(b.roof, 1);
  g.fillRect(b.x + 7, b.y + 7, b.w - 14, b.h - 14);
  g.fillStyle(0xfef08a, 0.4);
  for (let wx = b.x + 14; wx < b.x + b.w - 20; wx += 20) {
    g.fillRect(wx, b.y + b.h - 5, 10, 3);
    g.fillRect(wx, b.y + 2, 10, 3);
  }
  if (!b.neon) return;
  let nx = b.x + b.w / 2;
  let ny = b.y + b.h + 2;
  let rx = nx;
  let ry = ny + 36;
  if (b.neon.side === 'north') {
    ny = b.y - 2;
    ry = ny - 36;
  } else if (b.neon.side === 'west') {
    nx = b.x - 2;
    ny = b.y + b.h / 2;
    rx = nx - 40;
    ry = ny;
  } else if (b.neon.side === 'east') {
    nx = b.x + b.w + 2;
    ny = b.y + b.h / 2;
    rx = nx + 40;
    ry = ny;
  }
  const plateW = Math.max(48, b.neon.label.length * 7 + 14);
  const plate = scene.add.rectangle(nx, ny, plateW, 16, 0x090d16, 0.94).setDepth(11);
  plate.setStrokeStyle(1.8, b.neon.color, 0.95);
  scene.add
    .text(nx, ny, b.neon.label, {
      fontFamily: 'monospace',
      fontSize: '10px',
      fontStyle: 'bold',
      color: '#' + b.neon.color.toString(16).padStart(6, '0')
    })
    .setOrigin(0.5)
    .setDepth(11.5);
  neons.push({
    x: nx,
    y: ny,
    roadX: rx,
    roadY: ry,
    color: b.neon.color,
    phase: neons.length * 1.3,
    flicker: b.neon.flicker
  });
}

function paintAutohof(scene: Phaser.Scene, station: ChargerStation, mobile: boolean): PlacePaint {
  const style = classifyAutohof(station);
  const variant = hashString(station.id) % 3;
  const worldW = style === 'urban' ? 1720 : 1520;
  const worldH = style === 'urban' ? 1120 : 1000;
  const g = scene.add.graphics().setDepth(0);
  const neons: NeonMark[] = [];
  const spinners: Phaser.GameObjects.Image[] = [];
  const asphalt: Rect[] = [];
  const buildings: Rect[] = [];

  const grassCol = style === 'rural' ? 0x4d7c0f : style === 'urban' ? 0x14532d : 0x166534;
  g.fillStyle(grassCol, 1);
  g.fillRect(0, 0, worldW, worldH);
  if (style === 'rural') {
    g.fillStyle(0x65a30d, 0.45);
    for (let i = 0; i < 9; i++) g.fillRect(0, 40 + i * 110, worldW, 36);
    const mills = mobile ? 2 : 3;
    for (let i = 0; i < mills; i++) {
      const mx = 70 + i * 64;
      const my = 760 + (i % 2) * 40;
      g.fillStyle(0xe5e7eb, 1);
      g.fillRect(mx, my, 6, 90);
      const blade = scene.add.image(mx + 3, my, 'turbine_blades').setDepth(4);
      spinners.push(blade);
    }
  }

  const apron: Rect =
    style === 'rural'
      ? { x: 200, y: 250, w: 980, h: 620 }
      : style === 'urban'
        ? { x: 70, y: 230, w: 1560, h: 780 }
        : { x: 110, y: 240, w: 1280, h: 660 };

  const fillAsphalt = (rect: Rect, color = 0x111827) => {
    g.fillStyle(color, 1);
    g.fillRect(rect.x, rect.y, rect.w, rect.h);
    asphalt.push(rect);
  };

  fillAsphalt({ x: 0, y: 48, w: worldW, h: 128 }, 0x1e293b);
  g.fillStyle(0xf8fafc, 0.85);
  g.fillRect(0, 58, worldW, 3);
  g.fillRect(0, 164, worldW, 3);
  for (let x = 20; x < worldW; x += 46) g.fillRect(x, 108, 22, 3);
  g.fillStyle(0x94a3b8, 1);
  g.fillRect(0, 44, worldW, 4);
  g.fillRect(0, 176, worldW, 4);

  fillAsphalt({ x: 230, y: 160, w: 110, h: apron.y - 80 });
  fillAsphalt(apron, 0x0f172a);
  g.fillStyle(0x334155, 1);
  g.fillRect(apron.x + 8, apron.y + 8, apron.w - 16, 10);

  const foodOnEast = variant === 1;
  const food: Rect = foodOnEast
    ? { x: apron.x + apron.w - 250, y: apron.y + 36, w: 150, h: 90 }
    : { x: apron.x + 150, y: apron.y + 36, w: 150, h: 90 };
  buildings.push(food);
  scene.add.image(food.x + food.w / 2, food.y + food.h / 2, station.hasMcDonalds ? 'mcd_kiosk' : 'bistro_kiosk').setScale(1.45).setDepth(4);
  neons.push({
    x: food.x + food.w / 2,
    y: food.y - 8,
    roadX: food.x + food.w / 2,
    roadY: food.y + food.h + 24,
    color: station.hasMcDonalds ? 0xfacc15 : 0xf97316,
    phase: 0.4
  });

  const canopy: Rect = {
    x: variant === 2 ? apron.x + 360 : apron.x + 150,
    y: apron.y + 150,
    w: style === 'urban' ? 340 : 260,
    h: 120
  };
  g.fillStyle(style === 'urban' ? 0x0e7490 : 0x1f2937, 0.95);
  g.fillRect(canopy.x, canopy.y, canopy.w, 28);
  g.fillStyle(style === 'urban' ? 0x67e8f9 : 0xfacc15, 0.9);
  g.fillRect(canopy.x, canopy.y + 26, canopy.w, 4);
  g.fillStyle(0xdc2626, 1);
  for (let i = 0; i < (mobile ? 3 : 4); i++) {
    const px = canopy.x + 28 + i * 60;
    g.fillRect(px, canopy.y + 40, 16, 28);
    buildings.push({ x: px, y: canopy.y + 40, w: 16, h: 28 });
  }
  neons.push({
    x: canopy.x + canopy.w / 2,
    y: canopy.y + 12,
    roadX: canopy.x + canopy.w / 2,
    roadY: canopy.y + 70,
    color: 0x22c55e,
    phase: 1.2
  });

  // Chargers along the canopy's outer edge (not the player's bay).
  const edgeCount = mobile ? 2 : 3;
  for (let i = 0; i < edgeCount; i++) {
    const cx = canopy.x + canopy.w + 18;
    const cy = canopy.y + 16 + i * 36;
    scene.add.image(cx, cy, `charger_${station.network}`).setScale(1.05).setDepth(5);
  }

  const aisleTop = apron.y + apron.h - 150;
  const bayCount = style === 'rural' ? 4 : style === 'urban' ? (mobile ? 6 : 8) : 6;
  const rowX = apron.x + (variant === 2 ? 430 : 340);
  const targetIndex = hashString(station.id + ':bay') % bayCount;
  let targetZone = new Phaser.Geom.Rectangle(rowX, aisleTop - 78, 48, 70);
  let pillar = { x: targetZone.centerX, y: targetZone.y + 6 };
  for (let i = 0; i < bayCount; i++) {
    const bx = rowX + i * 58;
    const by = aisleTop - 78;
    g.lineStyle(2, i === targetIndex ? 0x22c55e : 0xfacc15, 0.9);
    g.lineBetween(bx, by, bx, by + 68);
    g.lineBetween(bx + 46, by, bx + 46, by + 68);
    g.lineBetween(bx, by, bx + 46, by);
    scene.add.image(bx + 23, by + 8, 'wheel_stop').setDepth(4);
    scene.add.image(bx + 23, by + 4, `charger_${station.network}`).setScale(1.12).setDepth(5);
    if (i === targetIndex) {
      targetZone = new Phaser.Geom.Rectangle(bx, by, 46, 68);
      pillar = { x: bx + 23, y: by + 4 };
    }
  }

  const carTex = ['npc_sedan_blue', 'npc_compact_green', 'npc_van_white', 'npc_fast_red', 'npc_fast_black'];
  const carCount = style === 'rural' ? (mobile ? 6 : 10) : style === 'urban' ? (mobile ? 12 : 20) : mobile ? 8 : 14;
  for (let i = 0; i < carCount; i++) {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const cx = apron.x + 420 + col * 42 + (variant === 1 ? 30 : 0);
    const cy = apron.y + 160 + row * 58;
    if (cx > apron.x + apron.w - 220 || cy > aisleTop - 100) continue;
    if (cx > canopy.x && cx < canopy.x + canopy.w + 40 && cy < canopy.y + canopy.h) continue;
    scene.add
      .image(cx, cy, carTex[i % carTex.length])
      .setScale(0.82)
      .setRotation(variant === 0 ? Math.PI : 0)
      .setDepth(4)
      .setTint([0xffffff, 0xfecaca, 0xbfdbfe, 0xfde68a, 0xbbf7d0][i % 5]);
  }

  const truckCount = style === 'rural' ? (mobile ? 4 : 6) : style === 'urban' ? (mobile ? 7 : 11) : mobile ? 5 : 8;
  for (let i = 0; i < truckCount; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const tx = apron.x + apron.w - 180 + col * 70;
    const ty = apron.y + 230 + row * 78;
    if (ty + 36 > aisleTop - 16) continue;
    scene.add.image(tx, ty, 'npc_truck').setScale(0.78).setDepth(4).setTint(i % 2 ? 0xfecaca : 0xe2e8f0);
    buildings.push({ x: tx - 16, y: ty - 36, w: 32, h: 72 });
  }

  const washRect: Rect = { x: apron.x + apron.w - 188, y: apron.y + 148, w: 156, h: 54 };
  g.fillStyle(0x0369a1, 1);
  g.fillRect(washRect.x, washRect.y, washRect.w, washRect.h);
  g.fillStyle(0xbae6fd, 0.85);
  g.fillRect(washRect.x + 8, washRect.y + 14, washRect.w - 16, 8);
  g.fillRect(washRect.x + 8, washRect.y + 30, washRect.w - 16, 8);
  buildings.push(washRect);
  scene.add
    .text(washRect.x + washRect.w / 2, washRect.y + washRect.h / 2, 'LKW-WÄSCHE', {
      fontFamily: 'monospace',
      fontSize: '10px',
      fontStyle: 'bold',
      color: '#f8fafc'
    })
    .setOrigin(0.5)
    .setDepth(5);

  if (style === 'urban') {
    const skyline = skylineForStation(station);
    const mark = scene.add.graphics().setDepth(3);
    if (skyline === 'koeln_dom') drawKoelnDom(mark, worldW * 0.46, 250);
    else if (skyline === 'hermesturm') {
      drawHermes(mark, worldW * 0.62, 120);
      drawRathaus(mark, worldW * 0.42, 150);
    } else if (skyline) {
      scene.add.image(worldW * 0.5, 120, `landmark_${skyline}`).setScale(3.4).setDepth(3);
    } else {
      g.fillStyle(0x334155, 1);
      g.fillRect(worldW * 0.4, 70, 28, 70);
      g.fillRect(worldW * 0.48, 50, 18, 90);
      g.fillRect(worldW * 0.55, 80, 36, 60);
    }
    scene.add
      .text(worldW * 0.5, 30, 'STADTRAND', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#e2e8f0',
        backgroundColor: 'rgba(15,23,42,0.7)',
        padding: { x: 4, y: 2 }
      })
      .setOrigin(0.5)
      .setDepth(4);
  }

  g.fillStyle(0x1d4ed8, 1);
  g.fillRect(250, 188, Math.min(420, station.name.length * 7 + 24), 28);
  scene.add
    .text(260, 202, station.name, {
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#ffffff'
    })
    .setOrigin(0, 0.5)
    .setDepth(5);

  const lamps = [
    { x: apron.x + 40, y: apron.y + 20 },
    { x: apron.x + apron.w / 2, y: apron.y + 20 },
    { x: apron.x + apron.w - 40, y: apron.y + 20 },
    { x: apron.x + 40, y: aisleTop + 20 },
    { x: canopy.x + 20, y: canopy.y },
    { x: canopy.x + canopy.w - 20, y: canopy.y }
  ];

  const aisleY = aisleTop + 70;
  const laneX = 270;
  const liteCars: LiteAgent[] = [
    {
      tex: 'npc_sedan_blue',
      wps: [
        { x: laneX, y: 360 },
        { x: laneX, y: aisleY },
        { x: apron.x + apron.w - 280, y: aisleY },
        { x: laneX, y: aisleY }
      ],
      speed: 70
    }
  ];
  if (!mobile) {
    liteCars.push({
      tex: 'npc_compact_green',
      wps: [
        { x: apron.x + 480, y: aisleY },
        { x: apron.x + apron.w - 300, y: aisleY }
      ],
      speed: 54
    });
  }
  const litePeds: LiteAgent[] = [
    {
      tex: 'ped_adult_0',
      wps: [
        { x: food.x - 16, y: food.y + food.h + 16 },
        { x: food.x + food.w + 20, y: food.y + food.h + 16 }
      ],
      speed: 26
    }
  ];
  if (!mobile) {
    litePeds.push({
      tex: 'ped_adult_1',
      wps: [
        { x: canopy.x, y: canopy.y + canopy.h + 16 },
        { x: canopy.x + canopy.w, y: canopy.y + canopy.h + 16 }
      ],
      speed: 24
    });
  }

  const trees =
    style === 'rural'
      ? [
          { x: 80, y: 220 },
          { x: 120, y: 860 },
          { x: worldW - 80, y: 860 },
          { x: worldW - 60, y: 240 }
        ]
      : [
          { x: 40, y: 900 },
          { x: worldW - 40, y: 940 }
        ];

  return {
    worldW,
    worldH,
    autohof: true,
    cityId: `autohof-${style}-${variant}`,
    grass: [{ x: 0, y: 0, w: worldW, h: worldH }],
    asphalt,
    buildings,
    trees: mobile ? trees.slice(0, 3) : trees,
    lamps: mobile ? lamps.slice(0, 4) : lamps,
    neons,
    zebras: [],
    targetZone,
    zoneLabel: `↺ RÜCKWÄRTS\n${station.maxKw} kW`,
    zoneColor: 0x22c55e,
    passThrough: false,
    pillar,
    spawn: { x: laneX, y: 96, rot: Math.PI },
    spinners,
    liteCars,
    litePeds,
    previewPoint: { x: 48, y: apron.y + apron.h - 78, rot: Math.PI / 2 }
  };
}
