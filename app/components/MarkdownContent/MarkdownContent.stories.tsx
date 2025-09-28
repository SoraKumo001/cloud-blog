import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownContent } from ".";
import { Decorator } from "@/storybook";

const meta: Meta<typeof MarkdownContent> = {
  decorators: [Decorator],
  component: MarkdownContent,
};
export default meta;

export const Primary: StoryObj<typeof MarkdownContent> = {
  //  args:{},
  //  play: async ({ canvasElement }) => {},
};
