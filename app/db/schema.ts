import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const user = pgTable("User", {
  id: text("id")
    .notNull()
    .primaryKey()
    .default(sql`uuid(4)`),
  email: text("email").notNull().unique(),
  name: text("name").notNull().default("User"),
  createdAt: timestamp("createdAt", { precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { precision: 3 }).notNull().defaultNow(),
});

export const post = pgTable("Post", {
  id: text("id")
    .notNull()
    .primaryKey()
    .default(sql`uuid(4)`),
  published: boolean("published").notNull(),
  title: text("title").notNull().default("New Post"),
  content: text("content").notNull(),
  authorId: text("authorId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  cardId: text("cardId").references(() => fireStore.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  createdAt: timestamp("createdAt", { precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  publishedAt: timestamp("publishedAt", { precision: 3 })
    .notNull()
    .defaultNow(),
});

export const category = pgTable("Category", {
  id: text("id")
    .notNull()
    .primaryKey()
    .default(sql`uuid(4)`),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt", { precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const system = pgTable("System", {
  id: text("id").notNull().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconId: text("iconId").references(() => fireStore.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  cardId: text("cardId").references(() => fireStore.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  createdAt: timestamp("createdAt", { precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const fireStore = pgTable("FireStore", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  mimeType: text("mimeType").notNull(),
  createdAt: timestamp("createdAt", { precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const categoryToPost = pgTable(
  "_CategoryToPost",
  {
    postId: text("A")
      .notNull()
      .references(() => post.id, { onDelete: "cascade", onUpdate: "cascade" }),
    categoryId: text("B")
      .notNull()
      .references(() => category.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (t) => [primaryKey({ columns: [t.postId, t.categoryId] })]
);

export const fireStoreToPost = pgTable("_FireStoreToPost", {
  postId: text("A")
    .notNull()
    .references(() => post.id, { onDelete: "cascade", onUpdate: "cascade" }),
  fireStoreId: text("B")
    .notNull()
    .references(() => fireStore.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});
