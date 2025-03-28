import { ApolloExplorer } from "apollo-explorer";
import { printSchema } from "graphql";
import { LoaderFunctionArgs, useLoaderData } from "react-router";
import { schema } from "@/libs/server/schema";

const Explorer = () => {
  const schema = useLoaderData<string>();
  return (
    <ApolloExplorer
      className="fixed inset-0 z-50"
      explorer={{
        schema: schema,
        endpointUrl: "/api/graphql",
      }}
    />
  );
};
export default Explorer;
export const loader = async ({ context }: LoaderFunctionArgs) => {
  const s = schema({ env: context.cloudflare.env as never });
  return printSchema(s);
};
