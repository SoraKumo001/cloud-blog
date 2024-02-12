export const getHost = (req: Request) => {
  const headers = req.headers;

  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  if (!host) return undefined;
  const proto =
    headers.get("x-forwarded-proto")?.toString().split(",")[0] ?? "http";
  return headers ? `${proto}://${host}` : undefined;
};
