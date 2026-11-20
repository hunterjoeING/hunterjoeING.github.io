import * as Phaser from 'phaser';
import { ChargerStation, CityDrivePreset } from '../types';
import { getChargerById } from '../data/europeMap';
import { ERoadtripBridge } from './GameBridge';
import { SoundFX } from './SoundFX';

interface TrafficCar {
  sprite: Phaser.Physics.Arcade.Image;
  waypoints: Array<{ x: number; y: number }>;
  wpIndex: number;
  speed: number;
  obeysLights: boolean;
}

interface PedestrianAgent {
  sprite: Phaser.Physics.Arcade.Image;
  a: { x: number; y: number };
  b: { x: number; y: number };
  toB: boolean;
  speed: number;
}

export class CityDriveScene extends Phaser.Scene {
  private bridge!: ERoadtripBridge;
  private preset: CityDrivePreset = 'aachen_start';
  private station?: ChargerStation;

  private player!: Phaser.Physics.Arcade.Image;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<'W' | 'A' | 'S' | 'D' | 'SPACE' | 'H', Phaser.Input.Keyboard.Key>;

  private worldW = 1360;
  private worldH = 980;
  private carSpeed = 0;
  private trafficPhase: 'green' | 'amber' | 'red' = 'green';
  private trafficTimer = 0;
  private trafficLightSprites: Phaser.GameObjects.Image[] = [];

  private trafficCars: TrafficCar[] = [];
  private pedestrians: PedestrianAgent[] = [];
  private obstacles!: Phaser.Physics.Arcade.StaticGroup;

  private targetZone!: Phaser.Geom.Rectangle;
  private targetGlow!: Phaser.GameObjects.Rectangle;
  private targetLabel!: Phaser.GameObjects.Text;
  private navArrow!: Phaser.GameObjects.Triangle;
  private distText!: Phaser.GameObjects.Text;

  private headlightGfx!: Phaser.GameObjects.Graphics;
  private nightOverlay!: Phaser.GameObjects.Rectangle;
  private rainDrops: Phaser.GameObjects.Image[] = [];

  private dwellInTargetSec = 0;
  private collisionCooldownSec = 0;
  private completed = false;
  private cleanRun = true;

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
    this.completed = false;
    this.cleanRun = true;
    this.trafficCars = [];
    this.pedestrians = [];
    this.trafficLightSprites = [];
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
    this.cameras.main.setZoom(this.scale.width < 640 ? 0.92 : 1.15);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      SPACE: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      H: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.H)
    };

    this.scale.on('resize', (size: Phaser.Structs.Size) => {
      if (this.cameras && this.cameras.main) {
        this.cameras.main.setZoom(size.width < 640 ? 0.92 : 1.15);
      }
      if (this.nightOverlay) {
        this.nightOverlay.setSize(size.width * 2, size.height * 2);
      }
    });
  }

  private drawCityWorld(): void {
    const g = this.add.graphics();
    // Base urban grass / park tiles
    g.fillStyle(0x214a2f, 1);
    g.fillRect(0, 0, this.worldW, this.worldH);

    // Sidewalks / City blocks
    g.fillStyle(0x64748b, 1);
    g.fillRect(40, 40, this.worldW - 80, this.worldH - 80);

    // Inner park courtyard
    g.fillStyle(0x255336, 1);
    g.fillRect(280, 260, 460, 320);

    // Main horizontal & vertical GTA 2 style streets (width 130px)
    g.fillStyle(0x1e293b, 1);
    // Top avenue
    g.fillRect(120, 120, 1120, 130);
    // Bottom avenue
    g.fillRect(120, 720, 1120, 130);
    // Left street
    g.fillRect(120, 120, 130, 730);
    // Middle cross street
    g.fillRect(740, 120, 130, 730);
    // Right street / ramp
    g.fillRect(1110, 120, 130, 730);

    // Bike lanes (reddish-terracotta edge strip)
    g.fillStyle(0x7c2d12, 0.72);
    g.fillRect(120, 122, 1120, 16);
    g.fillRect(120, 832, 1120, 16);

    // Roundabout (Kreisverkehr) at intersection (805, 785)
    g.fillStyle(0x1e293b, 1);
    g.fillCircle(805, 785, 110);
    g.fillStyle(0x22543d, 1);
    g.fillCircle(805, 785, 44);
    g.lineStyle(3, 0xf8fafc, 0.8);
    g.strokeCircle(805, 785, 46);

    // Dashed road centerlines
    g.fillStyle(0xf8fafc, 0.75);
    for (let x = 150; x < 1220; x += 34) {
      g.fillRect(x, 183, 18, 3);
      if (x < 680 || x > 920) g.fillRect(x, 783, 18, 3);
    }
    for (let y = 150; y < 820; y += 34) {
      g.fillRect(183, y, 3, 18);
      if (y < 660) g.fillRect(803, y, 3, 18);
      g.fillRect(1173, y, 3, 18);
    }

    // Zebra Crossings (Zebrastreifen)
    for (let i = 0; i < 6; i++) {
      g.fillRect(685, 145 + i * 16, 26, 8);
      g.fillRect(145 + i * 16, 675, 8, 26);
    }

    // Construction zone detour strip on middle cross street
    g.fillStyle(0x9a3412, 0.6);
    g.fillRect(745, 415, 58, 95);

    // Buildings (stylized GTA 2 rooftops)
    const drawBuilding = (x: number, y: number, w: number, h: number, roof: number, trim: number) => {
      g.fillStyle(0x0f172a, 0.45);
      g.fillRect(x + 8, y + 8, w, h);
      g.fillStyle(trim, 1);
      g.fillRect(x, y, w, h);
      g.fillStyle(roof, 1);
      g.fillRect(x + 6, y + 6, w - 12, h - 12);
    };
    drawBuilding(290, 290, 170, 120, 0x334155, 0x475569);
    drawBuilding(500, 290, 190, 120, 0x475569, 0x64748b);
    drawBuilding(290, 460, 190, 140, 0x1e3a8a, 0x3b82f6);
    drawBuilding(910, 290, 160, 170, 0x3f3f46, 0x71717a);

    // Preset-specific visual landmarks & parking bays
    if (this.preset === 'aachen_start' || this.preset === 'aachen_finish') {
      this.add.image(385, 530, 'landmark_aachen_dom').setScale(2.1);
      this.add.text(385, 582, 'Aachener Dom', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#f8fafc',
        backgroundColor: 'rgba(15,23,42,0.8)',
        padding: { x: 5, y: 2 }
      }).setOrigin(0.5);
    } else if (this.preset === 'hannover_messe') {
      this.add.image(990, 375, 'landmark_hermesturm').setScale(2.2);
      this.add.text(990, 428, 'Hannover Messe', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#f8fafc',
        backgroundColor: 'rgba(15,23,42,0.8)',
        padding: { x: 5, y: 2 }
      }).setOrigin(0.5);
    } else if (this.preset === 'charger_park') {
      // Draw parking lot asphalt apron in the central park area
      g.fillStyle(0x0f172a, 1);
      g.fillRect(890, 470, 200, 190);
      g.lineStyle(2, 0xfacc15, 0.8);
      for (let i = 0; i < 4; i++) {
        g.strokeRect(910 + i * 44, 520, 38, 66);
      }
      if (this.station?.hasMcDonalds) {
        this.add.image(990, 380, 'mcd_kiosk').setScale(1.4);
      }
      const net = this.station?.network || 'enbw';
      for (let i = 0; i < 4; i++) {
        this.add.image(929 + i * 44, 505, `charger_${net}`).setScale(1.1);
      }
    }

    // Target Parking / Ramp Zone
    if (this.preset === 'aachen_start') {
      this.targetZone = new Phaser.Geom.Rectangle(1130, 145, 90, 80);
      this.drawZoneMarker('A4 AUTOBAHN\nAUFFAHRT →', 0x2563eb);
    } else if (this.preset === 'charger_park') {
      this.targetZone = new Phaser.Geom.Rectangle(952, 522, 42, 64);
      this.drawZoneMarker(`⚡ LADEN\n${this.station?.maxKw || 150} kW`, 0x22c55e);
    } else if (this.preset === 'hannover_messe') {
      this.targetZone = new Phaser.Geom.Rectangle(930, 480, 90, 74);
      this.drawZoneMarker('MESSE\nE-PARKPLATZ', 0x38bdf8);
    } else {
      this.targetZone = new Phaser.Geom.Rectangle(140, 460, 86, 66);
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
        backgroundColor: 'rgba(15,23,42,0.75)',
        padding: { x: 4, y: 2 }
      })
      .setOrigin(0.5)
      .setDepth(4);
  }

  private spawnEnvironmentAndProps(): void {
    this.obstacles = this.physics.add.staticGroup();

    // Solid building blocks so player stays on roads/lots
    const blocks: Array<[number, number, number, number]> = [
      [290, 290, 170, 120],
      [500, 290, 190, 120],
      [290, 460, 190, 140],
      [910, 290, 160, 170]
    ];
    blocks.forEach(([x, y, w, h]) => {
      const box = this.add.rectangle(x + w / 2, y + h / 2, w, h, 0x000000, 0);
      this.physics.add.existing(box, true);
      this.obstacles.add(box);
    });

    // Trees around perimeter
    const treeSpots = [
      [75, 80], [75, 340], [75, 580], [75, 900],
      [420, 80], [640, 80], [1020, 80], [1295, 220], [1295, 560], [1295, 880],
      [520, 900], [980, 900]
    ];
    treeSpots.forEach(([tx, ty]) => {
      const t = this.obstacles.create(tx, ty, 'pixel_tree') as Phaser.Physics.Arcade.Image;
      t.setCircle(11, 3, 3);
      t.refreshBody();
    });

    // Construction cones (Baustelle) on middle cross street
    [420, 455, 490].forEach(cy => {
      const c = this.obstacles.create(770, cy, 'cone') as Phaser.Physics.Arcade.Image;
      c.setDepth(5);
      c.refreshBody();
    });

    // Working Traffic Light sprites at intersection (730, 130) & (730, 248)
    const tl1 = this.add.image(726, 114, 'tlight_green').setDepth(15);
    const tl2 = this.add.image(884, 260, 'tlight_green').setDepth(15);
    this.trafficLightSprites.push(tl1, tl2);
  }

  private spawnTrafficAndPedestrians(): void {
    // NPC Cars patrolling avenue & cross street
    const carConfigs: Array<{ tex: string; wps: Array<{ x: number; y: number }>; speed: number; obeys: boolean }> = [
      {
        tex: 'npc_sedan_blue',
        wps: [{ x: 200, y: 210 }, { x: 1140, y: 210 }, { x: 1140, y: 760 }, { x: 200, y: 760 }],
        speed: 105,
        obeys: true
      },
      {
        tex: 'npc_van_white',
        wps: [{ x: 1180, y: 155 }, { x: 185, y: 155 }, { x: 185, y: 810 }, { x: 1180, y: 810 }],
        speed: 95,
        obeys: true
      },
      {
        tex: 'npc_police',
        wps: [{ x: 830, y: 200 }, { x: 830, y: 690 }, { x: 210, y: 690 }, { x: 210, y: 200 }],
        speed: 115,
        obeys: false
      },
      // Cyclists in the bike lane!
      {
        tex: 'cyclist_0',
        wps: [{ x: 200, y: 130 }, { x: 1150, y: 130 }],
        speed: 62,
        obeys: false
      },
      {
        tex: 'cyclist_1',
        wps: [{ x: 1120, y: 840 }, { x: 190, y: 840 }],
        speed: 58,
        obeys: false
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
        obeysLights: cfg.obeys
      });
    });

    // Pedestrians & Children at crosswalks and park
    const pedConfigs: Array<{ tex: string; a: { x: number; y: number }; b: { x: number; y: number }; speed: number }> = [
      { tex: 'ped_adult_0', a: { x: 698, y: 105 }, b: { x: 698, y: 268 }, speed: 34 },
      { tex: 'ped_child', a: { x: 686, y: 110 }, b: { x: 686, y: 266 }, speed: 38 },
      { tex: 'ped_adult_1', a: { x: 132, y: 688 }, b: { x: 268, y: 688 }, speed: 32 }
    ];
    pedConfigs.forEach(pc => {
      const sp = this.physics.add.image(pc.a.x, pc.a.y, pc.tex).setDepth(8);
      sp.setImmovable(true);
      this.pedestrians.push({ sprite: sp, a: pc.a, b: pc.b, toB: true, speed: pc.speed });
    });
  }

  private spawnPlayer(): void {
    let sx = 190;
    let sy = 560;
    let rot = 0;
    if (this.preset === 'aachen_start') {
      sx = 185;
      sy = 640;
      rot = 0;
    } else if (this.preset === 'charger_park') {
      sx = 835;
      sy = 690;
      rot = 0;
    } else if (this.preset === 'hannover_messe') {
      sx = 1170;
      sy = 190;
      rot = -Math.PI / 2;
    } else if (this.preset === 'aachen_finish') {
      sx = 1170;
      sy = 785;
      rot = -Math.PI / 2;
    }

    this.player = this.physics.add
      .image(sx, sy, `car_${this.bridge.plan.vehicleId}`)
      .setDepth(10);
    this.player.setCollideWorldBounds(true);
    this.player.setCircle(14, 2, 12);
    this.player.setRotation(rot);

    this.physics.add.collider(this.player, this.obstacles, () => {
      this.handleCollision('obstacle');
    });

    this.trafficCars.forEach(tc => {
      this.physics.add.collider(this.player, tc.sprite, () => {
        const isCyc = tc.sprite.texture.key.startsWith('cyclist');
        this.handleCollision(isCyc ? 'cyclist' : 'car');
      });
    });

    this.pedestrians.forEach(pd => {
      this.physics.add.collider(this.player, pd.sprite, () => {
        this.handleCollision('pedestrian');
      });
    });
  }

  private handleCollision(kind: 'car' | 'pedestrian' | 'cyclist' | 'obstacle'): void {
    if (this.collisionCooldownSec > 0 || this.completed || this.bridge.paused) return;
    if (Math.abs(this.carSpeed) < 28 && kind === 'obstacle') {
      this.carSpeed = -this.carSpeed * 0.4;
      return;
    }
    this.collisionCooldownSec = 2.4;
    this.carSpeed = 0;
    this.cleanRun = false;
    SoundFX.bump();
    this.cameras.main.shake(180, 0.008);
    if (this.bridge.runState) this.bridge.runState.collisionsCount += 1;
    this.bridge.paused = true;
    this.bridge.onCollisionEvent(kind);
  }

  private setupLightingAndWeather(): void {
    this.headlightGfx = this.add.graphics().setDepth(12);
    this.nightOverlay = this.add
      .rectangle(this.worldW / 2, this.worldH / 2, this.worldW, this.worldH, 0x020617, 0)
      .setDepth(14);

    this.rainDrops = [];
    for (let i = 0; i < 42; i++) {
      const d = this.add
        .image(Phaser.Math.Between(0, this.worldW), Phaser.Math.Between(0, this.worldH), 'rain_drop')
        .setDepth(16)
        .setAlpha(0);
      this.rainDrops.push(d);
    }
  }

  private setupNavIndicator(): void {
    this.navArrow = this.add
      .triangle(0, 0, 0, -10, -7, 8, 7, 8, 0xfacc15)
      .setStrokeStyle(1.5, 0x0f172a)
      .setDepth(20)
      .setScrollFactor(0);
    this.distText = this.add
      .text(0, 0, '', {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#facc15',
        backgroundColor: 'rgba(15, 23, 42, 0.84)',
        padding: { x: 6, y: 3 }
      })
      .setOrigin(0.5)
      .setDepth(20)
      .setScrollFactor(0);
  }

  update(_time: number, delta: number): void {
    const dt = Math.min(0.05, delta / 1000);
    this.collisionCooldownSec = Math.max(0, this.collisionCooldownSec - dt);

    // Update traffic light cycle even if waiting
    this.trafficTimer += dt;
    const cycle = this.trafficTimer % 12;
    this.trafficPhase = cycle < 5.5 ? 'green' : cycle < 7.2 ? 'amber' : 'red';
    this.trafficLightSprites.forEach(s => s.setTexture(`tlight_${this.trafficPhase}`));

    if (this.bridge.paused || this.completed) {
      this.player.setVelocity(0, 0);
      return;
    }

    // === GTA 2 Style Controls (Keyboard + Touch) ===
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

    const maxFwd = 225;
    const maxRev = -95;
    if (up) {
      this.carSpeed = Math.min(maxFwd, this.carSpeed + 310 * dt);
    } else if (down) {
      this.carSpeed = Math.max(maxRev, this.carSpeed - 270 * dt);
    } else if (brake) {
      this.carSpeed *= Math.pow(0.06, dt);
    } else {
      // Smooth EV regen coasting
      this.carSpeed *= Math.pow(0.24, dt);
    }
    if (Math.abs(this.carSpeed) < 3 && !up && !down) this.carSpeed = 0;

    // Steering proportional to movement speed (realistic turning!)
    const steerFactor = Math.min(1, Math.abs(this.carSpeed) / 70);
    const dirSign = this.carSpeed >= -1 ? 1 : -1;
    const turnRate = 2.65 * steerFactor * dirSign;
    if (left) this.player.rotation -= turnRate * dt;
    if (right) this.player.rotation += turnRate * dt;

    // Sprite faces UP at rotation 0 -> forward vector is (sin(rot), -cos(rot))
    const vx = Math.sin(this.player.rotation) * this.carSpeed;
    const vy = -Math.cos(this.player.rotation) * this.carSpeed;
    this.player.setVelocity(vx, vy);

    // Move NPCs
    for (const tc of this.trafficCars) {
      const target = tc.waypoints[tc.wpIndex];
      const dist = Phaser.Math.Distance.Between(tc.sprite.x, tc.sprite.y, target.x, target.y);
      if (dist < 14) {
        tc.wpIndex = (tc.wpIndex + 1) % tc.waypoints.length;
      }
      // Stop near red light if near intersection x ~ 700..860, y ~ 130..240
      const nearLight =
        tc.obeysLights &&
        this.trafficPhase === 'red' &&
        tc.sprite.x > 660 &&
        tc.sprite.x < 750 &&
        tc.sprite.y > 140 &&
        tc.sprite.y < 235;
      if (nearLight) {
        tc.sprite.setVelocity(0, 0);
      } else {
        const ang = Phaser.Math.Angle.Between(tc.sprite.x, tc.sprite.y, target.x, target.y);
        tc.sprite.setRotation(ang + Math.PI / 2);
        tc.sprite.setVelocity(Math.cos(ang) * tc.speed, Math.sin(ang) * tc.speed);
      }
    }

    // Move Pedestrians & Children
    for (const pd of this.pedestrians) {
      const dest = pd.toB ? pd.b : pd.a;
      const dist = Phaser.Math.Distance.Between(pd.sprite.x, pd.sprite.y, dest.x, dest.y);
      if (dist < 8) pd.toB = !pd.toB;
      const ang = Phaser.Math.Angle.Between(pd.sprite.x, pd.sprite.y, dest.x, dest.y);
      pd.sprite.setVelocity(Math.cos(ang) * pd.speed, Math.sin(ang) * pd.speed);
    }

    // Day/Night & Rain visuals
    const isNight = this.preset === 'aachen_finish' || !!this.bridge.runState?.isNight;
    const isRain = this.bridge.runState?.activeWeather === 'rain' || this.bridge.runState?.activeWeather === 'storm';
    this.nightOverlay.setAlpha(isNight ? 0.56 : isRain ? 0.14 : 0);

    this.headlightGfx.clear();
    if (isNight) {
      const fx = Math.sin(this.player.rotation);
      const fy = -Math.cos(this.player.rotation);
      const px = -fy;
      const py = fx;
      const tipX = this.player.x + fx * 22;
      const tipY = this.player.y + fy * 22;
      this.headlightGfx.fillStyle(0xfef08a, 0.24);
      this.headlightGfx.fillTriangle(
        tipX,
        tipY,
        tipX + fx * 155 + px * 58,
        tipY + fy * 155 + py * 58,
        tipX + fx * 155 - px * 58,
        tipY + fy * 155 - py * 58
      );
    }

    for (const d of this.rainDrops) {
      if (!isRain) {
        d.setAlpha(0);
      } else {
        d.setAlpha(0.7);
        d.y += 450 * dt;
        d.x -= 80 * dt;
        if (d.y > this.worldH) d.y = 0;
        if (d.x < 0) d.x = this.worldW;
      }
    }

    // Navigation arrow to Target Zone
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
    this.navArrow.setPosition(this.scale.width / 2, 54);
    this.navArrow.setRotation(angleToTarget + Math.PI / 2);
    this.distText.setPosition(this.scale.width / 2, 76);

    // Check parking / entry inside Target Zone
    const inZone = Phaser.Geom.Rectangle.Contains(this.targetZone, this.player.x, this.player.y);
    if (inZone && Math.abs(this.carSpeed) < 36) {
      this.dwellInTargetSec += dt;
      this.distText.setText(`✓ Perfekt! Halten… (${Math.round(this.dwellInTargetSec * 100)}%)`);
      if (this.dwellInTargetSec >= 0.75) {
        this.completed = true;
        this.player.setVelocity(0, 0);
        if (this.preset === 'aachen_finish') {
          this.triggerArrivalConfetti();
        } else {
          this.bridge.onCitySegmentComplete(this.preset, this.cleanRun);
        }
      }
    } else {
      this.dwellInTargetSec = 0;
      const goalHint =
        this.preset === 'aachen_start'
          ? 'Zur A4 Auffahrt'
          : this.preset === 'charger_park'
            ? 'In Ladebucht einparken'
            : this.preset === 'hannover_messe'
              ? 'Zum Messe-Parkplatz'
              : 'Ins Ziel einparken';
      this.distText.setText(`${goalHint} · ${Math.max(0, Math.round(distToTarget / 6))} m`);
    }
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
        duration: Phaser.Math.Between(900, 1600),
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

    this.time.delayedCall(1550, () => {
      cheer.destroy();
      this.bridge.onCitySegmentComplete(this.preset, this.cleanRun);
    });
  }
}
