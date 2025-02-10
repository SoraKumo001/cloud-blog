import { renderToReadableStream } from "react-dom/server";
import { isRouteErrorResponse, ServerRouter } from "react-router";
import { getUserFromToken } from "./libs/client/getUserFromToken";
import { getHost } from "./libs/server/getHost";
import { RootProvider } from "./libs/server/RootContext";
import type {
  ActionFunctionArgs,
  AppLoadContext,
  EntryContext,
  LoaderFunctionArgs,
} from "react-router";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext
) {
  let status = responseStatusCode;
  const rootValue = await getInitialProps(request, loadContext);
  const body = await renderToReadableStream(
    <RootProvider value={rootValue}>
      <ServerRouter context={routerContext} url={request.url} />
    </RootProvider>,
    {
      signal: request.signal,
      onError(error: unknown) {
        console.error(error);
        status = 500;
      },
    }
  );
  // await body.allReady;

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status,
  });
}

export function handleError(
  error: unknown,
  { request }: LoaderFunctionArgs | ActionFunctionArgs
) {
  if (
    (isRouteErrorResponse(error) && error.status === 404) ||
    request.signal.aborted
  ) {
    return;
  }
  console.error(error);
}

const getInitialProps = async (
  request: Request,
  loadContext: AppLoadContext
) => {
  const env = (loadContext as { cloudflare: { env: Record<string, string> } })
    .cloudflare.env;
  const cookie = request.headers.get("cookie");
  const cookies = Object.fromEntries(
    cookie?.split(";").map((v) => v.trim().split("=")) ?? []
  );
  const token = cookies["auth-token"];
  const session = await getUserFromToken({ token, secret: env.SECRET_KEY });
  const host = getHost(request);
  return {
    cookie: String(cookie),
    host,
    session: session && { name: session.name, email: session.email },
    env: Object.fromEntries(
      Object.entries(env).filter(([v]) => v.startsWith("NEXT_PUBLIC_"))
    ),
  };
};
