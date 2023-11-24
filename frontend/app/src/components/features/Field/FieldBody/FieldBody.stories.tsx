import type { Meta, StoryObj } from '@storybook/react';
import { FieldBody, FieldBodyProps } from './FieldBody';

const meta: Meta<typeof FieldBody> = {
  component: FieldBody,
};

export default meta;
type Story = StoryObj<typeof FieldBody>;

export const Basic: Story = (args: FieldBodyProps) => {
  return <FieldBody {...args} />;
};

Basic.args = {
  onClickFieldCell: (x, y) => {
    console.log(`onClickFieldCell[x=${x},y=${y}]`);
  },
};
