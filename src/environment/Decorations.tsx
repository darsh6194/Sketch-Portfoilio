import { useMemo } from 'react';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { pathCurve } from '../utils/pathCurve';

const rockMat = new THREE.MeshToonMaterial({ color: '#a0988c' });
const benchMat = new THREE.MeshToonMaterial({ color: '#7a6a58' });
const lampMat = new THREE.MeshToonMaterial({ color: '#3a3a3a' });

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

export function Decorations() {
  const rocks = useMemo(() => {
    const items: { x: number; z: number; scale: number; ry: number }[] = [];
    for (let i = 0; i < 30; i++) {
      const t = seededRandom(i * 19.7);
      const point = pathCurve.getPointAt(t);
      const side = seededRandom(i * 23.3) > 0.5 ? 1 : -1;
      const dist = 2 + seededRandom(i * 29.1) * 8;
      items.push({
        x: point.x + side * dist,
        z: point.z + (seededRandom(i * 37.7) - 0.5) * dist,
        scale: 0.15 + seededRandom(i * 41.3) * 0.4,
        ry: seededRandom(i * 47.1) * Math.PI * 2,
      });
    }
    return items;
  }, []);

  const benches = useMemo(() => {
    return [0.1, 0.25, 0.42, 0.6, 0.78].map((t, i) => {
      const point = pathCurve.getPointAt(t);
      return {
        x: point.x + (i % 2 === 0 ? 3 : -3),
        z: point.z + (i % 2 === 0 ? 2 : -2),
        ry: seededRandom(i * 53.1) * Math.PI,
      };
    });
  }, []);

  const lamps = useMemo(() => {
    return [0.08, 0.22, 0.35, 0.5, 0.65, 0.8, 0.93].map((t) => {
      const point = pathCurve.getPointAt(t);
      const tangent = pathCurve.getTangentAt(t);
      return {
        x: point.x + tangent.z * 2.5,
        z: point.z - tangent.x * 2.5,
      };
    });
  }, []);

  return (
    <group>
      {/* Rocks */}
      {rocks.map((rock, i) => (
        <mesh
          key={`r${i}`}
          material={rockMat}
          position={[rock.x, rock.scale * 0.4, rock.z]}
          rotation={[0, rock.ry, 0]}
          scale={[rock.scale * 1.2, rock.scale, rock.scale * 0.9]}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <Edges color="#1a1a1a" threshold={20} />
        </mesh>
      ))}

      {/* Benches */}
      {benches.map((bench, i) => (
        <group key={`b${i}`} position={[bench.x, 0, bench.z]} rotation={[0, bench.ry, 0]}>
          <mesh material={benchMat} position={[0, 0.35, 0]}>
            <boxGeometry args={[0.8, 0.06, 0.3]} />
            <Edges color="#1a1a1a" threshold={15} />
          </mesh>
          {[-0.35, 0.35].map((x) => (
            <mesh key={x} material={benchMat} position={[x, 0.17, 0]}>
              <boxGeometry args={[0.05, 0.35, 0.25]} />
            </mesh>
          ))}
          <mesh material={benchMat} position={[0, 0.5, -0.12]}>
            <boxGeometry args={[0.8, 0.35, 0.05]} />
            <Edges color="#1a1a1a" threshold={15} />
          </mesh>
        </group>
      ))}

      {/* Lamp posts */}
      {lamps.map((lamp, i) => (
        <group key={`l${i}`} position={[lamp.x, 0, lamp.z]}>
          <mesh material={lampMat} position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.03, 0.05, 3, 5]} />
          </mesh>
          <mesh material={lampMat} position={[0, 3, 0]}>
            <boxGeometry args={[0.3, 0.04, 0.3]} />
          </mesh>
          <mesh position={[0, 2.9, 0]}>
            <sphereGeometry args={[0.08, 6, 4]} />
            <meshBasicMaterial color="#fff8e0" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
