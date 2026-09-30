import { Box, MenuItem, TextField as MuiTextField } from '@mui/material';
import type { FocusEventHandler } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  name?: string;
  /** Shown while nothing is selected. */
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'md';
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder,
  size = 'md',
  ...props
}: SelectProps) {
  return (
    <MuiTextField
      {...props}
      select
      label={label}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      size={size === 'sm' ? 'small' : 'medium'}
      slotProps={{
        select: {
          displayEmpty: Boolean(placeholder),
          renderValue: (selected) => {
            const option = options.find((item) => item.value === selected);
            return (
              option?.label ?? (
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  {placeholder}
                </Box>
              )
            );
          },
        },
        inputLabel: placeholder ? { shrink: true } : undefined,
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </MenuItem>
      ))}
    </MuiTextField>
  );
}
