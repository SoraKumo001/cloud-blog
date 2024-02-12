import { Meta, StoryObj } from '@storybook/react';
import { Decorator } from '@/storybook';
import { ContentMarkdown } from '.';

const meta: Meta<typeof ContentMarkdown> = {
  decorators: [Decorator],
  component: ContentMarkdown,
};
export default meta;

export const Primary: StoryObj<typeof ContentMarkdown> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
