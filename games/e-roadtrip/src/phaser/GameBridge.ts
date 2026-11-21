import {
  ChargerStation,
  CityDrivePreset,
  CollisionInfo,
  LevelConfig,
  PoliceViolationKind,
  ProviderFilterMap,
  RunState,
  TripPlan
} from '../types';

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
  selectedLegIndex: number;
  providerFilter: ProviderFilterMap;
  dimUnsubscribed: boolean;
  timeScale: number; // 1 | 5 | 15
  paused: boolean;
  touch: TouchInputState;
  isLightTheme: () => boolean;

  onBootReady: () => void;
  onMapSelectCharger: (station: ChargerStation) => void;
  onMapSelectRoute: (routeId: string) => void;
  onMapSelectLeg: (legIndex: number) => void;
  onAutobahnHudTick: (run: RunState) => void;
  onTriggerChargerSegment: (station: ChargerStation) => void;
  onTriggerCitySegment: (preset: CityDrivePreset) => void;
  onCitySegmentComplete: (preset: CityDrivePreset, cleanArrival: boolean) => void;
  onDynamicEventTrigger: (eventId: string) => void;
  onWifeDialogueTrigger: (dialogueId: string) => void;
  onCollisionEvent: (info: CollisionInfo) => void;
  onPoliceViolation: (kind: PoliceViolationKind) => void;
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

export function resetTouchInput(): void {
  TouchInput.left = false;
  TouchInput.right = false;
  TouchInput.up = false;
  TouchInput.down = false;
  TouchInput.brake = false;
  TouchInput.hornPressed = false;
}

