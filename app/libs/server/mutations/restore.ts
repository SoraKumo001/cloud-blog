import { BuilderType } from "../builder";
import { importFile } from "../importFile";

export const restore = (
  t: PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
    unknown
  >
) =>
  t.boolean({
    args: {
      file: t.arg({ type: "Upload", required: true }),
    },
    resolve: async (_root, { file }, { user, env }) => {
      if (!user) throw new Error("Unauthorized");
      importFile({
        file: await file.text(),
        projectId: env.GOOGLE_PROJECT_ID ?? "",
        clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
        privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
      });
      return true;
    },
  });
