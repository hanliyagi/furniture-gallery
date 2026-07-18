import { memo } from 'react';
import { DRAWER_CHEST_DESIGNS, type DrawerChestDesignKey } from '../drawerChestDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createDrawerChestVariantModel(modelKey: DrawerChestDesignKey) {
  return memo(function DrawerChestVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={DRAWER_CHEST_DESIGNS[modelKey]} />;
  });
}

export const DrawerChestLowWideModel = createDrawerChestVariantModel('drawerChestLowWide');
export const DrawerChestVerticalModel = createDrawerChestVariantModel('drawerChestVertical');
export const DrawerChestBedsideModel = createDrawerChestVariantModel('drawerChestBedside');
export const DrawerChestClassicGullabergModel = createDrawerChestVariantModel('drawerChestClassicGullaberg');
