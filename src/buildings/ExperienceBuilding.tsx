import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { SketchBuilding } from './SketchBuilding';
import { getPathState } from '../utils/pathCurve';
import { BUILDING_PATH_POSITIONS } from '../utils/constants';

const mat = new THREE.MeshToonMaterial({ color: '#f5f0e8' });
const darkMat = new THREE.MeshToonMaterial({ color: '#2a2a2a' });
const grayMat = new THREE.MeshToonMaterial({ color: '#bbb' });

export function ExperienceBuilding() {
  const { position } = getPathState(BUILDING_PATH_POSITIONS.experience);
  const pos: [number, number, number] = [position.x + 6, 0, position.z - 7];

  return (
    <SketchBuilding id="experience" position={pos} label="EXPERIENCE" icon="💼">
      {/* Bottom tier */}
      <mesh material={mat} position={[0, 2, 0]}>
        <boxGeometry args={[5, 4, 4]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Middle tier */}
      <mesh material={mat} position={[0, 5.5, 0]}>
        <boxGeometry args={[4, 3, 3.5]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Top tier */}
      <mesh material={mat} position={[0, 8, 0]}>
        <boxGeometry args={[2.5, 2, 2.5]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Antenna */}
      <mesh material={darkMat} position={[0, 9.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.5, 4]} />
      </mesh>
      <mesh material={darkMat} position={[0, 10.3, 0]}>
        <sphereGeometry args={[0.1, 6, 4]} />
      </mesh>

      {/* Windows - front face rows */}
      {[-1.5, -0.5, 0.5, 1.5].map((x) =>
        [1, 2, 3].map((y) => (
          <mesh key={`b-${x}-${y}`} material={grayMat} position={[x, y, 2.01]}>
            <boxGeometry args={[0.5, 0.5, 0.05]} />
          </mesh>
        ))
      )}
      {[-1, 0, 1].map((x) =>
        [4.5, 5.5, 6.5].map((y) => (
          <mesh key={`m-${x}-${y}`} material={grayMat} position={[x, y, 1.76]}>
            <boxGeometry args={[0.45, 0.45, 0.05]} />
          </mesh>
        ))
      )}

      {/* Door */}
      <mesh material={darkMat} position={[0, 0.7, 2.01]}>
        <boxGeometry args={[1, 1.4, 0.05]} />
      </mesh>

      {/* Company sign */}
      <mesh material={grayMat} position={[0, 3.5, 2.02]}>
        <boxGeometry args={[2.5, 0.4, 0.05]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>
    </SketchBuilding>
  );
}
