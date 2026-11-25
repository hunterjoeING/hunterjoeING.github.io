import * as Phaser from 'phaser';
import {
  CampaignSave,
  ChargerNetwork,
  ChargerStation,
  CityDrivePreset,
  CollisionInfo,
  EventChoice,
  LevelConfig,
  PoliceViolationKind,
  ProviderFilterMap,
  RunState,
  TripPlan,
  WeatherKind,
  WifeDialogueChoice
} from './types';
import { getLevelById } from './data/levels';
import { getVehicleById } from './data/vehicles';
import { CHARGERS, getChargerById, getCityById, getEdgeById } from './data/europeMap';
import { buildSpeedTrapEvent, buildTailgateEvent, getEventById, getWifeDialogueById, randomMesseReport } from './data/events';
import { computeSubscriptionTripCost } from './sim/EnergyModel';
import { applyPause } from './sim/PauseEffects';
import {
  CITY_TRANSITION_MINUTES,
  createDefaultPlan,
  estimateHotelCharge,
  estimateMesseCharge,
  evaluateTripPlan,
  findReachableAdditionalStop,
  getActiveRouteLegs,
  getMesseChargerForVisit,
  isPendingStop,
  isStationOnLeg,
  MESSE_VISIT_MINUTES,
  NO_REACHABLE_CHARGER,
  predictLiveTripSoc,
  snapSpeedKmh,
  stopKey,
  switchReturnRouteInPlan,
  switchRouteInPlan
} from './sim/RoutePlanner';
import { evaluateRun } from './sim/ScoringEngine';
import { getResaleValue, loadCampaignSave, resetCampaignSave, saveCampaignState } from './sim/SaveState';
import { BootScene } from './phaser/BootScene';
import { EuropeMapScene } from './phaser/EuropeMapScene';
import { AutobahnScene } from './phaser/AutobahnScene';
import { CityDriveScene } from './phaser/CityDriveScene';
import { ERoadtripBridge, TouchInput, resetTouchInput, touchPointerCount } from './phaser/GameBridge';
import { PlanningUI } from './ui/PlanningUI';
import { DrivingHUD } from './ui/DrivingHUD';
import { ChargingCompletePayload, EventModal } from './ui/EventModal';
import { ResultsUI } from './ui/ResultsUI';
import { SoundFX } from './phaser/SoundFX';

function formatClock(level: LevelConfig, elapsedMin: number): string {
  const total = Math.round(level.departureTimeHour * 60 + elapsedMin);
  const hh = String(Math.floor(total / 60) % 24).padStart(2, '0');
  const mm = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

function createDefaultProviderFilter(): ProviderFilterMap {
  return {
    tesla: true,
    enbw: true,
    ewego: true,
    electra: true,
    ionity: true,
    ac_village: true,
    fastned: true,
    totalenergies: true,
    ac_dorfladen: true,
    atlante: true,
    vianeo: true
  };
}

class ERoadtripController {
  private save: CampaignSave;
  private level: LevelConfig;
  private plan: TripPlan;
  private game!: Phaser.Game;
  private bridge: ERoadtripBridge;

  private plannerEl: HTMLElement;
  private planningUI: PlanningUI;
  private pendingFollowUp: { eventId: string; chance: number } | null = null;
  private drivingHUD: DrivingHUD;
  private eventModal: EventModal;
  private resultsUI: ResultsUI;
  private stageWrapEl: HTMLElement;

  constructor() {
    this.save = loadCampaignSave();
    this.level = getLevelById('level_1_aachen_hannover');
    const startCarId = this.save.ownedVehicleId || 'mg4_standard';
    this.plan = createDefaultPlan(this.level, startCarId);

    this.stageWrapEl = document.getElementById('er-workspace')!;
    this.plannerEl = document.getElementById('er-planner-panel')!;
    const hudEl = document.getElementById('er-driving-hud')!;
    const touchEl = document.getElementById('er-touch-controls')!;
    const modalEl = document.getElementById('er-modal-overlay')!;
    const resultsEl = document.getElementById('er-results-overlay')!;

    this.eventModal = new EventModal(modalEl);

    this.bridge = {
      level: this.level,
      plan: this.plan,
      runState: null,
      selectedLegIndex: 0,
      providerFilter: createDefaultProviderFilter(),
      showChargerStations: true,
      timeScale: 5,
      paused: false,
      touch: TouchInput,
      isLightTheme: () => document.documentElement.getAttribute('data-theme') !== 'dark',

      onBootReady: () => {
        this.renderPlanning();
        this.maybeStartPreview();
      },

      onMapSelectCharger: (station: ChargerStation, legIndex: number) => {
        this.toggleChargerInPlan(station, legIndex);
      },

      onMapSelectRoute: (routeId: string) => {
        this.selectRoute(routeId);
      },

      onMapSelectLeg: (legIndex: number) => {
        this.selectLeg(legIndex);
      },

      onAutobahnHudTick: (run: RunState) => {
        this.drivingHUD.update(this.level, run, this.bridge.timeScale);
      },

      onTriggerChargerSegment: (station: ChargerStation) => {
        this.enterChargerSegment(station);
      },

      onTriggerCitySegment: (preset: CityDrivePreset) => {
        this.enterCitySegment(preset);
      },

      onCitySegmentComplete: (preset, cleanArrival) => {
        this.handleCitySegmentComplete(preset, cleanArrival);
      },

      onDynamicEventTrigger: (eventId: string) => {
        this.handleDynamicEvent(eventId);
      },

      onWifeDialogueTrigger: (dialogueId: string) => {
        this.handleWifeDialogue(dialogueId);
      },

      onCollisionEvent: (info: CollisionInfo) => {
        this.handleCollision(info);
      },

      onPoliceViolation: (kind: PoliceViolationKind) => {
        this.handlePoliceViolation(kind);
      },

      onBatteryDepleted: () => {
        this.handleBatteryDepleted();
      }
    };

    this.planningUI = new PlanningUI(this.plannerEl, {
      onPlanChanged: () => {
        this.renderPlanning();
      },
      onSelectRoute: (routeId: string) => {
        this.selectRoute(routeId);
      },
      onSelectReturnRoute: (routeId: string) => {
        this.selectReturnRoute(routeId);
      },
      onSelectLeg: (legIndex: number) => {
        this.selectLeg(legIndex);
      },
      onToggleProviderFilter: (network: ChargerNetwork) => {
        this.bridge.providerFilter[network] = !this.bridge.providerFilter[network];
        this.renderPlanning();
      },
      onToggleShowChargers: () => {
        this.bridge.showChargerStations = !this.bridge.showChargerStations;
        this.renderPlanning();
      },
      onResetProviderFilter: () => {
        this.bridge.providerFilter = createDefaultProviderFilter();
        this.renderPlanning();
      },
      onStartTrip: () => this.startTrip(),
      onSelectLevel: (levelId: string) => {
        this.returnToPlanning(levelId);
      },
      onZoomIn: () => {
        const s = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
        s?.zoomBy(1.25);
      },
      onZoomOut: () => {
        const s = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
        s?.zoomBy(0.8);
      },
      onZoomRoute: () => {
        const s = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
        s?.fitCameraToRoute();
      },
      onZoomEurope: () => {
        const s = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
        s?.zoomFullEurope();
      }
    });

    if (new URLSearchParams(window.location.search).has('erpreview')) {
      const debugWindow = window as Window & { __erRun?: () => RunState | null };
      debugWindow.__erRun = () => this.bridge.runState;
    }

    this.drivingHUD = new DrivingHUD(hudEl, touchEl, {
      onSpeedChange: (spd: number) => {
        const run = this.bridge.runState;
        if (!run) return;
        const legs = getActiveRouteLegs(this.level, run.plan);
        if (!legs[run.currentLegIndex]) return;
        const vehicle = getVehicleById(run.plan.vehicleId);
        const next = snapSpeedKmh(spd, vehicle.maxSpeedKmh);
        const lp = run.plan.legPlans.find(x => x.legIndex === run.currentLegIndex);
        if (lp) lp.targetSpeedKmh = next;
        else run.plan.legPlans.push({ legIndex: run.currentLegIndex, targetSpeedKmh: next });
        this.drivingHUD.update(this.level, run, this.bridge.timeScale);
      },
      onTimeScaleChange: (scale: number) => {
        this.bridge.timeScale = scale;
        if (this.bridge.runState) {
          this.drivingHUD.update(this.level, this.bridge.runState, this.bridge.timeScale);
        }
      },
      onForceEarlierStop: () => {
        this.forceEarlierChargeStop();
      },
      onUnplannedToiletStop: () => {
        const run = this.bridge.runState;
        if (!run) return;
        applyPause(run, { minutes: 8, resetBladder: true, stressDelta: -14 });
        run.incidentLog.push({
          timeStr: formatClock(this.level, run.elapsedMinutes),
          title: 'Ungeplanter WC-Stopp',
          detail: '+8 Min · Harndrang 0 % · Stress -14 %',
          impact: 'positive'
        });
        this.drivingHUD.update(this.level, run, this.bridge.timeScale);
      },
      onToggleMapPreview: () => {
        this.openLiveMapPeek();
      },
      onTailgate: () => {
        const run = this.bridge.runState;
        if (run?.tailgateReady && !this.bridge.paused) run.tailgatePulse = true;
      }
    });

    this.resultsUI = new ResultsUI(resultsEl, {
      onKeepCarAndReplay: (nextLevelId: string) => {
        this.returnToPlanning(nextLevelId);
      },
      onSellAndBuyCar: (newCarId: string, nextLevelId: string) => {
        if (this.save.ownedVehicleId) {
          this.save.cashEur += getResaleValue(this.save.ownedVehicleId);
        }
        const nextCar = getVehicleById(newCarId);
        if (this.save.cashEur >= nextCar.priceEur) {
          this.save.cashEur -= nextCar.priceEur;
          this.save.ownedVehicleId = newCarId;
          saveCampaignState(this.save);
        }
        this.returnToPlanning(nextLevelId);
      }
    });

    this.bindTopbarButtons();
    this.bootPhaser();
  }

  private bindTopbarButtons(): void {
    const touchBtn = document.getElementById('btn-toggle-touch');
    if (touchBtn) {
      touchBtn.textContent = this.drivingHUD.isTouchVisible() ? '🎮 Touch: AN' : '🎮 Touch: AUS';
      touchBtn.addEventListener('click', () => {
        SoundFX.click();
        const on = this.drivingHUD.toggleTouchOverlay();
        touchBtn.textContent = on ? '🎮 Touch: AN' : '🎮 Touch: AUS';
      });
    }

    document.getElementById('btn-reset-campaign')?.addEventListener('click', () => {
      SoundFX.click();
      this.save = resetCampaignSave();
      this.eventModal.close();
      this.resultsUI.hide();
      this.returnToPlanning(this.level.id);
    });

    document.getElementById('map-btn-zoom-in')?.addEventListener('click', () => {
      SoundFX.click();
      const s = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
      s?.zoomBy(1.28);
    });
    document.getElementById('map-btn-zoom-out')?.addEventListener('click', () => {
      SoundFX.click();
      const s = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
      s?.zoomBy(0.78);
    });
    document.getElementById('map-btn-fit')?.addEventListener('click', () => {
      SoundFX.click();
      const s = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
      s?.fitCameraToRoute();
    });
    document.getElementById('map-btn-europe')?.addEventListener('click', () => {
      SoundFX.click();
      const s = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
      s?.zoomFullEurope();
    });
  }

  private bootPhaser(): void {
    const parent = document.getElementById('phaser-stage')!;
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent,
      width: parent.clientWidth || 720,
      height: parent.clientHeight || 520,
      backgroundColor: '#0c1e38',
      pixelArt: false,
      antialias: true,
      roundPixels: false,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false
        }
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: [BootScene, EuropeMapScene, AutobahnScene, CityDriveScene]
    };

    this.game = new Phaser.Game(config);
    if (typeof ResizeObserver !== 'undefined') {
      const stageObserver = new ResizeObserver(() => this.game.scale.refresh());
      stageObserver.observe(parent);
      this.game.events.once(Phaser.Core.Events.DESTROY, () => stageObserver.disconnect());
    }
    this.game.scene.start('BootScene', { bridge: this.bridge });
  }

  private renderPlanning(): void {
    const forecast = evaluateTripPlan(this.level, this.plan);
    const mapScene = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
    if (mapScene?.scene.isActive()) mapScene.refreshDynamicState(forecast);

    this.planningUI.render(
      this.level,
      this.plan,
      this.save,
      forecast,
      this.bridge.selectedLegIndex,
      this.bridge.providerFilter,
      this.bridge.showChargerStations
    );
  }

  private selectRoute(routeId: string): void {
    switchRouteInPlan(this.level, this.plan, routeId);
    this.bridge.plan = this.plan;
    this.bridge.selectedLegIndex = 0;
    this.renderPlanning();
    const mapScene = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
    mapScene?.fitCameraToRoute();
  }

  private selectReturnRoute(routeId: string): void {
    switchReturnRouteInPlan(this.level, this.plan, routeId);
    this.bridge.plan = this.plan;
    const legs = getActiveRouteLegs(this.level, this.plan);
    const firstReturn = legs.findIndex(leg => !!leg.reverse);
    this.bridge.selectedLegIndex = firstReturn >= 0 ? firstReturn : 0;
    this.renderPlanning();
    const mapScene = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
    mapScene?.fitCameraToRoute();
  }

  private selectLeg(legIndex: number): void {
    const activeLegs = getActiveRouteLegs(this.level, this.plan);
    const clamped = Math.max(0, Math.min(activeLegs.length - 1, legIndex));
    this.bridge.selectedLegIndex = clamped;
    this.renderPlanning();
  }

  private toggleChargerInPlan(station: ChargerStation, legIndex: number): void {
    const leg = getActiveRouteLegs(this.level, this.plan)[legIndex];
    if (!isStationOnLeg(station, leg)) return;

    const existingStop = this.plan.plannedStops.findIndex(s => s.chargerId === station.id && s.legIndex === legIndex);
    if (existingStop >= 0) {
      this.plan.plannedStops.splice(existingStop, 1);
    } else {
      this.plan.plannedStops.push({ chargerId: station.id, legIndex, targetSocPct: 80 });
    }
    this.renderPlanning();
  }

  private startTrip(): void {
    const vehicle = getVehicleById(this.plan.vehicleId);
    if (this.save.ownedVehicleId !== vehicle.id) {
      if (this.save.cashEur < vehicle.priceEur) return;
      if (this.save.ownedVehicleId) {
        this.save.cashEur += getResaleValue(this.save.ownedVehicleId);
      }
      this.save.cashEur -= vehicle.priceEur;
      this.save.ownedVehicleId = vehicle.id;
      saveCampaignState(this.save);
    }

    const subCost = computeSubscriptionTripCost(this.plan.subscriptionIds, vehicle);
    const clonedPlan: TripPlan = JSON.parse(JSON.stringify(this.plan));

    this.bridge.plan = clonedPlan;
    this.bridge.paused = false;
    resetTouchInput();
    this.bridge.runState = {
      levelId: this.level.id,
      plan: clonedPlan,
      currentLegIndex: 0,
      legProgressKm: 0,
      socPct: 96,
      elapsedMinutes: 0,
      stress: this.level.passengers.initialStress,
      peakStress: this.level.passengers.initialStress,
      bladderNeed: 10,
      hungerNeed: 22,
      energyUsedKwh: 0,
      distanceDrivenKm: 0,
      chargingCostEur: 0,
      subscriptionCostEur: subCost,
      tollsEur: 0,
      paidTollLegIndices: [],
      incidentalCostEur: 0,
      pauseCostEur: 0,
      lodgingCostEur: 0,
      decisionScoreAccum: 0,
      replanCount: 0,
      goodReplanCount: 0,
      chargingEfficiencyBonus: 0,
      collisionsCount: 0,
      completedStopKeys: [],
      skippedStopKeys: [],
      triggeredEventIds: [],
      wifeDialogueTriggered: false,
      incidentLog: [],
      activeWeather: 'clear',
      currentSpeedKmh: clonedPlan.legPlans[0]?.targetSpeedKmh || 130,
      isNight: false
    };

    this.stageWrapEl.classList.add('driving-active');
    this.plannerEl.classList.add('hidden');
    window.requestAnimationFrame(() => this.game.scale.refresh());
    this.enterCitySegment('aachen_start');
  }

  private stopAllGameplayScenes(): void {
    ['EuropeMapScene', 'AutobahnScene', 'CityDriveScene'].forEach(k => {
      const sc = this.game.scene.getScene(k);
      if (
        sc &&
        (sc.scene.isActive() || sc.scene.isPaused() || sc.scene.isSleeping() || sc.scene.isVisible())
      ) {
        this.game.scene.stop(k);
      }
    });
  }

  private enterCitySegment(preset: CityDrivePreset, chargerId?: string, previewFx = false): void {
    this.stopAllGameplayScenes();
    resetTouchInput();
    this.bridge.paused = false;
    this.drivingHUD.setMode('city');
    const titleMap: Record<CityDrivePreset, string> = {
      aachen_start: 'Aachen Innenstadt → A4 Auffahrt',
      charger_park: `Ladepark Einfahrt (Rückwärts einparken!)`,
      hannover_messe: 'Hannover Messe → E-Parkplatz',
      aachen_finish: 'Aachen Ausfahrt → Ziel-Parkplatz',
      ferry_denmark: 'Hirtshals Fährhafen',
      koeln_ring: 'Köln-Ring → A1'
    };
    if (this.bridge.runState) {
      this.drivingHUD.update(this.level, this.bridge.runState, this.bridge.timeScale, titleMap[preset]);
    }
    this.game.scene.start('CityDriveScene', {
      bridge: this.bridge,
      preset,
      chargerId,
      previewFx
    });
  }

  private enterChargerSegment(station: ChargerStation): void {
    const run = this.bridge.runState;
    if (!run) return;
    run.activeCityChargerId = station.id;
    this.enterCitySegment('charger_park', station.id);
  }

  private enterAutobahn(preview?: {
    previewWeather?: WeatherKind;
    previewRisk?: number;
    forceWorkZone?: boolean;
  }): void {
    this.stopAllGameplayScenes();
    resetTouchInput();
    this.bridge.paused = false;
    this.drivingHUD.setMode('autobahn');
    if (this.bridge.runState) {
      this.bridge.runState.tailgateReady = false;
      this.bridge.runState.tailgatePulse = false;
      this.drivingHUD.update(this.level, this.bridge.runState, this.bridge.timeScale);
    }
    this.game.scene.start('AutobahnScene', { bridge: this.bridge, ...(preview || {}) });
  }

  private handleCitySegmentComplete(preset: CityDrivePreset, cleanArrival: boolean): void {
    const run = this.bridge.runState;
    if (!run) return;

    if (preset === 'aachen_start') {
      run.elapsedMinutes += CITY_TRANSITION_MINUTES.aachen_start ?? 0;
      run.incidentLog.push({
        timeStr: formatClock(this.level, run.elapsedMinutes),
        title: 'Aachen Stadt-Ausfahrt → A4',
        detail: cleanArrival ? 'Sauber auf die A4 aufgefahren!' : 'Mit Zwischenfall auf die A4.',
        impact: cleanArrival ? 'positive' : 'negative'
      });
      this.enterAutobahn();
      return;
    }

    if (preset === 'charger_park') {
      const stationId = run.activeCityChargerId;
      const station = stationId ? CHARGERS.find(c => c.id === stationId) : undefined;
      if (!station) {
        this.enterAutobahn();
        return;
      }

      const visitKey = stopKey(run.currentLegIndex, station.id);
      const startChargingFlow = () => {
        const stopPlan = run.plan.plannedStops.find(
          s => s.chargerId === station.id && s.legIndex === run.currentLegIndex
        );
        const targetSoc = stopPlan ? stopPlan.targetSocPct : 80;
        const arriveSoc = run.socPct;
        this.bridge.paused = true;
        this.drivingHUD.clearTouchStates();

        this.eventModal.showChargingSession(
          station,
          this.level,
          run,
          targetSoc,
          (payload: ChargingCompletePayload) => {
            run.completedStopKeys.push(visitKey);
            run.socPct = payload.newSoc;
            run.chargingCostEur += payload.chargingCostEur;
            for (const activity of payload.activities) applyPause(run, activity);
            const mcdRelief = station.hasMcDonalds && run.plan.subscriptionIds.includes('ewe_go') ? -12 : -4;
            applyPause(run, { minutes: payload.minutesSpent, stressDelta: payload.addedKwh > 0 ? mcdRelief : 0 });

            if (payload.addedKwh > 0 && arriveSoc <= 24 && payload.newSoc <= 82) {
              run.chargingEfficiencyBonus += 6;
            }

            const breakNote =
              payload.takenBreaks.length > 0 ? ` · Pausen: ${payload.takenBreaks.join(', ')}` : '';
            run.incidentLog.push({
              timeStr: formatClock(this.level, run.elapsedMinutes),
              title: `Laden: ${station.name}`,
              detail: `+${payload.addedKwh.toFixed(1)} kWh (${Math.round(arriveSoc)}% → ${Math.round(payload.newSoc)}%) in ${Math.round(payload.minutesSpent)} Min · ${payload.chargingCostEur.toFixed(2)} €${breakNote}`,
              impact: 'positive'
            });
            this.enterAutobahn();
          }
        );
      };

      if (!run.triggeredEventIds.includes(`def_${visitKey}`) && Math.random() < station.defectRisk + station.occupancyRisk * 0.35) {
        run.triggeredEventIds.push(`def_${visitKey}`);
        const evt = getEventById('evt_charger_defect');
        if (evt) {
          this.bridge.paused = true;
          this.drivingHUD.clearTouchStates();
          this.eventModal.showDynamicEvent(
            evt,
            choice => {
              if (choice.insertNearestCharger) run.skippedStopKeys.push(visitKey);
              return this.applyEventChoice(evt.title, choice);
            },
            () => {
              if (run.skippedStopKeys.includes(visitKey)) {
                this.enterAutobahn();
              } else {
                startChargingFlow();
              }
            }
          );
          return;
        }
      }

      startChargingFlow();
      return;
    }

    if (preset === 'hannover_messe') {
      this.openHannoverMesse(run);
      return;
    }

    if (preset === 'koeln_ring') {
      run.elapsedMinutes += CITY_TRANSITION_MINUTES.koeln_ring ?? 0;
      run.incidentLog.push({
        timeStr: formatClock(this.level, run.elapsedMinutes),
        title: 'Köln-Ring → A1',
        detail: cleanArrival ? 'Am Dom vorbei auf die A1.' : 'Mit Zwischenfall weiter Richtung Kamen.',
        impact: cleanArrival ? 'positive' : 'negative'
      });
      run.currentLegIndex += 1;
      run.legProgressKm = 0;
      run.countryLimitKmh = undefined;
      this.enterAutobahn();
      return;
    }

    if (preset === 'ferry_denmark') {
      this.finishLevel(cleanArrival);
      return;
    }

    if (preset === 'aachen_finish') {
      this.finishLevel(cleanArrival);
    }
  }

  private maybeStartPreview(): void {
    const kind = new URLSearchParams(window.location.search).get('erpreview');
    if (!kind) return;
    if (kind === 'signs') return;
    if (kind === 'level2plan' || kind === 'level2hotel' || kind === 'level2arrival' || kind === 'level2rain' || kind === 'level2wc') {
      this.level = getLevelById('level_2_family_summer');
      this.bridge.level = this.level;
      this.save.unlockedLevelOrder = Math.max(this.save.unlockedLevelOrder, this.level.order);
      const carId = this.save.ownedVehicleId || 'mg4_standard';
      this.plan = createDefaultPlan(this.level, carId);
      this.bridge.plan = this.plan;
      if (kind === 'level2plan') {
        this.renderPlanning();
        this.game.scene.start('EuropeMapScene', { bridge: this.bridge });
        const map = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
        map?.fitCameraToRoute();
        return;
      }
    }
    const clonedPlan: TripPlan = JSON.parse(JSON.stringify(this.plan));
    this.bridge.plan = clonedPlan;
    this.bridge.paused = false;
    this.bridge.timeScale = 1;
    resetTouchInput();
    this.bridge.runState = {
      levelId: this.level.id,
      plan: clonedPlan,
      currentLegIndex: 0,
      legProgressKm: kind === 'autobahn' ? 13.2 : 0,
      socPct: 96,
      elapsedMinutes: 0,
      stress: this.level.passengers.initialStress,
      peakStress: this.level.passengers.initialStress,
      bladderNeed: 10,
      hungerNeed: 22,
      energyUsedKwh: 0,
      distanceDrivenKm: 0,
      chargingCostEur: 0,
      subscriptionCostEur: 0,
      tollsEur: 0,
      paidTollLegIndices: [],
      incidentalCostEur: 0,
      pauseCostEur: 0,
      lodgingCostEur: 0,
      decisionScoreAccum: 0,
      replanCount: 0,
      goodReplanCount: 0,
      chargingEfficiencyBonus: 0,
      collisionsCount: 0,
      completedStopKeys: [],
      skippedStopKeys: [],
      triggeredEventIds: [],
      wifeDialogueTriggered: false,
      incidentLog: [],
      activeWeather: kind === 'tracks' || kind === 'autobahn' ? 'rain' : 'clear',
      currentSpeedKmh: clonedPlan.legPlans[0]?.targetSpeedKmh || 130,
      isNight: false
    };
    this.stageWrapEl.classList.add('driving-active');
    this.plannerEl.classList.add('hidden');
    window.requestAnimationFrame(() => this.game.scale.refresh());

    if (kind === 'level2hotel' || kind === 'level2arrival' || kind === 'level2rain' || kind === 'level2wc') {
      const run = this.bridge.runState;
      const legs = getActiveRouteLegs(this.level, clonedPlan);
      const idx =
        kind === 'level2hotel'
          ? legs.findIndex(leg => leg.overnightAtEnd)
          : kind === 'level2arrival'
            ? legs.findIndex(leg => leg.destinationAtEnd)
            : kind === 'level2wc'
              ? legs.findIndex(leg => !leg.reverse && !!getEdgeById(leg.edgeId).speedLimitRainKmh)
              : legs.findIndex(leg => leg.weatherOverride === 'rain' && !!getEdgeById(leg.edgeId).speedLimitRainKmh);
      const spec = legs[Math.max(0, idx)];
      const edge = getEdgeById(spec.edgeId);
      if (run && spec) {
        run.currentLegIndex = Math.max(0, idx);
        run.legProgressKm =
          kind === 'level2rain' ? 12 : kind === 'level2wc' ? edge.distanceKm * 0.55 : Math.max(0, edge.distanceKm - 1.1);
        run.triggeredEventIds = kind === 'level2wc' ? [] : ['evt_dirty_toilets'];
        if (kind === 'level2rain') {
          const legPlan = run.plan.legPlans.find(leg => leg.legIndex === run.currentLegIndex);
          if (legPlan) legPlan.targetSpeedKmh = 130;
          run.activeWeather = 'rain';
        }
      }
      this.bridge.timeScale = kind === 'level2rain' || kind === 'level2wc' ? 1 : 15;
      this.enterAutobahn();
      return;
    }

    if (kind === 'aachen') this.enterCitySegment('aachen_start');
    else if (kind === 'koeln') this.enterCitySegment('koeln_ring');
    else if (kind === 'hannover') this.enterCitySegment('hannover_messe');
    else if (kind === 'autohof-rural' || kind === 'tracks') {
      const station = getChargerById('chg_aachener_land_ionity');
      if (!station || !this.bridge.runState) return;
      this.bridge.runState.activeCityChargerId = station.id;
      this.enterCitySegment('charger_park', station.id, kind === 'tracks');
    } else if (kind === 'autohof-urban') {
      const station = getChargerById('chg_frechen_ewego');
      if (!station || !this.bridge.runState) return;
      this.bridge.runState.activeCityChargerId = station.id;
      this.enterCitySegment('charger_park', station.id);
    } else if (kind === 'autobahn') {
      this.enterAutobahn({ previewWeather: 'rain', previewRisk: 0.55, forceWorkZone: true });
    } else if (kind === 'traffic') {
      const run = this.bridge.runState;
      if (run) {
        const lp = run.plan.legPlans.find(leg => leg.legIndex === 0);
        // Aachen–Köln is unrestricted. The preview starts at the 130 km/h advisory.
        if (lp) lp.targetSpeedKmh = 130;
        run.currentSpeedKmh = 130;
        run.legProgressKm = 8;
      }
      this.enterAutobahn({ previewRisk: 0.55 });
    } else if (kind === 'country') {
      const run = this.bridge.runState;
      if (run) {
        run.countryLimitKmh = 70;
        const lp = run.plan.legPlans.find(leg => leg.legIndex === 0);
        if (lp) lp.targetSpeedKmh = 70;
        run.currentSpeedKmh = 70;
        run.legProgressKm = 8;
      }
      this.enterAutobahn({ previewRisk: 0.2 });
    } else if (kind === 'messe') {
      const run = this.bridge.runState;
      if (!run) return;
      const legs = getActiveRouteLegs(this.level, run.plan);
      const idx = legs.findIndex(leg => leg.citySegmentAtEnd === 'hannover_messe');
      run.currentLegIndex = Math.max(0, idx);
      run.socPct = 46;
      run.hungerNeed = 64;
      run.bladderNeed = 48;
      this.openHannoverMesse(run);
    } else if (kind === 'ac') {
      const run = this.bridge.runState;
      const station = getChargerById('chg_messe_ac_a2');
      if (!run || !station) return;
      this.bridge.paused = true;
      this.eventModal.showChargingSession(station, this.level, run, 80, () => undefined);
    }
  }

  private applyEventChoice(title: string, choice: EventChoice): string {
    const run = this.bridge.runState;
    if (!run) return choice.resultText;

    applyPause(run, {
      minutes: choice.timeDeltaMin, costEur: choice.pauseCostEur, stressDelta: choice.stressDelta,
      resetBladder: choice.resetBladder, hungerDelta: choice.hungerDelta
    });
    if (choice.socDeltaPct) run.socPct = Math.max(0, Math.min(100, run.socPct + choice.socDeltaPct));
    run.incidentalCostEur += choice.costDeltaEur;
    if (choice.lodgingDeltaEur) run.lodgingCostEur += choice.lodgingDeltaEur;
    if (choice.fineDeltaEur) run.incidentalCostEur += choice.fineDeltaEur;
    run.decisionScoreAccum += choice.decisionPoints;

    if (choice.id === 'detour_country') run.countryLimitKmh = 70;
    if (choice.adjustSpeedKmh || choice.id === 'detour_country') {
      const vehicle = getVehicleById(run.plan.vehicleId);
      const speed = snapSpeedKmh(choice.adjustSpeedKmh || 70, vehicle.maxSpeedKmh);
      const lp = run.plan.legPlans.find(x => x.legIndex === run.currentLegIndex);
      if (lp) lp.targetSpeedKmh = speed;
    }

    if (choice.id === 'hotel_good' || choice.id === 'hotel_budget' || choice.id === 'sleep_car') {
      const bill = choice.lodgingDeltaEur ?? 0;
      run.overnightNote = `${choice.label} · ${bill.toFixed(0)} € · ${Math.round(choice.timeDeltaMin / 60)} h`;
    }
    if (choice.followUpEventId) {
      this.pendingFollowUp = {
        eventId: choice.followUpEventId,
        chance: choice.followUpChance ?? 1
      };
    }

    let finalText = choice.resultText;
    if (choice.insertNearestCharger) {
      const nearest = findReachableAdditionalStop(this.level, run);
      finalText = nearest ? `${finalText} ${this.insertAdditionalStop(run, nearest, 78)}` : NO_REACHABLE_CHARGER;
    }
    if (choice.id === 'hotel_good') {
      const arrivalSoc = run.socPct;
      const charge = estimateHotelCharge(getVehicleById(run.plan.vehicleId), arrivalSoc);
      run.socPct = charge.departSoc;
      const note = charge.billedKwh > 0
        ? `Hotel-AC ${Math.round(arrivalSoc)} → ${Math.round(run.socPct)} % in ${charge.durationMinutes} Min`
        : `Akku morgens unverändert bei ${Math.round(run.socPct)} %`;
      run.overnightNote += ` · ${note}`;
      finalText += ` ${note}.`;
    }
    if (choice.fineRisk && Math.random() < choice.fineRisk.probability) {
      run.incidentalCostEur += choice.fineRisk.amountEur;
      const extraStress = choice.fineRisk.stressDelta ?? 12;
      const extraTime = choice.fineRisk.timeDeltaMin ?? 0;
      applyPause(run, { minutes: extraTime, stressDelta: extraStress });
      finalText +=
        extraTime > 0
          ? ` ⚠️ ${choice.fineRisk.label}: −${choice.fineRisk.amountEur} €, +${extraTime} Min, +${extraStress} Stress.`
          : ` ⚠️ Pech gehabt: ${choice.fineRisk.label} (+${choice.fineRisk.amountEur} € Bußgeld)!`;
    }

    run.incidentLog.push({
      timeStr: formatClock(this.level, run.elapsedMinutes),
      title,
      detail: finalText,
      impact: choice.decisionPoints >= 10 ? 'positive' : choice.decisionPoints < 0 ? 'negative' : 'neutral'
    });
    return finalText;
  }

  private legArrivalCityName(): string {
    const run = this.bridge.runState;
    if (!run) return 'unterwegs';
    const legs = getActiveRouteLegs(this.level, run.plan);
    const spec = legs[run.currentLegIndex];
    if (!spec) return 'unterwegs';
    const edge = getEdgeById(spec.edgeId);
    return getCityById(spec.reverse ? edge.fromCityId : edge.toCityId).name;
  }

  private openHannoverMesse(run: RunState): void {
    const legs = getActiveRouteLegs(this.level, run.plan);
    const leg = legs[run.currentLegIndex];
    const fair = getMesseChargerForVisit(leg);
    const planned = fair && run.plan.plannedStops.find(
      stop => stop.chargerId === fair.id && stop.legIndex === run.currentLegIndex
    );
    const goOn = () => {
      run.currentLegIndex += 1;
      run.legProgressKm = 0;
      run.countryLimitKmh = undefined;
      this.enterAutobahn();
    };
    this.bridge.paused = true;
    this.drivingHUD.clearTouchStates();
    this.eventModal.showMesseVisit({ chargePlanned: !!planned, chargerAvailable: !!fair }, choice => {
      applyPause(run, {
        minutes: MESSE_VISIT_MINUTES, resetBladder: true, hungerDelta: choice.eat ? -55 : 8,
        costEur: choice.eat ? 50 : 0, stressDelta: choice.eat ? -8 : 0
      });
      const foodNote = choice.eat ? 'Essen in der Halle: −50 €, Hunger deutlich runter.' : 'Ohne Essen.';
      let chargeNote = 'AC am Parkplatz ausgelassen.';
      if (fair) {
        const visitKey = stopKey(run.currentLegIndex, fair.id);
        if (choice.charge && Math.random() < 1 - fair.occupancyRisk) {
          const vehicle = getVehicleById(run.plan.vehicleId);
          const session = estimateMesseCharge(vehicle, fair, run.socPct, planned?.targetSocPct ?? 80, run.plan.subscriptionIds);
          run.socPct = session.departSoc;
          run.chargingCostEur += session.costEur;
          chargeNote = `Einer von 6 AC-Punkten war frei: +${session.kwhAdded.toFixed(1)} kWh auf ${Math.round(session.departSoc)} % für ${session.costEur.toFixed(2)} € (Onboard-Lader ${vehicle.acMaxKw} kW).`;
          run.completedStopKeys.push(visitKey);
        } else {
          run.skippedStopKeys.push(visitKey);
          if (choice.charge) {
            applyPause(run, { stressDelta: 6 });
            chargeNote = 'Alle 6 AC-Punkte waren belegt. Geladen wurde nicht.';
          }
        }
      }
      const report = randomMesseReport();
      const detail = `Vier Stunden Messe. Toilette automatisch. ${foodNote} ${chargeNote} ${report}`;
      run.incidentLog.push({
        timeStr: formatClock(this.level, run.elapsedMinutes),
        title: 'Hannover Messe',
        detail,
        impact: choice.eat ? 'positive' : 'neutral'
      });
      return detail;
    }, goOn);
  }

  private handleDynamicEvent(eventId: string): void {
    const evt = getEventById(eventId);
    if (!evt) {
      this.bridge.paused = false;
      return;
    }
    const place = eventId === 'evt_hotel_overnight' ? this.legArrivalCityName() : 'Montpellier';
    const trap = eventId === 'evt_speed_trap' ? this.bridge.runState?.speedTrap : undefined;
    const nudge = eventId === 'evt_tailgate' ? this.bridge.runState?.tailgateCase : undefined;
    const baseEvt = trap ? buildSpeedTrapEvent(trap) : nudge ? buildTailgateEvent(nudge.country, nudge.amountEur) : evt;
    const run = this.bridge.runState;
    const hotelCharge = eventId === 'evt_hotel_overnight' && run
      ? estimateHotelCharge(getVehicleById(run.plan.vehicleId), run.socPct) : undefined;
    const shown =
      eventId === 'evt_hotel_overnight' || eventId === 'evt_south_arrival'
        ? {
            ...baseEvt,
            title: baseEvt.title.split('{ORT}').join(place),
            description: baseEvt.description.split('{ORT}').join(place),
            choices: baseEvt.choices.map(choice => hotelCharge && choice.id === 'hotel_good'
              ? { ...choice, hint: `${choice.hint} · Akku morgens ${Math.round(hotelCharge.departSoc)} %` }
              : choice)
          }
        : baseEvt;
    this.drivingHUD.clearTouchStates();
    this.eventModal.showDynamicEvent(
      shown,
      choice => {
        const text = this.applyEventChoice(shown.title, choice);
        if (eventId === 'evt_rest_area_robbery' && choice.fineDeltaEur && run?.overnightNote) {
          run.overnightNote += ` · Einbruch −${choice.fineDeltaEur.toFixed(0)} €, +${choice.timeDeltaMin / 60} h Polizei`;
        }
        return text;
      },
      () => {
        const follow = this.pendingFollowUp;
        this.pendingFollowUp = null;
        if (follow && Math.random() < follow.chance) {
          this.handleDynamicEvent(follow.eventId);
          return;
        }
        this.bridge.paused = false;
      }
    );
  }

  private handleWifeDialogue(dialogueId: string): void {
    const dlg = getWifeDialogueById(dialogueId);
    const run = this.bridge.runState;
    if (!dlg || !run) {
      this.bridge.paused = false;
      return;
    }

    this.drivingHUD.clearTouchStates();
    this.eventModal.showWifeStressDialogue(
      dlg,
      this.level,
      run,
      (action, nearest) => {
        if (action === 'insert_stop') {
          return nearest ? this.insertAdditionalStop(run, nearest, 75) : NO_REACHABLE_CHARGER;
        } else {
          const lp = run.plan.legPlans.find(x => x.legIndex === run.currentLegIndex);
          const vehicleNow = getVehicleById(run.plan.vehicleId);
          const eco = snapSpeedKmh(115, vehicleNow.maxSpeedKmh);
          if (lp) lp.targetSpeedKmh = eco;
          run.replanCount += 1;
          run.goodReplanCount += 1;
          return `Zieltempo auf ${eco} km/h Eco-Modus gesenkt!`;
        }
      },
      (choice: WifeDialogueChoice, routeChanged: boolean) => {
        const extraCalm = routeChanged && choice.tone === 'calming' ? -6 : 0;
        run.stress = Phaser.Math.Clamp(run.stress + choice.stressDelta + extraCalm, 0, 100);
        run.peakStress = Math.max(run.peakStress, run.stress);
        run.decisionScoreAccum += choice.decisionPoints + (routeChanged ? 6 : 0);
        run.incidentLog.push({
          timeStr: formatClock(this.level, run.elapsedMinutes),
          title: 'Stress-Dialog Partnerin',
          detail: `${choice.text.slice(0, 65)}… → Stress jetzt ${Math.round(run.stress)}%`,
          impact: choice.stressDelta < 0 ? 'positive' : 'negative'
        });
      },
      () => {
        this.bridge.paused = false;
      }
    );
  }

  private handleCollision(info: CollisionInfo): void {
    const run = this.bridge.runState;
    if (!run) {
      this.bridge.paused = false;
      return;
    }
    this.drivingHUD.clearTouchStates();
    this.eventModal.showCollisionDialogue(
      info,
      (cost, mins, stressDelta, decisionPts, punishCollision, summary) => {
        run.incidentalCostEur += cost;
        run.elapsedMinutes += mins;
        run.stress = Math.min(100, run.stress + stressDelta);
        run.peakStress = Math.max(run.peakStress, run.stress);
        run.decisionScoreAccum += decisionPts;
        run.incidentLog.push({
          timeStr: formatClock(this.level, run.elapsedMinutes),
          title: punishCollision ? 'Stadtverkehr-Zwischenfall (Eigenverschulden)' : 'Unverschuldeter Kontakt',
          detail: summary,
          impact: punishCollision ? 'negative' : 'neutral'
        });
        this.bridge.paused = false;
      }
    );
  }

  private handlePoliceViolation(kind: PoliceViolationKind): void {
    const run = this.bridge.runState;
    if (!run) {
      this.bridge.paused = false;
      return;
    }
    this.drivingHUD.clearTouchStates();
    this.eventModal.showPoliceViolationDialogue(
      kind,
      (cost, mins, stressDelta, decisionPts, summary) => {
        run.incidentalCostEur += cost;
        run.elapsedMinutes += mins;
        run.stress = Math.min(100, run.stress + stressDelta);
        run.peakStress = Math.max(run.peakStress, run.stress);
        run.decisionScoreAccum += decisionPts;
        run.incidentLog.push({
          timeStr: formatClock(this.level, run.elapsedMinutes),
          title: kind === 'red_light' ? 'Polizei: Rote Ampel' : 'Polizei: Zebrastreifen',
          detail: summary,
          impact: 'negative'
        });
        this.bridge.paused = false;
      }
    );
  }

  private handleBatteryDepleted(): void {
    const run = this.bridge.runState;
    if (!run) return;
    run.incidentalCostEur += 145;
    run.elapsedMinutes += 45;
    run.socPct = 28;
    run.stress = Math.min(100, run.stress + 28);
    run.peakStress = Math.max(run.peakStress, run.stress);
    run.incidentLog.push({
      timeStr: formatClock(this.level, run.elapsedMinutes),
      title: 'Akku 0 % – Mobiler Pannenservice!',
      detail: 'ADAC Notladung bis 28 % (+45 Min, 145 € Servicegebühr).',
      impact: 'negative'
    });

    this.drivingHUD.clearTouchStates();
    this.eventModal.showMapPeek(
      `<p><strong>🪫 Batterie leer (0 %)!</strong></p>
       <p>Der mobile Pannenservice hat dich auf <b>28 % SoC</b> nachgeladen (+45 Min Zeitverlust, 145 € Gebühr). Plane am besten sofort einen Schnelllader ein!</p>`,
      () => {
        this.forceEarlierChargeStop();
        this.bridge.paused = false;
      }
    );
  }

  private insertAdditionalStop(run: RunState, candidate: { legIndex: number; station: ChargerStation }, targetSocPct: number): string {
    const { legIndex, station } = candidate;
    run.plan.plannedStops.push({ chargerId: station.id, legIndex, targetSocPct });
    run.replanCount += 1;
    run.goodReplanCount += 1;
    return `Zwischenstopp „${station.name}“ auf Etappe ${legIndex + 1} eingeplant.`;
  }

  private forceEarlierChargeStop(): void {
    const run = this.bridge.runState;
    if (!run) return;
    const nearest = findReachableAdditionalStop(this.level, run);
    const feedback = nearest ? this.insertAdditionalStop(run, nearest, 80) : NO_REACHABLE_CHARGER;
    if (nearest) {
      run.incidentLog.push({
        timeStr: formatClock(this.level, run.elapsedMinutes),
        title: 'Umplanung während Fahrt',
        detail: feedback,
        impact: 'positive'
      });
    }
    this.drivingHUD.showReplanFeedback(feedback);
    this.drivingHUD.update(this.level, run, this.bridge.timeScale);
  }

  private openLiveMapPeek(): void {
    const run = this.bridge.runState;
    if (!run) return;
    this.bridge.paused = true;
    this.drivingHUD.clearTouchStates();
    const legs = getActiveRouteLegs(this.level, run.plan);
    const forecast = evaluateTripPlan(this.level, run.plan);
    const livePred = predictLiveTripSoc(this.level, run);
    const finalSocWithoutMesse = livePred.predictedFinalSocWithoutMessePct;
    const upcoming = run.plan.plannedStops
      .filter(s => s.legIndex >= run.currentLegIndex && isPendingStop(run, s))
      .flatMap(s => {
        const station = getChargerById(s.chargerId);
        return station && isStationOnLeg(station, legs[s.legIndex]) ? [station.name] : [];
      });

    const html = `
      <p><b>Aktuelle Etappe:</b> ${run.currentLegIndex + 1} / ${legs.length} · <b>Akku:</b> ${Math.round(run.socPct)}%</p>
      <p><b>🎯 Prognose nächstes Ziel (${livePred.nextStopName}, ${livePred.distanceToNextKm} km):</b> <strong>${livePred.predictedArrivalNextSocPct}% SoC</strong></p>
      <p><b>🏁 Prognose Endziel:</b> <strong>${livePred.predictedFinalSocPct}% SoC</strong></p>
      ${finalSocWithoutMesse === undefined ? '' : `<p><b>Bei belegtem Messeparkplatz:</b> ${finalSocWithoutMesse > 0 ? `${finalSocWithoutMesse}% SoC am Ziel` : 'Reichweite reicht nicht bis zum Ziel.'}</p>`}
      <p><b>Geplante verbleibende Ladestopps:</b> ${upcoming.length > 0 ? upcoming.join(', ') : 'Keine mehr bis zum Ziel'}</p>
      <p><b>Prognose Schnittverbrauch:</b> ~${forecast.avgConsumptionKwh100} kWh/100km</p>
    `;
    this.eventModal.showMapPeek(html, () => {
      this.bridge.paused = false;
    });
  }

  private finishLevel(cleanArrival: boolean): void {
    const run = this.bridge.runState;
    if (!run) return;
    this.eventModal.close();
    this.drivingHUD.setMode('hidden');
    resetTouchInput();
    this.stopAllGameplayScenes();

    const result = evaluateRun(this.level, run, cleanArrival);
    this.save.cashEur += result.prizeMoneyEur;
    if (this.save.unlockedLevelOrder <= this.level.order) {
      this.save.unlockedLevelOrder = this.level.order + 1;
    }
    const prev = this.save.completedLevels[this.level.id];
    if (!prev || result.totalScore > prev.bestScore) {
      this.save.completedLevels[this.level.id] = {
        bestScore: result.totalScore,
        bestMinutes: result.totalMinutes
      };
    }
    saveCampaignState(this.save);
    this.resultsUI.show(this.level, run, result, this.save);
  }

  private returnToPlanning(levelId: string): void {
    this.level = getLevelById(levelId);
    this.bridge.level = this.level;
    this.bridge.runState = null;
    this.bridge.paused = false;
    this.bridge.selectedLegIndex = 0;
    resetTouchInput();

    const carId = this.save.ownedVehicleId || 'mg4_standard';
    this.plan = createDefaultPlan(this.level, carId);
    this.bridge.plan = this.plan;

    this.eventModal.close();
    this.resultsUI.hide();
    this.drivingHUD.setMode('hidden');
    this.stageWrapEl.classList.remove('driving-active');
    this.plannerEl.classList.remove('hidden');

    this.stopAllGameplayScenes();
    this.game.scene.start('EuropeMapScene', { bridge: this.bridge });
    this.renderPlanning();
    window.requestAnimationFrame(() => {
      this.game.scale.refresh();
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (new URLSearchParams(window.location.search).has('erpreview')) {
    const debugWindow = window as Window & {
      __erTouch?: typeof TouchInput;
      __erTouchCount?: () => number;
    };
    debugWindow.__erTouch = TouchInput;
    debugWindow.__erTouchCount = touchPointerCount;
  }
  new ERoadtripController();
});
