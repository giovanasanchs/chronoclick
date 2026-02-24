/**
 * Theme configuration constants.
 * CSS variables are defined in global.css — this file provides
 * TypeScript-level references for programmatic usage.
 */

export const accentColors = {
  coral: '--accent-coral',
  cyan: '--accent-cyan',
  purple: '--accent-purple',
} as const;

export const themeModes = ['dark', 'light'] as const;
