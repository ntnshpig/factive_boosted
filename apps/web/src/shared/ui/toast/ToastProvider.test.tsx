import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ToastProvider, useToast } from '@/shared/ui/toast';

import { renderWithTheme } from '../../../../test/renderWithTheme';

function Trigger() {
  const toast = useToast();
  return (
    <button
      type="button"
      onClick={() => {
        toast.success('First');
        toast.error('Second');
      }}
    >
      Notify
    </button>
  );
}

describe('ToastProvider', () => {
  it('shows toasts one at a time, in order', async () => {
    renderWithTheme(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Notify' }));

    expect(await screen.findByText('First')).toBeInTheDocument();
    expect(screen.queryByText('Second')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

    expect(await screen.findByText('Second')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('First')).not.toBeInTheDocument();
    });
  });
});
