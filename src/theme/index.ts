import { Shadows, createTheme } from "@mui/material";
import dark from "./dark";
import light from "./light";

type modes = "light" | "dark";

const shadows = Array.from({ length: 24 }, (_, i) => `0px 4px ${i}px 0px #45549229`);

export const generateTheme = (mode: modes) =>
  createTheme({
    palette: mode === "light" ? light : dark,
    typography: {
      button: {
        textTransform: "initial",
        // fontWeight: "bold",
      },
      h2: {
        fontSize: "3rem",
      },
    },
    shadows: ["none", ...shadows] as Shadows,
    shape: { borderRadius: 4 },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1400,
        // xxl: 1600,
      },
    },
    // debouncing: {
    //   delay: 500,
    // },
    components: {
      MuiDialog: {
        defaultProps: {
          sx: {
            "& .MuiModal-backdrop": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(2.5px)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(8px) saturate(1.2)",
          },
        },
      },
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
        },
      },
      MuiListItemIcon: {
        defaultProps: {
          sx: {
            minWidth: 32,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            "&:before": {
              display: "none",
            },
          },
        },
      },
      MuiAccordionDetails: {
        defaultProps: {
          sx: {
            p: 1,
          },
        },
      },
    },
  });
