import * as THREE from "three";
import { extend, Object3DNode } from "@react-three/fiber";
import Scenario from "./components/Scenario";
import Settings from "./components/Settings";
import Credits from "./components/Credits";
import Loader from "./components/Loader";

extend({ ThreeLine: THREE.Line });

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeLine: Object3DNode<THREE.Line, typeof THREE.Line>;
  }
}

function App() {
  return (
    <>
      <Settings />
      <Scenario />
      <Credits />
      <Loader />
    </>
  );
}

export default App;
