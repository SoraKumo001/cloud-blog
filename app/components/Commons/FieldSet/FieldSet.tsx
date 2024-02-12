import { FC, HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/libs/client/classNames";

interface Props extends HTMLAttributes<HTMLFieldSetElement> {
  label?: string;
  children?: ReactNode;
}

/**
 * FieldSet
 *
 * @param {Props} { }
 */
export const FieldSet: FC<Props> = ({
  className,
  label,
  children,
  ...props
}) => {
  return (
    <fieldset
      {...props}
      className={classNames("border rounded overflow-hidden px-2", className)}
    >
      {label && (
        <legend className="px-2 text-neutral-500 text-xs leading-none">
          {label}
        </legend>
      )}
      {children}
    </fieldset>
  );
};
