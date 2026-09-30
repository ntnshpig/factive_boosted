import { Stack, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, Image, Search, Sparkles, Trash2, Upload } from 'lucide-react';

import { Icon } from '@/shared/ui/icon';

const meta = {
  title: 'Shared/Icon',
  component: Icon,
  args: { icon: Sparkles, size: 'md' },
  argTypes: {
    icon: { control: false },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-end' }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <Stack key={size} spacing={1} sx={{ alignItems: 'center' }}>
          <Icon icon={Sparkles} size={size} />
          <Typography variant="caption">{size}</Typography>
        </Stack>
      ))}
    </Stack>
  ),
};

export const InheritsTextColor: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      {[Search, Upload, Image, Bell].map((icon, index) => (
        <Typography key={index} color="primary">
          <Icon icon={icon} />
        </Typography>
      ))}
      <Typography color="error">
        <Icon icon={Trash2} label="Delete" />
      </Typography>
    </Stack>
  ),
};
