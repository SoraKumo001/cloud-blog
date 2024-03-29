import { BuilderType } from "../builder";
import { isolatedFiles, uploadFile } from "../uploadFile";

export const uploadPostIcon = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.prismaField({
    type: "FireStore",
    args: {
      postId: t.arg({ type: "String", required: true }),
      file: t.arg({ type: "Upload" }),
    },
    resolve: async (_query, _root, { postId, file }, { prisma, user, env }) => {
      if (!user) throw new Error("Unauthorized");
      if (!file) {
        const firestore = await prisma.post
          .findUniqueOrThrow({
            select: { card: true },
            where: { id: postId },
          })
          .card();
        if (!firestore) throw new Error("firestore is not found");
        await prisma.fireStore.delete({
          where: { id: firestore.id },
        });
        return firestore;
      }
      const firestore = await uploadFile({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
        binary: file,
      });
      const post = await prisma.post.update({
        select: { card: true },
        data: {
          cardId: firestore.id,
        },
        where: { id: postId },
      });
      await isolatedFiles({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
      });
      if (!post.card) throw new Error("card is not found");
      return post.card;
    },
  });
