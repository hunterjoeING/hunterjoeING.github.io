import { ChargerStation, CityDrivePreset, LevelConfig, RunState, TripPlan } from '../types';

export interface TouchInputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  brake: boolean;
  hornPressed: boolean;
}

export interface ERoadtripBridge {
  level: LevelConfig;
  plan: TripPlan;
  runState: RunState | null;
  timeScale: number; // 1 | 5 | 15
  paused: boolean;
  touch: TouchInputState;
  isLightTheme: () => boolean;

  onBootReady: () => void;
  onMapSelectCharger: (station: ChargerStation) => void;
  onAutobahnHudTick: (run: RunState) => void;
  onTriggerChargerSegment: (station: ChargerStation) => void;
  onTriggerCitySegment: (preset: CityDrivePreset) => void;
  onCitySegmentComplete: (preset: CityDrivePreset, cleanArrival: boolean) => void;
  onDynamicEventTrigger: (eventId: string) => void;
  onWifeDialogueTrigger: (dialogueId: string) => void;
  onCollisionEvent: (kind: 'car' | 'pedestrian' | 'cyclist' | 'obstacle') => void;
  onBatteryDepleted: () => void;
}

export const TouchInput: TouchInputState = {
  left: false,
  right: false,
  up: false,
  down: false,
  brake: false,
  hornPressed: false
};
