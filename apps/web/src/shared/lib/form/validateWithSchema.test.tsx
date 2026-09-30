import { fireEvent, render, screen } from '@testing-library/react';
import { Field, Form } from 'react-final-form';
import { describe, expect, it, vi } from 'vitest';
import { object, string } from 'yup';

import { validateWithSchema } from '@/shared/lib/form';

const schema = object({
  email: string().required('Email is required').email('Invalid email'),
  profile: object({
    name: string().required('Name is required').min(2, 'Name is too short'),
  }),
});

const validate = validateWithSchema(schema);

describe('validateWithSchema', () => {
  it('returns undefined for valid values', () => {
    expect(validate({ email: 'user@example.com', profile: { name: 'Ann' } })).toBeUndefined();
  });

  it('returns the first message for each field, including nested ones', () => {
    expect(validate({ email: '', profile: { name: '' } })).toEqual({
      email: 'Email is required',
      profile: { name: 'Name is required' },
    });
  });

  it('blocks submit in React Final Form and exposes field errors', () => {
    const onSubmit = vi.fn();

    render(
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={(event) => void handleSubmit(event)} aria-label="form">
            <Field<string> name="email">
              {({ input, meta }) => (
                <>
                  <input {...input} aria-label="email" />
                  {meta.touched && meta.error ? <span>{String(meta.error)}</span> : null}
                </>
              )}
            </Field>
          </form>
        )}
      />,
    );

    fireEvent.submit(screen.getByRole('form', { name: 'form' }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
});
