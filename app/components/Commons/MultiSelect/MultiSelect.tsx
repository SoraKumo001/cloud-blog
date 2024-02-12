import { FC, ReactNode, useState } from "react";
import { MdExpandMore as ExpandIcon } from "react-icons/md";
import { classNames } from "@/libs/client/classNames";
import { Popup } from "../Popup";

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
        className="mt-1 flex items-center cursor-pointer"
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
        <div className="bg-white p-2 shadow rounded gap-0.5">
          {items?.map((item, index) => (
            <div
              className="cursor-pointer hover:text-primary p-1 rounded"
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
