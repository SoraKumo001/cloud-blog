import { jwtVerify } from "jose";
import type { user } from "~/db/schema";

export const getUserFromToken = async ({
  token,
  secret,
}: {
  token?: string;
  secret: string;
}) => {
  if (!token) return undefined;
  if (!secret) throw new Error("SECRET_KEY is not defined");
  return new Promise<typeof user.$inferSelect | undefined>((resolve) => {
    jwtVerify<{ payload: { user?: typeof user.$inferSelect } }>(
      token,
      new TextEncoder().encode(secret)
    )
      .then((data) => {
        resolve(
          typeof data === "object"
            ? (data.payload.payload?.user as
                | typeof user.$inferSelect
                | undefined)
            : undefined
        );
      })
      .catch(() => resolve(undefined));
  });
};
