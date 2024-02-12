import { Decorator } from "@/storybook";
import { LinkTarget } from ".";

const StoryInfo = {
  title: "Components/Commons/LinkTarget",
  decorators: [Decorator],
  component: LinkTarget,
};
export default StoryInfo;

export const Primary = (args: Parameters<typeof LinkTarget>[0]) => (
  <>
    <LinkTarget {...args}></LinkTarget>
  </>
);
Primary.args = {} as Parameters<typeof LinkTarget>[0];

Primary.parameters = {};
