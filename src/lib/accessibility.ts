// Standardized focus ring utility to ensure global consistency
export const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background';

// Keyboard navigation helpers
export const keyboard = {
  isEnter: (e: React.KeyboardEvent) => e.key === 'Enter',
  isEscape: (e: React.KeyboardEvent) => e.key === 'Escape',
  isSpace: (e: React.KeyboardEvent) => e.key === ' ',
  isArrowDown: (e: React.KeyboardEvent) => e.key === 'ArrowDown',
  isArrowUp: (e: React.KeyboardEvent) => e.key === 'ArrowUp',
};
