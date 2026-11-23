import * as Phaser from 'phaser';
import {
  CHARGERS,
  CITIES,
  HIGHWAY_EDGES,
  getCityById,
  getEdgeById
} from '../data/europeMap';
import {
  COUNTRY_LABELS,
  MAP_BOUNDS
} from '../data/europeGeography';
import {
  PIXEL_MAP_SCALE,
  ensureEuropePixelMapTexture,
  getMapThemePalette
} from './EuropePixelMap';
import { ChargerStation } from '../types';
import { getBestPriceForStation } from '../sim/EnergyModel';
import { getActiveRouteLegs, getActiveRouteOption } from '../sim/RoutePlanner';
import { getVehicleById } from '../data/vehicles';
import { ERoadtripBridge } from './GameBridge';
import {
  BoxRect,
  CardLayoutNode,
  computeRouteSocBandSegments,
  getPointAlongEdge,
  isProviderSubscribed,
  resolveNonOverlappingCards
} from './MapLayout';
import { SoundFX } from './SoundFX';

interface ChargerPinNode extends CardLayoutNode {
  station: ChargerStation;
  onActiveRoute: boolean;
  isSubscribed: boolean;
  isFilteredVisible: boolean;
  dot: Phaser.GameObjects.Arc;
  dotRing: Phaser.GameObjects.Arc;
  card: Phaser.GameObjects.Container;
  cardBg: Phaser.GameObjects.Rectangle;
  cardAccent: Phaser.GameObjects.Rectangle;
  logo: Phaser.GameObjects.Image;
  titleText: Phaser.GameObjects.Text;
  priceText: Phaser.GameObjects.Text;
  noSubText: Phaser.GameObjects.Text;
}

const NET_COLORS: Record<string, number> = {
  tesla: 0xef4444,
  enbw: 0xf97316,
  ewego: 0x22c55e,
  electra: 0xa855f7,
  ionity: 0xec4899,
  ac_village: 0x14b8a6
};

const NET_SHORT: Record<string, string> = {
  tesla: 'Tesla SuC',
  enbw: 'EnBW',
  ewego: 'EWE Go',
  electra: 'Electra+',
  ionity: 'IONITY',
  ac_village: 'AC Dorf'
};

export class EuropeMapScene extends Phaser.Scene {
  private bridge!: ERoadtripBridge;
  private worldLayer!: Phaser.GameObjects.Container;
  private baseMapImage!: Phaser.GameObjects.Image;
  private baseNetworkGfx!: Phaser.GameObjects.Graphics;
  private countryLabelTexts: Phaser.GameObjects.Text[] = [];
  private legendTexts: Phaser.GameObjects.Text[] = [];
  private cityDotVisuals: Array<{
    dot: Phaser.GameObjects.Arc;
    outerRing?: Phaser.GameObjects.Arc;
    isMajor: boolean;
    isActive: boolean;
  }> = [];
  private currentIsLight = false;
  private themeObserver?: MutationObserver;

  private rangeOverlay!: Phaser.GameObjects.Graphics;
  private dynamicOverlay!: Phaser.GameObjects.Graphics;
  private leaderOverlay!: Phaser.GameObjects.Graphics;
  private routePillsLayer!: Phaser.GameObjects.Container;
  private stageLabelsLayer!: Phaser.GameObjects.Container;
  private chargerLayer!: Phaser.GameObjects.Container;

  private pinObjects: ChargerPinNode[] = [];
  private cityLabels: Array<{
    text: Phaser.GameObjects.Text;
    x: number;
    y: number;
    isMajor: boolean;
    isActive: boolean;
  }> = [];
  private shieldTags: Array<{ cont: Phaser.GameObjects.Container; x: number; y: number; major: boolean }> = [];
  private carMarker?: Phaser.GameObjects.Image;

  private mapBounds = MAP_BOUNDS;
  private lastLayoutZoom = -1;
  private lastDetailTier = -1;
  private activePointers = new Map<number, { x: number; y: number }>();
  private dragStart?: { x: number; y: number; scrollX: number; scrollY: number };
  private totalDragDist = 0;
  private prevPinchDist = 0;
  private prevPinchMid?: { x: number; y: number };
  private isPinching = false;

  // Smooth camera target interpolation
  private targetZoom = 1;
  private targetScrollX = 0;
  private targetScrollY = 0;
  private smoothCamActive = false;

  private resizeHandler?: () => void;

  constructor() {
    super({ key: 'EuropeMapScene' });
  }

  init(data: { bridge: ERoadtripBridge }): void {
    this.bridge = data.bridge;
    this.pinObjects = [];
    this.cityLabels = [];
    this.cityDotVisuals = [];
    this.countryLabelTexts = [];
    this.legendTexts = [];
    this.shieldTags = [];
    this.lastLayoutZoom = -1;
    this.lastDetailTier = -1;
    this.activePointers.clear();
    this.smoothCamActive = false;
    this.currentIsLight = this.bridge.isLightTheme();
  }

  create(): void {
    if (this.input.manager.pointersTotal < 3) {
      this.input.addPointer(1); // Enable 2-finger pinch on mobile without leaking on restarts
    }

    this.currentIsLight = this.bridge.isLightTheme();
    this.cameras.main.setBackgroundColor(getMapThemePalette(this.currentIsLight).bgHex);

    this.worldLayer = this.add.container(0, 0);
    this.drawDetailedEuropeMap();

    this.rangeOverlay = this.add.graphics();
    this.worldLayer.add(this.rangeOverlay);

    this.dynamicOverlay = this.add.graphics();
    this.worldLayer.add(this.dynamicOverlay);

    this.routePillsLayer = this.add.container(0, 0);
    this.worldLayer.add(this.routePillsLayer);

    this.stageLabelsLayer = this.add.container(0, 0);
    this.worldLayer.add(this.stageLabelsLayer);

    this.drawCitiesAndLandmarks();

    this.leaderOverlay = this.add.graphics();
    this.worldLayer.add(this.leaderOverlay);

    this.chargerLayer = this.add.container(0, 0);
    this.worldLayer.add(this.chargerLayer);

    this.createChargerPins();
    this.createLiveCarMarker();

    this.fitCameraToRoute(true);
    this.setupPanAndZoom();
    this.refreshDynamicState();

    // Observe light/dark theme toggles on <html data-theme="...">
    if (typeof MutationObserver !== 'undefined') {
      this.themeObserver = new MutationObserver(() => {
        if (!this.scene.isActive()) return;
        const nextIsLight = this.bridge.isLightTheme();
        if (nextIsLight !== this.currentIsLight) {
          this.currentIsLight = nextIsLight;
          this.applyTheme();
        }
      });
      this.themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }

    this.resizeHandler = () => {
      if (!this.scene.isActive() || !this.cameras?.main) return;
      this.clampCameraTargets();
      this.layoutChargerCards(true);
    };
    this.scale.on('resize', this.resizeHandler);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      if (this.resizeHandler) {
        this.scale.off('resize', this.resizeHandler);
        this.resizeHandler = undefined;
      }
      if (this.themeObserver) {
        this.themeObserver.disconnect();
        this.themeObserver = undefined;
      }
      this.activePointers.clear();
    });
  }

  update(_time: number, delta: number): void {
    const cam = this.cameras.main;
    if (!cam || !this.smoothCamActive) return;

    const factor = 1 - Math.exp(-Math.min(0.05, delta / 1000) * 14);
    const dz = this.targetZoom - cam.zoom;
    const dx = this.targetScrollX - cam.scrollX;
    const dy = this.targetScrollY - cam.scrollY;

    if (Math.abs(dz) < 0.002 && Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) {
      cam.setZoom(this.targetZoom);
      cam.scrollX = this.targetScrollX;
      cam.scrollY = this.targetScrollY;
      this.smoothCamActive = false;
      this.layoutChargerCards();
      return;
    }

    cam.setZoom(cam.zoom + dz * factor);
    cam.scrollX += dx * factor;
    cam.scrollY += dy * factor;
    this.layoutChargerCards();
  }

  private drawDetailedEuropeMap(): void {
    const pal = getMapThemePalette(this.currentIsLight);
    const mapKey = ensureEuropePixelMapTexture(this, this.currentIsLight);

    this.baseMapImage = this.add.image(0, 0, mapKey).setOrigin(0, 0).setScale(PIXEL_MAP_SCALE);
    this.worldLayer.add(this.baseMapImage);

    this.baseNetworkGfx = this.add.graphics();
    this.worldLayer.add(this.baseNetworkGfx);

    COUNTRY_LABELS.forEach(cl => {
      const lbl = this.add.text(cl.x, cl.y, cl.name, {
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
        fontStyle: 'bold',
        color: pal.countryLabelColor,
        letterSpacing: 2,
        resolution: 4
      });
      lbl.setOrigin(0.5);
      this.worldLayer.add(lbl);
      this.countryLabelTexts.push(lbl);
    });

    // Autobahn shields (visible even when zoomed out on major corridors!)
    const levelEdgeIds = new Set<string>();
    this.bridge.level.routeOptions.forEach(opt => opt.legs.forEach(l => levelEdgeIds.add(l.edgeId)));

    HIGHWAY_EDGES.forEach((edge, idx) => {
      const onLevel = levelEdgeIds.has(edge.id);
      if (!onLevel && idx % 2 === 1 && edge.distanceKm < 140) return;

      const mid = getPointAlongEdge(edge, 0.5);
      const shortCode = edge.highwayName.split('/')[0].trim().slice(0, 6);
      const isEuro = shortCode.startsWith('E');
      const isFerry = edge.highwayName.includes('Fähre') || edge.highwayName.includes('Tunnel');
      const bgHex = isFerry ? 0x0284c7 : isEuro ? 0x15803d : 0x1d4ed8;

      const cont = this.add.container(mid.x, mid.y);
      cont.setDepth(11);
      const rect = this.add.rectangle(0, 0, Math.max(22, shortCode.length * 6.2 + 8), 14, bgHex, 0.94);
      rect.setStrokeStyle(1.2, 0xe2e8f0, 0.9);
      const txt = this.add
        .text(0, 0, shortCode, {
          fontFamily: 'monospace',
          fontSize: '9px',
          fontStyle: 'bold',
          color: '#ffffff',
          resolution: 4
        })
        .setOrigin(0.5);
      cont.add([rect, txt]);
      this.worldLayer.add(cont);
      this.shieldTags.push({ cont, x: mid.x, y: mid.y, major: onLevel });
    });

    const cx = 135;
    const cy = 1280;
    const nTxt = this.add
      .text(cx, cy - 34, 'N', {
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
        fontStyle: 'bold',
        color: this.currentIsLight ? '#0284c7' : '#38bdf8',
        resolution: 4
      })
      .setOrigin(0.5);
    this.worldLayer.add(nTxt);
    this.legendTexts.push(nTxt);

    const scaleTxt = this.add
      .text(cx + 55, cy + 8, 'EUROPA E-AUTO NETZ\nZoom: Mausrad / Pinch', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '10px',
        color: pal.legendTextColor,
        resolution: 4
      })
      .setOrigin(0, 0.5);
    this.worldLayer.add(scaleTxt);
    this.legendTexts.push(scaleTxt);

    this.drawBaseNetworkAndLegend();
  }

  private drawBaseNetworkAndLegend(): void {
    if (!this.baseNetworkGfx) return;
    const g = this.baseNetworkGfx;
    const pal = getMapThemePalette(this.currentIsLight);
    g.clear();

    // Base European Autobahn network
    HIGHWAY_EDGES.forEach(edge => {
      g.lineStyle(5.5, pal.highwayCasingHex, pal.highwayCasingAlpha);
      for (let i = 0; i < edge.waypoints.length - 1; i++) {
        g.lineBetween(edge.waypoints[i].x, edge.waypoints[i].y, edge.waypoints[i + 1].x, edge.waypoints[i + 1].y);
      }
      g.lineStyle(2.5, pal.highwayFillHex, pal.highwayFillAlpha);
      for (let i = 0; i < edge.waypoints.length - 1; i++) {
        g.lineBetween(edge.waypoints[i].x, edge.waypoints[i].y, edge.waypoints[i + 1].x, edge.waypoints[i + 1].y);
      }
    });

    this.drawMapLegendDecor(g);
  }

  private drawMapLegendDecor(g: Phaser.GameObjects.Graphics): void {
    const pal = getMapThemePalette(this.currentIsLight);
    const cx = 135;
    const cy = 1280;
    const accent = this.currentIsLight ? 0x0284c7 : 0x38bdf8;
    g.lineStyle(2, accent, 0.6);
    g.strokeCircle(cx, cy, 26);
    g.fillStyle(pal.legendBgHex, 0.82);
    g.fillCircle(cx, cy, 25);
    g.fillStyle(accent, 0.95);
    g.fillTriangle(cx, cy - 22, cx - 5, cy, cx + 5, cy);
    g.fillStyle(0x94a3b8, 0.65);
    g.fillTriangle(cx, cy + 22, cx - 5, cy, cx + 5, cy);
  }

  public applyTheme(): void {
    const pal = getMapThemePalette(this.currentIsLight);
    if (this.cameras?.main) {
      this.cameras.main.setBackgroundColor(pal.bgHex);
    }
    if (this.baseMapImage) {
      const mapKey = ensureEuropePixelMapTexture(this, this.currentIsLight);
      this.baseMapImage.setTexture(mapKey);
    }
    this.drawBaseNetworkAndLegend();

    this.countryLabelTexts.forEach(lbl => lbl.setColor(pal.countryLabelColor));
    if (this.legendTexts[0]) this.legendTexts[0].setColor(this.currentIsLight ? '#0284c7' : '#38bdf8');
    if (this.legendTexts[1]) this.legendTexts[1].setColor(pal.legendTextColor);

    this.cityDotVisuals.forEach(cd => {
      const fill = cd.isActive ? (this.currentIsLight ? 0x0284c7 : 0x38bdf8) : cd.isMajor ? pal.cityMajorFillHex : pal.cityMinorFillHex;
      cd.dot.setFillStyle(fill);
      cd.dot.setStrokeStyle(1.5, pal.cityDotStrokeHex);
      if (cd.outerRing) {
        cd.outerRing.setStrokeStyle(1.2, cd.isActive ? (this.currentIsLight ? 0x0284c7 : 0x38bdf8) : pal.cityMajorFillHex, 0.65);
      }
    });

    this.cityLabels.forEach(item => {
      item.text.setColor(item.isActive ? pal.cityLabelActiveColor : pal.cityLabelMutedColor);
      item.text.setBackgroundColor(item.isActive ? pal.cityLabelActiveBg : pal.cityLabelMutedBg);
    });

    this.refreshDynamicState();
  }

  private drawDashedLine(
    g: Phaser.GameObjects.Graphics,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    dashLen: number,
    gapLen: number
  ): void {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.hypot(dx, dy);
    if (dist < 1) return;
    const ux = dx / dist;
    const uy = dy / dist;
    let pos = 0;
    while (pos < dist) {
      const end = Math.min(dist, pos + dashLen);
      g.lineBetween(x1 + ux * pos, y1 + uy * pos, x1 + ux * end, y1 + uy * end);
      pos += dashLen + gapLen;
    }
  }

  private drawSoftRouteBand(
    g: Phaser.GameObjects.Graphics,
    rawPts: Array<{ x: number; y: number }>
  ): void {
    const pts: Array<{ x: number; y: number }> = [];
    for (const p of rawPts) {
      if (pts.length === 0 || Math.hypot(p.x - pts[pts.length - 1].x, p.y - pts[pts.length - 1].y) >= 0.5) {
        pts.push(p);
      }
    }
    if (pts.length < 2) return;

    const segNormals: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const dx = pts[i + 1].x - pts[i].x;
      const dy = pts[i + 1].y - pts[i].y;
      const len = Math.max(0.001, Math.hypot(dx, dy));
      segNormals.push({ x: -dy / len, y: dx / len });
    }

    const vertNormals: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < pts.length; i++) {
      if (i === 0) {
        vertNormals.push(segNormals[0]);
      } else if (i === pts.length - 1) {
        vertNormals.push(segNormals[segNormals.length - 1]);
      } else {
        const n1 = segNormals[i - 1];
        const n2 = segNormals[i];
        let nx = n1.x + n2.x;
        let ny = n1.y + n2.y;
        const nLen = Math.hypot(nx, ny);
        if (nLen < 0.001) {
          vertNormals.push(n2);
        } else {
          nx /= nLen;
          ny /= nLen;
          const dot = Math.max(0.55, nx * n2.x + ny * n2.y);
          const miter = Math.min(1.6, 1 / dot);
          vertNormals.push({ x: nx * miter, y: ny * miter });
        }
      }
    }

    const startDirAngle = Math.atan2(pts[0].y - pts[1].y, pts[0].x - pts[1].x);
    const endDirAngle = Math.atan2(
      pts[pts.length - 1].y - pts[pts.length - 2].y,
      pts[pts.length - 1].x - pts[pts.length - 2].x
    );
    const capSteps = 6;

    const layers = getMapThemePalette(this.currentIsLight).socBandLayers;

    layers.forEach(layer => {
      const poly: Phaser.Math.Vector2[] = [];
      for (let i = 0; i < pts.length; i++) {
        poly.push(
          new Phaser.Math.Vector2(
            pts[i].x + vertNormals[i].x * layer.hw,
            pts[i].y + vertNormals[i].y * layer.hw
          )
        );
      }
      const endPt = pts[pts.length - 1];
      for (let s = 1; s < capSteps; s++) {
        const a = endDirAngle + Math.PI / 2 - (s / capSteps) * Math.PI;
        poly.push(new Phaser.Math.Vector2(endPt.x + Math.cos(a) * layer.hw, endPt.y + Math.sin(a) * layer.hw));
      }
      for (let i = pts.length - 1; i >= 0; i--) {
        poly.push(
          new Phaser.Math.Vector2(
            pts[i].x - vertNormals[i].x * layer.hw,
            pts[i].y - vertNormals[i].y * layer.hw
          )
        );
      }
      const startPt = pts[0];
      for (let s = 1; s < capSteps; s++) {
        const a = startDirAngle + Math.PI / 2 - (s / capSteps) * Math.PI;
        poly.push(
          new Phaser.Math.Vector2(startPt.x + Math.cos(a) * layer.hw, startPt.y + Math.sin(a) * layer.hw)
        );
      }

      g.fillStyle(layer.color, layer.alpha);
      g.fillPoints(poly, true);
    });
  }

  private drawCitiesAndLandmarks(): void {
    const pal = getMapThemePalette(this.currentIsLight);
    const levelCityIds = new Set<string>();
    this.bridge.level.routeOptions.forEach(opt => {
      opt.legs.forEach(l => {
        const e = getEdgeById(l.edgeId);
        levelCityIds.add(e.fromCityId);
        levelCityIds.add(e.toCityId);
      });
    });

    CITIES.forEach(city => {
      const isInLevel = levelCityIds.has(city.id);
      const radius = city.isMajor ? (isInLevel ? 5.2 : 4.0) : isInLevel ? 3.8 : 2.6;
      const activeCol = this.currentIsLight ? 0x0284c7 : 0x38bdf8;
      const fill = isInLevel ? activeCol : city.isMajor ? pal.cityMajorFillHex : pal.cityMinorFillHex;

      let outerRing: Phaser.GameObjects.Arc | undefined;
      if (city.isMajor) {
        outerRing = this.add.circle(city.mapX, city.mapY, radius + 3.2, 0x000000, 0);
        outerRing.setStrokeStyle(1.2, isInLevel ? activeCol : pal.cityMajorFillHex, 0.65);
        outerRing.setDepth(5.8);
        this.worldLayer.add(outerRing);
      }

      const dot = this.add.circle(city.mapX, city.mapY, radius, fill);
      dot.setStrokeStyle(1.5, pal.cityDotStrokeHex);
      dot.setDepth(6);
      this.worldLayer.add(dot);
      this.cityDotVisuals.push({
        dot,
        outerRing,
        isMajor: !!city.isMajor,
        isActive: isInLevel
      });

      if (city.landmark) {
        const lm = this.add.image(city.mapX, city.mapY - 17, `landmark_${city.landmark}`);
        lm.setScale(isInLevel ? 0.94 : 0.74);
        lm.setAlpha(isInLevel ? 1 : 0.78);
        lm.setDepth(7);
        this.worldLayer.add(lm);
      }

      const label = this.add.text(city.mapX, city.mapY + 8, city.name, {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: isInLevel ? '11.5px' : city.isMajor ? '10px' : '9px',
        fontStyle: isInLevel || city.isMajor ? 'bold' : 'normal',
        color: isInLevel ? pal.cityLabelActiveColor : pal.cityLabelMutedColor,
        backgroundColor: isInLevel ? pal.cityLabelActiveBg : pal.cityLabelMutedBg,
        padding: { x: 4, y: 1.5 },
        resolution: 4
      });
      label.setOrigin(0.5, 0);
      label.setDepth(9);
      this.worldLayer.add(label);
      this.cityLabels.push({
        text: label,
        x: city.mapX,
        y: city.mapY + 8,
        isMajor: !!city.isMajor,
        isActive: isInLevel
      });
    });
  }

  private createChargerPins(): void {
    const levelEdgeIds = new Set<string>();
    this.bridge.level.routeOptions.forEach(opt => {
      opt.legs.forEach(l => levelEdgeIds.add(l.edgeId));
    });
    const relevantChargers = CHARGERS.filter(c => levelEdgeIds.has(c.edgeId));

    relevantChargers.forEach(station => {
      const netColor = NET_COLORS[station.network] || 0x38bdf8;
      const dotRing = this.add.circle(station.mapX, station.mapY, 7, 0x000000, 0);
      dotRing.setDepth(12);

      const dot = this.add.circle(station.mapX, station.mapY, 4.5, netColor);
      dot.setStrokeStyle(1.6, 0x0f172a);
      dot.setDepth(13);
      dot.setInteractive({ useHandCursor: true });

      const cardW = 164;
      const cardH = 44;
      const card = this.add.container(station.mapX, station.mapY - 26);
      card.setDepth(16);

      const cardBg = this.add.rectangle(0, 0, cardW, cardH, 0x0f172a, 0.94);
      cardBg.setStrokeStyle(1.5, netColor, 0.95);
      cardBg.setInteractive({ useHandCursor: true });

      const cardAccent = this.add.rectangle(-cardW / 2 + 2.5, 0, 5, cardH - 2, netColor, 1);

      const logo = this.add.image(-cardW / 2 + 20, 0, `logo_${station.network}`);
      logo.setDisplaySize(22, 22);

      const titleText = this.add.text(-cardW / 2 + 36, -15, '', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '10px',
        fontStyle: 'bold',
        color: '#f8fafc',
        resolution: 4
      });

      const priceText = this.add.text(-cardW / 2 + 36, -1, '', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '10.5px',
        fontStyle: 'bold',
        color: '#4ade80',
        resolution: 4
      });

      const noSubText = this.add.text(-cardW / 2 + 36, 11, '', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '8.5px',
        color: '#94a3b8',
        resolution: 4
      });

      card.add([cardBg, cardAccent, logo, titleText, priceText, noSubText]);

      const onTap = () => {
        if (this.totalDragDist > 8 || this.isPinching) return;
        const activeEdgeIds = new Set(getActiveRouteLegs(this.bridge.level, this.bridge.plan).map(l => l.edgeId));
        if (!activeEdgeIds.has(station.edgeId)) return;
        SoundFX.click();
        this.bridge.onMapSelectCharger(station);
        this.refreshDynamicState();
      };

      dot.on('pointerup', onTap);
      cardBg.on('pointerup', onTap);

      this.chargerLayer.add(dotRing);
      this.chargerLayer.add(dot);
      this.chargerLayer.add(card);

      this.pinObjects.push({
        station,
        onActiveRoute: false,
        isSubscribed: false,
        isFilteredVisible: true,
        dot,
        dotRing,
        card,
        cardBg,
        cardAccent,
        logo,
        titleText,
        priceText,
        noSubText,
        cardW,
        cardH,
        pinX: station.mapX,
        pinY: station.mapY,
        worldX: station.mapX,
        worldY: station.mapY - 26
      });
    });
  }

  private createLiveCarMarker(): void {
    const start = getCityById(this.bridge.level.startCityId);
    this.carMarker = this.add.image(start.mapX, start.mapY, `car_${this.bridge.plan.vehicleId}`);
    this.carMarker.setScale(0.45);
    this.carMarker.setDepth(22);
    this.worldLayer.add(this.carMarker);
  }

  public refreshDynamicState(): void {
    if (!this.dynamicOverlay || !this.rangeOverlay) return;
    const g = this.dynamicOverlay;
    const rg = this.rangeOverlay;
    g.clear();
    rg.clear();
    this.routePillsLayer.removeAll(true);
    this.stageLabelsLayer.removeAll(true);

    const activeRoute = getActiveRouteOption(this.bridge.level, this.bridge.plan);
    const activeLegs = getActiveRouteLegs(this.bridge.level, this.bridge.plan);
    const activeEdgeIds = new Set(activeLegs.map(l => l.edgeId));
    const selectedLegIdx = Math.max(0, Math.min(activeLegs.length - 1, this.bridge.selectedLegIndex || 0));

    // 0. Draw soft-edged light-blue 20% -> 0% SoC range band along the selected route
    const socBands = computeRouteSocBandSegments(this.bridge.level, this.bridge.plan, 20, 0);
    socBands.forEach(band => {
      this.drawSoftRouteBand(rg, band.points);
    });

    // 1. Draw the 2 unselected alternative routes first (dashed distinct colors)
    this.bridge.level.routeOptions.forEach(opt => {
      if (opt.id === activeRoute.id) return;
      g.lineStyle(3.5, opt.colorHex, 0.45);
      opt.legs.forEach(leg => {
        if (leg.reverse) return;
        const edge = getEdgeById(leg.edgeId);
        for (let i = 0; i < edge.waypoints.length - 1; i++) {
          this.drawDashedLine(
            g,
            edge.waypoints[i].x,
            edge.waypoints[i].y,
            edge.waypoints[i + 1].x,
            edge.waypoints[i + 1].y,
            10,
            6
          );
        }
      });

      const midLeg = opt.legs[Math.min(1, Math.floor(opt.legs.length / 2))];
      if (midLeg) {
        const edge = getEdgeById(midLeg.edgeId);
        const wp = getPointAlongEdge(edge, 0.5);
        const pill = this.add.container(wp.x, wp.y - 16);
        pill.setDepth(14);
        const bg = this.add.rectangle(0, 0, 118, 18, 0x0f172a, 0.88);
        bg.setStrokeStyle(1.5, opt.colorHex, 0.95);
        bg.setInteractive({ useHandCursor: true });
        const txt = this.add
          .text(0, 0, `${opt.shortLabel} · ${opt.trafficRisk} Stau`, {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '9px',
            fontStyle: 'bold',
            color: '#e2e8f0',
            resolution: 4
          })
          .setOrigin(0.5);
        pill.add([bg, txt]);
        bg.on('pointerup', () => {
          if (this.totalDragDist > 8 || this.isPinching) return;
          SoundFX.click();
          this.bridge.onMapSelectRoute(opt.id);
        });
        this.routePillsLayer.add(pill);
      }
    });

    // 2. Draw active selected route + ALWAYS highlight the currently selected stage/etappe
    activeLegs.forEach((leg, legIdx) => {
      const edge = getEdgeById(leg.edgeId);
      const isSelectedStage = legIdx === selectedLegIdx || (activeLegs[selectedLegIdx]?.edgeId === leg.edgeId && leg.reverse === activeLegs[selectedLegIdx]?.reverse);

      if (!leg.reverse) {
        g.lineStyle(8, activeRoute.colorHex, 0.24);
        for (let i = 0; i < edge.waypoints.length - 1; i++) {
          g.lineBetween(edge.waypoints[i].x, edge.waypoints[i].y, edge.waypoints[i + 1].x, edge.waypoints[i + 1].y);
        }
        g.lineStyle(4.5, activeRoute.colorHex, 0.92);
        for (let i = 0; i < edge.waypoints.length - 1; i++) {
          g.lineBetween(edge.waypoints[i].x, edge.waypoints[i].y, edge.waypoints[i + 1].x, edge.waypoints[i + 1].y);
        }
      }

      if (legIdx === selectedLegIdx) {
        // Prominent luminous highlight for currently selected Etappe!
        g.lineStyle(14, 0xfacc15, 0.28);
        for (let i = 0; i < edge.waypoints.length - 1; i++) {
          g.lineBetween(edge.waypoints[i].x, edge.waypoints[i].y, edge.waypoints[i + 1].x, edge.waypoints[i + 1].y);
        }
        g.lineStyle(5.5, 0xfef08a, 0.98);
        for (let i = 0; i < edge.waypoints.length - 1; i++) {
          g.lineBetween(edge.waypoints[i].x, edge.waypoints[i].y, edge.waypoints[i + 1].x, edge.waypoints[i + 1].y);
        }

        // Direction arrow + Etappe badge at midpoint of selected stage
        const midPt = getPointAlongEdge(edge, 0.5, !!leg.reverse);
        const fromCity = getCityById(leg.reverse ? edge.toCityId : edge.fromCityId);
        const toCity = getCityById(leg.reverse ? edge.fromCityId : edge.toCityId);

        const stageBadge = this.add.container(midPt.x, midPt.y + 18);
        stageBadge.setDepth(19);
        const labelStr = `Etappe ${legIdx + 1}: ${fromCity.name} → ${toCity.name} (${edge.distanceKm} km)`;
        const bw = Math.min(250, Math.max(130, labelStr.length * 5.6 + 16));
        const bg = this.add.rectangle(0, 0, bw, 19, 0x0f172a, 0.94);
        bg.setStrokeStyle(1.8, 0xfacc15, 1);
        const txt = this.add
          .text(0, 0, labelStr, {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '9.5px',
            fontStyle: 'bold',
            color: '#fef08a',
            resolution: 4
          })
          .setOrigin(0.5);
        stageBadge.add([bg, txt]);
        this.stageLabelsLayer.add(stageBadge);

        // Origin ring around stage start city
        g.lineStyle(2.5, 0x38bdf8, 0.95);
        g.strokeCircle(fromCity.mapX, fromCity.mapY, 10);
      }

      // Clickable invisible stage hit target at 35% & 65% of outbound leg
      if (!leg.reverse && !isSelectedStage) {
        const hitPt = getPointAlongEdge(edge, 0.5);
        const hitZone = this.add.circle(hitPt.x, hitPt.y, 12, 0xfacc15, 0.01);
        hitZone.setInteractive({ useHandCursor: true });
        hitZone.setDepth(10);
        hitZone.on('pointerup', () => {
          if (this.totalDragDist > 8 || this.isPinching) return;
          SoundFX.click();
          this.bridge.onMapSelectLeg(legIdx);
        });
        this.stageLabelsLayer.add(hitZone);
      }
    });

    // 3. Update Charger Pins & Provider Filter Visuals
    const vehicle = getVehicleById(this.bridge.plan.vehicleId);
    const hasAnySub = this.bridge.plan.subscriptionIds.length > 0 || !!vehicle.isTesla;
    const selectedIds = new Set(this.bridge.plan.plannedStops.map(s => s.chargerId));

    this.pinObjects.forEach(node => {
      const { station } = node;
      node.onActiveRoute = activeEdgeIds.has(station.edgeId);
      const isSelected = selectedIds.has(station.id);
      const isSub = isProviderSubscribed(station.network, this.bridge.plan.subscriptionIds, vehicle.isTesla);
      const isFilteredOn = this.bridge.providerFilter[station.network] !== false;
      node.isSubscribed = isSub;
      node.isFilteredVisible = isFilteredOn || isSelected;

      const tariff = getBestPriceForStation(station, this.bridge.plan.subscriptionIds, vehicle);
      const netColor = NET_COLORS[station.network] || 0x38bdf8;
      const grayedOut = this.bridge.dimUnsubscribed && hasAnySub && !isSub && !isSelected;

      node.dot.setVisible(node.isFilteredVisible);
      node.dotRing.setVisible(node.isFilteredVisible && isSelected);

      if (isSelected) {
        node.dot.setFillStyle(0xfacc15);
        node.dot.setStrokeStyle(2, 0xffffff);
        node.dot.setAlpha(1);
        node.dotRing.setStrokeStyle(2, 0xfacc15, 0.9);
      } else if (grayedOut) {
        node.dot.setFillStyle(0x64748b);
        node.dot.setStrokeStyle(1.2, 0x0f172a);
        node.dot.setAlpha(node.onActiveRoute ? 0.55 : 0.25);
      } else {
        node.dot.setFillStyle(netColor);
        node.dot.setStrokeStyle(1.6, 0x0f172a);
        node.dot.setAlpha(node.onActiveRoute ? 1.0 : 0.48);
      }

      node.cardBg.setFillStyle(isSelected ? 0x1e293b : 0x0f172a, grayedOut ? 0.65 : node.onActiveRoute ? 0.95 : 0.72);
      node.cardBg.setStrokeStyle(
        isSelected ? 2 : 1.5,
        isSelected ? 0xfacc15 : grayedOut ? 0x475569 : netColor,
        grayedOut ? 0.45 : node.onActiveRoute ? 0.95 : 0.5
      );
      node.cardAccent.setFillStyle(isSelected ? 0xfacc15 : grayedOut ? 0x64748b : netColor, 1);
      node.logo.setAlpha(grayedOut ? 0.45 : 1);

      const icons = `${station.hasMcDonalds ? ' 🍔' : ''}${station.trailerFriendly ? ' 🚐' : ''}`;
      const shortNet = NET_SHORT[station.network] || station.network.toUpperCase();
      node.titleText.setText(`${isSelected ? '✓ ' : ''}${shortNet} · ${station.maxKw}kW (${station.stalls}x)${icons}`);
      node.priceText.setText(`${tariff.pricePerKwh.toFixed(2)} €/kWh`);
      node.priceText.setColor(grayedOut ? '#94a3b8' : tariff.hasSubscriptionDiscount ? '#4ade80' : '#facc15');

      if (tariff.hasSubscriptionDiscount) {
        node.noSubText.setText(`ohne Abo: ${tariff.pricePerKwhWithoutSub.toFixed(2)} €/kWh`);
      } else {
        node.noSubText.setText(grayedOut ? `${station.cityHint.slice(0, 18)} (kein Abo)` : station.cityHint.slice(0, 22));
      }

      node.card.setAlpha(grayedOut ? 0.62 : node.onActiveRoute ? 1 : 0.6);
    });

    this.layoutChargerCards(true);

    // 4. Live car position
    if (this.carMarker) {
      this.carMarker.setTexture(`car_${this.bridge.plan.vehicleId}`);
      if (this.bridge.runState) {
        const legIdx = Math.min(activeLegs.length - 1, this.bridge.runState.currentLegIndex);
        const leg = activeLegs[legIdx];
        const edge = getEdgeById(leg.edgeId);
        const rawT = Math.min(1, Math.max(0, this.bridge.runState.legProgressKm / Math.max(1, edge.distanceKm)));
        const pt = getPointAlongEdge(edge, rawT, !!leg.reverse);
        this.carMarker.setPosition(pt.x, pt.y);
        this.carMarker.setRotation(pt.angleRad + Math.PI / 2);
      } else {
        const leg = activeLegs[selectedLegIdx] || activeLegs[0];
        const edge = getEdgeById(leg.edgeId);
        const startCity = getCityById(leg.reverse ? edge.toCityId : edge.fromCityId);
        this.carMarker.setPosition(startCity.mapX, startCity.mapY);
        this.carMarker.setRotation(Math.PI / 2);
      }
    }
  }

  /**
   * Zoom-progressive detail tiers + non-overlapping card & label placement:
   * - Tier 0 (zoom < 0.95): Only small colored dots for chargers (zero clutter over route/stages).
   * - Tier 1 (0.95 <= zoom < 1.55): Compact active-route charger badges (logo + kW + price).
   * - Tier 2 (zoom >= 1.55): Full detailed charger cards + off-route chargers + detailed stage info.
   */
  public layoutChargerCards(force = false): void {
    const cam = this.cameras.main;
    if (!cam || !this.leaderOverlay) return;

    const zoom = cam.zoom;
    const tier = zoom < 0.95 ? 0 : zoom < 1.55 ? 1 : 2;
    if (!force && tier === this.lastDetailTier && Math.abs(zoom - this.lastLayoutZoom) < 0.04) return;
    this.lastLayoutZoom = zoom;
    this.lastDetailTier = tier;

    this.leaderOverlay.clear();

    const invScale = Phaser.Math.Clamp(1.0 / zoom, 0.22, 1.35);
    const cardScale = Phaser.Math.Clamp(0.95 / Math.pow(zoom, 0.85), 0.24, 0.95);
    const labelScale = Phaser.Math.Clamp(1.0 / Math.pow(zoom, 0.72), 0.28, 1.05);

    // Update city labels visibility & crisp screen-consistent scale
    const fixedObstacles: BoxRect[] = [];
    this.cityLabels.forEach(item => {
      item.text.setScale(labelScale);
      const show = item.isActive || (tier >= 1 && item.isMajor) || tier >= 2;
      item.text.setVisible(show);
      if (show) {
        fixedObstacles.push({
          x: item.x,
          y: item.y + 8 * labelScale,
          w: Math.max(46, item.text.width * labelScale),
          h: 16 * labelScale
        });
      }
    });

    // Update Autobahn shields
    this.shieldTags.forEach(s => {
      const shScale = Phaser.Math.Clamp(1.0 / Math.pow(zoom, 0.75), 0.3, 1.0);
      s.cont.setScale(shScale);
      const show = s.major || tier >= 1;
      s.cont.setVisible(show);
      if (show) {
        fixedObstacles.push({ x: s.x, y: s.y, w: 32 * shScale, h: 16 * shScale });
      }
    });

    // Scale stage labels and route pills cleanly
    this.stageLabelsLayer.list.forEach(obj => {
      if (obj instanceof Phaser.GameObjects.Container) {
        obj.setScale(Phaser.Math.Clamp(1.0 / Math.pow(zoom, 0.78), 0.26, 1.0));
      }
    });
    this.routePillsLayer.list.forEach(obj => {
      if (obj instanceof Phaser.GameObjects.Container) {
        obj.setScale(Phaser.Math.Clamp(1.0 / Math.pow(zoom, 0.78), 0.28, 1.0));
      }
    });

    const vehicle = getVehicleById(this.bridge.plan.vehicleId);
    const hasAnySub = this.bridge.plan.subscriptionIds.length > 0 || !!vehicle.isTesla;
    const selectedIds = new Set(this.bridge.plan.plannedStops.map(s => s.chargerId));
    const visibleNodes: ChargerPinNode[] = [];

    this.pinObjects.forEach(node => {
      const isSelected = selectedIds.has(node.station.id);

      // Keep dots small & crisp across all zoom levels so they never cover routes
      const dotR = isSelected ? 6.2 * invScale : node.onActiveRoute ? 4.4 * invScale : 3.2 * invScale;
      node.dot.setRadius(Phaser.Math.Clamp(dotR, 1.8, 7.5));
      node.dotRing.setRadius(Phaser.Math.Clamp(dotR * 1.45, 3.0, 11.0));

      // Progressive card visibility:
      // Tier 0 (zoomed out): NO cards at all -> route, stages, and Autobahn shields stay 100% clear!
      // Tier 1 (medium zoom): Show compact cards on active route (or selected stops)
      // Tier 2 (deep zoom): Show full detail cards for active + alternative routes
      let showCard = false;
      if (node.isFilteredVisible) {
        if (tier === 1) {
          showCard = node.onActiveRoute && (node.isSubscribed || isSelected || !this.bridge.dimUnsubscribed || !hasAnySub);
        } else if (tier >= 2) {
          showCard = node.onActiveRoute || isSelected || zoom >= 1.85;
        }
      }

      if (tier === 1) {
        // Compact card styling at medium zoom
        node.cardH = 30;
        node.cardBg.setSize(148, 30);
        node.cardAccent.setSize(4, 28);
        node.cardAccent.setPosition(-74 + 2, 0);
        node.logo.setPosition(-74 + 17, 0).setDisplaySize(18, 18);
        node.titleText.setPosition(-74 + 31, -11);
        node.priceText.setPosition(-74 + 31, 1);
        node.noSubText.setVisible(false);
        node.cardW = 148;
      } else {
        // Full card styling at deep zoom
        node.cardH = 44;
        node.cardBg.setSize(164, 44);
        node.cardAccent.setSize(5, 42);
        node.cardAccent.setPosition(-82 + 2.5, 0);
        node.logo.setPosition(-82 + 20, 0).setDisplaySize(22, 22);
        node.titleText.setPosition(-82 + 36, -15);
        node.priceText.setPosition(-82 + 36, -1);
        node.noSubText.setVisible(true);
        node.cardW = 164;
      }

      node.card.setVisible(showCard);
      if (showCard) {
        node.card.setScale(cardScale);
        visibleNodes.push(node);
      }
    });

    if (visibleNodes.length === 0) return;

    // Sample points along active route so cards stay clear of highway centerlines
    const routeDots: Array<{ x: number; y: number; r: number }> = [];
    const activeLegs = getActiveRouteLegs(this.bridge.level, this.bridge.plan);
    activeLegs.forEach(l => {
      if (l.reverse) return;
      const e = getEdgeById(l.edgeId);
      for (let t = 0.12; t <= 0.88; t += 0.19) {
        const pt = getPointAlongEdge(e, t);
        routeDots.push({ x: pt.x, y: pt.y, r: 10 * cardScale });
      }
    });

    resolveNonOverlappingCards(visibleNodes, fixedObstacles, routeDots, cardScale);

    visibleNodes.forEach(n => {
      n.card.setPosition(n.worldX, n.worldY);
      const isSelected = selectedIds.has(n.station.id);
      const grayed = this.bridge.dimUnsubscribed && hasAnySub && !n.isSubscribed && !isSelected;
      const lineColor = isSelected ? 0xfacc15 : grayed ? 0x64748b : NET_COLORS[n.station.network] || 0x38bdf8;
      this.leaderOverlay.lineStyle(Math.max(0.9, 1.6 * cardScale), lineColor, grayed ? 0.45 : n.onActiveRoute ? 0.88 : 0.45);
      this.leaderOverlay.lineBetween(n.pinX, n.pinY, n.worldX, n.worldY);
    });
  }

  public zoomBy(factor: number): void {
    const cam = this.cameras.main;
    if (!cam) return;
    if (!this.smoothCamActive) {
      this.targetZoom = cam.zoom;
      this.targetScrollX = cam.scrollX;
      this.targetScrollY = cam.scrollY;
    }
    const centerWorld = cam.getWorldPoint(cam.width / 2, cam.height / 2);
    const nextZoom = Phaser.Math.Clamp(this.targetZoom * factor, 0.42, 4.8);
    this.targetZoom = nextZoom;
    // Keep center anchored cleanly
    this.targetScrollX = centerWorld.x - cam.width / 2;
    this.targetScrollY = centerWorld.y - cam.height / 2;
    this.clampCameraTargets();
    this.smoothCamActive = true;
  }

  public fitCameraToRoute(immediate = false): void {
    const cam = this.cameras.main;
    if (!cam) return;
    const activeLegs = getActiveRouteLegs(this.bridge.level, this.bridge.plan);
    const cities = activeLegs.flatMap(l => {
      const e = getEdgeById(l.edgeId);
      return [getCityById(e.fromCityId), getCityById(e.toCityId)];
    });
    if (cities.length === 0) return;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    cities.forEach(c => {
      minX = Math.min(minX, c.mapX);
      maxX = Math.max(maxX, c.mapX);
      minY = Math.min(minY, c.mapY);
      maxY = Math.max(maxY, c.mapY);
    });
    const padX = 120;
    const padY = 100;
    const boxW = Math.max(260, maxX - minX + padX * 2);
    const boxH = Math.max(220, maxY - minY + padY * 2);
    const zoom = Phaser.Math.Clamp(Math.min(cam.width / boxW, cam.height / boxH), 0.48, 2.2);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    if (immediate) {
      cam.setZoom(zoom);
      cam.centerOn(cx, cy);
      this.targetZoom = cam.zoom;
      this.targetScrollX = cam.scrollX;
      this.targetScrollY = cam.scrollY;
      this.clampCameraTargets();
      cam.scrollX = this.targetScrollX;
      cam.scrollY = this.targetScrollY;
      this.smoothCamActive = false;
      this.layoutChargerCards(true);
    } else {
      this.targetZoom = zoom;
      this.targetScrollX = cx - cam.width / 2;
      this.targetScrollY = cy - cam.height / 2;
      this.clampCameraTargets();
      this.smoothCamActive = true;
    }
  }

  public zoomFullEurope(): void {
    const cam = this.cameras.main;
    if (!cam) return;
    const zoom = Phaser.Math.Clamp(Math.min(cam.width / 1380, cam.height / 1320), 0.42, 1.4);
    this.targetZoom = zoom;
    this.targetScrollX = 780 - cam.width / 2;
    this.targetScrollY = 710 - cam.height / 2;
    this.clampCameraTargets();
    this.smoothCamActive = true;
  }

  private clampCameraTargets(): void {
    this.targetScrollX = Phaser.Math.Clamp(this.targetScrollX, -220, this.mapBounds.w - 180);
    this.targetScrollY = Phaser.Math.Clamp(this.targetScrollY, -180, this.mapBounds.h - 140);
  }

  private getPointerCanvasPoint(pointer: Phaser.Input.Pointer): { x: number; y: number } {
    const canvas = this.game?.canvas;
    const cam = this.cameras?.main;
    if (!canvas || !cam) return { x: pointer.x, y: pointer.y };

    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return { x: pointer.x, y: pointer.y };

    let clientX: number | undefined;
    let clientY: number | undefined;
    const ev = pointer.event as PointerEvent | MouseEvent | TouchEvent | undefined;
    if (ev) {
      if ('touches' in ev && ev.changedTouches) {
        const touchId = (pointer as unknown as { identifier?: number }).identifier;
        for (let i = 0; i < ev.changedTouches.length; i++) {
          const t = ev.changedTouches[i];
          if (touchId === undefined || t.identifier === touchId) {
            clientX = t.clientX;
            clientY = t.clientY;
            break;
          }
        }
      } else if ('clientX' in ev && typeof ev.clientX === 'number') {
        clientX = ev.clientX;
        clientY = ev.clientY;
      }
    }

    if (clientX === undefined || clientY === undefined) {
      return { x: pointer.x, y: pointer.y };
    }

    return {
      x: ((clientX - rect.left) / rect.width) * cam.width,
      y: ((clientY - rect.top) / rect.height) * cam.height
    };
  }

  private screenToWorld(
    sx: number,
    sy: number,
    cam: Phaser.Cameras.Scene2D.Camera,
    zoom: number,
    scrollX: number,
    scrollY: number
  ): { x: number; y: number } {
    const cx = cam.width * 0.5;
    const cy = cam.height * 0.5;
    return {
      x: scrollX + cx + (sx - cx) / zoom,
      y: scrollY + cy + (sy - cy) / zoom
    };
  }

  private scrollForAnchor(
    wx: number,
    wy: number,
    sx: number,
    sy: number,
    cam: Phaser.Cameras.Scene2D.Camera,
    zoom: number
  ): { scrollX: number; scrollY: number } {
    const cx = cam.width * 0.5;
    const cy = cam.height * 0.5;
    return {
      scrollX: wx - cx - (sx - cx) / zoom,
      scrollY: wy - cy - (sy - cy) / zoom
    };
  }

  private setupPanAndZoom(): void {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const pt = this.getPointerCanvasPoint(pointer);
      this.activePointers.set(pointer.id, pt);
      const cam = this.cameras.main;
      this.smoothCamActive = false;

      if (this.activePointers.size >= 2) {
        this.isPinching = true;
        this.dragStart = undefined;
        const pts = Array.from(this.activePointers.values());
        this.prevPinchMid = {
          x: (pts[0].x + pts[1].x) * 0.5,
          y: (pts[0].y + pts[1].y) * 0.5
        };
        this.prevPinchDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      } else {
        this.isPinching = false;
        this.totalDragDist = 0;
        this.prevPinchDist = 0;
        this.prevPinchMid = undefined;
        this.dragStart = { x: pt.x, y: pt.y, scrollX: cam.scrollX, scrollY: cam.scrollY };
      }
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!this.activePointers.has(pointer.id)) return;
      const prev = this.activePointers.get(pointer.id)!;
      const pt = this.getPointerCanvasPoint(pointer);
      const stepDist = Math.hypot(pt.x - prev.x, pt.y - prev.y);
      this.totalDragDist += stepDist;
      this.activePointers.set(pointer.id, pt);

      const cam = this.cameras.main;
      if (this.activePointers.size >= 2) {
        const pts = Array.from(this.activePointers.values());
        const midX = (pts[0].x + pts[1].x) * 0.5;
        const midY = (pts[0].y + pts[1].y) * 0.5;
        const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);

        if (this.prevPinchDist > 8 && dist > 8 && this.prevPinchMid) {
          const oldZoom = cam.zoom;
          const anchorWorld = this.screenToWorld(
            this.prevPinchMid.x,
            this.prevPinchMid.y,
            cam,
            oldZoom,
            cam.scrollX,
            cam.scrollY
          );
          const ratio = dist / this.prevPinchDist;
          const nextZoom = Phaser.Math.Clamp(oldZoom * ratio, 0.42, 4.8);
          const nextScroll = this.scrollForAnchor(anchorWorld.x, anchorWorld.y, midX, midY, cam, nextZoom);

          cam.setZoom(nextZoom);
          this.targetZoom = nextZoom;
          this.targetScrollX = nextScroll.scrollX;
          this.targetScrollY = nextScroll.scrollY;
          this.clampCameraTargets();
          cam.scrollX = this.targetScrollX;
          cam.scrollY = this.targetScrollY;
          this.layoutChargerCards();
        }
        this.prevPinchMid = { x: midX, y: midY };
        this.prevPinchDist = dist;
        return;
      }

      if (!pointer.isDown || !this.dragStart || this.isPinching) return;
      const dx = (this.dragStart.x - pt.x) / cam.zoom;
      const dy = (this.dragStart.y - pt.y) / cam.zoom;
      this.targetZoom = cam.zoom;
      this.targetScrollX = this.dragStart.scrollX + dx;
      this.targetScrollY = this.dragStart.scrollY + dy;
      this.clampCameraTargets();
      cam.scrollX = this.targetScrollX;
      cam.scrollY = this.targetScrollY;
    });

    const handleUp = (pointer: Phaser.Input.Pointer) => {
      this.activePointers.delete(pointer.id);
      if (this.activePointers.size < 2) {
        this.prevPinchDist = 0;
        this.prevPinchMid = undefined;
        if (this.activePointers.size === 1) {
          const rem = Array.from(this.activePointers.values())[0];
          const cam = this.cameras.main;
          this.dragStart = { x: rem.x, y: rem.y, scrollX: cam.scrollX, scrollY: cam.scrollY };
          this.totalDragDist = Math.max(this.totalDragDist, 16);
          this.isPinching = false;
        } else {
          this.dragStart = undefined;
          this.time.delayedCall(25, () => {
            if (this.activePointers.size === 0) {
              this.isPinching = false;
            }
          });
        }
      }
    };

    this.input.on('pointerup', handleUp);
    this.input.on('pointerupoutside', handleUp);
    this.input.on('pointercancel', handleUp);

    this.input.on(
      'wheel',
      (pointer: Phaser.Input.Pointer, _objs: unknown[], _dx: number, dy: number) => {
        const cam = this.cameras.main;
        const pt = this.getPointerCanvasPoint(pointer);
        const baseZoom = this.smoothCamActive ? this.targetZoom : cam.zoom;
        const baseScrollX = this.smoothCamActive ? this.targetScrollX : cam.scrollX;
        const baseScrollY = this.smoothCamActive ? this.targetScrollY : cam.scrollY;
        const anchorWorld = this.screenToWorld(pt.x, pt.y, cam, baseZoom, baseScrollX, baseScrollY);
        const factor = dy > 0 ? 0.86 : 1.16;
        const nextZoom = Phaser.Math.Clamp(baseZoom * factor, 0.42, 4.8);
        const nextScroll = this.scrollForAnchor(anchorWorld.x, anchorWorld.y, pt.x, pt.y, cam, nextZoom);

        this.targetZoom = nextZoom;
        this.targetScrollX = nextScroll.scrollX;
        this.targetScrollY = nextScroll.scrollY;
        this.clampCameraTargets();
        this.smoothCamActive = true;
      }
    );
  }
}
