import { useLocation } from "@remix-run/react";
import { FC, useEffect } from "react";
import { useEnv } from "@/components/Provider/EnvProvider";

interface Props {}

/**
 * GoogleAnalytics
 *
 * @param {Props} { }
 */
export const GoogleAnalytics: FC<Props> = ({}) => {
  const env = useEnv();
  const id = env.NEXT_PUBLIC_measurementId;
  const location = useLocation();
  useEffect(() => {
    if (id) {
      (
        window as {
          gtag?: (name: string, id: string, config: object) => void;
        }
      ).gtag?.("config", id, {
        page_path: location.pathname,
      });
    }
  }, [location, id]);
  return (
    <>
      {id && (
        <>
          <script
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
          />
          <script
            id="ga"
            defer
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${id}');
          `,
            }}
          />
        </>
      )}
    </>
  );
};
