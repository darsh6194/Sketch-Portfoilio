import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { SketchBuilding } from './SketchBuilding';
import { getPathState } from '../utils/pathCurve';
import { BUILDING_PATH_POSITIONS } from '../utils/constants';

const mat = new THREE.MeshToonMaterial({ color: '#f5f0e8' });
const darkMat = new THREE.MeshToonMaterial({ color: '#2a2a2a' });


export function SkillsBuilding() {
  const { position } = getPathState(BUILDING_PATH_POSITIONS.skills);
  const pos: [number, number, number] = [position.x + 5, 0, position.z - 6];

  return (
    <SketchBuilding id="skills" position={pos} label="SKILLS" icon="⚙️">
      {/* Main building - dome shape */}
      <mesh material={mat} position={[0, 2, 0]}>
        <boxGeometry args={[5.5, 4, 4]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Dome */}
      <mesh material={mat} position={[0, 4.8, 0]}>
        <sphereGeometry args={[2.8, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Columns */}
      {[-2, -0.7, 0.7, 2].map((x) => (
        <group key={x}>
          <mesh material={mat} position={[x, 2, 2.3]}>
            <cylinderGeometry args={[0.15, 0.18, 4, 6]} />
            <Edges color="#1a1a1a" threshold={15} />
          </mesh>
          <mesh material={mat} position={[x, 4.1, 2.3]}>
            <boxGeometry args={[0.4, 0.15, 0.4]} />
          </mesh>
          <mesh material={mat} position={[x, 0, 2.3]}>
            <boxGeometry args={[0.4, 0.15, 0.4]} />
          </mesh>
        </group>
      ))}

      {/* Pediment (triangle above columns) */}
      <mesh material={mat} position={[0, 4.5, 2.3]}>
        <boxGeometry args={[5, 0.15, 0.3]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Door */}
      <mesh material={darkMat} position={[0, 1, 2.31]}>
        <boxGeometry args={[1, 2, 0.05]} />
      </mesh>

      {/* Gear icon on dome */}
      <mesh material={darkMat} position={[0, 5.5, 2.5]} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.5, 0.1, 4, 8]} />
      </mesh>

      {/* Steps */}
      {[0, 0.15, 0.3, 0.45].map((y, i) => (
        <mesh key={i} material={mat} position={[0, y, 2.8 + i * 0.35]}>
          <boxGeometry args={[4 + i * 0.4, 0.15, 0.35]} />
          <Edges color="#1a1a1a" threshold={15} />
        </mesh>
      ))}
    </SketchBuilding>
  );
}
