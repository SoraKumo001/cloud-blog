import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { ContentTable } from '.';

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
