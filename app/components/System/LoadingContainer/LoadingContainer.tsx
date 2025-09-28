import { MdRefresh as IconRefresh } from "react-icons/md";

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
    <div className="fixed right-4 bottom-4 flex rounded-full bg-gray-300 p-1 opacity-80">
      <IconRefresh className="h-16 w-16 animate-spin" />
    </div>
  ) : null;
};
