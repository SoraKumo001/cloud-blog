import { encode } from "@node-libraries/wasm-avif-encoder";
import { encode as encodeHash } from "blurhash";
import { useCallback, useState } from "react";
import { arrayBufferToBase64 } from "@/libs/server/buffer";
import { base83toFileName } from "./blurhash";

const type = "avif";

export const useConvertImage = () => {
  const [isConverting, setIsConverting] = useState(false);
  const convert = useCallback(
    async (blob: Blob | File, width?: number, height?: number) => {
      setIsConverting(true);
      const value = await convertImage(blob, width, height);
      setIsConverting(false);
      return value;
    },
    [setIsConverting]
  );
  return [isConverting, convert] as const;
};

export const convertImage = async (
  blob: Blob,
  width?: number,
  height?: number
): Promise<File | Blob | null> => {
  if (!blob.type.match(/^image\/(png|jpeg|webp|avif)/)) return blob;

  const src = await blob
    .arrayBuffer()
    .then((v) => `data:${blob.type};base64,` + arrayBufferToBase64(v));
  const img = document.createElement("img");
  img.src = src;
  await new Promise((resolve) => (img.onload = resolve));

  let outWidth = width ? width : img.width;
  let outHeight = height ? height : img.height;
  const aspectSrc = img.width / img.height;
  const aspectDest = outWidth / outHeight;
  if (aspectSrc > aspectDest) {
    outHeight = outWidth / aspectSrc;
  } else {
    outWidth = outHeight * aspectSrc;
  }

  const canvas = document.createElement("canvas");
  [canvas.width, canvas.height] = [outWidth, outHeight];
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, outWidth, outHeight);
  const data = ctx.getImageData(0, 0, outWidth, outHeight);
  const value = await encode({
    data,
    worker: `/${type}/worker.js`,
    quality: 90,
  });
  if (!value) return null;
  const hash = encodeHash(data.data, outWidth, outHeight, 4, 4);
  const filename = base83toFileName(hash);
  return new File([value], filename, { type: `image/${type}` });
};

export const getImageSize = async (blob: Blob) => {
  const src = await blob
    .arrayBuffer()
    .then((v) => `data:${blob.type};base64,` + arrayBufferToBase64(v));
  const img = document.createElement("img");
  img.src = src;
  await new Promise((resolve) => (img.onload = resolve));
  return { width: img.naturalWidth, height: img.naturalHeight };
};