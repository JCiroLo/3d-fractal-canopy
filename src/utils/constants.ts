import * as THREE from "three";

type TType = "number" | "check" | "range" | "color" | "vector2";
type TBaseSetting<T> = {
  label: string;
  type: TType;
  value: T;
};
type TCheckSetting = TBaseSetting<boolean> & {
  type: "check";
};
type TRangeSetting = TBaseSetting<number> & {
  type: "range";
  min: number;
  max: number;
  step: number;
};
type TColorSetting = TBaseSetting<string> & {
  type: "color";
};
type TVector2Setting = TBaseSetting<TVector2> & {
  type: "vector2";
  subLabel: TVector2<string>;
  min: TVector2;
  max: TVector2;
  step: TVector2;
};

export type TSettings = {
  wireframe: TCheckSetting;
  isLoading: TCheckSetting;
  depth: TRangeSetting;
  branchQuantity: TRangeSetting;
  branchQuantityRandomness: TCheckSetting;
  rootHeight: TRangeSetting;
  angle: TRangeSetting;
  angleFactor: TRangeSetting;
  angleRandomness: TCheckSetting;
  length: TRangeSetting;
  growthFactor: TRangeSetting;
  growthRandomness: TCheckSetting;
  color: TColorSetting;
  thickness: TVector2Setting;
  thicknessFactor: TRangeSetting;
  thicknessRandomness: TCheckSetting;
  cameraSpeed: TRangeSetting;
  bloomIsEnabled: TCheckSetting;
  bloomIntensity: TRangeSetting;
  bloomLuminanceThreshold: TRangeSetting;
  bloomLuminanceSmoothing: TRangeSetting;
  chromaticAberrationIsEnabled: TCheckSetting;
  chromaticAberrationOffsetX: TRangeSetting;
  chromaticAberrationOffsetY: TRangeSetting;
  chromaticAberrationModulationOffset: TRangeSetting;
  chromaticAberrationRadialModulation: TCheckSetting;
};
export type TSettingsKey = keyof TSettings;
export type TVector2<T = number> = { x: T; y: T };

export const InitialSettings: TSettings = {
  // TREE
  wireframe: {
    label: "Wireframe",
    type: "check",
    value: false,
  },
  isLoading: {
    label: "Wireframe",
    type: "check",
    value: false,
  },
  depth: {
    label: "Depth",
    type: "range",
    value: 6,
    min: 0,
    max: 8,
    step: 1,
  },
  branchQuantity: {
    label: "Branches",
    type: "range",
    value: 3,
    min: 0,
    max: 10,
    step: 1,
  },
  branchQuantityRandomness: {
    label: "Branch Randomness",
    type: "check",
    value: false,
  },
  rootHeight: {
    label: "Root height",
    type: "range",
    value: 5,
    min: 0,
    max: 15,
    step: 1,
  },
  angle: {
    label: "Branch Angle",
    type: "range",
    value: 30,
    min: 0,
    max: 360,
    step: 1,
  },
  angleFactor: {
    label: "Angle Factor",
    type: "range",
    value: 1,
    min: 0,
    max: 2,
    step: 0.1,
  },
  angleRandomness: {
    label: "Angle Randomness",
    type: "check",
    value: false,
  },
  length: {
    label: "Branch Length",
    type: "range",
    value: 2,
    min: 0,
    max: 50,
    step: 1,
  },
  growthFactor: {
    label: "Growth Factor",
    type: "range",
    value: 1,
    min: 0,
    max: 2,
    step: 0.1,
  },
  growthRandomness: {
    label: "Growth Randomness",
    type: "check",
    value: false,
  },
  color: {
    label: "Color",
    type: "color",
    value: "#997722",
  },
  thickness: {
    label: "Thickness",
    type: "vector2",
    value: { x: 5, y: 10 },
    subLabel: { x: "Top", y: "Bottom" },
    min: { x: 0, y: 0 },
    max: { x: 20, y: 20 },
    step: { x: 1, y: 1 },
  },
  thicknessFactor: {
    label: "Thickness Factor",
    type: "range",
    value: 1.9,
    min: 0.7,
    max: 2,
    step: 0.1,
  },
  thicknessRandomness: {
    label: "Thickness Randomness",
    type: "check",
    value: false,
  },
  // CAMERA
  cameraSpeed: {
    label: "Camera Speed",
    type: "range",
    value: 0.01,
    min: 0,
    max: 0.5,
    step: 0.01,
  },
  // EFFECTS
  bloomIsEnabled: {
    label: "Enabled",
    type: "check",
    value: true,
  },
  bloomIntensity: {
    label: "Intensity",
    type: "range",
    value: 1,
    min: 0,
    max: 10,
    step: 0.1,
  },
  bloomLuminanceThreshold: {
    label: "Luminance Threshold",
    type: "range",
    value: 0,
    min: 0,
    max: 1,
    step: 0.01,
  },
  bloomLuminanceSmoothing: {
    label: "Luminance Smoothing",
    type: "range",
    value: 0.2,
    min: 0,
    max: 1,
    step: 0.01,
  },
  chromaticAberrationIsEnabled: {
    label: "Enabled",
    type: "check",
    value: false,
  },
  chromaticAberrationOffsetX: {
    label: "Offset X",
    type: "range",
    value: 0.005,
    min: -2,
    max: 2,
    step: 0.0001,
  },
  chromaticAberrationOffsetY: {
    label: "Offset Y",
    type: "range",
    value: 0.005,
    min: -2,
    max: 2,
    step: 0.0001,
  },
  chromaticAberrationModulationOffset: {
    label: "Modulation Offset",
    type: "range",
    value: 0.01,
    min: 0,
    max: 1,
    step: 0.01,
  },
  chromaticAberrationRadialModulation: {
    label: "Radial Modulation",
    type: "check",
    value: true,
  },
};

export const Blendings = {
  NoBlending: THREE.NoBlending,
  NormalBlending: THREE.NormalBlending,
  AdditiveBlending: THREE.AdditiveBlending,
  SubtractiveBlending: THREE.SubtractiveBlending,
  MultiplyBlending: THREE.MultiplyBlending,
  CustomBlending: THREE.CustomBlending,
};
