export const MATERIAL_COLORS = Object.freeze({
  wood: '#A87852',
  woodLight: '#C9A47E',
  woodDark: '#6F4E3A',
  paintedWhite: '#F4F3EF',
  mustardPaint: '#D6A62A',
  fabric: '#CFC2B3',
  fabricLight: '#E9E1D7',
  fabricDark: '#8E8277',
  metal: '#4B4A47',
  metalLight: '#AAA7A1',
  glass: '#C7D5D3',
  screen: '#31546A',
  screenFrame: '#171A1C',
  plantStem: '#40553A',
  plant: '#617255',
  plantLight: '#8A9B72',
  soil: '#5A4335',
  mirror: '#DDE9EA',
  light: '#F1C77E',
  lampShade: '#F3D6A5',
  ledDiffuser: '#FFF5D6',
  ceramic: '#D8D0C5',
  terracotta: '#907052',
  brass: '#C49A4A',
  tealFabric: '#197C7A',
  orangeFabric: '#C85F2D',
  orangeFabricDark: '#9D3F24',
  chrome: '#D4D8DA',
  redPlastic: '#C63232',
  goldenYellowMetal: '#D8A719',
  gentianBlueMetal: '#28558A',
  redVinyl: '#C83A35',
  blueVinyl: '#2C5A93',
  yellowVinyl: '#D7A726',
  transparentAmberPlastic: '#E59A38',
} as const);

export type MaterialName = keyof typeof MATERIAL_COLORS;

export interface SharedMaterial {
  readonly color: string;
  readonly roughness: number;
  readonly metalness: number;
  readonly transparent?: boolean;
  readonly opacity?: number;
  readonly emissive?: string;
  readonly emissiveIntensity?: number;
}

function defineMaterial(material: SharedMaterial): Readonly<SharedMaterial> {
  return Object.freeze(material);
}

export const MATERIALS: Readonly<Record<MaterialName, Readonly<SharedMaterial>>> =
  Object.freeze({
    wood: defineMaterial({ color: MATERIAL_COLORS.wood, roughness: 0.72, metalness: 0 }),
    woodLight: defineMaterial({
      color: MATERIAL_COLORS.woodLight,
      roughness: 0.68,
      metalness: 0,
    }),
    woodDark: defineMaterial({
      color: MATERIAL_COLORS.woodDark,
      roughness: 0.74,
      metalness: 0,
    }),
    paintedWhite: defineMaterial({
      color: MATERIAL_COLORS.paintedWhite,
      roughness: 0.58,
      metalness: 0,
    }),
    mustardPaint: defineMaterial({
      color: MATERIAL_COLORS.mustardPaint,
      roughness: 0.58,
      metalness: 0,
    }),
    fabric: defineMaterial({
      color: MATERIAL_COLORS.fabric,
      roughness: 0.94,
      metalness: 0,
    }),
    fabricLight: defineMaterial({
      color: MATERIAL_COLORS.fabricLight,
      roughness: 0.92,
      metalness: 0,
    }),
    fabricDark: defineMaterial({
      color: MATERIAL_COLORS.fabricDark,
      roughness: 0.9,
      metalness: 0,
    }),
    metal: defineMaterial({
      color: MATERIAL_COLORS.metal,
      roughness: 0.36,
      metalness: 0.72,
    }),
    metalLight: defineMaterial({
      color: MATERIAL_COLORS.metalLight,
      roughness: 0.3,
      metalness: 0.76,
    }),
    glass: defineMaterial({
      color: MATERIAL_COLORS.glass,
      roughness: 0.12,
      metalness: 0,
      transparent: true,
      opacity: 0.42,
    }),
    screen: defineMaterial({
      color: MATERIAL_COLORS.screen,
      roughness: 0.13,
      metalness: 0.06,
      emissive: '#102B3B',
      emissiveIntensity: 0.32,
    }),
    screenFrame: defineMaterial({
      color: MATERIAL_COLORS.screenFrame,
      roughness: 0.24,
      metalness: 0.42,
    }),
    plantStem: defineMaterial({
      color: MATERIAL_COLORS.plantStem,
      roughness: 0.9,
      metalness: 0,
    }),
    plant: defineMaterial({
      color: MATERIAL_COLORS.plant,
      roughness: 0.86,
      metalness: 0,
    }),
    plantLight: defineMaterial({
      color: MATERIAL_COLORS.plantLight,
      roughness: 0.84,
      metalness: 0,
    }),
    soil: defineMaterial({ color: MATERIAL_COLORS.soil, roughness: 1, metalness: 0 }),
    mirror: defineMaterial({
      color: MATERIAL_COLORS.mirror,
      roughness: 0.06,
      metalness: 0.18,
      emissive: '#8EA6AA',
      emissiveIntensity: 0.14,
    }),
    light: defineMaterial({
      color: MATERIAL_COLORS.light,
      roughness: 0.2,
      metalness: 0,
      emissive: MATERIAL_COLORS.light,
      emissiveIntensity: 3.2,
    }),
    lampShade: defineMaterial({
      color: MATERIAL_COLORS.lampShade,
      roughness: 0.78,
      metalness: 0,
      transparent: true,
      opacity: 0.86,
      emissive: '#F3B861',
      emissiveIntensity: 0.72,
    }),
    ledDiffuser: defineMaterial({
      color: MATERIAL_COLORS.ledDiffuser,
      roughness: 0.62,
      metalness: 0,
      transparent: true,
      opacity: 0.84,
      emissive: '#FFD582',
      emissiveIntensity: 1.65,
    }),
    ceramic: defineMaterial({
      color: MATERIAL_COLORS.ceramic,
      roughness: 0.58,
      metalness: 0.02,
    }),
    terracotta: defineMaterial({
      color: MATERIAL_COLORS.terracotta,
      roughness: 0.78,
      metalness: 0,
    }),
    brass: defineMaterial({
      color: MATERIAL_COLORS.brass,
      roughness: 0.28,
      metalness: 0.82,
    }),
    tealFabric: defineMaterial({
      color: MATERIAL_COLORS.tealFabric,
      roughness: 0.9,
      metalness: 0,
    }),
    orangeFabric: defineMaterial({
      color: MATERIAL_COLORS.orangeFabric,
      roughness: 0.9,
      metalness: 0,
    }),
    orangeFabricDark: defineMaterial({
      color: MATERIAL_COLORS.orangeFabricDark,
      roughness: 0.94,
      metalness: 0,
    }),
    chrome: defineMaterial({
      color: MATERIAL_COLORS.chrome,
      roughness: 0.16,
      metalness: 0.92,
    }),
    redPlastic: defineMaterial({
      color: MATERIAL_COLORS.redPlastic,
      roughness: 0.3,
      metalness: 0.02,
    }),
    goldenYellowMetal: defineMaterial({
      color: MATERIAL_COLORS.goldenYellowMetal,
      roughness: 0.34,
      metalness: 0.48,
    }),
    gentianBlueMetal: defineMaterial({
      color: MATERIAL_COLORS.gentianBlueMetal,
      roughness: 0.34,
      metalness: 0.48,
    }),
    redVinyl: defineMaterial({
      color: MATERIAL_COLORS.redVinyl,
      roughness: 0.5,
      metalness: 0,
    }),
    blueVinyl: defineMaterial({
      color: MATERIAL_COLORS.blueVinyl,
      roughness: 0.5,
      metalness: 0,
    }),
    yellowVinyl: defineMaterial({
      color: MATERIAL_COLORS.yellowVinyl,
      roughness: 0.5,
      metalness: 0,
    }),
    transparentAmberPlastic: defineMaterial({
      color: MATERIAL_COLORS.transparentAmberPlastic,
      roughness: 0.15,
      metalness: 0,
      transparent: true,
      opacity: 0.58,
    }),
  });
