import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { ToolBar } from '.';

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
