import { semaphore } from "@node-libraries/semaphore";
import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}
const s = semaphore(1);

const initFetch = (env: Record<string, unknown>) => {
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
      if ((await s.acquire()) !== false) {
        await new Promise<undefined>((resolve) => setTimeout(resolve, 0));
      }
      s.release();
      const result = (env.prisma as Fetcher).fetch(input, init);
      return result;
    }
    return originFetch(input, init);
  }) as typeof fetch;
};

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => {
    initFetch(context.env);
    (globalThis as { process: object }).process = {
      env: context.env,
    };
    return context;
  },
  mode: build.mode,
});
