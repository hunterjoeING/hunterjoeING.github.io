import * as Phaser from 'phaser';
import type { PassName } from '../types';
import type { Capsule, Point } from './CityCollision';
import type { PlacePaint } from './PlacePainter';
import { buildPassRoad, passOvertake, type PassLayout } from '../sim/AlpineHazards';
import { PASS_HALF_WIDTH, PASS_LANE_OFFSET, passOffset, passRoadPosition, passSample } from '../sim/AlpineRoad';
import { cityTravelLaneSpans, placeOnTravelLane } from '../sim/MappedCity';

export type PassRoad = PassLayout;

export function passRoadContains(road: PassRoad, { a, b, radius }: Capsule): boolean {
  const maxDistanceSq = (PASS_HALF_WIDTH - radius) ** 2;
  const center = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  return [a, center, b].every(point => passRoadPosition(road, point).distanceSq <= maxDistanceSq);
}

export function passNavigation(road: PassRoad, point: Point) {
  const { along } = passRoadPosition(road, point);
  const finish = road.path[road.path.length - 4];
  return { aim: passOffset(passSample(road, along + 80), PASS_LANE_OFFSET), along,
    distance: Math.max(0, finish.alongPx - along) };
}

export function paintAlpinePass(scene: Phaser.Scene, name: PassName, light: boolean, seed: number): PlacePaint {
  const worldW = 1800;
  const road = buildPassRoad(name, seed);
  const { path, worldH } = road;
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

  for (const { center, vertices } of road.ice) {
    g.fillStyle(light ? 0x81c6e6 : 0x72b5d8, 0.49).fillPoints(vertices, true);
    g.lineStyle(1.5, 0xc2ebfa, 0.65).strokePoints(vertices, true);
    g.lineStyle(2, 0xecfbff, 0.66);
    for (const i of [0, 2, 7]) {
      const p = vertices[i];
      g.lineBetween(center.x + (p.x - center.x) * 0.27, center.y + (p.y - center.y) * 0.27,
        center.x + (p.x - center.x) * 0.57, center.y + (p.y - center.y) * 0.57);
    }
  }

  for (const side of [-1, 1]) {
    g.lineStyle(4, 0x64748b).strokePoints(path.map(p => passOffset(p, side * (PASS_HALF_WIDTH + 1))));
    g.lineStyle(2, 0xc5d2dd).strokePoints(path.map(p => passOffset(p, side * (PASS_HALF_WIDTH - 1))));
    path.forEach((p, i) => {
      if (i % 3 !== 0) return;
      const post = passOffset(p, side * (PASS_HALF_WIDTH + 2));
      g.fillStyle(0xf8fafc).fillRect(post.x - 4, post.y - 5, 8, 10);
      g.fillStyle(0xdc3d50).fillRect(post.x - 3, post.y - 3, 6, 3);
    });
  }
  g.lineStyle(3, 0xf2e9d7, 0.85);
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1];
    const b = path[i];
    const { inZone } = passOvertake(road, (a.alongPx + b.alongPx) / 2, []);
    if (!inZone || i % 2 === 0) g.lineBetween(a.x, a.y, b.x, b.y);
  }

  const start = path[4];
  const finish = path[path.length - 4];
  const travelLanes = cityTravelLaneSpans([{ points: path }], false, PASS_LANE_OFFSET);
  if (road.summitPx !== undefined) {
    const summit = passOffset(passSample(road, road.summitPx), -90);
    scene.add.text(summit.x, summit.y, 'Jaufenpass · 2.094 m', {
      fontFamily: 'monospace', fontSize: '16px', color: '#e8f5ff', backgroundColor: '#294a64',
      padding: { x: 8, y: 5 }
    }).setOrigin(0.5).setDepth(2);
  }
  const trees = [];
  for (let y = 85; y < worldH - 30; y += 84) {
    for (let x = 75; x < 1760; x += 115) {
      const point = { x: x + ((y * 13 + x) % 38), y };
      if (passRoadPosition(road, point).distanceSq > (PASS_HALF_WIDTH + 48) ** 2) trees.push(point);
    }
  }
  return {
    worldW, worldH, cityId: 'alpine_pass', autohof: false, passThrough: true, passRoad: road,
    grass: [], asphalt: [], buildings: [], trees, lamps: [], neons: [], zebras: [],
    spawn: placeOnTravelLane({ ...start, rot: Math.atan2(start.dx, -start.dy) }, travelLanes),
    travelLanes,
    targetZone: new Phaser.Geom.Rectangle(finish.x - 24, finish.y - PASS_HALF_WIDTH, 48, PASS_HALF_WIDTH * 2),
    zoneLabel: name === 'Jaufenpass' ? 'Passausgang' : 'Passhöhe', zoneColor: 0x4ade80, spinners: [], traffic: [], trafficJunctions: []
  };
}
