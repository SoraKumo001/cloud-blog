import { getImages } from "./getImages";
import { storage } from "./getStorage";
import type { PrismaClient } from "@prisma/client";

export const normalizationPostFiles = async (
  prisma: PrismaClient,
  postId: string,
  allRemove: boolean,
  {
    projectId,
    clientEmail,
    privateKey,
  }: {
    projectId: string;
    clientEmail: string;
    privateKey: string;
  }
) => {
  const { content } = await prisma.post.findUniqueOrThrow({
    select: { content: true },
    where: { id: postId },
  });
  const images = allRemove ? [] : await getImages(content);
  const files = await prisma.fireStore.findMany({
    select: { id: true, posts: { select: { id: true } } },
    where: { posts: { some: { id: postId } } },
  });
  const adds = images.filter((image) => !files.some(({ id }) => id === image));
  const deletes = files.filter((file) => !images.includes(file.id));
  const firebaseStorage = storage({
    projectId,
    clientEmail,
    privateKey,
  });
  return Promise.all([
    ...deletes.map(({ id }) =>
      prisma.fireStore.update({
        data: { posts: { disconnect: { id: postId } } },
        where: { id },
      })
    ),
    ...adds.map((image) =>
      prisma.fireStore.update({
        data: { posts: { connect: { id: postId } } },
        where: { id: image },
      })
    ),
    ...deletes.map(
      ({ id, posts }) =>
        posts.length === 1 && firebaseStorage.del({ name: id }).catch(() => {})
    ),
  ]);
};
