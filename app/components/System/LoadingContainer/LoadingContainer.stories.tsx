import { Decorator } from "@/storybook";
import { LoadingContainer } from ".";

const StoryInfo = {
  title: "Components/System/LoadingContainer",
  decorators: [Decorator],
  component: LoadingContainer,
};
export default StoryInfo;

export const Primary = (args: Parameters<typeof LoadingContainer>[0]) => (
  <>
    <LoadingContainer {...args}></LoadingContainer>
  </>
);
Primary.args = {} as Parameters<typeof LoadingContainer>[0];

Primary.parameters = {};
