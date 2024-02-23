import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

type Env = {
  prisma: Fetcher;
  DATABASE_URL: string;
};

const initFetch = (env: Env) => {
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
    initFetch(context.env);
    return context;
  },
  mode: build.mode,
});
