import {
  ChargerStation,
  CityDrivePreset,
  CollisionInfo,
  LevelConfig,
  PoliceViolationKind,
  PassName,
  ProviderFilterMap,
  RunState,
  TripPlan
} from '../types';
import type { PropertyDamage } from '../sim/PropertyDamage';

export interface TouchInputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  brake: boolean;
  hornPressed: boolean;
}

export type AlpineEvent =
  | { kind: 'pass'; name: PassName }
  | { kind: 'descent' }
  | { kind: 'overheat' };

export interface ERoadtripBridge {
  level: LevelConfig;
  plan: TripPlan;
  runState: RunState | null;
  selectedLegIndex: number;
  providerFilter: ProviderFilterMap;
  /** When true, the selected stage shows coloured/grey provider icons and a hover detail card. */
  showChargerStations: boolean;
  timeScale: number; // 1 | 5 | 15
  paused: boolean;
  touch: TouchInputState;
  isLightTheme: () => boolean;

  onBootReady: () => void;
  onMapSelectCharger: (station: ChargerStation, legIndex: number) => void;
  onMapSelectRoute: (routeId: string) => void;
  onMapSelectLeg: (legIndex: number) => void;
  onAutobahnHudTick: (run: RunState) => void;
  onTriggerChargerSegment: (station: ChargerStation) => void;
  onTriggerCitySegment: (preset: CityDrivePreset) => void;
  onCitySegmentComplete: (preset: CityDrivePreset, cleanArrival: boolean) => void;
  onAlpineEvent: (event: AlpineEvent) => void;
  onDynamicEventTrigger: (eventId: string) => void;
  onWifeDialogueTrigger: (dialogueId: string) => void;
  onCollisionEvent: (info: CollisionInfo) => void;
  onPropertyDamage: (damage: PropertyDamage) => void;
  onDestinationArrival: () => void;
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

export type TouchControlKey = 'left' | 'right' | 'up' | 'down' | 'brake' | 'horn';

/** pointerId → held control. Holds are derived only from this map. */
const touchPointers = new Map<number, TouchControlKey>();

export function touchPointerCount(): number {
  return touchPointers.size;
}

export function isTouchKeyHeld(key: TouchControlKey): boolean {
  for (const held of touchPointers.values()) {
    if (held === key) return true;
  }
  return false;
}

function syncTouchHoldsFromPointers(): void {
  if (touchPointers.size === 0) {
    TouchInput.left = false;
    TouchInput.right = false;
    TouchInput.up = false;
    TouchInput.down = false;
    TouchInput.brake = false;
    return;
  }
  const down = new Set(touchPointers.values());
  TouchInput.left = down.has('left');
  TouchInput.right = down.has('right');
  TouchInput.up = down.has('up');
  TouchInput.down = down.has('down');
  TouchInput.brake = down.has('brake');
}

/** Register one finger. Horn is a one-shot; steer and pedals stay down until that pointerId is released. */
export function pressTouchPointer(pointerId: number, key: TouchControlKey): void {
  touchPointers.set(pointerId, key);
  if (key === 'horn') TouchInput.hornPressed = true;
  syncTouchHoldsFromPointers();
}

export function releaseTouchPointer(pointerId: number): void {
  if (!touchPointers.has(pointerId)) return;
  touchPointers.delete(pointerId);
  syncTouchHoldsFromPointers();
}

export function releaseAllTouchPointers(): void {
  touchPointers.clear();
  resetTouchInput();
}

/**
 * Safety net for a missed pointerup: with no registered pointer, throttle and steering
 * cannot stay latched. The horn pulse is left for the city scene to consume.
 */
export function ensureTouchHoldsMatchPointers(): void {
  syncTouchHoldsFromPointers();
}

