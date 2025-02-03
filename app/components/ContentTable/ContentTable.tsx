import { FC, useMemo } from "react";
import { Link } from "react-router";

import styled from "./ContentTable.module.css";
import type { Heading } from "mdast";
import { classNames } from "@/libs/client/classNames";
import { VNode } from "@/libs/client/MarkdownCompiler";

export type MarkdownTitles = { text: string; depth: number }[];

interface Props {
  className?: string;
  title: string;
  vnode?: VNode;
}

/**
 * ContentTable
 *
 * @param {Props} { }
 */
export const ContentTable: FC<Props> = ({ className, title, vnode }) => {
  const titles = useMemo(() => {
    return vnode?.children?.flatMap((node) =>
      node.type !== "heading"
        ? []
        : ([[(node as Heading).depth, convertText(node as VNode)]] as const)
    );
  }, [vnode]);
  return (
    <nav className={classNames(styled.root, className)}>
      <div className="border-b text-center font-bold">Index</div>
      <div className="flex-col p-2 text-xs">
        <Link to={`#header-top`} className="break-all">
          {title}
        </Link>
        <ul className="mt-2 flex flex-col gap-1">
          {titles?.map((node, index) => (
            <li
              key={index}
              className="list-disc break-all"
              style={{ marginLeft: `${(node[0] + 1) * 12}px` }}
            >
              <Link to={`#header-${index}`}>{node[1]}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const convertText = (node: VNode): string => {
  if (node.type === "text") return node.value;
  return node.children?.map((n) => convertText(n as VNode)).join("") ?? "";
};
