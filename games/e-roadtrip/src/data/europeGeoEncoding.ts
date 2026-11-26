// Delta encoding in tenths of a world pixel. Zig-zag coding keeps short
// backwards and forwards steps small, and a high bit marks a continued byte.
const precision = 10;

export function encodeMapPath(path: readonly number[]): string {
  const previous = [0, 0];
  let bytes = '';
  for (let i = 0; i < path.length; i++) {
    const axis = i % 2;
    const value = Math.round(path[i] * precision);
    const delta = value - previous[axis];
    previous[axis] = value;
    let code = delta < 0 ? -delta * 2 - 1 : delta * 2;
    while (code >= 128) {
      bytes += String.fromCharCode((code & 127) | 128);
      code >>>= 7;
    }
    bytes += String.fromCharCode(code);
  }
  return btoa(bytes);
}

export function decodeMapPath(encoded: string): number[] {
  const bytes = atob(encoded);
  const path: number[] = [];
  const previous = [0, 0];
  let code = 0, shift = 0;
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes.charCodeAt(i);
    code |= (byte & 127) << shift;
    if (byte & 128) {
      shift += 7;
      continue;
    }
    const axis = path.length % 2;
    previous[axis] += (code & 1) ? -(code + 1) / 2 : code / 2;
    path.push(previous[axis] / precision);
    code = 0;
    shift = 0;
  }
  return path;
}
