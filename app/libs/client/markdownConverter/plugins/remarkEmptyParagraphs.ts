import type { Root as MdastRoot, RootContent } from "mdast";
import type { Plugin } from "unified";

/**
 *  空白行をbreakに変換する
 */
export const remarkEmptyParagraphs: Plugin = () => {
  return (tree: MdastRoot) => {
    const lastLine = (tree.position?.end.line ?? 0) + 1;
    tree.children = tree.children.flatMap((node, index) => {
      const start = tree.children[index + 1]?.position?.start.line ?? lastLine;
      const end = node.position?.end.line;
      if (typeof start === "undefined" || typeof end === "undefined")
        return [node];
      const length = start - end - 1;
      if (length > 0) {
        return [
          node,
          ...Array(length)
            .fill(null)
            .map<RootContent>((_, index) => ({
              type: "paragraph",
              position: {
                start: {
                  offset: end + index + 1,
                  line: (node.position?.end?.line ?? 0) + index + 1,
                  column: 1,
                },
                end: {
                  offset: end + index + 1,
                  line: (node.position?.end?.line ?? 0) + index + 1,
                  column: 1,
                },
              },
              children: [{ type: "break" }],
            })),
        ];
      }
      return [node];
    });
  };
};
