import { explorer } from "apollo-explorer/html";

export const loader = async () => {
  return new Response(
    explorer({
      initialState: {
        // Set up sample GraphQL operations
        // document: generate(schema, 1),
      },
      endpointUrl: "/api/graphql",
      introspectionInterval: 10000,
    }),
    { headers: { "Content-Type": "text/html" } }
  );
};
