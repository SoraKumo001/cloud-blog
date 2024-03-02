import { GetLoadContextFunction } from "@remix-run/cloudflare-pages";
import { type PlatformProxy } from "wrangler";
import { initFetch } from "./app/init";
import { AppLoadContext } from "@remix-run/cloudflare";

// When using `wrangler.toml` to configure bindings,
// `wrangler types` will generate types for those bindings
// into the global `Env` interface.
// Need this empty interface so that typechecking passes
// even if no `wrangler.toml` exists.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Env {
  SECRET_KEY: string;
  DATABASE_URL: string;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare };
}) => AppLoadContext;

export const getLoadContext: GetLoadContext & GetLoadContextFunction<Env> = ({
  context,
  request,
}) => {
  const cloudflare = context.cloudflare;
  const env = cloudflare.env;
  const next = "next" in cloudflare ? cloudflare.next : undefined;
  initFetch(env, request, next);

  return {
    ...context,
    ASSETS: { fetch },
  };
};
