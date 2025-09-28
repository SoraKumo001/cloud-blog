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
 *  Header内の文字列をIDとして埋め込み、リンクを作成
 */
export const remarkHeadingId: Plugin = () => {
  return (tree: Root) => {
    visit(tree, "heading", (node) => {
      const id = getNodeText(node);
      node.data = { hProperties: { id } };
      node.children = [
        ...node.children,
        {
          type: "link",
          children: [{ type: "text", value: "🔗" }],
          url: `#${id}`,
          data: { hProperties: { className: "inner-link" } },
        },
      ];
    });
  };
};
