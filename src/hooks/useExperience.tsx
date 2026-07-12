'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type CADMode = 'Solid' | 'Wireframe' | 'Exploded' | 'SectionCut' | 'Measurement' | 'Annotation';
export type ThemeMode = 'dark' | 'light' | 'system';

interface ExperienceState {
  introPlayed: boolean;
  cadMode: CADMode;
  theme: ThemeMode;
  lastProjectSlug: string | null;
  setIntroPlayed: (val: boolean) => void;
  setCadMode: (mode: CADMode) => void;
  setTheme: (theme: ThemeMode) => void;
  setLastProjectSlug: (slug: string) => void;
}

const defaultState: ExperienceState = {
  introPlayed: false,
  cadMode: 'Solid',
  theme: 'system',
  lastProjectSlug: null,
  setIntroPlayed: () => {},
  setCadMode: () => {},
  setTheme: () => {},
  setLastProjectSlug: () => {},
};

const ExperienceContext = createContext<ExperienceState>(defaultState);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [introPlayed, setIntroPlayedState] = useState(false);
  const [cadMode, setCadModeState] = useState<CADMode>('Solid');
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [lastProjectSlug, setLastProjectSlugState] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('engineering_experience');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed.introPlayed === 'boolean') setIntroPlayedState(parsed.introPlayed);
        if (parsed.cadMode) setCadModeState(parsed.cadMode);
        if (parsed.theme) setThemeState(parsed.theme);
        if (parsed.lastProjectSlug) setLastProjectSlugState(parsed.lastProjectSlug);
      }
    } catch {
      console.warn('Failed to parse experience store');
    }
  }, []);

  const saveState = (newState: Partial<ExperienceState>) => {
    try {
      const current = localStorage.getItem('engineering_experience');
      const parsed = current ? JSON.parse(current) : {};
      localStorage.setItem('engineering_experience', JSON.stringify({ ...parsed, ...newState }));
    } catch {}
  };

  const setIntroPlayed = (val: boolean) => {
    setIntroPlayedState(val);
    saveState({ introPlayed: val });
  };

  const setCadMode = (val: CADMode) => {
    setCadModeState(val);
    saveState({ cadMode: val });
  };

  const setTheme = (val: ThemeMode) => {
    setThemeState(val);
    saveState({ theme: val });
  };

  const setLastProjectSlug = (val: string) => {
    setLastProjectSlugState(val);
    saveState({ lastProjectSlug: val });
  };

  return (
    <ExperienceContext.Provider value={{ introPlayed, cadMode, theme, lastProjectSlug, setIntroPlayed, setCadMode, setTheme, setLastProjectSlug }}>
      {children}
    </ExperienceContext.Provider>
  );
}

export const useExperience = () => useContext(ExperienceContext);
