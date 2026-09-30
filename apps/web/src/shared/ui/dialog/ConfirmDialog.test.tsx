import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ConfirmDialog } from '@/shared/ui/dialog';

import { renderWithTheme } from '../../../../test/renderWithTheme';

describe('ConfirmDialog', () => {
  it('confirms and cancels', async () => {
    const onConfirm = vi.fn();
    const onClose = vi.fn();
    renderWithTheme(
      <ConfirmDialog
        open
        title="Delete media?"
        description="This cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={onConfirm}
        onClose={onClose}
      />,
    );

    expect(screen.getByRole('dialog', { name: 'Delete media?' })).toHaveAccessibleDescription(
      'This cannot be undone.',
    );

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalledOnce();

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('blocks cancel while confirming', () => {
    renderWithTheme(
      <ConfirmDialog open loading title="Delete media?" onConfirm={vi.fn()} onClose={vi.fn()} />,
    );

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });
});
