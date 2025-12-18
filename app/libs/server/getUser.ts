import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { relations } from "~/db/relations";
import { user } from "~/db/schema";

export const getUser = async (
  db: NodePgDatabase<typeof relations, typeof relations>,
  name: string,
  email: string
) => {
  const u = await db.query.user.findFirst({ where: { email } });
  if (u) return u;

  if (await db.$count(user)) {
    return null;
  }
  const newUser = await db.insert(user).values({
    name,
    email,
  });
  return newUser;
};
