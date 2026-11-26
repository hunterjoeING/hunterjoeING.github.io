import * as Phaser from 'phaser';
import { CityDrivePreset, PoliceViolationKind, WeatherKind } from '../types';
import { MONTPELLIER_LIGHTING } from '../sim/CoastalLight';
import { capsuleOverlapsRect, capsulesOverlap, vehicleCapsule, type Capsule, type Point } from './CityCollision';
import type { TrafficRoute } from './CityLanes';
import type { Rect } from './PlaceStyles';

export const TRAFFIC_DEADLOCK_SEC = 2.5;
const TRAFFIC_ESCAPE_SEC = 1;

export interface TrafficCarAgent {
  sprite: Phaser.GameObjects.Image;
  route: TrafficRoute;
  wpIndex: number;
  currentSpeed: number;
  holdLeft: number;
  blockedSec: number;
  ghostSec: number;
  vx: number;
  vy: number;
}

function nextTrafficPose(npc: TrafficCarAgent, dt: number) {
  let { x, y, rotation } = npc.sprite;
  let { wpIndex } = npc;
  let parked = false;
  let remaining = npc.route.speed * dt;
  while (remaining > 0 && wpIndex < npc.route.path.length) {
    const target = npc.route.path[wpIndex];
    const dx = target.x - x;
    const dy = target.y - y;
    const distance = Math.hypot(dx, dy);
    if (distance > 0) rotation = Math.atan2(dy, dx) + Math.PI / 2 + (target.reverse ? Math.PI : 0);
    if (remaining < distance) {
      x += dx * remaining / distance;
      y += dy * remaining / distance;
      break;
    }
    x = target.x;
    y = target.y;
    wpIndex += 1;
    remaining -= distance;
    if (target.park) {
      parked = true;
      break;
    }
  }
  return { x, y, rotation, wpIndex, parked };
}

export function trafficShape(car: TrafficCarAgent): Capsule {
  const { x, y, rotation } = car.sprite;
  return vehicleCapsule(x, y, rotation, car.route.isCyclist);
}

interface CityTrafficStep {
  cars: TrafficCarAgent[];
  pedestrians: PedestrianAgent[];
  intersections: SignalIntersection[];
  zebras: ZebraCrosswalk[];
  junctions: Rect[];
  player: Point & { rotation: number };
  playerInGrace: boolean;
  hitsObstacle: (shape: Capsule) => boolean;
  onPlayerContact: (car: TrafficCarAgent) => boolean;
}

function waitOrGhost(car: TrafficCarAgent, dt: number): boolean {
  car.blockedSec += dt;
  if (car.blockedSec < TRAFFIC_DEADLOCK_SEC) return true;
  car.ghostSec = TRAFFIC_ESCAPE_SEC;
  car.blockedSec = 0;
  return false;
}

export function stepCityTraffic(dt: number, {
  cars, pedestrians, intersections, zebras, junctions, player, playerInGrace, hitsObstacle, onPlayerContact
}: CityTrafficStep): void {
  const playerFootprint = vehicleCapsule(player.x, player.y, player.rotation);
  const solidPlayer = playerInGrace ? undefined : playerFootprint;
  for (const car of cars) {
    const { sprite, route } = car;
    car.currentSpeed = car.vx = car.vy = 0;
    const others = cars.filter(other => other !== car && other.ghostSec <= 0);
    const otherShapes = others.map(trafficShape);
    const overlapsTraffic = (shape: Capsule) => otherShapes.some(other => capsulesOverlap(shape, other));
    if (car.ghostSec > 0) {
      car.ghostSec = Math.max(0, car.ghostSec - dt);
      const current = trafficShape(car);
      if (car.ghostSec === 0 && (capsulesOverlap(current, playerFootprint) ||
          overlapsTraffic(current) || hitsObstacle(current))) car.ghostSec = dt;
    }
    if (car.holdLeft > 0) {
      car.holdLeft = Math.max(0, car.holdLeft - dt);
      continue;
    }
    if (car.wpIndex === route.path.length) {
      const [start, next] = route.path;
      const rotation = Math.atan2(next.y - start.y, next.x - start.x) + Math.PI / 2;
      const shape = vehicleCapsule(start.x, start.y, rotation, route.isCyclist);
      const blocked = overlapsTraffic(shape) || (solidPlayer && capsulesOverlap(shape, solidPlayer)) || hitsObstacle(shape);
      if (car.ghostSec <= 0 && blocked && waitOrGhost(car, dt)) continue;
      sprite.setPosition(start.x, start.y).setRotation(rotation);
      car.wpIndex = 1;
      car.blockedSec = 0;
      continue;
    }

    const next = nextTrafficPose(car, dt);
    const angle = Math.atan2(next.y - sprite.y, next.x - sprite.x);
    const fx = Math.cos(angle);
    const fy = Math.sin(angle);
    if (npcMustYield(car, pedestrians, intersections, zebras, fx, fy)) {
      car.blockedSec = 0;
      continue;
    }
    if (car.ghostSec <= 0) {
      const shape = vehicleCapsule(next.x, next.y, next.rotation, route.isCyclist);
      const occupied = junctions.some(junction =>
        capsuleOverlapsRect(shape, junction) && !capsuleOverlapsRect(trafficShape(car), junction) &&
        ((solidPlayer && capsuleOverlapsRect(solidPlayer, junction)) ||
          otherShapes.some(other => capsuleOverlapsRect(other, junction)))
      );
      const playerContact = solidPlayer && capsulesOverlap(shape, solidPlayer);
      const blocked = occupied || hitsObstacle(shape) || overlapsTraffic(shape) ||
        vehicleAhead(car, others, playerInGrace ? undefined : player, fx, fy);
      if ((blocked || playerContact) && waitOrGhost(car, dt)) {
        if (!blocked && playerContact && onPlayerContact(car)) return;
        continue;
      }
    }

    car.blockedSec = 0;
    car.vx = (next.x - sprite.x) / dt;
    car.vy = (next.y - sprite.y) / dt;
    car.currentSpeed = Math.hypot(car.vx, car.vy);
    car.wpIndex = next.wpIndex;
    if (next.parked) car.holdLeft = route.holdSec ?? 0;
    sprite.setPosition(next.x, next.y).setRotation(next.rotation);
  }
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

export type SignalPhase = SignalIntersection['ewPhase'];

/** Trace back to the side the driver entered, including lanes that approach a corner diagonally. */
function entrySignalPhase({ box, ewPhase, nsPhase }: SignalIntersection, x: number, y: number, fx: number, fy: number): SignalPhase {
  const toWestOrEast = fx === 0 ? Infinity : (x - (fx > 0 ? box.left : box.right)) / fx;
  const toNorthOrSouth = fy === 0 ? Infinity : (y - (fy > 0 ? box.top : box.bottom)) / fy;
  const acrossEastWest = toWestOrEast === toNorthOrSouth ? Math.abs(fx) >= Math.abs(fy) : toWestOrEast < toNorthOrSouth;
  return acrossEastWest ? ewPhase : nsPhase;
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
  if (preset === 'montpellier_finish') return MONTPELLIER_LIGHTING;

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
    ambientColor = 0x311042;
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

export function npcMustYield(
  npc: TrafficCarAgent,
  pedestrians: PedestrianAgent[],
  intersections: SignalIntersection[],
  zebras: ZebraCrosswalk[],
  fx: number,
  fy: number
): boolean {
  // Look ahead 66 px.
  const probeX = npc.sprite.x + fx * 66;
  const probeY = npc.sprite.y + fy * 66;

  // 1. Check signalized intersection stop
  for (const inter of intersections) {
    const alreadyInside = Phaser.Geom.Rectangle.Contains(inter.box, npc.sprite.x, npc.sprite.y);
    const aboutToEnter = Phaser.Geom.Rectangle.Contains(inter.box, probeX, probeY);
    if (!alreadyInside && aboutToEnter && entrySignalPhase(inter, probeX, probeY, fx, fy) !== 'green') return true;
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

  return false;
}

function vehicleAhead(
  npc: TrafficCarAgent,
  allNpcs: TrafficCarAgent[],
  player: Point | undefined,
  fx: number,
  fy: number
): boolean {
  const ownRadius = npc.route.isCyclist ? 5 : 14;
  const blocked = (ox: number, oy: number, otherRadius: number) => {
    const dx = ox - npc.sprite.x;
    const dy = oy - npc.sprite.y;
    const along = dx * fx + dy * fy;
    const lateral = Math.abs(dx * fy - dy * fx);
    return along > 0 && along < 45 + npc.route.speed * 0.35 && lateral < ownRadius + otherRadius + 1;
  };
  for (const other of allNpcs) {
    if (other === npc) continue;
    // Querverkehr wird über die tatsächlich belegte Kreuzung geregelt.
    const parallel = Math.abs(fx * Math.sin(other.sprite.rotation) - fy * Math.cos(other.sprite.rotation));
    if (parallel > 0.8 && blocked(other.sprite.x, other.sprite.y, other.route.isCyclist ? 5 : 14)) return true;
  }
  return !!player && blocked(player.x, player.y, 14);
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

  // Check red light entry (crossing into intersection box when player's axis is RED)
  for (const inter of intersections) {
    const inside = Phaser.Geom.Rectangle.Contains(inter.box, px, py);
    const wasInside = wasInIntersections.has(inter.id);
    if (inside) wasInIntersections.add(inter.id);
    else wasInIntersections.delete(inter.id);

    if (inside && !wasInside && movingFast) {
      const axisPhase = entrySignalPhase(inter, px, py, fx, fy);
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
