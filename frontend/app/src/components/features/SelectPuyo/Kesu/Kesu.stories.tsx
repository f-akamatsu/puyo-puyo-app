import type { Meta, StoryObj } from '@storybook/react';
import { Kesu } from './Kesu';

const meta: Meta<typeof Kesu> = {
  component: Kesu,
};

export default meta;
type Story = StoryObj<typeof Kesu>;

export const Basic: Story = () => {
  return <Kesu />;
};

Basic.args = {};
