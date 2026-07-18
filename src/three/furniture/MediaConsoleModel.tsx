import { memo } from 'react';
import { MEDIA_CONSOLE_DESIGNS, type MediaConsoleDesignKey } from '../mediaConsoleDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createMediaConsoleVariantModel(modelKey: MediaConsoleDesignKey) {
  return memo(function MediaConsoleVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={MEDIA_CONSOLE_DESIGNS[modelKey]} />;
  });
}

export const MediaConsoleLowModel = createMediaConsoleVariantModel('mediaConsoleLow');
export const MediaConsoleDrawerModel = createMediaConsoleVariantModel('mediaConsoleDrawer');
export const MediaConsoleOpenModel = createMediaConsoleVariantModel('mediaConsoleOpen');
export const MediaConsoleMidcenturyStockholmModel = createMediaConsoleVariantModel('mediaConsoleMidcenturyStockholm');
