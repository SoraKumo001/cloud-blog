import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import { PrismaClient } from "@prisma/client/edge";
import PothosPrismaGeneratorPlugin from "pothos-prisma-generator";
import { Context } from "./context";
import PrismaTypes from "@/generated/pothos-types";

/**
 * Create a new schema builder instance
 */

export type BuilderType = {
  PrismaTypes: PrismaTypes;
  Scalars: {
    Upload: {
      Input: File;
      Output: File;
    };
  };
  Context: Context;
};

export const createBuilder = (datasourceUrl: string) => {
  const builder = new SchemaBuilder<BuilderType>({
    plugins: [PrismaPlugin, PrismaUtils, PothosPrismaGeneratorPlugin],
    prisma: {
      client: new PrismaClient({
        datasourceUrl,
      }),
    },
    pothosPrismaGenerator: {
      authority: ({ context }) => (context.user ? ["USER"] : []),
      replace: { "%%USER%%": ({ context }) => context.user?.id },
    },
  });

  return builder;
};
