import { prisma } from "./context";
import { getImages } from "./getImages";
import type { Category, FireStore, Post, System, User } from "@prisma/client";

type DataType = {
  users: User[];
  categories: Category[];
  system: System[];
  posts: (Post & { categories: { id: string }[] })[];
  files: (FireStore & { binary: string })[];
};

export const importFile = async ({ file }: { file: string }) => {
  const data: DataType = JSON.parse(file);
  if (data) {
    await prisma.system.upsert({
      create: data.system[0],
      update: data.system[0],
      where: { id: "system" },
    });
    await prisma.$transaction(
      data.users.map((value) =>
        prisma.user.upsert({
          create: value,
          update: value,
          where: { id: value.id },
        })
      )
    );

    await prisma.$transaction(
      data.categories.map((value) =>
        prisma.category.upsert({
          create: value,
          update: value,
          where: { id: value.id },
        })
      )
    );
    await prisma.$transaction(
      data.files.map((value) =>
        prisma.fireStore.upsert({
          create: value,
          update: value,
          where: { id: value.id },
        })
      )
    );

    const ids = new Set(
      (await prisma.fireStore.findMany()).map(({ id }) => id)
    );

    const imageList = Object.fromEntries(
      await Promise.all(
        data.posts.map(async (value) => {
          const images = await getImages(value.content);
          return [value.id, images] as const;
        })
      )
    );
    const transaction = data.posts.flatMap((value) => {
      const images = imageList[value.id];
      const { categories, ...post } = value;
      const result = prisma.post.upsert({
        create: post,
        update: post,
        where: { id: value.id },
      });
      const connectImages = images.filter((v) => ids.has(v));
      if (!connectImages.length) return [result];

      const result2 = prisma.post.update({
        data: {
          postFiles: { connect: connectImages.map((id) => ({ id })) },
          categories: { connect: categories.map((id) => id) },
        },
        where: { id: value.id },
      });
      return [result, result2];
    });

    prisma.$transaction(transaction);
  }
};
