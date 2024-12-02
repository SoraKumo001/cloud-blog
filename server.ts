import { createRequestHandler } from "@remix-run/cloudflare";
import { Hono } from "hono";
import { contextStorage, getContext } from "hono/context-storage";
import { getLoadContext } from "load-context";

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
  const build =
    process.env.NODE_ENV !== "development"
      ? import("./build/server")
      : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        import("virtual:remix/server-build");
  const handler = createRequestHandler(await build);
  const next = (input: Request | string, init?: RequestInit) => {
    return handler(new Request(input, init), {
      cloudflare: { env: c.env },
    } as never);
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
