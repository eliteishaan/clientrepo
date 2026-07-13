import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: 'reading' | 'editorial' | 'media' | 'hero' | 'full' | 'wide' | 'standard'; // Keep wide and standard for backward compatibility temporarily
};

export function Container({ children, className, variant = 'editorial' }: Props) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-[var(--spacing-component-lg)] md:px-[var(--spacing-section-sm)]',
        {
          'max-w-[var(--width-container-reading)]': variant === 'reading',
          'max-w-[var(--width-container-editorial)]': variant === 'editorial' || variant === 'standard',
          'max-w-[var(--width-container-media)]': variant === 'media',
          'max-w-[var(--width-container-hero)]': variant === 'hero' || variant === 'wide',
          'max-w-none px-0': variant === 'full',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
