import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, type AvatarSize } from '@/shared/ui/avatar';

const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
// Inline SVG keeps the story offline and deterministic.
const photo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#C8B3FD"/><circle cx="32" cy="24" r="12" fill="#6442D6"/><rect x="12" y="42" width="40" height="22" rx="11" fill="#6442D6"/></svg>',
  );

const meta = {
  title: 'Shared/Display/Avatar',
  component: Avatar,
  args: { name: 'Ada Lovelace', size: 'md', shape: 'circle' },
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
    shape: { control: 'inline-radio', options: ['circle', 'rounded'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      {sizes.map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </Stack>
  ),
};

export const Kinds: Story = {
  render: () => (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Avatar name="Ada Lovelace" src={photo} />
      <Avatar name="Grace Hopper" />
      <Avatar name="Linus" />
      <Avatar name="Margaret Hamilton" shape="rounded" />
      <Avatar name="Spring Campaign" shape="rounded" size="lg" />
    </Stack>
  ),
};
