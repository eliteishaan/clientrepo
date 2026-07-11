import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';

export function Breadcrumbs({ title }: { title: string }) {
  return (
    <div className="border-b border-border bg-surface">
      <Container variant="wide">
        <Stack direction="row" align="center" gap="sm" className="h-10">
          <Link href="/" variant="nav" className="text-caption">Home</Link>
          <Text variant="caption" color="secondary">/</Text>
          <Text variant="caption" className="font-medium truncate">{title}</Text>
        </Stack>
      </Container>
    </div>
  );
}
