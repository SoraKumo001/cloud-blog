import process from "node:process";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
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
  Bindings: {
    database: Hyperdrive;
  };
};

const getAdapter = (datasourceUrl: string) => {
  const url = new URL(datasourceUrl);
  const schema = url.searchParams.get("schema") ?? undefined;
  return new PrismaPg({ connectionString: datasourceUrl }, { schema });
};

// Create a proxy that returns a PrismaClient instance on SessionContext with the variable name prisma
export const prisma: PrismaClient = new Proxy<PrismaClient>({} as never, {
  get(_target: unknown, props: keyof PrismaClient) {
    const context = getContext<Env>();
    if (!context.get("prisma")) {
      const datasourceUrl =
        process.env.DATABASE_URL ??
        (process.env.database as { connectionString: string } | undefined)
          ?.connectionString;
      if (!datasourceUrl) throw new Error("DATABASE_URL is not set");
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
