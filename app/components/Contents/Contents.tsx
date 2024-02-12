import { Link, useNavigate } from "@remix-run/react";
import { FC, useEffect, useMemo } from "react";
import { Button } from "react-daisyui";
import { MdEditNote as EditIcon } from "react-icons/md";
import { Image } from "@/components/Commons/Image";
import { usePostQuery } from "@/generated/graphql";
import { useUser } from "@/hooks/useAuth";
import { useFirebaseUrl } from "@/hooks/useFirebaseUrl";
import { useLoading } from "@/hooks/useLoading";
import { useMarkdown } from "@/hooks/useMarkdown";
import { DateString } from "@/libs/client/dateString";
import styled from "./Contents.module.css";
import { Head } from "../Commons/Head";
import { ContentMarkdown } from "../ContentMarkdown";
import { ContentTable } from "../ContentTable";
import { Title } from "../System/Title";

const context = { additionalTypenames: ["Category"] };

interface Props {
  id: string;
}

/**
 * Contents
 *
 * @param {Props} { }
 */
export const Contents: FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const [{ data, fetching, error }] = usePostQuery({
    variables: { postId: id },
    context,
  });
  useEffect(() => {
    if (error) console.error(error);
  }, [navigate, error]);
  const [children, vnode] = useMarkdown(data?.findUniquePost.content);
  const session = useUser();
  const categories = useMemo(() => {
    return [...(data?.findUniquePost.categories ?? [])].sort((a, b) =>
      a.name < b.name ? -1 : 1
    );
  }, [data]);
  const getFirebaseUrl = useFirebaseUrl();
  useLoading(fetching);
  const image =
    data?.findUniquePost.cardId && getFirebaseUrl(data.findUniquePost.cardId);
  if (!data) return null;

  return (
    <>
      <Head>
        <meta
          name="date"
          content={new Date(data.findUniquePost.updatedAt).toISOString()}
        />
      </Head>
      <Title image={image}>{data.findUniquePost.title}</Title>
      <div className={styled.root}>
        {session && (
          <Button
            variant="outline"
            size="sm"
            className={styled.edit}
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
          >
            <EditIcon size={24} />
          </Button>
        )}
        <h1 className={styled.title} id="header-top">
          {image ? (
            <Image
              className={styled.card}
              src={image}
              alt="Eye catch"
              width={80}
              height={80}
            />
          ) : (
            <div className={styled.cardText}>📖</div>
          )}
          {data.findUniquePost.title}
        </h1>
        <div className={styled.separator}>
          <ContentTable
            className={styled.table}
            title={data.findUniquePost.title}
            vnode={vnode}
          />
          <div className={styled.main}>
            <div className={styled.date}>
              <span className={styled.label}>publication: </span>
              <span className={styled.value}>
                {DateString(data.findUniquePost.publishedAt)}
              </span>
            </div>
            <div className={styled.date}>
              <span className={styled.label}>update:</span>
              <span className={styled.value}>
                {DateString(data.findUniquePost.updatedAt)}
              </span>
            </div>
            {categories.length > 0 && (
              <div className={styled.categories}>
                {categories.map(({ id, name }) => (
                  <Link
                    className={styled.category}
                    key={id}
                    to={`/category/${id}`}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            )}
            <ContentMarkdown className={styled.content}>
              {children}
            </ContentMarkdown>
          </div>
        </div>
      </div>
    </>
  );
};
