import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { getLoadContext } from "load-context";
import { createRequestHandler } from "react-router";

const app = new Hono();
app.use(contextStorage());

app.use(async (c) => {
  // @ts-ignore
  const build = await import("../build/server/index.js");
  // @ts-ignore
  const handler = createRequestHandler(build, import.meta.env?.MODE);

  const next = (input: Request | string, init?: RequestInit) => {
    return handler(new Request(input, init), {
      cloudflare: { env: c.env },
    });
  };
  const context = getLoadContext({
    request: c.req.raw,
    context: {
      cloudflare: {
        env: c.env,
        next,
      },
    } as never,
  });
  return handler(c.req.raw, context);
});

export default app;
