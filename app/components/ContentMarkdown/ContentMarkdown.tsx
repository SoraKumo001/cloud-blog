import styled from "./ContentMarkdown.module.css";
import type { FC, ReactNode } from "react";

import { classNames } from "~/libs/client/classNames";

interface Props {
  className?: string;
  onClick?: (line: number, offset: number) => void;
  children?: ReactNode;
  line?: number;
}

/**
 * ContentMarkdown
 *
 * @param {Props} { }
 */
export const ContentMarkdown: FC<Props> = ({
  className,
  onClick,
  children,
  line,
}) => {
  return (
    <div
      className={classNames(styled.markdown, className)}
      onClick={(e) => {
        const framePos = e.currentTarget.getBoundingClientRect();
        let node = e.target as HTMLElement | null;
        while (node && !node.dataset.line) {
          node = node.parentElement;
        }
        if (node) {
          const p = node.getBoundingClientRect();
          onClick?.(Number(node.dataset.line), p.top - framePos.top);
        }
      }}
    >
      {line && (
        <style>{`[data-line="${line}"]:not(:has([data-line="${line}"]))::after {
          visibility: visible;
    }`}</style>
      )}
      {children}
    </div>
  );
};
