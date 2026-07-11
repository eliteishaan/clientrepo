import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { PortableText } from '@portabletext/react';
import { MediaGallery } from './MediaGallery';

export function EngineeringStage({ label, stage }: { label: string, stage: any }) {
  if (!stage || (!stage.content && (!stage.media || stage.media.length === 0))) return null;

  return (
    <Section spacing="lg" aria-label={stage.title || label}>
      <Container variant="reading">
        <Stack gap="lg">
          <Heading variant="heading" level={2}>{stage.title || label}</Heading>
          {stage.content && (
            <div className="prose prose-semantic max-w-none">
              <PortableText value={stage.content} />
            </div>
          )}
        </Stack>
      </Container>
      {stage.media && stage.media.length > 0 && (
        <MediaGallery media={stage.media} layout="stacked" />
      )}
    </Section>
  );
}
