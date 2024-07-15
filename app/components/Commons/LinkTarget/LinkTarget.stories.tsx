import { LinkTarget } from ".";
import { Decorator } from "@/storybook";

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
