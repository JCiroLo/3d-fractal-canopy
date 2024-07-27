import React from "react";
import * as THREE from "three";

type LightProps = {
  showSphere?: boolean;
  position: THREE.Vector3 | [number, number, number];
  intensity: number;
};

const Light: React.FC<LightProps> = ({ position, intensity, showSphere = false }) => {
  return (
    <group>
      <pointLight castShadow position={position} decay={0.1} intensity={intensity} shadow-mapSize={[2048, 2048]}></pointLight>
      {showSphere && (
        <mesh position={position}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="white" />
        </mesh>
      )}
    </group>
  );
};

export default Light;
