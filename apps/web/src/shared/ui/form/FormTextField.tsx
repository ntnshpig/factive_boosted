import { useField } from 'react-final-form';

import { TextField, type TextFieldProps } from '@/shared/ui/text-field';

import { getFieldError } from './getFieldError';

export interface FormTextFieldProps extends Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'onBlur' | 'onFocus' | 'error'
> {
  name: string;
}

export function FormTextField({ name, helperText, ...props }: FormTextFieldProps) {
  const { input, meta } = useField<string>(name);
  const error = getFieldError(meta);

  return (
    <TextField {...props} {...input} error={Boolean(error)} helperText={error ?? helperText} />
  );
}
