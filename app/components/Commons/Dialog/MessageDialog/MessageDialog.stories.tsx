import { Meta, StoryObj } from "@storybook/react";
import { MessageDialog } from ".";
import { Decorator } from "@/storybook";

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
