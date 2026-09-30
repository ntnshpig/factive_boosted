import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tag } from '@/shared/ui/tag';

import { renderWithTheme } from '../../../../test/renderWithTheme';

describe('Tag', () => {
  it('works as a toggle when selectable', async () => {
    const onClick = vi.fn();
    renderWithTheme(<Tag label="Images" selected={false} onClick={onClick} />);
    const tag = screen.getByRole('button', { name: 'Images' });

    expect(tag).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(tag);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('removes with the Backspace key for keyboard users', async () => {
    const onRemove = vi.fn();
    renderWithTheme(<Tag label="summer" onRemove={onRemove} />);

    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'summer' })).toHaveFocus();
    await userEvent.keyboard('{Backspace}');

    expect(onRemove).toHaveBeenCalledOnce();
  });
});
