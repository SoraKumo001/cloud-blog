import { useMemo } from "react";
import { Link } from "react-router";
import { visit } from "unist-util-visit";
import styled from "./ContentTable.module.css";
import type { Root } from "mdast";
import type { FC } from "react";
import { classNames } from "~/libs/client/classNames";

export type MarkdownTitles = { text: string; depth: number }[];

interface Props {
  className?: string;
  tree: Root;
  title?: string;
}

/**
 * ContentTable
 *
 * @param {Props} { }
 */
export const ContentTable: FC<Props> = ({ className, tree, title }) => {
  const headers = useMemo(() => {
    const titles: { id: number; text?: string; depth: number }[] = [];
    const property = { count: 0 };
    visit(tree, "heading", (node) => {
      titles.push({
        id: property.count,
        text: node.data?.hProperties?.id as string | undefined,
        depth: node.depth,
      });
    });
    return titles;
  }, [tree]);
  return (
    <nav className={classNames(styled.root, className)}>
      <div className="border-b text-center font-bold">Index</div>
      <div className="flex-col p-2 text-xs">
        <Link to={`#header-top`} className="break-all">
          {title}
        </Link>
        <ul className="mt-2 flex flex-col gap-1">
          {headers.map(({ id, text, depth }) => (
            <li key={id} style={{ marginLeft: `${depth * 16}px` }}>
              <Link to={`#${text}`}>{text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
