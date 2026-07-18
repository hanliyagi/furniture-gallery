import { memo } from 'react';
import { PLANT_DESIGNS, type PlantDesignKey } from '../plantDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createPlantVariantModel(modelKey: PlantDesignKey) {
  return memo(function PlantVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={PLANT_DESIGNS[modelKey]} />;
  });
}

export const PlantTabletopModel = createPlantVariantModel('plantTabletop');
export const PlantFloorModel = createPlantVariantModel('plantFloor');
export const PlantCornerModel = createPlantVariantModel('plantCorner');
export const PlantMidcenturyModel = createPlantVariantModel('plantMidcentury');
