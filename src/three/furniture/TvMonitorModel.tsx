import { memo } from 'react';
import { TV_DESIGNS, type TvDesignKey } from '../tvDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createTvVariantModel(modelKey: TvDesignKey) {
  return memo(function TvVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={TV_DESIGNS[modelKey]} />;
  });
}

export const TvSmallModel = createTvVariantModel('tvSmall');
export const TvMediumModel = createTvVariantModel('tvMedium');
export const TvWideModel = createTvVariantModel('tvWide');
export const TvNaturalFrameModel = createTvVariantModel('tvNaturalFrame');

// Kept as a compatibility alias until every consumer switches to the three TV variants.
export const TvMonitorModel = TvMediumModel;
