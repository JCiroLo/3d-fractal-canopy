import { memo } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Stack, Typography } from "@mui/material";
import ColorPicker from "./ColorPicker";
import Field from "./Field";
import Range from "./Range";
import ChevronDownIcon from "./icons/ChevronDown";
import useSettings from "../hooks/useSettings";
import { InitialSettings, type TVector2, type TSettingsKey } from "../utils/constants";

type TInputBuilderProps = {
  keys: TSettingsKey[];
};

const InputBuilder: React.FC<TInputBuilderProps> = ({ keys }) => {
  const settings = useSettings();

  return keys.map((key) => {
    const type = InitialSettings[key].type;
    const label = InitialSettings[key].label;
    const value = settings.get(key);

    return type === "range" ? (
      <Field key={key} label={label} value={value}>
        <Range
          value={value as number}
          step={InitialSettings[key].step}
          min={InitialSettings[key].min}
          max={InitialSettings[key].max}
          onChange={(value) => settings.set(key, value)}
        />
      </Field>
    ) : type === "check" ? (
      <Field key={key} label={label} value={value}>
        <Checkbox checked={value as boolean} onChange={(_, value) => settings.set(key, value)} />
      </Field>
    ) : type === "color" ? (
      <Field key={key} label={label} value={value}>
        <ColorPicker value={value as string} onChange={(value) => settings.set(key, value)} />
      </Field>
    ) : type === "vector2" ? (
      <Field key={key} label={label} value={value}>
        <Stack flexGrow={1} alignItems="center">
          <Typography fontSize={12} sx={{ opacity: 0.5 }}>
            {InitialSettings[key].subLabel.x}
          </Typography>
          <Range
            value={(value as TVector2).x}
            step={InitialSettings[key].step.x}
            min={InitialSettings[key].min.x}
            max={InitialSettings[key].max.x}
            size="small"
            onChange={(newValue) => settings.set(key, { x: newValue, y: (value as TVector2).y })}
          />
        </Stack>
        <Stack flexGrow={1} alignItems="center">
          <Typography fontSize={12} sx={{ opacity: 0.5 }}>
            {InitialSettings[key].subLabel.y}
          </Typography>
          <Range
            value={(value as TVector2).y}
            step={InitialSettings[key].step.y}
            min={InitialSettings[key].min.y}
            max={InitialSettings[key].max.y}
            size="small"
            onChange={(newValue) => settings.set(key, { y: newValue, x: (value as TVector2).x })}
          />
        </Stack>
      </Field>
    ) : null;
  });
};

const FractalSettings: React.FC = memo(() => {
  return (
    <Stack
      position="fixed"
      direction="column"
      gap={1}
      sx={{ zIndex: 100, top: 16, right: 16, maxHeight: "calc(100vh - 32px)", overflowY: "auto", overflowX: "hidden", userSelect: "none" }}
    >
      <Accordion disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ChevronDownIcon />}>
          <Typography variant="h6">Fractal settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={1}>
            <InputBuilder keys={["wireframe"]} />
            <Typography p={1}>Tree</Typography>
            <InputBuilder
              keys={[
                "depth",
                "branchQuantity",
                "branchQuantityRandomness",
                "rootHeight",
                "angle",
                "angleFactor",
                "angleRandomness",
                "length",
                "growthFactor",
                "growthRandomness",
                "thickness",
                "thicknessFactor",
                "color",
                "cameraSpeed",
              ]}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ChevronDownIcon />}>
          <Typography variant="h6">Effects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={1}>
            <Typography p={1}>Bloom</Typography>
            <InputBuilder keys={["bloomIsEnabled", "bloomIntensity", "bloomLuminanceSmoothing", "bloomLuminanceThreshold"]} />

            <Typography p={1}>Chromatic Aberration</Typography>
            <InputBuilder
              keys={[
                "chromaticAberrationIsEnabled",
                "chromaticAberrationOffsetX",
                "chromaticAberrationOffsetY",
                "chromaticAberrationRadialModulation",
                "chromaticAberrationModulationOffset",
              ]}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
});

const Settings: React.FC = () => {
  // const settings = useSettings();

  return (
    <>
      <FractalSettings />
      {/* <Stack position="fixed" direction="column" gap={1} sx={{ zIndex: 100, bottom: 16, right: "50%", transform: "translateX(50%)" }}>
        <Grow in={!settings.isRealTime}>
          <Button size="large">Generate</Button>
        </Grow>
      </Stack> */}
    </>
  );
};

export default Settings;
