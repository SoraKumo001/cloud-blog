import { useMemo } from "react";
import type { FC } from "react";
import { PostList } from "~/components/PostList";
import { Title } from "~/components/System/Title";
import { useFindCategoryQuery, useFindPostsQuery } from "~/generated/graphql";
import { useLoading } from "~/hooks/useLoading";

interface Props {
  id: string;
}

/**
 * Categories
 *
 * @param {Props} { }
 */
export const Categories: FC<Props> = ({ id }) => {
  const [{ fetching, data }] = useFindPostsQuery();
  const [{ fetching: fetchingCategory, data: category }] = useFindCategoryQuery(
    {
      variables: { id: id ?? "" },
      pause: id === "news",
    }
  );
  const posts = useMemo(() => {
    if (!data?.findManyPost) return undefined;
    return [...data.findManyPost]
      .filter(
        (post) =>
          id === "news" ||
          post.categories.some((category) => category.id === id)
      )
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  }, [id, data]);
  useLoading([fetching, fetchingCategory]);
  if (!posts) return null;
  return (
    <>
      <Title>一覧</Title>
      <div className="flex h-full w-full flex-col gap-16 overflow-auto p-8">
        <PostList
          title={
            id === "news" ? "新着順" : category?.findFirstCategory?.name ?? ""
          }
          posts={posts}
        />
      </div>
    </>
  );
};
