import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox as MuiCheckbox,
} from '@mui/material';
import type { FocusEventHandler } from 'react';

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: FocusEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  name?: string;
  /** Some, but not all, nested items are checked. */
  indeterminate?: boolean;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export function Checkbox({
  label,
  checked,
  onChange,
  helperText,
  error = false,
  disabled = false,
  size = 'md',
  ...props
}: CheckboxProps) {
  return (
    <FormControl error={error} disabled={disabled}>
      <FormControlLabel
        label={label}
        control={
          <MuiCheckbox
            {...props}
            checked={checked}
            onChange={(event) => {
              onChange(event.target.checked);
            }}
            size={size === 'sm' ? 'small' : 'medium'}
          />
        }
      />
      {helperText && <FormHelperText sx={{ mt: -0.5 }}>{helperText}</FormHelperText>}
    </FormControl>
  );
}
