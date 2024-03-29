import { BuilderType } from "../builder";
import { isolatedFiles, uploadFile } from "../uploadFile";

export const uploadSystemIcon = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.prismaField({
    type: "FireStore",
    args: {
      file: t.arg({ type: "Upload", required: true }),
    },
    resolve: async (_query, _root, { file }, { prisma, user, env }) => {
      if (!user) throw new Error("Unauthorized");
      const firestore = await uploadFile({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
        binary: file,
      });
      const system = await prisma.system.update({
        select: { icon: true },
        data: {
          iconId: firestore.id,
        },
        where: { id: "system" },
      });
      await isolatedFiles({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
      });
      if (!system.icon) throw new Error("icon is not found");
      return system.icon;
    },
  });
