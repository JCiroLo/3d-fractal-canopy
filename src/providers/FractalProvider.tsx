import { createContext, useRef, useState } from "react";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import useDebouncedEffect from "../hooks/useDebouncedEffect";
import useSettings from "../hooks/useSettings";
import FractalUtils, { type TBranch } from "../utils/fractal";
import { type TSettingsValues } from "./SettingsProvider";

type TFractalContext = {
  points: THREE.BufferAttribute;
  geometries: THREE.BufferGeometry;
};
type TFractalProviderProps = {
  children: React.ReactNode;
};
type TWorkerEvent = MessageEvent<{
  branches: TBranch[];
  controls: TSettingsValues;
  points: THREE.BufferAttribute;
}>;

export const FractalContext = createContext<TFractalContext>(null!);

export const FractalProvider: React.FC<TFractalProviderProps> = ({ children }) => {
  const [points, setPoints] = useState<THREE.BufferAttribute>(null!);
  const [geometries, setGeometries] = useState<THREE.BufferGeometry>(null!);
  const fractalWorker = useRef<Worker>(null!);

  const settings = useSettings();

  useDebouncedEffect(
    () => {
      if (window.Worker) {
        settings.set("isLoading", true);

        if (fractalWorker.current) {
          fractalWorker.current.terminate();
        }

        /** This replacement is intentional, if the user requests a new calculation while another is in process,
         * we simply close the previous one to stop the current calculation and start a new one, preventing
         * multiple calculations being done at the same time unnecessarily.
         **/
        fractalWorker.current = new Worker(new URL("../workers/fractal.ts", import.meta.url), { type: "module" });

        fractalWorker.current.onmessage = (event: TWorkerEvent) => {
          const branches = event.data.branches;
          const controls = event.data.controls;
          const bufferGeometries: THREE.BufferGeometry[] = [];

          branches.forEach((branch) => {
            const geometry = FractalUtils.createCylinderGeometry(branch, controls);
            bufferGeometries.push(geometry);
          });

          const geometries = BufferGeometryUtils.mergeGeometries(bufferGeometries);

          setPoints(event.data.points);
          setGeometries(geometries);
          settings.set("isLoading", false);
        };

        fractalWorker.current.postMessage({ controls: settings.values });
      }

      return () => {
        fractalWorker.current?.terminate();
      };
    },
    [
      settings.values.depth,
      settings.values.branchQuantity,
      settings.values.branchQuantityRandomness,
      settings.values.rootHeight,
      settings.values.angle,
      settings.values.angleFactor,
      settings.values.angleRandomness,
      settings.values.length,
      settings.values.growthFactor,
      settings.values.growthRandomness,
      settings.values.thickness,
      settings.values.thicknessFactor,
      settings.values.thicknessRandomness,
    ],
    0
  );

  return <FractalContext.Provider value={{ points: points, geometries: geometries }}>{children}</FractalContext.Provider>;
};
