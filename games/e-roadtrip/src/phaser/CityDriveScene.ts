import * as Phaser from 'phaser';
import { ChargerStation, CityDrivePreset, PoliceViolationKind } from '../types';
import { getChargerById } from '../data/europeMap';
import { ERoadtripBridge } from './GameBridge';
import {
  CityLightingProfile,
  PedestrianAgent,
  SignalIntersection,
  TrafficCarAgent,
  ZebraCrosswalk,
  computeCityLightingProfile,
  detectPlayerTrafficViolation,
  evaluateCollisionFault,
  shouldNpcYield
} from './CityTraffic';
import { SoundFX } from './SoundFX';

export class CityDriveScene extends Phaser.Scene {
  private bridge!: ERoadtripBridge;
  private preset: CityDrivePreset = 'aachen_start';
  private station?: ChargerStation;

  private player!: Phaser.Physics.Arcade.Image;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<'W' | 'A' | 'S' | 'D' | 'SPACE' | 'H', Phaser.Input.Keyboard.Key>;

  private worldW = 2040;
  private worldH = 1480;
  private carSpeed = 0;

  private trafficTimer = 0;
  private intersections: SignalIntersection[] = [];
  private signalVisuals: Array<{
    interId: string;
    axis: 'ew' | 'ns';
    sprite: Phaser.GameObjects.Image;
    halo: Phaser.GameObjects.Arc;
  }> = [];
  private zebras: ZebraCrosswalk[] = [];
  private wasInInter = new Set<string>();
  private wasInZebra = new Set<string>();

  private trafficCars: TrafficCarAgent[] = [];
  private pedestrians: PedestrianAgent[] = [];
  private obstacles!: Phaser.Physics.Arcade.StaticGroup;

  private targetZone!: Phaser.Geom.Rectangle;
  private targetGlow?: Phaser.GameObjects.Rectangle;
  private targetLabel?: Phaser.GameObjects.Text;
  private reverseHintText!: Phaser.GameObjects.Text;
  private navArrow!: Phaser.GameObjects.Triangle;
  private distText!: Phaser.GameObjects.Text;

  private headlightGfx!: Phaser.GameObjects.Graphics;
  private lampLightGfx!: Phaser.GameObjects.Graphics;
  private cableGfx!: Phaser.GameObjects.Graphics;
  private nightOverlay!: Phaser.GameObjects.Rectangle;
  private fogOverlay!: Phaser.GameObjects.Rectangle;
  private lightningOverlay!: Phaser.GameObjects.Rectangle;
  private weatherParticles: Phaser.GameObjects.Image[] = [];
  private streetlamps: Array<{ x: number; y: number }> = [];

  private dwellInTargetSec = 0;
  private collisionCooldownSec = 0;
  private violationCooldownSec = 0;
  private stormFlashTimer = 4;
  private completed = false;
  private cleanRun = true;

  private resizeHandler?: (size: Phaser.Structs.Size) => void;
  private activeTimers: Phaser.Time.TimerEvent[] = [];

  constructor() {
    super({ key: 'CityDriveScene' });
  }

  init(data: { bridge: ERoadtripBridge; preset: CityDrivePreset; chargerId?: string }): void {
    this.bridge = data.bridge;
    this.preset = data.preset;
    this.station = data.chargerId ? getChargerById(data.chargerId) : undefined;
    this.carSpeed = 0;
    this.dwellInTargetSec = 0;
    this.collisionCooldownSec = 0;
    this.violationCooldownSec = 1.2;
    this.completed = false;
    this.cleanRun = true;
    this.trafficCars = [];
    this.pedestrians = [];
    this.signalVisuals = [];
    this.intersections = [];
    this.zebras = [];
    this.streetlamps = [];
    this.weatherParticles = [];
    this.wasInInter.clear();
    this.wasInZebra.clear();
    this.activeTimers = [];
  }

  create(): void {
    this.physics.world.setBounds(0, 0, this.worldW, this.worldH);
    this.cameras.main.setBounds(0, 0, this.worldW, this.worldH);

    this.drawCityWorld();
    this.spawnEnvironmentAndProps();
    this.spawnTrafficAndPedestrians();
    this.spawnPlayer();
    this.setupLightingAndWeather();
    this.setupNavIndicator();

    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
    this.cameras.main.setZoom(this.scale.width < 640 ? 0.86 : 1.05);

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
      if (!this.scene.isActive() || !this.cameras?.main) return;
      this.cameras.main.setZoom(size.width < 640 ? 0.86 : 1.05);
      if (this.nightOverlay && this.nightOverlay.scene) {
        this.nightOverlay.setSize(this.worldW, this.worldH);
      }
    };
    this.scale.on('resize', this.resizeHandler);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      if (this.resizeHandler) {
        this.scale.off('resize', this.resizeHandler);
        this.resizeHandler = undefined;
      }
      this.activeTimers.forEach(t => t.remove(false));
      this.activeTimers = [];
      this.tweens.killAll();
    });
  }

  private drawCityWorld(): void {
    const g = this.add.graphics();

    // Base urban grass
    g.fillStyle(0x1e472d, 1);
    g.fillRect(0, 0, this.worldW, this.worldH);

    // City block paved sidewalk apron
    g.fillStyle(0x64748b, 1);
    g.fillRect(60, 60, this.worldW - 120, this.worldH - 120);

    // Park / courtyard green zones
    g.fillStyle(0x255939, 1);
    g.fillRect(305, 305, 625, 325); // NW block
    g.fillRect(305, 825, 625, 325); // SW block
    g.fillRect(1130, 305, 600, 325); // NE block
    g.fillRect(1130, 825, 600, 325); // SE block

    // Main GTA-2 style Avenues (140px wide)
    g.fillStyle(0x1e293b, 1);
    g.fillRect(140, 140, 1760, 140); // Top Ave (y=140..280)
    g.fillRect(140, 660, 1760, 140); // Mid Ave (y=660..800)
    g.fillRect(140, 1180, 1760, 140); // Bottom Ave (y=1180..1320)
    g.fillRect(140, 140, 140, 1180); // West St (x=140..280)
    g.fillRect(960, 140, 140, 1180); // Center Blvd (x=960..1100)
    g.fillRect(1760, 140, 140, 1180); // East Ring (x=1760..1900)

    // Driveway openings into blocks (Messe, Finish, Charging Park)
    g.fillRect(1300, 795, 160, 90); // Entry to SE Charging Park from Mid Ave
    g.fillRect(1440, 555, 160, 115); // Entry to NE Hannover Messe park from Mid Ave
    g.fillRect(320, 800, 130, 140); // Entry to SW Aachen Finish park from Mid Ave

    // Real A4 motorway on-ramp extending east from Top Ave (passable at full speed)
    g.fillStyle(0x1e293b, 1);
    g.fillRect(1860, 158, 180, 108);
    // Hard shoulder strips & steel guardrails along the ramp edges
    g.fillStyle(0x334155, 1);
    g.fillRect(1900, 158, 140, 7);
    g.fillRect(1900, 259, 140, 7);
    g.fillStyle(0x94a3b8, 1);
    g.fillRect(1900, 153, 140, 4);
    g.fillRect(1900, 267, 140, 4);
    g.fillStyle(0xe2e8f0, 0.95);
    for (let rx = 1910; rx <= 2030; rx += 20) {
      g.fillRect(rx, 152, 4, 6);
      g.fillRect(rx, 266, 4, 6);
    }
    // Solid white ramp edge lines & dashed acceleration lane divider
    g.fillStyle(0xf8fafc, 0.9);
    g.fillRect(1896, 166, 144, 2.5);
    g.fillRect(1896, 256, 144, 2.5);
    for (let rx = 1906; rx < 2032; rx += 26) {
      g.fillRect(rx, 210, 14, 2.5);
    }
    // Painted road chevrons/arrows pointing onto the A4
    [1868, 1932, 1994].forEach(ax => {
      g.fillStyle(0xf8fafc, 0.82);
      g.fillRect(ax - 12, 231, 14, 4);
      g.fillTriangle(ax + 10, 233, ax + 1, 226, ax + 1, 240);
      g.fillRect(ax - 12, 187, 14, 4);
      g.fillTriangle(ax + 10, 189, ax + 1, 182, ax + 1, 196);
    });
    // Roadside blue German Autobahn gantry sign north of the ramp (off-road)
    g.fillStyle(0x1d4ed8, 1);
    g.fillRect(1904, 114, 124, 30);
    g.lineStyle(2, 0xf8fafc, 0.95);
    g.strokeRect(1906, 116, 120, 26);
    this.add
      .text(1966, 129, 'A4 AUTOBAHN →', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '10.5px',
        fontStyle: 'bold',
        color: '#ffffff'
      })
      .setOrigin(0.5)
      .setDepth(5);

    // Dedicated terracotta bike lanes
    g.fillStyle(0x7c2d12, 0.72);
    g.fillRect(140, 142, 1760, 16);
    g.fillRect(140, 1302, 1760, 16);

    // Roundabout at (1030, 1250)
    g.fillStyle(0x1e293b, 1);
    g.fillCircle(1030, 1250, 115);
    g.fillStyle(0x22543d, 1);
    g.fillCircle(1030, 1250, 46);
    g.lineStyle(3, 0xf8fafc, 0.85);
    g.strokeCircle(1030, 1250, 48);

    // Dashed road centerlines
    g.fillStyle(0xf8fafc, 0.72);
    for (let x = 180; x < 1880; x += 38) {
      if (Math.abs(x - 1030) > 85) {
        g.fillRect(x, 208, 20, 3);
        g.fillRect(x, 728, 20, 3);
      }
      if (Math.abs(x - 1030) > 120) {
        g.fillRect(x, 1248, 20, 3);
      }
    }
    for (let y = 180; y < 1280; y += 38) {
      if (Math.abs(y - 210) > 85 && Math.abs(y - 730) > 85) {
        g.fillRect(208, y, 3, 20);
        if (Math.abs(y - 1250) > 120) g.fillRect(1028, y, 3, 20);
        g.fillRect(1828, y, 3, 20);
      }
    }

    // White Stop Lines (Haltelinien) at both signalized intersections
    g.fillStyle(0xf8fafc, 0.92);
    // Intersection 1 (1030, 210)
    g.fillRect(948, 212, 6, 66); // EW eastbound stop
    g.fillRect(1106, 142, 6, 66); // EW westbound stop
    g.fillRect(962, 286, 66, 6); // NS northbound stop
    g.fillRect(1032, 128, 66, 6); // NS southbound stop
    // Intersection 2 (1030, 730)
    g.fillRect(948, 732, 6, 66);
    g.fillRect(1106, 662, 6, 66);
    g.fillRect(962, 806, 66, 6);
    g.fillRect(1032, 648, 66, 6);

    // Zebra Crossings (Zebrastreifen)
    this.zebras = [
      { id: 'zebra_1', box: new Phaser.Geom.Rectangle(874, 144, 48, 132), axis: 'ew' },
      { id: 'zebra_2', box: new Phaser.Geom.Rectangle(144, 1084, 132, 48), axis: 'ns' },
      { id: 'zebra_3', box: new Phaser.Geom.Rectangle(1134, 664, 48, 132), axis: 'ew' }
    ];
    g.fillStyle(0xf8fafc, 0.88);
    // Zebra 1 vertical stripes across Top Ave
    for (let i = 0; i < 6; i++) g.fillRect(880, 152 + i * 21, 34, 10);
    // Zebra 2 horizontal stripes across West St
    for (let i = 0; i < 6; i++) g.fillRect(152 + i * 21, 1090, 10, 34);
    // Zebra 3 vertical stripes across Mid Ave
    for (let i = 0; i < 6; i++) g.fillRect(1140, 672 + i * 21, 34, 10);

    // Construction zone strip on West St (minor roadwork)
    g.fillStyle(0x9a3412, 0.55);
    g.fillRect(148, 520, 52, 95);

    // Buildings (detailed GTA-2 rooftops with AC vents & shadows)
    const drawBuilding = (x: number, y: number, w: number, h: number, roof: number, trim: number) => {
      g.fillStyle(0x020617, 0.48);
      g.fillRect(x + 10, y + 10, w, h);
      g.fillStyle(trim, 1);
      g.fillRect(x, y, w, h);
      g.fillStyle(roof, 1);
      g.fillRect(x + 8, y + 8, w - 16, h - 16);
      // Rooftop HVAC & skylight details
      g.fillStyle(0x1e293b, 0.65);
      g.fillRect(x + 18, y + 18, 28, 20);
      g.fillStyle(0x38bdf8, 0.35);
      g.fillRect(x + w - 54, y + 18, 34, 24);
    };
    drawBuilding(335, 330, 195, 130, 0x334155, 0x475569);
    drawBuilding(575, 330, 210, 125, 0x475569, 0x64748b);
    drawBuilding(335, 495, 220, 115, 0x1e3a8a, 0x3b82f6);
    drawBuilding(665, 865, 215, 145, 0x3f3f46, 0x71717a);
    drawBuilding(1165, 330, 145, 145, 0x334155, 0x64748b);

    // Park fountain in NW courtyard
    this.add.image(720, 540, 'park_fountain').setScale(1.4).setDepth(3);

    // Landmarks & Preset Zones
    this.add.image(490, 1020, 'landmark_aachen_dom').setScale(2.3).setDepth(3);
    this.add
      .text(490, 1072, 'Aachener Dom', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#f8fafc',
        backgroundColor: 'rgba(15,23,42,0.82)',
        padding: { x: 5, y: 2 }
      })
      .setOrigin(0.5)
      .setDepth(4);

    this.add.image(1345, 425, 'landmark_hermesturm').setScale(2.3).setDepth(3);
    this.add
      .text(1345, 476, 'Hannover Messe', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#f8fafc',
        backgroundColor: 'rgba(15,23,42,0.82)',
        padding: { x: 5, y: 2 }
      })
      .setOrigin(0.5)
      .setDepth(4);

    // Large Charging Park Apron in SE Block (always visible as city detail, interactive in charger_park!)
    g.fillStyle(0x0f172a, 1);
    g.fillRect(1195, 845, 440, 275);
    // Canopy roof shadow & glowing stalls
    g.fillStyle(0x1e293b, 0.9);
    g.fillRect(1215, 855, 330, 32);
    g.lineStyle(2, 0xfacc15, 0.8);
    for (let i = 0; i < 6; i++) {
      const bx = 1222 + i * 52;
      // Head-in parking bay open at bottom (South) toward driving aisle
      g.lineBetween(bx, 896, bx, 966);
      g.lineBetween(bx + 44, 896, bx + 44, 966);
      g.lineBetween(bx, 896, bx + 44, 896);
      this.add.image(bx + 22, 901, 'wheel_stop').setDepth(4);
      const net = this.station?.network || (i % 2 === 0 ? 'enbw' : 'tesla');
      this.add.image(bx + 22, 875, `charger_${net}`).setScale(1.15).setDepth(5);
    }

    if (this.station?.hasMcDonalds || this.preset !== 'charger_park') {
      this.add.image(1595, 910, 'mcd_kiosk').setScale(1.35).setDepth(4);
    } else {
      this.add.image(1595, 910, 'bistro_kiosk').setScale(1.35).setDepth(4);
    }

    // Target Zone per preset
    if (this.preset === 'aachen_start') {
      // Real on-ramp lane east of Top Ave — passable at speed, no stop box!
      this.targetZone = new Phaser.Geom.Rectangle(1895, 158, 145, 108);
    } else if (this.preset === 'charger_park') {
      // Bay #3 (x: 1326..1370, y: 898..966) - requires REVERSE parking!
      this.targetZone = new Phaser.Geom.Rectangle(1326, 898, 44, 68);
      this.drawZoneMarker(`↺ RÜCKWÄRTS\n⚡ ${this.station?.maxKw || 150} kW`, 0x22c55e);
      this.add
        .text(1348, 992, '⬆️ Heck zur Säule · Rückwärts einparken ↺', {
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '10px',
          fontStyle: 'bold',
          color: '#fef08a',
          backgroundColor: 'rgba(15,23,42,0.86)',
          padding: { x: 6, y: 2 }
        })
        .setOrigin(0.5)
        .setDepth(5);
    } else if (this.preset === 'hannover_messe') {
      this.targetZone = new Phaser.Geom.Rectangle(1465, 450, 120, 86);
      this.drawZoneMarker('MESSE\nE-PARKPLATZ', 0x38bdf8);
    } else {
      // Aachen Finish E-Parking Bay
      g.fillStyle(0x0f172a, 1);
      g.fillRect(325, 860, 125, 165);
      this.targetZone = new Phaser.Geom.Rectangle(342, 915, 92, 74);
      this.drawZoneMarker('ZIEL\nAACHEN 🏁', 0x22c55e);
    }
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
        fontSize: '10px',
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
    this.obstacles = this.physics.add.staticGroup();

    const blocks: Array<[number, number, number, number]> = [
      [335, 330, 195, 130],
      [575, 330, 210, 125],
      [335, 495, 220, 115],
      [665, 865, 215, 145],
      [1165, 330, 145, 145]
    ];
    blocks.forEach(([x, y, w, h]) => {
      const box = this.add.rectangle(x + w / 2, y + h / 2, w, h, 0x000000, 0);
      this.physics.add.existing(box, true);
      this.obstacles.add(box);
    });

    const treeSpots = [
      [90, 95], [90, 420], [90, 760], [90, 1120], [90, 1390],
      [540, 95], [840, 95], [1340, 95], [1640, 95],
      [1955, 360], [1955, 620], [1955, 1020], [1955, 1360],
      [540, 1390], [1440, 1390], [820, 540]
    ];
    treeSpots.forEach(([tx, ty]) => {
      const t = this.obstacles.create(tx, ty, 'pixel_tree') as Phaser.Physics.Arcade.Image;
      t.setCircle(11, 3, 3);
      t.setDepth(6);
      t.refreshBody();
    });

    // Construction cones on West St
    [535, 565, 595].forEach(cy => {
      const c = this.obstacles.create(172, cy, 'cone') as Phaser.Physics.Arcade.Image;
      c.setDepth(5);
      c.refreshBody();
    });

    // Streetlamps along avenues (glow warmly at dusk/night!)
    this.streetlamps = [
      { x: 320, y: 132 }, { x: 640, y: 132 }, { x: 1260, y: 132 }, { x: 1620, y: 132 },
      { x: 320, y: 652 }, { x: 640, y: 652 }, { x: 1260, y: 652 }, { x: 1620, y: 652 },
      { x: 320, y: 1172 }, { x: 760, y: 1172 }, { x: 1340, y: 1172 }, { x: 1680, y: 1172 },
      { x: 1350, y: 855 }, { x: 1520, y: 855 }
    ];
    this.streetlamps.forEach(lp => {
      this.add.image(lp.x, lp.y, 'streetlamp').setDepth(11);
    });

    // Signalized intersections
    this.intersections = [
      {
        id: 'inter_top',
        centerX: 1030,
        centerY: 210,
        box: new Phaser.Geom.Rectangle(962, 142, 136, 136),
        ewPhase: 'green',
        nsPhase: 'red'
      },
      {
        id: 'inter_mid',
        centerX: 1030,
        centerY: 730,
        box: new Phaser.Geom.Rectangle(962, 662, 136, 136),
        ewPhase: 'red',
        nsPhase: 'green'
      }
    ];

    const addLightVisual = (interId: string, axis: 'ew' | 'ns', x: number, y: number) => {
      const halo = this.add.circle(x, y, 16, 0x22c55e, 0.22).setDepth(14);
      const sprite = this.add.image(x, y, 'tlight_green').setDepth(15);
      this.signalVisuals.push({ interId, axis, sprite, halo });
    };

    // Inter 1 lights
    addLightVisual('inter_top', 'ew', 944, 286);
    addLightVisual('inter_top', 'ew', 1116, 134);
    addLightVisual('inter_top', 'ns', 944, 134);
    addLightVisual('inter_top', 'ns', 1116, 286);

    // Inter 2 lights
    addLightVisual('inter_mid', 'ew', 944, 806);
    addLightVisual('inter_mid', 'ew', 1116, 654);
    addLightVisual('inter_mid', 'ns', 944, 654);
    addLightVisual('inter_mid', 'ns', 1116, 806);
  }

  private spawnTrafficAndPedestrians(): void {
    const carConfigs: Array<{
      tex: string;
      wps: Array<{ x: number; y: number }>;
      speed: number;
      obeys: boolean;
      isPolice?: boolean;
      isCyclist?: boolean;
    }> = [
      {
        tex: 'npc_sedan_blue',
        wps: [{ x: 320, y: 242 }, { x: 1800, y: 242 }, { x: 1800, y: 695 }, { x: 320, y: 695 }],
        speed: 104,
        obeys: true
      },
      {
        tex: 'npc_van_white',
        wps: [{ x: 1790, y: 175 }, { x: 242, y: 175 }, { x: 242, y: 1215 }, { x: 1790, y: 1215 }],
        speed: 96,
        obeys: true
      },
      {
        tex: 'npc_compact_green',
        wps: [{ x: 995, y: 1120 }, { x: 995, y: 180 }, { x: 1065, y: 180 }, { x: 1065, y: 1120 }],
        speed: 98,
        obeys: true
      },
      {
        tex: 'npc_police',
        wps: [{ x: 1065, y: 190 }, { x: 1065, y: 1120 }, { x: 242, y: 1120 }, { x: 242, y: 190 }],
        speed: 110,
        obeys: true,
        isPolice: true
      },
      {
        tex: 'cyclist_0',
        wps: [{ x: 240, y: 150 }, { x: 1740, y: 150 }],
        speed: 60,
        obeys: true,
        isCyclist: true
      },
      {
        tex: 'cyclist_1',
        wps: [{ x: 1740, y: 1310 }, { x: 240, y: 1310 }],
        speed: 58,
        obeys: true,
        isCyclist: true
      }
    ];

    carConfigs.forEach(cfg => {
      const sp = this.physics.add.image(cfg.wps[0].x, cfg.wps[0].y, cfg.tex).setDepth(7);
      sp.setImmovable(true);
      this.trafficCars.push({
        sprite: sp,
        waypoints: cfg.wps,
        wpIndex: 1,
        speed: cfg.speed,
        currentSpeed: cfg.speed,
        obeysLights: cfg.obeys,
        isPolice: cfg.isPolice,
        isCyclist: cfg.isCyclist
      });
    });

    // Pure sidewalk strollers distributed across all city sidewalks (never block crosswalks)
    const sidewalkPedConfigs: Array<{
      tex: string;
      wps: Array<{ x: number; y: number }>;
      startIdx?: number;
      speed: number;
    }> = [
      // NW block inner sidewalk loop
      {
        tex: 'ped_adult_0',
        wps: [{ x: 300, y: 294 }, { x: 944, y: 294 }, { x: 944, y: 642 }, { x: 300, y: 642 }],
        speed: 32
      },
      {
        tex: 'ped_adult_1',
        wps: [{ x: 944, y: 642 }, { x: 300, y: 642 }, { x: 300, y: 294 }, { x: 944, y: 294 }],
        speed: 29
      },
      // SW block sidewalks (avoiding SW finish driveway at x=320..450, y=800..940)
      {
        tex: 'ped_child',
        wps: [{ x: 470, y: 814 }, { x: 944, y: 814 }, { x: 944, y: 1162 }, { x: 470, y: 1162 }],
        speed: 34
      },
      // Top Ave outer north sidewalk (west & east)
      {
        tex: 'ped_adult_1',
        wps: [{ x: 140, y: 118 }, { x: 760, y: 118 }],
        speed: 30
      },
      {
        tex: 'ped_adult_0',
        wps: [{ x: 1140, y: 118 }, { x: 1740, y: 118 }],
        speed: 31
      },
      // West St outer west sidewalk (north stretch)
      {
        tex: 'ped_adult_0',
        wps: [{ x: 122, y: 180 }, { x: 122, y: 880 }],
        speed: 28
      },
      // Bottom Ave outer south sidewalk (west & east)
      {
        tex: 'ped_adult_1',
        wps: [{ x: 180, y: 1344 }, { x: 890, y: 1344 }],
        speed: 31
      },
      {
        tex: 'ped_child',
        wps: [{ x: 1160, y: 1344 }, { x: 1900, y: 1344 }],
        speed: 35
      },
      // East Ring outer east sidewalk (south of A4 on-ramp)
      {
        tex: 'ped_adult_0',
        wps: [{ x: 1918, y: 390 }, { x: 1918, y: 1290 }],
        speed: 30
      },
      // NE & SE block sidewalks along East Ring
      {
        tex: 'ped_adult_1',
        wps: [{ x: 1116, y: 294 }, { x: 1742, y: 294 }, { x: 1742, y: 625 }, { x: 1742, y: 294 }],
        speed: 30
      },
      {
        tex: 'ped_adult_0',
        wps: [{ x: 1742, y: 820 }, { x: 1742, y: 1162 }, { x: 1130, y: 1162 }, { x: 1742, y: 1162 }],
        speed: 29
      }
    ];

    sidewalkPedConfigs.forEach(pc => {
      const start = pc.wps[pc.startIdx || 0];
      const sp = this.physics.add.image(start.x, start.y, pc.tex).setDepth(8);
      sp.setImmovable(true);
      this.pedestrians.push({
        sprite: sp,
        waypoints: pc.wps,
        wpIndex: ((pc.startIdx || 0) + 1) % pc.wps.length,
        speed: pc.speed,
        isCrossing: false
      });
    });

    // Sidewalk pedestrians who occasionally cross a zebra crossing when passing by (never linger/block)
    const zebraPedConfigs: Array<{
      tex: string;
      startPos: { x: number; y: number };
      speed: number;
      zebraId: string;
      sideA: { x: number; y: number };
      sideB: { x: number; y: number };
      sidewalkPathA: Array<{ x: number; y: number }>;
      sidewalkPathB: Array<{ x: number; y: number }>;
      initialCooldown: number;
    }> = [
      {
        tex: 'ped_adult_0',
        startPos: { x: 640, y: 122 },
        speed: 33,
        zebraId: 'zebra_1',
        sideA: { x: 898, y: 122 },
        sideB: { x: 898, y: 294 },
        sidewalkPathA: [{ x: 520, y: 122 }, { x: 938, y: 122 }],
        sidewalkPathB: [{ x: 938, y: 294 }, { x: 520, y: 294 }],
        initialCooldown: 6
      },
      {
        tex: 'ped_adult_1',
        startPos: { x: 122, y: 920 },
        speed: 32,
        zebraId: 'zebra_2',
        sideA: { x: 122, y: 1108 },
        sideB: { x: 294, y: 1108 },
        sidewalkPathA: [{ x: 122, y: 860 }, { x: 122, y: 1320 }],
        sidewalkPathB: [{ x: 294, y: 1160 }, { x: 294, y: 950 }],
        initialCooldown: 9
      },
      {
        tex: 'ped_child',
        startPos: { x: 1360, y: 642 },
        speed: 34,
        zebraId: 'zebra_3',
        sideA: { x: 1158, y: 642 },
        sideB: { x: 1158, y: 814 },
        sidewalkPathA: [{ x: 1116, y: 642 }, { x: 1410, y: 642 }],
        sidewalkPathB: [{ x: 1275, y: 814 }, { x: 1116, y: 814 }],
        initialCooldown: 11
      }
    ];

    zebraPedConfigs.forEach(zc => {
      const sp = this.physics.add.image(zc.startPos.x, zc.startPos.y, zc.tex).setDepth(8);
      sp.setImmovable(true);
      this.pedestrians.push({
        sprite: sp,
        waypoints: zc.sidewalkPathA,
        wpIndex: 1,
        speed: zc.speed,
        isCrossing: false,
        zebraLink: {
          zebraId: zc.zebraId,
          sideA: zc.sideA,
          sideB: zc.sideB,
          sidewalkPathA: zc.sidewalkPathA,
          sidewalkPathB: zc.sidewalkPathB,
          onSideA: true,
          crossCooldownSec: zc.initialCooldown
        }
      });
    });
  }

  private spawnPlayer(): void {
    let sx = 210;
    let sy = 1010;
    let rot = 0;

    if (this.preset === 'aachen_start') {
      sx = 210;
      sy = 1005;
      rot = 0;
    } else if (this.preset === 'charger_park') {
      sx = 810;
      sy = 762;
      rot = Math.PI / 2; // Facing East along Mid Avenue toward intersection & Ladepark!
    } else if (this.preset === 'hannover_messe') {
      sx = 1830;
      sy = 240;
      rot = -Math.PI / 2;
    } else if (this.preset === 'aachen_finish') {
      sx = 1830;
      sy = 1250;
      rot = -Math.PI / 2;
    }

    this.player = this.physics.add
      .image(sx, sy, `car_${this.bridge.plan.vehicleId}`)
      .setDepth(10);
    this.player.setCollideWorldBounds(true);
    this.player.setCircle(14, 2, 12);
    this.player.setRotation(rot);

    this.physics.add.collider(this.player, this.obstacles, () => {
      this.handleCollision('obstacle', this.player.x, this.player.y, 0);
    });

    this.trafficCars.forEach(tc => {
      this.physics.add.collider(this.player, tc.sprite, () => {
        this.handleCollision(
          tc.isCyclist ? 'cyclist' : 'car',
          tc.sprite.x,
          tc.sprite.y,
          tc.currentSpeed
        );
      });
    });

    this.pedestrians.forEach(pd => {
      this.physics.add.collider(this.player, pd.sprite, () => {
        this.handleCollision('pedestrian', pd.sprite.x, pd.sprite.y, pd.speed);
      });
    });
  }

  private handleCollision(
    kind: 'car' | 'pedestrian' | 'cyclist' | 'obstacle',
    otherX: number,
    otherY: number,
    otherSpeed: number
  ): void {
    if (this.collisionCooldownSec > 0 || this.completed || this.bridge.paused) return;
    if (Math.abs(this.carSpeed) < 26 && kind === 'obstacle') {
      this.carSpeed = -this.carSpeed * 0.4;
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

    this.collisionCooldownSec = 2.6;
    this.carSpeed = 0;
    if (fault.playerAtFault) {
      this.cleanRun = false;
      if (this.bridge.runState) this.bridge.runState.collisionsCount += 1;
      this.cameras.main.shake(180, 0.008);
    } else {
      this.cameras.main.shake(90, 0.003);
    }
    SoundFX.bump();
    this.bridge.paused = true;
    this.bridge.onCollisionEvent({
      kind,
      playerAtFault: fault.playerAtFault,
      reason: fault.reason
    });
  }

  private triggerPoliceStop(kind: PoliceViolationKind): void {
    if (this.violationCooldownSec > 0 || this.completed || this.bridge.paused) return;
    this.violationCooldownSec = 6.0;
    this.carSpeed = 0;
    this.cleanRun = false;
    SoundFX.alert();
    this.cameras.main.flash(180, 30, 64, 175, true);
    this.bridge.paused = true;
    this.bridge.onPoliceViolation(kind);
  }

  private setupLightingAndWeather(): void {
    this.lampLightGfx = this.add.graphics().setDepth(11);
    this.headlightGfx = this.add.graphics().setDepth(12);
    this.cableGfx = this.add.graphics().setDepth(13);

    this.nightOverlay = this.add
      .rectangle(this.worldW / 2, this.worldH / 2, this.worldW, this.worldH, 0x020617, 0)
      .setDepth(14);
    this.fogOverlay = this.add
      .rectangle(this.worldW / 2, this.worldH / 2, this.worldW, this.worldH, 0xcbd5e1, 0)
      .setDepth(15);
    this.lightningOverlay = this.add
      .rectangle(this.worldW / 2, this.worldH / 2, this.worldW, this.worldH, 0xe0f2fe, 0)
      .setDepth(17);

    this.weatherParticles = [];
    for (let i = 0; i < 65; i++) {
      const d = this.add
        .image(Phaser.Math.Between(0, this.worldW), Phaser.Math.Between(0, this.worldH), 'rain_drop')
        .setDepth(16)
        .setAlpha(0);
      this.weatherParticles.push(d);
    }
  }

  private setupNavIndicator(): void {
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
    this.nightOverlay.setFillStyle(profile.ambientColor, profile.ambientAlpha);
    this.fogOverlay.setAlpha(profile.isFog ? 0.22 + Math.sin(this.trafficTimer * 0.8) * 0.05 : 0);

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

    // Streetlamp pools
    this.lampLightGfx.clear();
    if (profile.streetlampsOn) {
      this.streetlamps.forEach(lp => {
        this.lampLightGfx.fillStyle(0xfef08a, profile.lampGlowAlpha * 0.45);
        this.lampLightGfx.fillCircle(lp.x, lp.y + 8, 52);
        this.lampLightGfx.fillStyle(0xfde047, profile.lampGlowAlpha);
        this.lampLightGfx.fillCircle(lp.x, lp.y + 8, 22);
      });
    }

    // Dual headlights for player & NPC cars
    this.headlightGfx.clear();
    if (profile.headlightsOn) {
      const drawBeams = (x: number, y: number, rot: number, reach: number, spread: number) => {
        const fx = Math.sin(rot);
        const fy = -Math.cos(rot);
        const px = -fy;
        const py = fx;
        const tipX = x + fx * 20;
        const tipY = y + fy * 20;
        this.headlightGfx.fillStyle(0xfef08a, profile.headlightAlpha);
        this.headlightGfx.fillTriangle(
          tipX,
          tipY,
          tipX + fx * reach + px * spread,
          tipY + fy * reach + py * spread,
          tipX + fx * reach - px * spread,
          tipY + fy * reach - py * spread
        );
      };

      drawBeams(this.player.x, this.player.y, this.player.rotation, 165, 62);
      for (const tc of this.trafficCars) {
        if (tc.isCyclist) continue;
        drawBeams(tc.sprite.x, tc.sprite.y, tc.sprite.rotation, 110, 40);
      }
    }

    // Rain / Snow particle fall
    for (const p of this.weatherParticles) {
      if (profile.isRain) {
        p.setAlpha(0.72);
        p.setTint(0xbae6fd);
        p.setScale(1, 1);
        p.y += 480 * dt;
        p.x -= 90 * dt;
      } else if (profile.isSnow) {
        p.setAlpha(0.8);
        p.setTint(0xffffff);
        p.setScale(1.8, 0.45);
        p.y += 140 * dt;
        p.x += Math.sin(this.trafficTimer * 2 + p.y * 0.03) * 35 * dt;
      } else {
        p.setAlpha(0);
      }
      if (p.y > this.worldH) p.y = 0;
      if (p.x < 0) p.x = this.worldW;
      if (p.x > this.worldW) p.x = 0;
    }
  }

  update(_time: number, delta: number): void {
    const dt = Math.min(0.05, delta / 1000);
    this.collisionCooldownSec = Math.max(0, this.collisionCooldownSec - dt);
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
      sv.sprite.setTexture(`tlight_${phase}`);
      sv.halo.setFillStyle(phase === 'green' ? 0x22c55e : phase === 'amber' ? 0xfacc15 : 0xef4444, 0.25);
    });

    const profile = computeCityLightingProfile(
      this.bridge.level.departureTimeHour,
      this.bridge.runState?.elapsedMinutes || 0,
      this.preset,
      this.bridge.runState?.activeWeather || 'clear',
      this.bridge.runState?.isNight
    );
    this.updateLightingVisuals(dt, profile);

    if (this.bridge.paused || this.completed) {
      this.player.setVelocity(0, 0);
      return;
    }

    // === GTA 2 Controls (Keyboard + Shared TouchInput) ===
    const touch = this.bridge.touch;
    const up = this.cursors.up.isDown || this.wasd.W.isDown || touch.up;
    const down = this.cursors.down.isDown || this.wasd.S.isDown || touch.down;
    const left = this.cursors.left.isDown || this.wasd.A.isDown || touch.left;
    const right = this.cursors.right.isDown || this.wasd.D.isDown || touch.right;
    const brake = this.wasd.SPACE.isDown || touch.brake;

    if (Phaser.Input.Keyboard.JustDown(this.wasd.H) || touch.hornPressed) {
      touch.hornPressed = false;
      SoundFX.horn();
    }

    const maxFwd = 230;
    const maxRev = -115;
    if (up) {
      this.carSpeed = Math.min(maxFwd, this.carSpeed + 320 * dt);
    } else if (down) {
      this.carSpeed = Math.max(maxRev, this.carSpeed - 280 * dt);
    } else if (brake) {
      this.carSpeed *= Math.pow(0.05, dt);
    } else {
      this.carSpeed *= Math.pow(0.24, dt);
    }
    if (Math.abs(this.carSpeed) < 3 && !up && !down) this.carSpeed = 0;

    const steerFactor = Math.min(1, Math.abs(this.carSpeed) / 62);
    const dirSign = this.carSpeed >= -1 ? 1 : -1;
    const turnRate = 2.75 * steerFactor * dirSign;
    if (left) this.player.rotation -= turnRate * dt;
    if (right) this.player.rotation += turnRate * dt;

    const vx = Math.sin(this.player.rotation) * this.carSpeed;
    const vy = -Math.cos(this.player.rotation) * this.carSpeed;
    this.player.setVelocity(vx, vy);

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
      return;
    }

    // Move NPCs (strictly obeying lights, zebra crossings & spacing!)
    for (const tc of this.trafficCars) {
      const target = tc.waypoints[tc.wpIndex];
      const dist = Phaser.Math.Distance.Between(tc.sprite.x, tc.sprite.y, target.x, target.y);
      if (dist < 16) {
        tc.wpIndex = (tc.wpIndex + 1) % tc.waypoints.length;
      }
      const ang = Phaser.Math.Angle.Between(tc.sprite.x, tc.sprite.y, target.x, target.y);
      tc.sprite.setRotation(ang + Math.PI / 2);

      const yieldNow = shouldNpcYield(
        tc,
        this.trafficCars,
        this.pedestrians,
        this.intersections,
        this.zebras,
        ang
      );
      if (yieldNow) {
        tc.currentSpeed = 0;
        tc.sprite.setVelocity(0, 0);
      } else {
        tc.currentSpeed = tc.speed;
        tc.sprite.setVelocity(Math.cos(ang) * tc.speed, Math.sin(ang) * tc.speed);
      }
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

    // Nav arrow & HUD distance indicator
    const angleToTarget = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      this.targetZone.centerX,
      this.targetZone.centerY
    );
    const distToTarget = Math.round(
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.targetZone.centerX,
        this.targetZone.centerY
      )
    );
    this.navArrow.setPosition(this.scale.width / 2, 62);
    this.navArrow.setRotation(angleToTarget + Math.PI / 2);
    this.distText.setPosition(this.scale.width / 2, 84);
    this.reverseHintText.setPosition(this.scale.width / 2, 108);

    // Parking / Completion Check
    const inZone = Phaser.Geom.Rectangle.Contains(this.targetZone, this.player.x, this.player.y);
    // At charging stations, car must reverse into head-in spot (rear North toward pillar -> front South -> rotation ~ PI)
    const revAngleErr = Math.abs(Phaser.Math.Angle.Wrap(this.player.rotation - Math.PI));
    const orientationOk = this.preset !== 'charger_park' || revAngleErr <= 0.65;

    if (this.preset === 'charger_park' && distToTarget < 190 && !orientationOk) {
      this.reverseHintText.setText('⚠️ Rückwärts einparken! (Heck zur Ladesäule oben)');
      this.reverseHintText.setVisible(true);
    } else {
      this.reverseHintText.setVisible(false);
    }

    if (this.preset === 'aachen_start') {
      if (inZone) {
        this.completed = true;
        this.reverseHintText.setVisible(false);
        this.distText.setText('🛣️ Auffahrt A4 – Gute Fahrt!');
        this.bridge.onCitySegmentComplete(this.preset, this.cleanRun);
      } else {
        this.distText.setText(`Zur A4 Auffahrt · ${Math.max(0, Math.round(distToTarget / 6))} m`);
      }
    } else if (inZone && Math.abs(this.carSpeed) < 30 && orientationOk) {
      this.dwellInTargetSec += dt;
      this.distText.setText(`✓ Perfekt! Halten… (${Math.min(100, Math.round((this.dwellInTargetSec / 0.6) * 100))}%)`);
      if (this.dwellInTargetSec >= 0.6) {
        this.completed = true;
        this.reverseHintText.setVisible(false);
        this.player.setVelocity(0, 0);
        if (this.preset === 'aachen_finish') {
          this.triggerArrivalConfetti();
        } else if (this.preset === 'charger_park') {
          this.playDriverPlugInSequence();
        } else {
          this.bridge.onCitySegmentComplete(this.preset, this.cleanRun);
        }
      }
    } else {
      this.dwellInTargetSec = 0;
      const goalHint =
        this.preset === 'charger_park'
          ? 'Rückwärts in Ladebucht einparken'
          : this.preset === 'hannover_messe'
            ? 'Zum Messe-Parkplatz'
            : 'Ins Ziel einparken';
      this.distText.setText(`${goalHint} · ${Math.max(0, Math.round(distToTarget / 6))} m`);
    }
  }

  private playDriverPlugInSequence(): void {
    const carX = this.player.x;
    const carY = this.player.y;
    const pillarX = this.targetZone.centerX;
    const pillarY = 882;
    const portX = carX;
    const portY = carY - 22; // Rear of car faces North when parked reverse!

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
