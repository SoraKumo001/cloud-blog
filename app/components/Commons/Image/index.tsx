import { decode } from "blurhash";
import { useMemo } from "react";
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
  const bitmapSize = paddedRowSize * height + 54;

  const header = Buffer.alloc(54);
  header.write("BM", 0);
  header.writeUInt32LE(bitmapSize, 2);
  header.writeUInt32LE(0, 6);
  header.writeUInt32LE(54, 10);
  header.writeUInt32LE(40, 14);
  header.writeInt32LE(width, 18);
  header.writeInt32LE(-(height + 1), 22);
  header.writeUInt16LE(1, 26);
  header.writeUInt16LE(32, 28);
  header.writeUInt32LE(0, 30);
  header.writeUInt32LE(paddedRowSize * height, 34);
  header.writeUInt32LE(0, 38);
  header.writeUInt32LE(0, 42);
  header.writeUInt32LE(0, 46);
  header.writeUInt32LE(0, 50);

  let pt = 0;
  const data = Buffer.alloc(paddedRowSize * height);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const pos = (i * width + j) * 4;
      data.writeUInt8(pixels[pos + 2], pt++);
      data.writeUInt8(pixels[pos + 1], pt++);
      data.writeUInt8(pixels[pos], pt++);
      data.writeUInt8(pixels[pos + 3], pt++);
    }
    for (let p = 0; p < paddingSize; p++) {
      data.writeUInt8(0, pt++);
    }
  }

  const dataURL = Buffer.concat([header, data]).toString("base64");
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
  const hashUrl = useBluerHash({
    src,
    width: width ?? 0,
    height: height ?? 0,
  });
  return (
    <img
      className={classNames(className, "text-white/75 bg-black")}
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
