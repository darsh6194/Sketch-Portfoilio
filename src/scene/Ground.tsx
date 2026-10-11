import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Ground() {
  const meshRef = useRef<THREE.Mesh>(null);

  const gridShader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#efe9dd') },
        uLineColor: { value: new THREE.Color('#cbc4b6') },
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

        // cheap hash for a sparse hand-stippled texture
        float hash(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }

        void main() {
          // Faint hand-ruled grid
          vec2 grid = abs(fract(vWorldPos.xz * 0.1) - 0.5);
          float line = min(grid.x, grid.y);
          float gridLine = 1.0 - smoothstep(0.0, 0.025, line);

          // Sparse stipple dots for a sketched-paper ground
          vec2 cell = floor(vWorldPos.xz * 0.5);
          float stip = step(0.93, hash(cell)) * (1.0 - smoothstep(0.0, 0.12, length(fract(vWorldPos.xz * 0.5) - 0.5)));

          float dist = length(vWorldPos.xz);
          float fade = 1.0 - smoothstep(25.0, 130.0, dist);

          float ink = clamp(gridLine * 0.28 + stip * 0.5, 0.0, 1.0) * fade;
          vec3 color = mix(uColor, uLineColor, ink);
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
