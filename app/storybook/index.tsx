import "@/styles/globals.scss";
import "./storybook.scss";
import { FunctionComponent } from "react";

export const Decorator = (Story: FunctionComponent) => {
  return (
    <div
      style={{
        width: "1024px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Story />
    </div>
  );
};
