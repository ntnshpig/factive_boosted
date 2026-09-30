import { Stack, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hash, Image, Video } from 'lucide-react';
import { useState } from 'react';
import { fn } from 'storybook/test';

import type { Tone } from '@/shared/ui/theme';
import { Tag, type TagVariant } from '@/shared/ui/tag';

const colors: Tone[] = ['neutral', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'];
const variants: TagVariant[] = ['soft', 'filled', 'outlined'];

function FilterTags() {
  const [selected, setSelected] = useState<string[]>(['Images']);
  const toggle = (name: string) => {
    setSelected((items) =>
      items.includes(name) ? items.filter((item) => item !== name) : [...items, name],
    );
  };

  return (
    <Stack direction="row" spacing={1}>
      {[
        { name: 'Images', icon: Image },
        { name: 'Videos', icon: Video },
        { name: 'Liked', icon: undefined },
      ].map(({ name, icon }) => (
        <Tag
          key={name}
          label={name}
          icon={icon}
          color="primary"
          selected={selected.includes(name)}
          onClick={() => {
            toggle(name);
          }}
        />
      ))}
    </Stack>
  );
}

function RemovableTags() {
  const [tags, setTags] = useState(['beach', 'sunset', 'summer', 'people']);

  return (
    <Stack direction="row" spacing={1}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          icon={Hash}
          onRemove={() => {
            setTags((items) => items.filter((item) => item !== tag));
          }}
        />
      ))}
    </Stack>
  );
}

const meta = {
  title: 'Shared/Display/Tag',
  component: Tag,
  args: {
    label: 'summer',
    color: 'neutral',
    variant: 'soft',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    color: { control: 'select', options: colors },
    variant: { control: 'inline-radio', options: variants },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    icon: { control: false },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={2}>
      {variants.map((variant) => (
        <Stack key={variant} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography variant="overline" sx={{ width: 80 }}>
            {variant}
          </Typography>
          {colors.map((color) => (
            <Tag key={color} {...args} variant={variant} color={color} label={color} />
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Tag {...args} size="sm" label="Small" icon={Hash} />
      <Tag {...args} size="md" label="Medium" icon={Hash} />
    </Stack>
  ),
};

export const Removable: Story = {
  render: () => <RemovableTags />,
};

export const Selectable: Story = {
  render: () => <FilterTags />,
};

export const States: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1}>
      <Tag {...args} label="Default" />
      <Tag {...args} label="Clickable" onClick={fn()} />
      <Tag {...args} label="Removable" onRemove={fn()} />
      <Tag {...args} label="Selected" color="primary" selected onClick={fn()} />
      <Tag {...args} label="Disabled" disabled onRemove={fn()} />
    </Stack>
  ),
};
