import { decode } from "blurhash";
import { RefObject, useEffect, useRef, useState } from "react";
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
  ref,
}: {
  src: string;
  width: number;
  height: number;
  ref: RefObject<HTMLCanvasElement>;
}) => {
  const [value, setValue] = useState<string>();
  useEffect(() => {
    const hash = src.match(/-\[(.*?)\]$/)?.[1];
    if (!hash || !width || !height || !ref.current) return;
    try {
      const canvas = ref.current;
      //document.createElement("canvas");
      let [newWidth, newHeight] = [width, height];
      const maxSize = 128;
      if (newWidth > maxSize || newHeight > maxSize) {
        const aspect = newWidth / newHeight;
        if (aspect > 1) {
          newWidth = maxSize;
          newHeight = Math.floor(maxSize / aspect);
        } else {
          newWidth = maxSize;
          newHeight = Math.floor(maxSize * aspect);
        }
      }
      const ctx = canvas.getContext("2d")!;
      const imageData = ctx.createImageData(newWidth, newHeight);
      const pixels = decode(fileNameToBase83(hash), newWidth, newHeight);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);

      ctx.drawImage(canvas, 0, 0, newWidth, newHeight, 0, 0, width, height);
      setValue(canvas.toDataURL("image/png"));
    } catch (e) {}
  }, [src, height, width, ref]);
  return value;
};

export const Image = ({ src, width, height, alt, className }: Props) => {
  const env = useEnv();
  const optimizer = env.NEXT_PUBLIC_IMAGE_URL;
  const url = new URL(optimizer ?? src);
  if (optimizer) {
    url.searchParams.set("url", encodeURI(src));
    width && url.searchParams.set("w", String(Math.min(width, 800)));
    url.searchParams.set("q", "90");
  }

  const [isLoad, setLoad] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const hashUrl = useBluerHash({
    src,
    width: width ?? 0,
    height: height ?? 0,
    ref: refCanvas,
  });
  useEffect(() => {
    if (ref.current?.complete) {
      setLoad(true);
    } else {
    }
  }, [ref]);
  const isBlur = hashUrl && !isLoad;
  return (
    <>
      <canvas
        ref={refCanvas}
        className={classNames(isBlur ? className : "hidden", "absolute")}
        width={width}
        height={height}
      />
      <img
        className={className}
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
