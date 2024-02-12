import { arrayBufferToBase64 } from "@/libs/server/buffer";
export const convertWebp = async (blob: Blob): Promise<Blob | null> => {
  if (!blob.type.match(/^image\/(png|jpeg)/)) return blob;
  const src = await blob
    .arrayBuffer()
    .then((v) => `data:${blob.type};base64,` + arrayBufferToBase64(v));
  const img = document.createElement("img");
  img.src = src;
  await new Promise((resolve) => (img.onload = resolve));
  const canvas = document.createElement("canvas");
  [canvas.width, canvas.height] = [img.width, img.height];
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0);
  return await new Promise((result) => canvas.toBlob(result, "image/webp"));
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
