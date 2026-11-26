export const BEACH_ARRIVAL_DURATION_MS = 3750;

const WATERLINE_Y = 85;
const PARKED_CAR_X = 51;
const PARKED_CAR_Y = 27;

export const BEACH_ARRIVAL_STAGE = {
  carX: PARKED_CAR_X, carY: PARKED_CAR_Y, waterlineY: WATERLINE_Y
};

const progress = (time: number, start: number, end: number) =>
  Math.max(0, Math.min(1, (time - start) / (end - start)));

function runner(time: number, delay: number, startX: number, endX: number, endY: number) {
  const exit = progress(time, delay, delay + 480);
  const run = progress(time, delay + 600, delay + 2540);
  return {
    x: Math.round(PARKED_CAR_X + (startX - PARKED_CAR_X) * exit + (endX - startX) * run),
    y: Math.round(PARKED_CAR_Y + 8 + 4 * exit + (endY - PARKED_CAR_Y - 12) * run),
    visible: time >= delay,
    moving: run > 0 && run < 1,
    splashing: run > 0.96,
    step: Math.floor(time / 88) % 2
  };
}

export function beachArrivalFrame(elapsedMs: number) {
  const time = Math.max(0, Math.min(BEACH_ARRIVAL_DURATION_MS, elapsedMs));
  const parentsExit = progress(time, 420, 1090);
  const parentsWalk = progress(time, 1290, 3380);
  return {
    doorOpen: time >= 140 && time < 1220,
    parents: {
      x: Math.round(PARKED_CAR_X - 18 * parentsExit + 52 * parentsWalk),
      y: Math.round(PARKED_CAR_Y + 4 + 34 * parentsWalk),
      visible: time >= 420,
      step: parentsWalk > 0 && parentsWalk < 1 ? Math.floor(time / 145) % 2 : 0
    },
    olderChild: runner(time, 160, 65, 117, WATERLINE_Y + 2),
    youngerChild: runner(time, 310, 68, 133, WATERLINE_Y + 1),
    dog: runner(time, 490, 70, 149, WATERLINE_Y + 4)
  };
}
