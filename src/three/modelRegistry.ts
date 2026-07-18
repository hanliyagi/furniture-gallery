import type { ThreeElements } from '@react-three/fiber';
import type { ComponentType } from 'react';
import { MODEL_KEYS, type ModelKey } from '../types/furniture';
import { BedClassicIdanaesModel, BedFabricHeadboardModel, BedLoftDeskModel, BedLowPlatformModel, BedMidcenturyTealModel, BedStorageModel } from './furniture/BedModel';
import { BookshelfClassicHavstaModel, BookshelfDoubleOpenModel, BookshelfHighModel, BookshelfLowModel, BookshelfMidcenturyStockholmModel } from './furniture/BookshelfModel';
import { ChairArmrestModel, ChairBasicModel, ChairClassicTonstadModel, ChairCompactSwivelModel, ChairGamingMatchspelModel, ChairMidcenturyShellModel } from './furniture/DeskChairModel';
import { DeskCompactModel, DeskCornerModel, DeskMidcenturyGlassModel, DeskStorageModel } from './furniture/DeskModel';
import { DrawerChestBedsideModel, DrawerChestClassicGullabergModel, DrawerChestLowWideModel, DrawerChestVerticalModel } from './furniture/DrawerChestModel';
import { NightstandClassicGullabergModel, NightstandDrawerModel, NightstandMidcenturyTrolleyModel, NightstandOpenModel, NightstandRoundModel } from './furniture/NightstandModel';
import { MonitorBasicModel, MonitorDualModel, MonitorGamingOdysseyModel, MonitorUltrawideModel } from './furniture/MonitorModel';
import { SofaBedClassicStorageModel, SofaBedCompactModel, SofaBedDaybedModel, SofaBedFoldingModel, SofaBedMidcenturyOrangeModel } from './furniture/SofaBedModel';
import { SideTableCoffeeModel, SideTableMidcenturyStockholmModel, SideTableRoundModel, SideTableStorageModel } from './furniture/SideTableModel';
import { SofaClassicEktorpModel, SofaMidcenturyStockholmModel, SofaModularModel, SofaSingleModel, SofaTwoSeatModel } from './furniture/SofaModel';
import { WardrobeClassicGullabergModel, WardrobeHingedModel, WardrobeNaturalNordkisaModel, WardrobeOpenModel, WardrobeSlidingModel } from './furniture/WardrobeModel';
import { HangerBasicModel, HangerCornerModel, HangerNaturalMorsningModel, HangerShelfModel } from './furniture/HangerModel';
import { MediaConsoleDrawerModel, MediaConsoleLowModel, MediaConsoleMidcenturyStockholmModel, MediaConsoleOpenModel } from './furniture/MediaConsoleModel';
import { TvMediumModel, TvNaturalFrameModel, TvSmallModel, TvWideModel } from './furniture/TvMonitorModel';
import { MultiTableCompactModel, MultiTableGatelegModel, MultiTableStorageModel, MultiTableTwoSeatModel } from './furniture/MultiTableModel';
import { PartitionShelfKallaxModel, PartitionShelfSlimModel, PartitionShelfStorageModel, PartitionShelfTranslucentModel } from './furniture/PartitionShelfModel';
import { RugGeometricModel, RugRectangularModel, RugRoundModel, RugRunnerModel } from './furniture/RugModel';
import { PlantCornerModel, PlantFloorModel, PlantMidcenturyModel, PlantTabletopModel } from './furniture/PlantModel';
import { MirrorClassicRoundedModel, MirrorStandingModel, MirrorStorageModel, MirrorWallModel } from './furniture/FullLengthMirrorModel';
import { LampFloorModel, LampIndirectModel, LampMidcenturyGlobeModel, LampTableModel } from './furniture/MoodLampModel';
import { BlindRollerModel, BlindWoodModel, CurtainBlackoutModel, CurtainFabricModel } from './furniture/CurtainBlindModel';

export { MODEL_KEYS };

export type GroupProps = ThreeElements['group'];
export type ModelComponent = ComponentType<GroupProps>;

export const MODEL_COMPONENTS = Object.freeze({
  deskCompact: DeskCompactModel,
  deskStorage: DeskStorageModel,
  deskCorner: DeskCornerModel,
  deskMidcenturyGlass: DeskMidcenturyGlassModel,
  bedLowPlatform: BedLowPlatformModel,
  bedStorage: BedStorageModel,
  bedFabricHeadboard: BedFabricHeadboardModel,
  bedMidcenturyTeal: BedMidcenturyTealModel,
  bedClassicIdanaes: BedClassicIdanaesModel,
  bedLoftDesk: BedLoftDeskModel,
  sofaBedCompact: SofaBedCompactModel,
  sofaBedFolding: SofaBedFoldingModel,
  sofaBedDaybed: SofaBedDaybedModel,
  sofaBedMidcenturyOrange: SofaBedMidcenturyOrangeModel,
  sofaBedClassicStorage: SofaBedClassicStorageModel,
  nightstandDrawer: NightstandDrawerModel,
  nightstandOpen: NightstandOpenModel,
  nightstandRound: NightstandRoundModel,
  nightstandClassicGullaberg: NightstandClassicGullabergModel,
  nightstandMidcenturyTrolley: NightstandMidcenturyTrolleyModel,
  chairBasic: ChairBasicModel,
  chairArmrest: ChairArmrestModel,
  chairCompactSwivel: ChairCompactSwivelModel,
  chairClassicTonstad: ChairClassicTonstadModel,
  chairGamingMatchspel: ChairGamingMatchspelModel,
  chairMidcenturyShell: ChairMidcenturyShellModel,
  bookshelfLow: BookshelfLowModel,
  bookshelfHigh: BookshelfHighModel,
  bookshelfDoubleOpen: BookshelfDoubleOpenModel,
  bookshelfClassicHavsta: BookshelfClassicHavstaModel,
  bookshelfMidcenturyStockholm: BookshelfMidcenturyStockholmModel,
  monitorBasic: MonitorBasicModel,
  monitorUltrawide: MonitorUltrawideModel,
  monitorDual: MonitorDualModel,
  monitorGamingOdyssey: MonitorGamingOdysseyModel,
  wardrobeHinged: WardrobeHingedModel,
  wardrobeSliding: WardrobeSlidingModel,
  wardrobeOpen: WardrobeOpenModel,
  wardrobeNaturalNordkisa: WardrobeNaturalNordkisaModel,
  wardrobeClassicGullaberg: WardrobeClassicGullabergModel,
  drawerChestLowWide: DrawerChestLowWideModel,
  drawerChestVertical: DrawerChestVerticalModel,
  drawerChestBedside: DrawerChestBedsideModel,
  drawerChestClassicGullaberg: DrawerChestClassicGullabergModel,
  hangerBasic: HangerBasicModel,
  hangerShelf: HangerShelfModel,
  hangerCorner: HangerCornerModel,
  hangerNaturalMorsning: HangerNaturalMorsningModel,
  sofaSingle: SofaSingleModel,
  sofaTwoSeat: SofaTwoSeatModel,
  sofaModular: SofaModularModel,
  sofaClassicEktorp: SofaClassicEktorpModel,
  sofaMidcenturyStockholm: SofaMidcenturyStockholmModel,
  sideTableRound: SideTableRoundModel,
  sideTableCoffee: SideTableCoffeeModel,
  sideTableStorage: SideTableStorageModel,
  sideTableMidcenturyStockholm: SideTableMidcenturyStockholmModel,
  tvSmall: TvSmallModel,
  tvMedium: TvMediumModel,
  tvWide: TvWideModel,
  tvNaturalFrame: TvNaturalFrameModel,
  mediaConsoleLow: MediaConsoleLowModel,
  mediaConsoleDrawer: MediaConsoleDrawerModel,
  mediaConsoleOpen: MediaConsoleOpenModel,
  mediaConsoleMidcenturyStockholm: MediaConsoleMidcenturyStockholmModel,
  multiTableCompact: MultiTableCompactModel,
  multiTableTwoSeat: MultiTableTwoSeatModel,
  multiTableStorage: MultiTableStorageModel,
  multiTableGateleg: MultiTableGatelegModel,
  partitionShelfSlim: PartitionShelfSlimModel,
  partitionShelfTranslucent: PartitionShelfTranslucentModel,
  partitionShelfStorage: PartitionShelfStorageModel,
  partitionShelfKallax: PartitionShelfKallaxModel,
  rugRound: RugRoundModel,
  rugRectangular: RugRectangularModel,
  rugRunner: RugRunnerModel,
  rugGeometric: RugGeometricModel,
  plantTabletop: PlantTabletopModel,
  plantFloor: PlantFloorModel,
  plantCorner: PlantCornerModel,
  plantMidcentury: PlantMidcenturyModel,
  mirrorStanding: MirrorStandingModel,
  mirrorWall: MirrorWallModel,
  mirrorStorage: MirrorStorageModel,
  mirrorClassicRounded: MirrorClassicRoundedModel,
  lampTable: LampTableModel,
  lampFloor: LampFloorModel,
  lampIndirect: LampIndirectModel,
  lampMidcenturyGlobe: LampMidcenturyGlobeModel,
  curtainFabric: CurtainFabricModel,
  blindRoller: BlindRollerModel,
  blindWood: BlindWoodModel,
  curtainBlackout: CurtainBlackoutModel,
} satisfies Record<ModelKey, ModelComponent>);

export interface FurnitureViewConfig {
  cameraPosition: [number, number, number];
  target: [number, number, number];
  scale: number;
}

export const VIEW_CONFIGS = Object.freeze({
  deskCompact: { cameraPosition: [1.9, 1.4, 2.3], target: [0, 0.36, 0], scale: 1 },
  deskStorage: { cameraPosition: [2.1, 1.5, 2.4], target: [0, 0.37, 0], scale: 1 },
  deskCorner: { cameraPosition: [-2, 1.7, 2.2], target: [0, 0.7, 0], scale: 1 },
  deskMidcenturyGlass: { cameraPosition: [2.25, 1.45, 2.55], target: [0, 0.4, 0], scale: 1 },
  bedLowPlatform: { cameraPosition: [2.1, 1.45, 2.6], target: [0, 0.36, 0], scale: 1 },
  bedStorage: { cameraPosition: [2.15, 1.5, 2.65], target: [0, 0.42, 0], scale: 1 },
  bedFabricHeadboard: { cameraPosition: [2.2, 1.55, 2.7], target: [0, 0.46, 0], scale: 1 },
  bedMidcenturyTeal: { cameraPosition: [3.0, 1.85, 3.35], target: [0, 0.58, 0], scale: 1 },
  bedClassicIdanaes: { cameraPosition: [2.9, 1.75, 3.25], target: [0, 0.58, 0], scale: 1 },
  bedLoftDesk: { cameraPosition: [3.15, 2.35, 3.4], target: [0, 0.95, 0], scale: 1 },
  sofaBedCompact: { cameraPosition: [2.15, 1.45, 2.35], target: [0, 0.42, 0], scale: 1 },
  sofaBedFolding: { cameraPosition: [2.35, 1.55, 2.55], target: [0, 0.4, 0], scale: 1 },
  sofaBedDaybed: { cameraPosition: [2.7, 1.55, 2.65], target: [0, 0.38, 0], scale: 1 },
  sofaBedMidcenturyOrange: { cameraPosition: [2.55, 1.55, 2.75], target: [0, 0.44, 0], scale: 1 },
  sofaBedClassicStorage: { cameraPosition: [2.75, 1.5, 2.75], target: [0, 0.42, 0], scale: 1 },
  nightstandDrawer: { cameraPosition: [1.1, 0.85, 1.35], target: [0, 0.27, 0], scale: 1 },
  nightstandOpen: { cameraPosition: [0.95, 0.75, 1.15], target: [0, 0.22, 0], scale: 1 },
  nightstandRound: { cameraPosition: [1.05, 0.85, 1.25], target: [0, 0.26, 0], scale: 1 },
  nightstandClassicGullaberg: { cameraPosition: [1.15, 1, 1.35], target: [0, 0.35, 0], scale: 1 },
  nightstandMidcenturyTrolley: { cameraPosition: [0.78, 0.62, 0.9], target: [0, 0.2, 0], scale: 1 },
  chairBasic: { cameraPosition: [1.25, 1, 1.55], target: [0, 0.4, 0], scale: 1 },
  chairArmrest: { cameraPosition: [1.65, 1.35, 1.9], target: [0, 0.55, 0], scale: 1 },
  chairCompactSwivel: { cameraPosition: [1.45, 1.15, 1.7], target: [0, 0.45, 0], scale: 1 },
  chairClassicTonstad: { cameraPosition: [1.4, 1.15, 1.65], target: [0, 0.43, 0], scale: 1 },
  chairGamingMatchspel: { cameraPosition: [1.8, 1.55, 2.1], target: [0, 0.66, 0], scale: 1 },
  chairMidcenturyShell: { cameraPosition: [1.45, 1.2, 1.7], target: [0, 0.44, 0], scale: 1 },
  bookshelfLow: { cameraPosition: [1.5, 1.3, 1.8], target: [0, 0.53, 0], scale: 1 },
  bookshelfHigh: { cameraPosition: [2.1, 1.8, 2.5], target: [0, 1.01, 0], scale: 1 },
  bookshelfDoubleOpen: { cameraPosition: [1.8, 1.5, 2.15], target: [0, 0.73, 0], scale: 1 },
  bookshelfClassicHavsta: { cameraPosition: [2.1, 1.55, 2.4], target: [0, 0.67, 0], scale: 1 },
  bookshelfMidcenturyStockholm: { cameraPosition: [2.45, 1.9, 2.8], target: [0, 0.94, 0], scale: 1 },
  monitorBasic: { cameraPosition: [1.05, 0.75, 1.25], target: [0, 0.21, 0], scale: 1 },
  monitorUltrawide: { cameraPosition: [1.4, 0.9, 1.55], target: [0, 0.24, 0], scale: 1 },
  monitorDual: { cameraPosition: [1.75, 1, 1.85], target: [0, 0.21, 0], scale: 1 },
  monitorGamingOdyssey: { cameraPosition: [1.45, 1.0, 1.65], target: [0, 0.3, 0], scale: 1 },
  wardrobeHinged: { cameraPosition: [2, 1.65, 2.35], target: [0, 0.88, 0], scale: 1 },
  wardrobeSliding: { cameraPosition: [2.35, 1.75, 2.6], target: [0, 0.88, 0], scale: 1 },
  wardrobeOpen: { cameraPosition: [2.15, 1.7, 2.45], target: [0, 0.86, 0], scale: 1 },
  wardrobeNaturalNordkisa: { cameraPosition: [2.55, 1.85, 2.8], target: [0, 0.93, 0], scale: 1 },
  wardrobeClassicGullaberg: { cameraPosition: [2.8, 2.0, 3.15], target: [0, 1.0, 0], scale: 1 },
  drawerChestLowWide: { cameraPosition: [2, 1.25, 2.25], target: [0, 0.36, 0], scale: 1 },
  drawerChestVertical: { cameraPosition: [1.7, 1.35, 2], target: [0, 0.56, 0], scale: 1 },
  drawerChestBedside: { cameraPosition: [0.95, 0.7, 1.1], target: [0, 0.25, 0], scale: 1 },
  drawerChestClassicGullaberg: { cameraPosition: [1.9, 1.5, 2.15], target: [0, 0.61, 0], scale: 1 },
  hangerBasic: { cameraPosition: [2.1, 1.65, 2.35], target: [0, 0.88, 0], scale: 1 },
  hangerShelf: { cameraPosition: [2, 1.65, 2.25], target: [0, 0.88, 0], scale: 1 },
  hangerCorner: { cameraPosition: [2, 1.65, 2], target: [0, 0.88, 0], scale: 1 },
  hangerNaturalMorsning: { cameraPosition: [1.55, 1.35, 1.75], target: [0, 0.7, 0], scale: 1 },
  sofaSingle: { cameraPosition: [1.7, 1.25, 1.9], target: [0, 0.42, 0], scale: 1 },
  sofaTwoSeat: { cameraPosition: [2, 1.25, 2.15], target: [0, 0.34, 0], scale: 1 },
  sofaModular: { cameraPosition: [2.25, 1.35, 2.4], target: [0, 0.36, 0], scale: 1 },
  sofaClassicEktorp: { cameraPosition: [3.0, 1.65, 3.15], target: [0, 0.44, 0], scale: 1 },
  sofaMidcenturyStockholm: { cameraPosition: [1.75, 1.05, 1.9], target: [0, 0.4, 0], scale: 1 },
  sideTableRound: { cameraPosition: [1.05, 0.8, 1.25], target: [0, 0.26, 0], scale: 1 },
  sideTableCoffee: { cameraPosition: [1.55, 0.9, 1.75], target: [0, 0.23, 0], scale: 1 },
  sideTableStorage: { cameraPosition: [1.35, 0.9, 1.55], target: [0, 0.26, 0], scale: 1 },
  sideTableMidcenturyStockholm: { cameraPosition: [0.9, 0.72, 1.05], target: [0, 0.22, 0], scale: 1 },
  tvSmall: { cameraPosition: [1.05, 0.72, 1.25], target: [0, 0.23, 0], scale: 1 },
  tvMedium: { cameraPosition: [1.35, 0.88, 1.55], target: [0, 0.3, 0], scale: 1 },
  tvWide: { cameraPosition: [1.7, 1.05, 1.9], target: [0, 0.38, 0], scale: 1 },
  tvNaturalFrame: { cameraPosition: [1.35, 0.9, 1.55], target: [0, 0.3, 0], scale: 1 },
  mediaConsoleLow: { cameraPosition: [1.65, 0.9, 1.85], target: [0, 0.18, 0], scale: 1 },
  mediaConsoleDrawer: { cameraPosition: [1.75, 1.05, 1.95], target: [0, 0.24, 0], scale: 1 },
  mediaConsoleOpen: { cameraPosition: [1.8, 1.15, 2], target: [0, 0.32, 0], scale: 1 },
  mediaConsoleMidcenturyStockholm: { cameraPosition: [1.85, 0.98, 2], target: [0, 0.33, 0], scale: 1 },
  multiTableCompact: { cameraPosition: [1.2, 1.05, 1.35], target: [0, 0.36, 0], scale: 1 },
  multiTableTwoSeat: { cameraPosition: [1.35, 1.1, 1.55], target: [0, 0.37, 0], scale: 1 },
  multiTableStorage: { cameraPosition: [1.75, 1.35, 1.9], target: [0, 0.45, 0], scale: 1 },
  multiTableGateleg: { cameraPosition: [2.15, 1.45, 2.35], target: [0, 0.37, 0], scale: 1 },
  partitionShelfSlim: { cameraPosition: [1.5, 1.35, 1.85], target: [0, 0.7, 0], scale: 1 },
  partitionShelfTranslucent: { cameraPosition: [2.1, 1.45, 2.25], target: [0, 0.75, 0], scale: 1 },
  partitionShelfStorage: { cameraPosition: [1.65, 1.4, 1.95], target: [0, 0.73, 0], scale: 1 },
  partitionShelfKallax: { cameraPosition: [2.05, 1.25, 2.25], target: [0, 0.39, 0], scale: 1 },
  rugRound: { cameraPosition: [1.45, 1.25, 1.65], target: [0, 0.02, 0], scale: 1 },
  rugRectangular: { cameraPosition: [1.55, 1.35, 1.9], target: [0, 0.01, 0], scale: 1 },
  rugRunner: { cameraPosition: [1.35, 1.3, 1.85], target: [0, 0.01, 0], scale: 1 },
  rugGeometric: { cameraPosition: [1.65, 1.35, 1.95], target: [0, 0.01, 0], scale: 1 },
  plantTabletop: { cameraPosition: [0.28, 0.22, 0.34], target: [0, 0.07, 0], scale: 1 },
  plantFloor: { cameraPosition: [0.85, 0.65, 0.95], target: [0, 0.20, 0], scale: 1 },
  plantCorner: { cameraPosition: [1.25, 1.0, 1.45], target: [0, 0.45, 0], scale: 1 },
  plantMidcentury: { cameraPosition: [0.75, 0.58, 0.92], target: [0, 0.22, 0], scale: 1 },
  mirrorStanding: { cameraPosition: [1.7, 1.5, 2.5], target: [0, 0.78, 0], scale: 1 },
  mirrorWall: { cameraPosition: [1.6, 1.5, 2.4], target: [0, 0.78, 0], scale: 1 },
  mirrorStorage: { cameraPosition: [1.8, 1.55, 2.5], target: [0, 0.81, 0], scale: 1 },
  mirrorClassicRounded: { cameraPosition: [1.75, 1.5, 2.45], target: [0, 0.82, 0], scale: 1 },
  lampTable: { cameraPosition: [0.75, 0.55, 0.9], target: [0, 0.23, 0], scale: 1 },
  lampFloor: { cameraPosition: [1.7, 1.4, 2.1], target: [0, 0.74, 0], scale: 1 },
  lampIndirect: { cameraPosition: [0.72, 0.48, 0.88], target: [0, 0.2, 0], scale: 1 },
  lampMidcenturyGlobe: { cameraPosition: [0.72, 0.48, 0.88], target: [0, 0.14, 0], scale: 1 },
  curtainFabric: { cameraPosition: [2.4, 1.85, 2.7], target: [0, 1.2, 0], scale: 1 },
  blindRoller: { cameraPosition: [1.8, 1.45, 2.1], target: [0, 0.9, 0], scale: 1 },
  blindWood: { cameraPosition: [1.8, 1.45, 2.1], target: [0, 0.9, 0], scale: 1 },
  curtainBlackout: { cameraPosition: [2.4, 1.85, 2.7], target: [0, 1.2, 0], scale: 1 },
} satisfies Record<ModelKey, FurnitureViewConfig>);

export interface ScenePolicyOptions {
  detail: boolean;
  reducedMotion: boolean;
  mobile: boolean;
}

export interface ScenePolicy {
  readonly enableZoom: boolean;
  readonly enablePan: boolean;
  readonly autoRotate: boolean;
  readonly autoRotateSpeed: number;
  readonly dpr: [number, number];
}

const SCENE_DPR: [number, number] = [1, 1.5];
Object.freeze(SCENE_DPR);

function createScenePolicy(detail: boolean, reducedMotion: boolean, mobile: boolean): ScenePolicy {
  return Object.freeze({
    enableZoom: detail,
    enablePan: detail,
    autoRotate: !detail && !reducedMotion,
    autoRotateSpeed: mobile ? 0.3 : 0.55,
    dpr: SCENE_DPR,
  });
}

const SCENE_POLICIES = Object.freeze({
  card: Object.freeze({
    desktop: Object.freeze({ motion: createScenePolicy(false, false, false), reduced: createScenePolicy(false, true, false) }),
    mobile: Object.freeze({ motion: createScenePolicy(false, false, true), reduced: createScenePolicy(false, true, true) }),
  }),
  detail: Object.freeze({
    desktop: Object.freeze({ motion: createScenePolicy(true, false, false), reduced: createScenePolicy(true, true, false) }),
    mobile: Object.freeze({ motion: createScenePolicy(true, false, true), reduced: createScenePolicy(true, true, true) }),
  }),
});

export function getScenePolicy({ detail, reducedMotion, mobile }: ScenePolicyOptions): ScenePolicy {
  return SCENE_POLICIES[detail ? 'detail' : 'card'][mobile ? 'mobile' : 'desktop'][reducedMotion ? 'reduced' : 'motion'];
}
