import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const main = async () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const url = new URL(connectionString);
  const searchPath = url.searchParams.get("schema") ?? "public";
  const db = drizzle({
    connection: {
      connectionString,
      options: `--search_path=${searchPath}`,
    },
  });

  await db.execute(`drop schema ${searchPath} cascade`).catch(() => {});
  db.$client.end();
  console.log(`reset ${searchPath}`);
};

main();
