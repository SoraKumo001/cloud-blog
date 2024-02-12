import { remark } from 'remark';
import type { Root } from 'mdast';

export const getImages = async (content: string) => {
  const processor = remark();
  const tree = processor().parse(content);

  const grep = /^https?:\/\//i;
  const getImage = (nodes: Root['children']): string[] => {
    return nodes.flatMap((node) => {
      return 'children' in node
        ? getImage(node.children)
        : node.type === 'image' && node.url && !grep.test(node.url)
        ? node.url
        : [];
    });
  };

  return Array.from(new Set(getImage(tree.children)));
};
