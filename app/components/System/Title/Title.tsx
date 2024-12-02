import React, { FC, ReactNode, useMemo } from "react";
import { Head } from "@/components/Commons/Head";
import { useEnv } from "@/components/Provider/EnvProvider";
import { useSystemQuery } from "@/generated/graphql";
import { useSelector } from "@/libs/client/context";

interface Props {
  image?: string | null;
  children?: ReactNode;
}

/**
 * Title
 *
 * @param {Props} { }
 */
export const Title: FC<Props> = ({ image, children }) => {
  const [{ data }] = useSystemQuery();
  const host = useSelector((state: { host?: string }) => state.host);
  const env = useEnv();
  const OGP_URL = env["NEXT_PUBLIC_OGP_URL"];
  const IMAGE_URL = env["NEXT_PUBLIC_IMAGE_URL"];
  const subTitle = useMemo(() => {
    return React.Children.map(children, (c) =>
      typeof c === "object" ? "" : c
    )?.join("");
  }, [children]);
  if (!data) return null;
  const systemTitle = data.findUniqueSystem.title;
  const systemDescription = data.findUniqueSystem.description;
  const title = (subTitle || "") + ` | ${systemTitle}`;
  const ogpUrl = OGP_URL ?? `${host}/api/og`;
  const imageUrl = [
    `${ogpUrl}?title=${encodeURIComponent(subTitle || "")}`,
    `name=${encodeURIComponent(systemTitle)}`,
    image ? `image=${encodeURIComponent(image)}` : [],
  ]
    .flat()
    .join("&");
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={systemDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={systemDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content={"summary_large_image"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={systemDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};
