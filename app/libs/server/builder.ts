import SchemaBuilder from "@pothos/core";
import DrizzlePlugin from "@pothos/plugin-drizzle";
import { getTableConfig } from "drizzle-orm/pg-core";
import PothosDrizzleGeneratorPlugin from "pothos-drizzle-generator";
import { db, type Context } from "./context";
import { relations } from "~/db/relations";

/**
 * Create a new schema builder instance
 */

export type BuilderType = {
  DrizzleRelations: typeof relations;
  Scalars: {
    Upload: {
      Input: File;
      Output: File;
    };
  };
  Context: Context;
};

export const createBuilder = () => {
  const builder = new SchemaBuilder<BuilderType>({
    plugins: [DrizzlePlugin, PothosDrizzleGeneratorPlugin],
    drizzle: {
      client: () => db,
      relations,
      getTableConfig,
    },
    pothosDrizzleGenerator: {},
  });
  return builder;
};
