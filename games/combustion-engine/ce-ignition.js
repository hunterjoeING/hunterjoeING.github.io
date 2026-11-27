import * as THREE from 'three';
import { DIESEL_NOZZLE_Y } from './ce-plumbing.js?v=0.5.2';
import { SEAT_Y } from './ce-mechanics.js?v=0.5.2';

export const PLUG_TIP_Y = SEAT_Y - 0.01;
const GAP_X = 0.070, GAP_Y = -0.105;
const sparkWhite = new THREE.Color(0xeef6ff);
const petrolGlow = new THREE.Color(0xffab52);
const dieselGlow = new THREE.Color(0xffce74);

function createSparkHalo() {
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
    uniforms: { diameter: { value: 0.36 } },
    vertexShader: `
      varying vec2 disk;
      uniform float diameter;
      void main() {
        disk = uv * 2.0 - 1.0;
        vec4 center = modelViewMatrix * vec4(0., 0., 0., 1.);
        center.xy += position.xy * diameter;
        gl_Position = projectionMatrix * center;
      }`,
    fragmentShader: `
      varying vec2 disk;
      void main() {
        float r2 = dot(disk, disk);
        float core = exp(-15.0 * r2);
        float corona = exp(-3.6 * r2) * (1.0 - smoothstep(0.64, 1.0, r2));
        vec3 tint = mix(vec3(0.26, 0.54, 1.0), vec3(1.9, 2.2, 2.5), core);
        gl_FragColor = vec4(tint, 0.46 * corona + 0.40 * core);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
  });
  const size = new THREE.Vector2();
  material.onBeforeRender = (renderer, scene, camera, geometry, halo) => {
    // Scale at the electrode's depth using the canvas height in CSS pixels, including during camera flights.
    const height = renderer.getSize(size).height;
    const unitsPerPixel = -2 * halo.modelViewMatrix.elements[14] / (height * camera.projectionMatrix.elements[5]);
    material.uniforms.diameter.value = THREE.MathUtils.clamp(0.36, 30 * unitsPerPixel, 46 * unitsPerPixel);
    material.uniformsNeedUpdate = true;
  };
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  halo.name = 'sparkHalo';
  halo.visible = false;
  halo.position.set(GAP_X / 2, GAP_Y / 2, 0);
  halo.renderOrder = 3;
  return halo;
}

// All plugs share the geometry and materials. The ground strap reaches
// the shell of the plug and the middle kink coincides with the flame origin.
export function createSpark(steel) {
  const path = new THREE.CurvePath();
  const points = [[0, 0, 0], [0.026, -0.025, 0.009], [0.012, -0.040, -0.005],
    [GAP_X / 2, GAP_Y / 2, 0], [0.062, -0.066, 0.008], [0.045, -0.081, -0.006],
    [GAP_X, GAP_Y, 0]].map(p => new THREE.Vector3(...p));
  for (let i = 1; i < points.length; i++) path.add(new THREE.LineCurve3(points[i - 1], points[i]));
  const electrode = new THREE.Group();
  const postTop = 0.16;
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.020, postTop - GAP_Y, 0.028), steel);
  post.position.set(0.092, (GAP_Y + postTop) / 2, 0);
  const foot = new THREE.Mesh(new THREE.BoxGeometry(0.064, 0.018, 0.028), steel);
  foot.position.set(GAP_X + 0.026, GAP_Y - 0.009, 0);
  electrode.add(post, foot);
  const spark = new THREE.Group();
  spark.name = 'spark';
  spark.visible = false;
  const core = new THREE.MeshBasicMaterial({ color: sparkWhite, transparent: true,
    depthWrite: false, blending: THREE.AdditiveBlending });
  core.color.multiplyScalar(3);
  const arc = new THREE.Mesh(new THREE.TubeGeometry(path, 24, 0.016, 8, false), core);
  arc.name = 'sparkArc';
  arc.renderOrder = 4;
  spark.add(arc, createSparkHalo());
  electrode.add(spark);
  return electrode;
}

export function updateSpark(spark, intensity, revealGap, light) {
  const halo = spark.children[1];
  spark.visible = intensity > 0;
  halo.visible = spark.visible && revealGap;
  if (!spark.visible) return;
  spark.children[0].material.depthTest = !revealGap;
  const pulse = 1.8 * intensity;
  if (pulse > light.intensity) {
    light.intensity = pulse;
    light.color.copy(sparkWhite);
    halo.getWorldPosition(light.position);
    light.parent.worldToLocal(light.position);
  }
}

// One draw per burning cylinder. Integrate emission along a short ray through
// the chamber itself, using cylinder-local coordinates for both banks and caps.
export function createFlame(geometry, diesel) {
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    defines: diesel ? { DIESEL_SPRAY: 1 } : {},
    uniforms: { brightness: { value: 0 }, progress: { value: 0 }, depthRatio: { value: 1 },
      source: { value: new THREE.Vector3() }, seed: { value: 0 } },
    vertexShader: `
      varying vec3 surface, eyeRay;
      void main() {
        surface = position;
        vec3 eye = (inverse(modelViewMatrix) * vec4(0.,0.,0.,1.)).xyz;
        eyeRay = position - eye;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
      }`,
    fragmentShader: `
      varying vec3 surface, eyeRay;
      uniform vec3 source;
      uniform float brightness, progress, depthRatio, seed;
      float hash(vec3 p) {
        p = fract(p * vec3(.1031,.11369,.13787));
        p += dot(p, p.yzx + 19.19);
        return fract((p.x + p.y) * p.z);
      }
      float noiseField(vec3 p) {
        vec3 cell = floor(p), f = fract(p);
        f *= f * (3. - 2. * f);
        vec2 z;
        z.x = mix(mix(hash(cell), hash(cell + vec3(1,0,0)), f.x),
                  mix(hash(cell + vec3(0,1,0)), hash(cell + vec3(1,1,0)), f.x), f.y);
        cell.z += 1.;
        z.y = mix(mix(hash(cell), hash(cell + vec3(1,0,0)), f.x),
                  mix(hash(cell + vec3(0,1,0)), hash(cell + vec3(1,1,0)), f.x), f.y);
        return mix(z.x, z.y, f.z);
      }
      void main() {
        vec3 dir = normalize(eyeRay);
        float a = dot(dir.xz, dir.xz), b = dot(surface.xz, dir.xz);
        float c = dot(surface.xz, surface.xz) - 1.;
        float side = a > .00001 ? (-b + sqrt(max(0., b*b-a*c))) / a : 1000.;
        float cap = abs(dir.y) > .00001 ? (sign(dir.y) - surface.y) / dir.y : 1000.;
        float span = max(0., min(side, cap));
        float spread = 1. - pow(1. - progress, 2.8);
        float front = .035 + 1.75 * spread;
        vec3 sum = vec3(0.);
        float opticalStep = span * length(vec3(dir.x, dir.y * depthRatio, dir.z)) * .125;
        for (int i = 0; i < 8; i++) {
          vec3 p = surface + dir * (span * (float(i) + .5) * .125);
          vec3 q = p - source;
          q.y *= min(depthRatio, .58);
          vec3 drift = vec3(seed, progress * 3., -progress * 1.4);
          float grain = .68 * noiseField(q * 6. + drift) + .32 * noiseField(q * 15. - drift);
          float distanceToSource = length(q);
          #ifdef DIESEL_SPRAY
            // Five diverging spray plumes merge as the charge ignites.
            float radial = length(q.xz);
            float angle = atan(q.z, q.x + .00001) + seed;
            float across = radial * abs(sin(2.5 * angle));
            distanceToSource += (1. - spread) * (3.4 * across + 1.2 * abs(q.y + .5 * radial));
          #endif
          float behind = front - distanceToSource + (grain - .5) * min(.52, spread * 2.);
          float gas = smoothstep(-.065, .085, behind);
          float sheet = exp(-7. * abs(behind - .07));
          float heat = clamp(sheet + .48 * grain - .48 * progress, 0., 1.);
          vec3 ember = vec3(.30,.019,.002), amber = vec3(1.5,.24,.018);
          #ifdef DIESEL_SPRAY
            amber = vec3(1.55,.65,.06);
            ember *= .45 + grain;
          #endif
          vec3 fire = mix(ember, amber, smoothstep(.0,.46,heat));
          fire = mix(fire, vec3(3.4,2.9,1.65), smoothstep(.46,.95,heat));
          sum += fire * gas * (.45 + grain) * opticalStep;
        }
        gl_FragColor = vec4(sum * brightness * 2.3, 1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
  });
  return new THREE.Mesh(geometry, material);
}

export function updateIgnition(mesh, stroke, crown, boreRadius, diesel, running, light) {
  mesh.visible = running && stroke.flashIntensity > 0;
  if (!mesh.visible) return;
  const top = SEAT_Y - 0.003, bottom = crown + 0.012;
  const radius = boreRadius - 0.023, halfHeight = (top - bottom) / 2;
  mesh.position.y = bottom + halfHeight;
  mesh.scale.set(radius, halfHeight, radius);
  const u = mesh.material.uniforms;
  u.brightness.value = stroke.flashIntensity;
  u.progress.value = stroke.burnProgress;
  u.depthRatio.value = halfHeight / radius;
  u.source.value.set(diesel ? 0 : GAP_X / (2 * radius),
    ((diesel ? DIESEL_NOZZLE_Y : PLUG_TIP_Y + GAP_Y / 2) - mesh.position.y) / halfHeight, 0);

  const tail = Math.max(0, 1 - stroke.burnProgress / 0.46);
  const pulse = 1.15 * stroke.flashIntensity * tail * tail;
  if (pulse > light.intensity) {
    light.intensity = pulse;
    if (diesel) light.color.copy(dieselGlow);
    else light.color.copy(sparkWhite).lerp(petrolGlow, THREE.MathUtils.smoothstep(stroke.burnProgress, 0, 0.14));
    light.position.copy(mesh.position).applyQuaternion(mesh.parent.quaternion).add(mesh.parent.position);
  }
}
