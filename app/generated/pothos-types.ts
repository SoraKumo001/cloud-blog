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
            };
            card: {
                Shape: FireStore | null;
                Name: "FireStore";
            };
            categories: {
                Shape: Category[];
                Name: "Category";
            };
            postFiles: {
                Shape: FireStore[];
                Name: "FireStore";
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
            };
            card: {
                Shape: FireStore | null;
                Name: "FireStore";
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
            };
            systemCards: {
                Shape: System[];
                Name: "System";
            };
            postCards: {
                Shape: Post[];
                Name: "Post";
            };
            posts: {
                Shape: Post[];
                Name: "Post";
            };
        };
    };
}