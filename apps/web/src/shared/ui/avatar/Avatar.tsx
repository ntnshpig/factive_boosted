import { Avatar as MuiAvatar } from '@mui/material';

import { getInitials } from './getInitials';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const pixels: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };
const fontSizes: Record<AvatarSize, string> = {
  xs: '0.625rem',
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem',
  xl: '1.25rem',
};

// Tints from the brand palette, picked by name so each person keeps their color.
const tints = ['#6442D6', '#16A34A', '#D97706', '#DC2626', '#0284C7', '#7C3AED'] as const;

function tintFor(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return tints[hash % tints.length];
}

export interface AvatarProps {
  /** Person or entity name. Used for alt text, initials and the fallback color. */
  name: string;
  src?: string;
  size?: AvatarSize;
  shape?: 'circle' | 'rounded';
}

export function Avatar({ name, src, size = 'md', shape = 'circle' }: AvatarProps) {
  return (
    <MuiAvatar
      src={src}
      alt={name}
      variant={shape === 'circle' ? 'circular' : 'rounded'}
      sx={{
        width: pixels[size],
        height: pixels[size],
        fontSize: fontSizes[size],
        fontWeight: 600,
        bgcolor: tintFor(name),
      }}
    >
      {getInitials(name)}
    </MuiAvatar>
  );
}
