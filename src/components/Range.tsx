import { debounce, Slider, type SliderProps } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";

export type TRangeProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  size?: SliderProps["size"];
  onChange: (value: number) => void;
};

const Range: React.FC<TRangeProps> = ({ value, min, max, step, size = "medium", onChange }) => {
  const [currentValue, setCurrentValue] = useState(value);

  const shouldShowMarks = useMemo(() => (max - min) / step < 30, [max, min, step]);

  const debouncedOnChange = useCallback(debounce(onChange, 200), []);

  const handleChange = (value: number) => {
    setCurrentValue(value);
    debouncedOnChange(value);
  };

  return (
    <Slider
      value={currentValue}
      marks={shouldShowMarks}
      step={step}
      min={min}
      max={max}
      size={size}
      valueLabelDisplay="auto"
      onChange={(_: Event, value: number) => handleChange(value)}
    />
  );
};

export default Range;
