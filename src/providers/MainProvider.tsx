import { FC } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { generateTheme } from "../theme";
import { SettingsProvider } from "./SettingsProvider";
import { FractalProvider } from "./FractalProvider";

type MainProviderProps = {
  children: React.ReactNode;
};

const MainProvider: FC<MainProviderProps> = ({ children }) => {
  return (
    <SettingsProvider>
      <FractalProvider>
        <ThemeProvider theme={generateTheme("dark")}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </FractalProvider>
    </SettingsProvider>
  );
};

export default MainProvider;
