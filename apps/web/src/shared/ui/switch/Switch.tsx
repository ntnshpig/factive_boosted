import { FormControl, FormControlLabel, FormHelperText, Switch as MuiSwitch } from '@mui/material';
import type { FocusEventHandler } from 'react';

export interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: FocusEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  name?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  /** Label on the left, e.g. in settings lists. */
  labelPlacement?: 'start' | 'end';
}

export function Switch({
  label,
  checked,
  onChange,
  helperText,
  error = false,
  disabled = false,
  size = 'md',
  labelPlacement = 'end',
  ...props
}: SwitchProps) {
  return (
    <FormControl error={error} disabled={disabled}>
      <FormControlLabel
        label={label}
        labelPlacement={labelPlacement}
        sx={labelPlacement === 'start' ? { ml: 0, justifyContent: 'space-between' } : undefined}
        control={
          <MuiSwitch
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
