import { useField } from 'react-final-form';

import { Checkbox, type CheckboxProps } from '@/shared/ui/checkbox';

import { getFieldError } from './getFieldError';

export interface FormCheckboxProps extends Omit<
  CheckboxProps,
  'name' | 'checked' | 'onChange' | 'onBlur' | 'onFocus' | 'error'
> {
  name: string;
}

export function FormCheckbox({ name, helperText, ...props }: FormCheckboxProps) {
  const { input, meta } = useField<boolean>(name, { type: 'checkbox' });
  const error = getFieldError(meta);

  return (
    <Checkbox
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
