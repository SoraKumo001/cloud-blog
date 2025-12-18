import {
  boolean,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const user = pgTable("User", {
  id: uuid().notNull().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  name: text().notNull().default("User"),
  createdAt: timestamp({ precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp({ precision: 3 }).notNull().defaultNow(),
});

export const post = pgTable("Post", {
  id: uuid().notNull().primaryKey().defaultRandom(),
  published: boolean().notNull(),
  title: text().notNull().default("New Post"),
  content: text().notNull(),
  authorId: uuid()
    .notNull()
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  cardId: text().references(() => fireStore.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  createdAt: timestamp({ precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp({ precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  publishedAt: timestamp("publishedAt", { precision: 3 })
    .notNull()
    .defaultNow(),
});

export const category = pgTable("Category", {
  id: uuid().notNull().primaryKey().defaultRandom(),
  name: text().notNull(),
  createdAt: timestamp("createdAt", { precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const system = pgTable("System", {
  id: text().notNull().primaryKey(),
  title: text().notNull(),
  description: text().notNull(),
  iconId: text().references(() => fireStore.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  cardId: text().references(() => fireStore.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  createdAt: timestamp({ precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp({ precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const fireStore = pgTable("FireStore", {
  id: text().notNull().primaryKey(),
  name: text().notNull(),
  mimeType: text().notNull(),
  createdAt: timestamp({ precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp({ precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const categoryToPost = pgTable(
  "_CategoryToPost",
  {
    postId: uuid()
      .notNull()
      .references(() => post.id, { onDelete: "cascade", onUpdate: "cascade" }),
    categoryId: uuid()
      .notNull()
      .references(() => category.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (t) => [primaryKey({ columns: [t.postId, t.categoryId] })]
);

export const fireStoreToPost = pgTable("_FireStoreToPost", {
  postId: uuid()
    .notNull()
    .references(() => post.id, { onDelete: "cascade", onUpdate: "cascade" }),
  fireStoreId: text()
    .notNull()
    .references(() => fireStore.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});
