import { setIn, type ValidationErrors } from 'final-form';
import { ValidationError, type AnyObject, type ObjectSchema } from 'yup';

/**
 * Turns a Yup object schema into a React Final Form `validate` function.
 * Returns `undefined` when values are valid, otherwise an errors object
 * shaped like the values, with the first message for each field.
 */
export function validateWithSchema<T extends AnyObject>(schema: ObjectSchema<T>) {
  return (values: T): ValidationErrors => {
    try {
      schema.validateSync(values, { abortEarly: false });
      return undefined;
    } catch (error) {
      if (!(error instanceof ValidationError)) throw error;

      let errors: object = {};
      const seen = new Set<string>();
      for (const issue of error.inner) {
        const path = issue.path ?? '';
        if (seen.has(path)) continue;
        seen.add(path);
        errors = setIn(errors, path, issue.message);
      }
      return errors;
    }
  };
}
