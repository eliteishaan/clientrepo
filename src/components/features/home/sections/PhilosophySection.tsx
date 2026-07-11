import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { PortableText } from '@portabletext/react';

export function PhilosophySection({ bio }: { bio: any }) {
  if (!bio) return null;

  return (
    <Section spacing="lg" aria-label="Engineering Philosophy">
      <Container variant="reading">
        <Stack gap="md">
          <h3 className="text-2xl font-bold">Engineering Philosophy</h3>
          <div className="prose prose-sm md:prose-base dark:prose-invert">
            <PortableText value={bio} />
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
