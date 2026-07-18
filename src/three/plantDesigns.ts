import { calculateDesignBounds } from './designGeometry';
import { Euler, Quaternion, Vector3 } from 'three';
import type { FurnitureDesign, FurniturePart, TubePart, Vector3Tuple } from './designTypes';
import type { MaterialName } from './materials';

export type PlantDesignKey = 'plantTabletop' | 'plantFloor' | 'plantCorner' | 'plantMidcentury';
export type PlantDesign = FurnitureDesign<'화분', '화분'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

interface PlantConfig {
  readonly width: number;
  readonly depth: number;
  readonly height: number;
  readonly floorPlant: boolean;
  readonly potRadiusRatio: number;
  readonly potHeightRatio: number;
  readonly potMaterial: MaterialName;
}

interface PlantMetadata {
  readonly id: string;
  readonly name: string;
  readonly variant: string;
}

function asCurvePoints(points: readonly Vector3Tuple[]): TubePart['curvePoints'] {
  return points as TubePart['curvePoints'];
}

function createLeafRotation(
  control: Vector3Tuple,
  end: Vector3Tuple,
  roll: number,
): Vector3Tuple {
  const tangent = new Vector3(
    end[0] - control[0],
    end[1] - control[1],
    end[2] - control[2],
  ).normalize();
  const orientation = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), tangent);
  orientation.multiply(new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), roll));
  const rotation = new Euler().setFromQuaternion(orientation, 'XYZ');
  return [rotation.x, rotation.y, rotation.z];
}

function createProceduralPlantParts(config: PlantConfig): FurniturePart[] {
  const {
    width,
    depth,
    height,
    floorPlant,
    potRadiusRatio,
    potHeightRatio,
    potMaterial,
  } = config;
  const minimumHorizontalSize = Math.min(width, depth);
  const leafCount = floorPlant ? 9 : 5;
  const potHeight = height * potHeightRatio;
  const potRadius = minimumHorizontalSize * potRadiusRatio;
  const soilHeight = Math.min(height * 0.018, 0.016);
  const stemStartY = potHeight - soilHeight * 0.75;
  const canopyHeight = height - potHeight;
  const stemRadius = minimumHorizontalSize * (floorPlant ? 0.012 : 0.016);
  const parts: FurniturePart[] = [
    {
      id: 'pot',
      geometry: 'planter',
      size: [potRadius, potRadius * (floorPlant ? 0.72 : 0.78), potHeight],
      segments: 36,
      position: [0, potHeight / 2, 0],
      material: potMaterial,
    },
    {
      id: 'soil',
      geometry: 'cylinder',
      size: [potRadius * 0.86, potRadius * 0.86, soilHeight],
      position: [0, potHeight - soilHeight * 1.15, 0],
      material: 'soil',
    },
  ];

  for (let index = 0; index < leafCount; index += 1) {
    const angle = (index / leafCount) * Math.PI * 2 + (index % 2 === 1 ? 0.18 : 0);
    const directionX = Math.cos(angle);
    const directionZ = Math.sin(angle);
    const spread = minimumHorizontalSize * (0.20 + (index % 2) * 0.035);
    const heightRatio = 0.38 + (index % 3) * 0.10;
    const end: Vector3Tuple = [
      directionX * spread,
      stemStartY + canopyHeight * heightRatio,
      directionZ * spread,
    ];
    const control: Vector3Tuple = [
      directionX * spread * 0.34,
      stemStartY + canopyHeight * heightRatio * 0.56,
      directionZ * spread * 0.34,
    ];
    const tilt = 0.42 + (index % 3) * 0.09;
    const leafHeight = canopyHeight
      * (floorPlant ? 0.34 : 0.42)
      * (index % 2 === 1 ? 1.08 : 0.94);
    const leafWidth = leafHeight * (0.34 + (index % 3) * 0.035);
    const leafRotation = createLeafRotation(
      control,
      end,
      ((index % 4) - 1.5) * 0.22 + (index % 2 === 0 ? 0.08 : -0.06),
    );

    parts.push({
      id: `stem-${index + 1}`,
      geometry: 'tube',
      curvePoints: asCurvePoints([
        [0, stemStartY, 0],
        control,
        end,
      ]),
      radius: stemRadius,
      tubularSegments: 14,
      radialSegments: 6,
      position: [0, 0, 0],
      material: 'plantStem',
    });
    parts.push({
      id: `leaf-${index + 1}`,
      geometry: 'leaf',
      width: leafWidth,
      height: leafHeight,
      curveSegments: 10,
      position: end,
      rotation: leafRotation,
      material: index % 3 === 0 ? 'plant' : 'plantLight',
    });
    parts.push({
      id: `leaf-vein-${index + 1}`,
      geometry: 'tube',
      curvePoints: asCurvePoints([
        [0, -leafHeight * 0.12, 0],
        [0, leafHeight * (0.2 + tilt * 0.03), 0],
        [0, leafHeight * 0.62, 0],
      ]),
      radius: stemRadius * 0.42,
      tubularSegments: 10,
      radialSegments: 5,
      position: end,
      rotation: leafRotation,
      material: 'plantStem',
    });
  }

  return parts;
}

function createBoundsProbe(parts: readonly FurniturePart[], dimensions: PlantConfig): PlantDesign {
  return {
    schemaVersion: '1.0',
    id: 'plant-bounds-probe',
    name: 'plant-bounds-probe',
    furnitureType: '화분',
    category: '화분',
    variant: 'bounds-probe',
    units: 'meter',
    coordinateSystem: COORDINATE_SYSTEM,
    rotationUnit: 'radian',
    dimensions,
    materials: [dimensions.potMaterial, 'soil', 'plantStem', 'plant', 'plantLight'],
    parts,
  };
}

function scalePartVertically(part: FurniturePart, scale: number): FurniturePart {
  const position: Vector3Tuple = [part.position[0], part.position[1] * scale, part.position[2]];

  if (
    part.geometry === 'box'
    || part.geometry === 'roundedBox'
    || part.geometry === 'ellipsoid'
    || part.geometry === 'curtain'
  ) {
    return { ...part, position, size: [part.size[0], part.size[1] * scale, part.size[2]] };
  }
  if (part.geometry === 'cylinder' || part.geometry === 'planter') {
    return { ...part, position, size: [part.size[0], part.size[1], part.size[2] * scale] };
  }
  if (part.geometry === 'tube') {
    return {
      ...part,
      position,
      radius: part.radius * scale,
      curvePoints: asCurvePoints(part.curvePoints.map(([x, y, z]) => [x, y * scale, z] as const)),
    };
  }
  return { ...part, position, height: part.height * scale };
}

function translatePart(part: FurniturePart, offset: Vector3Tuple): FurniturePart {
  return {
    ...part,
    position: [
      part.position[0] + offset[0],
      part.position[1] + offset[1],
      part.position[2] + offset[2],
    ],
  };
}

function createPlantDesign(config: PlantConfig, metadata: PlantMetadata): PlantDesign {
  const rawParts = createProceduralPlantParts(config);
  const rawBounds = calculateDesignBounds(createBoundsProbe(rawParts, config));
  const verticalScale = config.height / rawBounds.dimensions.height;
  const verticallyScaledParts = rawParts.map((part) => scalePartVertically(part, verticalScale));
  const scaledBounds = calculateDesignBounds(createBoundsProbe(verticallyScaledParts, config));
  const centeredParts = verticallyScaledParts.map((part) => translatePart(part, [
    -scaledBounds.center[0],
    -scaledBounds.min[1],
    -scaledBounds.center[2],
  ]));
  const finalBounds = calculateDesignBounds(createBoundsProbe(centeredParts, config));

  return Object.freeze({
    schemaVersion: '1.0',
    ...metadata,
    furnitureType: '화분',
    category: '화분',
    units: 'meter',
    coordinateSystem: COORDINATE_SYSTEM,
    rotationUnit: 'radian',
    dimensions: Object.freeze({ ...finalBounds.dimensions }),
    materials: Object.freeze([config.potMaterial, 'soil', 'plantStem', 'plant', 'plantLight'] as const),
    parts: Object.freeze(centeredParts.map((part) => Object.freeze(part))),
  });
}

function createGrassPlantDesign(config: PlantConfig, metadata: PlantMetadata): PlantDesign {
  const potHeight = config.height * config.potHeightRatio;
  const potRadius = Math.min(config.width, config.depth) * config.potRadiusRatio;
  const soilHeight = 0.012;
  const stemStartY = potHeight - soilHeight * 0.75;
  const bladeHeight = config.height - potHeight;
  const rawParts: FurniturePart[] = [
    { id: 'pot', geometry: 'planter', size: [potRadius, potRadius * 0.78, potHeight], segments: 36, position: [0, potHeight / 2, 0], material: config.potMaterial },
    { id: 'soil', geometry: 'cylinder', size: [potRadius * 0.86, potRadius * 0.86, soilHeight], position: [0, potHeight - soilHeight * 1.15, 0], material: 'soil' },
  ];

  for (let index = 0; index < 14; index += 1) {
    const angle = (index / 14) * Math.PI * 2 + (index % 2) * 0.12;
    const spread = Math.min(config.width, config.depth) * (0.16 + (index % 3) * 0.025);
    const end: Vector3Tuple = [
      Math.cos(angle) * spread,
      stemStartY + bladeHeight * (0.70 + (index % 4) * 0.07),
      Math.sin(angle) * spread,
    ];
    const control: Vector3Tuple = [
      end[0] * 0.28,
      stemStartY + (end[1] - stemStartY) * 0.52,
      end[2] * 0.28,
    ];
    const rotation = createLeafRotation(control, end, ((index % 5) - 2) * 0.12);
    const leafHeight = bladeHeight * (0.42 + (index % 3) * 0.04);

    rawParts.push(
      { id: `stem-${index + 1}`, geometry: 'tube', curvePoints: asCurvePoints([[0, stemStartY, 0], control, end]), radius: 0.006, tubularSegments: 12, radialSegments: 5, position: [0, 0, 0], material: 'plantStem' },
      { id: `leaf-${index + 1}`, geometry: 'leaf', width: leafHeight * 0.13, height: leafHeight, curveSegments: 8, position: end, rotation, material: index % 3 === 0 ? 'plantLight' : 'plant' },
      { id: `leaf-vein-${index + 1}`, geometry: 'tube', curvePoints: asCurvePoints([[0, -leafHeight * 0.10, 0], [0, leafHeight * 0.24, 0], [0, leafHeight * 0.62, 0]]), radius: 0.0028, tubularSegments: 8, radialSegments: 4, position: end, rotation, material: 'plantStem' },
    );
  }

  const rawBounds = calculateDesignBounds(createBoundsProbe(rawParts, config));
  const verticalScale = config.height / rawBounds.dimensions.height;
  const scaledParts = rawParts.map((part) => scalePartVertically(part, verticalScale));
  const scaledBounds = calculateDesignBounds(createBoundsProbe(scaledParts, config));
  const centeredParts = scaledParts.map((part) => translatePart(part, [
    -scaledBounds.center[0],
    -scaledBounds.min[1],
    -scaledBounds.center[2],
  ]));
  const finalBounds = calculateDesignBounds(createBoundsProbe(centeredParts, config));

  return Object.freeze({
    schemaVersion: '1.0',
    ...metadata,
    furnitureType: '화분',
    category: '화분',
    units: 'meter',
    coordinateSystem: COORDINATE_SYSTEM,
    rotationUnit: 'radian',
    dimensions: Object.freeze({ ...finalBounds.dimensions }),
    materials: Object.freeze([config.potMaterial, 'soil', 'plantStem', 'plant', 'plantLight'] as const),
    parts: Object.freeze(centeredParts.map((part) => Object.freeze(part))),
  });
}

// All variants share the same procedural leaf silhouette; only scale, placement,
// leaf count, curvature, tilt, and color distribution change by dimensions.
export const PLANT_DESIGNS: Readonly<Record<PlantDesignKey, PlantDesign>> = Object.freeze({
  plantTabletop: createPlantDesign(
    {
      width: 0.12,
      depth: 0.12,
      height: 0.14,
      floorPlant: false,
      potRadiusRatio: 0.38,
      potHeightRatio: 0.39,
      potMaterial: 'ceramic',
    },
    { id: 'plant-tabletop', name: '소형 테이블 화분', variant: '소형 테이블형' },
  ),
  plantFloor: createGrassPlantDesign(
    {
      width: 0.55,
      depth: 0.55,
      height: 0.40,
      floorPlant: true,
      potRadiusRatio: 0.17,
      potHeightRatio: 0.25,
      potMaterial: 'terracotta',
    },
    { id: 'plant-floor', name: '중형 바닥 화분', variant: '중형 바닥형' },
  ),
  plantCorner: createPlantDesign(
    {
      width: 0.75,
      depth: 0.75,
      height: 0.90,
      floorPlant: true,
      potRadiusRatio: 0.19,
      potHeightRatio: 0.20,
      potMaterial: 'ceramic',
    },
    { id: 'plant-corner', name: '대형 코너 화분', variant: '대형 코너형' },
  ),
  plantMidcentury: createPlantDesign(
    {
      width: 0.42,
      depth: 0.42,
      height: 0.65,
      floorPlant: true,
      potRadiusRatio: 0.25,
      potHeightRatio: 0.27,
      potMaterial: 'redPlastic',
    },
    { id: 'plant-midcentury', name: '미드센추리 레드 화분', variant: '미드센추리 플라스틱형' },
  ),
});
