export const COLORS = {
  sketchBlack: '#1a1a1a',
  sketchWhite: '#f5f0e8',
  sketchGray: '#888888',
  outlineColor: '#2a2a2a',
  shadowGray: '#c0c0c0',
  paperBg: '#faf6f0',
};

export const CAMERA = {
  fov: 50,
  near: 0.1,
  far: 500,
  followOffset: { x: 0, y: 10, z: -15 },
  lookAheadFactor: 0.03,
  lerpFactor: 0.08,
};

export const SCROLL = {
  pages: 7,
  damping: 0.25,
};

export const SECTION_BOUNDARIES: Record<string, [number, number]> = {
  intro: [0, 0.12],
  education: [0.12, 0.28],
  experience: [0.28, 0.46],
  projects: [0.46, 0.64],
  skills: [0.64, 0.82],
  contact: [0.82, 1.0],
};

export const BUILDING_PATH_POSITIONS: Record<string, number> = {
  education: 0.18,
  experience: 0.36,
  projects: 0.54,
  skills: 0.72,
  contact: 0.90,
};
