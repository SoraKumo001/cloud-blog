import { Meta, StoryObj } from '@storybook/react';
import { Header } from '.';
import { Decorator } from '@/storybook';

const meta: Meta<typeof Header> = {
  component: Header,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof Header> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
