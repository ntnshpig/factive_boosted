import { Eye, EyeOff, Lock } from 'lucide-react';
import { useState } from 'react';

import { IconButton } from '@/shared/ui/icon-button';
import { TextField, type TextFieldProps } from '@/shared/ui/text-field';

export type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'endAdornment'>;

export function PasswordField({ startIcon = Lock, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      autoComplete="current-password"
      {...props}
      startIcon={startIcon}
      type={visible ? 'text' : 'password'}
      endAdornment={
        <IconButton
          icon={visible ? EyeOff : Eye}
          label={visible ? 'Hide password' : 'Show password'}
          size="sm"
          showTooltip={false}
          edge="end"
          disabled={props.disabled}
          onClick={() => {
            setVisible((value) => !value);
          }}
        />
      }
    />
  );
}
