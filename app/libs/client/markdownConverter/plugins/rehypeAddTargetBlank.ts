import { visit } from "unist-util-visit";
import type { Root } from "hast";
import type { Plugin } from "unified";

export const rehypeAddTargetBlank: Plugin = () => {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (
        node.tagName === "a" &&
        typeof node.properties?.href === "string" &&
        node.properties.href[0] !== "#"
      ) {
        node.properties.target = "_blank";
        node.properties.rel = "noopener noreferrer";
      }
    });
  };
};
