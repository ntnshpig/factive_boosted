import { Stack, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heart, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { fn } from 'storybook/test';

import { IconButton, type IconButtonColor, type IconButtonVariant } from '@/shared/ui/icon-button';

const variants: IconButtonVariant[] = ['standard', 'soft', 'outlined', 'contained'];
const colors: IconButtonColor[] = ['neutral', 'primary', 'danger'];

const meta = {
  title: 'Shared/Actions/IconButton',
  component: IconButton,
  args: {
    icon: Pencil,
    label: 'Edit',
    variant: 'standard',
    color: 'neutral',
    size: 'md',
    disabled: false,
    loading: false,
    showTooltip: true,
    onClick: fn(),
  },
  argTypes: {
    icon: { control: false },
    variant: { control: 'inline-radio', options: variants },
    color: { control: 'inline-radio', options: colors },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={2}>
      {colors.map((color) => (
        <Stack key={color} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography variant="overline" sx={{ width: 96 }}>
            {color}
          </Typography>
          {variants.map((variant) => (
            <IconButton
              key={variant}
              {...args}
              variant={variant}
              color={color}
              icon={color === 'danger' ? Trash2 : Heart}
              label={`${variant} ${color}`}
            />
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <IconButton
          key={size}
          {...args}
          variant="soft"
          size={size}
          label={`More (${size})`}
          icon={MoreHorizontal}
        />
      ))}
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <IconButton {...args} variant="soft" label="Default" />
      <IconButton {...args} variant="soft" label="Disabled" disabled />
      <IconButton {...args} variant="soft" label="Loading" loading />
      <IconButton {...args} variant="contained" color="primary" label="Disabled" disabled />
    </Stack>
  ),
};
