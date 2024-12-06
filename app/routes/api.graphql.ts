import { parse, serialize } from "cookie";
import { createYoga } from "graphql-yoga";
import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { Context, prisma } from "../libs/server/context";
import { schema } from "../libs/server/schema";
import { getUserFromToken } from "@/libs/client/getUserFromToken";

const yoga = createYoga<
  {
    request: Request;
    env: { [key: string]: string };
    responseCookies: string[];
  },
  Context
>({
  schema,
  fetchAPI: { Response },
  context: async ({ request: req, env, responseCookies }) => {
    const cookies = parse(req.headers.get("Cookie") || "");
    const token = cookies["auth-token"];
    const user = await getUserFromToken({ token, secret: env.SECRET_KEY });
    const setCookie: typeof serialize = (name, value, options) => {
      const result = serialize(name, value, options);
      responseCookies.push(result);
      return result;
    };
    return {
      req,
      env,
      prisma,
      user,
      cookies,
      setCookie,
    } as never;
  },
});

export async function action({ request, context }: ActionFunctionArgs) {
  const env = context.cloudflare.env as unknown as { [key: string]: string };
  const responseCookies: string[] = [];
  const response = await yoga.handleRequest(request, {
    request,
    env: env,
    responseCookies,
  });
  responseCookies.forEach((v) => {
    response.headers.append("set-cookie", v);
  });
  return new Response(response.body, response);
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const env = context.cloudflare.env as unknown as { [key: string]: string };
  const responseCookies: string[] = [];
  const response = await yoga.handleRequest(request, {
    request,
    env,
    responseCookies,
  });
  responseCookies.forEach((v) => {
    response.headers.append("set-cookie", v);
  });
  return new Response(response.body, response);
}
