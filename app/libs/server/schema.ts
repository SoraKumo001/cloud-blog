import { InputObjectRef, ObjectRef } from "@pothos/core";
import { GraphQLScalarType, type GraphQLSchema } from "graphql";
import { createBuilder } from "./builder";
import * as inputs from "./inputs";
import * as mutations from "./mutations";
import * as objects from "./objects";
import * as queries from "./queries";

const createSchema = () => {
  let schema: GraphQLSchema;
  return () => {
    if (!schema) {
      const builder = createBuilder();

      for (const value of Object.values(objects)) {
        if (!(value instanceof ObjectRef)) {
          value(builder);
        }
      }
      for (const value of Object.values(inputs)) {
        if (!(value instanceof InputObjectRef)) {
          value(builder);
        }
      }

      builder.queryType({
        fields: (t) =>
          Object.fromEntries(
            Object.entries(queries).map(([name, query]) => [name, query(t)])
          ),
      });
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
