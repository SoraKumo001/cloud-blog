import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { SiteSetting } from '.';

const meta: Meta<typeof SiteSetting> = {
  component: SiteSetting,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof SiteSetting> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
