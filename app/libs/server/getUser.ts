import type { PrismaClient } from '@prisma/client';

export const getUser = async (prisma: PrismaClient, name: string, email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) return user;
  else {
    if (await prisma.user.count()) {
      return null;
    }
    const user = await prisma.user.create({
      data: { name: name, email: email },
    });
    return user;
  }
};
