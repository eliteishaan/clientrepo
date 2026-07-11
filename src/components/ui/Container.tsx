import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: 'standard' | 'reading' | 'wide' | 'full';
};

export function Container({ children, className, variant = 'standard' }: Props) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-[var(--spacing-component-lg)] md:px-[var(--spacing-section-sm)]',
        {
          'max-w-[var(--content-max-width)]': variant === 'standard',
          'max-w-[var(--reading-max-width)]': variant === 'reading',
          'max-w-[var(--project-max-width)]': variant === 'wide',
          'max-w-none px-0': variant === 'full',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
