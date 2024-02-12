import { jwtVerify } from "jose";
import type { User } from "@prisma/client";

export const getUserFromToken = async ({
  token,
  secret,
}: {
  token?: string;
  secret: string;
}) => {
  if (!token) return undefined;
  if (!secret) throw new Error("SECRET_KEY is not defined");
  return new Promise<User | undefined>((resolve) => {
    jwtVerify<{ payload: { user?: User } }>(
      token,
      new TextEncoder().encode(secret)
    )
      .then((data) => {
        resolve(
          typeof data === "object"
            ? (data.payload.payload?.user as User | undefined)
            : undefined
        );
      })
      .catch(() => resolve(undefined));
  });
};
