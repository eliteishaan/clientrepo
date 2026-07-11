import { Container } from '@/components/ui/Container';
import { Stack } from '@/components/ui/Stack';
import { Link } from '@/components/ui/Link';

export function Navigation({ settings }: { settings: any }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <Container>
        <Stack direction="row" align="center" justify="between" className="h-16">
          <Link href="/" className="font-bold">
            {settings?.title || 'Portfolio'}
          </Link>

          <nav aria-label="Main Navigation">
            <Stack direction="row" gap="md" as="ul">
              {settings?.navigation?.map((nav: any) => (
                <li key={nav.label}>
                  <Link href={nav.href} className="text-sm font-medium">
                    {nav.label}
                  </Link>
                </li>
              ))}
              {settings?.resumeReference?.url && (
                <li>
                  <Link href={settings.resumeReference.url} isExternal className="text-sm font-medium">
                    Resume
                  </Link>
                </li>
              )}
            </Stack>
          </nav>
        </Stack>
      </Container>
    </header>
  );
}
