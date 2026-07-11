'use client';

import { ExperienceProvider } from '@/hooks/useExperience';

export function Providers({ children }: { children: React.ReactNode }) {
  // Shell for global context providers (e.g., ThemeProvider)
  return (
    <ExperienceProvider>
      {children}
    </ExperienceProvider>
  );
}
