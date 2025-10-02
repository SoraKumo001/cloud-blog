import { arrayBufferToBase64 } from "../server/buffer";

export const hashToFileName = (hash: Uint8Array<ArrayBufferLike>) => {
  const v = arrayBufferToBase64(hash);
  return v.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const fileNameToHash = (fileName: string) => {
  const base64 =
    fileName.replace(/-/g, "+").replace(/_/g, "/") +
    "==".slice(0, (3 * fileName.length) % 4);

  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};
