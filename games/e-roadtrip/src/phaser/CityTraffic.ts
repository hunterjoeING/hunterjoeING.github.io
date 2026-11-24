import * as Phaser from 'phaser';
import { CityDrivePreset, PoliceViolationKind, WeatherKind } from '../types';

export interface TrafficCarAgent {
  sprite: Phaser.Physics.Arcade.Image;
  waypoints: Array<{ x: number; y: number }>;
  wpIndex: number;
  speed: number;
  currentSpeed: number;
  obeysLights: boolean;
  isPolice?: boolean;
  isCyclist?: boolean;
  /** Waypoint index where the car parks and waits (Autohof bay). */
  holdWp?: number;
  holdSec?: number;
  holdLeft?: number;
}

export interface PedestrianZebraLink {
  zebraId: string;
  sideA: { x: number; y: number };
  sideB: { x: number; y: number };
  sidewalkPathA: Array<{ x: number; y: number }>;
  sidewalkPathB: Array<{ x: number; y: number }>;
  onSideA: boolean;
  crossCooldownSec: number;
}

export interface PedestrianAgent {
  sprite: Phaser.Physics.Arcade.Image;
  waypoints: Array<{ x: number; y: number }>;
  wpIndex: number;
  speed: number;
  isCrossing: boolean;
  crossTarget?: { x: number; y: number };
  zebraLink?: PedestrianZebraLink;
}

export interface SignalIntersection {
  id: string;
  centerX: number;
  centerY: number;
  /** Bounds where crossing on red triggers violation */
  box: Phaser.Geom.Rectangle;
  ewPhase: 'green' | 'amber' | 'red';
  nsPhase: 'green' | 'amber' | 'red';
}

export interface ZebraCrosswalk {
  id: string;
  box: Phaser.Geom.Rectangle;
  axis: 'ew' | 'ns';
}

export interface CityLightingProfile {
  ambientColor: number;
  ambientAlpha: number;
  headlightsOn: boolean;
  headlightAlpha: number;
  streetlampsOn: boolean;
  lampGlowAlpha: number;
  isNight: boolean;
  isDuskOrDawn: boolean;
  isRain: boolean;
  isStorm: boolean;
  isFog: boolean;
  isSnow: boolean;
}

export function computeCityLightingProfile(
  departureHour: number,
  elapsedMinutes: number,
  preset: CityDrivePreset,
  weather: WeatherKind,
  forceNight?: boolean
): CityLightingProfile {
  const clockHour = (departureHour + elapsedMinutes / 60) % 24;
  const isNight = !!forceNight || preset === 'aachen_finish' || clockHour >= 19.5 || clockHour < 5.75;
  const isDusk = !isNight && clockHour >= 17.5 && clockHour < 19.5;
  const isDawn = !isNight && clockHour >= 5.75 && clockHour < 7.25;
  const isRain = weather === 'rain' || weather === 'storm';
  const isStorm = weather === 'storm';
  const isFog = weather === 'fog';
  const isSnow = weather === 'snow';

  let ambientColor = 0x020617;
  let ambientAlpha = 0;

  if (isNight) {
    ambientColor = 0x020617;
    ambientAlpha = isRain ? 0.64 : 0.58;
  } else if (isDusk) {
    const t = (clockHour - 17.5) / 2.0;
    ambientColor = 0x311042; // warm twilight violet
    ambientAlpha = 0.16 + t * 0.32;
  } else if (isDawn) {
    const t = 1 - (clockHour - 5.75) / 1.5;
    ambientColor = 0x7c2d12; // golden dawn tint
    ambientAlpha = 0.08 + t * 0.16;
  } else if (isStorm) {
    ambientColor = 0x0f172a;
    ambientAlpha = 0.26;
  } else if (isRain) {
    ambientColor = 0x0f172a;
    ambientAlpha = 0.16;
  } else if (isFog) {
    ambientColor = 0xcbd5e1;
    ambientAlpha = 0.22;
  } else if (isSnow) {
    ambientColor = 0xe0f2fe;
    ambientAlpha = 0.10;
  }

  const headlightsOn = isNight || isDusk || isDawn || isRain || isFog || isSnow;
  const headlightAlpha = isNight ? 0.28 : isDusk ? 0.2 : isRain || isFog ? 0.16 : 0.11;
  const streetlampsOn = isNight || isDusk || isStorm;
  const lampGlowAlpha = isNight ? 0.34 : isDusk ? 0.22 : isStorm ? 0.16 : 0;

  return {
    ambientColor,
    ambientAlpha,
    headlightsOn,
    headlightAlpha,
    streetlampsOn,
    lampGlowAlpha,
    isNight,
    isDuskOrDawn: isDusk || isDawn,
    isRain,
    isStorm,
    isFog,
    isSnow
  };
}

export function shouldNpcYield(
  npc: TrafficCarAgent,
  allNpcs: TrafficCarAgent[],
  pedestrians: PedestrianAgent[],
  intersections: SignalIntersection[],
  zebras: ZebraCrosswalk[],
  moveAngle: number,
  player?: { x: number; y: number }
): boolean {
  const fx = Math.cos(moveAngle);
  const fy = Math.sin(moveAngle);
  const horizontal = Math.abs(fx) >= Math.abs(fy);
  if (!npc.obeysLights) {
    return vehicleAhead(npc, allNpcs, player, fx, fy);
  }

  // Look ahead 48..88 px
  const probeX = npc.sprite.x + fx * 66;
  const probeY = npc.sprite.y + fy * 66;

  // 1. Check signalized intersection stop
  for (const inter of intersections) {
    const phase = horizontal ? inter.ewPhase : inter.nsPhase;
    if (phase === 'red' || phase === 'amber') {
      const alreadyInside = Phaser.Geom.Rectangle.Contains(inter.box, npc.sprite.x, npc.sprite.y);
      const aboutToEnter = Phaser.Geom.Rectangle.Contains(inter.box, probeX, probeY);
      if (!alreadyInside && aboutToEnter) return true;
    }
  }

  // 2. Yield to pedestrians actively crossing a zebra crosswalk ahead
  for (const zb of zebras) {
    const probeInZebra = Phaser.Geom.Rectangle.Contains(zb.box, probeX, probeY);
    const currentlyInZebra = Phaser.Geom.Rectangle.Contains(zb.box, npc.sprite.x, npc.sprite.y);
    if (!currentlyInZebra && probeInZebra) {
      for (const ped of pedestrians) {
        if (!ped.isCrossing) continue;
        const d = Phaser.Math.Distance.Between(ped.sprite.x, ped.sprite.y, zb.box.centerX, zb.box.centerY);
        if (d < 84) return true;
      }
    }
  }

  return vehicleAhead(npc, allNpcs, player, fx, fy);
}

function vehicleAhead(
  npc: TrafficCarAgent,
  allNpcs: TrafficCarAgent[],
  player: { x: number; y: number } | undefined,
  fx: number,
  fy: number
): boolean {
  const blocked = (ox: number, oy: number) => {
    const dx = ox - npc.sprite.x;
    const dy = oy - npc.sprite.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 26) return true;
    const along = dx * fx + dy * fy;
    const lateral = Math.abs(dx * fy - dy * fx);
    return along > 16 && along < 112 && lateral < 28;
  };
  for (const other of allNpcs) {
    if (other === npc) continue;
    if (blocked(other.sprite.x, other.sprite.y)) return true;
  }
  if (player && blocked(player.x, player.y)) return true;
  return false;
}

export function detectPlayerTrafficViolation(
  px: number,
  py: number,
  playerSpeed: number,
  playerRot: number,
  intersections: SignalIntersection[],
  zebras: ZebraCrosswalk[],
  pedestrians: PedestrianAgent[],
  wasInIntersections: Set<string>,
  wasInZebras: Set<string>
): PoliceViolationKind | null {
  const movingFast = Math.abs(playerSpeed) > 36;
  const fx = Math.sin(playerRot) * (playerSpeed >= 0 ? 1 : -1);
  const fy = -Math.cos(playerRot) * (playerSpeed >= 0 ? 1 : -1);
  const horizontal = Math.abs(fx) >= Math.abs(fy);

  // Check red light entry (crossing into intersection box when player's axis is RED)
  for (const inter of intersections) {
    const inside = Phaser.Geom.Rectangle.Contains(inter.box, px, py);
    const wasInside = wasInIntersections.has(inter.id);
    if (inside) wasInIntersections.add(inter.id);
    else wasInIntersections.delete(inter.id);

    if (inside && !wasInside && movingFast) {
      const axisPhase = horizontal ? inter.ewPhase : inter.nsPhase;
      if (axisPhase === 'red') {
        return 'red_light';
      }
    }
  }

  // Check zebra crossing violation (driving across zebra while a pedestrian is actively crossing)
  for (const zb of zebras) {
    const inside = Phaser.Geom.Rectangle.Contains(zb.box, px, py);
    const wasInside = wasInZebras.has(zb.id);
    if (inside) wasInZebras.add(zb.id);
    else wasInZebras.delete(zb.id);

    if (inside && !wasInside && movingFast) {
      const pedNear = pedestrians.some(
        p =>
          p.isCrossing &&
          Phaser.Math.Distance.Between(p.sprite.x, p.sprite.y, zb.box.centerX, zb.box.centerY) < 80
      );
      if (pedNear) {
        return 'zebra_crossing';
      }
    }
  }

  return null;
}

export function evaluateCollisionFault(
  kind: 'car' | 'pedestrian' | 'cyclist' | 'obstacle',
  playerX: number,
  playerY: number,
  playerRot: number,
  playerSpeed: number,
  otherX: number,
  otherY: number,
  otherSpeed: number
): { playerAtFault: boolean; reason: string } {
  if (kind === 'obstacle') {
    return { playerAtFault: true, reason: 'Du hast ein Hindernis bzw. eine Baustellen-Absperrung gestreift.' };
  }

  const absSpd = Math.abs(playerSpeed);
  if (absSpd <= 18) {
    return {
      playerAtFault: false,
      reason: 'Dein Fahrzeug stand vorschriftsmäßig – der andere Verkehrsteilnehmer ist aufgefahren.'
    };
  }

  if (kind === 'pedestrian') {
    return {
      playerAtFault: true,
      reason: 'Du bist im Fußgänger-/Zebrastreifen-Bereich zu schnell an einem Passanten vorbeigefahren.'
    };
  }

  if (kind === 'cyclist') {
    return {
      playerAtFault: true,
      reason: 'Zu geringer Seitenabstand beim Überholen bzw. Kreuzen des Radwegs.'
    };
  }

  // Car vs Car: check if NPC rear-ended / T-boned a slow yielding player vs player driving into NPC
  const fx = Math.sin(playerRot) * (playerSpeed >= 0 ? 1 : -1);
  const fy = -Math.cos(playerRot) * (playerSpeed >= 0 ? 1 : -1);
  const dx = otherX - playerX;
  const dy = otherY - playerY;
  const dist = Math.max(1, Math.hypot(dx, dy));
  const impactInFront = (dx / dist) * fx + (dy / dist) * fy;

  if (impactInFront < -0.25 && otherSpeed > absSpd * 0.8) {
    return {
      playerAtFault: false,
      reason: 'Ein anderer Pkw ist dir hinten/seitlich aufgefahren, während du bereits abgebremst hast.'
    };
  }

  if (absSpd < 42 && otherSpeed > 75 && impactInFront < 0.35) {
    return {
      playerAtFault: false,
      reason: 'Der kreuzende Verkehr hat deine Vorfahrt missachtet.'
    };
  }

  return {
    playerAtFault: true,
    reason: 'Du bist mit zu hoher Geschwindigkeit in das andere Fahrzeug gefahren.'
  };
}
