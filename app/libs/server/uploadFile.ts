import { prisma } from "./context";
import { storage } from "./getStorage";

export const uploadFile = async ({
  binary,
  projectId,
  clientEmail,
  privateKey,
}: {
  projectId: string;
  clientEmail: string;
  privateKey: string;
  binary: File;
}) => {
  const uuid = (await import("pure-uuid")).default;
  const id = `${new uuid(4).format()}-[${binary.name}]`;
  await storage({ projectId, clientEmail, privateKey: privateKey }).upload({
    name: id,
    file: binary,
    published: true,
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });
  return prisma.fireStore.create({
    data: { id, name: binary.name, mimeType: binary.type ?? "" },
  });
};

export const isolatedFiles = async ({
  projectId,
  clientEmail,
  privateKey,
}: {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}) => {
  const files = await prisma.fireStore.findMany({
    where: {
      posts: { none: {} },
      postCards: { none: {} },
      systemIcons: { none: {} },
      systemCards: { none: {} },
    },
  });
  const s = storage({
    projectId,
    clientEmail,
    privateKey,
  });
  for (const { id } of files) {
    await s
      .del({ name: id })
      .catch(undefined)
      .catch(() => undefined);
    await prisma.fireStore.delete({ where: { id } });
  }
};

export const isolatedFirebase = async ({
  projectId,
  clientEmail,
  privateKey,
}: {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}) => {
  const s = storage({
    projectId,
    clientEmail,
    privateKey,
  });
  const files = await prisma.fireStore.findMany({});
  const firebaseFiles = await s.list({});
  const setFiles = new Set(files.map((v) => v.id));
  for (const { name } of firebaseFiles) {
    if (!setFiles.has(name)) {
      await s.del({ name }).catch((e) => console.error(e));
    }
  }
};
