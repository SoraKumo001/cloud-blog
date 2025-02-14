import { FC, useEffect } from "react";
import { useLocation } from "react-router";
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
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
          />
          <script
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
