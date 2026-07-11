import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Link } from '@/components/ui/Link';

export function ContactSection({ settings }: { settings: any }) {
  if (!settings?.email && !settings?.linkedin) return null;

  return (
    <Section spacing="xl" aria-label="Contact">
      <Container variant="reading">
        <Stack gap="lg" className="bg-muted/50 p-8 md:p-12 rounded-xl text-center items-center">
          <h3 className="text-3xl font-bold">Let&apos;s Connect</h3>
          <p className="text-muted-foreground max-w-md">
            I&apos;m always open to discussing new opportunities, engineering challenges, or collaborative projects.
          </p>
          <Stack direction="row" gap="md" className="mt-4 flex-wrap justify-center">
            {settings?.email && (
              <Link href={`mailto:${settings.email}`} className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-bold">
                Send an Email
              </Link>
            )}
            {settings?.linkedin && (
              <Link href={settings.linkedin} isExternal className="px-6 py-3 border border-border rounded-md font-bold">
                Connect on LinkedIn
              </Link>
            )}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
