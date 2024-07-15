import { Meta, StoryObj } from '@storybook/react';
import { Portal } from '.';
import { Decorator } from '@/storybook';

const meta: Meta<typeof Portal> = {
  component: Portal,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof Portal> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
