import type { Meta, StoryObj } from '@storybook/react';
import { Frame } from './Frame';
import { Box } from '@chakra-ui/react';

const meta: Meta<typeof Frame> = {
  component: Frame,
};

export default meta;
type Story = StoryObj<typeof Frame>;

export const Basic: Story = () => {
  return (
    <Frame>
      <Box p='5px' w='180px' h='390px' backgroundColor='#FFFFFF'>
        中身
      </Box>
    </Frame>
  );
};

Basic.args = {};
