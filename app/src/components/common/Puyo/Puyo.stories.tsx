import type { Meta, StoryObj } from '@storybook/react';
import { Puyo, PuyoProps } from './Puyo';

const meta: Meta<typeof Puyo> = {
  component: Puyo,
};

export default meta;
type Story = StoryObj<typeof Puyo>;

export const Basic: Story = (args: PuyoProps) => {
  return <Puyo {...args} />;
};

Basic.args = {
  puyoColor: 1,
  stickTogether: {
    above: false,
    right: false,
    below: false,
    left: false,
  },
};
