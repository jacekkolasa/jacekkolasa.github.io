import React, { createContext, useContext, ReactElement } from 'react';

export type Points = readonly {
  value: number;
  measurementDate: Date;
}[]

export interface Settings {
  birthDate: Date | null;
  points: Points;
}

type Context = [Settings, ((Settings: Settings) => void)] | null

const SettingsContext = createContext<Context>(null);

export const useSettings = (): Context => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

const initialSettings: Settings = {
  birthDate: null,
  points: [],
};

// eslint-disable-next-line arrow-parens
export const SettingsProvider = <P, >(props: P): ReactElement => {
  const [settings, setSettings] = React.useState<Settings>(initialSettings);
  const value = React.useMemo<Context>((): Context => [settings, setSettings], [settings]);
  return <SettingsContext.Provider value={value} {...props} />;
};
