import { createContext, useMemo, useState } from "react";
import { InitialSettings, type TSettingsKey, type TSettings } from "../utils/constants";

export type TSettingsValue<K extends TSettingsKey> = TSettings[K]["value"];
export type TSettingsType<K extends TSettingsKey> = TSettings[K]["type"];
export type TSettingsValues = { [key in TSettingsKey]: TSettingsValue<key> };
export type TSettingsTypes = { [key in TSettingsKey]: TSettingsType<key> };

type TSettingsProviderProps = { children: React.ReactNode };
type TSettingsContext = {
  values: TSettingsValues;
  isRealTime: boolean;
  get: <K extends TSettingsKey>(key: K) => TSettingsValue<K>;
  set: <K extends TSettingsKey>(key: K, value: TSettingsValue<K>) => void;
  reset: (key: TSettingsKey) => void;
};

export const SettingsContext = createContext<TSettingsContext>(null!);

export const SettingsProvider: React.FC<TSettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState(InitialSettings);

  const values = useMemo(
    () =>
      Object.keys(settings).reduce(
        (values, key) => ({ ...values, [key as TSettingsKey]: settings[key as TSettingsKey].value }),
        {} as TSettingsContext["values"]
      ),
    [settings]
  );

  const isRealTime = useMemo(
    () =>
      !(
        settings.angleRandomness.value ||
        settings.growthRandomness.value ||
        settings.thicknessRandomness.value ||
        settings.branchQuantityRandomness.value
      ),
    [
      settings.angleRandomness.value,
      settings.growthRandomness.value,
      settings.thicknessRandomness.value,
      settings.branchQuantityRandomness.value,
    ]
  );

  const get = <K extends TSettingsKey>(key: K) => settings[key].value;
  const set = <K extends TSettingsKey>(key: K, value: TSettingsValue<K>) =>
    setSettings((prev) => ({ ...prev, [key]: { ...prev[key], value } }));
  const reset = (key: TSettingsKey) => setSettings((prev) => ({ ...prev, [key]: { ...prev[key], value: InitialSettings[key].value } }));

  return <SettingsContext.Provider value={{ values, isRealTime, get, set, reset }}>{children}</SettingsContext.Provider>;
};
