import { Box, Stack, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Card, type CardVariant } from '@/shared/ui/card';
import { Tag } from '@/shared/ui/tag';

const variants: CardVariant[] = ['outlined', 'elevated', 'filled'];

function Body({ title }: { title: string }) {
  return (
    <Stack spacing={1}>
      <Typography variant="h4" component="p">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        12 media · updated 2 days ago
      </Typography>
    </Stack>
  );
}

function SelectableGrid() {
  const [selected, setSelected] = useState<string[]>(['LinkedIn']);
  const toggle = (name: string) => {
    setSelected((items) =>
      items.includes(name) ? items.filter((item) => item !== name) : [...items, name],
    );
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 200px)', gap: 2 }}>
      {['Meta', 'LinkedIn', 'YouTube'].map((name) => (
        <Card
          key={name}
          selected={selected.includes(name)}
          onClick={() => {
            toggle(name);
          }}
        >
          <Body title={name} />
        </Card>
      ))}
      <Card disabled onClick={() => undefined}>
        <Body title="TikTok" />
      </Card>
    </Box>
  );
}

const meta = {
  title: 'Shared/Display/Card',
  component: Card,
  args: {
    variant: 'outlined',
    padding: 'md',
    selected: false,
    disabled: false,
    children: <Body title="Spring campaign" />,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 320 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={2}>
      {variants.map((variant) => (
        <Card key={variant} {...args} variant={variant}>
          <Body title={variant} />
        </Card>
      ))}
    </Stack>
  ),
};

export const Clickable: Story = {
  args: { onClick: fn() },
};

export const SelectableStates: Story = {
  decorators: [(Story) => <Story />],
  render: () => <SelectableGrid />,
};

export const WithContent: Story = {
  render: (args) => (
    <Card {...args} padding="lg">
      <Stack spacing={2}>
        <Body title="Spring campaign" />
        <Stack direction="row" spacing={1}>
          <Tag label="Active" color="success" size="sm" />
          <Tag label="ACTIV8" color="primary" size="sm" />
        </Stack>
      </Stack>
    </Card>
  ),
};
