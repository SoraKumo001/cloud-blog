import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { PostList } from '.';

const meta: Meta<typeof PostList> = {
  component: PostList,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof PostList> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
