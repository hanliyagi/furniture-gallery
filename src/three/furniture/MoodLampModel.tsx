import { memo } from 'react';
import { MOOD_LAMP_DESIGNS, MOOD_LAMP_LIGHTS, type MoodLampDesignKey } from '../moodLampDesigns';
import { MATERIALS } from '../materials';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createMoodLampVariantModel(modelKey: MoodLampDesignKey) {
  return memo(function MoodLampVariantModel(props: GroupProps) {
    const light = MOOD_LAMP_LIGHTS[modelKey];
    return (
      <group {...props}>
        <FurnitureDesignModel design={MOOD_LAMP_DESIGNS[modelKey]} />
        <pointLight
          name={`${modelKey}-point-light`}
          position={[...light.position]}
          color={MATERIALS.light.color}
          intensity={light.intensity}
          distance={light.distance}
          decay={2}
        />
      </group>
    );
  });
}

export const LampTableModel = createMoodLampVariantModel('lampTable');
export const LampFloorModel = createMoodLampVariantModel('lampFloor');
export const LampIndirectModel = createMoodLampVariantModel('lampIndirect');
export const LampMidcenturyGlobeModel = createMoodLampVariantModel('lampMidcenturyGlobe');
