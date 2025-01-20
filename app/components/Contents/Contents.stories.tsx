import type { Meta, StoryObj } from "@storybook/react";
import { Contents } from ".";
import { Decorator } from "@/storybook";

const meta: Meta<typeof Contents> = {
	component: Contents,
	decorators: [Decorator],
	parameters: {},
	args: {},
};
export default meta;

export const Primary: StoryObj<typeof Contents> = {
	//  args:{},
	//  play: async ({ canvasElement }) => {},
};
