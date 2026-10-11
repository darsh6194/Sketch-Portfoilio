import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { pathCurve } from '../utils/pathCurve';

export function PathRoad() {
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(pathCurve, 200, 0.8, 8, false);
  }, []);

  const lineRef = useRef<THREE.Line>(null);

  const dashedLine = useMemo(() => {
    const points = pathCurve.getPoints(300);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineDashedMaterial({ color: '#3a3a3a', dashSize: 1.2, gapSize: 0.8 });
    return new THREE.Line(geo, mat);
  }, []);

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.computeLineDistances();
    }
  }, []);

  return (
    <group>
      <mesh geometry={tubeGeometry} position={[0, -0.3, 0]}>
        <meshBasicMaterial color="#c8c4b8" transparent opacity={0.8} />
      </mesh>

      <primitive ref={lineRef} object={dashedLine} position={[0, 0.05, 0]} />

      <mesh position={[0, -0.48, 0]}>
        <tubeGeometry args={[pathCurve, 200, 1.8, 8, false]} />
        <meshBasicMaterial color="#d8d4c8" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
