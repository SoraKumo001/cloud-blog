import styled from "./LinkTarget.module.css";
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
  return <div className={styled.root} id={id} />;
};
