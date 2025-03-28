import { Highlight, themes } from "prism-react-renderer";
import { ElementType, Fragment, ReactNode, useMemo } from "react";
import { Link } from "react-router";
import { Image } from "@/components/Commons/Image";
import { LinkTarget } from "@/components/Commons/LinkTarget";
import { useFirebaseUrl } from "@/hooks/useFirebaseUrl";
import {
  MarkdownComponents,
  VNode,
  createProcessor,
} from "@/libs/client/MarkdownCompiler";

const FirebaseImage = ({
  src,
  alt,
  edit,
  ...props
}: {
  src: string;
  alt?: string;
  edit?: boolean;
} & React.HTMLAttributes<HTMLElement> &
  React.Attributes) => {
  const getFirebaseUrl = useFirebaseUrl();
  const isOptimize = !src.match(/https?:/);
  const url = isOptimize ? getFirebaseUrl(src) : src;

  try {
    const styleString = alt?.match(/^{.*}$/);
    const style = styleString ? JSON.parse(alt ?? "") : {};
    return edit ? (
      <img
        {...props}
        src={url}
        width={style.width && parseInt(style.width)}
        height={style.height && parseInt(style.height)}
        alt={alt}
      />
    ) : (
      <Image
        src={url}
        width={style.width && parseInt(style.width)}
        height={style.height && parseInt(style.height)}
        alt={alt}
        isOptimize={isOptimize}
      />
    );
  } catch {}
  return <img {...props} src={src} alt={alt} />;
};

const components = (edit?: boolean): MarkdownComponents => ({
  heading: ({ node, children, property, props }) => {
    const Tag: ElementType = ("h" + (node.depth + 1)) as "h1";
    const index = (property as { headerCount?: number }).headerCount ?? 0;
    property.headerCount = index + 1;
    return (
      <Fragment
        {...props}
        key={`${node.position?.start.line}-${node.position?.start.column}`}
      >
        <LinkTarget id={`header-${index}`} />
        <Tag>{children}</Tag>
      </Fragment>
    );
  },
  link({ node, children, props }) {
    const href = node.url;
    if (href?.match(/^https:\/\/codepen.io\//)) {
      return (
        <iframe
          loading="lazy"
          allowFullScreen={true}
          // allowTransparency={true}
          src={href.replace("/pen/", "/embed/")}
        />
      );
    }
    return (
      <Link
        {...props}
        to={href ?? ""}
        target={href?.match(/https?:/) ? "_blank" : undefined}
        key={`${node.position?.start.line}-${node.position?.start.column}`}
      >
        {children}
      </Link>
    );
  },
  image({ node, props }) {
    return (
      <FirebaseImage
        {...props}
        data-sourcepos={node.position?.start.line ?? 0}
        key={props.key}
        src={node.url}
        alt={node.alt ?? ""}
        edit={edit}
      />
    );
  },
  code({ node, children, props }) {
    return (
      <div
        {...props}
        className="overflow-hidden font-mono"
        key={node.position?.start.line ?? 0}
      >
        <Highlight
          theme={themes.shadesOfPurple}
          code={String(children)}
          language={node.lang ?? "txt"}
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style} className="rounded p-1">
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  data-sourcepos={(node.position?.start.line ?? 0) + i + 1}
                >
                  <span className={`mr-2 inline-block w-10 text-right text-gray-300 select-none`}>
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    );
  },
});

export const useMarkdown = (value?: string, edit?: boolean) => {
  const processor = useMemo(() => createProcessor(components(edit)), [edit]);
  return useMemo(() => {
    if (value === undefined) return [];
    return processor(value) as unknown as [ReactNode, VNode];
  }, [processor, value]);
};
