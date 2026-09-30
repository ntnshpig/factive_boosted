import { useField } from 'react-final-form';

import { PasswordField, type PasswordFieldProps } from '@/shared/ui/password-field';

import { getFieldError } from './getFieldError';

export interface FormPasswordFieldProps extends Omit<
  PasswordFieldProps,
  'name' | 'value' | 'onChange' | 'onBlur' | 'onFocus' | 'error'
> {
  name: string;
}

export function FormPasswordField({ name, helperText, ...props }: FormPasswordFieldProps) {
  const { input, meta } = useField<string>(name);
  const error = getFieldError(meta);

  return (
    <PasswordField {...props} {...input} error={Boolean(error)} helperText={error ?? helperText} />
  );
}
