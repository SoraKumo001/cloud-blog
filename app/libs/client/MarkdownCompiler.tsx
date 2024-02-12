import React, {
  Attributes,
  Children,
  createElement,
  Fragment,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from 'react';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import type { RootContent } from 'mdast';
import type unist from 'unist';

export type VNode = RootContent & Partial<unist.Parent>;

export type MarkdownComponents = {
  [K in RootContent['type'] | 'root']?: (params: {
    node: RootContent & { type: K };
    props: HTMLAttributes<HTMLElement> & Attributes;
    children: ReactNode;
    property: { [key: string]: unknown };
  }) => ReactNode;
};

const defaultComponents: MarkdownComponents = {
  root: ({ children, props }) => createElement('div', props, children),
  break: ({ props }) => createElement('br', props),
  heading: ({ children, node, props }) => createElement('h' + (node.depth + 1), props, children),
  strong: ({ children, props }) => createElement('strong', props, children),
  emphasis: ({ children, props }) => createElement('em', props, children),
  inlineCode: ({ children, props }) => createElement('em', props, children),
  code: ({ children, props }) => createElement('code', props, children),
  link: ({ children, props }) => createElement('span', props, children),
  image: ({ node, props }) => <img {...props} src={node.url} alt={node.alt ?? undefined} />,
  list: ({ children, props }) => createElement('ul', props, children),
  listItem: ({ children, props }) => createElement('li', props, children),
  html: ({ node, props }) => <span {...props} dangerouslySetInnerHTML={{ __html: node.value }} />,
  table: ({ children, node, props }) => (
    <table {...props}>
      <tbody>
        {Children.toArray(children).map((tr, rows) =>
          isValidElement(tr) && tr.type === 'tr' ? (
            <tr key={tr.key} {...tr.props}>
              {Children.toArray(tr.props.children).map((td, cols) =>
                isValidElement(td) && td.type === 'td' ? (
                  rows === 0 ? (
                    <th key={td.key} {...td.props} style={{ textAlign: node.align?.[cols] }} />
                  ) : (
                    <td key={td.key} {...td.props} style={{ textAlign: node.align?.[cols] }} />
                  )
                ) : (
                  td
                )
              )}
            </tr>
          ) : (
            tr
          )
        )}
      </tbody>
    </table>
  ),
  tableRow: ({ children, props }) => createElement('tr', props, children),
  tableCell: ({ children, props }) => createElement('td', props, children),
  delete: ({ children, props }) => createElement('del', props, children),
  paragraph: ({ children, props }) => createElement('p', props, children),
  blockquote: ({ children, props }) => createElement('span', props, children),
  text: ({ node, props: { key } }) => (
    <Fragment key={key}>
      {node.value.split(/(\n)/g).map((v, index) =>
        (index & 1) === 0 ? (
          <span
            key={`${key}-${index}${v}`}
            data-sourcepos={(node.position?.start.line ?? 0) + index / 2}
          >
            {v}
          </span>
        ) : (
          <br key={`${key}-${index}`} />
        )
      )}
    </Fragment>
  ),
};

function ReactCompiler(tree: unist.Node & Partial<unist.Parent>, components?: MarkdownComponents) {
  const property = {};
  const reactNode = (vnode: VNode): React.ReactNode => {
    const children =
      vnode.children?.map((child) => reactNode(child as VNode)) ??
      ('value' in vnode && vnode.value);
    const markdownContent = components?.[vnode.type] ?? defaultComponents[vnode.type];
    if (!markdownContent) console.warn(vnode.type);
    return markdownContent?.({
      node: vnode,
      property,
      props: {
        key: `${vnode.position?.start.line}-${vnode.position?.start.column}`,
      },
      children: children ?? null,
      'data-sourcepos':
        (vnode.type as string) === 'root' ? undefined : vnode.position?.start.line ?? 0,
    } as never);
  };

  tree.children = tree.children?.flatMap((node, index, array) => {
    const beforeLine = array[index - 1]?.position?.end.line;
    const nowLine = node.position?.start.line;
    if (index === 0 || !beforeLine || !nowLine) return node;
    const count = nowLine - beforeLine - 1;
    return [
      ...Array(count)
        .fill(null)
        .map((_, index) => ({
          type: 'paragraph',
          position: {
            start: { column: 1, line: beforeLine + index + 1, offset: 0 },
            end: { column: 1, line: beforeLine + index + 1, offset: 0 },
          },
          children: [
            {
              type: 'text',
              value: '',
              position: {
                start: { column: 1, line: beforeLine + index + 1, offset: 0 },
                end: { column: 1, line: beforeLine + index + 1, offset: 0 },
              },
            },
          ],
        })),
      node,
    ];
  });
  return [reactNode(tree as VNode), tree];
}
export const createProcessor = (option?: MarkdownComponents) => {
  const processor = remark().use(remarkGfm);
  return (file: string) => {
    const tree = processor.parse(file);
    return ReactCompiler(tree, option);
  };
};
