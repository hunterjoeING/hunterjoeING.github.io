import * as Phaser from 'phaser';
import { ChargerStation, CityDrivePreset, PoliceViolationKind } from '../types';
import { passGrip, passTravelHeading } from '../sim/AlpineDriving';
import { PASS_FOLLOW_MIN_PER_SECOND, PASS_NEAR_MISS_STRESS, passOnIce } from '../sim/AlpineHazards';
import { applyStress } from '../sim/PauseEffects';
import { AlpinePassTraffic } from './AlpinePassTraffic';
import { passNavigation, passRoadContains } from './AlpinePass';
import { getChargerById } from '../data/europeMap';
import { MONTPELLIER_HOTEL_GOAL, MONTPELLIER_SEA } from '../data/cityLayouts/montpellier';
import { isRearParked } from '../sim/ChargingBay';
import { applyMontpellierWeather, MONTPELLIER_LIGHTING } from '../sim/CoastalLight';
import { evaluatePropertyDamage, MIN_DAMAGE_IMPACT_PX_PER_SEC, recordConeHit, STATIC_CONTACT_CLEARANCE_PX } from '../sim/PropertyDamage';
import { pointInCityRect } from '../sim/WinterCity';
import { createCityMinimap } from './MappedCityPainter';
import { COASTAL_BACKGROUND, createSeaGlitter, followCoastalShadow } from './CoastalEffects';
import { ERoadtripBridge, ensureTouchHoldsMatchPointers } from './GameBridge';
import {
  CityLightingProfile,
  PedestrianAgent,
  SignalIntersection,
  SignalPhase,
  TrafficCarAgent,
  ZebraCrosswalk,
  computeCityLightingProfile,
  detectPlayerTrafficViolation,
  evaluateCollisionFault,
  stepCityTraffic,
  trafficShape
} from './CityTraffic';
import {
  CAR_FOOTPRINT, Capsule, capsuleInsideWorld, capsuleOverlapsRect, capsulesOverlap, circleAt, rotatedCarBounds,
  vehicleCapsule
} from './CityCollision';
import {
  capsuleOnRoad, COLLISION_GRACE_SEC, findCollisionRecoveryPoint, RECOVERY_TRAFFIC_CLEARANCE_PX, TRAFFIC_RECOVERY_RADIUS_PX
} from './CityCollisionRecovery';
import { Rect } from './PlaceStyles';
import { SoundFX } from './SoundFX';
import { paintDrivingPlace, PaintedChargingBay, PlacePaint, setBayOccupied } from './PlacePainter';
import { isGrassSurface, SurfaceFx } from './SurfaceFx';

type PropertyContact = Rect | Capsule | 'worldEdge' | 'passEdge' | 'water';
type TurnSignal = -1 | 0 | 1;
export const CITY_STOP_SPEED_PX_PER_SEC = 8;
export const CITY_TURN_SIGNAL_HZ = 1.5;
const CITY_PARKING_DWELL_SEC = 0.6;
const SIGNAL_COLOR: Record<SignalPhase, number> = { green: 0x22c55e, amber: 0xfacc15, red: 0xef4444 };

export class CityDriveScene extends Phaser.Scene {
  private bridge!: ERoadtripBridge;
  private preset: CityDrivePreset = 'aachen_start';
  private station?: ChargerStation;

  private player!: Phaser.GameObjects.Image;
  private turnLamps?: { left: Phaser.GameObjects.Graphics; right: Phaser.GameObjects.Graphics };
  private turnSignal: TurnSignal = 0;
  private turnSignalPhase = 0;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<'W' | 'A' | 'S' | 'D' | 'SPACE' | 'H', Phaser.Input.Keyboard.Key>;

  private worldW = 2040;
  private worldH = 1480;
  private carSpeed = 0;
  private travelHeading?: number;

  private trafficTimer = 0;
  private intersections: SignalIntersection[] = [];
  private signalVisuals: Array<{
    interId: string;
    axis: 'ew' | 'ns';
    sprite: Phaser.GameObjects.Image;
    halo?: Phaser.GameObjects.Image;
    shimmer?: Phaser.GameObjects.Image;
  }> = [];
  private zebras: ZebraCrosswalk[] = [];
  private wasInInter = new Set<string>();
  private wasInZebra = new Set<string>();

  private trafficCars: TrafficCarAgent[] = [];
  private pedestrians: PedestrianAgent[] = [];
  private obstacleRects: Rect[] = [];
  private obstacleCircles: Capsule[] = [];
  private propertyContacts = new Set<PropertyContact>();
  private cones: { bounds: Rect; sprite: Phaser.GameObjects.Image }[] = [];
  private hitCones = new Set<number>();

  private targetZone!: Phaser.Geom.Rectangle;
  private targetGlow?: Phaser.GameObjects.Rectangle;
  private targetLabel?: Phaser.GameObjects.Text;
  private reverseHintText!: Phaser.GameObjects.Text;
  private navArrow!: Phaser.GameObjects.Triangle;
  private moveMinimap?: ReturnType<typeof createCityMinimap>;
  private distText!: Phaser.GameObjects.Text;

  private cableGfx!: Phaser.GameObjects.Graphics;
  private nightOverlay!: Phaser.GameObjects.Rectangle;
  private fogOverlay!: Phaser.GameObjects.Rectangle;
  private lightningOverlay!: Phaser.GameObjects.Rectangle;
  private weatherParticles: Phaser.GameObjects.Image[] = [];
  private rainSplashes: Array<{ sprite: Phaser.GameObjects.Image; age: number; maxAge: number }> = [];
  private streetlamps: Array<{ x: number; y: number }> = [];
  private lampVisuals: Array<{
    outer: Phaser.GameObjects.Image;
    core: Phaser.GameObjects.Image;
    shimmer: Phaser.GameObjects.Image;
    phase: number;
  }> = [];
  private neonSigns: Array<{
    x: number;
    y: number;
    roadX: number;
    roadY: number;
    color: number;
    phase: number;
    flicker?: boolean;
  }> = [];
  private neonVisuals: Array<{
    halo: Phaser.GameObjects.Image;
    shimmer: Phaser.GameObjects.Image;
    phase: number;
    flicker?: boolean;
  }> = [];
  private playerReflection?: Phaser.GameObjects.Image;
  private playerHeadlight?: Phaser.GameObjects.Image;
  private playerTaillight?: Phaser.GameObjects.Image;
  private npcVisuals: Array<{
    agent: TrafficCarAgent;
    reflection: Phaser.GameObjects.Image;
    headlight?: Phaser.GameObjects.Image;
    taillight?: Phaser.GameObjects.Image;
    sirenGlow?: Phaser.GameObjects.Image;
  }> = [];
  private isMobilePerf = false;
  private place!: PlacePaint;
  private surface!: SurfaceFx;
  private passThrough = false;
  private passTraffic?: AlpinePassTraffic;
  private passUnsafeLane = false;
  private cityApproachReached = false;
  private spinners: Phaser.GameObjects.Image[] = [];
  private roadWet = false;
  private updateCoastalLight?: (time: number) => void;
  private previewFx = false;
  private previewDriveSec = 0;
  private previewLock = false;

  private dwellInTargetSec = 0;
  private collisionGraceSec = 0;
  private collisionRecoveryHeading?: number;
  private bumpFeedbackSec = 0;
  private violationCooldownSec = 0;
  private stormFlashTimer = 4;
  private completed = false;
  private cleanRun = true;

  private resizeHandler?: (size: Phaser.Structs.Size) => void;
  private activeTimers: Phaser.Time.TimerEvent[] = [];

  constructor() {
    super({ key: 'CityDriveScene' });
  }

  init(data: { bridge: ERoadtripBridge; preset: CityDrivePreset; chargerId?: string; previewFx?: boolean }): void {
    this.bridge = data.bridge;
    this.preset = data.preset;
    if (this.preset === 'montpellier_finish' && this.bridge.runState) applyMontpellierWeather(this.bridge.runState);
    this.station = data.chargerId ? getChargerById(data.chargerId) : undefined;
    this.previewFx = !!data.previewFx;
    this.previewDriveSec = 0;
    this.roadWet = false;
    this.updateCoastalLight = undefined;
    this.passThrough = false;
    this.passTraffic = undefined;
    this.passUnsafeLane = false;
    this.cityApproachReached = false;
    this.spinners = [];
    this.carSpeed = 0;
    this.turnSignal = 0;
    this.turnSignalPhase = 0;
    this.turnLamps = undefined;
    this.travelHeading = undefined;
    this.dwellInTargetSec = 0;
    this.collisionGraceSec = 0;
    this.collisionRecoveryHeading = undefined;
    this.bumpFeedbackSec = 0;
    this.propertyContacts.clear();
    this.cones = [];
    this.hitCones.clear();
    this.violationCooldownSec = 1.2;
    this.completed = false;
    this.cleanRun = true;
    this.trafficCars = [];
    this.pedestrians = [];
    this.signalVisuals = [];
    this.intersections = [];
    this.zebras = [];
    this.streetlamps = [];
    this.lampVisuals = [];
    this.neonSigns = [];
    this.neonVisuals = [];
    this.npcVisuals = [];
    this.weatherParticles = [];
    this.rainSplashes = [];
    this.playerReflection = undefined;
    this.playerHeadlight = undefined;
    this.playerTaillight = undefined;
    this.wasInInter.clear();
    this.wasInZebra.clear();
    this.activeTimers = [];
  }

  create(): void {
    const w0 = this.scale.width;
    this.isMobilePerf =
      w0 < 640 ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0 && w0 < 900);

    const run = this.bridge.runState;
    const lighting = computeCityLightingProfile(
      this.bridge.level.departureTimeHour, run?.elapsedMinutes ?? 0, this.preset,
      run?.activeWeather ?? 'clear', run?.isNight
    );
    this.place = paintDrivingPlace(this, {
      preset: this.preset,
      levelOrder: this.bridge.level.order,
      routeId: (this.preset === 'aachen_finish' ? run?.plan.returnRouteId : undefined) ||
        run?.plan.selectedRouteId || this.bridge.plan.selectedRouteId,
      station: this.station,
      mobile: this.isMobilePerf,
      passName: run?.alpinePass?.name,
      passSeed: run?.leaderboardRunId ?? run?.plan.selectedRouteId,
      light: this.bridge.isLightTheme(),
      night: lighting.isNight
    });
    this.worldW = this.place.worldW;
    this.worldH = this.place.worldH;
    this.zebras = this.place.zebras;
    this.neonSigns = this.place.neons;
    this.passThrough = this.place.passThrough;
    this.spinners = this.place.spinners;
    this.surface = new SurfaceFx(this, this.isMobilePerf);
    this.previewDriveSec = this.previewFx ? 3.4 : 0;
    if (new URLSearchParams(window.location.search).has('erpreview')) {
      const debugWindow = window as Window & {
        __erCity?: () => { speed: number; x: number; y: number };
      };
      debugWindow.__erCity = () => ({
        speed: this.carSpeed,
        x: this.player?.x || 0,
        y: this.player?.y || 0
      });
      (debugWindow as Window & { __erZoom?: (zoom: number) => void }).__erZoom = (zoom: number) => {
        this.previewLock = false;
        this.cameras.main.startFollow(this.player, true, 1, 1);
        this.cameras.main.setZoom(zoom);
      };
    }
    this.targetZone = this.place.targetZone;

    this.physics.world.setBounds(0, 0, this.worldW, this.worldH);
    this.cameras.main.setBounds(0, 0, this.worldW, this.worldH);
    this.cameras.main.setBackgroundColor(this.preset === 'montpellier_finish'
      ? COASTAL_BACKGROUND : this.place.autohof ? 0x14532d : 0x10281c);

    if (this.place.zoneLabel && this.place.zoneColor !== undefined) {
      this.drawZoneMarker(this.place.zoneLabel, this.place.zoneColor);
    }
    this.spawnEnvironmentAndProps();
    this.spawnTrafficAndPedestrians();
    if (this.place.passRoad) this.passTraffic = new AlpinePassTraffic(this.place.passRoad, this);
    this.spawnPlayer();
    this.setupLightingAndWeather();
    this.setupNavIndicator();

    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
    this.cameras.main.setZoom(this.zoomFor(this.scale.width));
    if (!this.previewFx && new URLSearchParams(window.location.search).get('erpreview')) {
      const frame = this.time.delayedCall(120, () => {
        if (!this.scene.isActive() || !this.cameras?.main) return;
        if (this.place.passRoad || this.place.cityMinimap) return;
        this.previewLock = true;
        this.cameras.main.stopFollow();
        if (this.place.autohof) {
          this.cameras.main.centerOn(this.worldW * 0.55, this.worldH * 0.5);
          this.cameras.main.setZoom(this.scale.width < 900 ? 0.7 : 0.84);
        } else {
          this.cameras.main.centerOn(this.worldW * 0.46, this.worldH * 0.46);
          this.cameras.main.setZoom(this.scale.width < 900 ? 0.46 : 0.56);
        }
      });
      this.activeTimers.push(frame);
    }

    // Optional subtle Bloom PostFX on WebGL desktop; degrades gracefully on Canvas2D / mobile
    const isWebGL = this.game.renderer.type === Phaser.WEBGL;
    if (this.preset !== 'montpellier_finish' && isWebGL && !this.isMobilePerf && this.cameras.main.postFX) {
      try {
        this.cameras.main.postFX.addBloom(0xffffff, 1, 1, 1.12, 0.32, 2);
      } catch {
        // Ignore if WebGL pipeline does not support PostFX on this GPU
      }
    }

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      SPACE: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      H: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.H)
    };

    this.resizeHandler = (size: Phaser.Structs.Size) => {
      if (!this.scene.isActive() || !this.cameras?.main || this.previewLock) return;
      this.cameras.main.setZoom(this.zoomFor(size.width));
      if (this.nightOverlay && this.nightOverlay.scene) {
        this.nightOverlay.setSize(this.worldW, this.worldH);
      }
    };
    this.scale.on('resize', this.resizeHandler);

    const syncPhysicsPause = () => {
      const world = this.physics.world;
      if (this.bridge.paused || this.completed) {
        if (!world.isPaused) world.pause();
      } else if (world.isPaused) {
        world.resume();
      }
    };
    this.events.on(Phaser.Scenes.Events.PRE_UPDATE, syncPhysicsPause);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.events.off(Phaser.Scenes.Events.PRE_UPDATE, syncPhysicsPause);
      if (this.resizeHandler) {
        this.scale.off('resize', this.resizeHandler);
        this.resizeHandler = undefined;
      }
      if (this.cameras?.main?.postFX) {
        try {
          this.cameras.main.postFX.clear();
        } catch {
          // Safe cleanup
        }
      }
      this.activeTimers.forEach(t => t.remove(false));
      this.activeTimers = [];
      this.tweens.killAll();
    });
  }


  private zoomFor(width: number): number {
    if (this.place?.autohof) return width < 640 ? 0.9 : 1.02;
    if (this.place?.cityMinimap) return width < 360 ? 0.64 : width < 640 ? 0.7 : 0.9;
    return width < 640 ? 0.72 : 0.9;
  }

  private drawZoneMarker(label: string, color: number): void {
    this.targetGlow = this.add
      .rectangle(
        this.targetZone.centerX,
        this.targetZone.centerY,
        this.targetZone.width,
        this.targetZone.height,
        color,
        0.26
      )
      .setStrokeStyle(3, color, 0.95)
      .setDepth(3);

    this.tweens.add({
      targets: this.targetGlow,
      alpha: 0.55,
      duration: 700,
      yoyo: true,
      repeat: -1
    });

    this.targetLabel = this.add
      .text(this.targetZone.centerX, this.targetZone.centerY, label, {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: this.place.cityGuide ? '16px' : '10px',
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
        backgroundColor: 'rgba(15,23,42,0.78)',
        padding: { x: 4, y: 2 }
      })
      .setOrigin(0.5)
      .setDepth(4);
  }

  private spawnEnvironmentAndProps(): void {
    this.obstacleRects = this.place.buildings.slice();
    this.obstacleCircles = this.place.trees.map(spot => {
      const tree = this.add.image(spot.x, spot.y, 'pixel_tree').setDepth(6);
      if (this.place.passRoad || this.place.cityGuide?.snow) tree.setTint(0xd3edf7);
      return circleAt(spot.x, spot.y, 11);
    });

    this.streetlamps = this.place.lamps.slice();
    this.streetlamps.forEach(lp => {
      this.add.image(lp.x, lp.y, 'streetlamp').setDepth(11);
    });

    if (this.place.cityGuide) {
      this.cones = this.place.cityGuide.cones.map(({ x, y }) => ({
        bounds: { x: x - 4, y: y - 4, w: 8, h: 8 },
        sprite: this.add.image(x, y, 'cone').setDepth(5)
      }));
    }
    this.intersections = this.place.signals?.map(({ id, x, y, radius }, index) => ({
      id, centerX: x, centerY: y,
      box: new Phaser.Geom.Rectangle(x - radius, y - radius, 2 * radius, 2 * radius),
      ewPhase: index === 0 ? 'green' : 'red',
      nsPhase: index === 0 ? 'red' : 'green'
    })) ?? [];
    this.spawnSignalVisuals();
  }

  private spawnSignalVisuals(): void {
    const coast = this.preset === 'montpellier_finish';
    const addLightVisual = (interId: string, axis: 'ew' | 'ns', x: number, y: number, phase: SignalPhase) => {
      const shimmer = coast ? undefined : this.add
        .image(x, y + 22, 'wet_shimmer')
        .setTint(SIGNAL_COLOR[phase])
        .setScale(0.52, 0.55)
        .setAlpha(0.28)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(2.5);
      const halo = coast ? undefined : this.add
        .image(x, y, 'light_glow_soft')
        .setTint(SIGNAL_COLOR[phase])
        .setScale(0.42)
        .setAlpha(0.55)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(14.6);
      const sprite = this.add.image(x, y, `tlight_${phase}`).setDepth(14.5);
      this.signalVisuals.push({ interId, axis, sprite, halo, shimmer });
    };

    for (const { id, centerX: x, centerY: y, box, ewPhase, nsPhase } of this.intersections) {
      const dx = box.width / 2 + 8;
      const dy = box.height / 2 + 8;
      addLightVisual(id, 'ew', x - dx, y, ewPhase);
      addLightVisual(id, 'ew', x + dx, y, ewPhase);
      addLightVisual(id, 'ns', x, y - dy, nsPhase);
      addLightVisual(id, 'ns', x, y + dy, nsPhase);
    }
  }

  private spawnTrafficAndPedestrians(): void {
    for (const route of this.place.traffic) {
      const start = route.path[route.startIndex];
      const next = route.path[route.startIndex + 1];
      const rotation = Math.atan2(next.y - start.y, next.x - start.x) + Math.PI / 2;
      const sprite = this.add.image(start.x, start.y, route.tex).setDepth(7).setRotation(rotation);
      this.trafficCars.push({
        sprite, route, wpIndex: route.startIndex + 1, currentSpeed: 0, holdLeft: 0, blockedSec: 0, ghostSec: 0, vx: 0, vy: 0
      });
    }

    for (const { tex, wps, speed, zebraLink } of this.place.litePeds ?? []) {
      const start = wps[0];
      const sp = this.physics.add.image(start.x, start.y, tex).setDepth(8);
      sp.setImmovable(true);
      this.pedestrians.push({
        sprite: sp, waypoints: wps, wpIndex: 1 % wps.length, speed, isCrossing: false, zebraLink
      });
    }
  }

  private spawnPlayer(): void {
    const spot = this.previewFx && this.place.previewPoint ? this.place.previewPoint : this.place.spawn;
    this.player = this.add.image(spot.x, spot.y, `car_${this.bridge.plan.vehicleId}`).setDepth(10).setRotation(spot.rot);
    const lamps = (side: -1 | 1) => {
      const x = side < 0 ? -12 : 7;
      return this.add.graphics().setDepth(10.1).setVisible(false)
        .fillStyle(0xf97316).fillRect(x, -23, 5, 4).fillRect(x, 19, 5, 4)
        .fillStyle(0xffc15a).fillRect(x + 1, -22, 3, 2).fillRect(x + 1, 20, 3, 2);
    };
    this.turnLamps = { left: lamps(-1), right: lamps(1) };
  }

  private updateTurnSignal(signal: TurnSignal, dt: number): void {
    const wasLit = !!this.turnSignal && this.turnSignalPhase < 0.5;
    this.turnSignalPhase = signal && signal === this.turnSignal
      ? (this.turnSignalPhase + dt * CITY_TURN_SIGNAL_HZ) % 1 : 0;
    this.turnSignal = signal;
    if (!this.turnLamps) return;
    const lit = this.turnSignalPhase < 0.5;
    this.turnLamps.left.setVisible(lit && signal === -1);
    this.turnLamps.right.setVisible(lit && signal === 1);
    if (lit && signal) {
      const lamp = signal < 0 ? this.turnLamps.left : this.turnLamps.right;
      lamp.setPosition(this.player.x, this.player.y).setRotation(this.player.rotation);
      if (!wasLit) SoundFX.indicatorTick();
    }
  }

  private hitsObstacle(shape: Capsule): boolean {
    return this.obstacleRects.some(rect => capsuleOverlapsRect(shape, rect)) ||
      this.obstacleCircles.some(circle => capsulesOverlap(shape, circle)) ||
      this.hitsWater(shape) || this.hitsParkedVehicle(shape);
  }

  private hitsWater(shape: Capsule): boolean {
    return this.place.water?.some(rect => capsuleOverlapsRect(shape, rect)) ?? false;
  }

  private hitsParkedVehicle(shape: Capsule): boolean {
    return this.place.parkedVehicles?.some(rect => capsuleOverlapsRect(shape, rect)) ?? false;
  }

  private hitProperty(contact: PropertyContact): void {
    const impactSpeed = Math.abs(this.carSpeed);
    this.carSpeed = 0;
    if (this.propertyContacts.has(contact) || this.collisionGraceSec > 0 || this.completed || this.bridge.paused) return;

    const damage = evaluatePropertyDamage(impactSpeed);
    if (!damage) {
      if (impactSpeed > 0) this.bumpFeedback();
      return;
    }
    this.propertyContacts.add(contact);
    if (this.place.passRoad || this.place.cityGuide) this.cleanRun = false;
    SoundFX.bump();
    this.bridge.paused = true;
    this.physics.world.pause();
    this.bridge.onPropertyDamage(damage);
  }

  private releasePropertyContacts(shape: Capsule): void {
    if (this.propertyContacts.size === 0) return;
    const clearance = { ...shape, radius: shape.radius + STATIC_CONTACT_CLEARANCE_PX };
    for (const contact of this.propertyContacts) {
      const nearby = contact === 'worldEdge' ? !capsuleInsideWorld(clearance, this.worldW, this.worldH) :
        contact === 'passEdge' ? !passRoadContains(this.place.passRoad!, clearance) :
        contact === 'water' ? this.hitsWater(clearance) :
        'radius' in contact ? capsulesOverlap(clearance, contact) : capsuleOverlapsRect(clearance, contact);
      if (!nearby) this.propertyContacts.delete(contact);
    }
  }

  private knockAwayCones(shape: Capsule, x: number, rotation: number): void {
    const run = this.bridge.runState;
    if (!run) return;
    this.cones.forEach(({ bounds, sprite }, id) => {
      if (this.hitCones.has(id) || !capsuleOverlapsRect(shape, bounds) ||
          !recordConeHit(run, this.hitCones, id)) return;

      this.bridge.onCityStressChanged(run);
      const direction = Math.sign(this.carSpeed);
      const side = sprite.x < x ? -1 : 1;
      this.tweens.add({
        targets: sprite,
        x: sprite.x + 42 * Math.sin(rotation) * direction + side * 26,
        y: sprite.y - 42 * Math.cos(rotation) * direction - 14,
        angle: sprite.angle + side * 210,
        duration: 350,
        ease: 'Quad.Out'
      });
    });
  }

  private pedestrianShape(ped: PedestrianAgent): Rect | undefined {
    const body = ped.sprite.body;
    if (body) return { x: body.x, y: body.y, w: body.width, h: body.height };
  }

  private updateCollisionRecovery(dt: number): void {
    const heading = this.collisionRecoveryHeading;
    if (heading === undefined && this.collisionGraceSec <= 0) return;
    if (heading !== undefined) {
      this.collisionRecoveryHeading = undefined;
      this.collisionGraceSec = COLLISION_GRACE_SEC;
      const origin = { x: this.player.x, y: this.player.y };
      const traffic = this.trafficCars.map(trafficShape);
      const pedestrians = this.pedestrians.map(ped => this.pedestrianShape(ped));
      const stopBoxes = [
        ...this.intersections.map(({ box }) => ({ x: box.x, y: box.y, w: box.width, h: box.height })),
        ...this.place.trafficJunctions
      ];
      const { passRoad, roadSurface, asphalt } = this.place;
      const point = findCollisionRecoveryPoint(origin, heading, this.place.travelLanes, stopBoxes, shape => {
        if (!capsuleInsideWorld(shape, this.worldW, this.worldH)) return false;
        const onRoad = passRoad ? passRoadContains(passRoad, shape) :
          capsuleOnRoad(shape, spot => !!roadSurface?.(spot) || asphalt.some(rect => pointInCityRect(spot, rect)));
        const trafficClearance = { ...shape, radius: shape.radius + RECOVERY_TRAFFIC_CLEARANCE_PX };
        return onRoad && !this.hitsObstacle(shape) && !this.passTraffic?.obstructs(trafficClearance) &&
          !traffic.some(other => capsulesOverlap(trafficClearance, other)) &&
          !pedestrians.some(rect => rect && capsuleOverlapsRect(shape, rect));
      });
      if (point) {
        this.player.setPosition(point.x, point.y).setRotation(point.rot);
        this.releasePropertyContacts(vehicleCapsule(point.x, point.y, point.rot));
      }
      for (const car of this.trafficCars) {
        const nearby = [origin, this.player].some(({ x, y }) =>
          Math.hypot(car.sprite.x - x, car.sprite.y - y) <= TRAFFIC_RECOVERY_RADIUS_PX);
        if (nearby) car.ghostSec = COLLISION_GRACE_SEC;
      }
    } else {
      this.collisionGraceSec = Math.max(0, this.collisionGraceSec - dt);
    }
    const dim = this.collisionGraceSec > 0 && Math.floor(this.collisionGraceSec * 10) % 2 === 0;
    this.player.setAlpha(dim ? 0.45 : 1);
  }

  private movePlayer(dt: number, turn: number, grip = 1): boolean {
    const moving = this.carSpeed !== 0 || turn !== 0;
    const rotation = this.player.rotation + turn * dt;
    const travel = grip < 1 ? passTravelHeading(this.travelHeading ?? this.player.rotation, rotation, grip, dt) : rotation;
    const x = this.player.x + Math.sin(travel) * this.carSpeed * dt;
    const y = this.player.y - Math.cos(travel) * this.carSpeed * dt;
    const shape = vehicleCapsule(x, y, rotation);
    if (moving) {
      if (this.place.passRoad && !passRoadContains(this.place.passRoad, shape)) {
        this.travelHeading = undefined;
        this.hitProperty('passEdge');
        return false;
      }
      if (!capsuleInsideWorld(shape, this.worldW, this.worldH)) {
        this.hitProperty('worldEdge');
        return false;
      }
      const contact = this.obstacleRects.find(rect => capsuleOverlapsRect(shape, rect)) ??
        this.obstacleCircles.find(circle => capsulesOverlap(shape, circle)) ??
        (this.passTraffic && capsulesOverlap(shape, this.passTraffic.parked) ? this.passTraffic.parked : undefined);
      if (contact) {
        this.hitProperty(contact);
        return false;
      }
      if (this.hitsWater(shape)) {
        this.hitProperty('water');
        return false;
      }
      if (this.hitsParkedVehicle(shape)) {
        this.handleCollision('obstacle', x, y, 0, travel);
        return false;
      }
    }
    if (this.collisionGraceSec <= 0) {
      const passCollision = this.passTraffic?.collision(shape);
      if (passCollision) {
        this.handleCollision('car', passCollision.x, passCollision.y, passCollision.speedPx, travel);
        return false;
      }
      for (const car of this.trafficCars) {
        if (car.ghostSec > 0 || !capsulesOverlap(shape, trafficShape(car))) continue;
        this.handleCollision(car.route.isCyclist ? 'cyclist' : 'car', car.sprite.x, car.sprite.y, car.currentSpeed, travel);
        return false;
      }
      for (const ped of this.pedestrians) {
        const body = this.pedestrianShape(ped);
        if (!body || !capsuleOverlapsRect(shape, body)) continue;
        this.handleCollision('pedestrian', ped.sprite.x, ped.sprite.y, ped.speed, travel);
        return false;
      }
    }
    if (moving) {
      this.knockAwayCones(shape, x, rotation);
      this.travelHeading = travel;
      this.player.setPosition(x, y).setRotation(rotation);
      this.releasePropertyContacts(shape);
    }
    return true;
  }

  private updateChargingBays(): { parked?: PaintedChargingBay; nearest?: PaintedChargingBay } {
    const { x, y, rotation } = this.player;
    const car = { x, y, rotation, speed: this.carSpeed, footprint: rotatedCarBounds(x, y, rotation) };
    const traffic = this.trafficCars.map(trafficShape);
    let parked: PaintedChargingBay | undefined;
    let nearest: PaintedChargingBay | undefined;
    let nearestDistance = Infinity;
    for (const bay of this.place.chargingBays ?? []) {
      const occupied = bay.parkedCar || traffic.some(shape => capsuleOverlapsRect(shape, bay.bounds));
      if (bay.occupied !== occupied) setBayOccupied(bay, occupied);
      if (occupied) continue;
      if (isRearParked(bay, car)) parked = bay;
      const distance = Math.hypot(bay.bounds.x + bay.bounds.w / 2 - x, bay.bounds.y + bay.bounds.h / 2 - y);
      if (distance < nearestDistance) {
        nearest = bay;
        nearestDistance = distance;
      }
    }
    return { parked, nearest };
  }

  private stepTraffic(dt: number): void {
    stepCityTraffic(dt, {
      cars: this.trafficCars,
      pedestrians: this.pedestrians,
      intersections: this.intersections,
      zebras: this.zebras,
      junctions: this.place.trafficJunctions,
      player: this.player,
      playerInGrace: this.collisionGraceSec > 0,
      hitsObstacle: shape => this.hitsObstacle(shape),
      onPlayerContact: ({ route, sprite }) => {
        this.handleCollision(route.isCyclist ? 'cyclist' : 'car', sprite.x, sprite.y, route.speed);
        return this.bridge.paused;
      }
    });
  }

  private handleCollision(
    kind: 'car' | 'pedestrian' | 'cyclist' | 'obstacle',
    otherX: number,
    otherY: number,
    otherSpeed: number,
    travel = this.travelHeading ?? this.player.rotation
  ): void {
    if (this.collisionGraceSec > 0 || this.completed || this.bridge.paused) return;
    if (Math.abs(this.carSpeed) < MIN_DAMAGE_IMPACT_PX_PER_SEC) {
      if (this.carSpeed !== 0) this.bumpFeedback();
      this.carSpeed = kind === 'obstacle' ? -this.carSpeed * 0.4 : 0;
      return;
    }

    const fault = evaluateCollisionFault(
      kind,
      this.player.x,
      this.player.y,
      this.player.rotation,
      this.carSpeed,
      otherX,
      otherY,
      otherSpeed
    );

    this.collisionRecoveryHeading = this.carSpeed < 0 ? travel + Math.PI : travel;
    this.carSpeed = 0;
    this.travelHeading = undefined;
    if (fault.playerAtFault) {
      this.cleanRun = false;
      if (this.bridge.runState) this.bridge.runState.collisionsCount += 1;
      this.cameras.main.shake(180, 0.008);
    } else {
      this.cameras.main.shake(90, 0.003);
    }
    SoundFX.bump();
    this.bridge.paused = true;
    this.physics.world.pause();
    this.bridge.onCollisionEvent({
      kind,
      playerAtFault: fault.playerAtFault,
      reason: fault.reason
    });
  }

  private bumpFeedback(): void {
    if (this.bumpFeedbackSec > 0) return;
    this.bumpFeedbackSec = 0.22;
    SoundFX.bump();
    this.cameras?.main?.shake(90, 0.002);
  }

  private triggerPoliceStop(kind: PoliceViolationKind): void {
    if (this.violationCooldownSec > 0 || this.completed || this.bridge.paused) return;
    this.violationCooldownSec = 6.0;
    this.carSpeed = 0;
    this.cleanRun = false;
    SoundFX.alert();
    this.cameras.main.flash(180, 30, 64, 175, true);
    this.bridge.paused = true;
    this.physics.world.pause();
    this.bridge.onPoliceViolation(kind);
  }

  private setupLightingAndWeather(): void {
    this.cableGfx = this.add.graphics().setDepth(13);
    if (this.preset === 'montpellier_finish') {
      this.setupCoastalLight();
      return;
    }

    // Place the ambient overlay below additive lights so their beams stay visible.
    this.nightOverlay = this.add
      .rectangle(this.worldW / 2, this.worldH / 2, this.worldW, this.worldH, 0x020617, 0)
      .setDepth(12);
    this.fogOverlay = this.add
      .rectangle(this.worldW / 2, this.worldH / 2, this.worldW, this.worldH, 0xcbd5e1, 0)
      .setDepth(15);
    this.lightningOverlay = this.add
      .rectangle(this.worldW / 2, this.worldH / 2, this.worldW, this.worldH, 0xe0f2fe, 0)
      .setDepth(17);

    // Additive sodium-vapor streetlamp pools + wet-road specular shimmer reflections
    this.lampVisuals = this.streetlamps.map((lp, idx) => {
      const shimmer = this.add
        .image(lp.x, lp.y + 34, 'wet_shimmer')
        .setTint(0xfbbf24)
        .setScale(0.85, 0.9)
        .setAlpha(0)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(2.5);
      const outer = this.add
        .image(lp.x, lp.y + 10, 'light_glow_soft')
        .setTint(0xffb74d)
        .setScale(1.38)
        .setAlpha(0)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(14);
      const core = this.add
        .image(lp.x, lp.y + 4, 'light_glow_soft')
        .setTint(0xfef08a)
        .setScale(0.46)
        .setAlpha(0)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(14.1);
      return { outer, core, shimmer, phase: idx * 0.9 };
    });

    // Additive neon sign glows + colored wet-asphalt reflection smears
    this.neonVisuals = this.neonSigns.map(ns => {
      const halo = this.add
        .image(ns.x, ns.y, 'light_glow_soft')
        .setTint(ns.color)
        .setScale(1.15)
        .setAlpha(0.55)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(14);
      const isHorizontalRoad = Math.abs(ns.roadY - ns.y) >= Math.abs(ns.roadX - ns.x);
      const shimmer = this.add
        .image(ns.roadX, ns.roadY, 'wet_shimmer')
        .setTint(ns.color)
        .setScale(isHorizontalRoad ? 1.15 : 0.9, isHorizontalRoad ? 0.85 : 1.05)
        .setRotation(isHorizontalRoad ? 0 : Math.PI / 2)
        .setAlpha(0.32)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(2.5);
      return { halo, shimmer, phase: ns.phase, flicker: ns.flicker };
    });

    // Player car mirrored wet-road reflection + additive headlight cone + taillight glow
    this.playerReflection = this.add
      .image(this.player.x, this.player.y + 8, `car_${this.bridge.plan.vehicleId}`)
      .setTint(0x93c5fd)
      .setScale(0.96, -0.78)
      .setAlpha(0.2)
      .setDepth(2.4);
    this.playerHeadlight = this.add
      .image(this.player.x, this.player.y, 'headlight_cone')
      .setOrigin(0.5, 0.95)
      .setScale(1.22, 1.18)
      .setAlpha(0.68)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(13.2);
    this.playerTaillight = this.add
      .image(this.player.x, this.player.y, 'light_glow_soft')
      .setTint(0xef4444)
      .setScale(0.52)
      .setAlpha(0.42)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(13.1);

    // NPC mirrored wet-road reflections + additive headlights / taillights / police siren lightbar
    this.npcVisuals = this.trafficCars.map(agent => {
      const reflection = this.add
        .image(agent.sprite.x, agent.sprite.y + 7, agent.sprite.texture.key)
        .setTint(0x93c5fd)
        .setScale(0.94, -0.74)
        .setAlpha(0.18)
        .setDepth(2.4);
      let headlight: Phaser.GameObjects.Image | undefined;
      let taillight: Phaser.GameObjects.Image | undefined;
      let sirenGlow: Phaser.GameObjects.Image | undefined;
      if (!agent.route.isCyclist) {
        headlight = this.add
          .image(agent.sprite.x, agent.sprite.y, 'headlight_cone')
          .setOrigin(0.5, 0.95)
          .setScale(0.86, 0.82)
          .setAlpha(0.52)
          .setBlendMode(Phaser.BlendModes.ADD)
          .setDepth(13.1);
        taillight = this.add
          .image(agent.sprite.x, agent.sprite.y, 'light_glow_soft')
          .setTint(0xef4444)
          .setScale(0.42)
          .setAlpha(0.32)
          .setBlendMode(Phaser.BlendModes.ADD)
          .setDepth(13);
      }
      if (agent.route.isPolice) {
        sirenGlow = this.add
          .image(agent.sprite.x, agent.sprite.y, 'light_glow_soft')
          .setTint(0x38bdf8)
          .setScale(0.75)
          .setAlpha(0.55)
          .setBlendMode(Phaser.BlendModes.ADD)
          .setDepth(14.6);
      }
      return { agent, reflection, headlight, taillight, sirenGlow };
    });

    // Camera-local rain streaks & wet-asphalt splash rings (mobile-aware counts)
    const streakCount = this.isMobilePerf ? 28 : 74;
    this.weatherParticles = [];
    for (let i = 0; i < streakCount; i++) {
      const d = this.add
        .image(Phaser.Math.Between(0, this.worldW), Phaser.Math.Between(0, this.worldH), 'rain_streak')
        .setDepth(16)
        .setAlpha(0);
      this.weatherParticles.push(d);
    }

    const splashCount = this.isMobilePerf ? 8 : 18;
    this.rainSplashes = [];
    for (let i = 0; i < splashCount; i++) {
      const sp = this.add
        .image(this.player.x, this.player.y, 'rain_splash')
        .setDepth(2.6)
        .setAlpha(0);
      this.rainSplashes.push({
        sprite: sp,
        age: Phaser.Math.FloatBetween(0, 0.45),
        maxAge: Phaser.Math.FloatBetween(0.28, 0.5)
      });
    }
  }

  private setupCoastalLight(): void {
    const { ambientColor, ambientAlpha } = MONTPELLIER_LIGHTING;
    this.add.rectangle(this.worldW / 2, this.worldH / 2, this.worldW, this.worldH, ambientColor, ambientAlpha)
      .setDepth(12);
    const densities = this.isMobilePerf ? [30, 9, 5] : [62, 16, 10];
    const glitter = MONTPELLIER_SEA.map(({ x, y, w, h }, index) =>
      createSeaGlitter(this, { x: x + 12, y: y + 4, w: w - 24, h: h - 8 }, densities[index], 2,
        index === 0 ? MONTPELLIER_HOTEL_GOAL.x - 115 : undefined));
    const shadows = [
      followCoastalShadow(this, this.player, 57, 23),
      ...this.trafficCars.map(({ sprite, route }) =>
        followCoastalShadow(this, sprite, route.isCyclist ? 25 : 49, route.isCyclist ? 9 : 20)),
      ...this.pedestrians.map(({ sprite }) => followCoastalShadow(this, sprite, 27, 7))
    ];
    this.updateCoastalLight = time => {
      glitter.forEach(pool => pool.update(time));
      shadows.forEach(update => update());
    };
  }

  private setupNavIndicator(): void {
    this.moveMinimap = this.place.cityMinimap && createCityMinimap(this, this.place.cityMinimap, this.worldW, this.worldH, {
      x: this.targetZone.centerX, y: this.targetZone.centerY
    }, this.place.water);
    this.navArrow = this.add
      .triangle(0, 0, 0, -10, -7, 8, 7, 8, 0xfacc15)
      .setStrokeStyle(1.5, 0x0f172a)
      .setDepth(22)
      .setScrollFactor(0);
    this.distText = this.add
      .text(0, 0, '', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#facc15',
        backgroundColor: 'rgba(15, 23, 42, 0.88)',
        padding: { x: 7, y: 3 }
      })
      .setOrigin(0.5)
      .setDepth(22)
      .setScrollFactor(0);
    this.reverseHintText = this.add
      .text(0, 0, '', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#fef08a',
        backgroundColor: 'rgba(180, 83, 9, 0.92)',
        padding: { x: 8, y: 3 }
      })
      .setOrigin(0.5)
      .setDepth(22)
      .setScrollFactor(0)
      .setVisible(false);
  }

  private updateLightingVisuals(dt: number, profile: CityLightingProfile): void {
    const t = this.trafficTimer;
    // Keep additive lights and street reflections visible in the ambient palette.
    const aachenDeparture = this.preset === 'aachen_start' && this.bridge.level.order === 2 && !profile.isRain;
    const visualAmbientAlpha = profile.isNight
      ? aachenDeparture ? 0.44 : Math.max(0.56, profile.ambientAlpha)
      : profile.isDuskOrDawn
        ? Math.max(0.32, profile.ambientAlpha + 0.14)
        : profile.isRain || profile.isStorm
          ? Math.max(0.34, profile.ambientAlpha + 0.14)
          : Math.max(0.24, profile.ambientAlpha);
    const visualAmbientColor =
      profile.isNight || profile.isRain || profile.isStorm
        ? 0x040b1a
        : profile.isDuskOrDawn
          ? 0x0f172a
          : profile.ambientAlpha > 0
            ? profile.ambientColor
            : 0x0b1528;

    this.nightOverlay.setFillStyle(visualAmbientColor, visualAmbientAlpha);
    this.fogOverlay.setAlpha(profile.isFog ? 0.22 + Math.sin(t * 0.8) * 0.05 : 0);

    // Wetness drives wet-asphalt reflections & shimmer (strongest in rain/storm, damp neo-noir sheen otherwise)
    const wetness = profile.isStorm
      ? 1.0
      : profile.isRain
        ? 0.92
        : profile.isSnow
          ? 0.25
          : 0.68;

    // Storm lightning flash
    if (profile.isStorm) {
      this.stormFlashTimer -= dt;
      if (this.stormFlashTimer <= 0) {
        this.stormFlashTimer = Phaser.Math.FloatBetween(3.5, 8.0);
        this.lightningOverlay.setAlpha(0.32);
        this.tweens.add({ targets: this.lightningOverlay, alpha: 0, duration: 240 });
      }
    } else {
      this.lightningOverlay.setAlpha(0);
    }

    // Streetlamp additive pools & wet-asphalt specular shimmer
    const lampStrength = profile.isNight
      ? 0.95
      : profile.streetlampsOn || profile.isDuskOrDawn || profile.isRain
        ? 0.72
        : 0.48;
    for (const lv of this.lampVisuals) {
      const shimmerPulse = 0.86 + Math.sin(t * 3.1 + lv.phase) * 0.14;
      lv.outer.setAlpha(0.34 * lampStrength);
      lv.core.setAlpha(0.62 * lampStrength);
      lv.shimmer.setAlpha(0.36 * lampStrength * wetness * shimmerPulse);
      lv.shimmer.setScale(0.84 + Math.sin(t * 2.4 + lv.phase) * 0.06, 0.92);
    }

    // Neon signs additive halos & wet-road color smears
    const neonBoost = profile.isNight ? 1.0 : 0.82;
    for (const nv of this.neonVisuals) {
      const flickerDip =
        nv.flicker && Math.sin(t * 17 + nv.phase) > 0.92 && Math.sin(t * 5.3 + nv.phase) > 0.3
          ? 0.45
          : 1.0;
      const pulse = (0.88 + Math.sin(t * 2.6 + nv.phase) * 0.12) * flickerDip;
      nv.halo.setAlpha(0.46 * neonBoost * pulse);
      nv.shimmer.setAlpha(0.42 * neonBoost * wetness * pulse);
    }

    // Player car mirrored wet-road reflection, additive headlight cone & brake/taillight glow
    const showHeadlights = profile.headlightsOn || profile.isNight || profile.isDuskOrDawn || wetness >= 0.6;
    const beamAlpha = profile.isNight ? 0.78 : profile.isDuskOrDawn || profile.isRain ? 0.62 : 0.46;
    const pFx = Math.sin(this.player.rotation);
    const pFy = -Math.cos(this.player.rotation);

    if (this.playerReflection) {
      this.playerReflection.setPosition(this.player.x + 5, this.player.y + 10);
      this.playerReflection.setRotation(this.player.rotation);
      this.playerReflection.setAlpha(0.24 * wetness);
    }
    if (this.playerHeadlight) {
      this.playerHeadlight.setPosition(this.player.x + pFx * 20, this.player.y + pFy * 20);
      this.playerHeadlight.setRotation(this.player.rotation);
      this.playerHeadlight.setAlpha(showHeadlights ? beamAlpha : 0);
    }
    this.roadWet = profile.isRain || profile.isStorm || profile.isSnow;

    if (this.playerTaillight) {
      const coasting =
        !this.wasd?.W?.isDown &&
        !this.cursors?.up?.isDown &&
        !this.bridge.touch.up &&
        !this.wasd?.S?.isDown &&
        !this.cursors?.down?.isDown &&
        !this.bridge.touch.down &&
        !this.wasd?.SPACE?.isDown &&
        !this.bridge.touch.brake &&
        Math.abs(this.carSpeed) > 30;
      const braking = this.wasd?.SPACE?.isDown || this.bridge.touch.brake || this.carSpeed < -5 || coasting;
      this.playerTaillight.setPosition(this.player.x - pFx * 22, this.player.y - pFy * 22);
      this.playerTaillight.setScale(braking ? 0.68 : 0.48);
      this.playerTaillight.setAlpha(braking ? 0.75 : 0.42);
    }

    // NPC mirrored wet-road reflections, additive headlights, taillights & police siren lightbar
    const sirenRed = Math.floor(t * 7.5) % 2 === 0;
    for (const nv of this.npcVisuals) {
      const sp = nv.agent.sprite;
      const fx = Math.sin(sp.rotation);
      const fy = -Math.cos(sp.rotation);
      nv.reflection.setPosition(sp.x + 4, sp.y + 8);
      nv.reflection.setRotation(sp.rotation);
      nv.reflection.setAlpha(0.2 * wetness);

      if (nv.headlight) {
        nv.headlight.setPosition(sp.x + fx * 19, sp.y + fy * 19);
        nv.headlight.setRotation(sp.rotation);
        nv.headlight.setAlpha(showHeadlights ? beamAlpha * 0.72 : 0);
      }
      if (nv.taillight) {
        const stopped = nv.agent.currentSpeed < 5;
        nv.taillight.setPosition(sp.x - fx * 20, sp.y - fy * 20);
        nv.taillight.setScale(stopped ? 0.52 : 0.36);
        nv.taillight.setAlpha(stopped ? 0.65 : 0.34);
      }
      if (nv.sirenGlow) {
        nv.sirenGlow.setPosition(sp.x, sp.y);
        nv.sirenGlow.setTint(sirenRed ? 0xef4444 : 0x38bdf8);
        nv.sirenGlow.setAlpha(0.62);
      }
    }

    // Wrap rain, drizzle and snow inside the camera view to preserve density.
    const camView = this.cameras.main.worldView;
    const minX = camView.x - 40;
    const maxX = camView.right + 40;
    const minY = camView.y - 40;
    const maxY = camView.bottom + 40;
    const spanW = Math.max(200, maxX - minX);
    const spanH = Math.max(200, maxY - minY);

    const isHeavyRain = profile.isRain || profile.isStorm;
    const isLightDrizzle = !isHeavyRain && !profile.isSnow && !profile.isFog;

    for (let i = 0; i < this.weatherParticles.length; i++) {
      const p = this.weatherParticles[i];
      if (isHeavyRain || isLightDrizzle) {
        const active = isHeavyRain || i % 2 === 0;
        if (!active) {
          p.setAlpha(0);
          continue;
        }
        if (p.texture.key !== 'rain_streak') p.setTexture('rain_streak');
        p.setAlpha(isHeavyRain ? (profile.isStorm ? 0.85 : 0.72) : 0.38);
        p.setTint(0xbae6fd);
        p.setScale(isHeavyRain ? 1.05 : 0.85, isHeavyRain ? 1.15 : 0.85);
        p.y += (isHeavyRain ? 560 : 410) * dt;
        p.x -= (isHeavyRain ? 120 : 82) * dt;
      } else if (profile.isSnow) {
        if (p.texture.key !== 'rain_drop') p.setTexture('rain_drop');
        p.setAlpha(0.8);
        p.setTint(0xffffff);
        p.setScale(1.8, 0.45);
        p.y += 140 * dt;
        p.x += Math.sin(t * 2 + p.y * 0.03) * 35 * dt;
      } else {
        p.setAlpha(0);
        continue;
      }

      if (p.y > maxY || p.y < minY - 60) {
        p.y = minY + Phaser.Math.FloatBetween(0, 24);
        p.x = minX + Phaser.Math.FloatBetween(0, spanW);
      }
      if (p.x < minX) p.x += spanW;
      if (p.x > maxX) p.x -= spanW;
    }

    // Wet-asphalt rain splash ripples
    for (let i = 0; i < this.rainSplashes.length; i++) {
      const sp = this.rainSplashes[i];
      if (!isHeavyRain && !isLightDrizzle) {
        sp.sprite.setAlpha(0);
        continue;
      }
      if (isLightDrizzle && i % 2 === 1) {
        sp.sprite.setAlpha(0);
        continue;
      }
      sp.age += dt;
      if (sp.age >= sp.maxAge) {
        sp.age = 0;
        sp.maxAge = Phaser.Math.FloatBetween(0.24, 0.46);
        sp.sprite.setPosition(
          minX + Phaser.Math.FloatBetween(20, Math.max(40, spanW - 20)),
          minY + Phaser.Math.FloatBetween(20, Math.max(40, spanH - 20))
        );
      }
      const prog = sp.age / sp.maxAge;
      sp.sprite.setScale(0.45 + prog * 0.95);
      sp.sprite.setAlpha((1 - prog) * (isHeavyRain ? 0.42 : 0.24));
    }
  }

  update(_time: number, delta: number): void {
    const dt = Math.min(0.05, delta / 1000);
    if (this.bridge.paused || this.completed) {
      this.updateTurnSignal(0, 0);
      return;
    }
    if (dt <= 0) return;
    this.updateCollisionRecovery(dt);
    this.bumpFeedbackSec = Math.max(0, this.bumpFeedbackSec - dt);
    this.violationCooldownSec = Math.max(0, this.violationCooldownSec - dt);

    // Update paired perpendicular traffic light phases
    this.trafficTimer += dt;
    const cycle = this.trafficTimer % 14;
    let ew: 'green' | 'amber' | 'red' = 'green';
    let ns: 'green' | 'amber' | 'red' = 'red';
    if (cycle < 5.5) {
      ew = 'green';
      ns = 'red';
    } else if (cycle < 7.0) {
      ew = 'amber';
      ns = 'red';
    } else if (cycle < 12.5) {
      ew = 'red';
      ns = 'green';
    } else {
      ew = 'red';
      ns = 'amber';
    }

    this.intersections.forEach((inter, i) => {
      inter.ewPhase = i === 0 ? ew : ns;
      inter.nsPhase = i === 0 ? ns : ew;
    });

    this.signalVisuals.forEach(sv => {
      const inter = this.intersections.find(x => x.id === sv.interId);
      if (!inter) return;
      const phase = sv.axis === 'ew' ? inter.ewPhase : inter.nsPhase;
      const col = SIGNAL_COLOR[phase];
      sv.sprite.setTexture(`tlight_${phase}`);
      sv.halo?.setTint(col);
      sv.shimmer?.setTint(col);
    });

    const run = this.bridge.runState;
    const profile = computeCityLightingProfile(
      this.bridge.level.departureTimeHour, run?.elapsedMinutes ?? 0, this.preset,
      run?.activeWeather ?? 'clear', run?.isNight
    );
    if (!this.updateCoastalLight) this.updateLightingVisuals(dt, profile);

    // Keyboard and shared touch controls
    ensureTouchHoldsMatchPointers();
    const touch = this.bridge.touch;
    const autoDrive = this.previewDriveSec > 0;
    if (autoDrive) this.previewDriveSec -= dt;
    const up = this.cursors.up.isDown || this.wasd.W.isDown || touch.up || autoDrive;
    const down = this.cursors.down.isDown || this.wasd.S.isDown || touch.down;
    const left = this.cursors.left.isDown || this.wasd.A.isDown || touch.left;
    const right = this.cursors.right.isDown || this.wasd.D.isDown || touch.right;
    const brake = this.wasd.SPACE.isDown || touch.brake;

    if (Phaser.Input.Keyboard.JustDown(this.wasd.H) || touch.hornPressed) {
      touch.hornPressed = false;
      SoundFX.horn();
    }

    const road = this.place.passRoad;
    const onIce = road ? passOnIce(road, this.player) : false;
    const grip = road ? passGrip(onIce, !!this.bridge.runState?.alpinePass?.chainsFitted) : 1;
    const passSituation = this.passTraffic?.situation(this.player);
    const maxFwd = this.place.slowZone?.(this.player) ? 125 : 230;
    const maxRev = -115;
    if (!brake && up) {
      this.carSpeed = this.carSpeed > maxFwd
        ? Math.max(maxFwd, this.carSpeed - 640 * grip * dt)
        : Math.min(maxFwd, this.carSpeed + 320 * grip * dt);
    } else if (!brake && down) {
      this.carSpeed = Math.max(maxRev, this.carSpeed - 280 * grip * dt);
    } else {
      const decel = (brake ? 1050 : 640) * grip * dt;
      this.carSpeed = this.carSpeed > 0 ? Math.max(0, this.carSpeed - decel) : Math.min(0, this.carSpeed + decel);
    }
    if (Math.abs(this.carSpeed) < CITY_STOP_SPEED_PX_PER_SEC && (brake || (!up && !down))) this.carSpeed = 0;

    if (passSituation && run) {
      const { cap, unsafe } = passSituation;
      if (this.collisionGraceSec <= 0 && up && !brake && this.carSpeed > cap) {
        this.carSpeed = cap;
        run.elapsedMinutes += dt * PASS_FOLLOW_MIN_PER_SECOND * Math.max(0, 1 - cap / 155);
      }
      if (unsafe && !this.passUnsafeLane && this.carSpeed > 0) {
        applyStress(run, PASS_NEAR_MISS_STRESS);
        this.bridge.onCityStressChanged(run);
      }
      this.passUnsafeLane = unsafe;
    }

    const absSpeed = Math.abs(this.carSpeed);
    const steerFactor = absSpeed < CITY_STOP_SPEED_PX_PER_SEC ? 0 : Math.min(1, absSpeed / 62);
    const dirSign = this.carSpeed >= -1 ? 1 : -1;
    const steering: TurnSignal = left === right ? 0 : left ? -1 : 1;
    const turn = 2.75 * steerFactor * grip * dirSign * steering;
    // Begrenzte Teilschritte prüfen auch die gedrehte Karosserie an schmalen Hindernissen.
    const substeps = Math.ceil(dt * 60);
    const step = dt / substeps;
    let playerCanMove = true;
    for (let i = 0; i < substeps; i++) {
      if (playerCanMove) playerCanMove = this.movePlayer(step, turn, grip);
      if (this.bridge.paused) {
        this.updateTurnSignal(0, 0);
        return;
      }
      this.stepTraffic(step);
      this.passTraffic?.step(step);
      if (this.bridge.paused) {
        this.updateTurnSignal(0, 0);
        return;
      }
    }

    for (const spin of this.spinners) spin.rotation += dt * 1.7;
    this.surface.update(this, {
      x: this.player.x,
      y: this.player.y,
      rotation: this.player.rotation,
      speed: this.carSpeed,
      onGrass: !this.place.roadSurface?.(this.player) && isGrassSurface(this.player.x, this.player.y, this.place.grass, this.place.asphalt, this.place.buildings),
      wetRoad: this.roadWet,
      snowyRoad: (!!road && !onIce) || (!!this.place.cityGuide?.snow && profile.isSnow),
      dt
    });

    // Check player traffic rule violations (Red lights & Zebra Crossings)
    const violation = detectPlayerTrafficViolation(
      this.player.x,
      this.player.y,
      this.carSpeed,
      this.player.rotation,
      this.intersections,
      this.zebras,
      this.pedestrians,
      this.wasInInter,
      this.wasInZebra
    );
    if (violation) {
      this.triggerPoliceStop(violation);
      this.updateTurnSignal(0, 0);
      return;
    }

    // Positionsdaten für die Verkehrs-Vorschau.
    if (new URLSearchParams(window.location.search).has('erpreview')) {
      const debugWindow = window as Window & {
        __erNpc?: () => Array<{ x: number; y: number; vx: number; vy: number }>;
      };
      debugWindow.__erNpc = () =>
        this.trafficCars.map(car => ({
          x: car.sprite.x,
          y: car.sprite.y,
          vx: car.vx,
          vy: car.vy
        }));
      const placeWindow = window as Window & { __erPlacePlayer?: (x: number, y: number) => void };
      placeWindow.__erPlacePlayer = (x, y) => this.player.setPosition(x, y);
    }
    // Move Pedestrians along sidewalks; occasionally cross a zebra crossing if road is clear
    for (const pd of this.pedestrians) {
      const link = pd.zebraLink;
      if (link && link.crossCooldownSec > 0) {
        link.crossCooldownSec = Math.max(0, link.crossCooldownSec - dt);
      }

      if (pd.isCrossing && pd.crossTarget) {
        const dist = Phaser.Math.Distance.Between(
          pd.sprite.x,
          pd.sprite.y,
          pd.crossTarget.x,
          pd.crossTarget.y
        );
        if (dist < 7) {
          pd.isCrossing = false;
          pd.crossTarget = undefined;
          if (link) {
            link.onSideA = !link.onSideA;
            const nextPath = link.onSideA ? link.sidewalkPathA : link.sidewalkPathB;
            pd.waypoints = nextPath;
            // Pick the sidewalk waypoint furthest from the crosswalk so the pedestrian walks away
            let bestIdx = 0;
            let bestDist = -1;
            nextPath.forEach((wp, idx) => {
              const d = Phaser.Math.Distance.Between(pd.sprite.x, pd.sprite.y, wp.x, wp.y);
              if (d > bestDist) {
                bestDist = d;
                bestIdx = idx;
              }
            });
            pd.wpIndex = bestIdx;
            link.crossCooldownSec = Phaser.Math.FloatBetween(11, 18);
          }
        } else {
          const ang = Phaser.Math.Angle.Between(
            pd.sprite.x,
            pd.sprite.y,
            pd.crossTarget.x,
            pd.crossTarget.y
          );
          const crossSpd = pd.speed * 1.15;
          pd.sprite.setVelocity(Math.cos(ang) * crossSpd, Math.sin(ang) * crossSpd);
          continue;
        }
      }

      if (link && link.crossCooldownSec <= 0) {
        const entryPt = link.onSideA ? link.sideA : link.sideB;
        const distToEntry = Phaser.Math.Distance.Between(pd.sprite.x, pd.sprite.y, entryPt.x, entryPt.y);
        if (distToEntry < 14) {
          const zb = this.zebras.find(z => z.id === link.zebraId);
          const zebraBlockedByVehicle =
            !!zb &&
            (Phaser.Geom.Rectangle.Contains(zb.box, this.player.x, this.player.y) ||
              this.trafficCars.some(tc => Phaser.Geom.Rectangle.Contains(zb.box, tc.sprite.x, tc.sprite.y)));

          if (!zebraBlockedByVehicle && Math.random() < 0.42) {
            pd.isCrossing = true;
            pd.crossTarget = link.onSideA ? link.sideB : link.sideA;
            const ang = Phaser.Math.Angle.Between(
              pd.sprite.x,
              pd.sprite.y,
              pd.crossTarget.x,
              pd.crossTarget.y
            );
            const crossSpd = pd.speed * 1.15;
            pd.sprite.setVelocity(Math.cos(ang) * crossSpd, Math.sin(ang) * crossSpd);
            continue;
          } else {
            link.crossCooldownSec = 4.5;
          }
        }
      }

      const dest = pd.waypoints[pd.wpIndex];
      const dist = Phaser.Math.Distance.Between(pd.sprite.x, pd.sprite.y, dest.x, dest.y);
      if (dist < 8) {
        pd.wpIndex = (pd.wpIndex + 1) % pd.waypoints.length;
      }
      const nextDest = pd.waypoints[pd.wpIndex];
      const ang = Phaser.Math.Angle.Between(pd.sprite.x, pd.sprite.y, nextDest.x, nextDest.y);
      pd.sprite.setVelocity(Math.cos(ang) * pd.speed, Math.sin(ang) * pd.speed);
    }

    this.updateCoastalLight?.(this.trafficTimer);
    this.updateNavigationAndArrival(dt, onIce);
    const stopped = Math.abs(this.carSpeed) < CITY_STOP_SPEED_PX_PER_SEC;
    this.updateTurnSignal(stopped && !this.completed && !this.bridge.paused && !this.previewFx ? steering : 0, dt);
  }

  private updateNavigationAndArrival(dt: number, onIce: boolean): void {
    const road = this.place.passRoad;
    const chargingBay = this.preset === 'charger_park';
    const { parked, nearest } = chargingBay ? this.updateChargingBays() : {};
    const targetBay = (parked ?? nearest)?.bounds;
    const targetX = targetBay ? targetBay.x + targetBay.w / 2 : this.targetZone.centerX;
    const targetY = targetBay ? targetBay.y + targetBay.h / 2 : this.targetZone.centerY;
    this.moveMinimap?.(this.player, this.scale.width, this.scale.height);
    const passNav = road && passNavigation(road, this.player);
    const cityGuide = this.place.cityGuide;
    const approach = cityGuide?.approach;
    if (approach && Phaser.Math.Distance.Between(this.player.x, this.player.y, approach.goal.x, approach.goal.y) < 54) {
      this.cityApproachReached = true;
    }
    const cityNav = cityGuide && (
      approach && !this.cityApproachReached ? approach.navigate(this.player) : cityGuide.navigate(this.player)
    );
    const aim = passNav ? passNav.aim : cityNav ? cityNav.aim : { x: targetX, y: targetY };
    const angleToTarget = Phaser.Math.Angle.Between(
      this.player.x, this.player.y, aim.x, aim.y
    );
    const distToTarget = Phaser.Math.Distance.Between(this.player.x, this.player.y, targetX, targetY);
    this.navArrow.setPosition(this.scale.width / 2, 62);
    this.navArrow.setRotation(angleToTarget + Math.PI / 2);
    this.distText.setPosition(this.scale.width / 2, 84);
    this.reverseHintText.setPosition(this.scale.width / 2, 108);

    // Parking / Completion Check
    const inZone = Phaser.Geom.Rectangle.Contains(this.targetZone, this.player.x, this.player.y);
    const arrivalBay = this.place.arrivalBay;
    const { x, y, rotation } = this.player;
    const parkingReady = arrivalBay
      ? isRearParked(arrivalBay, { x, y, rotation, speed: this.carSpeed, footprint: rotatedCarBounds(x, y, rotation) })
      : !chargingBay && inZone && Math.abs(this.carSpeed) < 30;

    if (nearest && distToTarget < 190 && !parked) {
      this.reverseHintText.setText('In einer grünen Bucht mit dem Heck zur Säule halten');
      this.reverseHintText.setVisible(true);
    } else if (arrivalBay && distToTarget < 190 && !parkingReady) {
      this.reverseHintText.setText('In der grünen Bucht mit dem Heck zur Säule halten');
      this.reverseHintText.setVisible(true);
    } else {
      this.reverseHintText.setVisible(false);
    }

    if (this.passThrough) {
      const descending = road?.summitPx !== undefined && passNav && passNav.along >= road.summitPx;
      const rampLabel = cityGuide?.label ?? (descending ? 'Zum Passausgang' : 'Zur Passhöhe');
      const doneLabel = cityGuide?.completionLabel ?? `${this.place.zoneLabel} erreicht`;
      if (inZone) {
        this.completed = true;
        this.reverseHintText.setVisible(false);
        this.distText.setText(doneLabel);
        this.bridge.onCitySegmentComplete(this.preset, this.cleanRun);
      } else {
        const remaining = passNav?.distance ?? cityNav?.distance ?? distToTarget;
        this.distText.setText(`${rampLabel} · ${Math.max(0, Math.round(remaining / 6))} m`);
        const hint = this.passTraffic?.situation(this.player).hint;
        if (onIce || hint) this.reverseHintText.setText([onIce ? 'Glatteis' : '', hint].filter(Boolean).join(' · '))
          .setVisible(true);
      }
    } else if (parked) {
      this.completed = true;
      this.carSpeed = 0;
      this.playDriverPlugInSequence(parked.pillar);
    } else if (parkingReady) {
      this.dwellInTargetSec += dt;
      const holdPct = Math.min(100, Math.round(this.dwellInTargetSec / CITY_PARKING_DWELL_SEC * 100));
      this.distText.setText(`✓ Perfekt! Halten… (${holdPct}%)`);
      if (this.dwellInTargetSec >= CITY_PARKING_DWELL_SEC) {
        this.completed = true;
        this.reverseHintText.setVisible(false);
        if (this.preset === 'aachen_finish') {
          this.triggerArrivalConfetti();
        } else {
          this.bridge.onCitySegmentComplete(this.preset, this.cleanRun);
        }
      }
    } else {
      this.dwellInTargetSec = 0;
      const goalHint = chargingBay ? 'Zu einer freien Ladebucht'
        : approach && !this.cityApproachReached ? approach.label
          : cityGuide?.label ?? 'Ins Ziel einparken';
      this.distText.setText(chargingBay && !nearest
        ? 'Alle Ladebuchten belegt'
        : `${goalHint} · ${Math.max(0, Math.round((cityNav?.distance ?? distToTarget) / 6))} m`);
    }

    if (!this.completed && cityGuide?.wrongExits.some(exit => pointInCityRect(this.player, exit.zone))) {
      this.reverseHintText.setText(cityGuide.wrongExitHint ?? 'Falsche Auffahrt · bitte wenden').setVisible(true);
    }
  }

  private playDriverPlugInSequence({ x: pillarX, y: pillarY }: PaintedChargingBay['pillar']): void {
    const carX = this.player.x;
    const carY = this.player.y;
    const rear = CAR_FOOTPRINT.h / 2;
    const portX = carX - Math.sin(this.player.rotation) * rear;
    const portY = carY + Math.cos(this.player.rotation) * rear;

    this.distText.setText('🚶 Fahrer steigt aus & steckt Ladekabel an…');
    const driver = this.add.image(carX - 18, carY, 'ped_driver').setDepth(18);

    const statusTag = this.add
      .text(carX, carY + 38, '🔌 Kabel wird angeschlossen…', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '10.5px',
        fontStyle: 'bold',
        color: '#f8fafc',
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: { x: 7, y: 3 }
      })
      .setOrigin(0.5)
      .setDepth(22);

    // Step 1: Driver walks to charging pillar
    this.tweens.add({
      targets: driver,
      x: pillarX - 10,
      y: pillarY + 6,
      duration: 550,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        if (!this.scene.isActive()) return;
        // Step 2: Driver carries cable back to car's rear port
        this.tweens.add({
          targets: driver,
          x: portX - 8,
          y: portY - 4,
          duration: 600,
          ease: 'Sine.easeInOut',
          onUpdate: () => {
            if (!this.cableGfx || !this.cableGfx.scene) return;
            this.cableGfx.clear();
            this.cableGfx.lineStyle(3.5, 0x22c55e, 0.95);
            this.cableGfx.lineBetween(pillarX, pillarY, driver.x, driver.y);
          },
          onComplete: () => {
            if (!this.scene.isActive()) return;
            this.cableGfx.clear();
            this.cableGfx.lineStyle(4, 0x22c55e, 1);
            this.cableGfx.lineBetween(pillarX, pillarY, portX, portY);
            SoundFX.plugIn();
            statusTag.setText('⚡ Verbunden! Ladekurve startet…');
            statusTag.setBackgroundColor('rgba(21, 128, 61, 0.95)');

            const t = this.time.delayedCall(550, () => {
              driver.destroy();
              statusTag.destroy();
              this.bridge.onCitySegmentComplete(this.preset, this.cleanRun);
            });
            this.activeTimers.push(t);
          }
        });
      }
    });
  }

  private triggerArrivalConfetti(): void {
    SoundFX.win();
    const colors = [0x38bdf8, 0x22c55e, 0xfacc15, 0xf43f5e, 0xa855f7];
    for (let i = 0; i < 65; i++) {
      const p = this.add
        .image(this.player.x, this.player.y - 10, 'confetti_px')
        .setTint(colors[i % colors.length])
        .setDepth(25);
      const ang = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const spd = Phaser.Math.FloatBetween(40, 170);
      this.tweens.add({
        targets: p,
        x: p.x + Math.cos(ang) * spd,
        y: p.y + Math.sin(ang) * spd,
        alpha: 0,
        angle: Phaser.Math.Between(-240, 240),
        duration: Phaser.Math.Between(900, 1450),
        ease: 'Cubic.easeOut'
      });
    }

    const cheer = this.add
      .text(this.player.x, this.player.y - 44, '🎉 Sauber eingeparkt! „Super Fahrt!“', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '12px',
        fontStyle: 'bold',
        color: '#0f172a',
        backgroundColor: '#facc15',
        padding: { x: 8, y: 4 }
      })
      .setOrigin(0.5)
      .setDepth(26);

    const t = this.time.delayedCall(1400, () => {
      if (cheer.scene) cheer.destroy();
      // Defer completion one tick so Phaser finishes Time.Clock update before stopping this scene!
      window.setTimeout(() => {
        this.bridge.onCitySegmentComplete(this.preset, this.cleanRun);
      }, 0);
    });
    this.activeTimers.push(t);
  }
}
