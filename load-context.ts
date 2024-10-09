import { AppLoadContext } from "@remix-run/cloudflare";
import { type PlatformProxy } from "wrangler";
import { initFetch } from "./app/init";

// When using `wrangler.toml` to configure bindings,
// `wrangler types` will generate types for those bindings
// into the global `Env` interface.
// Need this empty interface so that typechecking passes
// even if no `wrangler.toml` exists.

interface Env {
  SECRET_KEY: string;
  DATABASE_URL: string;
  ASSETS: Fetcher;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: {
    cloudflare: Cloudflare & {
      next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
    };
  };
}) => AppLoadContext;

export const getLoadContext: GetLoadContext = (p) => {
  const { request, context } = p;
  const cloudflare = context.cloudflare;
  const env = cloudflare.env;
  initFetch(env as never, request, cloudflare.next);

  return {
    ...context,
    ASSETS: { fetch: env.ASSETS },
  };
};
