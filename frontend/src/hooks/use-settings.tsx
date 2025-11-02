import { useState, useEffect } from 'react';
import type { AppSettings } from '@/types/Settings';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app-settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => setSettings(DEFAULT_SETTINGS);

  return { settings, updateSettings: updateSetting, resetSettings };
}
