import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import { getHost } from "@/libs/server/getHost";

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

type Env = {
  prisma: Fetcher;
  DATABASE_URL: string;
};

const initFetch = (
  env: Env,
  host: string | undefined,
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>
) => {
  const that = globalThis as typeof globalThis & { originFetch?: typeof fetch };
  if (that.originFetch) return;
  const originFetch = globalThis.fetch;
  that.originFetch = originFetch;
  globalThis.fetch = (async (input: RequestInfo, init?: RequestInit) => {
    const url = new URL(input.toString());
    if (["127.0.0.1", "localhost"].includes(url.hostname)) {
      url.protocol = "http:";
      return originFetch(url.toString(), init);
    }
    if (url.hostname === host) {
      return next(input, init);
    }
    const databaseURL = new URL(env.DATABASE_URL as string);
    if (url.hostname === databaseURL.hostname && env.prisma) {
      return (env.prisma as Fetcher).fetch(input, init);
    }
    return originFetch(input, init);
  }) as typeof fetch;
};

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => {
    const env = context.context.cloudflare.env;
    const host = getHost(context.context.cloudflare.request);
    initFetch(env, host, context.context.cloudflare.next);
    return context;
  },
  mode: build.mode,
});
