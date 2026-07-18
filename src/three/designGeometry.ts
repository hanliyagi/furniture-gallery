import { Box3, Euler, Matrix4, ShapeGeometry, TubeGeometry, Vector3 } from 'three';
import type { FurnitureDesign, FurniturePart } from './designTypes';
import { createPlantLeafShape, createPlantTubeCurve } from './plantGeometry';

export interface DesignBounds {
  readonly min: readonly [number, number, number];
  readonly max: readonly [number, number, number];
  readonly center: readonly [number, number, number];
  readonly dimensions: {
    readonly width: number;
    readonly depth: number;
    readonly height: number;
  };
}

export interface PartBounds {
  readonly min: readonly [number, number, number];
  readonly max: readonly [number, number, number];
}

function getLocalHalfExtents(part: FurniturePart): [number, number, number] {
  if (part.geometry === 'tube' || part.geometry === 'leaf' || part.geometry === 'extrudedPolygon') {
    throw new Error(`Procedural part ${part.id} requires geometry-derived bounds`);
  }

  if (
    part.geometry === 'box'
    || part.geometry === 'roundedBox'
    || part.geometry === 'ellipsoid'
    || part.geometry === 'curtain'
  ) {
    return [part.size[0] / 2, part.size[1] / 2, part.size[2] / 2];
  }

  const radius = Math.max(part.size[0], part.size[1]);
  return [radius, part.size[2] / 2, radius];
}

function calculateProceduralPartBounds(part: FurniturePart): PartBounds {
  if (part.geometry !== 'tube' && part.geometry !== 'leaf' && part.geometry !== 'extrudedPolygon') {
    throw new Error(`Part ${part.id} is not procedural geometry`);
  }

  if (part.geometry === 'extrudedPolygon') {
    const transform = new Matrix4().makeRotationFromEuler(new Euler(...(part.rotation ?? [0, 0, 0])));
    transform.setPosition(...part.position);
    const bounds = new Box3().makeEmpty();
    for (const [x, z] of part.points) {
      bounds.expandByPoint(new Vector3(x, -part.height / 2, z).applyMatrix4(transform));
      bounds.expandByPoint(new Vector3(x, part.height / 2, z).applyMatrix4(transform));
    }
    return Object.freeze({
      min: Object.freeze([bounds.min.x, bounds.min.y, bounds.min.z] as const),
      max: Object.freeze([bounds.max.x, bounds.max.y, bounds.max.z] as const),
    });
  }

  const geometry = part.geometry === 'tube'
    ? new TubeGeometry(
        createPlantTubeCurve(part.curvePoints),
        part.tubularSegments,
        part.radius,
        part.radialSegments,
        false,
      )
    : new ShapeGeometry(createPlantLeafShape(part.width, part.height), part.curveSegments);
  const transform = new Matrix4().makeRotationFromEuler(new Euler(...(part.rotation ?? [0, 0, 0])));
  transform.setPosition(...part.position);
  const positionAttribute = geometry.getAttribute('position');
  const bounds = new Box3();
  const vertex = new Vector3();
  bounds.makeEmpty();
  for (let index = 0; index < positionAttribute.count; index += 1) {
    vertex.fromBufferAttribute(positionAttribute, index).applyMatrix4(transform);
    bounds.expandByPoint(vertex);
  }

  const result = Object.freeze({
    min: Object.freeze([bounds.min.x, bounds.min.y, bounds.min.z] as const),
    max: Object.freeze([bounds.max.x, bounds.max.y, bounds.max.z] as const),
  });
  geometry.dispose();
  return result;
}

function getWorldHalfExtents(part: FurniturePart): [number, number, number] {
  const [halfX, halfY, halfZ] = getLocalHalfExtents(part);
  if (!part.rotation) return [halfX, halfY, halfZ];

  const matrix = new Matrix4().makeRotationFromEuler(new Euler(...part.rotation));
  const elements = matrix.elements;

  return [
    Math.abs(elements[0]!) * halfX + Math.abs(elements[4]!) * halfY + Math.abs(elements[8]!) * halfZ,
    Math.abs(elements[1]!) * halfX + Math.abs(elements[5]!) * halfY + Math.abs(elements[9]!) * halfZ,
    Math.abs(elements[2]!) * halfX + Math.abs(elements[6]!) * halfY + Math.abs(elements[10]!) * halfZ,
  ];
}

export function calculatePartBounds(part: FurniturePart): PartBounds {
  if (part.geometry === 'tube' || part.geometry === 'leaf' || part.geometry === 'extrudedPolygon') {
    return calculateProceduralPartBounds(part);
  }

  const halfExtents = getWorldHalfExtents(part);
  return Object.freeze({
    min: Object.freeze([
      part.position[0] - halfExtents[0],
      part.position[1] - halfExtents[1],
      part.position[2] - halfExtents[2],
    ] as const),
    max: Object.freeze([
      part.position[0] + halfExtents[0],
      part.position[1] + halfExtents[1],
      part.position[2] + halfExtents[2],
    ] as const),
  });
}

export function calculateDesignBounds(design: FurnitureDesign): DesignBounds {
  const minimum = [Infinity, Infinity, Infinity];
  const maximum = [-Infinity, -Infinity, -Infinity];

  for (const part of design.parts) {
    const partBounds = calculatePartBounds(part);
    for (const axis of [0, 1, 2] as const) {
      minimum[axis] = Math.min(minimum[axis]!, partBounds.min[axis]);
      maximum[axis] = Math.max(maximum[axis]!, partBounds.max[axis]);
    }
  }

  const min = minimum as [number, number, number];
  const max = maximum as [number, number, number];

  return Object.freeze({
    min: Object.freeze(min),
    max: Object.freeze(max),
    center: Object.freeze([
      (min[0] + max[0]) / 2,
      (min[1] + max[1]) / 2,
      (min[2] + max[2]) / 2,
    ] as const),
    dimensions: Object.freeze({
      width: max[0] - min[0],
      depth: max[2] - min[2],
      height: max[1] - min[1],
    }),
  });
}
