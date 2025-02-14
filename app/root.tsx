import { NextSSRWait } from "@react-libraries/next-exchange-ssr";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { GoogleAnalytics } from "./components/Commons/GoogleAnalytics";
import { HeadProvider, HeadRoot } from "./components/Commons/Head";
import { EnvProvider } from "./components/Provider/EnvProvider";
import { UrqlProvider } from "./components/Provider/UrqlProvider";
import { Header } from "./components/System/Header";
import { LoadingContainer } from "./components/System/LoadingContainer";
import { NotificationContainer } from "./components/System/Notification/NotificationContainer";
import { CloudflareFonts } from "./libs/client/CloudflareFonts";
import { StoreProvider } from "./libs/client/context";
import { RootValue, useRootContext } from "./libs/server/RootContext";
import css from "./tailwind.css?inline";
import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const value = useRootContext();
  const { host, session, cookie, env } = value;
  const { pathname } = useLocation();
  return (
    <html lang="ja">
      <EnvProvider value={env}>
        <StoreProvider initState={() => ({ host, user: session })}>
          <UrqlProvider host={host} cookie={cookie}>
            <HeadProvider>
              <head>
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{ __html: css }}
                />
                {/* <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap"
                /> */}
                <Meta />
                <Links />
                <GoogleAnalytics />
                <RootValue value={{ session, env }} />
                <NextSSRWait>
                  <HeadRoot />
                </NextSSRWait>
                <CloudflareFonts href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap" />
              </head>
              <body>
                <div className={"flex h-screen flex-col"}>
                  <Header />
                  <main
                    className="relative flex-1 overflow-hidden starting:opacity-50 opacity-100 transition-opacity duration-200 ease-in-out"
                    key={pathname}
                  >
                    {children}
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
export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
