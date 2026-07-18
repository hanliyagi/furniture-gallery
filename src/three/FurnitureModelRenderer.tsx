import { memo } from 'react';
import type { ModelKey } from '../types/furniture';
import { MATERIALS } from './materials';
import { MODEL_COMPONENTS, type GroupProps } from './modelRegistry';

export interface FurnitureModelRendererProps extends GroupProps {
  modelKey: ModelKey;
}

function isRegisteredModelKey(value: unknown): value is ModelKey {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(MODEL_COMPONENTS, value);
}

const WARNED_INVALID_MODEL_KEYS = new Set<unknown>();

const UnknownFurnitureFallback = memo(function UnknownFurnitureFallback({
  name,
  userData,
  ...groupProps
}: GroupProps) {
  return (
    <group
      {...groupProps}
      name={name ?? 'unknown-furniture-fallback'}
      userData={{
        ...userData,
        accessibleLabel: 'Unknown furniture model fallback',
        fallbackForInvalidModel: true,
      }}
    >
      <mesh name="fallback-pedestal" position={[0, 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.48, 0.58, 0.16, 24]} />
        <meshStandardMaterial {...MATERIALS.metalLight} />
      </mesh>
      <mesh name="fallback-neutral-object" position={[0, 0.56, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.42, 20, 14]} />
        <meshStandardMaterial {...MATERIALS.ceramic} />
      </mesh>
    </group>
  );
});

export const FurnitureModelRenderer = memo(function FurnitureModelRenderer({
  modelKey,
  ...groupProps
}: FurnitureModelRendererProps) {
  if (!isRegisteredModelKey(modelKey)) {
    if (import.meta.env.DEV && !WARNED_INVALID_MODEL_KEYS.has(modelKey)) {
      WARNED_INVALID_MODEL_KEYS.add(modelKey);
      console.warn(
        `[FurnitureModelRenderer] Invalid model key "${String(modelKey)}"; rendering fallback geometry.`,
      );
    }

    return <UnknownFurnitureFallback {...groupProps} />;
  }

  const Model = MODEL_COMPONENTS[modelKey];
  return <Model {...groupProps} />;
});
