import { Outlines, Edges } from '@react-three/drei';
import { SKETCH } from './materials';

/**
 * Constant-width ink silhouette. Drop inside a <mesh> and it draws a pen-style
 * outline around that mesh. `screenspace` keeps the line the same pixel width
 * at any distance or object scale — the hallmark of a hand-drawn line.
 *
 * Use on hero / large shapes (character parts, buildings). Avoid on mass
 * foliage where the extra inverted-hull pass would multiply draw calls.
 */
export function Ink({
  thickness = 2.4,
  color = SKETCH.ink,
  opacity = 1,
}: {
  thickness?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <Outlines
      screenspace
      thickness={thickness}
      color={color}
      opacity={opacity}
      transparent={opacity < 1}
      toneMapped={false}
    />
  );
}

/**
 * Interior crease lines (where two faces meet past `angle`). Cheaper than Ink;
 * good for panel seams, window frames, roof ridges. Use a high threshold so
 * coplanar box seams don't all draw.
 */
export function Crease({
  threshold = 25,
  color = SKETCH.ink,
}: {
  threshold?: number;
  color?: string;
}) {
  return <Edges threshold={threshold} color={color} />;
}
