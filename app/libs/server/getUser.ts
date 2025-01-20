import type { PrismaClient } from "@prisma/client";

export const getUser = async (
  prisma: PrismaClient,
  name: string,
  email: string
) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) return user;

  if (await prisma.user.count()) {
    return null;
  }
  const newUser = await prisma.user.create({
    data: { name: name, email: email },
  });
  return newUser;
};
