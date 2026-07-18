import { CatmullRomCurve3, Shape, Vector3 } from 'three';
import type { LeafPart, TubePart } from './designTypes';

export function createPlantLeafShape(width: number, height: number): Shape {
  const halfWidth = width / 2;
  const neckWidth = halfWidth * 0.1;
  const baseOverlap = height * 0.09;
  const shape = new Shape();

  // The narrow base continues below the leaf origin so the petiole and leaf
  // overlap instead of meeting at a single, visually fragile point.
  shape.moveTo(-neckWidth, -baseOverlap);
  shape.bezierCurveTo(-halfWidth * 0.34, height * 0.06, -halfWidth, height * 0.46, 0, height);
  shape.bezierCurveTo(halfWidth * 0.9, height * 0.5, halfWidth * 0.4, height * 0.08, neckWidth, -baseOverlap);
  shape.closePath();
  return shape;
}

export function createPlantTubeCurve(curvePoints: TubePart['curvePoints']): CatmullRomCurve3 {
  return new CatmullRomCurve3(curvePoints.map((point) => new Vector3(...point)));
}

export function isTubePart(part: { geometry: string }): part is TubePart {
  return part.geometry === 'tube';
}

export function isLeafPart(part: { geometry: string }): part is LeafPart {
  return part.geometry === 'leaf';
}
