import * as Phaser from 'phaser';
import type { CityLandmark, CityPoint, CityRect, MappedCityLayout } from '../data/cityLayouts/types';
import { mappedCityLane, mappedCityWater, mappedCrosswalk, mappedRoadContains, mappedRoadSpans, type MappedRoadSpan } from '../sim/MappedCity';
import { cityRectsOverlap, pointInCityRect } from '../sim/WinterCity';
import { trafficRoute } from './CityLanes';
import type { PlacePaint } from './PlacePainter';

type Graphics = Phaser.GameObjects.Graphics;

interface LandmarkArt {
  footprint(feature: CityLandmark): CityRect | undefined;
  draw(g: Graphics, feature: CityLandmark, night: boolean): void;
}

const rectangle = (x: number, y: number, w: number, h: number) => new Phaser.Geom.Rectangle(x, y, w, h);
const fill = (g: Graphics, { x, y, w, h }: CityRect, color: number, alpha = 1) =>
  g.fillStyle(color, alpha).fillRect(x, y, w, h);

function caption(scene: Phaser.Scene, point: CityPoint, text: string, style: 'place' | 'landmark' | 'motorway') {
  scene.add.text(point.x, point.y, text, {
    fontFamily: 'Arial, sans-serif',
    fontSize: style === 'place' ? '15px' : '17px',
    fontStyle: 'bold', color: '#fff8e7',
    align: 'center',
    wordWrap: { width: 230 },
    backgroundColor: style === 'motorway' ? '#174982' : style === 'landmark' ? '#4b342a' : '#303f3a',
    padding: { x: 5, y: 3 }
  }).setOrigin(0.5).setDepth(style === 'motorway' ? 13 : 5);
}

function paintRoads(g: Graphics, spans: MappedRoadSpan[], mobile: boolean) {
  for (const { a, b, road } of spans) {
    g.lineStyle(road.width + 17, 0xb4a494).lineBetween(a.x, a.y, b.x, b.y);
    g.fillStyle(0xb4a494).fillCircle(a.x, a.y, (road.width + 17) / 2);
    g.fillCircle(b.x, b.y, (road.width + 17) / 2);
  }
  for (const { a, b, road, length } of spans) {
    const color = road.cobbled ? 0x86796e : 0x4a4e54;
    g.lineStyle(road.width, color).lineBetween(a.x, a.y, b.x, b.y);
    g.fillStyle(color).fillCircle(a.x, a.y, road.width / 2);
    g.fillCircle(b.x, b.y, road.width / 2);
    const xStep = (b.x - a.x) / length;
    const yStep = (b.y - a.y) / length;
    if (road.cobbled) {
      for (let along = 18; along < length - 12; along += mobile ? 17 : 11) {
        for (let across = -23; across <= 23; across += 14) {
          const x = a.x + xStep * along - yStep * across;
          const y = a.y + yStep * along + xStep * across;
          g.fillStyle((along + across) % 3 ? 0xa69986 : 0x766d65).fillRect(x, y, 7, 3);
        }
      }
    }
  }
  for (const span of spans) {
    const { a, b, road, length } = span;
    if (road.cobbled) continue;
    const dx = (b.x - a.x) / length;
    const dy = (b.y - a.y) / length;
    const otherSpans = spans.filter(other => other !== span);
    const laneMark = road.kind === 'motorway' ? 0xffe9b2 : 0xe4ded1;
    const offsets = road.fourLane ? [-road.width / 4, road.width / 4] : [0];
    for (let at = 32; at < length - 23; at += 35) {
      const mark = { x: a.x + dx * at, y: a.y + dy * at };
      if (mappedRoadContains(otherSpans, mark, -9)) continue;
      for (const offset of offsets) {
        const x = mark.x - dy * offset;
        const y = mark.y + dx * offset;
        g.lineStyle(2, laneMark, 0.75).lineBetween(x, y, x + dx * 17, y + dy * 17);
      }
    }
    if (road.kind === 'motorway') {
      if (road.fourLane) g.lineStyle(3, 0xc4bba6).lineBetween(a.x, a.y, b.x, b.y);
      const edge = road.fourLane ? road.width / 2 - 8 : 42;
      for (const offset of [-edge, edge]) g.lineStyle(2, 0xe4ded1, 0.78)
        .lineBetween(a.x - dy * offset, a.y + dx * offset, b.x - dy * offset, b.y + dx * offset);
    }
  }
}

function paintWater(g: Graphics, areas: CityRect[], light: boolean, mobile: boolean): void {
  for (const area of areas) {
    fill(g, area, light ? 0x659ca7 : 0x47788b);
    const step = mobile ? 110 : 66;
    for (let y = area.y + 4; y + 4 < area.y + area.h; y += 25) {
      for (let x = area.x + 9 + (y * 3 % 43); x + 18 < area.x + area.w; x += step) {
        fill(g, { x, y, w: 14 + (x % 11), h: 2 }, 0xd0e7d8, 0.28);
      }
    }
  }
}

function paintBridges(g: Graphics, spans: MappedRoadSpan[], water: CityRect[]): void {
  for (const { a, b, road } of spans) {
    if (!road.bridge) continue;
    const left = Math.min(a.x, b.x);
    const right = Math.max(a.x, b.x);
    const river = water.find(rect => pointInCityRect({ x: (a.x + b.x) / 2, y: a.y }, rect));
    for (const y of [a.y - road.width / 2, a.y + road.width / 2]) {
      g.lineStyle(5, 0xd3d2c0).lineBetween(left, y, right, y);
      if (road.bridge !== 'cable' || !river) continue;
      for (const x of [river.x - 18, river.x + river.w + 18]) {
        g.lineStyle(2, 0xb3c0b2).lineBetween(x - 67, y, x, y - 38).lineBetween(x, y - 38, x + 67, y);
        g.lineStyle(4, 0xe6dbc4).lineBetween(x, y - 38, x, y + 3);
      }
    }
  }
}

function paintPlots(
  g: Graphics, layout: MappedCityLayout, spans: MappedRoadSpan[], reserved: CityRect[],
  mobile: boolean, night: boolean
): CityRect[] {
  const buildings: CityRect[] = [];
  const roofs = [0xa56453, 0x7a6160, 0xb78362, 0x766f6b, 0xb19a7e, 0x96695a];
  for (let y = 165; y < layout.height - 120; y += 85) {
    for (let x = 130; x < layout.width - 100; x += 96) {
      const seed = (x * 7 + y * 13) % 101;
      const w = 48 + seed % 26;
      const h = 34 + seed % 17;
      const plot = { x: x + seed % 15, y: y + seed % 12, w, h };
      if (reserved.some(area => cityRectsOverlap(area, plot))) continue;
      const center = { x: plot.x + w / 2, y: plot.y + h / 2 };
      const park = layout.parks.some(area => pointInCityRect(center, area));
      const clearance = Math.hypot(w, h) / 2;
      if (mappedRoadContains(spans, center, clearance + 18)) continue;
      const nearRoad = mappedRoadContains(spans, center, 166);
      if (park || !nearRoad || seed % 9 < 2) {
        if ((!mobile || seed % 2 === 0) && ((park && seed % 4 !== 0) || seed % 13 < 2)) {
          const radius = 8 + seed % 12;
          g.fillStyle(0x264d3c, 0.5).fillCircle(center.x + 4, center.y + 5, radius);
          g.fillStyle(park ? 0x507d4d : 0x5a7d4e).fillCircle(center.x, center.y, radius);
          g.fillStyle(0x82a362).fillRect(center.x - radius / 2, center.y - radius / 2, radius, 4);
        }
        continue;
      }
      buildings.push(plot);
      fill(g, { ...plot, x: plot.x + 5, y: plot.y + 7 }, 0x40312e, 0.4);
      fill(g, plot, roofs[seed % roofs.length]);
      fill(g, { ...plot, h: h / 2 }, 0xd3b199, 0.28);
      fill(g, { x: plot.x, y: plot.y + h - 9, w, h: 9 }, 0x635951, 0.68);
      for (let i = 7; i < w - 7; i += mobile ? 18 : 12) {
        g.fillStyle(night && (seed + i) % 4 !== 0 ? 0xffd48c : 0x574c48)
          .fillRect(plot.x + i, plot.y + h - 6, 4, 3);
      }
    }
  }
  return buildings;
}

function ringLamps(spans: MappedRoadSpan[], mobile: boolean): CityPoint[] {
  const spacing = mobile ? 315 : 220;
  return spans.filter(({ road }) => road.kind === 'ring' && !road.oneWay).flatMap(({ a, b, road, length }) => {
    const lamps: CityPoint[] = [];
    const dx = (b.x - a.x) / length;
    const dy = (b.y - a.y) / length;
    const curb = road.width / 2 + 4;
    const count = Math.round(length / spacing);
    for (let i = 0; i < count; i++) {
      const along = length * (i + 0.5) / count;
      lamps.push({ x: a.x + along * dx + dy * curb, y: a.y + along * dy - dx * curb });
    }
    return lamps;
  });
}

/** Bake the static ground layer into camera-cullable textures within mobile GPU limits. */
function bakeCityGround(scene: Phaser.Scene, g: Graphics, width: number, height: number, mobile: boolean) {
  const tileSize = 960;
  const resolution = mobile ? 0.625 : 1;
  g.setScale(resolution);
  for (let y = 0; y < height; y += tileSize) {
    for (let x = 0; x < width; x += tileSize) {
      const w = Math.ceil(Math.min(tileSize, width - x) * resolution);
      const h = Math.ceil(Math.min(tileSize, height - y) * resolution);
      const tile = scene.add.renderTexture(x, y, w, h).setOrigin(0).setScale(1 / resolution).setDepth(0);
      tile.draw(g, -x * resolution, -y * resolution);
      tile.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    }
  }
  g.destroy();
}

export function paintMappedCity(
  scene: Phaser.Scene, layout: MappedCityLayout, art: LandmarkArt,
  options: { light: boolean; mobile: boolean; night: boolean; signedExit?: CityPoint; signLabel?: string }
): Pick<PlacePaint, 'worldW' | 'worldH' | 'cityId' | 'grass' | 'asphalt' | 'roadSurface' | 'buildings' |
  'water' | 'slowZone' | 'trees' | 'lamps' | 'neons' | 'traffic' | 'trafficJunctions' | 'zebras' | 'signals' | 'litePeds' | 'cityMinimap'> {
  const { width, height, landmarks, plazas, parks } = layout;
  const { light, mobile, night } = options;
  const spans = mappedRoadSpans(layout.roads);
  const cobbledSpans = spans.filter(span => span.road.cobbled);
  const ground = { x: 0, y: 0, w: width, h: height };
  const g = scene.add.graphics().setDepth(0);
  fill(g, ground, light ? 0xb7b58b : 0x8f9872);
  for (const park of parks) {
    g.fillStyle(light ? 0x8ca66c : 0x6e8e5d)
      .fillRoundedRect(park.x, park.y, park.w, park.h, 43);
    for (let inset = 25; inset < Math.min(park.w, park.h) / 2 - 35; inset += 24) {
      g.lineStyle(2, 0xc8bd93, 0.34)
        .strokeRoundedRect(park.x + inset, park.y + inset, park.w - 2 * inset, park.h - 2 * inset, 43);
    }
  }
  for (const plaza of plazas) {
    fill(g, plaza, 0xab9e90);
    for (let y = plaza.y + 8; y < plaza.y + plaza.h; y += 12) {
      g.lineStyle(1, 0xd1c1af, 0.7).lineBetween(plaza.x, y, plaza.x + plaza.w, y);
    }
  }
  paintWater(g, layout.water, light, mobile);
  paintRoads(g, spans, mobile);
  paintBridges(g, spans, layout.water);

  const landmarkBounds = Object.values(landmarks).flatMap(spot => art.footprint(spot) ?? []);
  const reserved = [...plazas, ...landmarkBounds, ...layout.water,
    ...layout.roundaboutIslands.map(({ x, y }) => ({ x: x - 120, y: y - 120, w: 240, h: 240 })),
    ...layout.peds.flatMap(({ wps }) => wps.map(({ x, y }) => ({ x: x - 32, y: y - 32, w: 64, h: 64 })))
  ];
  const crossings = layout.crosswalks.map(walk => ({ walk, ...mappedCrosswalk(walk) }));
  for (const { sidewalkPathA, sidewalkPathB } of crossings) {
    for (const { x, y } of [...sidewalkPathA, ...sidewalkPathB]) reserved.push({ x: x - 14, y: y - 14, w: 28, h: 28 });
  }
  const buildings = paintPlots(g, layout, spans, reserved, mobile, night);
  buildings.push(...landmarkBounds);

  for (const { x, y } of layout.roundaboutIslands) {
    g.fillStyle(0xc8b89d).fillCircle(x, y, 80);
    g.fillStyle(0x66885b).fillCircle(x, y, 72);
    g.fillStyle(0x5c6159).fillCircle(x, y, 37);
    g.fillStyle(0x4f8295).fillCircle(x, y, 31);
    g.fillStyle(0x89becc).fillCircle(x, y, 22);
    g.fillStyle(0xd4e3d4).fillRect(x - 3, y - 19, 6, 25);
    buildings.push({ x: x - 48, y: y - 48, w: 96, h: 96 });
  }

  const zebras = crossings.map(({ walk, bounds }) => {
    const ew = walk.axis === 'ew';
    for (let i = 4; i + 7 < walk.width; i += 14) {
      fill(g, { x: bounds.x + (ew ? 4 : i), y: bounds.y + (ew ? i : 4), w: ew ? 28 : 7, h: ew ? 7 : 28 }, 0xfff3dc);
    }
    return { id: walk.id, axis: walk.axis, box: rectangle(bounds.x, bounds.y, bounds.w, bounds.h) };
  });
  for (const feature of Object.values(landmarks)) {
    art.draw(g, feature, night);
    const area = art.footprint(feature);
    caption(scene, feature.caption ?? { x: feature.x, y: area ? area.y + area.h + 15 : feature.y }, feature.label, 'landmark');
  }
  bakeCityGround(scene, g, width, height, mobile);
  for (const sign of Object.values(layout.signs)) {
    const selected = sign === options.signedExit;
    const text = selected ? options.signLabel ?? sign.label : sign.label;
    const x = Math.max(145, Math.min(width - 145, sign.x));
    caption(scene, { x, y: Math.max(18, sign.y - 59) }, text, 'motorway');
  }
  const selectedRoad = spans.find(({ b }) => b === options.signedExit);
  if (selectedRoad && selectedRoad.length >= 140 && options.signLabel) {
    const { a, b } = selectedRoad;
    caption(scene, { x: a.x * 0.65 + b.x * 0.35, y: a.y * 0.65 + b.y * 0.35 - 62 },
      options.signLabel, 'motorway');
  }
  for (const sign of layout.captions) caption(scene, sign, sign.label, sign.motorway ? 'motorway' : 'place');

  return {
    worldW: width, worldH: height, cityId: layout.id, grass: [ground], asphalt: plazas,
    roadSurface: point => mappedRoadContains(spans, point),
    slowZone: point => mappedRoadContains(cobbledSpans, point),
    cityMinimap: layout.roads, signals: layout.signals, water: mappedCityWater(layout, spans),
    buildings, trees: [], lamps: ringLamps(spans, mobile), zebras, trafficJunctions: [],
    neons: night ? Object.values(landmarks).flatMap(({ x, y, nightGlow }, phase) => nightGlow ? [{
      x, y, phase, color: nightGlow.color, roadX: nightGlow.reflection.x, roadY: nightGlow.reflection.y
    }] : []) : [],
    traffic: layout.traffic.map(({ path, speed, tex, cyclist, police }) =>
      trafficRoute(tex, speed, mappedCityLane(path, cyclist ? 21 : 19), { isCyclist: cyclist, isPolice: police })),
    litePeds: [...layout.peds, ...crossings.map(({ walk, sideA, sideB, sidewalkPathA, sidewalkPathB }) => ({
      tex: walk.tex, speed: 32, wps: sidewalkPathA,
      zebraLink: { zebraId: walk.id, sideA, sideB, sidewalkPathA, sidewalkPathB, onSideA: true, crossCooldownSec: 4 }
    }))]
  };
}

export function createCityMinimap(
  scene: Phaser.Scene, roads: MappedCityLayout['roads'], worldW: number, worldH: number, target: CityPoint,
  water: CityRect[] = []
) {
  const width = 83;
  const height = Math.round(width / worldW * worldH);
  const left = (screenWidth: number) => screenWidth - width - 11;
  const px = (x: number) => x * width / worldW;
  const py = (y: number) => y * height / worldH;
  const map = scene.add.graphics().setDepth(22).setScrollFactor(0);
  const marker = scene.add.triangle(0, 0, 0, -3.5, -2.5, 2.5, 2.5, 2.5, 0xffe276)
    .setStrokeStyle(1, 0x15191b).setDepth(22.1).setScrollFactor(0);
  map.fillStyle(0x181f22, 0.87).fillRoundedRect(-3, -3, width + 6, height + 6, 4);
  map.lineStyle(1, 0x747d77).strokeRoundedRect(-3, -3, width + 6, height + 6, 4);
  for (const area of water) fill(map, { x: px(area.x), y: py(area.y), w: px(area.w), h: py(area.h) }, 0x416879);
  for (const road of roads) {
    map.lineStyle(road.kind === 'street' ? 0.8 : 1.5, road.kind === 'motorway' ? 0x86bbd9 : 0xa6a59b);
    for (let i = 1; i < road.points.length; i++) {
      const a = road.points[i - 1];
      const b = road.points[i];
      map.lineBetween(px(a.x), py(a.y), px(b.x), py(b.y));
    }
  }
  map.fillStyle(0x86efac).fillCircle(px(target.x), py(target.y), 2.2);
  return (player: CityPoint & { rotation: number }, w: number, h: number) => {
    const top = Math.max(10, h - height - (w < 920 ? 78 : 11));
    map.setPosition(left(w), top);
    marker.setPosition(left(w) + px(player.x), top + py(player.y)).setRotation(player.rotation);
  };
}
