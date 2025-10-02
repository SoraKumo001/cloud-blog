import { useMemo } from "react";
import { thumbHashToDataURL } from "thumbhash";
import { useEnv } from "~/components/Provider/EnvProvider";
import { classNames } from "~/libs/client/classNames";
import { fileNameToHash } from "~/libs/client/thumbhash";
type Props = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  isOptimize?: boolean;
};

const useBluerHash = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => {
  return useMemo(() => {
    const hash = src.match(/-\[(.*?)\]$/)?.[1];
    if (!hash || !width || !height) return;
    try {
      return thumbHashToDataURL(fileNameToHash(hash));
    } catch (e) {}
  }, [src, width, height]);
};

export const Image = ({
  src,
  width,
  height,
  alt,
  className,
  isOptimize,
  ...props
}: Props) => {
  const env = useEnv();
  const optimizer = isOptimize ? env.NEXT_PUBLIC_IMAGE_URL : undefined;
  const url = new URL(optimizer ?? src);
  if (optimizer) {
    url.searchParams.set("url", src);
    if (width) url.searchParams.set("w", String(Math.min(width, 800)));
    url.searchParams.set("q", "90");
  }
  const hashUrl = useBluerHash({
    src: decodeURI(src),
    width: width ?? 0,
    height: height ?? 0,
  });
  return (
    <img
      {...props}
      className={classNames(className, "text-white/75")}
      src={url.toString()}
      style={
        hashUrl
          ? {
              backgroundImage: `url("${hashUrl}")`,
              backgroundSize: "cover",
              textAlign: "center",
            }
          : undefined
      }
      width={width}
      height={height}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
};
