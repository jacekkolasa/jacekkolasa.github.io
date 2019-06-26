// @flow
import React, { createContext, useContext } from 'react';

export type Points = Array<{|
  value: number,
  measurementDate: Date,
|}>

type Settings = {|
  birthDate: ?Date,
  points: Points,
|}

type Context = [Settings, (Settings) => void]

const SettingsContext = createContext<?Context>();
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

const initialSettings: Settings = {
  birthDate: null,
  points: [{
    value: 5000,
    measurementDate: new Date(),
  }],
};

export const SettingsProvider = (props: {}) => {
  const [settings, setSettings] = React.useState<Settings>(initialSettings);
  const value = React.useMemo(() => [settings, setSettings], [settings]);
  return <SettingsContext.Provider value={value} {...props} />;
};
