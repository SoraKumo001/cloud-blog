import { GraphQLScalarType, GraphQLSchema } from "graphql";

import { SignJWT } from "jose";
import { createBuilder } from "./builder";
import { prisma } from "./context";
import { getUser } from "./getUser";
import { getUserInfo } from "./getUserInfo";
import { importFile } from "./importFile";
import { normalizationPostFiles } from "./normalizationPostFiles";
import { isolatedFiles, uploadFile } from "./uploadFile";

export const schema = () => {
  let schema: GraphQLSchema;
  return ({ env }: { env: { [key: string]: string | undefined } }) => {
    if (!schema) {
      const builder = createBuilder(env.DATABASE_URL ?? "");
      builder.mutationType({
        fields: (t) => ({
          signIn: t.prismaField({
            args: { token: t.arg({ type: "String" }) },
            type: "User",
            nullable: true,
            resolve: async (_query, _root, { token }, { setCookie }) => {
              const userInfo =
                typeof token === "string"
                  ? await getUserInfo(env.NEXT_PUBLIC_projectId, token)
                  : undefined;
              if (!userInfo) {
                setCookie("auth-token", "", {
                  httpOnly: true,
                  secure: env.NODE_ENV !== "development",
                  sameSite: "strict",
                  path: "/",
                  maxAge: 0,
                  domain: undefined,
                });
                return null;
              }
              const user = await getUser(prisma, userInfo.name, userInfo.email);
              if (user) {
                const secret = env.SECRET_KEY;
                if (!secret) throw new Error("SECRET_KEY is not defined");
                const token = await new SignJWT({ payload: { user: user } })
                  .setProtectedHeader({ alg: "HS256" })
                  .sign(new TextEncoder().encode(secret));
                setCookie("auth-token", token, {
                  httpOnly: true,
                  secure: env.NODE_ENV !== "development",
                  maxAge: 1000 * 60 * 60 * 24 * 7,
                  sameSite: "strict",
                  path: "/",
                  domain: undefined,
                });
              }
              return user;
            },
          }),
          uploadSystemIcon: t.prismaField({
            type: "FireStore",
            args: {
              file: t.arg({ type: "Upload", required: true }),
            },
            resolve: async (_query, _root, { file }, { prisma, user }) => {
              if (!user) throw new Error("Unauthorized");
              const firestore = await uploadFile({
                projectId: env.GOOGLE_PROJECT_ID ?? "",
                clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
                privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
                binary: file,
              });
              const system = await prisma.system.update({
                select: { icon: true },
                data: {
                  iconId: firestore.id,
                },
                where: { id: "system" },
              });
              await isolatedFiles({
                projectId: env.GOOGLE_PROJECT_ID ?? "",
                clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
                privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
              });
              if (!system.icon) throw new Error("icon is not found");
              return system.icon;
            },
          }),
          uploadPostIcon: t.prismaField({
            type: "FireStore",
            args: {
              postId: t.arg({ type: "String", required: true }),
              file: t.arg({ type: "Upload" }),
            },
            resolve: async (
              _query,
              _root,
              { postId, file },
              { prisma, user }
            ) => {
              if (!user) throw new Error("Unauthorized");
              if (!file) {
                const firestore = await prisma.post
                  .findUniqueOrThrow({
                    select: { card: true },
                    where: { id: postId },
                  })
                  .card();
                if (!firestore) throw new Error("firestore is not found");
                await prisma.fireStore.delete({
                  where: { id: firestore.id },
                });
                return firestore;
              }
              const firestore = await uploadFile({
                projectId: env.GOOGLE_PROJECT_ID ?? "",
                clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
                privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
                binary: file,
              });
              const post = await prisma.post.update({
                select: { card: true },
                data: {
                  cardId: firestore.id,
                },
                where: { id: postId },
              });
              await isolatedFiles({
                projectId: env.GOOGLE_PROJECT_ID ?? "",
                clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
                privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
              });
              if (!post.card) throw new Error("card is not found");
              return post.card;
            },
          }),
          uploadPostImage: t.prismaField({
            type: "FireStore",
            args: {
              postId: t.arg({ type: "String", required: true }),
              file: t.arg({ type: "Upload", required: true }),
            },
            resolve: async (
              _query,
              _root,
              { postId, file },
              { prisma, user }
            ) => {
              if (!user) throw new Error("Unauthorized");
              console.log(env);
              const firestore = await uploadFile({
                projectId: env.GOOGLE_PROJECT_ID ?? "",
                clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
                privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
                binary: file,
              });
              await prisma.post.update({
                data: {
                  postFiles: { connect: { id: firestore.id } },
                },
                where: { id: postId },
              });
              return firestore;
            },
          }),
          normalizationPostFiles: t.boolean({
            args: {
              postId: t.arg({ type: "String", required: true }),
              removeAll: t.arg({ type: "Boolean" }),
            },
            resolve: async (_root, { postId, removeAll }, { prisma, user }) => {
              if (!user) throw new Error("Unauthorized");
              await normalizationPostFiles(prisma, postId, removeAll === true, {
                projectId: env.GOOGLE_PROJECT_ID ?? "",
                clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
                privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
              });
              await isolatedFiles({
                projectId: env.GOOGLE_PROJECT_ID ?? "",
                clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
                privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
              });
              return true;
            },
          }),
          restore: t.boolean({
            args: {
              file: t.arg({ type: "Upload", required: true }),
            },
            resolve: async (_root, { file }, { user }) => {
              if (!user) throw new Error("Unauthorized");
              importFile({
                file: await file.text(),
                projectId: env.GOOGLE_PROJECT_ID ?? "",
                clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
                privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
              });
              return true;
            },
          }),
        }),
      });
      const Upload = new GraphQLScalarType({
        name: "Upload",
      });
      builder.addScalarType("Upload", Upload, {});
      schema = builder.toSchema({ sortSchema: false });
    }
    return schema;
  };
};
