import { ApolloExplorer } from "@apollo/explorer/react";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { printSchema } from "graphql";
import { createBuilder } from "../libs/server/builder";

export const Explorer = () => {
  const schema = useLoaderData<string>();
  return (
    <>
      <style>{`
        .explorer {
          position: fixed;
          height: 100vh;
          width: 100vw;
          top: 0;
          left: 0;
        }
      `}</style>
      <ApolloExplorer
        className="explorer"
        schema={schema}
        endpointUrl="/api/graphql"
        persistExplorerState={true}
        handleRequest={(url, option) =>
          fetch(url, { ...option, credentials: "same-origin" })
        }
      />
    </>
  );
};
export default Explorer;
export const loader = async ({ context }: LoaderFunctionArgs) => {
  const DATABASE_URL = (context.env as { DATABASE_URL: string }).DATABASE_URL;
  const builder = createBuilder(DATABASE_URL);
  return printSchema(builder.toSchema({ sortSchema: false }));
};
