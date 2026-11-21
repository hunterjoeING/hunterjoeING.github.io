// Winding 3D Desert Canyon Track, Stratified Cliffs, Stone Arches & Pooled Boost-Pads / Obstacles / Pickups

import * as THREE from 'three';
import { getPodTextures } from './pod-textures.js';

export const TRACK_HALF_WIDTH = 12.2;
const WALL_START_U = 13.4;
const SAMPLE_COUNT = 720;
const MESH_SEGMENTS = 440;
const MAX_BOULDERS = 68;
const MAX_PICKUPS = 36;
const BOOST_PAD_COUNT = 16;

function pseudoRand(seed) {
  const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

export class CanyonTrack {
  constructor(parentScene) {
    this.parentScene = parentScene;
    this.tex = getPodTextures();
    this.group = new THREE.Group();
    parentScene.add(this.group);

    this.curve = this._createCurve();
    this.samples = [];
    this.totalLength = 0;
    this._buildLookupTable();

    this._buildMaterials();
    this._buildFloorAndCliffs();
    this._buildDistantMesas();
    this._buildStoneArches();
    this._buildBoostPads();
    this._buildPooledObstaclesAndPickups();

    this.layoutForLap(1);
  }

  _createCurve() {
    const pts = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r =
        335 +
        72 * Math.sin(2 * a) +
        44 * Math.cos(3 * a) -
        26 * Math.sin(5 * a);
      const y =
        10 +
        8.5 * Math.sin(3 * a + 0.4) +
        4.5 * Math.cos(2 * a);
      pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
    }
    return new THREE.CatmullRomCurve3(pts, true, 'centripetal', 0.5);
  }

  _buildLookupTable() {
    this.totalLength = this.curve.getLength();
    const worldUp = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const t = i / SAMPLE_COUNT;
      const pos = this.curve.getPointAt(t);
      const tangent = this.curve.getTangentAt(t).normalize();
      const right = new THREE.Vector3().crossVectors(tangent, worldUp).normalize();
      const up = new THREE.Vector3().crossVectors(right, tangent).normalize();
      this.samples.push({ pos, tangent, right, up, s: t * this.totalLength });
    }
  }

  // O(1) track frame query at distance s (wraps around totalLength)
  sampleAt(s, out) {
    const len = this.totalLength;
    const wrapped = ((s % len) + len) % len;
    const f = (wrapped / len) * SAMPLE_COUNT;
    const i0 = Math.floor(f) % SAMPLE_COUNT;
    const i1 = (i0 + 1) % SAMPLE_COUNT;
    const alpha = f - Math.floor(f);

    const a = this.samples[i0];
    const b = this.samples[i1];

    out.pos.lerpVectors(a.pos, b.pos, alpha);
    out.tangent.lerpVectors(a.tangent, b.tangent, alpha).normalize();
    out.right.lerpVectors(a.right, b.right, alpha).normalize();
    out.up.lerpVectors(a.up, b.up, alpha).normalize();
    return out;
  }

  // Converts (s, lateralU, heightY) into world position & optional basis matrix
  trackToWorld(s, u, yOffset, outPos, outQuat) {
    const frame = _scratchFrame;
    this.sampleAt(s, frame);
    outPos
      .copy(frame.pos)
      .addScaledVector(frame.right, u)
      .addScaledVector(frame.up, yOffset);

    if (outQuat) {
      _scratchNegT.copy(frame.tangent).negate();
      _scratchMat.makeBasis(frame.right, frame.up, _scratchNegT);
      outQuat.setFromRotationMatrix(_scratchMat);
    }
  }

  _buildMaterials() {
    this.sandAlbedo = this.tex.sandAlbedo.clone();
    this.sandAlbedo.repeat.set(3, 180);
    this.sandAlbedo.needsUpdate = true;

    this.sandBump = this.tex.sandBump.clone();
    this.sandBump.repeat.set(3, 180);
    this.sandBump.needsUpdate = true;

    this.sandMat = new THREE.MeshStandardMaterial({
      map: this.sandAlbedo,
      bumpMap: this.sandBump,
      bumpScale: 0.16,
      roughness: 0.92,
      metalness: 0.04
    });

    this.rockAlbedo = this.tex.rockAlbedo.clone();
    this.rockAlbedo.repeat.set(48, 2);
    this.rockAlbedo.needsUpdate = true;

    this.rockBump = this.tex.rockBump.clone();
    this.rockBump.repeat.set(48, 2);
    this.rockBump.needsUpdate = true;

    this.rockMat = new THREE.MeshStandardMaterial({
      map: this.rockAlbedo,
      bumpMap: this.rockBump,
      bumpScale: 0.42,
      roughness: 0.88,
      metalness: 0.06
    });

    this.boulderMat = new THREE.MeshStandardMaterial({
      map: this.tex.rockAlbedo,
      bumpMap: this.tex.rockBump,
      bumpScale: 0.35,
      color: 0xd98a5b,
      roughness: 0.86,
      metalness: 0.08
    });

    this.boostPadMat = new THREE.MeshStandardMaterial({
      map: this.tex.boostPadTex,
      emissive: new THREE.Color(0x38bdf8),
      emissiveMap: this.tex.boostPadTex,
      emissiveIntensity: 1.55,
      roughness: 0.25,
      metalness: 0.4
    });

    this.pickupMat = new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      emissive: new THREE.Color(0x0ea5e9),
      emissiveIntensity: 1.9,
      roughness: 0.15,
      metalness: 0.6
    });

    this.gateBeaconMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      emissive: new THREE.Color(0xf59e0b),
      emissiveIntensity: 1.8,
      roughness: 0.2,
      metalness: 0.4
    });
  }

  _buildFloorAndCliffs() {
    const N = MESH_SEGMENTS;
    const f = {
      pos: new THREE.Vector3(),
      tangent: new THREE.Vector3(),
      right: new THREE.Vector3(),
      up: new THREE.Vector3()
    };

    // 1. Track Sand Floor Ribbon (5 vertices across per ring for subtle canyon dish profile)
    const floorProfile = [
      { u: -15.5, y: 0.45 },
      { u: -9.5, y: 0.05 },
      { u: 0, y: 0 },
      { u: 9.5, y: 0.05 },
      { u: 15.5, y: 0.45 }
    ];
    const cols = floorProfile.length;
    const fPos = new Float32Array((N + 1) * cols * 3);
    const fUv = new Float32Array((N + 1) * cols * 2);
    const fIdx = [];

    for (let i = 0; i <= N; i++) {
      const s = (i / N) * this.totalLength;
      this.sampleAt(s, f);
      for (let c = 0; c < cols; c++) {
        const vi = i * cols + c;
        const p = floorProfile[c];
        const wx = f.pos.x + f.right.x * p.u + f.up.x * p.y;
        const wy = f.pos.y + f.right.y * p.u + f.up.y * p.y;
        const wz = f.pos.z + f.right.z * p.u + f.up.z * p.y;

        fPos[vi * 3] = wx;
        fPos[vi * 3 + 1] = wy;
        fPos[vi * 3 + 2] = wz;
        fUv[vi * 2] = c / (cols - 1);
        fUv[vi * 2 + 1] = i / N;
      }
    }

    for (let i = 0; i < N; i++) {
      for (let c = 0; c < cols - 1; c++) {
        const a = i * cols + c;
        const b = a + 1;
        const d = (i + 1) * cols + c;
        const e = d + 1;
        fIdx.push(a, b, d, b, e, d);
      }
    }

    const floorGeo = new THREE.BufferGeometry();
    floorGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
    floorGeo.setAttribute('uv', new THREE.BufferAttribute(fUv, 2));
    floorGeo.setIndex(fIdx);
    floorGeo.computeVertexNormals();

    const floorMesh = new THREE.Mesh(floorGeo, this.sandMat);
    floorMesh.receiveShadow = true;
    this.group.add(floorMesh);

    // 2. Left & Right Terraced Stratified Canyon Cliffs
    const cliffProfile = [
      { u: 0.0, y: -1.5 },
      { u: 0.4, y: 6.5 },
      { u: 4.5, y: 8.5 },
      { u: 6.2, y: 18.0 },
      { u: 12.0, y: 21.0 },
      { u: 15.0, y: 34.0 },
      { u: 28.0, y: 36.0 }
    ];

    [-1, 1].forEach((side) => {
      const cCols = cliffProfile.length;
      const cPos = new Float32Array((N + 1) * cCols * 3);
      const cUv = new Float32Array((N + 1) * cCols * 2);
      const cIdx = [];

      for (let i = 0; i <= N; i++) {
        const wrapI = i % N;
        const s = (wrapI / N) * this.totalLength;
        const ang = (wrapI / N) * Math.PI * 2;
        this.sampleAt(s, f);

        const wallJitter =
          Math.sin(ang * 23 + side) * 1.45 +
          Math.cos(ang * 47 - side * 2) * 0.75;
        const heightBoost = Math.sin(ang * 13 + side * 1.5) * 4.5;

        for (let c = 0; c < cCols; c++) {
          const vi = i * cCols + c;
          const prof = cliffProfile[c];
          const uDist = side * (WALL_START_U + prof.u + wallJitter * (c > 0 ? 1 : 0.4));
          const yH = prof.y + (c >= 3 ? heightBoost : 0);

          cPos[vi * 3] = f.pos.x + f.right.x * uDist + f.up.x * yH;
          cPos[vi * 3 + 1] = f.pos.y + f.right.y * uDist + f.up.y * yH;
          cPos[vi * 3 + 2] = f.pos.z + f.right.z * uDist + f.up.z * yH;
          cUv[vi * 2] = i / N;
          cUv[vi * 2 + 1] = c / (cCols - 1);
        }
      }

      for (let i = 0; i < N; i++) {
        for (let c = 0; c < cCols - 1; c++) {
          const a = i * cCols + c;
          const b = a + 1;
          const d = (i + 1) * cCols + c;
          const e = d + 1;
          if (side === 1) {
            cIdx.push(a, d, b, b, d, e);
          } else {
            cIdx.push(a, b, d, b, e, d);
          }
        }
      }

      const cliffGeo = new THREE.BufferGeometry();
      cliffGeo.setAttribute('position', new THREE.BufferAttribute(cPos, 3));
      cliffGeo.setAttribute('uv', new THREE.BufferAttribute(cUv, 2));
      cliffGeo.setIndex(cIdx);
      cliffGeo.computeVertexNormals();

      const cliffMesh = new THREE.Mesh(cliffGeo, this.rockMat);
      cliffMesh.castShadow = true;
      cliffMesh.receiveShadow = true;
      this.group.add(cliffMesh);
    });
  }

  _buildDistantMesas() {
    // Distant Monument-Valley-style flat-topped desert mesas in a single InstancedMesh
    const mesaCount = 42;
    const mesaGeo = new THREE.CylinderGeometry(0.55, 1.0, 1, 7);
    const mesaMat = new THREE.MeshStandardMaterial({
      map: this.tex.rockAlbedo,
      color: 0xc86d42,
      roughness: 0.94,
      metalness: 0.02
    });
    const inst = new THREE.InstancedMesh(mesaGeo, mesaMat, mesaCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < mesaCount; i++) {
      const angle = (i / mesaCount) * Math.PI * 2 + pseudoRand(i) * 0.14;
      const inner = i % 2 === 0;
      const dist = inner ? 95 + pseudoRand(i + 10) * 65 : 490 + pseudoRand(i + 20) * 140;
      const h = 38 + pseudoRand(i + 30) * 65;
      const r = 18 + pseudoRand(i + 40) * 26;

      dummy.position.set(Math.cos(angle) * dist, h * 0.42 - 8, Math.sin(angle) * dist);
      dummy.scale.set(r, h, r * (0.75 + pseudoRand(i + 50) * 0.5));
      dummy.rotation.y = pseudoRand(i + 60) * Math.PI;
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
    this.group.add(inst);
  }

  _buildStoneArches() {
    // 6 dramatic natural sandstone arches spanning across the canyon (s=0 is Start/Finish Gate)
    const archCount = 6;
    const pillarGeo = new THREE.CylinderGeometry(2.6, 4.0, 17, 9);
    const spanGeo = new THREE.TorusGeometry(14.6, 2.55, 8, 18, Math.PI);
    const beaconGeo = new THREE.OctahedronGeometry(0.85, 0);

    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();

    for (let i = 0; i < archCount; i++) {
      const s = (i / archCount) * this.totalLength;
      this.trackToWorld(s, 0, 0, pos, quat);

      const arch = new THREE.Group();
      arch.position.copy(pos);
      arch.quaternion.copy(quat);

      const leftPillar = new THREE.Mesh(pillarGeo, this.boulderMat);
      leftPillar.position.set(-14.4, 7.5, 0);
      leftPillar.castShadow = true;
      leftPillar.receiveShadow = true;
      arch.add(leftPillar);

      const rightPillar = new THREE.Mesh(pillarGeo, this.boulderMat);
      rightPillar.position.set(14.4, 7.5, 0);
      rightPillar.castShadow = true;
      rightPillar.receiveShadow = true;
      arch.add(rightPillar);

      const span = new THREE.Mesh(spanGeo, this.boulderMat);
      span.position.set(0, 11.2, 0);
      span.scale.set(1.0, 0.72, 1.35);
      span.castShadow = true;
      span.receiveShadow = true;
      arch.add(span);

      // Start/Finish gate gets glowing beacons
      if (i === 0) {
        [-11.8, 11.8].forEach((bx) => {
          const beacon = new THREE.Mesh(beaconGeo, this.gateBeaconMat);
          beacon.position.set(bx, 6.2, 0);
          arch.add(beacon);
        });
      }

      this.group.add(arch);
    }
  }

  _buildBoostPads() {
    this.boostPads = [];
    const padGeo = new THREE.PlaneGeometry(4.0, 9.2);
    padGeo.rotateX(-Math.PI / 2);

    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();

    for (let i = 0; i < BOOST_PAD_COUNT; i++) {
      const s = ((i + 0.45) / BOOST_PAD_COUNT) * this.totalLength;
      const u = (pseudoRand(i * 19 + 3) - 0.5) * 14.5;
      this.trackToWorld(s, u, 0.14, pos, quat);

      const mesh = new THREE.Mesh(padGeo, this.boostPadMat);
      mesh.position.copy(pos);
      mesh.quaternion.copy(quat);
      this.group.add(mesh);

      this.boostPads.push({ s, u, halfW: 2.3, halfL: 4.8 });
    }
  }

  _buildPooledObstaclesAndPickups() {
    const boulderGeo = new THREE.DodecahedronGeometry(1.0, 1);
    this.boulderInst = new THREE.InstancedMesh(boulderGeo, this.boulderMat, MAX_BOULDERS);
    this.boulderInst.castShadow = true;
    this.boulderInst.receiveShadow = true;
    this.group.add(this.boulderInst);

    const pickupGeo = new THREE.OctahedronGeometry(0.85, 0);
    this.pickupInst = new THREE.InstancedMesh(pickupGeo, this.pickupMat, MAX_PICKUPS);
    this.group.add(this.pickupInst);

    this.boulders = [];
    this.pickups = [];
    this._dummy = new THREE.Object3D();
  }

  layoutForLap(lap) {
    // Escalate boulder density with lap while keeping safe navigable corridors
    const activeBoulders = Math.min(MAX_BOULDERS, 36 + (lap - 1) * 8);
    this.boulders.length = 0;

    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();

    for (let i = 0; i < MAX_BOULDERS; i++) {
      if (i >= activeBoulders) {
        this._dummy.position.set(0, -999, 0);
        this._dummy.scale.setScalar(0.001);
        this._dummy.updateMatrix();
        this.boulderInst.setMatrixAt(i, this._dummy.matrix);
        continue;
      }

      // Keep clear zone around Start/Finish gate (first 75m and last 45m)
      const s = 75 + ((i + 0.5) / activeBoulders) * (this.totalLength - 120);
      const u = (pseudoRand(i * 31 + lap * 97) - 0.5) * (TRACK_HALF_WIDTH * 1.72);
      const radius = 1.45 + pseudoRand(i * 13 + lap * 41) * 1.35;
      const height = radius * (1.2 + pseudoRand(i * 7 + lap) * 1.1);

      this.trackToWorld(s, u, height * 0.42, pos, quat);
      this._dummy.position.copy(pos);
      this._dummy.quaternion.copy(quat);
      this._dummy.rotateY(pseudoRand(i * 23) * Math.PI * 2);
      this._dummy.scale.set(radius, height, radius * 0.92);
      this._dummy.updateMatrix();
      this.boulderInst.setMatrixAt(i, this._dummy.matrix);

      this.boulders.push({ s, u, radius: radius * 0.92 });
    }
    this.boulderInst.instanceMatrix.needsUpdate = true;

    // Place floating energy pickups along exciting racing lines (never inside a boulder)
    this.pickups.length = 0;
    for (let i = 0; i < MAX_PICKUPS; i++) {
      const s = 48 + (i / MAX_PICKUPS) * (this.totalLength - 80);
      let u = Math.sin(i * 1.15 + lap * 0.7) * (TRACK_HALF_WIDTH * 0.7);
      // Shift away if too close to any boulder
      for (let b = 0; b < this.boulders.length; b++) {
        const bd = this.boulders[b];
        if (Math.abs(bd.s - s) < 10 && Math.abs(bd.u - u) < bd.radius + 2.4) {
          u = u > 0 ? -TRACK_HALF_WIDTH * 0.6 : TRACK_HALF_WIDTH * 0.6;
          break;
        }
      }
      this.trackToWorld(s, u, 1.35, pos, quat);
      this.pickups.push({
        index: i,
        s,
        u,
        basePos: pos.clone(),
        collected: false
      });
    }
  }

  animateEntities(timeSec, boostPulse) {
    // Pulse boost pads slightly with time
    this.boostPadMat.emissiveIntensity = 1.35 + Math.sin(timeSec * 6.5) * 0.35 + boostPulse * 0.5;

    // Spin & bob energy pickups in 1 InstancedMesh update
    for (let i = 0; i < this.pickups.length; i++) {
      const p = this.pickups[i];
      if (p.collected) {
        this._dummy.position.set(0, -999, 0);
        this._dummy.scale.setScalar(0.001);
      } else {
        this._dummy.position.set(
          p.basePos.x,
          p.basePos.y + Math.sin(timeSec * 3.4 + i) * 0.28,
          p.basePos.z
        );
        this._dummy.rotation.set(0.35, timeSec * 2.6 + i, 0.25);
        this._dummy.scale.setScalar(1.0);
      }
      this._dummy.updateMatrix();
      this.pickupInst.setMatrixAt(i, this._dummy.matrix);
    }
    this.pickupInst.instanceMatrix.needsUpdate = true;
  }
}

const _scratchFrame = {
  pos: new THREE.Vector3(),
  tangent: new THREE.Vector3(),
  right: new THREE.Vector3(),
  up: new THREE.Vector3()
};
const _scratchNegT = new THREE.Vector3();
const _scratchMat = new THREE.Matrix4();
