import * as THREE from 'three';
import { beltPoint, timingDrive } from './ce-mechanics.js?v=0.5.0';

function bandGeometry(drive) {
  const positions = [], uvs = [], indices = [];
  // Inner face, two edges and fabric back share the same running coordinate.
  const section = [[-0.072, 0], [0.072, 0], [0.072, 0.024], [-0.072, 0.024], [-0.072, 0]];
  for (const seg of drive.segments) {
    const count = seg.kind === 'arc' ? Math.ceil(seg.sweep * 24) : 1;
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const p = beltPoint(seg, t);
      const start = positions.length / 3;
      section.forEach(([x, h], k) => {
        positions.push(x, p.y + h * p.ny, p.z + h * p.nz);
        uvs.push((seg.start + t * seg.length) / drive.pitch, k / 4);
        if (i && k) indices.push(start + k - 6, start + k - 1, start + k, start + k - 6, start + k, start + k - 5);
      });
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function installBelts(frames, layout, material, sprocket) {
  const drive = timingDrive();
  const wheels = [];
  const pixels = new Uint8Array(32 * 4);
  for (let x = 0; x < 32; x++) {
    const v = x < 7 ? 134 : x < 11 ? 74 : 48;
    pixels.set([v, v, v + 4, 255], x * 4);
  }
  const fabric = new THREE.DataTexture(pixels, 32, 1);
  fabric.wrapS = THREE.RepeatWrapping;
  fabric.colorSpace = THREE.SRGBColorSpace;
  fabric.needsUpdate = true;
  const rubber = material('valveCover').clone();
  rubber.map = fabric;
  rubber.color.setHex(0xffffff);
  rubber.metalness = 0.12;
  rubber.side = THREE.DoubleSide;
  const band = bandGeometry(drive);
  for (const [bank, frame] of frames.entries()) {
    const x = layout.timingX - bank * 0.24;
    const belt = new THREE.Mesh(band, rubber);
    belt.position.x = x;
    frame.add(belt);
    for (const [i, w] of drive.wheels.entries()) {
      const mat = material(w.id.startsWith('cam') ? 'machinedSteel' : 'chainGold');
      const geo = sprocket(w.teeth, w.radius, w.radius - 0.019, 0.13, 0.045, false);
      geo.rotateY(Math.PI / 2);
      const wheel = new THREE.Mesh(geo, mat);
      wheel.position.set(x, w.y, w.z);
      frame.add(wheel);
      const arc = drive.segments[2 * i];
      const phase = arc.angle + Math.PI / 2 - arc.start / w.radius;
      wheels.push({ wheel, ratio: drive.wheels[0].radius / w.radius, phase });
      // Both stacked crank pulleys and the offset bank cams have visible shaft extensions.
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.067, 0.067, 1.15, 12), mat);
      hub.rotation.z = Math.PI / 2;
      hub.position.set(x + 0.53, w.y, w.z);
      frame.add(hub);
    }
  }
  return {
    texture: fabric,
    update(crankRad) {
      fabric.offset.x = -(crankRad * drive.wheels[0].radius / drive.pitch) % 1;
      for (const w of wheels) w.wheel.rotation.x = crankRad * w.ratio + w.phase;
    }
  };
}
