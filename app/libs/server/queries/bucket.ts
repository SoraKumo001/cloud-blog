import { BuilderType } from "../builder";
import { storage } from "../getStorage";
import { BucketObjectType } from "../objects";

export const bucket = (
  t: PothosSchemaTypes.QueryFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.field({
    type: BucketObjectType,
    resolve: async (_parent, _input, { env, user }) => {
      if (!user) throw new Error("Unauthorized");
      const s = storage({
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
      });
      return s.infoBucket({});
    },
  });
