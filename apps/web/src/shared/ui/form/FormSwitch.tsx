import { useField } from 'react-final-form';

import { Switch, type SwitchProps } from '@/shared/ui/switch';

import { getFieldError } from './getFieldError';

export interface FormSwitchProps extends Omit<
  SwitchProps,
  'name' | 'checked' | 'onChange' | 'onBlur' | 'onFocus' | 'error'
> {
  name: string;
}

export function FormSwitch({ name, helperText, ...props }: FormSwitchProps) {
  const { input, meta } = useField<boolean>(name, { type: 'checkbox' });
  const error = getFieldError(meta);

  return (
    <Switch
      {...props}
      name={input.name}
      checked={input.checked ?? false}
      onChange={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      error={Boolean(error)}
      helperText={error ?? helperText}
    />
  );
}
