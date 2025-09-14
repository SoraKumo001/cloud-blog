import { MdRefresh as IconRefresh } from "react-icons/md";

import styled from "./LoadingContainer.module.css";
import type { FC } from "react";
import { useSelector } from "~/libs/client/context";

interface Props {}

/**
 * LoadingContainer
 *
 * @param {Props} { }
 */
export const LoadingContainer: FC<Props> = ({}) => {
  const loading = useSelector((v: { loading?: number }) => v.loading);
  return loading ? (
    <div className={styled.root}>
      <IconRefresh />
    </div>
  ) : null;
};
