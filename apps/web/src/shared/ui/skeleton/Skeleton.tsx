import { Stack, Skeleton as MuiSkeleton } from '@mui/material';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  /** Text only: number of lines. The last one is shorter, like a real paragraph. */
  lines?: number;
  width?: number | string;
  height?: number | string;
  /** Stops the pulse, e.g. for users who prefer reduced motion. */
  animated?: boolean;
}

export function Skeleton({
  variant = 'text',
  lines = 1,
  width,
  height,
  animated = true,
}: SkeletonProps) {
  const animation = animated ? 'wave' : false;

  if (variant === 'text') {
    return (
      <Stack spacing={0.5} sx={{ width: width ?? '100%' }} aria-hidden>
        {Array.from({ length: lines }, (_, index) => (
          <MuiSkeleton
            key={index}
            variant="text"
            animation={animation}
            width={lines > 1 && index === lines - 1 ? '60%' : '100%'}
            height={height}
          />
        ))}
      </Stack>
    );
  }

  return (
    <MuiSkeleton
      variant={variant === 'circle' ? 'circular' : 'rounded'}
      animation={animation}
      width={width ?? (variant === 'circle' ? 40 : '100%')}
      height={height ?? (variant === 'circle' ? 40 : 120)}
      aria-hidden
    />
  );
}
