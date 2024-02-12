import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { TextField } from '.';

const meta: Meta<typeof TextField> = {
  component: TextField,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof TextField> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
