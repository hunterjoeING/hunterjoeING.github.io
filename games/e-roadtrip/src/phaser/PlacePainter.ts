import * as Phaser from 'phaser';
import { ChargerStation, CityDrivePreset, type PassName } from '../types';
import { ALPINE_PASS_PRESET } from '../sim/AlpineDriving';
import { paintAlpinePass, type PassRoad } from './AlpinePass';
import { aachenCityDrive, isAachenCity } from '../sim/AachenCity';
import { isRegionalCity, regionalCityDrive } from '../sim/RegionalCity';
import { regionalLandmarkArt } from './RegionalCityLandmarks';
import { mappedCityNavigator, mappedRoadSpans } from '../sim/MappedCity';
import { aachenLandmarkFootprint, drawAachenLandmark } from './AachenLandmarks';
import { paintMappedCity } from './MappedCityPainter';
import { isWinterCity } from '../sim/WinterCity';
import type { CityPoint, CityRect, CitySignal, MappedCityRoad } from '../data/cityLayouts/types';
import { paintWinterCity } from './WinterCityPainter';
import { ChargingBay } from '../sim/ChargingBay';
import { PedestrianZebraLink, ZebraCrosswalk } from './CityTraffic';
import { TrafficRoute, laneCenter, trafficRoute } from './CityLanes';
import {
  BISTRO_KIOSK, CAR_FOOTPRINT, CAR_SIZE, CHARGER_FOOTPRINT, CHARGER_SIZE,
  MCD_KIOSK, TRUCK_FOOTPRINT, TRUCK_SIZE, WHEEL_STOP_SIZE, spriteFootprint
} from './CityCollision';
import { Rect, classifyAutohof, hashString, skylineForStation } from './PlaceStyles';

export interface NeonMark {
  x: number;
  y: number;
  roadX: number;
  roadY: number;
  color: number;
  phase: number;
  flicker?: boolean;
}

interface LitePedestrian {
  tex: string;
  wps: Array<{ x: number; y: number }>;
  speed: number;
  zebraLink?: PedestrianZebraLink;
}

type CityNavigator = (point: CityPoint) => { aim: CityPoint; distance: number };

export interface PlacePaint {
  worldW: number;
  worldH: number;
  autohof: boolean;
  cityId: string;
  grass: Rect[];
  asphalt: Rect[];
  buildings: Rect[];
  water?: CityRect[];
  trees: Array<{ x: number; y: number }>;
  lamps: Array<{ x: number; y: number }>;
  neons: NeonMark[];
  zebras: ZebraCrosswalk[];
  targetZone: Phaser.Geom.Rectangle;
  zoneLabel?: string;
  zoneColor?: number;
  passThrough: boolean;
  passRoad?: PassRoad;
  cityGuide?: {
    label: string;
    completionLabel: string;
    snow?: boolean;
    cones: CityPoint[];
    wrongExits: Array<CityPoint & { label: string; zone: CityRect }>;
    navigate: CityNavigator;
    approach?: { goal: CityPoint; label: string; navigate: CityNavigator };
  };
  cityMinimap?: MappedCityRoad[];
  signals?: CitySignal[];
  roadSurface?: (point: CityPoint) => boolean;
  slowZone?: (point: CityPoint) => boolean;
  chargingBays?: PaintedChargingBay[];
  parkedVehicles?: Rect[];
  spawn: { x: number; y: number; rot: number };
  spinners: Phaser.GameObjects.Image[];
  traffic: TrafficRoute[];
  trafficJunctions: Rect[];
  litePeds?: LitePedestrian[];
  previewPoint?: { x: number; y: number; rot: number };
}

export interface PaintedChargingBay extends ChargingBay {
  parkedCar: boolean;
  occupied: boolean;
  marker: Phaser.GameObjects.Rectangle;
}

export function setBayOccupied(bay: PaintedChargingBay, occupied: boolean): void {
  bay.occupied = occupied;
  const color = occupied ? 0xf87171 : 0x22c55e;
  bay.marker.setFillStyle(color, occupied ? 0.14 : 0.24).setStrokeStyle(2, color, 0.95);
}

export function paintDrivingPlace(
  scene: Phaser.Scene,
  opts: { preset: CityDrivePreset; station?: ChargerStation; mobile: boolean; passName?: PassName; light?: boolean; routeId?: string; levelOrder?: number; night?: boolean }
): PlacePaint {
  const routeId = opts.routeId ?? '';
  const aachen = isAachenCity(opts.preset) ? aachenCityDrive(opts.preset, opts.levelOrder ?? 1, routeId) : undefined;
  const regional = isRegionalCity(opts.preset) ? regionalCityDrive(opts.preset, routeId) : undefined;
  const drive = aachen ?? regional;
  if (drive) {
    const art = aachen ? { footprint: aachenLandmarkFootprint, draw: drawAachenLandmark } : regionalLandmarkArt;
    const place = paintMappedCity(scene, drive.layout, art, {
      light: !!opts.light, mobile: opts.mobile, night: !!opts.night || opts.preset === 'aachen_finish',
      signedExit: drive.exitPoint, signLabel: drive.signLabel
    });
    const { x, y, w, h } = drive.target;
    return {
      ...place, autohof: false, passThrough: drive.passThrough, spawn: drive.spawn, spinners: [],
      targetZone: new Phaser.Geom.Rectangle(x, y, w, h),
      zoneLabel: aachen ? (aachen.passThrough ? aachen.motorway : 'Zuhause') : regional?.zoneLabel,
      zoneColor: regional?.zoneColor ?? 0x86efac,
      cityGuide: {
        label: drive.navLabel, completionLabel: drive.completionLabel,
        cones: drive.layout.cones, wrongExits: drive.wrongExits,
        navigate: mappedCityNavigator(mappedRoadSpans(drive.layout.roads), drive.goal)
      }
    };
  }
  if (isWinterCity(opts.preset)) return paintWinterCity(scene, opts.preset, routeId, !!opts.light, opts.mobile);
  if (opts.preset === ALPINE_PASS_PRESET) return paintAlpinePass(scene, opts.passName ?? 'Zirler Berg', !!opts.light);
  if (opts.preset === 'charger_park' && opts.station) return paintAutohof(scene, opts.station, opts.mobile);
  throw new Error(`Missing driving layout or charging station for ${opts.preset}`);
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

  const motorway = { x: 0, y: 48, w: worldW, h: 128 };
  fillAsphalt(motorway, 0x1e293b);
  g.fillStyle(0xf8fafc, 0.85);
  g.fillRect(0, 58, worldW, 3);
  g.fillRect(0, 164, worldW, 3);
  for (let x = 20; x < worldW; x += 46) g.fillRect(x, 108, 22, 3);
  g.fillStyle(0x94a3b8, 1);
  g.fillRect(0, 44, worldW, 4);
  g.fillRect(0, 176, worldW, 4);

  const spur = { x: apron.x + 12 + variant * 4, y: 160, w: 104, h: apron.y - 148 };
  fillAsphalt(spur);
  fillAsphalt(apron, 0x0f172a);
  g.fillStyle(0x334155, 1);
  g.fillRect(apron.x + 8, apron.y + 8, apron.w - 16, 10);
  g.fillStyle(0xf8fafc, 0.65);
  for (let y = 174; y < apron.y + 6; y += 32) g.fillRect(spur.x + spur.w / 2 - 1, y, 3, 16);

  const foodOnEast = variant === 1;
  const food: Rect = foodOnEast
    ? { x: apron.x + apron.w - 250, y: apron.y + 36, w: 150, h: 90 }
    : { x: apron.x + 150, y: apron.y + 36, w: 150, h: 90 };
  const foodX = food.x + food.w / 2;
  const foodY = food.y + food.h / 2;
  const kiosk = station.hasMcDonalds ? MCD_KIOSK : BISTRO_KIOSK;
  const kioskScale = 1.45;
  scene.add.image(foodX, foodY, station.hasMcDonalds ? 'mcd_kiosk' : 'bistro_kiosk').setScale(kioskScale).setDepth(4);
  buildings.push(spriteFootprint(foodX, foodY, kiosk.size, kiosk.footprint, kioskScale));
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

  const aisleTop = apron.y + apron.h - 150;
  const layoutCapacity = style === 'rural' ? 4 : style === 'urban' ? (mobile ? 6 : 8) : 6;
  const bayCount = Math.min(station.stalls, layoutCapacity);
  const rowX = apron.x + (variant === 2 ? 430 : 340);
  const indices = Array.from({ length: bayCount }, (_, i) => i);
  const freeCount = Math.max(Math.min(2, bayCount), Math.round(bayCount * (1 - station.occupancyRisk)));
  const occupiedBays = new Set(indices
    .map(index => ({ index, order: hashString(`${station.id}:stall:${index}`) }))
    .sort((a, b) => a.order - b.order)
    .slice(0, bayCount - freeCount)
    .map(({ index }) => index));
  const npcBay = bayCount > 1 ? indices.find(i => !occupiedBays.has(i)) : undefined;
  const chargingBays: PaintedChargingBay[] = [];
  const parkedVehicles: Rect[] = [];
  for (let i = 0; i < bayCount; i++) {
    const bx = rowX + i * 58;
    const by = aisleTop - 78;
    const pillar = { x: bx + 23, y: by + 4 };
    const marker = scene.add.rectangle(bx + 23, by + 34, 46, 68).setDepth(3);
    const parkedCar = occupiedBays.has(i);
    const bay = { bounds: { x: bx, y: by, w: 46, h: 68 }, pillar, parkedCar, occupied: parkedCar, marker };
    chargingBays.push(bay);
    setBayOccupied(bay, parkedCar);
    scene.add.image(bx + 23, by + 8, 'wheel_stop').setDepth(4);
    buildings.push({ x: bx + 23 - WHEEL_STOP_SIZE.w / 2, y: by + 8 - WHEEL_STOP_SIZE.h / 2, ...WHEEL_STOP_SIZE });
    scene.add.image(pillar.x, pillar.y, `charger_${station.network}`).setScale(1.12).setDepth(5);
    scene.add.image(pillar.x, pillar.y - 10, `stall_badge_${station.network}`).setDepth(5.1);
    buildings.push(spriteFootprint(pillar.x, pillar.y, CHARGER_SIZE, CHARGER_FOOTPRINT, 1.12));
    if (parkedCar) {
      const parked = ['npc_sedan_blue', 'npc_compact_green', 'npc_van_white', 'npc_fast_red', 'npc_fast_black'];
      scene.add
        .image(bx + 23, by + 40, parked[i % parked.length])
        .setScale(0.78)
        .setRotation(Math.PI)
        .setDepth(5);
      parkedVehicles.push(spriteFootprint(bx + 23, by + 40, CAR_SIZE, CAR_FOOTPRINT, 0.78));
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
    parkedVehicles.push(spriteFootprint(cx, cy, CAR_SIZE, CAR_FOOTPRINT, 0.82));
  }

  const truckCount = style === 'rural' ? (mobile ? 4 : 6) : style === 'urban' ? (mobile ? 7 : 11) : mobile ? 5 : 8;
  for (let i = 0; i < truckCount; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const tx = apron.x + apron.w - 180 + col * 70;
    const ty = apron.y + 240 + row * 78;
    if (ty + 36 > aisleTop - 16) continue;
    scene.add.image(tx, ty, 'npc_truck').setScale(0.78).setDepth(4).setTint(i % 2 ? 0xfecaca : 0xe2e8f0);
    parkedVehicles.push(spriteFootprint(tx, ty, TRUCK_SIZE, TRUCK_FOOTPRINT, 0.78));
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

  const aisle = { x: spur.x, y: aisleTop + 12, w: apron.x + apron.w - spur.x, h: 128 };
  g.fillStyle(0xf8fafc, 0.36);
  for (let x = aisle.x + spur.w + 12; x < aisle.x + aisle.w - 34; x += 38) {
    g.fillRect(x, aisle.y + aisle.h / 2, 18, 2);
  }
  const inboundX = laneCenter(spur, 'ns', 1);
  const outboundX = laneCenter(spur, 'ns', -1);
  const eastbound = laneCenter(motorway, 'ew', 1);
  const westbound = laneCenter(motorway, 'ew', -1);
  const aisleEast = laneCenter(aisle, 'ew', 1);
  const aisleWest = laneCenter(aisle, 'ew', -1);
  const traffic = [trafficRoute('npc_compact_green', 78, [
    { x: worldW + 60, y: westbound }, { x: worldW - 80, y: westbound, spawn: true },
    { x: -60, y: westbound }
  ])];
  const trafficJunctions = [
    { x: spur.x - 30, y: motorway.y + motorway.h / 2, w: spur.w + 60, h: 96 },
    { x: spur.x, y: aisle.y, w: spur.w + 42, h: aisle.h }
  ];
  if (npcBay !== undefined) {
    const bay = chargingBays[npcBay];
    const bayX = bay.pillar.x;
    const bayY = bay.bounds.y + bay.bounds.h / 2;
    const turnY = aisle.y + aisle.h - 6;
    traffic.unshift(trafficRoute('npc_sedan_blue', 62, [
      { x: -60, y: eastbound }, { x: 74, y: eastbound, spawn: true },
      { x: inboundX, y: eastbound }, { x: inboundX, y: aisleEast },
      { x: bayX, y: aisleEast }, { x: bayX, y: turnY },
      { x: bayX, y: bayY, reverse: true, park: true },
      { x: bayX, y: aisleWest }, { x: outboundX, y: aisleWest },
      { x: outboundX, y: eastbound }, { x: worldW + 60, y: eastbound }
    ], { holdSec: 8 }));
    trafficJunctions.push({ x: bayX - 20, y: bayY - 22, w: 40, h: turnY - bayY + 44 });
  }
  const litePeds: LitePedestrian[] = [
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
    targetZone: new Phaser.Geom.Rectangle(rowX, aisleTop - 78, bayCount * 58, 68),
    passThrough: false,
    chargingBays,
    parkedVehicles,
    spawn: { x: apron.x + 130, y: apron.y + 52, rot: Math.PI },
    spinners,
    traffic,
    trafficJunctions,
    litePeds,
    previewPoint: { x: 48, y: apron.y + apron.h - 78, rot: Math.PI / 2 }
  };
}
