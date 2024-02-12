import { Decorator } from "@/storybook";
import { NotificationContainer } from ".";

const StoryInfo = {
  title: "Components/System/Notification/NotificationContainer",
  decorators: [Decorator],
  component: NotificationContainer,
};
export default StoryInfo;

export const Primary = (args: Parameters<typeof NotificationContainer>[0]) => (
  <>
    <NotificationContainer {...args}></NotificationContainer>
  </>
);
Primary.args = {} as Parameters<typeof NotificationContainer>[0];

Primary.parameters = {};
