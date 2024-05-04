import type { Meta, StoryObj } from '@storybook/react';
import { SelectPuyo, SelectPuyoProps } from './SelectPuyo';

const meta: Meta<typeof SelectPuyo> = {
  component: SelectPuyo,
};

export default meta;
type Story = StoryObj<typeof SelectPuyo>;

export const Basic: Story = (args: SelectPuyoProps) => {
  return <SelectPuyo {...args} />;
};

Basic.args = {
  selectedPuyoColor: 1,
};
