import { PrismaClient as PrismaClientEdge, User } from "@prisma/client/edge";
import { serialize } from "cookie";
import type { PrismaClient } from "@prisma/client";

export type Context = {
  req: Request;
  prisma: PrismaClient;
  user?: User;
  cookies: { [key: string]: string };
  setCookie: typeof serialize;
  env: { [key: string]: string };
};

export let prisma: PrismaClient;

export const getPrisma = (datasourceUrl: string) => {
  if (prisma) return prisma;
  prisma = new PrismaClientEdge({
    datasourceUrl,
    log: [
      {
        emit: "stdout",
        level: "query",
      },
    ],
  });
  return prisma;
};
