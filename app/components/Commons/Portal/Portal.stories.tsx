import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { Portal } from '.';

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
