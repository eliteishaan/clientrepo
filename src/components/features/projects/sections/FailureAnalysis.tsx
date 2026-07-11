'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';

export function FailureAnalysis({ failure, solution }: { failure: string, solution: string }) {
  const [view, setView] = useState<'failure' | 'solution'>('failure');

  return (
    <div className="border border-border rounded-md overflow-hidden bg-background">
      <div className="flex border-b border-border bg-surface-inset">
        <button 
          onClick={() => setView('failure')}
          className={clsx(
            "flex-1 py-component-sm px-component-md text-center transition-colors focus-ring font-mono text-[length:var(--font-size-label)] font-bold uppercase",
            view === 'failure' ? "bg-error text-white" : "text-text-secondary hover:text-foreground hover:bg-surface"
          )}
        >
          Failure State
        </button>
        <div className="w-[1px] bg-border shrink-0" />
        <button 
          onClick={() => setView('solution')}
          className={clsx(
            "flex-1 py-component-sm px-component-md text-center transition-colors focus-ring font-mono text-[length:var(--font-size-label)] font-bold uppercase",
            view === 'solution' ? "bg-success text-white" : "text-text-secondary hover:text-foreground hover:bg-surface"
          )}
        >
          Engineered Solution
        </button>
      </div>
      <div className="p-section-sm">
        {view === 'failure' ? (
          <Stack gap="md" className="animate-in fade-in slide-in-from-bottom-2 duration-fast">
            <div className="flex items-center gap-2 text-error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              <Text variant="label" className="text-error">Critical Failure</Text>
            </div>
            <Text variant="body" className="whitespace-pre-wrap">{failure}</Text>
          </Stack>
        ) : (
          <Stack gap="md" className="animate-in fade-in slide-in-from-bottom-2 duration-fast">
            <div className="flex items-center gap-2 text-success">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <Text variant="label" className="text-success">Resolution</Text>
            </div>
            <Text variant="body" className="whitespace-pre-wrap">{solution}</Text>
          </Stack>
        )}
      </div>
    </div>
  );
}
