import { useRef, type FC } from "react";

type FontProperty = {
  isLoaded?: boolean;
  data?: string;
};

const isServer = typeof window === "undefined";

export const CloudflareFonts: FC<{ href: string }> = ({ href }) => {
  const property = useRef<FontProperty>({}).current;

  if (!property.isLoaded && !isServer) {
    property.isLoaded = true;
    const node = document.querySelector(
      "head style[type='text/css']:last-of-type"
    );
    const contents = node?.textContent || "";
    if (contents.includes("url(/cf-fonts/")) {
      property.data = contents;
    }
  }
  if (!property.data) {
    return <link rel="stylesheet" href={href} />;
  }
  return (
    <style
      type="text/css"
      dangerouslySetInnerHTML={{ __html: property.data }}
    />
  );
};
