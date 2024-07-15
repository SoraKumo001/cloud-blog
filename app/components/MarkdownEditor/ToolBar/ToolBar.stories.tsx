import { Meta, StoryObj } from '@storybook/react';
import { ToolBar } from '.';
import { Decorator } from '@/storybook';

const meta: Meta<typeof ToolBar> = {
  component: ToolBar,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof ToolBar> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
