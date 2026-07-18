import { memo } from 'react';
import { HANGER_DESIGNS, type HangerDesignKey } from '../hangerDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createHangerVariantModel(modelKey: HangerDesignKey) {
  return memo(function HangerVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={HANGER_DESIGNS[modelKey]} />;
  });
}

export const HangerBasicModel = createHangerVariantModel('hangerBasic');
export const HangerShelfModel = createHangerVariantModel('hangerShelf');
export const HangerCornerModel = createHangerVariantModel('hangerCorner');
export const HangerNaturalMorsningModel = createHangerVariantModel('hangerNaturalMorsning');
