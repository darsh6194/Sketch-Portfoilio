import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const cloudMat = new THREE.MeshBasicMaterial({ color: '#eee', transparent: true, opacity: 0.7 });

interface CloudData {
  x: number;
  y: number;
  z: number;
  scale: number;
  speed: number;
  blobs: { x: number; y: number; z: number; r: number }[];
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function generateClouds(): CloudData[] {
  const clouds: CloudData[] = [];
  for (let i = 0; i < 15; i++) {
    const blobCount = 3 + Math.floor(seededRandom(i * 13.7) * 3);
    const blobs = [];
    for (let j = 0; j < blobCount; j++) {
      blobs.push({
        x: (seededRandom(i * 17.3 + j * 29.1) - 0.5) * 2,
        y: (seededRandom(i * 23.7 + j * 31.3) - 0.5) * 0.5,
        z: (seededRandom(i * 37.1 + j * 41.7) - 0.5) * 1,
        r: 0.5 + seededRandom(i * 43.3 + j * 47.1) * 0.8,
      });
    }
    clouds.push({
      x: -20 + seededRandom(i * 53.1) * 230,
      y: 20 + seededRandom(i * 59.3) * 15,
      z: -30 + seededRandom(i * 61.7) * -40,
      scale: 0.8 + seededRandom(i * 67.3) * 1.5,
      speed: 0.1 + seededRandom(i * 71.1) * 0.3,
      blobs,
    });
  }
  return clouds;
}

export function Clouds() {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsData = useRef(generateClouds());

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((cloud, i) => {
      cloud.position.x += cloudsData.current[i].speed * delta;
      if (cloud.position.x > 220) cloud.position.x = -20;
    });
  });

  return (
    <group ref={groupRef}>
      {cloudsData.current.map((cloud, i) => (
        <group key={i} position={[cloud.x, cloud.y, cloud.z]} scale={cloud.scale}>
          {cloud.blobs.map((blob, j) => (
            <mesh key={j} material={cloudMat} position={[blob.x, blob.y, blob.z]}>
              <sphereGeometry args={[blob.r, 6, 5]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
