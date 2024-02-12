import { Meta, StoryObj } from "@storybook/react";
import { Decorator } from "@/storybook";
import { MessageDialog } from ".";

const meta: Meta<typeof MessageDialog> = {
  component: MessageDialog,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof MessageDialog> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
