import { cn } from '@/lib/utils';

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType;
}

export function VisuallyHidden({ as: Component = 'span', className, children, ...props }: VisuallyHiddenProps) {
  const Comp = Component as any;
  return (
    <Comp className={cn('sr-only', className)} {...props}>
      {children}
    </Comp>
  );
}
