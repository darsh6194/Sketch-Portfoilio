import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Ground() {
  const meshRef = useRef<THREE.Mesh>(null);

  const gridShader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#ece8e0') },
        uLineColor: { value: new THREE.Color('#c0b8b0') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        void main() {
          vUv = uv;
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uLineColor;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        void main() {
          vec2 grid = abs(fract(vWorldPos.xz * 0.1) - 0.5);
          float line = min(grid.x, grid.y);
          float gridLine = 1.0 - smoothstep(0.0, 0.03, line);

          // Fade grid with distance
          float dist = length(vWorldPos.xz);
          float fade = 1.0 - smoothstep(30.0, 120.0, dist);
          gridLine *= fade * 0.3;

          vec3 color = mix(uColor, uLineColor, gridLine);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    }),
    []
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[95, -0.5, -14]} receiveShadow>
      <planeGeometry args={[400, 200]} />
      <shaderMaterial args={[gridShader]} />
    </mesh>
  );
}
