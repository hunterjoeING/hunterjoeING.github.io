import * as Phaser from 'phaser';
import { CHARGERS, CITIES, HIGHWAY_EDGES, getCityById, getEdgeById } from '../data/europeMap';
import { ChargerStation } from '../types';
import { getBestPriceForStation } from '../sim/EnergyModel';
import { getVehicleById } from '../data/vehicles';
import { ERoadtripBridge } from './GameBridge';
import { SoundFX } from './SoundFX';

export class EuropeMapScene extends Phaser.Scene {
  private bridge!: ERoadtripBridge;
  private worldLayer!: Phaser.GameObjects.Container;
  private dynamicOverlay!: Phaser.GameObjects.Graphics;
  private pinObjects: Array<{ station: ChargerStation; marker: Phaser.GameObjects.Arc; badge: Phaser.GameObjects.Text }> = [];
  private carMarker?: Phaser.GameObjects.Image;
  private dragStart?: { x: number; y: number; camX: number; camY: number };
  private mapBounds = { w: 1000, h: 760 };

  constructor() {
    super({ key: 'EuropeMapScene' });
  }

  init(data: { bridge: ERoadtripBridge }): void {
    this.bridge = data.bridge;
  }

  create(): void {
    this.worldLayer = this.add.container(0, 0);
    this.drawStylizedEuropeMap();
    this.dynamicOverlay = this.add.graphics();
    this.worldLayer.add(this.dynamicOverlay);

    this.drawCitiesAndLandmarks();
    this.createChargerPins();
    this.createLiveCarMarker();

    this.fitCameraToRoute();
    this.setupPanAndZoom();
    this.refreshDynamicState();

    this.scale.on('resize', () => {
      this.fitCameraToRoute();
    });
  }

  private drawStylizedEuropeMap(): void {
    const g = this.add.graphics();
    this.worldLayer.add(g);

    // Stylized Pixel Sea background
    g.fillStyle(0x0c1e38, 1);
    g.fillRect(0, 0, this.mapBounds.w, this.mapBounds.h);

    // Subtle pixel sea grid
    g.lineStyle(1, 0x163257, 0.45);
    for (let x = 0; x <= this.mapBounds.w; x += 32) {
      g.lineBetween(x, 0, x, this.mapBounds.h);
    }
    for (let y = 0; y <= this.mapBounds.h; y += 32) {
      g.lineBetween(0, y, this.mapBounds.w, y);
    }

    // Stylized Mainland Europe landmass polygon
    g.fillStyle(0x1f3a2e, 1);
    g.lineStyle(3, 0x3b6e52, 1);
    const mainland = [
      { x: 165, y: 490 },
      { x: 225, y: 430 },
      { x: 315, y: 342 },
      { x: 380, y: 300 },
      { x: 465, y: 270 },
      { x: 500, y: 185 }, // Jutland / Hirtshals
      { x: 538, y: 268 },
      { x: 648, y: 280 },
      { x: 760, y: 318 },
      { x: 750, y: 525 },
      { x: 615, y: 560 },
      { x: 610, y: 695 }, // Italy boot
      { x: 520, y: 705 },
      { x: 495, y: 570 },
      { x: 365, y: 590 },
      { x: 220, y: 565 }
    ];
    g.fillPoints(mainland, true);
    g.strokePoints(mainland, true);

    // Great Britain / Scotland stylized pixel landmass
    const uk = [
      { x: 175, y: 155 },
      { x: 245, y: 150 },
      { x: 268, y: 280 },
      { x: 258, y: 365 },
      { x: 180, y: 365 },
      { x: 165, y: 245 }
    ];
    g.fillStyle(0x234436, 1);
    g.fillPoints(uk, true);
    g.strokePoints(uk, true);

    // Scandinavia stylized landmass
    const scand = [
      { x: 490, y: 160 },
      { x: 560, y: 92 },
      { x: 675, y: 40 },
      { x: 745, y: 75 },
      { x: 685, y: 195 },
      { x: 585, y: 245 },
      { x: 515, y: 220 }
    ];
    g.fillStyle(0x25423d, 1);
    g.fillPoints(scand, true);
    g.strokePoints(scand, true);

    // Subtle Alps snowband & Germany highlight zone
    g.fillStyle(0x2d4f3f, 0.85);
    g.fillRect(344, 326, 290, 180);
    g.fillStyle(0x3f4c5e, 0.85);
    g.fillRect(455, 520, 165, 50);

    // Background European Autobahn network (all edges muted)
    HIGHWAY_EDGES.forEach(edge => {
      g.lineStyle(4, 0x475569, 0.55);
      for (let i = 0; i < edge.waypoints.length - 1; i++) {
        g.lineBetween(
          edge.waypoints[i].x,
          edge.waypoints[i].y,
          edge.waypoints[i + 1].x,
          edge.waypoints[i + 1].y
        );
      }
    });
  }

  private drawCitiesAndLandmarks(): void {
    const activeEdgeIds = new Set(this.bridge.level.routeLegs.map(l => l.edgeId));
    const activeCityIds = new Set<string>();
    this.bridge.level.routeLegs.forEach(l => {
      const e = getEdgeById(l.edgeId);
      activeCityIds.add(e.fromCityId);
      activeCityIds.add(e.toCityId);
    });

    CITIES.forEach(city => {
      const isActive = activeCityIds.has(city.id);
      const dot = this.add.circle(
        city.mapX,
        city.mapY,
        isActive ? 5 : 3.5,
        isActive ? 0x38bdf8 : 0x94a3b8
      );
      dot.setStrokeStyle(1.5, 0x0f172a);
      this.worldLayer.add(dot);

      if (city.landmark) {
        const lm = this.add.image(city.mapX, city.mapY - 16, `landmark_${city.landmark}`);
        lm.setScale(isActive ? 0.9 : 0.72);
        lm.setAlpha(isActive ? 1 : 0.75);
        this.worldLayer.add(lm);
      }

      const label = this.add.text(city.mapX, city.mapY + 8, city.name, {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: isActive ? '10px' : '9px',
        fontStyle: isActive ? 'bold' : 'normal',
        color: isActive ? '#f8fafc' : '#94a3b8',
        backgroundColor: 'rgba(15, 23, 42, 0.72)',
        padding: { x: 4, y: 1 }
      });
      label.setOrigin(0.5, 0);
      this.worldLayer.add(label);
    });

    // Highway labels for active route
    HIGHWAY_EDGES.filter(e => activeEdgeIds.has(e.id)).forEach(edge => {
      const mid = edge.waypoints[Math.floor(edge.waypoints.length / 2)];
      const tag = this.add.text(mid.x, mid.y - 12, edge.highwayName, {
        fontFamily: 'monospace',
        fontSize: '8px',
        color: '#93c5fd',
        backgroundColor: 'rgba(30, 58, 138, 0.8)',
        padding: { x: 3, y: 1 }
      });
      tag.setOrigin(0.5, 0.5);
      this.worldLayer.add(tag);
    });
  }

  private createChargerPins(): void {
    const activeEdgeIds = new Set(this.bridge.level.routeLegs.map(l => l.edgeId));
    const relevantChargers = CHARGERS.filter(c => activeEdgeIds.has(c.edgeId));

    relevantChargers.forEach(station => {
      const marker = this.add.circle(station.mapX, station.mapY, 6, 0x1e293b);
      marker.setStrokeStyle(2, 0x38bdf8);
      marker.setInteractive({ useHandCursor: true });

      const badge = this.add.text(station.mapX + 7, station.mapY - 11, '⚡', {
        fontFamily: 'sans-serif',
        fontSize: '9px',
        color: '#facc15',
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        padding: { x: 2, y: 1 }
      });

      marker.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        if (pointer.rightButtonDown()) return;
        SoundFX.click();
        this.bridge.onMapSelectCharger(station);
        this.refreshDynamicState();
      });

      this.worldLayer.add(marker);
      this.worldLayer.add(badge);
      this.pinObjects.push({ station, marker, badge });
    });
  }

  private createLiveCarMarker(): void {
    const start = getCityById(this.bridge.level.startCityId);
    this.carMarker = this.add.image(start.mapX, start.mapY, `car_${this.bridge.plan.vehicleId}`);
    this.carMarker.setScale(0.45);
    this.carMarker.setDepth(20);
    this.worldLayer.add(this.carMarker);
  }

  public refreshDynamicState(): void {
    if (!this.dynamicOverlay) return;
    const g = this.dynamicOverlay;
    g.clear();

    // Draw active route polyline with bold glowing highway blue/cyan
    this.bridge.level.routeLegs.forEach(leg => {
      const edge = getEdgeById(leg.edgeId);
      g.lineStyle(5, leg.reverse ? 0x22d3ee : 0x3b82f6, 0.85);
      for (let i = 0; i < edge.waypoints.length - 1; i++) {
        g.lineBetween(
          edge.waypoints[i].x,
          edge.waypoints[i].y,
          edge.waypoints[i + 1].x,
          edge.waypoints[i + 1].y
        );
      }
    });

    const vehicle = getVehicleById(this.bridge.plan.vehicleId);
    const selectedIds = new Set(this.bridge.plan.plannedStops.map(s => s.chargerId));

    this.pinObjects.forEach(({ station, marker, badge }) => {
      const isSelected = selectedIds.has(station.id);
      const tariff = getBestPriceForStation(station, this.bridge.plan.subscriptionIds, vehicle);
      const netColor: Record<string, number> = {
        tesla: 0xef4444,
        enbw: 0xf97316,
        ewego: 0x22c55e,
        electra: 0xa855f7,
        ionity: 0xec4899,
        ac_village: 0x94a3b8
      };

      marker.setFillStyle(isSelected ? 0xfacc15 : netColor[station.network] || 0x38bdf8);
      marker.setRadius(isSelected ? 7.5 : 5.2);
      marker.setStrokeStyle(2, isSelected ? 0xffffff : 0x0f172a);
      badge.setText(
        `${isSelected ? '✓ ' : ''}${station.maxKw}kW · ${tariff.pricePerKwh.toFixed(2)}€`
      );
      badge.setStyle({
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '8.5px',
        color: isSelected ? '#0f172a' : '#e2e8f0',
        backgroundColor: isSelected ? '#facc15' : 'rgba(15, 23, 42, 0.82)',
        padding: { x: 3, y: 1 }
      });
    });

    // Update live car position if a run is in progress
    if (this.carMarker) {
      this.carMarker.setTexture(`car_${this.bridge.plan.vehicleId}`);
      if (this.bridge.runState) {
        const legIdx = Math.min(
          this.bridge.level.routeLegs.length - 1,
          this.bridge.runState.currentLegIndex
        );
        const leg = this.bridge.level.routeLegs[legIdx];
        const edge = getEdgeById(leg.edgeId);
        const rawT = Math.min(1, Math.max(0, this.bridge.runState.legProgressKm / edge.distanceKm));
        const t = leg.reverse ? 1 - rawT : rawT;
        const from = getCityById(edge.fromCityId);
        const to = getCityById(edge.toCityId);
        const cx = from.mapX + (to.mapX - from.mapX) * t;
        const cy = from.mapY + (to.mapY - from.mapY) * t;
        this.carMarker.setPosition(cx, cy);
        const angle = Phaser.Math.Angle.Between(
          leg.reverse ? to.mapX : from.mapX,
          leg.reverse ? to.mapY : from.mapY,
          leg.reverse ? from.mapX : to.mapX,
          leg.reverse ? from.mapY : to.mapY
        );
        this.carMarker.setRotation(angle + Math.PI / 2);
        this.carMarker.setVisible(true);
      } else {
        const start = getCityById(this.bridge.level.startCityId);
        this.carMarker.setPosition(start.mapX, start.mapY);
        this.carMarker.setRotation(Math.PI / 2);
      }
    }
  }

  public fitCameraToRoute(): void {
    const cam = this.cameras.main;
    if (!cam) return;
    // Focus near Level 1 corridor (Aachen..Hannover) by default so details are crystal clear,
    // while allowing full Europe pan/zoom!
    const cities = this.bridge.level.routeLegs.flatMap(l => {
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
    const padX = 110;
    const padY = 95;
    const boxW = Math.max(220, maxX - minX + padX * 2);
    const boxH = Math.max(180, maxY - minY + padY * 2);
    const zoom = Math.min(cam.width / boxW, cam.height / boxH);
    cam.setZoom(Phaser.Math.Clamp(zoom, 0.85, 2.75));
    cam.centerOn((minX + maxX) / 2, (minY + maxY) / 2);
  }

  public zoomFullEurope(): void {
    const cam = this.cameras.main;
    if (!cam) return;
    const zoom = Math.min(cam.width / 820, cam.height / 720);
    cam.setZoom(Phaser.Math.Clamp(zoom, 0.55, 1.5));
    cam.centerOn(455, 385);
  }

  private setupPanAndZoom(): void {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const cam = this.cameras.main;
      this.dragStart = { x: pointer.x, y: pointer.y, camX: cam.scrollX, camY: cam.scrollY };
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!pointer.isDown || !this.dragStart) return;
      const cam = this.cameras.main;
      const dx = (this.dragStart.x - pointer.x) / cam.zoom;
      const dy = (this.dragStart.y - pointer.y) / cam.zoom;
      cam.scrollX = Phaser.Math.Clamp(this.dragStart.camX + dx, -150, this.mapBounds.w - 150);
      cam.scrollY = Phaser.Math.Clamp(this.dragStart.camY + dy, -120, this.mapBounds.h - 120);
    });

    this.input.on('pointerup', () => {
      this.dragStart = undefined;
    });

    this.input.on(
      'wheel',
      (_pointer: Phaser.Input.Pointer, _objs: unknown[], _dx: number, dy: number) => {
        const cam = this.cameras.main;
        const next = Phaser.Math.Clamp(cam.zoom - dy * 0.0012, 0.55, 3.2);
        cam.setZoom(next);
      }
    );
  }
}
