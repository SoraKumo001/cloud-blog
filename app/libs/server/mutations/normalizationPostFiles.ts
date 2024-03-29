import { BuilderType } from "../builder";
import { normalizationPostFiles as _normalizationPostFiles } from "../normalizationPostFiles";
import { isolatedFiles } from "../uploadFile";

export const normalizationPostFiles = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.boolean({
    args: {
      postId: t.arg({ type: "String", required: true }),
      removeAll: t.arg({ type: "Boolean" }),
    },
    resolve: async (_root, { postId, removeAll }, { prisma, user, env }) => {
      if (!user) throw new Error("Unauthorized");
      await _normalizationPostFiles(prisma, postId, removeAll === true, {
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
      });
      await isolatedFiles({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
      });
      return true;
    },
  });
