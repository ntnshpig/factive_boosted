import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell } from 'lucide-react';

import { Avatar } from '@/shared/ui/avatar';
import { Badge, type BadgeColor } from '@/shared/ui/badge';
import { IconButton } from '@/shared/ui/icon-button';

const colors: BadgeColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

const meta = {
  title: 'Shared/Display/Badge',
  component: Badge,
  args: {
    count: 4,
    max: 99,
    dot: false,
    showZero: false,
    color: 'danger',
    label: '4 notifications',
    children: <IconButton icon={Bell} label="Notifications" showTooltip={false} />,
  },
  argTypes: {
    color: { control: 'inline-radio', options: colors },
    children: { control: false },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Colors: Story = {
  render: (args) => (
    <Stack direction="row" spacing={3}>
      {colors.map((color) => (
        <Badge key={color} {...args} color={color} />
      ))}
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
      <Badge {...args} count={3} />
      <Badge {...args} count={120} label="More than 99 notifications" />
      <Badge {...args} count={0} label="No notifications" />
      <Badge {...args} count={0} showZero label="No notifications" />
      <Badge {...args} dot label="New notifications" />
      <Badge dot color="success" label="Online">
        <Avatar name="Ada Lovelace" />
      </Badge>
    </Stack>
  ),
};
