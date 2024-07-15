import { GoogleAnalytics } from ".";
import { Decorator } from "@/storybook";

const StoryInfo = {
  title: "Components/Commons/GoogleAnalytics",
  decorators: [Decorator],
  component: GoogleAnalytics,
};
export default StoryInfo;

export const Primary = (args: Parameters<typeof GoogleAnalytics>[0]) => (
  <>
    <GoogleAnalytics {...args}></GoogleAnalytics>
  </>
);
Primary.args = {} as Parameters<typeof GoogleAnalytics>[0];

Primary.parameters = {};
