import { MuiColorInput } from "mui-color-input";

export type TColorPickerProps = {
  value: string;
  onChange: (value: string) => void;
};

const ColorPicker: React.FC<TColorPickerProps> = ({ value, onChange }) => {
  return <MuiColorInput fullWidth variant="outlined" size="small" value={value} onChange={(_, colors) => onChange(colors.hex)} />;
};

export default ColorPicker;
