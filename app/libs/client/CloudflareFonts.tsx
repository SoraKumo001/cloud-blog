import { useRef, type FC } from "react";

type FontProperty = {
  isLoaded?: boolean;
  isData?: boolean;
};

const isServer = typeof window === "undefined";

export const CloudflareFonts: FC<{ href: string | string[] }> = ({ href }) => {
  const property = useRef<FontProperty>({}).current;
  if (!property.isLoaded && !isServer) {
    property.isLoaded = true;
    const nodes = document.querySelectorAll("head style[type='text/css']");
    property.isData = Array.from(nodes).some((v) =>
      v.textContent?.includes("url(/cf-fonts/")
    );
  }
  if (!property.isData) {
    const urls = Array.isArray(href) ? href : [href];
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {urls.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </>
    );
  }
  return null;
};
