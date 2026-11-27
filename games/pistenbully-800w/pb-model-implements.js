// Procedural 3D Builders for PistenBully 800 W Cab/Body, LED Armada, 12-Way Blade,
// AlpinFlexFräse + Elastic Yellow Finisher (+ Snow-Microscope Cutaway), 4.7-t Winch & 3D Force Vectors

import * as THREE from 'three';
import { PB_SPECS } from './specs.js';

function tagPart(obj, partId) {
  obj.userData.partId = partId;
  obj.traverse((c) => {
    if (c.isMesh) c.userData.partId = partId;
  });
  return obj;
}

// ============================================================================
// EXACT 2-POINT HYDRAULIC CYLINDER 3D BUILDER & UPDATER
// ============================================================================
const UP_Y = new THREE.Vector3(0, 1, 0);
const _vA = new THREE.Vector3();
const _vB = new THREE.Vector3();
const _vDir = new THREE.Vector3();

export function createHydraulicCylinderMesh(barrelRadius, barrelLen, mats, partId) {
  const group = new THREE.Group();

  // Barrel anchored at origin, extending along +Y
  const barrelPivot = new THREE.Group();
  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(barrelRadius, barrelRadius, barrelLen, 12),
    mats.cylBarrel
  );
  barrel.position.y = barrelLen * 0.5;
  barrel.castShadow = true;
  barrelPivot.add(barrel);

  // Seal gland collar at barrel tip
  const gland = new THREE.Mesh(
    new THREE.CylinderGeometry(barrelRadius * 1.18, barrelRadius * 1.18, 0.055, 12),
    mats.darkChassis
  );
  gland.position.y = barrelLen;
  barrelPivot.add(gland);

  // Clevis eye at base A
  const eyeA = new THREE.Mesh(
    new THREE.CylinderGeometry(barrelRadius * 1.1, barrelRadius * 1.1, barrelRadius * 2.1, 10).rotateZ(Math.PI / 2),
    mats.darkChassis
  );
  barrelPivot.add(eyeA);
  group.add(barrelPivot);

  // Chrome piston rod anchored at B, extending along -Y back into barrel!
  const rodPivot = new THREE.Group();
  const rodLen = barrelLen * 0.96;
  const rod = new THREE.Mesh(
    new THREE.CylinderGeometry(barrelRadius * 0.55, barrelRadius * 0.55, rodLen, 12),
    mats.chromeRod
  );
  rod.position.y = -rodLen * 0.5;
  rod.castShadow = true;
  rodPivot.add(rod);

  const eyeB = new THREE.Mesh(
    new THREE.CylinderGeometry(barrelRadius * 1.0, barrelRadius * 1.0, barrelRadius * 1.9, 10).rotateZ(Math.PI / 2),
    mats.darkChassis
  );
  rodPivot.add(eyeB);
  group.add(rodPivot);

  tagPart(group, partId);
  return { group, barrelPivot, rodPivot };
}

export function updateHydraulicCylinderMesh(cylMesh, cylData) {
  _vA.set(cylData.a.x, cylData.a.y, cylData.a.z);
  _vB.set(cylData.b.x, cylData.b.y, cylData.b.z);
  _vDir.set(cylData.dir.x, cylData.dir.y, cylData.dir.z);

  cylMesh.barrelPivot.position.copy(_vA);
  cylMesh.barrelPivot.quaternion.setFromUnitVectors(UP_Y, _vDir);

  cylMesh.rodPivot.position.copy(_vB);
  cylMesh.rodPivot.quaternion.setFromUnitVectors(UP_Y, _vDir);
}

// ============================================================================
// 1. PANORAMIC CAB, CARMINE RED ENGINE DECK, COCKPIT & LED WORKLIGHT ARMADA
// ============================================================================
function createVolumetricConeMaterial(colorHex, opacity) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: {
      uColor: { value: new THREE.Color(colorHex) },
      uOpacity: { value: opacity }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormalV;
      varying vec3 vViewDir;
      void main() {
        vUv = uv;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vNormalV = normalize(normalMatrix * normal);
        vViewDir = normalize(-mvPos.xyz);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUv;
      varying vec3 vNormalV;
      varying vec3 vViewDir;
      void main() {
        // vUv.y = 1 at narrow lamp tip, 0 at wide far end
        float axial = smoothstep(0.0, 0.72, vUv.y) * smoothstep(1.0, 0.88, vUv.y);
        float edge = pow(abs(dot(vNormalV, vViewDir)), 1.6);
        float a = axial * edge * uOpacity;
        gl_FragColor = vec4(uColor, a);
      }
    `
  });
}

export function buildCabAndBody(mats) {
  const root = new THREE.Group();
  const c = PB_SPECS.chassis;
  const shellSwapMeshes = [];

  const registerShell = (mesh, normalMat) => {
    shellSwapMeshes.push({ mesh, normalMat });
    return mesh;
  };

  // --- A. REAR CARMINE RED ENGINE DECK & SIDE LIVERY COWLINGS ---
  const deckGroup = new THREE.Group();

  // Main rear engine hood shell (becomes translucent in Hydraulics X-Ray!)
  const engineHood = new THREE.Mesh(new THREE.BoxGeometry(2.38, 0.72, 1.88), mats.redBody);
  engineHood.position.set(-1.18, 1.24, 0);
  engineHood.castShadow = true;
  engineHood.receiveShadow = true;
  registerShell(engineHood, mats.redBody);
  deckGroup.add(engineHood);

  // Side livery plates ("PistenBully 800 W") cleanly displayed on port & starboard flanks!
  const liveryGeo = new THREE.PlaneGeometry(2.28, 0.68);
  for (const side of [-1, 1]) {
    const plate = new THREE.Mesh(liveryGeo, mats.redLivery);
    plate.position.set(-1.18, 1.24, side * 0.952);
    plate.rotation.y = side > 0 ? 0 : Math.PI;
    registerShell(plate, mats.redLivery);
    deckGroup.add(plate);
  }

  // Sloped upper engine deck cover + black perforated cooling louver grilles on top deck
  const deckTop = new THREE.Mesh(new THREE.BoxGeometry(2.26, 0.08, 1.76), mats.darkChassis);
  deckTop.position.set(-1.18, 1.62, 0);
  registerShell(deckTop, mats.darkChassis);
  deckGroup.add(deckTop);

  for (const side of [-1, 1]) {
    const louver = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.04, 0.42), mats.louverBlack);
    louver.position.set(-1.32, 1.67, side * 0.56);
    registerShell(louver, mats.louverBlack);
    deckGroup.add(louver);
  }

  // Rear grille + bright Red LED Taillights
  const rearGrill = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.56, 1.62), mats.louverBlack);
  rearGrill.position.set(-2.38, 1.22, 0);
  registerShell(rearGrill, mats.louverBlack);
  deckGroup.add(rearGrill);

  for (const side of [-1, 1]) {
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.14, 0.34), mats.tailRed);
    tail.position.set(-2.40, 1.34, side * 0.68);
    deckGroup.add(tail);
  }

  // Vertical Exhaust Stack with chrome heat shield on port side (-Z)
  const exPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.078, 0.98, 12), mats.darkChassis);
  exPipe.position.set(c.exhaustTip.x, c.exhaustTip.y - 0.48, c.exhaustTip.z);
  exPipe.castShadow = true;
  deckGroup.add(exPipe);
  const exShield = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.56, 12), mats.aluminumGrouser);
  exShield.position.set(c.exhaustTip.x, c.exhaustTip.y - 0.54, c.exhaustTip.z);
  deckGroup.add(exShield);
  const exTip = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.068, 0.16, 12), mats.chromeRod);
  exTip.position.set(c.exhaustTip.x, c.exhaustTip.y, c.exhaustTip.z);
  exTip.rotation.z = 0.25;
  deckGroup.add(exTip);

  // Mudguards / Fenders over rear tracks
  for (const side of [-1, 1]) {
    const fender = new THREE.Mesh(new THREE.BoxGeometry(2.65, 0.08, 0.56), mats.redBody);
    fender.position.set(-1.12, 1.06, side * 1.18);
    registerShell(fender, mats.redBody);
    deckGroup.add(fender);
  }

  tagPart(deckGroup, 'cab_cockpit');
  root.add(deckGroup);

  // --- B. MODERN ANGULAR PANORAMIC CAB (KÄSSBOHRER 800 W) ---
  const cabGroup = new THREE.Group();

  // Lower cab nose & floor pan (Carmine Red)
  const cabFloor = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.38, c.cabHalfWidth * 2), mats.redBody);
  cabFloor.position.set(0.96, 1.24, 0);
  cabFloor.castShadow = true;
  registerShell(cabFloor, mats.redBody);
  cabGroup.add(cabFloor);

  // Angled front red nose fascia below windshield
  const noseShape = new THREE.Shape();
  noseShape.moveTo(0.0, 1.05);
  noseShape.lineTo(1.98, 1.05);
  noseShape.lineTo(2.14, 1.44);
  noseShape.lineTo(1.94, 1.72);
  noseShape.lineTo(0.0, 1.72);
  noseShape.closePath();
  const noseGeo = new THREE.ExtrudeGeometry(noseShape, {
    depth: c.cabHalfWidth * 1.96,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 2
  });
  noseGeo.translate(0, 0, -c.cabHalfWidth * 0.98);
  const cabNose = new THREE.Mesh(noseGeo, mats.redBody);
  cabNose.castShadow = true;
  registerShell(cabNose, mats.redBody);
  cabGroup.add(cabNose);

  // White "800 W" badge on front nose hood
  const frontGrill = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 1.26), mats.louverBlack);
  frontGrill.position.set(2.12, 1.42, 0);
  frontGrill.rotation.z = -0.35;
  cabGroup.add(frontGrill);

  // Slim ROPS Cab Pillars (front A-pillars & rear B-pillars)
  const pillarMat = mats.darkChassis;
  for (const side of [-1, 1]) {
    const zP = side * (c.cabHalfWidth - 0.06);
    // Front swept A-pillar
    const aPillar = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.18, 0.09), pillarMat);
    aPillar.position.set(1.74, 2.20, zP);
    aPillar.rotation.z = 0.34;
    cabGroup.add(aPillar);
    // Rear B-pillar
    const bPillar = new THREE.Mesh(new THREE.BoxGeometry(0.11, 1.10, 0.10), pillarMat);
    bPillar.position.set(0.02, 2.20, zP);
    cabGroup.add(bPillar);
    // Side mirror arm & housing
    const mirrorArm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.03, 0.32), pillarMat);
    mirrorArm.position.set(1.68, 2.28, side * (c.cabHalfWidth + 0.14));
    cabGroup.add(mirrorArm);
    const mirrorHead = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.32, 0.14), pillarMat);
    mirrorHead.position.set(1.78, 2.16, side * (c.cabHalfWidth + 0.28));
    cabGroup.add(mirrorHead);
  }

  // Swept Carmine Red Cab Roof Cap with Forward Sun Visor Overhang
  const roofCap = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.15, c.cabHalfWidth * 2.04), mats.redBody);
  roofCap.position.set(0.84, c.cabRoofY, 0);
  roofCap.castShadow = true;
  cabGroup.add(roofCap);

  const roofVisor = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.07, c.cabHalfWidth * 2.02), mats.darkChassis);
  roofVisor.position.set(1.84, c.cabRoofY - 0.03, 0);
  roofVisor.rotation.z = -0.18;
  cabGroup.add(roofVisor);

  // Panoramic Tinted Fresnel Windshield & Side Windows
  const windshield = new THREE.Mesh(new THREE.PlaneGeometry(c.cabHalfWidth * 1.92, 1.14), mats.cabGlass);
  windshield.position.set(1.74, 2.20, 0);
  windshield.rotation.order = 'YXZ';
  windshield.rotation.y = Math.PI / 2;
  windshield.rotation.x = -0.34;
  cabGroup.add(windshield);

  // Dual windshield wipers
  for (const wz of [-0.42, 0.42]) {
    const wiper = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.56, 0.02), mats.darkChassis);
    wiper.position.set(1.86, 1.94, wz);
    wiper.rotation.z = 0.34;
    cabGroup.add(wiper);
  }

  const sideWinShape = new THREE.Shape();
  sideWinShape.moveTo(0.05, 1.72);
  sideWinShape.lineTo(1.90, 1.72);
  sideWinShape.lineTo(1.56, 2.68);
  sideWinShape.lineTo(0.05, 2.68);
  sideWinShape.closePath();
  const sideWinGeo = new THREE.ShapeGeometry(sideWinShape);
  for (const side of [-1, 1]) {
    const sw = new THREE.Mesh(sideWinGeo, mats.cabGlass);
    sw.position.z = side * (c.cabHalfWidth - 0.01);
    if (side < 0) sw.rotation.y = Math.PI;
    // Flip X when rotated PI
    if (side < 0) sw.scale.x = -1;
    cabGroup.add(sw);
  }
  const rearWin = new THREE.Mesh(new THREE.PlaneGeometry(c.cabHalfWidth * 1.84, 0.92), mats.cabGlass);
  rearWin.position.set(-0.02, 2.22, 0);
  rearWin.rotation.y = -Math.PI / 2;
  cabGroup.add(rearWin);

  // --- C. ILLUMINATED COCKPIT INTERIOR (Seat, Joystick, SNOWsat Display!) ---
  const cockpitGroup = new THREE.Group();
  // Ergonomic driver seat
  const seatBase = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.14, 0.50), mats.darkChassis);
  seatBase.position.set(0.68, 1.68, 0);
  cockpitGroup.add(seatBase);
  const seatBack = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.68, 0.48), mats.darkChassis);
  seatBack.position.set(0.46, 2.02, 0);
  seatBack.rotation.z = 0.14;
  cockpitGroup.add(seatBack);
  // PistenBully Red Seat Headrest Accent
  const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.30), mats.redBody);
  headrest.position.set(0.42, 2.40, 0);
  cockpitGroup.add(headrest);

  // Right armrest + multi-axis Blade/Tiller Joystick (iconic red-capped grip!)
  const armrest = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.08, 0.14), mats.darkChassis);
  armrest.position.set(0.76, 1.88, 0.34);
  cockpitGroup.add(armrest);
  const joyStick = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.032, 0.18, 10), mats.darkChassis);
  joyStick.position.set(0.95, 1.98, 0.34);
  joyStick.rotation.z = -0.18;
  cockpitGroup.add(joyStick);
  const joyCap = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), mats.redBody);
  joyCap.position.set(0.98, 2.07, 0.34);
  cockpitGroup.add(joyCap);

  // Dashboard + Glowing SNOWsat Touchscreen Display!
  const dash = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.22, 1.68), mats.darkChassis);
  dash.position.set(1.42, 1.76, 0);
  cockpitGroup.add(dash);

  const screenMount = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.28, 0.44), mats.darkChassis);
  screenMount.position.set(1.36, 1.98, 0.36);
  screenMount.rotation.y = -0.35;
  cockpitGroup.add(screenMount);

  const snowsatDisplay = new THREE.Mesh(new THREE.PlaneGeometry(0.40, 0.25), mats.snowsatScreen);
  snowsatDisplay.position.set(1.33, 1.98, 0.36);
  snowsatDisplay.rotation.y = -Math.PI / 2 - 0.35;
  cockpitGroup.add(snowsatDisplay);

  // Soft interior cockpit glow light (warm-cyan instrument bounce!)
  const cockpitLight = new THREE.PointLight(0x38bdf8, 1.8, 3.2, 2.0);
  cockpitLight.position.set(1.02, 2.26, 0.12);
  cockpitGroup.add(cockpitLight);
  cabGroup.add(cockpitGroup);

  // --- D. FULL LED WORKLIGHT ARMADA + VOLUMETRIC CONES + AMBER ROOF BEACONS ---
  const lightsGroup = new THREE.Group();
  const volumetricCones = [];

  // 6 Forward Roof LED Floodlights aimed onto the 12-Way Blade & Steep Slope ahead
  const fwdLedBar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.11, 1.96), mats.darkChassis);
  fwdLedBar.position.set(1.88, c.cabRoofY + 0.04, 0);
  lightsGroup.add(fwdLedBar);
  for (let i = 0; i < 6; i++) {
    const lz = -0.82 + (i / 5) * 1.64;
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.075, 0.20), mats.ledWhite);
    led.position.set(1.94, c.cabRoofY + 0.04, lz);
    lightsGroup.add(led);
  }
  // 2 Lower Nose LED Headlights
  for (const lz of [-0.72, 0.72]) {
    const lowLed = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.09, 0.24), mats.ledWhite);
    lowLed.position.set(2.11, 1.48, lz);
    lightsGroup.add(lowLed);
  }

  // 4 Rear Roof LED Floodlights aimed down onto AlpinFlexFräse & Yellow Finisher!
  const rearLedBar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.10, 1.84), mats.darkChassis);
  rearLedBar.position.set(-0.08, c.cabRoofY + 0.04, 0);
  lightsGroup.add(rearLedBar);
  for (let i = 0; i < 4; i++) {
    const lz = -0.72 + (i / 3) * 1.44;
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.075, 0.22), mats.ledWhite);
    led.position.set(-0.14, c.cabRoofY + 0.04, lz);
    lightsGroup.add(led);
  }

  // Volumetric LED Light Cones (Forward onto Blade & Snow, Rearward onto Tiller & Yellow Finisher!)
  const coneGeoFwd = new THREE.ConeGeometry(3.2, 11.5, 22, 1, true);
  coneGeoFwd.translate(0, -5.75, 0); // Tip at origin, flares along -Y
  const coneMatFwd = createVolumetricConeMaterial(0xdbeeff, 0.14);
  for (const lz of [-0.58, 0.58]) {
    const cone = new THREE.Mesh(coneGeoFwd, coneMatFwd);
    cone.position.set(1.95, c.cabRoofY + 0.02, lz);
    cone.rotation.z = 1.24; // Aim forward (+X) and down (-Y) onto blade & snow ahead!
    lightsGroup.add(cone);
    volumetricCones.push(cone);
  }

  const coneGeoRear = new THREE.ConeGeometry(2.6, 8.2, 20, 1, true);
  coneGeoRear.translate(0, -4.1, 0);
  const coneMatRear = createVolumetricConeMaterial(0xe0f2fe, 0.13);
  for (const lz of [-0.52, 0.52]) {
    const cone = new THREE.Mesh(coneGeoRear, coneMatRear);
    cone.position.set(-0.14, c.cabRoofY + 0.02, lz);
    cone.rotation.z = -1.02; // Aim rearward (-X) and down (-Y) onto yellow finisher & corduroy!
    lightsGroup.add(cone);
    volumetricCones.push(cone);
  }

  // Real Three.js SpotLights casting vivid illumination onto blade, snow, tiller & corduroy!
  const fwdSpotTarget = new THREE.Object3D();
  fwdSpotTarget.position.set(10.5, 0.0, 0);
  lightsGroup.add(fwdSpotTarget);
  const fwdSpot = new THREE.SpotLight(0xeef6ff, 34, 28, Math.PI * 0.34, 0.62, 1.75);
  fwdSpot.position.set(1.98, c.cabRoofY + 0.05, 0);
  fwdSpot.target = fwdSpotTarget;
  lightsGroup.add(fwdSpot);

  const rearSpotTarget = new THREE.Object3D();
  rearSpotTarget.position.set(-6.8, 0.0, 0);
  lightsGroup.add(rearSpotTarget);
  const rearSpot = new THREE.SpotLight(0xe6f4ff, 26, 20, Math.PI * 0.38, 0.60, 1.75);
  rearSpot.position.set(-0.18, c.cabRoofY + 0.05, 0);
  rearSpot.target = rearSpotTarget;
  lightsGroup.add(rearSpot);

  // Dual Rotating/Flashing Amber LED Beacons on Cab Roof
  const beacons = [];
  for (const bp of c.beaconPos) {
    const bBase = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.10, 0.06, 12), mats.darkChassis);
    bBase.position.set(bp.x, bp.y - 0.04, bp.z);
    lightsGroup.add(bBase);
    const dome = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.082, 0.14, 14), mats.beaconAmber.clone());
    dome.position.set(bp.x, bp.y + 0.05, bp.z);
    lightsGroup.add(dome);
    beacons.push(dome);
  }
  const beaconGlowLight = new THREE.PointLight(0xff8c00, 3.6, 8.5, 1.8);
  beaconGlowLight.position.set(1.38, 3.05, 0);
  lightsGroup.add(beaconGlowLight);

  cabGroup.add(lightsGroup);
  tagPart(cabGroup, 'cab_cockpit');
  root.add(cabGroup);

  function setXray(active) {
    for (const item of shellSwapMeshes) {
      item.mesh.material = active ? mats.xrayShell : item.normalMat;
      item.mesh.castShadow = !active;
    }
  }

  function setLightingMode(isNight) {
    fwdSpot.intensity = isNight ? 36 : 8;
    rearSpot.intensity = isNight ? 28 : 6;
    cockpitLight.intensity = isNight ? 1.8 : 0.4;
    coneMatFwd.uniforms.uOpacity.value = isNight ? 0.10 : 0.0;
    coneMatRear.uniforms.uOpacity.value = isNight ? 0.09 : 0.0;
    mats.ledWhite.emissiveIntensity = isNight ? 3.8 : 0.9;
    mats.tailRed.emissiveIntensity = isNight ? 3.0 : 0.9;
  }

  function update(telemetry, isNight) {
    // Double-flash amber LED beacon strobe (alternating left/right phase like real alpine groomers!)
    const a = telemetry.beaconAngleRad;
    const pulseL = Math.pow(Math.max(0, Math.sin(a)), 6) + 0.55 * Math.pow(Math.max(0, Math.sin(a * 2.0 + 0.6)), 10);
    const pulseR = Math.pow(Math.max(0, Math.sin(a + Math.PI * 0.85)), 6) + 0.55 * Math.pow(Math.max(0, Math.sin(a * 2.0 + 2.4)), 10);
    const nightBoost = isNight ? 1.0 : 0.42;
    beacons[0].material.emissiveIntensity = (0.7 + pulseL * 4.8) * nightBoost;
    beacons[1].material.emissiveIntensity = (0.7 + pulseR * 4.8) * nightBoost;
    beaconGlowLight.intensity = (1.5 + Math.max(pulseL, pulseR) * 9.5) * (isNight ? 1.0 : 0.25);
  }

  return { root, setXray, setLightingMode, update };
}

// ============================================================================
// 2. 12-WAY FRONT SNOW BLADE (12-WEGE-RÄUMSCHILD) + 8 HYDRAULIC CYLINDERS
// ============================================================================
function createCurvedMoldboardGeometry(width, height) {
  // Authentic concave C-curve snow-rolling moldboard cross-section!
  const shape = new THREE.Shape();
  const h = height * 0.5;
  shape.moveTo(0.24, -h);          // Bottom cutting edge tip (forward +X)
  shape.quadraticCurveTo(-0.08, -h * 0.2, 0.02, h * 0.45);
  shape.quadraticCurveTo(0.10, h * 0.85, 0.22, h); // Top snow-curl lip
  shape.lineTo(0.14, h);
  shape.quadraticCurveTo(0.02, h * 0.82, -0.06, h * 0.42);
  shape.quadraticCurveTo(-0.16, -h * 0.2, 0.14, -h);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: false });
  geo.translate(0, 0, -width * 0.5);
  return geo;
}

export function buildBlade12Way(mats) {
  const root = new THREE.Group();
  const b = PB_SPECS.blade;

  // 1. Lift Boom (pivots at chassis nose boomPivot)
  const boomGroup = new THREE.Group();
  boomGroup.position.set(b.boomPivot.x, b.boomPivot.y, 0);
  for (const side of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(b.boomLength + 0.12, 0.16, 0.11), mats.darkChassis);
    arm.position.set(b.boomLength * 0.5, 0, side * b.liftCylChassisZ);
    arm.castShadow = true;
    boomGroup.add(arm);
  }
  const boomCross = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.20, 0.78), mats.darkChassis);
  boomCross.position.set(b.boomLength * 0.65, 0, 0);
  boomGroup.add(boomCross);
  root.add(boomGroup);

  // 2. Quick-Hitch Angle/Tilt/Pitch Head
  const headGroup = new THREE.Group();
  const headTower = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.64, 0.72), mats.darkChassis);
  headTower.position.set(0.04, 0.14, 0);
  headTower.castShadow = true;
  headGroup.add(headTower);
  root.add(headGroup);

  // 3. Center Moldboard (3.50 m wide) + Top Snow Guard Mesh + Mirror-Polished Cutting Edge
  const bladeGroup = new THREE.Group();
  bladeGroup.rotation.order = 'YXZ'; // Matches kinematics: yaw (angle) -> roll (tilt) -> pitch

  const centerMold = new THREE.Mesh(createCurvedMoldboardGeometry(b.centerWidth, b.height), mats.bladeSteel);
  centerMold.castShadow = true;
  centerMold.receiveShadow = true;
  bladeGroup.add(centerMold);

  // Bright mirror-polished steel cutting edge (Schürfleiste) along bottom edge
  const edgeStrip = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.14, b.centerWidth + 0.02), mats.cuttingEdge);
  edgeStrip.position.set(0.21, -b.height * 0.5 + 0.04, 0);
  bladeGroup.add(edgeStrip);

  // Top perforated snow-retention screen guard (classic PistenBully blade look!)
  const topGuard = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.24, b.centerWidth * 0.92), mats.louverBlack);
  topGuard.position.set(0.18, b.height * 0.5 + 0.11, 0);
  topGuard.rotation.z = -0.22;
  bladeGroup.add(topGuard);

  // Structural rear reinforcement box ribs behind moldboard
  for (const rz of [-1.25, -0.52, 0.52, 1.25]) {
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.78, 0.07), mats.darkChassis);
    rib.position.set(-0.14, -0.02, rz);
    bladeGroup.add(rib);
  }
  const backBar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, b.centerWidth * 0.96), mats.darkChassis);
  backBar.position.set(-0.20, 0.04, 0);
  bladeGroup.add(backBar);

  // 4. Left & Right Hydraulic Foldable Wings (Klappohren, 0.90 m each -> 5.30 m total!)
  const wingGeo = createCurvedMoldboardGeometry(b.wingWidth, b.height * 0.96);
  const wings = [];
  for (const side of [-1, 1]) {
    const wingPivot = new THREE.Group();
    wingPivot.position.set(0, 0, side * b.wingHingeZ);

    // Hinge pin cylinder
    const hingePin = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, b.height * 0.85, 10), mats.sprocketYellow);
    wingPivot.add(hingePin);

    const wingMesh = new THREE.Mesh(wingGeo, mats.bladeSteel);
    wingMesh.position.z = side * (b.wingWidth * 0.5);
    wingMesh.castShadow = true;
    wingMesh.receiveShadow = true;
    wingPivot.add(wingMesh);

    const wingEdge = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.13, b.wingWidth), mats.cuttingEdge);
    wingEdge.position.set(0.21, -b.height * 0.48 + 0.04, side * (b.wingWidth * 0.5));
    wingPivot.add(wingEdge);

    // Crimson side end-plate accent on wing outer tips
    const endPlate = new THREE.Mesh(new THREE.BoxGeometry(0.42, b.height * 0.88, 0.05), mats.redBody);
    endPlate.position.set(0.10, -0.02, side * b.wingWidth);
    wingPivot.add(endPlate);

    bladeGroup.add(wingPivot);
    wings.push({ side, pivot: wingPivot });
  }

  root.add(bladeGroup);

  // 5. All 8 Exact 2-Point Hydraulic Cylinders (matched to exact telescopic min/max bounds!)
  const cylMeshes = {
    liftLeft: createHydraulicCylinderMesh(0.058, 0.78, mats, 'blade_12way'),
    liftRight: createHydraulicCylinderMesh(0.058, 0.78, mats, 'blade_12way'),
    angleLeft: createHydraulicCylinderMesh(0.048, 0.68, mats, 'blade_12way'),
    angleRight: createHydraulicCylinderMesh(0.048, 0.68, mats, 'blade_12way'),
    tilt: createHydraulicCylinderMesh(0.042, 0.48, mats, 'blade_12way'),
    pitch: createHydraulicCylinderMesh(0.046, 0.49, mats, 'blade_12way'),
    wingLeft: createHydraulicCylinderMesh(0.042, 0.56, mats, 'blade_12way'),
    wingRight: createHydraulicCylinderMesh(0.042, 0.56, mats, 'blade_12way')
  };
  for (const cm of Object.values(cylMeshes)) root.add(cm.group);

  tagPart(root, 'blade_12way');

  function update(bladeKin) {
    boomGroup.rotation.z = bladeKin.boomPitchRad;

    headGroup.position.set(bladeKin.headOrigin.x, bladeKin.headOrigin.y, bladeKin.headOrigin.z);
    headGroup.rotation.z = bladeKin.headPitchRad;

    bladeGroup.position.set(bladeKin.bladeOrigin.x, bladeKin.bladeOrigin.y, bladeKin.bladeOrigin.z);
    bladeGroup.rotation.set(bladeKin.tiltRad, bladeKin.angleRad, bladeKin.pitchRad);

    for (const w of wings) {
      w.pivot.rotation.y = w.side * bladeKin.wingRad;
    }

    // Update all 8 hydraulic cylinders to exact kinematic endpoints!
    for (const key of Object.keys(cylMeshes)) {
      updateHydraulicCylinderMesh(cylMeshes[key], bladeKin.cylinders[key]);
    }
  }

  return { root, update };
}

// ============================================================================
// 3. ALPINFLEXFRÄSE (AFF), ELASTIC YELLOW FINISHER & SNOW-MICROSCOPE CUTAWAY
// ============================================================================
export function buildTillerAndFinisher(mats) {
  const root = new THREE.Group();
  const ti = PB_SPECS.tiller;

  // 1. Rear Trailing Lift Frame (Nachlauf-Aufhängung)
  const armGroup = new THREE.Group();
  armGroup.position.set(ti.hitchPivot.x, ti.hitchPivot.y, 0);
  for (const side of [-1, 1]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(ti.armLength, 0.14, 0.10), mats.darkChassis);
    beam.position.set(-ti.armLength * 0.5, 0, side * ti.liftCylArmLocal.z);
    beam.castShadow = true;
    armGroup.add(beam);
  }
  const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 1.4), mats.darkChassis);
  crossBeam.position.set(-ti.armLength * 0.82, 0.04, 0);
  armGroup.add(crossBeam);
  root.add(armGroup);

  // Twin Hydraulic Lift / Downpressure Cylinders
  const liftCylLeft = createHydraulicCylinderMesh(0.052, 0.74, mats, 'alpinflex_tiller');
  const liftCylRight = createHydraulicCylinderMesh(0.052, 0.74, mats, 'alpinflex_tiller');
  root.add(liftCylLeft.group, liftCylRight.group);

  // 2. AlpinFlexFräse Housing & High-Speed Rotating Toothed Cutter Shaft
  const tillerAssembly = new THREE.Group();

  // Split Red Tiller Hood into Left (always solid) & Right (cut open in Sinter-Microscope mode!)
  const halfMainW = ti.mainWidth * 0.5;
  const hoodGeo = new THREE.BoxGeometry(0.68, ti.housingHeight, halfMainW);
  const hoodLeft = new THREE.Mesh(hoodGeo, mats.tillerRed);
  hoodLeft.position.set(0.0, 0.18, -halfMainW * 0.5);
  hoodLeft.castShadow = true;
  hoodLeft.receiveShadow = true;
  tillerAssembly.add(hoodLeft);

  const hoodRight = new THREE.Mesh(hoodGeo, mats.tillerRed);
  hoodRight.position.set(0.0, 0.18, halfMainW * 0.5);
  hoodRight.castShadow = true;
  hoodRight.receiveShadow = true;
  tillerAssembly.add(hoodRight);

  // Visible Flanking Hydraulic Drive Motors (Anodized gold/dark steel) on outer tiller ends!
  for (const side of [-1, 1]) {
    const motor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.15, 0.30, 14).rotateX(Math.PI / 2),
      mats.pumpGold
    );
    motor.position.set(0.0, 0.08, side * (halfMainW + 0.12));
    tillerAssembly.add(motor);
  }

  // High-Speed Rotating Cutter Shaft (Fräswelle) studded with Helical Steel Milling Teeth!
  const shaftGroup = new THREE.Group();
  const coreTube = new THREE.Mesh(
    new THREE.CylinderGeometry(ti.shaftRadius * 0.72, ti.shaftRadius * 0.72, ti.mainWidth * 0.98, 16).rotateX(Math.PI / 2),
    mats.darkChassis
  );
  shaftGroup.add(coreTube);

  const toothCount = 78;
  const toothGeo = new THREE.BoxGeometry(0.045, 0.14, 0.032);
  const teethInst = new THREE.InstancedMesh(toothGeo, mats.cuttingEdge, toothCount);
  const td = new THREE.Object3D();
  for (let i = 0; i < toothCount; i++) {
    const tz = -halfMainW * 0.94 + (i / (toothCount - 1)) * (ti.mainWidth * 0.94);
    const angle = i * 0.68; // Helical spiral distribution like real AlpinFlexFräse!
    td.position.set(Math.cos(angle) * ti.shaftRadius, Math.sin(angle) * ti.shaftRadius, tz);
    td.rotation.set(0, 0, angle);
    td.updateMatrix();
    teethInst.setMatrixAt(i, td.matrix);
  }
  teethInst.instanceMatrix.needsUpdate = true;
  shaftGroup.add(teethInst);
  tillerAssembly.add(shaftGroup);
  tagPart(tillerAssembly, 'alpinflex_tiller');
  root.add(tillerAssembly);

  // 3. ICONIC SIGNAL-YELLOW ELASTIC FINISHER ("GELBER TEPPICH") + FOLDING SIDE WINGS (6.30 m!)
  const finisherGroup = new THREE.Group();
  const segCount = ti.finisherSegments;
  const segLen = ti.finisherLength / segCount;

  // Build articulated main center mat (4.30 m) + foldable left/right side wings (1.00 m each)
  const mainSegments = [];
  const leftWingPivot = new THREE.Group();
  const rightWingPivot = new THREE.Group();
  const leftWingSegments = [];
  const rightWingSegments = [];

  const createFinisherStrip = (width) => {
    const strip = new THREE.Group();
    // Flexible bright yellow polyurethane upper sheet
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(segLen * 1.06, 0.042, width),
      mats.yellowFinisher
    );
    plate.castShadow = true;
    plate.receiveShadow = true;
    strip.add(plate);

    // Molded 3D corduroy-shaping ribs along underside (spaced at exact ribSpacing = 0.095 m!)
    const ribCount = Math.max(4, Math.floor(width / ti.ribSpacing));
    const ribGeo = new THREE.BoxGeometry(segLen * 1.04, 0.026, 0.036);
    const ribInst = new THREE.InstancedMesh(ribGeo, mats.yellowFinisher, ribCount);
    const rd = new THREE.Object3D();
    for (let r = 0; r < ribCount; r++) {
      const rz = -width * 0.5 + (r + 0.5) * (width / ribCount);
      rd.position.set(0, -0.028, rz);
      rd.updateMatrix();
      ribInst.setMatrixAt(r, rd.matrix);
    }
    ribInst.instanceMatrix.needsUpdate = true;
    strip.add(ribInst);
    return strip;
  };

  for (let i = 0; i < segCount; i++) {
    const mSeg = createFinisherStrip(ti.mainWidth);
    finisherGroup.add(mSeg);
    mainSegments.push(mSeg);

    const lwSeg = createFinisherStrip(ti.wingWidth);
    lwSeg.position.z = -ti.wingWidth * 0.5;
    leftWingPivot.add(lwSeg);
    leftWingSegments.push(lwSeg);

    const rwSeg = createFinisherStrip(ti.wingWidth);
    rwSeg.position.z = ti.wingWidth * 0.5;
    rightWingPivot.add(rwSeg);
    rightWingSegments.push(rwSeg);
  }

  // Yellow hinge bars attaching left/right wings to main finisher
  leftWingPivot.position.z = -halfMainW;
  rightWingPivot.position.z = halfMainW;
  finisherGroup.add(leftWingPivot, rightWingPivot);
  tagPart(finisherGroup, 'yellow_finisher');
  root.add(finisherGroup);

  // 4. "SCHNEE-MIKROSKOP" 3D LONGITUDINAL CUTAWAY BLOCK (Tiller + Finisher + Sintering!)
  const sinterGroup = new THREE.Group();
  sinterGroup.visible = false;

  // Transparent glacier glass cutaway wall right along z = +1.05 m (right side of tiller)
  const sliceZ = 1.08;
  const snowCutMat = new THREE.MeshStandardMaterial({
    color: 0xdbeafe,
    roughness: 0.72,
    metalness: 0.05,
    transparent: true,
    opacity: 0.90
  });
  const snowSlab = new THREE.Mesh(new THREE.BoxGeometry(2.85, 0.44, 0.92), snowCutMat);
  snowSlab.position.set(-4.05, -0.20, sliceZ);
  sinterGroup.add(snowSlab);

  // Stage A: Coarse Ice Chunks ahead of the cutter shaft (x = -2.85..-3.35)
  const chunkMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd, roughness: 0.35, metalness: 0.1 });
  const chunkCount = 26;
  const chunks = [];
  for (let i = 0; i < chunkCount; i++) {
    const m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.05 + (i % 3) * 0.016, 0), chunkMat);
    sinterGroup.add(m);
    chunks.push({ mesh: m, seed: i / chunkCount, lane: (i % 5) * 0.16 - 0.32 });
  }

  // Stage B: Warm Micro-Friction Shear Glow Zone right under the spinning milling teeth!
  const frictionGlowMat = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    transparent: true,
    opacity: 0.42,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const frictionZone = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.94, 16).rotateX(Math.PI / 2), frictionGlowMat);
  frictionZone.position.set(-3.36, 0.08, sliceZ);
  sinterGroup.add(frictionZone);

  // Stage C: Animated Sintering Ice-Bridge Crystals solidifying behind the Yellow Finisher!
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x7dd3fc,
    emissiveIntensity: 1.85,
    roughness: 0.2
  });
  const crystalCount = 34;
  const crystals = [];
  for (let i = 0; i < crystalCount; i++) {
    const cMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.028, 0), crystalMat);
    sinterGroup.add(cMesh);
    crystals.push({ mesh: cMesh, phase: i / crystalCount, lane: ((i * 7) % 5) * 0.16 - 0.32 });
  }

  tagPart(sinterGroup, 'yellow_finisher');
  root.add(sinterGroup);

  function update(tillerKin, telemetry, sinterCutawayActive, elapsed) {
    armGroup.rotation.z = tillerKin.armPitchRad;
    updateHydraulicCylinderMesh(liftCylLeft, tillerKin.cylinders.liftLeft);
    updateHydraulicCylinderMesh(liftCylRight, tillerKin.cylinders.liftRight);

    tillerAssembly.position.set(tillerKin.shaftCenter.x, tillerKin.shaftCenter.y, 0);
    tillerAssembly.rotation.z = tillerKin.housingPitchRad;

    // Spin the toothed AlpinFlexFräse cutter shaft!
    shaftGroup.rotation.z = telemetry.tillerShaftAngleRad;

    // Slice open right tiller hood in Snow-Microscope Cutaway mode so spinning teeth are 100% visible!
    hoodRight.material = sinterCutawayActive ? mats.xrayShell : mats.tillerRed;
    hoodRight.castShadow = !sinterCutawayActive;

    // Update articulated elastic Yellow Finisher curve segments!
    const curve = tillerKin.finisherCurve;
    for (let i = 0; i < segCount; i++) {
      const p0 = curve[i];
      const p1 = curve[i + 1];
      const mx = (p0.x + p1.x) * 0.5;
      const my = (p0.y + p1.y) * 0.5;
      const ang = Math.atan2(p1.y - p0.y, p1.x - p0.x) + Math.PI; // Strip local +X faces forward

      mainSegments[i].position.set(mx, my, 0);
      mainSegments[i].rotation.z = ang;

      leftWingSegments[i].position.set(mx, my, -ti.wingWidth * 0.5);
      leftWingSegments[i].rotation.z = ang;

      rightWingSegments[i].position.set(mx, my, ti.wingWidth * 0.5);
      rightWingSegments[i].rotation.z = ang;
    }

    // Fold/Unfold Yellow Finisher Side Wings cleanly!
    leftWingPivot.rotation.x = tillerKin.wingFoldRad;
    rightWingPivot.rotation.x = -tillerKin.wingFoldRad;

    // Animate Snow-Microscope Cutaway (Ice Chunks -> Milling Friction -> Sintering Ice Bridges!)
    sinterGroup.visible = sinterCutawayActive;
    if (sinterCutawayActive) {
      const flowSpeed = Math.max(0.25, Math.abs(telemetry.groundSpeedMs) * 0.45);
      frictionZone.position.set(tillerKin.shaftCenter.x, Math.max(0.05, tillerKin.shaftCenter.y - 0.14), sliceZ);
      frictionGlowMat.opacity = tillerKin.active ? (0.28 + 0.18 * Math.sin(elapsed * 14)) : 0.06;

      for (const ch of chunks) {
        const u = (ch.seed + elapsed * flowSpeed * 0.35) % 1;
        // Move from ahead of shaft (-2.65) into milling zone (-3.35) where chunks shatter smaller!
        const x = -2.65 - u * 0.78;
        const y = -0.02 + Math.sin(u * 9.0 + ch.seed * 6) * 0.04;
        const sc = 1.0 - Math.pow(u, 2.2) * 0.75;
        ch.mesh.position.set(x, y, sliceZ + ch.lane);
        ch.mesh.rotation.set(elapsed * 2, u * 5, 0);
        ch.mesh.scale.setScalar(sc);
      }

      for (const cr of crystals) {
        const u = (cr.phase + elapsed * flowSpeed * 0.28) % 1;
        // Emerge beneath yellow finisher (-3.75) and solidify into sintered ice bridges (-5.35)
        const x = -3.72 - u * 1.65;
        const y = -0.03 - (cr.phase * 0.16) + Math.sin(u * 4.0) * 0.015;
        const grow = 0.45 + u * 0.85;
        cr.mesh.position.set(x, y, sliceZ + cr.lane);
        cr.mesh.scale.setScalar(grow);
      }
    }
  }

  return { root, update };
}

// ============================================================================
// 4. 360° ACTIVE 4.7-t WINCH (SEILWINDE) & CATENARY STEEL CABLE
// ============================================================================
export function buildWinch47t(mats) {
  const root = new THREE.Group();
  const w = PB_SPECS.winch;

  // Fixed turret pedestal ring on rear engine deck
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.64, 0.24, 20), mats.darkChassis);
  pedestal.position.set(w.turretPivot.x, w.turretPivot.y, w.turretPivot.z);
  root.add(pedestal);

  // 360° Rotating Turret Assembly
  const turretGroup = new THREE.Group();
  turretGroup.position.set(w.turretPivot.x, w.turretPivot.y, w.turretPivot.z);

  // Main 4.7-t Hydraulic Capstan/Drum Housing (Carmine Red + Anthracite steel)
  const drumHousing = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.48, 0.94), mats.redBody);
  drumHousing.position.set(-0.18, 0.34, 0);
  drumHousing.castShadow = true;
  turretGroup.add(drumHousing);

  // Visible spooled steel cable drum inside open side window
  const cableDrum = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.24, 0.56, 18).rotateX(Math.PI / 2),
    mats.steelCable
  );
  cableDrum.position.set(-0.14, 0.34, 0);
  turretGroup.add(cableDrum);

  // Hydraulic Winch Drive Motor on starboard side
  const winchMotor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.15, 0.28, 14).rotateX(Math.PI / 2),
    mats.pumpGold
  );
  winchMotor.position.set(-0.14, 0.34, 0.56);
  turretGroup.add(winchMotor);

  // Long Cantilevered Winch Boom Arm sweeping forward over the cab roof!
  const boomGroup = new THREE.Group();
  boomGroup.position.set(w.boomPivotLocal.x, w.boomPivotLocal.y, 0);
  const boomTube = new THREE.Mesh(new THREE.BoxGeometry(w.boomLength, 0.16, 0.20), mats.winchSteel);
  boomTube.position.set(w.boomLength * 0.5, 0, 0);
  boomTube.castShadow = true;
  boomGroup.add(boomTube);

  // Yellow safety stripe & front fairlead sheave pulley at boom tip
  const boomStripe = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.17, 0.21), mats.sprocketYellow);
  boomStripe.position.set(w.boomLength - 0.45, 0, 0);
  boomGroup.add(boomStripe);

  const fairleadSheave = new THREE.Mesh(
    new THREE.TorusGeometry(0.14, 0.036, 8, 18),
    mats.sprocketYellow
  );
  fairleadSheave.position.set(w.boomLength, 0, 0);
  boomGroup.add(fairleadSheave);

  turretGroup.add(boomGroup);
  root.add(turretGroup);

  // Exact 2-Point Boom Elevation Hydraulic Cylinder
  const boomCyl = createHydraulicCylinderMesh(0.044, 1.08, mats, 'winch_47t');
  root.add(boomCyl.group);

  // Dynamic Catenary Steel Winch Cable (instanced tight cylindrical links -> zero per-frame geometry alloc!)
  const cableSegCount = w.cableSamples;
  const cableSegGeo = new THREE.CylinderGeometry(0.016, 0.016, 1.0, 6);
  const cableInst = new THREE.InstancedMesh(cableSegGeo, mats.steelCable, cableSegCount);
  cableInst.castShadow = false;
  root.add(cableInst);

  tagPart(root, 'winch_47t');

  const _c0 = new THREE.Vector3();
  const _c1 = new THREE.Vector3();
  const _cDir = new THREE.Vector3();
  const _cMid = new THREE.Vector3();
  const _cQuat = new THREE.Quaternion();
  const _cScale = new THREE.Vector3();
  const _cMat = new THREE.Matrix4();

  function update(winchKin, telemetry) {
    turretGroup.rotation.y = winchKin.turretYawRad;
    boomGroup.rotation.z = winchKin.boomElevRad;
    updateHydraulicCylinderMesh(boomCyl, winchKin.boomCylinder);

    // Spin drum subtly as vehicle climbs under cable tension
    if (winchKin.engaged) {
      cableDrum.rotation.z = telemetry.snowScrollM * 2.5;
    }

    cableInst.visible = winchKin.engaged;
    if (winchKin.engaged) {
      const pts = winchKin.cablePoints;
      for (let i = 0; i < cableSegCount; i++) {
        _c0.set(pts[i].x, pts[i].y, pts[i].z);
        _c1.set(pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
        _cDir.subVectors(_c1, _c0);
        const len = _cDir.length();
        if (len > 1e-5) {
          _cDir.multiplyScalar(1 / len);
          _cMid.addVectors(_c0, _c1).multiplyScalar(0.5);
          _cQuat.setFromUnitVectors(UP_Y, _cDir);
          _cScale.set(1, len * 1.02, 1);
          _cMat.compose(_cMid, _cQuat, _cScale);
          cableInst.setMatrixAt(i, _cMat);
        }
      }
      cableInst.instanceMatrix.needsUpdate = true;
    }
  }

  return { root, update };
}

// ============================================================================
// 5. 3D FORCE VECTOR OVERLAY ARROWS (FG, FH, FN, FW, FT, FB)
// ============================================================================
function createGlowingVectorArrow(colorHex) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: colorHex,
    emissive: colorHex,
    emissiveIntensity: 1.45,
    roughness: 0.25
  });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.0, 10), mat);
  shaft.position.y = 0.5;
  group.add(shaft);

  const head = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.38, 12), mat);
  head.position.y = 1.0;
  group.add(head);

  return { group, shaft, head };
}

function setArrowVector(arrow, origin, dir, lengthM) {
  if (lengthM < 0.12) {
    arrow.group.visible = false;
    return;
  }
  arrow.group.visible = true;
  arrow.group.position.copy(origin);
  _vDir.copy(dir).normalize();
  arrow.group.quaternion.setFromUnitVectors(UP_Y, _vDir);
  const shaftLen = Math.max(0.12, lengthM - 0.34);
  arrow.shaft.scale.set(1, shaftLen, 1);
  arrow.shaft.position.y = shaftLen * 0.5;
  arrow.head.position.y = shaftLen + 0.17;
}

export function buildForceVectors() {
  const root = new THREE.Group();
  root.visible = false;

  const arrows = {
    fg: createGlowingVectorArrow(0x94a3b8), // Weight F_G (vertical down)
    fh: createGlowingVectorArrow(0xef4444), // Downhill force F_H (red along -X)
    fn: createGlowingVectorArrow(0x38bdf8), // Normal force F_N (cyan along -Y)
    fw: createGlowingVectorArrow(0xfacc15), // Winch pull F_W (bright gold along cable!)
    ft: createGlowingVectorArrow(0x22c55e), // Track thrust F_T (emerald green along +X)
    fb: createGlowingVectorArrow(0xc084fc)  // Blade resistance F_B (violet along -X at blade)
  };
  for (const a of Object.values(arrows)) root.add(a.group);

  // Anchor coordinates updated live for 2D/3D floating vector badge labels
  const labelAnchors = {
    fg: new THREE.Vector3(),
    fh: new THREE.Vector3(),
    fn: new THREE.Vector3(),
    fw: new THREE.Vector3(),
    ft: new THREE.Vector3(),
    fb: new THREE.Vector3()
  };

  const com = new THREE.Vector3(-0.15, 1.45, 0);
  const dirTmp = new THREE.Vector3();
  const origTmp = new THREE.Vector3();

  function update(visible, telemetry, winchKin, bladeKin) {
    root.visible = visible;
    if (!visible) return;

    const kNToMeters = 0.032; // 100 kN -> 3.2 m arrow length
    const aRad = telemetry.slopeRad;

    // F_G: True vertical downward in world space -> inside slopeRoot (pitched +aRad around Z): (-sin a, -cos a, 0)
    const fgLen = telemetry.weightKN * kNToMeters;
    dirTmp.set(-Math.sin(aRad), -Math.cos(aRad), 0);
    setArrowVector(arrows.fg, com, dirTmp, fgLen);
    labelAnchors.fg.copy(com).addScaledVector(dirTmp, fgLen + 0.35);

    // F_H: Downhill component along -X
    const fhLen = telemetry.downhillKN * kNToMeters;
    origTmp.set(-0.25, 1.50, 1.85);
    dirTmp.set(-1, 0, 0);
    setArrowVector(arrows.fh, origTmp, dirTmp, fhLen);
    labelAnchors.fh.copy(origTmp).addScaledVector(dirTmp, fhLen + 0.32);

    // F_N: Normal component perpendicular into snow (-Y)
    const fnLen = telemetry.normalKN * kNToMeters;
    origTmp.set(-0.15, 1.38, 1.85);
    dirTmp.set(0, -1, 0);
    setArrowVector(arrows.fn, origTmp, dirTmp, fnLen);
    labelAnchors.fn.copy(origTmp).addScaledVector(dirTmp, fnLen + 0.30);

    // F_W: Active Winch Pull along taut steel cable from boomTip!
    const fwLen = telemetry.winchForceKN * (kNToMeters * 1.65);
    origTmp.set(winchKin.boomTip.x, winchKin.boomTip.y, winchKin.boomTip.z);
    dirTmp.set(winchKin.cableDir.x, winchKin.cableDir.y, winchKin.cableDir.z);
    setArrowVector(arrows.fw, origTmp, dirTmp, fwLen);
    labelAnchors.fw.copy(origTmp).addScaledVector(dirTmp, fwLen + 0.38);

    // F_T: Track Tractive Thrust along +X at track contact height
    const ftLen = Math.abs(telemetry.trackThrustKN) * (kNToMeters * 1.25);
    origTmp.set(0.25, 0.38, 2.28);
    dirTmp.set(telemetry.trackThrustKN >= 0 ? 1 : -1, 0, 0);
    setArrowVector(arrows.ft, origTmp, dirTmp, ftLen);
    labelAnchors.ft.copy(origTmp).addScaledVector(dirTmp, ftLen + 0.35);

    // F_B: Blade Snow Resistance along -X right at the 12-way blade
    const fbLen = telemetry.bladeResistanceKN * (kNToMeters * 2.2);
    origTmp.set(bladeKin.cuttingEdgeCenter.x + 0.2, Math.max(0.55, bladeKin.cuttingEdgeCenter.y + 0.45), 1.4);
    dirTmp.set(-1, 0, 0);
    setArrowVector(arrows.fb, origTmp, dirTmp, fbLen);
    labelAnchors.fb.copy(origTmp).addScaledVector(dirTmp, fbLen + 0.32);
  }

  return { root, labelAnchors, update };
}
