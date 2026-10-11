import * as THREE from 'three';

export const sketchVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const sketchFragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uLightDir;
  uniform float uOutlineThreshold;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(uLightDir);
    float diffuse = dot(normal, lightDir);

    // Toon shading with 3 bands
    float shade;
    if (diffuse > 0.6) {
      shade = 1.0;
    } else if (diffuse > 0.2) {
      shade = 0.85;
    } else {
      shade = 0.7;
    }

    // Edge darkening based on view angle
    vec3 viewDir = normalize(-vPosition);
    float edge = dot(viewDir, normal);
    float edgeFactor = smoothstep(0.0, uOutlineThreshold, edge);

    vec3 color = uColor * shade * edgeFactor;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function createSketchMaterial(color = '#f5f0e8') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uLightDir: { value: new THREE.Vector3(1, 2, 1).normalize() },
      uOutlineThreshold: { value: 0.3 },
    },
    vertexShader: sketchVertexShader,
    fragmentShader: sketchFragmentShader,
    side: THREE.FrontSide,
  });
}

export const outlineMaterial = new THREE.MeshBasicMaterial({
  color: '#1a1a1a',
  side: THREE.BackSide,
});
