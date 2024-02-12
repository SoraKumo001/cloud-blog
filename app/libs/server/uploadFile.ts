import { prisma } from "./context";
import { storage } from "./getStorage";

export const uploadFile = async (binary: File) => {
  const uuid = await require("pure-uuid");
  const id = new uuid(4).format();
  await storage().upload({
    name: id,
    file: binary,
    published: true,
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });
  return prisma.fireStore.create({
    data: { id, name: binary.name, mimeType: binary.type ?? "" },
  });
};

export const isolatedFiles = async () => {
  const files = await prisma.fireStore.findMany({
    where: {
      posts: { none: {} },
      postCards: { none: {} },
      systemIcons: { none: {} },
      systemCards: { none: {} },
    },
  });
  for (const { id } of files) {
    await storage()
      .del({ name: id })
      .catch(() => undefined);
    await prisma.fireStore.delete({ where: { id } });
  }
};
