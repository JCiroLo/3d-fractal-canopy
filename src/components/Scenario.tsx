import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, SoftShadows } from "@react-three/drei";
import { Bloom, ChromaticAberration, ColorAverage, EffectComposer } from "@react-three/postprocessing";
import { useTheme } from "@mui/material";
import Fractal from "./Fractal";
import Light from "./Light";
import useSettings from "../hooks/useSettings";
import { Blendings } from "../utils/constants";

const Scenario = () => {
  const { values: controls } = useSettings();
  const theme = useTheme();

  return (
    <Canvas shadows eventPrefix="client" camera={{ position: [0, 0, 20] }}>
      <color attach="background" args={[theme.palette.background.default]} />

      <ambientLight position={[0, 10, 0]} intensity={0.1} />

      <OrbitControls enablePan={false} />
      <SoftShadows size={10} focus={0.5} samples={16} />

      <Light position={[20, 40, 20]} intensity={20} />

      <mesh receiveShadow position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[50]} />
        <meshStandardMaterial color={theme.palette.background.default} side={THREE.FrontSide} />
      </mesh>

      <Fractal />

      <EffectComposer>
        <ColorAverage blendFunction={Blendings.AdditiveBlending} />
        {controls.chromaticAberrationIsEnabled ? (
          <ChromaticAberration
            radialModulation={controls.chromaticAberrationRadialModulation}
            offset={new THREE.Vector2(controls.chromaticAberrationOffsetX, controls.chromaticAberrationOffsetY)}
            modulationOffset={controls.chromaticAberrationModulationOffset}
          />
        ) : (
          null!
        )}
        {controls.bloomIsEnabled ? (
          <Bloom
            intensity={controls.bloomIntensity}
            luminanceThreshold={controls.bloomLuminanceThreshold}
            luminanceSmoothing={controls.bloomLuminanceSmoothing}
          />
        ) : (
          null!
        )}
      </EffectComposer>
    </Canvas>
  );
};

export default Scenario;
