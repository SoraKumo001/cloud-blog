import { Button } from "react-daisyui";
import type { FC, ReactNode } from "react";
import { classNames } from "@/libs/client/classNames";

interface Props {
  isOpen: boolean;
  onResult?: (result: boolean) => void;
  children: ReactNode;
}

/**
 * MessageDialog
 *
 * @param {Props} { }
 */
export const MessageDialog: FC<Props> = ({ isOpen, onResult, children }) => {
  return (
    <dialog className={classNames("modal", isOpen && "modal-open")}>
      <div className="modal-backdrop" onClick={() => onResult?.(false)} />
      <div className="modal-box">
        <div className="modal-top">{children}</div>
        <div className="modal-action">
          <Button
            type="button"
            onClick={() => onResult?.(true)}
            aria-label="yes"
          >
            Yes
          </Button>
          <Button
            type="button"
            onClick={() => onResult?.(false)}
            aria-label="no"
          >
            No
          </Button>
        </div>
      </div>
    </dialog>
  );
};
