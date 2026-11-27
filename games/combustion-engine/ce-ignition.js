import * as THREE from 'three';
import { SEAT_Y } from './ce-mechanics.js?v=0.5.1';

// The firing interval is at least 90°, so at most one 54° kernel is visible.
// All cylinders share the geometry, shader and uniforms for this assembly.
export function createIgnitionKernel(diesel) {
  const geometry = new THREE.SphereGeometry(1, 20, 12);
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: {
      rim: { value: new THREE.Color(diesel ? 0xff982c : 0xff690b) },
      brightness: { value: 0 }, softness: { value: diesel ? 0.48 : 0.28 },
      tip: { value: 0 }
    },
    vertexShader: `
      varying vec3 viewNormal;
      varying vec3 toEye;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        viewNormal = normalMatrix * normal;
        toEye = -mv.xyz;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      varying vec3 viewNormal;
      varying vec3 toEye;
      uniform vec3 rim;
      uniform float brightness, softness, tip;
      void main() {
        float facing = max(0.0, dot(normalize(viewNormal), normalize(toEye)));
        vec3 hot = mix(rim, vec3(1.0, 0.84, 0.32 + 0.4 * tip), smoothstep(0.12, 0.92, facing));
        gl_FragColor = vec4(hot, brightness * smoothstep(0.0, softness, facing));
        #include <colorspace_fragment>
      }`
  });
  return { geometry, material };
}

export function updateIgnition(mesh, stroke, diesel, crown, rpmFraction, running) {
  mesh.visible = running && stroke.flashIntensity > 0;
  if (!mesh.visible) return;
  const spread = Math.sqrt(stroke.burnProgress);
  const radius = 0.045 + spread * (diesel ? 0.34 : 0.40);
  const top = SEAT_Y - 0.018;
  const depth = Math.min(top - crown - 0.045, 0.06 + spread * (diesel ? 0.36 : 0.29));
  mesh.position.y = top - depth / 2;
  mesh.scale.set(radius, depth / 2, radius);
  const uniforms = mesh.material.uniforms;
  uniforms.brightness.value = stroke.flashIntensity * (1 - 0.18 * rpmFraction);
  uniforms.tip.value = diesel ? stroke.injectionIntensity : stroke.sparkIntensity;
}
