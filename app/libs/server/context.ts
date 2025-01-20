import { PrismaPg } from "@prisma/adapter-pg-worker";
import { PrismaClient } from "@prisma/client";
import { Pool } from "@prisma/pg-worker";
import { getContext } from "hono/context-storage";
import type { User } from "@prisma/client";
import type { serialize } from "cookie";

export type Context = {
  req: Request;
  prisma: PrismaClient;
  user?: User;
  cookies: { [key: string]: string };
  setCookie: typeof serialize;
  env: { [key: string]: string };
};

type Env = {
  Variables: {
    prisma: PrismaClient;
  };
};

const getAdapter = (datasourceUrl: string) => {
  if (
    process.env.NODE_ENV !== "development" &&
    !datasourceUrl.startsWith("prisma:")
  ) {
    const url = new URL(datasourceUrl);
    const schema = url.searchParams.get("schema") ?? undefined;
    const pool = new Pool({
      connectionString: datasourceUrl,
    });
    return new PrismaPg(pool, { schema });
  }
  return null;
};

// Create a proxy that returns a PrismaClient instance on SessionContext with the variable name prisma
export const prisma: PrismaClient = new Proxy<PrismaClient>({} as never, {
  get(_target: unknown, props: keyof PrismaClient) {
    const context = getContext<Env>();
    if (!context.get("prisma")) {
      const datasourceUrl = process.env.DATABASE_URL as string;
      const adapter = getAdapter(datasourceUrl);
      const prisma = new PrismaClient({
        adapter,
        log: ["error"],
      });
      context.set("prisma", prisma as never);
    }
    return context.get("prisma")[props];
  },
});
