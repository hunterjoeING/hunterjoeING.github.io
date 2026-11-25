export class Scene {}

export const BlendModes = { ADD: 1 };
export const Input = { Keyboard: { JustDown: () => false } };
export const Math = {
  Clamp: (value, min, max) => globalThis.Math.min(max, globalThis.Math.max(min, value)),
  Linear: (start, end, t) => start + (end - start) * t,
  Between: (min, max) => globalThis.Math.floor((min + max) / 2),
  FloatBetween: (min, max) => (min + max) / 2,
  Angle: {
    Wrap: angle => globalThis.Math.atan2(globalThis.Math.sin(angle), globalThis.Math.cos(angle)),
    Between: (x, y, a, b) => globalThis.Math.atan2(b - y, a - x)
  },
  Distance: { Between: (x, y, a, b) => globalThis.Math.hypot(x - a, y - b) }
};

class Rectangle {
  constructor(x, y, width, height) {
    Object.assign(this, { x, y, width, height });
  }

  get left() { return this.x; }
  get top() { return this.y; }
  get right() { return this.x + this.width; }
  get bottom() { return this.y + this.height; }
  get centerX() { return this.x + this.width / 2; }
  get centerY() { return this.y + this.height / 2; }

  static Contains(rect, x, y) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }
}

export const Geom = { Rectangle };
