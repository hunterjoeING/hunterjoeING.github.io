import * as Phaser from 'phaser';
import { getChargersForEdge, getCityById, getEdgeById } from '../data/europeMap';
import { getVehicleById } from '../data/vehicles';
import { computeConsumptionKwh100 } from '../sim/EnergyModel';
import { defaultLegSpeedKmh, getActiveRouteLegs } from '../sim/RoutePlanner';
import { ChargerStation } from '../types';
import { ERoadtripBridge } from './GameBridge';
import { SoundFX } from './SoundFX';

interface AutobahnNpc {
  sprite: Phaser.GameObjects.Image;
  lane: number;
  speedRel: number;
}

export class AutobahnScene extends Phaser.Scene {
  private bridge!: ERoadtripBridge;
  private playerCar!: Phaser.GameObjects.Image;
  private headlightGfx!: Phaser.GameObjects.Graphics;
  private nightOverlay!: Phaser.GameObjects.Rectangle;
  private roadGfx!: Phaser.GameObjects.Graphics;
  private dashOffset = 0;
  private targetLaneX = 0;
  private lanesX: number[] = [];
  private npcs: AutobahnNpc[] = [];
  private trees: Phaser.GameObjects.Image[] = [];
  private rainDrops: Phaser.GameObjects.Image[] = [];
  private gantryObj?: Phaser.GameObjects.Container;
  private hudTickAccum = 0;
  private eventCooldownSec = 4;
  private resizeHandler?: (gameSize: Phaser.Structs.Size) => void;

  constructor() {
    super({ key: 'AutobahnScene' });
  }

  init(data: { bridge: ERoadtripBridge }): void {
    this.bridge = data.bridge;
  }

  create(): void {
    const w = this.scale.width;
    const h = this.scale.height;

    this.roadGfx = this.add.graphics();
    this.computeLaneGeometry(w);
    this.drawRoadBackdrop(w, h);

    // Side trees scrolling past
    this.trees = [];
    for (let i = 0; i < 18; i++) {
      const sideLeft = i % 2 === 0;
      const tx = sideLeft
        ? Phaser.Math.Between(18, Math.max(24, this.lanesX[0] - 68))
        : Phaser.Math.Between(Math.min(w - 24, this.lanesX[2] + 68), w - 18);
      const tree = this.add.image(tx, Phaser.Math.Between(0, h), 'pixel_tree');
      tree.setScale(Phaser.Math.FloatBetween(0.9, 1.35));
      tree.setDepth(2);
      this.trees.push(tree);
    }

    // NPC traffic
    this.npcs = [];
    const npcKeys = ['npc_truck', 'npc_sedan_blue', 'npc_van_white', 'npc_compact_green', 'npc_police'];
    for (let i = 0; i < 7; i++) {
      const lane = i % 3;
      const texKey = lane === 2 ? 'npc_truck' : npcKeys[i % npcKeys.length];
      const sprite = this.add.image(this.lanesX[lane], Phaser.Math.Between(-100, h), texKey);
      sprite.setScale(0.92);
      sprite.setDepth(5);
      this.npcs.push({
        sprite,
        lane,
        speedRel: lane === 2 ? 0.42 : lane === 1 ? 0.72 : 0.9
      });
    }

    // Player car
    this.targetLaneX = this.lanesX[1];
    this.playerCar = this.add.image(this.targetLaneX, h * 0.72, `car_${this.bridge.plan.vehicleId}`);
    this.playerCar.setDepth(10);

    // Headlights (visible at dusk/night/rain)
    this.headlightGfx = this.add.graphics().setDepth(9);

    // Night / weather ambient overlay
    this.nightOverlay = this.add.rectangle(w / 2, h / 2, w, h, 0x020617, 0).setDepth(14);

    // Rain particles
    this.rainDrops = [];
    for (let i = 0; i < 45; i++) {
      const d = this.add.image(Phaser.Math.Between(0, w), Phaser.Math.Between(0, h), 'rain_drop');
      d.setDepth(16).setAlpha(0);
      this.rainDrops.push(d);
    }

    this.createGantrySign(w);

    this.resizeHandler = (gameSize: Phaser.Structs.Size) => {
      if (!this.scene.isActive()) return;
      this.computeLaneGeometry(gameSize.width);
      this.drawRoadBackdrop(gameSize.width, gameSize.height);
      if (this.nightOverlay) {
        this.nightOverlay.setPosition(gameSize.width / 2, gameSize.height / 2);
        this.nightOverlay.setSize(gameSize.width, gameSize.height);
      }
      if (this.playerCar) {
        this.playerCar.y = gameSize.height * 0.72;
      }
    };
    this.scale.on('resize', this.resizeHandler);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      if (this.resizeHandler) {
        this.scale.off('resize', this.resizeHandler);
        this.resizeHandler = undefined;
      }
    });
  }

  private computeLaneGeometry(w: number): void {
    const cx = w / 2;
    const laneSpacing = Math.min(58, Math.max(42, w * 0.08));
    this.lanesX = [cx - laneSpacing, cx, cx + laneSpacing];
  }

  private drawRoadBackdrop(w: number, h: number): void {
    const g = this.roadGfx;
    g.clear();
    // Green countryside grass
    g.fillStyle(0x1f4529, 1);
    g.fillRect(0, 0, w, h);

    const roadHalfW = (this.lanesX[2] - this.lanesX[0]) * 0.85 + 36;
    const cx = w / 2;

    // Gravel shoulders
    g.fillStyle(0x475569, 1);
    g.fillRect(cx - roadHalfW - 14, 0, roadHalfW * 2 + 28, h);

    // Asphalt Autobahn
    g.fillStyle(0x1e293b, 1);
    g.fillRect(cx - roadHalfW, 0, roadHalfW * 2, h);

    // Guardrails
    g.fillStyle(0xcbd5e1, 1);
    g.fillRect(cx - roadHalfW - 4, 0, 4, h);
    g.fillRect(cx + roadHalfW, 0, 4, h);

    // White edge lines
    g.fillStyle(0xf8fafc, 0.9);
    g.fillRect(cx - roadHalfW + 8, 0, 3, h);
    g.fillRect(cx + roadHalfW - 11, 0, 3, h);
  }

  private createGantrySign(w: number): void {
    const cont = this.add.container(w / 2, -60).setDepth(13);
    const bar = this.add.rectangle(0, 0, 260, 24, 0x1d4ed8).setStrokeStyle(2, 0xf8fafc);
    const txt = this.add
      .text(0, 0, 'A2  HANNOVER  ·  RICHTGESCHW. 130', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#ffffff'
      })
      .setOrigin(0.5);
    cont.add([bar, txt]);
    this.gantryObj = cont;
  }

  update(_time: number, delta: number): void {
    const run = this.bridge.runState;
    if (!run) return;

    const dtSec = Math.min(0.05, delta / 1000);
    const w = this.scale.width;
    const h = this.scale.height;

    if (this.bridge.paused) return;

    const activeLegs = getActiveRouteLegs(this.bridge.level, run.plan);
    const legSpec = activeLegs[run.currentLegIndex];
    if (!legSpec) return;
    const edge = getEdgeById(legSpec.edgeId);
    const vehicle = getVehicleById(run.plan.vehicleId);
    const lp = run.plan.legPlans.find(x => x.legIndex === run.currentLegIndex);
    const targetSpeed = Math.min(
      vehicle.maxSpeedKmh,
      lp ? lp.targetSpeedKmh : defaultLegSpeedKmh(edge, vehicle.maxSpeedKmh)
    );
    run.currentSpeedKmh = targetSpeed;

    // Weather & day/night calculation
    const weather = legSpec.weatherOverride || edge.defaultWeather;
    run.activeWeather = weather;
    const clockHour = (this.bridge.level.departureTimeHour + run.elapsedMinutes / 60) % 24;
    run.isNight = !!legSpec.isNightLeg || clockHour >= 19.2 || clockHour < 6.0;

    // Visual road scroll
    const scrollPxPerSec = (targetSpeed / 120) * 320 * (this.bridge.timeScale >= 15 ? 1.55 : this.bridge.timeScale >= 5 ? 1.25 : 1);
    this.dashOffset = (this.dashOffset + scrollPxPerSec * dtSec) % 48;

    this.drawRoadBackdrop(w, h);
    // Dashed lane dividers
    this.roadGfx.fillStyle(0xf8fafc, 0.85);
    const sep1 = (this.lanesX[0] + this.lanesX[1]) / 2;
    const sep2 = (this.lanesX[1] + this.lanesX[2]) / 2;
    for (let y = -48 + this.dashOffset; y < h; y += 48) {
      this.roadGfx.fillRect(sep1 - 1.5, y, 3, 24);
      this.roadGfx.fillRect(sep2 - 1.5, y, 3, 24);
    }

    // Update trees
    for (const t of this.trees) {
      t.y += scrollPxPerSec * dtSec;
      if (t.y > h + 30) t.y = -30;
    }

    // Update overhead gantry occasionally
    if (this.gantryObj) {
      this.gantryObj.x = w / 2;
      this.gantryObj.y += scrollPxPerSec * 0.85 * dtSec;
      if (this.gantryObj.y > h + 900) {
        this.gantryObj.y = -80;
        const toCity = getCityById(legSpec.reverse ? edge.fromCityId : edge.toCityId);
        const label = this.gantryObj.list[1] as Phaser.GameObjects.Text;
        label.setText(`${edge.highwayName}  ·  RICHTUNG ${toCity.name.toUpperCase()}`);
      }
    }

    // Update NPCs and autopilot lane avoidance
    let blockedAhead = false;
    for (const npc of this.npcs) {
      npc.sprite.x = this.lanesX[npc.lane];
      const rel = scrollPxPerSec * (1 - npc.speedRel);
      npc.sprite.y += rel * dtSec;
      if (npc.sprite.y > h + 110) {
        npc.sprite.y = -120;
      }
      if (
        Math.abs(npc.sprite.x - this.playerCar.x) < 28 &&
        npc.sprite.y < this.playerCar.y &&
        this.playerCar.y - npc.sprite.y < 145
      ) {
        blockedAhead = true;
      }
    }

    if (blockedAhead) {
      this.targetLaneX = this.playerCar.x < this.lanesX[1] + 10 ? this.lanesX[0] : this.lanesX[1];
    } else if (targetSpeed > 135) {
      this.targetLaneX = this.lanesX[0]; // Fast left lane!
    } else {
      this.targetLaneX = this.lanesX[1];
    }
    this.playerCar.x = Phaser.Math.Linear(this.playerCar.x, this.targetLaneX, 0.08);

    // Day/night tint & headlights
    let darkness = 0;
    if (clockHour >= 18.0 && clockHour < 20.0) darkness = ((clockHour - 18.0) / 2.0) * 0.56;
    else if (clockHour >= 20.0 || clockHour < 5.5) darkness = 0.56;
    else if (weather === 'rain') darkness = 0.16;

    this.nightOverlay.setAlpha(darkness);
    this.headlightGfx.clear();
    if (darkness > 0.14) {
      this.headlightGfx.fillStyle(0xfef08a, 0.22);
      this.headlightGfx.fillTriangle(
        this.playerCar.x - 9,
        this.playerCar.y - 22,
        this.playerCar.x - 42,
        this.playerCar.y - 170,
        this.playerCar.x + 2,
        this.playerCar.y - 170
      );
      this.headlightGfx.fillTriangle(
        this.playerCar.x + 9,
        this.playerCar.y - 22,
        this.playerCar.x - 2,
        this.playerCar.y - 170,
        this.playerCar.x + 42,
        this.playerCar.y - 170
      );
    }

    // Rain particles
    const isRain = weather === 'rain' || weather === 'storm';
    for (const d of this.rainDrops) {
      if (!isRain) {
        d.setAlpha(0);
      } else {
        d.setAlpha(0.75);
        d.y += 560 * dtSec;
        d.x -= 90 * dtSec;
        if (d.y > h + 10) d.y = -10;
        if (d.x < -10) d.x = w + 10;
      }
    }

    // === Simulation Physics Step ===
    // 1x = ~2.2 sim minutes per real second, 5x = ~11 min/s, 15x = ~32 min/s
    const simMinPerRealSec = this.bridge.timeScale === 15 ? 28 : this.bridge.timeScale === 5 ? 11 : 2.8;
    const simMinutes = simMinPerRealSec * dtSec;
    const effectiveSpeed = targetSpeed * 0.92;
    const deltaKm = (effectiveSpeed / 60) * simMinutes;

    const elevGain = legSpec.reverse ? edge.elevationLossM : edge.elevationGainM;
    const elevLoss = legSpec.reverse ? edge.elevationGainM : edge.elevationLossM;
    const cons100 = computeConsumptionKwh100(
      vehicle,
      targetSpeed,
      weather,
      elevGain,
      elevLoss,
      edge.distanceKm,
      this.bridge.level.trailerWeightKg || 0,
      !!run.plan.behindTruckMode
    );

    const kwhBurned = (deltaKm / 100) * cons100;
    const socDelta = (kwhBurned / vehicle.batteryKwh) * 100;

    run.legProgressKm += deltaKm;
    run.distanceDrivenKm += deltaKm;
    run.energyUsedKwh += kwhBurned;
    run.socPct = Math.max(0, run.socPct - socDelta);
    run.elapsedMinutes += simMinutes;
    run.bladderNeed = Math.min(100, run.bladderNeed + simMinutes * 0.35);

    // Stress evolves with high speed, bad weather, low SoC, and high bladder need
    const comfortDamping = 1 - (vehicle.comfortRating - 5) * 0.04;
    let stressDeltaPerMin = 0.02;
    if (targetSpeed > 145) stressDeltaPerMin += 0.14;
    if (weather === 'rain' || weather === 'snow') stressDeltaPerMin += 0.06;
    if (run.socPct < 15) stressDeltaPerMin += 0.28;
    if (run.bladderNeed > 75) stressDeltaPerMin += 0.12;
    run.stress = Phaser.Math.Clamp(
      run.stress + stressDeltaPerMin * simMinutes * this.bridge.level.passengers.stressSensitivity * comfortDamping,
      0,
      100
    );
    run.peakStress = Math.max(run.peakStress, run.stress);

    // Check battery depletion
    if (run.socPct <= 0.15) {
      this.bridge.paused = true;
      SoundFX.alert();
      this.bridge.onBatteryDepleted();
      return;
    }

    // Check planned charger stop along this leg
    const legRatio = Math.min(1, run.legProgressKm / edge.distanceKm);
    const pendingStop = run.plan.plannedStops
      .filter(s => s.legIndex === run.currentLegIndex && !run.completedStopIds.includes(s.chargerId) && !run.skippedStopIds.includes(s.chargerId))
      .map(s => {
        const st = getChargersForEdge(edge.id).find(c => c.id === s.chargerId);
        if (!st) return null;
        const p = legSpec.reverse ? 1 - st.edgeProgress : st.edgeProgress;
        return { stop: s, station: st, p };
      })
      .filter((x): x is { stop: typeof run.plan.plannedStops[number]; station: ChargerStation; p: number } => x !== null)
      .sort((a, b) => a.p - b.p)[0];

    if (pendingStop && legRatio >= pendingStop.p) {
      this.bridge.paused = true;
      SoundFX.click();
      this.bridge.onTriggerChargerSegment(pendingStop.station);
      return;
    }

    // Check dynamic events & Wife Stress Dialogues
    this.eventCooldownSec -= dtSec;
    if (this.eventCooldownSec <= 0) {
      // Trigger Wife Stress Dialogue when stress rises OR SoC gets tight on return
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
        const dlgId =
          run.socPct < 24
            ? 'dlg_diesel_remark'
            : this.bridge.level.wifeDialogueIds[0];
        this.bridge.onWifeDialogueTrigger(dlgId);
        return;
      }

      // Route-aware dynamic events (high-traffic routes hit jams reliably; low-traffic routes avoid them!)
      if (run.currentLegIndex === 1 && legRatio > 0.55 && !run.triggeredEventIds.includes('evt_stau_kamen')) {
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
      if (run.currentLegIndex === 2 && legRatio > 0.45 && !run.triggeredEventIds.includes('evt_accident_help')) {
        run.triggeredEventIds.push('evt_accident_help');
        this.eventCooldownSec = 7;
        this.bridge.paused = true;
        SoundFX.alert();
        this.bridge.onDynamicEventTrigger('evt_accident_help');
        return;
      }
      if (run.currentLegIndex === 4 && legRatio > 0.42 && !run.triggeredEventIds.includes('evt_rain_front')) {
        run.triggeredEventIds.push('evt_rain_front');
        this.eventCooldownSec = 7;
        this.bridge.paused = true;
        SoundFX.alert();
        this.bridge.onDynamicEventTrigger('evt_rain_front');
        return;
      }
      if (run.currentLegIndex === 5 && run.bladderNeed > 60 && !run.triggeredEventIds.includes('evt_wc_coffee')) {
        run.triggeredEventIds.push('evt_wc_coffee');
        this.eventCooldownSec = 7;
        this.bridge.paused = true;
        SoundFX.alert();
        this.bridge.onDynamicEventTrigger('evt_wc_coffee');
        return;
      }
      if (targetSpeed > 138 && !run.triggeredEventIds.includes('evt_speed_trap')) {
        run.triggeredEventIds.push('evt_speed_trap');
        this.eventCooldownSec = 7;
        this.bridge.paused = true;
        SoundFX.alert();
        this.bridge.onDynamicEventTrigger('evt_speed_trap');
        return;
      }
    }

    // Check leg completion
    if (run.legProgressKm >= edge.distanceKm) {
      if (legSpec.citySegmentAtEnd) {
        this.bridge.paused = true;
        const preset = legSpec.citySegmentAtEnd;
        if (preset === 'hannover_messe' || preset === 'aachen_finish') {
          this.bridge.onTriggerCitySegment(preset);
          return;
        }
      }
      if (run.currentLegIndex < activeLegs.length - 1) {
        run.currentLegIndex += 1;
        run.legProgressKm = 0;
      } else {
        this.bridge.paused = true;
        this.bridge.onTriggerCitySegment('aachen_finish');
        return;
      }
    }

    // Periodic HUD refresh
    this.hudTickAccum += dtSec;
    if (this.hudTickAccum >= 0.12) {
      this.hudTickAccum = 0;
      this.bridge.onAutobahnHudTick(run);
    }
  }
}
