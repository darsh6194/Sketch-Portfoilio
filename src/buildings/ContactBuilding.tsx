import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { SketchBuilding } from './SketchBuilding';
import { getPathState } from '../utils/pathCurve';
import { BUILDING_PATH_POSITIONS } from '../utils/constants';

const mat = new THREE.MeshToonMaterial({ color: '#ffffff' });
const darkMat = new THREE.MeshToonMaterial({ color: '#1a1a1a' });
const grayMat = new THREE.MeshToonMaterial({ color: '#aaaaaa' });
const redMat = new THREE.MeshToonMaterial({ color: '#c44' });

export function ContactBuilding() {
  const { position } = getPathState(BUILDING_PATH_POSITIONS.contact);
  const pos: [number, number, number] = [position.x + 5, 0, position.z - 5];
  const flagRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (flagRef.current) {
      flagRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <SketchBuilding id="contact" position={pos} label="CONTACT" icon="✉️">
      {/* Main building - lighthouse/post office */}
      <mesh material={mat} position={[0, 2.5, 0]}>
        <boxGeometry args={[4, 5, 3.5]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Roof */}
      <mesh material={grayMat} position={[0, 5.5, 0]}>
        <coneGeometry args={[3, 1.5, 4]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Lighthouse tower */}
      <mesh material={mat} position={[1.5, 6.5, -0.5]}>
        <cylinderGeometry args={[0.5, 0.7, 3, 6]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>
      <mesh material={grayMat} position={[1.5, 8.2, -0.5]}>
        <coneGeometry args={[0.6, 0.6, 6]} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>
      {/* Light */}
      <mesh position={[1.5, 7.8, -0.5]}>
        <sphereGeometry args={[0.2, 6, 4]} />
        <meshBasicMaterial color="#ffeeaa" />
      </mesh>

      {/* Door */}
      <mesh material={darkMat} position={[0, 0.8, 1.76]}>
        <boxGeometry args={[0.9, 1.6, 0.05]} />
      </mesh>

      {/* Envelope symbol on wall */}
      <group position={[0, 3.5, 1.76]}>
        <mesh material={grayMat}>
          <boxGeometry args={[1.5, 1, 0.05]} />
          <Edges color="#1a1a1a" threshold={15} />
        </mesh>
        {/* V shape for envelope flap */}
        <mesh material={darkMat} position={[0, 0.2, 0.03]} rotation={[0, 0, 0.7]}>
          <boxGeometry args={[0.9, 0.04, 0.02]} />
        </mesh>
        <mesh material={darkMat} position={[0, 0.2, 0.03]} rotation={[0, 0, -0.7]}>
          <boxGeometry args={[0.9, 0.04, 0.02]} />
        </mesh>
      </group>

      {/* Mailbox */}
      <group position={[-2.5, 0.7, 1.5]}>
        <mesh material={darkMat} position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 4]} />
        </mesh>
        <mesh material={grayMat}>
          <boxGeometry args={[0.5, 0.4, 0.3]} />
          <Edges color="#1a1a1a" threshold={15} />
        </mesh>
        <mesh material={grayMat} position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.1, 8, 1, false, 0, Math.PI]} />
        </mesh>
      </group>

      {/* Flag pole */}
      <mesh material={darkMat} position={[2.5, 3, 1.8]}>
        <cylinderGeometry args={[0.03, 0.03, 6, 4]} />
      </mesh>
      <mesh ref={flagRef} material={redMat} position={[2.8, 5.5, 1.8]}>
        <boxGeometry args={[0.6, 0.4, 0.02]} />
      </mesh>

      {/* Windows */}
      {[-1.2, 1.2].map((x) => (
        <mesh key={x} material={grayMat} position={[x, 3, 1.76]}>
          <boxGeometry args={[0.5, 0.6, 0.05]} />
          <Edges color="#1a1a1a" threshold={15} />
        </mesh>
      ))}
    </SketchBuilding>
  );
}
