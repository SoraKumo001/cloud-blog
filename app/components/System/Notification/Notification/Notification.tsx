import React, { AnimationEventHandler, FC } from "react";
import { MdInfoOutline as IconInfo } from "react-icons/md";
import styled from "./Notification.module.css";
interface Props {
  onClose?: () => void;
  onAnimationEnd?: AnimationEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}

/**
 * Notification
 *
 * @param {Props} { }
 */
export const Notification: FC<Props> = ({ onAnimationEnd, children }) => {
  return (
    <div className={styled.root} onAnimationEnd={onAnimationEnd}>
      <div className={styled.message}>
        <IconInfo />
        {children}
      </div>
    </div>
  );
};
