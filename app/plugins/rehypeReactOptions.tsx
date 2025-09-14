import { Highlight, themes } from "prism-react-renderer";
import prod from "react/jsx-runtime";
import type { ComponentProps } from "react";
import type { Options as RehypeReactOptions } from "rehype-react";
import { classNames } from "~/libs/client/classNames";

export const rehypeReactOptions: RehypeReactOptions = {
  ...prod,
  components: {
    code({
      ref,
      children,
      ...props
    }: ComponentProps<"code"> & {
      "data-language": string;
      "data-line": number;
      "data-inline-code": boolean;
    }) {
      if (props["data-inline-code"]) {
        return <code {...props}>{children}</code>;
      }
      return (
        <div {...props}>
          <Highlight
            theme={themes.shadesOfPurple}
            code={String(children)}
            language={props["data-language"] ?? "txt"}
          >
            {({ style, tokens, getLineProps, getTokenProps }) => {
              const numberWidth = Math.floor(Math.log10(tokens.length)) + 1;
              return (
                <div
                  style={style}
                  className="overflow-x-auto rounded font-mono"
                >
                  {tokens.slice(0, -1).map((line, i) => (
                    <div
                      key={i}
                      {...getLineProps({ line })}
                      data-line={Number(props["data-line"] ?? 0) + i + 1}
                    >
                      <span
                        className={`sticky left-0 z-10 inline-block bg-blue-900 px-2 text-gray-300 select-none`}
                      >
                        <span
                          className="inline-block text-right"
                          style={{ width: `${numberWidth}ex` }}
                        >
                          {i + 1}
                        </span>
                      </span>
                      <span>
                        {line.map((token, key) => (
                          <span
                            key={key}
                            {...getTokenProps({ token })}
                            className={classNames(
                              getTokenProps({ token }).className
                            )}
                          />
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }}
          </Highlight>
        </div>
      );
    },
  },
};
