import { useMemo } from 'react';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { pathCurve } from '../utils/pathCurve';

const trunkMat = new THREE.MeshToonMaterial({ color: '#8a7a6a' });
const canopyMat = new THREE.MeshToonMaterial({ color: '#9a9a8a' });
const darkCanopyMat = new THREE.MeshToonMaterial({ color: '#7a7a6a' });

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

interface TreeData {
  x: number;
  z: number;
  height: number;
  canopyR: number;
  lean: number;
  variant: number;
}

export function Trees() {
  const trees = useMemo<TreeData[]>(() => {
    const result: TreeData[] = [];
    for (let i = 0; i < 60; i++) {
      const t = seededRandom(i * 17.3);
      const point = pathCurve.getPointAt(t);
      const side = seededRandom(i * 31.7) > 0.5 ? 1 : -1;
      const dist = 4 + seededRandom(i * 43.1) * 15;

      result.push({
        x: point.x + side * dist * (0.5 + seededRandom(i * 7.3) * 0.5),
        z: point.z + side * dist * (0.3 + seededRandom(i * 11.1) * 0.7) * (seededRandom(i * 53.3) > 0.5 ? 1 : -1),
        height: 1.5 + seededRandom(i * 23.7) * 2.5,
        canopyR: 0.6 + seededRandom(i * 37.1) * 0.8,
        lean: (seededRandom(i * 47.3) - 0.5) * 0.15,
        variant: Math.floor(seededRandom(i * 59.7) * 3),
      });
    }
    return result;
  }, []);

  return (
    <group>
      {trees.map((tree, i) => (
        <group key={i} position={[tree.x, 0, tree.z]} rotation={[0, 0, tree.lean]}>
          {/* Trunk */}
          <mesh material={trunkMat} position={[0, tree.height * 0.4, 0]}>
            <cylinderGeometry args={[0.06, 0.1, tree.height * 0.8, 5]} />
          </mesh>

          {/* Canopy - varies by variant */}
          {tree.variant === 0 ? (
            <mesh material={canopyMat} position={[0, tree.height * 0.85, 0]}>
              <coneGeometry args={[tree.canopyR, tree.height * 0.6, 6]} />
              <Edges color="#1a1a1a" threshold={15} />
            </mesh>
          ) : tree.variant === 1 ? (
            <>
              <mesh material={canopyMat} position={[0, tree.height * 0.75, 0]}>
                <coneGeometry args={[tree.canopyR * 1.1, tree.height * 0.4, 6]} />
                <Edges color="#1a1a1a" threshold={15} />
              </mesh>
              <mesh material={darkCanopyMat} position={[0, tree.height * 1.0, 0]}>
                <coneGeometry args={[tree.canopyR * 0.7, tree.height * 0.35, 6]} />
                <Edges color="#1a1a1a" threshold={15} />
              </mesh>
            </>
          ) : (
            <mesh material={canopyMat} position={[0, tree.height * 0.85, 0]}>
              <sphereGeometry args={[tree.canopyR, 6, 5]} />
              <Edges color="#1a1a1a" threshold={15} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
