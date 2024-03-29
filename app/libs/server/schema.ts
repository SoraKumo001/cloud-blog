import { GraphQLScalarType, GraphQLSchema } from "graphql";

import { createBuilder } from "./builder";
import * as mutations from "./mutations";

const createSchema = () => {
  let schema: GraphQLSchema;
  return ({ env }: { env: { [key: string]: string | undefined } }) => {
    if (!schema) {
      const builder = createBuilder(env.DATABASE_URL ?? "");
      builder.mutationType({
        fields: (t) =>
          Object.fromEntries(
            Object.entries(mutations).map(([name, mutation]) => [
              name,
              mutation(t),
            ])
          ),
      });
      const Upload = new GraphQLScalarType({
        name: "Upload",
      });
      builder.addScalarType("Upload", Upload, {});
      schema = builder.toSchema({ sortSchema: false });
    }
    return schema;
  };
};

export const schema = createSchema();
