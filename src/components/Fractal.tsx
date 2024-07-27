import { memo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useFractal from "../hooks/useFractal";
import useSettings from "../hooks/useSettings";

const Fractal = memo(() => {
  const treeRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Line>(null!);
  const rotation = useRef<number>(0);

  const fractal = useFractal();
  const controls = useSettings();

  useFrame(() => {
    if (!fractal?.points || !fractal?.geometries) return;

    if (controls.values.wireframe) {
      wireframeRef.current.rotation.y = rotation.current;
    } else {
      treeRef.current.rotation.y = rotation.current;
    }

    // rotation.current += controls.values.cameraSpeed;
  });

  if (!fractal?.points || !fractal?.geometries) return null;

  return (
    <group position={[0, -6, 0]}>
      {controls.values.wireframe ? (
        <threeLine castShadow ref={wireframeRef}>
          <bufferGeometry attach="geometry">
            <bufferAttribute attach={"attributes-position"} {...fractal.points} />
          </bufferGeometry>
          <lineBasicMaterial color={controls.values.color} />
        </threeLine>
      ) : (
        <mesh castShadow ref={treeRef} geometry={fractal.geometries}>
          <meshStandardMaterial color={controls.values.color} />
        </mesh>
      )}
    </group>
  );
});

export default Fractal;
