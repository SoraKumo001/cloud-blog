import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { Separator } from '.';

const meta: Meta<typeof Separator> = {
  component: Separator,
  decorators: [Decorator],
  parameters: {},
  args: { children: ['test1', 'test2'] },
};
export default meta;

export const Primary: StoryObj<typeof Separator> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
