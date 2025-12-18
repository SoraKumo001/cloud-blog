import { semaphore } from "@node-libraries/semaphore";
import { storage } from "../getStorage";
import type { BuilderType } from "../builder";
import { fireStore } from "~/db/schema";

export const restoreFiles = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.drizzleField({
    type: ["fireStore"],
    args: {
      files: t.arg({ type: ["Upload"], required: true }),
    },
    resolve: async (_query, _root, { files }, { user, env, db }) => {
      if (!user) throw new Error("Unauthorized");

      const firebaseStorage = storage({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
      });
      const s = semaphore(1);
      return Promise.all(
        files.map(async (file) => {
          await s.acquire();
          await firebaseStorage.upload({
            file,
            name: file.name,
            published: true,
            metadata: { cacheControl: "public, max-age=31536000, immutable" },
          });
          s.release();
          return db
            .insert(fireStore)
            .values({
              id: file.name,
              name: file.name,
              mimeType: file.type ?? "",
            })
            .onConflictDoUpdate({
              target: fireStore.id,
              set: { name: file.name, mimeType: file.type ?? "" },
            })
            .returning()
            .then((v) => v[0]);
        })
      );
    },
  });
