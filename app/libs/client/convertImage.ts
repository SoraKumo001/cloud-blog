import { encode as encodeHash } from "blurhash";
import { useCallback, useState } from "react";
import { optimizeImage } from "wasm-image-optimization/web-worker";
import { base83toFileName } from "./blurhash";
import { arrayBufferToBase64 } from "@/libs/server/buffer";

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

const getBlurHash = (ctx: CanvasRenderingContext2D) => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  let outWidth = width;
  let outHeight = height;
  if (width > 128 || height > 128) {
    const aspect = width / height;
    if (aspect > 1) {
      outWidth = 128;
      outHeight = Math.floor(128 / aspect);
    } else {
      outHeight = 128;
      outWidth = Math.floor(128 * aspect);
    }
    ctx.drawImage(ctx.canvas, 0, 0, width, height, 0, 0, outWidth, outHeight);
  }
  const data = ctx.getImageData(0, 0, outWidth, outHeight);
  return encodeHash(data.data, outWidth, outHeight, 4, 4);
};

export const convertImage = async (
  blob: Blob,
  width?: number,
  height?: number
): Promise<File | Blob | null> => {
  if (typeof window === "undefined") {
    return blob;
  }
  // Check if the blob is an image by checking its MIME type
  if (!blob.type.match(/^image\/(png|jpeg|webp|avif|gif)/)) {
    return blob;
  }

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
    outHeight = Math.floor(outWidth / aspectSrc);
  } else {
    outWidth = Math.floor(outHeight * aspectSrc);
  }

  const canvas = document.createElement("canvas");
  [canvas.width, canvas.height] = [outWidth, outHeight];
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, outWidth, outHeight);

  const value =
    blob.type !== "image/gif"
      ? await optimizeImage({
          image: await blob.arrayBuffer(),
          quality: 90,
        })
      : await blob.arrayBuffer();
  if (!value) return null;

  const hash = getBlurHash(ctx);
  const filename = base83toFileName(hash);
  return new File([value], filename, {
    type: blob.type === "image/gif" ? "image/gif" : `image/${type}`,
  });
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
