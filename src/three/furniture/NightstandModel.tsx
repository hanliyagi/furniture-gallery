import { memo } from 'react';
import { NIGHTSTAND_DESIGNS, type NightstandDesignKey } from '../nightstandDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createNightstandVariantModel(modelKey: NightstandDesignKey) {
  return memo(function NightstandVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={NIGHTSTAND_DESIGNS[modelKey]} />;
  });
}

export const NightstandDrawerModel = createNightstandVariantModel('nightstandDrawer');
export const NightstandOpenModel = createNightstandVariantModel('nightstandOpen');
export const NightstandRoundModel = createNightstandVariantModel('nightstandRound');
export const NightstandClassicGullabergModel = createNightstandVariantModel('nightstandClassicGullaberg');
export const NightstandMidcenturyTrolleyModel = createNightstandVariantModel('nightstandMidcenturyTrolley');
