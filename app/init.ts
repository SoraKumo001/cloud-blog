type Env = {
  prisma: Fetcher;
  DATABASE_URL: string;
};

const getHost = (req: Request) => {
  const headers = req.headers;

  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  if (!host) return undefined;
  const proto =
    headers.get("x-forwarded-proto")?.toString().split(",")[0] ?? "http";
  return headers ? `${proto}://${host}` : undefined;
};

export const initFetch = (
  env: Env | Record<string, unknown> | unknown,
  request: Request,
  next?: (input?: Request | string, init?: RequestInit) => Promise<Response>
) => {
  const that = globalThis as typeof globalThis & { originFetch?: typeof fetch };
  if (that.originFetch) return;
  const originFetch = globalThis.fetch;
  that.originFetch = originFetch;
  const host = getHost(request);
  globalThis.fetch = (async (input: RequestInfo, init?: RequestInit) => {
    const url = new URL(input.toString());
    if (["127.0.0.1", "localhost"].includes(url.hostname)) {
      url.protocol = "http:";
      return originFetch(url.toString(), init);
    }
    if (next && url.hostname === host) {
      return next(input, init);
    }
    if (
      typeof env === "object" &&
      env &&
      "DATABASE_URL" in env &&
      "prisma" in env
    ) {
      const databaseURL = new URL(env.DATABASE_URL as string);
      if (url.hostname === databaseURL.hostname && env.prisma) {
        return (env.prisma as Fetcher).fetch(input, init);
      }
    }
    return originFetch(input, init);
  }) as typeof fetch;
};
