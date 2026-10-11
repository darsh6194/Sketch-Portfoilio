import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { getPathState } from '../utils/pathCurve';
import { usePortfolioState } from '../store/PortfolioContext';
import { Ink } from '../sketch/Ink';
import { paperMat, inkMat, inkSoftMat, grayMat, grayDarkMat } from '../sketch/materials';

export function Character() {
  const groupRef = useRef<THREE.Group>(null);
  const tiltRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Group>(null);
  const boardRef = useRef<THREE.Group>(null);
  const wheelRefs = useRef<THREE.Mesh[]>([]);

  const scroll = useScroll();
  const { activeBuilding } = usePortfolioState();

  const prevOffset = useRef(0);
  const prevAngle = useRef(0);
  const timeRef = useRef(0);

  const registerWheel = (m: THREE.Mesh | null) => {
    if (m && !wheelRefs.current.includes(m)) wheelRefs.current.push(m);
  };

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g || activeBuilding) return;

    const dt = Math.min(delta, 0.05);
    timeRef.current += dt;
    const t = scroll.offset;
    const rawVel = (t - prevOffset.current) / Math.max(dt, 0.001);
    prevOffset.current = t;
    const speed = Math.min(Math.abs(rawVel) * 2.2, 1);

    const { position, tangent } = getPathState(t);
    g.position.set(position.x, position.y + 0.55 + Math.sin(timeRef.current * 2) * 0.04, position.z);

    // Face along the path (yaw), smoothed.
    const angle = Math.atan2(tangent.x, tangent.z);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, angle, 0.1);

    // Lean into turns from the yaw change rate; gentle forward pitch while moving.
    let turn = angle - prevAngle.current;
    if (turn > Math.PI) turn -= Math.PI * 2;
    if (turn < -Math.PI) turn += Math.PI * 2;
    prevAngle.current = angle;
    if (tiltRef.current) {
      const targetRoll = THREE.MathUtils.clamp(-turn * 6, -0.35, 0.35);
      const targetPitch = speed * 0.18;
      tiltRef.current.rotation.z = THREE.MathUtils.lerp(tiltRef.current.rotation.z, targetRoll, 0.1);
      tiltRef.current.rotation.x = THREE.MathUtils.lerp(tiltRef.current.rotation.x, targetPitch, 0.08);
    }

    // Skate push cycle: the rear leg kicks, arms counter-swing; idle = soft sway.
    const moving = speed > 0.04;
    const cycle = Math.sin(timeRef.current * (moving ? 9 : 1.4));
    const kick = moving ? cycle * 0.6 : cycle * 0.06;
    if (rightLegRef.current) rightLegRef.current.rotation.x = kick;
    if (leftLegRef.current) leftLegRef.current.rotation.x = -kick * 0.25 - (moving ? 0.1 : 0);
    if (leftArmRef.current) leftArmRef.current.rotation.x = -kick * 0.8;
    if (rightArmRef.current) rightArmRef.current.rotation.x = kick * 0.8;

    // Cap micro-bob and board spring.
    if (capRef.current) capRef.current.rotation.z = 0.12 + Math.sin(timeRef.current * 3) * 0.03;
    if (boardRef.current) boardRef.current.rotation.x = Math.sin(timeRef.current * 6) * 0.02 * speed;

    // Wheels roll with travel.
    const spin = rawVel * 60;
    for (const w of wheelRefs.current) w.rotation.y += spin * dt;
  });

  return (
    <group ref={groupRef}>
      <group ref={tiltRef}>
        {/* ---- Torso ---- */}
        <mesh material={paperMat} position={[0, 1.28, 0]} scale={[1, 1, 0.82]}>
          <capsuleGeometry args={[0.27, 0.46, 6, 16]} />
          <Ink thickness={2.6} />
        </mesh>
        {/* Collar / shirt hem accents */}
        <mesh material={grayDarkMat} position={[0, 1.02, 0]} scale={[1, 1, 0.82]}>
          <cylinderGeometry args={[0.28, 0.3, 0.1, 16]} />
        </mesh>

        {/* ---- Head ---- */}
        <mesh material={paperMat} position={[0, 1.92, 0.02]}>
          <sphereGeometry args={[0.26, 18, 16]} />
          <Ink thickness={2.6} />
        </mesh>
        {/* Eyes */}
        <mesh material={inkMat} position={[0.1, 1.94, 0.23]}>
          <sphereGeometry args={[0.042, 8, 8]} />
        </mesh>
        <mesh material={inkMat} position={[-0.1, 1.94, 0.23]}>
          <sphereGeometry args={[0.042, 8, 8]} />
        </mesh>

        {/* ---- Cap ---- */}
        <group ref={capRef} position={[0, 2.12, 0]} rotation={[0, 0, 0.12]}>
          {/* Crown (half dome) */}
          <mesh material={inkSoftMat} position={[0, 0.02, 0]}>
            <sphereGeometry args={[0.285, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <Ink thickness={2.6} />
          </mesh>
          {/* Crown base band */}
          <mesh material={inkSoftMat} position={[0, 0.0, 0]}>
            <cylinderGeometry args={[0.285, 0.285, 0.06, 16]} />
          </mesh>
          {/* Brim pointing forward */}
          <mesh material={inkMat} position={[0, -0.01, 0.26]} rotation={[-0.18, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.04, 16, 1, false, 0, Math.PI]} />
            <Ink thickness={2.2} />
          </mesh>
          {/* Button */}
          <mesh material={inkMat} position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.035, 8, 8]} />
          </mesh>
        </group>

        {/* ---- Backpack ---- */}
        <group position={[0, 1.32, -0.3]}>
          <mesh material={grayMat} scale={[1, 1, 0.8]}>
            <capsuleGeometry args={[0.2, 0.3, 4, 12]} />
            <Ink thickness={2.2} />
          </mesh>
          {/* Flap */}
          <mesh material={grayDarkMat} position={[0, 0.12, 0.06]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.32, 0.16, 0.1]} />
          </mesh>
        </group>
        {/* Straps across shoulders */}
        <mesh material={grayDarkMat} position={[0.17, 1.42, 0.02]} rotation={[0.1, 0, -0.1]}>
          <boxGeometry args={[0.06, 0.5, 0.06]} />
        </mesh>
        <mesh material={grayDarkMat} position={[-0.17, 1.42, 0.02]} rotation={[0.1, 0, 0.1]}>
          <boxGeometry args={[0.06, 0.5, 0.06]} />
        </mesh>

        {/* ---- Arms ---- */}
        <group ref={leftArmRef} position={[0.34, 1.5, 0]}>
          <mesh material={paperMat} position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.085, 0.34, 4, 10]} />
            <Ink thickness={2.0} />
          </mesh>
          <mesh material={inkMat} position={[0, -0.46, 0]}>
            <sphereGeometry args={[0.1, 10, 8]} />
          </mesh>
        </group>
        <group ref={rightArmRef} position={[-0.34, 1.5, 0]}>
          <mesh material={paperMat} position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.085, 0.34, 4, 10]} />
            <Ink thickness={2.0} />
          </mesh>
          <mesh material={inkMat} position={[0, -0.46, 0]}>
            <sphereGeometry args={[0.1, 10, 8]} />
          </mesh>
        </group>

        {/* ---- Legs ---- */}
        <group ref={leftLegRef} position={[0.13, 0.95, 0]}>
          <mesh material={grayDarkMat} position={[0, -0.25, 0]}>
            <capsuleGeometry args={[0.1, 0.38, 4, 10]} />
            <Ink thickness={2.0} />
          </mesh>
          {/* Shoe */}
          <mesh material={inkMat} position={[0, -0.5, 0.06]}>
            <boxGeometry args={[0.17, 0.11, 0.3]} />
            <Ink thickness={2.0} />
          </mesh>
        </group>
        <group ref={rightLegRef} position={[-0.13, 0.95, 0]}>
          <mesh material={grayDarkMat} position={[0, -0.25, 0]}>
            <capsuleGeometry args={[0.1, 0.38, 4, 10]} />
            <Ink thickness={2.0} />
          </mesh>
          <mesh material={inkMat} position={[0, -0.5, 0.06]}>
            <boxGeometry args={[0.17, 0.11, 0.3]} />
            <Ink thickness={2.0} />
          </mesh>
        </group>
      </group>

      {/* ---- Skateboard ---- */}
      <group ref={boardRef} position={[0, 0.02, 0]}>
        {/* Deck centre */}
        <mesh material={inkSoftMat} position={[0, 0, 0]}>
          <boxGeometry args={[0.34, 0.05, 0.78]} />
          <Ink thickness={2.0} />
        </mesh>
        {/* Raised nose and tail */}
        <mesh material={inkSoftMat} position={[0, 0.04, 0.44]} rotation={[0.45, 0, 0]}>
          <boxGeometry args={[0.34, 0.05, 0.18]} />
        </mesh>
        <mesh material={inkSoftMat} position={[0, 0.04, -0.44]} rotation={[-0.45, 0, 0]}>
          <boxGeometry args={[0.34, 0.05, 0.18]} />
        </mesh>
        {/* Trucks */}
        {[0.3, -0.3].map((z) => (
          <mesh key={z} material={grayDarkMat} position={[0, -0.06, z]}>
            <boxGeometry args={[0.26, 0.05, 0.08]} />
          </mesh>
        ))}
        {/* Wheels */}
        {([0.3, -0.3] as const).map((z) =>
          ([-0.15, 0.15] as const).map((x) => (
            <group key={`${x}-${z}`} position={[x, -0.1, z]} rotation={[0, 0, Math.PI / 2]}>
              <mesh ref={registerWheel} material={paperMat}>
                <cylinderGeometry args={[0.07, 0.07, 0.07, 12]} />
                <Ink thickness={1.8} />
              </mesh>
            </group>
          ))
        )}
      </group>
    </group>
  );
}
