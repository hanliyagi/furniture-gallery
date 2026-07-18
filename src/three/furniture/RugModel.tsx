import { memo } from 'react';
import { RUG_DESIGNS, type RugDesignKey } from '../rugDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createRugVariantModel(modelKey: RugDesignKey) {
  return memo(function RugVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={RUG_DESIGNS[modelKey]} />;
  });
}

export const RugRoundModel = createRugVariantModel('rugRound');
export const RugRectangularModel = createRugVariantModel('rugRectangular');
export const RugRunnerModel = createRugVariantModel('rugRunner');
export const RugGeometricModel = createRugVariantModel('rugGeometric');
