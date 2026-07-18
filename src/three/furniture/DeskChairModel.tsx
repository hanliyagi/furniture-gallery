import { memo } from 'react';
import { CHAIR_DESIGNS, type ChairDesignKey } from '../chairDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createChairVariantModel(modelKey: ChairDesignKey) {
  return memo(function ChairVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={CHAIR_DESIGNS[modelKey]} />;
  });
}

export const ChairBasicModel = createChairVariantModel('chairBasic');
export const ChairArmrestModel = createChairVariantModel('chairArmrest');
export const ChairCompactSwivelModel = createChairVariantModel('chairCompactSwivel');
export const ChairClassicTonstadModel = createChairVariantModel('chairClassicTonstad');
export const ChairGamingMatchspelModel = createChairVariantModel('chairGamingMatchspel');
export const ChairMidcenturyShellModel = createChairVariantModel('chairMidcenturyShell');
