import { useThree } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { useMemo } from 'react';
import * as THREE from 'three';
import { Effect, BlendFunction } from 'postprocessing';

const paperGrainShader = `
  uniform float uIntensity;
  uniform float uTime;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 noiseCoord = uv * 800.0;
    float grain = hash(noiseCoord + uTime * 0.1) * uIntensity;

    // Vignette
    vec2 center = uv - 0.5;
    float vignette = 1.0 - dot(center, center) * 0.5;

    // Warm tint
    vec3 warmTint = vec3(1.0, 0.98, 0.95);

    vec3 color = inputColor.rgb * warmTint * vignette;
    color += (grain - uIntensity * 0.5) * 0.15;

    outputColor = vec4(color, inputColor.a);
  }
`;

class PaperGrainEffect extends Effect {
  constructor() {
    super('PaperGrainEffect', paperGrainShader, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map<string, THREE.Uniform>([
        ['uIntensity', new THREE.Uniform(0.15)],
        ['uTime', new THREE.Uniform(0)],
      ]),
    });
  }

  update(_renderer: THREE.WebGLRenderer, _inputBuffer: THREE.WebGLRenderTarget, deltaTime?: number) {
    const timeUniform = this.uniforms.get('uTime');
    if (timeUniform && deltaTime) {
      timeUniform.value += deltaTime;
    }
  }
}

const edgeDetectShader = `
  uniform vec2 uResolution;
  uniform float uThreshold;
  uniform vec3 uEdgeColor;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 texel = 1.0 / uResolution;

    // Sobel edge detection
    vec4 tl = texture2D(inputBuffer, uv + vec2(-texel.x, texel.y));
    vec4 tm = texture2D(inputBuffer, uv + vec2(0.0, texel.y));
    vec4 tr = texture2D(inputBuffer, uv + vec2(texel.x, texel.y));
    vec4 ml = texture2D(inputBuffer, uv + vec2(-texel.x, 0.0));
    vec4 mr = texture2D(inputBuffer, uv + vec2(texel.x, 0.0));
    vec4 bl = texture2D(inputBuffer, uv + vec2(-texel.x, -texel.y));
    vec4 bm = texture2D(inputBuffer, uv + vec2(0.0, -texel.y));
    vec4 br = texture2D(inputBuffer, uv + vec2(texel.x, -texel.y));

    vec4 gx = -tl - 2.0 * ml - bl + tr + 2.0 * mr + br;
    vec4 gy = -tl - 2.0 * tm - tr + bl + 2.0 * bm + br;

    float edge = length(gx.rgb) + length(gy.rgb);
    edge = smoothstep(uThreshold, uThreshold + 0.1, edge);

    vec3 color = mix(inputColor.rgb, uEdgeColor, edge * 0.7);
    outputColor = vec4(color, inputColor.a);
  }
`;

class EdgeDetectEffect extends Effect {
  constructor(resolution: THREE.Vector2) {
    super('EdgeDetectEffect', edgeDetectShader, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map<string, THREE.Uniform>([
        ['uResolution', new THREE.Uniform(resolution)],
        ['uThreshold', new THREE.Uniform(0.08)],
        ['uEdgeColor', new THREE.Uniform(new THREE.Color('#2a2a2a'))],
      ]),
    });
  }
}

export function SketchPostProcessing() {
  const { size } = useThree();

  const effects = useMemo(() => {
    const resolution = new THREE.Vector2(size.width, size.height);
    return {
      edge: new EdgeDetectEffect(resolution),
      paper: new PaperGrainEffect(),
    };
  }, [size.width, size.height]);

  return (
    <EffectComposer>
      <primitive object={effects.edge} />
      <primitive object={effects.paper} />
    </EffectComposer>
  );
}
