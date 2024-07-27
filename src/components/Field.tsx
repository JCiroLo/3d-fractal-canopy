import React from "react";
import Stack from "@mui/material/Stack";
import { InputLabel, Tooltip, Typography } from "@mui/material";

import { type TVector2 } from "../utils/constants";

type FieldProps = {
  label: string;
  value: string | number | boolean | TVector2;
  children: React.ReactNode;
};

const formatValueLabel = (value: FieldProps["value"]) => {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "boolean") {
    return value ? "On" : "Off";
  } else if (typeof value === "string") {
    return value;
  } else if (typeof value === "object") {
    return `(${value.x}, ${value.y})`;
  }
};

const Field: React.FC<FieldProps> = ({ label, value, children }) => {
  return (
    <Stack
      position="relative"
      direction="row"
      alignItems="center"
      gap={2}
      width="100%"
      bgcolor="secondary.main"
      sx={{ borderRadius: 1, p: 1 }}
    >
      <Tooltip arrow title={label} placement="left">
        <Stack>
          <InputLabel sx={{ width: 120 }}>{label}</InputLabel>
          <Typography fontSize={12} sx={{ opacity: 0.5 }}>
            {formatValueLabel(value)}
          </Typography>
        </Stack>
      </Tooltip>
      {children}
    </Stack>
  );
};

export default Field;
