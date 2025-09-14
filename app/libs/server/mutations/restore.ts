import { importFile } from "../importFile";
import type { BuilderType } from "../builder";

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
