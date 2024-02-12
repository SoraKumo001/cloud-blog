import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { Header } from '.';

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
