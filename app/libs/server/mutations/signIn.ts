import { SignJWT } from "jose";
import { BuilderType } from "../builder";
import { getUser } from "../getUser";
import { getUserInfo } from "../getUserInfo";

export const signIn = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.prismaField({
    args: { token: t.arg({ type: "String" }) },
    type: "User",
    nullable: true,
    resolve: async (_query, _root, { token }, { setCookie, env, prisma }) => {
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
  });
