import type { Meta, StoryObj } from '@storybook/react';
import { FieldCell, FieldCellProps } from './FieldCell';

const meta: Meta<typeof FieldCell> = {
  component: FieldCell,
};

export default meta;
type Story = StoryObj<typeof FieldCell>;

export const Basic: Story = (args: FieldCellProps) => {
  return <FieldCell {...args} />;
};

Basic.args = {
  x: 0,
  y: 0,
  onClickFieldCell: (x, y) => {
    console.log(`onClickFieldCell[x=${x},y=${y}]`);
  },
};
