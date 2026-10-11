import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { SketchBuilding } from './SketchBuilding';
import { getPathState } from '../utils/pathCurve';
import { BUILDING_PATH_POSITIONS } from '../utils/constants';

const mat = new THREE.MeshToonMaterial({ color: '#f5f0e8' });
const darkMat = new THREE.MeshToonMaterial({ color: '#2a2a2a' });
const grayMat = new THREE.MeshToonMaterial({ color: '#bbb' });

export function EducationBuilding() {
  const { position } = getPathState(BUILDING_PATH_POSITIONS.education);
  const pos: [number, number, number] = [position.x + 5, 0, position.z - 6];

  return (
    <SketchBuilding id="education" position={pos} label="EDUCATION" icon="🎓">
      {/* Main building */}
      <mesh material={mat} position={[0, 2, 0]}>
        <boxGeometry args={[5, 4, 3.5]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Roof */}
      <mesh material={mat} position={[0, 4.8, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3.8, 2, 4]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Bell tower */}
      <mesh material={mat} position={[0, 6.2, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.8]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>
      <mesh material={darkMat} position={[0, 7, 0]}>
        <coneGeometry args={[0.6, 0.8, 4]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Door */}
      <mesh material={darkMat} position={[0, 0.7, 1.76]}>
        <boxGeometry args={[0.8, 1.4, 0.05]} />
      </mesh>

      {/* Windows */}
      {[-1.5, 1.5].map((x) =>
        [1.5, 3].map((y) => (
          <mesh key={`${x}-${y}`} material={grayMat} position={[x, y, 1.76]}>
            <boxGeometry args={[0.6, 0.6, 0.05]} />
            <Edges color="#1a1a1a" threshold={15} />
          </mesh>
        ))
      )}

      {/* Steps */}
      {[0, 0.15, 0.3].map((y, i) => (
        <mesh key={i} material={mat} position={[0, y, 2.2 + i * 0.3]}>
          <boxGeometry args={[1.5 + i * 0.3, 0.15, 0.3]} />
          <Edges color="#1a1a1a" threshold={15} />
        </mesh>
      ))}
    </SketchBuilding>
  );
}
