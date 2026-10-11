import { useRef, useState, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioActions } from '../store/PortfolioContext';

interface Props {
  id: string;
  position: [number, number, number];
  label: string;
  icon?: string;
  children: ReactNode;
}

export function SketchBuilding({ id, position, label, icon, children }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const { openBuilding } = usePortfolioActions();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0] * 0.1) * 0.08;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        openBuilding(id);
      }}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {children}

      {/* Label */}
      <Text
        position={[0, 7, 0]}
        fontSize={1.2}
        color="#1a1a1a"
        font="https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2Q7azYpiN_EMA.woff2"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        {label}
      </Text>

      {icon && (
        <Text
          position={[0, 8.2, 0]}
          fontSize={1.5}
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
      )}

      {/* Click hint on hover */}
      {hovered && (
        <Text
          position={[0, 5.8, 0]}
          fontSize={0.6}
          color="#555"
          font="https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2Q7azYpiN_EMA.woff2"
          anchorX="center"
          anchorY="middle"
        >
          Click to enter
        </Text>
      )}

      {/* Hover glow ring */}
      {hovered && (
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4, 4.3, 32]} />
          <meshBasicMaterial color="#1a1a1a" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}
