'use client';

import { ExperienceProvider } from '@/hooks/useExperience';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { CustomCursor } from '../ui/CustomCursor';

export function Providers({ children }: { children: React.ReactNode }) {
  // Shell for global context providers (e.g., ThemeProvider)
  return (
    <ExperienceProvider>
      <SmoothScrollProvider>
        <CustomCursor />
        {children}
      </SmoothScrollProvider>
    </ExperienceProvider>
  );
}


