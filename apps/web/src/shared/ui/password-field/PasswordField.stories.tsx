import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { PasswordField } from '@/shared/ui/password-field';

const meta = {
  title: 'Shared/Form fields/PasswordField',
  component: PasswordField,
  args: { label: 'Password', size: 'md', disabled: false, error: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    startIcon: { control: false },
  },
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <Stack spacing={3} sx={{ maxWidth: 360 }}>
      <PasswordField {...args} label="Default" />
      <PasswordField {...args} label="Filled" defaultValue="correct horse battery" />
      <PasswordField {...args} label="New password" helperText="At least 8 characters." />
      <PasswordField {...args} label="Error" error helperText="Wrong email or password" />
      <PasswordField {...args} label="Disabled" disabled defaultValue="secret" />
    </Stack>
  ),
};
