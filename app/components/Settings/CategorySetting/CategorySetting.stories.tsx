import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { CategorySetting } from '.';

const meta: Meta<typeof CategorySetting> = {
  component: CategorySetting,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof CategorySetting> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
