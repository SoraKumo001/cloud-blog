/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { RemixServer } from "@remix-run/react";
import { renderToReadableStream } from "react-dom/server";
import { getUserFromToken } from "./libs/client/getUserFromToken";
import { getHost } from "./libs/server/getHost";
import { RootProvider } from "./libs/server/RootContext";
import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext
) {
  const rootValue = await getInitialProps(request, loadContext);
  const body = await renderToReadableStream(
    <RootProvider value={rootValue}>
      <RemixServer context={remixContext} url={request.url} />
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
  const env = loadContext.cloudflare.env;
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
