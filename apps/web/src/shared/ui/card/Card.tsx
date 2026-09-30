import { Box, CardActionArea, Card as MuiCard } from '@mui/material';
import type { ReactNode } from 'react';

export type CardVariant = 'outlined' | 'elevated' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const paddings: Record<CardPadding, number> = { none: 0, sm: 1.5, md: 2, lg: 3 };

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  /** Makes the whole card a button. */
  onClick?: () => void;
  /** Highlights the card, e.g. in a selectable grid. */
  selected?: boolean;
  disabled?: boolean;
}

export function Card({
  children,
  variant = 'outlined',
  padding = 'md',
  onClick,
  selected = false,
  disabled = false,
}: CardProps) {
  const content = <Box sx={{ p: paddings[padding] }}>{children}</Box>;

  return (
    <MuiCard
      variant={variant === 'elevated' ? 'elevation' : 'outlined'}
      elevation={variant === 'elevated' ? 2 : 0}
      sx={[
        { transition: (theme) => theme.transitions.create(['border-color', 'box-shadow']) },
        variant === 'filled' && { bgcolor: 'grey.50', borderColor: 'transparent' },
        variant === 'elevated' && { border: 1, borderColor: 'transparent' },
        selected && {
          borderColor: 'primary.main',
          boxShadow: (theme) => `0 0 0 1px ${theme.palette.primary.main}`,
        },
        disabled && { opacity: 0.5 },
      ]}
    >
      {onClick ? (
        <CardActionArea
          onClick={onClick}
          disabled={disabled}
          aria-pressed={selected}
          sx={{ height: '100%' }}
        >
          {content}
        </CardActionArea>
      ) : (
        content
      )}
    </MuiCard>
  );
}
