import { type FC, type ReactNode, useState } from "react";
import { MdExpandMore as ExpandIcon } from "react-icons/md";
import { Popup } from "../Popup";
import { classNames } from "@/libs/client/classNames";

interface Props {
  className: string;
  children?: ReactNode;
  items?: ReactNode[];
}

/**
 * MultiSelect
 *
 * @param {Props} { }
 */
export const MultiSelect: FC<Props> = ({ className, children, items }) => {
  const [isExpand, setExpand] = useState(false);
  return (
    <div className={classNames("border rounded p-2", className)}>
      <div
        className="mt-1 flex cursor-pointer items-center"
        onClick={() => setExpand(true)}
      >
        <div className="flex-1">{children}</div>
        <ExpandIcon />
      </div>
      <Popup
        posX="full"
        isOpen={isExpand}
        onClose={() => {
          setExpand(false);
        }}
      >
        <div className="gap-0.5 rounded bg-white p-2 shadow">
          {items?.map((item, index) => (
            <div
              className={`
                hover:text-primary
                cursor-pointer rounded p-1
              `}
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </Popup>
    </div>
  );
};
