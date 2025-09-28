import type { FC } from "react";

interface Props {
  id?: string;
}

/**
 * LinkTarget
 *
 * @param {Props} { }
 */
export const LinkTarget: FC<Props> = ({ id }) => {
  return <div className="absolute -m-16" id={id} />;
};
