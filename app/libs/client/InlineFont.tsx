import { useRef, type FC } from "react";

type FontProperty = {
  isLoaded?: boolean;
  data?: string;
  promise?: Promise<void>;
};

const isServer = typeof window === "undefined";

const StyleRender: FC<{
  property: FontProperty;
  href: string;
}> = ({ property, href }) => {
  if (isServer && !property.isLoaded) throw property.promise;
  return (
    <style
      type="text/css"
      id={encodeURI(href)}
      dangerouslySetInnerHTML={{ __html: property.data ?? "" }}
    />
  );
};

export const InlineFont: FC<{ href: string }> = ({ href }) => {
  const property = useRef<FontProperty>({}).current;
  if (!property.isLoaded) {
    if (isServer) {
      if (!property.promise) {
        property.promise = fetch(href, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0",
          },
          cf: {
            cacheTtl: 3000,
            cacheEverything: true,
          },
        })
          .then(async (v) => {
            property.data = await v.text();
          })
          .finally(() => {
            property.isLoaded = true;
          });
      }
    } else {
      property.isLoaded = true;
      const node = document.querySelector(
        `style[type="text/css"][id="${encodeURI(href)}"]`
      );
      property.data = node?.textContent || "";
    }
  }
  return <StyleRender href={href} property={property} />;
};
