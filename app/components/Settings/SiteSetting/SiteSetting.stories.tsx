import type { Meta, StoryObj } from "@storybook/react";
import { SiteSetting } from ".";
import { Decorator } from "@/storybook";

const meta: Meta<typeof SiteSetting> = {
  component: SiteSetting,
  decorators: [Decorator],
  parameters: {},
  args: {},
};
export default meta;

export const Primary: StoryObj<typeof SiteSetting> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
