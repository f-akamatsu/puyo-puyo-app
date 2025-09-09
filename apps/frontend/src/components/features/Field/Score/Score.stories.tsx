import { VStack } from '@chakra-ui/react';
import type { Meta } from '@storybook/react';
import { Score } from './Score';

const meta: Meta<typeof Score> = {
  component: Score,
};

export default meta;

export const Basic = () => {
  return (
    <VStack w={200} align='flex-end'>
      <Score text={0} />
      <Score text={12345} />
      <Score text={12345678} />
      <Score text={'40×  1'} />
      <Score text={'40× 10'} />
      <Score text={'40×100'} />
    </VStack>
  );
};
