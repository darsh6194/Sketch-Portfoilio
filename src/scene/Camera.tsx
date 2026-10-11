import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { getPathState } from '../utils/pathCurve';
import { CAMERA, SECTION_BOUNDARIES } from '../utils/constants';
import { usePortfolioActions, usePortfolioState } from '../store/PortfolioContext';

const _targetPos = new THREE.Vector3();
const _lookAt = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);

export function CameraRig() {
  const { camera } = useThree();
  const scroll = useScroll();
  const { setCurrentSection, setScrollProgress } = usePortfolioActions();
  const { activeBuilding } = usePortfolioState();
  const smoothOffset = useRef(0);

  useFrame(() => {
    if (activeBuilding) return;

    const rawOffset = scroll.offset;
    smoothOffset.current = THREE.MathUtils.lerp(smoothOffset.current, rawOffset, 0.1);
    const t = smoothOffset.current;

    const { position, tangent } = getPathState(t);

    _targetPos.set(
      position.x - tangent.x * 15 + 0,
      position.y + 10,
      position.z - tangent.z * 15 + 5
    );

    camera.position.lerp(_targetPos, CAMERA.lerpFactor);

    const lookT = Math.min(t + CAMERA.lookAheadFactor, 1);
    const lookState = getPathState(lookT);
    _lookAt.copy(lookState.position);
    _lookAt.y += 2;

    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(20).add(camera.position);
    currentLookAt.lerp(_lookAt, CAMERA.lerpFactor * 1.5);

    camera.lookAt(currentLookAt);
    camera.up.copy(_up);

    setScrollProgress(t);
    for (const [section, [start, end]] of Object.entries(SECTION_BOUNDARIES)) {
      if (t >= start && t < end) {
        setCurrentSection(section);
        break;
      }
    }
  });

  return null;
}
