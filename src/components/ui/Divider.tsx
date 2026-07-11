import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
};

export function Divider({ className, orientation = 'horizontal' }: Props) {
  return (
    <div
      role="separator"
      className={cn(
        'bg-[var(--color-border)] shrink-0',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
    />
  );
}
