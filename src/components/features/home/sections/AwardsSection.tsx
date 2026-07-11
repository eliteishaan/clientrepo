import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';

export function AwardsSection({ awards }: { awards: any[] }) {
  if (!awards || awards.length === 0) return null;

  return (
    <Section spacing="lg" aria-label="Awards">
      <Container>
        <Stack gap="lg">
          <h3 className="text-2xl font-bold">Awards & Honors</h3>
          <Stack gap="md">
            {awards.map((award: any) => (
              <div key={award._id} className="border p-4">
                <h4 className="font-bold">{award.title}</h4>
                <p className="text-sm text-muted-foreground">{award.issuer} - {award.date}</p>
              </div>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
