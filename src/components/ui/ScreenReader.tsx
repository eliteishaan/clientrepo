'use client';

import { useEffect, useState } from 'react';


export function ScreenReaderAnnouncer({ message }: { message: string }) {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    setAnnouncement(message);
    const timeout = setTimeout(() => setAnnouncement(''), 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {announcement}
    </div>
  );
}
