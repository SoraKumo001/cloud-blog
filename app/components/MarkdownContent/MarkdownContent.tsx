import css from "./MarkdownContent.css?inline";
import type { FC, ReactNode } from "react";
import { classNames } from "~/libs/client/classNames";
import { MarkdownProvider } from "~/libs/client/markdownConverter";

interface Props {
  className?: string;
  onClick?: (line: number, offset: number) => void;
  children?: ReactNode;
  line?: number;
  edit?: boolean;
}

/**
 * MarkdownContent
 *
 * @param {Props} { }
 */
export const MarkdownContent: FC<Props> = ({
  className,
  onClick,
  children,
  line,
  edit,
}) => {
  return (
    <MarkdownProvider edit={edit}>
      <style>{css}</style>
      <div
        className={classNames("markdown", className)}
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
    </MarkdownProvider>
  );
};
