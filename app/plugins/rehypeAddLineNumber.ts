import { visit } from "unist-util-visit";
import type { Root } from "hast";
import type { VFile } from "vfile";

/**
 *  各ノードに行番号とカーソル位置の情報を埋め込む
 */
export const rehypeAddLineNumber = () => {
  return (tree: Root, file: VFile) => {
    visit(tree, "element", (node) => {
      const start = node.position?.start?.line;
      const end = node.position?.end?.line;
      const line = Number(file.data.line);
      if (start && end) {
        node.properties = {
          ...node.properties,
          ["data-line"]: start,
          ["data-active"]: line >= start && line <= end,
        };
      }
    });
  };
};
