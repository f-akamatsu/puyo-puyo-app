import type { Meta, StoryObj } from '@storybook/react';
import { Field, FieldProps } from './Field';

const meta: Meta<typeof Field> = {
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Basic: Story = (args: FieldProps) => {
  return <Field {...args} />;
};

Basic.args = {
  fieldPuyos: [
    {
      puyoColor: 1,
      connect: {
        above: false,
        right: false,
        below: false,
        left: false,
      },
      fieldCoord: { x: 0, y: 0 },
    },
    {
      puyoColor: 2,
      connect: {
        above: false,
        right: false,
        below: false,
        left: false,
      },
      fieldCoord: { x: 1, y: 1 },
    },
    {
      puyoColor: 3,
      connect: {
        above: false,
        right: false,
        below: false,
        left: false,
      },
      fieldCoord: { x: 2, y: 2 },
    },
    {
      puyoColor: 4,
      connect: {
        above: false,
        right: false,
        below: false,
        left: false,
      },
      fieldCoord: { x: 3, y: 3 },
    },
    {
      puyoColor: 5,
      connect: {
        above: false,
        right: false,
        below: false,
        left: false,
      },
      fieldCoord: { x: 4, y: 4 },
    },
    {
      puyoColor: 9,
      connect: {
        above: false,
        right: false,
        below: false,
        left: false,
      },
      fieldCoord: { x: 5, y: 5 },
    },
  ],
  score: 12345678,
  onClickFieldCell: (fieldCoord) => {
    console.log(`onClickFieldCell[fieldCoord=${fieldCoord}]`);
  },
};
