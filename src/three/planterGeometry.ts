import { LatheGeometry, Vector2 } from 'three';
import type { PlanterPart } from './designTypes';

export function createPlanterGeometry(part: PlanterPart): LatheGeometry {
  const [topRadius, bottomRadius, height] = part.size;
  const halfHeight = height / 2;
  const wallThickness = Math.min(topRadius * 0.12, 0.012);
  const innerTop = Math.max(topRadius - wallThickness, 0.001);
  const innerBottom = Math.max(bottomRadius - wallThickness, 0.001);
  const profile = [
    new Vector2(0, -halfHeight),
    new Vector2(bottomRadius, -halfHeight),
    new Vector2(bottomRadius * 1.04, -height * 0.28),
    new Vector2(topRadius * 0.94, height * 0.22),
    new Vector2(topRadius, halfHeight - wallThickness * 0.45),
    new Vector2(topRadius, halfHeight),
    new Vector2(innerTop, halfHeight),
    new Vector2(innerTop * 0.94, halfHeight - wallThickness),
    new Vector2(innerBottom, -halfHeight + wallThickness),
    new Vector2(0, -halfHeight + wallThickness),
  ];

  const geometry = new LatheGeometry(profile, part.segments);
  geometry.computeVertexNormals();
  return geometry;
}
