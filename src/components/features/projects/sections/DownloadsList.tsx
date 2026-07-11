import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';

export function DownloadsList({ downloads }: { downloads?: any[] }) {
  if (!downloads || downloads.length === 0) return null;

  return (
    <Section spacing="lg" aria-label="Downloads">
      <Container variant="reading">
        <Stack gap="lg">
          <Heading variant="heading" level={2}>Downloads</Heading>
          <Stack gap="sm">
            {downloads.map((dl: any, idx: number) => (
              <a key={idx} href={dl.url} target="_blank" rel="noreferrer" className="flex justify-between items-center p-component-md border border-border rounded-md bg-surface hover:bg-surface-inset transition-colors duration-fast ease-mechanical focus-ring">
                <Stack>
                  <Text variant="body" className="font-bold">{dl.title}</Text>
                  {dl.description && <Text variant="caption" color="secondary">{dl.description}</Text>}
                </Stack>
                <Text variant="label" className="underline font-bold text-accent">Download</Text>
              </a>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
