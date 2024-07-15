import { Meta } from '@storybook/react';
import { Editor } from '.';
import { Decorator } from '@/storybook';

const meta: Meta<typeof Editor> = {
  component: Editor,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

// export const Primary: StoryObj<typeof Editor> = {
//   //  args:{},
//   //  play: async ({ canvasElement }) => {},
// };
