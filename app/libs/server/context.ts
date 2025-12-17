import process from "node:process";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { getContext } from "hono/context-storage";
import type { Hyperdrive } from "@cloudflare/workers-types/experimental";
import type { serialize } from "cookie";
import type { user } from "~/db/schema";
import { relations } from "~/db/relations";
export type Context = {
  req: Request;
  db: NodePgDatabase<typeof relations, typeof relations>;
  user?: typeof user;
  cookies: { [key: string]: string };
  setCookie: typeof serialize;
  env: { [key: string]: string };
};

type Env = {
  Variables: {
    db: NodePgDatabase;
  };
  Bindings: {
    database: Hyperdrive;
  };
};

// Create a proxy that returns a PrismaClient instance on SessionContext with the variable name prisma
export const db: NodePgDatabase<typeof relations, typeof relations> = new Proxy<
  NodePgDatabase<typeof relations, typeof relations>
>({} as never, {
  get(_target: unknown, props: keyof NodePgDatabase) {
    const context = getContext<Env>();
    if (!context.get("db")) {
      const datasourceUrl =
        process.env.DATABASE_URL ??
        (process.env.database as { connectionString: string } | undefined)
          ?.connectionString;
      if (!datasourceUrl) throw new Error("DATABASE_URL is not set");
      const db = drizzle({
        connection: process.env.DATABASE_URL!,
        relations,
        logger: true,
      });
      context.set("db", db);
    }
    return context.get("db")[props];
  },
});
