import * as Phaser from 'phaser';
import type { PassName } from '../types';
import type { Capsule, Point } from './CityCollision';
import type { TrafficRoute } from './CityLanes';
import type { PlacePaint } from './PlacePainter';

export const PASS_HALF_WIDTH = 68;
const LANE_OFFSET = 33;
const CURVE_RADIUS = 106;
const SAMPLE_SPACING = 24;

interface RoadPoint extends Point {
  dx: number;
  dy: number;
  alongPx: number;
}

export interface PassRoad {
  path: RoadPoint[];
  ice: ReadonlyArray<readonly [number, number]>;
}

function offset(point: RoadPoint, distance: number): Point {
  return { x: point.x - point.dy * distance, y: point.y + point.dx * distance };
}

export function buildPassRoad(name: PassName): PassRoad {
  const path: RoadPoint[] = [];
  const mirrored = name === 'Achenpass' ? -1 : 1;
  let marker = 0;
  const add = (x: number, y: number, dx: number, dy: number) => {
    const prev = path[path.length - 1];
    x = mirrored === -1 ? 1800 - x : x;
    marker += prev ? Math.hypot(x - prev.x, y - prev.y) : 0;
    path.push({ x, y, dx: dx * mirrored, dy, alongPx: marker });
  };
  const left = name === 'Achenpass' ? 310 : 290;
  const right = name === 'Achenpass' ? 1440 : 1510;
  let y = 846;
  let x = 155;
  add(x, y, 1, 0);

  for (let row = 0; row < 4; row++) {
    const direction = row % 2 === 0 ? 1 : -1;
    const end = row === 3 ? 155 : direction === 1 ? right : left;
    const steps = Math.ceil(Math.abs(end - x) / SAMPLE_SPACING);
    for (let i = 1; i <= steps; i++) add(x + (end - x) * i / steps, y, direction, 0);
    if (row === 3) break;
    for (let i = 1; i <= 16; i++) {
      const angle = Math.PI * i / 16;
      add(end + direction * CURVE_RADIUS * Math.sin(angle), y - CURVE_RADIUS * (1 - Math.cos(angle)),
        direction * Math.cos(angle), -Math.sin(angle));
    }
    x = end;
    y -= CURVE_RADIUS * 2;
  }

  const ice = name === 'Achenpass'
    ? [[0.14, 0.18], [0.36, 0.41], [0.63, 0.69], [0.80, 0.84]] as const
    : [[0.19, 0.24], [0.43, 0.48], [0.67, 0.72], [0.86, 0.90]] as const;
  const nearestMarker = (fraction: number) =>
    path.find(point => point.alongPx >= fraction * marker)!.alongPx;
  return { path, ice: ice.map(([start, end]) => [nearestMarker(start), nearestMarker(end)]) };
}

export function passRoadPosition({ path }: PassRoad, { x, y }: Point) {
  let distanceSq = Infinity;
  let along = 0;
  let side = 0;
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1];
    const b = path[i];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = b.alongPx - a.alongPx;
    const t = Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / (length * length)));
    const ox = x - a.x - t * dx;
    const oy = y - a.y - t * dy;
    const d2 = ox * ox + oy * oy;
    if (d2 >= distanceSq) continue;
    distanceSq = d2;
    along = a.alongPx + t * length;
    side = (-dy * ox + dx * oy) / length;
  }
  return { distanceSq, along, side };
}

export function passRoadContains(road: PassRoad, { a, b, radius }: Capsule): boolean {
  const maxDistanceSq = (PASS_HALF_WIDTH - radius) ** 2;
  const center = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  return [a, center, b].every(point => passRoadPosition(road, point).distanceSq <= maxDistanceSq);
}

export function passOnIce(road: PassRoad, point: Point): boolean {
  const { along, side } = passRoadPosition(road, point);
  return Math.abs(side) <= PASS_HALF_WIDTH && road.ice.some(([start, end]) => along >= start && along <= end);
}

export function passNavigation(road: PassRoad, point: Point) {
  const { along } = passRoadPosition(road, point);
  const ahead = road.path.find(sample => sample.alongPx >= along + 80) ?? road.path[road.path.length - 1];
  const finish = road.path[road.path.length - 4];
  return { aim: offset(ahead, LANE_OFFSET), distance: Math.max(0, finish.alongPx - along) };
}

export function paintAlpinePass(scene: Phaser.Scene, name: PassName, light: boolean): PlacePaint {
  const worldW = 1800;
  const worldH = 1040;
  const road = buildPassRoad(name);
  const { path } = road;
  const g = scene.add.graphics().setDepth(0);
  g.fillStyle(light ? 0xe0ecf3 : 0x8ea9c2).fillRect(0, 0, worldW, worldH);
  for (let y = 8; y < worldH; y += 42) {
    for (let x = 8; x < worldW; x += 57) {
      const mark = ((x * 13) ^ (y * 29)) >>> 0;
      if (mark % 4 === 0) g.fillStyle(0xf8fbff, 0.38).fillRect(x, y, 8 + mark % 25, 3);
      if (mark % 9 !== 0) continue;
      const shades = mark % 2 === 0 ? [0x3f627a, 0x587c93] : [0x536879, 0x74899c];
      g.fillStyle(shades[0]).fillRect(x - 7, y + 8, 38, 14);
      g.fillStyle(shades[1]).fillRect(x, y, 24, 15);
      g.fillStyle(0xf1f7fb).fillRect(x, y, 22, 5);
    }
  }

  for (const [width, color] of [
    [PASS_HALF_WIDTH * 2 + 32, 0xa9c4d8], [PASS_HALF_WIDTH * 2 + 18, 0xeaf5fc], [PASS_HALF_WIDTH * 2, 0x384656]
  ]) {
    g.fillStyle(color).fillCircle(path[0].x, path[0].y, width / 2);
    g.fillCircle(path[path.length - 1].x, path[path.length - 1].y, width / 2);
    g.lineStyle(width, color).strokePoints(path);
  }

  for (const [start, end] of road.ice) {
    const patch = path.filter(p => p.alongPx >= start && p.alongPx <= end);
    g.lineStyle(PASS_HALF_WIDTH * 2 - 6, 0x6394ab).strokePoints(patch);
    patch.forEach((p, i) => {
      const glint = offset(p, ((i * 17) % 80) - 40);
      g.fillStyle(0xb8e1f2, 0.75).fillRect(Math.round(glint.x), Math.round(glint.y), 9 + i % 8, 3);
    });
  }

  for (const side of [-1, 1]) {
    g.lineStyle(4, 0x64748b).strokePoints(path.map(p => offset(p, side * (PASS_HALF_WIDTH + 1))));
    g.lineStyle(2, 0xc5d2dd).strokePoints(path.map(p => offset(p, side * (PASS_HALF_WIDTH - 1))));
    path.forEach((p, i) => {
      if (i % 3 !== 0) return;
      const post = offset(p, side * (PASS_HALF_WIDTH + 2));
      g.fillStyle(0xf8fafc).fillRect(post.x - 4, post.y - 5, 8, 10);
      g.fillStyle(0xdc3d50).fillRect(post.x - 3, post.y - 3, 6, 3);
    });
  }
  g.lineStyle(3, 0xf2e9d7, 0.85);
  for (let i = 1; i < path.length; i += 2) g.lineBetween(path[i - 1].x, path[i - 1].y, path[i].x, path[i].y);

  const start = path[4];
  const finish = path[path.length - 4];
  const targets = [...path].reverse().map(p => offset(p, -LANE_OFFSET));
  const traffic: TrafficRoute[] = [
    { tex: 'npc_sedan_blue', speed: 104, startIndex: 4, path: targets },
    { tex: 'npc_van_white', speed: 91, startIndex: Math.floor(targets.length * 0.48), path: targets },
    { tex: 'npc_compact_green', speed: 98, startIndex: Math.floor(targets.length * 0.73), path: targets }
  ];
  const trees = [];
  for (let y = 85; y < 1010; y += 84) {
    for (let x = 75; x < 1760; x += 115) {
      const point = { x: x + ((y * 13 + x) % 38), y };
      if (passRoadPosition(road, point).distanceSq > (PASS_HALF_WIDTH + 48) ** 2) trees.push(point);
    }
  }
  return {
    worldW, worldH, cityId: 'alpine_pass', autohof: false, passThrough: true, passRoad: road,
    grass: [], asphalt: [], buildings: [], trees, lamps: [], neons: [], zebras: [],
    spawn: { ...offset(start, LANE_OFFSET), rot: Math.atan2(start.dy, start.dx) + Math.PI / 2 },
    targetZone: new Phaser.Geom.Rectangle(finish.x - 24, finish.y - PASS_HALF_WIDTH, 48, PASS_HALF_WIDTH * 2),
    zoneLabel: 'Passhöhe', zoneColor: 0x4ade80, spinners: [], traffic, trafficJunctions: []
  };
}
