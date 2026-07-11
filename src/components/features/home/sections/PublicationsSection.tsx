import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';

export function PublicationsSection({ publications }: { publications: any[] }) {
  if (!publications || publications.length === 0) return null;

  return (
    <Section spacing="lg" aria-label="Publications">
      <Container>
        <Stack gap="lg">
          <h3 className="text-2xl font-bold">Publications</h3>
          <Stack gap="md">
            {publications.map((pub: any) => (
              <div key={pub._id} className="border p-4">
                <h4 className="font-bold">{pub.title}</h4>
                <p className="text-sm text-muted-foreground">{pub.publisher} - {pub.date}</p>
              </div>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
