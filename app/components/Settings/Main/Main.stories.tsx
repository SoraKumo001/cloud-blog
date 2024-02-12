import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { Main } from '.';

const meta: Meta<typeof Main> = {
  component: Main,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof Main> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
