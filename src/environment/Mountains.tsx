import { useMemo } from 'react';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

const mat = new THREE.MeshToonMaterial({ color: '#d0ccc0' });
const snowMat = new THREE.MeshToonMaterial({ color: '#ffffff' });

interface Mountain {
  x: number;
  z: number;
  height: number;
  radius: number;
  segments: number;
}

export function Mountains() {
  const mountains = useMemo<Mountain[]>(
    () => [
      { x: -10, z: -60, height: 25, radius: 12, segments: 6 },
      { x: 20, z: -70, height: 35, radius: 15, segments: 7 },
      { x: 50, z: -55, height: 20, radius: 10, segments: 6 },
      { x: 75, z: -65, height: 30, radius: 14, segments: 5 },
      { x: 100, z: -75, height: 40, radius: 18, segments: 7 },
      { x: 130, z: -60, height: 28, radius: 13, segments: 6 },
      { x: 155, z: -70, height: 32, radius: 15, segments: 5 },
      { x: 180, z: -55, height: 22, radius: 11, segments: 6 },
      { x: 40, z: -80, height: 18, radius: 9, segments: 6 },
      { x: 120, z: -80, height: 24, radius: 12, segments: 7 },
      { x: 200, z: -65, height: 30, radius: 14, segments: 6 },
      { x: -5, z: -80, height: 15, radius: 8, segments: 5 },
    ],
    []
  );

  return (
    <group>
      {mountains.map((m, i) => (
        <group key={i} position={[m.x, 0, m.z]}>
          <mesh material={mat} position={[0, m.height / 2, 0]}>
            <coneGeometry args={[m.radius, m.height, m.segments]} />
            <Edges color="#1a1a1a" threshold={15} />
          </mesh>
          {m.height > 22 && (
            <mesh material={snowMat} position={[0, m.height * 0.75, 0]}>
              <coneGeometry args={[m.radius * 0.35, m.height * 0.3, m.segments]} />
              <Edges color="#ccc" threshold={15} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
