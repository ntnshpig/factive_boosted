/** Size scale shared by all components. */
export type Size = 'sm' | 'md' | 'lg';

export const muiSize = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
} as const satisfies Record<Size, string>;

/** Semantic colors. `danger` maps to MUI `error`, `neutral` to MUI `default`/`inherit`. */
export type Tone = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export function muiColor<T extends Tone>(tone: T) {
  return (tone === 'danger' ? 'error' : tone) as T extends 'danger' ? 'error' : T;
}

export const iconSize = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export type IconSize = keyof typeof iconSize;
