import { Link } from "react-router";
import { FC } from "react";
import styled from "./Main.module.css";

interface Props {}

/**
 * Main
 *
 * @param {Props} { }
 */
export const Main: FC<Props> = ({}) => {
  return (
    <div className={styled.root}>
      <div className="m-auto grid max-w-2xl gap-8 pt-8">
        <h1>システム設定</h1>
        <div className={styled.items}>
          <Link className={styled.link} to="/settings/system">
            サイト設定
          </Link>
          <Link className={styled.link} to="/settings/category">
            カテゴリ設定
          </Link>
          <Link className={styled.link} to="/settings/backup">
            バックアップ/リストア
          </Link>
        </div>
      </div>
    </div>
  );
};
