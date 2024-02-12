import { Link, useNavigate } from "@remix-run/react";
import { FC } from "react";
import { Button } from "react-daisyui";
import {
  MdCreate as CreateIcon,
  MdHome as HomeIcon,
  MdLogin as LoginIcon,
  MdLogout as LogoutIcon,
  MdSettings as SettingsIcon,
} from "react-icons/md";
import { Head } from "@/components/Commons/Head";
import { useSystemQuery } from "@/generated/graphql";
import { useUser, useSignOut } from "@/hooks/useAuth";
import { useFirebaseUrl } from "@/hooks/useFirebaseUrl";
import { useLoading } from "@/hooks/useLoading";
import styled from "./Header.module.css";

interface Props {}

/**
 * Header
 *
 * @param {Props} { }
 */
export const Header: FC<Props> = () => {
  const navigate = useNavigate();
  const session = useUser();
  const [{ data, fetching, error }] = useSystemQuery();
  const signOut = useSignOut();
  useLoading(fetching);
  const getFirebaseUrl = useFirebaseUrl();
  if (!data && !error) return null;
  const favicon =
    data?.findUniqueSystem.icon &&
    getFirebaseUrl(data.findUniqueSystem.icon.id);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
        <meta name="description" content={data?.findUniqueSystem.description} />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/sitemap.xml"
          title="RSS2.0"
        />
        {favicon && <link rel="icon" href={favicon} />}
      </Head>
      <header className={styled.root}>
        <Link className={styled.title} to="/">
          <HomeIcon fontSize="large" size={24} />
          {data?.findUniqueSystem.title}
        </Link>
        <div className="flex gap-1">
          {session && (
            <>
              <Button
                variant="outline"
                color="primary"
                size="sm"
                onClick={() => {
                  navigate("/edit");
                }}
                aria-label="create post"
              >
                <CreateIcon size={24} />
              </Button>
              <Button
                variant="outline"
                color="primary"
                size="sm"
                onClick={() => {
                  navigate("/settings");
                }}
                aria-label="setting"
              >
                <SettingsIcon size={24} />
              </Button>
              <Button
                variant="outline"
                color="primary"
                size="sm"
                onClick={() => {
                  signOut();
                }}
                aria-label="logout"
              >
                <LogoutIcon size={24} />
              </Button>
            </>
          )}

          {!session && (
            <Button
              variant="outline"
              color="primary"
              size="sm"
              onClick={() => {
                navigate("/login");
              }}
              aria-label="login"
            >
              <LoginIcon size={24} />
            </Button>
          )}
        </div>
      </header>
    </>
  );
};
