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
  fieldPuyoList: [
    {
      pColor: 1,
      connect: {
        isConnectedToAbove: false,
        isConnectedToRight: false,
        isConnectedToBelow: false,
        isConnectedToLeft: false,
      },
      coord: { x: 0, y: 0 },
    },
    {
      pColor: 2,
      connect: {
        isConnectedToAbove: false,
        isConnectedToRight: false,
        isConnectedToBelow: false,
        isConnectedToLeft: false,
      },
      coord: { x: 1, y: 1 },
    },
    {
      pColor: 3,
      connect: {
        isConnectedToAbove: false,
        isConnectedToRight: false,
        isConnectedToBelow: false,
        isConnectedToLeft: false,
      },
      coord: { x: 2, y: 2 },
    },
    {
      pColor: 4,
      connect: {
        isConnectedToAbove: false,
        isConnectedToRight: false,
        isConnectedToBelow: false,
        isConnectedToLeft: false,
      },
      coord: { x: 3, y: 3 },
    },
    {
      pColor: 5,
      connect: {
        isConnectedToAbove: false,
        isConnectedToRight: false,
        isConnectedToBelow: false,
        isConnectedToLeft: false,
      },
      coord: { x: 4, y: 4 },
    },
    {
      pColor: 9,
      connect: {
        isConnectedToAbove: false,
        isConnectedToRight: false,
        isConnectedToBelow: false,
        isConnectedToLeft: false,
      },
      coord: { x: 5, y: 5 },
    },
  ],
  onClickFieldCell: (x, y) => {
    console.log(`onClickFieldCell[x=${x},y=${y}]`);
  },
};
