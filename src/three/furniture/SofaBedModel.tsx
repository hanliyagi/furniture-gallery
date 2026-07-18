import { memo } from 'react';
import { SOFA_BED_DESIGNS, type SofaBedDesignKey } from '../sofaBedDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createSofaBedVariantModel(modelKey: SofaBedDesignKey) {
  return memo(function SofaBedVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={SOFA_BED_DESIGNS[modelKey]} />;
  });
}

export const SofaBedCompactModel = createSofaBedVariantModel('sofaBedCompact');
export const SofaBedFoldingModel = createSofaBedVariantModel('sofaBedFolding');
export const SofaBedDaybedModel = createSofaBedVariantModel('sofaBedDaybed');
export const SofaBedMidcenturyOrangeModel = createSofaBedVariantModel('sofaBedMidcenturyOrange');
export const SofaBedClassicStorageModel = createSofaBedVariantModel('sofaBedClassicStorage');
