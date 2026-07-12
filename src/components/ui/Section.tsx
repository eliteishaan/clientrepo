import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  children: React.ReactNode;
  className?: string;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  as?: React.ElementType;
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

export function Section({ children, className, spacing = 'md', as: Component = 'section', ...props }: Props) {
  const Comp = Component as any;
  return (
    <Comp
      className={cn(
        'w-full',
        {
          'py-0': spacing === 'none',
          'py-[var(--spacing-section-sm)]': spacing === 'sm',
          'py-[var(--spacing-section-md)]': spacing === 'md',
          'py-[var(--spacing-section-lg)]': spacing === 'lg',
          'py-[var(--spacing-section-xl)]': spacing === 'xl',
        },
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
