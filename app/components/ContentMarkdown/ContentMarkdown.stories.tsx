import { Meta, StoryObj } from '@storybook/react';
import { ContentMarkdown } from '.';
import { Decorator } from '@/storybook';

const meta: Meta<typeof ContentMarkdown> = {
  decorators: [Decorator],
  component: ContentMarkdown,
};
export default meta;

export const Primary: StoryObj<typeof ContentMarkdown> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
