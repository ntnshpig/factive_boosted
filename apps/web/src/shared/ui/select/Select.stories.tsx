import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Select, type SelectOption, type SelectProps } from '@/shared/ui/select';

const platforms: SelectOption[] = [
  { value: 'meta', label: 'Meta' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'banner', label: 'Banners' },
  { value: 'tiktok', label: 'TikTok (coming soon)', disabled: true },
];

function ControlledSelect(props: SelectProps) {
  const [value, setValue] = useState(props.value);
  return (
    <Select
      {...props}
      value={value}
      onChange={(next) => {
        setValue(next);
        props.onChange(next);
      }}
    />
  );
}

const meta = {
  title: 'Shared/Form fields/Select',
  component: Select,
  render: (args) => <ControlledSelect {...args} />,
  args: {
    label: 'Platform',
    options: platforms,
    value: '',
    placeholder: 'Choose a platform',
    helperText: '',
    size: 'md',
    error: false,
    disabled: false,
    onChange: fn(),
  },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
  decorators: [
    (Story) => (
      <Stack sx={{ maxWidth: 360 }}>
        <Story />
      </Stack>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <ControlledSelect {...args} label="Placeholder" />
      <ControlledSelect {...args} label="Selected" value="linkedin" />
      <ControlledSelect {...args} label="Without placeholder" placeholder={undefined} />
      <ControlledSelect {...args} label="Error" error helperText="Choose at least one platform" />
      <ControlledSelect {...args} label="Disabled" value="meta" disabled />
      <ControlledSelect {...args} label="Small" size="sm" value="youtube" />
    </Stack>
  ),
};
