import { storage } from "../getStorage";
import { CorsInput } from "../inputs/CorsInput";
import { BucketObjectType } from "../objects";
import type { BuilderType } from "../builder";

export const bucket = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.field({
    type: BucketObjectType,
    args: {
      cors: t.arg({ type: [CorsInput] }),
    },
    resolve: async (_parent, { cors }, { env, user }) => {
      if (!user) throw new Error("Unauthorized");
      const s = storage({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
      });
      const cors2 = cors?.map((c) => {
        return {
          origin: c.origin ?? undefined,
          method: c.method ?? undefined,
          responseHeader: c.responseHeader ?? undefined,
          maxAgeSeconds: c.maxAgeSeconds ?? undefined,
        };
      });
      s.updateBucket({ body: { cors: cors2 } });
      return s.infoBucket({});
    },
  });
