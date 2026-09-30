import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';
import type { LucideIcon } from 'lucide-react';

import { Icon } from '@/shared/ui/icon';
import { muiColor, muiSize, type Size } from '@/shared/ui/theme';

export type ButtonVariant = 'contained' | 'outlined' | 'text' | 'soft';
export type ButtonColor = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends Omit<
  MuiButtonProps,
  'variant' | 'color' | 'size' | 'startIcon' | 'endIcon'
> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: Size;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

export function Button({
  variant = 'contained',
  color = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  loading,
  ...props
}: ButtonProps) {
  const iconSize = size === 'lg' ? 'md' : 'sm';

  return (
    <MuiButton
      {...props}
      variant={variant}
      color={muiColor(color)}
      size={muiSize[size]}
      loading={loading}
      loadingPosition={startIcon ? 'start' : 'center'}
      startIcon={startIcon ? <Icon icon={startIcon} size={iconSize} /> : undefined}
      endIcon={endIcon ? <Icon icon={endIcon} size={iconSize} /> : undefined}
    />
  );
}
