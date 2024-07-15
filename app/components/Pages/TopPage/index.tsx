import { FC, useMemo } from "react";
import { PostList } from "../../PostList";
import { Title } from "../../System/Title";
import { PostsQuery, usePostsQuery, useSystemQuery } from "@/generated/graphql";
import { useLoading } from "@/hooks/useLoading";

interface Props {}

/**
 * TopPage
 *
 * @param {Props} { }
 */
export const TopPage: FC<Props> = ({}) => {
  const [{ data: dataSystem }] = useSystemQuery();
  const [{ fetching, data }] = usePostsQuery();
  const posts = useMemo(() => {
    if (!data?.findManyPost) return undefined;
    return [...data.findManyPost].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [data?.findManyPost]);
  const categories = useMemo(() => {
    if (!data?.findManyPost) return undefined;
    const categoryPosts: {
      [key: string]: { name: string; posts: PostsQuery["findManyPost"] };
    } = {};
    data.findManyPost.forEach((post) => [
      post.categories.forEach((c) => {
        const value =
          categoryPosts[c.id] ??
          (categoryPosts[c.id] = { name: c.name, posts: [] });
        value.posts.push(post);
      }),
    ]);
    return Object.entries(categoryPosts).sort(([, a], [, b]) =>
      a.name < b.name ? -1 : 1
    );
  }, [data?.findManyPost]);
  const system = dataSystem?.findUniqueSystem;
  useLoading(fetching);

  if (!posts || !categories || !system) return null;
  return (
    <>
      <Title>{system.description || "Article List"}</Title>
      <div className="flex size-full flex-col gap-16 overflow-auto p-8">
        <PostList id="news" title="新着順" posts={posts} limit={10} />
        {categories.map(([id, { name, posts }]) => (
          <PostList key={id} id={id} title={name} posts={posts} limit={10} />
        ))}
      </div>
    </>
  );
};
