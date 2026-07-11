'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h2 className="text-2xl font-bold mb-4 font-mono">500: System Failure</h2>
      <p className="mb-8 opacity-70">Diagnostics logged. A critical error occurred.</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 border font-mono text-sm hover:bg-white hover:text-black transition-colors"
      >
        [ Retry Initialization ]
      </button>
    </div>
  );
}
