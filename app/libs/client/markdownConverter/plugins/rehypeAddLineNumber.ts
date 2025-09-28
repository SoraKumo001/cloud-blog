import { visit } from "unist-util-visit";
import type { Root } from "hast";
import type { Plugin } from "unified";

/**
 *  各ノードに行番号とカーソル位置の情報を埋め込む
 */
export const rehypeAddLineNumber: Plugin = () => {
  return (tree: Root) => {
    visit(
      tree,
      "element",
      (node) => {
        const start = node.position?.start?.line;
        const end = node.position?.end?.line;
        if (node.tagName === "code") {
        }
        if (start && end && !node.properties["data-inline-code"]) {
          node.properties = {
            ...node.properties,
            ["data-line"]: start,
          };
        }
      },
      true
    );
  };
};
