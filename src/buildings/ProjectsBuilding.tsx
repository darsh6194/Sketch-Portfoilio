import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { SketchBuilding } from './SketchBuilding';
import { getPathState } from '../utils/pathCurve';
import { BUILDING_PATH_POSITIONS } from '../utils/constants';

const mat = new THREE.MeshToonMaterial({ color: '#f5f0e8' });
const darkMat = new THREE.MeshToonMaterial({ color: '#2a2a2a' });
const grayMat = new THREE.MeshToonMaterial({ color: '#bbb' });

export function ProjectsBuilding() {
  const { position } = getPathState(BUILDING_PATH_POSITIONS.projects);
  const pos: [number, number, number] = [position.x + 5, 0, position.z - 6];

  return (
    <SketchBuilding id="projects" position={pos} label="PROJECTS" icon="💻">
      {/* Main workshop */}
      <mesh material={mat} position={[0, 1.8, 0]}>
        <boxGeometry args={[6, 3.6, 4]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Slanted roof */}
      <mesh material={mat} position={[0, 4, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[6.5, 0.2, 4.5]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>
      <mesh material={mat} position={[0, 4.6, -0.5]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[6.5, 0.15, 3]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Garage door */}
      <mesh material={grayMat} position={[-1.2, 1.3, 2.01]}>
        <boxGeometry args={[2.5, 2.6, 0.05]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>
      {/* Garage door lines */}
      {[0.5, 1.0, 1.5, 2.0].map((y) => (
        <mesh key={y} material={darkMat} position={[-1.2, y, 2.02]}>
          <boxGeometry args={[2.4, 0.03, 0.02]} />
        </mesh>
      ))}

      {/* Side door */}
      <mesh material={darkMat} position={[1.8, 0.7, 2.01]}>
        <boxGeometry args={[0.8, 1.4, 0.05]} />
      </mesh>

      {/* Smoke stack */}
      <mesh material={grayMat} position={[2, 5, -1]}>
        <cylinderGeometry args={[0.3, 0.4, 2, 6]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Gear decoration on wall */}
      <mesh material={darkMat} position={[2.2, 2.8, 2.02]} rotation={[0, 0, 0.5]}>
        <torusGeometry args={[0.4, 0.08, 4, 8]} />
      </mesh>

      {/* Code sign </> */}
      <mesh material={darkMat} position={[-2.5, 3.2, 2.02]}>
        <boxGeometry args={[0.8, 0.6, 0.05]} />
      </mesh>

      {/* Windows */}
      {[1, 2.2].map((x) => (
        <mesh key={x} material={grayMat} position={[x, 2.8, 2.01]}>
          <boxGeometry args={[0.5, 0.5, 0.05]} />
          <Edges color="#1a1a1a" threshold={15} />
        </mesh>
      ))}
    </SketchBuilding>
  );
}
