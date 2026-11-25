import assert from 'node:assert/strict';

export default function register(test, game) {
  const {
    getLevelById, getVehicleById, getChargerById, getEdgeById, getChargersForEdge,
    createDefaultPlan, getActiveRouteLegs, getMapChargerLegIndex, evaluateTripPlan,
    stopKey, isPendingStop, predictLiveTripSoc, plannedRoadStopsOnLeg, getMesseChargerForVisit,
    estimateMesseCharge, evaluateRun, findReachableAdditionalStop, getBestPriceForStation,
    computeSubscriptionTripCost
  } = game;
  const l1 = getLevelById('level_1_aachen_hannover');
  const l2 = getLevelById('level_2_family_summer');
  const mg = getVehicleById('mg4_standard');
  const tesla = getChargerById('chg_eschweiler_tesla');
  const baseRun = (plan2) => ({
    plan: plan2,
    currentLegIndex: 0,
    legProgressKm: 5,
    socPct: 85,
    activeWeather: 'clear',
    currentSpeedKmh: 110,
    completedStopKeys: [],
    skippedStopKeys: []
  });

  test('Eschweiler stops are independent in the map and live forecast', () => {
    const plan = createDefaultPlan(l1, mg.id);
    const legs = getActiveRouteLegs(l1, plan);
    plan.plannedStops.push({ legIndex: 0, chargerId: tesla.id, targetSocPct: 82 });
    plan.plannedStops.push({ legIndex: 7, chargerId: tesla.id, targetSocPct: 93 });
    assert.equal(getMapChargerLegIndex(tesla, legs, 0), 0);
    assert.equal(getMapChargerLegIndex(tesla, legs, 7), 7);
    assert.equal(evaluateTripPlan(l1, plan).legForecasts[7].stopSummaries[0].station.id, tesla.id);
    const run = baseRun(plan);
    run.completedStopKeys.push(stopKey(0, tesla.id));
    run.skippedStopKeys.push(stopKey(0, tesla.id));
    run.currentLegIndex = 7;
    assert(isPendingStop(run, plan.plannedStops[1]));
    assert.equal(predictLiveTripSoc(l1, run, { skipStopKey: stopKey(0, tesla.id) }).nextStopName, tesla.name);
    assert.notEqual(predictLiveTripSoc(l1, run, { skipStopKey: stopKey(7, tesla.id) }).nextStopName, tesla.name);
    assert.equal(plannedRoadStopsOnLeg(plan, legs[7], 7)[0].station.id, tesla.id);
  });

  test('Messe AC uses the visit window and forecasts an occupied park', () => {
    const legs = getActiveRouteLegs(l1, createDefaultPlan(l1, mg.id));
    for (const route of l1.routeOptions) {
      const trip = createDefaultPlan(l1, mg.id, route.id);
      const specs = getActiveRouteLegs(l1, trip);
      const fairLeg = specs.findIndex((spec) => spec.citySegmentAtEnd === 'hannover_messe');
      const returnLeg = specs.findIndex((spec) => spec.reverse && spec.edgeId === specs[fairLeg].edgeId);
      const fair = getMesseChargerForVisit(specs[fairLeg]);
      assert(fair);
      assert.equal(getMesseChargerForVisit(specs[returnLeg]), undefined);
      assert.equal(getMapChargerLegIndex(fair, specs, returnLeg), -1);
      const before = evaluateTripPlan(l1, trip);
      trip.plannedStops.push({ legIndex: returnLeg, chargerId: fair.id, targetSocPct: 100 });
      assert.deepEqual(evaluateTripPlan(l1, trip), before);
      const session = estimateMesseCharge(mg, fair, 20, 100, []);
      assert.equal(session.durationMinutes, 210);
      assert.equal(session.departSoc.toFixed(1), '68.2');
      assert.equal(estimateMesseCharge(mg, fair, 90.15, 80, []).departSoc, 90.15);
      assert.equal(estimateMesseCharge(mg, fair, 20, 30, []).departSoc, 30);
      assert.equal(estimateMesseCharge(mg, fair, 99.8, 100, []).departSoc, 100);
    }
    const messePlan = createDefaultPlan(l1, mg.id);
    messePlan.plannedStops = [
      { legIndex: 3, chargerId: 'chg_herford_tesla', targetSocPct: 80 },
      { legIndex: 3, chargerId: 'chg_messe_ac_a2', targetSocPct: 100 }
    ];
    const messeForecast = evaluateTripPlan(l1, messePlan);
    const visit = messeForecast.legForecasts[3].stopSummaries.find((summary) => summary.station.fairStay);
    assert.equal(visit.blockedDepartSoc, visit.arriveSoc);
    assert(visit.departSoc > visit.arriveSoc);
    assert(messeForecast.withoutMesseCharge);
    const noAC = evaluateTripPlan(l1, { ...messePlan, plannedStops: messePlan.plannedStops.slice(0, 1) });
    assert.equal(messeForecast.totalMinutes, noAC.totalMinutes);
    assert(messeForecast.estimatedChargingCostEur > noAC.estimatedChargingCostEur);
    const fairRun = baseRun(messePlan);
    fairRun.currentLegIndex = 3;
    fairRun.legProgressKm = getEdgeById(legs[3].edgeId).distanceKm;
    fairRun.socPct = 20;
    const live = predictLiveTripSoc(l1, fairRun);
    assert(live.predictedFinalSocPct > live.predictedFinalSocWithoutMessePct);
    fairRun.completedStopKeys.push(stopKey(3, 'chg_messe_ac_a2'));
    const after = predictLiveTripSoc(l1, fairRun);
    assert.equal(after.predictedFinalSocWithoutMessePct, undefined);
    assert.equal(after.predictedFinalSocPct, live.predictedFinalSocWithoutMessePct);
  });

  test('Level 2 tolls are included in the forecast and score', () => {
    for (const [i, toll] of [150, 188, 207].entries()) {
      const l2Plan = createDefaultPlan(l2, mg.id, l2.routeOptions[i].id);
      const forecast = evaluateTripPlan(l2, l2Plan);
      assert.equal(forecast.tollsEur, toll);
      assert.equal(forecast.estimatedTotalCostEur, toll);
      const l2Run = {
        ...baseRun(l2Plan),
        tollsEur: toll,
        chargingCostEur: 24,
        subscriptionCostEur: 3.5,
        incidentalCostEur: 5,
        lodgingCostEur: 89,
        pauseCostEur: 4.5,
        distanceDrivenKm: forecast.totalDistanceKm,
        elapsedMinutes: 2000,
        energyUsedKwh: 100,
        peakStress: 0,
        incidentLog: [],
        decisionScoreAccum: 0,
        goodReplanCount: 0,
        chargingEfficiencyBonus: 0,
        collisionsCount: 0
      };
      assert.equal(evaluateRun(l2, l2Run, true).totalCostEur, toll + 126);
    }
  });

  test('Replanning picks a reachable additional road charger', () => {
    const replan = createDefaultPlan(l1, mg.id);
    const earlyRun = baseRun(replan);
    const first = findReachableAdditionalStop(l1, earlyRun);
    assert.equal(first.station.id, tesla.id);
    replan.plannedStops.push({ legIndex: first.legIndex, chargerId: first.station.id, targetSocPct: 80 });
    const second = findReachableAdditionalStop(l1, earlyRun);
    assert.notEqual(second.station.id, first.station.id);
    earlyRun.skippedStopKeys.push(stopKey(second.legIndex, second.station.id));
    const third = findReachableAdditionalStop(l1, earlyRun);
    assert.notEqual(third.station.id, second.station.id);
    earlyRun.socPct = 0.2;
    assert.equal(findReachableAdditionalStop(l1, earlyRun), null);
    const noFairRun = baseRun(createDefaultPlan(l1, mg.id));
    noFairRun.currentLegIndex = 3;
    const fairEdge = getEdgeById(getActiveRouteLegs(l1, noFairRun.plan)[3].edgeId);
    const lastRoadProgress = Math.max(...getChargersForEdge(fairEdge.id).filter((st) => !st.fairStay).map((st) => st.edgeProgress));
    noFairRun.legProgressKm = (lastRoadProgress + 1e-3) * fairEdge.distanceKm;
    const auto = findReachableAdditionalStop(l1, noFairRun);
    assert(auto.legIndex > 3 && !auto.station.fairStay);
  });

  test('Tesla vehicle tariffs and explicit Supercharger Pass costs', () => {
    assert.equal(getBestPriceForStation(tesla, [], getVehicleById('tesla_model_s_2015')).pricePerKwh, 0);
    assert.equal(getBestPriceForStation(tesla, [], getVehicleById('tesla_model_3_highland')).pricePerKwh, 0.39);
    assert.equal(getBestPriceForStation(tesla, ['tesla_suc'], mg).pricePerKwh, 0.41);
    assert.equal(computeSubscriptionTripCost([], mg), 0);
    assert.equal(computeSubscriptionTripCost(['tesla_suc'], mg), 3.5);
  });
}
