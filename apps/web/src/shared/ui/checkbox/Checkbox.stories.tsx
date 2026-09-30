import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Checkbox, type CheckboxProps } from '@/shared/ui/checkbox';

function ControlledCheckbox(props: CheckboxProps) {
  const [checked, setChecked] = useState(props.checked);
  return (
    <Checkbox
      {...props}
      checked={checked}
      onChange={(next) => {
        setChecked(next);
        props.onChange(next);
      }}
    />
  );
}

const meta = {
  title: 'Shared/Form fields/Checkbox',
  component: Checkbox,
  render: (args) => <ControlledCheckbox {...args} />,
  args: {
    label: 'Contains third-party rights',
    checked: false,
    indeterminate: false,
    disabled: false,
    error: false,
    size: 'md',
    onChange: fn(),
  },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <Stack spacing={1}>
      <ControlledCheckbox {...args} label="Unchecked" />
      <ControlledCheckbox {...args} label="Checked" checked />
      <ControlledCheckbox {...args} label="Indeterminate" indeterminate />
      <ControlledCheckbox {...args} label="With helper" helperText="Shown on the media card." />
      <ControlledCheckbox
        {...args}
        label="I accept the terms"
        error
        helperText="You must accept the terms"
      />
      <ControlledCheckbox {...args} label="Disabled" disabled />
      <ControlledCheckbox {...args} label="Disabled checked" disabled checked />
      <ControlledCheckbox {...args} label="Small" size="sm" checked />
    </Stack>
  ),
};
