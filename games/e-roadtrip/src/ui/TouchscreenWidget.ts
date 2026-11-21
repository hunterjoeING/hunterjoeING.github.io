import { LevelConfig, RunState } from '../types';
import { CHARGERS } from '../data/europeMap';
import { getVehicleById } from '../data/vehicles';
import { getActiveRouteOption, predictLiveTripSoc } from '../sim/RoutePlanner';

export function renderVehicleTouchscreenHtml(
  level: LevelConfig,
  run: RunState,
  currentSocPct: number,
  stationId: string
): string {
  const vehicle = getVehicleById(run.plan.vehicleId);
  const activeRoute = getActiveRouteOption(level, run.plan);
  const livePred = predictLiveTripSoc(level, run, {
    overrideSocPct: currentSocPct,
    skipStationId: stationId
  });

  const cons100 = Math.max(9.5, livePred.consumptionKwh100);
  const nextDistKm = Math.max(10, livePred.distanceToNextKm);
  const scaleMaxKm = Math.max(nextDistKm * 1.38, 90);

  const kmAtSocFloor = (floorSoc: number): number => {
    if (currentSocPct <= floorSoc) return 0;
    const kwh = ((currentSocPct - floorSoc) / 100) * vehicle.batteryKwh;
    return (kwh / cons100) * 100;
  };

  const toPct = (km: number): number => Math.min(100, Math.max(0, (km / scaleMaxKm) * 100));

  const p25 = toPct(kmAtSocFloor(25));
  const p15 = toPct(kmAtSocFloor(15));
  const p10 = toPct(kmAtSocFloor(10));
  const p5 = toPct(kmAtSocFloor(5));
  const p0 = toPct(kmAtSocFloor(0));
  const stopPinPct = toPct(nextDistKm);

  const arrSoc = livePred.predictedArrivalNextSocPct;
  const arrClass =
    arrSoc >= 15
      ? 'ts-ok'
      : arrSoc >= 10
        ? 'ts-warn'
        : arrSoc >= 5
          ? 'ts-orange'
          : 'ts-danger';

  const remainingStops = run.plan.plannedStops
    .filter(
      s =>
        s.legIndex >= run.currentLegIndex &&
        s.chargerId !== stationId &&
        !run.completedStopIds.includes(s.chargerId) &&
        !run.skippedStopIds.includes(s.chargerId)
    )
    .slice(0, 3)
    .map(s => CHARGERS.find(c => c.id === s.chargerId)?.name || s.chargerId);

  return `
    <div class="er-vehicle-touchscreen" aria-label="Fahrzeug-Touchscreen">
      <div class="vts-topbar">
        <span class="vts-dot"></span>
        <strong>Bordcomputer · ${vehicle.brand} Navi</strong>
        <span class="vts-soc">${Math.round(currentSocPct)}% SoC</span>
      </div>

      <div class="vts-plan-row">
        <div><span>Route:</span> <b>${activeRoute.shortLabel}</b></div>
        <div><span>Nächster Halt:</span> <b>${livePred.nextStopName.slice(0, 22)} (${livePred.distanceToNextKm} km)</b></div>
      </div>

      <div class="vts-track-wrap">
        <div class="vts-track">
          <div class="vts-seg vts-comfort" style="left:0%;width:${p25.toFixed(1)}%"></div>
          <div class="vts-seg vts-green" style="left:${p25.toFixed(1)}%;width:${Math.max(0, p15 - p25).toFixed(1)}%" title="25–15% SoC"></div>
          <div class="vts-seg vts-yellow" style="left:${p15.toFixed(1)}%;width:${Math.max(0, p10 - p15).toFixed(1)}%" title="15–10% SoC"></div>
          <div class="vts-seg vts-orange" style="left:${p10.toFixed(1)}%;width:${Math.max(0, p5 - p10).toFixed(1)}%" title="10–5% SoC"></div>
          <div class="vts-seg vts-red" style="left:${p5.toFixed(1)}%;width:${Math.max(0, p0 - p5).toFixed(1)}%" title="5–0% SoC"></div>
          <div class="vts-stop-pin" style="left:${stopPinPct.toFixed(1)}%">
            <span class="vts-pin-head">📍</span>
          </div>
        </div>
        <div class="vts-track-labels">
          <span>⚡ Hier (0 km)</span>
          <span>${livePred.nextStopKind === 'destination' ? '🏁 Ziel' : '📍 Stopp'} (${livePred.distanceToNextKm} km)</span>
        </div>
      </div>

      <div class="vts-arrival-box ${arrClass}">
        <span>Ankunft ${livePred.nextStopName.slice(0, 18)}:</span>
        <strong>${arrSoc}% SoC</strong>
        ${livePred.nextStopKind !== 'destination' ? `<small>🏁 Ziel: ${livePred.predictedFinalSocPct}%</small>` : ''}
      </div>

      <div class="vts-stops-mini">
        <span>Plan:</span> ${remainingStops.length > 0 ? remainingStops.join(' → ') : 'Direkt zum Ziel'}
      </div>
    </div>
  `;
}
