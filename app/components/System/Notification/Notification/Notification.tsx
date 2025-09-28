import React from "react";
import { MdInfoOutline as IconInfo } from "react-icons/md";
import css from "./Notification.css?inline";
import type { AnimationEventHandler, FC } from "react";
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
    <div
      className="fixed bottom-8 z-10 flex w-screen justify-center"
      onAnimationEnd={onAnimationEnd}
    >
      <style>{css}</style>
      <div className="flex min-h-[1em] min-w-[640px] animate-[slideIn_3s_1_forwards] items-center rounded-lg border border-gray-300 bg-black/50 px-4 py-2 text-white">
        <IconInfo />
        {children}
      </div>
    </div>
  );
};
