import * as THREE from "three";
import { type TSettingsValues } from "../providers/SettingsProvider";
import FractalUtils, { type TBranch } from "../utils/fractal";

type TEvent = MessageEvent<{ controls: TSettingsValues }>;

self.onmessage = (event: TEvent) => {
  const controls = event.data.controls;
  const root = { from: new THREE.Vector3(0, 0, 0), to: new THREE.Vector3(0, controls.rootHeight, 0) };
  const branches = FractalUtils.generateTree(root, { ...controls, rotationFactor: 0 });

  const points = new THREE.BufferAttribute(
    new Float32Array(
      branches.reduce(
        (points: number[], branch: TBranch) => [
          ...points,
          branch.from.x,
          branch.from.y,
          branch.from.z,
          branch.to.x,
          branch.to.y,
          branch.to.z,
          branch.from.x,
          branch.from.y,
          branch.from.z,
        ],
        []
      )
    ),
    3
  );

  self.postMessage({ branches, controls, points });
};

export {};
