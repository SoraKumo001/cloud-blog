import {
  NextSSRProvider,
  useCreateNextSSRExchange,
} from "@react-libraries/next-exchange-ssr";

import { RetryExchangeOptions, retryExchange } from "@urql/exchange-retry";
import { ReactNode, useMemo } from "react";
import { cacheExchange, Client, fetchExchange, Provider } from "urql";
import { useUser } from "../../hooks/useAuth";

const isServerSide = typeof window === "undefined";
const endpoint = "/api/graphql";

const options: RetryExchangeOptions = {
  maxDelayMs: 3000,
  randomDelay: false,
};

export const UrqlProvider = ({
  host,
  cookie,
  children,
  next,
}: {
  host?: string;
  cookie?: string;
  children: ReactNode;
  next: typeof fetch;
}) => {
  const session = useUser();
  const nextSSRExchange = useCreateNextSSRExchange();
  const client = useMemo(() => {
    const url = isServerSide ? `${host}${endpoint}` : endpoint;
    return new Client({
      url,
      fetchOptions: {
        headers: {
          "apollo-require-preflight": "true",
          cookie: (session && cookie) || "",
        },
      },
      fetch: next instanceof Function ? next : undefined,
      suspense: isServerSide,
      exchanges: [
        cacheExchange,
        nextSSRExchange,
        retryExchange(options),
        fetchExchange,
      ],
    });
  }, [host, nextSSRExchange, session, cookie, next]);
  return (
    <Provider value={client}>
      <NextSSRProvider>{children}</NextSSRProvider>
    </Provider>
  );
};
