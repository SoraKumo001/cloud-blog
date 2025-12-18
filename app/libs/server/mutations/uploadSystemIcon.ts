import { eq } from "drizzle-orm";
import { isolatedFiles, uploadFile } from "../uploadFile";
import type { BuilderType } from "../builder";
import { system } from "~/db/schema";

export const uploadSystemIcon = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.drizzleField({
    type: "fireStore",
    args: {
      file: t.arg({ type: "Upload", required: true }),
    },
    resolve: async (_query, _root, { file }, { db, user, env }) => {
      if (!user) throw new Error("Unauthorized");
      const firestore = await uploadFile({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
        binary: file,
      });
      const system_ = await db
        .update(system)
        .set({
          iconId: firestore.id,
        })
        .where(eq(system.id, "system"))
        .returning({});

      await isolatedFiles({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
      });
      if (!firestore) throw new Error("icon is not found");
      return firestore;
    },
  });
