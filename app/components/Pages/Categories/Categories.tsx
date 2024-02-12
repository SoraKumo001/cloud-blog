import { FC, useMemo } from "react";
import { PostList } from "@/components/PostList";
import { Title } from "@/components/System/Title";
import { useCategoryQuery, usePostsQuery } from "@/generated/graphql";
import { useLoading } from "@/hooks/useLoading";
import styled from "./Categories.module.css";

interface Props {
  id: string;
}

/**
 * Categories
 *
 * @param {Props} { }
 */
export const Categories: FC<Props> = ({ id }) => {
  const [{ fetching, data }] = usePostsQuery();
  const [{ fetching: fetchingCategory, data: category }] = useCategoryQuery({
    variables: { id: id ?? "" },
    pause: id === "news",
  });
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
  }, [id, data?.findManyPost]);
  useLoading([fetching, fetchingCategory]);
  if (!posts) return null;
  return (
    <>
      <Title>一覧</Title>
      <div className={styled.root}>
        <PostList
          title={
            id === "news" ? "新着順" : category?.findUniqueCategory.name ?? ""
          }
          posts={posts}
        />
      </div>
    </>
  );
};
