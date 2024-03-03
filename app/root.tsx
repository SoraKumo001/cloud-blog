import { NextSSRWait } from "@react-libraries/next-exchange-ssr";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { GoogleAnalytics } from "./components/Commons/GoogleAnalytics";
import { HeadProvider, HeadRoot } from "./components/Commons/Head";
import { EnvProvider } from "./components/Provider/EnvProvider";
import { UrqlProvider } from "./components/Provider/UrqlProvider";
import { Header } from "./components/System/Header";
import { LoadingContainer } from "./components/System/LoadingContainer";
import { NotificationContainer } from "./components/System/Notification/NotificationContainer";
import { StoreProvider } from "./libs/client/context";
import { RootValue, useRootContext } from "./libs/server/RootContext";
import stylesheet from "./tailwind.css?url";
import type { LinksFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  const value = useRootContext();
  const { host, session, cookie, env } = value;
  return (
    <html lang="ja">
      <EnvProvider value={env}>
        <StoreProvider initState={() => ({ host, user: session })}>
          <UrqlProvider host={host} cookie={cookie}>
            <HeadProvider>
              <head>
                <meta charSet="utf-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                  rel="preconnect"
                  href="https://fonts.gstatic.com"
                  crossOrigin="anonymous"
                />
                <Meta />
                <Links />
                <GoogleAnalytics />
                <RootValue value={{ session, env }} />
                <NextSSRWait>
                  <HeadRoot />
                </NextSSRWait>
              </head>
              <body>
                <div className={"flex h-screen flex-col"}>
                  <Header />
                  <main className="relative flex-1 overflow-hidden">
                    <Outlet />
                  </main>
                  <LoadingContainer />
                  <NotificationContainer />
                </div>
                <ScrollRestoration />
                <Scripts />
              </body>
            </HeadProvider>
          </UrqlProvider>
        </StoreProvider>
      </EnvProvider>
    </html>
  );
}
