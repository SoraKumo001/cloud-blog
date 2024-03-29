import { BuilderType } from "../builder";

export const backup = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.string({
    resolve: async (_root, {}, { user, prisma }) => {
      if (!user) throw new Error("Unauthorized");

      const [users, categories, system, posts, files] =
        await prisma.$transaction([
          prisma.user.findMany(),
          prisma.category.findMany(),
          prisma.system.findMany(),
          prisma.post.findMany({
            include: { categories: { select: { id: true } } },
          }),
          prisma.fireStore.findMany(),
        ]);

      // const firebaseStorage = storage({
      //   projectId: env.GOOGLE_PROJECT_ID ?? "",
      //   clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
      //   privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
      // });

      // const fireStoreFiles = await Promise.all(
      //   files.map(async (file) => {
      //     try {
      //       const storageFile = await firebaseStorage.download({ name: file.id });
      //       return {
      //         ...file,
      //         binary: arrayBufferToBase64(storageFile),
      //       };
      //     } catch (e) {
      //       console.error(e);
      //       return { ...file, binary: "" };
      //     }
      //   })
      // );
      return JSON.stringify({
        system,
        users,
        categories,
        posts,
        files,
      });
    },
  });
