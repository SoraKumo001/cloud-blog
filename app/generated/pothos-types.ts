/* eslint-disable */
import type { Prisma, User, Post, Category, System, FireStore } from "C:\\prog\\apps\\cloud-blog\\node_modules\\@prisma\\client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "post";
        ListRelations: "post";
        Relations: {
            post: {
                Shape: Post[];
                Name: "Post";
                Nullable: false;
            };
        };
    };
    Post: {
        Name: "Post";
        Shape: Post;
        Include: Prisma.PostInclude;
        Select: Prisma.PostSelect;
        OrderBy: Prisma.PostOrderByWithRelationInput;
        WhereUnique: Prisma.PostWhereUniqueInput;
        Where: Prisma.PostWhereInput;
        Create: {};
        Update: {};
        RelationName: "author" | "card" | "categories" | "postFiles";
        ListRelations: "categories" | "postFiles";
        Relations: {
            author: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            card: {
                Shape: FireStore | null;
                Name: "FireStore";
                Nullable: true;
            };
            categories: {
                Shape: Category[];
                Name: "Category";
                Nullable: false;
            };
            postFiles: {
                Shape: FireStore[];
                Name: "FireStore";
                Nullable: false;
            };
        };
    };
    Category: {
        Name: "Category";
        Shape: Category;
        Include: Prisma.CategoryInclude;
        Select: Prisma.CategorySelect;
        OrderBy: Prisma.CategoryOrderByWithRelationInput;
        WhereUnique: Prisma.CategoryWhereUniqueInput;
        Where: Prisma.CategoryWhereInput;
        Create: {};
        Update: {};
        RelationName: "posts";
        ListRelations: "posts";
        Relations: {
            posts: {
                Shape: Post[];
                Name: "Post";
                Nullable: false;
            };
        };
    };
    System: {
        Name: "System";
        Shape: System;
        Include: Prisma.SystemInclude;
        Select: Prisma.SystemSelect;
        OrderBy: Prisma.SystemOrderByWithRelationInput;
        WhereUnique: Prisma.SystemWhereUniqueInput;
        Where: Prisma.SystemWhereInput;
        Create: {};
        Update: {};
        RelationName: "icon" | "card";
        ListRelations: never;
        Relations: {
            icon: {
                Shape: FireStore | null;
                Name: "FireStore";
                Nullable: true;
            };
            card: {
                Shape: FireStore | null;
                Name: "FireStore";
                Nullable: true;
            };
        };
    };
    FireStore: {
        Name: "FireStore";
        Shape: FireStore;
        Include: Prisma.FireStoreInclude;
        Select: Prisma.FireStoreSelect;
        OrderBy: Prisma.FireStoreOrderByWithRelationInput;
        WhereUnique: Prisma.FireStoreWhereUniqueInput;
        Where: Prisma.FireStoreWhereInput;
        Create: {};
        Update: {};
        RelationName: "systemIcons" | "systemCards" | "postCards" | "posts";
        ListRelations: "systemIcons" | "systemCards" | "postCards" | "posts";
        Relations: {
            systemIcons: {
                Shape: System[];
                Name: "System";
                Nullable: false;
            };
            systemCards: {
                Shape: System[];
                Name: "System";
                Nullable: false;
            };
            postCards: {
                Shape: Post[];
                Name: "Post";
                Nullable: false;
            };
            posts: {
                Shape: Post[];
                Name: "Post";
                Nullable: false;
            };
        };
    };
}