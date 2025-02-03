import { BuilderType } from "../builder";

export const backup = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.string({
    nullable: false,
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

      return JSON.stringify({
        system,
        users,
        categories,
        posts,
        files,
      });
    },
  });
