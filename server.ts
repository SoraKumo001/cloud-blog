import { Hono } from "hono";
import { contextStorage, getContext } from "hono/context-storage";
import { getLoadContext } from "load-context";
import { createRequestHandler } from "react-router";

const app = new Hono();
app.use(contextStorage());
app.use(async (_c, next) => {
  if (!Object.getOwnPropertyDescriptor(process, "env")?.get) {
    const processEnv = process.env;
    Object.defineProperty(process, "env", {
      get() {
        try {
          return { ...processEnv, ...getContext().env };
        } catch {
          return processEnv;
        }
      },
    });
  }
  return next();
});

app.use(async (c) => {
  // @ts-expect-error - virtual module provided by React Router at build time
  const build = await import("virtual:react-router/server-build");
  const handler = createRequestHandler(build, import.meta.env.MODE);

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
