import { db } from "./context";
import { getImages } from "./getImages";
import * as schema from "~/db/schema";

type DataType = {
  users: (typeof schema.user.$inferSelect)[];
  categories: (typeof schema.category.$inferSelect)[];
  system: (typeof schema.system.$inferSelect)[];
  posts: (typeof schema.post.$inferSelect & { categories: { id: string }[] })[];
  files: (typeof schema.fireStore.$inferSelect & { binary: string })[];
};

export const importFile = async ({ file }: { file: string }) => {
  const data: DataType = JSON.parse(file);
  if (data) {
    await db
      .insert(schema.system)
      .values(data.system[0])
      .onConflictDoUpdate({ target: schema.system.id, set: data.system[0] });

    await db.transaction(async (tx) => {
      for (const value of data.users) {
        await tx
          .insert(schema.user)
          .values(value)
          .onConflictDoUpdate({ target: schema.user.id, set: value });
      }
    });

    await db.transaction(async (tx) => {
      for (const value of data.categories) {
        await tx
          .insert(schema.category)
          .values(value)
          .onConflictDoUpdate({ target: schema.category.id, set: value });
      }
    });

    await db.transaction(async (tx) => {
      for (const value of data.files) {
        await tx
          .insert(schema.fireStore)
          .values(value)
          .onConflictDoUpdate({ target: schema.fireStore.id, set: value });
      }
    });

    const ids = new Set(
      (await db.select({ id: schema.fireStore.id }).from(schema.fireStore)).map(
        ({ id }) => id
      )
    );

    const imageList = Object.fromEntries(
      await Promise.all(
        data.posts.map(async (value) => {
          const images = await getImages(value.content);
          return [value.id, images] as const;
        })
      )
    );

    await db.transaction(async (tx) => {
      for (const value of data.posts) {
        const images = imageList[value.id];
        const { categories, ...post } = value;
        await tx
          .insert(schema.post)
          .values(post)
          .onConflictDoUpdate({ target: schema.post.id, set: post });

        const connectImages = images.filter((v) => ids.has(v));
        if (connectImages.length) {
          await tx.insert(schema.fireStoreToPost).values(
            connectImages.map((id) => ({
              postId: value.id,
              fireStoreId: id,
            }))
          );
        }

        const connectCategories = categories.map((id) => id.id);
        if (connectCategories.length) {
          await tx.insert(schema.categoryToPost).values(
            connectCategories.map((id) => ({
              postId: value.id,
              categoryId: id,
            }))
          );
        }
      }
    });
  }
};
