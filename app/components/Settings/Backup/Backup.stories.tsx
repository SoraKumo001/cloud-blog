import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { Backup } from '.';

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
