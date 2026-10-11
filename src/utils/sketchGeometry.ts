import * as THREE from 'three';

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function wobbleGeometry(geometry: THREE.BufferGeometry, amplitude = 0.03) {
  const pos = geometry.attributes.position;
  const arr = pos.array as Float32Array;
  for (let i = 0; i < pos.count; i++) {
    const x = arr[i * 3];
    const y = arr[i * 3 + 1];
    const z = arr[i * 3 + 2];
    const seed = x * 13.7 + y * 29.3 + z * 47.1;
    arr[i * 3] += (seededRandom(seed) - 0.5) * amplitude;
    arr[i * 3 + 1] += (seededRandom(seed + 1) - 0.5) * amplitude;
    arr[i * 3 + 2] += (seededRandom(seed + 2) - 0.5) * amplitude;
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

export function createSketchBox(w: number, h: number, d: number, wobble = 0.04) {
  return wobbleGeometry(new THREE.BoxGeometry(w, h, d), wobble);
}

export function createSketchCone(r: number, h: number, segments = 8, wobble = 0.04) {
  return wobbleGeometry(new THREE.ConeGeometry(r, h, segments), wobble);
}

export function createSketchCylinder(rTop: number, rBot: number, h: number, segments = 8, wobble = 0.03) {
  return wobbleGeometry(new THREE.CylinderGeometry(rTop, rBot, h, segments), wobble);
}

export function createSketchSphere(r: number, wSeg = 8, hSeg = 6, wobble = 0.03) {
  return wobbleGeometry(new THREE.SphereGeometry(r, wSeg, hSeg), wobble);
}
