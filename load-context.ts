import { initFetch } from "./app/init";
import type { AppLoadContext } from "react-router";
import type { PlatformProxy } from "wrangler";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

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
  initFetch(env, request, cloudflare.next);

  return {
    ...context,
    ASSETS: { fetch: env.ASSETS },
  };
};
