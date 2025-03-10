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
  isOptimize?: boolean;
};

export function blurHashToDataURL(
  hash: string | undefined,
  width: number,
  height: number
): string | undefined {
  if (!hash) return undefined;

  const pixels = decode(hash, width, height);
  return parsePixels(pixels, width, height);
}

function parsePixels(pixels: Uint8ClampedArray, width: number, height: number) {
  const paddingSize = (4 - ((width * 2) % 4)) % 4;
  const paddedRowSize = width * 2 + paddingSize;
  const bitmapSize = paddedRowSize * height + 54;

  const data = new Uint8Array(54 + paddedRowSize * height);
  const dataView = new DataView(data.buffer);

  dataView.setUint16(0, 0x424d);
  dataView.setUint32(2, bitmapSize, true);
  dataView.setUint32(6, 0, true);
  dataView.setUint32(10, 54, true);
  dataView.setUint32(14, 40, true);
  dataView.setInt32(18, width, true);
  dataView.setInt32(22, -(height + 1), true);
  dataView.setUint16(26, 1, true);
  dataView.setUint16(28, 16, true);
  dataView.setUint32(30, 0, true);
  dataView.setUint32(34, paddedRowSize * height, true);

  let pt = 54;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const pos = (i * width + j) * 4;
      const color =
        ((pixels[pos] >> 3) << 10) |
        ((pixels[pos + 1] >> 3) << 5) |
        (pixels[pos + 2] >> 3);
      dataView.setUint16(pt, color, true);
      pt += 2;
    }
    pt += paddingSize;
  }
  const dataURL =
    "data:image/bmp;base64," + btoa(String.fromCharCode(...Array.from(data)));
  return dataURL;
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
      const area = 128;
      const newWidth = Math.sqrt((area * width) / height);
      const newHeight = area / newWidth;
      return blurHashToDataURL(
        fileNameToBase83(hash),
        Math.ceil(newWidth),
        Math.ceil(newHeight)
      );
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
}: Props) => {
  const env = useEnv();
  const optimizer = isOptimize ? env.NEXT_PUBLIC_IMAGE_URL : undefined;
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
