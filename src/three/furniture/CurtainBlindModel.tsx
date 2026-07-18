import { memo } from 'react';
import { CURTAIN_BLIND_DESIGNS, type CurtainBlindDesignKey } from '../curtainBlindDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createCurtainBlindVariantModel(modelKey: CurtainBlindDesignKey) {
  return memo(function CurtainBlindVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={CURTAIN_BLIND_DESIGNS[modelKey]} />;
  });
}

export const CurtainFabricModel = createCurtainBlindVariantModel('curtainFabric');
export const BlindRollerModel = createCurtainBlindVariantModel('blindRoller');
export const BlindWoodModel = createCurtainBlindVariantModel('blindWood');
export const CurtainBlackoutModel = createCurtainBlindVariantModel('curtainBlackout');
