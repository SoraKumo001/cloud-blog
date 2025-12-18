import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const main = async () => {
  const connection = process.env.DATABASE_URL!;
  if (!connection) {
    throw new Error("DATABASE_URL is not set");
  }
  const db = drizzle({
    connection: {
      connectionString: process.env.DATABASE_URL!,
    },
  });

  const url = new URL(connection);
  const schema = process.argv[2] ?? url.searchParams.get("schema") ?? "public";
  // await db.execute(`create schema "${schema}" cascade`); //.catch(() => {});
  await db.execute(
    `DO $$ BEGIN EXECUTE format('ALTER ROLE %I SET search_path TO ${schema}', current_user); END; $$;`
  );
  db.$client.end();
  console.log(`search_path ${schema}`);
};

main();
