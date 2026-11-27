import * as THREE from 'three';
import { SEAT_Y } from './ce-mechanics.js?v=0.5.1';

// The meshes share geometry and a shader program, with independent uniforms for overlapping burns.
export function createIgnitionKernel(geometry, diesel) {
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: {
      rim: { value: new THREE.Color(diesel ? 0xffac35 : 0xff620b) },
      brightness: { value: 0 }, softness: { value: diesel ? 0.57 : 0.36 },
      progress: { value: 0 }
    },
    vertexShader: `
      varying vec3 viewNormal;
      varying vec3 toEye;
      varying vec3 surface;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        viewNormal = normalMatrix * normal;
        toEye = -mv.xyz;
        surface = position;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      varying vec3 viewNormal;
      varying vec3 toEye;
      varying vec3 surface;
      uniform vec3 rim;
      uniform float brightness, softness, progress;
      void main() {
        float facing = max(0.0, dot(normalize(viewNormal), normalize(toEye)));
        float front = 0.5 + 0.5 * sin(7.0 * surface.y + 3.5 * surface.x - 4.0 * progress);
        float heat = smoothstep(0.08, 0.94, facing + 0.20 * front - 0.12 * progress);
        vec3 hot = mix(rim, vec3(1.0, 0.94, 0.64), heat);
        gl_FragColor = vec4(hot, brightness * smoothstep(0.0, softness, facing));
        #include <colorspace_fragment>
      }`
  });
  return new THREE.Mesh(geometry, material);
}

export function updateIgnition(mesh, stroke, crown, boreRadius, running, light) {
  mesh.visible = running && stroke.flashIntensity > 0;
  if (!mesh.visible) return;
  const progress = stroke.burnProgress;
  const spread = 1 - (1 - progress) ** 6;
  const radius = 0.05 + spread * (boreRadius - 0.018 - 0.05);
  const top = SEAT_Y - 0.014;
  const depth = 0.036 + spread * (top - crown - 0.018 - 0.036);
  mesh.position.y = top - depth / 2;
  mesh.scale.set(radius, depth / 2, radius);
  const uniforms = mesh.material.uniforms;
  uniforms.brightness.value = 0.96 * stroke.flashIntensity;
  uniforms.progress.value = progress;

  // A short local reflection on the crown and liner. Keep the light in the scene
  // at zero intensity between pulses so the renderer retains the same programs.
  const tail = Math.max(0, 1 - progress / 0.46);
  const pulse = 1.15 * stroke.flashIntensity * tail * tail;
  if (pulse > light.intensity) {
    light.intensity = pulse;
    light.position.copy(mesh.position).applyQuaternion(mesh.parent.quaternion).add(mesh.parent.position);
  }
}
