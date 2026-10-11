import * as THREE from 'three';

/**
 * Shared "ink on paper" palette. Everything in the world draws from this so the
 * whole scene reads as a single hand-drawn black-and-white sketch.
 */
export const SKETCH = {
  paper: '#f6f1e7', // main light fill (character body, building walls)
  paperDeep: '#e9e3d6', // slightly shaded paper for secondary masses
  ink: '#161616', // darkest line / fill (outlines, caps, shoes, doors)
  inkSoft: '#2c2c2c', // softened ink for large dark masses
  gray: '#9b958a', // mid tone
  grayDark: '#6a655d', // dark mid tone
  grayLight: '#c9c3b7', // pale mid tone
  accent: '#3a3a3a', // signage / detail lines
} as const;

/**
 * Build a tiny 1-D lookup texture used as a MeshToonMaterial gradientMap.
 * NearestFilter makes the ramp step hard, turning smooth lighting into a few
 * flat cel bands — the core of the "ink fill" look.
 */
function makeGradientMap(steps: number[]): THREE.DataTexture {
  const data = new Uint8Array(steps.length * 4);
  steps.forEach((v, i) => {
    const c = Math.max(0, Math.min(255, Math.round(v * 255)));
    data[i * 4 + 0] = c;
    data[i * 4 + 1] = c;
    data[i * 4 + 2] = c;
    data[i * 4 + 3] = 255;
  });
  const tex = new THREE.DataTexture(data, steps.length, 1, THREE.RGBAFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

// Three crisp bands: deep shadow, mid, light.
const gradientMap = makeGradientMap([0.5, 0.78, 1.0]);

const cache = new Map<string, THREE.MeshToonMaterial>();

/**
 * Memoized cel-shaded material for a given ink/paper color. Reusing one
 * material per color keeps draw-call state changes and memory low across the
 * hundreds of meshes in the world.
 */
export function toon(color: string): THREE.MeshToonMaterial {
  let m = cache.get(color);
  if (!m) {
    m = new THREE.MeshToonMaterial({ color, gradientMap });
    cache.set(color, m);
  }
  return m;
}

// Ready-made materials for the common tones.
export const paperMat = toon(SKETCH.paper);
export const paperDeepMat = toon(SKETCH.paperDeep);
export const inkMat = toon(SKETCH.ink);
export const inkSoftMat = toon(SKETCH.inkSoft);
export const grayMat = toon(SKETCH.gray);
export const grayDarkMat = toon(SKETCH.grayDark);
export const grayLightMat = toon(SKETCH.grayLight);
