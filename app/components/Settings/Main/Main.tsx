import { Link } from "react-router";
import type { FC } from "react";

interface Props {}

/**
 * Main
 *
 * @param {Props} { }
 */
export const Main: FC<Props> = ({}) => {
  return (
    <div className="h-full overflow-auto">
      <div className="m-auto grid max-w-2xl gap-8 pt-8">
        <h1 className="mb-8 border-b text-xl">システム設定</h1>
        <div className="grid gap-4">
          <Link className="block rounded border p-4" to="/settings/system">
            サイト設定
          </Link>
          <Link className="block rounded border p-4" to="/settings/category">
            カテゴリ設定
          </Link>
          <Link className="block rounded border p-4" to="/settings/backup">
            バックアップ/リストア
          </Link>
        </div>
      </div>
    </div>
  );
};
