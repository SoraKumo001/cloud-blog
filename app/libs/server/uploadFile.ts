import { eq, sql } from "drizzle-orm";
import { db } from "./context";
import { storage } from "./getStorage";
import { fireStore } from "~/db/schema";

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
  return db.insert(fireStore).values({
    id,
    name: binary.name,
    mimeType: binary.type ?? "",
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
  const files = await db.query.fireStore.findMany({
    with: {
      posts: { columns: {}, extras: { count: sql`count(*)` } },
      postCards: { columns: {}, extras: { count: sql`count(*)` } },
      systemCards: { columns: {}, extras: { count: sql`count(*)` } },
      systemIcons: { columns: {}, extras: { count: sql`count(*)` } },
    },
    where:{
      posts: { },
      postCards: { count: 0 },
    }
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
    await db.delete(fireStore).where(eq(fireStore.id, id));
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
  const files = await db.query.fireStore.findMany({});
  const firebaseFiles = await s.list({});
  const setFiles = new Set(files.map((v) => v.id));
  for (const { name } of firebaseFiles) {
    if (!setFiles.has(name)) {
      await s.del({ name }).catch((e) => console.error(e));
    }
  }
};
