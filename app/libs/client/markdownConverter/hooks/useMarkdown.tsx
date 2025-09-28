import { useMemo } from "react";
import { markdownCompiler } from "../markdownCompiler";

export const useMarkdown = ({ markdown }: { markdown?: string }) => {
  return useMemo(() => {
    return markdownCompiler.processSync({
      value: markdown,
    }).result;
  }, [markdown]);
};
