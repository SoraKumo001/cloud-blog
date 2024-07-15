import { Meta, StoryObj } from '@storybook/react';
import { Title } from '.';
import { Decorator } from '@/storybook';

const meta: Meta<typeof Title> = {
  component: Title,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof Title> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
