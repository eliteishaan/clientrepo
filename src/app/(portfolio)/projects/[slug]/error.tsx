'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Button } from '@/components/ui/Button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section spacing="xl" aria-label="Error loading project">
      <Container>
        <Stack gap="lg" className="items-center text-center">
          <h2 className="text-3xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground">We encountered an error while loading this engineering case study.</p>
          <Button onClick={() => reset()} className="px-4 py-2 border rounded-md">
            Try again
          </Button>
        </Stack>
      </Container>
    </Section>
  );
}
