import * as Phaser from 'phaser';
import { BORDER_PATHS, LAKE_POLYGONS, LAND_POLYGONS, MAP_BOUNDS, RIVER_PATHS } from '../data/europeGeoData.generated';
import { FOREST_ZONES, MOUNTAIN_CLUSTERS, RELIEF_ZONES } from '../data/europeTerrain';
import type { MapPoint } from '../data/europeProjection';
import { CITIES } from '../data/europeMap';

export const PIXEL_MAP_SCALE = 2;

export interface MapThemePalette {
  bgHex: number;
  oceanDeep: string;
  oceanMid: string;
  oceanShelf: string;
  oceanShallow: string;
  oceanGrid: string;
  oceanWave: string;
  landBase: string;
  landAlt: string;
  landDither: string;
  coastOutline: string;
  coastInner: string;
  lowFoothill: string;
  lowRidge: string;
  highBrown: string;
  highGrey: string;
  highSnow: string;
  peakLight: string;
  peakShadow: string;
  peakLowLight: string;
  peakLowShadow: string;
  peakSnow: string;
  forestFloor: string;
  treeDark: string;
  treeMid: string;
  treeLight: string;
  treeShadow: string;
  riverColor: string;
  lakeFill: string;
  lakeBorder: string;
  borderColor: string;
  urbanBase: string;
  urbanRoof: string;
  urbanAccent: string;
  countryLabelColor: string;
  highwayCasingHex: number;
  highwayCasingAlpha: number;
  highwayFillHex: number;
  highwayFillAlpha: number;
  cityDotStrokeHex: number;
  cityMajorFillHex: number;
  cityMinorFillHex: number;
  cityLabelActiveColor: string;
  cityLabelActiveBg: string;
  cityLabelMutedColor: string;
  cityLabelMutedBg: string;
  legendBgHex: number;
  legendTextColor: string;
  socBandLayers: Array<{ hw: number; color: number; alpha: number }>;
}

export function getMapThemePalette(isLight: boolean): MapThemePalette {
  if (isLight) {
    return {
      bgHex: 0x8db9e2,
      oceanDeep: '#8db9e2',
      oceanMid: '#9ec6ea',
      oceanShelf: '#b4d6f2',
      oceanShallow: '#cfe6f9',
      oceanGrid: 'rgba(59, 107, 156, 0.16)',
      oceanWave: 'rgba(255, 255, 255, 0.34)',
      landBase: '#b9dfb6',
      landAlt: '#aed6aa',
      landDither: '#c6e7c2',
      coastOutline: '#3f6d63',
      coastInner: '#d8f0d4',
      lowFoothill: '#c9bc8f',
      lowRidge: '#b79f74',
      highBrown: '#a5845d',
      highGrey: '#8d99a6',
      highSnow: '#f8fafc',
      peakLight: '#94a3b8',
      peakShadow: '#64748b',
      peakLowLight: '#a98c64',
      peakLowShadow: '#856b48',
      peakSnow: '#ffffff',
      forestFloor: 'rgba(67, 126, 74, 0.24)',
      treeDark: '#1f5e34',
      treeMid: '#2e7d45',
      treeLight: '#4ca35e',
      treeShadow: 'rgba(20, 56, 32, 0.28)',
      riverColor: '#4c9ad4',
      lakeFill: '#6bb2e2',
      lakeBorder: '#3c7eb0',
      borderColor: 'rgba(71, 85, 105, 0.56)',
      urbanBase: '#94a3b8',
      urbanRoof: '#b45309',
      urbanAccent: '#cbd5e1',
      countryLabelColor: 'rgba(51, 65, 85, 0.52)',
      highwayCasingHex: 0x475569,
      highwayCasingAlpha: 0.42,
      highwayFillHex: 0xe2e8f0,
      highwayFillAlpha: 0.88,
      cityDotStrokeHex: 0xffffff,
      cityMajorFillHex: 0x334155,
      cityMinorFillHex: 0x64748b,
      cityLabelActiveColor: '#0f172a',
      cityLabelActiveBg: 'rgba(255, 255, 255, 0.88)',
      cityLabelMutedColor: '#334155',
      cityLabelMutedBg: 'rgba(248, 250, 252, 0.72)',
      legendBgHex: 0xf8fafc,
      legendTextColor: '#334155',
      socBandLayers: [
        { hw: 28, color: 0x38bdf8, alpha: 0.07 },
        { hw: 22, color: 0x38bdf8, alpha: 0.09 },
        { hw: 17, color: 0x0ea5e9, alpha: 0.12 },
        { hw: 13, color: 0x0284c7, alpha: 0.14 },
        { hw: 9.5, color: 0x38bdf8, alpha: 0.17 },
        { hw: 6, color: 0x7dd3fc, alpha: 0.2 }
      ]
    };
  }

  return {
    bgHex: 0x08172c,
    oceanDeep: '#08172c',
    oceanMid: '#0b203b',
    oceanShelf: '#102c50',
    oceanShallow: '#163c68',
    oceanGrid: 'rgba(56, 114, 178, 0.18)',
    oceanWave: 'rgba(125, 211, 252, 0.14)',
    landBase: '#1e3e2d',
    landAlt: '#224533',
    landDither: '#274f3a',
    coastOutline: '#4e8b6a',
    coastInner: '#316247',
    lowFoothill: '#3d4a32',
    lowRidge: '#574c37',
    highBrown: '#5c4936',
    highGrey: '#5b6777',
    highSnow: '#e2e8f0',
    peakLight: '#738294',
    peakShadow: '#424d5c',
    peakLowLight: '#6c5a44',
    peakLowShadow: '#483c2d',
    peakSnow: '#f8fafc',
    forestFloor: 'rgba(12, 46, 26, 0.34)',
    treeDark: '#0f3f24',
    treeMid: '#185b34',
    treeLight: '#28804a',
    treeShadow: 'rgba(2, 12, 8, 0.42)',
    riverColor: '#2575ad',
    lakeFill: '#1d6699',
    lakeBorder: '#38bdf8',
    borderColor: 'rgba(203, 213, 225, 0.42)',
    urbanBase: '#475569',
    urbanRoof: '#64748b',
    urbanAccent: '#fbbf24',
    countryLabelColor: 'rgba(148, 163, 184, 0.46)',
    highwayCasingHex: 0x0f172a,
    highwayCasingAlpha: 0.7,
    highwayFillHex: 0x475569,
    highwayFillAlpha: 0.78,
    cityDotStrokeHex: 0x0f172a,
    cityMajorFillHex: 0xcbd5e1,
    cityMinorFillHex: 0x64748b,
    cityLabelActiveColor: '#f8fafc',
    cityLabelActiveBg: 'rgba(15, 23, 42, 0.86)',
    cityLabelMutedColor: '#cbd5e1',
    cityLabelMutedBg: 'rgba(15, 23, 42, 0.58)',
    legendBgHex: 0x0f172a,
    legendTextColor: '#94a3b8',
    socBandLayers: [
      { hw: 28, color: 0x7dd3fc, alpha: 0.05 },
      { hw: 22, color: 0x7dd3fc, alpha: 0.065 },
      { hw: 17, color: 0x7dd3fc, alpha: 0.09 },
      { hw: 13, color: 0x38bdf8, alpha: 0.115 },
      { hw: 9.5, color: 0x7dd3fc, alpha: 0.14 },
      { hw: 6, color: 0xbae6fd, alpha: 0.165 }
    ]
  };
}

function createSeededRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function pointInPoly(x: number, y: number, poly: MapPoint[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x;
    const yi = poly[i].y;
    const xj = poly[j].x;
    const yj = poly[j].y;
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-9) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function tracePoly(ctx: CanvasRenderingContext2D, poly: MapPoint[], scale: number): void {
  if (poly.length === 0) return;
  ctx.moveTo(Math.round(poly[0].x / scale), Math.round(poly[0].y / scale));
  for (let i = 1; i < poly.length; i++) {
    ctx.lineTo(Math.round(poly[i].x / scale), Math.round(poly[i].y / scale));
  }
  ctx.closePath();
}

function traceGeoPath(ctx: CanvasRenderingContext2D, path: number[], closed = false): void {
  ctx.moveTo(path[0] / PIXEL_MAP_SCALE, path[1] / PIXEL_MAP_SCALE);
  for (let i = 2; i < path.length; i += 2) {
    ctx.lineTo(path[i] / PIXEL_MAP_SCALE, path[i + 1] / PIXEL_MAP_SCALE);
  }
  if (closed) ctx.closePath();
}

function traceLand(ctx: CanvasRenderingContext2D): void {
  ctx.beginPath();
  for (const polygon of LAND_POLYGONS) {
    for (const ring of polygon) traceGeoPath(ctx, ring, true);
  }
}

function drawPixelTree(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  kind: 'pine' | 'mixed' | 'deciduous',
  variant: number,
  pal: MapThemePalette
): void {
  const x = Math.round(px);
  const y = Math.round(py);
  // Tiny shadow beneath canopy
  ctx.fillStyle = pal.treeShadow;
  ctx.fillRect(x - 1, y + 1, 3, 1);

  if (kind === 'pine' || (kind === 'mixed' && variant < 0.55)) {
    // Crisp 3x4 pixel conifer
    ctx.fillStyle = pal.treeDark;
    ctx.fillRect(x - 1, y, 3, 1);
    ctx.fillStyle = pal.treeMid;
    ctx.fillRect(x - 1, y - 1, 3, 1);
    ctx.fillStyle = pal.treeLight;
    ctx.fillRect(x, y - 2, 1, 2);
  } else {
    // Crisp 4x4 pixel deciduous tree
    ctx.fillStyle = pal.treeDark;
    ctx.fillRect(x - 1, y - 1, 3, 2);
    ctx.fillStyle = pal.treeMid;
    ctx.fillRect(x - 1, y - 2, 3, 2);
    ctx.fillStyle = pal.treeLight;
    ctx.fillRect(x - 1, y - 2, 2, 1);
  }
}

function drawPixelPeak(
  ctx: CanvasRenderingContext2D,
  wx: number,
  wy: number,
  size: number,
  snow: boolean,
  pal: MapThemePalette
): void {
  const cx = Math.round(wx / PIXEL_MAP_SCALE);
  const cy = Math.round(wy / PIXEL_MAP_SCALE);
  const h = Math.max(4, Math.round(size / PIXEL_MAP_SCALE));
  const halfBase = Math.max(3, Math.round((size * 0.85) / PIXEL_MAP_SCALE));

  const lightCol = snow ? pal.peakLight : pal.peakLowLight;
  const shadowCol = snow ? pal.peakShadow : pal.peakLowShadow;

  for (let row = 0; row <= h; row++) {
    const t = row / h;
    const span = Math.max(1, Math.round(t * halfBase));
    const py = cy - h + row;
    const isSnowRow = snow && row <= Math.max(2, Math.round(h * 0.38));

    // Left sunlit slope
    ctx.fillStyle = isSnowRow ? pal.peakSnow : lightCol;
    ctx.fillRect(cx - span, py, span, 1);

    // Right shadowed slope
    ctx.fillStyle = isSnowRow ? pal.highSnow : shadowCol;
    ctx.fillRect(cx, py, span + 1, 1);
  }
}

export function ensureEuropePixelMapTexture(scene: Phaser.Scene, isLight: boolean): string {
  const key = isLight ? 'europe_map_pixel_light' : 'europe_map_pixel_dark';
  if (scene.textures.exists(key)) return key;

  const cw = Math.round(MAP_BOUNDS.w / PIXEL_MAP_SCALE);
  const ch = Math.round(MAP_BOUNDS.h / PIXEL_MAP_SCALE);
  const tex = scene.textures.createCanvas(key, cw, ch);
  if (!tex) return key;

  const ctx = tex.getContext();
  ctx.imageSmoothingEnabled = false;
  const pal = getMapThemePalette(isLight);
  const rng = createSeededRng(20261123);

  // 1. Deep ocean + subtle graticule + pixel wave sparkles
  ctx.fillStyle = pal.oceanDeep;
  ctx.fillRect(0, 0, cw, ch);

  ctx.fillStyle = pal.oceanGrid;
  for (let gx = 0; gx < cw; gx += 24) ctx.fillRect(gx, 0, 1, ch);
  for (let gy = 0; gy < ch; gy += 24) ctx.fillRect(0, gy, cw, 1);

  ctx.fillStyle = pal.oceanWave;
  for (let i = 0; i < 240; i++) {
    const wx = Math.floor(rng() * (cw - 6));
    const wy = Math.floor(rng() * (ch - 2));
    ctx.fillRect(wx, wy, 3, 1);
    if (rng() > 0.5) ctx.fillRect(wx + 2, wy + 1, 2, 1);
  }

  // 2. Stepped pixel bathymetry halos around all landmasses
  const drawShelfHalo = (lineWidth: number, color: string) => {
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    traceLand(ctx);
    ctx.stroke();
    ctx.restore();
  };
  drawShelfHalo(18, pal.oceanMid);
  drawShelfHalo(10, pal.oceanShelf);
  drawShelfHalo(4, pal.oceanShallow);

  // 3. Base land fill + subtle pixel dither texture, clipped strictly to landmasses
  ctx.save();
  traceLand(ctx);
  ctx.clip('evenodd');

  ctx.fillStyle = pal.landBase;
  ctx.fillRect(0, 0, cw, ch);

  // Subtle regional lowland variation & pixel grass dithering
  ctx.fillStyle = pal.landAlt;
  for (let y = 0; y < ch; y += 4) {
    for (let x = (y % 8 === 0 ? 0 : 2); x < cw; x += 6) {
      if (rng() < 0.32) ctx.fillRect(x, y, 2, 2);
    }
  }
  ctx.fillStyle = pal.landDither;
  for (let i = 0; i < 900; i++) {
    const dx = Math.floor(rng() * cw);
    const dy = Math.floor(rng() * ch);
    ctx.fillRect(dx, dy, 1, 1);
  }

  // 4. Hinted Relief Shading (low mountains lighter -> high mountains brown -> grey -> snow)
  const fillReliefPoly = (poly: MapPoint[], color: string, alpha = 1, ditherSeedOffset = -1) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    tracePoly(ctx, poly, PIXEL_MAP_SCALE);
    ctx.fill();
    if (ditherSeedOffset >= 0) {
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      poly.forEach(p => {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      });
      const dRng = createSeededRng(1337 + ditherSeedOffset);
      const count = Math.min(180, Math.max(24, Math.round(((maxX - minX) * (maxY - minY)) / 1800)));
      ctx.globalAlpha = Math.min(0.9, alpha + 0.16);
      for (let i = 0; i < count; i++) {
        const rx = minX + dRng() * (maxX - minX);
        const ry = minY + dRng() * (maxY - minY);
        if (pointInPoly(rx, ry, poly)) {
          ctx.fillRect(Math.round(rx / PIXEL_MAP_SCALE), Math.round(ry / PIXEL_MAP_SCALE), 2, 1);
        }
      }
    }
    ctx.restore();
  };

  RELIEF_ZONES.filter(z => z.tier === 'low').forEach((zone, idx) => {
    fillReliefPoly(zone.foothills, pal.lowFoothill, 0.46, idx * 31);
    if (zone.ridge) fillReliefPoly(zone.ridge, pal.lowRidge, 0.56, idx * 31 + 7);
  });

  RELIEF_ZONES.filter(z => z.tier === 'high').forEach((zone, idx) => {
    fillReliefPoly(zone.foothills, pal.highBrown, 0.56, 500 + idx * 43);
    if (zone.ridge) fillReliefPoly(zone.ridge, pal.highGrey, 0.68, 500 + idx * 43 + 11);
    if (zone.snow) fillReliefPoly(zone.snow, pal.highSnow, 0.62, 500 + idx * 43 + 23);
  });

  // 5. Large Forests & National Parks with clustered green pixel trees
  FOREST_ZONES.forEach(fz => {
    fillReliefPoly(fz.polygon, pal.forestFloor);

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    fz.polygon.forEach(p => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });

    const area = Math.max(1, (maxX - minX) * (maxY - minY));
    const attempts = Math.min(260, Math.max(18, Math.round((area / 10000) * fz.density)));

    for (let i = 0; i < attempts; i++) {
      const tx = minX + rng() * (maxX - minX);
      const ty = minY + rng() * (maxY - minY);
      if (!pointInPoly(tx, ty, fz.polygon)) continue;

      // Keep clear of city centers so pixel urban blocks & labels remain crisp
      let nearCity = false;
      for (const c of CITIES) {
        if (Math.hypot(c.mapX - tx, c.mapY - ty) < (c.isMajor ? 18 : 11)) {
          nearCity = true;
          break;
        }
      }
      if (nearCity) continue;

      drawPixelTree(ctx, tx / PIXEL_MAP_SCALE, ty / PIXEL_MAP_SCALE, fz.kind, rng(), pal);
    }
  });

  // 6. Crisp pixel-art shaded mountain peaks
  MOUNTAIN_CLUSTERS.forEach(cluster => {
    cluster.peaks.forEach(pk => {
      drawPixelPeak(ctx, pk.x, pk.y, pk.size, pk.snow, pal);
    });
  });

  // 7. Rivers & Major Lakes
  ctx.strokeStyle = pal.riverColor;
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  RIVER_PATHS.forEach(path => traceGeoPath(ctx, path));
  ctx.stroke();

  ctx.fillStyle = pal.lakeFill;
  ctx.strokeStyle = pal.lakeBorder;
  ctx.lineWidth = 1;
  ctx.beginPath();
  LAKE_POLYGONS.forEach(polygon => polygon.forEach(ring => traceGeoPath(ctx, ring, true)));
  ctx.fill('evenodd');
  ctx.stroke();

  // 8. Country borders
  ctx.save();
  ctx.strokeStyle = pal.borderColor;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  BORDER_PATHS.forEach(path => traceGeoPath(ctx, path));
  ctx.stroke();
  ctx.restore();

  // 9. Detailed pixel-art city urban footprints
  CITIES.forEach(city => {
    const cx = Math.round(city.mapX / PIXEL_MAP_SCALE);
    const cy = Math.round(city.mapY / PIXEL_MAP_SCALE);
    const count = city.isMajor ? 10 : city.isJunction ? 3 : 5;
    const spread = city.isMajor ? 6 : city.isJunction ? 2.5 : 4;

    ctx.fillStyle = pal.urbanBase;
    ctx.fillRect(cx - (city.isMajor ? 3 : 2), cy - (city.isMajor ? 2 : 1), city.isMajor ? 6 : 4, city.isMajor ? 4 : 3);

    for (let i = 0; i < count; i++) {
      const ang = (i / count) * Math.PI * 2 + (city.mapX % 7) * 0.25;
      const dist = 2 + rng() * spread;
      const bx = Math.round(cx + Math.cos(ang) * dist);
      const by = Math.round(cy + Math.sin(ang) * dist * 0.8);
      ctx.fillStyle = i % 3 === 0 ? pal.urbanRoof : pal.urbanBase;
      ctx.fillRect(bx, by, 2, 2);
      if (city.isMajor && i % 2 === 0) {
        ctx.fillStyle = pal.urbanAccent;
        ctx.fillRect(bx, by, 1, 1);
      }
    }
  });

  ctx.restore(); // end land clip

  // 10. Crisp pixel coastline outline
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.strokeStyle = pal.coastOutline;
  ctx.lineWidth = 0.75;
  traceLand(ctx);
  ctx.stroke();
  ctx.restore();

  tex.refresh();
  tex.setFilter(Phaser.Textures.FilterMode.NEAREST);
  return key;
}
