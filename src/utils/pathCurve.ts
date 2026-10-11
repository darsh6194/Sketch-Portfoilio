import * as THREE from 'three';

const controlPoints = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(10, 0, -5),
  new THREE.Vector3(20, 0.5, -12),
  new THREE.Vector3(35, 1, -8),
  new THREE.Vector3(50, 0.5, -18),
  new THREE.Vector3(65, 0, -10),
  new THREE.Vector3(80, 1, -22),
  new THREE.Vector3(100, 0.5, -15),
  new THREE.Vector3(115, 0, -25),
  new THREE.Vector3(130, 0.5, -12),
  new THREE.Vector3(150, 1, -20),
  new THREE.Vector3(165, 0.5, -10),
  new THREE.Vector3(180, 0, -18),
  new THREE.Vector3(195, 0, -14),
];

export const pathCurve = new THREE.CatmullRomCurve3(controlPoints, false, 'catmullrom', 0.5);

const _pos = new THREE.Vector3();
const _tan = new THREE.Vector3();

export function getPathState(t: number) {
  const ct = THREE.MathUtils.clamp(t, 0, 1);
  pathCurve.getPointAt(ct, _pos);
  pathCurve.getTangentAt(ct, _tan);
  return {
    position: _pos.clone(),
    tangent: _tan.clone(),
  };
}

export function getPathLength() {
  return pathCurve.getLength();
}
