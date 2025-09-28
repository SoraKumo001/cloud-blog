import type { Root } from "mdast";
import type { Plugin } from "unified";

export const remarkDepth: Plugin = () => {
  return (tree: Root) => {
    tree.children.reduce((depth, node) => {
      if (node.type === "heading") {
        const index = node.depth;
        if (index) {
          return Number(index);
        }
      }
      node.data = {
        ...node.data,
        hProperties: {
          ...node.data?.hProperties,
          "data-depth": depth,
        },
      };
      return depth;
    }, 0);
  };
};
