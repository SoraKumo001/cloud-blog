import { Meta, StoryObj } from '@storybook/react';
import { FieldSet } from '.';
import { Decorator } from '@/storybook';

const meta: Meta<typeof FieldSet> = {
  component: FieldSet,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof FieldSet> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
