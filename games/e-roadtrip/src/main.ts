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
import { CHARGERS, getChargerById, getEdgeById } from './data/europeMap';
import { getEventById, getWifeDialogueById } from './data/events';
import { computeSubscriptionTripCost } from './sim/EnergyModel';
import {
  createDefaultPlan,
  evaluateTripPlan,
  findNearestAvailableCharger,
  getActiveRouteLegs,
  predictLiveTripSoc,
  switchReturnRouteInPlan,
  switchRouteInPlan
} from './sim/RoutePlanner';
import { evaluateRun } from './sim/ScoringEngine';
import { getResaleValue, loadCampaignSave, resetCampaignSave, saveCampaignState } from './sim/SaveState';
import { BootScene } from './phaser/BootScene';
import { EuropeMapScene } from './phaser/EuropeMapScene';
import { AutobahnScene } from './phaser/AutobahnScene';
import { CityDriveScene } from './phaser/CityDriveScene';
import { ERoadtripBridge, TouchInput, resetTouchInput } from './phaser/GameBridge';
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
    ac_village: true
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

      onMapSelectCharger: (station: ChargerStation) => {
        this.toggleChargerInPlan(station);
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
        this.syncMapScene();
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
        this.syncMapScene();
        this.renderPlanning();
      },
      onToggleShowChargers: () => {
        this.bridge.showChargerStations = !this.bridge.showChargerStations;
        this.syncMapScene();
        this.renderPlanning();
      },
      onResetProviderFilter: () => {
        this.bridge.providerFilter = createDefaultProviderFilter();
        this.syncMapScene();
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

    this.drivingHUD = new DrivingHUD(hudEl, touchEl, {
      onSpeedChange: (spd: number) => {
        const run = this.bridge.runState;
        if (!run) return;
        const lp = run.plan.legPlans.find(x => x.legIndex === run.currentLegIndex);
        if (lp) lp.targetSpeedKmh = spd;
        else run.plan.legPlans.push({ legIndex: run.currentLegIndex, targetSpeedKmh: spd });
        run.currentSpeedKmh = spd;
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
        run.elapsedMinutes += 8;
        run.bladderNeed = 0;
        run.stress = Math.max(0, run.stress - 14);
        run.incidentLog.push({
          timeStr: formatClock(this.level, run.elapsedMinutes),
          title: 'Ungeplanter WC-/Kaffee-Stopp',
          detail: '+8 Min · Harndrang 0 % · Stress -14 %',
          impact: 'positive'
        });
        this.drivingHUD.update(this.level, run, this.bridge.timeScale);
      },
      onToggleMapPreview: () => {
        this.openLiveMapPeek();
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
    this.game.scene.start('BootScene', { bridge: this.bridge });
  }

  private renderPlanning(): void {
    this.planningUI.render(
      this.level,
      this.plan,
      this.save,
      this.bridge.selectedLegIndex,
      this.bridge.providerFilter,
      this.bridge.showChargerStations
    );
  }

  private syncMapScene(): void {
    const mapScene = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
    if (mapScene && mapScene.scene.isActive()) {
      mapScene.refreshDynamicState();
    }
  }

  private selectRoute(routeId: string): void {
    switchRouteInPlan(this.level, this.plan, routeId);
    this.bridge.plan = this.plan;
    this.bridge.selectedLegIndex = 0;
    this.syncMapScene();
    const mapScene = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
    mapScene?.fitCameraToRoute();
    this.renderPlanning();
  }

  private selectReturnRoute(routeId: string): void {
    switchReturnRouteInPlan(this.level, this.plan, routeId);
    this.bridge.plan = this.plan;
    const legs = getActiveRouteLegs(this.level, this.plan);
    const firstReturn = legs.findIndex(leg => !!leg.reverse);
    this.bridge.selectedLegIndex = firstReturn >= 0 ? firstReturn : 0;
    this.syncMapScene();
    const mapScene = this.game.scene.getScene('EuropeMapScene') as EuropeMapScene | undefined;
    mapScene?.fitCameraToRoute();
    this.renderPlanning();
  }

  private selectLeg(legIndex: number): void {
    const activeLegs = getActiveRouteLegs(this.level, this.plan);
    const clamped = Math.max(0, Math.min(activeLegs.length - 1, legIndex));
    this.bridge.selectedLegIndex = clamped;
    this.syncMapScene();
    this.renderPlanning();
  }

  private toggleChargerInPlan(station: ChargerStation): void {
    const activeLegs = getActiveRouteLegs(this.level, this.plan);
    const matchingLegs = activeLegs
      .map((l, idx) => ({ l, idx }))
      .filter(x => x.l.edgeId === station.edgeId);
    if (matchingLegs.length === 0) return;

    const existingStop = this.plan.plannedStops.findIndex(
      s => s.chargerId === station.id && matchingLegs.some(m => m.idx === s.legIndex)
    );
    if (existingStop >= 0) {
      this.plan.plannedStops.splice(existingStop, 1);
    } else {
      const preferred =
        matchingLegs.find(m => m.idx === this.bridge.selectedLegIndex) || matchingLegs[0];
      this.plan.plannedStops.push({
        chargerId: station.id,
        legIndex: preferred.idx,
        targetSocPct: 80
      });
    }
    this.syncMapScene();
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
      energyUsedKwh: 0,
      distanceDrivenKm: 0,
      chargingCostEur: 0,
      subscriptionCostEur: subCost,
      tollsAndFinesEur: 0,
      decisionScoreAccum: 0,
      replanCount: 0,
      goodReplanCount: 0,
      chargingEfficiencyBonus: 0,
      collisionsCount: 0,
      completedStopIds: [],
      skippedStopIds: [],
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
      this.drivingHUD.update(this.level, this.bridge.runState, this.bridge.timeScale);
    }
    this.game.scene.start('AutobahnScene', { bridge: this.bridge, ...(preview || {}) });
  }

  private handleCitySegmentComplete(preset: CityDrivePreset, cleanArrival: boolean): void {
    const run = this.bridge.runState;
    if (!run) return;

    if (preset === 'aachen_start') {
      run.elapsedMinutes += 7;
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
            run.completedStopIds.push(station.id);
            run.socPct = payload.newSoc;
            run.elapsedMinutes += payload.minutesSpent;
            run.chargingCostEur += payload.chargingCostEur;
            run.tollsAndFinesEur += payload.breakCostEur;
            if (payload.resetBladder) {
              run.bladderNeed = 0;
            } else {
              run.bladderNeed = Math.max(0, run.bladderNeed - 35);
            }

            if (arriveSoc <= 24 && payload.newSoc <= 82) {
              run.chargingEfficiencyBonus += 6;
            }
            const mcdRelief = station.hasMcDonalds && run.plan.subscriptionIds.includes('ewe_go') ? -12 : -4;
            run.stress = Phaser.Math.Clamp(run.stress + mcdRelief + payload.stressDelta, 0, 100);
            run.peakStress = Math.max(run.peakStress, run.stress);

            const breakNote =
              payload.takenBreaks.length > 0 ? ` · Pausen: ${payload.takenBreaks.join(', ')}` : '';
            run.incidentLog.push({
              timeStr: formatClock(this.level, run.elapsedMinutes),
              title: `Laden: ${station.name}`,
              detail: `+${payload.addedKwh.toFixed(1)} kWh (${Math.round(arriveSoc)}% → ${payload.newSoc}%) in ${payload.minutesSpent} Min · ${payload.chargingCostEur.toFixed(2)} €${breakNote}`,
              impact: 'positive'
            });
            this.enterAutobahn();
          }
        );
      };

      if (!run.triggeredEventIds.includes(`def_${station.id}`) && Math.random() < station.defectRisk + station.occupancyRisk * 0.35) {
        run.triggeredEventIds.push(`def_${station.id}`);
        const evt = getEventById('evt_charger_defect');
        if (evt) {
          this.bridge.paused = true;
          this.drivingHUD.clearTouchStates();
          this.eventModal.showDynamicEvent(
            evt,
            choice => {
              this.applyEventChoice(evt.title, choice);
              if (choice.insertNearestCharger) {
                run.skippedStopIds.push(station.id);
              }
              return choice.resultText;
            },
            () => {
              if (run.skippedStopIds.includes(station.id)) {
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
      run.elapsedMinutes += 28;
      run.bladderNeed = 0;
      run.stress = Math.max(0, run.stress - 8);
      run.incidentLog.push({
        timeStr: formatClock(this.level, run.elapsedMinutes),
        title: 'Hannover Messe erreicht!',
        detail: 'Messe-Termin & Turnaround (+28 Min). Jetzt Rückfahrt nach Aachen!',
        impact: 'positive'
      });

      this.bridge.paused = true;
      this.drivingHUD.clearTouchStates();
      this.eventModal.showMapPeek(
        `
        <p><strong>🎉 Etappenziel Hannover Messe erreicht!</strong></p>
        <p>Nach 28 Minuten Messe-Checkup geht es jetzt bei aufziehendem Regen und späterer Dämmerung zurück Richtung Aachen.</p>
        <p>Aktueller Akku: <strong>${Math.round(run.socPct)}%</strong> · Stress: <strong>${Math.round(run.stress)}%</strong></p>
        `,
        () => {
          run.currentLegIndex += 1;
          run.legProgressKm = 0;
          this.enterAutobahn();
        }
      );
      return;
    }

    if (preset === 'koeln_ring') {
      run.elapsedMinutes += 6;
      run.incidentLog.push({
        timeStr: formatClock(this.level, run.elapsedMinutes),
        title: 'Köln-Ring → A1',
        detail: cleanArrival ? 'Am Dom vorbei auf die A1.' : 'Mit Zwischenfall weiter Richtung Kamen.',
        impact: cleanArrival ? 'positive' : 'negative'
      });
      run.currentLegIndex += 1;
      run.legProgressKm = 0;
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
      energyUsedKwh: 0,
      distanceDrivenKm: 0,
      chargingCostEur: 0,
      subscriptionCostEur: 0,
      tollsAndFinesEur: 0,
      decisionScoreAccum: 0,
      replanCount: 0,
      goodReplanCount: 0,
      chargingEfficiencyBonus: 0,
      collisionsCount: 0,
      completedStopIds: [],
      skippedStopIds: [],
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
    }
  }

  private applyEventChoice(title: string, choice: EventChoice): string {
    const run = this.bridge.runState;
    if (!run) return choice.resultText;

    run.elapsedMinutes += choice.timeDeltaMin;
    run.socPct = Math.max(1, Math.min(100, run.socPct + choice.socDeltaPct));
    run.chargingCostEur += choice.costDeltaEur;
    run.stress = Phaser.Math.Clamp(run.stress + choice.stressDelta, 0, 100);
    run.peakStress = Math.max(run.peakStress, run.stress);
    run.decisionScoreAccum += choice.decisionPoints;

    if (choice.adjustSpeedKmh) {
      const lp = run.plan.legPlans.find(x => x.legIndex === run.currentLegIndex);
      if (lp) lp.targetSpeedKmh = choice.adjustSpeedKmh;
      run.currentSpeedKmh = choice.adjustSpeedKmh;
    }

    if (choice.insertNearestCharger) {
      const legs = getActiveRouteLegs(this.level, run.plan);
      const leg = legs[run.currentLegIndex];
      const edge = getEdgeById(leg.edgeId);
      const nearest = findNearestAvailableCharger(
        this.level,
        run.plan,
        run.currentLegIndex,
        run.legProgressKm / edge.distanceKm,
        run.completedStopIds
      );
      if (nearest) {
        const exists = run.plan.plannedStops.some(
          s => s.chargerId === nearest.station.id && s.legIndex === nearest.legIndex
        );
        if (!exists) {
          run.plan.plannedStops.push({
            chargerId: nearest.station.id,
            legIndex: nearest.legIndex,
            targetSocPct: 78
          });
          run.replanCount += 1;
          run.goodReplanCount += 1;
        }
      }
    }

    let finalText = choice.resultText;
    if (choice.fineRisk && Math.random() < choice.fineRisk.probability) {
      run.tollsAndFinesEur += choice.fineRisk.amountEur;
      run.stress = Math.min(100, run.stress + 12);
      run.peakStress = Math.max(run.peakStress, run.stress);
      finalText += ` ⚠️ Pech gehabt: ${choice.fineRisk.label} (+${choice.fineRisk.amountEur} € Bußgeld)!`;
    }

    run.incidentLog.push({
      timeStr: formatClock(this.level, run.elapsedMinutes),
      title,
      detail: finalText,
      impact: choice.decisionPoints >= 10 ? 'positive' : choice.decisionPoints < 0 ? 'negative' : 'neutral'
    });
    return finalText;
  }

  private handleDynamicEvent(eventId: string): void {
    const evt = getEventById(eventId);
    if (!evt) {
      this.bridge.paused = false;
      return;
    }
    this.drivingHUD.clearTouchStates();
    this.eventModal.showDynamicEvent(
      evt,
      choice => this.applyEventChoice(evt.title, choice),
      () => {
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
      action => {
        if (action === 'insert_stop') {
          const legs = getActiveRouteLegs(this.level, run.plan);
          const leg = legs[run.currentLegIndex];
          const edge = getEdgeById(leg.edgeId);
          const nearest = findNearestAvailableCharger(
            this.level,
            run.plan,
            run.currentLegIndex,
            run.legProgressKm / edge.distanceKm,
            run.completedStopIds
          );
          if (nearest) {
            run.plan.plannedStops.push({
              chargerId: nearest.station.id,
              legIndex: nearest.legIndex,
              targetSocPct: 75
            });
            run.replanCount += 1;
            run.goodReplanCount += 1;
            return `Zwischenstopp „${nearest.station.name}“ eingeplant!`;
          }
          return 'Kein weiterer Ladepark vor dem Ziel nötig.';
        } else {
          const lp = run.plan.legPlans.find(x => x.legIndex === run.currentLegIndex);
          if (lp) lp.targetSpeedKmh = 115;
          run.currentSpeedKmh = 115;
          run.replanCount += 1;
          run.goodReplanCount += 1;
          return 'Zieltempo auf 115 km/h Eco-Modus gesenkt!';
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
        run.tollsAndFinesEur += cost;
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
        run.tollsAndFinesEur += cost;
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
    run.tollsAndFinesEur += 145;
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

  private forceEarlierChargeStop(): void {
    const run = this.bridge.runState;
    if (!run) return;
    const legs = getActiveRouteLegs(this.level, run.plan);
    const leg = legs[run.currentLegIndex];
    const edge = getEdgeById(leg.edgeId);
    const nearest = findNearestAvailableCharger(
      this.level,
      run.plan,
      run.currentLegIndex,
      run.legProgressKm / edge.distanceKm,
      run.completedStopIds
    );
    if (nearest) {
      const exists = run.plan.plannedStops.some(
        s => s.chargerId === nearest.station.id && s.legIndex === nearest.legIndex
      );
      if (!exists) {
        run.plan.plannedStops.push({
          chargerId: nearest.station.id,
          legIndex: nearest.legIndex,
          targetSocPct: 80
        });
        run.replanCount += 1;
        run.goodReplanCount += 1;
        run.incidentLog.push({
          timeStr: formatClock(this.level, run.elapsedMinutes),
          title: 'Umplanung während Fahrt',
          detail: `Ladestopp „${nearest.station.name}“ zusätzlich eingefügt.`,
          impact: 'positive'
        });
      }
      this.drivingHUD.update(this.level, run, this.bridge.timeScale);
    }
  }

  private openLiveMapPeek(): void {
    const run = this.bridge.runState;
    if (!run) return;
    this.bridge.paused = true;
    this.drivingHUD.clearTouchStates();
    const legs = getActiveRouteLegs(this.level, run.plan);
    const forecast = evaluateTripPlan(this.level, run.plan);
    const livePred = predictLiveTripSoc(this.level, run);
    const upcoming = run.plan.plannedStops
      .filter(s => s.legIndex >= run.currentLegIndex && !run.completedStopIds.includes(s.chargerId))
      .map(s => CHARGERS.find(c => c.id === s.chargerId)?.name || s.chargerId);

    const html = `
      <p><b>Aktuelle Etappe:</b> ${run.currentLegIndex + 1} / ${legs.length} · <b>Akku:</b> ${Math.round(run.socPct)}%</p>
      <p><b>🎯 Prognose nächstes Ziel (${livePred.nextStopName}, ${livePred.distanceToNextKm} km):</b> <strong>${livePred.predictedArrivalNextSocPct}% SoC</strong></p>
      <p><b>🏁 Prognose Endziel:</b> <strong>${livePred.predictedFinalSocPct}% SoC</strong></p>
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
  new ERoadtripController();
});
