import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = new URL(process.env.DATABASE_URL!);
const searchPath = url.searchParams.get("schema") ?? "public";

export default defineConfig({
  out: "./drizzle",
  schema: "./app/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    schema: searchPath,
  },
});
