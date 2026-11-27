import { AdditiveBlending } from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const OPAQUE = 1, OVERLAY = 2;

// Layer zero stays available for normal rendering, shadows and picking.
function assignLayer(object) {
  if (object.isLight) {
    object.layers.enable(OPAQUE);
    object.layers.enable(OVERLAY);
  } else if (object.material) {
    const m = object.material;
    const solid = object.isMesh && !m.transparent && m.depthWrite && m.blending !== AdditiveBlending;
    object.layers.enable(solid ? OPAQUE : OVERLAY);
    object.layers.disable(solid ? OVERLAY : OPAQUE);
  }
}

class OpaqueAO extends GTAOPass {
  constructor(scene, camera) {
    super(scene, camera, 1, 1, undefined,
      { radius: 0.38, thickness: 0.16, samples: 8 }, { radius: 3, samples: 8 });
    this.output = GTAOPass.OUTPUT.Off;
    this.blendIntensity = 0.35;
    this.needsSwap = false;
  }

  // The camera already excludes every overlay from the normal/depth render.
  overrideVisibility() {}
  restoreVisibility() {}

  setSize(width, height) {
    super.setSize(Math.max(1, Math.ceil(width / 2)), Math.max(1, Math.ceil(height / 2)));
  }

  render(renderer, write, read) {
    const update = renderer.shadowMap.autoUpdate;
    renderer.shadowMap.autoUpdate = false;
    super.render(renderer, write, read);
    // The default GTAO output copies colour to the other buffer, losing scene
    // depth. Multiply AO directly into the opaque colour with depth writes off.
    this.blendMaterial.uniforms.tDiffuse.value = this.gtaoMap;
    this.blendMaterial.uniforms.intensity.value = this.blendIntensity;
    this.renderPass(renderer, this.blendMaterial, read);
    renderer.shadowMap.autoUpdate = update;
  }

  dispose() {
    super.dispose();
    this.gtaoMaterial.dispose();
    this.blendMaterial.dispose();
  }
}

class OverlayPass extends RenderPass {
  render(renderer, write, read) {
    const background = this.scene.background;
    const update = renderer.shadowMap.autoUpdate;
    this.camera.layers.set(OVERLAY);
    this.scene.background = null;
    renderer.shadowMap.autoUpdate = false;
    super.render(renderer, write, read);
    this.scene.background = background;
    renderer.shadowMap.autoUpdate = update;
  }
}

export function createEngineRenderer(renderer, scene, camera) {
  const force = new URLSearchParams(window.location.search).get('ao');
  const hardware = window.navigator;
  const capable = renderer.extensions.has('EXT_color_buffer_float');
  const weak = hardware.hardwareConcurrency <= 4 || hardware.deviceMemory <= 4;
  let composer = null, width = 1, height = 1, ratio = 0;
  let elapsed = 0, frames = 0, slowWindows = 0, dropped = false;

  function release() {
    if (!composer) return;
    for (const pass of composer.passes) pass.dispose();
    composer.dispose();
    composer = null;
    elapsed = frames = slowWindows = 0;
  }

  function resize(w, h) {
    width = w;
    height = h;
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(ratio);
    renderer.setSize(w, h, false);
    const automatic = !weak && !dropped && Math.min(window.innerWidth, w) > 768;
    if (!capable || force === '0' || (force !== '1' && !automatic)) {
      release();
      return;
    }
    if (!composer) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new OpaqueAO(scene, camera));
      const overlay = new OverlayPass(scene, camera);
      overlay.clear = false;
      composer.addPass(overlay);
      composer.addPass(new OutputPass());
    }
    composer.setPixelRatio(ratio);
    composer.setSize(w, h);
  }

  let resumed = false;
  function resetMeter() {
    elapsed = frames = slowWindows = 0;
    resumed = true;
  }
  document.addEventListener('visibilitychange', resetMeter);
  function render(dt) {
    if (ratio !== Math.min(window.devicePixelRatio || 1, 2)) resize(width, height);
    if (composer && force !== '1' && !document.hidden && !resumed) {
      elapsed += dt;
      frames++;
      if (elapsed >= 1) {
        slowWindows = frames / elapsed < 40 ? slowWindows + 1 : 0;
        elapsed = frames = 0;
        if (slowWindows >= 2) {
          dropped = true;
          release();
        }
      }
    }
    resumed = false;
    if (!composer) {
      renderer.render(scene, camera);
      return;
    }
    // Cutaway/X-ray can swap materials and explode/repair can replace meshes.
    // Classify the current material while preserving ancestor visibility.
    scene.traverseVisible(assignLayer);
    const mask = camera.layers.mask;
    camera.layers.set(OPAQUE);
    composer.render(dt);
    camera.layers.mask = mask;
  }
  return { resize, render };
}
