import { memo } from 'react';
import { SOFA_DESIGNS, type SofaDesignKey } from '../sofaDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createSofaVariantModel(modelKey: SofaDesignKey) {
  return memo(function SofaVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={SOFA_DESIGNS[modelKey]} />;
  });
}

export const SofaSingleModel = createSofaVariantModel('sofaSingle');
export const SofaTwoSeatModel = createSofaVariantModel('sofaTwoSeat');
export const SofaModularModel = createSofaVariantModel('sofaModular');
export const SofaClassicEktorpModel = createSofaVariantModel('sofaClassicEktorp');
export const SofaMidcenturyStockholmModel = createSofaVariantModel('sofaMidcenturyStockholm');
