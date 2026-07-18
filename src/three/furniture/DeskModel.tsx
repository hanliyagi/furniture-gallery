import { memo } from 'react';
import { DESK_DESIGNS, type DeskDesignKey } from '../deskDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createDeskVariantModel(modelKey: DeskDesignKey) {
  return memo(function DeskVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={DESK_DESIGNS[modelKey]} />;
  });
}

export const DeskCompactModel = createDeskVariantModel('deskCompact');
export const DeskStorageModel = createDeskVariantModel('deskStorage');
export const DeskCornerModel = createDeskVariantModel('deskCorner');
export const DeskMidcenturyGlassModel = createDeskVariantModel('deskMidcenturyGlass');
