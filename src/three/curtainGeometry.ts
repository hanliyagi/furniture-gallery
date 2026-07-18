import { PlaneGeometry } from 'three';
import type { CurtainPart } from './designTypes';

export function createFabricCurtainGeometry(part: CurtainPart): PlaneGeometry {
  const [width, height, depth] = part.size;
  const geometry = new PlaneGeometry(width, height, part.segmentsX, part.segmentsY);
  const positions = geometry.getAttribute('position');

  for (let index = 0; index < positions.count; index += 1) {
    const originalX = positions.getX(index);
    const y = positions.getY(index);
    const horizontalProgress = originalX / width + 0.5;
    const verticalProgress = y / height + 0.5;
    const phase = horizontalProgress * part.folds * Math.PI * 2 - Math.PI / 2;
    const lowerDrape = 0.86 + (1 - verticalProgress) * 0.14;
    const topGather = 0.985 + (1 - verticalProgress) * 0.015;
    const hemInfluence = Math.max(0, 1 - verticalProgress * 10);
    const hemLift = (1 - Math.cos(phase)) * 0.005 * hemInfluence;

    positions.setXYZ(
      index,
      originalX * topGather,
      y + hemLift,
      Math.sin(phase) * (depth / 2) * lowerDrape,
    );
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}
