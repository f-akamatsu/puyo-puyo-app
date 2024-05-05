import type { Meta, StoryObj } from '@storybook/react';
import { PuyoOnFieldBody, PuyoOnFieldBodyProps } from './PuyoOnFieldBody';

const meta: Meta<typeof PuyoOnFieldBody> = {
  component: PuyoOnFieldBody,
};

export default meta;
type Story = StoryObj<typeof PuyoOnFieldBody>;

export const Basic: Story = (args: PuyoOnFieldBodyProps) => {
  return <PuyoOnFieldBody {...args} />;
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
  onClickFieldCell: (x, y) => {
    console.log(`onClickFieldCell[x=${x},y=${y}]`);
  },
};
