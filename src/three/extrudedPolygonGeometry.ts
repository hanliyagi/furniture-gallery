import { ExtrudeGeometry, Shape } from 'three';
import type { ExtrudedPolygonPart } from './designTypes';

export function createExtrudedPolygonGeometry(part: ExtrudedPolygonPart): ExtrudeGeometry {
  const shape = new Shape();
  part.points.forEach(([x, z], index) => {
    if (index === 0) shape.moveTo(x, -z);
    else shape.lineTo(x, -z);
  });
  shape.closePath();

  const geometry = new ExtrudeGeometry(shape, {
    depth: part.height,
    bevelEnabled: false,
    steps: 1,
  });
  geometry.translate(0, 0, -part.height / 2);
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}
