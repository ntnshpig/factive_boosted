import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from 'react-final-form';
import { describe, expect, it, vi } from 'vitest';
import { object, string } from 'yup';

import { validateWithSchema } from '@/shared/lib/form';
import { FormTextField } from '@/shared/ui/form';

import { renderWithTheme } from '../../../../test/renderWithTheme';

const validate = validateWithSchema(object({ email: string().required('Email is required') }));

function renderForm(onSubmit = vi.fn()) {
  renderWithTheme(
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={(event) => void handleSubmit(event)}>
          <FormTextField name="email" label="Email" helperText="We never share it." />
          <button type="submit">Submit</button>
        </form>
      )}
    />,
  );
  return onSubmit;
}

describe('FormTextField', () => {
  it('shows the helper text until the field is touched, then the error', async () => {
    renderForm();
    const input = screen.getByLabelText('Email');

    expect(screen.getByText('We never share it.')).toBeInTheDocument();
    expect(input).not.toHaveAttribute('aria-invalid', 'true');

    await userEvent.click(input);
    await userEvent.tab();

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('submits typed values', async () => {
    const onSubmit = renderForm();

    await userEvent.type(screen.getByLabelText('Email'), 'ada@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalledWith(
      { email: 'ada@example.com' },
      expect.anything(),
      expect.anything(),
    );
  });
});
