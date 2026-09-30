import {
  InputAdornment,
  TextField as MuiTextField,
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { Icon } from '@/shared/ui/icon';

export interface TextFieldProps extends Omit<
  MuiTextFieldProps,
  'variant' | 'size' | 'color' | 'select' | 'slotProps'
> {
  size?: 'sm' | 'md';
  /** The `input` slot is owned by this component: use `startIcon` and `endAdornment`. */
  slotProps?: Omit<NonNullable<MuiTextFieldProps['slotProps']>, 'input'>;
  startIcon?: LucideIcon;
  /** Content at the end of the input, e.g. an IconButton. */
  endAdornment?: ReactNode;
}

export function TextField({
  size = 'md',
  startIcon,
  endAdornment,
  slotProps,
  ...props
}: TextFieldProps) {
  return (
    <MuiTextField
      {...props}
      variant="outlined"
      size={size === 'sm' ? 'small' : 'medium'}
      slotProps={{
        ...slotProps,
        input: {
          startAdornment: startIcon ? (
            <InputAdornment position="start">
              <Icon icon={startIcon} size="sm" />
            </InputAdornment>
          ) : undefined,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
}
