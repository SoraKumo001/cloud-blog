import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { optimizeImage } from "wasm-image-optimization";
import {
  arrayBufferToBase64,
  base64ToArrayBuffer,
} from "../app//libs/server/buffer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = async () => {
  const file = fs.readFileSync(
    path.resolve(__dirname, "./export-2025_9_26 13_23_42.json"),
    "utf8"
  );
  const value = JSON.parse(file);
  const replaceNames: [string, string][] = [];
  for (const file of value.files) {
    const result = await optimizeImage({
      image: base64ToArrayBuffer(file.binary),
      width: 100,
      height: 100,
      format: "thumbhash",
    }).catch(() => null);
    const fileHash =
      result &&
      arrayBufferToBase64(result)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    if (fileHash) {
      const name = file.id.replace(/-\[.*?\]$/, "");
      const newId = `${name}-[${fileHash}]`;
      replaceNames.push([file.id, newId]);
      file.id = newId;
    }
  }
  for (const post of value.posts) {
    let newContent: string = post.content;
    let newCardId: string = post.cardId;
    for (const [oldId, newId] of replaceNames) {
      newContent = newContent.replaceAll(oldId, newId);
      newCardId = newCardId.replaceAll(oldId, newId);
    }
    post.content = newContent;
    post.cardId = newCardId;
  }
  fs.writeFileSync(
    path.resolve(__dirname, "./out.json"),
    JSON.stringify(value),
    "utf8"
  );
};

main();
