import type { MaterialName } from './materials';

export type Vector3Tuple = readonly [number, number, number];

interface FurniturePartBase {
  readonly id: string;
  readonly position: Vector3Tuple;
  readonly rotation?: Vector3Tuple;
  readonly material: MaterialName;
}

export interface BoxPart extends FurniturePartBase {
  readonly geometry: 'box';
  readonly size: Vector3Tuple;
}

export interface RoundedBoxPart extends FurniturePartBase {
  readonly geometry: 'roundedBox';
  readonly size: Vector3Tuple;
  readonly radius: number;
  readonly smoothness: number;
}

export interface CylinderPart extends FurniturePartBase {
  readonly geometry: 'cylinder';
  readonly size: Vector3Tuple;
}

export interface EllipsoidPart extends FurniturePartBase {
  readonly geometry: 'ellipsoid';
  readonly size: Vector3Tuple;
}

export interface TubePart extends FurniturePartBase {
  readonly geometry: 'tube';
  readonly curvePoints: readonly [Vector3Tuple, Vector3Tuple, Vector3Tuple];
  readonly radius: number;
  readonly tubularSegments: number;
  readonly radialSegments: number;
}

export interface LeafPart extends FurniturePartBase {
  readonly geometry: 'leaf';
  readonly width: number;
  readonly height: number;
  readonly curveSegments: number;
}

export interface CurtainPart extends FurniturePartBase {
  readonly geometry: 'curtain';
  readonly size: Vector3Tuple;
  readonly folds: number;
  readonly segmentsX: number;
  readonly segmentsY: number;
}

export interface PlanterPart extends FurniturePartBase {
  readonly geometry: 'planter';
  readonly size: Vector3Tuple;
  readonly segments: number;
}

export interface ExtrudedPolygonPart extends FurniturePartBase {
  readonly geometry: 'extrudedPolygon';
  readonly points: readonly (readonly [number, number])[];
  readonly height: number;
}

export type FurniturePart =
  | BoxPart
  | RoundedBoxPart
  | CylinderPart
  | EllipsoidPart
  | TubePart
  | LeafPart
  | CurtainPart
  | PlanterPart
  | ExtrudedPolygonPart;

export interface FurnitureDesign<
  FurnitureType extends string = string,
  Category extends string = string,
> {
  readonly schemaVersion: '1.0';
  readonly id: string;
  readonly name: string;
  readonly furnitureType: FurnitureType;
  readonly category: Category;
  readonly variant: string;
  readonly units: 'meter';
  readonly coordinateSystem: {
    readonly origin: 'floor-center';
    readonly axes: {
      readonly x: 'right';
      readonly y: 'up';
      readonly z: 'front';
    };
  };
  readonly rotationUnit: 'radian';
  readonly dimensions: {
    readonly width: number;
    readonly depth: number;
    readonly height: number;
  };
  readonly materials: readonly MaterialName[];
  readonly parts: readonly FurniturePart[];
  readonly purchaseUrl?: string | null;
}

export type FurnitureStyleTag = 'minimal' | 'natural' | 'modern' | 'classic' | 'midcentury';
export type FurnitureLifestyleTag = 'REST' | 'WORK_STUDY' | 'STORAGE' | 'HOBBY_LEISURE';

export interface DownloadableFurnitureDesign extends Omit<FurnitureDesign, 'id' | 'category' | 'purchaseUrl'> {
  readonly variantId: string;
  readonly furnitureTypeCode: string;
  readonly styleTags: readonly FurnitureStyleTag[];
  readonly lifestyleTags: readonly FurnitureLifestyleTag[];
  readonly purchaseUrl: string | null;
}
