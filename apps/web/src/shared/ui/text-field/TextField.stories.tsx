import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Search, X } from 'lucide-react';

import { IconButton } from '@/shared/ui/icon-button';
import { TextField } from '@/shared/ui/text-field';

const meta = {
  title: 'Shared/Form fields/TextField',
  component: TextField,
  args: {
    label: 'Project name',
    placeholder: 'Spring campaign',
    helperText: '',
    size: 'md',
    disabled: false,
    error: false,
    required: false,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    startIcon: { control: false },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <Stack spacing={3} sx={{ maxWidth: 360 }}>
      <TextField {...args} label="Default" />
      <TextField {...args} label="With helper" helperText="Visible to your team only." />
      <TextField {...args} label="Filled" defaultValue="Spring campaign" />
      <TextField {...args} label="Required" required />
      <TextField {...args} label="Error" error helperText="Name is required" />
      <TextField {...args} label="Disabled" disabled defaultValue="Read only value" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={3} sx={{ maxWidth: 360 }}>
      <TextField {...args} size="sm" label="Small" />
      <TextField {...args} size="md" label="Medium" />
    </Stack>
  ),
};

export const WithAdornments: Story = {
  render: (args) => (
    <Stack spacing={3} sx={{ maxWidth: 360 }}>
      <TextField
        {...args}
        label="Email"
        type="email"
        startIcon={Mail}
        placeholder="you@company.com"
      />
      <TextField
        {...args}
        label="Search media"
        startIcon={Search}
        defaultValue="beach sunset"
        endAdornment={<IconButton icon={X} label="Clear" size="sm" edge="end" />}
      />
    </Stack>
  ),
};

export const Multiline: Story = {
  args: { label: 'Message', multiline: true, minRows: 3, placeholder: 'Write your post…' },
};
