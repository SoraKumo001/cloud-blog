import { Notification } from ".";
import { Decorator } from "@/storybook";

const StoryInfo = {
  title: "Components/System/Notification/Notification",
  decorators: [Decorator],
  component: Notification,
};
export default StoryInfo;

export const Primary = (args: Parameters<typeof Notification>[0]) => (
  <>
    <Notification {...args}>てすと</Notification>
  </>
);
Primary.args = {} as Parameters<typeof Notification>[0];

Primary.parameters = {};
