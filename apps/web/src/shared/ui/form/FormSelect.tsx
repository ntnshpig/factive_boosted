import { useField } from 'react-final-form';

import { Select, type SelectProps } from '@/shared/ui/select';

import { getFieldError } from './getFieldError';

export interface FormSelectProps extends Omit<
  SelectProps,
  'name' | 'value' | 'onChange' | 'onBlur' | 'onFocus' | 'error'
> {
  name: string;
}

export function FormSelect({ name, helperText, ...props }: FormSelectProps) {
  const { input, meta } = useField<string>(name);
  const error = getFieldError(meta);

  return (
    <Select
      {...props}
      name={input.name}
      value={input.value}
      onChange={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      error={Boolean(error)}
      helperText={error ?? helperText}
    />
  );
}
