import { AACHEN, AACHEN_EXITS, AACHEN_HOME, AACHEN_HOME_POINT, AACHEN_INBOUND } from '../data/cityLayouts/aachen';
import type { CityPoint } from '../data/cityLayouts/types';

type AachenPreset = 'aachen_start' | 'aachen_finish';

export function isAachenCity(preset: string): preset is AachenPreset {
  return preset === 'aachen_start' || preset === 'aachen_finish';
}

const exitZone = ({ x, y }: CityPoint) => ({ x: x - 43, y: y - 41, w: 86, h: 82 });

export function aachenCityDrive(preset: AachenPreset, levelOrder: number, routeId: string) {
  const passThrough = preset === 'aachen_start';
  const exit: 'brand' | 'europaplatz' = passThrough && levelOrder === 2 ? 'brand' : 'europaplatz';
  const viaBrand = exit === 'brand';
  const motorway = viaBrand ? 'A44' : 'A544';
  const junction = viaBrand ? 'Aachen-Brand' : 'Europaplatz';
  const signLabel = !viaBrand && routeId === 'l1_route_b_nord'
    ? 'A544 · Kreuz Aachen → A44 Düsseldorf' : AACHEN_EXITS[exit].label;
  const goal = passThrough ? AACHEN_EXITS[exit] : AACHEN_HOME_POINT;

  return {
    layout: AACHEN, exit, exitPoint: AACHEN_EXITS[exit], goal, passThrough, signLabel, motorway, junction,
    spawn: passThrough ? { ...AACHEN_HOME_POINT, rot: Math.atan2(17, 103) } : AACHEN_INBOUND,
    target: passThrough ? exitZone(goal) : AACHEN_HOME,
    navLabel: passThrough ? `Zur ${motorway} · ${junction}` : 'Nach Hause · Pontviertel',
    completionLabel: `${motorway} erreicht · Gute Fahrt!`,
    title: passThrough ? `Aachen · Zuhause → ${motorway} ${junction}` : 'Aachen · Europaplatz → Zuhause',
    wrongExits: Object.entries(AACHEN_EXITS).filter(([id]) => id !== exit)
      .map(([, sign]) => ({ ...sign, zone: exitZone(sign) }))
  };
}
