import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'display' | 'heading' | 'title';
};

export function Heading({ children, className, level = 2, variant = 'heading' }: Props) {
  const Component = `h${level}` as any;
  
  return (
    <Component
      className={cn(
        'font-bold tracking-tight text-[var(--color-foreground)] font-[family-name:var(--font-sans)]',
        {
          'text-[length:var(--text-display)] leading-[1.1]': variant === 'display',
          'text-[length:var(--text-heading)] leading-[1.2]': variant === 'heading',
          'text-[length:var(--text-title)] leading-[1.3]': variant === 'title',
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
