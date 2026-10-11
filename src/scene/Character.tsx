import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { getPathState } from '../utils/pathCurve';
import { usePortfolioState } from '../store/PortfolioContext';

export function Character() {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const prevOffset = useRef(0);
  const { activeBuilding } = usePortfolioState();
  const timeRef = useRef(0);

  const material = useMemo(() => new THREE.MeshToonMaterial({ color: '#ffffff' }), []);
  const darkMaterial = useMemo(() => new THREE.MeshToonMaterial({ color: '#1a1a1a' }), []);
  const grayMaterial = useMemo(() => new THREE.MeshToonMaterial({ color: '#777' }), []);

  useFrame((_, delta) => {
    if (!groupRef.current || activeBuilding) return;

    timeRef.current += delta;
    const t = scroll.offset;
    const velocity = Math.abs(t - prevOffset.current) * 100;
    prevOffset.current = t;

    const { position, tangent } = getPathState(t);
    groupRef.current.position.set(position.x, position.y + 0.5, position.z);

    const angle = Math.atan2(tangent.x, tangent.z);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      angle,
      0.08
    );

    const isMoving = velocity > 0.01;
    const swing = isMoving ? Math.sin(timeRef.current * 12) * 0.5 : Math.sin(timeRef.current * 1.5) * 0.05;

    if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
    if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
    if (leftArmRef.current) leftArmRef.current.rotation.x = -swing * 0.7;
    if (rightArmRef.current) rightArmRef.current.rotation.x = swing * 0.7;

    groupRef.current.position.y += Math.sin(timeRef.current * 2) * 0.03;
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh material={material} position={[0, 1.1, 0]}>
        <boxGeometry args={[0.5, 0.7, 0.3]} />
        <Edges color="#1a1a1a" />
      </mesh>

      {/* Head */}
      <mesh material={material} position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.25, 8, 6]} />
        <Edges color="#1a1a1a" />
      </mesh>

      {/* Cap */}
      <group position={[0, 2.0, 0]} rotation={[0, 0, 0.15]}>
        <mesh material={darkMaterial} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.28, 0.26, 0.12, 8]} />
        </mesh>
        <mesh material={darkMaterial} position={[0.1, -0.02, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.25, 0.03, 0.2]} />
        </mesh>
      </group>

      {/* Backpack */}
      <mesh material={grayMaterial} position={[0, 1.15, -0.25]}>
        <boxGeometry args={[0.35, 0.45, 0.2]} />
        <Edges color="#1a1a1a" />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[0.35, 1.3, 0]}>
        <mesh material={material}>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[-0.35, 1.3, 0]}>
        <mesh material={material}>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[0.13, 0.5, 0]}>
        <mesh material={darkMaterial}>
          <boxGeometry args={[0.14, 0.5, 0.14]} />
        </mesh>
        <mesh material={darkMaterial} position={[0, -0.28, 0.05]}>
          <boxGeometry args={[0.16, 0.08, 0.22]} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[-0.13, 0.5, 0]}>
        <mesh material={darkMaterial}>
          <boxGeometry args={[0.14, 0.5, 0.14]} />
        </mesh>
        <mesh material={darkMaterial} position={[0, -0.28, 0.05]}>
          <boxGeometry args={[0.16, 0.08, 0.22]} />
        </mesh>
      </group>

      {/* Skateboard */}
      <group position={[0, -0.1, 0]}>
        <mesh material={grayMaterial}>
          <boxGeometry args={[0.3, 0.04, 0.8]} />
        </mesh>
        {([-0.25, 0.25] as const).map((zOff) =>
          ([-0.12, 0.12] as const).map((xOff) => (
            <mesh key={`${xOff}-${zOff}`} material={darkMaterial} position={[xOff, -0.04, zOff]}>
              <sphereGeometry args={[0.035, 6, 4]} />
            </mesh>
          ))
        )}
      </group>
    </group>
  );
}
