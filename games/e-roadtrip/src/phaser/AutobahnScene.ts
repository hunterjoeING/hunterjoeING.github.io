import * as Phaser from 'phaser';
import { getChargersForEdge, getCityById, getEdgeById } from '../data/europeMap';
import { getVehicleById } from '../data/vehicles';
import { computeConsumptionKwh100 } from '../sim/EnergyModel';
import {
  activeSignKmh,
  defaultLegSpeedKmh,
  getActiveRouteLegs,
  sectionMaxSpeedKmh,
  snapSpeedKmh,
  speedTrapChancePerSimMinute
} from '../sim/RoutePlanner';
import { ChargerStation, RunState, WeatherKind } from '../types';
import {
  HighwayCar,
  baseSpeed,
  countSpriteOverlaps,
  enforceTrafficGaps,
  followSpeedKmh,
  laneIsClear,
  leadVehicle,
  preferredPlayerLane,
  rosterForRisk,
  stepHighwayTraffic,
  textureForKind
} from './AutobahnTraffic';
import { ERoadtripBridge } from './GameBridge';
import { hashString } from './PlaceStyles';
import { SoundFX } from './SoundFX';

interface WorkZone {
  startKm: number;
  endKm: number;
  limit: 60 | 80;
}

interface LampPost {
  sprite: Phaser.GameObjects.Image;
  glow?: Phaser.GameObjects.Image;
  side: -1 | 1;
  along: number;
}

function workZoneFor(edgeId: string, distanceKm: number, force: boolean): WorkZone | null {
  if (!force && distanceKm < 45) return null;
  const h = hashString(edgeId);
  if (!force && h % 2 === 1) return null;
  const limit: 60 | 80 = h % 3 === 0 ? 60 : 80;
  const span = limit === 60 ? 5.5 : 7.5;
  const start = force ? Math.min(12, distanceKm * 0.22) : (0.28 + (h % 4) * 0.07) * distanceKm;
  const end = Math.min(distanceKm - 4, start + span);
  if (end - start < 3) return null;
  return { startKm: start, endKm: end, limit };
}

export class AutobahnScene extends Phaser.Scene {
  private bridge!: ERoadtripBridge;
  private previewWeather?: WeatherKind;
  private previewRisk?: number;
  private forceWorkZone = false;

  private playerCar!: Phaser.GameObjects.Image;
  private playerReflection?: Phaser.GameObjects.Image;
  private playerHeadlight?: Phaser.GameObjects.Image;
  private playerTaillight?: Phaser.GameObjects.Image;
  private playerBlinkL?: Phaser.GameObjects.Image;
  private playerBlinkR?: Phaser.GameObjects.Image;
  private playerHalo?: Phaser.GameObjects.Ellipse;
  private tailgateBlinkSec = 0;
  private nightOverlay!: Phaser.GameObjects.Rectangle;
  private roadGfx!: Phaser.GameObjects.Graphics;
  private roadPhase = 0;
  private laneSpacing = 72;
  private playerLane = 1;
  private laneCooldown = 0;
  private playerSpeedKmh = 0;
  private debugTraffic = false;
  private debugMinPlayerGap = 9999;
  private debugOverlapFrames = 0;
  private debugSpeedSum = 0;
  private debugSpeedSamples = 0;
  private debugPops = 0;
  private npcs: HighwayCar[] = [];
  private trees: Phaser.GameObjects.Image[] = [];
  private lamps: LampPost[] = [];
  private shimmers: Phaser.GameObjects.Image[] = [];
  private rainDrops: Phaser.GameObjects.Image[] = [];
  private splashes: Phaser.GameObjects.Image[] = [];
  private beacons: Phaser.GameObjects.Image[] = [];
  private baken: Phaser.GameObjects.Image[] = [];
  private signBoard?: Phaser.GameObjects.Container;
  private gantryObj?: Phaser.GameObjects.Container;
  private hudTickAccum = 0;
  private eventCooldownSec = 4;
  private builtLeg = -1;
  private trafficRisk = 0.2;
  private isMobilePerf = false;
  private resizeHandler?: (gameSize: Phaser.Structs.Size) => void;

  constructor() {
    super({ key: 'AutobahnScene' });
  }

  init(data: {
    bridge: ERoadtripBridge;
    previewWeather?: WeatherKind;
    previewRisk?: number;
    forceWorkZone?: boolean;
  }): void {
    this.bridge = data.bridge;
    this.previewWeather = data.previewWeather;
    this.previewRisk = data.previewRisk;
    this.forceWorkZone = !!data.forceWorkZone;
    this.npcs = [];
    this.trees = [];
    this.lamps = [];
    this.shimmers = [];
    this.rainDrops = [];
    this.splashes = [];
    this.beacons = [];
    this.baken = [];
    this.builtLeg = -1;
    this.playerLane = 1;
    this.laneCooldown = 0;
    this.playerSpeedKmh = 0;
    this.debugTraffic = new URLSearchParams(window.location.search).has('erpreview');
    this.debugMinPlayerGap = 9999;
    this.debugOverlapFrames = 0;
    this.debugSpeedSum = 0;
    this.debugSpeedSamples = 0;
    this.debugPops = 0;
    this.roadPhase = 40;
    this.hudTickAccum = 0;
    this.eventCooldownSec = 4;
  }

  create(): void {
    const w = this.scale.width;
    const h = this.scale.height;
    this.isMobilePerf =
      w < 640 || (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0 && w < 900);
    this.layout(w);
    this.roadGfx = this.add.graphics().setDepth(0);
    this.drawRoad(w, h, false);

    const treeCount = this.isMobilePerf ? 8 : 14;
    for (let i = 0; i < treeCount; i++) {
      const tree = this.add.image(0, (i / treeCount) * h, 'pixel_tree').setDepth(2);
      tree.setData('side', i % 2 === 0 ? -1 : 1);
      tree.setData('along', (i * 137) % (h + 40));
      tree.setScale(this.isMobilePerf ? 0.85 : 1);
      this.trees.push(tree);
    }

    const lampCount = this.isMobilePerf ? 8 : 14;
    for (let i = 0; i < lampCount; i++) {
      const sprite = this.add.image(0, 0, 'streetlamp').setDepth(6);
      const glow = this.isMobilePerf && i % 2 === 1
        ? undefined
        : this.add
            .image(0, 0, 'light_glow_soft')
            .setTint(0xfbbf24)
            .setBlendMode(Phaser.BlendModes.ADD)
            .setScale(this.isMobilePerf ? 0.7 : 1.05)
            .setDepth(13)
            .setAlpha(0);
      this.lamps.push({ sprite, glow, side: i % 2 === 0 ? -1 : 1, along: (i * 180) % (h + 60) });
    }

    const shimmerCount = this.isMobilePerf ? 2 : 6;
    for (let i = 0; i < shimmerCount; i++) {
      this.shimmers.push(
        this.add
          .image(0, (i / shimmerCount) * h, 'wet_shimmer')
          .setBlendMode(Phaser.BlendModes.ADD)
          .setDepth(2)
          .setAlpha(0)
          .setTint(0x93c5fd)
      );
    }

    this.playerLane = 1;
    this.playerHalo = this.add.ellipse(w / 2, h * 0.72, 54, 78, 0x38bdf8, 0.22).setStrokeStyle(4, 0xf8fafc, 0.95).setDepth(9);
    this.playerCar = this.add.image(w / 2, h * 0.72, `car_${this.bridge.plan.vehicleId}`).setDepth(10);
    this.playerReflection = this.add
      .image(this.playerCar.x, this.playerCar.y + 8, this.playerCar.texture.key)
      .setTint(0x93c5fd)
      .setScale(0.96, -0.7)
      .setDepth(3)
      .setAlpha(0);
    this.playerHeadlight = this.add
      .image(this.playerCar.x, this.playerCar.y, 'headlight_cone')
      .setOrigin(0.5, 0.95)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(13.2)
      .setAlpha(0);
    this.playerTaillight = this.add
      .image(this.playerCar.x, this.playerCar.y, 'light_glow_soft')
      .setTint(0xef4444)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setScale(0.45)
      .setDepth(13.1)
      .setAlpha(0);
    this.playerBlinkL = this.add.image(0, 0, 'blink_lamp').setDepth(13.4).setAlpha(0);
    this.playerBlinkR = this.add.image(0, 0, 'blink_lamp').setDepth(13.4).setAlpha(0);

    this.nightOverlay = this.add.rectangle(w / 2, h / 2, w, h, 0x020617, 0).setDepth(12);

    const rainCount = this.isMobilePerf ? 16 : 46;
    for (let i = 0; i < rainCount; i++) {
      this.rainDrops.push(
        this.add.image(Phaser.Math.Between(0, w), Phaser.Math.Between(0, h), 'rain_streak').setDepth(16).setAlpha(0)
      );
    }
    const splashCount = this.isMobilePerf ? 0 : 8;
    for (let i = 0; i < splashCount; i++) {
      this.splashes.push(this.add.image(0, 0, 'rain_splash').setDepth(4).setAlpha(0));
    }
    for (let i = 0; i < (this.isMobilePerf ? 5 : 8); i++) {
      this.beacons.push(this.add.image(0, 0, 'beacon_lamp').setDepth(8).setVisible(false));
      this.baken.push(this.add.image(0, 0, 'baustelle_bake').setDepth(7).setVisible(false));
    }

    this.createGantry(w);
    this.createWorkSign(w);

    const isWebGL = this.game.renderer.type === Phaser.WEBGL;
    if (isWebGL && !this.isMobilePerf && this.cameras.main.postFX) {
      try {
        this.cameras.main.postFX.addBloom(0xffffff, 1, 1, 1.08, 0.28, 2);
      } catch {
        // Canvas2D and some GPUs have no PostFX pipeline.
      }
    }

    this.resizeHandler = (gameSize: Phaser.Structs.Size) => {
      if (!this.scene.isActive()) return;
      this.layout(gameSize.width);
      this.nightOverlay.setPosition(gameSize.width / 2, gameSize.height / 2);
      this.nightOverlay.setSize(gameSize.width, gameSize.height);
      if (this.playerCar) this.playerCar.y = gameSize.height * 0.72;
    };
    this.scale.on('resize', this.resizeHandler);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      if (this.resizeHandler) this.scale.off('resize', this.resizeHandler);
      this.resizeHandler = undefined;
      if (this.cameras?.main?.postFX) {
        try {
          this.cameras.main.postFX.clear();
        } catch {
          // ignore
        }
      }
    });
  }

  private layout(w: number): void {
    this.laneSpacing = Math.min(78, Math.max(62, w * 0.072));
  }

  private curveAt(y: number): number {
    const amp = Math.min(58, this.scale.width * 0.062);
    return Math.sin((y - this.roadPhase) / 560) * amp + Math.sin((y - this.roadPhase) / 1240 + 0.8) * amp * 0.4;
  }

  private nearestLane(x: number, y: number, rightOpen: boolean): number {
    const maxLane = rightOpen ? 2 : 1;
    let best = 0;
    let bestDist = Infinity;
    for (let lane = 0; lane <= maxLane; lane++) {
      const dist = Math.abs(x - this.laneCenter(lane, y, rightOpen));
      if (dist < bestDist) {
        bestDist = dist;
        best = lane;
      }
    }
    return best;
  }

  private laneCenter(lane: number, y: number, rightOpen: boolean): number {
    const mid = this.scale.width / 2 + this.curveAt(y);
    const s = this.laneSpacing;
    if (!rightOpen) {
      const left = mid - s * 0.28;
      return lane <= 0 ? left - s * 0.05 : left + s;
    }
    return mid + (lane - 1) * s;
  }

  private laneCenterF(pos: number, y: number, rightOpen: boolean): number {
    const maxLane = rightOpen ? 2 : 1;
    const clamped = Phaser.Math.Clamp(pos, 0, maxLane);
    const a = Math.floor(clamped);
    const b = Math.min(maxLane, Math.ceil(clamped));
    const t = clamped - a;
    return this.laneCenter(a, y, rightOpen) + (this.laneCenter(b, y, rightOpen) - this.laneCenter(a, y, rightOpen)) * t;
  }

  private tangent(y: number): number {
    const dx = this.curveAt(y - 28) - this.curveAt(y + 28);
    return Math.atan2(dx, 56);
  }

  private carOnLeftAhead(playerY: number): HighwayCar | null {
    let best: HighwayCar | null = null;
    let bestGap = 220;
    for (const car of this.npcs) {
      if (car.kind === 'truck') continue;
      if (car.lanePos > 0.55) continue;
      if (car.lanePos > this.playerLane + 0.35) continue;
      const gap = playerY - car.sprite.y;
      if (gap < 24 || gap > 210) continue;
      if (gap < bestGap) {
        bestGap = gap;
        best = car;
      }
    }
    return best;
  }

  private fireTailgate(run: RunState, lead: HighwayCar | null): void {
    const bump = this.bridge.level.passengers.hasWife ? 18 : 6;
    run.stress = Phaser.Math.Clamp(run.stress + bump, 0, 100);
    run.peakStress = Math.max(run.peakStress, run.stress);
    this.tailgateBlinkSec = 2.8;
    if (lead && lead.kind !== 'truck') lead.yieldRight = true;
    if (!lead || Math.random() >= 0.14) return;
    const legs = getActiveRouteLegs(this.bridge.level, run.plan);
    const legSpec = legs[run.currentLegIndex] || legs[0];
    const edge = getEdgeById(legSpec.edgeId);
    const city = getCityById(legSpec.reverse ? edge.fromCityId : edge.toCityId);
    const country = city.country || 'DE';
    const amountEur = country === 'FR' ? 135 : country === 'DE' ? 100 : 90;
    run.tailgateCase = { country, amountEur };
    this.bridge.paused = true;
    SoundFX.alert();
    this.bridge.onDynamicEventTrigger('evt_tailgate');
  }

  private drawRoad(w: number, h: number, work: boolean): void {
    const g = this.roadGfx;
    g.clear();
    g.fillStyle(0x14532d, 1);
    g.fillRect(0, 0, w, h);

    const step = this.isMobilePerf ? 28 : 16;
    const left: Array<{ x: number; y: number }> = [];
    const right: Array<{ x: number; y: number }> = [];
    const shoulderL: Array<{ x: number; y: number }> = [];
    const shoulderR: Array<{ x: number; y: number }> = [];
    const half = work ? this.laneSpacing * 1.2 + 18 : this.laneSpacing * 1.55 + 26;
    for (let y = -20; y <= h + 20; y += step) {
      const mid = w / 2 + this.curveAt(y);
      const dx = this.curveAt(y + 8) - this.curveAt(y - 8);
      const len = Math.hypot(dx, 16) || 1;
      const nx = 16 / len;
      const ny = -dx / len;
      left.push({ x: mid - nx * half, y: y - ny * half });
      right.push({ x: mid + nx * half, y: y + ny * half });
      shoulderL.push({ x: mid - nx * (half + 16), y: y - ny * (half + 16) });
      shoulderR.push({ x: mid + nx * (half + 16), y: y + ny * (half + 16) });
    }
    g.fillStyle(0x334155, 1);
    g.fillPoints(shoulderL.concat(shoulderR.slice().reverse()), true);
    g.fillStyle(work ? 0x0b1220 : 0x172033, 1);
    g.fillPoints(left.concat(right.slice().reverse()), true);

    g.lineStyle(3, 0xf8fafc, 0.88);
    g.beginPath();
    g.moveTo(left[0].x + 6, left[0].y);
    left.forEach(p => g.lineTo(p.x + 6, p.y));
    g.strokePath();
    g.beginPath();
    g.moveTo(right[0].x - 6, right[0].y);
    right.forEach(p => g.lineTo(p.x - 6, p.y));
    g.strokePath();

    if (work) {
      g.lineStyle(4, 0xfacc15, 0.9);
      g.beginPath();
      g.moveTo(right[0].x - 14, right[0].y);
      right.forEach(p => g.lineTo(p.x - 14, p.y));
      g.strokePath();
    }

    g.fillStyle(0xf8fafc, 0.88);
    const dash = 52;
    const phase = this.roadPhase % dash;
    for (let y = -dash + phase; y < h + dash; y += dash) {
      const gaps = work ? [0] : [0, 1];
      for (const gap of gaps) {
        const x = (this.laneCenter(gap, y, !work) + this.laneCenter(gap + 1, y, !work)) / 2;
        g.fillRect(x - 1.5, y, 3, 24);
      }
    }
  }

  private createGantry(w: number): void {
    const cont = this.add.container(w / 2, -80).setDepth(17);
    const bar = this.add.rectangle(0, 0, 280, 26, 0x1d4ed8).setStrokeStyle(2, 0xf8fafc);
    const txt = this.add
      .text(0, 0, 'AUTOBAHN', { fontFamily: 'monospace', fontSize: '11px', color: '#ffffff' })
      .setOrigin(0.5);
    cont.add([bar, txt]);
    this.gantryObj = cont;
  }

  private createWorkSign(w: number): void {
    const cont = this.add.container(w / 2, 78).setDepth(17).setVisible(false);
    const plate = this.add.rectangle(0, 0, 168, 46, 0x111827).setStrokeStyle(3, 0xfacc15);
    const disc = this.add.circle(52, 0, 16, 0xffffff).setStrokeStyle(4, 0xdc2626);
    const limit = this.add
      .text(52, 0, '80', { fontFamily: 'sans-serif', fontSize: '14px', fontStyle: 'bold', color: '#111827' })
      .setOrigin(0.5);
    const label = this.add
      .text(-28, 0, 'BAUSTELLE', { fontFamily: 'monospace', fontSize: '11px', color: '#fef08a' })
      .setOrigin(0.5);
    cont.add([plate, label, disc, limit]);
    cont.setData('limit', limit);
    this.signBoard = cont;
  }

  private rebuildTraffic(risk: number): void {
    for (const car of this.npcs) {
      car.sprite.destroy();
      car.reflection?.destroy();
      car.headlight?.destroy();
      car.taillight?.destroy();
      car.blinkL?.destroy();
      car.blinkR?.destroy();
    }
    this.npcs = [];
    const h = this.scale.height;
    const kinds = rosterForRisk(risk, this.isMobilePerf);
    kinds.forEach((kind, i) => {
      const home = kind === 'truck' ? (risk >= 0.36 && i % 4 === 0 ? 1 : 2) : kind === 'fast' ? 0 : 1;
      const sprite = this.add.image(0, -80 + (i * (h + 160)) / kinds.length, textureForKind(kind, i)).setDepth(8);
      if (kind === 'truck') sprite.setScale(0.9);
      const reflection = this.isMobilePerf
        ? undefined
        : this.add.image(0, 0, sprite.texture.key).setTint(0x93c5fd).setScale(0.9, -0.62).setAlpha(0).setDepth(3);
      const headlight = this.add
        .image(0, 0, 'headlight_cone')
        .setOrigin(0.5, 0.95)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setScale(0.72, 0.7)
        .setDepth(13)
        .setAlpha(0);
      const taillight = this.add
        .image(0, 0, 'light_glow_soft')
        .setTint(0xef4444)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setScale(0.32)
        .setDepth(13)
        .setAlpha(0);
      const blinkL = this.add.image(0, 0, 'blink_lamp').setDepth(13.3).setAlpha(0);
      const blinkR = this.add.image(0, 0, 'blink_lamp').setDepth(13.3).setAlpha(0);
      const desired = baseSpeed(kind);
      this.npcs.push({
        sprite,
        reflection,
        headlight,
        taillight,
        blinkL,
        blinkR,
        lanePos: home,
        targetLane: home,
        pendingLane: null,
        kind,
        speedKmh: desired,
        baseDesired: desired,
        blinkDir: 0,
        blinkHold: 0,
        reckless: kind === 'fast' && i % 3 === 0,
        cooldown: i * 0.4,
        pullTimer: 1.5 + (i % 4),
        burstTimer: 1 + (i % 5) * 0.4,
        braking: false
      });
    });
  }

  update(time: number, delta: number): void {
    const run = this.bridge.runState;
    if (!run || !this.playerCar) return;
    const dtSec = Math.min(0.05, delta / 1000);
    if (this.bridge.paused) return;

    const w = this.scale.width;
    const h = this.scale.height;
    const activeLegs = getActiveRouteLegs(this.bridge.level, run.plan);
    const legSpec = activeLegs[run.currentLegIndex];
    if (!legSpec) return;
    const edge = getEdgeById(legSpec.edgeId);
    const vehicle = getVehicleById(run.plan.vehicleId);
    const lp = run.plan.legPlans.find(x => x.legIndex === run.currentLegIndex);
    const weather = this.previewWeather || legSpec.weatherOverride || edge.defaultWeather;
    run.activeWeather = weather;
    const clockHour = (this.bridge.level.departureTimeHour + run.elapsedMinutes / 60) % 24;
    run.isNight = !!legSpec.isNightLeg || clockHour >= 19.2 || clockHour < 6.0;

    if (this.builtLeg !== run.currentLegIndex) {
      if (this.builtLeg !== -1) run.countryLimitKmh = undefined;
      this.builtLeg = run.currentLegIndex;
      this.trafficRisk = this.previewRisk ?? edge.baseTrafficRisk;
      this.rebuildTraffic(this.trafficRisk);
    }

    const zone = workZoneFor(edge.id, edge.distanceKm, this.forceWorkZone);
    const inWork = !!zone && run.legProgressKm >= zone.startKm && run.legProgressKm <= zone.endKm;
    const signMax = sectionMaxSpeedKmh(edge, vehicle.maxSpeedKmh, weather, run.countryLimitKmh);
    const setSpeed = snapSpeedKmh(
      lp ? lp.targetSpeedKmh : defaultLegSpeedKmh(edge, vehicle.maxSpeedKmh, weather),
      vehicle.maxSpeedKmh
    );
    if (lp && lp.targetSpeedKmh !== setSpeed) lp.targetSpeedKmh = setSpeed;
    let driveMax = Math.min(vehicle.maxSpeedKmh, setSpeed);
    let capValue: number | undefined;
    let capLabel: string | undefined;
    if (inWork && zone) {
      capValue = zone.limit;
      capLabel = 'Baustelle';
      driveMax = Math.min(driveMax, zone.limit);
    }
    const trafficLimit = inWork && zone ? Math.min(signMax, zone.limit) : signMax;
    const rightOpen = !inWork;

    const playerY = h * 0.72;
    const visualLane = this.playerCar ? this.nearestLane(this.playerCar.x, playerY, rightOpen) : this.playerLane;
    const followLanes = visualLane === this.playerLane ? [this.playerLane] : [this.playerLane, visualLane];
    let leadGap: number | null = null;
    let leadKmh: number | null = null;
    for (const lane of followLanes) {
      const lead = leadVehicle(this.npcs, lane, playerY, 280);
      if (!lead) continue;
      const gap = playerY - lead.sprite.y;
      if (leadGap === null || gap < leadGap) {
        leadGap = gap;
        leadKmh = lead.speedKmh;
      }
    }
    const commanded = followSpeedKmh(driveMax, leadGap, leadKmh);
    if (this.playerSpeedKmh <= 1) this.playerSpeedKmh = commanded;
    const urgent = leadGap !== null && leadGap < 78;
    const rate = this.playerSpeedKmh < commanded ? 34 : urgent ? 120 : 68;
    const step = rate * dtSec;
    this.playerSpeedKmh =
      this.playerSpeedKmh < commanded
        ? Math.min(commanded, this.playerSpeedKmh + step)
        : Math.max(commanded, this.playerSpeedKmh - step);
    run.currentSpeedKmh = this.playerSpeedKmh;
    run.speedCapKmh = capValue;
    run.speedCapLabel = capLabel;
    this.tailgateBlinkSec = Math.max(0, this.tailgateBlinkSec - dtSec);
    const leftLead = this.carOnLeftAhead(playerY);
    run.tailgateReady = setSpeed - this.playerSpeedKmh > 10 && !!leftLead;
    if (run.tailgatePulse) {
      run.tailgatePulse = false;
      this.fireTailgate(run, leftLead);
    }

    const scrollBoost = this.bridge.timeScale >= 15 ? 1.35 : this.bridge.timeScale >= 5 ? 1.15 : 1;
    const scrollPxPerSec = (Math.max(40, this.playerSpeedKmh) / 120) * 280 * scrollBoost;
    this.roadPhase += scrollPxPerSec * dtSec;
    this.drawRoad(w, h, inWork);

    for (const tree of this.trees) {
      const along = Number(tree.getData('along')) + scrollPxPerSec * dtSec;
      const y = ((along % (h + 50)) + (h + 50)) % (h + 50) - 20;
      tree.setData('along', along);
      const side = Number(tree.getData('side')) as -1 | 1;
      const edgeX = this.laneCenter(side < 0 ? 0 : rightOpen ? 2 : 1, y, rightOpen);
      tree.setPosition(edgeX + side * (this.laneSpacing * 1.9 + 24), y);
    }

    const wet = weather === 'rain' || weather === 'storm';
    const showLights = run.isNight || wet || clockHour >= 17.5 || clockHour < 7;
    for (const lamp of this.lamps) {
      lamp.along = (lamp.along + scrollPxPerSec * dtSec) % (h + 80);
      const y = lamp.along - 20;
      const edgeX = this.laneCenter(lamp.side < 0 ? 0 : rightOpen ? 2 : 1, y, rightOpen);
      const x = edgeX + lamp.side * (this.laneSpacing * 1.55 + 8);
      lamp.sprite.setPosition(x, y);
      lamp.glow?.setPosition(x, y + 8);
      lamp.glow?.setAlpha(showLights ? (run.isNight ? 0.55 : 0.32) : 0.12);
    }

    if (this.gantryObj) {
      const gy = this.gantryObj.y + scrollPxPerSec * 0.9 * dtSec;
      this.gantryObj.y = gy > h + 200 ? -90 : gy;
      this.gantryObj.x = w / 2 + this.curveAt(this.gantryObj.y);
      if (gy > h + 200) {
        const toCity = getCityById(legSpec.reverse ? edge.fromCityId : edge.toCityId);
        const label = this.gantryObj.list[1] as Phaser.GameObjects.Text;
        label.setText(`${edge.highwayName}  ·  ${toCity.name.toUpperCase()}`);
      }
    }

    stepHighwayTraffic(
      this.npcs,
      dtSec,
      this.playerSpeedKmh,
      scrollPxPerSec,
      h,
      this.trafficRisk,
      rightOpen,
      trafficLimit,
      playerY,
      visualLane
    );

    this.laneCooldown = Math.max(0, this.laneCooldown - dtSec);
    const centered = Math.abs(this.playerCar.x - this.laneCenter(this.playerLane, playerY, rightOpen)) < 16;
    if (centered && this.laneCooldown <= 0) {
      const desiredLane = preferredPlayerLane(setSpeed, rightOpen);
      const lead = leadVehicle(this.npcs, this.playerLane, playerY, 240);
      const blocked = !!lead && lead.speedKmh < driveMax - 6;
      const slowerAhead = (lane: number) => {
        const other = leadVehicle(this.npcs, lane, playerY, 260);
        return !!other && other.speedKmh < driveMax - 6;
      };
      let next = this.playerLane;
      if (!rightOpen) next = Math.min(next, 1);
      if (blocked && next > 0 && laneIsClear(this.npcs, next - 1, playerY, 120)) next -= 1;
      else if (!blocked && next < desiredLane && laneIsClear(this.npcs, next + 1, playerY, 120) && !slowerAhead(next + 1)) next += 1;
      else if (!blocked && next > desiredLane && laneIsClear(this.npcs, next - 1, playerY, 120) && !slowerAhead(next - 1)) next -= 1;
      if (!rightOpen) next = Phaser.Math.Clamp(next, 0, 1);
      if (next !== this.playerLane) {
        this.playerLane = next;
        this.laneCooldown = blocked ? 0.45 : 0.9;
      }
    }
    const heldLanes = visualLane === this.playerLane ? [this.playerLane] : [visualLane, this.playerLane];
    this.debugPops += enforceTrafficGaps(this.npcs, {
      y: playerY,
      lanes: heldLanes,
      speedKmh: this.playerSpeedKmh
    });
    const playerTargetX = this.laneCenter(this.playerLane, playerY, rightOpen);
    this.playerCar.x = Phaser.Math.Linear(this.playerCar.x, playerTargetX, 0.14);
    this.playerCar.y = playerY;
    const laneYaw = Phaser.Math.Clamp((playerTargetX - this.playerCar.x) * 0.012, -0.2, 0.2);
    const playerRot = this.tangent(playerY) + (this.tailgateBlinkSec > 0 ? -0.16 : laneYaw);
    this.playerCar.setRotation(playerRot);
    this.playerHalo?.setPosition(this.playerCar.x, playerY).setRotation(playerRot);
    const blinkSide = playerTargetX - this.playerCar.x;
    const blinkOn = (Math.abs(blinkSide) > 8 || this.tailgateBlinkSec > 0) && Math.sin(time * 0.02) > 0;
    this.placeBlink(this.playerBlinkL, this.playerCar.x, playerY, playerRot, -1, blinkOn && (blinkSide < 0 || this.tailgateBlinkSec > 0));
    this.placeBlink(this.playerBlinkR, this.playerCar.x, playerY, playerRot, 1, blinkOn && blinkSide > 0 && this.tailgateBlinkSec <= 0);

    const flash = Math.sin(time * 0.016) > 0;
    for (const car of this.npcs) {
      const y = car.sprite.y;
      const x = this.laneCenterF(car.lanePos, y, rightOpen);
      const laneYaw = Phaser.Math.Clamp((car.targetLane - car.lanePos) * 0.28, -0.2, 0.2);
      const rot = this.tangent(y) + laneYaw;
      car.sprite.setPosition(x, y);
      car.sprite.setRotation(rot);
      const fx = Math.sin(rot);
      const fy = -Math.cos(rot);
      car.reflection?.setPosition(x + 3, y + 10).setRotation(rot).setAlpha(wet ? 0.22 : 0);
      car.headlight?.setPosition(x + fx * 18, y + fy * 18).setRotation(rot).setAlpha(showLights ? 0.55 : 0);
      const braking = car.braking || car.speedKmh < car.baseDesired - 25;
      car.taillight?.setPosition(x - fx * 20, y - fy * 20).setAlpha(braking ? 0.75 : showLights ? 0.4 : 0.2);
      const showL = car.blinkDir < 0 && (car.reckless ? false : flash || car.blinkHold > 0);
      const showR = car.blinkDir > 0 && (car.reckless ? false : flash || car.blinkHold > 0);
      if (car.blinkL) this.placeBlink(car.blinkL, x, y, rot, -1, showL && !car.reckless);
      if (car.blinkR) this.placeBlink(car.blinkR, x, y, rot, 1, showR && !car.reckless);
    }

    let darkness = 0;
    if (clockHour >= 18 && clockHour < 20) darkness = ((clockHour - 18) / 2) * 0.5;
    else if (clockHour >= 20 || clockHour < 5.5) darkness = 0.55;
    else if (wet) darkness = 0.2;
    this.nightOverlay.setAlpha(darkness);
    if (this.playerReflection) {
      this.playerReflection.setPosition(this.playerCar.x + 3, playerY + 10);
      this.playerReflection.setRotation(playerRot);
      this.playerReflection.setAlpha(wet ? 0.26 : 0);
    }
    if (this.playerHeadlight) {
      const fx = Math.sin(playerRot);
      const fy = -Math.cos(playerRot);
      this.playerHeadlight.setPosition(this.playerCar.x + fx * 20, playerY + fy * 20);
      this.playerHeadlight.setRotation(playerRot);
      this.playerHeadlight.setAlpha(showLights ? 0.7 : 0);
    }
    if (this.playerTaillight) {
      const fx = Math.sin(playerRot);
      const fy = -Math.cos(playerRot);
      this.playerTaillight.setPosition(this.playerCar.x - fx * 18, playerY - fy * 18);
      this.playerTaillight.setAlpha(inWork ? 0.7 : 0.35);
    }

    for (let i = 0; i < this.shimmers.length; i++) {
      const s = this.shimmers[i];
      s.y += scrollPxPerSec * dtSec;
      if (s.y > h + 20) s.y = -20;
      s.x = w / 2 + this.curveAt(s.y);
      s.setAlpha(wet ? 0.22 : 0.05);
    }

    for (const drop of this.rainDrops) {
      if (!wet) {
        drop.setAlpha(0);
        continue;
      }
      drop.setAlpha(0.72);
      drop.y += (520 + this.playerSpeedKmh) * dtSec;
      drop.x -= 80 * dtSec;
      if (drop.y > h + 12) {
        drop.y = -12;
        drop.x = Phaser.Math.Between(0, w);
      }
      if (drop.x < -12) drop.x = w + 8;
    }
    for (let i = 0; i < this.splashes.length; i++) {
      const sp = this.splashes[i];
      if (!wet) {
        sp.setAlpha(0);
        continue;
      }
      const prog = ((time * 0.001 + i * 0.17) % 0.5) / 0.5;
      sp.setPosition(Phaser.Math.Between(40, w - 40), ((i * 90 + this.roadPhase) % h));
      sp.setScale(0.4 + prog);
      sp.setAlpha((1 - prog) * 0.35);
    }

    const showWork = !!zone && run.legProgressKm >= zone.startKm - 1.2 && run.legProgressKm <= zone.endKm + 0.3;
    if (this.signBoard) {
      this.signBoard.setVisible(showWork);
      if (showWork && zone) {
        this.signBoard.x = w / 2 + this.curveAt(78);
        const limitText = this.signBoard.getData('limit') as Phaser.GameObjects.Text;
        limitText.setText(String(zone.limit));
      }
    }
    for (let i = 0; i < this.beacons.length; i++) {
      const y = (this.roadPhase * 0.55 + i * 130) % (h + 40) - 20;
      const edgeX = this.laneCenter(rightOpen ? 2 : 1, y, rightOpen);
      this.beacons[i].setVisible(showWork);
      this.beacons[i].setPosition(edgeX + this.laneSpacing * 0.72, y);
      this.beacons[i].setAlpha(showWork && Math.sin(time * 0.02 + i) > 0 ? 1 : 0.25);
      this.baken[i].setVisible(showWork);
      this.baken[i].setPosition(edgeX + this.laneSpacing * 0.95, y + 18);
    }

    if (this.debugTraffic) {
      const lanesNow = [this.playerLane];
      const seen = this.nearestLane(this.playerCar.x, playerY, rightOpen);
      if (seen !== this.playerLane) lanesNow.push(seen);
      const overlaps = countSpriteOverlaps(this.npcs, playerY, lanesNow);
      if (overlaps > 0) this.debugOverlapFrames += 1;
      let nearest = 9999;
      for (const car of this.npcs) {
        if (!lanesNow.some(lane => Math.abs(car.lanePos - lane) <= 0.48)) continue;
        const gap = playerY - car.sprite.y;
        if (gap > 0) nearest = Math.min(nearest, gap);
      }
      this.debugMinPlayerGap = Math.min(this.debugMinPlayerGap, nearest);
      this.debugSpeedSum += this.playerSpeedKmh;
      this.debugSpeedSamples += 1;
      const debugWindow = window as Window & {
        __erHighway?: () => {
          speed: number;
          setSpeed: number;
          sign: number;
          minGap: number;
          overlapFrames: number;
          avgSpeed: number;
          samples: number;
          pops: number;
        };
      };
      debugWindow.__erHighway = () => ({
        speed: Math.round(this.playerSpeedKmh),
        setSpeed: Math.round(setSpeed),
        sign: edge.speedLimitKmh,
        minGap: Math.round(this.debugMinPlayerGap),
        overlapFrames: this.debugOverlapFrames,
        avgSpeed: this.debugSpeedSamples ? Math.round(this.debugSpeedSum / this.debugSpeedSamples) : 0,
        samples: this.debugSpeedSamples,
        pops: this.debugPops
      });
    }

    const simMinPerRealSec = inWork ? 0.85 : this.bridge.timeScale === 15 ? 28 : this.bridge.timeScale === 5 ? 11 : 2.8;
    const simMinutes = simMinPerRealSec * dtSec;
    const deltaKm = (this.playerSpeedKmh / 60) * simMinutes;
    const elevGain = legSpec.reverse ? edge.elevationLossM : edge.elevationGainM;
    const elevLoss = legSpec.reverse ? edge.elevationGainM : edge.elevationLossM;
    const cons100 = computeConsumptionKwh100(
      vehicle,
      this.playerSpeedKmh,
      weather,
      elevGain,
      elevLoss,
      edge.distanceKm,
      this.bridge.level.trailerWeightKg || 0,
      !!run.plan.behindTruckMode
    );
    const kwhBurned = (deltaKm / 100) * cons100;
    run.legProgressKm += deltaKm;
    run.distanceDrivenKm += deltaKm;
    run.energyUsedKwh += kwhBurned;
    run.socPct = Math.max(0, run.socPct - (kwhBurned / vehicle.batteryKwh) * 100);
    run.elapsedMinutes += simMinutes;
    run.bladderNeed = Math.min(100, run.bladderNeed + simMinutes * 0.35);
    run.hungerNeed = Math.min(100, (run.hungerNeed || 0) + simMinutes * 0.12);

    const comfortDamping = 1 - (vehicle.comfortRating - 5) * 0.04;
    let stressDeltaPerMin = 0.02;
    if (run.hungerNeed > 75) stressDeltaPerMin += 0.08;
    if (setSpeed > 145) stressDeltaPerMin += 0.14;
    if (weather === 'rain' || weather === 'snow') stressDeltaPerMin += 0.06;
    if (inWork) stressDeltaPerMin += 0.05;
    if (run.socPct < 15) stressDeltaPerMin += 0.28;
    if (run.bladderNeed > 75) stressDeltaPerMin += 0.12;
    run.stress = Phaser.Math.Clamp(
      run.stress + stressDeltaPerMin * simMinutes * this.bridge.level.passengers.stressSensitivity * comfortDamping,
      0,
      100
    );
    run.peakStress = Math.max(run.peakStress, run.stress);

    if (run.socPct <= 0.15) {
      this.bridge.paused = true;
      SoundFX.alert();
      this.bridge.onBatteryDepleted();
      return;
    }

    const legRatio = Math.min(1, run.legProgressKm / edge.distanceKm);
    const pendingStop = run.plan.plannedStops
      .filter(s => s.legIndex === run.currentLegIndex && !run.completedStopIds.includes(s.chargerId) && !run.skippedStopIds.includes(s.chargerId))
      .map(s => {
        const st = getChargersForEdge(edge.id).find(c => c.id === s.chargerId);
        if (!st) return null;
        const p = legSpec.reverse ? 1 - st.edgeProgress : st.edgeProgress;
        return { stop: s, station: st, p };
      })
      .filter((x): x is { stop: (typeof run.plan.plannedStops)[number]; station: ChargerStation; p: number } => x !== null)
      .sort((a, b) => a.p - b.p)[0];

    if (pendingStop && legRatio >= pendingStop.p && !pendingStop.station.fairStay) {
      this.bridge.paused = true;
      SoundFX.click();
      this.bridge.onTriggerChargerSegment(pendingStop.station);
      return;
    }

    this.eventCooldownSec -= dtSec;
    if (this.eventCooldownSec <= 0) {
      const pool = this.bridge.level.eventPoolIds;
      if (
        this.bridge.level.passengers.hasWife &&
        !run.wifeDialogueTriggered &&
        this.bridge.level.wifeDialogueIds.length > 0 &&
        (run.stress >= 42 || (run.currentLegIndex >= 4 && run.socPct < 24))
      ) {
        run.wifeDialogueTriggered = true;
        this.eventCooldownSec = 8;
        this.bridge.paused = true;
        SoundFX.alert();
        this.bridge.onWifeDialogueTrigger(run.socPct < 24 ? 'dlg_diesel_remark' : this.bridge.level.wifeDialogueIds[0]);
        return;
      }
      if (
        pool.includes('evt_stau_kamen') &&
        run.currentLegIndex === 1 &&
        legRatio > 0.55 &&
        !run.triggeredEventIds.includes('evt_stau_kamen')
      ) {
        run.triggeredEventIds.push('evt_stau_kamen');
        const hitJam = edge.baseTrafficRisk >= 0.35 || (edge.baseTrafficRisk >= 0.22 && Math.random() < 0.45);
        if (hitJam) {
          this.eventCooldownSec = 7;
          this.bridge.paused = true;
          SoundFX.alert();
          this.bridge.onDynamicEventTrigger('evt_stau_kamen');
          return;
        }
      }
      if (
        pool.includes('evt_accident_help') &&
        run.currentLegIndex === 2 &&
        legRatio > 0.45 &&
        !run.triggeredEventIds.includes('evt_accident_help')
      ) {
        run.triggeredEventIds.push('evt_accident_help');
        this.eventCooldownSec = 7;
        this.bridge.paused = true;
        SoundFX.alert();
        this.bridge.onDynamicEventTrigger('evt_accident_help');
        return;
      }
      if (
        pool.includes('evt_rain_front') &&
        run.currentLegIndex === 4 &&
        legRatio > 0.42 &&
        !run.triggeredEventIds.includes('evt_rain_front')
      ) {
        run.triggeredEventIds.push('evt_rain_front');
        this.eventCooldownSec = 7;
        this.bridge.paused = true;
        SoundFX.alert();
        this.bridge.onDynamicEventTrigger('evt_rain_front');
        return;
      }
      if (
        pool.includes('evt_wc_coffee') &&
        run.currentLegIndex === 5 &&
        run.bladderNeed > 60 &&
        !run.triggeredEventIds.includes('evt_wc_coffee')
      ) {
        run.triggeredEventIds.push('evt_wc_coffee');
        this.eventCooldownSec = 7;
        this.bridge.paused = true;
        SoundFX.alert();
        this.bridge.onDynamicEventTrigger('evt_wc_coffee');
        return;
      }
      const trapSign = activeSignKmh(edge, weather, run.countryLimitKmh);
      const excess = this.playerSpeedKmh - trapSign;
      const trapMark = `evt_speed_trap@${run.currentLegIndex}`;
      const trapsOnLeg = run.triggeredEventIds.filter(id => id.startsWith(trapMark)).length;
      if (pool.includes('evt_speed_trap') && trapSign > 0 && excess > 8 && trapsOnLeg < 2) {
        const chance = speedTrapChancePerSimMinute(excess, edge.policeRiskBase) * simMinutes;
        if (Math.random() < chance) {
          const destId = legSpec.reverse ? edge.fromCityId : edge.toCityId;
          run.speedTrap = {
            country: getCityById(destId).country,
            signKmh: trapSign,
            actualKmh: Math.round(this.playerSpeedKmh)
          };
          run.triggeredEventIds.push(`${trapMark}#${trapsOnLeg}`);
          this.eventCooldownSec = 7;
          this.bridge.paused = true;
          SoundFX.alert();
          this.bridge.onDynamicEventTrigger('evt_speed_trap');
          return;
        }
      }
      if (
        pool.includes('evt_dirty_toilets') &&
        !run.triggeredEventIds.includes('evt_dirty_toilets') &&
        !!edge.speedLimitRainKmh &&
        legRatio > 0.42
      ) {
        const rollId = `evt_dirty_toilets_try_${run.currentLegIndex}`;
        if (!run.triggeredEventIds.includes(rollId)) {
          run.triggeredEventIds.push(rollId);
          if (Math.random() < 0.7) {
            run.triggeredEventIds.push('evt_dirty_toilets');
            this.eventCooldownSec = 7;
            this.bridge.paused = true;
            SoundFX.alert();
            this.bridge.onDynamicEventTrigger('evt_dirty_toilets');
            return;
          }
        }
      }
    }

    if (run.legProgressKm >= edge.distanceKm) {
      const preset = legSpec.citySegmentAtEnd;
      if (preset === 'hannover_messe' || preset === 'aachen_finish' || preset === 'koeln_ring') {
        this.bridge.paused = true;
        this.bridge.onTriggerCitySegment(preset);
        return;
      }
      const overnightId = `evt_hotel_overnight@${run.currentLegIndex}`;
      if (legSpec.overnightAtEnd && !run.triggeredEventIds.includes(overnightId)) {
        run.triggeredEventIds.push(overnightId);
        this.eventCooldownSec = 4;
        this.bridge.paused = true;
        SoundFX.alert();
        this.bridge.onDynamicEventTrigger('evt_hotel_overnight');
        return;
      }
      const arrivalId = `evt_south_arrival@${run.currentLegIndex}`;
      if (legSpec.destinationAtEnd && !run.triggeredEventIds.includes(arrivalId)) {
        run.triggeredEventIds.push(arrivalId);
        this.eventCooldownSec = 4;
        this.bridge.paused = true;
        SoundFX.alert();
        this.bridge.onDynamicEventTrigger('evt_south_arrival');
        return;
      }
      if (run.currentLegIndex < activeLegs.length - 1) {
        run.currentLegIndex += 1;
        run.legProgressKm = 0;
        run.speedCapKmh = undefined;
        run.speedCapLabel = undefined;
      } else {
        this.bridge.paused = true;
        this.bridge.onTriggerCitySegment('aachen_finish');
        return;
      }
    }

    this.hudTickAccum += dtSec;
    if (this.hudTickAccum >= 0.12) {
      this.hudTickAccum = 0;
      this.bridge.onAutobahnHudTick(run);
    }
  }

  private placeBlink(
    img: Phaser.GameObjects.Image | undefined,
    x: number,
    y: number,
    rot: number,
    side: -1 | 1,
    on: boolean
  ): void {
    if (!img) return;
    const rx = Math.cos(rot);
    const ry = Math.sin(rot);
    const fx = Math.sin(rot);
    const fy = -Math.cos(rot);
    img.setPosition(x + rx * side * 14 + fx * 8, y + ry * side * 14 + fy * 8);
    img.setAlpha(on ? 0.95 : 0);
  }
}
