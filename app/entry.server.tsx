import { renderToReadableStream } from "react-dom/server";
import { ServerRouter } from "react-router";
import { getUserFromToken } from "./libs/client/getUserFromToken";
import { getHost } from "./libs/server/getHost";
import { RootProvider } from "./libs/server/RootContext";
import type { AppLoadContext, EntryContext } from "react-router";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!

  loadContext: AppLoadContext
) {
  const rootValue = await getInitialProps(request, loadContext);
  const body = await renderToReadableStream(
    <RootProvider value={rootValue}>
      <ServerRouter context={routerContext} url={request.url} />
    </RootProvider>,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  await body.allReady;

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
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
