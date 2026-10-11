import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { pathCurve } from '../utils/pathCurve';

const woodMat = new THREE.MeshToonMaterial({ color: '#a09080' });
const signMat = new THREE.MeshToonMaterial({ color: '#e8e0d4' });

interface SignData {
  t: number;
  labels: string[];
  offset: [number, number, number];
}

const signs: SignData[] = [
  { t: 0.02, labels: ['EXPLORE →', 'LEARN →', 'BUILD →', 'CONNECT →'], offset: [-2, 0, 2] },
  { t: 0.14, labels: ['EDUCATION →'], offset: [2, 0, -2] },
  { t: 0.30, labels: ['EXPERIENCE →'], offset: [-2, 0, 3] },
  { t: 0.48, labels: ['PROJECTS →'], offset: [3, 0, -2] },
  { t: 0.66, labels: ['SKILLS →'], offset: [-3, 0, 2] },
  { t: 0.84, labels: ['CONTACT →'], offset: [2, 0, -2] },
];

function SignPost({ data }: { data: SignData }) {
  const groupRef = useRef<THREE.Group>(null);
  const point = pathCurve.getPointAt(data.t);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5 + data.t * 10) * 0.02;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[point.x + data.offset[0], 0, point.z + data.offset[2]]}
    >
      {/* Post */}
      <mesh material={woodMat} position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 2.4, 5]} />
      </mesh>

      {/* Signs */}
      {data.labels.map((label, i) => (
        <group key={i} position={[0, 2.2 - i * 0.45, 0]} rotation={[0, 0.3 * (i % 2 === 0 ? 1 : -1), 0]}>
          <mesh material={signMat} position={[0.5, 0, 0]}>
            <boxGeometry args={[1.2, 0.3, 0.05]} />
            <Edges color="#1a1a1a" threshold={15} />
          </mesh>
          <Text
            position={[0.5, 0, 0.03]}
            fontSize={0.14}
            color="#1a1a1a"
            font="https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2Q7azYpiN_EMA.woff2"
            anchorX="center"
            anchorY="middle"
            fontWeight={700}
          >
            {label}
          </Text>
        </group>
      ))}
    </group>
  );
}

export function SignPosts() {
  return (
    <group>
      {signs.map((data, i) => (
        <SignPost key={i} data={data} />
      ))}
    </group>
  );
}
