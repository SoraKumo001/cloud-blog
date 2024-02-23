import { decode } from "blurhash";
import { useEffect, useRef, useState } from "react";
import { useEnv } from "@/components/Provider/EnvProvider";
import { fileNameToBase83 } from "@/libs/client/blurhash";
import { classNames } from "@/libs/client/classNames";

type Props = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
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
  const [value, setValue] = useState<string>();
  useEffect(() => {
    const hash = src.match(/-\[(.*?)\]$/)?.[1];
    if (!hash || !width || !height) return;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      const imageData = ctx.createImageData(width, height);
      const pixels = decode(fileNameToBase83(hash), width, height);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
      setValue(canvas.toDataURL("image/png"));
    } catch (e) {}
  }, [height, src, width]);
  return value;
};

export const Image = ({ src, width, height, alt, className }: Props) => {
  const env = useEnv();
  const optimizer = env.NEXT_PUBLIC_IMAGE_URL;
  const url = new URL(optimizer ?? src);
  if (optimizer) {
    url.searchParams.set("url", encodeURI(src));
    width && url.searchParams.set("w", String(width));
    url.searchParams.set("q", "90");
  }

  const [, setLoad] = useState(false);
  const hashUrl = useBluerHash({
    src,
    width: width ?? 0,
    height: height ?? 0,
  });
  const ref = useRef<HTMLImageElement>(null);
  const isBlur = hashUrl && !ref.current?.complete;
  return (
    <>
      <img
        className={classNames(isBlur ? className : "hidden")}
        src={hashUrl}
        alt={alt}
        width={width}
        height={height}
      />
      <img
        className={isBlur ? "invisible fixed" : className}
        ref={ref}
        src={url.toString()}
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoad(true)}
      />
    </>
  );
};
