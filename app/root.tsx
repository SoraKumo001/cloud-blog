import { NextSSRWait } from "@react-libraries/next-exchange-ssr";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "@/tailwind.css";
import { GoogleAnalytics } from "./components/Commons/GoogleAnalytics";
import { HeadProvider, HeadRoot } from "./components/Commons/Head";
import { EnvProvider } from "./components/Provider/EnvProvider";
import { UrqlProvider } from "./components/Provider/UrqlProvider";
import { Header } from "./components/System/Header";
import { LoadingContainer } from "./components/System/LoadingContainer";
import { NotificationContainer } from "./components/System/Notification/NotificationContainer";
import { StoreProvider } from "./libs/client/context";
import { useRootContext } from "./libs/server/RootContext";
import type { LinksFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const DATA_NAME = "__ROOT_VALUE__";

const RootValue = ({ value }: { value: unknown }) => {
  return (
    <script
      id={DATA_NAME}
      type="application/json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(value).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default function App() {
  const value = useRootContext();
  const { host, session, cookie, env } = value;
  return (
    <EnvProvider value={env}>
      <StoreProvider initState={() => ({ host, user: session })}>
        <UrqlProvider host={host} cookie={cookie}>
          <HeadProvider>
            <html lang="en">
              <head>
                <meta charSet="utf-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
                <RootValue value={{ session, env }} />
                <GoogleAnalytics />
                <NextSSRWait>
                  <HeadRoot />
                </NextSSRWait>
              </head>
              <body>
                <div
                  className={"flex h-screen flex-col"}
                  style={
                    {
                      // fontFamily: `${roboto.style.fontFamily} ,${noto.style.fontFamily}`,
                    }
                  }
                >
                  <Header />
                  <main className="relative flex-1 overflow-hidden">
                    <Outlet />
                  </main>
                  <LoadingContainer />
                  <NotificationContainer />
                </div>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
              </body>
            </html>
          </HeadProvider>
        </UrqlProvider>
      </StoreProvider>
    </EnvProvider>
  );
}
