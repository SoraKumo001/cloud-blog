import { InputHTMLAttributes, forwardRef } from "react";
import { FieldSet } from "../FieldSet";
import { classNames } from "@/libs/client/classNames";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  className?: string;
  inputClassName?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
};

/**
 * TextField
 *
 * @param {Props} { }
 */

export const TextField = forwardRef<HTMLInputElement, Props>(
   
  ({ className, inputClassName, label, size, ...props }, ref) => {
    return (
      <FieldSet
        className={classNames("focus-within:border-primary", className)}
        label={label}
      >
        <input
          {...props}
          className={classNames("w-full outline-none", inputClassName)}
          ref={ref}
        />
      </FieldSet>
    );
  }
);

TextField.displayName = "TextField";
