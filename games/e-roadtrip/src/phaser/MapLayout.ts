import { ChargerNetwork, ChargerStation, HighwayEdge, LevelConfig, PlannedStop, TripPlan } from '../types';
import { getChargersForEdge, getEdgeById } from '../data/europeMap';
import { getVehicleById } from '../data/vehicles';
import { computeConsumptionKwh100 } from '../sim/EnergyModel';
import { congestedCruiseKmh, defaultLegSpeedKmh, drivenSpeedKmh, getActiveRouteLegs, sectionMaxSpeedKmh, snapSpeedKmh } from '../sim/RoutePlanner';

export interface BoxRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RouteSocBandSegment {
  points: Array<{ x: number; y: number }>;
  startSocPct: number;
  endSocPct: number;
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

export function getPolylineSliceAlongEdge(
  edge: HighwayEdge,
  startT: number,
  endT: number,
  reverse = false
): Array<{ x: number; y: number }> {
  const pts = reverse ? [...edge.waypoints].reverse() : edge.waypoints;
  if (pts.length < 2) return [];

  const t0 = Math.max(0, Math.min(1, startT));
  const t1 = Math.max(0, Math.min(1, endT));
  if (t1 <= t0 + 0.0005) return [];

  const cumLens: number[] = [0];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    total += Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
    cumLens.push(total);
  }
  if (total < 0.001) return [];

  const sampleAtDist = (dist: number): { x: number; y: number } => {
    for (let i = 0; i < pts.length - 1; i++) {
      if (dist <= cumLens[i + 1] || i === pts.length - 2) {
        const segLen = cumLens[i + 1] - cumLens[i];
        const u = segLen > 0 ? Math.max(0, Math.min(1, (dist - cumLens[i]) / segLen)) : 0;
        return {
          x: pts[i].x + (pts[i + 1].x - pts[i].x) * u,
          y: pts[i].y + (pts[i + 1].y - pts[i].y) * u
        };
      }
    }
    const last = pts[pts.length - 1];
    return { x: last.x, y: last.y };
  };

  const d0 = t0 * total;
  const d1 = t1 * total;
  const result: Array<{ x: number; y: number }> = [sampleAtDist(d0)];

  for (let i = 1; i < pts.length - 1; i++) {
    if (cumLens[i] > d0 + 0.5 && cumLens[i] < d1 - 0.5) {
      result.push({ x: pts[i].x, y: pts[i].y });
    }
  }

  result.push(sampleAtDist(d1));
  return result;
}

export function computeRouteSocBandSegments(
  level: LevelConfig,
  plan: TripPlan,
  upperSocPct = 20,
  lowerSocPct = 0,
  onlyLegIndex?: number
): RouteSocBandSegment[] {
  const legs = getActiveRouteLegs(level, plan);
  if (legs.length === 0) return [];

  const vehicle = getVehicleById(plan.vehicleId);
  let soc = 96; // Matches evaluateTripPlan initial SoC
  const segments: RouteSocBandSegment[] = [];
  let activeBand: RouteSocBandSegment | null = null;

  const appendSubSegment = (
    edge: HighwayEdge,
    reverse: boolean,
    p0: number,
    p1: number,
    cons100: number,
    record: boolean
  ): void => {
    const segKm = Math.max(0, (p1 - p0) * edge.distanceKm);
    const segKwh = (segKm / 100) * cons100;
    const socDrop = (segKwh / vehicle.batteryKwh) * 100;
    const nextSoc = soc - socDrop;

    if (record && socDrop > 0.001 && soc > lowerSocPct && nextSoc < upperSocPct) {
      const bandStartSoc = Math.min(soc, upperSocPct);
      const bandEndSoc = Math.max(nextSoc, lowerSocPct);
      const frac0 = (soc - bandStartSoc) / socDrop;
      const frac1 = (soc - bandEndSoc) / socDrop;
      const t0 = p0 + frac0 * (p1 - p0);
      const t1 = p0 + frac1 * (p1 - p0);
      const slice = getPolylineSliceAlongEdge(edge, t0, t1, reverse);

      if (slice.length >= 2) {
        if (activeBand && soc <= upperSocPct + 0.05) {
          const prevLast = activeBand.points[activeBand.points.length - 1];
          const first = slice[0];
          const startIdx = Math.hypot(first.x - prevLast.x, first.y - prevLast.y) < 1.5 ? 1 : 0;
          for (let k = startIdx; k < slice.length; k++) {
            activeBand.points.push(slice[k]);
          }
          activeBand.endSocPct = bandEndSoc;
        } else {
          activeBand = {
            points: slice,
            startSocPct: bandStartSoc,
            endSocPct: bandEndSoc
          };
          segments.push(activeBand);
        }
      }
    }

    soc = nextSoc;
    if (soc <= lowerSocPct) {
      activeBand = null;
    }
  };

  for (let i = 0; i < legs.length; i++) {
    if (soc <= lowerSocPct) break;
    const spec = legs[i];
    const edge = getEdgeById(spec.edgeId);
    const lp = plan.legPlans.find(x => x.legIndex === i);
    const weather = spec.weatherOverride || edge.defaultWeather;
    const chosenSpeed = snapSpeedKmh(
      lp ? lp.targetSpeedKmh : defaultLegSpeedKmh(edge, vehicle.maxSpeedKmh, weather),
      sectionMaxSpeedKmh(edge, vehicle.maxSpeedKmh, weather)
    );
    const speed = congestedCruiseKmh(drivenSpeedKmh(edge, weather, chosenSpeed), edge.baseTrafficRisk);
    const record = onlyLegIndex === undefined || i === onlyLegIndex;
    if (onlyLegIndex !== undefined) activeBand = null;
    const elevGain = spec.reverse ? edge.elevationLossM : edge.elevationGainM;
    const elevLoss = spec.reverse ? edge.elevationGainM : edge.elevationLossM;

    const cons100 = computeConsumptionKwh100(
      vehicle,
      speed,
      weather,
      elevGain,
      elevLoss,
      edge.distanceKm,
      level.trailerWeightKg || 0,
      !!plan.behindTruckMode
    );

    const stopsOnLeg = plan.plannedStops
      .filter(s => s.legIndex === i)
      .map(s => {
        const st = getChargersForEdge(edge.id).find(c => c.id === s.chargerId);
        if (!st) return null;
        const progressAlongRun = spec.reverse ? 1 - st.edgeProgress : st.edgeProgress;
        return { stop: s, station: st, progress: progressAlongRun };
      })
      .filter((x): x is { stop: PlannedStop; station: ChargerStation; progress: number } => x !== null)
      .sort((a, b) => a.progress - b.progress);

    let cursorProgress = 0;
    for (const item of stopsOnLeg) {
      appendSubSegment(edge, !!spec.reverse, cursorProgress, item.progress, cons100, record);
      if (soc <= lowerSocPct) break;
      activeBand = null;
      soc = Math.min(100, Math.max(soc + 2, item.stop.targetSocPct));
      cursorProgress = item.progress;
    }

    if (soc > lowerSocPct) {
      appendSubSegment(edge, !!spec.reverse, cursorProgress, 1, cons100, record);
    }
  }

  return segments;
}

export function resolveNonOverlappingCards(
  nodes: CardLayoutNode[],
  fixedObstacles: BoxRect[],
  routeDots: Array<{ x: number; y: number; r: number }>,
  cardScale: number
): void {
  if (nodes.length === 0) return;

  // Nearby pins (A4 rest stops sit a few pixels apart) start in a stack on
  // alternating sides so the repulsion pass only has to polish the gaps.
  const sorted = [...nodes].sort((a, b) => a.pinX - b.pinX || a.pinY - b.pinY);
  const clusters: CardLayoutNode[][] = [];
  sorted.forEach(n => {
    const last = clusters[clusters.length - 1];
    const head = last?.[last.length - 1];
    if (head && Math.hypot(head.pinX - n.pinX, head.pinY - n.pinY) < 56) last.push(n);
    else clusters.push([n]);
  });
  clusters.forEach(cluster => {
    cluster.forEach((n, i) => {
      const hw = n.cardW * cardScale * 0.5;
      const hh = n.cardH * cardScale * 0.5;
      const side = i % 2 === 0 ? -1 : 1;
      const row = Math.floor(i / 2);
      n.worldX = n.pinX + side * (hw * 0.72 + 20 * cardScale);
      n.worldY = n.pinY + side * (hh + 16 * cardScale) * (row + 0.35);
    });
  });

  const pad = 8 * cardScale;
  for (let iter = 0; iter < 36; iter++) {
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

      // 4. Gentle spring pull toward the pin, weak enough that a stack stays apart
      a.worldX += (a.pinX - a.worldX) * 0.018;
      a.worldY += (a.pinY - a.worldY) * 0.018;
    }
  }
}
