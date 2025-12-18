import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  user: {
    post: r.many.post({
      from: r.user.id,
      to: r.post.authorId,
    }),
  },
  post: {
    author: r.one.user({
      from: r.post.authorId,
      to: r.user.id,
    }),
    card: r.one.fireStore({
      from: r.post.cardId,
      to: r.fireStore.id,
    }),
    categories: r.many.category({
      from: r.post.id.through(r.categoryToPost.postId),
      to: r.category.id.through(r.categoryToPost.categoryId),
    }),
    postFiles: r.many.fireStore({
      from: r.post.id.through(r.fireStoreToPost.postId),
      to: r.fireStore.id.through(r.fireStoreToPost.fireStoreId),
    }),
  },
  category: {
    posts: r.many.post({
      from: r.category.id.through(r.categoryToPost.categoryId),
      to: r.post.id.through(r.categoryToPost.postId),
    }),
  },
  system: {
    icon: r.one.fireStore({
      from: r.system.iconId,
      to: r.fireStore.id,
    }),
    card: r.one.fireStore({
      from: r.system.cardId,
      to: r.fireStore.id,
    }),
  },
  fireStore: {
    systemIcons: r.many.system({
      from: r.fireStore.id,
      to: r.system.iconId,
    }),
    systemCards: r.many.system({
      from: r.fireStore.id,
      to: r.system.cardId,
    }),
    postCards: r.many.post({
      from: r.fireStore.id,
      to: r.post.cardId,
    }),
    posts: r.many.post({
      from: r.fireStore.id.through(r.fireStoreToPost.fireStoreId),
      to: r.post.id.through(r.fireStoreToPost.postId),
    }),
  },
  categoryToPost: {
    post: r.one.post({
      from: r.categoryToPost.postId,
      to: r.post.id,
    }),
    category: r.one.category({
      from: r.categoryToPost.categoryId,
      to: r.category.id,
    }),
  },
  fireStoreToPost: {
    post: r.one.post({
      from: r.fireStoreToPost.postId,
      to: r.post.id,
    }),
    fireStore: r.one.fireStore({
      from: r.fireStoreToPost.fireStoreId,
      to: r.fireStore.id,
    }),
  },
}));
