import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { TopPage } from '.';

const meta: Meta<typeof TopPage> = {
  component: TopPage,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof TopPage> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
