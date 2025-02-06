import type { Meta, StoryObj } from '@storybook/react';
import { Puyo, PuyoProps } from './Puyo';
import { Flex } from '@chakra-ui/react';
import { PuyoColor } from '@/logic/common/domain/puyo-color';

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
  connect: {
    above: false,
    right: false,
    below: false,
    left: false,
  },
};

export const AllPuyos: Story = (args: {}) => {
  const allColor = generateAllColor();
  const allConnect = generateAllConnect();

  return (
    <Flex flexDir='column' gap={8}>
      {allColor.map((p) => (
        <Flex gap={8}>
          {p === 9 ? (
            <Puyo puyoColor={p} />
          ) : (
            allConnect.map((c) => (
              <Puyo
                puyoColor={p}
                connect={{
                  above: c[0],
                  right: c[1],
                  below: c[2],
                  left: c[3],
                }}
              />
            ))
          )}
        </Flex>
      ))}
    </Flex>
  );
};

AllPuyos.args = {};

const generateAllColor = () => {
  return PuyoColor.values.map((p) => p.value);
};

const generateAllConnect = () => {
  const combinations: boolean[][] = [];

  for (let i = 0; i < 1 << 4; i++) {
    const combination: boolean[] = [];
    for (let j = 0; j < 4; j++) {
      combination.push((i & (1 << j)) !== 0);
    }
    combinations.push(combination);
  }

  return combinations;
};
