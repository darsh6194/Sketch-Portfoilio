import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import * as THREE from 'three';
import { PortfolioProvider } from './store/PortfolioContext';
import { SketchWorld } from './scene/SketchWorld';
import { BuildingInterior } from './overlays/BuildingInterior';
import { NavigationBar } from './overlays/NavigationBar';
import { IntroOverlay } from './overlays/IntroOverlay';
import { ProgressIndicator } from './overlays/ProgressIndicator';
import { SCROLL, CAMERA } from './utils/constants';
import './styles/global.css';

export default function App() {
  return (
    <PortfolioProvider>
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Canvas
          camera={{
            fov: CAMERA.fov,
            near: CAMERA.near,
            far: CAMERA.far,
            position: [0, 10, 15],
          }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.NoToneMapping,
          }}
          dpr={[1, 1.5]}
          style={{ background: '#faf6f0' }}
          onCreated={({ scene }) => {
            scene.background = new THREE.Color('#faf6f0');
            scene.fog = new THREE.Fog('#faf6f0', 50, 180);
          }}
        >
          <ScrollControls pages={SCROLL.pages} damping={SCROLL.damping}>
            <SketchWorld />
          </ScrollControls>
        </Canvas>

        {/* 2D UI Overlays */}
        <NavigationBar />
        <IntroOverlay />
        <ProgressIndicator />
        <BuildingInterior />
      </div>
    </PortfolioProvider>
  );
}
