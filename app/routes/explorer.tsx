import { ApolloExplorer } from "@apollo/explorer/react";
import { printSchema } from "graphql";
import { LoaderFunctionArgs, useLoaderData } from "react-router";
import { schema } from "@/libs/server/schema";

const Explorer = () => {
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
  const s = schema({ env: context.cloudflare.env as never });
  return printSchema(s);
};
