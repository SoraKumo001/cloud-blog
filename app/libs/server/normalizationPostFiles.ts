import { and, eq } from "drizzle-orm";
import { getImages } from "./getImages";
import { storage } from "./getStorage";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { relations } from "~/db/relations";
import { fireStoreToPost } from "~/db/schema";

export const normalizationPostFiles = async (
  db: NodePgDatabase<typeof relations, typeof relations>,
  postId: string,
  allRemove: boolean,
  {
    projectId,
    clientEmail,
    privateKey,
  }: {
    projectId: string;
    clientEmail: string;
    privateKey: string;
  }
) => {
  const { content } = await db.query.post
    .findFirst({
      columns: { content: true },
      where: { id: postId },
    })
    .then((v) => {
      if (!v) throw new Error("Post not found");
      return v;
    });
  const images = allRemove ? [] : await getImages(content);
  const files = await db.query.fireStore.findMany({
    with: { posts: { columns: { id: true } } },
    columns: { id: true },
    where: { posts: { id: postId } },
  });
  const adds = images.filter((image) => !files.some(({ id }) => id === image));
  const deletes = files.filter((file) => !images.includes(file.id));
  const firebaseStorage = storage({
    projectId,
    clientEmail,
    privateKey,
  });
  return Promise.all([
    ...deletes.map(({ id }) =>
      db
        .delete(fireStoreToPost)
        .where(
          and(
            eq(fireStoreToPost.postId, postId),
            eq(fireStoreToPost.fireStoreId, id)
          )
        )
    ),
    ...adds.map((image) =>
      db.insert(fireStoreToPost).values({ postId, fireStoreId: image })
    ),
    ...deletes.map(
      ({ id, posts }) =>
        posts.length === 1 && firebaseStorage.del({ name: id }).catch(() => {})
    ),
  ]);
};
