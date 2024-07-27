import { useContext } from "react";
import { FractalContext } from "../providers/FractalProvider";

const useFractal = () => {
  return useContext(FractalContext);
};

export default useFractal;
