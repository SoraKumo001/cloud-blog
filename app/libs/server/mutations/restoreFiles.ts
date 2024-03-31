import { semaphore } from "@node-libraries/semaphore";
import { BuilderType } from "../builder";
import { storage } from "../getStorage";

export const restoreFiles = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.prismaField({
    type: ["FireStore"],
    args: {
      files: t.arg({ type: ["Upload"], required: true }),
    },
    resolve: async (_query, _root, { files }, { user, env, prisma }) => {
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
          return prisma.fireStore.upsert({
            where: { id: file.name },
            create: {
              id: file.name,
              name: file.name,
              mimeType: file.type ?? "",
            },
            update: { name: file.name, mimeType: file.type ?? "" },
          });
        })
      );
    },
  });
