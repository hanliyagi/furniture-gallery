import { memo } from 'react';
import { BED_DESIGNS, type BedDesignKey } from '../bedDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createBedVariantModel(modelKey: BedDesignKey) {
  return memo(function BedVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={BED_DESIGNS[modelKey]} />;
  });
}

export const BedLowPlatformModel = createBedVariantModel('bedLowPlatform');
export const BedStorageModel = createBedVariantModel('bedStorage');
export const BedFabricHeadboardModel = createBedVariantModel('bedFabricHeadboard');
export const BedMidcenturyTealModel = createBedVariantModel('bedMidcenturyTeal');
export const BedClassicIdanaesModel = createBedVariantModel('bedClassicIdanaes');
export const BedLoftDeskModel = createBedVariantModel('bedLoftDesk');
