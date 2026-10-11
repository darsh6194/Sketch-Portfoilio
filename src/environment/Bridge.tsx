import { useMemo } from 'react';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { pathCurve } from '../utils/pathCurve';

const mat = new THREE.MeshToonMaterial({ color: '#c8c0b4' });
const darkMat = new THREE.MeshToonMaterial({ color: '#6a5a4a' });

export function Bridge() {
  const bridgePos = useMemo(() => {
    const p = pathCurve.getPointAt(0.27);
    return [p.x, 0, p.z] as [number, number, number];
  }, []);

  return (
    <group position={bridgePos}>
      {/* Main arch */}
      <mesh material={mat} position={[0, 1.5, 0]}>
        <boxGeometry args={[8, 0.3, 3]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Arch supports */}
      {[-2.5, 0, 2.5].map((x) => (
        <group key={x}>
          <mesh material={darkMat} position={[x, 0.7, 0]}>
            <boxGeometry args={[0.4, 1.8, 2.5]} />
            <Edges color="#1a1a1a" threshold={15} />
          </mesh>
          {/* Arch opening */}
          <mesh material={mat} position={[x, 0.3, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.35, 8, 1, false, 0, Math.PI]} />
          </mesh>
        </group>
      ))}

      {/* Railings */}
      {[-1, 1].map((side) => (
        <group key={side}>
          {/* Rail bar */}
          <mesh material={darkMat} position={[0, 2, side * 1.4]}>
            <boxGeometry args={[8, 0.08, 0.08]} />
          </mesh>
          {/* Rail posts */}
          {[-3.5, -2, -0.5, 1, 2.5, 3.5].map((x) => (
            <mesh key={x} material={darkMat} position={[x, 1.8, side * 1.4]}>
              <boxGeometry args={[0.08, 0.6, 0.08]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Stone texture detail */}
      {[-3, -1.5, 0, 1.5, 3].map((x) => (
        <mesh key={x} material={darkMat} position={[x, 1.35, 1.51]}>
          <boxGeometry args={[0.8, 0.08, 0.02]} />
        </mesh>
      ))}
    </group>
  );
}
