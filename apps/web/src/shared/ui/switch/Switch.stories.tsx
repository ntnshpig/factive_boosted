import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Switch, type SwitchProps } from '@/shared/ui/switch';

function ControlledSwitch(props: SwitchProps) {
  const [checked, setChecked] = useState(props.checked);
  return (
    <Switch
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
  title: 'Shared/Form fields/Switch',
  component: Switch,
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    label: 'Project active',
    checked: true,
    disabled: false,
    error: false,
    size: 'md',
    labelPlacement: 'end',
    onChange: fn(),
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    labelPlacement: { control: 'inline-radio', options: ['start', 'end'] },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <Stack spacing={1} sx={{ maxWidth: 360 }}>
      <ControlledSwitch {...args} label="Off" checked={false} />
      <ControlledSwitch {...args} label="On" checked />
      <ControlledSwitch
        {...args}
        label="With helper"
        helperText="Inactive projects are read-only."
      />
      <ControlledSwitch {...args} label="Disabled" disabled />
      <ControlledSwitch {...args} label="Small" size="sm" />
      <ControlledSwitch {...args} label="Label at start" labelPlacement="start" />
    </Stack>
  ),
};
