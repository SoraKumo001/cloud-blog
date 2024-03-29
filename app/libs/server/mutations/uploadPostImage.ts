import { BuilderType } from "../builder";
import { uploadFile } from "../uploadFile";

export const uploadPostImage = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.prismaField({
    type: "FireStore",
    args: {
      postId: t.arg({ type: "String", required: true }),
      file: t.arg({ type: "Upload", required: true }),
    },
    resolve: async (_query, _root, { postId, file }, { prisma, user, env }) => {
      if (!user) throw new Error("Unauthorized");
      const firestore = await uploadFile({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
        binary: file,
      });
      await prisma.post.update({
        data: {
          postFiles: { connect: { id: firestore.id } },
        },
        where: { id: postId },
      });
      return firestore;
    },
  });
