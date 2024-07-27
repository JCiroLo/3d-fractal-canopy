import { useContext } from "react";
import { SettingsContext } from "../providers/SettingsProvider";

function useSettings() {
  return useContext(SettingsContext);
}

export default useSettings;
