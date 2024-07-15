import { Meta, StoryObj } from '@storybook/react';
import { Backup } from '.';
import { Decorator } from '@/storybook';

const meta: Meta<typeof Backup> = {
  component: Backup,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof Backup> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
