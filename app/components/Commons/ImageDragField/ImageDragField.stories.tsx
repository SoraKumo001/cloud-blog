import { Meta, StoryObj } from '@storybook/react';
import { ImageDragField } from '.';
import { Decorator } from '@/storybook';

const meta: Meta<typeof ImageDragField> = {
  component: ImageDragField,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof ImageDragField> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
