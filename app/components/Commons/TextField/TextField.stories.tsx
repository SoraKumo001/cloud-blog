import { Meta, StoryObj } from '@storybook/react';
import { TextField } from '.';
import { Decorator } from '@/storybook';

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
