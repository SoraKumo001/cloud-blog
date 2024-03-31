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
    resolve: async (_root, { file }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      importFile({
        file: await file.text(),
      });
      return true;
    },
  });
