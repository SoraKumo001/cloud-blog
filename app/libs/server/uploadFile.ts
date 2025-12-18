import { db } from "./context";
import { storage } from "./getStorage";
import * as schema from "~/db/schema";
import { eq, and, or, isNull } from "drizzle-orm";
import { relations } from "~/db/relations";

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
  return db
    .insert(schema.fireStore)
    .values({ id, name: binary.name, mimeType: binary.type ?? "" });
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
  const files = await db
    .selectDistinctOn([schema.fireStore.id], { id: schema.fireStore.id })
    .from(schema.fireStore)
    .leftJoin(schema.post, eq(schema.post.cardId, schema.fireStore.id))
    .leftJoin(
      schema.system,
      or(
        eq(schema.system.iconId, schema.fireStore.id),
        eq(schema.system.cardId, schema.fireStore.id)
      )
    )
    .leftJoin(
      schema.fireStoreToPost,
      eq(schema.fireStoreToPost.fireStoreId, schema.fireStore.id)
    )
    .where(
      and(
        isNull(schema.post.cardId),
        isNull(schema.system.iconId),
        isNull(schema.system.cardId),
        isNull(schema.fireStoreToPost.fireStoreId)
      )
    )
    .execute();

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
    await db.delete(schema.fireStore).where(eq(schema.fireStore.id, id));
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
  const files = await db.select().from(schema.fireStore).execute();
  const firebaseFiles = await s.list({});
  const setFiles = new Set(files.map((v) => v.id));
  for (const { name } of firebaseFiles) {
    if (!setFiles.has(name)) {
      await s.del({ name }).catch((e) => console.error(e));
    }
  }
};
