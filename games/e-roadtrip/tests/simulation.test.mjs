import assert from 'node:assert/strict';
import { createFixtures } from './fixtures.mjs';

export default function register(test, game) {
  const {
    getLevelById, getVehicleById, getChargerById, getEdgeById, getChargersForEdge,
    createDefaultPlan, getActiveRouteLegs, getMapChargerLegIndex, evaluateTripPlan,
    stopKey, isPendingStop, predictLiveTripSoc, plannedRoadStopsOnLeg, getMesseChargerForVisit,
    estimateMesseCharge, evaluateRun, findReachableAdditionalStop, getBestPriceForStation,
    computeSubscriptionTripCost, buildRemainingRoute, levelHasReturnRoutes, LEVELS, finalSocPenalty,
    evaluateStopSkip, getApproachingRoadStop, isSkippableRoadStop, SKIP_PROMPT_KM, SKIP_RESERVE_SOC_PCT
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
    skippedStopKeys: [],
    triggeredEventIds: []
  });

  test('Final SoC penalties use the unrounded end-of-run percentage and half-open tiers', () => {
    const cases = [[0, 0], [4.99, 0], [5, 50], [9.99, 50], [10, 75],
      [12, 75], [15, 100], [19.99, 100], [20, 150], [100, 150]];
    for (const [soc, points] of cases) assert.equal(finalSocPenalty(soc), points);

    const { mkRun } = createFixtures(game);
    for (const level of LEVELS) {
      const run = mkRun(level);
      run.socPct = 4.99;
      const base = evaluateRun(level, run, true).totalScore;
      for (const [socPct, points] of cases) {
        const result = evaluateRun(level, { ...run, socPct }, true);
        assert.equal(result.finalSocPct, socPct);
        assert.equal(result.finalSocPenalty, points);
        assert.equal(result.totalScore, Math.max(0, base - points));
      }
    }
    const poorRun = { ...mkRun(l2), elapsedMinutes: 2000, propertyDamageEur: 5000,
      stress: 100, peakStress: 100, energyUsedKwh: 200, collisionsCount: 10 };
    assert.equal(evaluateRun(l2, poorRun, false).totalScore, 0);
    assert.equal(evaluateRun(l2, poorRun, false).gameOver, false);
  });

  test('Road skips use the exact 10% arrival reserve at the next pending charger', () => {
    const { mkRun, near } = createFixtures(game);
    const run = mkRun(l1);
    const first = getChargerById('chg_herford_tesla');
    const second = getChargerById('chg_bad_oeynhausen_ewego');
    run.currentLegIndex = 3;
    run.legProgressKm = first.edgeProgress * getEdgeById(first.edgeId).distanceKm - 1;
    const stop = { legIndex: 3, chargerId: first.id, targetSocPct: 80 };
    run.plan.plannedStops = [stop, { legIndex: 3, chargerId: second.id, targetSocPct: 80 }];
    const skipStopKey = stopKey(stop.legIndex, stop.chargerId);
    const consumptionPct = -predictLiveTripSoc(l1, run, { skipStopKey, overrideSocPct: 0 }).exactArrivalNextSocPct;
    assert.equal(SKIP_RESERVE_SOC_PCT, 10);

    for (const [reserve, reason] of [[9.99, 'reserve'], [10, null]]) {
      run.socPct = consumptionPct + reserve;
      const result = evaluateStopSkip(l1, run, stop);
      near(result.projectedSocPct, reserve);
      assert.equal(result.allowed, reason === null);
      assert.equal(result.reason, reason);
      assert.equal(result.nextTargetName, second.name);
      assert.equal(predictLiveTripSoc(l1, run, { skipStopKey }).predictedArrivalNextSocPct, 10);
    }
    run.currentSpeedKmh = 80;
    assert.ok(evaluateStopSkip(l1, run, stop).projectedSocPct > SKIP_RESERVE_SOC_PCT);
    assert.deepEqual(run.skippedStopKeys, []);
  });

  test('Approaches are limited to the next road exit within 15 km on the active leg', () => {
    const { mkRun } = createFixtures(game);
    const run = mkRun(l1);
    run.currentLegIndex = 3;
    const road = getChargerById('chg_herford_tesla');
    const fair = getMesseChargerForVisit(getActiveRouteLegs(l1, run.plan)[3]);
    const stop = { legIndex: 3, chargerId: road.id, targetSocPct: 80 };
    const fairStop = { ...stop, chargerId: fair.id };
    run.plan.plannedStops = [{ ...stop, legIndex: 4 }, fairStop, stop];
    const exitKm = road.edgeProgress * getEdgeById(road.edgeId).distanceKm;
    assert.equal(SKIP_PROMPT_KM, 15);
    run.legProgressKm = exitKm - 15.01;
    assert.equal(getApproachingRoadStop(l1, run), undefined);
    run.legProgressKm = exitKm - 15;
    assert.equal(getApproachingRoadStop(l1, run).stop, stop);
    assert.equal(getApproachingRoadStop(l1, run).distanceKm, 15);
    assert.equal(evaluateStopSkip(l1, run, stop).nextTargetName, 'Hannover Messe');
    assert.equal(isSkippableRoadStop(l1, run, run.plan.plannedStops[0]), false);
    run.legProgressKm = fair.edgeProgress * getEdgeById(fair.edgeId).distanceKm - 1;
    assert.equal(evaluateStopSkip(l1, run, stop).reason, 'not-skippable');
    assert.equal(evaluateStopSkip(l1, run, fairStop).reason, 'not-skippable');
    assert.equal(getApproachingRoadStop(l1, run), undefined);

    const hotelRun = mkRun(l2);
    const legs = getActiveRouteLegs(l2, hotelRun.plan);
    hotelRun.currentLegIndex = legs.findIndex(leg => leg.overnightAtEnd);
    hotelRun.legProgressKm = getEdgeById(legs[hotelRun.currentLegIndex].edgeId).distanceKm - 1;
    assert.match(buildRemainingRoute(l2, hotelRun).destination, /^Übernachtung · /);
    assert.equal(getApproachingRoadStop(l2, hotelRun), undefined);
    assert.equal(evaluateStopSkip(l2, hotelRun, {
      legIndex: hotelRun.currentLegIndex, chargerId: 'evt_hotel_overnight', targetSocPct: 95
    }).reason, 'not-skippable');
  });

  test('Navigation shows the remaining roads to the Messe and follows the return direction afterward', () => {
    const run = baseRun(createDefaultPlan(l1, mg.id));
    const legs = getActiveRouteLegs(l1, run.plan);
    const route = buildRemainingRoute(l1, run);
    assert.equal(route.destination, 'Hannover Messe');
    assert.equal(route.segments.length, 4);
    assert.deepEqual(route.segments.map(segment => segment.highwayName),
      legs.slice(0, 4).map(leg => getEdgeById(leg.edgeId).highwayName));
    assert.equal(route.segments[0].remainingKm, getEdgeById(legs[0].edgeId).distanceKm - 5);
    assert.deepEqual(route.segments.map(segment => segment.current), [true, false, false, false]);
    assert.equal(route.remainingKm, route.segments.reduce((total, segment) => total + segment.remainingKm, 0));
    assert.ok(route.etaMinutes > 0);
    assert.ok(buildRemainingRoute(l1, { ...run, speedCapKmh: 60 }).etaMinutes > route.etaMinutes);
    const returning = buildRemainingRoute(l1, { ...run, currentLegIndex: 4, legProgressKm: 0 });
    assert.equal(returning.segments[0].from, 'Hannover Messe');
    assert.equal(returning.destination, 'Aachen');
    assert.equal(returning.segments.at(-1).to, 'Aachen');
  });

  test('Navigation cuts the last segment at the next pending charger in its driving direction', () => {
    const run = baseRun(createDefaultPlan(l1, mg.id));
    const herford = getChargerById('chg_herford_tesla');
    const legs = getActiveRouteLegs(l1, run.plan);
    const herfordIndex = legs.findIndex(leg => herford.edgeId === leg.edgeId);
    run.plan.plannedStops.push(
      { legIndex: herfordIndex, chargerId: herford.id, targetSocPct: 80 },
      { legIndex: 0, chargerId: tesla.id, targetSocPct: 80 },
      { legIndex: legs.length - 1, chargerId: tesla.id, targetSocPct: 80 }
    );
    run.legProgressKm = tesla.edgeProgress * getEdgeById(tesla.edgeId).distanceKm;
    assert.equal(buildRemainingRoute(l1, run).destination, tesla.name);
    assert.equal(buildRemainingRoute(l1, run).remainingKm, 0);
    run.completedStopKeys.push(stopKey(0, tesla.id));
    const route = buildRemainingRoute(l1, run);
    assert.equal(route.destination, herford.name);
    assert.equal(route.segments.length, herfordIndex + 1);
    assert.equal(route.segments.at(-1).remainingKm, herford.edgeProgress * getEdgeById(herford.edgeId).distanceKm);
    run.skippedStopKeys.push(stopKey(herfordIndex, herford.id));
    assert.equal(buildRemainingRoute(l1, run).destination, 'Hannover Messe');

    const reverse = buildRemainingRoute(l1, { ...run, currentLegIndex: legs.length - 1, legProgressKm: 2 });
    assert.equal(reverse.destination, tesla.name);
    assert.equal(reverse.remainingKm, (1 - tesla.edgeProgress) * getEdgeById(tesla.edgeId).distanceKm - 2);
  });

  test('Navigation switches from the overnight stop to Montpellier on a one-way route', () => {
    const run = baseRun(createDefaultPlan(l2, mg.id));
    const legs = getActiveRouteLegs(l2, run.plan);
    const overnightIndex = legs.findIndex(leg => leg.overnightAtEnd);
    const night = buildRemainingRoute(l2, run);
    assert.equal(night.destination, 'Übernachtung · Lyon');
    assert.equal(night.segments.length, overnightIndex + 1);
    run.currentLegIndex = overnightIndex;
    run.legProgressKm = getEdgeById(legs[overnightIndex].edgeId).distanceKm;
    run.triggeredEventIds.push(`evt_hotel_overnight@${overnightIndex}`);
    const morning = buildRemainingRoute(l2, run);
    assert.equal(morning.destination, 'Hôtel de la Plage · Palavas-les-Flots');
    assert.equal(morning.segments.length, 1);
    assert.equal(morning.segments[0].from, 'Lyon');
    assert.equal(predictLiveTripSoc(l2, { ...run, currentLegIndex: overnightIndex + 1, legProgressKm: 0 }).nextStopKind, 'destination');
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
    for (const [i, toll] of [75, 94, 103.5].entries()) {
      const l2Plan = createDefaultPlan(l2, mg.id, l2.routeOptions[i].id);
      const forecast = evaluateTripPlan(l2, l2Plan);
      const route = l2.routeOptions[i];
      const legs = getActiveRouteLegs(l2, l2Plan);
      assert.equal(levelHasReturnRoutes(l2), false);
      assert.equal(l2Plan.returnRouteId, '');
      assert.equal(legs.length, 4);
      assert.equal(legs.filter(leg => leg.overnightAtEnd).length, 1);
      assert.equal(legs.filter(leg => leg.destinationAtEnd).length, 1);
      assert.equal(getEdgeById(legs.at(-1).edgeId).toCityId, 'montpellier');
      assert(route.defaultPlannedStops.every(stop => stop.legIndex < legs.length));
      assert.equal(forecast.tollsEur, toll);
      assert.equal(forecast.estimatedTotalCostEur, toll);
      const l2Run = {
        ...baseRun(l2Plan),
        tollsEur: toll,
        chargingCostEur: 24,
        subscriptionCostEur: 3.5,
        incidentalCostEur: 5,
        propertyDamageEur: 800,
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
      assert.equal(evaluateRun(l2, l2Run, true).totalCostEur, toll + 926);
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
