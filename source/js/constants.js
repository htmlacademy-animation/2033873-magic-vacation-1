export const GAME_TIME_LIMIT = 5 * 60 * 1000;

export const SVG_ELEMENTS = {
  flamingo: "flamingo",
  flower: "flower",
  keyhole: "keyhole",
  leaf: "leaf",
  question: "question",
  snowflake: "snowflake",
};

export const OBJECT_ELEMENTS = {
  airplane: "airplane",
  suitcase: "suitcase",
  watermelon: "watermelon",

  // rooms common
  wallCorner: 'wallCorner',
  floor: 'floor',

  // room-1
  staticOutput1: 'staticOutput1',

  // room-2
  staticOutput2: 'staticOutput2',

  // room-3
  staticOutput3: 'staticOutput3',

  // room-4
  staticOutput4: 'staticOutput4',

  dog: 'dog',
  compass: 'compass',
  sonya: 'sonya',
};

export const MATERIAL_TYPE = {
  SoftMaterial: "SoftMaterial",
  BasicMaterial: "BasicMaterial",
  StrongMaterial: "StrongMaterial",
  CustomRoadMaterial: "CustomRoadMaterial",
  CustomCarpetMaterial: "CustomCarpetMaterial",
};

export const EXTRUDE_SETTINGS = {
  steps: 2,
  depth: 8,
  bevelEnabled: true,
  bevelThickness: 2,
  bevelSize: 1,
  bevelOffset: 0,
  bevelSegments: 10,
};

export const MESH_NAMES = {
  Saturn: 'Saturn',
  SaturnRing: 'SaturnRing'
}

export const BACKGROUND_AXIS_POSITION_Z = 3270;

export const isDesktop = window.innerWidth > 768
