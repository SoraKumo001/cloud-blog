import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { MultiSelect } from '.';

const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
  decorators: [Decorator],
  parameters: {},
  args: { children: 'test', items: ['test1', 'test2'] },
};
export default meta;

export const Primary: StoryObj<typeof MultiSelect> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
