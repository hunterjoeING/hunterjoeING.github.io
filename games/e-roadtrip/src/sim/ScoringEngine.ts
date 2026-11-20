import { EvaluationResult, LevelConfig, RunState } from '../types';
import { getVehicleById } from '../data/vehicles';

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function evaluateRun(
  level: LevelConfig,
  run: RunState,
  cleanParkBonus: boolean
): EvaluationResult {
  const w = level.scoringWeights;
  const vehicle = getVehicleById(run.plan.vehicleId);

  // 1. Time performance (0..100)
  const timeDelta = run.elapsedMinutes - level.targetArrivalMinutes;
  const timeScore = clamp(
    timeDelta <= 0 ? 100 - Math.max(0, -timeDelta * 0.05) : 100 - timeDelta * 1.15,
    12,
    100
  );

  // 2. Total costs (0..100) - baseline reasonable cost ~ 0.085 €/km
  const totalCostEur = Number(
    (run.chargingCostEur + run.subscriptionCostEur + run.tollsAndFinesEur).toFixed(2)
  );
  const benchmarkCost = Math.max(30, run.distanceDrivenKm * 0.082);
  const costRatio = totalCostEur / benchmarkCost;
  const costScore = clamp(115 - costRatio * 34, 15, 100);

  // 3. Passenger stress (especially peaks!) (0..100)
  const stressPenalty = run.peakStress * 0.65 + run.stress * 0.35;
  const stressScore = w.stress === 0 ? 100 : clamp(108 - stressPenalty * 1.05, 10, 100);

  // 4. Vehicle efficiency & charging curve usage (0..100)
  const avgConsumption = (run.energyUsedKwh / Math.max(1, run.distanceDrivenKm)) * 100;
  const efficiencyRatio = avgConsumption / vehicle.baseConsumption100;
  const effBase = clamp(128 - efficiencyRatio * 34 + run.chargingEfficiencyBonus, 15, 100);

  // 5. Dynamic decisions, flexibility & clean arrival (0..100)
  const collisionPenalty = run.collisionsCount * 14;
  const parkBonus = cleanParkBonus ? 12 : 0;
  const decisionsScore = clamp(
    56 + run.decisionScoreAccum + run.goodReplanCount * 8 + parkBonus - collisionPenalty,
    10,
    100
  );

  const weighted =
    timeScore * w.time +
    costScore * w.cost +
    stressScore * w.stress +
    effBase * w.efficiency +
    decisionsScore * w.decisions;

  const totalScore = Math.round(clamp(weighted * 10, 100, 1000));

  const prizeMultiplier = 0.55 + (totalScore / 1000) * 0.95;
  const prizeMoneyEur = Math.round(level.rewardBaseEur * prizeMultiplier);

  let gradeLabel = 'Solide E-Fahrt';
  if (totalScore >= 880) gradeLabel = 'S-Rang · Langstrecken-Meister!';
  else if (totalScore >= 760) gradeLabel = 'A-Rang · Souverän geplant';
  else if (totalScore >= 620) gradeLabel = 'B-Rang · Sicher angekommen';
  else if (totalScore < 480) gradeLabel = 'C-Rang · Nervenaufreibend';

  return {
    totalScore,
    subScores: {
      time: Math.round(timeScore),
      cost: Math.round(costScore),
      stress: Math.round(stressScore),
      efficiency: Math.round(effBase),
      decisions: Math.round(decisionsScore)
    },
    weights: { ...w },
    totalMinutes: Math.round(run.elapsedMinutes),
    targetMinutes: level.targetArrivalMinutes,
    totalCostEur,
    avgConsumptionKwh100: Number(avgConsumption.toFixed(1)),
    peakStress: Math.round(run.peakStress),
    prizeMoneyEur,
    cleanArrival: cleanParkBonus && run.collisionsCount === 0,
    gradeLabel
  };
}
