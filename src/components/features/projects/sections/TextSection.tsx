import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';

export function TextSection({ title, content }: { title: string, content?: string }) {
  if (!content) return null;

  return (
    <Section spacing="lg" aria-label={title}>
      <Container variant="reading">
        <Stack gap="md">
          <Heading variant="heading" level={2}>{title}</Heading>
          <Text variant="body" className="whitespace-pre-wrap">{content}</Text>
        </Stack>
      </Container>
    </Section>
  );
}
