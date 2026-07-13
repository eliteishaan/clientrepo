import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface LinkProps extends NextLinkProps {
  className?: string;
  children: React.ReactNode;
  isExternal?: boolean;
  variant?: 'nav' | 'inline' | 'button';
}

export function Link({ className, children, isExternal, variant = 'inline', href, ...props }: LinkProps) {
  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  
  return (
    <NextLink
      href={href}
      className={cn(
        'focus-ring transition-colors duration-300 cursor-pointer',
        {
          'text-accent hover:text-accent-highlight underline underline-offset-4 decoration-accent/40 hover:decoration-accent': variant === 'inline',
          'text-text-secondary hover:text-text-primary font-mono tracking-widest uppercase text-mono-label': variant === 'nav',
          'group relative inline-flex items-center justify-center font-mono tracking-widest uppercase transition-all duration-300 ease-out focus-ring cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] bg-transparent border border-border-subtle text-text-primary rounded-none overflow-hidden hover:border-accent hover:text-accent-highlight px-6 py-2.5 text-mono-label': variant === 'button',
        },
        className
      )}
      {...externalProps}
      {...props}
    >
      {variant === 'button' ? (
        <>
          <span className="relative z-10">{children}</span>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
        </>
      ) : (
        children
      )}
    </NextLink>
  );
}
