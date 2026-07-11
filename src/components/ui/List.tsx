import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function List({ className, ordered, children, ...props }: React.HTMLAttributes<HTMLUListElement> & { ordered?: boolean }) {
  const Component = ordered ? 'ol' : 'ul';
  return (
    <Component
      className={cn(
        ordered ? 'list-decimal' : 'list-disc',
        'pl-[var(--spacing-component-lg)] space-y-[var(--spacing-component-sm)]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function ListItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={cn('text-[length:var(--text-body)] text-[var(--color-text-primary)]', className)}
      {...props}
    />
  );
}
