import { Meta } from '@storybook/react';
import { Decorator } from '@/storybook';
import { Categories } from '.';

const meta: Meta<typeof Categories> = {
  component: Categories,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

// export const Primary: StoryObj<typeof Categories> = {
//   //  args:{},
//   //  play: async ({ canvasElement }) => {},
// };
