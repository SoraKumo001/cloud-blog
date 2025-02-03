import { AppLoadContext, createRequestHandler } from "react-router";
import * as build from "../build/server";
import { getLoadContext } from "../load-context";

const handler = createRequestHandler(build as never);

const fetch = async (req: Request, env: AppLoadContext) => {
  const next = (input: Request | string, init?: RequestInit) => {
    return handler(new Request(input, init), { cloudflare: { env } } as never);
  };
  const context = getLoadContext({
    request: req,
    context: { cloudflare: { env, next } } as never,
  });
  return handler(req, context as never);
};

export default { fetch };
