import { FC } from "react";
import styled from "./LinkTarget.module.css";

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
