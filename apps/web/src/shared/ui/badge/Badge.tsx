import { Badge as MuiBadge } from '@mui/material';
import type { ReactNode } from 'react';

import { muiColor, type Tone } from '@/shared/ui/theme';

export type BadgeColor = Exclude<Tone, 'neutral'>;

export interface BadgeProps {
  children: ReactNode;
  /** Number to show. Ignored when `dot` is set. */
  count?: number;
  /** Counts above `max` show as `max+`. */
  max?: number;
  /** Show a dot instead of a number. */
  dot?: boolean;
  /** Show the badge when `count` is 0. */
  showZero?: boolean;
  color?: BadgeColor;
  /** Describes the badge for screen readers, e.g. "3 unread". */
  label?: string;
}

export function Badge({
  children,
  count,
  max = 99,
  dot = false,
  showZero = false,
  color = 'danger',
  label,
}: BadgeProps) {
  const invisible = dot ? false : count === undefined || (count === 0 && !showZero);

  return (
    <MuiBadge
      badgeContent={dot ? undefined : count}
      max={max}
      variant={dot ? 'dot' : 'standard'}
      showZero={showZero}
      invisible={invisible}
      color={muiColor(color)}
      aria-label={label}
      slotProps={{ badge: { 'aria-hidden': label ? true : undefined } }}
    >
      {children}
    </MuiBadge>
  );
}
