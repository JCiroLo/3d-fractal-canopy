import { Box, Slide, Stack, SxProps, Typography } from "@mui/material";
import useSettings from "../hooks/useSettings";

const innerLoaderAnimation: SxProps = {
  animation: "innerPulse 1s ease infinite",
  "@keyframes innerPulse": {
    "0%": { bgcolor: "background.default", transform: "scale(0.5)" },
    "50%": { bgcolor: "primary.main", transform: "scale(1)" },
    "100%": { bgcolor: "background.default", transform: "scale(0.5)" },
  },
};

const outerLoaderAnimation: SxProps = {
  animation: "outerPulse 1s ease infinite",
  "@keyframes outerPulse": {
    "0%": { opacity: 1, transform: "scale(0)" },
    "50%": { opacity: 0.5, transform: "scale(1)" },
    "100%": { opacity: 1, transform: "scale(0)" },
  },
};

const Loader: React.FC = () => {
  const settings = useSettings();
  const size = 32;

  return (
    <Slide in={settings.values.isLoading}>
      <Stack position="fixed" top={16} left={16} flexDirection="row" alignItems="center" gap={2}>
        <Stack position="relative" width={size} height={size}>
          <Box position="absolute" width={size} height={size} borderRadius="50%" sx={innerLoaderAnimation} />
          <Box position="absolute" width={size} height={size} bgcolor="background.default" borderRadius="50%" sx={outerLoaderAnimation} />
        </Stack>
        <Typography>Generating</Typography>
      </Stack>
    </Slide>
  );
};

export default Loader;
