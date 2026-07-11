import { Container } from '@/components/ui/Container';
import { Stack } from '@/components/ui/Stack';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';

export function Footer({ settings }: { settings: any }) {
  return (
    <footer className="w-full bg-background mt-auto">
      <Divider />
      <Container>
        <Stack direction="col" gap="lg" className="py-12">
          <Stack direction="row" justify="between" align="start" className="flex-wrap gap-8">
            <Stack gap="sm">
              <span className="font-bold">{settings?.title || 'Portfolio'}</span>
              {settings?.email && (
                <Link href={`mailto:${settings.email}`} className="text-sm">
                  {settings.email}
                </Link>
              )}
            </Stack>

            <nav aria-label="Footer Navigation">
              <Stack direction="row" gap="md" className="flex-wrap">
                {settings?.footer?.map((nav: any) => (
                  <Link key={nav.label} href={nav.href} className="text-sm">
                    {nav.label}
                  </Link>
                ))}
              </Stack>
            </nav>
            
            <nav aria-label="Social Links">
               <Stack direction="row" gap="md">
                 {settings?.github && <Link href={settings.github} isExternal className="text-sm">GitHub</Link>}
                 {settings?.linkedin && <Link href={settings.linkedin} isExternal className="text-sm">LinkedIn</Link>}
               </Stack>
            </nav>
          </Stack>
        </Stack>
      </Container>
    </footer>
  );
}
