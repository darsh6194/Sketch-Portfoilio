import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { pathCurve } from '../utils/pathCurve';
import { SKETCH } from '../sketch/materials';

export function PathRoad() {
  // Flattened tubes read as a wide paper ribbon rather than a round pipe.
  const roadGeometry = useMemo(() => new THREE.TubeGeometry(pathCurve, 240, 1.15, 10, false), []);
  const baseGeometry = useMemo(() => new THREE.TubeGeometry(pathCurve, 240, 1.55, 10, false), []);

  const centerLineRef = useRef<THREE.Line>(null);
  const edgeLeftRef = useRef<THREE.Line>(null);
  const edgeRightRef = useRef<THREE.Line>(null);

  // Dashed ink centre line + solid-ish ink edges for a drawn road.
  const lines = useMemo(() => {
    const pts = pathCurve.getPoints(360);
    const makeOffset = (side: number) => {
      const up = new THREE.Vector3(0, 1, 0);
      return pts.map((p, i) => {
        const tan = pathCurve.getTangentAt(i / (pts.length - 1));
        const left = new THREE.Vector3().crossVectors(up, tan).normalize();
        return p.clone().add(left.multiplyScalar(side));
      });
    };
    const center = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineDashedMaterial({ color: SKETCH.ink, dashSize: 1.3, gapSize: 0.9, transparent: true, opacity: 0.8 })
    );
    const edgeMat = () =>
      new THREE.LineDashedMaterial({ color: SKETCH.inkSoft, dashSize: 2.4, gapSize: 0.5, transparent: true, opacity: 0.5 });
    const left = new THREE.Line(new THREE.BufferGeometry().setFromPoints(makeOffset(1.05)), edgeMat());
    const right = new THREE.Line(new THREE.BufferGeometry().setFromPoints(makeOffset(-1.05)), edgeMat());
    return { center, left, right };
  }, []);

  useEffect(() => {
    centerLineRef.current?.computeLineDistances();
    edgeLeftRef.current?.computeLineDistances();
    edgeRightRef.current?.computeLineDistances();
  }, []);

  return (
    <group>
      {/* Wide pale shoulder */}
      <mesh geometry={baseGeometry} position={[0, -0.46, 0]} scale={[1, 0.12, 1]}>
        <meshToonMaterial color={SKETCH.paperDeep} transparent opacity={0.9} />
      </mesh>
      {/* Road surface */}
      <mesh geometry={roadGeometry} position={[0, -0.42, 0]} scale={[1, 0.14, 1]}>
        <meshToonMaterial color={SKETCH.grayLight} />
      </mesh>

      <primitive ref={edgeLeftRef} object={lines.left} position={[0, -0.33, 0]} />
      <primitive ref={edgeRightRef} object={lines.right} position={[0, -0.33, 0]} />
      <primitive ref={centerLineRef} object={lines.center} position={[0, -0.32, 0]} />
    </group>
  );
}
