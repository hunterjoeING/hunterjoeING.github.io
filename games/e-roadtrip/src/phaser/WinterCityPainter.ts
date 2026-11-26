import * as Phaser from 'phaser';
import type { CityPoint, CityRect, CityTrafficSpec, WinterCityLayout } from '../data/cityLayouts/types';
import {
  cityRectsOverlap, cityRoadBounds, cityRoadSpans, type CityRoadSpan, type WinterCityPreset,
  winterCityDrive, winterCityNavigator, winterCityWater
} from '../sim/WinterCity';
import { trafficRoute } from './CityLanes';
import type { PlacePaint } from './PlacePainter';
import { drawWinterLandmark } from './WinterCityLandmarks';

const rect = (x: number, y: number, w: number, h: number): CityRect => ({ x, y, w, h });
const center = (point: CityPoint, size: number) => rect(point.x - size / 2, point.y - size / 2, size, size);

function fill(g: Phaser.GameObjects.Graphics, area: CityRect, color: number, alpha = 1): void {
  g.fillStyle(color, alpha);
  g.fillRect(area.x, area.y, area.w, area.h);
}

function label(scene: Phaser.Scene, point: CityPoint, text: string, sign = false): void {
  scene.add.text(point.x, point.y, text, {
    fontFamily: 'Arial, sans-serif',
    fontSize: sign ? '16px' : '15px',
    fontStyle: 'bold',
    color: '#f4f7fe',
    backgroundColor: sign ? '#174a89' : '#243348',
    padding: { x: 5, y: 3 }
  }).setOrigin(0.5).setDepth(5);
}

function paintWater(g: Phaser.GameObjects.Graphics, layout: WinterCityLayout, light: boolean): void {
  for (const water of layout.water) {
    fill(g, water, light ? 0x5d9aba : 0x376483);
    for (let y = water.y + 6; y + 4 < water.y + water.h; y += 17) {
      for (let x = water.x + 6 + (y % 27); x + 18 < water.x + water.w; x += 51) {
        fill(g, rect(x, y, 18, 3), 0xadd4e1, 0.35);
      }
    }
  }
  for (const island of layout.islands ?? []) {
    fill(g, island, 0xd3e5ef);
    fill(g, rect(island.x + 4, island.y + 4, island.w - 8, island.h - 8), 0xb7c8cc);
  }
}

function paintNordkette(g: Phaser.GameObjects.Graphics, width: number): void {
  for (let x = -60; x < width; x += 190) {
    const top = 32 + (x + 60) % 93;
    const ridge = [{ x, y: 297 }, { x: x + 104, y: top }, { x: x + 156, y: top + 74 },
      { x: x + 232, y: 293 }];
    g.fillStyle(0x7a93af, 1);
    g.fillPoints(ridge, true);
    g.fillStyle(0xb9d0df, 1);
    g.fillPoints([ridge[0], ridge[1], { x: x + 82, y: 297 }], true);
    g.fillStyle(0xe8f1f8, 1);
    g.fillPoints([{ x: x + 67, y: top + 99 }, ridge[1], ridge[2], { x: x + 137, y: top + 114 },
      { x: x + 106, y: top + 71 }, { x: x + 90, y: top + 111 }], true);
  }
  g.lineStyle(2, 0x44546a, 0.9);
  g.lineBetween(1155, 341, 1290, 172);
  g.lineBetween(1162, 341, 1297, 172);
  fill(g, rect(1213, 254, 14, 9), 0xbd444e);
}

function paintRoads(g: Phaser.GameObjects.Graphics, spans: CityRoadSpan[], roads: CityRect[]): void {
  for (const road of roads) {
    fill(g, rect(road.x - 7, road.y - 7, road.w + 14, road.h + 14), 0xe2edf3);
    g.lineStyle(2, 0x8296a6, 0.8);
    g.strokeRect(road.x, road.y, road.w, road.h);
  }
  for (const road of roads) fill(g, road, 0x404f65);

  spans.forEach(({ a, b, kind }, index) => {
    const vertical = a.x === b.x;
    const start = vertical ? Math.min(a.y, b.y) : Math.min(a.x, b.x);
    const end = vertical ? Math.max(a.y, b.y) : Math.max(a.x, b.x);
    const edge = (vertical ? roads[index].w : roads[index].h) / 2 - 7;
    const mark = (offset: number, along: number, length: number, width: number) =>
      vertical ? rect(a.x + offset, along, width, length) : rect(along, a.y + offset, length, width);
    for (let step = start + 8; step + 14 < end; step += 29) {
      const dash = mark(-1, step, 14, 2);
      if (roads.some((road, i) => i !== index && cityRectsOverlap(road, dash))) continue;
      fill(g, dash, kind === 'motorway' ? 0xf0d48c : 0xdce7ed, 0.86);
      fill(g, mark(-edge, step, 19, 4), 0xb0c8d9, 0.64);
      fill(g, mark(edge - 4, step + 4, 17, 4), 0xb0c8d9, 0.64);
    }
  });
}

function paintBlocks(
  g: Phaser.GameObjects.Graphics, layout: WinterCityLayout, keepClear: CityRect[], mobile: boolean
): { buildings: CityRect[]; trees: CityPoint[] } {
  const buildings: CityRect[] = [];
  const trees: CityPoint[] = [];
  const roofs = [0x8c686c, 0x6d7e90, 0x9b826e, 0x6b777a];
  for (let y = 48; y < layout.height - 65; y += 93) {
    for (let x = 60; x < layout.width - 85; x += 103) {
      const seed = (x * 11 + y * 13) % 41;
      const plot = rect(x + seed % 16, y + seed % 17, 61, 43);
      if (keepClear.some(other => cityRectsOverlap(other, rect(plot.x - 11, plot.y - 11, plot.w + 22, plot.h + 22)))) continue;
      if (layout.parks.some(park => cityRectsOverlap(park, plot)) || seed % 5 === 0) {
        if (!mobile || seed % 2 === 0) trees.push({ x: plot.x + 24, y: plot.y + 16 });
        continue;
      }
      if (layout.id === 'innsbruck' && y < 378) continue;
      fill(g, rect(plot.x + 5, plot.y + 8, plot.w, plot.h), 0x546478, 0.46);
      fill(g, plot, roofs[seed % roofs.length]);
      fill(g, rect(plot.x + 2, plot.y, plot.w - 8, 8), 0xdfedf4);
      fill(g, rect(plot.x + 6, plot.y + 15, plot.w - 12, 2), 0xcfdae5, 0.55);
      for (let i = 9; i < plot.w - 6; i += 13) {
        fill(g, rect(plot.x + i, plot.y + plot.h - 10, 6, 4), 0xf6d69c, 0.8);
      }
      buildings.push(plot);
    }
  }
  return { buildings, trees };
}

function paintTraffic({ path, speed, tex, cyclist }: CityTrafficSpec) {
  const lane = cyclist ? 34 : 22;
  const offset = (from: CityPoint, to: CityPoint) => ({
    x: -Math.sign(to.y - from.y) * lane,
    y: Math.sign(to.x - from.x) * lane
  });
  const lanePath = path.map((point, index) => {
    const before = path[index - 1] && offset(path[index - 1], point);
    const after = path[index + 1] && offset(point, path[index + 1]);
    return { x: point.x + (before?.x || after?.x || 0), y: point.y + (before?.y || after?.y || 0) };
  });
  return trafficRoute(tex, speed, lanePath, { isCyclist: cyclist });
}

export function paintWinterCity(
  scene: Phaser.Scene, preset: WinterCityPreset, routeId: string, light: boolean, mobile: boolean
): PlacePaint {
  const drive = winterCityDrive(preset, routeId);
  const { layout } = drive;
  const { width, height } = layout;
  const spans = cityRoadSpans(layout.roads);
  const streets = spans.map(cityRoadBounds);
  const asphalt = [...streets, drive.target];
  const canvas = rect(0, 0, width, height);
  const g = scene.add.graphics().setDepth(0);
  fill(g, canvas, light ? 0xc6d8df : 0x869eb2);
  for (const park of layout.parks) fill(g, park, light ? 0xb9d1ca : 0x789b98);
  if (layout.id === 'innsbruck') paintNordkette(g, width);
  paintWater(g, layout, light);
  paintRoads(g, spans, streets);
  if (!drive.passThrough) {
    fill(g, drive.target, 0x414f61);
    for (let x = drive.target.x + 14; x < drive.target.x + drive.target.w - 5; x += 29) {
      fill(g, rect(x, drive.target.y + 67, 2, 24), 0xf1f5f9, 0.72);
    }
  }
  const keepClear = [
    ...asphalt, ...layout.water,
    ...Object.values(layout.landmarks).map(point => center(point, point.art === 'airport' ? 216 : 100)),
    ...Object.values(layout.signs).map(point => center(point, 96)),
    ...layout.peds.flatMap(({ wps }) => wps.slice(1).map((b, index) => cityRoadBounds({ a: wps[index], b, kind: 'street' })))
  ];
  const { buildings, trees } = paintBlocks(g, layout, keepClear, mobile);
  if (layout.id === 'innsbruck') buildings.push(rect(0, 0, width, 268));
  for (const point of Object.values(layout.landmarks)) {
    buildings.push(drawWinterLandmark(g, point));
    const labelOffset = point.art === 'airport' ? 23 : 36;
    label(scene, { x: point.x, y: point.y + labelOffset }, point.label);
  }
  const munich = preset === 'muenchen_start';
  for (const sign of Object.values(layout.signs)) {
    if (munich && sign === drive.goal) continue;
    label(scene, { x: sign.x, y: sign.y - (munich ? 59 : 76) }, sign.label, true);
  }
  if (munich) {
    label(scene, { x: 945, y: 240 }, 'A99 · Autobahnring', true);
    label(scene, { x: 615, y: 425 }, 'B2R · Mittlerer Ring', true);
    label(scene, { x: 1190, y: 680 }, 'Altstadtring');
    label(scene, { x: 1515, y: 782 }, 'Isar');
    label(scene, { x: 643, y: 1415 }, 'Luise-Kiesselbach-Platz');
    label(scene, { x: 1825, y: 1420 }, 'Ramersdorf');
  } else {
    label(scene, { x: 950, y: 1240 }, 'A12 · Inntalautobahn', true);
    label(scene, { x: 912, y: 622 }, 'Inn');
    label(scene, { x: 1745, y: 1035 }, 'Sill');
    label(scene, { x: 1090, y: 1137 }, 'Maria-Theresien-Straße');
  }
  const lamps = munich
    ? [{ x: 1060, y: 956 }, { x: 1195, y: 850 }, { x: 1350, y: 958 }, { x: 835, y: 851 }, { x: 1788, y: 1281 }]
    : [{ x: 1050, y: 899 }, { x: 1143, y: 954 }, { x: 1559, y: 910 }, { x: 2162, y: 1010 }];

  return {
    worldW: width, worldH: height, autohof: false, cityId: layout.id,
    grass: [canvas], asphalt, buildings: [...buildings, ...winterCityWater(layout, asphalt)],
    trees, lamps, neons: [], zebras: [], targetZone: new Phaser.Geom.Rectangle(
      drive.target.x, drive.target.y, drive.target.w, drive.target.h
    ),
    zoneLabel: drive.label.replace(' · ', '\n'), zoneColor: 0x86efac, passThrough: drive.passThrough,
    spawn: drive.spawn, spinners: [], traffic: layout.traffic.map(paintTraffic), trafficJunctions: [],
    litePeds: layout.peds,
    cityGuide: {
      snow: true, completionLabel: 'Auffahrt erreicht · Gute Fahrt!',
      label: drive.passThrough ? drive.label : 'Zum Hotelparkplatz', cones: layout.cones, wrongExits: drive.wrongExits,
      navigate: winterCityNavigator(spans, drive.goal),
      approach: drive.via && { goal: drive.via, label: drive.spawn.label, navigate: winterCityNavigator(spans, drive.via) }
    }
  };
}
