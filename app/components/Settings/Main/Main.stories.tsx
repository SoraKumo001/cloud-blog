import { Meta, StoryObj } from '@storybook/react';
import { Main } from '.';
import { Decorator } from '@/storybook';

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
