import { visit } from "unist-util-visit";
import type { Node, Root } from "mdast";
import type { Plugin } from "unified";

/**
 *  子ノードから文字列を抽出
 */
const getNodeText = (node: Node | Root) => {
  const values: string[] =
    "children" in node
      ? node.children.map((v) =>
          "value" in v && typeof v.value === "string"
            ? v.value
            : getNodeText(v) || ""
        )
      : [];
  return values.join("");
};

/**
 *  codeに言語情報、inlineCodeにインラインフラグを追加
 */
export const remarkCode: Plugin = () => {
  return (tree: Root) => {
    visit(tree, "code", (node) => {
      node.data = { ...node.data, hProperties: { "data-language": node.lang } };
    });
    visit(tree, "inlineCode", (node) => {
      node.data = { ...node.data, hProperties: { "data-inline-code": "true" } };
    });
  };
};
