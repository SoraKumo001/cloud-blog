import { decode } from "blurhash";
import { useEffect, useMemo, useRef, useState } from "react";
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

export function blurHashToDataURL(
  hash: string | undefined,
  width: number,
  height: number
): string | undefined {
  if (!hash) return undefined;

  const pixels = decode(hash, width, height);
  const dataURL = parsePixels(pixels, width, height);
  return dataURL;
}

function parsePixels(pixels: Uint8ClampedArray, width: number, height: number) {
  const paddingSize = (4 - ((width * 4) % 4)) % 4;
  const paddedRowSize = width * 4 + paddingSize;
  const bitmapSize = paddedRowSize * height + height * 2 + 14;

  const bitmap = new Uint8Array(bitmapSize);
  let pos = 0;

  const setByte = (value: number) => {
    bitmap[pos] = value;
    pos++;
  };

  const setWord = (value: number) => {
    setByte(value & 0xff);
    setByte((value >> 8) & 0xff);
  };

  const setDWord = (value: number) => {
    setWord(value & 0xffff);
    setWord((value >> 16) & 0xffff);
  };

  setByte(0x42);
  setByte(0x4d);
  setDWord(bitmapSize);
  setWord(0);
  setWord(0);
  setDWord(54);

  setDWord(40);
  setDWord(width);
  setDWord(height);
  setWord(1);
  setWord(32);
  setDWord(0);
  setDWord(paddedRowSize * height);
  setDWord(0);
  setDWord(0);
  setDWord(0);
  setDWord(0);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const pos = (i * width + j) * 4;
      setByte(pixels[pos + 2]);
      setByte(pixels[pos + 1]);
      setByte(pixels[pos]);
      setByte(pixels[pos + 3]);
    }
    for (let p = 0; p < paddingSize; p++) {
      setByte(0);
    }
  }

  const dataURL = btoa(String.fromCharCode(...bitmap));
  return "data:image/bmp;base64," + dataURL;
}
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
      let [newWidth, newHeight] = [width, height];
      const maxSize = 16;
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
      return blurHashToDataURL(fileNameToBase83(hash), newWidth, newHeight);
    } catch (e) {}
  }, [src, width, height]);
};

export const Image = ({ src, width, height, alt, className }: Props) => {
  const env = useEnv();
  const optimizer = env.NEXT_PUBLIC_IMAGE_URL;
  const url = new URL(optimizer ?? src);
  if (optimizer) {
    url.searchParams.set("url", encodeURI(src));
    if (width) url.searchParams.set("w", String(Math.min(width, 800)));
    url.searchParams.set("q", "90");
  }
  const [isLoad, setLoad] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const hashUrl = useBluerHash({
    src,
    width: width ?? 0,
    height: height ?? 0,
  });
  useEffect(() => {
    if (ref.current?.complete) {
      setLoad(true);
    }
  }, [ref]);
  const isBlur = hashUrl && !isLoad;
  return (
    <div
      className="relative"
      style={{ width: "fit-content", height: "fit-content" }}
    >
      <img
        className={classNames(isBlur ? className : "hidden", "absolute")}
        src={hashUrl}
        width={width}
        height={height}
      />
      <img
        className={classNames(className, "relative z-10")}
        ref={ref}
        src={url.toString()}
        width={width}
        height={height}
        alt={""}
        loading="lazy"
        decoding="async"
        onLoad={() => {
          setLoad(true);
        }}
      />
    </div>
  );
};
