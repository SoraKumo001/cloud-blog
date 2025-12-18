import { eq, sql } from "drizzle-orm";
import { isolatedFiles, uploadFile } from "../uploadFile";
import type { BuilderType } from "../builder";
import { fireStore, post } from "~/db/schema";

export const uploadPostIcon = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.drizzleField({
    type: "fireStore",
    args: {
      postId: t.arg({ type: "String", required: true }),
      file: t.arg({ type: "Upload" }),
    },
    resolve: async (_query, _root, { postId, file }, { db, user, env }) => {
      if (!user) throw new Error("Unauthorized");
      if (!file) {
        const firestore = await db.query.post
          .findFirst({
            with: { card: true },
            where: { id: postId },
          })
          .then((v) => v?.card);
        if (!firestore) throw new Error("firestore is not found");
        await db.delete(fireStore).where(eq(fireStore.id, fireStore.id));
        return firestore;
      }
      const firestore = await uploadFile({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
        binary: file,
      });
      const card = await db
        .update(post)
        .set({ cardId: firestore.id })
        .where(eq(post.id, postId))
        .returning()
        .then((v) => {
          const cardId = v[0].cardId;
          return !cardId
            ? null
            : db.query.fireStore.findFirst({
                where: { id: { eq: cardId } },
              });
        });
      await isolatedFiles({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
      });
      if (!card) throw new Error("card is not found");
      return card;
    },
  });
