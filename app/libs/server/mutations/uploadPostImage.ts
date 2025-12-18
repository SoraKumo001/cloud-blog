import { uploadFile } from "../uploadFile";
import type { BuilderType } from "../builder";
import { fireStoreToPost } from "~/db/schema";

export const uploadPostImage = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.drizzleField({
    type: "fireStore",
    nullable: false,
    args: {
      postId: t.arg({ type: "String", required: true }),
      file: t.arg({ type: "Upload", required: true }),
    },
    resolve: async (_query, _root, { postId, file }, { db, user, env }) => {
      if (!user) throw new Error("Unauthorized");
      const firestore = await uploadFile({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
        binary: file,
      });
      await db.insert(fireStoreToPost).values({
        postId,
        fireStoreId: firestore.id,
      });
      return firestore;
    },
  });
