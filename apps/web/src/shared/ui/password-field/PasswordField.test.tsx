import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PasswordField } from '@/shared/ui/password-field';

import { renderWithTheme } from '../../../../test/renderWithTheme';

describe('PasswordField', () => {
  it('hides the password until the toggle is pressed', async () => {
    renderWithTheme(<PasswordField label="Password" defaultValue="secret" />);
    const input = screen.getByLabelText('Password');

    expect(input).toHaveAttribute('type', 'password');

    await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(input).toHaveAttribute('type', 'text');

    await userEvent.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(input).toHaveAttribute('type', 'password');
  });
});
