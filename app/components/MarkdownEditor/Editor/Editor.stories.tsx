import { Meta } from '@storybook/react';
import { Decorator } from '@/storybook';
import { Editor } from '.';

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
