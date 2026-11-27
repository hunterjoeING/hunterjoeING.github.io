// Verbrennungsmotor 3D – Überdrehzahl- & Motorschaden-Sequenz (3D-Ballistik, Partikel & WebAudio)
import * as THREE from 'three';

const DAMAGE_QUIPS = [
  'Pleuel #2 hat den Chat verlassen.',
  'Kolben auf dem direkten Weg in den niedrigen Erdorbit.',
  'Ventilsalat à la carte – ganz ohne Ölwechsel.',
  'Der Drehzahlbegrenzer war wohl nur eine unverbindliche Empfehlung.',
  'Kurbelwelle und Motorblock gehen ab sofort getrennte Wege.'
];

function isMuted() {
  try {
    return Boolean(window.ArcadeAudio?.isMuted?.());
  } catch {
    return false;
  }
}

function createAudioSynth() {
  let ctx = null;
  let osc = null;
  let subOsc = null;
  let gain = null;

  function ensureCtx() {
    if (isMuted()) return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!ctx) ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }

  function startRevScream(isDiesel) {
    stopRevScream();
    const c = ensureCtx();
    if (!c) return;
    try {
      const now = c.currentTime;
      osc = c.createOscillator();
      subOsc = c.createOscillator();
      gain = c.createGain();
      const filter = c.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(isDiesel ? 520 : 880, now);
      filter.Q.setValueAtTime(2.2, now);

      osc.type = 'sawtooth';
      subOsc.type = 'square';
      osc.frequency.setValueAtTime(isDiesel ? 115 : 170, now);
      subOsc.frequency.setValueAtTime(isDiesel ? 58 : 85, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.11, now + 0.25);

      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);
      osc.start(now);
      subOsc.start(now);
    } catch {
      stopRevScream();
    }
  }

  function updateRevScream(progress, isDiesel) {
    if (!ctx || !osc || !subOsc || !gain) return;
    if (isMuted()) {
      stopRevScream();
      return;
    }
    try {
      const now = ctx.currentTime;
      const baseFreq = isDiesel ? (120 + progress * 340) : (180 + progress * 560);
      osc.frequency.setTargetAtTime(baseFreq, now, 0.04);
      subOsc.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.04);
      gain.gain.setTargetAtTime(0.08 + progress * 0.09, now, 0.05);
    } catch {
      // ignore
    }
  }

  function stopRevScream() {
    try {
      osc?.stop();
      subOsc?.stop();
      osc?.disconnect();
      subOsc?.disconnect();
      gain?.disconnect();
    } catch {
      // ignore
    }
    osc = null;
    subOsc = null;
    gain = null;
  }

  function playDetonation() {
    stopRevScream();
    const c = ensureCtx();
    if (!c) return;
    try {
      const now = c.currentTime;
      // Tiefer Knall (Sub-Boom)
      const boomOsc = c.createOscillator();
      const boomGain = c.createGain();
      boomOsc.type = 'triangle';
      boomOsc.frequency.setValueAtTime(135, now);
      boomOsc.frequency.exponentialRampToValueAtTime(24, now + 0.55);
      boomGain.gain.setValueAtTime(0.32, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      boomOsc.connect(boomGain);
      boomGain.connect(c.destination);
      boomOsc.start(now);
      boomOsc.stop(now + 0.68);

      // Weißes Rauschen für Druckwelle + Metallsplitter
      const bufLen = Math.floor(c.sampleRate * 0.75);
      const buffer = c.createBuffer(1, bufLen, c.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufLen; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.22));
      }
      const noise = c.createBufferSource();
      noise.buffer = buffer;
      const nFilter = c.createBiquadFilter();
      nFilter.type = 'lowpass';
      nFilter.frequency.setValueAtTime(1600, now);
      nFilter.frequency.exponentialRampToValueAtTime(180, now + 0.7);
      const nGain = c.createGain();
      nGain.gain.setValueAtTime(0.26, now);
      nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
      noise.connect(nFilter);
      nFilter.connect(nGain);
      nGain.connect(c.destination);
      noise.start(now);

      // Metallisches Scheppern
      [0.12, 0.24, 0.39, 0.56].forEach((delay, idx) => {
        const clang = c.createOscillator();
        const cg = c.createGain();
        clang.type = 'square';
        clang.frequency.setValueAtTime(620 + idx * 190, now + delay);
        clang.frequency.exponentialRampToValueAtTime(210, now + delay + 0.14);
        cg.gain.setValueAtTime(0.06, now + delay);
        cg.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.16);
        clang.connect(cg);
        cg.connect(c.destination);
        clang.start(now + delay);
        clang.stop(now + delay + 0.18);
      });
    } catch {
      // ignore
    }
  }

  return { startRevScream, updateRevScream, stopRevScream, playDetonation };
}

export function createExplosionSystem(parentGroup) {
  const fxGroup = new THREE.Group();
  fxGroup.visible = false;
  parentGroup.add(fxGroup);

  const audio = createAudioSynth();

  // 1) Feuerball-Kugeln
  const fireballs = [];
  const fbGeo = new THREE.SphereGeometry(0.65, 16, 16);
  for (let i = 0; i < 6; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0xff6b00 : 0xfef08a,
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    const mesh = new THREE.Mesh(fbGeo, mat);
    fxGroup.add(mesh);
    fireballs.push({
      mesh,
      mat,
      origin: new THREE.Vector3((i - 2.5) * 0.75, 0.9 + (i % 2) * 0.5, (i % 3 - 1) * 0.35),
      delay: i * 0.03
    });
  }

  // 2) Aufsteigende Rauchwolken (dunkler Ölqualm)
  const smokePuffs = [];
  const smokeGeo = new THREE.SphereGeometry(0.45, 12, 12);
  for (let i = 0; i < 28; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: i % 3 === 0 ? 0x1e293b : 0x334155,
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    const mesh = new THREE.Mesh(smokeGeo, mat);
    fxGroup.add(mesh);
    smokePuffs.push({
      mesh,
      mat,
      seed: i / 28,
      xOff: (Math.sin(i * 2.3) * 1.9),
      zOff: (Math.cos(i * 1.7) * 1.1),
      speed: 1.5 + (i % 5) * 0.35,
      driftX: Math.sin(i * 3.1) * 0.45,
      driftZ: Math.cos(i * 2.7) * 0.45
    });
  }

  // 3) Glühende Funken & Trümmerteile (Ballistik mit Schwerkraft + Boden-Abpraller)
  const sparks = [];
  const sparkGeo = new THREE.BoxGeometry(0.11, 0.11, 0.24);
  const shardGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.32, 8);
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xfb923c });
  const shardMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.35, metalness: 0.85 });

  for (let i = 0; i < 42; i++) {
    const isShard = i < 14;
    const mesh = new THREE.Mesh(isShard ? shardGeo : sparkGeo, isShard ? shardMat : sparkMat);
    fxGroup.add(mesh);
    sparks.push({
      mesh,
      vel: new THREE.Vector3(),
      angVel: new THREE.Vector3(),
      isShard
    });
  }

  // Ballistik für echte Motor-Baugruppen
  const partPhysics = new Map();
  let quipIndex = 0;

  const state = {
    phase: 'idle', // 'idle' | 'overrev' | 'blown'
    elapsed: 0,
    overrevDuration: 1.95,
    startRpm: 2400,
    currentRpm: 2400,
    peakBlowRpm: 10500,
    isDiesel: false,
    quip: DAMAGE_QUIPS[0],
    shakeVec: new THREE.Vector3()
  };

  const FLOOR_Y = -3.45;
  const GRAVITY = -15.5;

  function trigger(startRpm, redlineRpm, isDiesel, partGroups, basePositions) {
    state.phase = 'overrev';
    state.elapsed = 0;
    state.startRpm = Math.max(startRpm, isDiesel ? 2200 : 3200);
    state.currentRpm = state.startRpm;
    state.peakBlowRpm = Math.round((redlineRpm * 1.62) / 50) * 50;
    state.isDiesel = isDiesel;
    state.quip = DAMAGE_QUIPS[quipIndex % DAMAGE_QUIPS.length];
    quipIndex++;
    fxGroup.visible = false;

    partPhysics.clear();
    let idx = 0;
    for (const [id, group] of partGroups.entries()) {
      const base = basePositions.get(id);
      if (!base) continue;
      // Motorblock & Ölwanne bleiben als rauchender Sockel stehen, alles andere fliegt spektakulär weg!
      const pinned = id === 'block' || id === 'flywheelOilpan' || id === 'crankshaft';
      const angle = (idx / Math.max(1, partGroups.size)) * Math.PI * 2 + 0.35;
      const upSpeed = id === 'pistons' ? 11.5 : id === 'cylinderHead' ? 9.5 : id === 'sparkPlugs' ? 13.0 : 7.2 + (idx % 3) * 1.6;
      const outSpeed = id === 'pistons' ? 3.5 : 4.2 + (idx % 4) * 1.1;
      partPhysics.set(id, {
        group,
        base: base.clone(),
        pinned,
        pos: base.clone(),
        vel: new THREE.Vector3(Math.cos(angle) * outSpeed, upSpeed, Math.sin(angle) * outSpeed),
        rot: new THREE.Euler(0, 0, 0),
        angVel: new THREE.Vector3(
          (idx % 2 === 0 ? 1 : -1) * (2.4 + (idx % 3)),
          (idx % 3 - 1) * 3.1,
          (idx % 2 === 0 ? -1 : 1) * (2.2 + (idx % 2) * 1.4)
        )
      });
      idx++;
    }

    audio.startRevScream(isDiesel);
  }

  function detonate() {
    state.phase = 'blown';
    state.elapsed = 0;
    fxGroup.visible = true;
    audio.playDetonation();

    for (let i = 0; i < sparks.length; i++) {
      const sp = sparks[i];
      const theta = Math.random() * Math.PI * 2;
      const speed = sp.isShard ? (5.5 + Math.random() * 6.5) : (7.0 + Math.random() * 10.5);
      sp.mesh.position.set(
        (Math.random() - 0.5) * 3.2,
        0.5 + Math.random() * 1.4,
        (Math.random() - 0.5) * 1.4
      );
      sp.vel.set(
        Math.cos(theta) * speed * 0.72,
        4.5 + Math.random() * 9.5,
        Math.sin(theta) * speed * 0.72
      );
      sp.angVel.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14
      );
      sp.mesh.visible = true;
    }
  }

  function reset(partGroups, basePositions) {
    state.phase = 'idle';
    state.elapsed = 0;
    state.shakeVec.set(0, 0, 0);
    fxGroup.visible = false;
    audio.stopRevScream();

    for (const [id, group] of partGroups.entries()) {
      const base = basePositions.get(id);
      if (base) group.position.copy(base);
      group.rotation.set(0, 0, 0);
    }
    partPhysics.clear();
  }

  const idleFrame = { phase: 'idle', rpm: null, shake: state.shakeVec, justBlown: false };
  function update(dt) {
    if (state.phase === 'idle') {
      state.shakeVec.set(0, 0, 0);
      return idleFrame;
    }

    state.elapsed += dt;
    let justBlown = false;

    if (state.phase === 'overrev') {
      const progress = Math.min(1, state.elapsed / state.overrevDuration);
      const ease = progress * progress;
      state.currentRpm = state.startRpm + (state.peakBlowRpm - state.startRpm) * ease;
      audio.updateRevScream(progress, state.isDiesel);

      // Eskalierendes Motor-Zittern
      const amp = 0.03 + ease * 0.24;
      const freq = 48 + progress * 65;
      state.shakeVec.set(
        Math.sin(state.elapsed * freq) * amp,
        Math.cos(state.elapsed * freq * 1.23) * amp * 0.85,
        Math.sin(state.elapsed * freq * 0.87) * amp
      );

      if (progress >= 1) {
        detonate();
        justBlown = true;
      }
      return {
        phase: state.phase,
        progress,
        rpm: state.currentRpm,
        peakBlowRpm: state.peakBlowRpm,
        shake: state.shakeVec,
        quip: state.quip,
        justBlown
      };
    }

    // phase === 'blown'
    const t = state.elapsed;
    const shakeDecay = Math.max(0, 1 - t / 0.65);
    state.shakeVec.set(
      (Math.random() - 0.5) * 0.45 * shakeDecay,
      (Math.random() - 0.5) * 0.45 * shakeDecay,
      (Math.random() - 0.5) * 0.45 * shakeDecay
    );

    // 1) Feuerbälle expandieren & verblassen
    for (const fb of fireballs) {
      const localT = Math.max(0, t - fb.delay);
      const life = 1 - Math.min(1, localT / 0.52);
      fb.mesh.visible = life > 0.01;
      if (fb.mesh.visible) {
        fb.mesh.position.copy(fb.origin);
        fb.mesh.position.y += localT * 2.2;
        fb.mesh.scale.setScalar(0.45 + (1 - life) * 3.1);
        fb.mat.opacity = life * life * 0.92;
      }
    }

    // 2) Fortlaufend aufsteigender Rauch
    for (const puff of smokePuffs) {
      const cycle = ((t * 0.42 * puff.speed) + puff.seed) % 1;
      puff.mesh.visible = true;
      puff.mesh.position.set(
        puff.xOff + puff.driftX * cycle * 2.5,
        0.4 + cycle * 5.2,
        puff.zOff + puff.driftZ * cycle * 2.5
      );
      puff.mesh.scale.setScalar(0.55 + cycle * 2.4);
      puff.mat.opacity = Math.sin(cycle * Math.PI) * 0.46;
    }

    // 3) Funken & Trümmerteile
    for (const sp of sparks) {
      sp.vel.y += GRAVITY * dt;
      sp.mesh.position.addScaledVector(sp.vel, dt);
      sp.mesh.rotation.x += sp.angVel.x * dt;
      sp.mesh.rotation.y += sp.angVel.y * dt;
      sp.mesh.rotation.z += sp.angVel.z * dt;
      if (sp.mesh.position.y < FLOOR_Y + 0.12) {
        sp.mesh.position.y = FLOOR_Y + 0.12;
        sp.vel.y = Math.abs(sp.vel.y) * 0.36;
        sp.vel.x *= 0.72;
        sp.vel.z *= 0.72;
        sp.angVel.multiplyScalar(0.65);
      }
    }

    // 4) Echte Motor-Baugruppen ballistisch animieren
    for (const rec of partPhysics.values()) {
      if (rec.pinned) continue;
      rec.vel.y += GRAVITY * dt;
      rec.pos.addScaledVector(rec.vel, dt);
      rec.rot.x += rec.angVel.x * dt;
      rec.rot.y += rec.angVel.y * dt;
      rec.rot.z += rec.angVel.z * dt;
      if (rec.pos.y < FLOOR_Y + 0.55) {
        rec.pos.y = FLOOR_Y + 0.55;
        rec.vel.y = Math.abs(rec.vel.y) * 0.28;
        rec.vel.x *= 0.68;
        rec.vel.z *= 0.68;
        rec.angVel.multiplyScalar(0.55);
      }
      rec.group.position.copy(rec.pos);
      rec.group.rotation.copy(rec.rot);
    }

    return {
      phase: 'blown',
      rpm: 0,
      peakBlowRpm: state.peakBlowRpm,
      shake: state.shakeVec,
      quip: state.quip,
      justBlown: false
    };
  }

  function dispose() {
    audio.stopRevScream();
    fbGeo.dispose();
    smokeGeo.dispose();
    sparkGeo.dispose();
    shardGeo.dispose();
    sparkMat.dispose();
    shardMat.dispose();
    fireballs.forEach(f => f.mat.dispose());
    smokePuffs.forEach(p => p.mat.dispose());
  }

  return { state, trigger, reset, update, dispose };
}
