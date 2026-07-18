import type { ThreeElements } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import { DoubleSide } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { createFabricCurtainGeometry } from '../curtainGeometry';
import type { CurtainPart, ExtrudedPolygonPart, FurnitureDesign, LeafPart, PlanterPart, RoundedBoxPart, TubePart } from '../designTypes';
import { createExtrudedPolygonGeometry } from '../extrudedPolygonGeometry';
import { MATERIALS } from '../materials';
import { createPlantLeafShape, createPlantTubeCurve } from '../plantGeometry';
import { createPlanterGeometry } from '../planterGeometry';

export type FurnitureDesignModelProps = ThreeElements['group'] & {
  design: FurnitureDesign;
};

function ProceduralTubeGeometry({ part }: { part: TubePart }) {
  const curve = useMemo(() => createPlantTubeCurve(part.curvePoints), [part.curvePoints]);
  return <tubeGeometry args={[curve, part.tubularSegments, part.radius, part.radialSegments, false]} />;
}

function ProceduralLeafGeometry({ part }: { part: LeafPart }) {
  const shape = useMemo(() => createPlantLeafShape(part.width, part.height), [part.height, part.width]);
  return <shapeGeometry args={[shape, part.curveSegments]} />;
}

function ProceduralCurtainGeometry({ part }: { part: CurtainPart }) {
  const geometry = useMemo(() => createFabricCurtainGeometry(part), [part]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <primitive object={geometry} attach="geometry" />;
}

function ProceduralRoundedBoxGeometry({ part }: { part: RoundedBoxPart }) {
  const geometry = useMemo(
    () => new RoundedBoxGeometry(part.size[0], part.size[1], part.size[2], part.smoothness, part.radius),
    [part],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <primitive object={geometry} attach="geometry" />;
}

function ProceduralPlanterGeometry({ part }: { part: PlanterPart }) {
  const geometry = useMemo(() => createPlanterGeometry(part), [part]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <primitive object={geometry} attach="geometry" />;
}

function ProceduralExtrudedPolygonGeometry({ part }: { part: ExtrudedPolygonPart }) {
  const geometry = useMemo(() => createExtrudedPolygonGeometry(part), [part]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <primitive object={geometry} attach="geometry" />;
}

export function FurnitureDesignModel({ design, name, userData, ...groupProps }: FurnitureDesignModelProps) {
  return (
    <group {...groupProps} name={name ?? design.id} userData={{ ...userData, designId: design.id, variant: design.variant }}>
      {design.parts.map((part) => (
        <mesh
          key={part.id}
          name={part.id}
          position={[...part.position]}
          rotation={part.rotation ? [...part.rotation] : undefined}
          scale={part.geometry === 'ellipsoid' ? [...part.size] : undefined}
          castShadow
          receiveShadow
        >
          {part.geometry === 'box' ? (
            <boxGeometry args={[...part.size]} />
          ) : part.geometry === 'roundedBox' ? (
            <ProceduralRoundedBoxGeometry part={part} />
          ) : part.geometry === 'cylinder' ? (
            <cylinderGeometry args={[...part.size, 32]} />
          ) : part.geometry === 'ellipsoid' ? (
            <sphereGeometry args={[0.5, 28, 18]} />
          ) : part.geometry === 'tube' ? (
            <ProceduralTubeGeometry part={part} />
          ) : part.geometry === 'curtain' ? (
            <ProceduralCurtainGeometry part={part} />
          ) : part.geometry === 'planter' ? (
            <ProceduralPlanterGeometry part={part} />
          ) : part.geometry === 'extrudedPolygon' ? (
            <ProceduralExtrudedPolygonGeometry part={part} />
          ) : (
            <ProceduralLeafGeometry part={part} />
          )}
          <meshStandardMaterial
            {...MATERIALS[part.material]}
            side={part.geometry === 'leaf' || part.geometry === 'curtain' ? DoubleSide : undefined}
          />
        </mesh>
      ))}
    </group>
  );
}
