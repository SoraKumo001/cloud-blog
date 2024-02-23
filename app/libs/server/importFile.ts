import { semaphore } from "@node-libraries/semaphore";
import { base64ToArrayBuffer } from "./buffer";
import { prisma } from "./context";
import { getImages } from "./getImages";
import { storage } from "./getStorage";
import type { Category, FireStore, Post, System, User } from "@prisma/client";

type DataType = {
  users: User[];
  categories: Category[];
  system: System[];
  posts: (Post & { categories: { id: string }[] })[];
  files: (FireStore & { binary: string })[];
};

export const importFile = async ({
  file,
  projectId,
  clientEmail,
  privateKey,
}: {
  file: string;
  projectId: string;
  clientEmail: string;
  privateKey: string;
}) => {
  const data: DataType = JSON.parse(file);
  if (data) {
    for (const value of data.users) {
      await prisma.user.upsert({
        create: value,
        update: value,
        where: { id: value.id },
      });
    }
    const s = semaphore(10);
    const firebaseStorage = storage({
      projectId,
      clientEmail,
      privateKey,
    });
    data.files.forEach(async (file) => {
      await s.acquire();
      const { binary, ...storeFile } = file;
      const blob = new Blob([base64ToArrayBuffer(binary)], {
        type: file.mimeType,
      });
      await firebaseStorage.upload({
        file: blob,
        name: file.id,
        published: true,
        metadata: { cacheControl: "public, max-age=31536000, immutable" },
      });
      await prisma.fireStore.upsert({
        create: storeFile,
        update: storeFile,
        where: {
          id: file.id,
        },
      });
      s.release();
    });
    await s.all();

    await prisma.system.upsert({
      create: data.system[0],
      update: data.system[0],
      where: { id: "system" },
    });

    data.categories.forEach(async (value) => {
      await s.acquire();
      await prisma.category.upsert({
        create: value,
        update: value,
        where: { id: value.id },
      });
      s.release();
    });
    await s.all();

    const ids = new Set(
      (await prisma.fireStore.findMany()).map(({ id }) => id)
    );

    data.posts.forEach(async (value) => {
      await s.acquire();
      const images = await getImages(value.content);
      const { categories, ...post } = value;
      await prisma.post.upsert({
        create: post,
        update: post,
        where: { id: value.id },
      });
      const connectImages = images.filter((v) => ids.has(v));
      if (connectImages.length) {
        await prisma.post.update({
          data: {
            postFiles: { connect: connectImages.map((id) => ({ id })) },
            categories: { connect: categories.map((id) => id) },
          },
          where: { id: value.id },
        });
      }
      s.release();
    });
    await s.all();
  }
};
