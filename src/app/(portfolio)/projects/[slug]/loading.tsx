import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';

export default function Loading() {
  return (
    <Section spacing="xl" aria-label="Loading project">
      <Container>
        <Stack gap="lg">
          <div className="h-12 w-2/3 bg-muted animate-pulse rounded-md" />
          <div className="h-6 w-1/3 bg-muted animate-pulse rounded-md" />
          
          <div className="flex gap-4 mt-8">
            <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
            <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
            <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
          </div>
          
          <div className="h-96 w-full bg-muted animate-pulse rounded-md mt-12" />
        </Stack>
      </Container>
    </Section>
  );
}
