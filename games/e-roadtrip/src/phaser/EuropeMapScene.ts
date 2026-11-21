import * as Phaser from 'phaser';
import {
  CHARGERS,
  CITIES,
  HIGHWAY_EDGES,
  getCityById,
  getEdgeById
} from '../data/europeMap';
import {
  COUNTRY_BORDERS,
  COUNTRY_LABELS,
  DENMARK_ZEALAND_POLY,
  IRELAND_POLY,
  MAINLAND_EUROPE_POLY,
  MAP_BOUNDS,
  MOUNTAIN_CLUSTERS,
  MapPoint,
  RIVERS,
  SARDINIA_CORSICA_POLYS,
  SCANDINAVIA_POLY,
  SICILY_POLY,
  UK_POLY
} from '../data/europeGeography';
import { ChargerStation } from '../types';
import { getBestPriceForStation } from '../sim/EnergyModel';
import { getActiveRouteLegs, getActiveRouteOption } from '../sim/RoutePlanner';
import { getVehicleById } from '../data/vehicles';
import { ERoadtripBridge } from './GameBridge';
import { SoundFX } from './SoundFX';

interface ChargerPinNode {
  station: ChargerStation;
  onActiveRoute: boolean;
  dot: Phaser.GameObjects.Arc;
  card: Phaser.GameObjects.Container;
  cardBg: Phaser.GameObjects.Rectangle;
  cardAccent: Phaser.GameObjects.Rectangle;
  logo: Phaser.GameObjects.Image;
  titleText: Phaser.GameObjects.Text;
  priceText: Phaser.GameObjects.Text;
  noSubText: Phaser.GameObjects.Text;
  cardW: number;
  cardH: number;
  worldX: number;
  worldY: number;
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

function toVec2(pts: MapPoint[]): Phaser.Math.Vector2[] {
  return pts.map(p => new Phaser.Math.Vector2(p.x, p.y));
}

export class EuropeMapScene extends Phaser.Scene {
  private bridge!: ERoadtripBridge;
  private worldLayer!: Phaser.GameObjects.Container;
  private dynamicOverlay!: Phaser.GameObjects.Graphics;
  private leaderOverlay!: Phaser.GameObjects.Graphics;
  private routePillsLayer!: Phaser.GameObjects.Container;
  private chargerLayer!: Phaser.GameObjects.Container;

  private pinObjects: ChargerPinNode[] = [];
  private cityLabels: Array<{ text: Phaser.GameObjects.Text; isMajor: boolean; isActive: boolean }> = [];
  private shieldTags: Phaser.GameObjects.Container[] = [];
  private carMarker?: Phaser.GameObjects.Image;

  private mapBounds = MAP_BOUNDS;
  private lastLayoutZoom = -1;
  private activePointers = new Map<number, { x: number; y: number }>();
  private dragStart?: { x: number; y: number; camX: number; camY: number };
  private totalDragDist = 0;
  private prevPinchDist = 0;
  private isPinching = false;

  constructor() {
    super({ key: 'EuropeMapScene' });
  }

  init(data: { bridge: ERoadtripBridge }): void {
    this.bridge = data.bridge;
    this.pinObjects = [];
    this.cityLabels = [];
    this.shieldTags = [];
    this.lastLayoutZoom = -1;
    this.activePointers.clear();
  }

  create(): void {
    this.input.addPointer(1); // Enable 2-finger pinch on mobile

    this.worldLayer = this.add.container(0, 0);
    this.drawDetailedEuropeMap();

    this.dynamicOverlay = this.add.graphics();
    this.worldLayer.add(this.dynamicOverlay);

    this.routePillsLayer = this.add.container(0, 0);
    this.worldLayer.add(this.routePillsLayer);

    this.drawCitiesAndLandmarks();

    this.leaderOverlay = this.add.graphics();
    this.worldLayer.add(this.leaderOverlay);

    this.chargerLayer = this.add.container(0, 0);
    this.worldLayer.add(this.chargerLayer);

    this.createChargerPins();
    this.createLiveCarMarker();

    this.fitCameraToRoute();
    this.setupPanAndZoom();
    this.refreshDynamicState();

    this.scale.on('resize', () => {
      if (this.scene.isActive()) {
        this.layoutChargerCards(true);
      }
    });
  }

  private drawDetailedEuropeMap(): void {
    const g = this.add.graphics();
    this.worldLayer.add(g);

    // Deep pixel ocean
    g.fillStyle(0x09192f, 1);
    g.fillRect(0, 0, this.mapBounds.w, this.mapBounds.h);

    // Subtle ocean lat/lon pixel grid
    g.lineStyle(1, 0x132c4e, 0.5);
    for (let x = 0; x <= this.mapBounds.w; x += 48) {
      g.lineBetween(x, 0, x, this.mapBounds.h);
    }
    for (let y = 0; y <= this.mapBounds.h; y += 48) {
      g.lineBetween(0, y, this.mapBounds.w, y);
    }

    // Coastal shallow-water glow around landmasses
    const allPolys = [
      MAINLAND_EUROPE_POLY,
      DENMARK_ZEALAND_POLY,
      UK_POLY,
      IRELAND_POLY,
      SCANDINAVIA_POLY,
      SICILY_POLY,
      ...SARDINIA_CORSICA_POLYS
    ];

    allPolys.forEach(poly => {
      g.lineStyle(12, 0x13385f, 0.65);
      g.strokePoints(toVec2(poly), true);
    });

    // Landmasses
    g.fillStyle(0x1f3d2e, 1);
    g.lineStyle(3, 0x457b5b, 1);
    g.fillPoints(toVec2(MAINLAND_EUROPE_POLY), true);
    g.strokePoints(toVec2(MAINLAND_EUROPE_POLY), true);

    g.fillStyle(0x214132, 1);
    g.fillPoints(toVec2(DENMARK_ZEALAND_POLY), true);
    g.strokePoints(toVec2(DENMARK_ZEALAND_POLY), true);

    g.fillStyle(0x244638, 1);
    g.fillPoints(toVec2(UK_POLY), true);
    g.strokePoints(toVec2(UK_POLY), true);

    g.fillStyle(0x224335, 1);
    g.fillPoints(toVec2(IRELAND_POLY), true);
    g.strokePoints(toVec2(IRELAND_POLY), true);

    g.fillStyle(0x23413d, 1);
    g.fillPoints(toVec2(SCANDINAVIA_POLY), true);
    g.strokePoints(toVec2(SCANDINAVIA_POLY), true);

    g.fillStyle(0x23402f, 1);
    g.fillPoints(toVec2(SICILY_POLY), true);
    g.strokePoints(toVec2(SICILY_POLY), true);
    SARDINIA_CORSICA_POLYS.forEach(p => {
      g.fillPoints(toVec2(p), true);
      g.strokePoints(toVec2(p), true);
    });

    // Terrain shading zones: North German Plain, Alps rocky band, Po valley
    g.fillStyle(0x284d3a, 0.72);
    g.fillEllipse(850, 665, 420, 210); // North German & Dutch plain
    g.fillStyle(0x334155, 0.55);
    g.fillEllipse(930, 1085, 410, 82); // Alpine ridge zone

    // Major European Rivers (pixel channels)
    RIVERS.forEach(river => {
      g.lineStyle(3, 0x1d6fa5, 0.78);
      for (let i = 0; i < river.points.length - 1; i++) {
        g.lineBetween(
          river.points[i].x,
          river.points[i].y,
          river.points[i + 1].x,
          river.points[i + 1].y
        );
      }
      const mid = river.points[Math.floor(river.points.length / 2)];
      const rTxt = this.add.text(mid.x + 6, mid.y - 6, river.name, {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '9px',
        fontStyle: 'italic',
        color: '#60a5fa',
        resolution: 3
      });
      rTxt.setAlpha(0.7);
      this.worldLayer.add(rTxt);
    });

    // Pixel-art Mountain Peaks & Snowcaps
    MOUNTAIN_CLUSTERS.forEach(cluster => {
      cluster.peaks.forEach(pk => {
        const s = pk.size;
        g.fillStyle(0x475569, 0.9);
        g.fillTriangle(pk.x, pk.y - s, pk.x - s * 0.85, pk.y + s * 0.45, pk.x + s * 0.85, pk.y + s * 0.45);
        g.fillStyle(0x334155, 0.9);
        g.fillTriangle(pk.x, pk.y - s, pk.x, pk.y + s * 0.45, pk.x + s * 0.85, pk.y + s * 0.45);
        if (pk.snow) {
          g.fillStyle(0xf8fafc, 0.92);
          g.fillTriangle(pk.x, pk.y - s, pk.x - s * 0.36, pk.y - s * 0.25, pk.x + s * 0.36, pk.y - s * 0.25);
        }
      });
    });

    // Subtle national borders
    g.lineStyle(1.5, 0x94a3b8, 0.32);
    COUNTRY_BORDERS.forEach(border => {
      for (let i = 0; i < border.length - 1; i++) {
        this.drawDashedLine(g, border[i].x, border[i].y, border[i + 1].x, border[i + 1].y, 7, 5);
      }
    });

    // Country labels
    COUNTRY_LABELS.forEach(cl => {
      const lbl = this.add.text(cl.x, cl.y, cl.name, {
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
        fontStyle: 'bold',
        color: 'rgba(148, 163, 184, 0.42)',
        letterSpacing: 2,
        resolution: 3
      });
      lbl.setOrigin(0.5);
      this.worldLayer.add(lbl);
    });

    // Realistic European Autobahn / Highway Network (dual-casing pixel roads)
    HIGHWAY_EDGES.forEach(edge => {
      g.lineStyle(6, 0x0f172a, 0.65);
      for (let i = 0; i < edge.waypoints.length - 1; i++) {
        g.lineBetween(edge.waypoints[i].x, edge.waypoints[i].y, edge.waypoints[i + 1].x, edge.waypoints[i + 1].y);
      }
      g.lineStyle(3, 0x475569, 0.78);
      for (let i = 0; i < edge.waypoints.length - 1; i++) {
        g.lineBetween(edge.waypoints[i].x, edge.waypoints[i].y, edge.waypoints[i + 1].x, edge.waypoints[i + 1].y);
      }
    });

    // Autobahn Number Shields on major edges
    HIGHWAY_EDGES.forEach((edge, idx) => {
      if (idx % 2 === 1 && edge.distanceKm < 120) return; // avoid shield clutter
      const mid = edge.waypoints[Math.floor(edge.waypoints.length / 2)];
      const shortCode = edge.highwayName.split(' ')[0].slice(0, 5);
      const isEuro = shortCode.startsWith('E');
      const isFerry = edge.highwayName.includes('Fähre') || edge.highwayName.includes('Tunnel');
      const bgHex = isFerry ? 0x0284c7 : isEuro ? 0x15803d : 0x1d4ed8;

      const cont = this.add.container(mid.x, mid.y);
      const rect = this.add.rectangle(0, 0, Math.max(22, shortCode.length * 6 + 8), 13, bgHex, 0.92);
      rect.setStrokeStyle(1, 0xe2e8f0, 0.85);
      const txt = this.add
        .text(0, 0, shortCode, {
          fontFamily: 'monospace',
          fontSize: '8.5px',
          fontStyle: 'bold',
          color: '#ffffff',
          resolution: 3
        })
        .setOrigin(0.5);
      cont.add([rect, txt]);
      this.worldLayer.add(cont);
      this.shieldTags.push(cont);
    });

    // Pixel Compass Rose & Scale Bar in bottom-left Atlantic corner
    this.drawMapLegendDecor(g);
  }

  private drawMapLegendDecor(g: Phaser.GameObjects.Graphics): void {
    const cx = 135;
    const cy = 1280;
    g.lineStyle(2, 0x38bdf8, 0.55);
    g.strokeCircle(cx, cy, 26);
    g.fillStyle(0x0f172a, 0.75);
    g.fillCircle(cx, cy, 25);
    g.fillStyle(0x38bdf8, 0.9);
    g.fillTriangle(cx, cy - 22, cx - 5, cy, cx + 5, cy);
    g.fillStyle(0x94a3b8, 0.65);
    g.fillTriangle(cx, cy + 22, cx - 5, cy, cx + 5, cy);
    const nTxt = this.add
      .text(cx, cy - 34, 'N', {
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
        fontStyle: 'bold',
        color: '#38bdf8',
        resolution: 3
      })
      .setOrigin(0.5);
    this.worldLayer.add(nTxt);

    const scaleTxt = this.add
      .text(cx + 55, cy + 8, 'EUROPA E-AUTO NETZ\nZoom: Mausrad / Pinch', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '10px',
        color: '#94a3b8',
        resolution: 3
      })
      .setOrigin(0, 0.5);
    this.worldLayer.add(scaleTxt);
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

  private drawCitiesAndLandmarks(): void {
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
      const radius = city.isMajor ? (isInLevel ? 5.5 : 4.5) : isInLevel ? 4 : 3;
      const fill = isInLevel ? 0x38bdf8 : city.isMajor ? 0xcbd5e1 : 0x64748b;

      const dot = this.add.circle(city.mapX, city.mapY, radius, fill);
      dot.setStrokeStyle(1.5, 0x0f172a);
      dot.setDepth(6);
      this.worldLayer.add(dot);

      if (city.landmark) {
        const lm = this.add.image(city.mapX, city.mapY - 17, `landmark_${city.landmark}`);
        lm.setScale(isInLevel ? 0.95 : 0.72);
        lm.setAlpha(isInLevel ? 1 : 0.78);
        lm.setDepth(7);
        this.worldLayer.add(lm);
      }

      const label = this.add.text(city.mapX, city.mapY + 7, city.name, {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: isInLevel ? '11px' : city.isMajor ? '10px' : '9px',
        fontStyle: isInLevel || city.isMajor ? 'bold' : 'normal',
        color: isInLevel ? '#f8fafc' : '#cbd5e1',
        backgroundColor: isInLevel ? 'rgba(15, 23, 42, 0.82)' : 'rgba(15, 23, 42, 0.58)',
        padding: { x: 4, y: 1 },
        resolution: 3
      });
      label.setOrigin(0.5, 0);
      label.setDepth(8);
      this.worldLayer.add(label);
      this.cityLabels.push({ text: label, isMajor: !!city.isMajor, isActive: isInLevel });
    });
  }

  private createChargerPins(): void {
    // Include chargers on any of the 3 route options for this level
    const levelEdgeIds = new Set<string>();
    this.bridge.level.routeOptions.forEach(opt => {
      opt.legs.forEach(l => levelEdgeIds.add(l.edgeId));
    });
    const relevantChargers = CHARGERS.filter(c => levelEdgeIds.has(c.edgeId));

    relevantChargers.forEach(station => {
      const netColor = NET_COLORS[station.network] || 0x38bdf8;
      const dot = this.add.circle(station.mapX, station.mapY, 5.5, netColor);
      dot.setStrokeStyle(2, 0x0f172a);
      dot.setDepth(12);
      dot.setInteractive({ useHandCursor: true });

      const cardW = 166;
      const cardH = 44;
      const card = this.add.container(station.mapX, station.mapY - 26);
      card.setDepth(15);

      const cardBg = this.add.rectangle(0, 0, cardW, cardH, 0x0f172a, 0.94);
      cardBg.setStrokeStyle(1.5, netColor, 0.95);
      cardBg.setInteractive({ useHandCursor: true });

      const cardAccent = this.add.rectangle(-cardW / 2 + 2.5, 0, 5, cardH - 2, netColor, 1);

      const logo = this.add.image(-cardW / 2 + 21, 0, `logo_${station.network}`);
      logo.setDisplaySize(24, 24);

      const titleText = this.add.text(-cardW / 2 + 38, -14, '', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '10px',
        fontStyle: 'bold',
        color: '#f8fafc',
        resolution: 3
      });

      const priceText = this.add.text(-cardW / 2 + 38, -1, '', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '10.5px',
        fontStyle: 'bold',
        color: '#4ade80',
        resolution: 3
      });

      const noSubText = this.add.text(-cardW / 2 + 38, 11, '', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '8.5px',
        color: '#94a3b8',
        resolution: 3
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

      this.chargerLayer.add(dot);
      this.chargerLayer.add(card);

      this.pinObjects.push({
        station,
        onActiveRoute: false,
        dot,
        card,
        cardBg,
        cardAccent,
        logo,
        titleText,
        priceText,
        noSubText,
        cardW,
        cardH,
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
    if (!this.dynamicOverlay) return;
    const g = this.dynamicOverlay;
    g.clear();
    this.routePillsLayer.removeAll(true);

    const activeRoute = getActiveRouteOption(this.bridge.level, this.bridge.plan);
    const activeLegs = getActiveRouteLegs(this.bridge.level, this.bridge.plan);
    const activeEdgeIds = new Set(activeLegs.map(l => l.edgeId));

    // 1. Draw the 2 unselected alternative routes first (dashed distinct colors)
    this.bridge.level.routeOptions.forEach(opt => {
      if (opt.id === activeRoute.id) return;
      g.lineStyle(4, opt.colorHex, 0.48);
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

      // Place clickable pill at mid-leg of alternative route
      const midLeg = opt.legs[Math.min(1, Math.floor(opt.legs.length / 2))];
      if (midLeg) {
        const edge = getEdgeById(midLeg.edgeId);
        const wp = edge.waypoints[Math.floor(edge.waypoints.length / 2)];
        const pill = this.add.container(wp.x, wp.y - 16);
        const bg = this.add.rectangle(0, 0, 118, 18, 0x0f172a, 0.88);
        bg.setStrokeStyle(1.5, opt.colorHex, 0.95);
        bg.setInteractive({ useHandCursor: true });
        const txt = this.add
          .text(0, 0, `${opt.shortLabel} · ${opt.trafficRisk} Stau`, {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '9px',
            fontStyle: 'bold',
            color: '#e2e8f0',
            resolution: 3
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

    // 2. Draw active selected route bold with glow casing
    activeLegs.forEach(leg => {
      const edge = getEdgeById(leg.edgeId);
      if (leg.reverse) return;
      g.lineStyle(9, activeRoute.colorHex, 0.25);
      for (let i = 0; i < edge.waypoints.length - 1; i++) {
        g.lineBetween(edge.waypoints[i].x, edge.waypoints[i].y, edge.waypoints[i + 1].x, edge.waypoints[i + 1].y);
      }
      g.lineStyle(5, activeRoute.colorHex, 0.94);
      for (let i = 0; i < edge.waypoints.length - 1; i++) {
        g.lineBetween(edge.waypoints[i].x, edge.waypoints[i].y, edge.waypoints[i + 1].x, edge.waypoints[i + 1].y);
      }
    });

    // 3. Update Charger Pins & Crisp Info Cards
    const vehicle = getVehicleById(this.bridge.plan.vehicleId);
    const selectedIds = new Set(this.bridge.plan.plannedStops.map(s => s.chargerId));

    this.pinObjects.forEach(node => {
      const { station } = node;
      node.onActiveRoute = activeEdgeIds.has(station.edgeId);
      const isSelected = selectedIds.has(station.id);
      const tariff = getBestPriceForStation(station, this.bridge.plan.subscriptionIds, vehicle);
      const netColor = NET_COLORS[station.network] || 0x38bdf8;

      node.dot.setFillStyle(isSelected ? 0xfacc15 : netColor);
      node.dot.setRadius(isSelected ? 7.5 : node.onActiveRoute ? 5.5 : 4);
      node.dot.setStrokeStyle(2, isSelected ? 0xffffff : 0x0f172a);
      node.dot.setAlpha(node.onActiveRoute ? 1 : 0.45);

      node.cardBg.setFillStyle(isSelected ? 0x1e293b : 0x0f172a, node.onActiveRoute ? 0.95 : 0.72);
      node.cardBg.setStrokeStyle(isSelected ? 2 : 1.5, isSelected ? 0xfacc15 : netColor, node.onActiveRoute ? 0.95 : 0.5);
      node.cardAccent.setFillStyle(isSelected ? 0xfacc15 : netColor, 1);

      const icons = `${station.hasMcDonalds ? ' 🍔' : ''}${station.trailerFriendly ? ' 🚐' : ''}`;
      const shortNet = NET_SHORT[station.network] || station.network.toUpperCase();
      node.titleText.setText(`${isSelected ? '✓ ' : ''}${shortNet} · ${station.maxKw}kW (${station.stalls}x)${icons}`);
      node.priceText.setText(`${tariff.pricePerKwh.toFixed(2)} €/kWh`);
      node.priceText.setColor(tariff.hasSubscriptionDiscount ? '#4ade80' : '#facc15');

      if (tariff.hasSubscriptionDiscount) {
        node.noSubText.setText(`ohne Abo: ${tariff.pricePerKwhWithoutSub.toFixed(2)} €/kWh`);
        node.noSubText.setVisible(true);
      } else {
        node.noSubText.setText(`${station.cityHint.slice(0, 22)}`);
        node.noSubText.setVisible(true);
      }

      node.card.setAlpha(node.onActiveRoute ? 1 : 0.55);
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
        const t = leg.reverse ? 1 - rawT : rawT;
        const from = getCityById(edge.fromCityId);
        const to = getCityById(edge.toCityId);
        this.carMarker.setPosition(
          from.mapX + (to.mapX - from.mapX) * t,
          from.mapY + (to.mapY - from.mapY) * t
        );
        const angle = Phaser.Math.Angle.Between(
          leg.reverse ? to.mapX : from.mapX,
          leg.reverse ? to.mapY : from.mapY,
          leg.reverse ? from.mapX : to.mapX,
          leg.reverse ? from.mapY : to.mapY
        );
        this.carMarker.setRotation(angle + Math.PI / 2);
      } else {
        const start = getCityById(this.bridge.level.startCityId);
        this.carMarker.setPosition(start.mapX, start.mapY);
        this.carMarker.setRotation(Math.PI / 2);
      }
    }
  }

  /**
   * Computes crisp, non-overlapping positions for all visible charger cards at the current camera zoom,
   * and draws crisp leader lines back to exact highway pins.
   */
  public layoutChargerCards(force = false): void {
    const cam = this.cameras.main;
    if (!cam || !this.leaderOverlay) return;

    const zoom = cam.zoom;
    if (!force && Math.abs(zoom - this.lastLayoutZoom) < 0.06) return;
    this.lastLayoutZoom = zoom;

    this.leaderOverlay.clear();

    // Show full detailed cards when zoomed in (>= 1.15) or for active selected stops;
    // keep inactive route cards hidden unless zoomed in deeply (>= 1.65)
    const showDetailedCards = zoom >= 1.12;
    const showInactiveRouteCards = zoom >= 1.65;

    // Scale cards inversely to zoom so text stays crisp & near native screen size!
    const cardScale = Phaser.Math.Clamp(1.0 / Math.pow(zoom, 0.82), 0.28, 1.0);

    // Adjust city label & shield scales for zoom crispness
    const labelScale = Phaser.Math.Clamp(1.0 / Math.pow(zoom, 0.65), 0.35, 1.05);
    this.cityLabels.forEach(item => {
      item.text.setScale(labelScale);
      const show = item.isActive || item.isMajor || zoom >= 1.15;
      item.text.setVisible(show);
    });
    this.shieldTags.forEach(s => {
      s.setScale(Phaser.Math.Clamp(1.0 / Math.pow(zoom, 0.68), 0.38, 1.0));
      s.setVisible(zoom >= 0.85);
    });

    const selectedIds = new Set(this.bridge.plan.plannedStops.map(s => s.chargerId));
    const visibleNodes: ChargerPinNode[] = [];

    this.pinObjects.forEach(node => {
      const isSelected = selectedIds.has(node.station.id);
      const visible =
        (node.onActiveRoute && (showDetailedCards || isSelected)) ||
        (!node.onActiveRoute && showInactiveRouteCards);

      node.card.setVisible(visible);
      if (visible) {
        node.card.setScale(cardScale);
        visibleNodes.push(node);
      }
    });

    if (visibleNodes.length === 0) return;

    // Initial fanned placement around pins to break collinear highway symmetry
    const offsets = [
      { dx: -1, dy: -1.15 },
      { dx: 1, dy: 1.15 },
      { dx: 1.1, dy: -1.1 },
      { dx: -1.1, dy: 1.1 }
    ];
    visibleNodes.forEach((n, idx) => {
      const off = offsets[idx % offsets.length];
      const hw = (n.cardW * cardScale) * 0.5;
      const hh = (n.cardH * cardScale) * 0.5;
      n.worldX = n.station.mapX + off.dx * (hw * 0.72 + 12 * cardScale);
      n.worldY = n.station.mapY + off.dy * (hh + 18 * cardScale);
    });

    // Iterative pairwise 2D AABB repulsion for zero overlapping
    const pad = 6 * cardScale;
    for (let iter = 0; iter < 18; iter++) {
      for (let i = 0; i < visibleNodes.length; i++) {
        const a = visibleNodes[i];
        const ahw = (a.cardW * cardScale) / 2 + pad;
        const ahh = (a.cardH * cardScale) / 2 + pad;

        for (let j = i + 1; j < visibleNodes.length; j++) {
          const b = visibleNodes[j];
          const bhw = (b.cardW * cardScale) / 2 + pad;
          const bhh = (b.cardH * cardScale) / 2 + pad;

          const dx = b.worldX - a.worldX;
          const dy = b.worldY - a.worldY;
          const overlapX = ahw + bhw - Math.abs(dx);
          const overlapY = ahh + bhh - Math.abs(dy);

          if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
              const sign = dx >= 0 ? 1 : -1;
              const push = overlapX * 0.54;
              a.worldX -= sign * push;
              b.worldX += sign * push;
            } else {
              const sign = dy >= 0 ? 1 : -1;
              const push = overlapY * 0.54;
              a.worldY -= sign * push;
              b.worldY += sign * push;
            }
          }
        }

        // Gentle spring pull toward pin so cards stay near their station
        a.worldX += (a.station.mapX - a.worldX) * 0.04;
        a.worldY += (a.station.mapY - a.worldY) * 0.04;
      }
    }

    // Apply positions & draw crisp leader lines
    visibleNodes.forEach(n => {
      n.card.setPosition(n.worldX, n.worldY);
      const isSelected = selectedIds.has(n.station.id);
      const lineColor = isSelected ? 0xfacc15 : NET_COLORS[n.station.network] || 0x38bdf8;
      this.leaderOverlay.lineStyle(Math.max(1.2, 2.0 * cardScale), lineColor, n.onActiveRoute ? 0.9 : 0.45);
      this.leaderOverlay.lineBetween(n.station.mapX, n.station.mapY, n.worldX, n.worldY);
    });
  }

  public zoomBy(factor: number): void {
    const cam = this.cameras.main;
    if (!cam) return;
    const next = Phaser.Math.Clamp(cam.zoom * factor, 0.42, 4.8);
    cam.setZoom(next);
    this.clampCameraScroll();
    this.layoutChargerCards();
  }

  public fitCameraToRoute(): void {
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
    const padX = 115;
    const padY = 95;
    const boxW = Math.max(260, maxX - minX + padX * 2);
    const boxH = Math.max(220, maxY - minY + padY * 2);
    const zoom = Math.min(cam.width / boxW, cam.height / boxH);
    cam.setZoom(Phaser.Math.Clamp(zoom, 0.48, 2.4));
    cam.centerOn((minX + maxX) / 2, (minY + maxY) / 2);
    this.clampCameraScroll();
    this.layoutChargerCards(true);
  }

  public zoomFullEurope(): void {
    const cam = this.cameras.main;
    if (!cam) return;
    const zoom = Math.min(cam.width / 1380, cam.height / 1320);
    cam.setZoom(Phaser.Math.Clamp(zoom, 0.42, 1.4));
    cam.centerOn(780, 710);
    this.clampCameraScroll();
    this.layoutChargerCards(true);
  }

  private clampCameraScroll(): void {
    const cam = this.cameras.main;
    if (!cam) return;
    cam.scrollX = Phaser.Math.Clamp(cam.scrollX, -220, this.mapBounds.w - 180);
    cam.scrollY = Phaser.Math.Clamp(cam.scrollY, -180, this.mapBounds.h - 140);
  }

  private setupPanAndZoom(): void {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.activePointers.set(pointer.id, { x: pointer.x, y: pointer.y });
      const cam = this.cameras.main;

      if (this.activePointers.size >= 2) {
        this.isPinching = true;
        this.dragStart = undefined;
        const pts = Array.from(this.activePointers.values());
        this.prevPinchDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      } else {
        this.isPinching = false;
        this.totalDragDist = 0;
        this.dragStart = { x: pointer.x, y: pointer.y, camX: cam.scrollX, camY: cam.scrollY };
      }
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!this.activePointers.has(pointer.id)) return;
      const prev = this.activePointers.get(pointer.id)!;
      const stepDist = Math.hypot(pointer.x - prev.x, pointer.y - prev.y);
      this.totalDragDist += stepDist;
      this.activePointers.set(pointer.id, { x: pointer.x, y: pointer.y });

      const cam = this.cameras.main;
      if (this.activePointers.size >= 2) {
        const pts = Array.from(this.activePointers.values());
        const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        if (this.prevPinchDist > 8 && dist > 8) {
          const midX = (pts[0].x + pts[1].x) / 2;
          const midY = (pts[0].y + pts[1].y) / 2;
          const worldBefore = cam.getWorldPoint(midX, midY);
          const ratio = dist / this.prevPinchDist;
          const nextZoom = Phaser.Math.Clamp(cam.zoom * ratio, 0.42, 4.8);
          cam.setZoom(nextZoom);
          const worldAfter = cam.getWorldPoint(midX, midY);
          cam.scrollX += worldBefore.x - worldAfter.x;
          cam.scrollY += worldBefore.y - worldAfter.y;
          this.clampCameraScroll();
          this.layoutChargerCards();
        }
        this.prevPinchDist = dist;
        return;
      }

      if (!pointer.isDown || !this.dragStart || this.isPinching) return;
      const dx = (this.dragStart.x - pointer.x) / cam.zoom;
      const dy = (this.dragStart.y - pointer.y) / cam.zoom;
      cam.scrollX = this.dragStart.camX + dx;
      cam.scrollY = this.dragStart.camY + dy;
      this.clampCameraScroll();
    });

    const handleUp = (pointer: Phaser.Input.Pointer) => {
      this.activePointers.delete(pointer.id);
      if (this.activePointers.size < 2) {
        this.prevPinchDist = 0;
        if (this.activePointers.size === 1) {
          const rem = Array.from(this.activePointers.values())[0];
          const cam = this.cameras.main;
          this.dragStart = { x: rem.x, y: rem.y, camX: cam.scrollX, camY: cam.scrollY };
        } else {
          this.dragStart = undefined;
          // Small timeout so pointerup handlers on pins inspect isPinching cleanly
          this.time.delayedCall(20, () => {
            this.isPinching = false;
          });
        }
      }
    };

    this.input.on('pointerup', handleUp);
    this.input.on('pointerupoutside', handleUp);

    this.input.on(
      'wheel',
      (pointer: Phaser.Input.Pointer, _objs: unknown[], _dx: number, dy: number) => {
        const cam = this.cameras.main;
        const worldBefore = cam.getWorldPoint(pointer.x, pointer.y);
        const factor = dy > 0 ? 0.88 : 1.14;
        const nextZoom = Phaser.Math.Clamp(cam.zoom * factor, 0.42, 4.8);
        cam.setZoom(nextZoom);
        const worldAfter = cam.getWorldPoint(pointer.x, pointer.y);
        cam.scrollX += worldBefore.x - worldAfter.x;
        cam.scrollY += worldBefore.y - worldAfter.y;
        this.clampCameraScroll();
        this.layoutChargerCards();
      }
    );
  }
}
