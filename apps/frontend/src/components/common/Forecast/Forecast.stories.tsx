import { HStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';
import { Forecast, type ForecastType } from './Forecast';

const meta: Meta<typeof Forecast> = {
  component: Forecast,
};

export default meta;
type Story = StoryObj<typeof Forecast>;

export const Basic: Story = {
  args: {
    type: 'rock',
  },
};

export const AllTypes: Story = {
  render: () => {
    const types: ForecastType[] = ['small', 'medium', 'rock', 'star', 'moon', 'crown', 'commet'];
    return (
      <HStack alignItems='flex-end'>
        {types.map((t) => (
          <Forecast type={t} />
        ))}
      </HStack>
    );
  },
};
