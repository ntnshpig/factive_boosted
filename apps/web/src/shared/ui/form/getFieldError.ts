import type { FieldMetaState } from 'react-final-form';

/** Error to show for a field: validation errors after the field is touched, submit errors until edited. */
export function getFieldError(meta: FieldMetaState<unknown>): string | undefined {
  if (!meta.touched) return undefined;
  const error: unknown = meta.error ?? (meta.dirtySinceLastSubmit ? undefined : meta.submitError);
  return typeof error === 'string' ? error : undefined;
}
