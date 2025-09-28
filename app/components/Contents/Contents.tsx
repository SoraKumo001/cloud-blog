import { type FC, useEffect, useMemo } from "react";
import { Button } from "react-daisyui";
import { MdEditNote as EditIcon } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { Head } from "../Commons/Head";
import { ContentTable } from "../ContentTable";
import { MarkdownContent } from "../MarkdownContent";
import { Title } from "../System/Title";
import { Image } from "~/components/Commons/Image";
import { usePostQuery } from "~/generated/graphql";
import { useUser } from "~/hooks/useAuth";
import { useFirebaseUrl } from "~/hooks/useFirebaseUrl";
import { useLoading } from "~/hooks/useLoading";
import { DateString } from "~/libs/client/dateString";
import { useMarkdown } from "~/libs/client/markdownConverter";

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
  }, [error]);
  const [children, tree] = useMarkdown({
    markdown: data?.findUniquePost?.content,
  });
  const session = useUser();
  const categories = useMemo(() => {
    return [...(data?.findUniquePost?.categories ?? [])].sort((a, b) =>
      a.name < b.name ? -1 : 1
    );
  }, [data]);
  const getFirebaseUrl = useFirebaseUrl();
  useLoading(fetching);
  const image =
    data?.findUniquePost?.cardId && getFirebaseUrl(data.findUniquePost.cardId);
  if (!data?.findUniquePost) return null;

  return (
    <>
      <Head>
        <meta
          name="date"
          content={new Date(data.findUniquePost?.updatedAt).toISOString()}
        />
      </Head>
      <Title image={image}>{data.findUniquePost?.title}</Title>
      <div className="relative h-full w-full overflow-x-hidden overflow-y-scroll">
        {session && (
          <Button
            variant="outline"
            size="sm"
            className="fixed top-24 right-8 z-10"
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
          >
            <EditIcon size={24} />
          </Button>
        )}
        <h1
          className="m-4 inline-flex flex-nowrap items-center justify-center gap-4 border-b-2 border-gray-300 p-2 px-8 text-center text-3xl leading-10"
          id="header-top"
        >
          {image ? (
            <Image
              className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full text-base"
              src={image}
              alt="Eye catch"
              width={80}
              height={80}
              isOptimize
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full text-6xl">
              📖
            </div>
          )}
          <div className="flex-1">{data.findUniquePost.title}</div>
        </h1>
        <div className="m-auto flex max-w-[1440px] flex-row-reverse items-start justify-center gap-2 px-2">
          <ContentTable
            className="sticky top-0 mx-auto max-w-xs px-4"
            title={data.findUniquePost.title}
            tree={tree}
          />
          <div className={"w-full overflow-hidden"}>
            <div className={"px-8 text-end font-mono text-gray-500"}>
              <span className="inline-block w-32">publication: </span>
              <span className="inline-block w-24">
                {DateString(data.findUniquePost.publishedAt)}
              </span>
            </div>
            <div className={"px-8 text-end font-mono text-gray-500"}>
              <span className="inline-block w-32">update:</span>
              <span className="inline-block w-24">
                {DateString(data.findUniquePost.updatedAt)}
              </span>
            </div>
            {categories.length > 0 && (
              <div className="m-4 flex flex-wrap gap-2">
                {categories.map(({ id, name }) => (
                  <Link
                    className={
                      "rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-300"
                    }
                    key={id}
                    to={`/category/${id}`}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            )}
            <MarkdownContent className="relative z-10 flex-1 overflow-x-hidden rounded border bg-slate-100 p-4 shadow">
              {children}
            </MarkdownContent>
          </div>
        </div>
      </div>
    </>
  );
};
