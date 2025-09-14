import type { Root, Data } from "mdast";
import type {} from "remark-rehype";

export const remarkDepth = () => {
  return (tree: Root) => {
    tree.children.reduce((depth, node) => {
      if (node.type === "heading") {
        const index = node.depth;
        if (index) {
          return Number(index);
        }
      }
      const data = node.data as Data;
      data.hProperties = {};
      node.data = {
        ...data,
        hProperties: {
          ...data?.hProperties,
          "data-depth": depth,
        },
      };
      return depth;
    }, 0);
  };
};
