import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { Contents } from '.';

const meta: Meta<typeof Contents> = {
  component: Contents,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof Contents> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
