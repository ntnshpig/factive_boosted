import { Box, CircularProgress, Typography } from '@mui/material';

import type { Size } from '@/shared/ui/theme';

const pixels: Record<Size, number> = { sm: 16, md: 24, lg: 40 };

export interface SpinnerProps {
  size?: Size;
  color?: 'primary' | 'inherit';
  /** Accessible name. Shown under the spinner when `showLabel` is set. */
  label?: string;
  showLabel?: boolean;
  /** Centers the spinner in the available space, e.g. while a page loads. */
  centered?: boolean;
}

export function Spinner({
  size = 'md',
  color = 'primary',
  label = 'Loading',
  showLabel = false,
  centered = false,
}: SpinnerProps) {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={[
        { display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 1 },
        centered && { display: 'flex', justifyContent: 'center', width: '100%', py: 6 },
      ]}
    >
      <CircularProgress size={pixels[size]} color={color} thickness={4} aria-hidden />
      {showLabel ? (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      ) : (
        <Box component="span" sx={visuallyHidden}>
          {label}
        </Box>
      )}
    </Box>
  );
}

const visuallyHidden = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
} as const;
