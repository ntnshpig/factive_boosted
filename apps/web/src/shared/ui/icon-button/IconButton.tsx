import {
  alpha,
  Box,
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps,
  type SxProps,
  type Theme,
} from '@mui/material';
import type { LucideIcon } from 'lucide-react';

import { Icon } from '@/shared/ui/icon';
import { muiColor, muiSize, type Size } from '@/shared/ui/theme';
import { Tooltip } from '@/shared/ui/tooltip';

export type IconButtonVariant = 'standard' | 'soft' | 'outlined' | 'contained';
export type IconButtonColor = 'neutral' | 'primary' | 'danger';

export interface IconButtonProps extends Omit<
  MuiIconButtonProps,
  'color' | 'size' | 'children' | 'aria-label' | 'title'
> {
  icon: LucideIcon;
  /** Accessible name. Also shown as a tooltip unless `showTooltip` is false. */
  label: string;
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: Size;
  showTooltip?: boolean;
}

type SxItem = Exclude<SxProps<Theme>, readonly unknown[]>;

function variantSx(variant: IconButtonVariant, color: IconButtonColor): SxItem {
  return (theme: Theme) => {
    const main =
      color === 'neutral' ? theme.palette.text.primary : theme.palette[muiColor(color)].main;
    switch (variant) {
      case 'standard':
        return {};
      case 'soft':
        return {
          backgroundColor: alpha(main, 0.08),
          '&:hover': { backgroundColor: alpha(main, 0.16) },
        };
      case 'outlined':
        return { border: 1, borderColor: alpha(main, 0.3) };
      case 'contained': {
        const contrast =
          color === 'neutral'
            ? theme.palette.background.paper
            : theme.palette[muiColor(color)].contrastText;
        return {
          color: contrast,
          backgroundColor: main,
          '&:hover': { backgroundColor: alpha(main, 0.85) },
          '&.Mui-disabled': { backgroundColor: theme.palette.action.disabledBackground },
        };
      }
    }
  };
}

function toSxArray(sx: SxProps<Theme> | undefined): SxItem[] {
  if (sx === undefined) return [];
  // `Array.isArray` widens MUI's readonly sx array to any[].
  return Array.isArray(sx) ? (sx as SxItem[]) : [sx as SxItem];
}

export function IconButton({
  icon,
  label,
  variant = 'standard',
  color = 'neutral',
  size = 'md',
  showTooltip = true,
  sx,
  ...props
}: IconButtonProps) {
  const button = (
    <MuiIconButton
      {...props}
      aria-label={label}
      color={color === 'neutral' ? 'inherit' : muiColor(color)}
      size={muiSize[size]}
      sx={[variantSx(variant, color), ...toSxArray(sx)]}
    >
      <Icon icon={icon} size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'} />
    </MuiIconButton>
  );

  if (!showTooltip) return button;

  // A disabled button fires no events, so the tooltip needs a wrapper to listen on.
  return (
    <Tooltip title={label}>
      {props.disabled ? (
        <Box component="span" sx={{ display: 'inline-flex' }}>
          {button}
        </Box>
      ) : (
        button
      )}
    </Tooltip>
  );
}
