import { ChargerNetwork, HighwayEdge, LevelConfig, TripPlan } from '../types';
import { getCityById, getEdgeById } from '../data/europeMap';
import { getVehicleById } from '../data/vehicles';
import { evaluateTripPlan, getActiveRouteLegs } from '../sim/RoutePlanner';

export interface BoxRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RangeBandRing {
  innerPx: number;
  outerPx: number;
  color: number;
  alpha: number;
  label: string;
}

export interface StageRangeOverlayData {
  originX: number;
  originY: number;
  startSocPct: number;
  consumptionKwh100: number;
  pxPerKm: number;
  maxReachKm: number;
  rings: RangeBandRing[];
}

export interface CardLayoutNode {
  pinX: number;
  pinY: number;
  worldX: number;
  worldY: number;
  cardW: number;
  cardH: number;
}

export function isProviderSubscribed(
  network: ChargerNetwork,
  subscriptionIds: string[],
  isTesla?: boolean
): boolean {
  if (network === 'tesla') return !!isTesla || subscriptionIds.includes('tesla_suc');
  if (network === 'enbw') return subscriptionIds.includes('enbw_m') || subscriptionIds.includes('enbw_l');
  if (network === 'ewego') return subscriptionIds.includes('ewe_go');
  if (network === 'electra') return subscriptionIds.includes('electra_plus');
  if (network === 'ionity') return subscriptionIds.includes('ionity_passport');
  if (network === 'ac_village') return subscriptionIds.includes('ac_rural_pass');
  return false;
}

export function getEdgePixelLength(edge: HighwayEdge): number {
  let len = 0;
  for (let i = 0; i < edge.waypoints.length - 1; i++) {
    const a = edge.waypoints[i];
    const b = edge.waypoints[i + 1];
    len += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return Math.max(1, len);
}

export function getPointAlongEdge(
  edge: HighwayEdge,
  progress01: number,
  reverse = false
): { x: number; y: number; angleRad: number } {
  const pts = reverse ? [...edge.waypoints].reverse() : edge.waypoints;
  if (pts.length === 0) return { x: 0, y: 0, angleRad: 0 };
  if (pts.length === 1) return { x: pts[0].x, y: pts[0].y, angleRad: 0 };

  const clamped = Math.max(0, Math.min(1, progress01));
  const segLens: number[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const l = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
    segLens.push(l);
    total += l;
  }
  if (total < 0.001) return { x: pts[0].x, y: pts[0].y, angleRad: 0 };

  let targetDist = clamped * total;
  for (let i = 0; i < segLens.length; i++) {
    if (targetDist <= segLens[i] || i === segLens.length - 1) {
      const t = segLens[i] > 0 ? targetDist / segLens[i] : 0;
      const a = pts[i];
      const b = pts[i + 1];
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        angleRad: Math.atan2(b.y - a.y, b.x - a.x)
      };
    }
    targetDist -= segLens[i];
  }
  const last = pts[pts.length - 1];
  return { x: last.x, y: last.y, angleRad: 0 };
}

export function computeRangeOverlayForStage(
  level: LevelConfig,
  plan: TripPlan,
  selectedLegIndex: number
): StageRangeOverlayData | null {
  const legs = getActiveRouteLegs(level, plan);
  if (legs.length === 0) return null;
  const idx = Math.max(0, Math.min(legs.length - 1, selectedLegIndex));
  const legSpec = legs[idx];
  const edge = getEdgeById(legSpec.edgeId);
  const originCity = getCityById(legSpec.reverse ? edge.toCityId : edge.fromCityId);

  const forecast = evaluateTripPlan(level, plan);
  const legFc = forecast.legForecasts[idx];
  const vehicle = getVehicleById(plan.vehicleId);
  const startSocPct = Math.max(1, legFc ? legFc.startSocPct : 96);
  const cons100 = Math.max(9.5, legFc ? legFc.consumptionKwh100 : vehicle.baseConsumption100);

  // Average px/km across active route legs for consistent Europe map scaling
  let sumPx = 0;
  let sumKm = 0;
  legs.forEach(l => {
    const e = getEdgeById(l.edgeId);
    sumPx += getEdgePixelLength(e);
    sumKm += e.distanceKm;
  });
  const pxPerKm = sumKm > 0 ? sumPx / sumKm : 0.72;

  const kmForRemainingSoc = (targetSoc: number): number => {
    if (startSocPct <= targetSoc) return 0;
    const usableKwh = ((startSocPct - targetSoc) / 100) * vehicle.batteryKwh;
    return (usableKwh / cons100) * 100;
  };

  const r25 = kmForRemainingSoc(25) * pxPerKm;
  const r15 = kmForRemainingSoc(15) * pxPerKm;
  const r10 = kmForRemainingSoc(10) * pxPerKm;
  const r5 = kmForRemainingSoc(5) * pxPerKm;
  const r0 = kmForRemainingSoc(0) * pxPerKm;

  const rings: RangeBandRing[] = [];
  if (r15 > r25 + 1) {
    rings.push({ innerPx: r25, outerPx: r15, color: 0x22c55e, alpha: 0.16, label: '25–15%' });
  }
  if (r10 > r15 + 1) {
    rings.push({ innerPx: r15, outerPx: r10, color: 0xeab308, alpha: 0.19, label: '15–10%' });
  }
  if (r5 > r10 + 1) {
    rings.push({ innerPx: r10, outerPx: r5, color: 0xf97316, alpha: 0.22, label: '10–5%' });
  }
  if (r0 > r5 + 1) {
    rings.push({ innerPx: r5, outerPx: r0, color: 0xef4444, alpha: 0.24, label: '5–0%' });
  }

  return {
    originX: originCity.mapX,
    originY: originCity.mapY,
    startSocPct,
    consumptionKwh100: cons100,
    pxPerKm,
    maxReachKm: Math.round(kmForRemainingSoc(0)),
    rings
  };
}

export function resolveNonOverlappingCards(
  nodes: CardLayoutNode[],
  fixedObstacles: BoxRect[],
  routeDots: Array<{ x: number; y: number; r: number }>,
  cardScale: number
): void {
  if (nodes.length === 0) return;

  const fanOffsets = [
    { dx: -1.0, dy: -1.18 },
    { dx: 1.05, dy: 1.18 },
    { dx: 1.15, dy: -1.1 },
    { dx: -1.12, dy: 1.12 },
    { dx: 0.0, dy: -1.45 },
    { dx: 0.0, dy: 1.45 }
  ];

  nodes.forEach((n, idx) => {
    const off = fanOffsets[idx % fanOffsets.length];
    const hw = n.cardW * cardScale * 0.5;
    const hh = n.cardH * cardScale * 0.5;
    n.worldX = n.pinX + off.dx * (hw * 0.78 + 16 * cardScale);
    n.worldY = n.pinY + off.dy * (hh + 20 * cardScale);
  });

  const pad = 6 * cardScale;
  for (let iter = 0; iter < 24; iter++) {
    // 1. Repel cards from each other
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const ahw = (a.cardW * cardScale) / 2 + pad;
      const ahh = (a.cardH * cardScale) / 2 + pad;

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const bhw = (b.cardW * cardScale) / 2 + pad;
        const bhh = (b.cardH * cardScale) / 2 + pad;

        const dx = b.worldX - a.worldX;
        const dy = b.worldY - a.worldY;
        const ox = ahw + bhw - Math.abs(dx);
        const oy = ahh + bhh - Math.abs(dy);

        if (ox > 0 && oy > 0) {
          if (ox < oy) {
            const sign = dx >= 0 ? 1 : -1;
            const push = ox * 0.55;
            a.worldX -= sign * push;
            b.worldX += sign * push;
          } else {
            const sign = dy >= 0 ? 1 : -1;
            const push = oy * 0.55;
            a.worldY -= sign * push;
            b.worldY += sign * push;
          }
        }
      }

      // 2. Repel from fixed city/shield boxes so labels never get hidden
      for (const obs of fixedObstacles) {
        const dx = a.worldX - obs.x;
        const dy = a.worldY - obs.y;
        const ox = ahw + obs.w * 0.5 - Math.abs(dx);
        const oy = ahh + obs.h * 0.5 - Math.abs(dy);
        if (ox > 0 && oy > 0) {
          if (ox < oy) {
            a.worldX += (dx >= 0 ? 1 : -1) * ox * 0.65;
          } else {
            a.worldY += (dy >= 0 ? 1 : -1) * oy * 0.65;
          }
        }
      }

      // 3. Push gently away from route sample circles so route lines stay uncovered
      for (const rd of routeDots) {
        const dx = a.worldX - rd.x;
        const dy = a.worldY - rd.y;
        const ox = ahw + rd.r - Math.abs(dx);
        const oy = ahh + rd.r - Math.abs(dy);
        if (ox > 0 && oy > 0) {
          if (ox < oy) {
            a.worldX += (dx >= 0 ? 1 : -1) * ox * 0.4;
          } else {
            a.worldY += (dy >= 0 ? 1 : -1) * oy * 0.4;
          }
        }
      }

      // 4. Gentle spring pull toward pin
      a.worldX += (a.pinX - a.worldX) * 0.035;
      a.worldY += (a.pinY - a.worldY) * 0.035;
    }
  }
}
