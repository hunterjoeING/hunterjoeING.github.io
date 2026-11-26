import * as Phaser from 'phaser';
import { getCityById, getEdgeById } from '../data/europeMap';
import { getVehicleById } from '../data/vehicles';
import { alpineLeg } from '../sim/AlpineDriving';
import { alpineRoadEnergy, brakesOverheat } from '../sim/AlpineDescent';
import { computeConsumptionKwh100 } from '../sim/EnergyModel';
import { nextWinterRoadEvent, SNOWPLOUGH_SPEED_KMH, winterRoadEnergyKwh } from '../sim/WinterDriving';
import {
  defaultLegSpeedKmh,
  getActiveRouteLegs,
  highwaySection,
  snapSpeedKmh,
  speedTrapChancePerSimMinute,
  isPendingStop,
  plannedRoadStopsOnLeg,
  SKIP_PROMPT_KM
} from '../sim/RoutePlanner';
import { RunState, WeatherKind } from '../types';
import {
  HIGHWAY_PX_PER_KM,
  HighwayCar,
  LANE_CHANGE_PER_SEC,
  baseSpeed,
  countSpriteOverlaps,
  bumperGap,
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
  private highBeamSec = 0;
  private hudTailgateLead: HighwayCar | null = null;
  private nightOverlay!: Phaser.GameObjects.Rectangle;
  private roadGfx!: Phaser.GameObjects.Graphics;
  private roadPhase = 0;
  private laneSpacing = 72;
  private playerLane = 1;
  private playerLanePos = 1;
  private laneCooldown = 0;
  private playerSpeedKmh = 0;
  private debugTraffic = false;
  private debugMinPlayerGap = 9999;
  private debugOverlapFrames = 0;
  private debugSpeedSum = 0;
  private debugSpeedSamples = 0;
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
    this.playerLanePos = 1;
    this.laneCooldown = 0;
    this.playerSpeedKmh = 0;
    this.highBeamSec = 0;
    this.hudTailgateLead = null;
    this.debugTraffic = new URLSearchParams(window.location.search).has('erpreview');
    this.debugMinPlayerGap = 9999;
    this.debugOverlapFrames = 0;
    this.debugSpeedSum = 0;
    this.debugSpeedSamples = 0;
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
    this.playerLanePos = 1;
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

  private laneCenter(lane: number, y: number, rightOpen: boolean): number {
    const mid = this.scale.width / 2 + this.curveAt(y);
    const s = this.laneSpacing;
    if (!rightOpen) {
      const left = mid - s * 0.28;
      return lane <= 0 ? left - s * 0.05 : left + lane * s;
    }
    return mid + (lane - 1) * s;
  }

  private laneCenterF(pos: number, y: number, rightOpen: boolean): number {
    const a = Math.floor(pos);
    const b = Math.ceil(pos);
    const t = pos - a;
    return this.laneCenter(a, y, rightOpen) + (this.laneCenter(b, y, rightOpen) - this.laneCenter(a, y, rightOpen)) * t;
  }

  private tangent(y: number): number {
    const dx = this.curveAt(y - 28) - this.curveAt(y + 28);
    return Math.atan2(dx, 56);
  }

  private fireTailgate(run: RunState, lead: HighwayCar, country: string): void {
    const bump = this.bridge.level.passengers.hasWife ? 18 : 6;
    run.stress = Phaser.Math.Clamp(run.stress + bump, 0, 100);
    run.peakStress = Math.max(run.peakStress, run.stress);
    this.highBeamSec = 0.55;
    lead.yieldRight = true;
    if (Math.random() >= 0.14) return;
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
    const playerY = h * 0.72;
    const kinds = rosterForRisk(risk, this.isMobilePerf);
    const lastByLane: Array<{ y: number; kind: HighwayCar['kind'] }> = [];
    kinds.forEach((kind, i) => {
      const home = kind === 'truck' ? (risk >= 0.36 && i % 4 === 0 ? 1 : 2) : kind === 'fast' ? 0 : 1;
      const last = lastByLane[home];
      const nominalY = -80 + (i * (h + 160)) / kinds.length;
      let y = last ? Math.max(nominalY, last.y + bumperGap(last.kind, kind)) : nominalY;
      const playerGap = bumperGap('player', kind);
      const playerOccupiesLane = home === this.playerLane || Math.abs(home - this.playerLanePos) < 1;
      if (playerOccupiesLane && Math.abs(y - playerY) < playerGap) y = playerY + playerGap;
      lastByLane[home] = { y, kind };
      const sprite = this.add.image(0, y, textureForKind(kind, i)).setDepth(8);
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
        distanceKm: (playerY - y) / HIGHWAY_PX_PER_KM,
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
      this.hudTailgateLead = null;
      this.builtLeg = run.currentLegIndex;
      this.trafficRisk = this.previewRisk ?? edge.baseTrafficRisk;
      this.rebuildTraffic(this.trafficRisk);
    }

    const zone = workZoneFor(edge.id, edge.distanceKm, this.forceWorkZone);
    const inWork = !!zone && run.legProgressKm >= zone.startKm && run.legProgressKm < zone.endKm;
    const section = highwaySection(
      edge, !!legSpec.reverse, run.legProgressKm, weather, run.countryLimitKmh, inWork ? zone?.limit : undefined
    );
    const setSpeed = snapSpeedKmh(
      lp ? lp.targetSpeedKmh : defaultLegSpeedKmh(edge, vehicle.maxSpeedKmh, weather),
      vehicle.maxSpeedKmh
    );
    if (lp && lp.targetSpeedKmh !== setSpeed) lp.targetSpeedKmh = setSpeed;
    const inConvoy = (run.snowploughUntilKm ?? 0) > run.distanceDrivenKm;
    const workCap = inWork ? section.signKmh : undefined;
    const speedCap = inConvoy ? Math.min(SNOWPLOUGH_SPEED_KMH, workCap ?? Infinity) : workCap;
    const driveMax = Math.min(setSpeed, speedCap ?? Infinity);
    const trafficLimit = Math.min(vehicle.maxSpeedKmh, section.signKmh || Infinity);
    const rightOpen = !inWork;

    const playerY = h * 0.72;
    this.laneCooldown = Math.max(0, this.laneCooldown - dtSec);
    if (this.playerLanePos === this.playerLane && this.laneCooldown <= 0) {
      const desiredLane = preferredPlayerLane(inConvoy ? driveMax : setSpeed, rightOpen);
      const slowerAhead = (lane: number, range = 260) => {
        const other = leadVehicle(this.npcs, lane, range);
        return !!other && other.speedKmh < driveMax - 6;
      };
      const clear = (lane: number) => laneIsClear(this.npcs, lane, 0, this.playerSpeedKmh, 120);
      const blocked = slowerAhead(this.playerLane, 240);
      let next = this.playerLane;
      if (!rightOpen && next === 2) {
        if (clear(1)) next = 1;
      } else if (blocked && next > 0 && clear(next - 1)) next -= 1;
      else if (!blocked && next < desiredLane && clear(next + 1) && !slowerAhead(next + 1)) next += 1;
      else if (!blocked && next > desiredLane && clear(next - 1) && !slowerAhead(next - 1)) next -= 1;
      if (next !== this.playerLane) {
        this.playerLane = next;
        this.laneCooldown = blocked ? 0.45 : 0.9;
      }
    }

    const sourceLane = this.playerLanePos < this.playerLane ? Math.floor(this.playerLanePos) : Math.ceil(this.playerLanePos);
    const heldLanes = sourceLane === this.playerLane ? [this.playerLane] : [sourceLane, this.playerLane];
    let commanded = driveMax;
    let urgent = false;
    let brakingLead: HighwayCar | null = null;
    for (const lane of heldLanes) {
      const lead = leadVehicle(this.npcs, lane, 280);
      if (!lead) continue;
      const gap = lead.distanceKm * HIGHWAY_PX_PER_KM;
      const minGap = bumperGap('player', lead.kind);
      const followingSpeed = followSpeedKmh(driveMax, gap, lead.speedKmh, minGap);
      if (followingSpeed < commanded) {
        commanded = followingSpeed;
        brakingLead = lead;
      }
      urgent ||= gap <= minGap;
    }
    if (this.playerSpeedKmh <= 1) this.playerSpeedKmh = commanded;
    const rate = this.playerSpeedKmh < commanded ? 34 : urgent ? 120 : 68;
    const step = rate * dtSec;
    const requestedSpeed = this.playerSpeedKmh < commanded
      ? Math.min(commanded, this.playerSpeedKmh + step)
      : Math.max(commanded, this.playerSpeedKmh - step);
    this.playerSpeedKmh = stepHighwayTraffic(
      this.npcs, dtSec, requestedSpeed, heldLanes, playerY, h, this.trafficRisk, rightOpen, trafficLimit
    );
    for (const car of this.npcs) car.sprite.y = playerY - car.distanceKm * HIGHWAY_PX_PER_KM;

    run.currentSpeedKmh = this.playerSpeedKmh;
    run.speedCapKmh = speedCap;
    run.speedCapLabel = inConvoy ? 'Schneepflug-Kolonne' : inWork ? 'Baustelle' : undefined;
    const signChanged = run.highwaySignLegIndex !== run.currentLegIndex || run.highwaySignKmh !== section.signKmh;
    run.highwaySignKmh = section.signKmh;
    run.highwaySignLegIndex = run.currentLegIndex;
    this.highBeamSec = Math.max(0, this.highBeamSec - dtSec);
    const tailgateLead = this.findTailgateLead(brakingLead, driveMax);
    if (run.tailgatePulse) {
      run.tailgatePulse = false;
      if (tailgateLead && tailgateLead === this.hudTailgateLead && run.legProgressKm < edge.distanceKm) {
        this.fireTailgate(run, tailgateLead, section.country);
      }
    }
    if (signChanged) this.updateHud(run, tailgateLead);

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

    const laneDiff = this.playerLane - this.playerLanePos;
    const laneStep = LANE_CHANGE_PER_SEC * dtSec;
    this.playerLanePos = Math.abs(laneDiff) <= laneStep
      ? this.playerLane
      : this.playerLanePos + Math.sign(laneDiff) * laneStep;
    const playerTargetX = this.laneCenter(this.playerLane, playerY, rightOpen);
    this.playerCar.x = this.laneCenterF(this.playerLanePos, playerY, rightOpen);
    this.playerCar.y = playerY;
    const laneYaw = Phaser.Math.Clamp((playerTargetX - this.playerCar.x) * 0.012, -0.2, 0.2);
    const playerRot = this.tangent(playerY) + laneYaw;
    this.playerCar.setRotation(playerRot);
    this.playerHalo?.setPosition(this.playerCar.x, playerY).setRotation(playerRot);
    const blinkSide = playerTargetX - this.playerCar.x;
    const blinkOn = Math.abs(blinkSide) > 8 && Math.sin(time * 0.02) > 0;
    this.placeBlink(this.playerBlinkL, this.playerCar.x, playerY, playerRot, -1, blinkOn && blinkSide < 0);
    this.placeBlink(this.playerBlinkR, this.playerCar.x, playerY, playerRot, 1, blinkOn && blinkSide > 0);

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
      const showL = car.blinkDir < 0 && (flash || car.blinkHold > 0);
      const showR = car.blinkDir > 0 && (flash || car.blinkHold > 0);
      if (car.blinkL) this.placeBlink(car.blinkL, x, y, rot, -1, showL);
      if (car.blinkR) this.placeBlink(car.blinkR, x, y, rot, 1, showR);
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
      const highBeam = this.highBeamSec > 0;
      this.playerHeadlight.setScale(highBeam ? 1.45 : 1);
      this.playerHeadlight.setAlpha(highBeam ? 1 : showLights ? 0.7 : 0);
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
        limitText.setText(String(inWork ? section.signKmh : zone.limit));
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
      const lanesNow = [Math.round(this.playerLanePos)];
      const overlaps = countSpriteOverlaps(this.npcs, lanesNow);
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
        sign: section.signKmh,
        minGap: Math.round(this.debugMinPlayerGap),
        overlapFrames: this.debugOverlapFrames,
        avgSpeed: this.debugSpeedSamples ? Math.round(this.debugSpeedSum / this.debugSpeedSamples) : 0,
        samples: this.debugSpeedSamples,
        pops: 0
      });
    }

    if (this.bridge.paused) return;

    const pendingStop = plannedRoadStopsOnLeg(run.plan, legSpec, run.currentLegIndex)
      .find(({ stop }) => isPendingStop(run, stop));
    const stopKm = pendingStop ? pendingStop.progress * edge.distanceKm : Infinity;
    const workBoundaryKm = !zone || run.legProgressKm >= zone.endKm
      ? Infinity : inWork ? zone.endKm : zone.startKm;
    const alpine = alpineLeg(this.bridge.level.id, edge, legSpec);
    const pass = run.alpinePass?.legIndex !== run.currentLegIndex ? alpine?.pass : undefined;
    const descent = alpine?.descent;
    const descentState = run.alpineDescent?.legIndex === run.currentLegIndex ? run.alpineDescent : undefined;
    const nextDescentKm = descent && !descentState ? Math.max(run.legProgressKm, descent.startKm) : Infinity;
    const passKm = pass ? Math.max(run.legProgressKm, pass.entryKm) : Infinity;
    const boundaryKm = Math.min(stopKm, section.endKm, workBoundaryKm, passKm, nextDescentKm);
    const simMinPerRealSec = inWork ? 0.85 : this.bridge.timeScale === 15 ? 28 : this.bridge.timeScale === 5 ? 11 : 2.8;
    const kmPerMinute = this.playerSpeedKmh / 60;
    const availableMinutes = simMinPerRealSec * dtSec;
    const remainingKm = Math.max(0, boundaryKm - run.legProgressKm);
    const deltaKm = Math.min(kmPerMinute * availableMinutes, remainingKm);
    const beforeStopApproach = stopKm - run.legProgressKm > SKIP_PROMPT_KM;
    const simMinutes = remainingKm === 0 ? 0 : kmPerMinute > 0 ? deltaKm / kmPerMinute : availableMinutes;
    const elevGain = legSpec.reverse ? edge.elevationLossM : edge.elevationGainM;
    const elevLoss = legSpec.reverse ? edge.elevationGainM : edge.elevationLossM;
    const cons100 = computeConsumptionKwh100(
      vehicle,
      this.playerSpeedKmh,
      weather,
      elevGain,
      descent ? 0 : elevLoss,
      edge.distanceKm,
      this.bridge.level.trailerWeightKg || 0,
      !!run.plan.behindTruckMode
    );
    const baseKwh = winterRoadEnergyKwh(
      cons100, deltaKm, !!this.bridge.level.requiresWinterTires,
      run.distanceDrivenKm, run.coldStart, run.snowploughUntilKm
    );
    const fromKm = run.legProgressKm;
    if (deltaKm > 0) {
      run.legProgressKm = deltaKm === remainingKm ? boundaryKm : fromKm + deltaKm;
    }
    const downhill = descentState && alpineRoadEnergy(
      descent, fromKm, run.legProgressKm, baseKwh, run.socPct, vehicle.batteryKwh, descentState.mode
    );
    const kwhBurned = downhill ? downhill.netKwh : baseKwh;
    run.distanceDrivenKm += deltaKm;
    run.energyUsedKwh += kwhBurned;
    run.socPct = Math.max(0, run.socPct - (kwhBurned / vehicle.batteryKwh) * 100);
    run.elapsedMinutes += simMinutes;
    run.bladderNeed = Math.min(100, run.bladderNeed + simMinutes * 0.35);
    run.hungerNeed = Math.min(100, (run.hungerNeed || 0) + simMinutes * 0.12);

    const comfortDamping = 1 - (vehicle.comfortRating - 5) * 0.04;
    let stressDeltaPerMin = 0.02;
    if (run.hungerNeed > 75) stressDeltaPerMin += 0.08;
    if (this.playerSpeedKmh > 145) stressDeltaPerMin += 0.14;
    if (brakingLead) stressDeltaPerMin += 0.10 * this.trafficRisk;
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

    if (descentState && downhill) descentState.recoveredKwh += downhill.recoveredKwh;
    if (descentState && downhill && !descentState.overheated) {
      descentState.brakeHeatM += downhill.brakeHeatM;
      if (brakesOverheat(descentState.brakeHeatM)) {
        descentState.overheated = true;
        this.bridge.paused = true;
        SoundFX.alert();
        this.bridge.onAlpineEvent({ kind: 'overheat' });
        return;
      }
    }

    if (pendingStop && run.legProgressKm >= stopKm) {
      this.bridge.paused = true;
      SoundFX.click();
      this.bridge.onTriggerChargerSegment(pendingStop.station);
      return;
    }

    if (pass && run.legProgressKm >= passKm) {
      this.bridge.paused = true;
      SoundFX.alert();
      this.bridge.onAlpineEvent({ kind: 'pass', name: pass.name });
      return;
    }

    if (run.legProgressKm >= nextDescentKm) {
      this.bridge.paused = true;
      SoundFX.alert();
      this.bridge.onAlpineEvent({ kind: 'descent' });
      return;
    }

    if (run.legProgressKm >= edge.distanceKm) {
      if (edge.tollEur > 0 && !run.paidTollLegIndices.includes(run.currentLegIndex)) {
        run.tollsEur += edge.tollEur;
        run.paidTollLegIndices.push(run.currentLegIndex);
      }
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
      if (legSpec.destinationAtEnd) {
        this.bridge.paused = true;
        this.bridge.onDestinationArrival();
        return;
      }
      if (run.currentLegIndex < activeLegs.length - 1) {
        run.currentLegIndex += 1;
        run.legProgressKm = 0;
        run.speedCapKmh = undefined;
        run.speedCapLabel = undefined;
        run.countryLimitKmh = undefined;
        run.tailgateReady = false;
      } else {
        this.bridge.paused = true;
        this.bridge.onTriggerCitySegment('aachen_finish');
        return;
      }
      this.bridge.onAutobahnHudTick(run);
      return;
    }

    const winterEvent = nextWinterRoadEvent(this.bridge.level, run, edge);
    if (winterEvent) {
      run.triggeredEventIds.push(winterEvent);
      this.bridge.paused = true;
      SoundFX.alert();
      this.bridge.onDynamicEventTrigger(winterEvent);
      return;
    }

    const legRatio = run.legProgressKm / edge.distanceKm;
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
      const trapSign = section.signKmh;
      const excess = this.playerSpeedKmh - trapSign;
      const trapMark = `evt_speed_trap@${run.currentLegIndex}`;
      const trapsOnLeg = run.triggeredEventIds.filter(id => id.startsWith(trapMark)).length;
      if (pool.includes('evt_speed_trap') && trapSign > 0 && excess > 8 && trapsOnLeg < 2) {
        const chance = speedTrapChancePerSimMinute(excess, edge.policeRiskBase) * simMinutes;
        if (Math.random() < chance) {
          run.speedTrap = {
            country: section.country,
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
        section.country === 'FR' &&
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

    this.hudTickAccum += dtSec;
    const enteredStopApproach = beforeStopApproach && stopKm - run.legProgressKm <= SKIP_PROMPT_KM;
    if (enteredStopApproach || this.hudTickAccum >= 0.12) this.updateHud(run, tailgateLead);
  }

  private updateHud(run: RunState, tailgateLead: HighwayCar | null): void {
    this.hudTickAccum = 0;
    this.hudTailgateLead = tailgateLead;
    run.tailgateReady = !!tailgateLead;
    this.bridge.onAutobahnHudTick(run);
  }

  private findTailgateLead(brakingLead: HighwayCar | null, driveMax: number): HighwayCar | null {
    if (this.playerLane !== 0 || this.playerLanePos !== 0 || driveMax - this.playerSpeedKmh <= 10) return null;
    const lead = leadVehicle(this.npcs, 0, 210);
    if (!lead || lead !== brakingLead || lead.kind === 'truck' ||
      lead.lanePos !== 0 || lead.targetLane !== 0 || lead.pendingLane !== null) return null;
    const followingSpeed = followSpeedKmh(
      driveMax, lead.distanceKm * HIGHWAY_PX_PER_KM, lead.speedKmh, bumperGap('player', lead.kind)
    );
    return driveMax - followingSpeed > 10 ? lead : null;
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
