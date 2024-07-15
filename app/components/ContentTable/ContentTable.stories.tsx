import { Meta, StoryObj } from '@storybook/react';
import { ContentTable } from '.';
import { Decorator } from '@/storybook';

const meta: Meta<typeof ContentTable> = {
  component: ContentTable,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof ContentTable> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
