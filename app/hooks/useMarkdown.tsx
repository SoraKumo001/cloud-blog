import { Link } from "@remix-run/react";
import { ElementType, Fragment, HTMLProps, ReactNode, useMemo } from "react";
import { PrismAsync } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
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
  ...props
}: { src: string; alt?: string } & React.HTMLAttributes<HTMLElement> &
  React.Attributes) => {
  const getFirebaseUrl = useFirebaseUrl();
  const url = src.match(/https?:/) ? src : getFirebaseUrl(src);

  try {
    const styleString = alt?.match(/^{.*}$/);
    const style = styleString ? JSON.parse(alt ?? "") : {};
    return (
      <Image
        src={url}
        width={style.width && parseInt(style.width)}
        height={style.height && parseInt(style.height)}
        alt={alt}
      />
    );
  } catch {}
  return <img {...props} src={src} alt={alt} />;
};

const components: MarkdownComponents = {
  heading: ({ node, children, property, props }) => {
    const Tag: ElementType = ("h" + (node.depth + 1)) as "h1";
    const index = (property as { headerCount?: number }).headerCount ?? 0;
    property.headerCount = index + 1;
    return (
      <Fragment {...props}>
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
      >
        {children}
      </Link>
    );
  },
  image({ node, props }) {
    return (
      <FirebaseImage
        {...props}
        key={props.key}
        src={node.url}
        alt={node.alt ?? ""}
      />
    );
  },
  code({ node, children, props }) {
    const pos = node.position;
    return (
      <div {...props} className="overflow-hidden">
        <PrismAsync
          language={node.lang ?? "txt"}
          style={{ ...darcula }}
          wrapLines={true}
          PreTag="div"
          lineProps={(number) =>
            ({
              "data-sourcepos": number + (pos?.start.line ?? 0),
            } as HTMLProps<HTMLElement>)
          }
        >
          {String(children).replace(/\n$/, "")}
        </PrismAsync>
      </div>
    );
  },
};

export const useMarkdown = (value?: string) => {
  const processor = useMemo(() => createProcessor(components), []);
  return useMemo(() => {
    if (value === undefined) return [];
    return processor(value) as unknown as [ReactNode, VNode];
  }, [processor, value]);
};
