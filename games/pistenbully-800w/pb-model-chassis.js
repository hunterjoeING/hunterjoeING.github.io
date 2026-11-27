// Procedural 3D Builders for Alpine Steep-Slope Environment, Tracked Undercarriage
// (Exact Spline Grousers + 13-Tooth Sternrad) and MAN D3876 Hydrostatic X-Ray Internals

import * as THREE from 'three';
import { PB_SPECS } from './specs.js';
import { TRACK_LOOP } from './pb-kinematics.js';

function tagPart(obj, partId) {
  obj.userData.partId = partId;
  obj.traverse((c) => {
    if (c.isMesh) c.userData.partId = partId;
  });
  return obj;
}

// ============================================================================
// 1. ALPINE SKY DOME, MOUNTAIN RING & DYNAMIC SLOPED SNOW PISTE
// ============================================================================
export function buildAlpineEnvironment(mats) {
  // Horizon-locked sky & mountain silhouette ring (never tilts when slope pitches!)
  const horizonGroup = new THREE.Group();

  // Procedural gradient sky dome (switches cleanly between Blue Hour Night & Alpine Sunny Day)
  const skyGeo = new THREE.SphereGeometry(145, 32, 20);
  const skyUniforms = {
    uTopColor: { value: new THREE.Color(0x060d20) },
    uMidColor: { value: new THREE.Color(0x13264a) },
    uHorizonColor: { value: new THREE.Color(0x28436e) },
    uGlowColor: { value: new THREE.Color(0xd97757) },
    uNightMode: { value: 1.0 }
  };
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: skyUniforms,
    vertexShader: `
      varying vec3 vWorldDir;
      void main() {
        vWorldDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uTopColor;
      uniform vec3 uMidColor;
      uniform vec3 uHorizonColor;
      uniform vec3 uGlowColor;
      uniform float uNightMode;
      varying vec3 vWorldDir;
      void main() {
        float h = clamp(vWorldDir.y, -0.2, 1.0);
        vec3 col = mix(uHorizonColor, uMidColor, smoothstep(-0.02, 0.28, h));
        col = mix(col, uTopColor, smoothstep(0.24, 0.85, h));
        // Subtle alpine alpenglow band along uphill horizon (+X)
        float glowDir = max(0.0, dot(normalize(vec3(vWorldDir.x, 0.0, vWorldDir.z)), normalize(vec3(0.85, 0.0, -0.52))));
        float glowBand = exp(-abs(h - 0.04) * 12.0) * pow(glowDir, 3.0) * (0.45 * uNightMode + 0.15);
        col += uGlowColor * glowBand;
        gl_FragColor = vec4(col, 1.0);
      }
    `
  });
  const skyDome = new THREE.Mesh(skyGeo, skyMat);
  horizonGroup.add(skyDome);

  // Twinkling high-altitude alpine stars (visible in Blue Hour / Night mode)
  const starCount = 420;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const theta = (i * 2.39996) % (Math.PI * 2);
    const phi = Math.acos(0.18 + ((i * 7919) % 1000) / 1000 * 0.80);
    const r = 132;
    starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.cos(phi);
    starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xdbeafe,
    size: 0.72,
    transparent: true,
    opacity: 0.78,
    depthWrite: false
  });
  const stars = new THREE.Points(starGeo, starMat);
  horizonGroup.add(stars);

  // Procedural distant Alpine Mountain Ridge Ring (multi-peak sculpted silhouette far on horizon)
  const mountainMat = new THREE.MeshStandardMaterial({
    color: 0x1e324f,
    roughness: 0.90,
    metalness: 0.04,
    flatShading: true
  });
  const snowPeakMat = new THREE.MeshStandardMaterial({
    color: 0x4b6a94,
    roughness: 0.82,
    metalness: 0.02,
    flatShading: true
  });
  const mountainRing = new THREE.Group();
  const peakCount = 42;
  for (let i = 0; i < peakCount; i++) {
    const ang = (i / peakCount) * Math.PI * 2;
    const dist = 108 + (i % 4) * 10;
    const h = 16 + ((i * 29) % 22) + Math.sin(i * 1.7) * 6;
    const rad = 11 + ((i * 13) % 8);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(rad, h, 7), i % 3 === 0 ? snowPeakMat : mountainMat);
    cone.position.set(Math.cos(ang) * dist, h * 0.25 - 12, Math.sin(ang) * dist);
    cone.rotation.y = i * 0.9;
    mountainRing.add(cone);
  }
  horizonGroup.add(mountainRing);

  // Slope-locked world group (tilts around Z by +slopeRad so +X climbs uphill!)
  const slopeGroup = new THREE.Group();

  // High-resolution snow piste plane receiving shadows & custom corduroy/mogul/SNOWsat shader
  const { lengthX, widthZ } = PB_SPECS.slope;
  const snowGeo = new THREE.PlaneGeometry(lengthX, widthZ, 168, 96);
  const snowMesh = new THREE.Mesh(snowGeo, mats.snowSlope);
  snowMesh.rotation.x = -Math.PI / 2;
  snowMesh.position.set(2.0, 0.0, 0.0);
  snowMesh.receiveShadow = true;
  slopeGroup.add(snowMesh);

  // Under-crust skirt placed safely below deepest mogul trough (-0.45 m top -> zero poke-through!)
  const skirtMat = new THREE.MeshStandardMaterial({ color: 0x1e2c42, roughness: 0.95 });
  const skirt = new THREE.Mesh(new THREE.BoxGeometry(lengthX, 4.0, widthZ), skirtMat);
  skirt.position.set(2.0, -2.45, 0.0);
  slopeGroup.add(skirt);

  // Uphill Steel Winch Anchor Pylon (Deadman Anchor at x = +28 m)
  const anchorGroup = new THREE.Group();
  const ap = PB_SPECS.winch.anchorPoint;
  const pylonBase = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.36, 1.35, 10), mats.sprocketYellow);
  pylonBase.position.set(ap.x, 0.55, ap.z);
  pylonBase.castShadow = true;
  anchorGroup.add(pylonBase);
  const pylonRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.045, 8, 16), mats.darkChassis);
  pylonRing.position.set(ap.x - 0.16, ap.y, ap.z);
  pylonRing.rotation.y = Math.PI / 2;
  anchorGroup.add(pylonRing);
  const pylonCap = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), mats.beaconAmber);
  pylonCap.position.set(ap.x, 1.32, ap.z);
  anchorGroup.add(pylonCap);
  tagPart(anchorGroup, 'winch_47t');
  slopeGroup.add(anchorGroup);

  // Scrolling Alpine Piste Edge Marker Poles (black/red piste signs along z = ±11.5 m for motion cue!)
  const poleCount = 12;
  const poleSpacing = 5.4;
  const poles = [];
  const poleStickMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 });
  const poleTopRed = new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0x7f1d1d, emissiveIntensity: 0.6 });
  for (let side of [-1, 1]) {
    for (let i = 0; i < poleCount; i++) {
      const pole = new THREE.Group();
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 1.9, 6), poleStickMat);
      stick.position.y = 0.95;
      pole.add(stick);
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.04, 12), poleTopRed);
      disc.rotation.z = Math.PI / 2;
      disc.position.y = 1.72;
      pole.add(disc);
      pole.position.set(-28 + i * poleSpacing, 0, side * 11.2);
      slopeGroup.add(pole);
      poles.push({ mesh: pole, baseX: -28 + i * poleSpacing });
    }
  }

  function update(telemetry, bladeKin, tillerKin, snowsatBlend, nightMode, elapsed) {
    const u = mats.snowSlope.userData.snowUniforms;
    if (u) {
      u.uScrollX.value = telemetry.snowScrollM;
      u.uBladeX.value = bladeKin.cuttingEdgeCenter.x;
      u.uFinisherX.value = tillerKin.finisherTrailingX;
      u.uFinisherHalfW.value = tillerKin.finisherHalfWidth;
      u.uTillerActive.value = tillerKin.active ? 1.0 : 0.0;
      u.uSlip.value = telemetry.slipRatio;
      u.uSnowsat.value = snowsatBlend;
      u.uNightMode.value = nightMode ? 1.0 : 0.0;
      u.uTime.value = elapsed;
    }

    // Update uphill anchor Z position if turret rotated
    // Scroll piste marker poles seamlessly backward as machine climbs uphill
    const span = poleCount * poleSpacing;
    const scrollMod = ((telemetry.snowScrollM % span) + span) % span;
    for (let i = 0; i < poles.length; i++) {
      let x = poles[i].baseX - scrollMod;
      if (x < -30) x += span;
      if (x > 34) x -= span;
      poles[i].mesh.position.x = x;
    }
  }

  function setLightingMode(isNight) {
    if (isNight) {
      skyUniforms.uTopColor.value.setHex(0x050b1b);
      skyUniforms.uMidColor.value.setHex(0x0f2244);
      skyUniforms.uHorizonColor.value.setHex(0x203c68);
      skyUniforms.uGlowColor.value.setHex(0xd97757);
      skyUniforms.uNightMode.value = 1.0;
      starMat.opacity = 0.80;
      mountainMat.color.setHex(0x1f324d);
      snowPeakMat.color.setHex(0x4b6a94);
    } else {
      skyUniforms.uTopColor.value.setHex(0x1d4ed8);
      skyUniforms.uMidColor.value.setHex(0x3b82f6);
      skyUniforms.uHorizonColor.value.setHex(0xbae6fd);
      skyUniforms.uGlowColor.value.setHex(0xfffbeb);
      skyUniforms.uNightMode.value = 0.0;
      starMat.opacity = 0.0;
      mountainMat.color.setHex(0x64748b);
      snowPeakMat.color.setHex(0xe2edf8);
    }
  }

  return {
    horizonGroup,
    slopeGroup,
    anchorGroup,
    update,
    setLightingMode
  };
}

// ============================================================================
// 2. TRACKED UNDERCARRIAGE (EXACT SPLINE GROUSERS, 13-TOOTH STERNRAD & BOGIES)
// ============================================================================
function createSprocketGeometry(pitchRadius, teethCount, width) {
  // Build exact 2D gear profile whose tooth VALLEYS sit at angle k * (2*PI / teethCount)
  // so every aluminum grouser drops dead-center into a valley!
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teethCount;
  const rValley = pitchRadius - 0.042;
  const rTip = pitchRadius + 0.032;

  for (let k = 0; k < teethCount; k++) {
    const aValley = k * step;
    const aRise1 = aValley + step * 0.22;
    const aTip1 = aValley + step * 0.40;
    const aTip2 = aValley + step * 0.60;
    const aFall = aValley + step * 0.78;

    const p0x = Math.cos(aValley) * rValley, p0y = Math.sin(aValley) * rValley;
    if (k === 0) shape.moveTo(p0x, p0y);
    else shape.lineTo(p0x, p0y);
    shape.lineTo(Math.cos(aRise1) * rValley, Math.sin(aRise1) * rValley);
    shape.lineTo(Math.cos(aTip1) * rTip, Math.sin(aTip1) * rTip);
    shape.lineTo(Math.cos(aTip2) * rTip, Math.sin(aTip2) * rTip);
    shape.lineTo(Math.cos(aFall) * rValley, Math.sin(aFall) * rValley);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: width,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 2
  });
  geo.translate(0, 0, -width * 0.5);
  return geo;
}

function buildRubberBeltRibbon(loop, beltZOffsets, beltWidth, mat) {
  const group = new THREE.Group();
  const sampleCount = 120;
  const halfThick = 0.016;

  // Build one closed rectangular cross-section ribbon along TRACK_LOOP in XY
  const positions = [];
  const normals = [];
  const indices = [];

  for (let i = 0; i <= sampleCount; i++) {
    const s = (i / sampleCount) * loop.totalLength;
    const pt = loop.sampleAt(s);
    const ox = pt.x + pt.nx * halfThick;
    const oy = pt.y + pt.ny * halfThick;
    const ix = pt.x - pt.nx * halfThick;
    const iy = pt.y - pt.ny * halfThick;

    // 4 vertices around belt band thickness at cross-section i
    const hw = beltWidth * 0.5;
    positions.push(
      ox, oy, -hw,
      ox, oy, hw,
      ix, iy, hw,
      ix, iy, -hw
    );
    normals.push(
      pt.nx, pt.ny, 0,
      pt.nx, pt.ny, 0,
      -pt.nx, -pt.ny, 0,
      -pt.nx, -pt.ny, 0
    );

    if (i < sampleCount) {
      const a = i * 4;
      const b = (i + 1) * 4;
      for (let f = 0; f < 4; f++) {
        const fNext = (f + 1) % 4;
        indices.push(a + f, b + f, b + fNext);
        indices.push(a + f, b + fNext, a + fNext);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  for (const zOff of beltZOffsets) {
    const m = new THREE.Mesh(geo, mat);
    m.position.z = zOff;
    m.castShadow = true;
    m.receiveShadow = true;
    group.add(m);
  }
  return group;
}

export function buildTrackedUndercarriage(mats) {
  const root = new THREE.Group();
  const t = PB_SPECS.tracks;
  const loop = TRACK_LOOP;

  // Shared trapezoidal aluminum Kombi-/X-Track grouser bar geometry
  // Oriented with length along Z (width = 1.64 m), tangent along X, outward cleat along +Y!
  const grouserShape = new THREE.Shape();
  grouserShape.moveTo(-0.036, 0.0);
  grouserShape.lineTo(0.036, 0.0);
  grouserShape.lineTo(0.018, t.grouserHeight);
  grouserShape.lineTo(-0.018, t.grouserHeight);
  grouserShape.closePath();
  const grouserGeo = new THREE.ExtrudeGeometry(grouserShape, {
    depth: t.width,
    bevelEnabled: false
  });
  grouserGeo.translate(0, 0, -t.width * 0.5);

  // Steel ice-spike claw strip mounted on top edge of every grouser
  const spikeGeo = new THREE.BoxGeometry(0.022, 0.018, t.width * 0.72);
  spikeGeo.translate(0, t.grouserHeight + 0.006, 0);

  // Forged yellow/black 13-tooth rear drive sprocket (Sternrad)
  const sprocketGeo = createSprocketGeometry(loop.sprocketRadius, t.sprocketTeeth, 0.24);
  const wheelGeo = new THREE.CylinderGeometry(t.roadWheelRadius, t.roadWheelRadius, 0.22, 24);
  wheelGeo.rotateX(Math.PI / 2);
  const wheelRimGeo = new THREE.CylinderGeometry(t.roadWheelRadius * 0.54, t.roadWheelRadius * 0.54, 0.24, 16);
  wheelRimGeo.rotateX(Math.PI / 2);
  const idlerGeo = new THREE.CylinderGeometry(t.idlerRadius, t.idlerRadius, 0.24, 24);
  idlerGeo.rotateX(Math.PI / 2);
  const carrierGeo = new THREE.CylinderGeometry(t.carrierRollerRadius, t.carrierRollerRadius, 0.18, 14);
  carrierGeo.rotateX(Math.PI / 2);

  const sides = [];
  const dummy = new THREE.Object3D();

  for (const sideSign of [-1, 1]) {
    const sideGroup = new THREE.Group();
    const cz = sideSign * t.centerZ;
    sideGroup.position.z = cz;

    // 4 rubber reinforcement belts running around the exact track spline
    const belts = buildRubberBeltRibbon(loop, [-0.62, -0.22, 0.22, 0.62], 0.15, mats.rubberBelt);
    sideGroup.add(belts);

    // 60 Instanced Aluminum Grousers + Steel Ice Spikes
    const grouserInst = new THREE.InstancedMesh(grouserGeo, mats.aluminumGrouser, t.numGrousers);
    grouserInst.castShadow = true;
    grouserInst.receiveShadow = true;
    const spikeInst = new THREE.InstancedMesh(spikeGeo, mats.steelSpike, t.numGrousers);
    spikeInst.castShadow = false;
    sideGroup.add(grouserInst);
    sideGroup.add(spikeInst);

    // Rear Forged Drive Sprocket (twin spaced toothed rings + central planetary hub)
    const sprocketGroup = new THREE.Group();
    sprocketGroup.position.set(t.sprocketCenter.x, t.sprocketCenter.y, 0);
    for (const ringZ of [-0.36, 0.36]) {
      const ring = new THREE.Mesh(sprocketGeo, mats.sprocketYellow);
      ring.position.z = ringZ;
      ring.castShadow = true;
      sprocketGroup.add(ring);
    }
    const hubDrum = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.94, 16).rotateX(Math.PI / 2),
      mats.darkChassis
    );
    sprocketGroup.add(hubDrum);
    // Hub bolts for crystal-clear rotation visibility!
    for (let b = 0; b < 6; b++) {
      const ba = (b / 6) * Math.PI * 2;
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.0, 6).rotateX(Math.PI / 2), mats.aluminumGrouser);
      bolt.position.set(Math.cos(ba) * 0.16, Math.sin(ba) * 0.16, 0);
      sprocketGroup.add(bolt);
    }
    sideGroup.add(sprocketGroup);

    // Front Tensioner Idler Wheel (twin solid-rubber wheels)
    const idlerGroup = new THREE.Group();
    idlerGroup.position.set(t.idlerCenter.x, t.idlerCenter.y, 0);
    for (const wz of [-0.34, 0.34]) {
      const tire = new THREE.Mesh(idlerGeo, mats.rubberBelt);
      tire.position.z = wz;
      tire.castShadow = true;
      idlerGroup.add(tire);
      const rim = new THREE.Mesh(wheelRimGeo, mats.sprocketYellow);
      rim.position.z = wz;
      idlerGroup.add(rim);
    }
    const idlerAxle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 1.12, 12).rotateX(Math.PI / 2),
      mats.darkChassis
    );
    idlerGroup.add(idlerAxle);
    sideGroup.add(idlerGroup);

    // 5 Sprung Solid-Rubber Road Wheels + Torsion Swing Arms
    const roadWheels = [];
    const wheelY = t.beltY + t.roadWheelRadius;
    for (let wIdx = 0; wIdx < t.roadWheelX.length; wIdx++) {
      const wx = t.roadWheelX[wIdx];
      const bogieGroup = new THREE.Group();
      bogieGroup.position.set(wx, wheelY, 0);

      const spinGroup = new THREE.Group();
      for (const wz of [-0.34, 0.34]) {
        const tire = new THREE.Mesh(wheelGeo, mats.rubberBelt);
        tire.position.z = wz;
        tire.castShadow = true;
        spinGroup.add(tire);

        const rim = new THREE.Mesh(wheelRimGeo, mats.darkChassis);
        rim.position.z = wz;
        spinGroup.add(rim);

        // High-contrast yellow hub spoke bar so rotation is unmistakable!
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.048, 0.25), mats.sprocketYellow);
        spoke.position.z = wz;
        spinGroup.add(spoke);
      }
      bogieGroup.add(spinGroup);

      // Swing arm connecting wheel hub back to central chassis spine
      const armLen = t.centerZ - PB_SPECS.chassis.frameHalfWidth + 0.08;
      const swingArm = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.14, armLen),
        mats.darkChassis
      );
      swingArm.position.set(0.08, 0.06, -sideSign * (armLen * 0.5));
      bogieGroup.add(swingArm);

      sideGroup.add(bogieGroup);
      roadWheels.push({ bogieGroup, spinGroup, baseY: wheelY, phase: wIdx * 1.15 + (sideSign > 0 ? 0.5 : 0) });
    }

    // 2 Upper Carrier Rollers supporting top track belt
    const carrierRollers = [];
    for (const cp of t.carrierRollerPos) {
      const cg = new THREE.Group();
      cg.position.set(cp.x, cp.y, 0);
      for (const wz of [-0.34, 0.34]) {
        const roller = new THREE.Mesh(carrierGeo, mats.rubberBelt);
        roller.position.z = wz;
        cg.add(roller);
      }
      sideGroup.add(cg);
      carrierRollers.push(cg);
    }

    // Longitudinal undercarriage track-guide beam (Bogie-Rahmen)
    const guideBeam = new THREE.Mesh(new THREE.BoxGeometry(4.15, 0.16, 0.24), mats.darkChassis);
    guideBeam.position.set(-0.08, 0.56, 0);
    sideGroup.add(guideBeam);

    // Front hydraulic track tensioner cylinder
    const tensCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.65, 10).rotateZ(Math.PI / 2), mats.chromeRod);
    tensCyl.position.set(1.78, 0.56, 0);
    sideGroup.add(tensCyl);

    tagPart(sideGroup, 'tracks_undercarriage');
    root.add(sideGroup);

    sides.push({
      sideSign,
      grouserInst,
      spikeInst,
      sprocketGroup,
      idlerGroup,
      roadWheels,
      carrierRollers
    });
  }

  function update(telemetry, elapsed) {
    const offsets = [telemetry.trackOffsetLeftM, telemetry.trackOffsetRightM];
    const speedMag = Math.abs(telemetry.groundSpeedMs);
    const bounceAmp = Math.min(0.016, 0.004 + speedMag * 0.002 + telemetry.slipRatio * 0.012);

    for (let sIdx = 0; sIdx < 2; sIdx++) {
      const side = sides[sIdx];
      const offset = offsets[sIdx];

      // 1. Place all 60 aluminum grousers + steel spikes cleanly along exact closed spline!
      for (let i = 0; i < loop.numGrousers; i++) {
        const sPos = i * loop.grouserPitch + offset;
        const pt = loop.sampleAt(sPos);
        dummy.position.set(pt.x, pt.y, 0);
        // Align local +Y with outward normal (nx, ny) and local +X with tangent (tx, ty)
        // Since tangent = (cos a, sin a) and outward normal = (-sin a, cos a), Z-rotation by atan2(ty, tx) aligns BOTH!
        dummy.rotation.set(0, 0, Math.atan2(pt.ty, pt.tx));
        dummy.updateMatrix();
        side.grouserInst.setMatrixAt(i, dummy.matrix);
        side.spikeInst.setMatrixAt(i, dummy.matrix);
      }
      side.grouserInst.instanceMatrix.needsUpdate = true;
      side.spikeInst.instanceMatrix.needsUpdate = true;

      // 2. Rotate forged yellow 13-tooth drive sprocket with EXACT grouser-tooth mesh phase!
      side.sprocketGroup.rotation.z = loop.getSprocketAngle(offset);

      // 3. Rotate front idler & carrier rollers synchronously
      side.idlerGroup.rotation.z = -offset / t.idlerRadius;
      for (const cr of side.carrierRollers) {
        cr.rotation.z = -offset / t.carrierRollerRadius;
      }

      // 4. Rotate 5 road wheels synchronously + gentle dynamic suspension articulation
      for (const rw of side.roadWheels) {
        rw.spinGroup.rotation.z = -offset / t.roadWheelRadius;
        const bounce = Math.sin(elapsed * (5.5 + speedMag * 2.2) + rw.phase) * bounceAmp;
        rw.bogieGroup.position.y = rw.baseY + bounce;
      }
    }
  }

  return { root, update };
}

// ============================================================================
// 3. CHASSIS SPINE & MAN D3876 HYDROSTATIC X-RAY INTERNALS
// ============================================================================
function buildHydraulicTube(points, radius, mat) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
  const geo = new THREE.TubeGeometry(curve, 28, radius, 8, false);
  const mesh = new THREE.Mesh(geo, mat);
  return { mesh, curve };
}

export function buildChassisAndHydraulics(mats) {
  const root = new THREE.Group();
  const c = PB_SPECS.chassis;
  const t = PB_SPECS.tracks;

  // Central welded chassis backbone tub (between left & right tracks)
  const spineGroup = new THREE.Group();
  const spineFrame = new THREE.Mesh(
    new THREE.BoxGeometry(c.frameMaxX - c.frameMinX, 0.56, c.frameHalfWidth * 2),
    mats.darkChassis
  );
  spineFrame.position.set((c.frameMaxX + c.frameMinX) * 0.5, 0.72, 0);
  spineFrame.castShadow = true;
  spineFrame.receiveShadow = true;
  spineGroup.add(spineFrame);

  // Heavy front & rear axle cross-tubes connecting chassis to rear planetary hubs & front hitch
  const rearAxleHousing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, t.centerZ * 2, 16).rotateX(Math.PI / 2),
    mats.darkChassis
  );
  rearAxleHousing.position.set(t.sprocketCenter.x, t.sprocketCenter.y, 0);
  spineGroup.add(rearAxleHousing);

  const frontNosePlate = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.78, 0.92), mats.darkChassis);
  frontNosePlate.position.set(2.12, 0.84, 0);
  spineGroup.add(frontNosePlate);

  tagPart(spineGroup, 'hydrostatic_drive');
  root.add(spineGroup);

  // =========================================================================
  // INTERNAL POWERTRAIN & CLOSED-LOOP HYDROSTATIC HYDRAULICS (X-Ray Showcase!)
  // =========================================================================
  const internalsGroup = new THREE.Group();

  // A. MAN D3876 6-Cylinder Inline Diesel Engine (15.2 L, 540 PS / 400 kW, 2,500 Nm)
  const engineGroup = new THREE.Group();
  engineGroup.position.set(c.engineCenter.x, c.engineCenter.y, c.engineCenter.z);

  // Crankcase / Engine Block
  const block = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.54, 0.58), mats.engineBlock);
  block.castShadow = true;
  engineGroup.add(block);

  // Oil pan
  const oilPan = new THREE.Mesh(new THREE.BoxGeometry(1.26, 0.16, 0.46), mats.darkChassis);
  oilPan.position.y = -0.34;
  engineGroup.add(oilPan);

  // 6 Individual Cylinder Heads & Valve Cover along X
  const valveCover = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.16, 0.44), mats.engineValveCover);
  valveCover.position.y = 0.34;
  engineGroup.add(valveCover);
  for (let cyl = 0; cyl < 6; cyl++) {
    const cx = -0.52 + cyl * 0.208;
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.086, 0.22, 12), mats.aluminumGrouser);
    head.position.set(cx, 0.26, 0);
    engineGroup.add(head);
    // Exhaust manifold runner per cylinder
    const runner = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.22, 8).rotateX(Math.PI / 2), mats.cylBarrel);
    runner.position.set(cx, 0.22, -0.34);
    engineGroup.add(runner);
  }

  // Heavy Turbocharger on port side (-Z)
  const turboComp = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.05, 10, 16), mats.aluminumGrouser);
  turboComp.position.set(-0.22, 0.22, -0.44);
  turboComp.rotation.y = Math.PI / 2;
  engineGroup.add(turboComp);
  const turboTurb = new THREE.Mesh(new THREE.TorusGeometry(0.10, 0.045, 10, 16), mats.engineBlock);
  turboTurb.position.set(-0.34, 0.22, -0.44);
  turboTurb.rotation.y = Math.PI / 2;
  engineGroup.add(turboTurb);

  // Animated Cooling Fan & Serpentine Belt Pulleys at Rear of Engine (-X)
  const fanGroup = new THREE.Group();
  fanGroup.position.set(-0.76, 0.06, 0);
  const fanHub = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 12).rotateZ(Math.PI / 2), mats.sprocketYellow);
  fanGroup.add(fanHub);
  for (let b = 0; b < 7; b++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.28, 0.08), mats.darkChassis);
    const a = (b / 7) * Math.PI * 2;
    blade.position.set(0, Math.cos(a) * 0.18, Math.sin(a) * 0.18);
    blade.rotation.set(a, 0.35, 0);
    fanGroup.add(blade);
  }
  engineGroup.add(fanGroup);

  // Intercooler / Hydraulic Oil Radiator Core behind fan
  const radiator = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.72, 0.92), mats.louverBlack);
  radiator.position.set(-0.92, 0.08, 0);
  engineGroup.add(radiator);

  tagPart(engineGroup, 'hydrostatic_drive');
  internalsGroup.add(engineGroup);

  // B. Splitter Gearbox (Verteilergetriebe) & Axial-Piston Variable Displacement Pump Bank
  const pumpBank = new THREE.Group();
  pumpBank.position.set(c.splitterCenter.x, c.splitterCenter.y, 0);
  const splitterBox = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.44, 0.68), mats.planetarySteel);
  pumpBank.add(splitterBox);

  // 4 Axial-Piston Variable Pumps (Left Drive, Right Drive, Tiller, Winch/Blade)
  const pumpOffsets = [
    { x: 0.30, y: 0.08, z: -0.22, r: 0.115, l: 0.34 }, // Left Track Drive Pump (450 bar)
    { x: 0.30, y: 0.08, z: 0.22, r: 0.115, l: 0.34 },  // Right Track Drive Pump (450 bar)
    { x: 0.28, y: -0.14, z: -0.18, r: 0.095, l: 0.30 }, // AlpinFlexFräse Pump
    { x: 0.28, y: -0.14, z: 0.18, r: 0.095, l: 0.30 }   // 4.7-t Winch & Blade Pump
  ];
  for (const po of pumpOffsets) {
    const pMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(po.r, po.r * 1.06, po.l, 14).rotateZ(Math.PI / 2),
      mats.pumpGold
    );
    pMesh.position.set(po.x, po.y, po.z);
    pumpBank.add(pMesh);
    const endCap = new THREE.Mesh(
      new THREE.CylinderGeometry(po.r * 0.75, po.r * 0.75, 0.06, 12).rotateZ(Math.PI / 2),
      mats.darkChassis
    );
    endCap.position.set(po.x + po.l * 0.52, po.y, po.z);
    pumpBank.add(endCap);
  }
  tagPart(pumpBank, 'hydrostatic_drive');
  internalsGroup.add(pumpBank);

  // C. Rear Hydrostatic Motors + Planetary Final Drives inside both rear Sternrad hubs!
  for (const sideSign of [-1, 1]) {
    const motorGroup = new THREE.Group();
    motorGroup.position.set(t.sprocketCenter.x, t.sprocketCenter.y, sideSign * (t.centerZ - 0.38));
    const hydroMotor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.18, 0.36, 14).rotateX(Math.PI / 2),
      mats.pumpGold
    );
    motorGroup.add(hydroMotor);
    const planetary = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.28, 16).rotateX(Math.PI / 2),
      mats.planetarySteel
    );
    planetary.position.z = sideSign * 0.28;
    motorGroup.add(planetary);
    tagPart(motorGroup, 'hydrostatic_drive');
    internalsGroup.add(motorGroup);
  }

  // D. Color-Coded Animated Pulsing Hydraulic Circuits!
  const circuits = [];
  const addCircuit = (id, pts, radius, mat, pulseColorHex, speedSign = 1) => {
    const { mesh, curve } = buildHydraulicTube(pts, radius, mat);
    mesh.userData.partId = 'hydrostatic_drive';
    internalsGroup.add(mesh);

    // Animated glowing flow-pulse spheres riding along the hydraulic circuit!
    const pulseCount = 7;
    const pulseMat = new THREE.MeshBasicMaterial({ color: pulseColorHex });
    const pulseGeo = new THREE.SphereGeometry(radius * 1.55, 8, 8);
    const pulses = [];
    for (let i = 0; i < pulseCount; i++) {
      const pm = new THREE.Mesh(pulseGeo, pulseMat);
      internalsGroup.add(pm);
      pulses.push({ mesh: pm, phase: i / pulseCount });
    }
    circuits.push({ id, curve, mesh, pulses, speedSign });
  };

  // Left Track High-Pressure Supply (450 bar, Deep Red-Orange)
  addCircuit('driveLeftHigh', [
    [0.12, 1.00, -0.22], [-0.45, 0.88, -0.42], [-1.35, 0.66, -0.52], [-2.05, 0.54, -0.78], [-2.26, 0.48, -0.94]
  ], 0.032, mats.hydroHighPressure, 0xffedd5, 1);
  // Left Track Low-Pressure Return (25 bar, Cyan-Blue)
  addCircuit('driveLeftLow', [
    [-2.26, 0.40, -0.88], [-1.95, 0.46, -0.66], [-1.25, 0.56, -0.44], [-0.42, 0.72, -0.36], [0.06, 0.88, -0.26]
  ], 0.026, mats.hydroLowReturn, 0xbae6fd, 1);

  // Right Track High-Pressure Supply (450 bar, Deep Red-Orange)
  addCircuit('driveRightHigh', [
    [0.12, 1.00, 0.22], [-0.45, 0.88, 0.42], [-1.35, 0.66, 0.52], [-2.05, 0.54, 0.78], [-2.26, 0.48, 0.94]
  ], 0.032, mats.hydroHighPressure, 0xffedd5, 1);
  // Right Track Low-Pressure Return (25 bar, Cyan-Blue)
  addCircuit('driveRightLow', [
    [-2.26, 0.40, 0.88], [-1.95, 0.46, 0.66], [-1.25, 0.56, 0.44], [-0.42, 0.72, 0.36], [0.06, 0.88, 0.26]
  ], 0.026, mats.hydroLowReturn, 0xbae6fd, 1);

  // AlpinFlexFräse High-Pressure Circuit (Amber/Gold)
  addCircuit('tillerHigh', [
    [0.10, 0.78, -0.18], [-0.85, 0.64, -0.24], [-1.85, 0.62, -0.22], [-2.42, 0.68, -0.18], [-3.05, 0.42, -0.14]
  ], 0.028, mats.hydroTillerLine, 0xfef08a, 1);

  // 4.7-t Active Winch Circuit (Violet/Magenta up into roof turret!)
  addCircuit('winchHigh', [
    [0.10, 0.78, 0.18], [-0.35, 0.96, 0.24], [-0.72, 1.32, 0.14], [-0.92, 1.72, 0.0]
  ], 0.026, mats.hydroWinchLine, 0xf5d0fe, 1);

  // 12-Way Blade Front Hydraulic Manifold Circuit
  addCircuit('bladeHigh', [
    [0.18, 0.82, 0.0], [0.85, 0.78, 0.0], [1.65, 0.76, 0.0], [2.22, 0.68, 0.0]
  ], 0.026, mats.hydroHighPressure, 0xfed7aa, 1);

  root.add(internalsGroup);

  const tmpVec = new THREE.Vector3();

  function update(telemetry, xrayActive, elapsed) {
    fanGroup.rotation.x = telemetry.engineFanAngleRad;
    internalsGroup.visible = xrayActive;
    spineFrame.material = xrayActive ? mats.xrayShell : mats.darkChassis;
    spineFrame.castShadow = !xrayActive;

    if (!xrayActive) return;

    // Pulse emissive intensity with actual hydraulic bar pressures!
    const pDriveNorm = telemetry.pressuresBar.drive / PB_SPECS.identity.maxHydraulicPressureBar;
    const pTillerNorm = telemetry.pressuresBar.tiller / 400;
    const pWinchNorm = telemetry.pressuresBar.winch / 400;
    mats.hydroHighPressure.emissiveIntensity = 1.0 + pDriveNorm * 2.2;
    mats.hydroTillerLine.emissiveIntensity = 0.7 + pTillerNorm * 2.2;
    mats.hydroWinchLine.emissiveIntensity = 0.6 + pWinchNorm * 2.1;

    for (const circ of circuits) {
      let flowRate = 0.35;
      if (circ.id.startsWith('drive')) {
        flowRate = 0.20 + Math.abs(telemetry.trackSpeedLeftMs) * 0.26 + pDriveNorm * 0.35;
      } else if (circ.id === 'tillerHigh') {
        flowRate = telemetry.tillerRpm > 0 ? (0.45 + pTillerNorm * 0.75) : 0.06;
      } else if (circ.id === 'winchHigh') {
        flowRate = telemetry.winchForceKN > 0.2 ? (0.35 + pWinchNorm * 0.65) : 0.05;
      } else if (circ.id === 'bladeHigh') {
        flowRate = 0.22 + (telemetry.pressuresBar.blade / 260) * 0.45;
      }

      for (const p of circ.pulses) {
        const u = ((p.phase + elapsed * flowRate * circ.speedSign) % 1 + 1) % 1;
        circ.curve.getPointAt(u, tmpVec);
        p.mesh.position.copy(tmpVec);
      }
    }
  }

  return { root, internalsGroup, update };
}
