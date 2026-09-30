import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pencil } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { IconButton } from '@/shared/ui/icon-button';

import { renderWithTheme } from '../../../../test/renderWithTheme';

describe('IconButton', () => {
  it('uses the label as its accessible name and handles clicks', async () => {
    const onClick = vi.fn();
    renderWithTheme(<IconButton icon={Pencil} label="Edit" onClick={onClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('shows the label as a tooltip on hover', async () => {
    renderWithTheme(<IconButton icon={Pencil} label="Edit" />);

    await userEvent.hover(screen.getByRole('button', { name: 'Edit' }));

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Edit');
  });
});
