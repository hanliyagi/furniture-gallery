import { memo } from 'react';
import { FULL_LENGTH_MIRROR_DESIGNS, type FullLengthMirrorDesignKey } from '../fullLengthMirrorDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createFullLengthMirrorVariantModel(modelKey: FullLengthMirrorDesignKey) {
  return memo(function FullLengthMirrorVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={FULL_LENGTH_MIRROR_DESIGNS[modelKey]} />;
  });
}

export const MirrorStandingModel = createFullLengthMirrorVariantModel('mirrorStanding');
export const MirrorWallModel = createFullLengthMirrorVariantModel('mirrorWall');
export const MirrorStorageModel = createFullLengthMirrorVariantModel('mirrorStorage');
export const MirrorClassicRoundedModel = createFullLengthMirrorVariantModel('mirrorClassicRounded');
