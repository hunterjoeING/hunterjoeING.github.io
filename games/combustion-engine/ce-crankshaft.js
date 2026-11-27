import * as THREE from 'three';
import { CRANKPIN_RADIUS, MAIN_JOURNAL_RADIUS, ROD_GEOMETRY, ROD_LENGTH,
  crankshaftSections } from './ce-mechanics.js?v=0.5.1';

// Profiles are drawn face-on and extruded along the engine's X axis.
function axialGeometry(profile, width) {
  return new THREE.ExtrudeGeometry(profile, { depth: width, curveSegments: 12, bevelEnabled: false })
    .translate(0, 0, -width / 2).rotateY(Math.PI / 2);
}

function addBore(profile, radius) {
  const bore = new THREE.Path();
  bore.absarc(0, 0, radius, 0, 2 * Math.PI, true);
  profile.holes.push(bore);
}

function eyeGeometry({ radius, bore, width }) {
  const profile = new THREE.Shape();
  profile.absarc(0, 0, radius, 0, 2 * Math.PI, false);
  addBore(profile, bore);
  return axialGeometry(profile, width);
}

export function buildConrods(specs, banks, material) {
  const big = eyeGeometry(ROD_GEOMETRY.bigEnd);
  const small = eyeGeometry(ROD_GEOMETRY.smallEnd);
  const { start, end, width, depth } = ROD_GEOMETRY.beam;
  const beam = new THREE.BoxGeometry(width, end - start, depth);
  return specs.map(spec => {
    const rod = new THREE.Group();
    rod.position.x = spec.x;
    const bigEnd = new THREE.Mesh(big, material('conrods', 'conrodBronze'));
    bigEnd.name = 'bigEnd';
    const shaft = new THREE.Mesh(beam, bigEnd.material);
    shaft.name = 'rodBeam';
    shaft.position.y = (start + end) / 2;
    const smallEnd = new THREE.Mesh(small, material('conrods', 'machinedSteel'));
    smallEnd.name = 'smallEnd';
    smallEnd.position.y = ROD_LENGTH;
    rod.add(bigEnd, shaft, smallEnd);
    banks[spec.bankIndex].add(rod);
    return rod;
  });
}

function cheekGeometry(length, width, counterweighted) {
  const tip = 0.19, base = counterweighted ? 0.43 : tip;
  const profile = new THREE.Shape();
  profile.moveTo(base, 0);
  profile.lineTo(tip, length);
  profile.absarc(0, length, tip, 0, Math.PI, false);
  profile.lineTo(-base, 0);
  profile.absarc(0, 0, base, Math.PI, 2 * Math.PI, false);
  profile.closePath();
  return axialGeometry(profile, width);
}

export function installCrankshaft(layout, spin, block, axisY, material) {
  const { mains, pins, webs } = crankshaftSections(layout);
  const steel = material('crankshaft', 'machinedSteel');
  function addJournal(name, section, radius, y, z) {
    const width = section.maxX - section.minX;
    const journal = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 24), steel);
    journal.rotation.z = Math.PI / 2;
    journal.position.set((section.minX + section.maxX) / 2, y, z);
    journal.name = name;
    spin.add(journal);
  }

  const boxer = layout.id === 'boxer4';
  const halfHeight = boxer ? 0.675 : 0.575, halfDepth = boxer ? 0.875 : 0.74;
  const saddle = new THREE.Shape();
  saddle.moveTo(-halfDepth, -halfHeight);
  saddle.lineTo(halfDepth, -halfHeight);
  saddle.lineTo(halfDepth, halfHeight);
  saddle.lineTo(-halfDepth, halfHeight);
  saddle.closePath();
  addBore(saddle, MAIN_JOURNAL_RADIUS + 0.008);
  for (const main of mains) {
    addJournal('mainJournal', main, MAIN_JOURNAL_RADIUS, 0, 0);
    const width = Math.min(0.20, main.maxX - main.minX - 0.02);
    const bearing = new THREE.Mesh(axialGeometry(saddle, width), material('block', 'darkMetal'));
    bearing.position.set((main.minX + main.maxX) / 2, axisY, 0);
    bearing.name = 'mainBearing';
    block.add(bearing);
  }
  for (const pin of pins) addJournal('crankPin', pin, CRANKPIN_RADIUS, pin.y, pin.z);
  for (const web of webs) {
    const dy = web.tip.y - web.root.y, dz = web.tip.z - web.root.z;
    const geometry = cheekGeometry(Math.hypot(dy, dz), web.maxX - web.minX, web.counterweighted);
    const cheek = new THREE.Mesh(geometry, material('crankshaft', 'crankSteel'));
    cheek.position.set((web.minX + web.maxX) / 2, web.root.y, web.root.z);
    cheek.rotation.x = Math.atan2(dz, dy);
    cheek.name = 'crankWeb';
    spin.add(cheek);
  }
}
